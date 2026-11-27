import express from "express";
import { resolveSeoPage, sitemap, robots, footerLinks, registerUrl, createRedirect } from "../controllers/seoController.js";
import {
  getSeoSettings, saveSeoSettings, listSeoEntries, saveSeoEntry, deleteSeoEntry,
  listSeoRedirects, updateSeoRedirect, deleteSeoRedirect, getSeoDashboard, lookupSeoRedirect,
} from "../controllers/seoAdminController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
// Public endpoints consumed by the website and crawlers.
router.get("/resolve", resolveSeoPage);
router.get("/footer-links", footerLinks);
router.get("/sitemap.xml", sitemap);
router.get("/robots.txt", robots);
router.get("/redirect/resolve", lookupSeoRedirect);
// Admin endpoints.
router.use("/admin", protect, requireAdmin);
router.get("/admin/dashboard", getSeoDashboard);
router.get("/admin/settings", getSeoSettings);
router.put("/admin/settings", saveSeoSettings);
router.get("/admin/entries", listSeoEntries);
router.post("/admin/entries", saveSeoEntry);
router.put("/admin/entries/:id", saveSeoEntry);
router.delete("/admin/entries/:id", deleteSeoEntry);
router.get("/admin/redirects", listSeoRedirects);
router.post("/admin/redirects", updateSeoRedirect);
router.put("/admin/redirects/:id", updateSeoRedirect);
router.delete("/admin/redirects/:id", deleteSeoRedirect);
// Backward-compatible endpoints already used by the existing integration.
router.post("/urls", protect, requireAdmin, registerUrl);
router.post("/redirects", protect, requireAdmin, createRedirect);
export default router;
