// import { notifyMany } from "./notificationService.js";
// import User from "../models/User.js";

// export const notifyAdmins = async ({
//   title,
//   message,
//   type,
//   actionUrl,
//   entityType,
//   entityId,
//   data = {},
// }) => {
//   try {
//     const admins = await User.find({ role: "admin", isActive: { $ne: false } })
//       .select("_id")
//       .lean();
//     if (!admins.length) return [];

//     return notifyMany(
//       admins.map((admin) => ({ userId: admin._id, userRole: "admin" })),
//       { title, message, type, actionUrl, entityType, entityId, data },
//     );
//   } catch (error) {
//     // A notification failure must never fail the main business operation.
//     console.error("CREATE ADMIN NOTIFICATION ERROR:", error);
//     return [];
//   }
// };
import { notifyMany } from "./notificationService.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const sendAdminNotificationEmail = async ({ title, message, type, actionUrl, entityType, entityId }) => {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL || "diginiwas@gmail.com";
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("ADMIN NOTIFICATION EMAIL SKIPPED: SMTP_HOST/SMTP_USER/SMTP_PASS is not configured.");
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const url = actionUrl ? `https://admin.diginiwas.com${String(actionUrl).startsWith("/") ? actionUrl : `/${actionUrl}`}` : "https://admin.diginiwas.com/notifications";
  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject: `[DigiNiwas Admin] ${title}`,
    text: `${title}

${message || ""}

Type: ${type || "GENERAL"}
Entity: ${entityType || "-"} ${entityId || ""}
Open: ${url}`,
    html: `<div style="font-family:Arial,sans-serif;color:#173247;max-width:640px;margin:auto;padding:24px"><div style="background:#1f3c50;color:#fff;padding:18px 22px;border-radius:12px"><h2 style="margin:0">DigiNiwas Admin Notification</h2></div><div style="padding:22px 4px"><h3>${escapeHtml(title)}</h3><p style="line-height:1.6">${escapeHtml(message || "")}</p><p style="color:#667b88;font-size:13px">Type: ${escapeHtml(type || "GENERAL")}<br/>Entity: ${escapeHtml(entityType || "-")} ${escapeHtml(entityId || "")}</p><a href="${escapeHtml(url)}" style="display:inline-block;background:#15966f;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:bold">Open in Admin Panel</a></div></div>`,
  });
};

export const notifyAdmins = async ({ title, message, type, actionUrl, entityType, entityId, data = {} }) => {
  try {
    const admins = await User.find({ role: "admin", isActive: { $ne: false } }).select("_id").lean();
    if (!admins.length) return [];

    const notifications = await notifyMany(
      admins.map((admin) => ({ userId: admin._id, userRole: "admin" })),
      { title, message, type, actionUrl, entityType, entityId, data },
    );

    // Email is a secondary channel: SMTP failures must never interrupt the business action.
    try {
      await sendAdminNotificationEmail({ title, message, type, actionUrl, entityType, entityId });
    } catch (emailError) {
      console.error("SEND ADMIN NOTIFICATION EMAIL ERROR:", emailError);
    }
    return notifications;
  } catch (error) {
    console.error("CREATE ADMIN NOTIFICATION ERROR:", error);
    return [];
  }
};
