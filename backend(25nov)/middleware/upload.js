import multer from "multer";
import { firebaseMulterStorage } from "./firebaseMulterStorage.js";

const storage = firebaseMulterStorage({ folder: (_req, file) => {
  if (file.fieldname === "images") return "diginiwas/properties/images";
  if (["floorPlan", "reraCertificate"].includes(file.fieldname)) return "diginiwas/properties/documents";
  if (file.fieldname === "video") return "diginiwas/properties/videos";
  return "diginiwas/cms/images";
}});

const upload = multer({ storage, limits: {fileSize: 100 * 1024 * 1024, files: 35} });

export default upload;