// import axios from "../api/axios";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { firebaseAuth } from "../config/firebase";

// const endpoint = (envKey, fallback) =>
//   import.meta.env[envKey] || fallback;

// const ENDPOINTS = {
//   firebaseLogin: endpoint(
//     "VITE_BUYER_FIREBASE_LOGIN_ENDPOINT",
//     "/v1/auths/firebase-phone-login"
//   ),
//   register: endpoint("VITE_BUYER_REGISTER_ENDPOINT", "/buyer/register"),
//   login: endpoint("VITE_BUYER_LOGIN_ENDPOINT", "/buyer/login"),
// };

// let confirmationResult = null;
// let recaptchaVerifier = null;
// let recaptchaRenderPromise = null;
// let recaptchaContainerId = "buyer-recaptcha-container";

// const FIREBASE_ERROR_MESSAGES = {
//   "auth/invalid-app-credential":
//     "Firebase could not validate the app/reCAPTCHA credentials. Enable Phone sign-in, test on your deployed authorized HTTPS domain (localhost is not supported for real web phone auth), and verify the Web API key restrictions. For local development, use a Firebase test phone number configured in the Console.",
//   "auth/unauthorized-domain":
//     "This website domain is not authorized for Firebase Phone Authentication. Add the current deployed domain in Firebase Console > Authentication > Settings > Authorized domains. For local development, use a configured Firebase test phone number.",
//   "auth/too-many-requests":
//     "Firebase temporarily blocked OTP requests for this device/number. Wait a while and try again.",
//   "auth/captcha-check-failed":
//     "Firebase reCAPTCHA verification failed. Refresh the page and request a new OTP.",
//   "auth/network-request-failed":
//     "Network request failed while contacting Firebase. Check your internet connection and Firebase configuration.",
// };

// function getFirebaseErrorMessage(error) {
//   const code = error?.code || "";
//   if (FIREBASE_ERROR_MESSAGES[code]) return FIREBASE_ERROR_MESSAGES[code];
//   if (code === "auth/invalid-phone-number") {
//     return "Please enter a valid Indian mobile number with 10 digits.";
//   }
//   return error?.message || "Unable to send OTP. Please try again.";
// }

// function resetRecaptcha() {
//   if (recaptchaVerifier) {
//     try {
//       recaptchaVerifier.clear();
//     } catch {
//       // A failed/expired verifier may already have been removed from the DOM.
//     }
//   }
//   recaptchaVerifier = null;
//   recaptchaRenderPromise = null;

//   // Firebase may leave the widget markup behind after a failed challenge.
//   const container = document.getElementById(recaptchaContainerId);
//   if (container) container.replaceChildren();
// }

// const getPayload = (response) => response?.data?.data ?? response?.data ?? {};

// const saveBuyerSession = (payload, response = null) => {
//   const data = payload || {};
//   const token =
//     response?.data?.token ||
//     data?.token ||
//     data?.accessToken ||
//     data?.jwt;

//   const user =
//     data?.user ||
//     data?.buyer ||
//     data?.profile ||
//     data;

//   if (token) {
//     localStorage.setItem("buyerToken", token);
//     localStorage.setItem("token", token);
//   }

//   if (user && typeof user === "object") {
//     localStorage.setItem("buyer", JSON.stringify(user));
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("role", "buyer");
//   }

//   return { token, user };
// };

// const getRecaptcha = async () => {
//   if (!recaptchaVerifier) {
//     const container = document.getElementById(recaptchaContainerId);
//     if (!container) {
//       throw new Error(
//         "Phone verification could not start because the reCAPTCHA container is missing. Close and reopen the login window."
//       );
//     }

//     // Use a visible challenge during troubleshooting. This avoids trying to
//     // run an invisible verifier against a plain div/button-less container.
//     // Firebase JS SDK v11 constructor signature: (auth, container, parameters).
//     recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, container, {
//       size: "normal",
//       "expired-callback": () => {
//         resetRecaptcha();
//       },
//     });
//   }

//   if (!recaptchaRenderPromise) {
//     recaptchaRenderPromise = recaptchaVerifier.render().catch((error) => {
//       resetRecaptcha();
//       throw error;
//     });
//   }

//   await recaptchaRenderPromise;
//   return recaptchaVerifier;
// };

// export async function sendBuyerOtp(phone) {
//   const digits = String(phone || "").replace(/\D/g, "");
//   if (digits.length !== 10) {
//     throw new Error("Please enter a valid 10-digit mobile number.");
//   }

//   const normalizedPhone = `+91${digits}`;
//   confirmationResult = null;

//   try {
//     const verifier = await getRecaptcha();
//     confirmationResult = await signInWithPhoneNumber(
//       firebaseAuth,
//       normalizedPhone,
//       verifier
//     );

