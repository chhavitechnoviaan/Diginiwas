// import FAQSection from "../components/common/FAQSection";
import FutureEcosystem from "./home/FutureEcosystem";
import FAQSection from "../components/common/FAQSection";
// import { Link, useLocation, useParams } from "react-router-dom";
// import {
//   ArrowRight,
//   Building2,
//   Camera,
//   CheckCircle2,
//   FileCheck2,
//   Home,
//   Megaphone,
//   ShieldCheck,
//   Sparkles,
//   Users,
//   Wallet,
// } from "lucide-react";

// import house from "../assets/images/house.webp";
// import calender from "../assets/images/calender.webp";
// import camera from "../assets/images/camera.webp";
// import human from "../assets/images/human.webp";
// import mic from "../assets/images/mic.webp";
// import notes from "../assets/images/notes.webp";
// import bg from "../assets/images/bg.webp";
// import bg2 from "../assets/images/bg2.webp";
// import bg3 from "../assets/images/bg3.webp";
// import homeLoan from "../assets/images/homeLoan.webp";
// import propertyPhotography from "../assets/images/propertyPhotography.webp";
// import digitalProperty from "../assets/images/digitalProperty.webp";
// import propertyManagement from "../assets/images/propertyManagement.webp";
// import retireGovernment from "../assets/images/retireGovernment.webp";
// import documentVerification from "../assets/images/documentVerification.webp";

// const bgImages = [bg, bg2, bg3];

// const services = [
//   {
//     img: house,
//     title: "Home Loan Assistance",
//     slug: "home-loan-assistance",
//     desc: "Get hassle-free home loans with the best interest rates. We connect you with trusted banks and financial partners.",
//     image: homeLoan,
//     icon: "wallet",
//   },
//   {
//     img: camera,
//     title: "Property Photography & Videography",
//     slug: "property-photography-videography",
//     desc: "Professional photos, videos and reels that highlight the best of your property and attract serious buyers/tenants.",
//     image: propertyPhotography,
//     icon: "camera",
//   },
//   {
//     img: mic,
//     title: "Digital Property Promotion",
//     slug: "digital-property-promotion",
//     desc: "Get maximum visibility with our digital marketing, social media promotion, featured listings and premium exposure.",
//     image: digitalProperty,
//     icon: "megaphone",
//   },
//   {
//     img: calender,
//     title: "Property Management",
//     slug: "property-management",
//     badge: "Coming Soon",
//     desc: "End-to-end rental management, tenant tracking, maintenance coordination and rent reminders - all in one place.",
//     image: propertyManagement,
//     icon: "building",
//   },
//   {
//     img: human,
//     title: "Retired Government Officers Network",
//     slug: "retired-government-officers-network",
//     desc: "We onboard retired government officials as trusted DigiNiwas partners and local property advisors. A second career. A bigger purpose.",
//     image: retireGovernment,
//     icon: "users",
//   },
//   {
//     img: notes,
//     title: "Documentation & Verification Support",
//     slug: "documentation-verification-support",
//     desc: "Assistance with property documentation, verification and all related legal formalities for a worry-free experience.",
//     image: documentVerification,
//     icon: "file",
//   },
// ];

// const stats = [
//   { icon: Users, value: "100%", label: "Verified partners" },
//   { icon: ShieldCheck, value: "", label: "Easy property listing" },
//   { icon: Building2, value: "100%", label: "Genuine Leads" },
//   { icon: CheckCircle2, value: "", label: "AI Powered" },
// ];

// const featureItems = [
//   { icon: ShieldCheck, title: "Trusted network" },
//   { icon: Users, title: "Verified partner" },
//   { icon: CheckCircle2, title: "End to end support" },
//   { icon: CheckCircle2, title: "100% Genuine" },
// ];

// const SERVICE_DETAIL_FALLBACKS = [
//   {
//     title: "Home Loan Assistance",
//     slug: "home-loan-assistance",
//     shortDescription: "Find the right home loan with guidance through the financing journey.",
//     description:
//       "Buying a home is a major milestone. DigiNiwas helps you understand your options, prepare documentation and connect with suitable lending partners. Our team can guide you through the application journey so you can make informed decisions with confidence.",
//     features: [
//       "Understand loan eligibility and documentation",
//       "Connect with lending partners",
//       "Get guidance through the application process",
//     ],
//     process: [
//       "Share your basic requirements",
//       "Review suitable loan options",
//       "Proceed with the lender of your choice",
//     ],
//     benefits: [
//       "Clear next steps",
//       "Guidance through paperwork",
//       "Support built around your needs",
//     ],
//     ctaText: "Enquire About Home Loans",
//     ctaLink: "/niwas-ai",
//     icon: "wallet",
//   },
//   {
//     title: "Property Photography & Videography",
//     slug: "property-photography-videography",
//     shortDescription: "Showcase your property with professional-quality photos and video tours.",
//     description:
//       "Help buyers and tenants understand your property before they visit. Photography and videography highlight the layout, natural light, amenities and details that make a listing stand out.",
//     features: [
//       "Property photos and visual highlights",
//       "Video walkthroughs and reels",
//       "Visual assets for online listings",
//     ],
//     process: [
//       "Tell us about your property",
//       "Plan the shoot and key highlights",
//       "Receive visuals ready to share",
//     ],
//     benefits: [
//       "More compelling listings",
//       "A clearer view of the property",
//       "Consistent presentation",
//     ],
//     ctaText: "Request a Shoot",
//     ctaLink: "/contact",
//     icon: "camera",
//   },
//   {
//     title: "Digital Property Promotion",
//     slug: "digital-property-promotion",
//     shortDescription: "Give your property listing more visibility with digital promotion.",
//     description:
//       "Present your property to a wider online audience through thoughtful digital promotion. We help you prepare a stronger listing and explore suitable promotional opportunities to attract relevant enquiries.",
//     features: [
//       "Listing presentation guidance",
//       "Digital and social promotion options",
//       "Visibility-focused campaign planning",
//     ],
//     process: [
//       "Share listing details",
//       "Choose a promotion plan",
//       "Track enquiries and optimise",
//     ],
//     benefits: [
//       "Stronger online presence",
//       "Better listing presentation",
//       "Promotion aligned to your goals",
//     ],
//     ctaText: "Explore Promotion",
//     ctaLink: "/contact",
//     icon: "megaphone",
//   },
//   {
//     title: "Property Management",
//     slug: "property-management",
//     shortDescription: "Organise rental coordination and property-related tasks in one place.",
//     description:
//       "Property management support is designed to make ownership easier, from coordinating tenant-related tasks to keeping property information organised. Availability may vary by location.",
//     features: [
//       "Rental coordination support",
//       "Maintenance request coordination",
//       "Organised property information",
//     ],
//     process: [
//       "Discuss your property needs",
//       "Agree on the support required",
//       "Coordinate the next steps",
//     ],
//     benefits: [
//       "Less day-to-day friction",
//       "Organised follow-up",
//       "Structured rental journey",
//     ],
//     ctaText: "Discuss Your Property",
//     ctaLink: "/contact",
//     icon: "building",
//   },
//   {
//     title: "Retired Government Officers Network",
//     slug: "retired-government-officers-network",
//     shortDescription: "Build a meaningful second career as a local property partner.",
//     description:
//       "DigiNiwas welcomes experienced people who understand their local communities and want to help people navigate property journeys through local knowledge and relevant connections.",
//     features: [
//       "Local property assistance",
//       "Partner onboarding guidance",
//       "Community-focused opportunities",
//     ],
//     process: [
//       "Register your interest",
//       "Connect with our team",
//       "Complete onboarding steps",
//     ],
//     benefits: [
//       "Purposeful engagement",
//       "Use your local knowledge",
//       "Grow your network",
//     ],
//     ctaText: "Become a Partner",
//     ctaLink: "/agent-corner",
//     icon: "users",
//   },
//   {
//     title: "Documentation & Verification Support",
//     slug: "documentation-verification-support",
//     shortDescription: "Get help understanding property paperwork and verification steps.",
//     description:
//       "Property transactions involve documents and checks. DigiNiwas helps you understand common documentation requirements and organise next steps. This informational support does not replace independent legal advice or official verification.",
//     features: [
//       "Documentation checklist guidance",
//       "Help organising property records",
//       "Direction to verification steps",
//     ],
//     process: [
//       "Tell us about the transaction",
//       "Review the relevant checklist",
//       "Follow up on outstanding documents",
//     ],
//     benefits: [
//       "Organised paperwork",
//       "Awareness of next steps",
//       "Less avoidable confusion",
//     ],
//     ctaText: "Get Documentation Help",
//     ctaLink: "/contact",
//     icon: "file",
//   },
// ];

