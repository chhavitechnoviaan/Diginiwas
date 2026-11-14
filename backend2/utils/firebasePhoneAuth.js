import { firebaseAdminAuth } from "../config_firebaseAdmin.js";

export const normalizePhone = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return `+${digits}`;
};

export const phoneCandidates = (value) => {
  const normalized = normalizePhone(value);
  const digits = normalized.replace(/\D/g, "");
  const local = digits.startsWith("91") ? digits.slice(2) : digits;
  return [...new Set([String(value || "").trim(), normalized, digits, local, `+91${local}`].filter(Boolean))];
};

export const verifyFirebasePhoneIdToken = async (idToken) => {
  if (!idToken) {
    const error = new Error("Firebase ID token is required.");
    error.statusCode = 400;
    throw error;
  }
  const decoded = await firebaseAdminAuth().verifyIdToken(idToken, true);
  const phone = normalizePhone(decoded.phone_number);
  if (!phone) {
    const error = new Error("Firebase token does not contain a verified phone number.");
    error.statusCode = 400;
    throw error;
  }
  return { decoded, phone, uid: decoded.uid };
};

export const assertSamePhone = (expected, verified) => {
  if (normalizePhone(expected) !== normalizePhone(verified)) {
    const error = new Error("Verified Firebase phone number does not match the application phone number.");
    error.statusCode = 400;
    throw error;
  }
};
