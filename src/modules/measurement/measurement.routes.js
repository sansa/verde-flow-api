import express from "express";
import {
  getMeasurementsByBranch,
  compareMeasurementsBetweenBranches,
} from "./measurement.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/branch/:id", getMeasurementsByBranch);
router.get("/branch/:id/compare", compareMeasurementsBetweenBranches);

export default router;
