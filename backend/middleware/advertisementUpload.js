import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    const isVideo = file.fieldname === "video";
    return {
      folder: isVideo ? "diginiwas/advertisements/videos" : "diginiwas/advertisements/images",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo ? ["mp4", "mov", "webm"] : ["jpg", "jpeg", "png", "webp"],
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]/gi, "-")}`,
    };
  },
});

export default multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);
