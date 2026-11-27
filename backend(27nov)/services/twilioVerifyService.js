// import axios from "axios";

// const TWILIO_MESSAGES_BASE = "https://api.twilio.com/2010-04-01/Accounts";

// export const normalizePhoneNumber = (phone) => {
//   const raw = String(phone || "").trim();
//   if (!raw) return "";
//   if (raw.startsWith("+")) return raw.replace(/[^\d+]/g, "");

//   const digits = raw.replace(/\D/g, "");
//   if (digits.length === 10) return `+91${digits}`;
//   if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
//   return `+${digits}`;
// };

// const getConfig = () => {
//   const accountSid = process.env.TWILIO_ACCOUNT_SID;
//   const authToken = process.env.TWILIO_AUTH_TOKEN;
//   const from = process.env.TWILIO_PHONE_NUMBER;
//   const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

//   if (!accountSid || !authToken || (!from && !messagingServiceSid)) {
//     throw new Error(
//       "Twilio SMS is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_PHONE_NUMBER (or TWILIO_MESSAGING_SERVICE_SID)."
//     );
//   }

//   return { accountSid, authToken, from, messagingServiceSid };
// };

// const twilioRequest = async ({ to, body }) => {
//   const { accountSid, authToken, from, messagingServiceSid } = getConfig();
//   const params = new URLSearchParams({ To: to, Body: body });

//   if (messagingServiceSid) {
//     params.set("MessagingServiceSid", messagingServiceSid);
//   } else {
//     params.set("From", from);
//   }

//   const response = await axios.post(
//     `${TWILIO_MESSAGES_BASE}/${accountSid}/Messages.json`,
//     params.toString(),
//     {
//       auth: { username: accountSid, password: authToken },
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       timeout: 15000,
//     }
//   );

//   return response.data;
// };

// const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

// export const sendLoginOtp = async (phone) => {
//   const to = normalizePhoneNumber(phone);

//   if (!/^\+\d{8,15}$/.test(to)) {
//     throw new Error("Invalid phone number. Use a valid mobile number.");
//   }

//   const otp = generateOtp();

//   await twilioRequest({
//     to,
//     body: `Your DigiNiwas login OTP is ${otp}. It is valid for 10 minutes. Do not share this OTP with anyone.`,
//   });

//   return { otp, phone: to };
// };
import axios from "axios";

const VERIFY_BASE_URL = "https://verify.twilio.com/v2/Services";

export const normalizePhoneNumber = (phone) => {
  const raw = String(phone || "").trim();

  if (!raw) return "";

  if (raw.startsWith("+")) {
    return raw.replace(/[^\d+]/g, "");
  }

  const digits = raw.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.startsWith("91") && digits.length === 12) {
    return `+${digits}`;
  }

  return `+${digits}`;
};

const getConfig = () => {
  
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !serviceSid) {
    throw new Error(
      "Twilio Verify is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_VERIFY_SERVICE_SID."
    );
  }

  return {
    accountSid,
    authToken,
    serviceSid,
  };
};

/**
 * SEND OTP
 */
export const sendLoginOtp = async (phone) => {
  const to = normalizePhoneNumber(phone);

  if (!/^\+\d{8,15}$/.test(to)) {
    throw new Error("Invalid phone number. Use a valid mobile number.");
  }

  const {
    accountSid,
    authToken,
    serviceSid,
  } = getConfig();

  const params = new URLSearchParams();

  params.append("To", to);
  params.append("Channel", "sms");

  try {
    const response = await axios.post(
      `${VERIFY_BASE_URL}/${serviceSid}/Verifications`,
      params.toString(),
      {
        auth: {
          username: accountSid,
          password: authToken,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 15000,
      }
    );

    return {
      success: true,
      phone: to,
      status: response.data.status,
      verificationSid: response.data.sid,
      channel: response.data.channel,
    };
  } catch (error) {
    console.error(
      "Twilio Verify Send Error:",
      error.response?.data || error.message
    );

    const twilioMessage =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message;

    throw new Error(`Twilio OTP send failed: ${twilioMessage}`);
  }
};

/**
 * VERIFY OTP
 */
export const verifyLoginOtp = async (phone, otp) => {
  const to = normalizePhoneNumber(phone);

  if (!/^\+\d{8,15}$/.test(to)) {
    throw new Error("Invalid phone number.");
  }

  if (!otp || !/^\d{4,10}$/.test(String(otp).trim())) {
    throw new Error("Invalid OTP format.");
  }

  const {
    accountSid,
    authToken,
    serviceSid,
  } = getConfig();

  const params = new URLSearchParams();

  params.append("To", to);
  params.append("Code", String(otp).trim());

  try {
    const response = await axios.post(
      `${VERIFY_BASE_URL}/${serviceSid}/VerificationCheck`,
      params.toString(),
      {
        auth: {
          username: accountSid,
          password: authToken,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 15000,
      }
    );

    return {
      success: response.data.status === "approved",
      status: response.data.status,
      phone: to,
    };
  } catch (error) {
    console.error(
      "Twilio Verify Check Error:",
      error.response?.data || error.message
    );

    const twilioMessage =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message;

    throw new Error(`Twilio OTP verification failed: ${twilioMessage}`);
  }
};