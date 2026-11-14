import { useState, useEffect } from "react";
import {
  FiHeart,
  FiChevronRight,
  FiChevronLeft,
  FiHome,
  FiVideo,
  FiArrowRight,
  FiMessageCircle,
  FiCheck,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";
import {
  FaBrain,
  FaRegClock,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaBullhorn,
} from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { RiRobot2Line } from "react-icons/ri";
import niwasAi from "../../assets/images/niwas_ai.png";
import homelogo from "../../assets/images/homelogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ComingSoonVideo from "../../components/common/ComingSoonVideo";
import ai from "../../assets/images/niwas_ai.png";

const features = [
  { icon: FaBrain, t1: "Understands", t2: "Your Needs" },
  { icon: BiTargetLock, t1: "Smart & Accurate", t2: "Recommendations" },
  { icon: FaRegClock, t1: "Saves Time", t2: "Everytime" },
];

const featuress = [
  { icon: FiHome, title: "Easy", title2: "Property Listing" },
  { icon: FiVideo, title: "Professional", title2: "Video Shoots" },
  { icon: FaBullhorn, title: "Digital", title2: "Promotion" },
  { icon: FiBarChart2, title: "Maximum", title2: "Visibility" },
];

const slugifyPropertyTitle = (value = "") => String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "property";
const getPropertyPath = (property) => `/property/${encodeURIComponent(property?.propertyId || property?._id || "")}/${slugifyPropertyTitle(property?.title || "property")}`;

const formatIndianCurrency = (amount) => {
  const num = Number(amount);
  if (!num || isNaN(num)) return "0";

  if (num >= 10000000) {
    // 1 Crore = 10,000,000
    const cr = num / 10000000;
    return `${Number.isInteger(cr) ? cr : cr.toFixed(2)} Cr`;
  } else if (num >= 100000) {
    // 1 Lakh = 100,000
    const lakh = num / 100000;
    return `${Number.isInteger(lakh) ? lakh : lakh.toFixed(2)} L`;
  } else if (num >= 1000) {
    // Optional: formats thousands as 'k' or keep standard comma
    const k = num / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)} k`;
  }

  return num.toLocaleString("en-IN");
};

const getPropertyImages = (property) => {
  const images =
    Array.isArray(property?.images) && property.images.length > 0
      ? property.images
      : Array.isArray(property?.media?.images)
        ? property.media.images
        : [];

  return images
    .filter((image) => image && (typeof image === "string" || image.url))
    .sort((a, b) => Number(Boolean(b?.isCover)) - Number(Boolean(a?.isCover)));
};

const getCoverImage = (property) => getPropertyImages(property)?.[0]?.url ||
  (typeof getPropertyImages(property)?.[0] === "string" ? getPropertyImages(property)[0] : "");

function PropertyListing({ properties }) {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const propertyImages = properties.filter(
    (item) => getPropertyImages(item).length > 0,
  );
  const [currentImage, setCurrentImage] = useState(0);
  const currentProperty = propertyImages[currentImage];
  const currentPropertyImage = getCoverImage(currentProperty);

  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentImage((prev) => (prev + 1) % bgImages.length);
      if (!propertyImages.length) return;

      setCurrentImage((prev) => (prev + 1) % propertyImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="list-property"
      className="sm:min-h-screen bg-[#274255] text-white pt-20 px-4 sm:px-8 lg:px-14 sm:py-10"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-12 rounded-lg border border-[#2dd4a8]/60 text-[#2dd4a8] flex items-center justify-center text-sm font-semibold">
              <img src={homelogo} className="" />
            </span>
            <span className="text-[#2dd4a8] tracking-[0.2em] text-xs sm:text-sm font-medium">
              LIST YOUR PROPERTY
            </span>
          </div>

          {/* <h2 className="text-4xl sm:text-5xl  font-bold leading-[1.05] ">
            Property Daalo.
            <br />
            <span className="text-[#2dd4a8]">Reach Badhao.</span>
          </h2> */}
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.05]">
            Property Daalo.
            <br />
            <span className="text-[#2dd4a8] inline-block mt-2">
              Reach Badhao.
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-md text-sm sm:text-base leading-relaxed">
            List your property in the easiest way and we'll help you promote it
            digitally to the right audience.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-xl">
            {featuress.map((f) => (
              <div
                key={f.title2}
                className="rounded-xl border border-[#1f3a3f] bg-[#0d2329]/60  transition-all duration-300 hover:border-[#33cc99] hover:border-2 p-3 sm:p-4 flex flex-col items-start gap-2"
              >
                <div className="w-9 h-9 hover:scale-110 duration-100 transition-all rounded-md border border-[#2dd4a8]/40 text-[#2dd4a8] flex items-center justify-center">
                  <f.icon size={16} />
                </div>
                <div className="text-[11px] sm:text-xs leading-tight">
                  <div>{f.title}</div>
                  <div>{f.title2}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowComingSoon(true)}
            className="mt-8 inline-flex items-center gap-3 bg-[#2dd4a8] hover:bg-[#26c099] text-[#062018] font-semibold rounded-full pl-6 pr-2 py-2 transition-colors"
          >
            <span className="text-sm sm:text-base">List Your Property</span>
            <span className="w-8 h-8 rounded-full bg-[#062018] text-[#2dd4a8] flex items-center justify-center">
              <FiArrowRight size={14} />
            </span>
          </button>
        </div>

        {/* RIGHT */}

        <div className="relative w-full aspect-square max-w-[640px] mx-auto">
          <div>
            <img
              key={currentImage}
              // src={bgImages[currentImage]}
              src={currentPropertyImage}
              alt="House"
              className="absolute inset-0 w-full h-full object-cover  rounded-2xl transition-opacity duration-700"
            />
          </div>

          {/* Phone mockup (left of house) */}
          <div className="absolute left-2 sm:left-4 top-[65%] sm:top-[55%] -translate-y-1/2 w-[110px] sm:w-[140px] md:w-[160px] rounded-[1.5rem] border-[5px] border-[#0a1418] bg-[#0d1f24] shadow-2xl overflow-hidden">
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-between text-[8px] text-gray-400 mb-1">
                <FiChevronLeft size={10} />
                <span>Add Property</span>
                <span />
              </div>
              <div className="rounded-lg overflow-hidden mb-2 border border-[#1f3a3f]">
                <img
                  src={currentPropertyImage}
                  alt="Property"
                  className="w-full h-12 sm:h-16 object-cover"
                />
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#2dd4a8] font-semibold">
                {/* Your Property */}
                {currentProperty?.title}
              </div>
              <div className="text-[8px] sm:text-[9px] text-gray-400">
                {/* is Live Now! */}
                {/* ₹{Number(currentProperty?.price || 0).toLocaleString("en-IN")} */}
                ₹{formatIndianCurrency(currentProperty?.price)}
              </div>
              <div className="mt-2 flex justify-center">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#2dd4a8] text-[#2dd4a8] flex items-center justify-center">
                  <FiCheck size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Social Media bubble - top center */}
          <div className="absolute left-1/3 -translate-x-1/2 top-3 sm:top-20 rounded-2xl border border-[#1f3a3f] bg-[#0a1a1f]/90 backdrop-blur px-3 py-2 sm:px-4 sm:py-3 w-[150px] sm:w-[180px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full border border-[#2dd4a8] text-[#2dd4a8] flex items-center justify-center">
                <FiMessageCircle size={16} />
              </span>
              <span className="text-[0.7rem] sm:text-xs font-medium">
                Social Media
                <br />
                Exposure
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 justify-start">
              <span
                onClick={() =>
                  window.open("https://www.instagram.com/", "_blank")
                }
                className="w-6 h-6 cursor-pointer sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white"
              >
                <FaInstagram size={16} />
              </span>
              <span
                onClick={() =>
                  window.open("https://www.facebook.com/", "_blank")
                }
                className="w-6 h-6  cursor-pointer sm:w-7 sm:h-7 rounded-full bg-[#1877f2] flex items-center justify-center text-white"
              >
                <FaFacebook size={16} />
              </span>
              <span
                onClick={() =>
                  window.open("https://web.whatsapp.com/", "_blank")
                }
                className="w-6 h-6 cursor-pointer sm:w-7 sm:h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white"
              >
                <FaWhatsapp size={16} />
              </span>
            </div>
          </div>

          {/* Targeted Promotion - top right */}
          <div className="absolute right-2 sm:right-24 top-[25%] rounded-xl border border-[#1f3a3f] bg-[#0a1a1f]/90 backdrop-blur px-5 py-3  flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#2dd4a8] text-[#2dd4a8] flex items-center justify-center">
              <FiTarget size={16} />
            </span>
            <span className="text-[10px] sm:text-xs leading-tight">
              Targeted
              <br />
              Promotion
            </span>
          </div>

          {/* More Views - middle right */}
          <div className="absolute right-2 sm:right-10 top-[50%] rounded-xl border border-[#1f3a3f] bg-[#0a1a1f]/90 backdrop-blur px-5 py-3  flex items-center gap-2">
            <span className="w-6 h-6 text-[#2dd4a8] flex items-center justify-center">
              <FiTrendingUp size={20} />
            </span>
            <span className="text-[10px] sm:text-xs leading-tight">
              More Views
              <br />
              More Leads
            </span>
          </div>

          {/* Right Audience - bottom right */}
          <div className="absolute right-2 sm:right-4 top-[75%] rounded-xl border border-[#1f3a3f] bg-[#0a1a1f]/90 backdrop-blur px-5 py-3 flex items-center gap-2">
            <span className="w-6 h-6 text-[#2dd4a8] flex items-center justify-center">
              <FiUsers size={20} />
            </span>
            <span className="text-[10px] sm:text-xs leading-tight">
              Right Audience
              <br />
              Right Reach
            </span>
          </div>
        </div>
      </div>

      {showComingSoon && (
        <ComingSoonVideo
          setShowComingSoon={setShowComingSoon}
          video={import.meta.env.VITE_NIWAS_AI}
        />
      )}
    </section>
  );
}
export default function NiwasAIFinds() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const visibleProperties = properties.slice(startIndex, startIndex + 3);

  const [showComingSoon, setShowComingSoon] = useState(false);
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/properties`,
      );

      // API may return images under media.images while the legacy top-level
      // images array is empty. Always use the cover image first.
      const validProperties = (res.data.properties || []).filter(
        (item) => getPropertyImages(item).length > 0,
      );

      setProperties(validProperties);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (properties.length <= 3) return;

    if (startIndex + 3 >= properties.length) {
      setStartIndex(0);
    } else {
      setStartIndex((prev) => prev + 1);
    }
  };
  if (loading) {
    return <div className="py-20 text-center text-white">Loading...</div>;
  }

  return (
    <section
      id="niwas-ai"
      className="bg-[#274255] text-white px-8 py-10 sm:px-10 xl:px-14 lg:py-10  "
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 sm:pb-10 lg:pb-20 xl:pb-32 lg:pt-5 gap-10 items-center">
        {/* LEFT */}
        <div>
          <div className="inline mb-10">
            <div className="inline-block rounded-lg">
              <img
                onClick={() => navigate("niwas-ai")}
                src={ai}
                className="cursor-pointer w-20 h-16"
              />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.05]">
            <span className="">Niwas AI </span> Finds
            <br />
            <span className="text-[#2dd4a8]">What You Need.</span>
          </h2>
          <p className="text-gray-400 mt-5 max-w-md text-sm  sm:text-lg leading-relaxed">
            Smart AI that understands your needs and shows the best property
            options in seconds.
          </p>
          <div className="flex flex-wrap gap-5 sm:gap-8 mt-8">
            {features.map((f) => (
              <div key={f.t2} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full border border-[#2dd4a8]/50 text-[#2dd4a8] flex items-center justify-center">
                  <f.icon size={20} />
                </span>
                <div className="text-xs sm:text-base md:text-lg leading-tight">
                  <div>{f.t1}</div>
                  <div>{f.t2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT - chat card */}
        <div className="relative">
          <div className="relative rounded-2xl border border-[#1f3a3f] bg-[#0d2329]/60 backdrop-blur p-4 sm:p-5">
            {/* avatar top right */}
            <div className="absolute -top-5 right-6 sm:right-10 flex items-center gap-2 rounded-full bg-[#0d2329] border border-[#1f3a3f] pl-3 pr-1 py-1">
              <span className="text-[10px] sm:text-sm text-gray-300">
                under ₹30k near schools
              </span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-[10px] font-bold">
                U
              </span>
            </div>
            {/* AI bubble */}
            <div className="flex items-start gap-3 mb-4 mt-2">
              {/* <span className="w-10 h-10 rounded-full border border-[#2dd4a8]/60 text-[#2dd4a8] flex items-center justify-center shrink-0">
                  <RiRobot2Line size={20} />
                </span> */}
              <span className="w-10 h-15 rounded-full overflow-hidden border-2 border-[#2dd4a8]/70 shrink-0 shadow-lg">
                <img src={ai} alt="Niwas AI" className="w-50 h-50 pt-2" />
              </span>
              <div className="rounded-xl border border-[#1f3a3f] bg-[#0a1a1f]/80 px-4 py-2 text-xs sm:text-sm text-gray-200 max-w-xs">
                Sure! Here are some best 2BHK properties in Ambala near schools
                under ₹30k
              </div>
            </div>
            {/* property cards */}
            <div className="relative">
              <div
                className="flex gap-2 sm:gap-3 justify-between w-full  
                "
              >
                {visibleProperties.map((p) => (
                  <div
                    key={p._id}
                    className="rounded-xl w-full border border-[#1f3a3f] bg-[#0a1a1f]/80  transition-all duration-300 hover:border-[#33cc99] hover:border-2  overflow-hidden"
                  >
                    <div className="relative">
                      {/* <img src={p.img} alt={p.title}  */}
                      <img
                        src={getCoverImage(p) || "/no-image.png"}
                        alt={p.title}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/no-image.png"; }}
                        className="w-full h-20 sm:h-28 object-cover"
                      />
                      <span className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center">
                        <FiHeart size={12} />
                      </span>
                    </div>
                    <div className="flex flex-col justify-between p-2 sm:p-3">
                      <div>
                        <div className="text-[11px] sm:text-base font-semibold leading-tight">
                          {p.title}
                        </div>
                        <div className="text-[9px] sm:text-sm text-gray-400 mt-0.5">
                          {p.address}, {p.city}
                        </div>
                        <div className="text-[10px] sm:text-xs text-[#2dd4a8] font-semibold mt-1.5">
                          {/* ₹{Number(p.price).toLocaleString("en-IN")}  */}₹
                          {formatIndianCurrency(p.price)}
                        </div>
                      </div>

                      <div className="mt-auto pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (p?.propertyId || p?._id) navigate(getPropertyPath(p), { state: { property: p } });
                          }}
                          className="mt-auto w-full bg-[#0F2E46] hover:bg-[#163B59] transition text-white font-semibold text-sm px-4 py-2.5 rounded-xl"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* arrow */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2  -translate-y-1/2 w-8 h-8 rounded-full border border-[#2dd4a8]/50 bg-[#0a1a1f] text-[#2dd4a8] flex items-center justify-center"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <PropertyListing /> */}
      <PropertyListing properties={properties} />

      {showComingSoon && (
        <ComingSoonVideo
          setShowComingSoon={setShowComingSoon}
          video={import.meta.env.VITE_NIWAS_AI}
        />
      )}
    </section>
  );
}
