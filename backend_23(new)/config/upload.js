import multer from "multer";
import { firebaseMulterStorage } from "../middleware/firebaseMulterStorage.js";

const storage = firebaseMulterStorage({ folder: (_req, file) => {
  if (file.fieldname === "video") return "diginiwas/properties/videos";
  if (["floorPlan", "reraCertificate"].includes(file.fieldname)) return "diginiwas/properties/documents";
  return "diginiwas/properties/images";
}});

export default multer({storage, limits: {fileSize: 100 * 1024 * 1024, files: 35}});
