import multer from "multer";
import { firebaseMulterStorage } from "./firebaseMulterStorage.js";

const storage = firebaseMulterStorage({ folder: (_req, file) =>
  file.fieldname === "video" ? "diginiwas/advertisements/videos" : "diginiwas/advertisements/images"
});

export default multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);
