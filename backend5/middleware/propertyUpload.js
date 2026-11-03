import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "images") {
      return {
        folder: "diginiwas/properties/images",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: `property-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      };
    }

    if (file.fieldname === "video") {
      return {
        folder: "diginiwas/properties/videos",
        resource_type: "video",
        public_id: `video-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      };
    }

    return {
      folder: "diginiwas/properties/documents",
      resource_type: "raw",
      public_id: `document-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "images") {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."), false);
    }
  }

  if (["floorPlan", "reraCertificate", "documents"].includes(file.fieldname)) {
    const allowedDocuments = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    if (!allowedDocuments.includes(file.mimetype)) {
      return cb(new Error("Documents must be PDF, DOC, DOCX, JPG, PNG or WEBP files."), false);
    }
  }

  if (file.fieldname === "video") {
    const allowedVideos = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];
    if (!allowedVideos.includes(file.mimetype)) {
      return cb(new Error("Only MP4, WEBM, MOV and M4V video files are allowed."), false);
    }
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    // 100 MB for optional direct video upload.
    // URL-based video does not pass through multer at all.
    fileSize: 100 * 1024 * 1024,
    files: 35,
  },
});

export default upload;
