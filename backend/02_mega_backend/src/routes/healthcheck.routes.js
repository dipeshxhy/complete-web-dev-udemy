import { Router } from "express";
import healthcheckController from "../controllers/healthcheck.controller.js";

const healthcheckRouter = Router();

healthcheckRouter.get("/", healthcheckController.healthcheck);

export default healthcheckRouter;