// const detailIcons = {
//   wallet: Wallet,
//   camera: Camera,
//   megaphone: Megaphone,
//   building: Building2,
//   users: Users,
//   file: FileCheck2,
// };

// export default function Services() {
//   const [currentBg, setCurrentBg] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [cmsServices, setCmsServices] = useState([]);

//   useEffect(() => {
//     let active = true;
//     const apiRoot = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
//     const url = apiRoot.endsWith("/api") ? `${apiRoot}/v1/cms/services/public` : `${apiRoot}/api/v1/cms/services/public`;
//     fetch(url)
//       .then((response) => response.ok ? response.json() : Promise.reject(new Error("CMS unavailable")))
//       .then((payload) => {
//         const items = payload?.services || payload?.data?.services;
//         if (active && Array.isArray(items)) setCmsServices(items);
//       })
//       .catch(() => {});
//     return () => { active = false; };
//   }, []);

//   const displayServices = cmsServices.length
//     ? cmsServices.filter((item) => item.active !== false).map((item) => {
//         const fallback = services.find((service) => service.slug === item.slug) || {};
//         return { ...fallback, ...item, img: fallback.img || item.image || house, desc: item.shortDescription || item.desc || fallback.desc || "", badge: item.badge || fallback.badge };
//       })
//     : services;

//   useEffect(() => {
//     const interval = window.setInterval(() => {
//       setFade(false);
//       window.setTimeout(() => {
//         setCurrentBg((previous) => (previous + 1) % bgImages.length);
//         setFade(true);
//       }, 500);
//     }, 10000);

//     return () => window.clearInterval(interval);
//   }, []);

