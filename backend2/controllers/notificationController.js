import mongoose from "mongoose";
import Notification from "../models/Notification.js";
const owner = req => ({ userId: req.user.id, userRole: String(req.user.role || "").toLowerCase() });
export async function listNotifications(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const filter = owner(req);
    if (req.query.unread === "true") filter.isRead = false;
    if (req.query.type && req.query.type !== "All") filter.type = req.query.type;
    const [data, total, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Notification.countDocuments(filter),
      Notification.countDocuments({ ...owner(req), isRead: false })
    ]);
    res.json({ success: true, data, unreadCount, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { res.status(500).json({ success: false, message: "Unable to load notifications" }); }
}
export async function markRead(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid ID" });
  const data = await Notification.findOneAndUpdate({ ...owner(req), _id: req.params.id }, { $set: { isRead: true, readAt: new Date() } }, { new: true });
  return data ? res.json({ success: true, data }) : res.status(404).json({ success: false, message: "Not found" });
}
export async function markAllRead(req, res) {
  await Notification.updateMany({ ...owner(req), isRead: false }, { $set: { isRead: true, readAt: new Date() } });
  res.json({ success: true });
}
export async function deleteNotification(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid ID" });
  const result = await Notification.deleteOne({ ...owner(req), _id: req.params.id });
  return res.status(result.deletedCount ? 200 : 404).json({ success: !!result.deletedCount });
}
export async function clearNotifications(req, res) {
  await Notification.deleteMany(owner(req));
  res.json({ success: true });
}
