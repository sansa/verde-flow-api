import prisma from "../../config/db.js";

export async function createApiRequest(data) {
  return prisma.aPIRequest.create({ data });
}

export async function getApiRequestsByProject(projectId, userId) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.ownerId !== userId) {
    throw { message: "Project not found or unauthorized", statusCode: 403 };
  }

  return prisma.aPIRequest.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getApiRequestById(id) {
  return prisma.aPIRequest.findUnique({ where: { id } });
}

export async function updateApiRequest(id, data) {
  return prisma.aPIRequest.update({ where: { id }, data });
}

export async function deleteApiRequest(id) {
  return prisma.aPIRequest.delete({ where: { id } });
}
