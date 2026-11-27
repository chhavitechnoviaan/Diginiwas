import express from "express";
import upload from "../../middleware/propertyUpload.js";
import { protect } from "../../middleware/authMiddleware.js";
import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } from "../../controllers/Property/residentialSaleController.js";

const router = express.Router();
router.get("/", protect, getAllProperties);
router.post("/", protect, upload.fields([{name:"images",maxCount:25},{name:"video",maxCount:1},{name:"floorPlan",maxCount:1},{name:"reraCertificate",maxCount:1},{name:"documents",maxCount:3}]), createProperty);
router.get("/:id", protect, getPropertyById);
router.patch("/:id", protect, upload.fields([{name:"images",maxCount:25},{name:"video",maxCount:1},{name:"floorPlan",maxCount:1},{name:"reraCertificate",maxCount:1},{name:"documents",maxCount:3}]), updateProperty);
router.delete("/:id", protect, deleteProperty);
export default router;