//     return {
//       success: true,
//       provider: "firebase",
//       channel: "sms",
//     };
//   } catch (error) {
//     // Firebase reCAPTCHA tokens can become invalid after a failed send. Clear
//     // the verifier so the next attempt creates a fresh one instead of reusing it.
//     confirmationResult = null;
//     resetRecaptcha();
//     const friendlyError = new Error(getFirebaseErrorMessage(error));
//     friendlyError.code = error?.code;
//     friendlyError.cause = error;
//     throw friendlyError;
//   }
// }

// export async function resendBuyerOtp(phone) {
//   confirmationResult = null;
//   resetRecaptcha();
//   return sendBuyerOtp(phone);
// }

// export async function verifyBuyerOtp(otp) {
//   if (!confirmationResult) {
//     throw new Error("OTP session expired. Please request a new OTP.");
//   }

//   const credential = await confirmationResult.confirm(otp);
//   const idToken = await credential.user.getIdToken(true);

//   const response = await axios.post(ENDPOINTS.firebaseLogin, {
//     idToken,
//     role: "buyer",
//   });

//   const payload = getPayload(response);
//   const session = saveBuyerSession(payload, response);

//   confirmationResult = null;
//   return { ...payload, ...session };
// }

// export function clearBuyerOtpSession() {
//   confirmationResult = null;
//   resetRecaptcha();
// }

// export async function registerBuyer(payload) {
//   const response = await axios.post(ENDPOINTS.register, payload);
//   const data = getPayload(response);
//   const session = saveBuyerSession(data, response);
//   return { ...data, ...session };
// }

// export async function loginBuyer(payload) {
//   const response = await axios.post(ENDPOINTS.login, payload);
//   const data = getPayload(response);
//   const session = saveBuyerSession(data, response);
//   return { ...data, ...session };
// }


import axios from "../api/axios";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { firebaseAuth } from "../config/firebase";

const endpoint = (envKey, fallback) =>
  import.meta.env[envKey] || fallback;

const ENDPOINTS = {
firebaseAccountCheck: endpoint(
  "VITE_BUYER_FIREBASE_ACCOUNT_CHECK_ENDPOINT",
  "/v1/auths/firebase-phone-login/check-account"
),
  firebaseLogin: endpoint(
    "VITE_BUYER_FIREBASE_LOGIN_ENDPOINT",
    "/v1/auths/firebase-phone-login"
  ),
  register: endpoint("VITE_BUYER_REGISTER_ENDPOINT", "/buyer/register"),
  login: endpoint("VITE_BUYER_LOGIN_ENDPOINT", "/buyer/login"),
};

let confirmationResult = null;
let recaptchaVerifier = null;
let recaptchaRenderPromise = null;
let recaptchaContainerId = "buyer-recaptcha-container";

const FIREBASE_ERROR_MESSAGES = {
  "auth/invalid-app-credential":
    "Firebase could not validate the app/reCAPTCHA credentials. Enable Phone sign-in, test on your deployed authorized HTTPS domain (localhost is not supported for real web phone auth), and verify the Web API key restrictions. For local development, use a Firebase test phone number configured in the Console.",
  "auth/unauthorized-domain":
    "This website domain is not authorized for Firebase Phone Authentication. Add the current deployed domain in Firebase Console > Authentication > Settings > Authorized domains. For local development, use a configured Firebase test phone number.",
  "auth/too-many-requests":
    "Firebase temporarily blocked OTP requests for this device/number. Wait a while and try again.",
  "auth/captcha-check-failed":
    "Firebase reCAPTCHA verification failed. Refresh the page and request a new OTP.",
  "auth/network-request-failed":
    "Network request failed while contacting Firebase. Check your internet connection and Firebase configuration.",
};

function getFirebaseErrorMessage(error) {
  const code = error?.code || "";
  if (FIREBASE_ERROR_MESSAGES[code]) return FIREBASE_ERROR_MESSAGES[code];
  if (code === "auth/invalid-phone-number") {
    return "Please enter a valid Indian mobile number with 10 digits.";
  }
  return error?.message || "Unable to send OTP. Please try again.";
}

function resetRecaptcha() {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch {
      // A failed/expired verifier may already have been removed from the DOM.
    }
  }
  recaptchaVerifier = null;
  recaptchaRenderPromise = null;

  // Firebase may leave the widget markup behind after a failed challenge.
  const container = document.getElementById(recaptchaContainerId);
  if (container) container.replaceChildren();
}

const getPayload = (response) => response?.data?.data ?? response?.data ?? {};

/**
 * Check the buyer account before sending an OTP and again immediately before
 * calling the Firebase login endpoint. A missing/inactive account must never
 * proceed to /firebase-phone-login.
 */