//   return (
//     <main className="h-full bg-[#274255] font-sans text-white">
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(18px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes floatGlow {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(-6px, 6px) scale(1.08); }
//         }
//         .service-card { animation: fadeInUp 0.6s ease both; }
//         .stat-card { animation: fadeInUp 0.6s ease both; }
//         .stat-icon-glow { animation: floatGlow 4s ease-in-out infinite; }
//       `}</style>

//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 -z-10">
//           <img
//             src={bgImages[currentBg]}
//             alt=""
//             className={`h-full w-full object-cover transition-opacity duration-700 ${
//               fade ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c3345]/40 to-[#1c3345] lg:via-[#1c3345]/20 lg:to-[63%]" />
//         <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-5 sm:px-10 sm:py-12">
//           <div className="flex flex-1 flex-col items-center justify-evenly gap-2 pt-2 pb-6 lg:flex-row">
//             <div className="flex-1 max-w-full py-4 text-center lg:max-w-[50%] lg:text-left">
//               <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-3xl md:text-4xl xl:text-6xl">
//                 <span className="text-white">
//                   DigiNiwas <span className="text-[#33cc99]">Services</span>
//                 </span>
//               </h1>
//               <h2 className="mb-4 text-2xl font-semibold leading-tight sm:text-4xl">
//                 More than just property deals
//               </h2>
//               <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-white/70 sm:mb-8 sm:text-base lg:mx-0">
//                 Go beyond buying, selling and renting. DigiNiwas offers a range
//                 of trusted services to make your property journey smooth, secure
//                 and successful.
//               </p>

//               <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
//                 {featureItems.map(({ icon: Icon, title }) => (
//                   <div
//                     key={title}
//                     className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#1f3a3f] bg-[#0d2329]/60 p-3 sm:p-4"
//                   >
//                     <div className="flex h-9 w-9 items-center justify-center rounded-md text-[#2dd4a8] transition duration-100 hover:scale-110">
//                       <Icon size={26} />
//                     </div>
//                     <div className="whitespace-nowrap text-[11px] font-semibold leading-tight sm:text-xs">
//                       {title}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-8 flex w-full flex-1 flex-col items-center lg:mt-0 lg:max-w-[55%] lg:items-end">
//               <div className="relative mx-auto flex h-full w-full max-w-5xl items-center justify-center sm:h-[340px] md:h-[420px] lg:h-[500px]">
//                 <img
//                   src="https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   alt="DigiNiwas property services"
//                   className="h-72 w-full rounded-[24px] object-cover sm:h-96"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full bg-[#274255] px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-16 lg:py-20">
//         <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-16">
//           <div className="mb-8 flex flex-col gap-2 text-center sm:mb-10 md:mb-12">
//             <h2 className="text-2xl font-bold text-white sm:text-4xl md:text-5xl">
//               Everything You Need.
//             </h2>
//             <h3 className="mt-1 text-2xl font-bold text-[#33cc99] sm:text-4xl md:text-5xl">
//               All Under One Roof.
//             </h3>
//             <p className="mx-auto mt-3 max-w-xl px-2 text-base text-gray-400 md:text-lg">
//               Powerful services designed to support buyers, sellers, partners
//               and investors at every step of their real estate journey.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
//             {displayServices.map((service, index) => (
//               <article
//                 key={service.slug}
//                 style={{ animationDelay: `${index * 0.08}s` }}
//                 className="service-card group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1c2f3d]/70 p-4 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#33cc99]/40 hover:bg-white/10 hover:shadow-[0_8px_40px_-8px_rgba(51,204,153,0.35)] sm:p-5 md:p-6"
//               >
//                 <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#33cc99]/0 blur-3xl transition-all duration-700 group-hover:bg-[#33cc99]/25" />
//                 <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-[#33cc99]/0 blur-3xl transition-all duration-700 group-hover:bg-[#33cc99]/10" />

//                 <div className="relative z-10 mb-3 flex h-20 items-center justify-center sm:mb-4 sm:h-24 md:h-28">
//                   <img
//                     src={service.img}
//                     alt={service.title}
//                     className="h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-1"
//                   />
//                 </div>

//                 <div className="relative z-10 mb-2 flex flex-wrap items-center gap-2">
//                   <h3 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#33cc99] sm:text-base md:text-lg">
//                     {service.title}
//                   </h3>
//                   {service.badge && (
//                     <span className="rounded-full border border-[#33cc99]/30 bg-[#33cc99]/20 px-2 py-0.5 text-[10px] font-medium text-[#33cc99] sm:text-xs">
//                       {service.badge}
//                     </span>
//                   )}
//                 </div>

//                 <p className="relative z-10 flex-1 text-xs leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-200 sm:text-sm">
//                   {service.desc}
//                 </p>

//                 <Link
//                   to={`/services/${service.slug}`}
//                   state={{ service }}
//                   className="relative z-10 mt-4 flex items-center gap-1 text-xs font-semibold text-[#33cc99] transition-all duration-300 group-hover:gap-2 sm:text-sm"
//                 >
//                   Learn More
//                   <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
//                 </Link>

//                 <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#33cc99] to-[#33cc99]/0 transition-all duration-500 group-hover:w-full" />
//               </article>
//             ))}
//           </div>

//           <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#1c2f3d]/70 p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#33cc99]/30 hover:shadow-[0_8px_30px_-10px_rgba(51,204,153,0.3)] sm:mt-8 sm:flex-row sm:p-5">
//             <div className="flex items-center gap-3 text-center sm:gap-4 sm:text-left">
//               <div className="rounded-full bg-[#33cc99]/20 p-2.5 sm:p-3">
//                 <ShieldCheck className="text-lg text-[#33cc99] sm:text-xl" />
//               </div>
//               <div>
//                 <h4 className="text-sm font-semibold text-[#33cc99] sm:text-base">
//                   We&apos;re Here to Help You
//                 </h4>
//                 <p className="text-xs text-gray-400 sm:text-sm">
//                   Have a question or need help with any service? Our team is
//                   just a message away.
//                 </p>
//               </div>
//             </div>
//             <a
//               href="https://wa.me/917988537478"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#33cc99] px-4 py-2.5 text-xs font-semibold text-[#0f1c26] transition-transform duration-300 hover:scale-105 sm:px-5 sm:py-3 sm:text-sm"
//             >
//               Contact Our Team <ArrowRight size={17} />
//             </a>
//           </div>

//           <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-4 sm:gap-6">
//             {stats.map(({ icon: Icon, value, label }, index) => (
//               <div
//                 key={label}
//                 style={{ animationDelay: `${index * 0.12}s` }}
//                 className="stat-card group relative flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#33cc99]/40 hover:bg-[#33cc99]/10 hover:shadow-[0_12px_40px_-12px_rgba(51,204,153,0.45)] sm:p-6"
//               >
//                 <div className="relative mb-2">
//                   <div className="stat-icon-glow absolute inset-0 scale-100 rounded-full bg-[#33cc99]/25 blur-xl transition-transform duration-500 group-hover:scale-150" />
//                   <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#33cc99]/30 bg-[#33cc99]/10 text-[#33cc99] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:h-14 sm:w-14">
//                     <Icon size={23} />
//                   </div>
//                 </div>
//                 <div className="flex h-8 items-center justify-center sm:h-10">
//                   {value && (
//                     <p className="text-sm font-bold tracking-tight text-white sm:text-xl">
//                       {value}
//                     </p>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-[#33cc99] sm:text-base">
//                   {label}
//                 </p>
//                 <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#33cc99] transition-all duration-500 group-hover:w-2/3" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export function ServiceDetail() {
//   const { slug } = useParams();
//   const location = useLocation();
//   const [servicesData, setServicesData] = useState(SERVICE_DETAIL_FALLBACKS);
//   const [openFaq, setOpenFaq] = useState(-1);

//   useEffect(() => {
//     let active = true;
//     const apiRoot = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
//     const url = apiRoot.endsWith("/api")
//       ? `${apiRoot}/v1/cms/services/public`
//       : `${apiRoot}/api/v1/cms/services/public`;

//     fetch(url)
//       .then((response) => {
//         if (!response.ok) throw new Error("Service CMS unavailable");
//         return response.json();
//       })
//       .then((payload) => {
//         const items = payload?.services || payload?.data?.services;
//         if (active && Array.isArray(items) && items.length) setServicesData(items);
//       })
//       .catch(() => {
//         // Keep the built-in service content when the CMS API is unavailable.
//       });

//     return () => {
//       active = false;
//     };
//   }, []);

//   const service = useMemo(
//     () =>
//       servicesData.find((item) => item.slug === slug) ||
//       (location.state?.service?.slug === slug ? location.state.service : null) ||
//       SERVICE_DETAIL_FALLBACKS.find((item) => item.slug === slug),
//     [servicesData, slug, location.state]
//   );

//   if (!service) {
//     return (
//       <main className="min-h-[55vh] bg-[#f5faf9] px-5 py-16 text-[#102b3b]">
//         <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
//           <h1 className="text-3xl font-bold">Service not found</h1>
//           <p className="mt-3 text-slate-600">The service may have been moved or is no longer available.</p>
//           <Link
//             to="/services"
//             className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#16b995] px-5 py-3 font-semibold text-[#062b32]"
//           >
//             ← Back to Services
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   const Icon = detailIcons[service.icon] || Home;
//   const features = Array.isArray(service.features) ? service.features.filter(Boolean) : [];
//   const process = Array.isArray(service.process) ? service.process.filter(Boolean) : [];
//   const benefits = Array.isArray(service.benefits) ? service.benefits.filter(Boolean) : [];
//   const sections = Array.isArray(service.detailSections) ? service.detailSections : [];
//   const faqs = Array.isArray(service.faqs)
//     ? service.faqs.filter((faq) => faq?.question?.trim() && faq?.answer?.trim())
//     : Array.isArray(service.faq)
//       ? service.faq.filter((faq) => faq?.question?.trim() && faq?.answer?.trim())
//       : [];
//   const imageItems = Array.isArray(service.imageTags) ? service.imageTags : [];
//   const images = imageItems
//     .map((entry) => (typeof entry === "string" ? entry : entry?.url || entry?.image || entry?.src || ""))
//     .filter(Boolean);
//   const heroImage =
//     (typeof service.heroImage === "string" && service.heroImage) ||
//     (typeof service.image === "string" && service.image) ||
//     service.heroImage?.url ||
//     service.image?.url ||
//     bg;
//   const overviewImage =
//     service.overviewImage?.url ||
//     service.overviewImage ||
//     images[0] ||
//     heroImage;
//   const heroFeatures = features.length
//     ? features.slice(0, 4)
//     : ["Competitive options", "Trusted guidance", "Clear next steps", "Support when you need it"];

//   return (
//     <main className="overflow-hidden bg-white text-[#102b3b]">
//       <style>{`
//         @keyframes dnServiceFadeUp {
//           from { opacity: 0; transform: translateY(18px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .dn-service-animate { animation: dnServiceFadeUp .65s ease both; }
//         .dn-service-shadow { box-shadow: 0 18px 55px rgba(4, 35, 49, .12); }
//         .dn-service-soft-pattern {
//           background-image: radial-gradient(rgba(15, 185, 149, .08) 1px, transparent 1px);
//           background-size: 18px 18px;
//         }
//       `}</style>

//       {/* Hero */}
//       <section className="relative isolate overflow-hidden bg-[#082c3d] text-white">
//         <img
//           src={heroImage}
//           alt={`${service.title} hero`}
//           className="absolute inset-0 -z-20 h-full w-full object-cover"
//           onError={(event) => {
//             if (!event.currentTarget.dataset.fallbackApplied) {
//               event.currentTarget.dataset.fallbackApplied = "true";
//               event.currentTarget.src = bg;
//             }
//           }}
//         />
//         <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,28,42,.97)_0%,rgba(4,35,50,.88)_37%,rgba(4,35,50,.28)_75%,rgba(4,35,50,.3)_100%)]" />
//         <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#062735]/95 to-transparent" />

//         <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-24 pt-8 sm:px-8 sm:pb-28 sm:pt-12 lg:grid-cols-[1fr_.92fr] lg:gap-12 lg:px-10 lg:pb-28 lg:pt-14">
//           <div className="dn-service-animate">
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#082c3d]/55 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur">
//               <Link to="/services" className="transition hover:text-[#48e0bb]">Services</Link>
//               <span className="text-white/40">›</span>
//               <span className="max-w-[190px] truncate">{service.title}</span>
//             </div>

//             <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.2em] text-[#48e0bb]">
//               <Icon size={16} />
//               DigiNiwas Services
//             </div>
//             <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
//               {service.title}
//             </h1>
//             <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
//               {service.shortDescription || service.desc || service.description}
//             </p>

//             <div className="mt-7 flex flex-wrap gap-3">
//               <Link
//                 to={service.ctaLink || "/contact"}
//                 className="inline-flex items-center gap-2 rounded-lg bg-[#24d0a5] px-5 py-3.5 text-sm font-bold text-[#062b32] shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-[#51e4bf]"
//               >
//                 {service.ctaText || "Enquire About This Service"} <ArrowRight size={17} />
//               </Link>
//               <a
//                 href="https://wa.me/917988537478"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 rounded-lg border border-white/45 bg-[#082c3d]/35 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#48e0bb] hover:bg-white/10"
//               >
//                 <span className="text-[#48e0bb]">◉</span> Talk to our team
//               </a>
//             </div>
//           </div>

//           <div className="relative mx-auto w-full max-w-[570px] dn-service-animate" style={{ animationDelay: ".12s" }}>
//             <div className="absolute -inset-4 rounded-[2rem] bg-[#23d0a5]/15 blur-2xl" />
//             <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-2xl">
//               <img
//                 src={heroImage}
//                 alt={`${service.title} visual`}
//                 className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[365px]"
//                 onError={(event) => {
//                   if (!event.currentTarget.dataset.fallbackApplied) {
//                     event.currentTarget.dataset.fallbackApplied = "true";
//                     event.currentTarget.src = bg;
//                   }
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#062735]/85 via-transparent to-transparent" />
//               <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-[#092f3e]/80 p-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
//                 <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#48e0bb]">
//                   Making property journeys simpler
//                 </p>
//                 <h2 className="mt-1 text-lg font-bold sm:text-xl">
//                   {service.heroCardTitle || "Your goals. Our guidance."}
//                 </h2>
//                 <p className="mt-1 text-sm leading-6 text-white/75">
//                   {service.heroCardText || "Helpful support, trusted connections and clear next steps."}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-1/2 px-5 sm:px-8 lg:px-10">
//           <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
//             {heroFeatures.map((feature, index) => {
//               const FeatureIcon = [Wallet, ShieldCheck, CheckCircle2, FileCheck2][index % 4];
//               return (
//                 <div
//                   key={`${feature}-${index}`}
//                   className="flex min-h-[68px] items-center gap-2 rounded-xl border border-white/10 bg-[#0c3545]/95 p-3 shadow-xl backdrop-blur sm:gap-3 sm:p-4"
//                 >
//                   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#35d7ae]/70 bg-[#35d7ae]/10 text-[#48e0bb]">
//                     <FeatureIcon size={18} />
//                   </span>
//                   <span className="text-[11px] font-semibold leading-4 text-white/90 sm:text-xs">{feature}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Overview */}
//       <section className="bg-white px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-10 lg:pb-20">
//         <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1.03fr_.97fr] lg:gap-14">
//           <div className="dn-service-animate">
//             <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">
//               <span className="mr-2">⌂</span> About this service
//             </p>
//             <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-[#102b3b] sm:text-4xl">
//               {service.overviewHeading || "A simpler way to"}{" "}
//               {!service.overviewHeading && <span className="text-[#0dbb96]">move forward</span>}
//             </h2>
//             <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
//               {service.description || service.shortDescription || service.desc}
//             </p>

//             {features.length > 0 && (
//               <div className="mt-7 grid gap-4 sm:grid-cols-2">
//                 {features.slice(0, 4).map((feature, index) => {
//                   const FeatureIcon = [Users, Users, FileCheck2, ShieldCheck][index % 4];
//                   return (
//                     <div key={`${feature}-${index}`} className="flex gap-3 border-b border-slate-100 pb-4">
//                       <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4f8f2] text-[#079e80]">
//                         <FeatureIcon size={19} />
//                       </span>
//                       <p className="pt-1 text-sm font-medium leading-6 text-[#193849]">{feature}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           <div className="relative dn-service-animate" style={{ animationDelay: ".1s" }}>
//             <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full bg-[#c9f4e8]" />
//             <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 dn-service-shadow">
//               <img
//                 src={overviewImage}
//                 alt={`${service.title} overview`}
//                 className="h-[280px] w-full object-cover sm:h-[390px]"
//                 loading="lazy"
//                 onError={(event) => {
//                   if (!event.currentTarget.dataset.fallbackApplied) {
//                     event.currentTarget.dataset.fallbackApplied = "true";
//                     event.currentTarget.src = bg;
//                   }
//                 }}
//               />
//             </div>
//             <div className="absolute -bottom-4 right-3 max-w-[240px] rounded-xl border border-white/60 bg-[#078f78] p-4 text-white shadow-xl sm:-right-4 sm:p-5">
//               <div className="flex items-center gap-2">
//                 <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15"><Home size={18}/></span>
//                 <p className="text-sm font-bold">{service.overviewBadgeTitle || "Made easier with DigiNiwas"}</p>
//               </div>
//               <p className="mt-2 text-xs leading-5 text-white/80">
//                 {service.overviewBadgeText || "Practical guidance and support for your next step."}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Custom CMS content blocks */}
//       {sections.length > 0 && (
//         <section className="dn-service-soft-pattern bg-[#effaf7] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
//           <div className="mx-auto max-w-7xl">
//             <div className="mx-auto mb-9 max-w-2xl text-center">
//               <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">Explore the service</p>
//               <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">
//                 {service.sectionsHeading || "Everything you need to know"}
//               </h2>
//               {service.sectionsSubheading && <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{service.sectionsSubheading}</p>}
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {sections.map((item, index) => {
//                 const SectionIcon = detailIcons[item.icon] || CheckCircle2;
//                 const sectionImage = typeof item.image === "string" ? item.image : item.image?.url;
//                 return (
//                   <article
//                     key={`${item.title || "section"}-${index}`}
//                     className="overflow-hidden rounded-2xl border border-[#dcefe9] bg-white shadow-[0_8px_28px_rgba(8,60,65,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(8,60,65,.12)]"
//                   >
//                     {sectionImage && <img src={sectionImage} alt={item.title || `Service detail ${index + 1}`} className="h-48 w-full object-cover" loading="lazy" />}
//                     <div className="p-5 sm:p-6">
//                       <div className="flex items-center gap-3">
//                         <span className="text-xl font-extrabold text-[#0aa887]">{item.number || String(index + 1).padStart(2, "0")}</span>
//                         <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f8f2] text-[#079e80]"><SectionIcon size={20}/></span>
//                       </div>
//                       {item.title && <h3 className="mt-4 text-lg font-bold text-[#102b3b]">{item.title}</h3>}
//                       {item.content && <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">{item.content}</p>}
//                       {item.subcontent && <p className="mt-3 whitespace-pre-line border-l-2 border-[#20c7a0] pl-3 text-xs leading-6 text-slate-500">{item.subcontent}</p>}
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Process */}
//       {process.length > 0 && (
//         <section className="relative overflow-hidden bg-[#f2fbf8] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
//           <div className="pointer-events-none absolute -right-12 top-10 h-64 w-64 rounded-full bg-[#d9f5ed] blur-2xl" />
//           <div className="relative mx-auto max-w-7xl">
//             <div className="mb-9 text-center">
//               <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">How it works</p>
//               <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">
//                 {service.processHeading || "Your next steps"}
//               </h2>
//               <p className="mt-3 text-sm text-slate-600 sm:text-base">{service.processSubheading || "A simple, transparent and hassle-free process."}</p>
//             </div>
//             <div className={`grid gap-4 ${process.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
//               {process.map((step, index) => (
//                 <article key={`${step}-${index}`} className="relative rounded-2xl border border-[#e4f0ed] bg-white p-5 shadow-[0_8px_25px_rgba(8,60,65,.06)] sm:p-6">
//                   <div className="flex items-center gap-3">
//                     <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#079e80] text-sm font-extrabold text-white">{String(index + 1).padStart(2, "0")}</span>
//                     <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f8f3] text-[#079e80]"><CheckCircle2 size={21}/></span>
//                   </div>
//                   <h3 className="mt-5 text-base font-bold text-[#102b3b]">{typeof step === "string" ? step : step.title}</h3>
//                   {typeof step !== "string" && step.description && <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>}
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Gallery / image tags */}
//       {images.length > 0 && (
//         <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
//           <div className="mx-auto max-w-7xl">
//             <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
//               <div>
//                 <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">Visual highlights</p>
//                 <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">{service.galleryHeading || "Explore the details"}</h2>
//               </div>
//               <p className="max-w-md text-sm leading-6 text-slate-500">A closer look at the details that make this service useful for your property journey.</p>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {images.map((url, index) => (
//                 <figure key={`${url}-${index}`} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
//                   <img src={url} alt={`${service.title} image ${index + 1}`} loading="lazy" className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-64" />
//                   {typeof imageItems[index] === "object" && imageItems[index]?.tag && (
//                     <figcaption className="px-4 py-3 text-sm font-semibold text-[#193849]">{imageItems[index].tag}</figcaption>
//                   )}
//                 </figure>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Benefits */}
//       {benefits.length > 0 && (
//         <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
//           <div className="mx-auto max-w-7xl">
//             <div className="mb-8 text-center">
//               <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">Why choose us</p>
//               <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">{service.benefitsHeading || "Benefits you can count on"}</h2>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               {benefits.map((benefit, index) => (
//                 <article key={`${benefit}-${index}`} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_28px_rgba(8,60,65,.07)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(8,60,65,.12)]">
//                   <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#079e80] text-white"><CheckCircle2 size={21}/></span>
//                   <h3 className="mt-4 text-base font-bold text-[#102b3b]">{typeof benefit === "string" ? benefit : benefit.title}</h3>
//                   {typeof benefit !== "string" && benefit.description && <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>}
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* FAQ must not render when the backend has no FAQs */}
//       {faqs.length > 0 && (
//         <section className="bg-[#f1faf7] px-5 py-12 sm:px-8 sm:py-16">
//           <div className="mx-auto max-w-4xl">
//             <div className="mb-7 text-center">
//               <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">Need to know</p>
//               <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">Frequently asked questions</h2>
//             </div>
//             <div className="space-y-3">
//               {faqs.map((faq, index) => (
//                 <article key={`${faq.question}-${index}`} className="overflow-hidden rounded-xl border border-[#dcefe9] bg-white shadow-sm">
//                   <button
//                     type="button"
//                     aria-expanded={openFaq === index}
//                     onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
//                     className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#102b3b] sm:px-6"
//                   >
//                     <span>{faq.question}</span>
//                     <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e5f8f2] text-lg text-[#079e80]">{openFaq === index ? "−" : "+"}</span>
//                   </button>
//                   {openFaq === index && <p className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600 sm:px-6">{faq.answer}</p>}
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* CTA */}
//       <section className="bg-white px-5 pb-10 pt-4 sm:px-8 sm:pb-14 lg:px-10">
//         <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-[#0ab994]/30 bg-[#082f40] p-6 text-white shadow-[0_15px_40px_rgba(8,47,64,.18)] sm:flex-row sm:items-center sm:p-9 lg:p-10">
//           <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(36,208,165,.18),transparent_55%)]" />
//           <div className="relative">
//             <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#48e0bb]">Ready to begin?</p>
//             <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{service.ctaHeading || "Let’s make your property journey simpler."}</h2>
//             <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{service.ctaDescription || "Talk to our team and get expert guidance for your next step."}</p>
//           </div>
//           <div className="relative flex shrink-0 flex-wrap gap-3">
//             <Link to={service.ctaLink || "/contact"} className="inline-flex items-center gap-2 rounded-lg bg-[#24d0a5] px-5 py-3.5 text-sm font-bold text-[#062b32] transition hover:-translate-y-0.5 hover:bg-[#51e4bf]">
//               {service.ctaText || "Get Started"} <ArrowRight size={17}/>
//             </Link>
//             <a href="https://wa.me/917988537478" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-[#48e0bb]">
//               Talk to our team
//             </a>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  FileCheck2,
  Home,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

