import prisma from "../../config/db.js";

export async function createOrGetCommit(data) {
  const existing = await prisma.commit.findFirst({
    where: {
      hash: data.hash,
      branchId: data.branchId,
    },
  });

  if (existing) return existing;

  return prisma.commit.create({ data });
}

export async function getCommitsByBranch(branchId, userId) {
  const branch = await prisma.branch.findUnique({
    where: { id: branchId },
    include: { project: true },
  });

  if (!branch || branch.project.ownerId !== userId) {
    throw new Error("Branch not found or unauthorized");
  }

  return prisma.commit.findMany({
    where: { branchId },
    orderBy: { committedAt: "desc" },
  });
}
