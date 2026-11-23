import multer from "multer";
import { firebaseMulterStorage } from "./firebaseMulterStorage.js";

const storage = firebaseMulterStorage({
  folder: (_req, file) => ({ idFront: "diginiwas/seller-kyc/front", idBack: "diginiwas/seller-kyc/back" })[file.fieldname] || "diginiwas/seller-kyc",
});

const sellerKycUpload =
  multer({
    storage,

    limits: {
      fileSize:
        10 *
        1024 *
        1024,
    },

    fileFilter: (
      req,
      file,
      cb
    ) => {
      const allowedMimeTypes =
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];

      if (
        !allowedMimeTypes.includes(
          file.mimetype
        )
      ) {
        return cb(
          new Error(
            "Only JPG, JPEG, PNG and WEBP images are allowed."
          ),
          false
        );
      }

      cb(null, true);
    },
  });

export default sellerKycUpload;