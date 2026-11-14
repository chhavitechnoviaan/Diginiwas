import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiMapPin, FiNavigation, FiSearch, FiStar, FiHeart } from "react-icons/fi";
import { BedDouble, Bath, Maximize2, Sparkles } from "lucide-react";
import axios from "../../api/axios";
import propertyFallback from "../../assets/images/property.png";

const FALLBACK_IMAGE = propertyFallback;

const formatIndianCurrency = (value) => {
  const num = Number(value || 0);
  if (!Number.isFinite(num) || num <= 0) return "Price on request";
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(num % 10000000 ? 2 : 0)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(num % 100000 ? 2 : 0)} Lakh`;
  return `₹${num.toLocaleString("en-IN")}`;
};

const getPrice = (property) => {
  const isRent = String(property?.transactionType || property?.listingType || "").toLowerCase().includes("rent");
  return isRent
    ? property?.rent?.amount ?? property?.rentAmount ?? property?.price?.amount ?? property?.price ?? 0
    : property?.price?.amount ?? property?.price ?? property?.priceAmount ?? 0;
};

const getPropertyImages = (property = {}) => {
  const source = [
    ...(Array.isArray(property.images) ? property.images : []),
    ...(Array.isArray(property.media?.images) ? property.media.images : []),
    ...(Array.isArray(property.gallery) ? property.gallery : []),
  ];
  const images = source.map((item) => {
    if (typeof item === "string") return { url: item };
    if (item?.url) return item;
    if (item?.secure_url) return { ...item, url: item.secure_url };
    return null;
  }).filter((item) => item?.url);
  const cover = images.find((item) => item.isCover || item.isCoverImage || item.cover);
  return cover ? [cover, ...images.filter((item) => item !== cover)] : images;
};

const getImage = (property) => getPropertyImages(property)[0]?.url || FALLBACK_IMAGE;
const slugify = (value = "") => String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "property";
const propertyPath = (property) => `/property/${encodeURIComponent(property?.propertyId || property?._id || "")}/${slugify(property?.title || "property")}`;

const normalizeFilters = (filters = {}) => ({
  city: String(filters.city || "").trim(),
  propertyType: String(filters.propertyType || "").trim(),
  buildingType: String(filters.buildingType || "").trim(),
  transactionType: String(filters.transactionType || "").trim(),
  category: String(filters.category || "").trim(),
});

const isBoosted = (property) => {
  if (property?.boost?.isBoosted === true) {
    const now = Date.now();
    const start = property.boost?.startDate ? new Date(property.boost.startDate).getTime() : null;
    const end = property.boost?.endDate ? new Date(property.boost.endDate).getTime() : null;
    return (!start || start <= now) && (!end || end >= now);
  }
  return Boolean(property?.promotion?.sponsored || property?.promotions?.boost?.isActive);
};

function PropertyCard({ property, onOpen, size = "medium" }) {
  const image = getImage(property);
  const amount = getPrice(property);
  const isRent = String(property?.transactionType || property?.listingType || "").toLowerCase().includes("rent");
  const specs = [
    property?.bedrooms || property?.bhk ? String(property?.bedrooms || property?.bhk) : "",
    property?.bathrooms ? `${property.bathrooms} Bath` : "",
    property?.areaValue || property?.area?.value || property?.propertySize ? `${property?.areaValue || property?.area?.value || property?.propertySize} ${property?.areaUnit || property?.area?.unit || property?.sizeUnit || "Sq. Ft."}` : "",
  ].filter(Boolean).slice(0, 3);
  const location = [property?.locality, property?.city, property?.state].filter(Boolean).slice(0, 2).join(", ") || "Location available on request";
  const sizeClass = size === "center" ? "min-h-[420px] lg:min-h-[455px]" : size === "large" ? "min-h-[385px]" : "min-h-[350px]";

  return (
    <article onClick={() => onOpen(property)} className={`group relative flex ${sizeClass} min-w-0 cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#D9E5E9] bg-white shadow-[0_20px_55px_rgba(4,25,38,.22)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(4,25,38,.3)]`}>
      <div className={`${size === "center" ? "h-[225px]" : size === "large" ? "h-[195px]" : "h-[175px]"} relative shrink-0 overflow-hidden bg-[#DDE9EC]`}>
        <img src={image} alt={property?.title || "Property"} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }} />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#0A2635]/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em] text-white shadow-lg">{isRent ? "Rent" : "Sell"}</span>
          {isBoosted(property) && <span className="inline-flex items-center gap-1 rounded-full bg-[#33cc99] px-2.5 py-1.5 text-[9px] font-black text-[#06352B]"><FiStar size={11} /> Featured</span>}
        </div>
        <button type="button" onClick={(e) => e.stopPropagation()} className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#173B50] shadow-lg backdrop-blur transition hover:text-[#20BE91]"><FiHeart size={16} /></button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className={`${size === "center" ? "text-[18px]" : "text-[16px]"} line-clamp-2 min-h-[40px] font-black leading-tight text-[#122D3E]`}>
          {property?.title || `${property?.propertyType || "Property"} in ${property?.city || "India"}`}
        </h3>
        <div className="mt-1.5 flex min-w-0 items-start gap-1.5 text-[9px] font-semibold leading-3.5 text-[#7A8F99]"><FiMapPin size={14} className="mt-0.5 shrink-0 text-[#20BE91]" /><span className="line-clamp-2">{location}</span></div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className={`${size === "center" ? "text-[22px]" : "text-[19px]"} font-black leading-none text-[#102E46]`}>{formatIndianCurrency(amount)}{isRent && <span className="ml-1 text-[10px] font-bold text-[#20BE91]">/month</span>}</div>
          {property?.propertyType && <span className="shrink-0 rounded-full bg-[#F0F5F6] px-2.5 py-1 text-[9px] font-black text-[#70848D]">{property.propertyType}</span>}
        </div>

        {specs.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[#E7EEF1] pt-2.5">{specs.map((text, index) => <span key={`${text}-${index}`} className="inline-flex items-center gap-1.5 rounded-xl bg-[#F4F8F9] px-2 py-1 text-[9px] font-black text-[#5D7580]">{index === 0 ? <BedDouble size={13} className="text-[#20BE91]" /> : index === 1 ? <Bath size={13} className="text-[#20BE91]" /> : <Maximize2 size={12} className="text-[#20BE91]" />}{text}</span>)}</div>}

        <button type="button" onClick={(e) => { e.stopPropagation(); onOpen(property); }} className="mt-auto flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#103B57] px-3 py-2.5 text-[10px] font-black text-white transition hover:bg-[#20BE91] hover:text-[#073A30]">
          View Details <FiArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default function PropertyDiscoverySection({ searchFilters, title, subtitle, variant = "popular", compact = false }) {
  const navigate = useNavigate();
  const filters = useMemo(() => normalizeFilters(searchFilters), [searchFilters]);
  const [properties, setProperties] = useState([]);
  const [mode, setMode] = useState("popular");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState("detecting");
  const [paused, setPaused] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const scrollRef = useRef(null);

  const fetchProperties = async ({ lat = null, lng = null, city = "", filtersOverride = filters } = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("mode", "popular");
      if (lat != null && lng != null) { params.set("lat", String(lat)); params.set("lng", String(lng)); }
      const selected = normalizeFilters(filtersOverride);
      if (selected.city || city) params.set("locationCity", selected.city || city);
      if (selected.propertyType) params.set("propertyType", selected.propertyType);
      if (selected.buildingType) params.set("buildingType", selected.buildingType);
      if (selected.transactionType) params.set("transactionType", selected.transactionType);
      if (selected.category) params.set("category", selected.category);
      params.set("limit", "16");

      const res = await axios.get(`/v1/properties/search?${params.toString()}`);
      const payload = res?.data || {};
      setProperties(Array.isArray(payload.properties) ? payload.properties : []);
      setMode(payload.fallbackUsed ? "popular-fallback" : payload.mode || "popular");
      setLocation(payload.location || null);
      setStartIndex(0);
    } catch (error) {
      console.error("Popular properties error:", error);
      setProperties([]);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    let cancelled = false;
    if (Object.values(filters).some(Boolean)) {
      fetchProperties({ filtersOverride: filters });
      setLocationStatus("provided");
      return () => { cancelled = true; };
    }
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      fetchProperties({ filtersOverride: filters });
      return () => { cancelled = true; };
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      if (cancelled) return;
      const { latitude, longitude } = position.coords;
      setLocationStatus("granted");
      let city = "";
      try {
        const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
        if (geo.ok) { const data = await geo.json(); city = data?.address?.city || data?.address?.town || data?.address?.municipality || data?.address?.state_district || ""; }
      } catch (error) { console.debug("Reverse geocoding unavailable", error); }
      if (!cancelled) fetchProperties({ lat: latitude, lng: longitude, city, filtersOverride: filters });
    }, () => {
      if (cancelled) return;
      setLocationStatus("denied");
      fetchProperties({ filtersOverride: filters });
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.city, filters.propertyType, filters.buildingType, filters.transactionType, filters.category]);

  useEffect(() => {
    if (paused || properties.length <= 5) return undefined;
    const timer = setInterval(() => setStartIndex((current) => (current + 1) % properties.length), 3500);
    return () => clearInterval(timer);
  }, [paused, properties.length]);

  const visibleProperties = useMemo(() => {
    const count = Math.min(5, properties.length);
    return Array.from({ length: count }, (_, offset) => properties[(startIndex + offset) % properties.length]);
  }, [properties, startIndex]);

  const heading = title || "Popular Properties";
  const copy = subtitle || (mode === "popular-fallback" ? "No live inventory was found in your detected city, so other live properties are shown instead." : "Explore live properties from your current location and nearby areas.");
  const shift = (direction) => { setPaused(false); if (properties.length) setStartIndex((current) => (current + direction + properties.length) % properties.length); };
  const openProperty = (property) => { setPaused(true); navigate(propertyPath(property), { state: { property } }); };

  return (
    <section className={`relative overflow-hidden bg-[#143E54] text-white ${compact ? "px-4 py-10" : "px-4 py-12 sm:px-6 lg:px-10 lg:py-16"}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(51,204,153,.16),transparent_28%),radial-gradient(circle_at_86%_80%,rgba(18,59,89,.8),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-25 [background-image:radial-gradient(rgba(75,217,179,.7)_1px,transparent_1px)] [background-size:13px_13px] [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#33cc99]/30 bg-[#33cc99]/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#72e5bd]"><FiSearch size={13} /> {variant === "ai" ? "AI suggestions" : "Property discovery"}</div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{heading}</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">{copy}</p>
          </div>
          <button type="button" onClick={() => navigate("/explore-property")} className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:border-[#33cc99]/50 hover:bg-white/10">Explore all <FiArrowRight size={17} /></button>
        </div>

        {(locationStatus === "granted" || locationStatus === "provided") && (
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/65 backdrop-blur"><FiNavigation className="text-[#33cc99]" />{mode === "popular-fallback" ? `${location?.city ? `No live inventory in ${location.city}.` : "No local live inventory found."} Showing other live listings.` : location?.city ? `Showing live listings around ${location.city}` : "Showing popular live listings"}</div>
        )}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">{[1,2,3,4,5].map((i) => <div key={i} className="h-[420px] animate-pulse rounded-[24px] border border-white/10 bg-white/5" />)}</div>
        ) : properties.length ? (
          <div className="relative px-0 sm:px-5 lg:px-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div ref={scrollRef} className="grid items-end gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
              {visibleProperties.map((property, index) => (
                <div key={`${property?._id || property?.propertyId}-${index}`} className={`${index === 0 ? "hidden lg:block" : ""} ${index === 4 ? "hidden lg:block" : ""}`}>
                  <PropertyCard property={property} onOpen={openProperty} size={index === 2 ? "center" : index === 1 || index === 3 ? "large" : "small"} />
                </div>
              ))}
            </div>
            {properties.length > 1 && <>
              <button type="button" aria-label="Previous properties" onClick={() => shift(-1)} className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#06202C]/95 text-white shadow-xl transition hover:border-[#33cc99]/60 hover:text-[#33cc99]"><FiChevronLeft size={22} /></button>
              <button type="button" aria-label="Next properties" onClick={() => shift(1)} className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#06202C]/95 text-white shadow-xl transition hover:border-[#33cc99]/60 hover:text-[#33cc99]"><FiChevronRight size={22} /></button>
            </>}
          </div>
        ) : (
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-10 text-center"><h3 className="text-lg font-black">No live properties found</h3><p className="mt-2 text-sm text-white/55">Explore the complete live inventory instead.</p><button type="button" onClick={() => navigate("/explore-property")} className="mt-5 rounded-xl bg-[#33cc99] px-5 py-3 text-sm font-black text-[#0d1b2a]">Explore Properties</button></div>
        )}
      </div>
    </section>
  );
}
