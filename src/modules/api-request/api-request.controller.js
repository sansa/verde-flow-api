import * as service from "./api-request.service.js";

export async function createApiRequest(req, res, next) {
  try {
    const result = await service.createApiRequest(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getApiRequests(req, res, next) {
  try {
    const projectId = req.query.projectId;
    if (!projectId) {
      return res.status(400).json({ error: "projectId is required" });
    }
    const results = await service.getApiRequestsByProject(
      projectId,
      req.user.id
    );
    res.json(results);
  } catch (err) {
    next(err);
  }
}

export async function getApiRequestById(req, res, next) {
  try {
    const result = await service.getApiRequestById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function updateApiRequest(req, res, next) {
  try {
    const result = await service.updateApiRequest(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function deleteApiRequest(req, res, next) {
  try {
    await service.deleteApiRequest(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
