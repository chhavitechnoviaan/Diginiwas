import express from "express";
import multer from "multer";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/cms/propertyRoutes.js";
import heroSectionRoutes from "./routes/cms/heroSectionRoutes.js";
import roundSectionRoutes from "./routes/cms/roundSectionRoutes.js";
import testimonialRoutes from "./routes/cms/testimonialRoutes.js";
import agentCornerRoutes from "./routes/cms/agentCornerRoutes.js";
import agentNetworkRoutes from "./routes/cms/agentNetworkRoutes.js";
import networkDensityRoutes from "./routes/cms/networkDensityRoutes.js";
import planSectionRoutes from "./routes/cms/planSectionRoutes.js";
import aboutStatsRoutes from "./routes/cms/aboutStatsRoutes.js";
import aboutGenesisRoutes from "./routes/cms/aboutGenesisRoutes.js";
import aboutMissionVisionRoutes from "./routes/cms/aboutMissionVisionRoutes.js";
import aboutVisionaryRoutes from "./routes/cms/aboutVisionaryRoutes.js";
import authRoutes from "./routes/cms/authRoutes.js";
import platformRoutes from "./routes/cms/Platformroutes.js";
import loginauthRoutes from "./routes/authRoutes.js";
import buyerRoutes from "./routes/buyer/buyerRoutes.js";
import sellerRoutes from "./routes/Seller/sellerRoutes.js";
import partnerRoutes from "./routes/Agent/partnerRoutes.js";
import newpropertyRoutes from "./routes/Property/propertyRoutes.js";
import rentalPropertyRoutes from "./routes/Property/rentalPropertyRoutes.js";
import commercialRentalPropertyRoutes from "./routes/Property/commercialRentalPropertyRoutes.js";
import residentialSaleRoutes from "./routes/Property/residentialSaleRoutes.js";
import commercialSaleRoutes from "./routes/Property/commercialSaleRoutes.js";
// const residentialRoutes = require('./routes/residentialSaleRoutes');
// const commercialRoutes = require('./routes/commercialSaleRoutes');

import getVisitsByPartner from "./routes/Visit/visitRoutes.js";
import leadRoutes from "./routes/Lead/leadroutes.js";
import savedPropertyRoutes from "./routes/buyer/savedPropertyRoutes.js";
import creditRoutes from "./routes/Credit/creditRoutes.js";
import promotionRoutes from "./routes/Promotion/promotionRoutes.js";
import propertyPublishingRoutes from "./routes/Property/propertyPublishingRoutes.js";
import boostDashboardRoutes from "./routes/Promotion/boostDashboardRoutes.js";
import creditSettingRoutes from "./routes/Credit/creditSettingRoutes.js";
import loanEnquiryRoutes from "./routes/loanEnquiryRoutes.js";

import partnerApplicationRoutes from "./routes/Agent/partnerApplicationRoutes.js";
import teamPartnerRoutes from "./routes/Agent/teamPartnerRoutes.js";
import partnerAuthRoutes from "./routes/Auth/partnerAuthRoutes.js";
import publicAppV1Routes from "./routes/V1/publicAppRoutes.js";
import blogRoutes from "./routes/cms/blogRoutes.js";
import servicesPageRoutes from "./routes/cms/servicesPageRoutes.js";
import propertyReviewRoutes from "./routes/propertyReviewRoutes.js";
import advertisementRoutes from "./routes/advertisementRoutes.js";
import adminDashboardRoutes from "./routes/Admin/dashboardRoutes.js";
import adminNotificationRoutes from "./routes/Admin/notificationRoutes.js";
import adminProfileRoutes from "./routes/Admin/profileRoutes.js";
import adminUsersRoutes from "./routes/Admin/usersRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import passwordResetRoutes from "./routes/passwordResetRoutes.js";
import adminAccountRoutes from "./routes/Admin/accountRoutes.js";
import seoRoutes from "./routes/seoRoutes.js";
import { sitemap, robots } from "./controllers/seoController.js";
import {
  apiAccessControl,
  legacyApiHeaders,
  versionedApiHeaders,
} from "./middleware/apiAccessControl.js";

connectDB();

const app = express();

