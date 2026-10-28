// import { useEffect, useMemo, useRef, useState } from "react";

// import { useLocation, useNavigate } from "react-router-dom";

// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// import L from "leaflet";

// import {
//   Bath,
//   BedDouble,
//   Building2,
//   Check,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Home as HomeIcon,
//   MapPin,
//   Maximize2,
//   Navigation,
//   Search,
//   SlidersHorizontal,
//   X,
// } from "lucide-react";

// import axios from "../api/axios";

// import propertyFallback from "../assets/images/property.png";

// import PropertyDiscoverySection from "./home/PropertyDiscoverySection";
// import { createPropertyLogoIcon } from "../components/common/propertyMapMarker";

// import FAQSection from "../components/common/FAQSection";

// const exploreFaqs = [
//   {
//     title: "Buyer FAQs",

//     items: [
//       {
//         question: "How do I search for a property?",
//         answer:
//           "Use search, filters, map view or Niwas AI to find properties based on location, budget, property type and preferences.",
//       },

//       {
//         question: "Can I save and compare properties?",
//         answer:
//           "Yes, where those features are available. Use Save/Shortlist and Compare to review selected listings later.",
//       },

//       {
//         question: "Does DigiNiwas guarantee property information?",
//         answer:
//           "No. Users must independently verify ownership, approvals, measurements, pricing, condition and other important transaction information.",
//       },
//     ],
//   },

//   {
//     title: "Support FAQs",

//     items: [
//       {
//         question: "How do I contact DigiNiwas?",
//         answer: "Use Help & Support in the app or email info@diginiwas.com.",
//       },
//     ],
//   },

//   {
//     title: "Safety FAQs",

//     items: [
//       {
//         question: "How do I report a suspicious property?",
//         answer:
//           "Open the property listing, use Report Property, choose the reason and submit the report. You may also report a Partner/User where the feature is available.",
//       },
//     ],
//   },
// ];

// const LIGHT_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// const LIGHT_TILE_ATTRIBUTION =
//   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// const RESIDENTIAL_TYPES = [
//   "Apartment",
//   "Villa",
//   "Plot",
//   "Builder Floor",
//   "Penthouse",
//   "Independent House",
// ];

// const COMMERCIAL_TYPES = [
//   "Office Space",
//   "Shop",
//   "Land",
//   "Office Space in IT/SEZ",
//   "Showroom",
//   "Warehouse",
//   "Industrial Plot",
//   "Co-working Space",
// ];

// const BHK_TYPES = [
//   "Studio",
//   "1 RK",
//   "1 BHK",
//   "1.5 BHK",
//   "2 BHK",
//   "2.5 BHK",
//   "3 BHK",
//   "3.5 BHK",
//   "4 BHK",
//   "5 BHK",
//   "6 BHK",
//   "6+ BHK",
// ];

// const FURNISHING = ["Furnished", "Semi-Furnished", "Unfurnished"];

// const AREA_TYPES = [
//   "Built-up Area",
//   "Super Built-up Area",
//   "Carpet Area",
//   "Saleable Area",
//   "Plot Area",
// ];

// const FACING = [
//   "East",
//   "West",
//   "North",
//   "South",
//   "North East",
//   "North West",
//   "South East",
//   "South West",
// ];

// const VIEWS = [
//   "Beach View",
//   "Garden View",
//   "Golf Course",
//   "Lake View",
//   "Park View",
//   "Road View",
//   "Community View",
//   "Pool View",
//   "Creek View",
//   "Sea View",
// ];

// const FLOORING = [
//   "Marble",
//   "Concrete",
//   "Cemented",
//   "Carpeted",
//   "Wooden",
//   "Vitrified Tiles",
//   "Wooden Tiles",
//   "Imported Tiles",
//   "Indian Tiles",
//   "Ceramic",
//   "Hardwood",
//   "Carpet",
//   "Others",
// ];

// const WATER = ["Municipal Supply", "Borewell/Underground", "Tanker", "Others"];

// const AMENITIES = [
//   "Gymnasium",
//   "Swimming Pool",
//   "Kids Play Areas",
//   "Jogging/Cycle Track",
//   "Power Backup",
//   "Attached Market",
//   "24 x 7 Security",
//   "Clubhouse",
//   "High Speed Elevators",
//   "Day Care Center",
//   "Party Hall",
//   "EV Charging",
//   "Multi-level Parking",
//   "Multi-purpose Sports Court",
//   "Theatre/Mini Cinema",
//   "Rooftop Deck/Observatory",
//   "Shopping Complex",
//   "Community Shuttle Service",
//   "Central Park",
// ];

// const RES_HIGHLIGHTS = [
//   "Pet Friendly",
//   "Gated Community",
//   "Smart Home",
//   "Premium Location",
//   "Corner Unit",
//   "Vastu Compliant",
//   "Private Garden",
//   "Low Density Project",
//   "Quiet/Low Traffic Area",
//   "Wheelchair Accessible",
//   "Never Occupied",
// ];

// const COM_HIGHLIGHTS = [
//   "Premium Location",
//   "Corner Unit",
//   "Vastu Compliant",
//   "Low Density Project",
//   "Quiet/Low Traffic Area",
//   "Wheelchair Accessible",
//   "Never Occupied",
//   "Road Facing",
//   "High Visibility",
//   "Ready to Move",
// ];

// const LOCATION_ADVANTAGES = [
//   "Good School in vicinity",
//   "Nearby Metro Station",
//   "Peaceful Vicinity",
//   "Near City Center",
//   "Safe & Secure Locality",
//   "Near Reputed Hospital",
//   "Close to Shopping Mall/Market",
//   "Highway/Expressway Access",
//   "Near IT Park/Business Hub",
//   "Close to Railway Station",
// ];

// const OFFICE_SPACE_TYPES = ["Semi-Fitted", "Fitted Space", "Shell and Core"];

// const PANTRY_TYPES = ["Wet", "Dry", "None"];

// const SECURITY_DEPOSITS = ["Zero Deposit", "One Month", "Two Months", "Other"];

// const AGES = ["Never Occupied", "0-1", "2-4", "5-7", "8-10", "10+"];

// const OWNERSHIP = ["Free Hold", "Leasehold", "Power of Attorney"];

// const POSSESSION = ["Ready To Move", "Under Construction"];

// const SUITED_FOR = [
//   "Students",
//   "Working Professionals",
//   "Family",
//   "Bachelor",
//   "Company Lease",
//   "Any",
// ];

// const SPACES = [
//   "Prayer Room",
//   "Servant Room",
//   "Study Room",
//   "Extra Room",
//   "Basement",
//   "Store Room",
//   "Private Garden",
//   "Private Pool",
//   "Terrace",
// ];

// const blankFilters = () => ({
//   search: "",

//   city: "",

//   state: "",

//   locality: "",

//   society: "",

//   pinCode: "",

//   propertyType: [],

//   bedrooms: [],

//   bathrooms: [],

//   minPrice: "",

//   maxPrice: "",

//   minRent: "",

//   maxRent: "",

//   minArea: "",

//   maxArea: "",

//   areaType: [],

//   sizeUnit: "",

//   furnishing: [],

//   furnishingItems: [],

//   possessionStatus: [],

//   ageOfProperty: [],

//   transactionModel: [],

//   ownershipType: [],

//   waterSources: [],

//   locationAdvantages: [],

//   facings: [],

//   views: [],

//   flooring: [],

//   additionalSpaces: [],

//   suitedFor: [],

//   amenities: [],

//   highlights: [],

//   officeSpaceTypes: [],

//   pantryTypes: [],

//   securityDepositTypes: [],

//   availability: [],

//   negotiable: "",

//   companyLease: "",

//   personalWashroom: "",

//   powerBackup: "",

//   liftAvailable: "",

//   bathroomsMin: "",

//   bathroomsMax: "",

//   coveredParkingMin: "",

//   coveredParkingMax: "",

//   openParkingMin: "",

//   openParkingMax: "",

//   balconiesMin: "",

//   maintenanceMin: "",

//   maintenanceMax: "",

//   securityDepositMin: "",

//   securityDepositMax: "",
// });

// const slugify = (value = "") =>
//   String(value)
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// const EXPLORE_HUB_DATA = {
//   ambala: {
//     localities: [
//       "Ambala Cantt",
//       "Ambala City",
//       "Sector 7",
//       "Model Town",
//       "Baldev Nagar",
//     ],
//   },

//   jaipur: {
//     localities: [
//       "Vaishali Nagar",
//       "Mansarovar",
//       "Malviya Nagar",
//       "Jagatpura",
//       "C-Scheme",
//     ],
//   },

//   bengaluru: {
//     localities: [
//       "Whitefield",
//       "Electronic City",
//       "Sarjapur Road",
//       "Hebbal",
//       "HSR Layout",
//     ],
//   },

//   bangalore: {
//     localities: [
//       "Whitefield",
//       "Electronic City",
//       "Sarjapur Road",
//       "Hebbal",
//       "HSR Layout",
//     ],
//   },

//   pune: {
//     localities: ["Wakad", "Baner", "Hinjewadi", "Kharadi", "Viman Nagar"],
//   },

//   indore: {
//     localities: ["Vijay Nagar", "Rau", "Nipania", "Scheme 140", "Palasia"],
//   },

//   bhopal: {
//     localities: [
//       "MP Nagar",
//       "Kolar Road",
//       "Arera Colony",
//       "Hoshangabad Road",
//       "Bawadia Kalan",
//     ],
//   },

//   ahmedabad: {
//     localities: ["Shela", "Shilaj", "SG Highway", "Bopal", "Prahlad Nagar"],
//   },
// };

// const slugCity = (city = "") => slugify(city || "ambala");

// const cityLabel = (city = "") =>
//   String(city || "Ambala")
//     .trim()
//     .replace(/\b\w/g, (m) => m.toUpperCase());

// const hubPath = ({ city, category, locality = "" }) => {
//   const citySlug = slugCity(city);

//   const localitySlug = locality ? slugify(locality) : "";

//   return localitySlug
//     ? `/${citySlug}/${localitySlug}/${category}`
//     : `/${citySlug}/${category}`;
// };

// function HubChip({ label, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="inline-flex items-center rounded-lg border border-[#E6EDF0] bg-[#F4F7F9] px-3 py-1.5 text-[10px] font-bold leading-none text-[#274255] transition hover:border-[#BDE5D9] hover:bg-[#EAF8F4] hover:text-[#0D8C6A] sm:text-[11px]"
//     >
//             {label}   {" "}
//     </button>
//   );
// }

// function ExplorePropertyHubs({ city, locationStatus = "denied" }) {
//   const hasDetectedCity = locationStatus === "granted" && city;

//   const primaryCity = hasDetectedCity ? city : "Ambala";

//   const primaryLabel = cityLabel(primaryCity);

//   const localities = EXPLORE_HUB_DATA[slugCity(primaryCity)]?.localities || [];

//   const fallbackCities = ["Ambala", "Jaipur", "Bengaluru", "Pune"];

//   const navigate = useNavigate();

//   const primaryItems = [
//     [
//       `2 BHK Flats in ${primaryLabel}`,
//       hubPath({ city: primaryCity, category: "2-bhk-flats-for-sale" }),
//     ],

//     [
//       `Flats for Sale in ${primaryLabel}`,
//       hubPath({ city: primaryCity, category: "flats-for-sale" }),
//     ],

//     [
//       `Flats for Rent in ${primaryLabel}`,
//       hubPath({ city: primaryCity, category: "flats-for-rent" }),
//     ],

//     [
//       `Commercial Property for Rent in ${primaryLabel}`,
//       hubPath({ city: primaryCity, category: "commercial-property-for-rent" }),
//     ],

//     [
//       `Commercial Property for Sale in ${primaryLabel}`,
//       hubPath({ city: primaryCity, category: "commercial-property-for-sale" }),
//     ],

//     [
//       `Property Prices in ${primaryLabel}`,
//       hubPath({ city: primaryCity, category: "flats-for-sale" }),
//     ],
//   ];

//   const requirementItems = [
//     [
//       `2 BHK Properties`,
//       hubPath({ city: primaryCity, category: "2-bhk-flats-for-sale" }),
//     ],

//     [
//       `3 BHK Properties`,
//       hubPath({ city: primaryCity, category: "3-bhk-flats" }),
//     ],

//     [
//       `Properties for Sale`,
//       hubPath({ city: primaryCity, category: "properties-for-sale" }),
//     ],

//     [
//       `Properties for Rent`,
//       hubPath({ city: primaryCity, category: "properties-for-rent" }),
//     ],
//   ];

//   const localityItems = localities.length
//     ? localities.map((locality) => [
//         locality,
//         hubPath({ city: primaryCity, locality, category: "flats-for-sale" }),
//       ])
//     : [];

//   return (
//     <section className="mt-8 rounded-[24px] border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-7">
//            {" "}
//       <div>
//                {" "}
//         <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1CAA82]">
//           SEO Discovery
//         </p>
//                {" "}
//         <h2 className="mt-1 text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
//           Explore Properties &amp; Locality Hubs
//         </h2>
//                {" "}
//         <p className="mt-1 text-[11px] leading-5 text-[#7B8F98]">
//                    {" "}
//           {hasDetectedCity
//             ? `Showing quick property searches around your detected location: ${primaryLabel}.`
//             : "Popular city searches are shown until you allow location access."}
//                  {" "}
//         </p>
//              {" "}
//       </div>
//            {" "}
//       <div className="mt-6 space-y-5">
//                {" "}
//         <div>
//                    {" "}
//           <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
//             Explore More Properties
//           </p>
//                    {" "}
//           <div className="mt-2.5 flex flex-wrap gap-2">
//                        {" "}
//             {primaryItems.map(([label, path]) => (
//               <HubChip
//                 key={label}
//                 label={label}
//                 onClick={() => navigate(path)}
//               />
//             ))}
//                      {" "}
//           </div>
//                  {" "}
//         </div>
//                {" "}
//         <div>
//                    {" "}
//           <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
//             Nearby Localities
//           </p>
//                    {" "}
//           <div className="mt-2.5 flex flex-wrap gap-2">
//                        {" "}
//             {localityItems.length
//               ? localityItems.map(([label, path]) => (
//                   <HubChip
//                     key={label}
//                     label={label}
//                     onClick={() => navigate(path)}
//                   />
//                 ))
//               : fallbackCities.map((fallbackCity) => (
//                   <HubChip
//                     key={fallbackCity}
//                     label={fallbackCity}
//                     onClick={() =>
//                       navigate(
//                         hubPath({
//                           city: fallbackCity,
//                           category: "flats-for-sale",
//                         }),
//                       )
//                     }
//                   />
//                 ))}
//                      {" "}
//           </div>
//                  {" "}
//         </div>
//                {" "}
//         <div>
//                    {" "}
//           <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
//             Find Properties by Requirement
//           </p>
//                    {" "}
//           <div className="mt-2.5 flex flex-wrap gap-2">
//                        {" "}
//             {requirementItems.map(([label, path]) => (
//               <HubChip
//                 key={label}
//                 label={label}
//                 onClick={() => navigate(path)}
//               />
//             ))}
//                      {" "}
//           </div>
//                  {" "}
//         </div>
//                {" "}
//         {!hasDetectedCity && (
//           <div>
//                        {" "}
//             <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
//               Popular Cities
//             </p>
//                        {" "}
//             <div className="mt-2.5 flex flex-wrap gap-2">
//                            {" "}
//               {fallbackCities.map((fallbackCity) => (
//                 <HubChip
//                   key={fallbackCity}
//                   label={fallbackCity}
//                   onClick={() =>
//                     navigate(
//                       hubPath({
//                         city: fallbackCity,
//                         category: "flats-for-sale",
//                       }),
//                     )
//                   }
//                 />
//               ))}
//                          {" "}
//             </div>
//                      {" "}
//           </div>
//         )}
//              {" "}
//       </div>
//          {" "}
//     </section>
//   );
// }

// const parseSeoPath = (seoPath = "") => {
//   const value = decodeURIComponent(seoPath || window.location.pathname)
//     .replace(/^\/+|\/+$/g, "")
//     .toLowerCase();

//   if (!value) return null; // Legacy URLs are still understood, but are redirected to the new SEO architecture.

//   if (
//     value.startsWith("buyproperty-in-") ||
//     value.startsWith("rentproperty-in-")
//   ) {
//     const isRent = value.startsWith("rentproperty-in-");

//     const prefix = isRent ? "rentproperty-in-" : "buyproperty-in-";

//     let rest = value.slice(prefix.length);

//     const bhkMatch = rest.match(
//       /-(studio|[0-9]+(?:\.[0-9]+)?(?:-?bhk|-?rk)|[0-9]+\+?bhk)$/i,
//     );

//     let bedrooms = "";

//     if (bhkMatch) {
//       bedrooms = bhkMatch[1]
//         .replace(/-/g, " ")
//         .replace(/\brk\b/i, "RK")
//         .replace(/\bbhk\b/i, "BHK")
//         .replace(/\s+/g, " ")
//         .trim();

