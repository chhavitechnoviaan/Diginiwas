import { Link } from "react-router-dom";
import SEOHead from "../seo/SEOHead";

export default function NotFound() {
  return <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
    <SEOHead title="Page Not Found | DigiNiwas" robots="noindex,follow" />
    <p className="text-sm font-bold text-[#20BE91]">404</p>
    <h1 className="mt-2 text-3xl font-black text-[#102E46]">Page not found</h1>
    <p className="mt-3 max-w-lg text-sm text-[#718792]">The page you requested does not exist or is no longer available.</p>
    <Link to="/" className="mt-6 rounded-xl bg-[#123B59] px-5 py-3 text-sm font-bold text-white">Go to homepage</Link>
  </div>;
}
