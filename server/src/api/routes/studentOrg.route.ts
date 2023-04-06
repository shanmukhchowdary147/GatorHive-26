import { Router } from "express";
import { validate } from "express-validation";
import { authorize } from "../middleware/authorize.middleware";
import { studentOrgController } from "../controllers/studentOrg.controller";
import { createOrgValidation } from "../common/validations/studentOrg.validation";

const router = Router();

router
  .route("/create")
  .put([
    authorize,
    validate(createOrgValidation),
    studentOrgController.createOrg,
  ]);

export { router as studentOrgRoutes };
