// // // import { useNavigate } from "react-router-dom";
// // // import React, { useState } from "react";
// // // import { NavLink } from "react-router-dom";
// // // import ComingSoonVideo from "../components/common/ComingSoonVideo";
// // // import axios from "../api/axios";

// // // import {
// // //   FaFacebookF,
// // //   FaInstagram,
// // //   FaLinkedinIn,
// // //   FaYoutube,
// // // } from "react-icons/fa";
// // // import { MdEmail, MdCall, MdLocationOn } from "react-icons/md";

// // // const footerLinks = {
// // //   "Quick Links": [
// // //     { label: "Home", path: "/" },
// // //     { label: "Explore Properties", path: "/explore-property" },
// // //     { label: "Niwas AI", path: "/niwas-ai" },
// // //     { label: "Partner Corner", path: "/agent-corner" },
// // //     { label: "About Us", path: "/about" },
// // //   ],

// // //   Legal: [
// // //     { label: "Privacy Policy", path: "/privacy-policy" },
// // //     { label: "Terms of Service", path: "/terms-service" },
// // //     { label: "Partner & Credit Terms", path: "/partner-terms" },
// // //     { label: "Listing Guidelines", path: "/listing-guidelines" },
// // //     { label: "Refund & Credit Policy", path: "/refund-policy" },
// // //     { label: "Cookie Policy", path: "/cookie-policy" },
// // //     { label: "Blogs", path: "/blogs" },
// // //   ],
// // // };

// // // const socialLinks = [
// // //   {
// // //     icon: <FaFacebookF />,
// // //     link: "#",
// // //   },
// // //   {
// // //     icon: <FaInstagram />,
// // //     link: "#",
// // //   },
// // //   {
// // //     icon: <FaLinkedinIn />,
// // //     link: "#",
// // //   },
// // //   {
// // //     icon: <FaYoutube />,
// // //     link: "#",
// // //   },
// // // ];

// // // export default function Footer() {
// // //   const navigate = useNavigate();
// // //   const [showComingSoon, setShowComingSoon] = useState(false);
// // //   const [cmsFooterGroups, setCmsFooterGroups] = useState([]);
// // //   const [seoProperties, setSeoProperties] = useState([]);

// // //   React.useEffect(() => {
// // //     let active = true;
// // //     axios
// // //       .get("/v1/seo/footer-links")
// // //       .then((response) => {
// // //         const groups = response?.data?.data;
// // //         if (active && Array.isArray(groups))
// // //           setCmsFooterGroups(groups.filter((group) => group.links?.length));
// // //       })
// // //       .catch(() => {});
// // //     axios
// // //       .get(`${import.meta.env.VITE_API_URL}/api/properties`)
// // //       .then((response) => {
// // //         const properties =
// // //           response?.data?.properties || response?.data?.data || [];
// // //         if (active && Array.isArray(properties))
// // //           setSeoProperties(
// // //             properties.filter((p) => p && (p.city || p.address?.city)),
// // //           );
// // //       })
// // //       .catch(() => {});
// // //     return () => {
// // //       active = false;
// // //     };
// // //   }, []);

// // //   const visibleFooterGroups = cmsFooterGroups.length
// // //     ? cmsFooterGroups
// // //     : Object.entries(footerLinks).map(([title, links]) => ({ title, links }));
// // //   const slug = (value) =>
// // //     String(value || "")
// // //       .trim()
// // //       .toLowerCase()
// // //       .replace(/[^a-z0-9]+/g, "-")
// // //       .replace(/^-|-$/g, "");
// // //   const getCity = (p) => p.city || p.address?.city || "";
// // //   const getLocality = (p) =>
// // //     p.locality || p.area || p.address?.locality || p.address?.area || "";
// // //   const getType = (p) =>
// // //     String(
// // //       p.buildingType ||
// // //         p.propertyCategory ||
// // //         p.propertyType ||
// // //         p.category ||
// // //         p.property_for ||
// // //         "",
// // //     ).toLowerCase();
// // //   const getListing = (p) =>
// // //     String(
// // //       p.listingType ||
// // //         p.listing_type ||
// // //         p.purpose ||
// // //         p.transactionType ||
// // //         p.propertyFor ||
// // //         "",
// // //     ).toLowerCase();
// // //   const seoGroups = [
// // //     {
// // //       title: "Properties & Flats for Sale",
// // //       category: "flats-for-sale",
// // //       match: (p) =>
// // //         !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
// // //     },
// // //     {
// // //       title: "Flats for Rent",
// // //       category: "flats-for-rent",
// // //       match: (p) =>
// // //         !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
// // //     },
// // //     {
// // //       title: "Residential Properties for Sale",
// // //       category: "properties-for-sale",
// // //       match: (p) =>
// // //         !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
// // //     },
// // //     {
// // //       title: "Commercial Properties for Sale",
// // //       category: "commercial-property-for-sale",
// // //       match: (p) =>
// // //         getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
// // //     },
// // //     {
// // //       title: "Residential Properties for Rent",
// // //       category: "properties-for-rent",
// // //       match: (p) =>
// // //         !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
// // //     },
// // //     {
// // //       title: "Commercial Properties for Rent",
// // //       category: "commercial-property-for-rent",
// // //       match: (p) =>
// // //         getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
// // //     },
// // //   ].map((group) => {
// // //     const relevant = seoProperties.filter(group.match);
// // //     const cities = [...new Set(relevant.map(getCity).filter(Boolean))].sort(
// // //       (a, b) => a.localeCompare(b),
// // //     );
// // //     const links = [];
// // //     cities.forEach((city) => {
// // //       links.push({
// // //         label: `${group.title} in ${city}`,
// // //         path: `/${slug(city)}/${group.category}`,
// // //       });
// // //       const localities = [
// // //         ...new Set(
// // //           relevant
// // //             .filter((p) => getCity(p).toLowerCase() === city.toLowerCase())
// // //             .map(getLocality)
// // //             .filter(Boolean),
// // //         ),
// // //       ].sort((a, b) => a.localeCompare(b));
// // //       localities.forEach((locality) =>
// // //         links.push({
// // //           label: `${group.title} in ${locality}, ${city}`,
// // //           path: `/${slug(city)}/${slug(locality)}/${group.category}`,
// // //         }),
// // //       );
// // //     });
// // //     return { ...group, links };
// // //   });

