import * as userService from "./user.service.js";
import logger from "../../utils/logger.js";
import {
  ErrorType,
  ErrorCode,
  SuccessCode,
} from "../../middleware/error.handler.js";

export async function registerUser(req, res, next) {
  try {
    const user = await userService.registerUser(req.body);
    logger.info(`User registered: ${user.email}`);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const authData = await userService.loginUser(req.body);
    logger.info(`User logged in: ${req.body.email}`);
    res.json(authData);
  } catch (err) {
    throw {
      message: err.message,
      statusCode: 401,
      type: ErrorType.APPLICATION,
      code: ErrorCode.INVALID_CREDENTIALS,
    };
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
