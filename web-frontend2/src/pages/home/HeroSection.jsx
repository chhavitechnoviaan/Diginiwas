import { useState, useEffect, useMemo,useRef } from "react";
import { FiSearch, FiArrowRight, FiMapPin } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import PropertyDiscoverySection from "./PropertyDiscoverySection";
import {
  MdVerified,
  MdLocationOn,
  MdHome,
  MdSearch,
  MdFavorite,
  MdPerson,
  MdSmartToy,
  MdGroups,
  MdApartment,
  MdCheckCircle,
} from "react-icons/md";
import {
  RiShieldCheckLine,
  RiMedalLine,
  RiBrainLine,
  RiBuilding2Line,
} from "react-icons/ri";
import { FaHouseCircleCheck, FaAngleDown } from "react-icons/fa6";
import {
  IoLocationOutline,
  IoSearch,
  IoLogoGooglePlaystore,
} from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";
import { LuFileSpreadsheet } from "react-icons/lu";
import { TbHomeSignal } from "react-icons/tb";
import { FaApple } from "react-icons/fa";

import niwas from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.34 AM.jpeg";
import dashboard from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.37 AM.jpeg";
import property from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.33 AM.jpeg";
import bg from "../../assets/images/bg.webp";
import bg2 from "../../assets/images/bg2.webp";
import bg3 from "../../assets/images/bg3.webp";
import { City, State } from "country-state-city";
import ComingSoonVideo from "../../components/common/ComingSoonVideo";

const bgImages = [bg, bg2, bg3];

export default function HeroSection() {
  const [heroData, setHeroData] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);
  const [fade, setFade] = useState(true);

  // 🔽 Location aur Property Type pass karne ke liye state object
  const [searchFilters, setSearchFilters] = useState({
    city: "",
    propertyType: "",
    transactionType: "",
    category: "",
    buildingType: "",
  });

  const discoverySectionRef = useRef(null);

  const handlePropertySearch = (filters) => {
    setSearchFilters(filters);

    // Search ke baad property cards section tak smooth scroll.
    setTimeout(() => {
      discoverySectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentBg((prev) => (prev + 1) % bgImages.length);
        setFade(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getHeroSection();
  }, []);

  const getHeroSection = async () => {
    try {
      const res = await axios.get("/cms/hero");
      setHeroData(res.data.hero);
    } catch (err) {
      console.log("Hero API Error:", err);
    }
  };

  return (
    <div className="sm:min-h-screen h-full font-sans bg-[#0d1b2a] text-white">
      <Hero
        currentBg={currentBg}
        fade={fade}
        heroData={heroData}
        onSearch={handlePropertySearch}
      />

      {/* Home discovery: map ki jagah location-aware boosted property cards */}
      <div
        ref={discoverySectionRef}
        id="property-discovery-section"
        className="scroll-mt-0"
      >
        <PropertyDiscoverySection searchFilters={searchFilters} />
      </div>
    </div>
  );
}

// function Hero({ currentBg, fade, heroData, onSearch }) {
//   return (
//     <section className="relative sm:min-h-screen overflow-hidden py-1 sm:py-0 px-1 bg-[#1c3345]">
//       <div
//         className="absolute top-0 left-0 h-full w-full lg:w-[65%] bg-cover bg-center transition-all duration-1000"
//         style={{
//           backgroundImage: `url(${bgImages[currentBg]})`,
//           opacity: 1,
//         }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c3345]/40 to-[#1c3345] lg:from-transparent lg:via-[#1c3345]/20 lg:to-[#1c3345] lg:to-[63%]" />

//       <div className="relative z-10">
//         <div className="flex flex-col sm:py-10">
//           <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14 pt-8 sm:pt-12 lg:pt-16 pb-6 gap-10 mt-10">
//             <LeftContent heroData={heroData} onSearch={onSearch} className="mt-1" />
//             <RightPhones heroData={heroData} />
//           </div>
//           <div className="flex flex-row justify-center px-4 sm:px-6 lg:px-10 xl:px-14">
//             <StatsBar heroData={heroData} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function Hero({ currentBg, fade, heroData, onSearch }) {
  return (
    <section className="relative sm:min-h-screen overflow-hidden py-1 sm:py-0 px-1 bg-[#1c3345]">
      {/* Background Image */}
      {/* <div
        className="absolute top-0 left-0 h-full w-full lg:w-[65%] bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${bgImages[currentBg]})`,
          opacity: 20,
        }}
      /> */}

      <div
        className="absolute top-0 left-0 h-full w-full lg:w-[65%] bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${bgImages[currentBg]})`,
          opacity: 0.55,
        }}
      />

      {/* Background Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c3345]/40 to-[#1c3345] lg:from-transparent lg:via-[#1c3345]/20 lg:to-[#1c3345] lg:to-[63%]" /> */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#1c3345]/20 to-[#1c3345]/90 lg:from-white/10 lg:via-[#1c3345]/20 lg:to-[#1c3345] lg:to-[63%]" />
      <div className="relative z-10">
        <div className="flex flex-col sm:py-10">
          <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14 pt-2 sm:pt-3 lg:pt-4 pb-6 gap-10 mt-5">
            {/* <div className=" -mt-38 sm:-mt-30 lg:-mt-36 self-stretch lg:self-auto">
              <LeftContent
                heroData={heroData}
                onSearch={onSearch}
                className="mt-0"
              />
            </div>

            <RightPhones heroData={heroData} /> */}

            {/* <div className="relative self-stretch lg:self-auto -translate-y-10 sm:-translate-y-16 lg:-translate-y-[100px]"> */}
              <LeftContent
                heroData={heroData}
                onSearch={onSearch}
                className="mt-0"
              />
              <RightPhones heroData={heroData} className="mt-20"/>
            {/* </div> */}

            
          </div>

          {/* Stats Bar */}
          <div className="flex flex-row justify-center px-2 sm:px-3 lg:px-5 xl:px-10">
            <StatsBar heroData={heroData} />
          </div>
        </div>
      </div>
    </section>
  );
}

