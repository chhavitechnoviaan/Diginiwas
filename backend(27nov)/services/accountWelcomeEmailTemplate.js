// Shared, credential-free welcome email for approved DigiNiwas accounts.
// Never include IDs, email login identifiers, temporary passwords, or OTPs.
const escapeHtml = (value = "") => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

export const makeAccountWelcomeEmail = ({ name, role }) => {
  const kind = String(role).toLowerCase() === "partner" ? "Partner" : "Seller";
  const safeName = escapeHtml(name || `${kind} Member`);
  const firstMessage = kind === "Seller"
    ? "Your DigiNiwas Seller account is now active after successful email and phone verification."
    : "Your DigiNiwas Partner account has been approved and is now active.";
  const safeFirstMessage = escapeHtml(firstMessage);
  const actionMessage = kind === "Seller"
    ? "You can now explore your dashboard, manage your properties and connect with genuine opportunities on DigiNiwas."
    : "You can now access your Partner dashboard, manage property opportunities and grow your real-estate network with DigiNiwas.";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Welcome to DigiNiwas</title></head>
<body style="margin:0;padding:26px 12px;background:#f2f7f8;font-family:Arial,Helvetica,sans-serif;color:#19374a;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;margin:0 auto;background:#fff;border:1px solid #dce8e8;border-radius:18px;overflow:hidden;">
    <tr><td style="padding:34px 36px;background:#1d3e51;color:#fff;">
      <div style="color:#49dbac;font-size:12px;letter-spacing:3px;font-weight:700;">DIGINIWAS</div>
      <h1 style="font-size:28px;line-height:1.2;margin:14px 0 8px;color:#fff;">Welcome to DigiNiwas!</h1>
      <p style="margin:0;color:#d6e8e9;font-size:15px;line-height:1.6;">Your ${kind} journey starts here.</p>
    </td></tr>
    <tr><td style="padding:34px 36px;">
      <p style="margin:0 0 18px;font-size:17px;font-weight:700;">Hi ${safeName},</p>
      <p style="margin:0 0 15px;font-size:15px;line-height:1.8;">${safeFirstMessage}</p>
      <p style="margin:0 0 26px;font-size:15px;line-height:1.8;">${escapeHtml(actionMessage)}</p>
      <p style="margin:26px 0 0;color:#5d7080;font-size:13px;line-height:1.7;">Your security matters. DigiNiwas will never ask you to share your password or OTP.</p>
      <p style="margin:22px 0 0;font-size:15px;line-height:1.6;">Warm regards,<br /><strong>Team DigiNiwas</strong></p>
    </td></tr>
    <tr><td style="padding:19px 36px;background:#f4f8f9;color:#667b87;font-size:12px;text-align:center;line-height:1.6;">DigiNiwas</td></tr>
  </table>
</body>
</html>`.trim();

  const text = [
    `Hi ${name || `${kind} Member`},`,
    "",
    firstMessage,
    "",
    actionMessage,
    "",
    "DigiNiwas will never ask you to share your password or OTP.",
    "",
    "Warm regards,",
    "Team DigiNiwas"
  ].join("\n");

  return { subject: `Welcome to DigiNiwas — Your ${kind} account is active`, html, text };
};
