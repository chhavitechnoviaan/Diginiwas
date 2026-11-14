




import React, { useEffect, useMemo, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  FileText,
  Home,
  IndianRupee,
  Landmark,
  MapPin,
  Maximize2,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  UserRound,
  Search,
  Calculator,
  ClipboardList,
  TrendingUp,
  BadgePercent,
  ArrowUpRight,
  MessageCircle,
  Bookmark,
  Heart,
  Share2,
  Plus,
  Minus,
  X,
  Star,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { createPropertyLogoIcon } from "../components/common/propertyMapMarker";
import BuyerAuthModal from "../components/common/BuyerAuthModal";
import AppDownloadModal from "../components/common/AppDownloadModal";
import propertyFallback from "../assets/images/property.png";
import houseFallback from "../assets/images/house.webp";
import house1Fallback from "../assets/images/house1.jpeg";

const NIWAS_AI_API_BASE_URL = "https://diginiwas-niwas-ai-api.onrender.com";
import PropertyDiscoverySection from "./home/PropertyDiscoverySection";

const toArray = (value) => (Array.isArray(value) ? value : []);

const slugifyPropertyTitle = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "property";

const getPropertyPath = (item) => {
  const id = item?.propertyId || item?._id || "";
  const slug = slugifyPropertyTitle(item?.title || "property");
  return `/property/${encodeURIComponent(id)}/${slug}`;
};

const normalizeProperty = (p = {}) => {
  const location = p.location || {};
  const rent = p.rent || {};
  const price = p.price || {};
  const specs = p.specifications || {};
  const area = Array.isArray(p.areaDetails)
    ? p.areaDetails.find((item) => item?.display !== false) || p.areaDetails[0]
    : null;

  const imageItems = [
    ...toArray(p.images),
    ...toArray(p.media?.images),
    ...toArray(p.gallery),
  ]
    .map((item) => (typeof item === "string" ? { url: item } : item))
    .filter((item) => item?.url);

  const coverImage = imageItems.find((item) => item?.isCover);
  const orderedImageItems = coverImage
    ? [coverImage, ...imageItems.filter((item) => item !== coverImage)]
    : imageItems;

  const images = orderedImageItems
    .map((item) => item?.url)
    .filter(Boolean);

  const amenities = [
    ...toArray(p.amenities),
    ...toArray(p.features),
  ].filter(Boolean);

  const highlights = [
    ...toArray(p.propertyHighlights),
    ...toArray(p.highlights),
    ...toArray(p.propertyTags),
  ].filter(Boolean);

  return {
    ...p,
    title: p.title || p.propertyTitle || "Property Details",
    propertyId: p.propertyId || p._id || "",
    city: p.city ?? location.city ?? "",
    state: p.state ?? location.state ?? "",
    country: p.country ?? location.country ?? "India",
    locality: p.locality ?? location.locality ?? "",
    address: p.address ?? location.address ?? "",
    latitude: Number(p.latitude ?? location.latitude),
    longitude: Number(p.longitude ?? location.longitude),
    buildingType: p.buildingType || p.propertyCategory || "Residential",
    propertyType: p.propertyType || "Property",
    listingType: p.listingType || p.category || "Buy",
    transactionType: p.transactionType || "",
    priceAmount: Number(
      p.priceAmount ?? (typeof price === "number" ? price : price?.amount) ?? 0
    ),
    rentAmount: Number(p.rentAmount ?? rent.amount ?? 0),
    priceUnit: p.priceUnit ?? price.unit ?? "Total Price",
    rentFrequency: p.rentFrequency ?? rent.frequency ?? "Per Month",
    bhk: p.bhk ?? p.bedrooms ?? "",
    bathrooms: Number(p.bathrooms ?? specs.bathrooms ?? 0),
    coveredParking: Number(p.coveredParking ?? specs.coveredParking ?? 0),
    openParking: Number(p.openParking ?? specs.openParking ?? 0),
    furnishingStatus: p.furnishingStatus ?? p.furnishing?.status ?? "",
    areaValue: Number(p.areaValue ?? area?.value ?? 0),
    areaUnit: p.areaUnit ?? area?.unit ?? "Sq. Ft.",
    view: p.view ?? specs.view ?? "",
    facing: p.facing ?? specs.facing ?? "",
    liftAvailable: p.liftAvailable ?? specs.liftAvailable ?? null,
    powerBackup: p.powerBackup ?? specs.powerBackup ?? null,
    floorNumber: p.floorNumber ?? p.floor ?? specs.floorNumber ?? "",
    totalFloors: p.totalFloors ?? specs.totalFloors ?? "",
    securityDeposit: Number(p.securityDeposit ?? rent.securityDeposit ?? 0),
    connectingRoadWidth:
      p.connectingRoadWidth ?? specs.connectingRoadWidth ?? "",
    furnishing:
      p.furnishing || p.furnishingStatus || p.furnishing?.status || "",
    possession: p.possession || p.availability?.availableFrom || "",
    reraNumber: p.reraNumber || p.rera || p.reraCertificateNumber || "",
    verified: p.verified ?? p.isVerified ?? true,
    postedOn: p.createdAt || p.postedOn || "",
    description:
      p.description ||
      p.propertyDescription ||
      p.overview ||
      "This property is listed on DigiNiwas with verified property information and location details.",
    amenities,
    highlights,
    images,
  };
};

const formatIndianCurrency = (amount) => {
  const num = Number(amount);
  if (!Number.isFinite(num) || num <= 0) return "Price on request";

  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 2)} Cr`;
  }

  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 2)} Lakh`;
  }

  return `₹${num.toLocaleString("en-IN")}`;
};

const getPropertyPrice = (property) => {
  const isRent = String(property.listingType).toLowerCase().includes("rent");

  return {
    amount: isRent ? property.rentAmount : property.priceAmount,
    suffix: isRent ? property.rentFrequency : property.priceUnit,
    isRent,
  };
};