// // //   return (
// // //     <footer className="bg-[#274255] text-white">

// // //       <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
// // //           {/* Logo */}
// // //           <div>
// // //             <NavLink to="/">
// // //               <img
// // //                 src="https://res.cloudinary.com/dhuabv2it/image/upload/v1780739847/DIGINIWAS_FINAL_page-2-removebg-preview_o3fesd.png"
// // //                 className="w-40"
// // //                 alt="DigiNiwas"
// // //               />
// // //             </NavLink>

// // //             <p className="mt-5 text-white/70 leading-7 text-sm">
// // //               DigiNiwas — India's Smart Property Ecosystem Connecting customers,
// // //               property professionals, and trusted services through AI-powered
// // //               real estate solutions.
// // //             </p>

// // //             <div className="flex gap-3 mt-6">
// // //               {socialLinks.map((item, index) => (
// // //                 <span
// // //                   onClick={() => setShowComingSoon(true)}
// // //                   // href={item.link}
// // //                   key={index}
// // //                   className="w-10 h-10 cursor-pointer rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#33cc99] hover:text-[#274255] transition-all duration-300"
// // //                 >
// // //                   {item.icon}
// // //                 </span>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Quick Links + Legal */}

// // //           {visibleFooterGroups.map(({ title, links }) => (
// // //             <div key={title}>
// // //               <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>

// // //               <ul className="space-y-4">
// // //                 {links.map((item, index) => (
// // //                   <li key={index}>
// // //                     <NavLink
// // //                       to={item.path}
// // //                       className="text-white/70 hover:text-[#33cc99] transition-all duration-300"
// // //                     >
// // //                       {item.label}
// // //                     </NavLink>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           ))}

// // //           {/* Contact */}

// // //           <div>
// // //             <h3 className="text-xl font-semibold mb-6">Contact Us</h3>

// // //             <div className="space-y-5">
// // //               <div className="flex gap-3">
// // //                 <MdLocationOn className="text-[#33cc99] text-2xl mt-1 flex-shrink-0" />

// // //                 <p className="text-white/70">
// // //                   Haryana,
// // //                   <br />
// // //                   India
// // //                 </p>
// // //               </div>

// // //               <div className="flex gap-3 items-center">
// // //                 <MdEmail className="text-[#33cc99] text-xl" />

// // //                 <span className="text-white/70">diginiwas@gmail.com</span>
// // //               </div>

// // //               <div className="flex gap-3 items-center">
// // //                 <MdCall className="text-[#33cc99] text-xl" />

// // //                 <span className="text-white/70">+91 82854 66557</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Bottom */}

// // //       <div className="border-t border-white/10">
// // //         <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
// // //           <p className="text-white/60 text-sm text-center md:text-left">
// // //             ©️ 2026 DigiNiwas. All Rights Reserved.
// // //           </p>

// // //           <div>
// // //             <p
// // //               onClick={() =>
// // //                 window.open("https://www.technoviaan.com/", "_blank")
// // //               }
// // //               className="cursor-pointer text-sm text-white/60 hover:underline"
// // //             >
// // //               Developed and designed by{" "}
// // //               <span> Technoviaan Software Solution</span>
// // //             </p>
// // //           </div>
// // //           <div className="flex flex-wrap justify-center gap-6">
// // //             <NavLink
// // //               to="/privacy-policy"
// // //               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
// // //             >
// // //               Privacy
// // //             </NavLink>

// // //             <NavLink
// // //               to="/terms-service"
// // //               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
// // //             >
// // //               Terms
// // //             </NavLink>

// // //             <NavLink
// // //               to="/cookie-policy"
// // //               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
// // //             >
// // //               Cookies
// // //             </NavLink>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showComingSoon && (
// // //         <ComingSoonVideo
// // //           setShowComingSoon={setShowComingSoon}
// // //           video={import.meta.env.VITE_NIWAS_AI}
// // //         />
// // //       )}
// // //     </footer>
// // //   );
// // // }
// // import { useNavigate } from "react-router-dom";
// // import React, { useState } from "react";
// // import { NavLink } from "react-router-dom";
// // import ComingSoonVideo from "../components/common/ComingSoonVideo";
// // import axios from "../api/axios";

