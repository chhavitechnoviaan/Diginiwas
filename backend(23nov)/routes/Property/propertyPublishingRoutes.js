import express from "express";

import {
  getPropertyPublishingSummary,
  getReadyForFinalReviewProperties,
  getLivePublishingProperties,
  getFinalReviewPropertyById,
  makePropertyLiveAfterFinalReview,
} from "../../controllers/Property/propertyPublishingController.js";

import {
  protect,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/summary",
  protect,
  getPropertyPublishingSummary
);

router.get(
  "/ready",
  protect,
  getReadyForFinalReviewProperties
);

router.get(
  "/live",
  protect,
  getLivePublishingProperties
);

router.get(
  "/:id/final-review",
  protect,
  getFinalReviewPropertyById
);

router.patch(
  "/:id/make-live",
  protect,
  makePropertyLiveAfterFinalReview
);

export default router;
