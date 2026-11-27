import mongoose from "mongoose";
import Seller from "../../models/Seller.js";
import Partner from "../../models/Partner.js";
import SellerBoostRequest from "../../models/SellerBoostRequest.js";
import PromotionRequest from "../../models/PromotionRequest.js";

// Admin-only endpoint; sellerId refers to Seller collection, not auth user ID.
export async function getAdminSellerBoostHistory(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.sellerId)) return res.status(400).json({ success: false, message: "Invalid seller ID" });
    const seller = await Seller.findById(req.params.sellerId).select("_id userId name sellerId").lean();
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });
    const ids = [seller._id, seller.userId].filter(Boolean);
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const query = { sellerId: { $in: ids } };
    if (req.query.status && req.query.status !== "All") query.status = req.query.status;
    const [requests, total] = await Promise.all([
      SellerBoostRequest.find(query).populate("propertyId", "title propertyId status").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      SellerBoostRequest.countDocuments(query),
    ]);
    const partnerIds = [...new Set(requests.map(r => String(r.partnerId)).filter(Boolean))];
    const partners = await Partner.find({ _id: { $in: partnerIds } }).select("name agencyName partnerId personalDetails businessDetails").lean();
    const partnerMap = new Map(partners.map(p => [String(p._id), p]));
    const promoIds = requests.map(r => r.promotionRequestId).filter(Boolean);
    const promotions = await PromotionRequest.find({ _id: { $in: promoIds } }).select("status creditsCharged expiresAt approvedAt adminRemarks").lean();
    const promoMap = new Map(promotions.map(p => [String(p._id), p]));
    const data = requests.map(r => {
      const partner = partnerMap.get(String(r.partnerId));
      const promotion = r.promotionRequestId ? promoMap.get(String(r.promotionRequestId)) : null;
      return { ...r, partner: partner ? { _id: partner._id, name: partner.agencyName || partner.name || partner.personalDetails?.fullName || partner.businessDetails?.agencyName || partner.partnerId || "Partner", partnerCode: partner.partnerId } : null, adminPromotion: promotion || null };
    });
    res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) { console.error("ADMIN SELLER BOOST HISTORY", err); res.status(500).json({ success: false, message: "Could not load seller boost requests" }); }
}
