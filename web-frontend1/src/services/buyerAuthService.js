import axios from "../api/axios";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { firebaseAuth } from "../config/firebase";

const endpoint = (envKey, fallback) =>
  import.meta.env[envKey] || fallback;

const ENDPOINTS = {
  firebaseLogin: endpoint(
    "VITE_BUYER_FIREBASE_LOGIN_ENDPOINT",
    "/auths/firebase-phone-login"
  ),
  register: endpoint("VITE_BUYER_REGISTER_ENDPOINT", "/buyer/register"),
  login: endpoint("VITE_BUYER_LOGIN_ENDPOINT", "/buyer/login"),
};

let confirmationResult = null;
let recaptchaVerifier = null;

const getPayload = (response) => response?.data?.data ?? response?.data ?? {};

const saveBuyerSession = (payload, response = null) => {
  const data = payload || {};
  const token =
    response?.data?.token ||
    data?.token ||
    data?.accessToken ||
    data?.jwt;

  const user =
    data?.user ||
    data?.buyer ||
    data?.profile ||
    data;

  if (token) {
    localStorage.setItem("buyerToken", token);
    localStorage.setItem("token", token);
  }

  if (user && typeof user === "object") {
    localStorage.setItem("buyer", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", "buyer");
  }

  return { token, user };
};

const getRecaptcha = () => {
  if (recaptchaVerifier) return recaptchaVerifier;

  recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, "buyer-recaptcha-container", {
    size: "invisible",
    callback: () => {},
    "expired-callback": () => {
      recaptchaVerifier = null;
    },
  });

  return recaptchaVerifier;
};

export async function sendBuyerOtp(phone) {
  const normalizedPhone = phone.startsWith("+")
    ? phone
    : `+91${phone}`;

  const verifier = getRecaptcha();
  confirmationResult = await signInWithPhoneNumber(
    firebaseAuth,
    normalizedPhone,
    verifier
  );

  return {
    success: true,
    provider: "firebase",
    channel: "sms",
  };
}

export async function resendBuyerOtp(phone) {
  confirmationResult = null;
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch {}
    recaptchaVerifier = null;
  }
  return sendBuyerOtp(phone);
}

export async function verifyBuyerOtp(otp) {
  if (!confirmationResult) {
    throw new Error("OTP session expired. Please request a new OTP.");
  }

  const credential = await confirmationResult.confirm(otp);
  const idToken = await credential.user.getIdToken(true);

  const response = await axios.post(ENDPOINTS.firebaseLogin, {
    idToken,
    role: "buyer",
  });

  const payload = getPayload(response);
  const session = saveBuyerSession(payload, response);

  confirmationResult = null;
  return { ...payload, ...session };
}

export function clearBuyerOtpSession() {
  confirmationResult = null;
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch {}
    recaptchaVerifier = null;
  }
}

export async function registerBuyer(payload) {
  const response = await axios.post(ENDPOINTS.register, payload);
  const data = getPayload(response);
  const session = saveBuyerSession(data, response);
  return { ...data, ...session };
}

export async function loginBuyer(payload) {
  const response = await axios.post(ENDPOINTS.login, payload);
  const data = getPayload(response);
  const session = saveBuyerSession(data, response);
  return { ...data, ...session };
}
