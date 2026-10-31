import ServicesPage from "../../models/ServicesPage.js";

export const DEFAULT_SERVICES_PAGE = {
  eyebrow: "EVERYTHING YOU NEED",
  heading: "Everything You Need.",
  subheading: "All Under One Roof.",
  description: "Trusted support for every step of your property journey.",
  services: [
    {
      title: "Home Loan Assistance", slug: "home-loan-assistance",
      shortDescription: "Find the right home loan with guidance through the financing journey.",
      description: "Buying a home is a major milestone. DigiNiwas helps you understand your options, prepare documentation and connect with suitable lending partners. Our team can guide you through the application journey so you can make informed decisions with confidence.",
      features: ["Understand loan eligibility and documentation", "Connect with lending partners", "Get guidance through the application process"],
      process: ["Share your basic requirements", "Review suitable loan options", "Proceed with the lender of your choice"],
      benefits: ["Clear next steps", "Guidance through paperwork", "Support built around your needs"], icon: "wallet", ctaText: "Enquire About Home Loans", ctaLink: "/niwas-ai",
    },
    {
      title: "Property Photography & Videography", slug: "property-photography-videography",
      shortDescription: "Showcase your property with professional-quality photos and video tours.",
      description: "Help buyers and tenants understand your property before they visit. Photography and videography highlight the layout, natural light, amenities and details that make a listing stand out.",
      features: ["Property photos and visual highlights", "Video walkthroughs and reels", "Visual assets for online listings"],
      process: ["Tell us about your property", "Plan the shoot and key highlights", "Receive visuals ready to share"],
      benefits: ["More compelling listings", "A clearer view of the property", "Consistent presentation"], icon: "camera", ctaText: "Request a Shoot", ctaLink: "/contact",
    },
    {
      title: "Digital Property Promotion", slug: "digital-property-promotion",
      shortDescription: "Give your property listing more visibility with digital promotion.",
      description: "Present your property to a wider online audience through thoughtful digital promotion. We help you prepare a stronger listing and explore suitable promotional opportunities to attract relevant enquiries.",
      features: ["Listing presentation guidance", "Digital and social promotion options", "Visibility-focused campaign planning"],
      process: ["Share listing details", "Choose a promotion plan", "Track enquiries and optimise"],
      benefits: ["Stronger online presence", "Better listing presentation", "Promotion aligned to your goals"], icon: "megaphone", ctaText: "Explore Promotion", ctaLink: "/contact",
    },
    {
      title: "Property Management", slug: "property-management",
      shortDescription: "Organise rental coordination and property-related tasks in one place.",
      description: "Property management support is designed to make ownership easier, from coordinating tenant-related tasks to keeping property information organised. Availability may vary by location.",
      features: ["Rental coordination support", "Maintenance request coordination", "Organised property information"],
      process: ["Discuss your property needs", "Agree on the support required", "Coordinate the next steps"],
      benefits: ["Less day-to-day friction", "Organised follow-up", "Structured rental journey"], icon: "building", ctaText: "Discuss Your Property", ctaLink: "/contact",
    },
    {
      title: "Retired Government Officers Network", slug: "retired-government-officers-network",
      shortDescription: "Build a meaningful second career as a local property partner.",
      description: "DigiNiwas welcomes experienced people who understand their local communities and want to help people navigate property journeys through local knowledge and relevant connections.",
      features: ["Local property assistance", "Partner onboarding guidance", "Community-focused opportunities"],
      process: ["Register your interest", "Connect with our team", "Complete onboarding steps"],
      benefits: ["Purposeful engagement", "Use your local knowledge", "Grow your network"], icon: "users", ctaText: "Become a Partner", ctaLink: "/agent-corner",
    },
    {
      title: "Documentation & Verification Support", slug: "documentation-verification-support",
      shortDescription: "Get help understanding property paperwork and verification steps.",
      description: "Property transactions involve documents and checks. DigiNiwas helps you understand common documentation requirements and organise next steps. This informational support does not replace independent legal advice or official verification.",
      features: ["Documentation checklist guidance", "Help organising property records", "Direction to verification steps"],
      process: ["Tell us about the transaction", "Review the relevant checklist", "Follow up on outstanding documents"],
      benefits: ["Organised paperwork", "Awareness of next steps", "Less avoidable confusion"], icon: "file", ctaText: "Get Documentation Help", ctaLink: "/contact",
    },
  ],
};

async function getOrCreatePage() {
  let page = await ServicesPage.findOne();
  if (!page) page = await ServicesPage.create(DEFAULT_SERVICES_PAGE);
  return page;
}

export const getPublicServicesPage = async (_req, res) => {
  try {
    const page = await getOrCreatePage();
    res.json({ success: true, ...page.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminServicesPage = async (_req, res) => {
  try {
    const page = await getOrCreatePage();
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateServicesPage = async (req, res) => {
  try {
    const body = req.body || {};
    if (!Array.isArray(body.services)) {
      return res.status(400).json({ success: false, message: "services must be an array" });
    }
    let page = await ServicesPage.findOne();
    if (!page) page = new ServicesPage(DEFAULT_SERVICES_PAGE);
    page.eyebrow = body.eyebrow ?? page.eyebrow;
    page.heading = body.heading ?? page.heading;
    page.subheading = body.subheading ?? page.subheading;
    page.description = body.description ?? page.description;
    page.services = body.services.map((item) => ({
      ...item,
      features: Array.isArray(item.features) ? item.features : [],
      process: Array.isArray(item.process) ? item.process : [],
      benefits: Array.isArray(item.benefits) ? item.benefits : [],
      imageTags: Array.isArray(item.imageTags) ? item.imageTags : [],
      detailSections: Array.isArray(item.detailSections) ? item.detailSections : [],
      faqs: Array.isArray(item.faqs) ? item.faqs.filter((faq) => faq?.question?.trim() && faq?.answer?.trim()) : [],
    }));
    await page.save();
    res.json({ success: true, message: "Services page content saved", data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadServiceImage = async (req, res) => {
  try {
    if (!req.file?.path) return res.status(400).json({ success: false, message: "Choose a valid image file to upload." });
    res.status(201).json({ success: true, message: "Service image uploaded.", url: req.file.path, publicId: req.file.filename || "" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