const HERO_RESIDENTIAL_TYPES = [
  "Apartment",
  "Villa",
  "Plot",
  "Builder Floor",
  "Penthouse",
  "Independent House",
];

const HERO_COMMERCIAL_TYPES = [
  "Office Space",
  "Shop",
  "Land",
  "Office Space in IT/SEZ",
  "Showroom",
  "Warehouse",
  "Industrial Plot",
  "Co-working Space",
];

// function LeftContent({ heroData, onSearch }) {
//   const [transactionMode, setTransactionMode] = useState("Buy");
//   const [buildingType, setBuildingType] = useState("Residential");
//   const [location, setLocation] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [searchError, setSearchError] = useState("");

//   const propertyTypes =
//     buildingType === "Residential"
//       ? HERO_RESIDENTIAL_TYPES
//       : HERO_COMMERCIAL_TYPES;

//   useEffect(() => {
//     if (propertyType && !propertyTypes.includes(propertyType)) {
//       setPropertyType("");
//     }
//   }, [buildingType, propertyType, propertyTypes]);

//   const handleSearch = () => {
//     const cleanLocation = location.trim();
//     if (!cleanLocation && !propertyType) {
//       setSearchError("Please enter a location or choose a property type");
//       return;
//     }
//     setSearchError("");
//     onSearch?.({
//       city: cleanLocation,
//       propertyType,
//       // UI says Buy/Rent, API/category expects Sell/Rent.
//       category: transactionMode === "Rent" ? "Rent" : "Sell",
//       transactionType: transactionMode === "Rent" ? "Rent" : "Sell",
//       buildingType,
//     });
//   };

//   return (
//     <div className="flex-1 max-w-full lg:max-w-[100%] xl:max-w-[100%] text-center lg:text-left -mt-20">
//       <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-1 py-1.5 mb-4 sm:mb-6 ">
//         <MdLocationOn className="text-[#00d9a6] text-sm" />
//         <span className="text-white text-md sm:text-sm font-semibold">
//           APNA शहर …अपना PLATFORM
//         </span>
//       </div>