// // import {
// //   FaFacebookF,
// //   FaInstagram,
// //   FaLinkedinIn,
// //   FaYoutube,
// // } from "react-icons/fa";
// // import { MdEmail, MdCall, MdLocationOn } from "react-icons/md";

// // const footerLinks = {
// //   "Quick Links": [
// //     { label: "Home", path: "/" },
// //     { label: "Explore Properties", path: "/explore-property" },
// //     { label: "Niwas AI", path: "/niwas-ai" },
// //     { label: "Partner Corner", path: "/agent-corner" },
// //     { label: "About Us", path: "/about" },
// //   ],

// //   Legal: [
// //     { label: "Privacy Policy", path: "/privacy-policy" },
// //     { label: "Terms of Service", path: "/terms-service" },
// //     { label: "Partner & Credit Terms", path: "/partner-terms" },
// //     { label: "Listing Guidelines", path: "/listing-guidelines" },
// //     { label: "Refund & Credit Policy", path: "/refund-policy" },
// //     { label: "Cookie Policy", path: "/cookie-policy" },
// //     { label: "Blogs", path: "/blogs" },
// //   ],
// // };

// // const socialLinks = [
// //   {
// //     icon: <FaFacebookF />,
// //     link: "#",
// //   },
// //   {
// //     icon: <FaInstagram />,
// //     link: "#",
// //   },
// //   {
// //     icon: <FaLinkedinIn />,
// //     link: "#",
// //   },
// //   {
// //     icon: <FaYoutube />,
// //     link: "#",
// //   },
// // ];

// // export default function Footer() {
// //   const navigate = useNavigate();
// //   const [showComingSoon, setShowComingSoon] = useState(false);
// //   const [cmsFooterGroups, setCmsFooterGroups] = useState([]);
// //   const [seoProperties, setSeoProperties] = useState([]);

// //   React.useEffect(() => {
// //     let active = true;
// //     axios
// //       .get("/v1/seo/footer-links")
// //       .then((response) => {
// //         const groups = response?.data?.data;
// //         if (active && Array.isArray(groups))
// //           setCmsFooterGroups(groups.filter((group) => group.links?.length));
// //       })
// //       .catch(() => {});
// //     axios
// //       .get(`${import.meta.env.VITE_API_URL}/api/properties`)
// //       .then((response) => {
// //         const properties =
// //           response?.data?.properties || response?.data?.data || [];
// //         if (active && Array.isArray(properties))
// //           setSeoProperties(
// //             properties.filter((p) => p && (p.city || p.address?.city)),
// //           );
// //       })
// //       .catch(() => {});
// //     return () => {
// //       active = false;
// //     };
// //   }, []);

// //   const visibleFooterGroups = cmsFooterGroups.length
// //     ? cmsFooterGroups
// //     : Object.entries(footerLinks).map(([title, links]) => ({ title, links }));
// //   const slug = (value) =>
// //     String(value || "")
// //       .trim()
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]+/g, "-")
// //       .replace(/^-|-$/g, "");
// //   const getCity = (p) => p.city || p.address?.city || "";
// //   const getLocality = (p) =>
// //     p.locality || p.area || p.address?.locality || p.address?.area || "";
// //   const getType = (p) =>
// //     String(
// //       p.buildingType ||
// //         p.propertyCategory ||
// //         p.propertyType ||
// //         p.category ||
// //         p.property_for ||
// //         "",
// //     ).toLowerCase();
// //   const getListing = (p) =>
// //     String(
// //       p.listingType ||
// //         p.listing_type ||
// //         p.purpose ||
// //         p.transactionType ||
// //         p.propertyFor ||
// //         "",
// //     ).toLowerCase();
// //   const seoGroups = [
// //     {
// //       title: "Properties & Flats for Sale",
// //       category: "flats-for-sale",
// //       match: (p) =>
// //         !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
// //     },
// //     {
// //       title: "Flats for Rent",
// //       category: "flats-for-rent",
// //       match: (p) =>
// //         !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
// //     },
// //     {
// //       title: "Residential Properties for Sale",
// //       category: "properties-for-sale",
// //       match: (p) =>
// //         !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
// //     },
// //     {
// //       title: "Commercial Properties for Sale",
// //       category: "commercial-property-for-sale",
// //       match: (p) =>
// //         getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
// //     },
// //     {
// //       title: "Residential Properties for Rent",
// //       category: "properties-for-rent",
// //       match: (p) =>
// //         !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
// //     },
// //     {
// //       title: "Commercial Properties for Rent",
// //       category: "commercial-property-for-rent",
// //       match: (p) =>
// //         getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
// //     },
// //   ].map((group) => {
// //     const relevant = seoProperties.filter(group.match);
// //     const cities = [...new Set(relevant.map(getCity).filter(Boolean))].sort(
// //       (a, b) => a.localeCompare(b),
// //     );
// //     const links = [];
// //     cities.forEach((city) => {
// //       links.push({
// //         label: `${group.title} in ${city}`,
// //         path: `/${slug(city)}/${group.category}`,
// //       });
// //       const localities = [
// //         ...new Set(
// //           relevant
// //             .filter((p) => getCity(p).toLowerCase() === city.toLowerCase())
// //             .map(getLocality)
// //             .filter(Boolean),
// //         ),
// //       ].sort((a, b) => a.localeCompare(b));
// //       localities.forEach((locality) =>
// //         links.push({
// //           label: `${group.title} in ${locality}, ${city}`,
// //           path: `/${slug(city)}/${slug(locality)}/${group.category}`,
// //         }),
// //       );
// //     });
// //     return { ...group, links };
// //   });

