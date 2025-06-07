import prisma from "../../config/db.js";

export async function createBranch(data) {
  return prisma.branch.create({
    data,
  });
}

export async function getBranchesByProject(projectId, userId) {
  // Verify project belongs to user
  const project = await prisma.project.findFirst({
    where: { id: projectId, ownerId: userId },
  });
  if (!project) throw new Error("Project not found or unauthorized");

  return prisma.branch.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBranchById(branchId, userId) {
  const branch = await prisma.branch.findUnique({
    where: { id: branchId },
    include: { project: true },
  });

  if (!branch || branch.project.ownerId !== userId) {
    throw new Error("Branch not found or unauthorized");
  }

  return branch;
}

export async function updateBranch(branchId, userId, data) {
  await getBranchById(branchId, userId);
  return prisma.branch.update({
    where: { id: branchId },
    data,
  });
}

export async function deleteBranch(branchId, userId) {
  await getBranchById(branchId, userId);
  return prisma.branch.delete({
    where: { id: branchId },
  });
}