//       <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-black leading-tight mb-4 sm:mb-6">
//         <span className="text-[#33cc99]">
//           {heroData?.headingLine1 || "Ghar ki Talaash bhi,"}
//         </span>
//         <br />
//         <span className="text-white">
//           {heroData?.headingLine2 || "Vishwas bhi."}
//         </span>
//       </h1>

//       <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-4 max-w-md mx-auto lg:mx-0">
//         Buy ya Rent — DigiNiwas par verified properties ke saath apna next move
//         dhoondhiye.
//       </p>

//       <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 sm:mb-5">
//         <Link to="/explore-property">
//           <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-2 py-2.5 sm:px-3 sm:py-2 rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base">
//             Explore Properties <FiArrowRight />
//           </button>
//         </Link>
//         <Link to="/niwas-ai">
//           <button className="flex items-center gap-2 bg-[#33cc99] text-[#0d1b2a] font-semibold px-5 py-2.5 sm:px-3 sm:py-2 rounded-lg hover:bg-[#33cc99] transition-all text-sm sm:text-base">
//             Try Niwas AI <HiSparkles />
//           </button>
//         </Link>
//       </div>

//       <div className="w-full max-w-5xl mx-auto lg:mx-0 bg-[#274255] border border-white/20 rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
//         <div className="p-3 sm:p-4">
//           {/* Primary search controls: Buy/Rent + Residential/Commercial stay on one row */}
//           <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-white/15 bg-[#1f3546]">
//             {["Buy", "Rent"].map((mode) => (
//               <button
//                 key={mode}
//                 type="button"
//                 onClick={() => setTransactionMode(mode)}
//                 className={`min-w-0 py-3 text-sm sm:text-base font-black transition ${transactionMode === mode ? "bg-[#33cc99] text-[#0d1b2a]" : "text-white/80 hover:bg-white/10"}`}
//               >
//                 {mode}
//               </button>
//             ))}
//             <select
//               value={buildingType}
//               onChange={(e) => setBuildingType(e.target.value)}
//               className="min-w-0 border-l border-white/15 bg-[#1f3546] px-2 sm:px-3 text-xs sm:text-sm font-black text-white outline-none transition focus:border-[#33cc99]"
//               aria-label="Property category"
//             >
//               <option value="Residential">Residential</option>
//               <option value="Commercial">Commercial</option>
//             </select>
//           </div>

