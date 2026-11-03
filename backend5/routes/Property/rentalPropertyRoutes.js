import express from "express";
import upload from "../../middleware/propertyUpload.js";
import { protect } from "../../middleware/authMiddleware.js";
import { createRentalProperty, getRentalFormOptions, getRentalProperties, getRentalPropertyById, updateRentalProperty } from "../../controllers/Property/rentalPropertyController.js";

const router = express.Router();
router.get("/options", getRentalFormOptions);
router.get("/", protect, getRentalProperties);
router.post(
  "/",
  protect,
  upload.fields([
    { name: "images", maxCount: 25 },
    { name: "video", maxCount: 1 },
    { name: "floorPlan", maxCount: 1 },
    { name: "reraCertificate", maxCount: 1 },
    { name: "documents", maxCount: 3 },
  ]),
  createRentalProperty,
);
router.get("/:id", protect, getRentalPropertyById);
router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "images", maxCount: 25 },
    { name: "video", maxCount: 1 },
    { name: "floorPlan", maxCount: 1 },
    { name: "reraCertificate", maxCount: 1 },
    { name: "documents", maxCount: 3 },
  ]),
  updateRentalProperty,
);
export default router;
