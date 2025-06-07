import * as branchService from "./branch.service.js";
import logger from "../../utils/logger.js";

export async function createBranch(req, res, next) {
  try {
    const branch = await branchService.createBranch(req.body);
    logger.info(
      `Branch created: ${branch.id} in project ${req.body.projectId}`
    );
    res.status(201).json(branch);
  } catch (err) {
    next(err);
  }
}

export async function getBranches(req, res, next) {
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res
        .status(400)
        .json({ error: "projectId query param is required" });
    }
    const branches = await branchService.getBranchesByProject(
      projectId,
      req.user.id
    );
    res.json(branches);
  } catch (err) {
    next(err);
  }
}

export async function getBranchById(req, res, next) {
  try {
    const branch = await branchService.getBranchById(
      req.params.id,
      req.user.id
    );
    res.json(branch);
  } catch (err) {
    next(err);
  }
}

export async function updateBranch(req, res, next) {
  try {
    const branch = await branchService.updateBranch(
      req.params.id,
      req.user.id,
      req.body
    );
    logger.info(`Branch updated: ${req.params.id}`);
    res.json(branch);
  } catch (err) {
    next(err);
  }
}

export async function deleteBranch(req, res, next) {
  try {
    await branchService.deleteBranch(req.params.id, req.user.id);
    logger.info(`Branch deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
