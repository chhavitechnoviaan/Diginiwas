import { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiEye,
  FiHome,
  FiImage,
  FiMapPin,
  FiSave,
  FiX,
  FiTrash2,
  FiFileText,
  FiVideo,
  FiUpload,
} from "react-icons/fi";
import Swal from "sweetalert2";
import MapPicker from "../../../components/MapPicker";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import {
  createResidentialSalePropertyApi,
  createCommercialSalePropertyApi,
  getResidentialSalePropertyByIdApi,
  getCommercialSalePropertyByIdApi,
  updateResidentialSalePropertyApi,
  updateCommercialSalePropertyApi,
} from "../../../Services/propertyService";

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
const BHK = [
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
const AREAS = [
  "Built-up Area",
  "Super Built-up Area",
  "Carpet Area",
  "Saleable Area",
  "Plot Area",
];
const UNITS = ["Sq. Ft.", "Sq. Meter", "Sq. Yard", "Acre", "Hectare"];
const PRICE_UNITS = ["Total Price", "Price Per Sq. Ft."];
const POSSESSION = ["Ready To Move", "Under Construction"];
const FURNISHING = ["Furnished", "Semi-Furnished", "Unfurnished"];
const FURNISHING_ITEMS = [
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
];

const AGE = ["Never Occupied", "0-1", "2-4", "5-7", "8-10", "10+"];
const TRANSACTIONS = ["Resale", "New Booking"];
const OWNERSHIP = ["Free Hold", "Leasehold", "Power of Attorney"];
const OFFICE = ["Semi-Fitted", "Fitted Space", "Shell and Core"];
const PANTRY = ["Wet", "Dry", "None"];
const FACINGS = [
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
  "Shopping Complex",
  "Central Park",
];
const RESIDENTIAL_HIGHLIGHTS = [
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

const COMMERCIAL_HIGHLIGHTS = [
  "Premium Location",
  "Corner Unit",
  "Vastu Compliant",
  "Low Density Project",
  "Quiet/Low Traffic Area",
  "Wheelchair Accessible",
  "Never Occupied",
];

const initial = {
  title: "",
  transactionType: "Resale",
  category: "Sell",
  buildingType: "Residential",
  propertyType: "",
  city: "",
  state: "",
  country: "India",
  locality: "",
  society: "",
  address: "",
  pinCode: "",
  latitude: "",
  longitude: "",
  priceAmount: "",
  priceUnit: "Total Price",
  pricePerSqFt: "",
  negotiable: false,
  bhk: "",
  areaValue: "",
  areaType: "Built-up Area",
  areaUnit: "Sq. Ft.",
  additionalSpaces: [],
  possessionStatus: "Ready To Move",
  availability: "Immediately",
  availableDate: "",
  furnishingStatus: "Unfurnished",
  furnishingItems: [],
  ageOfProperty: "",
  ownershipType: "Free Hold",
  bathrooms: 0,
  coveredParking: 0,
  openParking: 0,
  balconies: 0,
  powerBackup: false,
  liftAvailable: false,
  waterSources: [],
  locationAdvantages: [],
  facing: "",
  view: "",
  flooring: "",
  roadWidth: "",
  roadUnit: "Feet",
  totalFloors: "",
  propertyFloor: "",
  towerBlock: "",
  unitNo: "",
  keepUnitNoPrivate: false,
  officeSpaceType: [],
  pantry: "None",
  personalWashroom: false,
  companyLease: false,
  rentAmount: "",
  rentFrequency: "Per Month",
  rentNegotiable: false,
  maintenanceAmount: "",
  maintenanceFrequency: "Monthly",
  includedInRent: false,
  depositType: "Zero Deposit",
  depositAmount: "",
  depositDescription: "",
  amenities: [],
  highlights: [],
  priceAdvantages: [],
  oneLineDescription: "",
  description: "",
  images: "",
  videoLink: "",
  status: "Draft",
};

const input =
  "h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] px-3.5 text-sm text-[#1F4256] outline-none transition focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";
const textarea =
  "w-full min-h-28 rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] px-3.5 py-3 text-sm text-[#1F4256] outline-none transition focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#526E7C]">
        {label}
        {required && <b className="ml-1 text-rose-500">*</b>}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-[11px] font-bold text-rose-500">
          {error}
        </span>
      )}
    </label>
  );
}
function Select({ value, onChange, options, placeholder = "Select" }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={`${input} appearance-none`}
    >
      <option value="">{placeholder}</option>
      {options.map((x) => (
        <option key={x}>{x}</option>
      ))}
    </select>
  );
}
function ToggleGrid({ values, selected, onToggle }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((v) => {
        const active = selected.includes(v);
        return (
          <button
            type="button"
            key={v}
            onClick={() => onToggle(v)}
            className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${active ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#E1EAED] bg-white text-[#526E7C] hover:border-[#BFDAD4]"}`}
          >
            {active ? "✓ " : ""}
            {v}
          </button>
        );
      })}
    </div>
  );
}
function ChoiceButtons({ value, options, onChange }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-extrabold transition ${
              active
                ? "border-[#1F4256] bg-[#1F4256] text-white shadow-sm"
                : "border-[#DCE7EA] bg-white text-[#526E7C] hover:border-[#3ED6AE] hover:bg-[#F8FFFC]"
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span>{option}</span>
              {active && <span className="text-[#3ED6AE]">✓</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Card({ title, note, children }) {
  return (
    <section className="rounded-[24px] border border-[#E4EDEF] bg-white p-5 shadow-[0_8px_30px_rgba(31,66,86,.06)] sm:p-7">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-black text-[#1F4256]">{title}</h2>
        {note && <p className="mt-1 text-xs text-slate-400">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function DetailCardPreview({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-[#1F4256]">{value === "" || value === null || value === undefined ? "—" : String(value)}</p>
    </div>
  );
}

function SectionTitlePreview({ title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-[#3ED6AE]" />
      <h3 className="text-lg font-black text-[#1F4256]">{title}</h3>
    </div>
  );
}

function PreviewPills({ title, items, highlight = false }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${highlight ? "border-[#3ED6AE]/50 bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] bg-white text-[#425A70]"}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MapPreview({ form }) {
  const latitude = Number(form.latitude);
  const longitude = Number(form.longitude);
  return (
    <MapContainer center={[latitude, longitude]} zoom={15} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
      <MapPreviewFix />
      <TileLayer attribution="© OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
}

function MapPreviewFix() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 120);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function SalePropertyForm({ onChangeListingType }) {
  const queryParams = new URLSearchParams(window.location.search);
  const editId = queryParams.get("edit");
  const sourceModel = queryParams.get("source");
  const [draftId, setDraftId] = useState(editId || null);
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [images, setImages] = useState([]);
  const [floorPlan, setFloorPlan] = useState(null);
  const [reraCertificate, setReraCertificate] = useState(null);
  const [otherDocuments, setOtherDocuments] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const isResidential = form.buildingType === "Residential";
  const isCommercial = form.buildingType === "Commercial";
  const propertyTypes = isResidential ? RESIDENTIAL_TYPES : COMMERCIAL_TYPES;
  const highlightOptions = isResidential ? RESIDENTIAL_HIGHLIGHTS : COMMERCIAL_HIGHLIGHTS;
  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const toggle = (key, value) =>
    setForm((p) => ({
      ...p,
      [key]: p[key].includes(value)
        ? p[key].filter((x) => x !== value)
        : [...p[key], value],
    }));

  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const api =
          sourceModel === "CommercialSaleProperty"
            ? getCommercialSalePropertyByIdApi
            : sourceModel === "ResidentialSaleProperty"
              ? getResidentialSalePropertyByIdApi
              : isResidential
                ? getResidentialSalePropertyByIdApi
                : getCommercialSalePropertyByIdApi;
        const response = await api(editId);
        const p = response?.data || response?.property || response;
        const modelBuilding =
          p.buildingType ||
          (p.category === "Commercial" ? "Commercial" : "Residential");
        setForm({
          ...initial,
          title: p.title || "",
          transactionType: p.transactionType || "Resale",
          category: p.category || "Sell",
          buildingType: modelBuilding,
          propertyType: p.propertyType || "",
          city: p.location?.city || "",
          state: p.location?.state || "",
          country: p.location?.country || "India",
          locality: p.location?.locality || "",
          society: p.location?.society || "",
          address: p.location?.address || "",
          pinCode: p.location?.pinCode || "",
          latitude: p.location?.latitude ?? "",
          longitude: p.location?.longitude ?? "",
          priceAmount: p.price?.amount ?? "",
          priceUnit: p.price?.unit || "Total Price",
          pricePerSqFt: p.price?.pricePerSqFt ?? "",
          negotiable: Boolean(p.price?.negotiable),
          bhk: p.bhk || "",
          areaValue: p.areaDetails?.[0]?.value ?? "",
          areaType: p.areaDetails?.[0]?.type || "Built-up Area",
          areaUnit: p.areaDetails?.[0]?.unit || "Sq. Ft.",
          additionalSpaces: p.additionalSpaces || [],
          possessionStatus: p.possessionStatus || "Ready To Move",
          availability: p.availability?.availableFrom || "Immediately",
          availableDate: p.availability?.availableDate
            ? new Date(p.availability.availableDate).toISOString().slice(0, 10)
            : "",
          furnishingStatus: p.furnishing?.status || "Unfurnished",
          furnishingItems: (p.furnishing?.items || [])
            .map((x) => (typeof x === "string" ? x : x?.name))
            .filter(Boolean),
          ageOfProperty: p.ageOfProperty || "",
          ownershipType: p.ownershipType || "Free Hold",
          bathrooms: p.specifications?.bathrooms ?? 0,
          coveredParking: p.specifications?.coveredParking ?? 0,
          openParking: p.specifications?.openParking ?? 0,
          balconies: p.specifications?.balconies ?? 0,
          powerBackup: Boolean(p.specifications?.powerBackup),
          liftAvailable: Boolean(p.specifications?.liftAvailable),
          waterSources: p.specifications?.waterSources || [],
          locationAdvantages: p.specifications?.locationAdvantages || [],
          facing: p.specifications?.facing || "",
          view: p.specifications?.view || "",
          flooring: p.specifications?.flooring || "",
          roadWidth: p.specifications?.connectingRoadWidth?.value ?? "",
          roadUnit: p.specifications?.connectingRoadWidth?.unit || "Feet",
          totalFloors: p.specifications?.totalFloorCount ?? "",
          propertyFloor: p.specifications?.propertyFloor ?? "",
          towerBlock: p.specifications?.towerBlock || "",
          unitNo: p.specifications?.unitNo || "",
          keepUnitNoPrivate: Boolean(p.specifications?.keepUnitNoPrivate),
          officeSpaceType: p.workspaceFacilities?.officeSpaceType || [],
          pantry: p.workspaceFacilities?.pantry || "None",
          personalWashroom: Boolean(p.workspaceFacilities?.personalWashroom),
          companyLease: Boolean(p.companyLease),
          rentAmount: p.rent?.amount ?? "",
          rentFrequency: p.rent?.frequency || "Per Month",
          rentNegotiable: Boolean(p.rent?.negotiable),
          maintenanceAmount: p.maintenance?.amount ?? "",
          maintenanceFrequency: p.maintenance?.frequency || "Monthly",
          includedInRent: Boolean(p.maintenance?.includedInRent),
          depositType: p.securityDeposit?.type || "Zero Deposit",
          depositAmount: p.securityDeposit?.amount ?? "",
          depositDescription: p.securityDeposit?.description || "",
          amenities: p.amenities || [],
          highlights: p.propertyHighlights || [],
          priceAdvantages: p.priceAdvantages || [],
          oneLineDescription: p.oneLineDescription || "",
          description: p.description || "",
          images: "",
          videoLink:
            p.videoLink ||
            p.video ||
            p.media?.videos?.[0]?.url ||
            "",
          status: p.status || "Draft",
        });

        const existingVideoUrl =
          p.videoLink ||
          p.video ||
          p.media?.videos?.[0]?.url ||
          "";
        setVideo(null);
        setVideoPreview(existingVideoUrl);

        setImages(
          (p.media?.images || p.images || [])
            .filter((x) => typeof x === "string" || x?.url)
            .map((x, index) => {
              const item = typeof x === "string" ? { url: x } : x;
              return {
                url: item.url || item.secure_url || "",
                preview: item.url || item.secure_url || "",
                publicId: item.publicId || item.public_id || null,
                category: item.category || "Other",
                isCover: item.isCover ?? index === 0,
                caption: item.caption || "",
              };
            })
            .filter((x) => x.url)
        );
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Could not load property",
          text: e?.response?.data?.message || e.message,
        });
      }
    })();
  }, [editId]);

  useEffect(() => {
    return () => {
      if (videoPreview && video) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview, video]);

  const applyAddress = (address, displayName = "") =>
    setForm((p) => ({
      ...p,
      city:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        p.city,
      state: address.state || p.state,
      country: address.country || p.country || "India",
      locality:
        address.suburb ||
        address.neighbourhood ||
        address.city_district ||
        address.village ||
        address.postcode ||
        p.locality,
      pinCode: address.postcode?.replace(/\D/g, "").slice(0, 6) || p.pinCode,
      address: displayName || p.address,
    }));

  const reverseGeocode = async (lat, lng) => {
    try {
      setLocationLoading(true);
      setLocationMessage("");
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lng}`,
      );
      if (!res.ok) throw new Error("Location service unavailable");
      const data = await res.json();
      applyAddress(data.address || {}, data.display_name || "");
      setLocationMessage("Map location selected and address filled.");
    } catch (e) {
      setLocationMessage(e.message || "Address could not be fetched.");
    } finally {
      setLocationLoading(false);
    }
  };

  const lookupPin = async (pin = form.pinCode) => {
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setErrors((e) => ({ ...e, pinCode: "Enter a valid 6 digit PIN code." }));
      return;
    }
    try {
      setLocationLoading(true);
      setLocationMessage("");
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!res.ok) throw new Error("PIN service unavailable");
      const data = await res.json();
      const office = data?.[0]?.PostOffice?.[0];
      if (!office) throw new Error("No location found for this PIN code");
      const city = office.District || office.Block || office.Name || "";
      const state = office.State || "";
      const country = office.Country || "India";
      const locality = office.Name || office.Block || city;
      setForm((p) => ({
        ...p,
        pinCode: pin,
        city,
        state,
        country,
        locality: p.locality || locality,
      }));
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&country=India&postalcode=${encodeURIComponent(pin)}`,
      );
      const geo = geoRes.ok ? (await geoRes.json())?.[0] : null;
      if (geo?.lat && geo?.lon)
        setForm((p) => ({
          ...p,
          latitude: Number(geo.lat).toFixed(6),
          longitude: Number(geo.lon).toFixed(6),
        }));
      setErrors((e) => ({ ...e, pinCode: "" }));
      setLocationMessage(`PIN verified: ${city}, ${state}.`);
    } catch (e) {
      setErrors((er) => ({ ...er, pinCode: e.message }));
      setLocationMessage(e.message);
    } finally {
      setLocationLoading(false);
    }
  };

  // const validate = () => {
  //   const e = {};

  //   if (step === 0) {
  //     if (!form.category) e.category = "Category is required";
  //     if (!form.buildingType) e.buildingType = "Select building type";
  //     if (!form.title.trim()) e.title = "Property title is required";
  //     if (!form.transactionType) e.transactionType = "Select transaction type";
  //     if (!form.propertyType) e.propertyType = "Select property type";
  //     if (!form.city.trim()) e.city = "City is required";
  //     if (!form.state.trim()) e.state = "State is required";
  //     if (!form.country.trim()) e.country = "Country is required";
  //     if (!form.locality.trim()) e.locality = "Locality is required";
  //     if (!/^[1-9]\d{5}$/.test(form.pinCode))
  //       e.pinCode = "Enter a valid 6 digit PIN code";
  //     if (!(Number(form.priceAmount) > 0)) e.price = "Enter a valid sale price";
  //     if (!form.priceUnit) e.priceUnit = "Select price unit";
  //     if (!(Number(form.areaValue) > 0)) e.area = "Enter a valid area";
  //     if (!form.areaType) e.areaType = "Select area type";
  //     if (!form.areaUnit) e.areaUnit = "Select area unit";
  //   }

  //   if (step === 1) {
  //     if (!form.availability) e.availability = "Select availability";
  //     if (form.availability === "Later" && !form.availableDate)
  //       e.availableDate = "Select an available date";
  //     if (!form.possessionStatus) e.possession = "Select possession status";
  //     if (!form.furnishingStatus) e.furnishing = "Select furnishing status";
  //     if (!form.ownershipType) e.ownership = "Select ownership type";

  //     if (isResidential && !form.bhk) e.bhk = "Select BHK";

  //     if (isCommercial) {
  //       if (!form.pantry) e.pantry = "Select pantry type";
  //     }

  //     if (form.bathrooms === "" || Number(form.bathrooms) < 0)
  //       e.bathrooms = "Enter a valid bathroom count";
  //     if (form.coveredParking === "" || Number(form.coveredParking) < 0)
  //       e.coveredParking = "Enter a valid covered parking count";
  //     if (form.openParking === "" || Number(form.openParking) < 0)
  //       e.openParking = "Enter a valid open parking count";
  //     if (form.balconies === "" || Number(form.balconies) < 0)
  //       e.balconies = "Enter a valid balcony count";
  //   }

  //   if (step === 2) {
  //     if (!images.length) e.images = "At least one property image is required";
  //     else if (images.filter((x) => x.isCover).length !== 1)
  //       e.images = "Select exactly one cover image";

  //     if (!form.oneLineDescription.trim())
  //       e.oneLine = "One-line description is required";
  //     if (form.description.trim().length < 25)
  //       e.description = "Minimum 25 characters required";

  //     if (form.videoLink.trim()) {
  //       try {
  //         new URL(form.videoLink.trim());
  //       } catch {
  //         e.videoLink = "Enter a valid video URL";
  //       }
  //     }
  //   }

  //   setErrors(e);

  //   if (Object.keys(e).length) {
  //     const firstMessage = Object.values(e)[0];
  //     Swal.fire({
  //       toast: true,
  //       position: "top-end",
  //       icon: "warning",
  //       title: "Please complete this step",
  //       text: firstMessage,
  //       showConfirmButton: false,
  //       timer: 2400,
  //     });
  //   }

  //   return Object.keys(e).length === 0;
  // };

  const validate = () => {
  const e = {};

  /* =========================================================
     STEP 0 — BASIC DETAILS
     BHK IS NOT VALIDATED HERE
  ========================================================= */
  if (step === 0) {
    if (!form.category) {
      e.category = "Category is required";
    }

    if (!form.buildingType) {
      e.buildingType = "Select building type";
    }

    if (!form.title?.trim()) {
      e.title = "Property title is required";
    }

    if (!form.transactionType) {
      e.transactionType = "Select transaction type";
    }

    if (!form.propertyType) {
      e.propertyType = "Select property type";
    }

    if (!form.city?.trim()) {
      e.city = "City is required";
    }

    if (!form.state?.trim()) {
      e.state = "State is required";
    }

    if (!form.country?.trim()) {
      e.country = "Country is required";
    }

    if (!form.locality?.trim()) {
      e.locality = "Locality is required";
    }

    if (!/^[1-9]\d{5}$/.test(form.pinCode || "")) {
      e.pinCode = "Enter a valid 6 digit PIN code";
    }

    if (!(Number(form.priceAmount) > 0)) {
      e.price = "Enter a valid sale price";
    }

    if (!form.priceUnit) {
      e.priceUnit = "Select price unit";
    }

    if (!(Number(form.areaValue) > 0)) {
      e.area = "Enter a valid area";
    }

    if (!form.areaType) {
      e.areaType = "Select area type";
    }

    if (!form.areaUnit) {
      e.areaUnit = "Select area unit";
    }
  }

  /* =========================================================
     STEP 1 — PROPERTY DETAILS
     BHK IS VALIDATED ONLY HERE
  ========================================================= */
  if (step === 1) {
    if (isResidential) {
      if (!form.availability) {
        e.availability = "Select availability";
      }

      if (
        form.availability === "Later" &&
        !form.availableDate
      ) {
        e.availableDate =
          "Select an available date";
      }
    }

    if (!form.possessionStatus) {
      e.possession =
        "Select possession status";
    }

    if (!form.furnishingStatus) {
      e.furnishing =
        "Select furnishing status";
    }

    if (!form.ownershipType) {
      e.ownership =
        "Select ownership type";
    }

    /* -----------------------------------------
       BHK ONLY FOR RESIDENTIAL
       This will run on Step 1 only.
    ----------------------------------------- */
    if (
      isResidential &&
      !String(form.bhk || "").trim()
    ) {
      e.bhk = "Select BHK";
    }

    /* -----------------------------------------
       COMMERCIAL ONLY
    ----------------------------------------- */
    if (isCommercial) {
      if (!form.pantry) {
        e.pantry =
          "Select pantry type";
      }
    }

    /* -----------------------------------------
       COUNTS
    ----------------------------------------- */

    if (
      form.bathrooms === "" ||
      Number(form.bathrooms) < 0
    ) {
      e.bathrooms =
        "Enter a valid bathroom count";
    }

    if (
      form.coveredParking === "" ||
      Number(form.coveredParking) < 0
    ) {
      e.coveredParking =
        "Enter a valid covered parking count";
    }

    if (
      form.openParking === "" ||
      Number(form.openParking) < 0
    ) {
      e.openParking =
        "Enter a valid open parking count";
    }

    if (
      form.balconies === "" ||
      Number(form.balconies) < 0
    ) {
      e.balconies =
        "Enter a valid balcony count";
    }
  }

  /* =========================================================
     STEP 2 — MEDIA & PUBLISH
  ========================================================= */
  if (step === 2) {
    if (!images.length) {
      e.images =
        "At least one property image is required";
    } else if (
      images.filter((x) => x.isCover).length !== 1
    ) {
      e.images =
        "Select exactly one cover image";
    }

    if (!form.oneLineDescription?.trim()) {
      e.oneLine =
        "One-line description is required";
    }

    if (
      form.description?.trim().length < 25
    ) {
      e.description =
        "Minimum 25 characters required";
    }

    if (!video && form.videoLink?.trim()) {
      try {
        new URL(form.videoLink.trim());
      } catch {
        e.videoLink =
          "Existing video URL is invalid";
      }
    }
  }

  /* =========================================================
     SET ERRORS
  ========================================================= */

  setErrors(e);

  /* =========================================================
     SHOW FIRST ERROR
  ========================================================= */

  if (Object.keys(e).length > 0) {
    const firstMessage =
      Object.values(e)[0];

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please complete this step",
      text: firstMessage,
      showConfirmButton: false,
      timer: 2400,
    });
  }

  return Object.keys(e).length === 0;
};

  const draftDescription = () =>
    form.description.trim().length >= 25
      ? form.description.trim()
      : "Draft property - details pending. Please complete the description before publishing.";
  const draftOneLine = () =>
    form.oneLineDescription.trim() || "Draft sale property - details pending";

  const payload = (status = "Draft") => ({
    sourceModel: isResidential
      ? "ResidentialSaleProperty"
      : "CommercialSaleProperty",
    listingType: "Sell",
    transactionType: form.transactionType,
    category: "Sell",
    buildingType: form.buildingType,
    title: form.title || "Draft sale property",
    propertyType:
      form.propertyType || (isResidential ? "Apartment" : "Office Space"),
    location: {
      city: form.city || "Not specified",
      state: form.state || "",
      country: form.country || "India",
      locality: form.locality || "Not specified",
      society: form.society || "",
      address: form.address || "",
      pinCode: form.pinCode || null,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      isLocationConfirmed: Boolean(form.latitude && form.longitude),
    },
    price: {
      amount: Number(form.priceAmount || 1),
      unit: form.priceUnit,
      pricePerSqFt: form.pricePerSqFt ? Number(form.pricePerSqFt) : null,
      negotiable: Boolean(form.negotiable),
    },
    priceAdvantages: form.priceAdvantages,
    ...(isCommercial
      ? {
          companyLease: Boolean(form.companyLease),
          rent: {
            amount: Number(form.rentAmount || 0),
            frequency: form.rentFrequency,
            negotiable: Boolean(form.rentNegotiable),
          },
          maintenance: {
            amount: Number(form.maintenanceAmount || 0),
            frequency: form.maintenanceFrequency,
            includedInRent: Boolean(form.includedInRent),
          },
          securityDeposit: {
            type: form.depositType,
            amount: Number(form.depositAmount || 0),
            description: form.depositDescription || "",
          },
        }
      : {}),
    areaDetails: [
      {
        value: Number(form.areaValue || 1),
        type: form.areaType,
        unit: form.areaUnit,
        display: true,
      },
    ],
    ...(isResidential
      ? {
          availability: {
            availableFrom: form.availability || "Immediately",
            availableDate:
              form.availability === "Later" && form.availableDate
                ? new Date(form.availableDate)
                : null,
          },
        }
      : {}),
    possessionStatus: form.possessionStatus || "Ready To Move",
    furnishing: {
      status: form.furnishingStatus || "Unfurnished",
      count: form.furnishingItems.length,
      items: form.furnishingItems.map((name) => ({ name, quantity: 1 })),
    },
    ageOfProperty: form.ageOfProperty || null,
    ownershipType: form.ownershipType || "Free Hold",
    specifications: {
      bathrooms: Number(form.bathrooms || 0),
      coveredParking: Number(form.coveredParking || 0),
      openParking: Number(form.openParking || 0),
      powerBackup: Boolean(form.powerBackup),
      waterSources: form.waterSources,
      liftAvailable: Boolean(form.liftAvailable),
      locationAdvantages: form.locationAdvantages,
      balconies: Number(form.balconies || 0),
      facing: form.facing || null,
      view: form.view || null,
      flooring: form.flooring || null,
      connectingRoadWidth: {
        value: form.roadWidth ? Number(form.roadWidth) : null,
        unit: form.roadUnit,
      },
      totalFloorCount: form.totalFloors ? Number(form.totalFloors) : null,
      propertyFloor:
        form.propertyFloor !== "" ? Number(form.propertyFloor) : null,
      towerBlock: form.towerBlock || "",
      unitNo: form.unitNo || "",
      keepUnitNoPrivate: Boolean(form.keepUnitNoPrivate),
    },
    amenities: form.amenities,
    propertyHighlights: form.highlights,
    oneLineDescription:
      status === "Draft" ? draftOneLine() : form.oneLineDescription.trim(),
    description:
      status === "Draft" ? draftDescription() : form.description.trim(),
    status,
    media: {
      images: images
        .filter((x) => !x.file)
        .map((x) => ({
          url: x.url || x.preview,
          publicId: x.publicId || null,
          category: x.category || "Other",
          isCover: Boolean(x.isCover),
          caption: x.caption || "",
        })),
      videos: form.videoLink
        ? [{ url: form.videoLink, title: "Property tour" }]
        : [],
    },
    // ...(isResidential
    //   ? { bhk: form.bhk, additionalSpaces: form.additionalSpaces }
    //   : {
    //       workspaceFacilities: {
    //         officeSpaceType: form.officeSpaceType,
    //         pantry: form.pantry,
    //         personalWashroom: Boolean(form.personalWashroom),
    //         coveredParking: Number(form.coveredParking || 0),
    //         openParking: Number(form.openParking || 0),
    //         powerBackup: Boolean(form.powerBackup),
    //         liftAvailable: Boolean(form.liftAvailable),
    //       },
    //     }),
    ...(isResidential
  ? {
      ...(String(form.bhk || "").trim()
        ? {
            bhk: String(form.bhk).trim(),
          }
        : {}),
      additionalSpaces:
        form.additionalSpaces || [],
    }
  : {
      workspaceFacilities: {
        officeSpaceType:
          form.officeSpaceType,
        pantry: form.pantry,
        personalWashroom:
          Boolean(form.personalWashroom),
        coveredParking:
          Number(form.coveredParking || 0),
        openParking:
          Number(form.openParking || 0),
        powerBackup:
          Boolean(form.powerBackup),
        liftAvailable:
          Boolean(form.liftAvailable),
      },
    }),
  });

  const buildFormData = (status = "Draft") => {
    const body = new FormData();
    body.append(
      "data",
      JSON.stringify({
        ...payload(status),
        imageMeta: images.map((x) => ({
          category: x.category || "Other",
          isCover: Boolean(x.isCover),
          caption: x.caption || "",
        })),
      }),
    );
    body.append(
      "existingImages",
      JSON.stringify(
        images
          .filter((x) => !x.file)
          .map((x) => ({
            url: x.url || x.preview,
            publicId: x.publicId || null,
            category: x.category || "Other",
            isCover: Boolean(x.isCover),
            caption: x.caption || "",
          })),
      ),
    );
    images.forEach((x) => {
      if (x.file) body.append("images", x.file);
    });
    if (video) {
      body.append("video", video);
    } else if (form.videoLink.trim()) {
      // Keep an existing/legacy Cloudinary URL when editing without a replacement file.
      body.append("videoUrl", form.videoLink.trim());
    }
    if (floorPlan) body.append("floorPlan", floorPlan);
    if (reraCertificate) body.append("reraCertificate", reraCertificate);
    otherDocuments.forEach((x) => body.append("documents", x.file));
    return body;
  };

  const saveDraft = async () => {
    try {
      setSaving(true);
      const createApi = isResidential
        ? createResidentialSalePropertyApi
        : createCommercialSalePropertyApi;
      const updateApi = isResidential
        ? updateResidentialSalePropertyApi
        : updateCommercialSalePropertyApi;
      const result = draftId
        ? await updateApi(draftId, buildFormData("Draft"))
        : await createApi(buildFormData("Draft"));
      const saved = result?.data || result?.property || result;
      if (!draftId && saved?._id) setDraftId(saved._id);
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Draft saved",
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    } catch (e) {
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Unable to save draft",
        text: e?.response?.data?.message || e.message,
        showConfirmButton: false,
        timer: 2600,
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const submit = async () => {
    if (!validate()) return;
    try {
      setSaving(true);
      const createApi = isResidential
        ? createResidentialSalePropertyApi
        : createCommercialSalePropertyApi;
      const updateApi = isResidential
        ? updateResidentialSalePropertyApi
        : updateCommercialSalePropertyApi;
      const result = draftId
        ? await updateApi(draftId, buildFormData("Submitted"))
        : await createApi(buildFormData("Submitted"));
      await Swal.fire({
        icon: "success",
        title: "Property submitted successfully",
        text: `${result?.data?.propertyId || "Property"} has been submitted for review.`,
        confirmButtonColor: "#1F4256",
      });
      setForm(initial);
      setImages([]);
      setFloorPlan(null);
      setReraCertificate(null);
      setOtherDocuments([]);
      setVideo(null);
      setVideoPreview("");
      setDraftId(null);
      setStep(0);
      setCompletedSteps([]);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: e?.response?.data?.message || e.message,
        confirmButtonColor: "#1F4256",
      });
    } finally {
      setSaving(false);
    }
  };
  const save = async (status = "Draft") => {
    if (status === "Submitted") return submit();

    return saveDraft();
  };

  // const goNext = async () => {
  //   if (!validate()) return;
  //   const ok = await saveDraft();
  //   if (!ok) return;
  const goNext = async () => {
  if (!validate()) return;

  const ok = await saveDraft();
  if (!ok) return;
    setCompletedSteps((prev) => (prev.includes(step) ? prev : [...prev, step]));
    setStep((s) => Math.min(steps.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const chooseImages = (e) => {
    const files = [...(e.target.files || [])];
    const rem = Math.max(0, 25 - images.length);
    const selected = files.slice(0, rem).map((file, i) => ({
      file,
      preview: URL.createObjectURL(file),
      category: images.length + i === 0 ? "Exterior View" : "Other",
      isCover: images.length + i === 0,
    }));
    setImages((p) => [...p, ...selected].slice(0, 25));
    e.target.value = "";
  };
  const chooseDocs = (e) => {
    const files = [...(e.target.files || [])].slice(
      0,
      Math.max(0, 3 - otherDocuments.length),
    );
    setOtherDocuments((p) =>
      [...p, ...files.map((file) => ({ file }))].slice(0, 3),
    );
    e.target.value = "";
  };

  const preview = () => setPreviewOpen(true);
  const steps = [
    {
      name: "Property Snapshot",
      hint: "Type, location & pricing",
      icon: FiHome,
    },
    {
      name: "Property Details",
      hint: "Specifications & ownership",
      icon: FiMapPin,
    },
    { name: "Media & Publish", hint: "Story, images & actions", icon: FiImage },
  ];

  return (
    <div className="min-h-screen bg-[#F3F7F8] pb-8">
      <div className="px-4 pt-4 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[24px] bg-[#1F4256] px-5 py-5 shadow-[0_12px_35px_rgba(31,66,86,.16)] sm:px-7 grid">
          <div>
          <button
            onClick={onChangeListingType}
            className="mb-1 text-left text-[10px] font-black uppercase tracking-[.16em] text-white/55 hover:text-white flex gap-2"
          >
            <FiArrowLeft size={15} /> Change listing type
          </button>
          </div>
          <div className="flex gap-80 w-full">
          <div className="flex min-w-0 items-center gap-4 mr-10">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#3ED6AE] text-[#1F4256]">
              <FiHome size={23} />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-black sm:text-2xl">
                Create sale listing
              </h1>
              <p className="mt-0.5 hidden text-xs text-white/65 sm:block">
                Create and manage a complete sale property listing.
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-right sm:block ml-20 ">
            <p className="text-[9px] font-black uppercase tracking-wider text-white/45">
              Current view
            </p>
            <p className="mt-0.5 text-xs font-black">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#3ED6AE]" />
              Sale Property
            </p>
          </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-[#DCE7EA] bg-white px-4 py-3 shadow-sm">
          <span className="text-xs font-black text-[#526E7C]">
            Your progress
          </span>
          <span className="rounded-full bg-[#EAF8F4] px-3 py-1 text-xs font-black text-[#16876B]">
            {Math.round((completedSteps.length / steps.length) * 100)}% complete
          </span>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-8 lg:grid-cols-[270px_1fr]">
        <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="mb-5 text-[10px] font-black uppercase tracking-[.2em] text-[#26ae8c]">
            Your progress
          </p>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                type="button"
                key={s.name}
                onClick={() => {
                  if (i <= step) setStep(i);
                }}
                disabled={i > step}
                className={`relative flex w-full gap-3 pb-7 text-left last:pb-0 ${
                  i === step
                    ? "text-[#1F4256]"
                    : i < step
                      ? "text-[#16876B]"
                      : "cursor-not-allowed text-slate-400"
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${i === step ? "bg-[#1F4256] text-white" : "bg-[#EEF3F5]"}`}
                >
                  {i < step ? <FiCheck /> : <Icon />}
                </span>
                <span>
                  <b className="block text-sm font-black">{s.name}</b>
                  <small className="text-[10px]">{s.hint}</small>
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={`absolute left-5 top-10 h-7 border-l border-dashed ${
                      i < step ? "border-[#3ED6AE]" : "border-slate-300"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </aside>
        <main className="min-w-0 space-y-5">
          {step === 0 && (
            <>
              <Card
                title="Listing basics"
                note="Common fields for every sale property"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Category" required error={errors.category}>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => set("category", "Sell")}
                        className={`rounded-xl border px-4 py-2.5 text-xs font-black transition ${
                          form.category === "Sell"
                            ? "border-[#1F4256] bg-[#1F4256] text-white shadow"
                            : "border-[#DCE7EA] bg-white text-[#526E7C] hover:border-[#3ED6AE]"
                        }`}
                      >
                        {form.category === "Sell" && "✓ "}Sell
                      </button>
                    </div>
                  </Field>
                  <Field
                    label="Transaction Type"
                    required
                    error={errors.transactionType}
                  >
                    <ChoiceButtons
                      value={form.transactionType}
                      onChange={(v) => set("transactionType", v)}
                      options={TRANSACTIONS}
                    />
                  </Field>
                  <Field
                    label="Building Type"
                    required
                    error={errors.buildingType}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {["Residential", "Commercial"].map((v) => (
                        <button
                          type="button"
                          key={v}
                          onClick={() => {
                            set("buildingType", v);
                            set("propertyType", "");
                          }}
                          className={`h-11 rounded-xl border text-sm font-black ${form.buildingType === v ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] bg-white text-[#526E7C]"}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Property Title" required error={errors.title}>
                    <input
                      className={input}
                      value={form.title}
                      onChange={(e) => set("title", e.target.value)}
                      placeholder="e.g. Premium 3 BHK in City Center"
                    />
                  </Field>
                  <Field
                    label="Property Type"
                    required
                    error={errors.propertyType}
                  >
                    <div className="flex flex-wrap gap-2">
                      {propertyTypes.map((v) => (
                        <button
                          type="button"
                          key={v}
                          onClick={() => set("propertyType", v)}
                          className={`rounded-xl border px-3.5 py-2.5 text-xs font-bold transition ${
                            form.propertyType === v
                              ? "border-[#1F4256] bg-[#1F4256] text-white shadow"
                              : "border-[#DCE7EA] bg-white text-[#526E7C] hover:border-[#3ED6AE] hover:bg-[#EAF8F4]"
                          }`}
                        >
                          {form.propertyType === v && "✓ "}
                          {v}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Price" required error={errors.price}>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        className={input}
                        type="number"
                        value={form.priceAmount}
                        onChange={(e) => set("priceAmount", e.target.value)}
                        placeholder="Amount"
                      />
                      <ChoiceButtons
                        value={form.priceUnit}
                        onChange={(v) => set("priceUnit", v)}
                        options={PRICE_UNITS}
                      />
                    </div>
                  </Field>
                  <Field label="Price Per Sq. Ft.">
                    <input
                      className={input}
                      type="number"
                      value={form.pricePerSqFt}
                      onChange={(e) => set("pricePerSqFt", e.target.value)}
                      placeholder="Optional"
                    />
                  </Field>
                  <Field label="Area" required error={errors.area}>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        className={`${input} col-span-1`}
                        type="number"
                        value={form.areaValue}
                        onChange={(e) => set("areaValue", e.target.value)}
                        placeholder="Area"
                      />
                      <Select
                        value={form.areaType}
                        onChange={(v) => set("areaType", v)}
                        options={AREAS}
                      />
                      <Select
                        value={form.areaUnit}
                        onChange={(v) => set("areaUnit", v)}
                        options={UNITS}
                      />
                    </div>
                  </Field>
                </div>
              </Card>
              <Card
                title="Location"
                note="Verify the PIN and select the property location on the map"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="City" required error={errors.city}>
                    <input
                      className={input}
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Indore"
                    />
                  </Field>
                  <Field label="State" required error={errors.state}>
                    <input
                      className={input}
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      placeholder="Madhya Pradesh"
                    />
                  </Field>
                  <Field label="Country" required error={errors.country}>
                    <input
                      className={input}
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      placeholder="India"
                    />
                  </Field>
                  <Field label="Locality" required error={errors.locality}>
                    <input
                      className={input}
                      value={form.locality}
                      onChange={(e) => set("locality", e.target.value)}
                      placeholder="Mahalaxmi Nagar"
                    />
                  </Field>
                  <Field label="Society / Project">
                    <input
                      className={input}
                      value={form.society}
                      onChange={(e) => set("society", e.target.value)}
                    />
                  </Field>
                  <Field label="PIN Code" required error={errors.pinCode}>
                    <div className="flex gap-2">
                      <input
                        className={input}
                        maxLength={6}
                        value={form.pinCode}
                        onChange={(e) =>
                          set("pinCode", e.target.value.replace(/\D/g, ""))
                        }
                        onBlur={() => form.pinCode.length === 6 && lookupPin()}
                        placeholder="6 digit PIN"
                      />
                      <button
                        type="button"
                        disabled={locationLoading}
                        onClick={() => lookupPin()}
                        className="shrink-0 rounded-xl bg-[#1F4256] px-4 text-xs font-black text-white disabled:opacity-50"
                      >
                        Find
                      </button>
                    </div>
                  </Field>
                  <Field label="Complete Address">
                    <input
                      className={`${input} md:col-span-2`}
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                    />
                  </Field>
                  <Field label="Latitude">
                    <input
                      type="number"
                      className={input}
                      value={form.latitude}
                      onChange={(e) => set("latitude", e.target.value)}
                    />
                  </Field>
                  <Field label="Longitude">
                    <input
                      type="number"
                      className={input}
                      value={form.longitude}
                      onChange={(e) => set("longitude", e.target.value)}
                    />
                  </Field>
                  <div className="md:col-span-2 overflow-hidden rounded-[20px] border border-[#DCE7EA] bg-[#F9FBFC] p-2">
                    <div className="mb-2 flex items-center justify-between px-2">
                      <span className="text-xs font-extrabold text-[#526E7C]">
                        Pin exact property location
                      </span>
                      {locationLoading && (
                        <span className="text-xs font-bold text-[#26ae8c]">
                          Finding...
                        </span>
                      )}
                    </div>
                    <MapPicker
                      formData={form}
                      setFormData={setForm}
                      onLocationChange={reverseGeocode}
                    />
                  </div>
                  {locationMessage && (
                    <p className="md:col-span-2 rounded-xl bg-[#3ED6AE]/10 px-4 py-3 text-xs font-bold text-[#1F4256]">
                      {locationMessage}
                    </p>
                  )}
                </div>
              </Card>
            </>
          )}
          {step === 1 && (
            <>
              <Card
                title={`${form.buildingType} property details`}
                note={
                  isResidential
                    ? "ResidentialSaleProperty fields"
                    : "CommercialSaleProperty fields"
                }
              >
                <div className="grid gap-5 md:grid-cols-2">
                  {isResidential && (
                    <>
                      <Field
                        label="Availability"
                        required
                        error={errors.availability}
                      >
                        <Select
                          value={form.availability}
                          onChange={(v) => set("availability", v)}
                          options={["Immediately", "Later"]}
                        />
                      </Field>
                      {form.availability === "Later" && (
                        <Field
                          label="Available Date"
                          required
                          error={errors.availableDate}
                        >
                          <input
                            className={input}
                            type="date"
                            value={form.availableDate}
                            onChange={(e) =>
                              set("availableDate", e.target.value)
                            }
                            min={new Date().toISOString().slice(0, 10)}
                          />
                        </Field>
                      )}
                    </>
                  )}
                  <Field
                    label="Possession Status"
                    required
                    error={errors.possession}
                  >
                    <ChoiceButtons
                      value={form.possessionStatus}
                      onChange={(v) => set("possessionStatus", v)}
                      options={POSSESSION}
                    />
                  </Field>
                  <Field label="Furnishing Status" required error={errors.furnishing}>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {FURNISHING.map((item) => {
                        const active = form.furnishingStatus === item;
                        const copy =
                          item === "Furnished"
                            ? "Move-in ready"
                            : item === "Semi-Furnished"
                              ? "Essential fittings"
                              : "Empty property";

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              set("furnishingStatus", item);
                              if (item === "Unfurnished") {
                                set("furnishingItems", []);
                              }
                            }}
                            className={`rounded-2xl border p-4 text-left transition ${
                              active
                                ? "border-[#1F4256] bg-[#1F4256] text-white shadow-[0_10px_28px_rgba(31,66,86,.16)]"
                                : "border-[#DCE7EA] bg-white text-[#1F4256] hover:border-[#3ED6AE] hover:bg-[#F7FCFA]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-black">{item}</span>
                              {active && (
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#3ED6AE] text-[#1F4256]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <p className={`mt-1 text-[10px] ${active ? "text-white/70" : "text-slate-400"}`}>
                              {copy}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {form.furnishingStatus !== "Unfurnished" && (
                      <div className="mt-5 rounded-2xl border border-[#E1EAED] bg-[#F8FBFC] p-4">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-xs font-black text-[#1F4256]">Furnishing Details</p>
                            <p className="mt-0.5 text-[10px] text-slate-400">Select the fittings available with the property</p>
                          </div>
                          <span className="rounded-full bg-[#EAF8F4] px-3 py-1 text-[10px] font-black text-[#16876B]">
                            {form.furnishingItems.length} selected
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {FURNISHING_ITEMS.map((item) => {
                            const active = form.furnishingItems.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggle("furnishingItems", item)}
                                className={`rounded-full border px-3 py-2 text-[11px] font-bold transition ${
                                  active
                                    ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]"
                                    : "border-[#DCE7EA] bg-white text-[#526E7C] hover:border-[#3ED6AE]"
                                }`}
                              >
                                {active ? "✓ " : ""}
                                {item}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field label="Age of Property">
                    <ChoiceButtons
                      value={form.ageOfProperty}
                      onChange={(v) => set("ageOfProperty", v)}
                      options={AGE}
                    />
                  </Field>
                  <Field label="Ownership" required error={errors.ownership}>
                    <ChoiceButtons
                      value={form.ownershipType}
                      onChange={(v) => set("ownershipType", v)}
                      options={OWNERSHIP}
                    />
                  </Field>
                  {isResidential && (
                    <Field label="BHK" required error={errors.bhk}>
                      <Select
                        value={form.bhk}
                        onChange={(v) => set("bhk", v)}
                        options={BHK}
                      />
                    </Field>
                  )}
                  {!isResidential && (
                    <>
                      <Field label="Office Space Type">
                        <ToggleGrid
                          values={OFFICE}
                          selected={form.officeSpaceType}
                          onToggle={(v) => toggle("officeSpaceType", v)}
                        />
                      </Field>
                      <Field label="Pantry" error={errors.pantry}>
                        <ChoiceButtons
                          value={form.pantry}
                          onChange={(v) => set("pantry", v)}
                          options={PANTRY}
                        />
                      </Field>
                      <Field label="Personal Washroom">
                        <button
                          type="button"
                          onClick={() =>
                            set("personalWashroom", !form.personalWashroom)
                          }
                          className={`${input} text-left`}
                        >
                          {form.personalWashroom ? "Yes" : "No"}
                        </button>
                      </Field>
                      <Field label="Company Lease">
                        <button
                          type="button"
                          onClick={() =>
                            set("companyLease", !form.companyLease)
                          }
                          className={`${input} text-left`}
                        >
                          {form.companyLease ? "Yes" : "No"}
                        </button>
                      </Field>
                    </>
                  )}
                  <Field label="Bathrooms" required error={errors.bathrooms}>
                    <input
                      className={input}
                      type="number"
                      min="0"
                      value={form.bathrooms}
                      onChange={(e) => set("bathrooms", e.target.value)}
                    />
                  </Field>
                  <Field
                    label="Covered Parking"
                    required
                    error={errors.coveredParking}
                  >
                    <input
                      className={input}
                      type="number"
                      min="0"
                      value={form.coveredParking}
                      onChange={(e) => set("coveredParking", e.target.value)}
                    />
                  </Field>
                  <Field
                    label="Open Parking"
                    required
                    error={errors.openParking}
                  >
                    <input
                      className={input}
                      type="number"
                      min="0"
                      value={form.openParking}
                      onChange={(e) => set("openParking", e.target.value)}
                    />
                  </Field>
                  <Field label="Balconies" required error={errors.balconies}>
                    <input
                      className={input}
                      type="number"
                      min="0"
                      value={form.balconies}
                      onChange={(e) => set("balconies", e.target.value)}
                    />
                  </Field>
                </div>
              </Card>
              {isCommercial && (
                <Card
                  title="Commercial Sale Terms"
                  note="Optional commercial terms available in the CommercialSaleProperty model."
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Reference Rent" error={errors.rentAmount}>
                      <input
                        className={input}
                        type="number"
                        min="0"
                        value={form.rentAmount}
                        onChange={(e) => set("rentAmount", e.target.value)}
                        placeholder="Optional"
                      />
                    </Field>
                    <Field label="Rent Frequency">
                      <Select
                        value={form.rentFrequency}
                        onChange={(v) => set("rentFrequency", v)}
                        options={["Per Month", "Per Year"]}
                      />
                    </Field>
                    <Field label="Rent Negotiable">
                      <button
                        type="button"
                        onClick={() =>
                          set("rentNegotiable", !form.rentNegotiable)
                        }
                        className={`${input} text-left`}
                      >
                        {form.rentNegotiable ? "Yes" : "No"}
                      </button>
                    </Field>
                    <Field label="Maintenance" error={errors.maintenanceAmount}>
                      <input
                        className={input}
                        type="number"
                        min="0"
                        value={form.maintenanceAmount}
                        onChange={(e) =>
                          set("maintenanceAmount", e.target.value)
                        }
                        placeholder="Optional"
                      />
                    </Field>
                    <Field label="Maintenance Frequency">
                      <Select
                        value={form.maintenanceFrequency}
                        onChange={(v) => set("maintenanceFrequency", v)}
                        options={[
                          "Per SqFt",
                          "Monthly",
                          "Quarterly",
                          "Yearly",
                          "One Time",
                        ]}
                      />
                    </Field>
                    <Field label="Included in Rent">
                      <button
                        type="button"
                        onClick={() =>
                          set("includedInRent", !form.includedInRent)
                        }
                        className={`${input} text-left`}
                      >
                        {form.includedInRent ? "Yes" : "No"}
                      </button>
                    </Field>
                    <Field label="Security Deposit Type">
                      <Select
                        value={form.depositType}
                        onChange={(v) => set("depositType", v)}
                        options={[
                          "Zero Deposit",
                          "One Month",
                          "Two Months",
                          "Other",
                        ]}
                      />
                    </Field>
                    <Field
                      label="Security Deposit Amount"
                      error={errors.depositAmount}
                    >
                      <input
                        className={input}
                        type="number"
                        min="0"
                        value={form.depositAmount}
                        onChange={(e) => set("depositAmount", e.target.value)}
                        placeholder="Optional"
                      />
                    </Field>
                    <Field label="Security Deposit Description">
                      <input
                        className={input}
                        maxLength={200}
                        value={form.depositDescription}
                        onChange={(e) =>
                          set("depositDescription", e.target.value)
                        }
                        placeholder="Optional"
                      />
                    </Field>
                  </div>
                </Card>
              )}

              <Card title="Specifications & amenities">
                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Facing">
                    <Select
                      value={form.facing}
                      onChange={(v) => set("facing", v)}
                      options={FACINGS}
                    />
                  </Field>
                  <Field label="View">
                    <Select
                      value={form.view}
                      onChange={(v) => set("view", v)}
                      options={VIEWS}
                    />
                  </Field>
                  <Field label="Flooring">
                    <Select
                      value={form.flooring}
                      onChange={(v) => set("flooring", v)}
                      options={FLOORING}
                    />
                  </Field>
                  <Field label="Total Floors">
                    <input
                      className={input}
                      type="number"
                      value={form.totalFloors}
                      onChange={(e) => set("totalFloors", e.target.value)}
                    />
                  </Field>
                  <Field label="Property Floor">
                    <input
                      className={input}
                      type="number"
                      value={form.propertyFloor}
                      onChange={(e) => set("propertyFloor", e.target.value)}
                    />
                  </Field>
                  <Field label="Road Width">
                    <input
                      className={input}
                      type="number"
                      value={form.roadWidth}
                      onChange={(e) => set("roadWidth", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="mt-5">
                  <p className="mb-3 text-xs font-extrabold text-[#526E7C]">
                    Water Sources
                  </p>
                  <ToggleGrid
                    values={WATER}
                    selected={form.waterSources}
                    onToggle={(v) => toggle("waterSources", v)}
                  />
                </div>
                <div className="mt-5">
                  <p className="mb-3 text-xs font-extrabold text-[#526E7C]">
                    Amenities
                  </p>
                  <ToggleGrid
                    values={AMENITIES}
                    selected={form.amenities}
                    onToggle={(v) => toggle("amenities", v)}
                  />
                </div>
                <div className="mt-5">
                  <p className="mb-3 text-xs font-extrabold text-[#526E7C]">
                    Highlights
                  </p>
                  <ToggleGrid
                    values={highlightOptions}
                    selected={form.highlights}
                    onToggle={(v) => toggle("highlights", v)}
                  />
                </div>
              </Card>
            </>
          )}
          {step === 2 && (
            <>
              <Card
                title="Media & Documents"
                note="Upload photos, walkthrough, floor plan, RERA certificate and supporting documents"
              >
                <div className="space-y-5">
                  <Field
                    label={`Property Images (${images.length}/25)`}
                    required
                    error={errors.images}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className={`${input} h-auto py-3`}
                      onChange={chooseImages}
                    />
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {images.map((img, i) => (
                        <div
                          key={`${img.preview}-${i}`}
                          className="overflow-hidden rounded-2xl border bg-white"
                        >
                          <div className="h-28 bg-slate-100">
                            {img.preview && (
                              <img
                                src={img.preview}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="p-2">
                            <select
                              className={`${input} h-9 text-xs`}
                              value={img.category || "Other"}
                              onChange={(e) =>
                                setImages((p) =>
                                  p.map((x, n) =>
                                    n === i
                                      ? { ...x, category: e.target.value }
                                      : x,
                                  ),
                                )
                              }
                            >
                              <option>Exterior View</option>
                              <option>Master Plan</option>
                              <option>Floor Plan</option>
                              <option>Nearby</option>
                              <option>Common Area</option>
                              <option>Room</option>
                              <option>Parking</option>
                              <option>Other</option>
                            </select>
                            <div className="mt-2 flex justify-between">
                              <button
                                type="button"
                                onClick={() =>
                                  setImages((p) =>
                                    p.map((x, n) => ({
                                      ...x,
                                      isCover: n === i,
                                    })),
                                  )
                                }
                                className={`rounded-lg px-2 py-1 text-[10px] font-black ${img.isCover ? "bg-[#3ED6AE] text-[#1F4256]" : "border text-slate-500"}`}
                              >
                                {img.isCover ? "Cover" : "Make Cover"}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setImages((p) => p.filter((_, n) => n !== i))
                                }
                                className="text-rose-500"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Walkthrough Video">
                      <div className="space-y-3 rounded-2xl border border-dashed border-[#BFDAD4] bg-[#F7FCFA] p-4">
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF8F4] text-[#16876B]">
                            <FiVideo size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-[#1F4256]">Upload property walkthrough video</p>
                            <p className="mt-0.5 text-[10px] leading-5 text-slate-400">
                              MP4, WebM or MOV • maximum 100 MB. The video is sent to the backend using the <b>video</b> Multer field.
                            </p>
                          </div>
                        </div>

                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#DCE7EA] bg-white px-4 py-3 text-xs font-black text-[#1F4256] transition hover:border-[#3ED6AE] hover:bg-[#F8FFFC]">
                          <FiUpload size={15} />
                          {video ? "Replace video" : "Choose video"}
                          <input
                            type="file"
                            className="hidden"
                            accept="video/mp4,video/webm,video/quicktime,video/x-m4v"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              if (file.size > 100 * 1024 * 1024) {
                                Swal.fire({
                                  toast: true,
                                  position: "top-end",
                                  icon: "warning",
                                  title: "Video too large",
                                  text: "Maximum video size is 100 MB.",
                                  showConfirmButton: false,
                                  timer: 2500,
                                });
                                e.target.value = "";
                                return;
                              }

                              if (!String(file.type || "").startsWith("video/")) {
                                Swal.fire({
                                  toast: true,
                                  position: "top-end",
                                  icon: "warning",
                                  title: "Invalid video",
                                  text: "Please choose a valid video file.",
                                  showConfirmButton: false,
                                  timer: 2500,
                                });
                                e.target.value = "";
                                return;
                              }

                              if (videoPreview && video) {
                                URL.revokeObjectURL(videoPreview);
                              }

                              setVideo(file);
                              setVideoPreview(URL.createObjectURL(file));
                              set("videoLink", "");
                              e.target.value = "";
                            }}
                          />
                        </label>

                        {video && (
                          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DCE7EA] bg-white px-3 py-2.5">
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-[#1F4256]">{video.name}</p>
                              <p className="mt-0.5 text-[10px] text-slate-400">
                                {(video.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (videoPreview) URL.revokeObjectURL(videoPreview);
                                setVideo(null);
                                setVideoPreview("");
                              }}
                              className="shrink-0 rounded-lg p-2 text-rose-500 hover:bg-rose-50"
                              aria-label="Remove video"
                            >
                              <FiX size={15} />
                            </button>
                          </div>
                        )}

                        {!video && videoPreview && (
                          <div className="space-y-2 rounded-xl border border-[#DCE7EA] bg-white p-3">
                            <p className="text-[10px] font-black uppercase tracking-wide text-[#8197A2]">Existing video</p>
                            <video
                              src={videoPreview}
                              controls
                              playsInline
                              preload="metadata"
                              className="max-h-48 w-full rounded-lg bg-black"
                            />
                          </div>
                        )}

                        {videoPreview && video && (
                          <video
                            src={videoPreview}
                            controls
                            playsInline
                            preload="metadata"
                            className="max-h-48 w-full rounded-xl bg-black"
                          />
                        )}
                      </div>
                    </Field>
                    <Field label="Floor Plan (max 1)">
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className={`${input} h-auto py-3`}
                        onChange={(e) =>
                          setFloorPlan(e.target.files?.[0] || null)
                        }
                      />
                      {floorPlan && (
                        <small className="mt-1 block text-emerald-600">
                          {floorPlan.name}
                        </small>
                      )}
                    </Field>
                    <Field label="RERA Certificate (max 1)">
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className={`${input} h-auto py-3`}
                        onChange={(e) =>
                          setReraCertificate(e.target.files?.[0] || null)
                        }
                      />
                      {reraCertificate && (
                        <small className="mt-1 block text-emerald-600">
                          {reraCertificate.name}
                        </small>
                      )}
                    </Field>
                    <Field
                      label={`Other Documents (${otherDocuments.length}/3)`}
                    >
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,image/*"
                        className={`${input} h-auto py-3`}
                        onChange={chooseDocs}
                        disabled={otherDocuments.length >= 3}
                      />
                      {otherDocuments.map((d, i) => (
                        <div
                          key={i}
                          className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs"
                        >
                          <span className="truncate">{d.file.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setOtherDocuments((p) =>
                                p.filter((_, n) => n !== i),
                              )
                            }
                            className="text-rose-500"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </Field>
                  </div>
                </div>
              </Card>
              <Card
                title="Property Story"
                note="Give buyers a clear picture of the property"
              >
                <div className="space-y-5">
                  <Field
                    label="One-line Description"
                    required
                    error={errors.oneLine}
                  >
                    <input
                      maxLength={200}
                      className={input}
                      value={form.oneLineDescription}
                      onChange={(e) =>
                        set("oneLineDescription", e.target.value)
                      }
                      placeholder="Short property highlight"
                    />
                  </Field>
                  <Field
                    label="Property Description"
                    required
                    error={errors.description}
                  >
                    <textarea
                      className={textarea}
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Describe property, neighbourhood, connectivity and features..."
                    />
                  </Field>

                </div>
              </Card>
            </>
          )}
          <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E1EAED] bg-white/95 p-3 shadow-xl backdrop-blur">
            <div className="flex gap-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-xl border border-[#DCE7EA] px-4 py-2.5 text-sm font-black text-[#526E7C]"
                >
                  ← Previous
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={preview}
                className="flex items-center gap-2 rounded-xl border border-[#1F4256] px-4 py-2.5 text-sm font-black text-[#1F4256]"
              >
                <FiEye /> Preview
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => save("Draft")}
                className="flex items-center gap-2 rounded-xl border border-[#3ED6AE] px-4 py-2.5 text-sm font-black text-[#16876B]"
              >
                <FiSave /> Save Draft
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 rounded-xl bg-[#1F4256] px-5 py-2.5 text-sm font-black text-white"
                >
                  Save & Continue <FiArrowRight />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => save("Submitted")}
                  className="flex items-center gap-2 rounded-xl bg-[#1F4256] px-5 py-2.5 text-sm font-black text-white"
                >
                  {saving ? "Saving..." : "Submit Property"} <FiArrowRight />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      {previewOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-[#102C3A]/80 p-2 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-[#F4F7F8] shadow-2xl">
            <div className="relative shrink-0 bg-[#1F4256] px-5 py-4 text-white sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9BD8E5]">SALE PROPERTY PREVIEW</p>
                  <h2 className="mt-1 truncate text-xl font-black sm:text-2xl">{form.title || "Untitled Property"}</h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/70">
                    <span>{form.transactionType || "Sale"}</span>
                    <span>•</span>
                    <span>{form.buildingType}</span>
                    <span>•</span>
                    <span>{form.propertyType || "Property"}</span>
                    <span>•</span>
                    <span>{[form.locality, form.city, form.state].filter(Boolean).join(", ") || "Location not added"}</span>
                  </p>
                </div>
                <button type="button" onClick={() => setPreviewOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20">
                  <FiX size={18} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="space-y-5 p-3 sm:p-6">
                <section className="overflow-hidden rounded-3xl border border-[#DDE7EA] bg-white shadow-sm">
                  <div className="grid gap-0 lg:grid-cols-[1.55fr_.45fr]">
                    <div className="relative h-[280px] bg-slate-100 sm:h-[430px]">
                      {images[0]?.preview || images[0]?.url ? (
                        <img src={images[0].preview || images[0].url} alt={form.title || "Property"} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">No image added</div>
                      )}
                      <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/40 p-4 text-white backdrop-blur">
                        <p className="text-xs text-white/70">{form.city || "City not added"}</p>
                        <p className="mt-1 text-2xl font-black">{form.priceAmount ? `₹${Number(form.priceAmount).toLocaleString("en-IN")}` : "Price not added"}</p>
                        <p className="text-xs text-white/70">{form.priceUnit}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 bg-[#F8FBFC]">
                      <DetailCardPreview label="Category" value={form.category} />
                      <DetailCardPreview label="Building Type" value={form.buildingType} />
                      <DetailCardPreview label="Property Type" value={form.propertyType} />
                      {isResidential && (
                        <DetailCardPreview label="BHK" value={form.bhk || "—"} />
                      )}
                      <DetailCardPreview label="Area" value={`${form.areaValue || "—"} ${form.areaUnit || ""}`} />
                      <DetailCardPreview label="Possession" value={form.possessionStatus} />
                    </div>
                  </div>
                </section>

                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto">
                    {images.map((image, index) => (
                      <div key={`${image.preview || image.url}-${index}`} className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-[#DCE7EA] bg-white">
                        <img src={image.preview || image.url} alt="" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                  <SectionTitlePreview title="Property Details" />
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailCardPreview label="Title" value={form.title || "—"} />
                    <DetailCardPreview label="Transaction Type" value={form.transactionType || "—"} />
                    <DetailCardPreview label="Building Type" value={form.buildingType || "—"} />
                    <DetailCardPreview label="Property Type" value={form.propertyType || "—"} />
                    <DetailCardPreview label="City" value={form.city || "—"} />
                    <DetailCardPreview label="State" value={form.state || "—"} />
                    <DetailCardPreview label="Country" value={form.country || "—"} />
                    <DetailCardPreview label="Locality" value={form.locality || "—"} />
                    <div className="sm:col-span-2 lg:col-span-4"><DetailCardPreview label="Full Address" value={form.address || "—"} /></div>
                  </div>
                </section>

                <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                  <SectionTitlePreview title="Pricing" />
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailCardPreview label="Price" value={form.priceAmount ? `₹${Number(form.priceAmount).toLocaleString("en-IN")}` : "—"} />
                    <DetailCardPreview label="Price Unit" value={form.priceUnit || "—"} />
                    <DetailCardPreview label="Price / Sq. Ft." value={form.pricePerSqFt ? `₹${Number(form.pricePerSqFt).toLocaleString("en-IN")}` : "—"} />
                    <DetailCardPreview label="Negotiable" value={form.negotiable ? "Yes" : "No"} />
                  </div>
                </section>

                <section className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                    <SectionTitlePreview title="Exact Property Location" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <DetailCardPreview label="PIN Code" value={form.pinCode || "—"} />
                      <DetailCardPreview label="Locality" value={form.locality || "—"} />
                      <DetailCardPreview label="Latitude" value={form.latitude || "—"} />
                      <DetailCardPreview label="Longitude" value={form.longitude || "—"} />
                    </div>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-[#DDE7EA]">
                      {form.latitude && form.longitude ? (
                        <MapPreview form={form} />
                      ) : (
                        <div className="flex min-h-[300px] items-center justify-center bg-[#EEF3F5] text-sm text-slate-400">Select a location on the map to preview it here.</div>
                      )}
                    </div>
                    <div className="mt-3 rounded-2xl bg-[#F8FBFC] p-4 text-sm font-semibold text-[#425A70]">{form.address || "Address not added"}</div>
                  </div>

                  <div className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                    <SectionTitlePreview title="Specifications" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <DetailCardPreview label="Bathrooms" value={form.bathrooms} />
                      <DetailCardPreview label="Balconies" value={form.balconies} />
                      <DetailCardPreview label="Covered Parking" value={form.coveredParking} />
                      <DetailCardPreview label="Open Parking" value={form.openParking} />
                      <DetailCardPreview label="Total Floors" value={form.totalFloors || "—"} />
                      <DetailCardPreview label="Property Floor" value={form.propertyFloor || "—"} />
                      <DetailCardPreview label="Facing" value={form.facing || "—"} />
                      <DetailCardPreview label="View" value={form.view || "—"} />
                      <DetailCardPreview label="Flooring" value={form.flooring || "—"} />
                      <DetailCardPreview label="Power Backup" value={form.powerBackup ? "Yes" : "No"} />
                      <DetailCardPreview label="Lift Available" value={form.liftAvailable ? "Yes" : "No"} />
                      {!form.keepUnitNoPrivate && <DetailCardPreview label="Connecting Road Width" value={form.roadWidth ? `${form.roadWidth} ${form.roadUnit}` : "—"} />}
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                  <SectionTitlePreview title="Furnishing" />
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailCardPreview label="Status" value={form.furnishingStatus} />
                    <DetailCardPreview label="Selected Items" value={form.furnishingItems.length} />
                    {isResidential && (
                      <DetailCardPreview label="BHK" value={form.bhk || "—"} />
                    )}
                    {isCommercial && (
                      <>
                        <DetailCardPreview
                          label="Office Space Type"
                          value={form.officeSpaceType.length ? form.officeSpaceType.join(", ") : "—"}
                        />
                        <DetailCardPreview label="Pantry" value={form.pantry || "—"} />
                        <DetailCardPreview label="Personal Washroom" value={form.personalWashroom ? "Yes" : "No"} />
                        <DetailCardPreview label="Company Lease" value={form.companyLease ? "Yes" : "No"} />
                      </>
                    )}
                  </div>
                  {form.furnishingItems.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {form.furnishingItems.map((item) => <span key={item} className="rounded-full border border-[#3ED6AE]/30 bg-[#EAF8F4] px-3 py-1.5 text-xs font-bold text-[#16876B]">✓ {item}</span>)}
                    </div>
                  )}
                </section>

                {form.additionalSpaces.length > 0 && (
                  <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                    <SectionTitlePreview title="Additional Spaces" />
                    <div className="flex flex-wrap gap-2">
                      {form.additionalSpaces.map((item) => <span key={item} className="rounded-full border border-[#DCE7EA] bg-[#F8FBFC] px-3 py-1.5 text-xs font-bold text-[#425A70]">{item}</span>)}
                    </div>
                  </section>
                )}

                {(form.amenities.length > 0 || form.highlights.length > 0 || form.locationAdvantages.length > 0) && (
                  <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                    <SectionTitlePreview title="Amenities & Property Highlights" />
                    {form.locationAdvantages.length > 0 && <PreviewPills title="Location Advantages" items={form.locationAdvantages} />}
                    {form.amenities.length > 0 && <PreviewPills title="Amenities" items={form.amenities} />}
                    {form.highlights.length > 0 && <PreviewPills title="Property Highlights" items={form.highlights} highlight />}
                  </section>
                )}

                {(form.oneLineDescription || form.description) && (
                  <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                    <SectionTitlePreview title="Property Story" />
                    {form.oneLineDescription && <p className="mb-4 rounded-2xl bg-[#EAF8F4] p-4 text-sm font-extrabold text-[#16876B]">{form.oneLineDescription}</p>}
                    <p className="whitespace-pre-line text-sm leading-7 text-[#536779]">{form.description || "No description added."}</p>
                  </section>
                )}

                {videoPreview && (
                  <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                    <SectionTitlePreview title="Property Video" />
                    <div className="overflow-hidden rounded-2xl bg-black">
                      <video
                        src={videoPreview}
                        controls
                        playsInline
                        preload="metadata"
                        className="max-h-[560px] w-full"
                      />
                    </div>
                    {!video && form.videoLink && (
                      <a
                        href={form.videoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 block break-all text-xs font-bold text-[#168A70] hover:underline"
                      >
                        Open existing video
                      </a>
                    )}
                  </section>
                )}

                {(floorPlan || reraCertificate || otherDocuments.length > 0) && (
                  <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                    <SectionTitlePreview title="Documents" />
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {floorPlan && <DetailCardPreview label="Floor Plan" value={floorPlan.name} />}
                      {reraCertificate && <DetailCardPreview label="RERA Certificate" value={reraCertificate.name} />}
                      {otherDocuments.map((doc, index) => <DetailCardPreview key={index} label={`Document ${index + 1}`} value={doc.file.name} />)}
                    </div>
                  </section>
                )}

                <div className="flex justify-end">
                  <button type="button" onClick={() => setPreviewOpen(false)} className="h-11 rounded-xl bg-[#1F4256] px-6 text-sm font-black text-white hover:bg-[#18394B]">Close Preview</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