// //   return (
// //     <footer className="bg-[#274255] text-white">
// //       {/* Dynamic city and locality SEO directory, built from live property inventory */}
// //       <section className="border-t border-white/10 bg-[#091F2F] py-10">
// //         <div className="mx-auto max-w-7xl px-6 lg:px-10">
// //           <div className="mb-6">
// //             <p className="text-xs font-bold uppercase tracking-[.2em] ">
// //               Explore by category, city & locality
// //             </p>
// //             <h2 className="mt-2 text-2xl font-bold text-[#33cc99]">
// //               Find properties across India
// //             </h2>
// //             {/* <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
// //               These links are generated from the cities and localities present
// //               in current property listings.
// //             </p> */}
// //           </div>
// //           <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
// //             {seoGroups.map((group) => (
// //               <div key={group.title} className="min-w-0">
// //                 <h3 className="mb-3 text-sm font-bold text-white">
// //                   {group.title}
// //                 </h3>
// //                 <div className="space-y-2">
// //                   {group.links.length ? (
// //                     group.links.map((item) => (
// //                       <NavLink
// //                         key={`${group.title}-${item.path}`}
// //                         to={item.path}
// //                         className="block text-xs leading-5 text-white/65 transition hover:text-[#33cc99]"
// //                       >
// //                         {item.label}
// //                       </NavLink>
// //                     ))
// //                   ) : (
// //                     <p className="text-xs text-white/40">
// //                       Listings will appear here when available.
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
// //           {/* Logo */}
// //           <div>
// //             <NavLink to="/">
// //               <img
// //                 src="https://res.cloudinary.com/dhuabv2it/image/upload/v1780739847/DIGINIWAS_FINAL_page-2-removebg-preview_o3fesd.png"
// //                 className="w-40"
// //                 alt="DigiNiwas"
// //               />
// //             </NavLink>

// //             <p className="mt-5 text-white/70 leading-7 text-sm">
// //               DigiNiwas — India's Smart Property Ecosystem Connecting customers,
// //               property professionals, and trusted services through AI-powered
// //               real estate solutions.
// //             </p>

// //             <div className="flex gap-3 mt-6">
// //               {socialLinks.map((item, index) => (
// //                 <span
// //                   onClick={() => setShowComingSoon(true)}
// //                   // href={item.link}
// //                   key={index}
// //                   className="w-10 h-10 cursor-pointer rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#33cc99] hover:text-[#274255] transition-all duration-300"
// //                 >
// //                   {item.icon}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Quick Links + Legal */}

// //           {visibleFooterGroups.map(({ title, links }) => (
// //             <div key={title}>
// //               <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>

// //               <ul className="space-y-4">
// //                 {links.map((item, index) => (
// //                   <li key={index}>
// //                     <NavLink
// //                       to={item.path}
// //                       className="text-white/70 hover:text-[#33cc99] transition-all duration-300"
// //                     >
// //                       {item.label}
// //                     </NavLink>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}

// //           {/* Contact */}

// //           <div>
// //             <h3 className="text-xl font-semibold mb-6">Contact Us</h3>

// //             <div className="space-y-5">
// //               <div className="flex gap-3">
// //                 <MdLocationOn className="text-[#33cc99] text-2xl mt-1 flex-shrink-0" />

// //                 <p className="text-white/70">
// //                   Haryana,
// //                   <br />
// //                   India
// //                 </p>
// //               </div>

// //               <div className="flex gap-3 items-center">
// //                 <MdEmail className="text-[#33cc99] text-xl" />

// //                 <span className="text-white/70">diginiwas@gmail.com</span>
// //               </div>

// //               <div className="flex gap-3 items-center">
// //                 <MdCall className="text-[#33cc99] text-xl" />

// //                 <span className="text-white/70">+91 82854 66557</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bottom */}

// //       <div className="border-t border-white/10">
// //         <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
// //           <p className="text-white/60 text-sm text-center md:text-left">
// //             ©️ 2026 DigiNiwas. All Rights Reserved.
// //           </p>

// //           <div>
// //             <p
// //               onClick={() =>
// //                 window.open("https://www.technoviaan.com/", "_blank")
// //               }
// //               className="cursor-pointer text-sm text-white/60 hover:underline"
// //             >
// //               Developed and designed by{" "}
// //               <span> Technoviaan Software Solution</span>
// //             </p>
// //           </div>
// //           <div className="flex flex-wrap justify-center gap-6">
// //             <NavLink
// //               to="/privacy-policy"
// //               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
// //             >
// //               Privacy
// //             </NavLink>

// //             <NavLink
// //               to="/terms-service"
// //               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
// //             >
// //               Terms
// //             </NavLink>

// //             <NavLink
// //               to="/cookie-policy"
// //               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
// //             >
// //               Cookies
// //             </NavLink>
// //           </div>
// //         </div>
// //       </div>

// //       {showComingSoon && (
// //         <ComingSoonVideo
// //           setShowComingSoon={setShowComingSoon}
// //           video={import.meta.env.VITE_NIWAS_AI}
// //         />
// //       )}
// //     </footer>
// //   );
// // }


// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import ComingSoonVideo from "../components/common/ComingSoonVideo";
// import axios from "../api/axios";

// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";
// import { MdEmail, MdCall, MdLocationOn } from "react-icons/md";

// const footerLinks = {
//   "Quick Links": [
//     { label: "Home", path: "/" },
//     { label: "Explore Properties", path: "/explore-property" },
//     { label: "Niwas AI", path: "/niwas-ai" },
//     { label: "Partner Corner", path: "/agent-corner" },
//     { label: "About Us", path: "/about" },
//   ],

//   Legal: [
//     { label: "Privacy Policy", path: "/privacy-policy" },
//     { label: "Terms of Service", path: "/terms-service" },
//     { label: "Partner & Credit Terms", path: "/partner-terms" },
//     { label: "Listing Guidelines", path: "/listing-guidelines" },
//     { label: "Refund & Credit Policy", path: "/refund-policy" },
//     { label: "Cookie Policy", path: "/cookie-policy" },
//     { label: "Blogs", path: "/blogs" },
//   ],
// };

// const socialLinks = [
//   {
//     icon: <FaFacebookF />,
//     link: "#",
//   },
//   {
//     icon: <FaInstagram />,
//     link: "#",
//   },
//   {
//     icon: <FaLinkedinIn />,
//     link: "#",
//   },
//   {
//     icon: <FaYoutube />,
//     link: "#",
//   },
// ];

// export default function Footer() {
//   const navigate = useNavigate();
//   const [showComingSoon, setShowComingSoon] = useState(false);
//   const [cmsFooterGroups, setCmsFooterGroups] = useState([]);
//   const [seoProperties, setSeoProperties] = useState([]);
//   const [activeSeoTab, setActiveSeoTab] = useState("Properties & Flats for Sale");

//   React.useEffect(() => {
//     let active = true;
//     axios
//       .get("/v1/seo/footer-links")
//       .then((response) => {
//         const groups = response?.data?.data;
//         if (active && Array.isArray(groups))
//           setCmsFooterGroups(groups.filter((group) => group.links?.length));
//       })
//       .catch(() => {});
//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/properties`)
//       .then((response) => {
//         const properties =
//           response?.data?.properties || response?.data?.data || [];
//         if (active && Array.isArray(properties))
//           setSeoProperties(
//             properties.filter((p) => p && (p.city || p.address?.city)),
//           );
//       })
//       .catch(() => {});
//     return () => {
//       active = false;
//     };
//   }, []);

//   const visibleFooterGroups = cmsFooterGroups.length
//     ? cmsFooterGroups
//     : Object.entries(footerLinks).map(([title, links]) => ({ title, links }));
//   const slug = (value) =>
//     String(value || "")
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-|-$/g, "");
//   const getCity = (p) => p.city || p.address?.city || "";
//   const getLocality = (p) =>
//     p.locality || p.area || p.address?.locality || p.address?.area || "";
//   const getType = (p) =>
//     String(
//       p.buildingType ||
//         p.propertyCategory ||
//         p.propertyType ||
//         p.category ||
//         p.property_for ||
//         "",
//     ).toLowerCase();
//   const getListing = (p) =>
//     String(
//       p.listingType ||
//         p.listing_type ||
//         p.purpose ||
//         p.transactionType ||
//         p.propertyFor ||
//         "",
//     ).toLowerCase();
//   const seoGroups = [
//     {
//       title: "Properties & Flats for Sale",
//       category: "flats-for-sale",
//       match: (p) =>
//         !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
//     },
//     {
//       title: "Flats for Rent",
//       category: "flats-for-rent",
//       match: (p) =>
//         !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
//     },
//     {
//       title: "Residential Properties for Sale",
//       category: "properties-for-sale",
//       match: (p) =>
//         !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
//     },
//     {
//       title: "Commercial Properties for Sale",
//       category: "commercial-property-for-sale",
//       match: (p) =>
//         getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
//     },
//     {
//       title: "Residential Properties for Rent",
//       category: "properties-for-rent",
//       match: (p) =>
//         !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
//     },
//     {
//       title: "Commercial Properties for Rent",
//       category: "commercial-property-for-rent",
//       match: (p) =>
//         getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
//     },
//   ].map((group) => {
//     const relevant = seoProperties.filter(group.match);
//     const cities = [...new Set(relevant.map(getCity).filter(Boolean))].sort(
//       (a, b) => a.localeCompare(b),
//     );
//     const cityGroups = cities.map((city) => {
//       const cityProperties = relevant.filter(
//         (p) => getCity(p).toLowerCase() === city.toLowerCase(),
//       );
//       const localities = [
//         ...new Set(cityProperties.map(getLocality).filter(Boolean)),
//       ]
//         .sort((a, b) => a.localeCompare(b))
//         .map((locality) => ({
//           label: `${group.title} in ${locality}, ${city}`,
//           path: `/${slug(city)}/${slug(locality)}/${group.category}`,
//         }));
//       return {
//         city,
//         label: `${group.title} in ${city}`,
//         path: `/${slug(city)}/${group.category}`,
//         localities,
//       };
//     });
//     return { ...group, cityGroups };
//   });

//   const activeSeoGroup =
//     seoGroups.find((group) => group.title === activeSeoTab) || seoGroups[0];