// SEO endpoints are public so search engines can resolve metadata, robots and sitemaps.
app.use("/seo", seoRoutes);
app.get("/sitemap.xml", sitemap);
app.get("/robots.txt", robots);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://diginiwas.com",
      "https://www.diginiwas.com",
      "https://admin.diginiwas.com",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mountApiRoutes = (basePath) => {
  // Keep specific mobile/discovery endpoints before dynamic property /:id.
  app.use(basePath, publicAppV1Routes);
  app.use(`${basePath}/seo`, seoRoutes);

  // Public website properties always come from NewProperty.
  app.use(`${basePath}/properties`, newpropertyRoutes);
  app.use(`${basePath}/cms/properties`, propertyRoutes);
  app.use(`${basePath}/cms/hero`, heroSectionRoutes);
  app.use(`${basePath}/cms/round-section`, roundSectionRoutes);
  app.use(`${basePath}/cms/testimonials`, testimonialRoutes);
  app.use(`${basePath}/cms/agentcorner`, agentCornerRoutes);
  app.use(`${basePath}/cms/plan-section`, planSectionRoutes);
  app.use(`${basePath}/cms/agent-network`, agentNetworkRoutes);
  app.use(`${basePath}/cms/network-density`, networkDensityRoutes);
  app.use(`${basePath}/cms/about-stats`, aboutStatsRoutes);
  app.use(`${basePath}/cms/about-genesis`, aboutGenesisRoutes);
  app.use(`${basePath}/cms/about-mission-vision`, aboutMissionVisionRoutes);
  app.use(`${basePath}/cms/about-visionaries`, aboutVisionaryRoutes);
  app.use(`${basePath}/auth`, authRoutes);
  app.use(basePath, platformRoutes);
  app.use(`${basePath}/auths`, loginauthRoutes);
  app.use(`${basePath}/buyers`, buyerRoutes);
  app.use(`${basePath}/sellers`, sellerRoutes);
  app.use(`${basePath}/partners`, partnerRoutes);
  app.use(`${basePath}/newproperties`, newpropertyRoutes);
  app.use(`${basePath}/rental-properties`, rentalPropertyRoutes);
  app.use(`${basePath}/commercial-rental-properties`, commercialRentalPropertyRoutes);
  app.use(`${basePath}/residential-sale`, residentialSaleRoutes);
  app.use(`${basePath}/commercial-sale`, commercialSaleRoutes);
  app.use(`${basePath}/visits`, getVisitsByPartner);
  app.use(`${basePath}/saved-properties`, savedPropertyRoutes);
  app.use(`${basePath}/credits`, creditRoutes);
  app.use(`${basePath}/credit-settings`, creditSettingRoutes);
  app.use(`${basePath}/loan-enquiries`, loanEnquiryRoutes);
  app.use(`${basePath}/promotions`, promotionRoutes);
  app.use(`${basePath}/boost-operations`, boostDashboardRoutes);
  app.use(`${basePath}/property-publishing`, propertyPublishingRoutes);
  app.use(`${basePath}/leads`, leadRoutes);
  app.use(`${basePath}/blog`, blogRoutes);
  app.use(`${basePath}/cms/services`, servicesPageRoutes);
  app.use(`${basePath}/property-reviews`, propertyReviewRoutes);
  app.use(`${basePath}/advertisements`, advertisementRoutes);
  app.use(`${basePath}/admin/dashboard`, adminDashboardRoutes);
  app.use(`${basePath}/admin/notifications`, adminNotificationRoutes);
  app.use(`${basePath}/admin/profile`, adminProfileRoutes);
  app.use(`${basePath}/admin/users`, adminUsersRoutes);
  app.use(`${basePath}/account`, accountRoutes);
  app.use(`${basePath}/auth`, passwordResetRoutes);
  app.use(`${basePath}/admin/accounts`, adminAccountRoutes);
  app.use(`${basePath}/partner-applications`, partnerApplicationRoutes);
  app.use(`${basePath}/team-partners`, teamPartnerRoutes);
  app.use(`${basePath}/partner-auth`, partnerAuthRoutes);
};

// Canonical, versioned API. New frontend integrations should use this base.
app.use("/api/v1", versionedApiHeaders, apiAccessControl);
mountApiRoutes("/api/v1");

// Backward-compatible aliases. These are deprecated but remain operational.
app.use("/api", legacyApiHeaders, apiAccessControl);
mountApiRoutes("/api");

// MULTER_ERROR_HANDLER
// Keep upload errors JSON so the frontend can show the actual API message.
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        code: error.code,
        message: "Uploaded file is too large. Maximum allowed size is 100 MB. For videos, use the Cloudinary video URL field instead.",
      });
    }

    return res.status(400).json({
      success: false,
      code: error.code,
      message: error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Request failed.",
    });
  }

  next();
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
