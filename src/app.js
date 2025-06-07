import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config.js";

import branchRoutes from "./modules/branch/branch.routes.js";
import commitRoutes from "./modules/commit/commit.routes.js";
import measurementRoutes from "./modules/measurement/measurement.routes.js";
import projectRoutes from "./modules/project/project.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import webHookRoutes from "./modules/webhook/webhook.routes.js";

import errorHandler from "./middleware/error.handler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/branches", branchRoutes);
app.use("/api/commits", commitRoutes);
app.use("/api/measurements", measurementRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/webhooks", webHookRoutes);

app.use(errorHandler);

export default app;
