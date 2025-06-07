import * as projectService from "./project.service.js";
import logger from "../../utils/logger.js";

export async function createProject(req, res, next) {
  try {
    const project = await projectService.createProject(req.user.id, req.body);
    logger.info(`Project created by user ${req.user.id}: ${project.id}`);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function getProjects(req, res, next) {
  try {
    const projects = await projectService.getProjectsByUser(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

export async function getProjectById(req, res, next) {
  try {
    const project = await projectService.getProjectById(
      req.user.id,
      req.params.id
    );
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await projectService.updateProject(
      req.user.id,
      req.params.id,
      req.body
    );
    logger.info(`Project updated: ${req.params.id} by user ${req.user.id}`);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    await projectService.deleteProject(req.user.id, req.params.id);
    logger.info(`Project deleted: ${req.params.id} by user ${req.user.id}`);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
