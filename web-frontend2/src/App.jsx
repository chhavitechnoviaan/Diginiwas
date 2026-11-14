import "./App.css";
import Layout from "./layouts/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NiwasAI from "./pages/NiwasAi";
import About from "./pages/About";
import AgentCorner from "./pages/AgentCorner";
import ExploreProperties from "./pages/ExploreProperties";
import PropertyDetails from "./pages/PropertyDetails";
import AdminDashboard from "./pages/Admin/Dashboard";
import AddProperty from "./pages/Admin/AddProperty";
import PropertyManagement from "./pages/Admin/PropertyManagement";
import Services, { ServiceDetail } from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CokkiesPolicy";
import PartnerTerms from "./pages/PartnerTerms";
import ListingGuidelines from "./pages/ListingGuidelines";
import RefundCreditPolicy from "./pages/RefundCreditPolicy";
import Blogs from "./pages/Blogs";
import BlogArticle from "./pages/BlogArticle";
import AreaCalculator from "./pages/AreaCalculator";
import PropertyValuation from "./pages/PropertyValuation";
import RentValueCalculator from "./pages/RentValueCalculator";
import SEOHead from "./seo/SEOHead";

function App() {
  return (
    <>
      <SEOHead />
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="niwas-ai" element={<NiwasAI />} />
        <Route path="about" element={<About />} />
        <Route path="agent-corner" element={<AgentCorner />} />
        <Route path="explore-property" element={<ExploreProperties />} />
        <Route path="property/:propertyId/:slug?" element={<PropertyDetails />} />
        <Route path="*" element={<ExploreProperties />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms-service" element={<TermsOfService />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="cookie-policy" element={<CookiesPolicy />} />
        <Route path="partner-terms" element={<PartnerTerms />} />
        <Route path="listing-guidelines" element={<ListingGuidelines />} />
        <Route path="refund-policy" element={<RefundCreditPolicy />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="property-management" element={<PropertyManagement />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        <Route path="area-calculator" element={<AreaCalculator />} />
        <Route path="property-valuation" element={<PropertyValuation />} />
        <Route path="rent-value-calculator" element={<RentValueCalculator />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
