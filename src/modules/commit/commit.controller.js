import * as commitService from "./commit.service.js";
import logger from "../../utils/logger.js";

export async function createCommit(req, res, next) {
  try {
    const commit = await commitService.createOrGetCommit(req.body);
    logger.info(`Commit recorded: ${commit.hash}`);
    res.status(201).json(commit);
  } catch (err) {
    next(err);
  }
}

export async function getCommitsByBranch(req, res, next) {
  try {
    const commits = await commitService.getCommitsByBranch(
      req.params.branchId,
      req.user.id
    );
    res.json(commits);
  } catch (err) {
    next(err);
  }
}
