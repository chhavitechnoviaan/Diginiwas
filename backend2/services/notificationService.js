import mongoose from "mongoose";
import Notification from "../models/Notification.js";

// Create only after a successful business state change. The same eventKey is idempotent per recipient.
export async function notifyUser({ userId, userRole, title, message, type = "GENERAL", actionUrl = "", entityType = "", entityId = null, data = {}, eventKey }) {
  if (!mongoose.isValidObjectId(userId) || !userRole || !title) return null;
  const payload = { userId, userRole: String(userRole).toLowerCase(), title, message, type, actionUrl, entityType, entityId: mongoose.isValidObjectId(entityId) ? entityId : null, data };
  try {
    if (eventKey) return await Notification.findOneAndUpdate({ userId, userRole: payload.userRole, eventKey }, { $setOnInsert: { ...payload, eventKey } }, { upsert: true, new: true, setDefaultsOnInsert: true });
    return await Notification.create(payload);
  } catch (error) {
    if (error.code !== 11000) console.error("NOTIFICATION ERROR", error);
    return null;
  }
}

export async function notifyMany(recipients, fields) {
  const unique = new Map();
  for (const user of recipients) if (user?.userId && user?.userRole) unique.set(`${user.userRole}:${user.userId}`, user);
  return Promise.all([...unique.values()].map(recipient => notifyUser({ ...fields, ...recipient })));
}