//   return (
//     <footer className="bg-[#274255] text-white">
//       {/* Dynamic city and locality SEO directory, built from live property inventory */}
//       <section className="border-t border-white/10 bg-[#091F2F] py-10">
//         <div className="mx-auto max-w-7xl px-6 lg:px-10">
//           <div className="mb-6">
//             <p className="text-xs font-bold uppercase tracking-[.2em] ">
//               Explore by category, city & locality
//             </p>
//             <h2 className="mt-2 text-2xl font-bold text-[#33cc99]">
//               Find properties across India
//             </h2>
//             {/* <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
//               These links are generated from the cities and localities present
//               in current property listings.
//             </p> */}
//           </div>
//           <div
//             className="mb-6 flex flex-wrap gap-2"
//             role="tablist"
//             aria-label="Property SEO categories"
//           >
//             {seoGroups.map((group) => {
//               const isActive = activeSeoTab === group.title;
//               return (
//                 <button
//                   key={group.title}
//                   type="button"
//                   role="tab"
//                   aria-selected={isActive}
//                   onClick={() => setActiveSeoTab(group.title)}
//                   className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
//                     isActive
//                       ? "border-[#33cc99] bg-[#33cc99] text-[#092331]"
//                       : "border-white/20 bg-white/5 text-white/75 hover:border-[#33cc99] hover:text-[#33cc99]"
//                   }`}
//                 >
//                   {group.title}
//                 </button>
//               );
//             })}
//           </div>

//           <div role="tabpanel" className="min-h-[100px]">
//             <h3 className="mb-4 text-base font-bold text-white">
//               {activeSeoGroup?.title}
//             </h3>
//             {activeSeoGroup?.cityGroups?.length ? (
//               <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {activeSeoGroup.cityGroups.map((cityGroup) => (
//                   <div key={`${activeSeoGroup.title}-${cityGroup.city}`} className="min-w-0">
//                     <NavLink
//                       to={cityGroup.path}
//                       className="mb-3 block text-sm font-semibold text-white transition hover:text-[#33cc99]"
//                     >
//                       {cityGroup.label}
//                     </NavLink>
//                     <div className="space-y-2 border-l border-white/15 pl-3">
//                       {cityGroup.localities.length ? (
//                         cityGroup.localities.map((item) => (
//                           <NavLink
//                             key={`${activeSeoGroup.title}-${item.path}`}
//                             to={item.path}
//                             className="block text-xs leading-5 text-white/65 transition hover:text-[#33cc99]"
//                           >
//                             {item.label}
//                           </NavLink>
//                         ))
//                       ) : (
//                         <p className="text-xs text-white/40">
//                           No locality-specific listings available.
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-xs text-white/50">
//                 Listings will appear here when available.
//               </p>
//             )}
//           </div>
//         </div>
//       </section>


//       <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
//           {/* Logo */}
//           <div>
//             <NavLink to="/">
//               <img
//                 src="https://res.cloudinary.com/dhuabv2it/image/upload/v1780739847/DIGINIWAS_FINAL_page-2-removebg-preview_o3fesd.png"
//                 className="w-40"
//                 alt="DigiNiwas"
//               />
//             </NavLink>

//             <p className="mt-5 text-white/70 leading-7 text-sm">
//               DigiNiwas — India's Smart Property Ecosystem Connecting customers,
//               property professionals, and trusted services through AI-powered
//               real estate solutions.
//             </p>

//             <div className="flex gap-3 mt-6">
//               {socialLinks.map((item, index) => (
//                 <span
//                   onClick={() => setShowComingSoon(true)}
//                   // href={item.link}
//                   key={index}
//                   className="w-10 h-10 cursor-pointer rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#33cc99] hover:text-[#274255] transition-all duration-300"
//                 >
//                   {item.icon}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links + Legal */}

//           {visibleFooterGroups.map(({ title, links }) => (
//             <div key={title}>
//               <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>

//               <ul className="space-y-4">
//                 {links.map((item, index) => (
//                   <li key={index}>
//                     <NavLink
//                       to={item.path}
//                       className="text-white/70 hover:text-[#33cc99] transition-all duration-300"
//                     >
//                       {item.label}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           {/* Contact */}

//           <div>
//             <h3 className="text-xl font-semibold mb-6">Contact Us</h3>

//             <div className="space-y-5">
//               <div className="flex gap-3">
//                 <MdLocationOn className="text-[#33cc99] text-2xl mt-1 flex-shrink-0" />

//                 <p className="text-white/70">
//                   Haryana,
//                   <br />
//                   India
//                 </p>
//               </div>

//               <div className="flex gap-3 items-center">
//                 <MdEmail className="text-[#33cc99] text-xl" />

//                 <span className="text-white/70">diginiwas@gmail.com</span>
//               </div>

//               <div className="flex gap-3 items-center">
//                 <MdCall className="text-[#33cc99] text-xl" />

//                 <span className="text-white/70">+91 82854 66557</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom */}

//       <div className="border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-white/60 text-sm text-center md:text-left">
//             ©️ 2026 DigiNiwas. All Rights Reserved.
//           </p>

