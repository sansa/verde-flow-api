import express from "express";
import { createCommit, getCommitsByBranch } from "./commit.controller.js";
import { validate } from "../../middleware/zod.middleware.js";
import { createCommitSchema } from "./commit.validation.js";
import authenticateToken from "../../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Commits
 *   description: Git commits linked to branches and measurements
 */

/**
 * @swagger
 * /commits:
 *   post:
 *     summary: Ingest a new commit (automated)
 *     tags: [Commits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hash
 *               - authorName
 *               - authorEmail
 *               - committedAt
 *               - branchId
 *             properties:
 *               hash:
 *                 type: string
 *               message:
 *                 type: string
 *               authorName:
 *                 type: string
 *               authorEmail:
 *                 type: string
 *               committedAt:
 *                 type: string
 *                 format: date-time
 *               branchId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Commit saved or reused
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 */
router.post("/", validate(createCommitSchema), createCommit);

/**
 * @swagger
 * /commits/branch/{branchId}:
 *   get:
 *     summary: List all commits for a given branch
 *     tags: [Commits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of commits
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Branch not found
 */
router.get("/branch/:branchId", getCommitsByBranch);

export default router;
