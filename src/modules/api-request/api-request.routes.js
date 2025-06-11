import express from "express";
import {
  createApiRequest,
  getApiRequests,
  getApiRequestById,
  updateApiRequest,
  deleteApiRequest,
} from "./api-request.controller.js";

import authenticateToken from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/zod.middleware.js";
import {
  createApiRequestSchema,
  updateApiRequestSchema,
} from "./api-request.validation.js";

const router = express.Router();
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: APIRequests
 *   description: Define and manage API endpoints to measure
 */

/**
 * @swagger
 * /api-requests:
 *   post:
 *     summary: Create a new API request for a project
 *     tags: [APIRequests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - method
 *               - path
 *               - projectId
 *             properties:
 *               method:
 *                 type: string
 *                 enum: [GET, POST, PUT, DELETE, PATCH]
 *               path:
 *                 type: string
 *               payload:
 *                 type: object
 *               description:
 *                 type: string
 *               projectId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: API request created
 *       400:
 *         description: Validation error
 */
router.post("/", validate(createApiRequestSchema), createApiRequest);

/**
 * @swagger
 * /api-requests:
 *   get:
 *     summary: Get all API requests for a project
 *     tags: [APIRequests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The project ID
 *     responses:
 *       200:
 *         description: List of API requests
 *       400:
 *         description: Missing projectId
 */
router.get("/", getApiRequests);

/**
 * @swagger
 * /api-requests/{id}:
 *   get:
 *     summary: Get API request by ID
 *     tags: [APIRequests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: API request details
 *       404:
 *         description: Not found
 */
router.get("/:id", getApiRequestById);

/**
 * @swagger
 * /api-requests/{id}:
 *   put:
 *     summary: Update an API request
 *     tags: [APIRequests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *               path:
 *                 type: string
 *               payload:
 *                 type: object
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: API request updated
 *       400:
 *         description: Validation error
 */
router.put("/:id", validate(updateApiRequestSchema), updateApiRequest);

/**
 * @swagger
 * /api-requests/{id}:
 *   delete:
 *     summary: Delete an API request
 *     tags: [APIRequests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: API request deleted
 */
router.delete("/:id", deleteApiRequest);

export default router;