//           <div>
//             <p
//               onClick={() =>
//                 window.open("https://www.technoviaan.com/", "_blank")
//               }
//               className="cursor-pointer text-sm text-white/60 hover:underline"
//             >
//               Developed and designed by{" "}
//               <span> Technoviaan Software Solution</span>
//             </p>
//           </div>
//           <div className="flex flex-wrap justify-center gap-6">
//             <NavLink
//               to="/privacy-policy"
//               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
//             >
//               Privacy
//             </NavLink>

//             <NavLink
//               to="/terms-service"
//               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
//             >
//               Terms
//             </NavLink>

//             <NavLink
//               to="/cookie-policy"
//               className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
//             >
//               Cookies
//             </NavLink>
//           </div>
//         </div>
//       </div>

//       {showComingSoon && (
//         <ComingSoonVideo
//           setShowComingSoon={setShowComingSoon}
//           video={import.meta.env.VITE_NIWAS_AI}
//         />
//       )}
//     </footer>
//   );
// }

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ComingSoonVideo from "../components/common/ComingSoonVideo";
import axios from "../api/axios";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdCall, MdLocationOn } from "react-icons/md";

const footerLinks = {
  "Quick Links": [
    { label: "Home", path: "/" },
    { label: "Explore Properties", path: "/explore-property" },
    { label: "Niwas AI", path: "/niwas-ai" },
    { label: "Partner Corner", path: "/agent-corner" },
    { label: "About Us", path: "/about" },
  ],

  Legal: [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms-service" },
    { label: "Partner & Credit Terms", path: "/partner-terms" },
    { label: "Listing Guidelines", path: "/listing-guidelines" },
    { label: "Refund & Credit Policy", path: "/refund-policy" },
    { label: "Cookie Policy", path: "/cookie-policy" },
    { label: "Blogs", path: "/blogs" },
  ],
};

