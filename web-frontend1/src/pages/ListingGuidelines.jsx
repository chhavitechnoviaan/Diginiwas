import React from "react";
import LegalPage from "../components/common/LegalPage";

const sections = [{'title': 'Authorised listings', 'paragraphs': ['Only list property you are authorised to market or manage.']}, {'title': 'Accurate listing information', 'paragraphs': ['Keep price, availability, location, area, photos, amenities and transaction type accurate.']}, {'title': 'Documents and photographs', 'paragraphs': ['Do not upload fake/forged documents or misleading photographs.']}, {'title': 'Duplicate listings', 'paragraphs': ['Do not create duplicate listings intended to manipulate search visibility.']}, {'title': 'Impersonation', 'paragraphs': ['Do not impersonate a Buyer, Seller, Partner, developer, government authority or DigiNiwas representative.']}, {'title': 'Community conduct', 'paragraphs': ['Do not publish illegal, discriminatory, abusive, threatening or privacy-invasive content.']}, {'title': 'Data, spam and platform controls', 'paragraphs': ['Do not use DigiNiwas to scrape personal data, spam users or circumvent contact/credit controls.']}, {'title': 'Reporting', 'paragraphs': ['Report unavailable, fraudulent or materially inaccurate listings through the in-app Report Property flow.']}, {'title': 'Moderation', 'paragraphs': ['DigiNiwas may review, reject, suspend or remove listings/accounts and may retain moderation records.']}];

export default function ListingGuidelines() {
  return (
    <LegalPage
      eyebrow="DigiNiwas Community"
      title="Listing & Community Guidelines"
      description="Rules for accurate property listings, respectful community participation, reporting and platform moderation."
      effectiveDate="[DD Month YYYY]"
      sections={sections}
      footerLinks={[
        { label: "Terms of Service", path: "/terms-service" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Refund & Credit Policy", path: "/refund-policy" },
      ]}
    />
  );
}
