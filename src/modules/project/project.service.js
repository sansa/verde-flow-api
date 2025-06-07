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
  return prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectById(userId, projectId) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
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