import house from "../assets/images/house.webp";
import calender from "../assets/images/calender.webp";
import camera from "../assets/images/camera.webp";
import human from "../assets/images/human.webp";
import mic from "../assets/images/mic.webp";
import notes from "../assets/images/notes.webp";
import bg from "../assets/images/bg.webp";
import bg2 from "../assets/images/bg2.webp";
import bg3 from "../assets/images/bg3.webp";
import homeLoan from "../assets/images/homeLoan.webp";
import propertyPhotography from "../assets/images/propertyPhotography.webp";
import digitalProperty from "../assets/images/digitalProperty.webp";
import propertyManagement from "../assets/images/propertyManagement.webp";
import retireGovernment from "../assets/images/retireGovernment.webp";
import documentVerification from "../assets/images/documentVerification.webp";
import PropertyResearchTools from './home/PropertyResearchTools'
const bgImages = [bg, bg2, bg3];

const services = [
  {
    img: house,
    title: "Home Loan Assistance",
    slug: "home-loan-assistance",
    desc: "Get hassle-free home loans with the best interest rates. We connect you with trusted banks and financial partners.",
    image: homeLoan,
    icon: "wallet",
  },
  {
    img: camera,
    title: "Property Photography & Videography",
    slug: "property-photography-videography",
    desc: "Professional photos, videos and reels that highlight the best of your property and attract serious buyers/tenants.",
    image: propertyPhotography,
    icon: "camera",
  },
  {
    img: mic,
    title: "Digital Property Promotion",
    slug: "digital-property-promotion",
    desc: "Get maximum visibility with our digital marketing, social media promotion, featured listings and premium exposure.",
    image: digitalProperty,
    icon: "megaphone",
  },
  {
    img: calender,
    title: "Property Management",
    slug: "property-management",
    badge: "Coming Soon",
    desc: "End-to-end rental management, tenant tracking, maintenance coordination and rent reminders - all in one place.",
    image: propertyManagement,
    icon: "building",
  },
  {
    img: human,
    title: "Retired Government Officers Network",
    slug: "retired-government-officers-network",
    desc: "We onboard retired government officials as trusted DigiNiwas partners and local property advisors. A second career. A bigger purpose.",
    image: retireGovernment,
    icon: "users",
  },
  {
    img: notes,
    title: "Documentation & Verification Support",
    slug: "documentation-verification-support",
    desc: "Assistance with property documentation, verification and all related legal formalities for a worry-free experience.",
    image: documentVerification,
    icon: "file",
  },
];

