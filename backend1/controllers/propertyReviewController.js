import mongoose from "mongoose";
import PropertyReview from "../models/PropertyReview.js";
import NewProperty from "../models/NewProperty.js";
import Buyer from "../models/Buyer.js";
import Partner from "../models/Partner.js";
import Seller from "../models/Seller.js";

const roleModels = { buyer: Buyer, partner: Partner, seller: Seller };
const allowedRoles = new Set(Object.keys(roleModels));

export const listPropertyReviews = async (req, res) => {
  try {
    const propertyRef = req.params.propertyId;
    const query = { isVisible: true };
    if (mongoose.isValidObjectId(propertyRef)) query.property = propertyRef;
    else query.propertyId = propertyRef;
    const reviews = await PropertyReview.find(query).sort({ createdAt: -1 }).lean();
    const summary = reviews.reduce((acc, item) => ({ count: acc.count + 1, total: acc.total + item.rating }), { count: 0, total: 0 });
    res.json({ success: true, count: reviews.length, averageRating: summary.count ? Number((summary.total / summary.count).toFixed(1)) : 0, reviews });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const createPropertyReview = async (req, res) => {
  try {
    const role = String(req.user?.role || "").toLowerCase();
    if (!allowedRoles.has(role)) return res.status(403).json({ success: false, message: "Only buyers, partners and sellers can review properties." });
    const { propertyId, rating, remark } = req.body || {};
    if (!propertyId || !mongoose.isValidObjectId(propertyId)) return res.status(400).json({ success: false, message: "propertyId must be a valid NewProperty MongoDB _id." });
    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) return res.status(400).json({ success: false, message: "rating must be an integer from 1 to 5." });
    if (typeof remark !== "string" || !remark.trim()) return res.status(400).json({ success: false, message: "remark is required." });
    const property = await NewProperty.findById(propertyId).select("propertyId title status isActive");
    if (!property) return res.status(404).json({ success: false, message: "Property not found." });
    const Model = roleModels[role];
    const reviewer = await Model.findById(req.user.id).select("name isDeleted status accountStatus isBlocked");
    if (!reviewer || reviewer.isDeleted || reviewer.isBlocked || String(reviewer.status || "").toLowerCase() === "blocked") return res.status(403).json({ success: false, message: "Your account cannot submit reviews." });
    const review = await PropertyReview.create({ property: property._id, propertyId: property.propertyId || String(property._id), propertyTitle: property.title || "", reviewer: reviewer._id, reviewerRole: role, reviewerName: reviewer.name, rating: numericRating, remark: remark.trim() });
    res.status(201).json({ success: true, message: "Property review submitted.", review });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: "You have already reviewed this property." });
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listAllReviewsForAdmin = async (_req, res) => {
  try { const reviews = await PropertyReview.find().sort({ createdAt: -1 }).lean(); res.json({ success: true, count: reviews.length, reviews }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const updateReviewForAdmin = async (req, res) => {
  try {
    const updates = {};
    if (req.body.rating !== undefined) { const rating = Number(req.body.rating); if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ success: false, message: "rating must be an integer from 1 to 5." }); updates.rating = rating; }
    if (req.body.remark !== undefined) { if (typeof req.body.remark !== "string" || !req.body.remark.trim()) return res.status(400).json({ success: false, message: "remark cannot be empty." }); updates.remark = req.body.remark.trim(); }
    if (req.body.isVisible !== undefined) updates.isVisible = Boolean(req.body.isVisible);
    updates.adminUpdatedAt = new Date();
    const review = await PropertyReview.findByIdAndUpdate(req.params.reviewId, { $set: updates }, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ success: false, message: "Review not found." });
    res.json({ success: true, message: "Review updated.", review });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const deleteReviewForAdmin = async (req, res) => {
  try { const review = await PropertyReview.findByIdAndDelete(req.params.reviewId); if (!review) return res.status(404).json({ success: false, message: "Review not found." }); res.json({ success: true, message: "Review deleted." }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
