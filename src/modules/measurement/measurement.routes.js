import express from "express";
import {
  getMeasurementsByBranch,
  compareMeasurementsBetweenBranches,
} from "./measurement.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Measurements
 *   description: Branch-level API performance and energy usage metrics
 */

/**
 * @swagger
 * /measurements/branch/{id}:
 *   get:
 *     summary: Get all measurements for a specific branch
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: List of measurements
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Branch not found or unauthorized
 */
router.get("/branch/:id", getMeasurementsByBranch);

/**
 * @swagger
 * /measurements/branch/{id}/compare:
 *   get:
 *     summary: Compare measurements between two branches
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Target branch ID
 *       - in: query
 *         name: baselineBranchId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the baseline branch to compare against
 *     responses:
 *       200:
 *         description: Comparison results by endpoint
 *       400:
 *         description: Missing query parameter
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Branches not found or unauthorized
 */
router.get("/branch/:id/compare", compareMeasurementsBetweenBranches);

export default router;