const stats = [
  { icon: Users, value: "100%", label: "Verified partners" },
  { icon: ShieldCheck, value: "", label: "Easy property listing" },
  { icon: Building2, value: "100%", label: "Genuine Leads" },
  { icon: CheckCircle2, value: "", label: "AI Powered" },
];

const featureItems = [
  { icon: ShieldCheck, title: "Trusted network" },
  { icon: Users, title: "Verified partner" },
  { icon: CheckCircle2, title: "End to end support" },
  { icon: CheckCircle2, title: "100% Genuine" },
];

const SERVICE_DETAIL_FALLBACKS = [
  {
    title: "Home Loan Assistance",
    slug: "home-loan-assistance",
    shortDescription:
      "Find the right home loan with guidance through the financing journey.",
    description:
      "Buying a home is a major milestone. DigiNiwas helps you understand your options, prepare documentation and connect with suitable lending partners. Our team can guide you through the application journey so you can make informed decisions with confidence.",
    features: [
      "Understand loan eligibility and documentation",
      "Connect with lending partners",
      "Get guidance through the application process",
    ],
    process: [
      "Share your basic requirements",
      "Review suitable loan options",
      "Proceed with the lender of your choice",
    ],
    benefits: [
      "Clear next steps",
      "Guidance through paperwork",
      "Support built around your needs",
    ],
    ctaText: "Enquire About Home Loans",
    ctaLink: "/niwas-ai",
    icon: "wallet",
  },
  {
    title: "Property Photography & Videography",
    slug: "property-photography-videography",
    shortDescription:
      "Showcase your property with professional-quality photos and video tours.",
    description:
      "Help buyers and tenants understand your property before they visit. Photography and videography highlight the layout, natural light, amenities and details that make a listing stand out.",
    features: [
      "Property photos and visual highlights",
      "Video walkthroughs and reels",
      "Visual assets for online listings",
    ],
    process: [
      "Tell us about your property",
      "Plan the shoot and key highlights",
      "Receive visuals ready to share",
    ],
    benefits: [
      "More compelling listings",
      "A clearer view of the property",
      "Consistent presentation",
    ],
    ctaText: "Request a Shoot",
    ctaLink: "/contact",
    icon: "camera",
  },
  {
    title: "Digital Property Promotion",
    slug: "digital-property-promotion",
    shortDescription:
      "Give your property listing more visibility with digital promotion.",
    description:
      "Present your property to a wider online audience through thoughtful digital promotion. We help you prepare a stronger listing and explore suitable promotional opportunities to attract relevant enquiries.",
    features: [
      "Listing presentation guidance",
      "Digital and social promotion options",
      "Visibility-focused campaign planning",
    ],
    process: [
      "Share listing details",
      "Choose a promotion plan",
      "Track enquiries and optimise",
    ],
    benefits: [
      "Stronger online presence",
      "Better listing presentation",
      "Promotion aligned to your goals",
    ],
    ctaText: "Explore Promotion",
    ctaLink: "/contact",
    icon: "megaphone",
  },
  {
    title: "Property Management",
    slug: "property-management",
    shortDescription:
      "Organise rental coordination and property-related tasks in one place.",
    description:
      "Property management support is designed to make ownership easier, from coordinating tenant-related tasks to keeping property information organised. Availability may vary by location.",
    features: [
      "Rental coordination support",
      "Maintenance request coordination",
      "Organised property information",
    ],
    process: [
      "Discuss your property needs",
      "Agree on the support required",
      "Coordinate the next steps",
    ],
    benefits: [
      "Less day-to-day friction",
      "Organised follow-up",
      "Structured rental journey",
    ],
    ctaText: "Discuss Your Property",
    ctaLink: "/contact",
    icon: "building",
  },
  {
    title: "Retired Government Officers Network",
    slug: "retired-government-officers-network",
    shortDescription:
      "Build a meaningful second career as a local property partner.",
    description:
      "DigiNiwas welcomes experienced people who understand their local communities and want to help people navigate property journeys through local knowledge and relevant connections.",
    features: [
      "Local property assistance",
      "Partner onboarding guidance",
      "Community-focused opportunities",
    ],
    process: [
      "Register your interest",
      "Connect with our team",
      "Complete onboarding steps",
    ],
    benefits: [
      "Purposeful engagement",
      "Use your local knowledge",
      "Grow your network",
    ],
    ctaText: "Become a Partner",
    ctaLink: "/agent-corner",
    icon: "users",
  },
  {
    title: "Documentation & Verification Support",
    slug: "documentation-verification-support",
    shortDescription:
      "Get help understanding property paperwork and verification steps.",
    description:
      "Property transactions involve documents and checks. DigiNiwas helps you understand common documentation requirements and organise next steps. This informational support does not replace independent legal advice or official verification.",
    features: [
      "Documentation checklist guidance",
      "Help organising property records",
      "Direction to verification steps",
    ],
    process: [
      "Tell us about the transaction",
      "Review the relevant checklist",
      "Follow up on outstanding documents",
    ],
    benefits: [
      "Organised paperwork",
      "Awareness of next steps",
      "Less avoidable confusion",
    ],
    ctaText: "Get Documentation Help",
    ctaLink: "/contact",
    icon: "file",
  },
];

