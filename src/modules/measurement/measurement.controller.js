import * as service from "./measurement.service.js";

export async function getMeasurementsByBranch(req, res, next) {
  try {
    const branchId = req.params.id;
    const data = await service.getMeasurementsByBranch(branchId, req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function compareMeasurementsBetweenBranches(req, res, next) {
  try {
    const targetBranchId = req.params.id;
    const baselineBranchId = req.query.baselineBranchId;
    if (!baselineBranchId) {
      return res
        .status(400)
        .json({ error: "Missing baselineBranchId query param" });
    }

    const diff = await service.compareMeasurements(
      targetBranchId,
      baselineBranchId,
      req.user.id
    );
    res.json(diff);
  } catch (err) {
    next(err);
  }
}