const displayValue = (value, fallback = "—") => {
  if (value === 0) return "0";
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function SectionTitle({ eyebrow, title, icon: Icon }) {
  return (
    <div className="flex items-center gap-3">
      {Icon ? (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#1DBE90]">
          <Icon size={20} />
        </div>
      ) : null}
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1CAA82]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-0.5 text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

function DetailBox({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-[#E0EAEC] bg-[#FBFDFD] p-3.5">
      {Icon ? <Icon size={17} className="text-[#20BE91]" /> : null}
      <p className="mt-2 text-[9px] font-black uppercase tracking-[0.08em] text-[#8A9AA1]">
        {label}
      </p>
      <p className="mt-1 text-sm font-extrabold text-[#274255]">
        {displayValue(value)}
      </p>
    </div>
  );
}


function HubChip({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-lg border border-[#E6EDF0] bg-[#F4F7F9] px-3 py-1.5 text-[10px] font-bold leading-none text-[#274255] transition hover:border-[#BDE5D9] hover:bg-[#EAF8F4] hover:text-[#0D8C6A] sm:text-[11px]"
    >
      {label}
    </button>
  );
}

const PROPERTY_HUB_CITY_DATA = {
  ambala: ["Ambala Cantt", "Ambala City", "Sector 7", "Model Town", "Baldev Nagar"],
  jaipur: ["Vaishali Nagar", "Mansarovar", "Malviya Nagar", "Jagatpura", "C-Scheme"],
  bengaluru: ["Whitefield", "Electronic City", "Sarjapur Road", "Hebbal", "HSR Layout"],
  bangalore: ["Whitefield", "Electronic City", "Sarjapur Road", "Hebbal", "HSR Layout"],
  pune: ["Wakad", "Baner", "Hinjewadi", "Kharadi", "Viman Nagar"],
  indore: ["Vijay Nagar", "Rau", "Nipania", "Scheme 140", "Palasia"],
  bhopal: ["MP Nagar", "Kolar Road", "Arera Colony", "Hoshangabad Road", "Bawadia Kalan"],
  ahmedabad: ["Shela", "Shilaj", "SG Highway", "Bopal", "Prahlad Nagar"],
};


function ExplorePropertyHubs({ city, locality }) {
  const navigate = useNavigate();
  const safeCity = city || "Ambala";
  const citySlug = slugifyPropertyTitle(safeCity);
  const localities = PROPERTY_HUB_CITY_DATA[citySlug] || [];
  const nearby = locality && !localities.some((item) => item.toLowerCase() === String(locality).toLowerCase())
    ? [locality, ...localities]
    : localities;
  const cityLabel = String(safeCity).replace(/\b\w/g, (m) => m.toUpperCase());
  const path = (category, local = "") => local
    ? `/${citySlug}/${slugifyPropertyTitle(local)}/${category}`
    : `/${citySlug}/${category}`;

  const groups = [
    {
      title: "Explore More Properties",
      items: [
        [`2 BHK Flats in ${cityLabel}`, path("2-bhk-flats")],
        [`Flats for Sale in ${cityLabel}`, path("flats-for-sale")],
        [`Flats for Rent in ${cityLabel}`, path("flats-for-rent")],
        [`Commercial Property for Rent in ${cityLabel}`, path("commercial-property-for-rent")],
        [`Commercial Property for Sale in ${cityLabel}`, path("commercial-property-for-sale")],
        [`Property Prices in ${cityLabel}`, path("property-prices")],
      ],
    },
    {
      title: `Explore ${cityLabel} & Nearby Localities`,
      items: (nearby.length ? nearby : [cityLabel]).map((item) => [item, path("flats-for-sale", item)]),
    },
    {
      title: "Find Properties by Requirement",
      items: [
        ["2 BHK Properties", path("2-bhk-flats")],
        ["3 BHK Properties", path("3-bhk-flats")],
        ["Properties for Sale", path("flats-for-sale")],
        ["Properties for Rent", path("flats-for-rent")],
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">Explore Properties &amp; Locality Hubs</h2>
      <div className="mt-6 space-y-5">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#667E88]">{group.title}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {group.items.map(([label, href]) => (
                <HubChip key={label} label={label} onClick={() => navigate(href)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimilarPropertiesSection({ property, navigate }) {
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentId = String(property?.propertyId || property?._id || "");
  const city = property?.city || property?.location?.city || "";
  const locality = property?.locality || property?.location?.locality || "";
  const currentType = String(property?.propertyType || "").toLowerCase();
  const currentBuildingType = String(property?.buildingType || "").toLowerCase();

  const isRent = String(
    property?.transactionType || property?.listingType || ""
  ).toLowerCase().includes("rent");

  const currentTransaction = isRent ? "rent" : "sale";
  const currentBhk = Number.parseFloat(String(property?.bhk || "").match(/\d+(\.\d+)?/)?.[0] || 0);
  const currentPrice = Number(
    isRent ? property?.rentAmount : property?.priceAmount
  ) || 0;
  const currentArea = Number(property?.areaValue) || 0;

  const getText = (value) => String(value || "").trim().toLowerCase();

  const getCandidatePrice = (item) =>
    Number(isRent ? item?.rentAmount : item?.priceAmount) || 0;

  const isLiveProperty = (item) => {
    const status = getText(item?.status || item?.listingStatus || item?.approvalStatus);
    if (["deleted", "rejected", "expired", "inactive", "draft", "unpublished"].includes(status)) {
      return false;
    }

    if (item?.isPublished === false || item?.published === false || item?.isActive === false) {
      return false;
    }

    return true;
  };

  const isBoostedProperty = (item) =>
    Boolean(
      item?.promotions?.boost?.isActive ||
      item?.promotions?.featured?.isActive ||
      item?.promotions?.localityTop?.isActive ||
      item?.boost?.isBoosted ||
      item?.isBoosted ||
      item?.featured
    );

  const similarityScore = (item) => {
    const itemCity = getText(item?.city || item?.location?.city);
    const itemLocality = getText(item?.locality || item?.location?.locality);
    const itemType = getText(item?.propertyType);
    const itemBuilding = getText(item?.buildingType || item?.propertyCategory);
    const itemTransaction = getText(item?.transactionType || item?.listingType || item?.category);
    const itemBhk = Number.parseFloat(String(item?.bhk || "").match(/\d+(\.\d+)?/)?.[0] || 0);
    const itemPrice = getCandidatePrice(item);
    const itemArea = Number(item?.areaValue) || 0;

    let score = 0;

    // Strong matching dimensions.
    if (city && itemCity === getText(city)) score += 35;
    if (locality && itemLocality === getText(locality)) score += 22;
    if (currentType && itemType === currentType) score += 15;
    if (currentBuildingType && itemBuilding === currentBuildingType) score += 10;
    if (itemTransaction.includes(currentTransaction)) score += 8;

    // Bedroom similarity.
    if (currentBhk > 0 && itemBhk > 0) {
      if (itemBhk === currentBhk) score += 8;
      else if (Math.abs(itemBhk - currentBhk) === 1) score += 4;
    }

    // Keep price reasonably close without making it a hard filter.
    if (currentPrice > 0 && itemPrice > 0) {
      const ratio = Math.abs(itemPrice - currentPrice) / currentPrice;
      if (ratio <= 0.10) score += 8;
      else if (ratio <= 0.20) score += 5;
      else if (ratio <= 0.35) score += 2;
    }

    // Keep area reasonably close.
    if (currentArea > 0 && itemArea > 0) {
      const ratio = Math.abs(itemArea - currentArea) / currentArea;
      if (ratio <= 0.15) score += 5;
      else if (ratio <= 0.30) score += 3;
    }

    // Promoted properties can be surfaced first only after similarity is considered.
    if (isBoostedProperty(item)) score += 2;

    return score;
  };

  useEffect(() => {
    let cancelled = false;

    const fetchSimilarProperties = async () => {
      if (!property) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get("/properties");
        const rawList =
          (Array.isArray(response?.data?.properties) && response.data.properties) ||
          (Array.isArray(response?.data?.data) && response.data.data) ||
          (Array.isArray(response?.data) && response.data) ||
          [];

        const normalized = rawList
          .map(normalizeProperty)
          .filter(isLiveProperty)
          .filter((item) => {
            const id = String(item?.propertyId || item?._id || "");
            return !currentId || id !== currentId;
          });

        const strictMatches = normalized
          .filter((item) => {
            const itemCity = getText(item?.city || item?.location?.city);
            const itemTransaction = getText(
              item?.transactionType || item?.listingType || item?.category
            );

            const cityMatch = !city || itemCity === getText(city);
            const transactionMatch =
              !currentTransaction ||
              itemTransaction.includes(currentTransaction);

            return cityMatch && transactionMatch;
          })
          .map((item) => ({ item, score: similarityScore(item) }))
          .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;

            const aBoost = isBoostedProperty(a.item) ? 1 : 0;
            const bBoost = isBoostedProperty(b.item) ? 1 : 0;
            if (bBoost !== aBoost) return bBoost - aBoost;

            const aDate = new Date(a.item?.createdAt || a.item?.postedOn || 0).getTime();
            const bDate = new Date(b.item?.createdAt || b.item?.postedOn || 0).getTime();
            return bDate - aDate;
          });

        // If the strict city/transaction pool is too small, fill the carousel
        // with the closest available properties instead of leaving an empty block.
        const fallbackMatches =
          strictMatches.length >= 6
            ? strictMatches
            : normalized
                .map((item) => ({ item, score: similarityScore(item) }))
                .sort((a, b) => b.score - a.score);

        const seen = new Set();
        const selected = [];

        for (const entry of [...strictMatches, ...fallbackMatches]) {
          const id = String(entry.item?.propertyId || entry.item?._id || "");
          if (!id || seen.has(id)) continue;
          seen.add(id);
          selected.push(entry.item);
          if (selected.length >= 8) break;
        }

        if (!cancelled) {
          setItems(selected);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Failed to load similar properties:", error);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSimilarProperties();

    return () => {
      cancelled = true;
    };
  }, [property, currentId, city, locality, currentType, currentBuildingType, currentTransaction]);

  // Auto carousel only when there is more than one property.
  useEffect(() => {
    if (items.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const activeProperty = items[activeIndex];

  const renderPrice = (item) => {
    const rent = String(item?.listingType || item?.transactionType || "").toLowerCase().includes("rent");
    const amount = rent ? item?.rentAmount : item?.priceAmount;
    return amount > 0 ? formatIndianCurrency(amount) : "Price on request";
  };

  const renderLocation = (item) =>
    [item?.locality, item?.city, item?.state].filter(Boolean).join(", ") || "Location available";

  const renderArea = (item) =>
    item?.areaValue > 0
      ? `${item.areaValue.toLocaleString("en-IN")} ${item.areaUnit || "Sq. Ft."}`
      : "Area —";

  const renderBhk = (item) =>
    item?.bhk ? `${item.bhk} BHK` : item?.propertyType || "Property";

  const goToProperty = (item) => {
    navigate(
      getPropertyPath(item)
    );
  };

  if (loading) {
    return (
      <section className="rounded-[26px] border border-[#DCE8EA] bg-white p-5 shadow-[0_16px_45px_rgba(16,46,70,0.07)] sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF8F4] text-[#0B8B74]">
            <Home size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1CAA82]">
              You may also like
            </p>
            <h2 className="text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
              Similar Properties Near You
            </h2>
          </div>
        </div>

        <div className="mt-6 h-64 animate-pulse rounded-[22px] bg-[#F1F6F7]" />
      </section>
    );
  }

  if (!activeProperty) {
    return (
      <section className="rounded-[26px] border border-[#DCE8EA] bg-white p-5 shadow-[0_16px_45px_rgba(16,46,70,0.07)] sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF8F4] text-[#0B8B74]">
            <Home size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1CAA82]">
              You may also like
            </p>
            <h2 className="text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
              Similar Properties Near You
            </h2>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-[#D8E5E8] bg-[#F8FBFC] p-8 text-center">
          <p className="text-sm font-black text-[#274255]">No similar property found</p>
          <p className="mt-1 text-xs text-[#7A8F98]">
            We will show comparable live listings here when matching inventory is available.
          </p>
        </div>
      </section>
    );
  }

  const activeRent = String(
    activeProperty?.listingType || activeProperty?.transactionType || ""
  ).toLowerCase().includes("rent");

  return (
    <section className="overflow-hidden rounded-[26px] border border-[#DCE8EA] bg-white shadow-[0_16px_45px_rgba(16,46,70,0.07)]">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-[#EDF2F3] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1CAA82]">
            You may also like
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
            Similar Properties Near You
          </h2>
          {/* <p className="mt-1 text-xs leading-5 text-[#71858F]">
            {city
              ? `Comparable ${isRent ? "rental" : "sale"} listings around ${locality || city}.`
              : "Properties selected using location, type, budget and configuration similarity."}
          </p> */}
        </div>

        <div className="flex items-center gap-2">
          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9E6E9] bg-white text-[#274255] shadow-sm transition hover:border-[#33CC99] hover:text-[#0B8B74]"
                aria-label="Previous similar property"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % items.length)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9E6E9] bg-white text-[#274255] shadow-sm transition hover:border-[#33CC99] hover:text-[#0B8B74]"
                aria-label="Next similar property"
              >
                <ChevronRight size={18} />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* FEATURED CAROUSEL CARD */}
      <div className="p-4 sm:p-6">
        <div
          key={`${activeProperty?.propertyId || activeProperty?._id}-${activeIndex}`}
          className="group overflow-hidden rounded-[22px] border border-[#DDE8EA] bg-[#F7FAFA] transition duration-500"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            {/* IMAGE */}
            <button
              type="button"
              onClick={() => goToProperty(activeProperty)}
              className="relative block h-[250px] overflow-hidden bg-[#E8EFF1] text-left sm:h-[310px] lg:h-[350px]"
            >
              <img
                src={activeProperty?.images?.[0] || "/no-image.png"}
                alt={activeProperty?.title || "Similar property"}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                onError={(event) => {
                  event.currentTarget.src = "/no-image.png";
                }}
              />

              <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#0F2E46]/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-white backdrop-blur">
                  {activeRent ? "For Rent" : "For Sale"}
                </span>

                {isBoostedProperty(activeProperty) ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#33CC99] px-3 py-1.5 text-[9px] font-black text-[#073D31] shadow-lg">
                    <Sparkles size={11} />
                    Featured
                  </span>
                ) : null}
              </div>

              <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur">
                <p className="text-[9px] font-bold text-[#71858F]">
                  {activeProperty?.propertyType || "Property"}
                </p>
                <p className="mt-0.5 text-lg font-black text-[#102E46]">
                  {renderPrice(activeProperty)}
                </p>
              </div>
            </button>

            {/* CONTENT */}
            <div className="flex flex-col justify-between p-5 sm:p-7">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1CAA82]">
                      Similar to this listing
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-xl font-black leading-tight text-[#102E46] sm:text-2xl">
                      {activeProperty?.title || "Similar Property"}
                    </h3>
                  </div>

                  <div className="hidden shrink-0 rounded-xl bg-[#EAF8F4] px-3 py-2 text-right sm:block">
                    <p className="text-[9px] font-bold text-[#6E8887]">Match</p>
                    <p className="text-sm font-black text-[#0B8B74]">
                      {Math.min(99, Math.max(70, similarityScore(activeProperty) + 20))}%
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-[#657C87]">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[#20BE91]" />
                  <span>{renderLocation(activeProperty)}</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  <DetailBox
                    label="Configuration"
                    value={renderBhk(activeProperty)}
                    icon={BedDouble}
                  />
                  <DetailBox
                    label="Area"
                    value={renderArea(activeProperty)}
                    icon={Ruler}
                  />
                  <DetailBox
                    label="Type"
                    value={activeProperty?.propertyType || "—"}
                    icon={Building2}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#8A9AA1]">
                    Why shown
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#526D78]">
                    {locality && getText(activeProperty?.locality) === getText(locality)
                      ? `Same locality${currentBhk ? " • similar configuration" : ""}`
                      : city
                        ? `Same city • similar property profile`
                        : "Similar property profile"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => goToProperty(activeProperty)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0F2E46] px-5 text-xs font-black text-white shadow-lg transition hover:bg-[#163B59]"
                >
                  View Property
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PAGINATION / AUTOPLAY INDICATOR */}
        {items.length > 1 ? (
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {items.map((item, index) => (
                <button
                  key={String(item?.propertyId || item?._id || index)}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show similar property ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-7 bg-[#0B8B74]"
                      : "w-2 bg-[#C9DADD] hover:bg-[#8FB4AE]"
                  }`}
                />
              ))}
            </div>

          
          </div>
        ) : (
          <p className="mt-4 text-[9px] font-bold text-[#91A1A7]">
            1 similar property available
          </p>
        )}
      </div>
    </section>
  );
}

function NiwasAISnapshot({ property }) {
  const [snapshot, setSnapshot] = useState(null);
  const [snapshotLoading, setSnapshotLoading] = useState(true);
  const [snapshotError, setSnapshotError] = useState("");
  const [showCalculation, setShowCalculation] = useState(false);

  const snapshotPropertyId = String(
    property?.propertyId || property?._id || ""
  );

  useEffect(() => {
    let cancelled = false;

    const fetchSnapshot = async () => {
      if (!snapshotPropertyId) {
        setSnapshot(null);
        setSnapshotError("Property ID is not available for the Niwas AI snapshot.");
        setSnapshotLoading(false);
        return;
      }

      setSnapshotLoading(true);
      setSnapshotError("");

      try {
        const response = await fetch(
          `${NIWAS_AI_API_BASE_URL}/v1/properties/${encodeURIComponent(snapshotPropertyId)}/snapshot`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "X-API-Version": "v1",
            },
          }
        );

        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(data?.detail || `Snapshot request failed (${response.status}).`);
        }

        if (!cancelled) setSnapshot(data);
      } catch (error) {
        if (!cancelled) {
          setSnapshot(null);
          setSnapshotError(error?.message || "Unable to load the Niwas AI snapshot.");
        }
      } finally {
        if (!cancelled) setSnapshotLoading(false);
      }
    };

    fetchSnapshot();
    return () => {
      cancelled = true;
    };
  }, [snapshotPropertyId]);

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderAvailability = (section, fallback = "Not available yet") => {
    if (!section) return fallback;
    if (section.available === false) return section.headline || fallback;
    return section.headline || fallback;
  };

  if (snapshotLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 animate-pulse items-center justify-center rounded-xl bg-[#DCEFE9]" />
          <div className="flex-1">
            <div className="h-5 w-64 max-w-full animate-pulse rounded bg-[#DCEDE9]" />
            <div className="mt-2 h-3 w-80 max-w-full animate-pulse rounded bg-[#EAF3F1]" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-24 animate-pulse rounded-xl border border-[#DDEDE8] bg-white" />
          ))}
        </div>
      </div>
    );
  }

  if (snapshotError || !snapshot) {
    return (
      <div className="p-4 sm:p-6 lg:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F8F74] text-white shadow-sm">
            <Sparkles size={17} />
          </div>
          <div>
            <h2 className="text-base font-black text-[#0B6F62] sm:text-lg">Niwas AI Property Snapshot</h2>
            <p className="mt-0.5 text-[10px] text-[#6A817F] sm:text-xs">Snapshot data is not available right now.</p>
          </div>
        </div>
        <p className="mt-4 rounded-xl border border-[#DDEDE8] bg-white px-3 py-3 text-[10px] leading-4 text-[#7B918E]">
          {snapshotError || "No snapshot data was returned for this listing."}
        </p>
      </div>
    );
  }

  const price = snapshot.price_comparison || {};
  const rental = snapshot.rental_yield || {};
  const trend = snapshot.locality_trend || {};
  const confidence = snapshot.data_confidence || {};
  const cards = [
    {
      icon: BadgePercent,
      title: "Price Comparison",
      value: renderAvailability(price, "Not enough data"),
      sub: price.caption || "Comparable property data",
      source: price.source === "web" ? price.source_name : "",
      sourceUrl: price.source === "web" ? price.source_url : "",
    },
    {
      icon: TrendingUp,
      title: "Estimated Rental Yield",
      value: renderAvailability(rental, "Not available yet"),
      sub: rental.rent_scope || "Rental estimate",
      source: rental.source === "web" ? rental.source_name : "",
      sourceUrl: rental.source === "web" ? rental.source_url : "",
    },
    {
      icon: TrendingUp,
      title: "Locality Trend",
      value: renderAvailability(trend, "Not available yet"),
      sub: trend.caption || "Locality price trend",
      source: trend.source === "web" ? trend.source_name : "",
      sourceUrl: trend.source === "web" ? trend.source_url : "",
    },
    {
      icon: ClipboardList,
      title: "Data Confidence",
      value: confidence.headline || confidence.level || "Not available yet",
      sub: confidence.caption || "Confidence across available figures",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-7">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F8F74] text-white shadow-sm">
          <Sparkles size={17} />
        </div>
        <div>
          <h2 className="text-base font-black text-[#0B6F62] sm:text-lg">Niwas AI Property Snapshot</h2>
          <p className="mt-0.5 text-[10px] text-[#6A817F] sm:text-xs">Understand value, rental potential and locality performance</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cards.map(({ icon: Icon, title, value, sub, source, sourceUrl }) => (
          <div key={title} className="rounded-xl border border-[#DDEDE8] bg-white p-3.5 sm:p-4">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#68827D]">
              <Icon size={11} className="text-[#0F9B7F]" />
              {title}
            </div>
            <p className="mt-1.5 text-lg font-black tracking-tight text-[#087F70]">{value}</p>
            <p className="mt-0.5 text-[9px] font-medium text-[#7C928E]">{sub}</p>
            {source && sourceUrl ? (
              <a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[8px] font-black text-[#0B8A70] underline underline-offset-2">
                Source: {source}
              </a>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 text-[9px] font-bold text-[#708682] sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setShowCalculation((value) => !value)}
          className="inline-flex w-fit items-center gap-1.5 text-left hover:text-[#0F8F74]"
        >
          <Sparkles size={11} className="text-[#0F9B7F]" />
          {showCalculation ? "Hide Calculation ↑" : "See How This Was Calculated →"}
        </button>
        <span>Updated: {formatDate(snapshot.updated_on)}</span>
      </div>

      {showCalculation ? (
        <div className="mt-3 space-y-2 rounded-xl border border-[#DDEDE8] bg-white p-3">
          {Array.isArray(snapshot.calculation) && snapshot.calculation.length ? (
            snapshot.calculation.map((item, index) => (
              <div key={`${item?.title || "calculation"}-${index}`} className="border-b border-[#EDF3F1] pb-2 last:border-b-0 last:pb-0">
                <p className="text-[9px] font-black text-[#456861]">{item?.title || "Calculation"}</p>
                <p className="mt-0.5 text-[9px] leading-4 text-[#7B918E]">{item?.detail || "—"}</p>
              </div>
            ))
          ) : (
            <p className="text-[9px] text-[#7B918E]">Calculation details are not available.</p>
          )}
        </div>
      ) : null}

      <div className="mt-3 rounded-xl border border-[#DDEDE8] bg-white px-3 py-2.5 text-[9px] leading-4 text-[#7B918E]">
        <span className="font-black text-[#92A6A2]">ⓘ</span> {snapshot.disclaimer || "Estimates are based on available listings and locality data. Actual rent and property value may vary."}
      </div>
    </div>
  );
}

function PropertyActionBar({ onEnquire, onVisit, saved, onToggleSaved, onShare }) {
  return (
    <section className="mt-4 overflow-hidden rounded-[18px] border border-[#DDE7EA] bg-white shadow-[0_10px_30px_rgba(16,46,70,0.06)]">
      <div className="flex flex-wrap items-center gap-2 p-3 sm:p-3.5">
        <button
          type="button"
          onClick={onEnquire}
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B8B74] px-5 py-2.5 text-[10px] font-black text-white transition hover:bg-[#087864] sm:text-[11px]"
        >
          Enquire Now
        </button>

        <button
          type="button"
          onClick={onVisit}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#C9DDE1] bg-white px-5 py-2.5 text-[10px] font-black text-[#274255] transition hover:border-[#9CCEC1] hover:bg-[#F3FBF8] sm:text-[11px]"
        >
          Get Property Details
        </button>

        <button
          type="button"
          onClick={onVisit}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#C9DDE1] bg-white px-5 py-2.5 text-[10px] font-black text-[#274255] transition hover:border-[#9CCEC1] hover:bg-[#F3FBF8] sm:text-[11px]"
        >
          Schedule a Visit
        </button>

        <button
          type="button"
          onClick={onToggleSaved}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved properties" : "Save property"}
          className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-[10px] font-black transition sm:text-[11px] ${
            saved
              ? "border-[#A5DCCC] bg-[#EAF8F4] text-[#0D8E6D]"
              : "border-[#C9DDE1] bg-white text-[#536B77] hover:border-[#9CCEC1] hover:bg-[#F3FBF8]"
          }`}
        >
          <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save Property"}
        </button>

        <button
          type="button"
          onClick={onShare}
          aria-label="Share property"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9DDE1] bg-white text-[#536B77] transition hover:border-[#9CCEC1] hover:bg-[#F3FBF8]"
        >
          <Share2 size={15} />
        </button>
      </div>
    </section>
  );
}

function HomeLoanAssistance({ property, onRequest }) {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    loanAmount: "",
    employment: "Salaried",
    monthlyIncome: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!localStorage.getItem("buyerToken")) {
      onRequest?.();
      return;
    }

    const mobile = form.mobile.replace(/\D/g, "");
    if (mobile.length !== 10) {
      Swal.fire({ icon: "warning", title: "Invalid mobile number", text: "Please enter a valid 10-digit mobile number." });
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post("/loan-enquiries", {
        ...form,
        mobile,
        propertyTitle: property?.title || "",
        propertyId: property?.propertyId || property?._id || "",
        propertyLocation: [property?.locality, property?.city, property?.state]
          .filter(Boolean)
          .join(", "),
        propertyUrl: window.location.href,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("buyerToken")}`,
        },
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Unable to submit enquiry.");
      }

      Swal.fire({ icon: "success", title: "Enquiry submitted", text: "Our financial specialist will contact you shortly." });
      setForm({
        fullName: "",
        mobile: "",
        loanAmount: "",
        employment: "Salaried",
        monthlyIncome: "",
      });
    } catch (error) {
      console.error("Loan enquiry submission failed:", error);
      Swal.fire({
        icon: "error",
        title: "Unable to submit enquiry",
        text: error?.response?.data?.message || error?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-[18px] border border-[#DCE7EA] bg-white p-4 shadow-[0_8px_24px_rgba(16,46,70,0.05)]">
      <div className="flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF8F4] text-[#0C9272]">
          <Calculator size={15} />
        </div>

        <div>
          <h3 className="text-sm font-black text-[#102E46]">
            Need Home Loan Assistance?
          </h3>
          <p className="mt-0.5 text-[9px] leading-4 text-[#788E96]">
            Request assistance from our financial specialists.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-2.5">
        <label className="block">
          <span className="mb-1 block text-[9px] font-bold text-[#526B76]">
            Full Name *
          </span>
          <input
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Your name"
            className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-white px-3 text-[10px] text-[#274255] outline-none transition placeholder:text-[#A1AFB5] focus:border-[#68CDAF]"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[9px] font-bold text-[#526B76]">
            Mobile Number *
          </span>
          <input
            required
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            placeholder="10-digit number"
            className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-white px-3 text-[10px] text-[#274255] outline-none transition placeholder:text-[#A1AFB5] focus:border-[#68CDAF]"
          />
        </label>

        <div className="grid grid-cols-2 gap-2.5">
          <label className="block">
            <span className="mb-1 block text-[9px] font-bold text-[#526B76]">
              Loan Amount
            </span>
            <input
              value={form.loanAmount}
              onChange={(e) => update("loanAmount", e.target.value)}
              placeholder="₹50L / ₹1Cr"
              className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-white px-3 text-[10px] text-[#274255] outline-none transition placeholder:text-[#A1AFB5] focus:border-[#68CDAF]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[9px] font-bold text-[#526B76]">
              Employment
            </span>
            <select
              value={form.employment}
              onChange={(e) => update("employment", e.target.value)}
              className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-white px-2.5 text-[10px] text-[#274255] outline-none focus:border-[#68CDAF]"
            >
              <option>Salaried</option>
              <option>Self Employed</option>
              <option>Business</option>
              <option>Professional</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-[9px] font-bold text-[#526B76]">
            Monthly Income
          </span>
          <input
            value={form.monthlyIncome}
            onChange={(e) => update("monthlyIncome", e.target.value)}
            placeholder="e.g. ₹80,000"
            className="h-9 w-full rounded-lg border border-[#DCE7EA] bg-white px-3 text-[10px] text-[#274255] outline-none transition placeholder:text-[#A1AFB5] focus:border-[#68CDAF]"
          />
        </label>

        <button
          type="submit"
          className="mt-1 flex h-10 w-full items-center justify-center rounded-lg bg-[#0F1830] px-4 text-[9px] font-black text-white transition hover:bg-[#172342]"
        >
          {submitting ? "Sending Enquiry..." : "Request Loan Assistance"}
        </button>

        <p className="text-center text-[8px] leading-3.5 text-[#94A2A9]">
          A DigiNiwas partner will contact you regarding your enquiry.
        </p>
      </form>
    </section>
  );
}

function FAQSection({ property }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the price of this property?",
      answer:
        property.priceAmount > 0
          ? `${formatIndianCurrency(property.priceAmount)}${
              property.priceUnit && property.priceUnit !== "Total Price"
                ? ` • ${property.priceUnit}`
                : ""
            }`
          : "The price is available on request.",
    },
    {
      question: "How large is the property?",
      answer:
        property.areaValue > 0
          ? `${property.areaValue.toLocaleString("en-IN")} ${property.areaUnit}`
          : "Area information is not available for this property.",
    },
    {
      question: "How many bedrooms does the property have?",
      answer: property.bhk
        ? `${property.bhk}`
        : "Bedroom information is not available.",
    },
    {
      question: "Is the property ready to move?",
      answer: property.possession
        ? `Availability: ${formatDate(property.possession) || property.possession}.`
        : "Please enquire with a DigiNiwas partner for the latest possession status.",
    },
    {
      question: "What is the estimated rental yield?",
      answer:
        "Niwas AI's current snapshot shows an estimated annual rental yield of 4.8%–5.4%. Actual returns can vary.",
    },
    {
      question: "What is the locality trend shown by DigiNiwas?",
      answer:
        "Niwas AI's current snapshot shows a +7.1% yearly locality trend based on its recent comparison window.",
    },
    {
      question: "What is the data confidence?",
      answer:
        "The current Niwas AI snapshot marks data confidence as Medium based on comparable listing data.",
    },
  ];

  return (
    <section className="rounded-[24px] border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-7">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1CAA82]">
          FAQs
        </p>
        <h2 className="mt-1 text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#E2EAEC]">
        {faqs.map((faq, index) => {
          const open = openIndex === index;

          return (
            <div
              key={faq.question}
              className="border-b border-[#E8EEF0] last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#FBFDFD] sm:px-5"
              >
                <span className="text-[10px] font-black leading-5 text-[#274255] sm:text-xs">
                  {faq.question}
                </span>

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#7D919A]">
                  {open ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>

              {open ? (
                <div className="px-4 pb-4 pr-12 text-[10px] leading-5 text-[#70858E] sm:px-5 sm:pr-14">
                  {faq.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}


const PROPERTY_MAP_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const PROPERTY_MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function PropertyMapResize() {
  const map = useMap();
  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 150);
    return () => window.clearTimeout(timer);
  }, [map]);
  return null;
}

function PropertyReviews({ property }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [remark, setRemark] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const propertyMongoId = property?._id;
  const token = localStorage.getItem("buyerToken") || localStorage.getItem("partnerToken") || localStorage.getItem("sellerToken") || localStorage.getItem("token");

  const loadReviews = async () => {
    if (!propertyMongoId) return;
    try {
      const { data } = await axios.get(`/property-reviews/property/${propertyMongoId}`);
      setReviews(data.reviews || []);
      setAverageRating(data.averageRating || 0);
    } catch { /* Reviews remain optional if the API is unavailable. */ }
  };
  useEffect(() => { loadReviews(); }, [propertyMongoId]);

  const submitReview = async (event) => {
    event.preventDefault();
    if (!token) { setMessage("Please sign in as a buyer, seller or partner to submit a review."); return; }
    if (!propertyMongoId) { setMessage("The property MongoDB ID is unavailable."); return; }
    setSaving(true); setMessage("");
    try {
      await axios.post("/property-reviews", { propertyId: propertyMongoId, rating: Number(rating), remark }, { headers: { Authorization: `Bearer ${token}` } });
      setRemark(""); setRating(5); setMessage("Thank you! Your review has been submitted."); await loadReviews();
    } catch (error) { setMessage(error?.response?.data?.message || "Could not submit review. Please check your login and try again."); }
    finally { setSaving(false); }
  };

  return <section className="mt-6 rounded-[22px] border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-7">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#20A982]">Community feedback</p><h2 className="mt-2 text-2xl font-black text-[#102E46]">Property Reviews</h2></div><div className="flex items-center gap-2 rounded-xl bg-[#FFF7E0] px-4 py-2 text-sm font-black text-[#926A00]"><Star size={17} fill="currentColor"/>{averageRating ? `${averageRating} / 5` : "No ratings yet"}<span className="font-medium">({reviews.length})</span></div></div>
    <form onSubmit={submitReview} className="mt-5 rounded-xl border border-[#E2EBEE] bg-[#F8FBFC] p-4 sm:p-5"><h3 className="font-extrabold text-[#102E46]">Share your experience</h3><p className="mt-1 text-xs leading-5 text-[#71858F]">Buyers, sellers and partners can rate this property from 1 to 5 and leave a remark.</p><div className="mt-4 flex items-center gap-1" role="radiogroup" aria-label="Property rating">{[1,2,3,4,5].map((value)=><button key={value} type="button" onClick={()=>setRating(value)} aria-label={`${value} star${value>1?"s":""}`} className={`rounded p-1 transition ${value <= rating ? "text-[#F3B72D]" : "text-[#C7D2D8]"}`}><Star size={25} fill={value <= rating ? "currentColor" : "none"}/></button>)}<span className="ml-2 text-sm font-bold text-[#526B78]">{rating}/5</span></div><textarea value={remark} onChange={(e)=>setRemark(e.target.value)} required maxLength={2000} placeholder="Write your review..." className="mt-3 min-h-[95px] w-full rounded-xl border border-[#DCE5E9] bg-white px-3 py-3 text-sm text-[#173247] outline-none focus:border-[#20A982]"/><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-[#71858F]">{remark.length}/2000 characters</span><button disabled={saving} className="rounded-xl bg-[#274255] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#33cc99] hover:text-[#0f1c26] disabled:opacity-50">{saving ? "Submitting…" : "Submit Review"}</button></div>{message && <p className="mt-3 text-sm font-semibold text-[#176A52]">{message}</p>}</form>
    <div className="mt-5 space-y-3">{reviews.length === 0 ? <p className="rounded-xl border border-dashed border-[#DCE5E9] p-6 text-center text-sm text-[#71858F]">No reviews yet. Be the first to share your experience.</p> : reviews.map((review)=><article key={review._id} className="rounded-xl border border-[#E2EBEE] p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-extrabold text-[#173247]">{review.reviewerName || "DigiNiwas user"}</p><p className="mt-1 text-[11px] uppercase tracking-wider text-[#71858F]">{review.reviewerRole || "Member"} · {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}</p></div><span className="inline-flex items-center gap-1 text-sm font-extrabold text-[#A87900]"><Star size={15} fill="currentColor"/>{review.rating}/5</span></div><p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#526B78]">{review.remark}</p></article>)}</div>
  </section>;
}

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [property, setProperty] = useState(() =>
    location.state?.property ? normalizeProperty(location.state.property) : null
  );
  const [loading, setLoading] = useState(!property);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [buyerAuthOpen, setBuyerAuthOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [saved, setSaved] = useState(false);

  // Buyer stays signed in across the complete property journey.
  const [buyerLoggedIn, setBuyerLoggedIn] = useState(
    () => Boolean(localStorage.getItem("buyerToken"))
  );

  // Prevent duplicate lead submissions.
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchProperty = async () => {
      if (!propertyId) {
        setError("Property not found.");
        setLoading(false);
        return;
      }

      try {
        setError("");

        // Keep the existing card data immediately available, then try the
        // property-detail APIs so the page stays useful with deep links too.
        const endpoints = [
          `/properties/${propertyId}`,
          `/properties/detail/${propertyId}`,
        ];

        let normalized = null;

        for (const endpoint of endpoints) {
          try {
            const response = await axios.get(endpoint);
            const data =
              response?.data?.property ||
              response?.data?.data ||
              response?.data;

            if (data && typeof data === "object") {
              normalized = normalizeProperty(data);
              break;
            }
          } catch {
            // Try the next endpoint.
          }
        }

        if (!normalized) {
          try {
            const listResponse = await axios.get("/properties");
            const list = Array.isArray(listResponse?.data?.properties)
              ? listResponse.data.properties
              : Array.isArray(listResponse?.data?.data)
                ? listResponse.data.data
                : [];

            const found = list.find(
              (item) =>
                String(item?.propertyId || item?._id || "") ===
                String(propertyId)
            );

            if (found) normalized = normalizeProperty(found);
          } catch {
            // If the card already passed a property, retain it.
          }
        }

        if (!normalized && !property) {
          throw new Error("Property details could not be loaded.");
        }

        if (mounted && normalized) setProperty(normalized);
      } catch (err) {
        if (mounted && !property) {
          setError(
            err?.message || "Unable to load property details."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProperty();

    return () => {
      mounted = false;
    };
  }, [propertyId]);

  useEffect(() => {
    setActiveImage(0);
  }, [propertyId]);

  // Keep authentication state synced with BuyerAuthModal/localStorage.
  useEffect(() => {
    const syncBuyerAuth = () => {
      setBuyerLoggedIn(Boolean(localStorage.getItem("buyerToken")));
    };

    syncBuyerAuth();
    window.addEventListener("storage", syncBuyerAuth);
    window.addEventListener("buyer-auth-success", syncBuyerAuth);

    return () => {
      window.removeEventListener("storage", syncBuyerAuth);
      window.removeEventListener("buyer-auth-success", syncBuyerAuth);
    };
  }, []);


  useEffect(() => {
    if (!property) return;

    const canonicalSlug = slugifyPropertyTitle(property.title);
    const canonicalPath = `/property/${encodeURIComponent(property.propertyId || propertyId)}/${canonicalSlug}`;

    document.title = `${property.title} | DigiNiwas`;
    const description =
      property.description ||
      `View ${property.title} on DigiNiwas with property details, location, pricing and live availability.`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description.slice(0, 160);

    if (window.location.pathname !== canonicalPath) {
      navigate(canonicalPath, { replace: true, state: { property } });
    }
  }, [property, propertyId, navigate]);

  const images = useMemo(() => {
    if (property?.images?.length) return property.images;
    return ["/no-image.png"];
  }, [property]);

  const priceInfo = property ? getPropertyPrice(property) : null;

  const quickFacts = property
    ? [
        property.bhk && {
          icon: BedDouble,
          label: "Bedrooms",
          value: property.bhk,
        },
        property.bathrooms > 0 && {
          icon: Bath,
          label: "Bathrooms",
          value: property.bathrooms,
        },
        property.areaValue > 0 && {
          icon: Ruler,
          label: "Area",
          value: `${property.areaValue.toLocaleString("en-IN")} ${property.areaUnit}`,
        },
        property.coveredParking + property.openParking > 0 && {
          icon: CarFront,
          label: "Parking",
          value: property.coveredParking + property.openParking,
        },
      ].filter(Boolean)
    : [];

  const overviewFacts = property
    ? [
        ["Property Type", property.propertyType, Home],
        ["Building Type", property.buildingType, Building2],
        ["Listing Type", priceInfo?.isRent ? "Rent" : "Buy", Landmark],
        ["Transaction", property.transactionType, CircleDot],
        ["Bedrooms", property.bhk, BedDouble],
        ["Bathrooms", property.bathrooms > 0 ? property.bathrooms : null, Bath],
        [
          "Area",
          property.areaValue > 0
            ? `${property.areaValue.toLocaleString("en-IN")} ${property.areaUnit}`
            : null,
          Ruler,
        ],
        ["Floor", property.floorNumber || null, Building2],
        ["Total Floors", property.totalFloors || null, Building2],
        ["Covered Parking", property.coveredParking > 0 ? property.coveredParking : null, CarFront],
        ["Open Parking", property.openParking > 0 ? property.openParking : null, CarFront],
        [
          "Lift",
          typeof property.liftAvailable === "boolean"
            ? property.liftAvailable ? "Available" : "Not Available"
            : null,
          ChevronRight,
        ],
      ].filter(([, value]) => value !== null && value !== undefined && value !== "")
    : [];

  const locationText = [
    property?.locality,
    property?.city,
    property?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const openAccess = () => {
    const token = localStorage.getItem("buyerToken");

    // Never show the buyer login again when a valid buyer token exists.
    if (buyerLoggedIn || token) {
      if (!buyerLoggedIn && token) setBuyerLoggedIn(true);
      return;
    }

    setAccessOpen(false);
    setBuyerAuthOpen(true);
    setAppModalOpen(false);
    setSelectedRole(null);
  };

  const handleBuyerAuthSuccess = () => {
    setBuyerLoggedIn(true);
    setBuyerAuthOpen(false);
    setAccessOpen(false);
    setSelectedRole(null);

    // Notify this page immediately; storage events do not fire in the same tab.
    window.dispatchEvent(new Event("buyer-auth-success"));
  };

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out ${property.title} on DigiNiwas`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        Swal.fire({ icon: "success", title: "Link copied", text: "Property link copied to your clipboard." });
      }
    } catch {
      // User cancelled sharing or browser blocked it.
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setAccessOpen(false);

    if (role === "buyer") {
      setBuyerAuthOpen(true);
      setAppModalOpen(false);
    } else {
      setAppModalOpen(true);
      setBuyerAuthOpen(false);
    }
  };

  const getStoredBuyer = () => {
    // Different login flows can store the buyer under slightly different keys.
    const keys = ["buyer", "buyerUser", "currentBuyer", "user"];

    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (error) {
        console.warn(`Unable to parse localStorage.${key}:`, error);
      }
    }

    return {};
  };

  const requireBuyer = () => {
    const token = localStorage.getItem("buyerToken");

    if (buyerLoggedIn || token) {
      if (!buyerLoggedIn && token) {
        setBuyerLoggedIn(true);
      }
      return true;
    }

    openAccess();
    return false;
  };

  const handleEnquire = async () => {
    if (!requireBuyer()) return;
    if (leadSubmitting) return;

    const token = localStorage.getItem("buyerToken");

    if (!token) {
      openAccess();
      return;
    }

    const buyer = getStoredBuyer();

    // ---------------------------------------------------------
    // Resolve buyer fields from all common buyer/login shapes.
    // ---------------------------------------------------------
    const buyerMongoId =
      buyer?._id ||
      buyer?.id ||
      buyer?.buyerMongoId ||
      buyer?.userId ||
      buyer?.mongoId ||
      "";

    const buyerCode =
      buyer?.buyerCode ||
      buyer?.buyerId ||
      buyer?.code ||
      buyer?.customerCode ||
      "";

    const buyerName =
      buyer?.name ||
      buyer?.fullName ||
      [buyer?.firstName, buyer?.lastName].filter(Boolean).join(" ") ||
      "";

    const buyerPhone =
      buyer?.phone ||
      buyer?.mobile ||
      buyer?.mobileNumber ||
      buyer?.phoneNumber ||
      buyer?.phone_number ||
      "";

    const buyerEmail =
      buyer?.email ||
      buyer?.emailAddress ||
      "";

    const buyerCity =
      buyer?.city ||
      buyer?.location?.city ||
      buyer?.location?.name ||
      "";

    // ---------------------------------------------------------
    // Resolve property Mongo/public IDs separately.
    // Backend lead creation should receive the Mongo property ID
    // when it exists.
    // ---------------------------------------------------------
    const propertyMongoId =
      property?._id ||
      property?.propertyMongoId ||
      property?.mongoId ||
      propertyId ||
      "";

    const propertyPublicId =
      property?.propertyId ||
      property?.propertyCode ||
      "";

    const propertyLocation = [
      property?.locality,
      property?.city,
      property?.state,
      property?.country,
    ]
      .filter(Boolean)
      .join(", ");

    // ---------------------------------------------------------
    // Validate the minimum buyer data before hitting backend.
    // ---------------------------------------------------------
    if (!buyerMongoId) {
      console.error("Lead creation: buyerMongoId missing", buyer);
      Swal.fire({ icon: "warning", title: "Buyer information missing", text: "Please login again." });
      return;
    }

    if (!buyerName) {
      console.error("Lead creation: buyer name missing", buyer);
      Swal.fire({ icon: "warning", title: "Buyer name missing", text: "Please login again." });
      return;
    }

    if (!buyerPhone) {
      console.error("Lead creation: buyer phone missing", buyer);
      Swal.fire({ icon: "warning", title: "Mobile number missing", text: "Please login again." });
      return;
    }

    if (!propertyMongoId) {
      console.error("Lead creation: propertyId missing", property);
      Swal.fire({ icon: "warning", title: "Property information missing", text: "Please refresh the page and try again." });
      return;
    }

    // ---------------------------------------------------------
    // IMPORTANT:
    // The lead API expects these buyer fields at TOP LEVEL.
    // Keep the nested buyer object too for backward compatibility.
    // ---------------------------------------------------------
    // ---------------------------------------------------------
    // Normalize numeric property values BEFORE sending them.
    // The backend Lead schema requires numeric `price` and
    // `estimatedValue`; never send NaN/null for these fields.
    // ---------------------------------------------------------
    const rawPrice =
      property?.priceAmount ??
      property?.rentAmount ??
      property?.price?.amount ??
      property?.rent?.amount ??
      0;

    const numericPrice = Number(rawPrice);
    const safePrice = Number.isFinite(numericPrice) && numericPrice > 0
      ? numericPrice
      : 0;

    const rawEstimatedValue =
      property?.estimatedValue ??
      property?.propertyValue ??
      property?.marketValue ??
      safePrice;

    const numericEstimatedValue = Number(rawEstimatedValue);
    const safeEstimatedValue =
      Number.isFinite(numericEstimatedValue) && numericEstimatedValue > 0
        ? numericEstimatedValue
        : safePrice;

    const rawArea =
      property?.areaValue ??
      property?.area?.value ??
      0;

    const numericArea = Number(rawArea);
    const safeArea = Number.isFinite(numericArea) && numericArea > 0
      ? numericArea
      : 0;

    const leadPayload = {
      // Required property field
      propertyId: propertyMongoId,

      // Required buyer fields - TOP LEVEL
      buyerMongoId,
      buyerCode,
      name: buyerName,
      phone: buyerPhone,
      email: buyerEmail,
      city: buyerCity,
      consentVerified: true,

      // Lead details
      message: `Buyer enquiry for ${property?.title || "this property"}`,
      source: "Property_Enquiry",
      priority: "Medium",

      // Extra property information
      propertyTitle: property?.title || "",
      propertyPublicId,
      propertyLocation,
      propertyUrl: window.location.href,
      transactionType: property?.transactionType || "",
      listingType: property?.listingType || "",
      buildingType: property?.buildingType || "",
      propertyType: property?.propertyType || "",
      bhk: property?.bhk || "",

      // Always send finite numeric values.
      price: safePrice,
      estimatedValue: safeEstimatedValue,
      area: safeArea,

      priceUnit: property?.priceUnit || property?.rentFrequency || "",
      areaUnit: property?.areaUnit || "Sq. Ft.",
      locality: property?.locality || "",
      state: property?.state || "",
      country: property?.country || "",

      // Some backend versions read property information from a nested
      // `property` object. Keep both shapes for compatibility.
      property: {
        propertyId: propertyMongoId,
        propertyPublicId,
        title: property?.title || "",
        price: safePrice,
        estimatedValue: safeEstimatedValue,
        area: safeArea,
        areaUnit: property?.areaUnit || "Sq. Ft.",
        propertyType: property?.propertyType || "",
        buildingType: property?.buildingType || "",
        listingType: property?.listingType || "",
        transactionType: property?.transactionType || "",
        bhk: property?.bhk || "",
        locality: property?.locality || "",
        city: property?.city || "",
        state: property?.state || "",
        country: property?.country || "",
        address: property?.address || "",
      },

      // Backward compatibility for any service that reads buyer object.
      buyer: {
        buyerMongoId,
        buyerCode,
        name: buyerName,
        phone: buyerPhone,
        email: buyerEmail,
        city: buyerCity,
        consentVerified: true,
      },
    };

    console.log("========== PROPERTY LEAD REQUEST ==========");
    console.log("Buyer:", buyer);
    console.log("Property:", property);
    console.log("Lead Payload:", leadPayload);
    console.log("===========================================");

    setLeadSubmitting(true);

    try {
      const response = await axios.post(
        "/leads/from-property",
        leadPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("========== PROPERTY LEAD RESPONSE ==========");
      console.log("Status:", response?.status);
      console.log("Response:", response?.data);
      console.log("============================================");

      const data = response?.data;

      if (!data?.success) {
        throw new Error(
          data?.message || "Unable to generate lead."
        );
      }

      Swal.fire({
        icon: data?.duplicate ? "info" : "success",
        title: data?.duplicate ? "Enquiry already active" : "Enquiry submitted",
        text: data?.duplicate
          ? "Your enquiry is already active for this property."
          : "A DigiNiwas partner will contact you shortly.",
      });
    } catch (error) {
      console.error("========== PROPERTY LEAD ERROR ==========");
      console.error("Status:", error?.response?.status);
      console.error("Response:", error?.response?.data);
      console.error("Message:", error?.message);
      console.error("=========================================");

      Swal.fire({
        icon: "error",
        title: "Unable to submit enquiry",
        text: error?.response?.data?.message || error?.response?.data?.error || error?.message || "Please try again.",
      });
    } finally {
      setLeadSubmitting(false);
    }
  };

  const openBuyerAppDownload = () => {
    if (!requireBuyer()) return;
    setSelectedRole("buyer");
    setAppModalOpen(true);
    setBuyerAuthOpen(false);
  };

  const openNiwasAI = () => {
    navigate("/niwas-ai", { state: { property } });
  };

  if (loading && !property) {
    return (
      <div className="min-h-screen bg-[#F4F8F9] px-4 py-12 text-[#274255] sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-14 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#D8E7EA] border-t-[#20BE91]" />
          <p className="mt-4 text-sm font-bold text-[#607985]">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F4F8F9] px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-black text-[#102E46]">
            Property not found
          </h1>
          <p className="mt-2 text-sm text-[#71858F]">
            {error || "This property is no longer available."}
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-[#0F2E46] px-5 py-3 text-sm font-extrabold text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F9FA] text-[#102E46]">
      {/* TOP ACTION BAR */}
      <div className="sticky top-[64px] z-40 border-b border-[#DBE5E8] bg-white/95 backdrop-blur-xl sm:top-[70px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#DCE6E9] bg-white px-3.5 py-2 text-xs font-extrabold text-[#274255] transition hover:border-[#33cc99] hover:text-[#178A6B]"
          >
            <ArrowLeft size={15} />
            Back to Properties
          </button>

          <div className="flex items-center gap-2">
            {property.verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF9F6] px-3 py-1.5 text-[10px] font-black text-[#168B6B]">
                <ShieldCheck size={13} />
                Verified Listing
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        {/* BREADCRUMB */}
        <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-[#7A8F98]">
          <button
            type="button"
            onClick={() => navigate("/explore-property")}
            className="transition hover:text-[#1CAA82]"
          >
            Explore Properties
          </button>
          <ChevronRight size={12} />
          <span>{property.city || "Property"}</span>
          <ChevronRight size={12} />
          <span className="text-[#274255]">{property.title}</span>
        </div>

        {/* =====================================================
            HERO PROPERTY BLOCK
        ====================================================== */}
        <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.62fr)_minmax(330px,.78fr)]">
          {/* LEFT CONTENT COLUMN */}
          <div className="flex min-w-0 flex-col gap-6 self-start">
            {/* GALLERY */}
            <div className="overflow-hidden rounded-[24px] border border-[#DDE7EA] bg-white shadow-[0_15px_48px_rgba(16,46,70,0.07)]">
            <div className="relative h-[290px] overflow-hidden bg-[#E8EFF1] sm:h-[430px] lg:h-[485px]">
              <img
                src={images[activeImage] || "/no-image.png"}
                alt={property.title}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/no-image.png";
                }}
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-[#0F2E46]/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white">
                    {priceInfo.isRent ? "Rent" : "Buy"}
                  </span>
                  <span className="rounded-lg bg-[#22C997] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#083B31]">
                    {property.propertyType}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setFullscreen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:bg-black/45"
                  aria-label="Open image"
                >
                  <Maximize2 size={15} />
                </button>
              </div>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage(
                        (prev) => (prev - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#102E46] shadow-lg backdrop-blur transition hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#102E46] shadow-lg backdrop-blur transition hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={19} />
                  </button>
                </>
              ) : null}

              <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">
                {activeImage + 1} / {images.length}
              </div>
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto border-t border-[#EDF2F3] bg-white p-3">
                {images.slice(0, 10).map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      index === activeImage
                        ? "border-[#33cc99]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Property ${index + 1}`}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "/no-image.png";
                      }}
                    />
                  </button>
                ))}
              </div>
            ) : null}

            {/* LEFT CARD META */}
            <div className="border-t border-[#EDF2F3] px-5 pb-5 pt-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-[#70858F]">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F8F6] px-3 py-1.5 text-[#178A6B]">
                  <ShieldCheck size={13} />
                  {property.verified ? "Verified Property" : "Property Listed"}
                </span>
                {property.transactionType ? (
                  <span className="rounded-full border border-[#DCE7EA] px-3 py-1.5">
                    {property.transactionType}
                  </span>
                ) : null}
                {property.furnishingStatus ? (
                  <span className="rounded-full border border-[#DCE7EA] px-3 py-1.5">
                    {property.furnishingStatus}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-[#102E46] sm:text-3xl">
                {property.title}
              </h1>

              <div className="mt-2 flex items-start gap-2 text-sm leading-5 text-[#71858F]">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[#20BE91]" />
                <span>
                  {locationText ||
                    property.address ||
                    "Location available on request"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#5D7580]">
                {property.bhk ? (
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble size={15} className="text-[#20BE91]" />
                    {property.bhk}
                  </span>
                ) : null}
                {property.bathrooms > 0 ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Bath size={15} className="text-[#20BE91]" />
                    {property.bathrooms} Bath
                  </span>
                ) : null}
                {property.areaValue > 0 ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler size={15} className="text-[#20BE91]" />
                    {property.areaValue.toLocaleString("en-IN")} {property.areaUnit}
                  </span>
                ) : null}
                {property.coveredParking + property.openParking > 0 ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CarFront size={15} className="text-[#20BE91]" />
                    {property.coveredParking + property.openParking} Parking
                  </span>
                ) : null}
              </div>
            </div>

            </div>

            {/* PROPERTY ACTIONS */}
            <PropertyActionBar
              onEnquire={handleEnquire}
              onVisit={openBuyerAppDownload}
              saved={saved}
              onToggleSaved={() => {
                if (!requireBuyer()) return;
                setSaved((prev) => !prev);
              }}
              onShare={handleShare}
            />

            {/* PROPERTY OVERVIEW - FILLS THE SPACE THAT WAS EMPTY */}
            <section className="rounded-[22px] border border-[#DDE7EA] bg-white p-4 shadow-sm sm:p-6">
              <SectionTitle
                eyebrow="Overview"
                title="Property Overview"
                icon={Home}
              />
               {property.description ? (
                <div className="mt-6 border-t border-[#EDF2F3] pt-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1CAA82]">
                    About This Property
                  </p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#647B86]">
                    {property.description}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {overviewFacts.map(([label, value, Icon]) => (
                  <DetailBox key={label} label={label} value={value} icon={Icon} />
                ))}
              </div>

             
            </section>

            {/* HIGHLIGHTS & AMENITIES — kept in the main left column to remove empty space */}
            <section className="rounded-[22px] border border-[#DDE7EA] bg-white p-4 shadow-sm sm:p-6">
              <SectionTitle eyebrow="Property Features" title="Highlights & Amenities" icon={Sparkles} />

              {property.highlights.length || property.amenities.length ? (
                <div className="mt-4 space-y-4">
                  {property.highlights.length ? (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8799A1]">Highlights</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {property.highlights.map((item, index) => (
                          <div key={`${String(item)}-${index}`} className="flex items-center gap-2.5 rounded-xl border border-[#E4ECEE] bg-[#FBFDFD] px-3.5 py-3 text-xs font-bold text-[#4F6975]">
                            <CheckCircle2 size={15} className="shrink-0 text-[#20BE91]" />
                            {String(item)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {property.amenities.length ? (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8799A1]">Amenities</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {property.amenities.map((item, index) => (
                          <span key={`${String(item)}-amenity-${index}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE8EA] bg-[#FCFEFE] px-3 py-2 text-xs font-bold text-[#58717E]">
                            <Check size={13} className="text-[#20BE91]" />
                            {String(item)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-[#F7FAFB] p-5 text-sm font-semibold text-[#78909C]">
                  Amenities and feature information will appear here when available for this property.
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="lg:sticky lg:top-[130px] lg:h-fit">
            <div className="rounded-[24px] border border-[#DDE7EA] bg-white p-5 shadow-[0_15px_48px_rgba(16,46,70,0.07)] sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1CAA82]">
                {property.buildingType}
              </p>

              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#81949C]">
                    {priceInfo.isRent ? "Monthly Rent" : "Property Price"}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-3xl font-black tracking-tight text-[#102E46]">
                    <IndianRupee size={24} strokeWidth={2.8} />
                    {priceInfo.amount > 0
                      ? formatIndianCurrency(priceInfo.amount).replace("₹", "")
                      : "On request"}
                  </div>
                  <p className="mt-1 text-[10px] font-bold text-[#81949C]">
                    {priceInfo.suffix}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFF8F5] text-[#20BE91]">
                  <Building2 size={21} />
                </div>
              </div>

              {priceInfo.isRent && property.securityDeposit > 0 ? (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F7FAFB] px-3.5 py-3 text-xs">
                  <span className="font-bold text-[#79909A]">Security Deposit</span>
                  <span className="font-black text-[#274255]">
                    {formatIndianCurrency(property.securityDeposit)}
                  </span>
                </div>
              ) : null}

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {quickFacts.slice(0, 4).map(({ icon: Icon, label, value }) => (
                  <DetailBox key={label} label={label} value={value} icon={Icon} />
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {property.facing ? (
                  <span className="rounded-full border border-[#DCE8EA] bg-[#FCFEFE] px-3 py-1.5 text-[10px] font-extrabold text-[#617782]">
                    Facing {property.facing}
                  </span>
                ) : null}
                {property.view ? (
                  <span className="rounded-full border border-[#DCE8EA] bg-[#FCFEFE] px-3 py-1.5 text-[10px] font-extrabold text-[#617782]">
                    {property.view}
                  </span>
                ) : null}
                {property.liftAvailable ? (
                  <span className="rounded-full border border-[#DCE8EA] bg-[#FCFEFE] px-3 py-1.5 text-[10px] font-extrabold text-[#617782]">
                    Lift Available
                  </span>
                ) : null}
                {property.powerBackup ? (
                  <span className="rounded-full border border-[#DCE8EA] bg-[#FCFEFE] px-3 py-1.5 text-[10px] font-extrabold text-[#617782]">
                    Power Backup
                  </span>
                ) : null}
              </div>

              <button
                type="button"
                onClick={handleEnquire}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F2E46] px-4 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#163B59]"
              >
                <Phone size={17} />
                Contact About This Property
              </button>

              <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#F0FBF8] px-3.5 py-3 text-[10px] font-bold leading-4 text-[#48706A]">
                <ShieldCheck size={16} className="shrink-0 text-[#20BE91]" />
                {buyerLoggedIn ? "You are signed in as a Buyer." : "Sign in once to enquire, save and continue your property journey."}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[22px] border border-[#D7EEE7] bg-[#EEFBF7] shadow-sm">
              <NiwasAISnapshot property={property} />
            </div>

            <div className="mt-4 rounded-[22px] bg-[#0F2E46] p-5 text-white shadow-xl sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#33cc99]/15 text-[#33cc99]">
                  <UserRound size={19} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#33cc99]">
                    DigiNiwas Support
                  </p>
                  <p className="mt-0.5 text-sm font-black text-white">
                    Need help finding this property?
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/60">
                Get AI-powered help understanding this property and finding the right options for you.
              </p>
              <button
                type="button"
                onClick={openNiwasAI}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#33cc99] px-4 py-3 text-xs font-black text-[#0F2E46] transition hover:bg-[#52ddb8]"
              >
                Get Property Assistance
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="mt-4">
              <HomeLoanAssistance property={property} onRequest={openAccess} />
            </div>
          </aside>
        </section>

        {/* =====================================================
            LOCATION + INTEREST / QUICK ACTIONS
        ====================================================== */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)]">
          <div className="rounded-[22px] border border-[#DDE7EA] bg-white p-4 shadow-sm sm:p-6">
            <SectionTitle
              eyebrow="Location"
              title="Property Location"
              icon={MapPin}
            />

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#DCE7EA] bg-[#EEF5F6]">
              {Number.isFinite(property.latitude) &&
              Number.isFinite(property.longitude) &&
              property.latitude !== 0 &&
              property.longitude !== 0 ? (
                <div className="relative h-[300px] w-full sm:h-[340px]">
                  <MapContainer
                    center={[property.latitude, property.longitude]}
                    zoom={15}
                    minZoom={5}
                    maxZoom={19}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    dragging={true}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <PropertyMapResize />
                    <TileLayer
                      url={PROPERTY_MAP_TILE_URL}
                      attribution={PROPERTY_MAP_ATTRIBUTION}
                      noWrap
                    />
                    <Marker
                      position={[property.latitude, property.longitude]}
                      icon={createPropertyLogoIcon(54)}
                    >
                      <Popup>
                        <div className="min-w-[160px]">
                          <strong>{property.title || "Property Location"}</strong>
                          <div>{locationText || property.city || "Location"}</div>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 left-1/2 z-[1000] inline-flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#0F2E46] px-4 py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-[#163B59]"
                  >
                    Open in Maps
                    <ChevronRight size={14} />
                  </a>
                </div>
              ) : (
                <div className="flex min-h-[300px] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(51,204,153,.18),transparent_50%),linear-gradient(135deg,#eff7f7,#dce9eb)] px-6 text-center">
                  <div className="max-w-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                      <MapPin size={28} className="text-[#20BE91]" />
                    </div>
                    <p className="mt-4 text-base font-black text-[#274255]">
                      {locationText || "Location available"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#78909C]">
                      {property.address || [property.city, property.state, property.country].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <aside className="flex flex-col gap-4 lg:self-start">
            {/* INTEREST CTA */}
            <section className="overflow-hidden rounded-[22px] bg-[#0F2E46] shadow-[0_18px_50px_rgba(16,46,70,0.16)]">
              <div className="relative p-5 sm:p-6">
                <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#33cc99]/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-16 h-40 w-40 rounded-full bg-[#33cc99]/10 blur-3xl" />

                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#33cc99]">
                    DigiNiwas
                  </p>
                  <h2 className="mt-1.5 text-xl font-black tracking-tight text-white sm:text-2xl">
                    Interested in this property?
                  </h2>
                  <p className="mt-2 text-[11px] leading-5 text-white/60 sm:text-xs">
                    Connect with a verified partner and get the information you need to move forward.
                  </p>

                  <button
                    type="button"
                    onClick={handleEnquire}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#33cc99] px-5 py-3.5 text-xs font-black text-[#0F2E46] transition hover:bg-[#51DDB8]"
                  >
                    Connect With Us
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* PLAN YOUR NEXT STEP */}
            <section className="rounded-[22px] border border-[#DDE7EA] bg-[#F6FBFA] p-4 shadow-sm sm:p-5">
              <SectionTitle
                eyebrow="Quick Actions"
                title="Plan Your Next Step"
                icon={CalendarDays}
              />

              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={handleEnquire}
                  className="flex w-full items-center justify-between rounded-xl border border-[#CDE8E0] bg-white px-4 py-3 text-left transition hover:border-[#33cc99]"
                >
                  <span>
                    <span className="block text-xs font-black text-[#274255]">
                      Request property information
                    </span>
                    <span className="mt-0.5 block text-[10px] font-semibold text-[#78909C]">
                      Connect with a verified partner
                    </span>
                  </span>
                  <ChevronRight size={16} className="text-[#20BE91]" />
                </button>

                <button
                  type="button"
                  onClick={openBuyerAppDownload}
                  className="flex w-full items-center justify-between rounded-xl border border-[#CDE8E0] bg-white px-4 py-3 text-left transition hover:border-[#33cc99]"
                >
                  <span>
                    <span className="block text-xs font-black text-[#274255]">
                      Get property details
                    </span>
                    <span className="mt-0.5 block text-[10px] font-semibold text-[#78909C]">
                      Open the DigiNiwas buyer app
                    </span>
                  </span>
                  <ChevronRight size={16} className="text-[#20BE91]" />
                </button>

                <button
                  type="button"
                  onClick={openBuyerAppDownload}
                  className="flex w-full items-center justify-between rounded-xl border border-[#CDE8E0] bg-white px-4 py-3 text-left transition hover:border-[#33cc99]"
                >
                  <span>
                    <span className="block text-xs font-black text-[#274255]">
                      Schedule a visit
                    </span>
                    <span className="mt-0.5 block text-[10px] font-semibold text-[#78909C]">
                      Continue in the DigiNiwas buyer app
                    </span>
                  </span>
                  <ChevronRight size={16} className="text-[#20BE91]" />
                </button>
              </div>
            </section>
          </aside>
        </section>

        {/* SIMILAR PROPERTIES */}
        <section className="mt-6">
          <div className="rounded-[22px] border border-[#DDE7EA] bg-white p-4 shadow-sm sm:p-6 lg:self-start">
            <SimilarPropertiesSection
              property={property}
              navigate={navigate}
            />
          </div>
        </section>


        <PropertyReviews property={property} />

        {/* =====================================================
            PROPERTY REFERENCE
        ====================================================== */}
        <div className="mt-6">
          <FAQSection property={property} />
        </div>

        <section className="mt-6 rounded-[24px] border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-7">
          <ExplorePropertyHubs
            city={property.city}
            locality={property.locality}
          />
        </section>

      </main>

      {/* FULLSCREEN IMAGE */}
      {fullscreen ? (
        <div className="fixed inset-0 z-[10020] flex items-center justify-center bg-[#061520]/95 p-4 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
            aria-label="Close image"
          >
            <X size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveImage(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft size={21} />
          </button>

          <img
            src={images[activeImage] || "/no-image.png"}
            alt={property.title}
            className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            onError={(event) => {
              event.currentTarget.src = "/no-image.png";
            }}
          />

          <button
            type="button"
            onClick={() =>
              setActiveImage((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight size={21} />
          </button>
        </div>
      ) : null}

      {/* ACCESS FLOW */}
      {buyerAuthOpen ? (
        <BuyerAuthModal
          onSuccess={handleBuyerAuthSuccess}
          onClose={() => {
            setBuyerAuthOpen(false);
          }}
          onBack={() => {
            setBuyerAuthOpen(false);
          }}
        />
      ) : null}

      {appModalOpen && selectedRole ? (
        <AppDownloadModal
          role={selectedRole}
          onClose={() => setAppModalOpen(false)}
          onBack={() => setAppModalOpen(false)}
        />
      ) : null}
    </div>
  );
}