//       rest = rest.slice(0, -bhkMatch[0].length);
//     }

//     return {
//       listingType: isRent ? "Rent" : "Buy",
//       city: rest.replace(/-/g, " ").trim(),
//       bedrooms,
//       legacy: true,
//       indexable: true,
//     };
//   }

//   const parts = value.split("/").filter(Boolean);

//   if (!parts.length) return null;

//   const city = parts[0].replace(/-/g, " ").trim();

//   if (parts.length === 1)
//     return {
//       listingType: "Buy",
//       city,
//       category: "",
//       locality: "",
//       bedrooms: "",
//       buildingType: "Residential",
//       propertyType: "",
//       indexable: true,
//     };

//   const result = {
//     listingType: "Buy",
//     city,
//     locality: "",
//     category: "",
//     bedrooms: "",
//     buildingType: "Residential",
//     propertyType: "",
//     indexable: true,
//   };

//   const firstSubPath = parts[1];

//   if (firstSubPath === "buy" || firstSubPath === "rent") {
//     result.listingType = firstSubPath === "rent" ? "Rent" : "Buy";

//     return result;
//   } // /city/<category>

//   let categoryParts = [firstSubPath]; // /city/<locality>/<category>

//   if (parts.length >= 3) {
//     result.locality = firstSubPath.replace(/-/g, " ");

//     categoryParts = parts.slice(2);
//   }

//   const category = categoryParts.join("-");

//   result.category = category;

//   result.listingType = /rent/.test(category) ? "Rent" : "Buy";

//   if (
//     [
//       "properties-for-rent",
//       "properties-for-sale",
//       "properties-for-sell",
//       "all-properties-for-rent",
//       "all-properties-for-sale",
//     ].includes(category)
//   ) {
//     result.buildingType = "All";
//     result.propertyType = "";
//     result.bedrooms = "";
//   }

//   const bhkMatch = category.match(
//     /(^|-)((?:studio)|(?:[0-9]+(?:\.[0-9]+)?\+?)-?bhk)(?:-|$)/i,
//   );

//   if (bhkMatch)
//     result.bedrooms = bhkMatch[2].replace(/-/g, " ").replace(/\bbhk\b/i, "BHK");

//   return result;
// };

// const buildSeoPath = ({
//   listingType,
//   city,
//   locality = "",
//   bedrooms = "",
//   buildingType = "Residential",
//   propertyType = "",
//   allBuildingTypes = false,
// }) => {
//   const citySlug = slugify(city || "india");
//   const localitySlug = slugify(locality);

//   // Generic property hubs deliberately include both residential and commercial.
//   if (allBuildingTypes && !bedrooms && !propertyType) {
//     const category = `properties-for-${listingType === "Rent" ? "rent" : "sale"}`;
//     return localitySlug
//       ? `/${citySlug}/${localitySlug}/${category}`
//       : `/${citySlug}/${category}`;
//   }

//   const normalizedPropertyType = String(propertyType || "").toLowerCase();
//   let category = "";
//   if (String(buildingType).toLowerCase() === "commercial") {
//     category = `commercial-property-for-${listingType === "Rent" ? "rent" : "sale"}`;
//   } else if (/villa/.test(normalizedPropertyType)) {
//     category = `villas-for-${listingType === "Rent" ? "rent" : "sale"}`;
//   } else if (/house/.test(normalizedPropertyType)) {
//     category = `houses-for-${listingType === "Rent" ? "rent" : "sale"}`;
//   } else if (/plot/.test(normalizedPropertyType)) {
//     category = `plots-for-${listingType === "Rent" ? "rent" : "sale"}`;
//   } else {
//     category = `flats-for-${listingType === "Rent" ? "rent" : "sale"}`;
//   }

//   const bhkSlug = String(bedrooms || "")
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
//   if (bhkSlug && /(?:bhk|studio)/i.test(bhkSlug))
//     category = `${bhkSlug}-${category}`;

//   return localitySlug
//     ? `/${citySlug}/${localitySlug}/${category}`
//     : `/${citySlug}/${category}`;
// };

// const getImages = (property = {}) => {
//   const source = [
//     ...(Array.isArray(property.images) ? property.images : []),

//     ...(Array.isArray(property.media?.images) ? property.media.images : []),

//     ...(Array.isArray(property.gallery) ? property.gallery : []),
//   ];

//   const images = source
//     .map((item) =>
//       typeof item === "string"
//         ? { url: item }
//         : item?.secure_url
//           ? { ...item, url: item.secure_url }
//           : item,
//     )
//     .filter((item) => item?.url);

//   const cover = images.find((item) => item?.isCover);

//   return cover ? [cover, ...images.filter((item) => item !== cover)] : images;
// };

// const firstImage = (property) =>
//   getImages(property)[0]?.url || propertyFallback;

// const getAmount = (property, listingType) => {
//   if (listingType === "Rent")
//     return Number(
//       property?.rent?.amount ?? property?.rentAmount ?? property?.price ?? 0,
//     );

//   return Number(
//     property?.price?.amount ?? property?.priceAmount ?? property?.price ?? 0,
//   );
// };

// const formatMoney = (value) => {
//   const n = Number(value);

//   if (!Number.isFinite(n) || n <= 0) return "Price on request";

//   if (n >= 10000000)
//     return `₹${(n / 10000000).toFixed(n % 10000000 ? 2 : 0)} Cr`;

//   if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 ? 2 : 0)} Lakh`;

//   return `₹${n.toLocaleString("en-IN")}`;
// };

// const toArray = (value) =>
//   Array.isArray(value) ? value : value ? [value] : [];

// const getArea = (property) => {
//   const area = Array.isArray(property?.areaDetails)
//     ? property.areaDetails.find((item) => item?.display !== false) ||
//       property.areaDetails[0]
//     : null;

//   return {
//     value: Number(
//       property?.propertySize ?? property?.areaValue ?? area?.value ?? 0,
//     ),

//     unit: property?.sizeUnit || property?.areaUnit || area?.unit || "Sq. Ft.",
//   };
// };

// const toFiniteCoordinate = (...values) => {
//   for (const value of values) {
//     if (value === "" || value == null) continue;
//     const number = Number(value);
//     if (Number.isFinite(number)) return number;
//   }
//   return null;
// };

// const isValidLatLng = (latitude, longitude) =>
//   Number.isFinite(latitude) &&
//   Number.isFinite(longitude) &&
//   latitude >= -90 &&
//   latitude <= 90 &&
//   longitude >= -180 &&
//   longitude <= 180;

// const normalizeProperty = (p) => ({
//   ...p,

//   city: p?.city || p?.location?.city || "",

//   state: p?.state || p?.location?.state || "",

//   locality: p?.locality || p?.location?.locality || "",

//   address: p?.address || p?.location?.address || "",

//   latitude: toFiniteCoordinate(
//     p?.latitude,
//     p?.location?.latitude,
//     Array.isArray(p?.location?.coordinates) ? p.location.coordinates[1] : null,
//     Array.isArray(p?.coordinates) ? p.coordinates[1] : null,
//   ),

//   longitude: toFiniteCoordinate(
//     p?.longitude,
//     p?.location?.longitude,
//     Array.isArray(p?.location?.coordinates) ? p.location.coordinates[0] : null,
//     Array.isArray(p?.coordinates) ? p.coordinates[0] : null,
//   ),

//   bedrooms: p?.bedrooms || p?.bhk || "",

//   bathrooms: Number(p?.bathrooms ?? p?.specifications?.bathrooms ?? 0),

//   area: getArea(p),

//   furnishing: p?.furnishing?.status || p?.furnishing || "",

//   imageUrl: firstImage(p),
// });

// function MapViewport({ properties, selectedId }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !map._loaded) return;

//     if (selectedId) {
//       const property = properties.find(
//         (item) => String(item._id || item.propertyId) === String(selectedId),
//       );

//       if (!property) return;

//       const latitude = Number(property.latitude);
//       const longitude = Number(property.longitude);

//       if (!isValidLatLng(latitude, longitude)) return;

//       try {
//         const currentCenter = map.getCenter();

//         if (!isValidLatLng(currentCenter.lat, currentCenter.lng)) {
//           map.setView([latitude, longitude], 14, { animate: false });
//           return;
//         }

//         map.flyTo([latitude, longitude], 14, { duration: 0.6 });
//       } catch (error) {
//         console.warn("Unable to move property map to coordinates:", {
//           latitude,
//           longitude,
//           error,
//         });
//         map.setView([latitude, longitude], 14, { animate: false });
//       }

//       return;
//     }

//     const points = properties
//       .map((property) => [
//         Number(property.latitude),
//         Number(property.longitude),
//       ])
//       .filter(([latitude, longitude]) => isValidLatLng(latitude, longitude));

//     if (!points.length) return;

//     try {
//       const bounds = L.latLngBounds(points);

//       if (bounds.isValid()) {
//         map.fitBounds(bounds, {
//           padding: [40, 40],
//           maxZoom: 12,
//         });
//       }
//     } catch (error) {
//       console.warn("Unable to fit property map bounds:", error);
//     }
//   }, [map, properties, selectedId]);

//   return null;
// }

// function PropertyMarker({ property, selected, onSelect }) {
//   const latitude = Number(property?.latitude);
//   const longitude = Number(property?.longitude);

//   if (!isValidLatLng(latitude, longitude)) {
//     return null;
//   }

//   const icon = createPropertyLogoIcon(selected ? 58 : 52);

//   return (
//     <Marker
//       position={[latitude, longitude]}
//       icon={icon}
//       eventHandlers={{ click: () => onSelect(property) }}
//     >
//          {" "}
//       <Popup>
//              {" "}
//         <div className="min-w-[190px]">
//                  {" "}
//           <img
//             src={property.imageUrl}
//             alt=""
//             className="mb-2 h-24 w-full rounded-lg object-cover"
//           />
//                  {" "}
//           <p className="font-extrabold text-[#102E46]">
//             {property.title || "Property"}
//           </p>
//                  {" "}
//           <p className="mt-1 text-xs text-slate-500">
//             {property.locality || property.city}
//           </p>
//                  {" "}
//           <p className="mt-2 font-black text-[#20BE91]">
//             {formatMoney(property.__amount)}
//           </p>
//                {" "}
//         </div>
//            {" "}
//       </Popup>
//        {" "}
//     </Marker>
//   );
// }

// function FilterSection({ title, children, open = false }) {
//   const [expanded, setExpanded] = useState(open);

//   return (
//     <div className="border-b border-[#E7EEF1] py-4 last:border-b-0">
//            {" "}
//       <button
//         type="button"
//         onClick={() => setExpanded((v) => !v)}
//         className="flex w-full items-center justify-between text-left"
//       >
//                {" "}
//         <span className="text-[13px] font-black text-[#183B50]">{title}</span>
//                {" "}
//         <ChevronDown
//           size={16}
//           className={`text-[#6C838F] transition ${expanded ? "rotate-180" : ""}`}
//         />
//              {" "}
//       </button>
//             {expanded && <div className="mt-3">{children}</div>}   {" "}
//     </div>
//   );
// }

// function CheckList({ options, selected, onChange, maxVisible = 7 }) {
//   const [showAll, setShowAll] = useState(false);

//   const visible = showAll ? options : options.slice(0, maxVisible);

//   return (
//     <div className="space-y-2">
//          {" "}
//       {visible.map((option) => {
//         const checked = selected.includes(option);

//         return (
//           <label
//             key={option}
//             className="flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-[#55707D]"
//           >
//                    {" "}
//             <input
//               type="checkbox"
//               checked={checked}
//               onChange={() => onChange(option)}
//               className="peer sr-only"
//             />
//                    {" "}
//             <span
//               className={`flex h-4 w-4 items-center justify-center rounded border transition ${checked ? "border-[#20BE91] bg-[#20BE91] text-white" : "border-[#C9D7DC] bg-white"}`}
//             >
//               {checked && <Check size={11} />}
//             </span>
//                     <span className="leading-4">{option}</span>     {" "}
//           </label>
//         );
//       })}
//          {" "}
//       {options.length > maxVisible && (
//         <button
//           type="button"
//           onClick={() => setShowAll((v) => !v)}
//           className="text-[11px] font-black text-[#0C9E77]"
//         >
//           {showAll ? "Show less" : `+${options.length - maxVisible} more`}
//         </button>
//       )}
//        {" "}
//     </div>
//   );
// }

// function RangeInputs({ min, max, onMin, onMax, prefix = "" }) {
//   return (
//     <div className="grid grid-cols-2 gap-2">
//          {" "}
//       <div className="relative">
//         <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8AA0AA]">
//           {prefix}
//         </span>
//         <input
//           value={min}
//           onChange={(e) => onMin(e.target.value)}
//           placeholder="Min"
//           type="number"
//           className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-[#FAFCFD] pl-7 pr-2 text-[11px] font-bold outline-none focus:border-[#20BE91]"
//         />
//       </div>
//          {" "}
//       <div className="relative">
//         <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8AA0AA]">
//           {prefix}
//         </span>
//         <input
//           value={max}
//           onChange={(e) => onMax(e.target.value)}
//           placeholder="Max"
//           type="number"
//           className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-[#FAFCFD] pl-7 pr-2 text-[11px] font-bold outline-none focus:border-[#20BE91]"
//         />
//       </div>
//        {" "}
//     </div>
//   );
// }

// function PropertyListCard({ property, listingType, selected, onSelect }) {
//   const navigate = useNavigate();

//   const amount = getAmount(property, listingType);

//   const rent = listingType === "Rent";

//   const specs = [
//     property.bedrooms && property.bedrooms,

//     property.bathrooms > 0 && `${property.bathrooms} Bath`,

//     property.area?.value > 0 &&
//       `${property.area.value.toLocaleString("en-IN")} ${property.area.unit}`,
//   ].filter(Boolean);

