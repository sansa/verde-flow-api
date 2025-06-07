import { createOrGetCommit } from "../commit/commit.service.js";
import prisma from "../../config/db.js";
import logger from "../../utils/logger.js";

export async function processPushEvent(payload) {
  logger.info("Processing push event");
  logger.info(payload);
  const { ref, commits, repository } = payload;
  const branchName = ref.replace("refs/heads/", "");

  const project = await prisma.project.findFirst({
    where: { gitUrl: repository.clone_url },
    include: { branches: true },
  });

  if (!project)
    throw new Error(
      `No matching project for webhook repo ${repository.clone_url}`
    );

  const branch = project.branches.find(b => b.name === branchName);
  if (!branch) throw new Error(`Branch '${branchName}' not found in project`);

  const created = [];

  for (const commit of commits) {
    const data = {
      hash: commit.id,
      message: commit.message,
      authorName: commit.author.name,
      authorEmail: commit.author.email,
      committedAt: new Date(commit.timestamp),
      branchId: branch.id,
    };
    const result = await createOrGetCommit(data);
    created.push(result);
  }

  return { count: created.length, commits: created.map(c => c.hash) };
}
