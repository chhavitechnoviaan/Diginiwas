

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiChevronDown,
  FiEdit3,
  FiEye,
  FiFileText,
  FiMenu,
  FiSave,
  FiSend,
  FiX,
} from "react-icons/fi";
import {
  MdAdd,
  MdCheckCircle,
  MdDelete,
  MdInfoOutline,
  MdOutlineArchitecture,
  MdOutlineCloudUpload,
  MdOutlineCurrencyRupee,
  MdOutlineDescription,
  MdOutlineFitnessCenter,
  MdOutlineImage,
  MdOutlineLink,
  MdOutlineMap,
  MdOutlinePark,
  MdOutlinePool,
  MdOutlineSecurity,
  MdOutlineShield,
  MdOutlineSportsTennis,
} from "react-icons/md";
import Swal from "sweetalert2";
import MapPicker from "../../../components/MapPicker";
import RentalPropertyForm from "./RentalPropertyForm";
import DynamicSalePropertyForm from "./SalePropertyForm";
import {
  createPropertyApi,
  getPropertyByIdApi,
  updatePropertyApi,
} from "../../../Services/propertyService";

const DARK = "#1F4256";

const INITIAL_FORM_DATA = {
  title: "",
  transactionType: "Sale",
  category: "",
  status: "Draft",
  projectName: "",
  developerName: "",
  description: "",
  city: "",
  locality: "",
  pinCode: "",
  address: "",
  latitude: "",
  longitude: "",
  propertySize: "",
  sizeUnit: "sqft",
  price: "",
  pricePerSqft: "",
  maintenance: "",
  bookingAmount: "",
  superBuiltupArea: "",
  carpetArea: "",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  parking: "",
  floorNo: "",
  totalFloors: "",
  facing: "",
  furnishing: "",
  videoLink: "",
  amenities: [],
  tags: [],
  negotiable: false,
};

const TAGS = [
  "Ready to Move",
  "Lake Facing",
  "Vastu Compliant",
  "Luxury Property",
  "Smart Home Enabled",
  "Prime Location",
  "Sea Facing",
];

const AMENITIES = [
  { icon: <MdOutlinePool size={24} />, label: "Swimming Pool" },
  { icon: <MdOutlineFitnessCenter size={24} />, label: "Modern Gym" },
  { icon: <MdOutlinePark size={24} />, label: "Private Garden" },
  { icon: <MdOutlineSecurity size={24} />, label: "24/7 Security" },
  { icon: <MdOutlineSportsTennis size={24} />, label: "Tennis Court" },
];

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

function SectionCard({ icon, title, description, children }) {
  return (
    <section className="mb-5 overflow-hidden rounded-[20px] border border-[#E1EAED] bg-white shadow-[0_4px_18px_rgba(31,66,86,0.05)]">
      <div className="border-b border-[#EEF3F5] px-2 py-2 sm:px-2">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3ED6AE] text-white">
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1F4256]">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}

