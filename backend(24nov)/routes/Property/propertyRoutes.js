// import express from "express";

// import {
//   createProperty,
//    getUnifiedAdminProperties,
//   getAdminPropertyById,
//   updatePropertyStatus,
//   boostProperty,
//   removePropertyBoost,
//   getPropertiesByPartner,
// } from "../../controllers/Property/propertyController.js";

// import {
//   protect,
// } from "../../middleware/authMiddleware.js";

// const router =
//   express.Router();

// router.post("/",createProperty);
// router.get("/admin", getUnifiedAdminProperties);
// router.get("/partner/:partnerId",getPropertiesByPartner);
// router.get("/:id", getAdminPropertyById);
// router.patch("/:id/status",updatePropertyStatus);
// router.patch("/:id/boost",boostProperty);
// router.patch("/:id/unboost",removePropertyBoost);

// export default router;

import express from "express";

import {
  createProperty,
} from "../../controllers/Property/propertyController.js";

import {
  getUnifiedAdminProperties,
  getUnifiedAdminPropertyById,
  updateUnifiedPropertyStatus,
  boostUnifiedProperty,
  unboostUnifiedProperty,
  updateUnifiedProperty,
  getUnifiedLivePropertiesController,
  getUnifiedPropertiesByPartner,
  deleteUnifiedProperty,
} from "../../controllers/Property/unifiedPropertyController.js";

import {
  protect,
} from "../../middleware/authMiddleware.js";

import upload from "../../middleware/propertyUpload.js";

const router = express.Router();

// Public website listing. This route only returns Live + Verified properties.
router.get(
  "/",
  getUnifiedLivePropertiesController
);

// ======================================================
// CREATE PROPERTY
// Images + Floor Plan + RERA + Video
// ======================================================

router.post(
  "/",

  upload.fields([
    {
      name: "images",
      maxCount: 25,
    },

    {
      name: "floorPlan",
      maxCount: 1,
    },

    {
      name: "reraCertificate",
      maxCount: 1,
    },

    {
      name: "video",
      maxCount: 1,
    },

    {
      name: "documents",
      maxCount: 3,
    },
  ]),

  createProperty
);

router.get(
  "/all",
  getUnifiedAdminProperties
);

// ======================================================
// ADMIN PROPERTIES
// ======================================================

router.get(
  "/admin",
  getUnifiedAdminProperties
);

router.get(
  "/filter",
  getUnifiedLivePropertiesController
);

// ======================================================
// PARTNER PROPERTIES
// IMPORTANT: Keep this before /:id
// ======================================================

router.get(
  "/partner/:partnerId",
  getUnifiedPropertiesByPartner
);


// ======================================================
// UPDATE PROPERTY
// ======================================================

router.patch(
  "/:id",

  upload.fields([
    {
      name: "images",
      maxCount: 25,
    },

    {
      name: "floorPlan",
      maxCount: 1,
    },

    {
      name: "reraCertificate",
      maxCount: 1,
    },

    {
      name: "video",
      maxCount: 1,
    },

    {
      name: "documents",
      maxCount: 3,
    },
  ]),

  updateUnifiedProperty
);


// ======================================================
// STATUS
// ======================================================

router.patch(
  "/:id/status",
  protect,
  updateUnifiedPropertyStatus
);


// ======================================================
// BOOST
// ======================================================

router.patch(
  "/:id/boost",
  protect,
  boostUnifiedProperty
);


// ======================================================
// UNBOOST
// ======================================================

router.patch(
  "/:id/unboost",
  protect,
  unboostUnifiedProperty
);


// ======================================================
// GET PROPERTY BY ID
// IMPORTANT: Dynamic /:id should remain near bottom
// ======================================================

router.get(
  "/:id",
  getUnifiedAdminPropertyById
);
router.delete(
  "/:id/delete",
  protect,
  deleteUnifiedProperty
);

export default router;
