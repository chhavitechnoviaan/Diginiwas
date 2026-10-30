import axios from "axios";

const MSG91_FLOW_URL = "https://control.msg91.com/api/v5/flow";

export const normalizeIndianMobile = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return digits;
  return digits;
};

export const sendMsg91FlowOtp = async ({ phone, otp, name = "User" }) => {
  const authkey = process.env.MSG91_AUTH_KEY;
  const flowId = process.env.MSG91_FLOW_ID;
  const otpVariable = process.env.MSG91_OTP_VARIABLE || "OTP";
  const sender = process.env.MSG91_SENDER_ID;

  if (!authkey || !flowId) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("MSG91 OTP is not configured. Set MSG91_AUTH_KEY and MSG91_FLOW_ID.");
    }
    console.log(`[DEV MSG91 OTP] ${normalizeIndianMobile(phone)}: ${otp}`);
    return { type: "development", message: "OTP logged because MSG91 is not configured" };
  }

  const recipient = {
    mobiles: normalizeIndianMobile(phone),
    [otpVariable]: String(otp),
    NAME: name || "User",
  };

  if (!recipient.mobiles || recipient.mobiles.length < 12) {
    throw new Error("Invalid Indian mobile number");
  }

  const response = await axios.post(
    MSG91_FLOW_URL,
    {
      flow_id: flowId,
      ...(sender ? { sender } : {}),
      recipients: [recipient],
    },
    {
      headers: {
        accept: "application/json",
        authkey,
        "content-type": "application/json",
      },
      timeout: 15000,
    },
  );

  if (response?.data?.type === "error") {
    throw new Error(response.data.message || "MSG91 rejected the OTP request");
  }

  return response.data;
};
