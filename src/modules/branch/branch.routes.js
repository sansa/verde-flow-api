import express from "express";
import {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "./branch.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/zod.middleware.js";
import { createBranchSchema, updateBranchSchema } from "./branch.validation.js";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Manage Git branches under a project
 */

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a new branch for a project
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - projectId
 *             properties:
 *               name:
 *                 type: string
 *               projectId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Branch created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", validate(createBranchSchema), createBranch);

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Get all branches for a given project
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the project to list branches for
 *     responses:
 *       200:
 *         description: List of branches
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Missing projectId query
 */
router.get("/", getBranches);

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get branch details by ID
 *     tags: [Branches]
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
 *         description: Branch details
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", getBranchById);

/**
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branches]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch updated
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", validate(updateBranchSchema), updateBranch);

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
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
 *       204:
 *         description: Branch deleted
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", deleteBranch);

export default router;
