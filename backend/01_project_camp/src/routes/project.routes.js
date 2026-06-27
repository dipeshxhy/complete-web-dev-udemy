import { Router } from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as projectController from "../controllers/project.controller.js";
import { validator } from "../middlewares/validator.js";
import * as validate from "../validators/validate.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(authMiddleware.authenticate);

// Project routes
router.post(
  "/",
  validator(validate.createProjectInputSchema),
  projectController.createProject,
);
router.get("/", projectController.getProjects);

router.get(
  "/:projectId",
  authMiddleware.authorize(AvailableUserRoles),
  projectController.getProject,
);

router.put(
  "/:projectId",
  authMiddleware.authorize([UserRolesEnum.ADMIN]),
  validator(validate.updateProjectInputSchema),
  projectController.updateProject,
);

router.delete(
  "/:projectId",
  authMiddleware.authorize([UserRolesEnum.ADMIN]),
  projectController.deleteProject,
);
router.post(
  "/:projectId/members",
  authMiddleware.authorize([UserRolesEnum.ADMIN]),
  validator(validate.addMemberToProjectInputSchema),
  projectController.addMemberToProject,
);

router.get(
  "/:projectId/members",
  authMiddleware.authorize([AvailableUserRoles]),
  projectController.getProjectMembers,
);

export default router;
