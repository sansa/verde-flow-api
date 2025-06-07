import express from "express";
import { registerUser, loginUser, getCurrentUser } from "./user.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/zod.middleware.js";
import { registerUserSchema, loginUserSchema } from "./user.validation.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema) registerUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
