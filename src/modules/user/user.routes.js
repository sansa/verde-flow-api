import express from "express";
import { registerUser, loginUser, getCurrentUser } from "./user.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/zod.middleware.js";
import { registerUserSchema, loginUserSchema } from "./user.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
router.post("/register", validate(registerUserSchema), registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user and return JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authenticated
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", validate(loginUserSchema), loginUser);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authenticateToken, getCurrentUser);

export default router;
