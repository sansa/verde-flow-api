import prisma from "../../config/db.js";

export async function createProject(userId, data) {
  return prisma.project.create({
    data: {
      ...data,
      ownerId: userId,
    },
  });
}

export async function getProjectsByUser(userId) {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    include: {
      branches: {
        include: {
          measurements: {
            select: { timestamp: true },
            orderBy: { timestamp: "desc" },
            take: 1,
          },
        },
      },
      _count: {
        select: {
          branches: true,
          apiRequests: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return projects.map(project => {
    const allMeasurements = project.branches.flatMap(b => b.measurements);
    const lastMeasured =
      allMeasurements.sort((a, b) => b.timestamp - a.timestamp)[0]?.timestamp ??
      null;

    return {
      id: project.id,
      name: project.name,
      description:
        project.description || "This is a sample API to test Verde Flow",
      branchCount: project._count.branches,
      totalApis: project._count.apiRequests,
      lastMeasured: lastMeasured || "Not Yet Measured",
      status: project.status || "Active",
    };
  });
}

export async function getProjectById(userId, projectId) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      _count: {
        select: {
          branches: true,
          apiRequests: true,
        },
      },
    },
  });
  if (!project || project.ownerId !== userId) {
    throw new Error("Project not found or unauthorized");
  }
  return project;
}

export async function updateProject(userId, projectId, data) {
  const project = await getProjectById(userId, projectId);
  return prisma.project.update({
    where: { id: projectId },
    data,
  });
}

export async function deleteProject(userId, projectId) {
  await getProjectById(userId, projectId);
  return prisma.project.delete({
    where: { id: projectId },
  });
}
