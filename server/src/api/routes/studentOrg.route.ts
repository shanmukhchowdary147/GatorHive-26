import { Router } from "express";
import { validate } from "express-validation";
import { authorize } from "../middleware/authorize.middleware";
import { studentOrgController } from "../controllers/studentOrg.controller";
import { createOrgValidation } from "../common/validations/studentOrg.validation";

const router = Router();

router.route("/").get([authorize, studentOrgController.getAllOrgs]);
router
  .route("/subscribed")
  .get([authorize, studentOrgController.getSubscribedOrgs]);

router
  .route("/create")
  .post([
    authorize,
    validate(createOrgValidation),
    studentOrgController.createOrg,
  ]);
router
  .route("/hostableOrgs")
  .get([authorize, studentOrgController.getHostableOrgs]);
router.route("/subscribe").put([authorize, studentOrgController.subscribeOrg]);

export { router as studentOrgRoutes };
