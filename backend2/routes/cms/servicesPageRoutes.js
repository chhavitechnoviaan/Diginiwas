import express from "express";
import { protect, requireAdmin } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/upload.js";
import {
  getPublicServicesPage,
  getAdminServicesPage,
  updateServicesPage,
  uploadServiceImage,
} from "../../controllers/cms/servicesPageController.js";

const router = express.Router();
router.get("/public", getPublicServicesPage);
router.post("/upload-image", protect, requireAdmin, upload.single("image"), uploadServiceImage);
router.get("/admin", protect, requireAdmin, getAdminServicesPage);
router.put("/admin", protect, requireAdmin, updateServicesPage);
export default router;
