import express from "express";
import upload from "../middleware/advertisementUpload.js";
import {
  listAdvertisements, getAdvertisement, createAdvertisement,
  updateAdvertisement, deleteAdvertisement, toggleAdvertisement,
} from "../controllers/cms/advertisementController.js";

const router = express.Router();
router.get("/", listAdvertisements);
router.get("/:id", getAdvertisement);
router.post("/", upload, createAdvertisement);
router.put("/:id", upload, updateAdvertisement);
router.patch("/:id/toggle", toggleAdvertisement);
router.delete("/:id", deleteAdvertisement);
export default router;
