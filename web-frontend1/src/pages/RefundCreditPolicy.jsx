import React from "react";
import LegalPage from "../components/common/LegalPage";

const sections = [{'title': 'Invalid buyer/contact lead', 'paragraphs': ['Partner may submit within 48 hours of unlock. DigiNiwas reviews and restores eligible credits if approved.']}, {'title': 'Duplicate/technical deduction', 'paragraphs': ['Report through Support with transaction details. DigiNiwas checks wallet/payment logs and corrects confirmed duplicate deductions.']}, {'title': 'Promotion declined by Partner', 'paragraphs': ['No Partner Credits deducted.']}, {'title': 'Promotion already active', 'paragraphs': ['Cancellation/refund depends on the promotion status and the terms shown before activation.']}, {'title': 'Purchased credits / app-store purchase', 'paragraphs': ['Refunds are subject to the platform/payment rules that applied to the purchase and applicable law.']}, {'title': 'Assigned-property closure fee dispute', 'paragraphs': ['Raise through Support; DigiNiwas reviews assignment acceptance, closure status and applicable disclosed fee.']}, {'title': 'Chargeback / payment reversal', 'paragraphs': ['DigiNiwas may adjust wallet credits or suspend paid features while the payment dispute is resolved.']}];

export default function RefundCreditPolicy() {
  return (
    <LegalPage
      eyebrow="DigiNiwas Credits"
      title="Refund & Credit Policy"
      description="Rules for invalid leads, wallet deductions, promotions, purchases, assigned-property fee disputes and payment reversals."
      effectiveDate="[DD Month YYYY]"
      sections={sections}
      footerLinks={[
        { label: "Partner & DigiNiwas Credit Terms", path: "/partner-terms" },
        { label: "Terms of Service", path: "/terms-service" },
        { label: "Support", path: "/support" },
      ]}
    />
  );
}
