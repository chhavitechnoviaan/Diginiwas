import express from "express";
import upload from "../../middleware/propertyUpload.js";
import { protect } from "../../middleware/authMiddleware.js";
import {
  getCommercialRentalFormOptions,
  createCommercialRentalProperty,
  getCommercialRentalProperties,
  getCommercialRentalPropertyById,
  updateCommercialRentalProperty,
  deleteCommercialRentalProperty,
} from "../../controllers/Property/commercialRentalPropertyController.js";

const router = express.Router();

router.get("/options", getCommercialRentalFormOptions);
router.get("/", protect, getCommercialRentalProperties);
router.post("/", protect, upload.fields([
  { name: "images", maxCount: 25 },
  { name: "video", maxCount: 1 },
  { name: "floorPlan", maxCount: 1 },
  { name: "reraCertificate", maxCount: 1 },
  { name: "documents", maxCount: 3 },
]), createCommercialRentalProperty);
router.get("/:id", protect, getCommercialRentalPropertyById);
router.patch("/:id", protect, upload.fields([
  { name: "images", maxCount: 25 },
  { name: "video", maxCount: 1 },
  { name: "floorPlan", maxCount: 1 },
  { name: "reraCertificate", maxCount: 1 },
  { name: "documents", maxCount: 3 },
]), updateCommercialRentalProperty);
router.delete("/:id", protect, deleteCommercialRentalProperty);

export default router;
