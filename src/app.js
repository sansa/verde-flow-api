import express from "express";
import dotenv from "dotenv";
import userRoutes from "./modules/user/user.routes.js";
import errorHandler from "./middleware/error.handler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
