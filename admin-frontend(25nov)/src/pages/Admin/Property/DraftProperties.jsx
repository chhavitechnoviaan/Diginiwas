
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit3,
  FiEye,
  FiSearch,
  FiSend,
  FiX,
  FiPlus,
  FiRefreshCw,
  FiFileText,
  FiDownload,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiPlayCircle,
} from "react-icons/fi";
import {
  MdOutlineDrafts,
  MdOutlineLocationOn,
  MdOutlineBed,
  MdOutlineBathtub,
  MdOutlineSquareFoot,
  MdOutlineImage,
  MdOutlineDescription,
  MdOutlineCurrencyRupee,
  MdOutlineHomeWork,
  MdOutlineLocalParking,
  MdOutlineBalcony,
  MdOutlineApartment,
  MdOutlineCheckCircle,
  MdOutlineVideoLibrary,
  MdOutlinePictureAsPdf,
  MdOutlineLocationCity,
} from "react-icons/md";
import Swal from "sweetalert2";
import {
  getDraftPropertiesApi,
  publishDraftPropertyApi,
} from "../../../Services/propertyService";

const formatPrice = (value) => {
  const price = Number(value || 0);
  if (!price) return "Price not added";
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

const getImage = (property) =>
  property?.images?.[0]?.url ||
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";

const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const formatMoney = (value) => {
  const amount = Number(value || 0);
  return amount ? `₹${amount.toLocaleString("en-IN")}` : "—";
};

const isPdfUrl = (url = "") => {
  const clean = String(url).split("?")[0].toLowerCase();
  return (
    clean.endsWith(".pdf") ||
    clean.includes("/raw/upload/") ||
    clean.includes("application/pdf")
  );
};

const isVideoUrl = (url = "") =>
  /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(String(url));

const getYouTubeEmbedUrl = (url = "") => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) return url;
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    return "";
  } catch {
    return "";
  }
};


const sanitizeFilePart = (value = "") =>
  String(value || "")
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "") || "Property";

const getFileExtension = (url = "", fallback = "pdf") => {
  try {
    const pathname = new URL(url).pathname;
    const lastPart = pathname.split("/").pop() || "";
    const match = lastPart.match(/\.([a-zA-Z0-9]{2,6})$/);

    if (match?.[1]) return match[1].toLowerCase();
  } catch {
    const clean = String(url).split("?")[0];
    const match = clean.match(/\.([a-zA-Z0-9]{2,6})$/);

    if (match?.[1]) return match[1].toLowerCase();
  }

  return isPdfUrl(url) ? "pdf" : fallback;
};

const buildDocumentFileName = (property, documentType, url) => {
  const propertyName = sanitizeFilePart(
    property?.title || property?.projectName || property?.propertyId || "Property"
  );

  const location = sanitizeFilePart(
    [property?.locality, property?.city].filter(Boolean).join("_") ||
      property?.city ||
      "Location"
  );

  const type = sanitizeFilePart(documentType);
  const extension = getFileExtension(url, "pdf");

  return `${propertyName}_${location}_${type}.${extension}`;
};