//   return (
//     <article
//       onMouseEnter={() => onSelect(property)}
//       onClick={() =>
//         navigate(
//           `/property/${encodeURIComponent(property.propertyId || property._id)}/${slugify(property.title || "property")}`,
//           { state: { property } },
//         )
//       }
//       className={`group grid cursor-pointer grid-cols-[155px_minmax(0,1fr)] gap-0 overflow-hidden rounded-2xl border bg-white shadow-[0_5px_22px_rgba(16,46,70,.08)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(16,46,70,.14)] sm:grid-cols-[210px_minmax(0,1fr)] ${selected ? "border-[#20BE91] ring-2 ring-[#20BE91]/10" : "border-[#E2EBEE]"}`}
//     >
//          {" "}
//       <div className="relative min-h-[220px] overflow-hidden bg-[#EAF1F3] sm:min-h-[235px]">
//              {" "}
//         <img
//           src={property.imageUrl}
//           alt={property.title || "Property"}
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           onError={(e) => {
//             e.currentTarget.src = propertyFallback;
//           }}
//         />
//              {" "}
//         <div className="absolute left-3 top-3 flex gap-1.5">
//           <span className="rounded-md bg-[#0D2B40]/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white">
//             {rent ? "Rent" : "Buy"}
//           </span>
//           {property.propertyType && (
//             <span className="rounded-md bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-[#173B50]">
//               {property.propertyType}
//             </span>
//           )}
//         </div>
//              {" "}
//         {property.promotion?.sponsored && (
//           <span className="absolute bottom-3 left-3 rounded-full bg-[#20BE91] px-2.5 py-1 text-[9px] font-black text-[#073A30]">
//             Featured
//           </span>
//         )}
//            {" "}
//       </div>
//          {" "}
//       <div className="flex min-w-0 flex-col p-4 sm:p-5">
//              {" "}
//         <div className="flex items-start justify-between gap-3">
//           <div className="min-w-0">
//             <span className="inline-flex rounded-full bg-[#F2F6F8] px-2 py-1 text-[9px] font-bold text-[#718792]">
//               {property.status === "Live" ? "Live" : "Verified"}
//             </span>
//             <h3 className="mt-2 line-clamp-2 text-[16px] font-black leading-5 text-[#102E46] sm:text-[18px]">
//               {property.title ||
//                 `${property.propertyType || "Property"} in ${property.city || "India"}`}
//             </h3>
//           </div>
//           <button
//             type="button"
//             onClick={(e) => e.stopPropagation()}
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E3EAED] text-[#6D818B] hover:border-[#20BE91] hover:text-[#20BE91]"
//           >
//             ♡
//           </button>
//         </div>
//              {" "}
//         <div className="mt-2 flex items-start gap-1.5 text-[11px] leading-4 text-[#718792]">
//           <MapPin size={14} className="mt-0.5 shrink-0 text-[#20BE91]" />
//           <span className="line-clamp-2">
//             {property.locality ||
//               property.city ||
//               "Location available on request"}
//             {property.locality && property.city ? `, ${property.city}` : ""}
//           </span>
//         </div>
//              {" "}
//         <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
//           <div>
//             <div className="text-[22px] font-black leading-none text-[#102E46]">
//               {formatMoney(amount)}
//             </div>
//             {rent && (
//               <div className="mt-1 text-[10px] font-semibold text-[#8AA0AA]">
//                 {property.rent?.frequency || "Per Month"}
//               </div>
//             )}
//           </div>
//           {property.furnishing && (
//             <span className="rounded-full bg-[#EEF9F6] px-2.5 py-1 text-[9px] font-black text-[#168464]">
//               {property.furnishing}
//             </span>
//           )}
//         </div>
//              {" "}
//         {specs.length > 0 && (
//           <div className="mt-4 flex flex-wrap gap-2 border-t border-[#EDF2F4] pt-3">
//             {specs.slice(0, 4).map((text, i) => (
//               <span
//                 key={`${text}-${i}`}
//                 className="inline-flex items-center gap-1.5 rounded-lg bg-[#F7FAFB] px-2.5 py-1.5 text-[10px] font-bold text-[#58717D]"
//               >
//                 {i === 0 ? (
//                   <BedDouble size={13} className="text-[#20BE91]" />
//                 ) : i === 1 ? (
//                   <Bath size={13} className="text-[#20BE91]" />
//                 ) : (
//                   <Maximize2 size={12} className="text-[#20BE91]" />
//                 )}
//                 {text}
//               </span>
//             ))}
//           </div>
//         )}
//              {" "}
//         <div className="mt-auto flex items-center justify-between gap-2 pt-4">
//           <span className="text-[10px] font-semibold text-[#8AA0AA]">
//             {property.distanceKm != null
//               ? `${property.distanceKm} km away`
//               : property.city}
//           </span>
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate(
//                 `/property/${encodeURIComponent(property.propertyId || property._id)}/${slugify(property.title || "property")}`,
//                 { state: { property } },
//               );
//             }}
//             className="rounded-xl bg-[#123B59] px-4 py-2.5 text-[10px] font-black text-white transition hover:bg-[#20BE91] hover:text-[#073A30]"
//           >
//             Contact / View Details
//           </button>
//         </div>
//            {" "}
//       </div>
//        {" "}
//     </article>
//   );
// }

// export default function ExploreProperties() {
//   const navigate = useNavigate();

//   const routeLocation = useLocation();

//   const seoPath = routeLocation.pathname;

//   const [listingType, setListingType] = useState("Buy");

//   const [buildingType, setBuildingType] = useState("Residential");

//   const [filters, setFilters] = useState(blankFilters);

//   const [properties, setProperties] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");

//   const [locationStatus, setLocationStatus] = useState("detecting");

//   const [detectedLocation, setDetectedLocation] = useState({
//     city: "",
//     lat: null,
//     lng: null,
//   });

//   const [selectedId, setSelectedId] = useState(null);

//   const [mobileFilters, setMobileFilters] = useState(false);

//   const [sort, setSort] = useState("relevance");

//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const resultsContentRef = useRef(null);
//   const [resultsContentHeight, setResultsContentHeight] = useState(0);

//   const seo = useMemo(() => parseSeoPath(seoPath), [seoPath]);

//   useEffect(() => {
//     const el = resultsContentRef.current;
//     if (!el || typeof ResizeObserver === "undefined") return;

//     const updateHeight = () => {
//       setResultsContentHeight(Math.ceil(el.getBoundingClientRect().height));
//     };

//     updateHeight();
//     const observer = new ResizeObserver(updateHeight);
//     observer.observe(el);

//     return () => observer.disconnect();
//   }, [properties, loading, error, total, page, filters, sort]);

//   useEffect(() => {
//     if (!seo) return; // Convert old /buyproperty-in-* and /rentproperty-in-* URLs to the new canonical SEO structure.

//     if (seo.legacy) {
//       navigate(
//         buildSeoPath({
//           listingType: seo.listingType,

//           city: seo.city,

//           bedrooms: seo.bedrooms,

//           buildingType: "Residential",
//         }),
//         { replace: true },
//       );

//       return;
//     }

//     const category = String(seo.category || "").toLowerCase();

//     const isGenericPropertyHub = [
//       "properties-for-rent",
//       "properties-for-sale",
//       "properties-for-sell",
//       "all-properties-for-rent",
//       "all-properties-for-sale",
//     ].includes(category);
//     const nextBuildingType = isGenericPropertyHub
//       ? "All"
//       : category.includes("commercial")
//         ? "Commercial"
//         : "Residential";

//     setBuildingType(nextBuildingType);

//     setListingType(seo.listingType);

//     setFilters((current) => ({
//       ...current,

//       city: seo.city,

//       locality: seo.locality || current.locality,

//       bedrooms: seo.bedrooms ? [seo.bedrooms] : current.bedrooms,

//       propertyType: isGenericPropertyHub
//         ? []
//         : /villas-/.test(category)
//           ? ["Villa"]
//           : /houses-/.test(category)
//             ? ["Independent House"]
//             : /plots-/.test(category)
//               ? ["Plot"]
//               : current.propertyType,
//     }));
//   }, [seo, navigate]);

//   const propertyTypeOptions =
//     buildingType === "Residential" ? RESIDENTIAL_TYPES : COMMERCIAL_TYPES;

//   const isResidential = buildingType === "Residential";

//   const isRent = listingType === "Rent";

//   const update = (key, value) =>
//     setFilters((current) => ({ ...current, [key]: value }));

//   const toggle = (key, value) =>
//     setFilters((current) => {
//       const currentValues = Array.isArray(current[key]) ? current[key] : [];

//       return {
//         ...current,
//         [key]: currentValues.includes(value)
//           ? currentValues.filter((x) => x !== value)
//           : [...currentValues, value],
//       };
//     });

//   const resetFilters = () => setFilters(blankFilters());

//   const buildParams = ({ forPopular = false } = {}) => {
//     const params = new URLSearchParams();
//     const effectiveListingType = seo?.listingType || listingType;
//     const effectiveBuildingType = seo?.buildingType || buildingType;
//     const effectiveBedrooms = filters.bedrooms?.length
//       ? filters.bedrooms
//       : seo?.bedrooms
//         ? [seo.bedrooms]
//         : [];
//     const effectiveLocality = String(
//       filters.locality || seo?.locality || "",
//     ).trim();
//     const effectivePropertyType = filters.propertyType?.length
//       ? filters.propertyType
//       : seo?.propertyType
//         ? [seo.propertyType]
//         : [];
//     params.set("mode", forPopular ? "popular" : "search");
//     params.set("category", effectiveListingType === "Buy" ? "Sell" : "Rent");
//     params.set("buildingType", effectiveBuildingType);
//     params.set("sort", sort);
//     params.set("page", String(page));
//     params.set("limit", "30");
//     if (detectedLocation.lat != null && detectedLocation.lng != null) {
//       params.set("lat", String(detectedLocation.lat));
//       params.set("lng", String(detectedLocation.lng));
//       if (detectedLocation.city)
//         params.set("locationCity", detectedLocation.city);
//     }
//     const requestCity = String(
//       filters.city || seo?.city || detectedLocation.city || "",
//     ).trim();
//     if (requestCity) params.set("city", requestCity);
//     Object.entries(filters).forEach(([key, value]) => {
//       if (["city", "locality", "bedrooms", "propertyType"].includes(key))
//         return;
//       if (Array.isArray(value) && value.length)
//         params.set(key, value.join(","));
//       else if (!Array.isArray(value) && value !== "" && value != null)
//         params.set(key, String(value));
//     });
//     if (effectiveLocality) params.set("locality", effectiveLocality);
//     if (effectiveBedrooms.length)
//       params.set("bedrooms", effectiveBedrooms.join(","));
//     if (effectivePropertyType.length)
//       params.set("propertyType", effectivePropertyType.join(","));
//     if (forPopular) {
//       params.delete("city");
//       params.delete("search");
//       params.delete("page");
//       params.set("limit", "16");
//     }
//     return params;
//   };

//   const fetchProperties = async ({
//     forPopular = false,
//     keepPage = false,
//   } = {}) => {
//     setLoading(true);

//     setError("");

//     try {
//       const res = await axios.get(
//         `/v1/properties/search?${buildParams({ forPopular })}`,
//       );

//       const data = res?.data || {};

//       const rows = Array.isArray(data.properties)
//         ? data.properties.map(normalizeProperty)
//         : [];

//       setProperties(rows);

//       setTotal(Number(data.total || rows.length));

//       if (!keepPage) setPage(1);

//       setSelectedId(rows[0] ? String(rows[0]._id || rows[0].propertyId) : null);
//     } catch (err) {
//       console.error("Property search failed", err);

//       setError(
//         err?.response?.data?.message || "Unable to load properties right now.",
//       );

//       setProperties([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let cancelled = false;

//     if (!navigator.geolocation) {
//       setLocationStatus("denied");

//       return undefined;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         if (cancelled) return;

//         const { latitude, longitude } = position.coords;

//         let city = "";

//         try {
//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
//           );

//           if (response.ok) {
//             const data = await response.json();

//             city =
//               data?.address?.city ||
//               data?.address?.town ||
//               data?.address?.municipality ||
//               data?.address?.state_district ||
//               "";
//           }
//         } catch {
//           /* coordinates are enough for map/ranking */
//         }

//         if (!cancelled) {
//           setLocationStatus("granted");

//           setDetectedLocation({ city, lat: latitude, lng: longitude });
//         }
//       },
//       () => {
//         if (!cancelled) setLocationStatus("denied");
//       },
//       { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
//     );

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   useEffect(() => {
//     if (locationStatus === "detecting") return;

//     fetchProperties({ forPopular: false, keepPage: true }); // Initial load and server-side sorting use the same search API.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [locationStatus, sort]);

//   const applyFilters = () => {
//     setPage(1);

//     const city = filters.city || detectedLocation.city;

//     navigate(
//       buildSeoPath({
//         listingType,

//         city,

//         locality: filters.locality || "",

//         bedrooms: filters.bedrooms[0] || "",

//         buildingType,

//         propertyType: filters.propertyType[0] || "",
//         allBuildingTypes: buildingType === "All",
//       }),
//       { replace: false },
//     );

//     setMobileFilters(false);
//   };

//   useEffect(() => {
//     if (!seo) return; // SEO URL is the source of truth for city/BHK. Filters are applied through the same API.

//     if (seo) fetchProperties({ forPopular: false }); // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [seoPath]);

//   const onListingType = (value) => {
//     setListingType(value);

//     setPage(1);

//     setProperties([]);

//     setFilters(blankFilters());
//   };

//   const onBuildingType = (value) => {
//     setBuildingType(value);

//     setFilters((current) => ({
//       ...current,
//       propertyType: [],
//       transactionModel: [],
//       officeSpaceTypes: [],
//       pantryTypes: [],
//     }));
//   };

//   const filteredCountLabel =
//     total === 1 ? "1 property" : `${total.toLocaleString("en-IN")} properties`;

//   const updateQueryValue = (key, value) => update(key, value);

//   const filterGroups = [
//     {
//       title: "Property Type",
//       node: (
//         <CheckList
//           options={propertyTypeOptions}
//           selected={filters.propertyType}
//           onChange={(v) => toggle("propertyType", v)}
//         />
//       ),
//     },

//     ...(isResidential
//       ? [
//           {
//             title: "Bedrooms / BHK",
//             node: (
//               <CheckList
//                 options={BHK_TYPES}
//                 selected={filters.bedrooms}
//                 onChange={(v) => toggle("bedrooms", v)}
//               />
//             ),
//           },
//         ]
//       : []),

//     {
//       title: isRent ? "Rent" : "Price",
//       node: (
//         <RangeInputs
//           min={isRent ? filters.minRent : filters.minPrice}
//           max={isRent ? filters.maxRent : filters.maxPrice}
//           onMin={(v) => updateQueryValue(isRent ? "minRent" : "minPrice", v)}
//           onMax={(v) => updateQueryValue(isRent ? "maxRent" : "maxPrice", v)}
//           prefix="₹"
//         />
//       ),
//     },

//     {
//       title: "Area",
//       node: (
//         <>
//           <RangeInputs
//             min={filters.minArea}
//             max={filters.maxArea}
//             onMin={(v) => update("minArea", v)}
//             onMax={(v) => update("maxArea", v)}
//           />
//           <select
//             value={filters.sizeUnit}
//             onChange={(e) => update("sizeUnit", e.target.value)}
//             className="mt-2 h-9 w-full rounded-lg border border-[#DCE7EA] bg-[#FAFCFD] px-2 text-[10px] font-bold"
//           >
//             <option value="">Any area unit</option>
//             <option>Sq. Ft.</option>
//             <option>Sq. Meter</option>
//             <option>Sq. Yard</option>
//             <option>Acre</option>
//             <option>Hectare</option>
//           </select>
//           <div className="mt-2">
//             <CheckList
//               options={AREA_TYPES}
//               selected={filters.areaType}
//               onChange={(v) => toggle("areaType", v)}
//               maxVisible={5}
//             />
//           </div>
//         </>
//       ),
//     },

//     ...(isResidential && !isRent
//       ? [
//           {
//             title: "Possession",
//             node: (
//               <CheckList
//                 options={POSSESSION}
//                 selected={filters.possessionStatus}
//                 onChange={(v) => toggle("possessionStatus", v)}
//               />
//             ),
//           },
//         ]
//       : []),

//     ...(isResidential && isRent
//       ? [
//           {
//             title: "Availability",
//             node: (
//               <CheckList
//                 options={["Immediately", "Later"]}
//                 selected={filters.availability}
//                 onChange={(v) => toggle("availability", v)}
//               />
//             ),
//           },
//         ]
//       : []),

//     {
//       title: "Furnishing",
//       node: (
//         <>
//           <CheckList
//             options={FURNISHING}
//             selected={filters.furnishing}
//             onChange={(v) => toggle("furnishing", v)}
//           />
//           <div className="mt-3">
//             <p className="mb-2 text-[9px] font-black uppercase tracking-wide text-[#93A5AD]">
//               Furnishing Items
//             </p>
//             <CheckList
//               options={[
//                 "Water Purifier",
//                 "Fan",
//                 "Fridge",
//                 "Exhaust Fan",
//                 "Dining Table",
//                 "Geyser",
//                 "Stove",
//                 "Light",
//                 "Curtains",
//                 "Modular Kitchen",
//                 "TV",
//                 "Chimney",
//                 "AC",
//                 "Bed",
//                 "Wardrobe",
//                 "Sofa",
//                 "Washing Machine",
//                 "Microwave",
//                 "Home Automation",
//                 "Smart Card Access",
//                 "Solar Heater",
//                 "Split AC",
//                 "VRV AC",
//               ]}
//               selected={filters.furnishingItems}
//               onChange={(v) => toggle("furnishingItems", v)}
//               maxVisible={5}
//             />
//           </div>
//         </>
//       ),
//     },

//     ...(isResidential
//       ? [
//           {
//             title: "Bathrooms",
//             node: (
//               <CheckList
//                 options={["1", "2", "3", "4", "5+"]}
//                 selected={filters.bathrooms}
//                 onChange={(v) => toggle("bathrooms", v)}
//               />
//             ),
//           },
//         ]
//       : [
//           {
//             title: "Bathrooms",
//             node: (
//               <RangeInputs
//                 min={filters.bathroomsMin}
//                 max={filters.bathroomsMax}
//                 onMin={(v) => update("bathroomsMin", v)}
//                 onMax={(v) => update("bathroomsMax", v)}
//               />
//             ),
//           },
//         ]),

//     ...(isResidential && !isRent
//       ? [
//           {
//             title: "Property Age",
//             node: (
//               <CheckList
//                 options={AGES}
//                 selected={filters.ageOfProperty}
//                 onChange={(v) => toggle("ageOfProperty", v)}
//               />
//             ),
//           },
//           {
//             title: "Transaction",
//             node: (
//               <CheckList
//                 options={["Resale", "New Booking"]}
//                 selected={filters.transactionModel}
//                 onChange={(v) => toggle("transactionModel", v)}
//               />
//             ),
//           },
//           {
//             title: "Ownership",
//             node: (
//               <CheckList
//                 options={OWNERSHIP}
//                 selected={filters.ownershipType}
//                 onChange={(v) => toggle("ownershipType", v)}
//               />
//             ),
//           },
//         ]
//       : []),

//     ...(isResidential && isRent
//       ? [
//           {
//             title: "Suited For",
//             node: (
//               <CheckList
//                 options={SUITED_FOR}
//                 selected={filters.suitedFor}
//                 onChange={(v) => toggle("suitedFor", v)}
//               />
//             ),
//           },
//         ]
//       : []),

//     ...(!isResidential && !isRent
//       ? [
//           {
//             title: "Transaction / Ownership",
//             node: (
//               <>
//                 <CheckList
//                   options={["Resale", "New Booking"]}
//                   selected={filters.transactionModel}
//                   onChange={(v) => toggle("transactionModel", v)}
//                 />
//                 <div className="mt-3">
//                   <CheckList
//                     options={OWNERSHIP}
//                     selected={filters.ownershipType}
//                     onChange={(v) => toggle("ownershipType", v)}
//                   />
//                 </div>
//               </>
//             ),
//           },
//         ]
//       : []),

//     ...(!isResidential
//       ? [
//           {
//             title: "Office Space Type",
//             node: (
//               <CheckList
//                 options={OFFICE_SPACE_TYPES}
//                 selected={filters.officeSpaceTypes}
//                 onChange={(v) => toggle("officeSpaceTypes", v)}
//               />
//             ),
//           },
//           {
//             title: "Pantry",
//             node: (
//               <CheckList
//                 options={PANTRY_TYPES}
//                 selected={filters.pantryTypes}
//                 onChange={(v) => toggle("pantryTypes", v)}
//               />
//             ),
//           },
//           {
//             title: "Personal Washroom",
//             node: (
//               <CheckList
//                 options={["Yes"]}
//                 selected={filters.personalWashroom === "true" ? ["Yes"] : []}
//                 onChange={() =>
//                   update(
//                     "personalWashroom",
//                     filters.personalWashroom === "true" ? "" : "true",
//                   )
//                 }
//               />
//             ),
//           },
//         ]
//       : []),

//     {
//       title: "Water Source",
//       node: (
//         <CheckList
//           options={WATER}
//           selected={filters.waterSources}
//           onChange={(v) => toggle("waterSources", v)}
//         />
//       ),
//     },

//     {
//       title: "Facing",
//       node: (
//         <CheckList
//           options={FACING}
//           selected={filters.facings}
//           onChange={(v) => toggle("facings", v)}
//           maxVisible={6}
//         />
//       ),
//     },

//     {
//       title: "View",
//       node: (
//         <CheckList
//           options={VIEWS}
//           selected={filters.views}
//           onChange={(v) => toggle("views", v)}
//           maxVisible={6}
//         />
//       ),
//     },

//     {
//       title: "Flooring",
//       node: (
//         <CheckList
//           options={FLOORING}
//           selected={filters.flooring}
//           onChange={(v) => toggle("flooring", v)}
//           maxVisible={6}
//         />
//       ),
//     },

//     ...(isResidential
//       ? [
//           {
//             title: "Additional Spaces",
//             node: (
//               <CheckList
//                 options={SPACES}
//                 selected={filters.additionalSpaces}
//                 onChange={(v) => toggle("additionalSpaces", v)}
//                 maxVisible={6}
//               />
//             ),
//           },
//         ]
//       : []),

//     ...(!isResidential
//       ? [
//           {
//             title: "Location Advantages",
//             node: (
//               <CheckList
//                 options={LOCATION_ADVANTAGES}
//                 selected={filters.locationAdvantages}
//                 onChange={(v) => toggle("locationAdvantages", v)}
//                 maxVisible={6}
//               />
//             ),
//           },
//         ]
//       : []),

//     {
//       title: "Amenities",
//       node: (
//         <CheckList
//           options={AMENITIES}
//           selected={filters.amenities}
//           onChange={(v) => toggle("amenities", v)}
//           maxVisible={7}
//         />
//       ),
//     },

//     {
//       title: "Highlights",
//       node: (
//         <CheckList
//           options={isResidential ? RES_HIGHLIGHTS : COM_HIGHLIGHTS}
//           selected={filters.highlights}
//           onChange={(v) => toggle("highlights", v)}
//           maxVisible={7}
//         />
//       ),
//     },

//     ...(!isResidential && isRent
//       ? [
//           {
//             title: "Security Deposit",
//             node: (
//               <>
//                 <CheckList
//                   options={SECURITY_DEPOSITS}
//                   selected={filters.securityDepositTypes}
//                   onChange={(v) => toggle("securityDepositTypes", v)}
//                 />
//                 <div className="mt-3">
//                   <RangeInputs
//                     min={filters.securityDepositMin}
//                     max={filters.securityDepositMax}
//                     onMin={(v) => update("securityDepositMin", v)}
//                     onMax={(v) => update("securityDepositMax", v)}
//                     prefix="₹"
//                   />
//                 </div>
//               </>
//             ),
//           },
//           {
//             title: "Maintenance",
//             node: (
//               <RangeInputs
//                 min={filters.maintenanceMin}
//                 max={filters.maintenanceMax}
//                 onMin={(v) => update("maintenanceMin", v)}
//                 onMax={(v) => update("maintenanceMax", v)}
//                 prefix="₹"
//               />
//             ),
//           },
//           {
//             title: "Company Lease",
//             node: (
//               <CheckList
//                 options={["Yes"]}
//                 selected={filters.companyLease === "true" ? ["Yes"] : []}
//                 onChange={() =>
//                   update(
//                     "companyLease",
//                     filters.companyLease === "true" ? "" : "true",
//                   )
//                 }
//               />
//             ),
//           },
//         ]
//       : []),

//     {
//       title: "Negotiable",
//       node: (
//         <CheckList
//           options={["Yes"]}
//           selected={filters.negotiable === "true" ? ["Yes"] : []}
//           onChange={() =>
//             update("negotiable", filters.negotiable === "true" ? "" : "true")
//           }
//         />
//       ),
//     },

//     {
//       title: "Parking",
//       node: (
//         <>
//           <RangeInputs
//             min={filters.coveredParkingMin}
//             max={filters.coveredParkingMax}
//             onMin={(v) => update("coveredParkingMin", v)}
//             onMax={(v) => update("coveredParkingMax", v)}
//           />
//           <div className="mt-2 text-[9px] font-bold uppercase tracking-wide text-[#93A5AD]">
//             Covered parking
//           </div>
//           <RangeInputs
//             min={filters.openParkingMin}
//             max={filters.openParkingMax}
//             onMin={(v) => update("openParkingMin", v)}
//             onMax={(v) => update("openParkingMax", v)}
//           />
//           <div className="mt-2 text-[9px] font-bold uppercase tracking-wide text-[#93A5AD]">
//             Open parking
//           </div>
//         </>
//       ),
//     },

//     {
//       title: "Power Backup / Lift",
//       node: (
//         <div className="grid grid-cols-2 gap-2">
//           <select
//             value={filters.powerBackup}
//             onChange={(e) => update("powerBackup", e.target.value)}
//             className="h-9 rounded-lg border border-[#DCE7EA] px-2 text-[10px] font-bold"
//           >
//             <option value="">Power backup</option>
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//           <select
//             value={filters.liftAvailable}
//             onChange={(e) => update("liftAvailable", e.target.value)}
//             className="h-9 rounded-lg border border-[#DCE7EA] px-2 text-[10px] font-bold"
//           >
//             <option value="">Lift</option>
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>
//       ),
//     },
//   ];

//   const mapProperties = properties
//     .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))
//     .map((p) => ({ ...p, __amount: getAmount(p, listingType) }));

//   return (
//     <div className="min-h-screen bg-[#F4F7F8] text-[#102E46]">
//          {" "}
//       <div className="border-b border-[#DCE7EA] bg-[#274255] px-4 py-5 text-white sm:px-6 lg:px-8">
//              {" "}
//         <div className="mx-auto max-w-[1500px]">
//                  {" "}
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//                      {" "}
//             <div>
//               <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#33cc99]/30 bg-[#33cc99]/10 px-3 py-1 text-[9px] font-black uppercase tracking-[.18em] text-[#75e6c0]">
//                 <SlidersHorizontal size={12} /> Property Search
//               </div>
//               <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
//                 Find a property that fits your requirement
//               </h1>
//               <p className="mt-1 max-w-3xl text-xs leading-5 text-white/60">
//                 Search live DigiNiwas inventory with location, property, budget,
//                 residential and commercial filters.
//               </p>
//             </div>
//                      {" "}
//             <div className="flex items-center gap-2 text-[10px] font-bold text-white/65">
//               {locationStatus === "granted" ? (
//                 <>
//                   <Navigation size={13} className="text-[#33cc99]" /> Using your
//                   current location
//                   {detectedLocation.city ? ` · ${detectedLocation.city}` : ""}
//                 </>
//               ) : locationStatus === "denied" ? (
//                 "Location unavailable — showing complete inventory"
//               ) : (
//                 "Detecting location…"
//               )}
//             </div>
//                    {" "}
//           </div>
//                {" "}
//         </div>
//            {" "}
//       </div>
//          {" "}
//       <div className="sticky top-0 z-[1100] border-b border-[#DCE7EA] bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-5 lg:px-8">
//              {" "}
//         <div className="mx-auto flex max-w-[1500px] flex-col gap-2 lg:flex-row">
//                  {" "}
//           <div className="relative flex-1">
//             <Search
//               size={17}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8AA0AA]"
//             />
//             <input
//               value={filters.search}
//               onChange={(e) => update("search", e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && applyFilters()}
//               placeholder="Search city, locality, society, property ID, project or address"
//               className="h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F8FBFC] pl-10 pr-3 text-xs font-semibold outline-none focus:border-[#20BE91] focus:ring-4 focus:ring-[#20BE91]/10"
//             />
//           </div>
//                  {" "}
//           <div className="flex h-11 overflow-hidden rounded-xl border border-[#DCE7EA] bg-[#F8FBFC]">
//             <button
//               type="button"
//               onClick={() => onListingType("Buy")}
//               className={`px-7 text-xs font-black ${listingType === "Buy" ? "bg-[#274255] text-white" : "text-[#59717D]"}`}
//             >
//               Buy
//             </button>
//             <button
//               type="button"
//               onClick={() => onListingType("Rent")}
//               className={`px-7 text-xs font-black ${listingType === "Rent" ? "bg-[#274255] text-white" : "text-[#59717D]"}`}
//             >
//               Rent
//             </button>
//           </div>
//                  {" "}
//           <select
//             value={buildingType}
//             onChange={(e) => onBuildingType(e.target.value)}
//             className="h-11 rounded-xl border border-[#DCE7EA] bg-[#F8FBFC] px-4 text-xs font-black text-[#526E7C] outline-none"
//           >
//             <option>Residential</option>
//             <option>Commercial</option>
//           </select>
//                  {" "}
//           <input
//             value={filters.city}
//             onChange={(e) => update("city", e.target.value)}
//             placeholder="City"
//             className="h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F8FBFC] px-4 text-xs font-bold outline-none focus:border-[#20BE91] sm:w-40"
//           />
//                  {" "}
//           <button
//             type="button"
//             onClick={() => setMobileFilters(true)}
//             className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE7EA] bg-white px-5 text-xs font-black text-[#274255] lg:hidden"
//           >
//             <Filter size={16} /> Filters
//           </button>
//                  {" "}
//           <button
//             type="button"
//             onClick={applyFilters}
//             className="h-11 rounded-xl bg-[#274255] px-7 text-xs font-black text-white transition hover:bg-[#20BE91] hover:text-[#073A30]"
//           >
//             Search
//           </button>
//                {" "}
//         </div>
//            {" "}
//       </div>
//          {" "}
//       <div className="mx-auto flex max-w-[1500px] gap-4 px-3 py-4 sm:px-5 lg:px-8 lg:py-6">
//              {" "}
//         <aside
//           className={`${mobileFilters ? "fixed inset-0 z-[2000] block" : "hidden"} lg:relative lg:z-auto lg:block lg:w-[285px] lg:shrink-0 lg:self-start`}
//         >
//           {mobileFilters && (
//             <div
//               className="absolute inset-0 bg-black/40"
//               onClick={() => setMobileFilters(false)}
//             />
//           )}
//           <div
//             className={`${mobileFilters ? "absolute bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl" : "rounded-2xl"} flex flex-col overflow-hidden border border-[#DCE7EA] bg-white shadow-[0_15px_50px_rgba(16,46,70,.12)]`}
//             style={
//               !mobileFilters && resultsContentHeight
//                 ? { height: `${Math.max(480, resultsContentHeight)}px` }
//                 : undefined
//             }
//           >
//                      {" "}
//             <div className="flex items-center justify-between border-b border-[#E7EEF1] px-4 py-4">
//               <div>
//                 <p className="text-sm font-black text-[#173B50]">Filters</p>
//                 <p className="mt-0.5 text-[10px] font-semibold text-[#8AA0AA]">
//                   {buildingType} · {listingType}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setMobileFilters(false)}
//                 className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F7F8] text-[#6D818B] lg:hidden"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//                      {" "}
//             <div className="min-h-0 flex-1 overflow-y-auto px-4">
//               <FilterSection title="Location" open>
//                 <div className="space-y-2">
//                   <input
//                     value={filters.state}
//                     onChange={(e) => update("state", e.target.value)}
//                     placeholder="State"
//                     className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
//                   />
//                   <input
//                     value={filters.locality}
//                     onChange={(e) => update("locality", e.target.value)}
//                     placeholder="Locality / Area"
//                     className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
//                   />
//                   <input
//                     value={filters.society}
//                     onChange={(e) => update("society", e.target.value)}
//                     placeholder="Society / Project"
//                     className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
//                   />
//                   <input
//                     value={filters.pinCode}
//                     onChange={(e) => update("pinCode", e.target.value)}
//                     placeholder="Pincode"
//                     className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
//                   />
//                 </div>
//               </FilterSection>
//               {filterGroups.map((group, index) => (
//                 <FilterSection
//                   key={`${group.title}-${index}`}
//                   title={group.title}
//                   open={index === 0}
//                 >
//                   {group.node}
//                 </FilterSection>
//               ))}
//             </div>
//                      {" "}
//             <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-[#E7EEF1] p-4">
//               <button
//                 type="button"
//                 onClick={resetFilters}
//                 className="h-10 rounded-xl border border-[#DCE7EA] text-[11px] font-black text-[#526E7C]"
//               >
//                 Reset
//               </button>
//               <button
//                 type="button"
//                 onClick={applyFilters}
//                 className="h-10 rounded-xl bg-[#20BE91] text-[11px] font-black text-[#073A30]"
//               >
//                 Apply Filters
//               </button>
//             </div>
//             {" "}
//           </div>
//                {" "}
//         </aside>
//              {" "}
//         <main className="min-w-0 flex-1">
//                  {" "}
//           <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h1 className="text-lg font-black text-[#173B50]">
//                 {seo?.category
//                   ? `${seo.category.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())} in ${filters.locality ? `${filters.locality}, ` : ""}${filters.city}`
//                   : filters.city
//                     ? `${listingType} properties in ${filters.city}`
//                     : `${listingType} properties`}
//               </h1>
//               <p className="mt-0.5 text-[11px] font-semibold text-[#8AA0AA]">
//                 {loading ? "Searching live inventory…" : filteredCountLabel} ·
//                 multiple filters can be combined
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => setMobileFilters(true)}
//                 className="hidden items-center gap-2 rounded-xl border border-[#DCE7EA] bg-white px-3 py-2 text-[10px] font-black lg:inline-flex"
//               >
//                 <Filter size={14} /> All Filters
//               </button>
//               <select
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className="h-9 rounded-xl border border-[#DCE7EA] bg-white px-3 text-[10px] font-black text-[#526E7C]"
//               >
//                 <option value="relevance">Relevance</option>
//                 <option value="newest">Newest</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//               </select>
//             </div>
//           </div>
//                  {" "}
//           <div ref={resultsContentRef}>
//             {loading ? (
//               <div className="space-y-4">
//                 {[1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className="grid h-[235px] animate-pulse grid-cols-[210px_1fr] overflow-hidden rounded-2xl bg-white"
//                   >
//                     <div className="bg-[#E7EEF1]" />
//                     <div className="p-5">
//                       <div className="h-4 w-2/3 rounded bg-[#E7EEF1]" />
//                       <div className="mt-3 h-8 w-1/2 rounded bg-[#E7EEF1]" />
//                       <div className="mt-6 h-10 w-full rounded bg-[#F0F4F5]" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : error ? (
//               <div className="rounded-2xl border border-red-100 bg-white p-12 text-center">
//                 <p className="font-black text-[#173B50]">{error}</p>
//                 <button
//                   type="button"
//                   onClick={() => fetchProperties()}
//                   className="mt-4 rounded-xl bg-[#274255] px-5 py-2.5 text-xs font-black text-white"
//                 >
//                   Try again
//                 </button>
//               </div>
//             ) : properties.length === 0 ? (
//               <div className="rounded-2xl border border-[#DCE7EA] bg-white p-14 text-center">
//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF8F5] text-[#20BE91]">
//                   <Search size={24} />
//                 </div>
//                 <h3 className="mt-4 text-lg font-black">
//                   No properties match these filters
//                 </h3>
//                 <p className="mt-2 text-xs text-[#80949E]">
//                   Try removing a filter or search another city. Your location
//                   fallback is active for the Popular Properties section.
//                 </p>
//                 <button
//                   type="button"
//                   onClick={resetFilters}
//                   className="mt-5 rounded-xl bg-[#274255] px-5 py-2.5 text-xs font-black text-white"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {properties.map((property) => (
//                   <PropertyListCard
//                     key={property._id || property.propertyId}
//                     property={property}
//                     listingType={listingType}
//                     selected={
//                       String(selectedId) ===
//                       String(property._id || property.propertyId)
//                     }
//                     onSelect={(p) =>
//                       setSelectedId(String(p._id || p.propertyId))
//                     }
//                   />
//                 ))}
//               </div>
//             )}
//                    {" "}
//             {total > properties.length && (
//               <div className="mt-5 flex items-center justify-center gap-2">
//                 <button
//                   type="button"
//                   disabled={page <= 1}
//                   onClick={() => {
//                     setPage((p) => p - 1);
//                     setTimeout(() => fetchProperties({ keepPage: true }), 0);
//                   }}
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE7EA] bg-white disabled:opacity-40"
//                 >
//                   <ChevronLeft size={16} />
//                 </button>
//                 <span className="text-[10px] font-black text-[#647D88]">
//                   Page {page}
//                 </span>
//                 <button
//                   type="button"
//                   disabled={page >= Math.ceil(total / 30)}
//                   onClick={() => {
//                     setPage((p) => p + 1);
//                     setTimeout(() => fetchProperties({ keepPage: true }), 0);
//                   }}
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE7EA] bg-white disabled:opacity-40"
//                 >
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//                  {" "}
//           </div>
//         </main>
//              {" "}
//         <section className="hidden w-[36%] min-w-[330px] lg:block">
//                  {" "}
//           <div className="sticky top-[86px] h-[calc(100vh-110px)] overflow-hidden rounded-2xl border border-[#DCE7EA] bg-[#274255] shadow-[0_12px_40px_rgba(16,46,70,.14)]">
//                      {" "}
//             <div className="absolute left-4 top-4 z-[1000] rounded-xl border border-[#DCE7EA] bg-white/95 px-3 py-2 text-[#173B50] shadow-md backdrop-blur">
//               <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#1CAA82]">
//                 Property Map
//               </p>
//               <p className="mt-0.5 text-[10px] text-[#718792]">
//                 {mapProperties.length} mapped listings
//               </p>
//             </div>
//                      {" "}
//             <MapContainer
//               center={[22.9734, 78.6569]}
//               zoom={5}
//               zoomControl={false}
//               scrollWheelZoom
//               className="h-full w-full"
//             >
//                          {" "}
//               <MapViewport properties={mapProperties} selectedId={selectedId} />
//                          {" "}
//               <TileLayer
//                 url={LIGHT_TILE_URL}
//                 attribution={LIGHT_TILE_ATTRIBUTION}
//                 noWrap
//               />
//                          {" "}
//               {mapProperties.map((property) => (
//                 <PropertyMarker
//                   key={property._id || property.propertyId}
//                   property={property}
//                   selected={
//                     String(selectedId) ===
//                     String(property._id || property.propertyId)
//                   }
//                   onSelect={(p) => setSelectedId(String(p._id || p.propertyId))}
//                 />
//               ))}
//                        {" "}
//             </MapContainer>
//                      {" "}
//             {mapProperties.length === 0 && (
//               <div className="absolute inset-0 z-[900] flex items-center justify-center bg-white/90 px-8 text-center">
//                 <div>
//                   <MapPin className="mx-auto text-[#33cc99]" size={30} />
//                   <p className="mt-3 text-sm font-black text-[#173B50]">
//                     Map location unavailable
//                   </p>
//                   <p className="mt-1 text-[10px] text-[#80949E]">
//                     Properties without coordinates are still shown in the list.
//                   </p>
//                 </div>
//               </div>
//             )}
//                    {" "}
//           </div>
//                {" "}
//         </section>
//            {" "}
//       </div>
//          {" "}
//       {/* Popular Properties — always rendered at the bottom of Explore Properties */}
//          {" "}
//       <div className="mt-8">
//              {" "}
//         <PropertyDiscoverySection
//           title="Popular Properties"
//           subtitle="Explore popular live properties after your search results."
//           variant="popular"
//         />
//            {" "}
//       </div>
//          {" "}
//       <FAQSection
//         title="Property Search FAQs"
//         subtitle="Quick answers for buyers about property discovery, support and safety."
//         groups={exploreFaqs}
//       />
//          {" "}
//       <ExplorePropertyHubs
//         city={detectedLocation.city || filters.city}
//         locationStatus={locationStatus}
//       />
//        {" "}
//     </div>
//   );
// }


import { useEffect, useMemo, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import L from "leaflet";

import {
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Home as HomeIcon,
  MapPin,
  Maximize2,
  Navigation,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import axios from "../api/axios";

import propertyFallback from "../assets/images/property.png";

import PropertyDiscoverySection from "./home/PropertyDiscoverySection";
import { createPropertyLogoIcon } from "../components/common/propertyMapMarker";

import FAQSection from "../components/common/FAQSection";

const exploreFaqs = [
  {
    title: "Buyer FAQs",

    items: [
      {
        question: "How do I search for a property?",
        answer:
          "Use search, filters, map view or Niwas AI to find properties based on location, budget, property type and preferences.",
      },

      {
        question: "Can I save and compare properties?",
        answer:
          "Yes, where those features are available. Use Save/Shortlist and Compare to review selected listings later.",
      },

      {
        question: "Does DigiNiwas guarantee property information?",
        answer:
          "No. Users must independently verify ownership, approvals, measurements, pricing, condition and other important transaction information.",
      },
    ],
  },

  {
    title: "Support FAQs",

    items: [
      {
        question: "How do I contact DigiNiwas?",
        answer: "Use Help & Support in the app or email info@diginiwas.com.",
      },
    ],
  },

  {
    title: "Safety FAQs",

    items: [
      {
        question: "How do I report a suspicious property?",
        answer:
          "Open the property listing, use Report Property, choose the reason and submit the report. You may also report a Partner/User where the feature is available.",
      },
    ],
  },
];

const LIGHT_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const LIGHT_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const RESIDENTIAL_TYPES = [
  "Apartment",
  "Villa",
  "Plot",
  "Builder Floor",
  "Penthouse",
  "Independent House",
];

const COMMERCIAL_TYPES = [
  "Office Space",
  "Shop",
  "Land",
  "Office Space in IT/SEZ",
  "Showroom",
  "Warehouse",
  "Industrial Plot",
  "Co-working Space",
];

const BHK_TYPES = [
  "Studio",
  "1 RK",
  "1 BHK",
  "1.5 BHK",
  "2 BHK",
  "2.5 BHK",
  "3 BHK",
  "3.5 BHK",
  "4 BHK",
  "5 BHK",
  "6 BHK",
  "6+ BHK",
];

const FURNISHING = ["Furnished", "Semi-Furnished", "Unfurnished"];

const AREA_TYPES = [
  "Built-up Area",
  "Super Built-up Area",
  "Carpet Area",
  "Saleable Area",
  "Plot Area",
];

const FACING = [
  "East",
  "West",
  "North",
  "South",
  "North East",
  "North West",
  "South East",
  "South West",
];

const VIEWS = [
  "Beach View",
  "Garden View",
  "Golf Course",
  "Lake View",
  "Park View",
  "Road View",
  "Community View",
  "Pool View",
  "Creek View",
  "Sea View",
];

const FLOORING = [
  "Marble",
  "Concrete",
  "Cemented",
  "Carpeted",
  "Wooden",
  "Vitrified Tiles",
  "Wooden Tiles",
  "Imported Tiles",
  "Indian Tiles",
  "Ceramic",
  "Hardwood",
  "Carpet",
  "Others",
];

const WATER = ["Municipal Supply", "Borewell/Underground", "Tanker", "Others"];

const AMENITIES = [
  "Gymnasium",
  "Swimming Pool",
  "Kids Play Areas",
  "Jogging/Cycle Track",
  "Power Backup",
  "Attached Market",
  "24 x 7 Security",
  "Clubhouse",
  "High Speed Elevators",
  "Day Care Center",
  "Party Hall",
  "EV Charging",
  "Multi-level Parking",
  "Multi-purpose Sports Court",
  "Theatre/Mini Cinema",
  "Rooftop Deck/Observatory",
  "Shopping Complex",
  "Community Shuttle Service",
  "Central Park",
];

const RES_HIGHLIGHTS = [
  "Pet Friendly",
  "Gated Community",
  "Smart Home",
  "Premium Location",
  "Corner Unit",
  "Vastu Compliant",
  "Private Garden",
  "Low Density Project",
  "Quiet/Low Traffic Area",
  "Wheelchair Accessible",
  "Never Occupied",
];

const COM_HIGHLIGHTS = [
  "Premium Location",
  "Corner Unit",
  "Vastu Compliant",
  "Low Density Project",
  "Quiet/Low Traffic Area",
  "Wheelchair Accessible",
  "Never Occupied",
  "Road Facing",
  "High Visibility",
  "Ready to Move",
];

const LOCATION_ADVANTAGES = [
  "Good School in vicinity",
  "Nearby Metro Station",
  "Peaceful Vicinity",
  "Near City Center",
  "Safe & Secure Locality",
  "Near Reputed Hospital",
  "Close to Shopping Mall/Market",
  "Highway/Expressway Access",
  "Near IT Park/Business Hub",
  "Close to Railway Station",
];

const OFFICE_SPACE_TYPES = ["Semi-Fitted", "Fitted Space", "Shell and Core"];

const PANTRY_TYPES = ["Wet", "Dry", "None"];

const SECURITY_DEPOSITS = ["Zero Deposit", "One Month", "Two Months", "Other"];

const AGES = ["Never Occupied", "0-1", "2-4", "5-7", "8-10", "10+"];

const OWNERSHIP = ["Free Hold", "Leasehold", "Power of Attorney"];

const POSSESSION = ["Ready To Move", "Under Construction"];

const SUITED_FOR = [
  "Students",
  "Working Professionals",
  "Family",
  "Bachelor",
  "Company Lease",
  "Any",
];

const SPACES = [
  "Prayer Room",
  "Servant Room",
  "Study Room",
  "Extra Room",
  "Basement",
  "Store Room",
  "Private Garden",
  "Private Pool",
  "Terrace",
];

const blankFilters = () => ({
  search: "",

  city: "Jaipur",

  state: "",

  locality: "",

  society: "",

  pinCode: "",

  propertyType: [],

  bedrooms: [],

  bathrooms: [],

  minPrice: "",

  maxPrice: "",

  minRent: "",

  maxRent: "",

  minArea: "",

  maxArea: "",

  areaType: [],

  sizeUnit: "",

  furnishing: [],

  furnishingItems: [],

  possessionStatus: [],

  ageOfProperty: [],

  transactionModel: [],

  ownershipType: [],

  waterSources: [],

  locationAdvantages: [],

  facings: [],

  views: [],

  flooring: [],

  additionalSpaces: [],

  suitedFor: [],

  amenities: [],

  highlights: [],

  officeSpaceTypes: [],

  pantryTypes: [],

  securityDepositTypes: [],

  availability: [],

  negotiable: "",

  companyLease: "",

  personalWashroom: "",

  powerBackup: "",

  liftAvailable: "",

  bathroomsMin: "",

  bathroomsMax: "",

  coveredParkingMin: "",

  coveredParkingMax: "",

  openParkingMin: "",

  openParkingMax: "",

  balconiesMin: "",

  maintenanceMin: "",

  maintenanceMax: "",

  securityDepositMin: "",

  securityDepositMax: "",
});

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const EXPLORE_HUB_DATA = {
  ambala: {
    localities: [
      "Ambala Cantt",
      "Ambala City",
      "Sector 7",
      "Model Town",
      "Baldev Nagar",
    ],
  },

  jaipur: {
    localities: [
      "Vaishali Nagar",
      "Mansarovar",
      "Malviya Nagar",
      "Jagatpura",
      "C-Scheme",
    ],
  },

  bengaluru: {
    localities: [
      "Whitefield",
      "Electronic City",
      "Sarjapur Road",
      "Hebbal",
      "HSR Layout",
    ],
  },

  bangalore: {
    localities: [
      "Whitefield",
      "Electronic City",
      "Sarjapur Road",
      "Hebbal",
      "HSR Layout",
    ],
  },

  pune: {
    localities: ["Wakad", "Baner", "Hinjewadi", "Kharadi", "Viman Nagar"],
  },

  indore: {
    localities: ["Vijay Nagar", "Rau", "Nipania", "Scheme 140", "Palasia"],
  },

  bhopal: {
    localities: [
      "MP Nagar",
      "Kolar Road",
      "Arera Colony",
      "Hoshangabad Road",
      "Bawadia Kalan",
    ],
  },

  ahmedabad: {
    localities: ["Shela", "Shilaj", "SG Highway", "Bopal", "Prahlad Nagar"],
  },
};

const slugCity = (city = "") => slugify(city || "ambala");

const cityLabel = (city = "") =>
  String(city || "Ambala")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());

const hubPath = ({ city, category, locality = "" }) => {
  const citySlug = slugCity(city);

  const localitySlug = locality ? slugify(locality) : "";

  return localitySlug
    ? `/${citySlug}/${localitySlug}/${category}`
    : `/${citySlug}/${category}`;
};

function HubChip({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-lg border border-[#E6EDF0] bg-[#F4F7F9] px-3 py-1.5 text-[10px] font-bold leading-none text-[#274255] transition hover:border-[#BDE5D9] hover:bg-[#EAF8F4] hover:text-[#0D8C6A] sm:text-[11px]"
    >
            {label}   {" "}
    </button>
  );
}

function ExplorePropertyHubs({ city, locationStatus = "denied" }) {
  const hasDetectedCity = locationStatus === "granted" && city;

  const primaryCity = hasDetectedCity ? city : "Ambala";

  const primaryLabel = cityLabel(primaryCity);

  const localities = EXPLORE_HUB_DATA[slugCity(primaryCity)]?.localities || [];

  const fallbackCities = ["Ambala", "Jaipur", "Bengaluru", "Pune"];

  const navigate = useNavigate();

  const primaryItems = [
    [
      `2 BHK Flats in ${primaryLabel}`,
      hubPath({ city: primaryCity, category: "2-bhk-flats-for-sale" }),
    ],

    [
      `Flats for Sale in ${primaryLabel}`,
      hubPath({ city: primaryCity, category: "flats-for-sale" }),
    ],

    [
      `Flats for Rent in ${primaryLabel}`,
      hubPath({ city: primaryCity, category: "flats-for-rent" }),
    ],

    [
      `Commercial Property for Rent in ${primaryLabel}`,
      hubPath({ city: primaryCity, category: "commercial-property-for-rent" }),
    ],

    [
      `Commercial Property for Sale in ${primaryLabel}`,
      hubPath({ city: primaryCity, category: "commercial-property-for-sale" }),
    ],

    [
      `Property Prices in ${primaryLabel}`,
      hubPath({ city: primaryCity, category: "flats-for-sale" }),
    ],
  ];

  const requirementItems = [
    [
      `2 BHK Properties`,
      hubPath({ city: primaryCity, category: "2-bhk-flats-for-sale" }),
    ],

    [
      `3 BHK Properties`,
      hubPath({ city: primaryCity, category: "3-bhk-flats" }),
    ],

    [
      `Properties for Sale`,
      hubPath({ city: primaryCity, category: "properties-for-sale" }),
    ],

    [
      `Properties for Rent`,
      hubPath({ city: primaryCity, category: "properties-for-rent" }),
    ],
  ];

  const localityItems = localities.length
    ? localities.map((locality) => [
        locality,
        hubPath({ city: primaryCity, locality, category: "flats-for-sale" }),
      ])
    : [];

  return (
    <section className="mt-8 rounded-[24px] border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-7">
           {" "}
      <div>
               {" "}
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1CAA82]">
          SEO Discovery
        </p>
               {" "}
        <h2 className="mt-1 text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
          Explore Properties &amp; Locality Hubs
        </h2>
               {" "}
        <p className="mt-1 text-[11px] leading-5 text-[#7B8F98]">
                   {" "}
          {hasDetectedCity
            ? `Showing quick property searches around your detected location: ${primaryLabel}.`
            : "Popular city searches are shown until you allow location access."}
                 {" "}
        </p>
             {" "}
      </div>
           {" "}
      <div className="mt-6 space-y-5">
               {" "}
        <div>
                   {" "}
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
            Explore More Properties
          </p>
                   {" "}
          <div className="mt-2.5 flex flex-wrap gap-2">
                       {" "}
            {primaryItems.map(([label, path]) => (
              <HubChip
                key={label}
                label={label}
                onClick={() => navigate(path)}
              />
            ))}
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <div>
                   {" "}
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
            Nearby Localities
          </p>
                   {" "}
          <div className="mt-2.5 flex flex-wrap gap-2">
                       {" "}
            {localityItems.length
              ? localityItems.map(([label, path]) => (
                  <HubChip
                    key={label}
                    label={label}
                    onClick={() => navigate(path)}
                  />
                ))
              : fallbackCities.map((fallbackCity) => (
                  <HubChip
                    key={fallbackCity}
                    label={fallbackCity}
                    onClick={() =>
                      navigate(
                        hubPath({
                          city: fallbackCity,
                          category: "flats-for-sale",
                        }),
                      )
                    }
                  />
                ))}
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <div>
                   {" "}
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
            Find Properties by Requirement
          </p>
                   {" "}
          <div className="mt-2.5 flex flex-wrap gap-2">
                       {" "}
            {requirementItems.map(([label, path]) => (
              <HubChip
                key={label}
                label={label}
                onClick={() => navigate(path)}
              />
            ))}
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        {!hasDetectedCity && (
          <div>
                       {" "}
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#667E88]">
              Popular Cities
            </p>
                       {" "}
            <div className="mt-2.5 flex flex-wrap gap-2">
                           {" "}
              {fallbackCities.map((fallbackCity) => (
                <HubChip
                  key={fallbackCity}
                  label={fallbackCity}
                  onClick={() =>
                    navigate(
                      hubPath({
                        city: fallbackCity,
                        category: "flats-for-sale",
                      }),
                    )
                  }
                />
              ))}
                         {" "}
            </div>
                     {" "}
          </div>
        )}
             {" "}
      </div>
         {" "}
    </section>
  );
}

const parseSeoPath = (seoPath = "") => {
  const value = decodeURIComponent(seoPath || window.location.pathname)
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

  if (!value) return null; // Legacy URLs are still understood, but are redirected to the new SEO architecture.

  if (
    value.startsWith("buyproperty-in-") ||
    value.startsWith("rentproperty-in-")
  ) {
    const isRent = value.startsWith("rentproperty-in-");

    const prefix = isRent ? "rentproperty-in-" : "buyproperty-in-";

    let rest = value.slice(prefix.length);

    const bhkMatch = rest.match(
      /-(studio|[0-9]+(?:\.[0-9]+)?(?:-?bhk|-?rk)|[0-9]+\+?bhk)$/i,
    );

    let bedrooms = "";

    if (bhkMatch) {
      bedrooms = bhkMatch[1]
        .replace(/-/g, " ")
        .replace(/\brk\b/i, "RK")
        .replace(/\bbhk\b/i, "BHK")
        .replace(/\s+/g, " ")
        .trim();

      rest = rest.slice(0, -bhkMatch[0].length);
    }

    return {
      listingType: isRent ? "Rent" : "Buy",
      city: rest.replace(/-/g, " ").trim(),
      bedrooms,
      legacy: true,
      indexable: true,
    };
  }

  const parts = value.split("/").filter(Boolean);

  if (!parts.length) return null;

  // City-wide hub: /properties-in-jaipur. This page intentionally shows
  // every live property in the city, including both Buy/Sale and Rent.
  if (parts.length === 1 && /^properties-in-.+/.test(parts[0])) {
    const city = parts[0].slice("properties-in-".length).replace(/-/g, " ").trim();
    if (!city) return null;
    return {
      listingType: "All",
      city,
      category: "",
      locality: "",
      bedrooms: "",
      buildingType: "All",
      propertyType: "",
      allListings: true,
      indexable: true,
    };
  }

  const city = parts[0].replace(/-/g, " ").trim();

  if (parts.length === 1)
    return {
      listingType: "Buy",
      city,
      category: "",
      locality: "",
      bedrooms: "",
      buildingType: "Residential",
      propertyType: "",
      indexable: true,
    };

  const result = {
    listingType: "Buy",
    city,
    locality: "",
    category: "",
    bedrooms: "",
    buildingType: "Residential",
    propertyType: "",
    indexable: true,
  };

  const firstSubPath = parts[1];

  if (firstSubPath === "buy" || firstSubPath === "rent") {
    result.listingType = firstSubPath === "rent" ? "Rent" : "Buy";

    return result;
  } // /city/<category>

  let categoryParts = [firstSubPath]; // /city/<locality>/<category>

  if (parts.length >= 3) {
    result.locality = firstSubPath.replace(/-/g, " ");

    categoryParts = parts.slice(2);
  }

  const category = categoryParts.join("-");

  result.category = category;

  result.listingType = /rent/.test(category) ? "Rent" : "Buy";
  if (category.includes("commercial")) result.buildingType = "Commercial";
  else if (["properties-for-rent", "properties-for-sale", "properties-for-sell", "all-properties-for-rent", "all-properties-for-sale"].includes(category)) result.buildingType = "All";
  if (/villas-/.test(category)) result.propertyType = "Villa";
  else if (/houses-/.test(category)) result.propertyType = "Independent House";
  else if (/plots-/.test(category)) result.propertyType = "Plot";

  if (
    [
      "properties-for-rent",
      "properties-for-sale",
      "properties-for-sell",
      "all-properties-for-rent",
      "all-properties-for-sale",
    ].includes(category)
  ) {
    result.buildingType = "All";
    result.propertyType = "";
    result.bedrooms = "";
  }

  const bhkMatch = category.match(
    /(^|-)((?:studio)|(?:[0-9]+(?:\.[0-9]+)?\+?)-?bhk)(?:-|$)/i,
  );

  if (bhkMatch)
    result.bedrooms = bhkMatch[2].replace(/-/g, " ").replace(/\bbhk\b/i, "BHK");

  return result;
};

const buildSeoPath = ({
  listingType,
  city,
  locality = "",
  bedrooms = "",
  buildingType = "Residential",
  propertyType = "",
  allBuildingTypes = false,
}) => {
  const citySlug = slugify(city || "india");
  const localitySlug = slugify(locality);

  // Generic property hubs deliberately include both residential and commercial.
  if (allBuildingTypes && !bedrooms && !propertyType) {
    const category = `properties-for-${listingType === "Rent" ? "rent" : "sale"}`;
    return localitySlug
      ? `/${citySlug}/${localitySlug}/${category}`
      : `/${citySlug}/${category}`;
  }

  const normalizedPropertyType = String(propertyType || "").toLowerCase();
  let category = "";
  if (String(buildingType).toLowerCase() === "commercial") {
    category = `commercial-property-for-${listingType === "Rent" ? "rent" : "sale"}`;
  } else if (/villa/.test(normalizedPropertyType)) {
    category = `villas-for-${listingType === "Rent" ? "rent" : "sale"}`;
  } else if (/house/.test(normalizedPropertyType)) {
    category = `houses-for-${listingType === "Rent" ? "rent" : "sale"}`;
  } else if (/plot/.test(normalizedPropertyType)) {
    category = `plots-for-${listingType === "Rent" ? "rent" : "sale"}`;
  } else {
    category = `flats-for-${listingType === "Rent" ? "rent" : "sale"}`;
  }

  const bhkSlug = String(bedrooms || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  if (bhkSlug && /(?:bhk|studio)/i.test(bhkSlug))
    category = `${bhkSlug}-${category}`;

  return localitySlug
    ? `/${citySlug}/${localitySlug}/${category}`
    : `/${citySlug}/${category}`;
};

const getImages = (property = {}) => {
  const source = [
    ...(Array.isArray(property.images) ? property.images : []),

    ...(Array.isArray(property.media?.images) ? property.media.images : []),

    ...(Array.isArray(property.gallery) ? property.gallery : []),
  ];

  const images = source
    .map((item) =>
      typeof item === "string"
        ? { url: item }
        : item?.secure_url
          ? { ...item, url: item.secure_url }
          : item,
    )
    .filter((item) => item?.url);

  const cover = images.find((item) => item?.isCover);

  return cover ? [cover, ...images.filter((item) => item !== cover)] : images;
};

const firstImage = (property) =>
  getImages(property)[0]?.url || propertyFallback;

const isRentProperty = (property, listingType) => {
  if (listingType === "Rent") return true;
  if (listingType === "Buy") return false;
  const intent = String(
    property?.transactionType || property?.listingType || property?.category || "",
  ).toLowerCase();
  return intent.includes("rent") || intent.includes("lease");
};

const getAmount = (property, listingType) => {
  if (isRentProperty(property, listingType))
    return Number(
      property?.rent?.amount ?? property?.rentAmount ?? property?.price?.amount ?? property?.price ?? 0,
    );

  return Number(
    property?.price?.amount ?? property?.priceAmount ?? property?.price ?? 0,
  );
};

const formatMoney = (value) => {
  const n = Number(value);

  if (!Number.isFinite(n) || n <= 0) return "Price on request";

  if (n >= 10000000)
    return `₹${(n / 10000000).toFixed(n % 10000000 ? 2 : 0)} Cr`;

  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 ? 2 : 0)} Lakh`;

  return `₹${n.toLocaleString("en-IN")}`;
};

const toArray = (value) =>
  Array.isArray(value) ? value : value ? [value] : [];

const getArea = (property) => {
  const area = Array.isArray(property?.areaDetails)
    ? property.areaDetails.find((item) => item?.display !== false) ||
      property.areaDetails[0]
    : null;

  return {
    value: Number(
      property?.propertySize ?? property?.areaValue ?? area?.value ?? 0,
    ),

    unit: property?.sizeUnit || property?.areaUnit || area?.unit || "Sq. Ft.",
  };
};

const toFiniteCoordinate = (...values) => {
  for (const value of values) {
    if (value === "" || value == null) continue;
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
};

const isValidLatLng = (latitude, longitude) =>
  Number.isFinite(latitude) &&
  Number.isFinite(longitude) &&
  latitude >= -90 &&
  latitude <= 90 &&
  longitude >= -180 &&
  longitude <= 180;

const normalizeProperty = (p) => ({
  ...p,

  city: p?.city || p?.location?.city || "",

  state: p?.state || p?.location?.state || "",

  locality: p?.locality || p?.location?.locality || "",

  address: p?.address || p?.location?.address || "",

  latitude: toFiniteCoordinate(
    p?.latitude,
    p?.location?.latitude,
    Array.isArray(p?.location?.coordinates) ? p.location.coordinates[1] : null,
    Array.isArray(p?.coordinates) ? p.coordinates[1] : null,
  ),

  longitude: toFiniteCoordinate(
    p?.longitude,
    p?.location?.longitude,
    Array.isArray(p?.location?.coordinates) ? p.location.coordinates[0] : null,
    Array.isArray(p?.coordinates) ? p.coordinates[0] : null,
  ),

  bedrooms: p?.bedrooms || p?.bhk || "",

  bathrooms: Number(p?.bathrooms ?? p?.specifications?.bathrooms ?? 0),

  area: getArea(p),

  furnishing: p?.furnishing?.status || p?.furnishing || "",

  imageUrl: firstImage(p),
});

function MapViewport({ properties, selectedId }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !map._loaded) return;

    if (selectedId) {
      const property = properties.find(
        (item) => String(item._id || item.propertyId) === String(selectedId),
      );

      if (!property) return;

      const latitude = Number(property.latitude);
      const longitude = Number(property.longitude);

      if (!isValidLatLng(latitude, longitude)) return;

      try {
        const currentCenter = map.getCenter();

        if (!isValidLatLng(currentCenter.lat, currentCenter.lng)) {
          map.setView([latitude, longitude], 14, { animate: false });
          return;
        }

        map.flyTo([latitude, longitude], 14, { duration: 0.6 });
      } catch (error) {
        console.warn("Unable to move property map to coordinates:", {
          latitude,
          longitude,
          error,
        });
        map.setView([latitude, longitude], 14, { animate: false });
      }

      return;
    }

    const points = properties
      .map((property) => [
        Number(property.latitude),
        Number(property.longitude),
      ])
      .filter(([latitude, longitude]) => isValidLatLng(latitude, longitude));

    if (!points.length) return;

    try {
      const bounds = L.latLngBounds(points);

      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [40, 40],
          maxZoom: 12,
        });
      }
    } catch (error) {
      console.warn("Unable to fit property map bounds:", error);
    }
  }, [map, properties, selectedId]);

  return null;
}

function PropertyMarker({ property, selected, onSelect }) {
  const latitude = Number(property?.latitude);
  const longitude = Number(property?.longitude);

  if (!isValidLatLng(latitude, longitude)) {
    return null;
  }

  const icon = createPropertyLogoIcon(selected ? 58 : 52);

  return (
    <Marker
      position={[latitude, longitude]}
      icon={icon}
      eventHandlers={{ click: () => onSelect(property) }}
    >
         {" "}
      <Popup>
             {" "}
        <div className="min-w-[190px]">
                 {" "}
          <img
            src={property.imageUrl}
            alt=""
            className="mb-2 h-24 w-full rounded-lg object-cover"
          />
                 {" "}
          <p className="font-extrabold text-[#102E46]">
            {property.title || "Property"}
          </p>
                 {" "}
          <p className="mt-1 text-xs text-slate-500">
            {property.locality || property.city}
          </p>
                 {" "}
          <p className="mt-2 font-black text-[#20BE91]">
            {formatMoney(property.__amount)}
          </p>
               {" "}
        </div>
           {" "}
      </Popup>
       {" "}
    </Marker>
  );
}

function FilterSection({ title, children, open = false }) {
  const [expanded, setExpanded] = useState(open);

  return (
    <div className="border-b border-[#E7EEF1] py-4 last:border-b-0">
           {" "}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
               {" "}
        <span className="text-[13px] font-black text-[#183B50]">{title}</span>
               {" "}
        <ChevronDown
          size={16}
          className={`text-[#6C838F] transition ${expanded ? "rotate-180" : ""}`}
        />
             {" "}
      </button>
            {expanded && <div className="mt-3">{children}</div>}   {" "}
    </div>
  );
}

function CheckList({ options, selected, onChange, maxVisible = 7 }) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? options : options.slice(0, maxVisible);

  return (
    <div className="space-y-2">
         {" "}
      {visible.map((option) => {
        const checked = selected.includes(option);

        return (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-[#55707D]"
          >
                   {" "}
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
                   {" "}
            <span
              className={`flex h-4 w-4 items-center justify-center rounded border transition ${checked ? "border-[#20BE91] bg-[#20BE91] text-white" : "border-[#C9D7DC] bg-white"}`}
            >
              {checked && <Check size={11} />}
            </span>
                    <span className="leading-4">{option}</span>     {" "}
          </label>
        );
      })}
         {" "}
      {options.length > maxVisible && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="text-[11px] font-black text-[#0C9E77]"
        >
          {showAll ? "Show less" : `+${options.length - maxVisible} more`}
        </button>
      )}
       {" "}
    </div>
  );
}

function RangeInputs({ min, max, onMin, onMax, prefix = "" }) {
  return (
    <div className="grid grid-cols-2 gap-2">
         {" "}
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8AA0AA]">
          {prefix}
        </span>
        <input
          value={min}
          onChange={(e) => onMin(e.target.value)}
          placeholder="Min"
          type="number"
          className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-[#FAFCFD] pl-7 pr-2 text-[11px] font-bold outline-none focus:border-[#20BE91]"
        />
      </div>
         {" "}
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8AA0AA]">
          {prefix}
        </span>
        <input
          value={max}
          onChange={(e) => onMax(e.target.value)}
          placeholder="Max"
          type="number"
          className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-[#FAFCFD] pl-7 pr-2 text-[11px] font-bold outline-none focus:border-[#20BE91]"
        />
      </div>
       {" "}
    </div>
  );
}

function PropertyListCard({ property, listingType, selected, onSelect }) {
  const navigate = useNavigate();

  const rent = isRentProperty(property, listingType);

  const amount = getAmount(property, rent ? "Rent" : "Buy");

  const specs = [
    property.bedrooms && property.bedrooms,

    property.bathrooms > 0 && `${property.bathrooms} Bath`,

    property.area?.value > 0 &&
      `${property.area.value.toLocaleString("en-IN")} ${property.area.unit}`,
  ].filter(Boolean);

  return (
    <article
      onMouseEnter={() => onSelect(property)}
      onClick={() =>
        navigate(
          `/property/${encodeURIComponent(property.propertyId || property._id)}/${slugify(property.title || "property")}`,
          { state: { property } },
        )
      }
      className={`group grid cursor-pointer grid-cols-[155px_minmax(0,1fr)] gap-0 overflow-hidden rounded-2xl border bg-white shadow-[0_5px_22px_rgba(16,46,70,.08)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(16,46,70,.14)] sm:grid-cols-[210px_minmax(0,1fr)] ${selected ? "border-[#20BE91] ring-2 ring-[#20BE91]/10" : "border-[#E2EBEE]"}`}
    >
         {" "}
      <div className="relative min-h-[220px] overflow-hidden bg-[#EAF1F3] sm:min-h-[235px]">
             {" "}
        <img
          src={property.imageUrl}
          alt={property.title || "Property"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = propertyFallback;
          }}
        />
             {" "}
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-md bg-[#0D2B40]/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white">
            {rent ? "Rent" : "Buy"}
          </span>
          {property.propertyType && (
            <span className="rounded-md bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-[#173B50]">
              {property.propertyType}
            </span>
          )}
        </div>
             {" "}
        {property.promotion?.sponsored && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#20BE91] px-2.5 py-1 text-[9px] font-black text-[#073A30]">
            Featured
          </span>
        )}
           {" "}
      </div>
         {" "}
      <div className="flex min-w-0 flex-col p-4 sm:p-5">
             {" "}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-[#F2F6F8] px-2 py-1 text-[9px] font-bold text-[#718792]">
              {property.status === "Live" ? "Live" : "Verified"}
            </span>
            <h3 className="mt-2 line-clamp-2 text-[16px] font-black leading-5 text-[#102E46] sm:text-[18px]">
              {property.title ||
                `${property.propertyType || "Property"} in ${property.city || "India"}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E3EAED] text-[#6D818B] hover:border-[#20BE91] hover:text-[#20BE91]"
          >
            ♡
          </button>
        </div>
             {" "}
        <div className="mt-2 flex items-start gap-1.5 text-[11px] leading-4 text-[#718792]">
          <MapPin size={14} className="mt-0.5 shrink-0 text-[#20BE91]" />
          <span className="line-clamp-2">
            {property.locality ||
              property.city ||
              "Location available on request"}
            {property.locality && property.city ? `, ${property.city}` : ""}
          </span>
        </div>
             {" "}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[22px] font-black leading-none text-[#102E46]">
              {formatMoney(amount)}
            </div>
            {rent && (
              <div className="mt-1 text-[10px] font-semibold text-[#8AA0AA]">
                {property.rent?.frequency || "Per Month"}
              </div>
            )}
          </div>
          {property.furnishing && (
            <span className="rounded-full bg-[#EEF9F6] px-2.5 py-1 text-[9px] font-black text-[#168464]">
              {property.furnishing}
            </span>
          )}
        </div>
             {" "}
        {specs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#EDF2F4] pt-3">
            {specs.slice(0, 4).map((text, i) => (
              <span
                key={`${text}-${i}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F7FAFB] px-2.5 py-1.5 text-[10px] font-bold text-[#58717D]"
              >
                {i === 0 ? (
                  <BedDouble size={13} className="text-[#20BE91]" />
                ) : i === 1 ? (
                  <Bath size={13} className="text-[#20BE91]" />
                ) : (
                  <Maximize2 size={12} className="text-[#20BE91]" />
                )}
                {text}
              </span>
            ))}
          </div>
        )}
             {" "}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="text-[10px] font-semibold text-[#8AA0AA]">
            {property.distanceKm != null
              ? `${property.distanceKm} km away`
              : property.city}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/property/${encodeURIComponent(property.propertyId || property._id)}/${slugify(property.title || "property")}`,
                { state: { property } },
              );
            }}
            className="rounded-xl bg-[#123B59] px-4 py-2.5 text-[10px] font-black text-white transition hover:bg-[#20BE91] hover:text-[#073A30]"
          >
            Contact / View Details
          </button>
        </div>
           {" "}
      </div>
       {" "}
    </article>
  );
}

export default function ExploreProperties() {
  const navigate = useNavigate();

  const routeLocation = useLocation();

  const seoPath = routeLocation.pathname;

  const [listingType, setListingType] = useState("Buy");

  const [buildingType, setBuildingType] = useState("Residential");

  const [filters, setFilters] = useState(blankFilters);

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [locationStatus, setLocationStatus] = useState("detecting");

  const [detectedLocation, setDetectedLocation] = useState({
    city: "",
    lat: null,
    lng: null,
  });

  const [selectedId, setSelectedId] = useState(null);

  const [mobileFilters, setMobileFilters] = useState(false);

  const [sort, setSort] = useState("relevance");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const resultsContentRef = useRef(null);
  const [resultsContentHeight, setResultsContentHeight] = useState(0);

  const seo = useMemo(() => parseSeoPath(seoPath), [seoPath]);

  useEffect(() => {
    const el = resultsContentRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const updateHeight = () => {
      setResultsContentHeight(Math.ceil(el.getBoundingClientRect().height));
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, [properties, loading, error, total, page, filters, sort]);

  useEffect(() => {
    if (!seo) return; // Convert old /buyproperty-in-* and /rentproperty-in-* URLs to the new canonical SEO structure.

    if (seo.legacy) {
      navigate(
        buildSeoPath({
          listingType: seo.listingType,

          city: seo.city,

          bedrooms: seo.bedrooms,

          buildingType: "Residential",
        }),
        { replace: true },
      );

      return;
    }

    const category = String(seo.category || "").toLowerCase();

    const isGenericPropertyHub = [
      "properties-for-rent",
      "properties-for-sale",
      "properties-for-sell",
      "all-properties-for-rent",
      "all-properties-for-sale",
    ].includes(category);
    const nextBuildingType = seo.allListings || isGenericPropertyHub
      ? "All"
      : category.includes("commercial")
        ? "Commercial"
        : "Residential";

    setBuildingType(nextBuildingType);

    setListingType(seo.listingType);

    setFilters((current) => ({
      ...current,

      // Route city must override the default city and any detected location.
      city: seo.city,
      search: seo.allListings ? "" : current.search,

      locality: seo.locality || "",

      bedrooms: seo.bedrooms ? [seo.bedrooms] : [],

      propertyType: isGenericPropertyHub || /flats-/.test(category) || category.includes("commercial")
        ? []
        : /villas-/.test(category)
          ? ["Villa"]
          : /houses-/.test(category)
            ? ["Independent House"]
            : /plots-/.test(category)
              ? ["Plot"]
              : [],
    }));
  }, [seo, navigate]);

  const propertyTypeOptions =
    buildingType === "All"
      ? [...new Set([...RESIDENTIAL_TYPES, ...COMMERCIAL_TYPES])]
      : buildingType === "Residential"
        ? RESIDENTIAL_TYPES
        : COMMERCIAL_TYPES;

  const isResidential = buildingType === "Residential";

  const isRent = listingType === "Rent";

  const update = (key, value) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const toggle = (key, value) =>
    setFilters((current) => {
      const currentValues = Array.isArray(current[key]) ? current[key] : [];

      return {
        ...current,
        [key]: currentValues.includes(value)
          ? currentValues.filter((x) => x !== value)
          : [...currentValues, value],
      };
    });

  const resetFilters = () => setFilters(blankFilters());

  const buildParams = ({ forPopular = false } = {}) => {
    const params = new URLSearchParams();
    const effectiveListingType = seo?.allListings ? listingType : seo?.listingType || listingType;
    const effectiveBuildingType = seo?.allListings ? buildingType : seo?.buildingType || buildingType;
    const effectiveBedrooms = filters.bedrooms?.length
      ? filters.bedrooms
      : seo?.bedrooms
        ? [seo.bedrooms]
        : [];
    const effectiveLocality = String(
      filters.locality || seo?.locality || "",
    ).trim();
    const effectivePropertyType = filters.propertyType?.length
      ? filters.propertyType
      : seo?.propertyType
        ? [seo.propertyType]
        : [];
    params.set("mode", forPopular ? "popular" : "search");
    params.set(
      "category",
      effectiveListingType === "All" ? "All" : effectiveListingType === "Buy" ? "Sell" : "Rent",
    );
    params.set("buildingType", effectiveBuildingType || "All");
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", "30");
    if (detectedLocation.lat != null && detectedLocation.lng != null) {
      params.set("lat", String(detectedLocation.lat));
      params.set("lng", String(detectedLocation.lng));
      if (detectedLocation.city)
        params.set("locationCity", detectedLocation.city);
    }
    const requestCity = String(
      // SEO route is authoritative: geolocation/default form values must not
      // replace /properties-in-indore with Jaipur (or any other city).
      seo?.city || filters.city || detectedLocation.city || "",
    ).trim();
    if (requestCity) params.set("city", requestCity);
    Object.entries(filters).forEach(([key, value]) => {
      if (["city", "locality", "bedrooms", "propertyType"].includes(key))
        return;
      if (Array.isArray(value) && value.length)
        params.set(key, value.join(","));
      else if (!Array.isArray(value) && value !== "" && value != null)
        params.set(key, String(value));
    });
    if (effectiveLocality) params.set("locality", effectiveLocality);
    if (effectiveBedrooms.length)
      params.set("bedrooms", effectiveBedrooms.join(","));
    if (effectivePropertyType.length)
      params.set("propertyType", effectivePropertyType.join(","));
    if (forPopular) {
      params.delete("city");
      params.delete("search");
      params.delete("page");
      params.set("limit", "16");
    }
    return params;
  };

  const fetchProperties = async ({
    forPopular = false,
    keepPage = false,
  } = {}) => {
    setLoading(true);

    setError("");

    try {
      const res = await axios.get(
        `/v1/properties/search?${buildParams({ forPopular })}`,
      );

      const data = res?.data || {};

      const rows = Array.isArray(data.properties)
        ? data.properties.map(normalizeProperty)
        : [];

      setProperties(rows);

      setTotal(Number(data.total || rows.length));

      if (!keepPage) setPage(1);

      setSelectedId(rows[0] ? String(rows[0]._id || rows[0].propertyId) : null);
    } catch (err) {
      console.error("Property search failed", err);

      setError(
        err?.response?.data?.message || "Unable to load properties right now.",
      );

      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    if (!navigator.geolocation) {
      setLocationStatus("denied");

      return undefined;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (cancelled) return;

        const { latitude, longitude } = position.coords;

        let city = "";

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
          );

          if (response.ok) {
            const data = await response.json();

            city =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.municipality ||
              data?.address?.state_district ||
              "";
          }
        } catch {
          /* coordinates are enough for map/ranking */
        }

        if (!cancelled) {
          setLocationStatus("granted");

          setDetectedLocation({ city, lat: latitude, lng: longitude });
        }
      },
      () => {
        if (!cancelled) setLocationStatus("denied");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (locationStatus === "detecting") return;

    fetchProperties({ forPopular: false, keepPage: true }); // Initial load and server-side sorting use the same search API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationStatus, sort]);

  const applyFilters = () => {
    setPage(1);

    const city = filters.city || detectedLocation.city;

    navigate(
      buildSeoPath({
        listingType,

        city,

        locality: filters.locality || "",

        bedrooms: filters.bedrooms[0] || "",

        buildingType,

        propertyType: filters.propertyType[0] || "",
        allBuildingTypes: buildingType === "All",
      }),
      { replace: false },
    );

    setMobileFilters(false);
  };

  useEffect(() => {
    if (!seo) return; // SEO URL is the source of truth for city/BHK. Filters are applied through the same API.

    if (seo) fetchProperties({ forPopular: false }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seoPath]);

  const onListingType = (value) => {
    setListingType(value);

    setPage(1);

    setProperties([]);

    setFilters((current) => ({
      ...blankFilters(),
      city: seo?.city || current.city || "",
      search: "",
    }));
  };

  const onBuildingType = (value) => {
    setBuildingType(value);

    setFilters((current) => ({
      ...current,
      propertyType: [],
      transactionModel: [],
      officeSpaceTypes: [],
      pantryTypes: [],
    }));
  };

  const filteredCountLabel =
    total === 1 ? "1 property" : `${total.toLocaleString("en-IN")} properties`;

  const updateQueryValue = (key, value) => update(key, value);

  const filterGroups = [
    {
      title: "Property Type",
      node: (
        <CheckList
          options={propertyTypeOptions}
          selected={filters.propertyType}
          onChange={(v) => toggle("propertyType", v)}
        />
      ),
    },

    ...(isResidential
      ? [
          {
            title: "Bedrooms / BHK",
            node: (
              <CheckList
                options={BHK_TYPES}
                selected={filters.bedrooms}
                onChange={(v) => toggle("bedrooms", v)}
              />
            ),
          },
        ]
      : []),

    {
      title: isRent ? "Rent" : "Price",
      node: (
        <RangeInputs
          min={isRent ? filters.minRent : filters.minPrice}
          max={isRent ? filters.maxRent : filters.maxPrice}
          onMin={(v) => updateQueryValue(isRent ? "minRent" : "minPrice", v)}
          onMax={(v) => updateQueryValue(isRent ? "maxRent" : "maxPrice", v)}
          prefix="₹"
        />
      ),
    },

    {
      title: "Area",
      node: (
        <>
          <RangeInputs
            min={filters.minArea}
            max={filters.maxArea}
            onMin={(v) => update("minArea", v)}
            onMax={(v) => update("maxArea", v)}
          />
          <select
            value={filters.sizeUnit}
            onChange={(e) => update("sizeUnit", e.target.value)}
            className="mt-2 h-9 w-full rounded-lg border border-[#DCE7EA] bg-[#FAFCFD] px-2 text-[10px] font-bold"
          >
            <option value="">Any area unit</option>
            <option>Sq. Ft.</option>
            <option>Sq. Meter</option>
            <option>Sq. Yard</option>
            <option>Acre</option>
            <option>Hectare</option>
          </select>
          <div className="mt-2">
            <CheckList
              options={AREA_TYPES}
              selected={filters.areaType}
              onChange={(v) => toggle("areaType", v)}
              maxVisible={5}
            />
          </div>
        </>
      ),
    },

    ...(isResidential && !isRent
      ? [
          {
            title: "Possession",
            node: (
              <CheckList
                options={POSSESSION}
                selected={filters.possessionStatus}
                onChange={(v) => toggle("possessionStatus", v)}
              />
            ),
          },
        ]
      : []),

    ...(isResidential && isRent
      ? [
          {
            title: "Availability",
            node: (
              <CheckList
                options={["Immediately", "Later"]}
                selected={filters.availability}
                onChange={(v) => toggle("availability", v)}
              />
            ),
          },
        ]
      : []),

    {
      title: "Furnishing",
      node: (
        <>
          <CheckList
            options={FURNISHING}
            selected={filters.furnishing}
            onChange={(v) => toggle("furnishing", v)}
          />
          <div className="mt-3">
            <p className="mb-2 text-[9px] font-black uppercase tracking-wide text-[#93A5AD]">
              Furnishing Items
            </p>
            <CheckList
              options={[
                "Water Purifier",
                "Fan",
                "Fridge",
                "Exhaust Fan",
                "Dining Table",
                "Geyser",
                "Stove",
                "Light",
                "Curtains",
                "Modular Kitchen",
                "TV",
                "Chimney",
                "AC",
                "Bed",
                "Wardrobe",
                "Sofa",
                "Washing Machine",
                "Microwave",
                "Home Automation",
                "Smart Card Access",
                "Solar Heater",
                "Split AC",
                "VRV AC",
              ]}
              selected={filters.furnishingItems}
              onChange={(v) => toggle("furnishingItems", v)}
              maxVisible={5}
            />
          </div>
        </>
      ),
    },

    ...(isResidential
      ? [
          {
            title: "Bathrooms",
            node: (
              <CheckList
                options={["1", "2", "3", "4", "5+"]}
                selected={filters.bathrooms}
                onChange={(v) => toggle("bathrooms", v)}
              />
            ),
          },
        ]
      : [
          {
            title: "Bathrooms",
            node: (
              <RangeInputs
                min={filters.bathroomsMin}
                max={filters.bathroomsMax}
                onMin={(v) => update("bathroomsMin", v)}
                onMax={(v) => update("bathroomsMax", v)}
              />
            ),
          },
        ]),

    ...(isResidential && !isRent
      ? [
          {
            title: "Property Age",
            node: (
              <CheckList
                options={AGES}
                selected={filters.ageOfProperty}
                onChange={(v) => toggle("ageOfProperty", v)}
              />
            ),
          },
          {
            title: "Transaction",
            node: (
              <CheckList
                options={["Resale", "New Booking"]}
                selected={filters.transactionModel}
                onChange={(v) => toggle("transactionModel", v)}
              />
            ),
          },
          {
            title: "Ownership",
            node: (
              <CheckList
                options={OWNERSHIP}
                selected={filters.ownershipType}
                onChange={(v) => toggle("ownershipType", v)}
              />
            ),
          },
        ]
      : []),

    ...(isResidential && isRent
      ? [
          {
            title: "Suited For",
            node: (
              <CheckList
                options={SUITED_FOR}
                selected={filters.suitedFor}
                onChange={(v) => toggle("suitedFor", v)}
              />
            ),
          },
        ]
      : []),

    ...(!isResidential && !isRent
      ? [
          {
            title: "Transaction / Ownership",
            node: (
              <>
                <CheckList
                  options={["Resale", "New Booking"]}
                  selected={filters.transactionModel}
                  onChange={(v) => toggle("transactionModel", v)}
                />
                <div className="mt-3">
                  <CheckList
                    options={OWNERSHIP}
                    selected={filters.ownershipType}
                    onChange={(v) => toggle("ownershipType", v)}
                  />
                </div>
              </>
            ),
          },
        ]
      : []),

    ...(!isResidential
      ? [
          {
            title: "Office Space Type",
            node: (
              <CheckList
                options={OFFICE_SPACE_TYPES}
                selected={filters.officeSpaceTypes}
                onChange={(v) => toggle("officeSpaceTypes", v)}
              />
            ),
          },
          {
            title: "Pantry",
            node: (
              <CheckList
                options={PANTRY_TYPES}
                selected={filters.pantryTypes}
                onChange={(v) => toggle("pantryTypes", v)}
              />
            ),
          },
          {
            title: "Personal Washroom",
            node: (
              <CheckList
                options={["Yes"]}
                selected={filters.personalWashroom === "true" ? ["Yes"] : []}
                onChange={() =>
                  update(
                    "personalWashroom",
                    filters.personalWashroom === "true" ? "" : "true",
                  )
                }
              />
            ),
          },
        ]
      : []),

    {
      title: "Water Source",
      node: (
        <CheckList
          options={WATER}
          selected={filters.waterSources}
          onChange={(v) => toggle("waterSources", v)}
        />
      ),
    },

    {
      title: "Facing",
      node: (
        <CheckList
          options={FACING}
          selected={filters.facings}
          onChange={(v) => toggle("facings", v)}
          maxVisible={6}
        />
      ),
    },

    {
      title: "View",
      node: (
        <CheckList
          options={VIEWS}
          selected={filters.views}
          onChange={(v) => toggle("views", v)}
          maxVisible={6}
        />
      ),
    },

    {
      title: "Flooring",
      node: (
        <CheckList
          options={FLOORING}
          selected={filters.flooring}
          onChange={(v) => toggle("flooring", v)}
          maxVisible={6}
        />
      ),
    },

    ...(isResidential
      ? [
          {
            title: "Additional Spaces",
            node: (
              <CheckList
                options={SPACES}
                selected={filters.additionalSpaces}
                onChange={(v) => toggle("additionalSpaces", v)}
                maxVisible={6}
              />
            ),
          },
        ]
      : []),

    ...(!isResidential
      ? [
          {
            title: "Location Advantages",
            node: (
              <CheckList
                options={LOCATION_ADVANTAGES}
                selected={filters.locationAdvantages}
                onChange={(v) => toggle("locationAdvantages", v)}
                maxVisible={6}
              />
            ),
          },
        ]
      : []),

    {
      title: "Amenities",
      node: (
        <CheckList
          options={AMENITIES}
          selected={filters.amenities}
          onChange={(v) => toggle("amenities", v)}
          maxVisible={7}
        />
      ),
    },

    {
      title: "Highlights",
      node: (
        <CheckList
          options={isResidential ? RES_HIGHLIGHTS : COM_HIGHLIGHTS}
          selected={filters.highlights}
          onChange={(v) => toggle("highlights", v)}
          maxVisible={7}
        />
      ),
    },

    ...(!isResidential && isRent
      ? [
          {
            title: "Security Deposit",
            node: (
              <>
                <CheckList
                  options={SECURITY_DEPOSITS}
                  selected={filters.securityDepositTypes}
                  onChange={(v) => toggle("securityDepositTypes", v)}
                />
                <div className="mt-3">
                  <RangeInputs
                    min={filters.securityDepositMin}
                    max={filters.securityDepositMax}
                    onMin={(v) => update("securityDepositMin", v)}
                    onMax={(v) => update("securityDepositMax", v)}
                    prefix="₹"
                  />
                </div>
              </>
            ),
          },
          {
            title: "Maintenance",
            node: (
              <RangeInputs
                min={filters.maintenanceMin}
                max={filters.maintenanceMax}
                onMin={(v) => update("maintenanceMin", v)}
                onMax={(v) => update("maintenanceMax", v)}
                prefix="₹"
              />
            ),
          },
          {
            title: "Company Lease",
            node: (
              <CheckList
                options={["Yes"]}
                selected={filters.companyLease === "true" ? ["Yes"] : []}
                onChange={() =>
                  update(
                    "companyLease",
                    filters.companyLease === "true" ? "" : "true",
                  )
                }
              />
            ),
          },
        ]
      : []),

    {
      title: "Negotiable",
      node: (
        <CheckList
          options={["Yes"]}
          selected={filters.negotiable === "true" ? ["Yes"] : []}
          onChange={() =>
            update("negotiable", filters.negotiable === "true" ? "" : "true")
          }
        />
      ),
    },

    {
      title: "Parking",
      node: (
        <>
          <RangeInputs
            min={filters.coveredParkingMin}
            max={filters.coveredParkingMax}
            onMin={(v) => update("coveredParkingMin", v)}
            onMax={(v) => update("coveredParkingMax", v)}
          />
          <div className="mt-2 text-[9px] font-bold uppercase tracking-wide text-[#93A5AD]">
            Covered parking
          </div>
          <RangeInputs
            min={filters.openParkingMin}
            max={filters.openParkingMax}
            onMin={(v) => update("openParkingMin", v)}
            onMax={(v) => update("openParkingMax", v)}
          />
          <div className="mt-2 text-[9px] font-bold uppercase tracking-wide text-[#93A5AD]">
            Open parking
          </div>
        </>
      ),
    },

    {
      title: "Power Backup / Lift",
      node: (
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.powerBackup}
            onChange={(e) => update("powerBackup", e.target.value)}
            className="h-9 rounded-lg border border-[#DCE7EA] px-2 text-[10px] font-bold"
          >
            <option value="">Power backup</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select
            value={filters.liftAvailable}
            onChange={(e) => update("liftAvailable", e.target.value)}
            className="h-9 rounded-lg border border-[#DCE7EA] px-2 text-[10px] font-bold"
          >
            <option value="">Lift</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      ),
    },
  ];

  const mapProperties = properties
    .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))
    .map((p) => ({ ...p, __amount: getAmount(p, listingType) }));

  return (
    <div className="min-h-screen bg-[#F4F7F8] text-[#102E46]">
         {" "}
      <div className="border-b border-[#DCE7EA] bg-[#274255] px-4 py-5 text-white sm:px-6 lg:px-8">
             {" "}
        <div className="mx-auto max-w-[1500px]">
                 {" "}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                     {" "}
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#33cc99]/30 bg-[#33cc99]/10 px-3 py-1 text-[9px] font-black uppercase tracking-[.18em] text-[#75e6c0]">
                <SlidersHorizontal size={12} /> Property Search
              </div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Find a property that fits your requirement
              </h1>
              <p className="mt-1 max-w-3xl text-xs leading-5 text-white/60">
                Search live DigiNiwas inventory with location, property, budget,
                residential and commercial filters.
              </p>
            </div>
                     {" "}
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/65">
              {locationStatus === "granted" ? (
                <>
                  <Navigation size={13} className="text-[#33cc99]" /> Using your
                  current location
                  {detectedLocation.city ? ` · ${detectedLocation.city}` : ""}
                </>
              ) : locationStatus === "denied" ? (
                "Location unavailable — showing complete inventory"
              ) : (
                "Detecting location…"
              )}
            </div>
                   {" "}
          </div>
               {" "}
        </div>
           {" "}
      </div>
         {" "}
      <div className="sticky top-0 z-[1100] border-b border-[#DCE7EA] bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-5 lg:px-8">
             {" "}
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2 lg:flex-row">
                 {" "}
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8AA0AA]"
            />
            <input
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder="Search city, locality, society, property ID, project or address"
              className="h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F8FBFC] pl-10 pr-3 text-xs font-semibold outline-none focus:border-[#20BE91] focus:ring-4 focus:ring-[#20BE91]/10"
            />
          </div>
                 {" "}
          <div className="flex h-11 overflow-hidden rounded-xl border border-[#DCE7EA] bg-[#F8FBFC]">
            <button
              type="button"
              onClick={() => onListingType("All")}
              className={`px-4 text-xs font-black ${listingType === "All" ? "bg-[#274255] text-white" : "text-[#59717D]"}`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => onListingType("Buy")}
              className={`px-7 text-xs font-black ${listingType === "Buy" ? "bg-[#274255] text-white" : "text-[#59717D]"}`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => onListingType("Rent")}
              className={`px-7 text-xs font-black ${listingType === "Rent" ? "bg-[#274255] text-white" : "text-[#59717D]"}`}
            >
              Rent
            </button>
          </div>
                 {" "}
          <select
            value={buildingType}
            onChange={(e) => onBuildingType(e.target.value)}
            className="h-11 rounded-xl border border-[#DCE7EA] bg-[#F8FBFC] px-4 text-xs font-black text-[#526E7C] outline-none"
          >
            <option>All</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
                 {" "}
          <input
            value={filters.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="City"
            className="h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F8FBFC] px-4 text-xs font-bold outline-none focus:border-[#20BE91] sm:w-40"
          />
                 {" "}
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE7EA] bg-white px-5 text-xs font-black text-[#274255] lg:hidden"
          >
            <Filter size={16} /> Filters
          </button>
                 {" "}
          <button
            type="button"
            onClick={applyFilters}
            className="h-11 rounded-xl bg-[#274255] px-7 text-xs font-black text-white transition hover:bg-[#20BE91] hover:text-[#073A30]"
          >
            Search
          </button>
               {" "}
        </div>
           {" "}
      </div>
         {" "}
      <div className="mx-auto flex max-w-[1500px] gap-4 px-3 py-4 sm:px-5 lg:px-8 lg:py-6">
             {" "}
        <aside
          id="property-filters"
          className={`${mobileFilters ? "fixed inset-0 z-[2000] block" : "hidden"} scroll-mt-36 lg:relative lg:z-auto lg:block lg:w-[285px] lg:shrink-0 lg:self-start`}
        >
          {mobileFilters && (
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFilters(false)}
            />
          )}
          <div
            className={`${mobileFilters ? "absolute bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl" : "rounded-2xl"} flex flex-col overflow-hidden border border-[#DCE7EA] bg-white shadow-[0_15px_50px_rgba(16,46,70,.12)]`}
            style={
              !mobileFilters && resultsContentHeight
                ? { height: `${Math.max(480, resultsContentHeight)}px` }
                : undefined
            }
          >
                     {" "}
            <div className="flex items-center justify-between border-b border-[#E7EEF1] px-4 py-4">
              <div>
                <p className="text-sm font-black text-[#173B50]">Filters</p>
                <p className="mt-0.5 text-[10px] font-semibold text-[#8AA0AA]">
                  {buildingType} · {listingType}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F7F8] text-[#6D818B] lg:hidden"
              >
                <X size={16} />
              </button>
            </div>
                     {" "}
            <div className="min-h-0 flex-1 overflow-y-auto px-4">
              <FilterSection title="Location" open>
                <div className="space-y-2">
                  <input
                    value={filters.state}
                    onChange={(e) => update("state", e.target.value)}
                    placeholder="State"
                    className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
                  />
                  <input
                    value={filters.locality}
                    onChange={(e) => update("locality", e.target.value)}
                    placeholder="Locality / Area"
                    className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
                  />
                  <input
                    value={filters.society}
                    onChange={(e) => update("society", e.target.value)}
                    placeholder="Society / Project"
                    className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
                  />
                  <input
                    value={filters.pinCode}
                    onChange={(e) => update("pinCode", e.target.value)}
                    placeholder="Pincode"
                    className="h-9 w-full rounded-lg border border-[#DCE7EA] px-3 text-[11px] font-semibold outline-none"
                  />
                </div>
              </FilterSection>
              {filterGroups.map((group, index) => (
                <FilterSection
                  key={`${group.title}-${index}`}
                  title={group.title}
                  open={index === 0}
                >
                  {group.node}
                </FilterSection>
              ))}
            </div>
                     {" "}
            <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-[#E7EEF1] p-4">
              <button
                type="button"
                onClick={resetFilters}
                className="h-10 rounded-xl border border-[#DCE7EA] text-[11px] font-black text-[#526E7C]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="h-10 rounded-xl bg-[#20BE91] text-[11px] font-black text-[#073A30]"
              >
                Apply Filters
              </button>
            </div>
            {" "}
          </div>
               {" "}
        </aside>
             {" "}
        <main className="min-w-0 flex-1">
                 {" "}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-black text-[#173B50]">
                {seo?.allListings
                  ? `Properties in ${seo.city}`
                  : seo?.category
                    ? `${seo.category.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())} in ${filters.locality ? `${filters.locality}, ` : ""}${filters.city}`
                    : filters.city
                      ? `${listingType} properties in ${filters.city}`
                      : `${listingType} properties`}
              </h1>
              <p className="mt-0.5 text-[11px] font-semibold text-[#8AA0AA]">
                {loading ? "Searching live inventory…" : filteredCountLabel} ·
                multiple filters can be combined
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("property-filters")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="hidden items-center gap-2 rounded-xl border border-[#DCE7EA] bg-white px-3 py-2 text-[10px] font-black lg:inline-flex"
              >
                <Filter size={14} /> All Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 rounded-xl border border-[#DCE7EA] bg-white px-3 text-[10px] font-black text-[#526E7C]"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
                 {" "}
          <div ref={resultsContentRef}>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="grid h-[235px] animate-pulse grid-cols-[210px_1fr] overflow-hidden rounded-2xl bg-white"
                  >
                    <div className="bg-[#E7EEF1]" />
                    <div className="p-5">
                      <div className="h-4 w-2/3 rounded bg-[#E7EEF1]" />
                      <div className="mt-3 h-8 w-1/2 rounded bg-[#E7EEF1]" />
                      <div className="mt-6 h-10 w-full rounded bg-[#F0F4F5]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-100 bg-white p-12 text-center">
                <p className="font-black text-[#173B50]">{error}</p>
                <button
                  type="button"
                  onClick={() => fetchProperties()}
                  className="mt-4 rounded-xl bg-[#274255] px-5 py-2.5 text-xs font-black text-white"
                >
                  Try again
                </button>
              </div>
            ) : properties.length === 0 ? (
              <div className="rounded-2xl border border-[#DCE7EA] bg-white p-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF8F5] text-[#20BE91]">
                  <Search size={24} />
                </div>
                <h3 className="mt-4 text-lg font-black">
                  No properties match these filters
                </h3>
                <p className="mt-2 text-xs text-[#80949E]">
                  Try removing a filter or search another city. Your location
                  fallback is active for the Popular Properties section.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-[#274255] px-5 py-2.5 text-xs font-black text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <PropertyListCard
                    key={property._id || property.propertyId}
                    property={property}
                    listingType={listingType}
                    selected={
                      String(selectedId) ===
                      String(property._id || property.propertyId)
                    }
                    onSelect={(p) =>
                      setSelectedId(String(p._id || p.propertyId))
                    }
                  />
                ))}
              </div>
            )}
                   {" "}
            {total > properties.length && (
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => p - 1);
                    setTimeout(() => fetchProperties({ keepPage: true }), 0);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE7EA] bg-white disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[10px] font-black text-[#647D88]">
                  Page {page}
                </span>
                <button
                  type="button"
                  disabled={page >= Math.ceil(total / 30)}
                  onClick={() => {
                    setPage((p) => p + 1);
                    setTimeout(() => fetchProperties({ keepPage: true }), 0);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE7EA] bg-white disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
                 {" "}
          </div>
        </main>
             {" "}
        <section className="hidden w-[36%] min-w-[330px] lg:block">
                 {" "}
          <div className="sticky top-[86px] h-[calc(100vh-110px)] overflow-hidden rounded-2xl border border-[#DCE7EA] bg-[#274255] shadow-[0_12px_40px_rgba(16,46,70,.14)]">
                     {" "}
            <div className="absolute left-4 top-4 z-[1000] rounded-xl border border-[#DCE7EA] bg-white/95 px-3 py-2 text-[#173B50] shadow-md backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#1CAA82]">
                Property Map
              </p>
              <p className="mt-0.5 text-[10px] text-[#718792]">
                {mapProperties.length} mapped listings
              </p>
            </div>
                     {" "}
            <MapContainer
              center={[22.9734, 78.6569]}
              zoom={5}
              zoomControl={false}
              scrollWheelZoom
              className="h-full w-full"
            >
                         {" "}
              <MapViewport properties={mapProperties} selectedId={selectedId} />
                         {" "}
              <TileLayer
                url={LIGHT_TILE_URL}
                attribution={LIGHT_TILE_ATTRIBUTION}
                noWrap
              />
                         {" "}
              {mapProperties.map((property) => (
                <PropertyMarker
                  key={property._id || property.propertyId}
                  property={property}
                  selected={
                    String(selectedId) ===
                    String(property._id || property.propertyId)
                  }
                  onSelect={(p) => setSelectedId(String(p._id || p.propertyId))}
                />
              ))}
                       {" "}
            </MapContainer>
                     {" "}
            {mapProperties.length === 0 && (
              <div className="absolute inset-0 z-[900] flex items-center justify-center bg-white/90 px-8 text-center">
                <div>
                  <MapPin className="mx-auto text-[#33cc99]" size={30} />
                  <p className="mt-3 text-sm font-black text-[#173B50]">
                    Map location unavailable
                  </p>
                  <p className="mt-1 text-[10px] text-[#80949E]">
                    Properties without coordinates are still shown in the list.
                  </p>
                </div>
              </div>
            )}
                   {" "}
          </div>
               {" "}
        </section>
           {" "}
      </div>
         {" "}
      {/* Popular Properties — always rendered at the bottom of Explore Properties */}
         {" "}
      <div className="mt-8">
             {" "}
        <PropertyDiscoverySection
          title="Popular Properties"
          subtitle="Explore popular live properties after your search results."
          variant="popular"
        />
           {" "}
      </div>
         {" "}
      <FAQSection
        title="Property Search FAQs"
        subtitle="Quick answers for buyers about property discovery, support and safety."
        groups={exploreFaqs}
      />
         {" "}
      <ExplorePropertyHubs
        city={detectedLocation.city || filters.city}
        locationStatus={locationStatus}
      />
       {" "}
    </div>
  );
}