//           {/* Secondary search controls */}
//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(180px,1fr)_132px] sm:items-end">
//             <div className="relative min-w-0">
//               <IoLocationOutline className="absolute left-0 top-1 text-[#33cc99] text-2xl" />
//               <div className="pl-10">
//                 <p className="text-white text-left font-medium">
//                   Enter Location
//                 </p>
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => {
//                     setLocation(e.target.value);
//                     if (searchError) setSearchError("");
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       handleSearch();
//                     }
//                   }}
//                   placeholder="e.g., Jaipur, Delhi, Mumbai"
//                   className="mt-1 w-full min-w-0 bg-transparent text-white/80 placeholder:text-white/40 outline-none"
//                 />
//               </div>
//             </div>

//             <div className="min-w-0 border-l border-white/20 pl-3 sm:pl-4">
//               <label className="mb-2 block text-left text-[10px] font-black uppercase tracking-[0.14em] text-white/50">
//                 Property Type
//               </label>
//               <select
//                 value={propertyType}
//                 onChange={(e) => setPropertyType(e.target.value)}
//                 className="h-11 w-full min-w-0 rounded-xl border border-white/15 bg-[#1f3546] px-3 text-sm font-black text-white outline-none transition focus:border-[#33cc99]"
//               >
//                 <option value="">All Property Types</option>
//                 {propertyTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               type="button"
//               onClick={handleSearch}
//               className="h-11 w-full min-w-0 rounded-xl bg-[#33cc99] px-4 flex items-center justify-center gap-2 text-[#0d1b2a] font-black whitespace-nowrap transition-all hover:bg-[#2fc18f]"
//             >
//               <IoSearch className="text-lg shrink-0" /> Search
//             </button>
//           </div>

//           {searchError && (
//             <p className="text-red-300 text-xs mt-3 text-left">{searchError}</p>
//           )}
//         </div>
//       </div>

     
//     </div>
//   );
// }

function LeftContent({ heroData, onSearch }) {
  const [transactionMode, setTransactionMode] = useState("Buy");
  const [buildingType, setBuildingType] = useState("Residential");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [searchError, setSearchError] = useState("");
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [activeCityIndex, setActiveCityIndex] = useState(-1);

  const propertyTypes =
    buildingType === "Residential"
      ? HERO_RESIDENTIAL_TYPES
      : HERO_COMMERCIAL_TYPES;

  // Get cities of India from the installed package.
  const indianCities = useMemo(() => {
    const cities = City.getCitiesOfCountry("IN") || [];

    return cities
      .map((city) => {
        const state = State.getStateByCodeAndCountry(
          city.stateCode,
          "IN"
        );

        return {
          name: city.name,
          stateCode: city.stateCode,
          stateName: state?.name || city.stateCode || "India",
        };
      })
      .filter((city) => city.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Suggestions update while typing.
  const citySuggestions = useMemo(() => {
    const query = location.trim().toLowerCase();

    if (!query) return [];

    const uniqueCities = new Map();

    indianCities.forEach((city) => {
      const matches =
        city.name.toLowerCase().startsWith(query) ||
        city.stateName.toLowerCase().startsWith(query);

      if (!matches) return;

      const key = `${city.name.toLowerCase()}-${city.stateCode}`;

      if (!uniqueCities.has(key)) {
        uniqueCities.set(key, city);
      }
    });

    return Array.from(uniqueCities.values());
  }, [location, indianCities]);

  useEffect(() => {
    if (propertyType && !propertyTypes.includes(propertyType)) {
      setPropertyType("");
    }
  }, [buildingType, propertyType]);

  // Select a suggested city.
  const selectCity = (city) => {
    setLocation(city.name);
    setShowCitySuggestions(false);
    setActiveCityIndex(-1);
    setSearchError("");
  };

  const handleSearch = () => {
    const cleanLocation = location.trim();

    if (!cleanLocation && !propertyType) {
      setSearchError(
        "Please enter a location or choose a property type"
      );
      return;
    }

    setSearchError("");
    setShowCitySuggestions(false);

    onSearch?.({
      city: cleanLocation,
      propertyType,
      category: transactionMode === "Rent" ? "Rent" : "Sell",
      transactionType: transactionMode === "Rent" ? "Rent" : "Sell",
      buildingType,
    });
  };

  const handleLocationKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowCitySuggestions(false);
      setActiveCityIndex(-1);
      return;
    }

    if (e.key === "ArrowDown" && citySuggestions.length > 0) {
      e.preventDefault();
      setShowCitySuggestions(true);
      setActiveCityIndex((previous) =>
        previous >= citySuggestions.length - 1 ? 0 : previous + 1
      );
      return;
    }

    if (e.key === "ArrowUp" && citySuggestions.length > 0) {
      e.preventDefault();
      setActiveCityIndex((previous) =>
        previous <= 0 ? citySuggestions.length - 1 : previous - 1
      );
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (
        showCitySuggestions &&
        activeCityIndex >= 0 &&
        citySuggestions[activeCityIndex]
      ) {
        selectCity(citySuggestions[activeCityIndex]);
      } else if (
        showCitySuggestions &&
        citySuggestions.length > 0
      ) {
        selectCity(citySuggestions[0]);
      } else {
        handleSearch();
      }
    }
  };

  return (
    // <div className="relative z-30 w-full min-w-0 text-center lg:text-left lg:-mt-20">
<div className="flex-1 max-w-full lg:max-w-[100%] xl:max-w-[100%] text-center lg:text-left -mt-20">
      {/* Location Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm sm:mb-6">
        <MdLocationOn className="text-sm text-[#00d9a6]" />
        <span className="text-sm font-semibold text-white">
          APNA शहर …अपना PLATFORM
        </span>
      </div>

      {/* Hero Heading */}
      <h1 className="mb-4 text-3xl font-black leading-tight sm:mb-6 md:text-4xl xl:text-5xl">
        <span className="text-[#33cc99]">
          {heroData?.headingLine1 || "Ghar ki Talaash bhi,"}
        </span>
        <br />
        <span className="text-white">
          {heroData?.headingLine2 || "Vishwas bhi."}
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base lg:mx-0">
        Buy ya Rent — DigiNiwas par verified properties ke saath
        apna next move dhoondhiye.
      </p>

      {/* Hero Buttons */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3 sm:mb-5 sm:gap-4 lg:justify-start">
        <Link to="/explore-property">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 sm:text-base"
          >
            Explore Properties <FiArrowRight />
          </button>
        </Link>

        <Link to="/niwas-ai">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#33cc99] px-4 py-2.5 text-sm font-semibold text-[#0d1b2a] transition hover:bg-[#2fc18f] sm:text-base"
          >
            Try Niwas AI <HiSparkles />
          </button>
        </Link>
      </div>

      {/* Property Search Card */}
      <div className="relative z-40 mx-auto w-full max-w-5xl overflow-visible rounded-2xl border border-white/20 bg-[#274255] shadow-[0_18px_50px_rgba(0,0,0,0.22)] lg:mx-0">
        <div className="p-3 sm:p-4">

          {/* Buy / Rent / Building Type */}
          <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-white/15 bg-[#1f3546]">
            {["Buy", "Rent"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTransactionMode(mode)}
                className={`min-w-0 py-3 text-sm font-black transition sm:text-base ${
                  transactionMode === mode
                    ? "bg-[#33cc99] text-[#0d1b2a]"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {mode}
              </button>
            ))}

            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              aria-label="Property category"
              className="min-w-0 border-l border-white/15 bg-[#1f3546] px-2 text-xs font-black text-white outline-none focus:border-[#33cc99] sm:px-3 sm:text-sm"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Location / Property Type / Search */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(180px,1fr)_132px] sm:items-end">

            {/* Location Autocomplete */}
            <div className="relative min-w-0 text-left">
              <IoLocationOutline className="absolute left-0 top-1 text-2xl text-[#33cc99]" />

              <div className="pl-10">
                <label
                  htmlFor="hero-location-input"
                  className="block font-medium text-white"
                >
                  Enter Location
                </label>

                <input
                  id="hero-location-input"
                  type="text"
                  value={location}
                  autoComplete="off"
                  placeholder="e.g., Indore, Bhilwara, Jaipur"
                  aria-autocomplete="list"
                  aria-expanded={
                    showCitySuggestions && location.trim().length > 0
                  }
                  onFocus={() => {
                    if (location.trim()) {
                      setShowCitySuggestions(true);
                    }
                  }}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setShowCitySuggestions(true);
                    setActiveCityIndex(-1);

                    if (searchError) setSearchError("");
                  }}
                  onKeyDown={handleLocationKeyDown}
                  onBlur={() => {
                    // Delay closing so a suggestion can be clicked.
                    setTimeout(() => {
                      setShowCitySuggestions(false);
                      setActiveCityIndex(-1);
                    }, 150);
                  }}
                  className="mt-1 w-full min-w-0 bg-transparent text-white outline-none placeholder:text-white/40"
                />
              </div>

              {/* Suggestions Dropdown */}
              {showCitySuggestions && location.trim() && (
                <div
                  role="listbox"
                  className="absolute left-0 top-full z-[100] mt-3 max-h-64 w-full min-w-[250px] overflow-y-auto rounded-xl border border-gray-200 bg-white py-2 text-gray-800 shadow-2xl"
                >
                  {citySuggestions.length > 0 ? (
                    citySuggestions.map((city, index) => (
                      <button
                        key={`${city.name}-${city.stateCode}-${index}`}
                        type="button"
                        role="option"
                        aria-selected={activeCityIndex === index}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectCity(city)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                          activeCityIndex === index
                            ? "bg-emerald-50"
                            : "hover:bg-emerald-50"
                        }`}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <FiMapPin size={18} />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">
                            {city.name}
                          </span>
                          <span className="block text-xs text-gray-500">
                            {city.stateName}, India
                          </span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-4 text-sm text-gray-500">
                      No matching cities found.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Property Type */}
            <div className="min-w-0 border-l border-white/20 pl-3 text-left sm:pl-4">
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-white/50">
                Property Type
              </label>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="h-11 w-full min-w-0 rounded-xl border border-white/15 bg-[#1f3546] px-3 text-sm font-black text-white outline-none focus:border-[#33cc99]"
              >
                <option value="">All Property Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="flex h-11 w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#33cc99] px-4 font-black text-[#0d1b2a] transition hover:bg-[#2fc18f]"
            >
              <IoSearch className="shrink-0 text-lg" />
              Search
            </button>
          </div>

          {searchError && (
            <p className="mt-3 text-left text-xs text-red-300">
              {searchError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function RightPhones({ heroData }) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const PhoneWrapper = ({
    imgSrc,
    altText,
    rotationClass,
    zIndexClass,
    bottomClass,
    widthClass,
  }) => (
    <div
      className={`absolute ${bottomClass} ${zIndexClass} ${widthClass} ${rotationClass} transition-all duration-500 ease-out hover:scale-110 hover:rotate-0 `}
    >
      <div className="relative w-full aspect-[9/19.5] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] ring-[6px] sm:ring-[8px] md:ring-[10px] ring-black bg-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-zinc-800 ">
        <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 w-[30%] h-[12px] sm:h-[18px] bg-black rounded-full z-50 flex items-center justify-between px-2">
          <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full border border-zinc-800 opacity-60" />
          <div className="w-2.5 h-0.5 bg-zinc-900 rounded-full opacity-60" />
        </div>

        {/* <div className="absolute top-2 w-full px-4 flex justify-between text-[7px] sm:text-[11px] font-medium text-black/80 z-40 select-none">
            <span>9:41</span>
            <span>📶 🔋</span>
          </div> */}

        <div className="w-full h-full pt-0 sm:pt-1 bg-white overflow-hidden">
          <img
            src={imgSrc}
            alt={altText}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[35%] h-[3px] bg-black rounded-full z-50" />
      </div>
    </div>
  );

  return (
    <div className="flex-1 hidden md:flex flex-col items-center lg:items-end w-full lg:max-w-[55%] mt-8 lg:mt-0">
      <div className="relative flex items-end justify-center w-full max-w-5xl mx-auto h-full sm:h-[340px] md:h-[420px] lg:h-[500px] mt-10">
        <PhoneWrapper
          imgSrc={heroData?.heroImage1?.url || niwas}
          altText="Niwas AI"
          rotationClass="-rotate-6 [transform:perspective(700px)_rotateY(-20deg)] hover:[transform:perspective(700px)_rotateY(0deg)]"
          zIndexClass="z-20"
          bottomClass="bottom-10 left-[5%] sm:left-[8%] md:left-[20%] lg:left-[12%]"
          widthClass="w-32 sm:w-40 md:w-52 lg:w-56 xl:w-64"
        />

        <PhoneWrapper
          imgSrc={heroData?.heroImage2?.url || property}
          altText="Property Details"
          rotationClass="rotate-[3deg] [transform:perspective(1200px)_rotateY(25deg)] hover:[transform:perspective(1200px)_rotateY(0deg)]"
          zIndexClass="z-10"
          bottomClass="bottom-10 left-[42%] -translate-x-1/2"
          widthClass="w-36 sm:w-44 md:w-48 lg:w-52 xl:w-60"
        />

        <PhoneWrapper
          imgSrc={heroData?.heroImage3?.url || dashboard}
          altText="Dashboard"
          rotationClass="rotate-[10deg] [transform:perspective(700px)_rotateY(25deg)] hover:[transform:perspective(1200px)_rotateY(0deg)]"
          zIndexClass="z-0"
          bottomClass="bottom-20 right-[5%] sm:right-[8%] md:right-[22%] lg:right-[6%]"
          widthClass="w-32 sm:w-40 md:w-44 lg:w-48 xl:w-54"
        />
      </div>

      {/* <div className="mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="download-playstore-btn"
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.whatsapp",
                "_blank",
              )
            }
            className="group w-54 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-2 transition-all duration-300 hover:bg-white/20 hover:border-[#33cc99] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#33cc99] flex items-center justify-center shadow-lg">
                <IoLogoGooglePlaystore className="text-3xl text-[#274255]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/70 uppercase tracking-wider">
                  Get it on
                </p>
                <h3 className="text-lg font-bold text-white group-hover:text-[#33cc99] transition-colors">
                  Google Play
                </h3>
              </div>
            </div>
          </button>

          <button
            id="download-appstore-btn"
            onClick={() =>
              window.open("https://apps.apple.com/app/id310633997", "_blank")
            }
            className="group w-54 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-2 transition-all duration-300 hover:bg-white/20 hover:border-[#33cc99] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <FaApple className="text-3xl text-black" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/70 uppercase tracking-wider">
                  Download on the
                </p>
                <h3 className="text-lg font-bold text-white group-hover:text-[#33cc99] transition-colors">
                  App Store
                </h3>
              </div>
            </div>
          </button>
        </div>

        <div
          className="flex justify-center mt-6 cursor-pointer"
          onClick={() => setShowComingSoon(true)}
        >
          <div className="group flex items-center gap-4 px-5 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:border-[#33cc99] transition-all duration-300">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-[#33cc99] flex items-center justify-center">
                <IoLogoGooglePlaystore className="text-[#274255] text-xl" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#274255]">
                <FaApple className="text-black text-xl" />
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Mobile App Coming Soon
              </p>
              <p className="text-white/60 text-xs">Android & iOS</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#33cc99] animate-pulse"></span>
          </div>
        </div>
      </div> */}
 <div className="mt-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button
            id="download-playstore-btn"
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.whatsapp",
                "_blank",
              )
            }
            className="group w-54 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-2 transition-all duration-300 hover:bg-white/20 hover:border-[#33cc99] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#33cc99] flex items-center justify-center shadow-lg">
                <IoLogoGooglePlaystore className="text-2xl text-[#274255]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/70 uppercase tracking-wider">
                  Get it on
                </p>
                <h3 className="text-lg font-bold text-white group-hover:text-[#33cc99] transition-colors">
                  Google Play
                </h3>
              </div>
            </div>
          </button>

          <button
            id="download-appstore-btn"
            onClick={() =>
              window.open("https://apps.apple.com/app/id310633997", "_blank")
            }
            className="group w-54 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-2 transition-all duration-300 hover:bg-white/20 hover:border-[#33cc99] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <FaApple className="text-3xl text-black" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/70 uppercase tracking-wider">
                  Download on the
                </p>
                <h3 className="text-lg font-bold text-white group-hover:text-[#33cc99] transition-colors">
                  App Store
                </h3>
              </div>
            </div>
          </button>
        </div>

        <div
          className="flex justify-center mt-2 cursor-pointer"
          onClick={() => setShowComingSoon(true)}
        >
          <div className="group flex items-center gap-4 px-5 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:border-[#33cc99] transition-all duration-300">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-[#33cc99] flex items-center justify-center">
                <IoLogoGooglePlaystore className="text-[#274255] text-xl" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#274255]">
                <FaApple className="text-black text-xl" />
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Mobile App Coming Soon
              </p>
              <p className="text-white/60 text-xs">Android & iOS</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#33cc99] animate-pulse"></span>
          </div>
        </div>
      </div>
      {showComingSoon && (
        <ComingSoonVideo
          setShowComingSoon={setShowComingSoon}
          video={import.meta.env.VITE_NIWAS_AI}
        />
      )}
    </div>
  );
}

function StatsBar({ heroData }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const targetAgents = parseInt(heroData?.verifiedAgents) || 150;
  const targetProperties = parseInt(heroData?.propertiesListed) || 500;
  const targetCustomers = parseInt(heroData?.happyCustomers) || 1000;
  const targetLocalities = parseInt(heroData?.localitiesCovered) || 25;

  const [startCounter, setStartCounter] = useState(false);
  const [stats, setStats] = useState({
    agents: 0,
    properties: 0,
    customers: 0,
    localities: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounter(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCounter) return;
    const interval = setInterval(() => {
      setStats((prev) => ({
        agents:
          prev.agents < targetAgents
            ? Math.min(prev.agents + 3, targetAgents)
            : targetAgents,
        properties:
          prev.properties < targetProperties
            ? Math.min(prev.properties + 10, targetProperties)
            : targetProperties,
        customers:
          prev.customers < targetCustomers
            ? Math.min(prev.customers + 20, targetCustomers)
            : targetCustomers,
        localities:
          prev.localities < targetLocalities
            ? Math.min(prev.localities + 1, targetLocalities)
            : targetLocalities,
      }));
    }, 20);
    return () => clearInterval(interval);
  }, [
    startCounter,
    targetAgents,
    targetProperties,
    targetCustomers,
    targetLocalities,
  ]);

  return (
    <div
      ref={sectionRef}
      className="mb-0 sm:mb-8 py-4 flex flex-col lg:flex-row w-full items-center gap-4 lg:items-stretch md:justify-between"
    >
      
      <div className="bg-white/80 w-full sm:w-[60%] lg:w-[50%] rounded-3xl px-2 py-3 lg:py-0 gap-5 items-center grid grid-cols-2 sm:grid-cols-4">
        {[
          {
            icon: <MdPerson className="text-[#0d1b2a] text-xl sm:text-2xl" />,
            num: heroData?.verifiedAgents || `${stats.agents}+`,
            label: "Verified Agents",
          },
          {
            icon: <MdHome className="text-[#0d1b2a] text-xl sm:text-2xl" />,
            num: heroData?.propertiesListed || `${stats.properties}+`,
            label: "Properties Listed",
          },
          {
            icon: <MdGroups className="text-[#0d1b2a] text-xl sm:text-2xl" />,
            num: heroData?.happyCustomers || `${stats.customers}+`,
            label: "Happy Customers",
          },
          {
            icon: (
              <MdLocationOn className="text-[#0d1b2a] text-xl sm:text-2xl" />
            ),
            num: heroData?.localitiesCovered || `${stats.localities}+`,
            label: "Localities Covered",
          },
        ].map(({ icon, num, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 space-x-3"
          >
            <div>{icon}</div>
            <div className="flex flex-col items-center">
              <p className="text-[#0d1b2a] font-black text-sm sm:text-lg lg:text-xl leading-tight">
                {num}
              </p>
              <p className="text-gray-500 text-center text-xs font-medium leading-tight">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full sm:max-w-sm lg:max-w-md">
        {[
          {
            icon: <MdSmartToy className="text-[#00d9a6] text-xl" />,
            title: "AI Powered",
            sub: "Search",
            path: "/niwas-ai",
          },
          {
            icon: <MdGroups className="text-[#00d9a6] text-xl" />,
            title: "100%",
            sub: "Verified Partner",
            path: "/explore-property",
          },
          {
            icon: <MdApartment className="text-[#00d9a6] text-xl" />,
            title: "Easy property Listing",
            sub: "",
            path: "/agent-corner",
          },
          {
            icon: <MdCheckCircle className="text-[#00d9a6] text-xl" />,
            title: "100%",
            sub: "Genuine Leads",
            path: "/agent-corner",
          },
        ].map(({ icon, title, sub, path }) => (
          <div
            key={title + sub}
            onClick={() => navigate(path)}
            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            {icon}
            <div>
              <div className="text-[#0d1b2a] font-medium text-xs sm:text-sm">
                {title}
              </div>
              <div className="text-[#0d1b2a] font-medium text-xs">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
