import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      loanAmount,
      employment,
      monthlyIncome,
      propertyTitle,
      propertyId,
      propertyLocation,
      propertyUrl,
    } = req.body || {};

    if (!fullName?.trim() || !mobile?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name and mobile number are required.",
      });
    }

    const cleanMobile = String(mobile).replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number.",
      });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured on the server.",
      });
    }

    const recipient = process.env.LOAN_ENQUIRY_TO || "diginiwas@gmail.com";
    const subject = `New Home Loan Enquiry - ${fullName.trim()}`;

    const rows = [
      ["Full Name", fullName.trim()],
      ["Mobile Number", cleanMobile],
      ["Loan Amount", loanAmount?.trim() || "Not provided"],
      ["Employment", employment?.trim() || "Not provided"],
      ["Monthly Income", monthlyIncome?.trim() || "Not provided"],
      ["Property", propertyTitle?.trim() || "Not provided"],
      ["Property ID", propertyId?.trim() || "Not provided"],
      ["Property Location", propertyLocation?.trim() || "Not provided"],
    ];

    const htmlRows = rows
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5ecef;background:#f7fbfa;font-weight:700;color:#102e46;width:190px;">${escapeHtml(label)}</td>
            <td style="padding:10px 12px;border:1px solid #e5ecef;color:#334e5c;">${escapeHtml(value)}</td>
          </tr>`,
      )
      .join("");

    await transporter.sendMail({
      from: process.env.MAIL_FROM || `DigiNiwas <${process.env.SMTP_USER}>`,
      to: recipient,
      subject,
      text: [
        "New Home Loan Enquiry",
        ...rows.map(([label, value]) => `${label}: ${value}`),
        propertyUrl ? `Property URL: ${propertyUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#334e5c;">
          <div style="background:#102e46;padding:20px 24px;border-radius:12px 12px 0 0;">
            <h2 style="margin:0;color:#ffffff;font-size:20px;">New Home Loan Enquiry</h2>
            <p style="margin:6px 0 0;color:#c9e9df;font-size:13px;">A visitor has requested home loan assistance on DigiNiwas.</p>
          </div>
          <div style="padding:20px 0;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">${htmlRows}</table>
            ${propertyUrl ? `<p style="margin:18px 0 0;"><strong>Property URL:</strong> <a href="${escapeHtml(propertyUrl)}">${escapeHtml(propertyUrl)}</a></p>` : ""}
          </div>
          <p style="font-size:12px;color:#7c8d95;">This enquiry was submitted through the DigiNiwas website.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Loan enquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Loan enquiry email error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send the loan enquiry right now. Please try again.",
    });
  }
});

export default router;