const downloadDocument = async ({
  url,
  property,
  documentType,
}) => {
  if (!url) return;

  const fileName = buildDocumentFileName(property, documentType, url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch document");
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  } catch (error) {
    console.warn(
      "Custom filename download failed, using direct download fallback:",
      error,
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

function DetailCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E9FBF6] text-[#168A70]">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
            {label}
          </p>
          <p className="mt-1 break-words text-sm font-bold text-[#1F4256]">
            {value === "" || value === null || value === undefined ? "—" : value}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ icon, title, subtitle }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F4256] text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#1F4256]">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs leading-5 text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function FullPropertyPreview({
  property,
  onClose,
  onEdit,
  onPublish,
  publishing,
}) {
  const [activeImage, setActiveImage] = useState(0);

  if (!property) return null;

  const images = Array.isArray(property.images)
    ? property.images.map((item) => item?.url).filter(Boolean)
    : [];

  const floorPlanUrl =
    typeof property.floorPlan === "string"
      ? property.floorPlan
      : property.floorPlan?.url || "";

  const reraUrl =
    typeof property.reraCertificate === "string"
      ? property.reraCertificate
      : property.reraCertificate?.url || "";

  const uploadedVideoUrl =
    typeof property.video === "string"
      ? property.video
      : property.video?.url || "";

  const youtubeEmbed = getYouTubeEmbedUrl(property.videoLink || "");
  const currentImage = images[activeImage] || getImage(property);

  const previousImage = () =>
    setActiveImage((prev) => (prev <= 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setActiveImage((prev) => (prev >= images.length - 1 ? 0 : prev + 1));

  const locationText =
    [property.locality, property.city].filter(Boolean).join(", ") ||
    "Location not added";

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#102C3A]/75 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="relative shrink-0 overflow-hidden bg-[#1F4256] px-5 py-5 text-white sm:px-7">
          <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-[#3ED6AE]/10" />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9BD8E5]">
                DIGINIWAS PROPERTY PREVIEW
              </p>
              <h2 className="mt-1 truncate text-xl font-bold sm:text-2xl">
                {property.title || "Untitled Property"}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
                <MdOutlineLocationOn size={15} />
                {locationText}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition hover:bg-white/20"
            >
              <FiX />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#F4F7F8]">
          <div className="space-y-6 p-3 sm:p-6">
            <section className="overflow-hidden rounded-3xl border border-[#DDE7EA] bg-white shadow-sm">
              <div className="relative h-[280px] bg-slate-100 sm:h-[460px]">
                <img
                  src={currentImage}
                  alt={property.title || "Property"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#FFF5DB] px-3 py-1.5 text-xs font-bold text-[#9B6B00] shadow">
                    {property.status || "Draft"}
                  </span>
                  {property.transactionType && (
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow">
                      {property.transactionType}
                    </span>
                  )}
                  {property.category && (
                    <span className="rounded-full bg-[#E9FBF6]/95 px-3 py-1.5 text-xs font-bold text-[#168A70] shadow">
                      {property.category}
                    </span>
                  )}
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/50"
                    >
                      <FiChevronLeft size={21} />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/50"
                    >
                      <FiChevronRight size={21} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs text-white/70">
                      {property.propertyId || "Draft Listing"}
                    </p>
                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                      {property.title || "Untitled Property"}
                    </h1>
                    <p className="mt-1 text-sm text-white/75">{locationText}</p>
                  </div>

                  <div className="shrink-0 rounded-2xl bg-black/30 px-4 py-3 text-right backdrop-blur">
                    <p className="text-[10px] uppercase tracking-wide text-white/60">
                      Listing Price
                    </p>
                    <p className="mt-0.5 text-xl font-bold">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto p-4">
                  {images.map((url, index) => (
                    <button
                      type="button"
                      key={`${url}-${index}`}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                        activeImage === index
                          ? "border-[#3ED6AE]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`Property ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<MdOutlineCurrencyRupee size={21} />}
                title="Pricing & Commercial Details"
                subtitle="Complete commercial information for this property."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <DetailCard label="Total Price" value={formatMoney(property.price)} />
                <DetailCard
                  label="Price / Sqft"
                  value={
                    property.pricePerSqft
                      ? `₹${Number(property.pricePerSqft).toLocaleString("en-IN")}`
                      : "—"
                  }
                />
                <DetailCard label="Booking Amount" value={formatMoney(property.bookingAmount)} />
                <DetailCard label="Maintenance" value={formatMoney(property.maintenance)} />
                <DetailCard label="Negotiable" value={property.negotiable ? "Yes" : "No"} />
                <DetailCard label="Transaction Type" value={property.transactionType || "—"} />
                <DetailCard label="Category" value={property.category || "—"} />
                <DetailCard label="Current Status" value={property.status || "Draft"} />
              </div>
            </section>

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<MdOutlineLocationOn size={21} />}
                title="Location Details"
                subtitle="Property address and geographic coordinates."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <DetailCard label="City" value={property.city || "—"} icon={<MdOutlineLocationCity />} />
                <DetailCard label="Locality" value={property.locality || "—"} />
                <DetailCard label="PIN Code" value={property.pinCode || "—"} />
                <DetailCard
                  label="Coordinates"
                  value={
                    property.latitude !== undefined &&
                    property.latitude !== "" &&
                    property.longitude !== undefined &&
                    property.longitude !== ""
                      ? `${property.latitude}, ${property.longitude}`
                      : "—"
                  }
                />
              </div>
              <div className="mt-3">
                <DetailCard label="Full Address" value={property.address || "—"} />
              </div>
            </section>

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<MdOutlineApartment size={21} />}
                title="Property Specifications"
                subtitle="Area, rooms, floor, parking and furnishing information."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <DetailCard
                  label="Property Size"
                  value={
                    property.propertySize
                      ? `${property.propertySize} ${property.sizeUnit || "sqft"}`
                      : "—"
                  }
                  icon={<MdOutlineSquareFoot />}
                />
                <DetailCard
                  label="Super Built-up Area"
                  value={
                    property.superBuiltupArea
                      ? `${property.superBuiltupArea} ${property.sizeUnit || "sqft"}`
                      : "—"
                  }
                />
                <DetailCard
                  label="Carpet Area"
                  value={
                    property.carpetArea
                      ? `${property.carpetArea} ${property.sizeUnit || "sqft"}`
                      : "—"
                  }
                />
                <DetailCard label="Bedrooms" value={property.bedrooms ? `${property.bedrooms} BHK` : "—"} icon={<MdOutlineBed />} />
                <DetailCard label="Bathrooms" value={property.bathrooms || "—"} icon={<MdOutlineBathtub />} />
                <DetailCard label="Balconies" value={property.balconies || "—"} icon={<MdOutlineBalcony />} />
                <DetailCard label="Parking" value={property.parking || "—"} icon={<MdOutlineLocalParking />} />
                <DetailCard label="Floor No." value={property.floorNo ?? "—"} />
                <DetailCard label="Total Floors" value={property.totalFloors ?? "—"} />
                <DetailCard label="Facing" value={property.facing || "—"} />
                <DetailCard label="Furnishing" value={property.furnishing || "—"} />
                <DetailCard label="Size Unit" value={property.sizeUnit || "sqft"} />
              </div>
            </section>

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<MdOutlineHomeWork size={21} />}
                title="Project Information"
                subtitle="Project, developer and property description."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailCard label="Project Name" value={property.projectName || "—"} />
                <DetailCard label="Developer Name" value={property.developerName || "—"} />
              </div>

              <div className="mt-4 rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                  Description
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {property.description || "Description has not been added yet."}
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<MdOutlineCheckCircle size={21} />}
                title="Amenities & Property Tags"
                subtitle="Features and highlights associated with this listing."
              />

              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                Amenities
              </p>
              {Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border border-[#3ED6AE]/30 bg-[#E9FBF6] px-3 py-1.5 text-xs font-bold text-[#168A70]"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">No amenities selected.</p>
              )}

              <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                Property Tags
              </p>
              {Array.isArray(property.tags) && property.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {property.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#1F4256]/5 px-3 py-1.5 text-xs font-bold text-[#1F4256]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">No tags added.</p>
              )}
            </section>

            {(uploadedVideoUrl || property.videoLink) && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={<MdOutlineVideoLibrary size={21} />}
                  title="Property Video / Walkthrough"
                  subtitle="Play the property video directly inside preview."
                />

                {uploadedVideoUrl && (
                  <div className="overflow-hidden rounded-2xl bg-black">
                    <video
                      src={uploadedVideoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="max-h-[560px] w-full"
                    />
                  </div>
                )}

                {!uploadedVideoUrl && youtubeEmbed && (
                  <div className="aspect-video overflow-hidden rounded-2xl bg-black">
                    <iframe
                      src={youtubeEmbed}
                      title="Property walkthrough"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {!uploadedVideoUrl &&
                  !youtubeEmbed &&
                  isVideoUrl(property.videoLink) && (
                    <video
                      src={property.videoLink}
                      controls
                      playsInline
                      className="max-h-[560px] w-full rounded-2xl bg-black"
                    />
                  )}

                {!uploadedVideoUrl &&
                  !youtubeEmbed &&
                  property.videoLink &&
                  !isVideoUrl(property.videoLink) && (
                    <a
                      href={property.videoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 hover:border-[#3ED6AE]"
                    >
                      <div className="flex items-center gap-3">
                        <FiPlayCircle size={28} className="text-[#168A70]" />
                        <div>
                          <p className="font-bold text-[#1F4256]">Property Video Link</p>
                          <p className="mt-1 max-w-lg truncate text-xs text-slate-400">
                            {property.videoLink}
                          </p>
                        </div>
                      </div>
                      <FiExternalLink className="shrink-0 text-slate-400" />
                    </a>
                  )}
              </section>
            )}

            {(floorPlanUrl || reraUrl) && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={<FiFileText size={19} />}
                  title="Property Documents"
                  subtitle="Download property documents with a clean property and location based file name."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  {floorPlanUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        downloadDocument({
                          url: floorPlanUrl,
                          property,
                          documentType: "Floor_Plan",
                        })
                      }
                      className="group rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1F4256] text-white">
                            {isPdfUrl(floorPlanUrl) ? (
                              <MdOutlinePictureAsPdf size={24} />
                            ) : (
                              <MdOutlineImage size={23} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-[#1F4256]">
                              Floor Plan
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {isPdfUrl(floorPlanUrl)
                                ? "PDF document"
                                : "Property document"}
                            </p>

                            <p className="mt-1 truncate text-[10px] font-semibold text-[#168A70]">
                              {buildDocumentFileName(
                                property,
                                "Floor_Plan",
                                floorPlanUrl,
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9FBF6] text-[#168A70] transition group-hover:bg-[#3ED6AE] group-hover:text-[#17394A]">
                          <FiDownload size={18} />
                        </div>
                      </div>
                    </button>
                  )}

                  {reraUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        downloadDocument({
                          url: reraUrl,
                          property,
                          documentType: "RERA_Certificate",
                        })
                      }
                      className="group rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3ED6AE] text-[#17394A]">
                            {isPdfUrl(reraUrl) ? (
                              <MdOutlinePictureAsPdf size={24} />
                            ) : (
                              <MdOutlineDescription size={23} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-[#1F4256]">
                              RERA Certificate
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {isPdfUrl(reraUrl)
                                ? "PDF document"
                                : "Property document"}
                            </p>

                            <p className="mt-1 truncate text-[10px] font-semibold text-[#168A70]">
                              {buildDocumentFileName(
                                property,
                                "RERA_Certificate",
                                reraUrl,
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9FBF6] text-[#168A70] transition group-hover:bg-[#3ED6AE] group-hover:text-[#17394A]">
                          <FiDownload size={18} />
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-[#DDE7EA] bg-[#F4F7F8] px-4 py-3">
                  <p className="text-xs leading-5 text-slate-500">
                    Document files download directly. The saved file name includes
                    the property name, location and document type for easier
                    identification.
                  </p>
                </div>
              </section>
            )}


            <div className="flex flex-col gap-3 rounded-3xl border border-[#DDE7EA] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <p className="text-sm font-bold text-[#1F4256]">Draft Property Actions</p>
                <p className="mt-1 text-xs text-slate-400">
                  Continue editing or submit this property for review.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={onEdit}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#3ED6AE]/40 bg-[#E9FBF6] px-5 text-sm font-bold text-[#168A70] hover:bg-[#DCF8EF]"
                >
                  <FiEdit3 />
                  Edit Draft
                </button>

                <button
                  type="button"
                  disabled={publishing}
                  onClick={onPublish}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1F4256] px-6 text-sm font-bold text-white hover:bg-[#18394B] disabled:opacity-50"
                >
                  <FiSend />
                  {publishing ? "Publishing..." : "Publish Property"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DraftProperties() {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [publishingId, setPublishingId] = useState(null);

  const loadDrafts = async () => {
    try {
      setLoading(true);
      const response = await getDraftPropertiesApi();
      setDrafts(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Unable to load drafts",
        text:
          error?.response?.data?.message ||
          "Draft properties could not be fetched.",
        confirmButtonColor: "#1F4256",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrafts();
  }, []);

  const filteredDrafts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return drafts;

    return drafts.filter((property) =>
      [
        property?.title,
        property?.propertyId,
        property?.projectName,
        property?.developerName,
        property?.city,
        property?.locality,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [drafts, search]);

  const handlePublish = async (property) => {
    const result = await Swal.fire({
      icon: "question",
      title: "Publish this draft?",
      text: "This property will move from Draft to Submitted and go for review.",
      showCancelButton: true,
      confirmButtonText: "Publish Property",
      cancelButtonText: "Keep Draft",
      confirmButtonColor: "#1F4256",
    });

    if (!result.isConfirmed) return;

    try {
      setPublishingId(property._id);
      const user = getLoggedInUser();
      await publishDraftPropertyApi(property._id, user || {});
      setDrafts((prev) => prev.filter((item) => item._id !== property._id));
      setSelectedProperty(null);

      await Swal.fire({
        icon: "success",
        title: "Property Submitted",
        text: "Draft has been submitted successfully.",
        confirmButtonColor: "#1F4256",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Publish Failed",
        text:
          error?.response?.data?.message ||
          error?.response?.data?.errors?.join?.(", ") ||
          "Please complete all required fields before publishing.",
        confirmButtonColor: "#1F4256",
      });
    } finally {
      setPublishingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F8] text-slate-800">
      <div className="mx-auto max-w-[1500px] px-1 pt-1 sm:px-1 lg:px-1">
        <div className="relative overflow-hidden rounded-[22px] bg-[#1F4256] px-6 py-7 text-white shadow-[0_10px_30px_rgba(31,66,86,0.12)] sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-56 w-56 rounded-full bg-[#3ED6AE]/10" />
          <div className="pointer-events-none absolute right-24 top-5 h-44 w-44 rounded-full bg-white/[0.04]" />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3ED6AE] text-white">
                <MdOutlineDrafts size={25} />
              </div>
              <div>
                {/* <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9BD8E5]">
                  DIGINIWAS ADMIN
                </p> */}
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-[26px]">
                  Draft Properties
                </h1>
                <p className="mt-1 text-xs text-[#D5E6EC]">
                  Preview, edit and publish your saved property drafts
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-[#3ED6AE]" />
                <div>
                  <p className="text-[9px] font-bold uppercase text-white/50">CURRENT VIEW</p>
                  <p className="text-xs font-semibold">Draft Management</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/add-property")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#3ED6AE] px-5 text-sm font-bold text-[#17394A] transition hover:bg-[#55DFBC]"
              >
                <FiPlus /> Add New Property
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-1 lg:px-1">
        <div className="mb-6 grid gap-4 lg:grid-cols-[240px_1fr_auto]">
          <div className="rounded-[18px] bg-[#1F4256] p-5 text-white shadow-[0_6px_18px_rgba(31,66,86,0.10)]">
            <p className="text-xs font-semibold text-[#DDF8F1]">TOTAL DRAFTS</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-4xl font-bold">{drafts.length}</span>
              <MdOutlineDrafts size={34} className="text-[#79E7CE]" />
            </div>
          </div>

          <div className="flex h-14 items-center rounded-[18px] border border-[#DDE7EA] bg-white px-4 shadow-[0_4px_14px_rgba(31,66,86,0.04)]">
            <FiSearch className="mr-3 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, property ID, city, locality..."
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={loadDrafts}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-[18px] border border-[#DDE7EA] bg-white px-5 text-sm font-semibold text-[#526E7C] shadow-[0_4px_14px_rgba(31,66,86,0.04)] hover:bg-[#F7FAFB]"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="h-52 animate-pulse bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                  <div className="h-11 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredDrafts.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9FBF6]">
              <MdOutlineDrafts size={32} className="text-[#27C9A4]" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No draft properties</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Properties saved with Save Draft will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredDrafts.map((property) => (
              <article
                key={property._id}
                className="group overflow-hidden rounded-[20px] border border-[#E1EAED] bg-white shadow-[0_4px_18px_rgba(31,66,86,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(31,66,86,0.12)]"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={getImage(property)}
                    alt={property.title || "Draft property"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#FFF5DB] px-3 py-1.5 text-xs font-bold text-[#9B6B00] shadow-sm">
                    Draft
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs text-white/75">
                      {property.propertyId || "Draft listing"}
                    </p>
                    <h3 className="mt-1 line-clamp-1 text-lg font-bold">
                      {property.title || "Untitled Property"}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
                    <MdOutlineLocationOn size={18} />
                    <span className="line-clamp-1">
                      {[property.locality, property.city].filter(Boolean).join(", ") ||
                        "Location not added"}
                    </span>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-[#1F4256]">
                      {formatPrice(property.price)}
                    </p>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {property.category || "Category pending"}
                    </span>
                  </div>

                  <div className="mb-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-[#F7FAFB] p-2.5 text-center">
                      <MdOutlineBed className="mx-auto text-slate-400" />
                      <p className="mt-1 text-xs font-semibold">{property.bedrooms || "—"} BHK</p>
                    </div>
                    <div className="rounded-xl bg-[#F7FAFB] p-2.5 text-center">
                      <MdOutlineBathtub className="mx-auto text-slate-400" />
                      <p className="mt-1 text-xs font-semibold">{property.bathrooms || "—"} Bath</p>
                    </div>
                    <div className="rounded-xl bg-[#F7FAFB] p-2.5 text-center">
                      <MdOutlineSquareFoot className="mx-auto text-slate-400" />
                      <p className="mt-1 text-xs font-semibold">
                        {property.propertySize || "—"} {property.sizeUnit || "sqft"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-[#F7FAFB]"
                    >
                      <FiEye /> Preview
                    </button>
                    <button
                      onClick={() => navigate(`/add-property?edit=${property._id}${property.sourceModel ? `&source=${property.sourceModel}` : ""}`)}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#3ED6AE]/40 bg-[#E9FBF6] text-xs font-semibold text-[#168A70] hover:bg-[#DCF8EF]"
                    >
                      <FiEdit3 /> Edit
                    </button>
                    <button
                      disabled={publishingId === property._id}
                      onClick={() => handlePublish(property)}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#1F4256] text-xs font-bold text-white hover:bg-[#18394B] disabled:opacity-50"
                    >
                      <FiSend /> {publishingId === property._id ? "..." : "Publish"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {selectedProperty && (
        <FullPropertyPreview
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onEdit={() =>
            navigate(`/add-property?edit=${selectedProperty._id}${selectedProperty.sourceModel ? `&source=${selectedProperty.sourceModel}` : ""}`)
          }
          onPublish={() => handlePublish(selectedProperty)}
          publishing={publishingId === selectedProperty._id}
        />
      )}
    </div>
  );
}