async function ensureBuyerAccountExists(phone) {
  // let digits = String(phone || "").replace(/\\D/g, "");
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  if (digits.length !== 10) {
    throw new Error("Please enter a valid 10-digit mobile number.");
  }

  try {
    const response = await axios.post(ENDPOINTS.firebaseAccountCheck, {
      phone: `+91${digits}`,
      role: "buyer",
    });
    const result = getPayload(response);

    if (result.accountExists !== true) {
      const error = new Error(
        result.message || "No buyer account exists with this number. Please create an account first."
      );
      error.code = result.code || "ACCOUNT_NOT_FOUND";
      throw error;
    }

    if (result.canLogin === false) {
      throw new Error(
        result.message || `Your buyer account is not active${result.accountStatus ? ` (${result.accountStatus})` : ""}. Please contact support.`
      );
    }

    return result;
  } catch (error) {
    if (error?.response?.status === 404 ||
        error?.response?.data?.code === "ACCOUNT_NOT_FOUND") {
      throw new Error(
        error?.response?.data?.message ||
        "No buyer account exists with this number. Please create an account first."
      );
    }
    throw error;
  }
}

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

const getRecaptcha = async () => {
  // Firebase supports disabling the reCAPTCHA challenge ONLY for fictional
  // phone numbers configured in Firebase Console > Authentication > Phone.
  // Keep this disabled by default and never enable it in production.
  const localPhoneAuthTestMode =
    import.meta.env.DEV &&
    String(import.meta.env.VITE_FIREBASE_PHONE_AUTH_TEST_MODE || "false") === "true";

  if (localPhoneAuthTestMode) {
    firebaseAuth.settings.appVerificationDisabledForTesting = true;
  }

  if (!recaptchaVerifier) {
    const container = document.getElementById(recaptchaContainerId);
    if (!container) {
      throw new Error(
        "Phone verification could not start because the reCAPTCHA container is missing. Close and reopen the login window."
      );
    }

    // Use a visible challenge during troubleshooting. This avoids trying to
    // run an invisible verifier against a plain div/button-less container.
    // Firebase JS SDK v11 constructor signature: (auth, container, parameters).
    recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, container, {
      size: "normal",
      "expired-callback": () => {
        resetRecaptcha();
      },
    });
  }

  if (!recaptchaRenderPromise) {
    recaptchaRenderPromise = recaptchaVerifier.render().catch((error) => {
      resetRecaptcha();
      throw error;
    });
  }

  await recaptchaRenderPromise;
  return recaptchaVerifier;
};

// export async function sendBuyerOtp(phone) {
//   const digits = String(phone || "").replace(/\D/g, "");
//   if (digits.length !== 10) {
//     throw new Error("Please enter a valid 10-digit mobile number.");
//   }

//   const normalizedPhone = `+91${digits}`;
//   confirmationResult = null;

//   // Do not send an OTP to a phone number that is not registered as a buyer.
//   await ensureBuyerAccountExists(normalizedPhone);

//   try {
//     const verifier = await getRecaptcha();
//     confirmationResult = await signInWithPhoneNumber(
//       firebaseAuth,
//       normalizedPhone,
//       verifier
//     );

//     return {
//       success: true,
//       provider: "firebase",
//       channel: "sms",
//     };
//   } catch (error) {
//     // Firebase reCAPTCHA tokens can become invalid after a failed send. Clear
//     // the verifier so the next attempt creates a fresh one instead of reusing it.
//     confirmationResult = null;
//     resetRecaptcha();
//     const friendlyError = new Error(getFirebaseErrorMessage(error));
//     friendlyError.code = error?.code;
//     friendlyError.cause = error;
//     throw friendlyError;
//   }
// }


export async function sendBuyerOtp(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (digits.length !== 10) {
    throw new Error("Please enter a valid 10-digit mobile number.");
  }

  const normalizedPhone = `+91${digits}`;

  confirmationResult = null;

  console.log("[Buyer OTP] Checking account...");

  await ensureBuyerAccountExists(normalizedPhone);

  console.log("[Buyer OTP] Account check passed. Loading reCAPTCHA...");

  try {
    const verifier = await getRecaptcha();

    console.log("[Buyer OTP] reCAPTCHA ready. Requesting Firebase SMS...");

    confirmationResult = await signInWithPhoneNumber(
      firebaseAuth,
      normalizedPhone,
      verifier
    );

    console.log("[Buyer OTP] Firebase SMS request succeeded.");

    return {
      success: true,
      provider: "firebase",
      channel: "sms",
    };
  } catch (error) {
    console.error("[Buyer OTP] Firebase error:", error);

    confirmationResult = null;
    resetRecaptcha();

    const friendlyError = new Error(getFirebaseErrorMessage(error));
    friendlyError.code = error?.code;
    friendlyError.cause = error;

    throw friendlyError;
  }
}


export async function resendBuyerOtp(phone) {
  confirmationResult = null;
  resetRecaptcha();
  return sendBuyerOtp(phone);
}

export async function verifyBuyerOtp(otp) {
  if (!confirmationResult) {
    throw new Error("OTP session expired. Please request a new OTP.");
  }

  const credential = await confirmationResult.confirm(otp);
  const idToken = await credential.user.getIdToken(true);

  // Re-check immediately before login. If the account is missing/inactive,
  // never call the Firebase login endpoint.
  await ensureBuyerAccountExists(credential.user.phoneNumber);

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
  resetRecaptcha();
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