const socialLinks = [
  {
    icon: <FaFacebookF />,
    link: "#",
  },
  {
    icon: <FaInstagram />,
    link: "#",
  },
  {
    icon: <FaLinkedinIn />,
    link: "#",
  },
  {
    icon: <FaYoutube />,
    link: "#",
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [cmsFooterGroups, setCmsFooterGroups] = useState([]);
  const [seoProperties, setSeoProperties] = useState([]);
  const [activeSeoTab, setActiveSeoTab] = useState("Properties & Flats for Sale");

  React.useEffect(() => {
    let active = true;
    axios
      .get("/v1/seo/footer-links")
      .then((response) => {
        const groups = response?.data?.data;
        if (active && Array.isArray(groups))
          setCmsFooterGroups(groups.filter((group) => group.links?.length));
      })
      .catch(() => {});
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => {
        const properties =
          response?.data?.properties || response?.data?.data || [];
        if (active && Array.isArray(properties))
          setSeoProperties(
            properties.filter((p) => p && (p.city || p.address?.city)),
          );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const visibleFooterGroups = cmsFooterGroups.length
    ? cmsFooterGroups
    : Object.entries(footerLinks).map(([title, links]) => ({ title, links }));
  const slug = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const getCity = (p) => p.city || p.address?.city || "";
  const getLocality = (p) =>
    p.locality || p.area || p.address?.locality || p.address?.area || "";
  const getType = (p) =>
    String(
      p.buildingType ||
        p.propertyCategory ||
        p.propertyType ||
        p.category ||
        p.property_for ||
        "",
    ).toLowerCase();
  const getListing = (p) =>
    String(
      p.listingType ||
        p.listing_type ||
        p.purpose ||
        p.transactionType ||
        p.propertyFor ||
        "",
    ).toLowerCase();
  const seoGroups = [
    {
      title: "Properties & Flats for Sale",
      category: "flats-for-sale",
      match: (p) =>
        !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
    },
    {
      title: "Flats for Rent",
      category: "flats-for-rent",
      match: (p) =>
        !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
    },
    {
      title: "Residential Properties for Sale",
      category: "properties-for-sale",
      match: (p) =>
        !getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
    },
    {
      title: "Commercial Properties for Sale",
      category: "commercial-property-for-sale",
      match: (p) =>
        getType(p).includes("commercial") && !/rent|lease/.test(getListing(p)),
    },
    {
      title: "Residential Properties for Rent",
      category: "properties-for-rent",
      match: (p) =>
        !getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
    },
    {
      title: "Commercial Properties for Rent",
      category: "commercial-property-for-rent",
      match: (p) =>
        getType(p).includes("commercial") && /rent|lease/.test(getListing(p)),
    },
  ].map((group) => {
    const relevant = seoProperties.filter(group.match);
    const cities = [...new Set(relevant.map(getCity).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b),
    );
    const cityGroups = cities.map((city) => {
      const cityProperties = relevant.filter(
        (p) => getCity(p).toLowerCase() === city.toLowerCase(),
      );
      const localities = [
        ...new Set(cityProperties.map(getLocality).filter(Boolean)),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((locality) => ({
          label: `${group.title} in ${locality}, ${city}`,
          path: `/${slug(city)}/${slug(locality)}/${group.category}`,
        }));
      return {
        city,
        label: `${group.title} in ${city}`,
        path: `/${slug(city)}/${group.category}`,
        localities,
      };
    });
    return { ...group, cityGroups };
  });

  const activeSeoGroup =
    seoGroups.find((group) => group.title === activeSeoTab) || seoGroups[0];

  return (
    <>
    <footer className="bg-[#0b2535] text-white">
      {/* Dynamic city and locality SEO directory, built from live property inventory */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#071b29] via-[#092536] to-[#0c3040] py-10 sm:py-12">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#33cc99]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9ab2c1] sm:text-xs">
              Explore by category, city & locality
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Find properties <span className="text-[#33cc99]">across India</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">Explore verified listings by property type, city and neighbourhood.</p>
            {/* <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
              These links are generated from the cities and localities present
              in current property listings.
            </p> */}
          </div>
          <div
            className="mb-7 flex w-full flex-wrap items-center gap-1.5 sm:gap-2"
            role="tablist"
            aria-label="Property SEO categories"
          >
            {seoGroups.map((group) => {
              const isActive = activeSeoTab === group.title;
              return (
                <button
                  key={group.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSeoTab(group.title)}
                  className={`whitespace-nowrap rounded-full border px-2.5 py-2 text-[11px] font-semibold leading-tight transition-all duration-200 sm:px-3 sm:py-2 sm:text-xs xl:px-3.5 xl:text-[12px] ${
                    isActive
                      ? "border-[#33cc99] bg-[#33cc99] text-[#062330] shadow-[0_4px_18px_rgba(51,204,153,0.18)]"
                      : "border-white/15 bg-white/[0.045] text-white/75 hover:border-[#33cc99]/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {group.title}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="min-h-[100px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#33cc99]">Browse locations</p>
                <h3 className="text-base font-bold text-white sm:text-lg">{activeSeoGroup?.title}</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/55">{activeSeoGroup?.cityGroups?.length || 0} cities</span>
            </div>
            {activeSeoGroup?.cityGroups?.length ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {activeSeoGroup.cityGroups.map((cityGroup) => (
                  <div key={`${activeSeoGroup.title}-${cityGroup.city}`} className="group min-w-0 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition duration-200 hover:border-[#33cc99]/35 hover:bg-white/[0.055]">
                    <NavLink
                      to={cityGroup.path}
                      className="mb-3 flex items-start gap-2 text-sm font-bold leading-5 text-white transition hover:text-[#33cc99]"
                    >
                      <span className="mt-0.5 text-[#33cc99]">⌖</span><span>{cityGroup.label}</span>
                    </NavLink>
                    <div className="space-y-2 border-l border-white/15 pl-3">
                      {cityGroup.localities.length ? (
                        cityGroup.localities.map((item) => (
                          <NavLink
                            key={`${activeSeoGroup.title}-${item.path}`}
                            to={item.path}
                            className="block text-xs leading-5 text-white/60 transition hover:translate-x-0.5 hover:text-[#7ce8bf]"
                          >
                            {item.label}
                          </NavLink>
                        ))
                      ) : (
                        <p className="text-xs text-white/40">
                          No locality-specific listings available.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/50">
                Listings will appear here when available.
              </p>
            )}
          </div>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* Logo */}
          <div>
            <NavLink to="/">
              <img
                src="https://res.cloudinary.com/dhuabv2it/image/upload/v1780739847/DIGINIWAS_FINAL_page-2-removebg-preview_o3fesd.png"
                className="w-40"
                alt="DigiNiwas"
              />
            </NavLink>

            <p className="mt-5 text-white/70 leading-7 text-sm">
              DigiNiwas — India's Smart Property Ecosystem Connecting customers,
              property professionals, and trusted services through AI-powered
              real estate solutions.
            </p>

            <div className="flex gap-3 mt-6">
              {socialLinks.map((item, index) => (
                <span
                  onClick={() => setShowComingSoon(true)}
                  // href={item.link}
                  key={index}
                  className="w-10 h-10 cursor-pointer rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#33cc99] hover:text-[#274255] transition-all duration-300"
                >
                  {item.icon}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links + Legal */}

          {visibleFooterGroups.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>

              <ul className="space-y-4">
                {links.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className="text-white/70 hover:text-[#33cc99] transition-all duration-300"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MdLocationOn className="text-[#33cc99] text-2xl mt-1 flex-shrink-0" />

                <p className="text-white/70">
                  Haryana,
                  <br />
                  India
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <MdEmail className="text-[#33cc99] text-xl" />

                <span className="text-white/70">diginiwas@gmail.com</span>
              </div>

              <div className="flex gap-3 items-center">
                <MdCall className="text-[#33cc99] text-xl" />

                <span className="text-white/70">+91 82854 66557</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            ©️ 2026 DigiNiwas. All Rights Reserved.
          </p>

          <div>
            <p
              onClick={() =>
                window.open("https://www.technoviaan.com/", "_blank")
              }
              className="cursor-pointer text-sm text-white/60 hover:underline"
            >
              Developed and designed by{" "}
              <span> Technoviaan Software Solution</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <NavLink
              to="/privacy-policy"
              className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
            >
              Privacy
            </NavLink>

            <NavLink
              to="/terms-service"
              className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
            >
              Terms
            </NavLink>

            <NavLink
              to="/cookie-policy"
              className="text-white/60 hover:text-[#33cc99] text-sm transition-all"
            >
              Cookies
            </NavLink>
          </div>
        </div>
      </div>

      {showComingSoon && (
        <ComingSoonVideo
          setShowComingSoon={setShowComingSoon}
          video={import.meta.env.VITE_NIWAS_AI}
        />
      )}
    </footer>
    </>
  );
}