const detailIcons = {
  wallet: Wallet,
  camera: Camera,
  megaphone: Megaphone,
  building: Building2,
  users: Users,
  file: FileCheck2,
};

export default function Services() {
  const [currentBg, setCurrentBg] = useState(0);
  const [fade, setFade] = useState(true);
  const [cmsServices, setCmsServices] = useState([]);

  useEffect(() => {
    let active = true;
    const apiRoot = (
      import.meta.env.VITE_API_URL || "http://localhost:5000/api"
    ).replace(/\/$/, "");
    const url = apiRoot.endsWith("/api")
      ? `${apiRoot}/v1/cms/services/public`
      : `${apiRoot}/api/v1/cms/services/public`;
    fetch(url)
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("CMS unavailable")),
      )
      .then((payload) => {
        const items = payload?.services || payload?.data?.services;
        if (active && Array.isArray(items)) setCmsServices(items);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const displayServices = cmsServices.length
    ? cmsServices
        .filter((item) => item.active !== false)
        .map((item) => {
          const fallback =
            services.find((service) => service.slug === item.slug) || {};
          return {
            ...fallback,
            ...item,
            img: fallback.img || item.image || house,
            desc: item.shortDescription || item.desc || fallback.desc || "",
            badge: item.badge || fallback.badge,
          };
        })
    : services;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFade(false);
      window.setTimeout(() => {
        setCurrentBg((previous) => (previous + 1) % bgImages.length);
        setFade(true);
      }, 500);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="h-full bg-[#274255] font-sans text-white">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatGlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-6px, 6px) scale(1.08); }
        }
        .service-card { animation: fadeInUp 0.6s ease both; }
        .stat-card { animation: fadeInUp 0.6s ease both; }
        .stat-icon-glow { animation: floatGlow 4s ease-in-out infinite; }
      `}</style>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={bgImages[currentBg]}
            alt=""
            className={`h-full w-full object-cover transition-opacity duration-700 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c3345]/40 to-[#1c3345] lg:via-[#1c3345]/20 lg:to-[63%]" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-5 sm:px-10 sm:py-12">
          <div className="flex flex-1 flex-col items-center justify-evenly gap-2 pt-2 pb-6 lg:flex-row">
            <div className="flex-1 max-w-full py-4 text-center lg:max-w-[50%] lg:text-left">
              <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-3xl md:text-4xl xl:text-6xl">
                <span className="text-white">
                  DigiNiwas <span className="text-[#33cc99]">Services</span>
                </span>
              </h1>
              <h2 className="mb-4 text-2xl font-semibold leading-tight sm:text-4xl">
                More than just property deals
              </h2>
              <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-white/70 sm:mb-8 sm:text-base lg:mx-0">
                Go beyond buying, selling and renting. DigiNiwas offers a range
                of trusted services to make your property journey smooth, secure
                and successful.
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {featureItems.map(({ icon: Icon, title }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#1f3a3f] bg-[#0d2329]/60 p-3 sm:p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md text-[#2dd4a8] transition duration-100 hover:scale-110">
                      <Icon size={26} />
                    </div>
                    <div className="whitespace-nowrap text-[11px] font-semibold leading-tight sm:text-xs">
                      {title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex w-full flex-1 flex-col items-center lg:mt-0 lg:max-w-[55%] lg:items-end">
              <div className="relative mx-auto flex h-full w-full max-w-5xl items-center justify-center sm:h-[340px] md:h-[420px] lg:h-[500px]">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="DigiNiwas property services"
                  className="h-72 w-full rounded-[24px] object-cover sm:h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#274255] px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-16">
          <div className="mb-8 flex flex-col gap-2 text-center sm:mb-10 md:mb-12">
            <h2 className="text-2xl font-bold text-white sm:text-4xl md:text-5xl">
              Everything You Need.
            </h2>
            <h3 className="mt-1 text-2xl font-bold text-[#33cc99] sm:text-4xl md:text-5xl">
              All Under One Roof.
            </h3>
            <p className="mx-auto mt-3 max-w-xl px-2 text-base text-gray-400 md:text-lg">
              Powerful services designed to support buyers, sellers, partners
              and investors at every step of their real estate journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
            {displayServices.map((service, index) => (
              <article
                key={service.slug}
                style={{ animationDelay: `${index * 0.08}s` }}
                className="service-card group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1c2f3d]/70 p-4 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#33cc99]/40 hover:bg-white/10 hover:shadow-[0_8px_40px_-8px_rgba(51,204,153,0.35)] sm:p-5 md:p-6"
              >
                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#33cc99]/0 blur-3xl transition-all duration-700 group-hover:bg-[#33cc99]/25" />
                <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-[#33cc99]/0 blur-3xl transition-all duration-700 group-hover:bg-[#33cc99]/10" />

                <div className="relative z-10 mb-3 flex h-20 items-center justify-center sm:mb-4 sm:h-24 md:h-28">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-1"
                  />
                </div>

                <div className="relative z-10 mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#33cc99] sm:text-base md:text-lg">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="rounded-full border border-[#33cc99]/30 bg-[#33cc99]/20 px-2 py-0.5 text-[10px] font-medium text-[#33cc99] sm:text-xs">
                      {service.badge}
                    </span>
                  )}
                </div>

                <p className="relative z-10 flex-1 text-xs leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-200 sm:text-sm">
                  {service.desc}
                </p>

                <Link
                  to={`/services/${service.slug}`}
                  state={{ service }}
                  className="relative z-10 mt-4 flex items-center gap-1 text-xs font-semibold text-[#33cc99] transition-all duration-300 group-hover:gap-2 sm:text-sm"
                >
                  Learn More
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={17}
                  />
                </Link>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#33cc99] to-[#33cc99]/0 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#1c2f3d]/70 p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#33cc99]/30 hover:shadow-[0_8px_30px_-10px_rgba(51,204,153,0.3)] sm:mt-8 sm:flex-row sm:p-5">
            <div className="flex items-center gap-3 text-center sm:gap-4 sm:text-left">
              <div className="rounded-full bg-[#33cc99]/20 p-2.5 sm:p-3">
                <ShieldCheck className="text-lg text-[#33cc99] sm:text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#33cc99] sm:text-base">
                  We&apos;re Here to Help You
                </h4>
                <p className="text-xs text-gray-400 sm:text-sm">
                  Have a question or need help with any service? Our team is
                  just a message away.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/917988537478"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#33cc99] px-4 py-2.5 text-xs font-semibold text-[#0f1c26] transition-transform duration-300 hover:scale-105 sm:px-5 sm:py-3 sm:text-sm"
            >
              Contact Our Team <ArrowRight size={17} />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-4 sm:gap-6">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <div
                key={label}
                style={{ animationDelay: `${index * 0.12}s` }}
                className="stat-card group relative flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#33cc99]/40 hover:bg-[#33cc99]/10 hover:shadow-[0_12px_40px_-12px_rgba(51,204,153,0.45)] sm:p-6"
              >
                <div className="relative mb-2">
                  <div className="stat-icon-glow absolute inset-0 scale-100 rounded-full bg-[#33cc99]/25 blur-xl transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#33cc99]/30 bg-[#33cc99]/10 text-[#33cc99] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:h-14 sm:w-14">
                    <Icon size={23} />
                  </div>
                </div>
                <div className="flex h-8 items-center justify-center sm:h-10">
                  {value && (
                    <p className="text-sm font-bold tracking-tight text-white sm:text-xl">
                      {value}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-[#33cc99] sm:text-base">
                  {label}
                </p>
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#33cc99] transition-all duration-500 group-hover:w-2/3" />
              </div>
            ))}
          </div>

<PropertyResearchTools />

        </div>
      </section>
    </main>
  );
}

export function ServiceDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const [servicesData, setServicesData] = useState(SERVICE_DETAIL_FALLBACKS);
  const [openFaq, setOpenFaq] = useState(-1);

  useEffect(() => {
    let active = true;
    const apiRoot = (
      import.meta.env.VITE_API_URL || "http://localhost:5000/api"
    ).replace(/\/$/, "");
    const url = apiRoot.endsWith("/api")
      ? `${apiRoot}/v1/cms/services/public`
      : `${apiRoot}/api/v1/cms/services/public`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Service CMS unavailable");
        return response.json();
      })
      .then((payload) => {
        const items = payload?.services || payload?.data?.services;
        if (active && Array.isArray(items) && items.length)
          setServicesData(items);
      })
      .catch(() => {
        // Keep the built-in service content when the CMS API is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  const service = useMemo(
    () =>
      servicesData.find((item) => item.slug === slug) ||
      (location.state?.service?.slug === slug
        ? location.state.service
        : null) ||
      SERVICE_DETAIL_FALLBACKS.find((item) => item.slug === slug),
    [servicesData, slug, location.state],
  );

  if (!service) {
    return (
      <main className="min-h-[55vh] bg-[#f5faf9] px-5 py-16 text-[#102b3b]">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Service not found</h1>
          <p className="mt-3 text-slate-600">
            The service may have been moved or is no longer available.
          </p>
          <Link
            to="/services"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#16b995] px-5 py-3 font-semibold text-[#062b32]"
          >
            ← Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const Icon = detailIcons[service.icon] || Home;
  const features = Array.isArray(service.features)
    ? service.features.filter(Boolean)
    : [];
  const process = Array.isArray(service.process)
    ? service.process.filter(Boolean)
    : [];
  const benefits = Array.isArray(service.benefits)
    ? service.benefits.filter(Boolean)
    : [];
  const sections = Array.isArray(service.detailSections)
    ? service.detailSections
    : [];
  const faqs = Array.isArray(service.faqs)
    ? service.faqs.filter((faq) => faq?.question?.trim() && faq?.answer?.trim())
    : Array.isArray(service.faq)
      ? service.faq.filter(
          (faq) => faq?.question?.trim() && faq?.answer?.trim(),
        )
      : [];
  const imageItems = Array.isArray(service.imageTags) ? service.imageTags : [];
  const images = imageItems
    .map((entry) =>
      typeof entry === "string"
        ? entry
        : entry?.url || entry?.image || entry?.src || "",
    )
    .filter(Boolean);
  const heroImage =
    (typeof service.heroImage === "string" && service.heroImage) ||
    (typeof service.image === "string" && service.image) ||
    service.heroImage?.url ||
    service.image?.url ||
    bg;
  const overviewImage =
    service.overviewImage?.url ||
    service.overviewImage ||
    images[0] ||
    heroImage;
  const heroFeatures = features.length
    ? features.slice(0, 4)
    : [
        "Competitive options",
        "Trusted guidance",
        "Clear next steps",
        "Support when you need it",
      ];

  return (
    <main className="overflow-hidden bg-white text-[#102b3b]">
      <style>{`
        @keyframes dnServiceFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dn-service-animate { animation: dnServiceFadeUp .65s ease both; }
        .dn-service-shadow { box-shadow: 0 18px 55px rgba(4, 35, 49, .12); }
        .dn-service-soft-pattern {
          background-image: radial-gradient(rgba(15, 185, 149, .08) 1px, transparent 1px);
          background-size: 18px 18px;
        }
      `}</style>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#082c3d] text-white">
        <img
          src={heroImage}
          alt={`${service.title} hero`}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          onError={(event) => {
            if (!event.currentTarget.dataset.fallbackApplied) {
              event.currentTarget.dataset.fallbackApplied = "true";
              event.currentTarget.src = bg;
            }
          }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,28,42,.97)_0%,rgba(4,35,50,.88)_37%,rgba(4,35,50,.28)_75%,rgba(4,35,50,.3)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#062735]/95 to-transparent" />

        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-24 pt-8 sm:px-8 sm:pb-28 sm:pt-12 lg:grid-cols-[1fr_.92fr] lg:gap-12 lg:px-10 lg:pb-28 lg:pt-14">
          <div className="dn-service-animate">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#082c3d]/55 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur">
              <Link to="/services" className="transition hover:text-[#48e0bb]">
                Services
              </Link>
              <span className="text-white/40">›</span>
              <span className="max-w-[190px] truncate">{service.title}</span>
            </div>

            <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.2em] text-[#48e0bb]">
              <Icon size={16} />
              DigiNiwas Services
            </div>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              {service.shortDescription || service.desc || service.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={service.ctaLink || "/contact"}
                className="inline-flex items-center gap-2 rounded-lg bg-[#24d0a5] px-5 py-3.5 text-sm font-bold text-[#062b32] shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-[#51e4bf]"
              >
                {service.ctaText || "Enquire About This Service"}{" "}
                <ArrowRight size={17} />
              </Link>
              <a
                href="https://wa.me/917988537478"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/45 bg-[#082c3d]/35 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#48e0bb] hover:bg-white/10"
              >
                <span className="text-[#48e0bb]">◉</span> Talk to our team
              </a>
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-[570px] dn-service-animate"
            style={{ animationDelay: ".12s" }}
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-[#23d0a5]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-2xl">
              <img
                src={heroImage}
                alt={`${service.title} visual`}
                className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[365px]"
                onError={(event) => {
                  if (!event.currentTarget.dataset.fallbackApplied) {
                    event.currentTarget.dataset.fallbackApplied = "true";
                    event.currentTarget.src = bg;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062735]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-[#092f3e]/80 p-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#48e0bb]">
                  Making property journeys simpler
                </p>
                <h2 className="mt-1 text-lg font-bold sm:text-xl">
                  {service.heroCardTitle || "Your goals. Our guidance."}
                </h2>
                <p className="mt-1 text-sm leading-6 text-white/75">
                  {service.heroCardText ||
                    "Helpful support, trusted connections and clear next steps."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 px-5 pb-6 sm:grid-cols-4 sm:gap-3 sm:px-8 lg:px-10">
          {heroFeatures.map((feature, index) => {
            const FeatureIcon = [Wallet, ShieldCheck, CheckCircle2, FileCheck2][
              index % 4
            ];
            return (
              <div
                key={`${feature}-${index}`}
                className="flex min-h-[68px] items-center gap-2 rounded-xl border border-white/10 bg-[#0c3545]/95 p-3 shadow-xl backdrop-blur sm:gap-3 sm:p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#35d7ae]/70 bg-[#35d7ae]/10 text-[#48e0bb]">
                  <FeatureIcon size={18} />
                </span>
                <span className="text-[11px] font-semibold leading-4 text-white/90 sm:text-xs">
                  {feature}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-10 lg:pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1.03fr_.97fr] lg:gap-14">
          <div className="dn-service-animate">
            <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">
              <span className="mr-2">⌂</span> About this service
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-[#102b3b] sm:text-4xl">
              {service.overviewHeading || "A simpler way to"}{" "}
              {!service.overviewHeading && (
                <span className="text-[#0dbb96]">move forward</span>
              )}
            </h2>
            <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
              {service.description || service.shortDescription || service.desc}
            </p>

            {features.length > 0 && (
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {features.slice(0, 4).map((feature, index) => {
                  const FeatureIcon = [Users, Users, FileCheck2, ShieldCheck][
                    index % 4
                  ];
                  return (
                    <div
                      key={`${feature}-${index}`}
                      className="flex gap-3 border-b border-slate-100 pb-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4f8f2] text-[#079e80]">
                        <FeatureIcon size={19} />
                      </span>
                      <p className="pt-1 text-sm font-medium leading-6 text-[#193849]">
                        {feature}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div
            className="relative dn-service-animate"
            style={{ animationDelay: ".1s" }}
          >
            <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full bg-[#c9f4e8]" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 dn-service-shadow">
              <img
                src={overviewImage}
                alt={`${service.title} overview`}
                className="h-[280px] w-full object-cover sm:h-[390px]"
                loading="lazy"
                onError={(event) => {
                  if (!event.currentTarget.dataset.fallbackApplied) {
                    event.currentTarget.dataset.fallbackApplied = "true";
                    event.currentTarget.src = bg;
                  }
                }}
              />
            </div>
            <div className="absolute -bottom-4 right-3 max-w-[240px] rounded-xl border border-white/60 bg-[#078f78] p-4 text-white shadow-xl sm:-right-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <Home size={18} />
                </span>
                <p className="text-sm font-bold">
                  {service.overviewBadgeTitle || "Made easier with DigiNiwas"}
                </p>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/80">
                {service.overviewBadgeText ||
                  "Practical guidance and support for your next step."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CMS content blocks */}
      {sections.length > 0 && (
        <section className="dn-service-soft-pattern bg-[#effaf7] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-9 max-w-2xl text-center">
              <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">
                Explore the service
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">
                {service.sectionsHeading || "Everything you need to know"}
              </h2>
              {service.sectionsSubheading && (
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  {service.sectionsSubheading}
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((item, index) => {
                const SectionIcon = detailIcons[item.icon] || CheckCircle2;
                const sectionImage =
                  typeof item.image === "string" ? item.image : item.image?.url;
                return (
                  <article
                    key={`${item.title || "section"}-${index}`}
                    className="overflow-hidden rounded-2xl border border-[#dcefe9] bg-white shadow-[0_8px_28px_rgba(8,60,65,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(8,60,65,.12)]"
                  >
                    {sectionImage && (
                      <img
                        src={sectionImage}
                        alt={item.title || `Service detail ${index + 1}`}
                        className="h-48 w-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-extrabold text-[#0aa887]">
                          {item.number || String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f8f2] text-[#079e80]">
                          <SectionIcon size={20} />
                        </span>
                      </div>
                      {item.title && (
                        <h3 className="mt-4 text-lg font-bold text-[#102b3b]">
                          {item.title}
                        </h3>
                      )}
                      {item.content && (
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                          {item.content}
                        </p>
                      )}
                      {item.subcontent && (
                        <p className="mt-3 whitespace-pre-line border-l-2 border-[#20c7a0] pl-3 text-xs leading-6 text-slate-500">
                          {item.subcontent}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {process.length > 0 && (
        <section className="relative overflow-hidden bg-[#f2fbf8] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="pointer-events-none absolute -right-12 top-10 h-64 w-64 rounded-full bg-[#d9f5ed] blur-2xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-9 text-center">
              <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">
                {service.processHeading || "Your next steps"}
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                {service.processSubheading ||
                  "A simple, transparent and hassle-free process."}
              </p>
            </div>
            <div
              className={`grid gap-4 ${process.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}
            >
              {process.map((step, index) => (
                <article
                  key={`${step}-${index}`}
                  className="relative rounded-2xl border border-[#e4f0ed] bg-white p-5 shadow-[0_8px_25px_rgba(8,60,65,.06)] sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#079e80] text-sm font-extrabold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f8f3] text-[#079e80]">
                      <CheckCircle2 size={21} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-[#102b3b]">
                    {typeof step === "string" ? step : step.title}
                  </h3>
                  {typeof step !== "string" && step.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery / image tags */}
      {images.length > 0 && (
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">
                  Visual highlights
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">
                  {service.galleryHeading || "Explore the details"}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-500">
                A closer look at the details that make this service useful for
                your property journey.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((url, index) => (
                <figure
                  key={`${url}-${index}`}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                  <img
                    src={url}
                    alt={`${service.title} image ${index + 1}`}
                    loading="lazy"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-64"
                  />
                  {typeof imageItems[index] === "object" &&
                    imageItems[index]?.tag && (
                      <figcaption className="px-4 py-3 text-sm font-semibold text-[#193849]">
                        {imageItems[index].tag}
                      </figcaption>
                    )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">
                Why choose us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">
                {service.benefitsHeading || "Benefits you can count on"}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <article
                  key={`${benefit}-${index}`}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_28px_rgba(8,60,65,.07)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(8,60,65,.12)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#079e80] text-white">
                    <CheckCircle2 size={21} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[#102b3b]">
                    {typeof benefit === "string" ? benefit : benefit.title}
                  </h3>
                  {typeof benefit !== "string" && benefit.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {benefit.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-4 py-12 sm:px-8 sm:py-16">
        <FAQSection title="Niwas AI FAQs" subtitle="Quick answers about AI property search, safe decisions and support." groups={[{ title: "Niwas AI FAQs", items: [{ question: "What is Niwas AI?", answer: "Niwas AI helps you explore property options, understand localities and get started with your property search." }, { question: "Can AI property information be inaccurate?", answer: "Yes. Please independently verify legal, financial, pricing and property details before making a decision." }] }, { title: "Safety & Support", items: [{ question: "How can I report a suspicious listing?", answer: "Use the report option on the listing where available, or contact DigiNiwas support." }, { question: "How do I contact DigiNiwas?", answer: "Use Help & Support or email info@diginiwas.com." }] }]} />
      </section>
      <FutureEcosystem />

      {/* FAQ must not render when the backend has no FAQs */}
      {faqs.length > 0 && (
        <section className="bg-[#f1faf7] px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-7 text-center">
              <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#079e80]">
                Need to know
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102b3b] sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <article
                  key={`${faq.question}-${index}`}
                  className="overflow-hidden rounded-xl border border-[#dcefe9] bg-white shadow-sm"
                >
                  <button
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#102b3b] sm:px-6"
                  >
                    <span>{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e5f8f2] text-lg text-[#079e80]">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === index && (
                    <p className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600 sm:px-6">
                      {faq.answer}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white px-5 pb-10 pt-4 sm:px-8 sm:pb-14 lg:px-10">
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-[#0ab994]/30 bg-[#082f40] p-6 text-white shadow-[0_15px_40px_rgba(8,47,64,.18)] sm:flex-row sm:items-center sm:p-9 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(36,208,165,.18),transparent_55%)]" />
          <div className="relative">
            <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#48e0bb]">
              Ready to begin?
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {service.ctaHeading ||
                "Let’s make your property journey simpler."}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              {service.ctaDescription ||
                "Talk to our team and get expert guidance for your next step."}
            </p>
          </div>
          <div className="relative flex shrink-0 flex-wrap gap-3">
            <Link
              to={service.ctaLink || "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-[#24d0a5] px-5 py-3.5 text-sm font-bold text-[#062b32] transition hover:-translate-y-0.5 hover:bg-[#51e4bf]"
            >
              {service.ctaText || "Get Started"} <ArrowRight size={17} />
            </Link>
            <a
              href="https://wa.me/917988537478"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-[#48e0bb]"
            >
              Talk to our team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