function Field({ label, error, children, hint }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#526E7C]">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-rose-500">{error}</p>
      )}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-[#DDE7EA] bg-[#F9FBFC] px-3.5 text-sm text-[#1F4256] outline-none transition placeholder:text-slate-400 focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";

function SelectInput({ name, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${inputClass} appearance-none pr-10`}
      >
        <option value="">Select</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" />
    </div>
  );
}

function PreviewModal({ property, imageUrls, onClose }) {
  if (!property) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
        >
          <FiX />
        </button>
        <div className="relative h-72 bg-slate-100 sm:h-96">
          {imageUrls[0] ? (
            <img
              src={imageUrls[0]}
              alt="Property"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No property image selected
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#1F4256]">
              Preview
            </span>
            <h2 className="mt-3 text-3xl font-bold">
              {property.title || "Untitled Property"}
            </h2>
            <p className="mt-1 text-sm text-white/80">
              {[property.locality, property.city].filter(Boolean).join(", ") ||
                "Location not added"}
            </p>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              [
                "Price",
                property.price
                  ? `₹${Number(property.price).toLocaleString("en-IN")}`
                  : "—",
              ],
              ["Category", property.category || "—"],
              [
                "Size",
                property.propertySize
                  ? `${property.propertySize} ${property.sizeUnit}`
                  : "—",
              ],
              ["Transaction", property.transactionType || "—"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 font-bold text-[#1F4256]">{value}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-7 font-bold">Description</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-500">
            {property.description || "No description added."}
          </p>
        </div>
      </div>
    </div>
  );
}

function SalePropertyForm({ onChangeListingType }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProperty, setLoadingProperty] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [floorPlan, setFloorPlan] = useState(null);
  const [reraCertificate, setReraCertificate] = useState(null);

  const imageUrls = useMemo(
    () => [
      ...existingImages.map((item) => item?.url).filter(Boolean),
      ...images.map((file) => URL.createObjectURL(file)),
    ],
    [existingImages, images],
  );

  useEffect(() => {
    return () => {
      imageUrls
        .filter((url) => url?.startsWith("blob:"))
        .forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  useEffect(() => {
    if (!editId) return;

    const load = async () => {
      try {
        setLoadingProperty(true);
        const response = await getPropertyByIdApi(editId);
        const property = response?.data || response?.property || response;
        if (!property?._id) throw new Error("Property not found");

        setFormData({
          ...INITIAL_FORM_DATA,
          title: property.title || "",
          transactionType: property.transactionType || "Sale",
          category: property.category || "",
          status: property.status || "Draft",
          projectName: property.projectName || "",
          developerName: property.developerName || "",
          description: property.description || "",
          city: property.city || "",
          locality: property.locality || "",
          pinCode: property.pinCode || "",
          address: property.address || "",
          latitude: property.latitude ?? "",
          longitude: property.longitude ?? "",
          propertySize: property.propertySize ?? "",
          sizeUnit: property.sizeUnit || "sqft",
          price: property.price ?? "",
          pricePerSqft: property.pricePerSqft ?? "",
          maintenance: property.maintenance ?? "",
          bookingAmount: property.bookingAmount ?? "",
          superBuiltupArea: property.superBuiltupArea ?? "",
          carpetArea: property.carpetArea ?? "",
          bedrooms: property.bedrooms || "",
          bathrooms: property.bathrooms || "",
          balconies: property.balconies || "",
          parking: property.parking || "",
          floorNo: property.floorNo ?? "",
          totalFloors: property.totalFloors ?? "",
          facing: property.facing || "",
          furnishing: property.furnishing || "",
          videoLink: property.videoLink || "",
          amenities: Array.isArray(property.amenities)
            ? property.amenities
            : [],
          tags: Array.isArray(property.tags) ? property.tags : [],
          negotiable: Boolean(property.negotiable),
        });
        setExistingImages(
          Array.isArray(property.images) ? property.images : [],
        );
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Unable to load property",
          text: error?.response?.data?.message || error.message,
          confirmButtonColor: DARK,
        });
        navigate("/drafts");
      } finally {
        setLoadingProperty(false);
      }
    };

    load();
  }, [editId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const next = { ...prev, [name]: finalValue };
      if (name === "price" || name === "propertySize") {
        const price = Number(name === "price" ? finalValue : next.price);
        const size = Number(
          name === "propertySize" ? finalValue : next.propertySize,
        );
        next.pricePerSqft =
          price > 0 && size > 0 ? String(Math.round(price / size)) : "";
      }
      return next;
    });

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForPublish = () => {
    const next = {};
    const requiredText = {
      title: "Property title is required.",
      category: "Category is required.",
      description: "Description is required.",
      city: "City is required.",
      locality: "Locality is required.",
      pinCode: "PIN code is required.",
      address: "Full address is required.",
      propertySize: "Property size is required.",
      price: "Property price is required.",
      superBuiltupArea: "Super built-up area is required.",
      carpetArea: "Carpet area is required.",
    };

    Object.entries(requiredText).forEach(([key, message]) => {
      if (String(formData[key] ?? "").trim() === "") next[key] = message;
    });

    [
      "pinCode",
      "propertySize",
      "price",
      "superBuiltupArea",
      "carpetArea",
      "maintenance",
      "bookingAmount",
      "floorNo",
      "totalFloors",
    ].forEach((key) => {
      if (formData[key] !== "" && !/^\d+$/.test(String(formData[key]))) {
        next[key] = "Only numbers are allowed.";
      }
    });

    if (
      formData.latitude !== "" &&
      !/^-?\d+(\.\d+)?$/.test(String(formData.latitude))
    )
      next.latitude = "Invalid latitude.";
    if (
      formData.longitude !== "" &&
      !/^-?\d+(\.\d+)?$/.test(String(formData.longitude))
    )
      next.longitude = "Invalid longitude.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildFormData = (targetStatus) => {
    const user = getUser();
    if (!user?.id || !user?.role)
      throw new Error("Logged-in user details are not available.");

    const data = new FormData();
    data.append("creatorId", user.id);
    data.append("creatorRole", user.role);
    data.append("status", targetStatus);

    const stringFields = [
      "title",
      "transactionType",
      "category",
      "projectName",
      "developerName",
      "description",
      "city",
      "locality",
      "pinCode",
      "address",
      "sizeUnit",
      "bedrooms",
      "bathrooms",
      "balconies",
      "parking",
      "facing",
      "furnishing",
      "videoLink",
    ];
    stringFields.forEach((key) =>
      data.append(key, String(formData[key] ?? "").trim()),
    );

    const numericFields = [
      "latitude",
      "longitude",
      "propertySize",
      "price",
      "maintenance",
      "bookingAmount",
      "superBuiltupArea",
      "carpetArea",
      "floorNo",
      "totalFloors",
    ];
    numericFields.forEach((key) => {
      if (
        formData[key] !== "" &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        data.append(key, String(formData[key]));
      }
    });

    data.append("negotiable", String(Boolean(formData.negotiable)));
    data.append("amenities", JSON.stringify(formData.amenities || []));
    data.append("tags", JSON.stringify(formData.tags || []));

    images.forEach((file) => data.append("images", file));
    if (video) data.append("video", video);
    if (floorPlan) data.append("floorPlan", floorPlan);
    if (reraCertificate) data.append("reraCertificate", reraCertificate);

    if (isEditMode) {
      data.append("existingImages", JSON.stringify(existingImages));
      data.append("updatedByUserId", user.id);
      data.append("updatedByName", user.name || "");
      data.append("updatedByRole", user.role);
      data.append(
        "statusRemarks",
        targetStatus === "Submitted"
          ? "Draft property submitted for review."
          : "Draft property updated.",
      );
    }

    return data;
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setImages([]);
    setExistingImages([]);
    setVideo(null);
    setFloorPlan(null);
    setReraCertificate(null);
    setErrors({});
  };

  const handleSave = async (targetStatus) => {
    if (targetStatus === "Submitted" && !validateForPublish()) {
      await Swal.fire({
        icon: "warning",
        title: "Complete required details",
        text: "Please fix the highlighted fields before publishing the property.",
        confirmButtonColor: DARK,
      });
      return;
    }

    try {
      setLoading(true);
      const data = buildFormData(targetStatus);

      Swal.fire({
        title:
          targetStatus === "Draft"
            ? "Saving Draft..."
            : "Submitting Property...",
        text:
          targetStatus === "Draft"
            ? "Your progress is being saved."
            : "Property is being submitted for review.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = isEditMode
        ? await updatePropertyApi(editId, data)
        : await createPropertyApi(data);

      await Swal.fire({
        icon: "success",
        title: targetStatus === "Draft" ? "Draft Saved" : "Property Submitted",
        html: response?.data?.propertyId
          ? `Property ID: <b>${response.data.propertyId}</b>`
          : targetStatus === "Draft"
            ? "Property saved successfully in drafts."
            : "Property submitted successfully for review.",
        confirmButtonColor: DARK,
      });

      resetForm();
      navigate(targetStatus === "Draft" ? "/drafts" : "/drafts");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title:
          targetStatus === "Draft" ? "Draft Save Failed" : "Submission Failed",
        text:
          error?.response?.data?.message ||
          error?.response?.data?.errors?.join?.(", ") ||
          error.message ||
          "Something went wrong.",
        confirmButtonColor: "#e11d48",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayValue = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (loadingProperty) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F7F8]">
        <div className="rounded-2xl bg-white px-8 py-6 text-sm font-semibold text-slate-600 shadow-sm">
          Loading draft property...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28">
      {!isEditMode && onChangeListingType && (
        <button type="button" onClick={onChangeListingType} className="fixed right-5 top-24 z-40 rounded-full border border-[#1F4256]/10 bg-white px-4 py-2 text-xs font-bold text-[#1F4256] shadow-lg">
          Change listing type 
        </button>
      )}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative h-full w-72 bg-white p-1 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[#1F4256]">Property Workspace</p>
              <button onClick={() => setSidebarOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="mt-6 space-y-2">
              <button
                onClick={() => navigate("/add-property")}
                className="w-full rounded-xl bg-slate-50 px-1 py-1 text-left text-sm font-semibold"
              >
                Add Property
              </button>
              <button
                onClick={() => navigate("/drafts")}
                className="w-full rounded-xl bg-slate-50 px-4 py-3 text-left text-sm font-semibold"
              >
                Draft Properties
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1500px] px-1 py-3 sm:px-1 lg:px-1">
        <div className="relative mb-7 overflow-hidden rounded-[15px] bg-[#1F4256] px-1 py-2 text-white shadow-[0_10px_30px_rgba(31,66,86,0.12)] sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-56 w-56 rounded-full bg-[#3ED6AE]/10" />
          <div className="pointer-events-none absolute right-24 top-5 h-44 w-44 rounded-full bg-white/[0.04]" />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3ED6AE] text-white shadow-lg shadow-black/10">
                <MdAdd size={25} />
              </div>
              <div>
                {/* <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9BD8E5]">
                  DIGINIWAS ADMIN
                </p> */}
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-[26px]">
                  {isEditMode ? "Edit Property" : "Add Property"}
                </h1>
                <p className="mt-1 text-xs text-[#D5E6EC]">
                  {isEditMode
                    ? "Continue editing, preview and publish your saved draft"
                    : "Create property listings, save drafts and submit for review"}
                </p>
              </div>
            </div>

            <div className="flex min-w-[150px] items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#3ED6AE]" />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wide text-white/50">
                  CURRENT VIEW
                </p>
                <p className="mt-0.5 text-xs font-semibold text-white">
                  {isEditMode ? "Edit Draft" : "Property Intake"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <header className="sticky top-0 z-40 border-b rounded-[15px] border-slate-200 bg-white/95 backdrop-blur-xl mb-5">
          <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-1 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              >
                <FiMenu />
              </button>
              <div>
                <p className="text-lg font-black tracking-tight text-[#1F4256]">
                  DIGINIWAS
                </p>
                <p className="text-[11px] text-slate-400">
                  Property Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/drafts")}
                className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:flex"
              >
                <FiFileText /> Drafts
              </button>
              <button
                onClick={() => handleSave("Draft")}
                disabled={loading}
                className="h-10 rounded-xl border border-[#1F4256]/20 bg-[#1F4256]/5 px-4 text-sm font-bold text-[#1F4256] disabled:opacity-50"
              >
                Save Draft
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          <div>
            <SectionCard
              icon={<MdInfoOutline />}
              title="Basic Information"
              description="Core identity and listing information."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Property Title" error={errors.title}>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Skyline Sky-Villa"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Transaction Type">
                  <div className="grid grid-cols-2 gap-2">
                    {["Sale", "Rent"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, transactionType: type }))
                        }
                        className={`h-11 rounded-xl border text-sm font-bold ${formData.transactionType === type ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-slate-200 bg-white text-slate-600"}`}
                      >
                        {type === "Sale" ? "FOR SALE" : "FOR RENT"}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Category" error={errors.category}>
                  <SelectInput
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={[
                      "Residential",
                      "Commercial",
                      "Rental",
                      "Sell",
                      "Plot/Land",
                    ]}
                  />
                </Field>
                <Field label="Project Name">
                  <input
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Project name"
                  />
                </Field>
                <Field label="Developer Name">
                  <input
                    name="developerName"
                    value={formData.developerName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Developer name"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field
                    label="Property Description"
                    error={errors.description}
                  >
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-xl border border-[#DDE7EA] bg-[#F9FBFC] p-3.5 text-sm outline-none focus:border-[#3ED6AE] focus:ring-4 focus:ring-[#3ED6AE]/15"
                      placeholder="Describe the property, lifestyle, architecture and highlights..."
                    />
                  </Field>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              icon={<MdOutlineMap />}
              title="Location & Map"
              description="Address, locality and map coordinates."
            >
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="City" error={errors.city}>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Locality" error={errors.locality}>
                  <input
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="PIN Code" error={errors.pinCode}>
                  <input
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <div className="sm:col-span-3">
                  <Field label="Full Address" error={errors.address}>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Apartment, floor, street, landmark"
                    />
                  </Field>
                </div>
                <Field label="Latitude" error={errors.latitude}>
                  <input
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Longitude" error={errors.longitude}>
                  <input
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <MapPicker formData={formData} setFormData={setFormData} />
              </div>
            </SectionCard>

            <SectionCard
              icon={<MdOutlineCurrencyRupee />}
              title="Pricing & Area"
              description="Commercial valuation and usable area details."
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Property Size" error={errors.propertySize}>
                  <input
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Size Unit">
                  <SelectInput
                    name="sizeUnit"
                    value={formData.sizeUnit}
                    onChange={handleChange}
                    options={["sqft", "sqyd", "sqm"]}
                  />
                </Field>
                <Field label="Total Price" error={errors.price}>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Price / Sqft">
                  <input
                    value={formData.pricePerSqft}
                    disabled
                    className={`${inputClass} bg-slate-100 text-slate-500`}
                  />
                </Field>
                <Field label="Maintenance" error={errors.maintenance}>
                  <input
                    name="maintenance"
                    value={formData.maintenance}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Booking Amount" error={errors.bookingAmount}>
                  <input
                    name="bookingAmount"
                    value={formData.bookingAmount}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field
                  label="Super Built-up Area"
                  error={errors.superBuiltupArea}
                >
                  <input
                    name="superBuiltupArea"
                    value={formData.superBuiltupArea}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Carpet Area" error={errors.carpetArea}>
                  <input
                    name="carpetArea"
                    value={formData.carpetArea}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Negotiable">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, negotiable: !p.negotiable }))
                    }
                    className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 text-sm font-semibold ${formData.negotiable ? "border-[#86EBD4] bg-[#E9FBF6] text-[#168A70]" : "border-slate-200 bg-white text-slate-600"}`}
                  >
                    <span>
                      {formData.negotiable
                        ? "Yes, negotiable"
                        : "Not negotiable"}
                    </span>
                    <span
                      className={`h-5 w-9 rounded-full p-0.5 ${formData.negotiable ? "bg-[#E9FBF6]0" : "bg-slate-300"}`}
                    >
                      <span
                        className={`block h-4 w-4 rounded-full bg-white transition ${formData.negotiable ? "translate-x-4" : ""}`}
                      />
                    </span>
                  </button>
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              icon={<MdOutlineArchitecture />}
              title="Technical Specifications"
              description="Rooms, floor and furnishing details."
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Bedrooms">
                  <SelectInput
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    options={["1", "2", "3", "4", "5", "6", "7+"]}
                  />
                </Field>
                <Field label="Bathrooms">
                  <SelectInput
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    options={["1", "2", "3", "4", "5", "6", "7+"]}
                  />
                </Field>
                <Field label="Balconies">
                  <SelectInput
                    name="balconies"
                    value={formData.balconies}
                    onChange={handleChange}
                    options={["0", "1", "2", "3", "4", "5+"]}
                  />
                </Field>
                <Field label="Parking">
                  <SelectInput
                    name="parking"
                    value={formData.parking}
                    onChange={handleChange}
                    options={["None", "Open", "Covered", "Both"]}
                  />
                </Field>
                <Field label="Floor No." error={errors.floorNo}>
                  <input
                    name="floorNo"
                    value={formData.floorNo}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Total Floors" error={errors.totalFloors}>
                  <input
                    name="totalFloors"
                    value={formData.totalFloors}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Facing">
                  <SelectInput
                    name="facing"
                    value={formData.facing}
                    onChange={handleChange}
                    options={[
                      "North",
                      "South",
                      "East",
                      "West",
                      "North-East",
                      "North-West",
                      "South-East",
                      "South-West",
                    ]}
                  />
                </Field>
                <Field label="Furnishing">
                  <SelectInput
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    options={["Unfurnished", "Semi-Furnished", "Furnished"]}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              icon={<MdOutlineImage />}
              title="Media & Documents"
              description="Upload property photos, floor plan, video and RERA certificate."
            >
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition hover:border-[#3ED6AE] hover:bg-[#E9FBF6]/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#3ED6AE] text-white">
                  <MdOutlineCloudUpload size={27} />
                </div>
                <p className="mt-3 font-bold text-[#526E7C]">
                  Upload Property Images
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  JPG, PNG, WEBP. You can select multiple images.
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setImages((prev) => [
                      ...prev,
                      ...Array.from(e.target.files || []),
                    ])
                  }
                />
              </label>

              {(existingImages.length > 0 || images.length > 0) && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {existingImages.map((image, index) => (
                    <div
                      key={`existing-${index}`}
                      className="group relative aspect-square overflow-hidden rounded-2xl"
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white opacity-0 shadow transition group-hover:opacity-100"
                      >
                        <MdDelete />
                      </button>
                      <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] text-white">
                        Saved
                      </span>
                    </div>
                  ))}
                  {images.map((file, index) => (
                    <div
                      key={`new-${index}`}
                      className="group relative aspect-square overflow-hidden rounded-2xl"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white opacity-0 shadow transition group-hover:opacity-100"
                      >
                        <MdDelete />
                      </button>
                      <span className="absolute bottom-2 left-2 rounded bg-[#24B994] px-2 py-1 text-[10px] text-white">
                        New
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Video / 360° Walkthrough Link">
                  <div className="relative">
                    <MdOutlineLink className="absolute left-3 top-3.5 text-slate-400" />
                    <input
                      name="videoLink"
                      value={formData.videoLink}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                      placeholder="https://..."
                    />
                  </div>
                </Field>
                <Field label="Upload Video">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs"
                  />
                </Field>
                <Field label="Floor Plan">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setFloorPlan(e.target.files?.[0] || null)}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs"
                  />
                </Field>
                <Field label="RERA Certificate">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      setReraCertificate(e.target.files?.[0] || null)
                    }
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs"
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              icon={<MdOutlineDescription />}
              title="Amenities & Tags"
              description="Highlight facilities and special attributes."
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {AMENITIES.map((item) => {
                  const active = formData.amenities.includes(item.label);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleArrayValue("amenities", item.label)}
                      className={`rounded-2xl border p-4 text-left transition ${active ? "border-[#3ED6AE] bg-[#E9FBF6] text-[#168A70]" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                    >
                      <div className="flex items-center justify-between">
                        {item.icon}
                        {active && <MdCheckCircle />}
                      </div>
                      <p className="mt-3 text-sm font-semibold">{item.label}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {TAGS.map((tag) => {
                  const active = formData.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleArrayValue("tags", tag)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-slate-200 bg-white text-slate-600"}`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9FBF6] text-[#27C9A4]">
                    <MdOutlineShield />
                  </div>
                  <div>
                    <p className="font-bold text-[#1F4256]">Listing Controls</p>
                    <p className="text-xs text-slate-400">
                      Save or submit property
                    </p>
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => setPreviewOpen(true)}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <FiEye /> Preview Property
                  </button>
                  <button
                    onClick={() => handleSave("Draft")}
                    disabled={loading}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#1F4256]/20 bg-[#1F4256]/5 text-sm font-bold text-[#1F4256] disabled:opacity-50"
                  >
                    <FiSave /> Save Draft
                  </button>
                  <button
                    onClick={() => handleSave("Submitted")}
                    disabled={loading}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1F4256] text-sm font-bold text-white shadow-lg shadow-[#1F4256]/10 disabled:opacity-50"
                  >
                    <FiSend />{" "}
                    {isEditMode ? "Publish Draft" : "Publish Property"}
                  </button>
                </div>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                <p className="font-bold">How Draft works</p>
                <p className="mt-2 text-xs leading-6 text-amber-800">
                  Save Draft can store incomplete property data. Publish
                  validates all required fields and changes status to Submitted.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-xl xl:hidden">
        <div className="mx-auto grid max-w-[1500px] grid-cols-3 gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex h-11 items-center justify-center gap-1 rounded-xl border border-slate-200 text-xs font-semibold"
          >
            <FiEye /> Preview
          </button>
          <button
            onClick={() => handleSave("Draft")}
            disabled={loading}
            className="flex h-11 items-center justify-center gap-1 rounded-xl border border-[#1F4256]/20 bg-[#1F4256]/5 text-xs font-bold text-[#1F4256]"
          >
            <FiSave /> Draft
          </button>
          <button
            onClick={() => handleSave("Submitted")}
            disabled={loading}
            className="flex h-11 items-center justify-center gap-1 rounded-xl bg-[#1F4256] text-xs font-bold text-white"
          >
            <FiSend /> Publish
          </button>
        </div>
      </div>

      <PreviewModal
        property={previewOpen ? formData : null}
        imageUrls={imageUrls}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  );
}

function ListingTypeChooser({ onChoose, onDrafts }) {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-[radial-gradient(circle_at_top_left,_#DFFBF3,_transparent_38%),linear-gradient(135deg,#F7FAFB,#EDF5F6)] px-1 py-1 sm:px-1">
      <div className="mx-auto max-w-5xl">
        <div className="mb-9 text-center">
          <span className="inline-flex rounded-full bg-[#3ED6AE]/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[.2em] text-[#16876B]">DigiNiwas property studio</span>
          <h1 className="mt-4 text-3xl font-black text-[#1F4256] sm:text-5xl">What would you like to list?</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Choose a listing journey and we will show only the fields required for it.</p>
        </div>
        <div className="mb-5 flex justify-center">
          <button
            type="button"
            onClick={onDrafts}
            className="inline-flex items-center gap-2 rounded-xl border border-[#1F4256] bg-white px-5 py-3 text-sm font-extrabold text-[#1F4256] shadow-sm transition hover:border-[#3ED6AE] hover:bg-[#EAF8F4]"
          >
            <FiFileText />
            View Drafted Properties
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <button onClick={() => onChoose("Sale")} className="group overflow-hidden rounded-[30px] border border-white bg-white p-7 text-left shadow-[0_18px_55px_rgba(31,66,86,.10)] transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1F4256] text-3xl text-white">₹</div>
            <h2 className="mt-8 text-2xl font-black text-[#1F4256]">Sell a property</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Create a complete sale listing with pricing, RERA and ownership details.</p>
            <span className="mt-7 inline-flex items-center gap-2 font-bold text-[#1F4256]">Start sale form <span className="transition group-hover:translate-x-1">→</span></span>
          </button>
          <button onClick={() => onChoose("Rent")} className="group relative overflow-hidden rounded-[30px] bg-[#1F4256] p-7 text-left shadow-[0_18px_55px_rgba(31,66,86,.22)] transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#3ED6AE]/20" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3ED6AE] text-3xl text-[#1F4256]">⌂</div>
            <h2 className="relative mt-8 text-2xl font-black text-white">Rent out a property</h2>
            <p className="relative mt-2 text-sm leading-6 text-white/65">Add rent, deposit, availability, furnishing, amenities and tenant preferences.</p>
            <span className="relative mt-7 inline-flex items-center gap-2 font-bold text-[#3ED6AE]">Start rental form <span className="transition group-hover:translate-x-1">→</span></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PropertyIntakeForm() {
  const [searchParams] = useSearchParams();
  const editing = Boolean(searchParams.get("edit"));
  const source = searchParams.get("source");
  const navigate = useNavigate();
  const [listingType, setListingType] = useState(
    source === "RentalProperty" || source === "CommercialRentalProperty" ? "Rent" : editing ? "Sale" : ""
  );

  if (!listingType) {
    return (
      <ListingTypeChooser
        onChoose={setListingType}
        onDrafts={() => navigate("/drafts")}
      />
    );
  }
  if (listingType === "Rent") return <RentalPropertyForm onChangeListingType={() => setListingType("")} />;
  return <DynamicSalePropertyForm onChangeListingType={() => setListingType("")} />;
}
