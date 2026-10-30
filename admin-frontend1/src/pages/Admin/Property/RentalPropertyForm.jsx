
// import { useEffect, useState } from "react";
// import {
//   FiArrowLeft,
//   FiArrowRight,
//   FiCheck,
//   FiHome,
//   FiImage,
//   FiMapPin,
//   FiEye,
//   FiSave,
//   FiUploadCloud,
//   FiX,
// } from "react-icons/fi";
// import Swal from "sweetalert2";
// import { createRentalPropertyApi, getRentalPropertyByIdApi, updateRentalPropertyApi } from "../../../Services/propertyService";
// import MapPicker from "../../../components/MapPicker";
// import CommercialRentalPropertyForm from "./CommercialRentalPropertyForm";

// const TYPES = [
//   "Apartment",
//   "Villa",
//   "Plot",
//   "Builder Floor",
//   "Penthouse",
//   "Independent House",
// ];
// const BHK = [
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
// const SUITED = [
//   "Students",
//   "Working Professionals",
//   "Family",
//   "Bachelor",
//   "Company Lease",
//   "Any",
// ];
// const ITEMS = [
//   "Water Purifier",
//   "Fan",
//   "Fridge",
//   "Exhaust Fan",
//   "Dining Table",
//   "Geyser",
//   "Stove",
//   "Light",
//   "Curtains",
//   "Modular Kitchen",
//   "TV",
//   "Chimney",
//   "AC",
//   "Bed",
//   "Wardrobe",
//   "Sofa",
//   "Washing Machine",
//   "Microwave",
//   "Home Automation",
//   "Smart Card Access",
//   "Solar Heater",
//   "Split AC",
//   "VRV AC",
// ];
// const WATER = ["Municipal Supply", "Borewell/Underground", "Tanker", "Others"];
// const ADVANTAGES = [
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
// const HIGHLIGHTS = [
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
// const FACINGS = [
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
// const IMAGE_TYPES = [
//   "Living Room",
//   "Bedroom",
//   "Study Room",
//   "Attached Bathroom",
//   "Bathroom",
//   "Kitchen",
//   "Exterior View",
//   "Garden",
//   "Parking",
//   "Terrace",
//   "Swimming Pool",
//   "Balcony",
//   "Floor Plan",
//   "Other",
// ];
// const initial = {
//   title: "",
//   category: "Rent",
//   buildingType: "Residential",
//   propertyType: "",
//   city: "",
//   state: "",
//   country: "India",
//   locality: "",
//   society: "",
//   address: "",
//   pinCode: "",
//   latitude: "",
//   longitude: "",
//   rentAmount: "",
//   rentFrequency: "Per Month",
//   negotiable: false,
//   maintenanceAmount: "",
//   maintenanceFrequency: "Monthly",
//   includedInRent: false,
//   depositType: "One Month",
//   depositAmount: "",
//   bhk: "",
//   areaValue: "",
//   areaType: "Built-up Area",
//   areaUnit: "Sq. Ft.",
//   additionalSpaces: [],
//   availability: "Immediately",
//   availableDate: "",
//   suitedFor: [],
//   furnishingStatus: "",
//   furnishingItems: [],
//   bathrooms: "",
//   coveredParking: 0,
//   openParking: 0,
//   powerBackup: false,
//   waterSources: [],
//   liftAvailable: false,
//   locationAdvantages: [],
//   balconies: 0,
//   facing: "",
//   view: "",
//   flooring: "",
//   roadWidth: "",
//   roadUnit: "Feet",
//   totalFloors: "",
//   propertyFloor: "",
//   towerBlock: "",
//   unitNo: "",
//   keepUnitNoPrivate: false,
//   amenities: [],
//   highlights: [],
//   oneLineDescription: "",
//   description: "",
//   videoLink: "",
//   tags: "",
//   floorPlan: null,
//   reraCertificate: null,
//   otherDocuments: [],
// };
// const input =
//   "h-12 w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] px-4 text-sm text-[#1F4256] outline-none transition focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";

// function Card({ title, note, children }) {
//   return (
//     <section className="rounded-[24px] border border-[#E4EDEF] bg-white p-5 shadow-[0_8px_30px_rgba(31,66,86,.06)] sm:p-7">
//       <header className="mb-6 border-b border-slate-100 pb-4">
//         <h2 className="text-lg font-black text-[#1F4256]">{title}</h2>
//         {note && <p className="mt-1 text-xs text-slate-400">{note}</p>}
//       </header>
//       {children}
//     </section>
//   );
// }
// function Field({ label, required, children, error }) {
//   return (
//     <label className="block">
//       <span className="mb-2 block text-xs font-extrabold text-[#526E7C]">
//         {label}
//         {required && <b className="ml-1 text-rose-500">*</b>}
//       </span>
//       {children}
//       {error && (
//         <small className="mt-1 block font-semibold text-rose-500">
//           {error}
//         </small>
//       )}
//     </label>
//   );
// }
// function Chips({ options, value, onChange, single = false }) {
//   const selected = single ? [value] : value;
//   return (
//     <div className="flex flex-wrap gap-2">
//       {options.map((x) => {
//         const active = selected.includes(x);
//         return (
//           <button
//             type="button"
//             key={x}
//             onClick={() =>
//               onChange(
//                 single
//                   ? x
//                   : active
//                     ? selected.filter((v) => v !== x)
//                     : [...selected, x],
//               )
//             }
//             className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${active ? "border-[#1F4256] bg-[#1F4256] text-white shadow" : "border-slate-200 bg-white text-slate-500 hover:border-[#3ED6AE]"}`}
//           >
//             {active && <FiCheck className="mr-1 inline" />}
//             {x}
//           </button>
//         );
//       })}
//     </div>
//   );
// }
// function Select({ value, onChange, options }) {
//   return (
//     <select
//       className={input}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     >
//       <option value="">Select</option>
//       {options.map((x) => (
//         <option key={x}>{x}</option>
//       ))}
//     </select>
//   );
// }

// export default function RentalPropertyForm({ onChangeListingType }) {
//   const editId = new URLSearchParams(window.location.search).get("edit");
//   const [draftId, setDraftId] = useState(editId || null);
//   const [step, setStep] = useState(0),
//     [form, setForm] = useState(initial),
//     [images, setImages] = useState([]),
//     [video, setVideo] = useState(null),
//     [floorPlan, setFloorPlan] = useState(null),
//     [reraCertificate, setReraCertificate] = useState(null),
//     [otherDocuments, setOtherDocuments] = useState([]),
//     [errors, setErrors] = useState({}),
//     [saving, setSaving] = useState(false),
//     [locationLoading, setLocationLoading] = useState(false),
//     [locationMessage, setLocationMessage] = useState("");
//   useEffect(() => {
//     if (!editId) return;
//     (async () => {
//       try {
//         const response = await getRentalPropertyByIdApi(editId);
//         const p = response?.data || response;
//         setForm({ ...initial, title: p.title || "", propertyType: p.propertyType || "", buildingType: p.buildingType || "Residential", city: p.location?.city || "", state: p.location?.state || "", country: p.location?.country || "India", locality: p.location?.locality || "", society: p.location?.society || "", address: p.location?.address || "", pinCode: p.location?.pinCode || "", latitude: p.location?.latitude ?? "", longitude: p.location?.longitude ?? "", rentAmount: p.rent?.amount ?? "", rentFrequency: p.rent?.frequency || "Per Month", negotiable: Boolean(p.rent?.negotiable), maintenanceAmount: p.maintenance?.amount ?? "", maintenanceFrequency: p.maintenance?.frequency || "Monthly", includedInRent: Boolean(p.maintenance?.includedInRent), depositType: p.securityDeposit?.type || "Zero Deposit", depositAmount: p.securityDeposit?.amount ?? "", bhk: p.bhk || "", areaValue: p.areaDetails?.[0]?.value ?? "", areaType: p.areaDetails?.[0]?.type || "Built-up Area", areaUnit: p.areaDetails?.[0]?.unit || "Sq. Ft.", additionalSpaces: p.additionalSpaces || [], availability: p.availability?.availableFrom || "Immediately", availableDate: p.availability?.availableDate || "", suitedFor: p.suitedFor || [], furnishingStatus: p.furnishing?.status || "", furnishingItems: (p.furnishing?.items || []).map((x) => x.name), bathrooms: p.specifications?.bathrooms ?? "", coveredParking: p.specifications?.coveredParking ?? 0, openParking: p.specifications?.openParking ?? 0, powerBackup: Boolean(p.specifications?.powerBackup), waterSources: p.specifications?.waterSources || [], liftAvailable: Boolean(p.specifications?.liftAvailable), locationAdvantages: p.specifications?.locationAdvantages || [], balconies: p.specifications?.balconies ?? 0, facing: p.specifications?.facing || "", view: p.specifications?.view || "", flooring: p.specifications?.flooring || "", roadWidth: p.specifications?.connectingRoadWidth?.value ?? "", roadUnit: p.specifications?.connectingRoadWidth?.unit || "Feet", totalFloors: p.specifications?.totalFloorCount ?? "", propertyFloor: p.specifications?.propertyFloor ?? "", towerBlock: p.specifications?.towerBlock || "", unitNo: p.specifications?.unitNo || "", keepUnitNoPrivate: Boolean(p.specifications?.keepUnitNoPrivate), amenities: p.amenities || [], highlights: p.propertyHighlights || [], oneLineDescription: p.oneLineDescription || "", description: p.description || "", videoLink: p.videoLink || p.media?.videos?.[0]?.url || "", tags: Array.isArray(p.tags) ? p.tags.join(", ") : "" });
//         setImages((p.media?.images || []).map((x) => ({ ...x, preview: x.url, file: null })));
//       } catch (e) {
//         await Swal.fire({ icon: "error", title: "Unable to load property", text: e?.response?.data?.message || e.message, confirmButtonColor: "#1F4256" });
//       }
//     })();
//   }, [editId]);
//   const set = (key, value) => {
//     setForm((p) => ({ ...p, [key]: value }));
//   };

//   const applyAddress = (address, displayName = "") =>
//     setForm((p) => ({
//       ...p,
//       city:
//         address.city ||
//         address.town ||
//         address.village ||
//         address.municipality ||
//         address.county ||
//         p.city,
//       state: address.state || p.state,
//       country: address.country || p.country || "India",
//       locality:
//         address.suburb ||
//         address.neighbourhood ||
//         address.city_district ||
//         address.village ||
//         address.postcode ||
//         p.locality,
//       pinCode: address.postcode?.replace(/\D/g, "").slice(0, 6) || p.pinCode,
//       address: displayName || p.address,
//     }));
//   const reverseGeocode = async (lat, lng) => {
//     try {
//       setLocationLoading(true);
//       setLocationMessage("");
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lng}`,
//       );
//       if (!res.ok) throw new Error("Location service unavailable");
//       const data = await res.json();
//       applyAddress(data.address || {}, data.display_name || "");
//       setLocationMessage("Map location selected and address filled.");
//     } catch (err) {
//       setLocationMessage(
//         err.message || "Address could not be fetched; coordinates are saved.",
//       );
//     } finally {
//       setLocationLoading(false);
//     }
//   };
//   const lookupPin = async (pin = form.pinCode) => {
//     if (!/^[1-9]\d{5}$/.test(pin)) {
//       setLocationMessage("Enter a valid 6 digit PIN code.");
//       return;
//     }

//     try {
//       setLocationLoading(true);
//       setLocationMessage("");

//       // 1) PIN -> postal city/state/country
//       const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
//       if (!res.ok) throw new Error("PIN service unavailable");
//       const data = await res.json();
//       const offices = data?.[0]?.PostOffice || [];
//       const office = offices[0];
//       if (!office) throw new Error("No location found for this PIN code");

//       const city = office.District || office.Block || office.Name || "";
//       const state = office.State || "";
//       const country = office.Country || "India";
//       const locality = office.Name || office.Block || city;

//       setForm((p) => ({
//         ...p,
//         pinCode: pin,
//         city,
//         state,
//         country,
//         locality: p.locality || locality,
//       }));

//       // 2) PIN -> approximate geographic center so the map moves immediately.
//       // A PIN covers an area, so this is an area-level position, not an exact property address.
//       const geoRes = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&country=India&postalcode=${encodeURIComponent(pin)}`,
//         { headers: { Accept: "application/json" } },
//       );
//       const geoData = geoRes.ok ? await geoRes.json() : [];
//       const geo = geoData?.[0];

//       if (geo?.lat && geo?.lon) {
//         setForm((p) => ({
//           ...p,
//           pinCode: pin,
//           city,
//           state,
//           country,
//           locality: p.locality || locality,
//           latitude: Number(geo.lat).toFixed(6),
//           longitude: Number(geo.lon).toFixed(6),
//           address: p.address || geo.display_name || `${city}, ${state}, ${country}`,
//         }));
//       }

//       setLocationMessage(`PIN verified: ${city}, ${state}. Map centered on ${city}.`);
//     } catch (err) {
//       setLocationMessage(err.message || "PIN lookup failed");
//     } finally {
//       setLocationLoading(false);
//     }
//   }; 

//   // Lookup automatically as soon as the user enters a valid 6-digit PIN.
//   useEffect(() => {
//     if (!/^[1-9]\d{5}$/.test(form.pinCode)) return undefined;
//     const timer = setTimeout(() => lookupPin(form.pinCode), 350);
//     return () => clearTimeout(timer);
//   }, [form.pinCode]);
//   const validate = () => {
//     const e = {};
//     if (step === 0) {
//       if (!form.title.trim()) e.title = "Property title is required";
//       if (!form.propertyType) e.propertyType = "Select property type";
//       if (!form.city.trim()) e.city = "City is required";
//       if (!form.locality.trim()) e.locality = "Locality is required";
//       if (!(Number(form.rentAmount) > 0)) e.rent = "Enter valid rent";
//       if (!form.bhk) e.bhk = "Select BHK";
//       if (!(Number(form.areaValue) > 0)) e.area = "Enter valid area";
//     }
//     if (step === 1) {
//       if (!images.length) e.images = "At least one image is required";
//       if (!form.furnishingStatus) e.furnishing = "Select furnishing status";
//       if (form.availability === "Later" && !form.availableDate)
//         e.date = "Select available date";
//     }
//     if (step === 2) {
//       if (form.bathrooms === "") e.bathrooms = "Required";
//       if (!form.oneLineDescription.trim()) e.oneLine = "Required";
//       if (form.description.trim().length < 25)
//         e.description = "Minimum 25 characters required";
//     }
//     setErrors(e);
//     return !Object.keys(e).length;
//   };
//   const goNext = async () => {
//     if (step === 0 && !validate()) return;
//     await saveDraft();
//     setStep((s) => s + 1);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   const chooseImages = (e) => {
//     const files = [...(e.target.files || [])];
//     const remaining = Math.max(0, 25 - images.length);
//     const selected = files.slice(0, remaining).map((file, i) => ({
//       file,
//       preview: URL.createObjectURL(file),
//       category: images.length + i === 0 ? "Living Room" : "Other",
//       isCover: images.length + i === 0,
//     }));
//     setImages((p) => [...p, ...selected].slice(0, 25));
//     e.target.value = "";
//   };

//   const chooseOtherDocuments = (e) => {
//     const files = [...(e.target.files || [])];
//     const remaining = Math.max(0, 3 - otherDocuments.length);
//     const selected = files.slice(0, remaining).map((file) => ({
//       file,
//       preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
//     }));
//     setOtherDocuments((p) => [...p, ...selected].slice(0, 3));
//     e.target.value = "";
//   };
//   const buildPayload = (status = "Submitted") => ({
//     sourceModel: "RentalProperty",
//     listingType: "Rent",
//     transactionType: "Rent",
//     title: form.title,
//     category: form.category,
//     buildingType: form.buildingType,
//     propertyType: form.propertyType,
//     location: {
//       city: form.city,
//       state: form.state,
//       country: form.country,
//       locality: form.locality,
//       society: form.society,
//       address: form.address,
//       pinCode: form.pinCode || null,
//       latitude: form.latitude || null,
//       longitude: form.longitude || null,
//       isLocationConfirmed: Boolean(form.latitude && form.longitude),
//     },
//     rent: {
//       amount: Number(form.rentAmount || 0),
//       frequency: form.rentFrequency,
//       negotiable: form.negotiable,
//     },
//     maintenance: {
//       amount: Number(form.maintenanceAmount || 0),
//       frequency: form.maintenanceFrequency,
//       includedInRent: form.includedInRent,
//     },
//     securityDeposit: {
//       type: form.depositType,
//       amount: Number(form.depositAmount || 0),
//     },
//     bhk: form.bhk,
//     areaDetails: [
//       {
//         value: Number(form.areaValue || 0),
//         type: form.areaType,
//         unit: form.areaUnit,
//         display: true,
//       },
//     ],
//     additionalSpaces: form.additionalSpaces,
//     videoLink: form.videoLink,
//     tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
//     imageMeta: images.map(({ category, isCover }) => ({ category, isCover })),
//     availability: {
//       availableFrom: form.availability,
//       availableDate: form.availability === "Later" ? form.availableDate : null,
//     },
//     suitedFor: form.suitedFor,
//     furnishing: {
//       status: form.furnishingStatus,
//       items: form.furnishingItems.map((name) => ({ name, quantity: 1 })),
//     },
//     specifications: {
//       bathrooms: Number(form.bathrooms || 0),
//       coveredParking: Number(form.coveredParking || 0),
//       openParking: Number(form.openParking || 0),
//       powerBackup: form.powerBackup,
//       waterSources: form.waterSources,
//       liftAvailable: form.liftAvailable,
//       locationAdvantages: form.locationAdvantages,
//       balconies: Number(form.balconies || 0),
//       facing: form.facing || null,
//       view: form.view || null,
//       flooring: form.flooring || null,
//       connectingRoadWidth: {
//         value: form.roadWidth ? Number(form.roadWidth) : null,
//         unit: form.roadUnit,
//       },
//       totalFloorCount: form.totalFloors ? Number(form.totalFloors) : null,
//       propertyFloor: form.propertyFloor ? Number(form.propertyFloor) : null,
//       towerBlock: form.towerBlock,
//       unitNo: form.unitNo,
//       keepUnitNoPrivate: form.keepUnitNoPrivate,
//     },
//     amenities: form.amenities,
//     propertyHighlights: form.highlights,
//     oneLineDescription: form.oneLineDescription,
//     description: form.description,
//     status,
//   });

//   const buildFormData = (status = "Submitted") => {
//     const body = new FormData();
//     body.append("data", JSON.stringify(buildPayload(status)));
//     images.forEach((x) => { if (x.file) body.append("images", x.file); });
//     if (video) body.append("video", video);
//     if (floorPlan) body.append("floorPlan", floorPlan);
//     if (reraCertificate) body.append("reraCertificate", reraCertificate);
//     otherDocuments.forEach((x) => body.append("documents", x.file));
//     return body;
//   };

//   const saveDraft = async () => {
//     try {
//       setSaving(true);
//       // Keep a local copy as a safety net; the backend also stores the Draft when the API call succeeds.
//       localStorage.setItem(
//         "diginiwas_rental_property_draft",
//         JSON.stringify({ form, imageMeta: images.map(({ category, isCover }) => ({ category, isCover })) }),
//       );
//       const result = draftId
//         ? await updateRentalPropertyApi(draftId, buildFormData("Draft"))
//         : await createRentalPropertyApi(buildFormData("Draft"));
//       if (!draftId && result?.data?._id) setDraftId(result.data._id);
//       await Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Draft saved",
//         showConfirmButton: false,
//         timer: 1800,
//       });
//     } catch (err) {
//       await Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: "Draft saved locally",
//         text: err?.response?.data?.message || "Server draft could not be saved.",
//         showConfirmButton: false,
//         timer: 2500,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const submit = async () => {
//     if (!validate()) return;
//     try {
//       setSaving(true);
//       const result = draftId
//         ? await updateRentalPropertyApi(draftId, buildFormData("Submitted"))
//         : await createRentalPropertyApi(buildFormData("Submitted"));
//       localStorage.removeItem("diginiwas_rental_property_draft");
//       await Swal.fire({
//         icon: "success",
//         title: "Property submitted successfully",
//         text: `${result?.data?.propertyId || "Property"} has been submitted for review.`,
//         confirmButtonColor: "#1F4256",
//       });
//       setForm(initial);
//       setImages([]);
//       setVideo(null);
//       setFloorPlan(null);
//       setReraCertificate(null);
//       setOtherDocuments([]);
//       setStep(0);
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Submission failed",
//         text: err?.response?.data?.message || err.message,
//         confirmButtonColor: "#1F4256",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const showPreview = () => {
//     Swal.fire({
//       title: "Final Property Preview",
//       width: 760,
//       confirmButtonText: "Edit Property",
//       confirmButtonColor: "#1F4256",
//       showCancelButton: true,
//       cancelButtonText: "Close Preview",
//       html: `
//         <div style="text-align:left;font-size:12px;color:#526E7C;line-height:1.7">
//           <div style="font-size:18px;font-weight:800;color:#1F4256;margin-bottom:10px">${form.title || "Untitled Property"}</div>
//           <div><b>Location:</b> ${[form.locality, form.city, form.state, form.pinCode].filter(Boolean).join(", ") || "-"}</div>
//           <div><b>Property:</b> ${form.propertyType || "-"} • ${form.bhk || "-"}</div>
//           <div><b>Rent:</b> ₹${Number(form.rentAmount || 0).toLocaleString("en-IN")} / ${form.rentFrequency === "Per Year" ? "year" : "month"}</div>
//           <div><b>Area:</b> ${form.areaValue || "-"} ${form.areaUnit || ""}</div>
//           <div><b>Media:</b> ${images.length} images • ${video ? "1 video" : "0 video"} • ${floorPlan ? "1 floor plan" : "0 floor plan"} • ${reraCertificate ? "1 RERA" : "0 RERA"} • ${otherDocuments.length}/3 other documents</div>
//           <div style="margin-top:10px"><b>Description:</b><br/>${(form.description || "-").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
//         </div>
//       `,
//     });
//   };

//   // Building Type is the single source of truth.
//   // Residential -> render the residential rental form.
//   // Commercial -> immediately render the commercial rental form.
//   // Keeping this decision after all hooks prevents the Rules-of-Hooks error.
//   if (form.buildingType === "Commercial") {
//     return (
//       <CommercialRentalPropertyForm
//         onBack={() => setForm((p) => ({ ...p, buildingType: "Residential" }))}
//         onChangeListingType={onChangeListingType}
//       />
//     );
//   }

//   const steps = [
//     {
//       name: "Property Snapshot",
//       hint: "Type, location & pricing",
//       icon: FiHome,
//     },
//     { name: "Space & Lifestyle", hint: "Furnishing & media", icon: FiImage },
//     {
//       name: "Details & Publish",
//       hint: "Specifications & story",
//       icon: FiMapPin,
//     },
//   ];
//   return (
//     <div className="min-h-screen bg-[#F3F7F8] pb-8">
//       <div className="bg-[#1F4256] px-4 py-7 text-white sm:px-8">
//         <div className="mx-auto flex max-w-7xl justify-between">
//           <div>
//             <button
//               onClick={onChangeListingType}
//               className="mb-3 flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white"
//             >
//               <FiArrowLeft /> Change listing type
//             </button>
//             <h1 className="text-2xl font-black sm:text-3xl">
//               Create rental listing
//             </h1>
//             <p className="mt-1 text-sm text-white/55">
//               A guided form designed for better rental enquiries.
//             </p>
//           </div>
//           <div className="hidden h-fit rounded-2xl bg-[#3ED6AE] px-5 py-3 text-sm font-black text-[#1F4256] sm:block">
//             {Math.round(((step + 1) / 3) * 100)}% complete
//           </div>
//         </div>
//       </div>
//       <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-8"><div className="flex items-center justify-between rounded-2xl border border-[#DCE7EA] bg-white px-4 py-3 shadow-sm"><span className="text-xs font-black text-[#526E7C]">Your progress</span><span className="rounded-full bg-[#EAF8F4] px-3 py-1 text-xs font-black text-[#16876B]">{Math.round((step / steps.length) * 100)}% complete</span></div></div>
      // <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-8 lg:grid-cols-[270px_1fr]">
//         <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-24">
//           <p className="mb-5 text-[10px] font-black uppercase tracking-[.2em] text-[#26ae8c]">
//             Your progress
//           </p>
//           {steps.map((s, i) => {
//             const Icon = s.icon;
//             return (
//               <div key={s.name} className="relative flex gap-3 pb-7 last:pb-0">
//                 <span
//                   className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${i <= step ? "bg-[#1F4256] text-white" : "bg-slate-100 text-slate-400"}`}
//                 >
//                   {i < step ? <FiCheck /> : <Icon />}
//                 </span>
//                 {i < 2 && (
//                   <span
//                     className={`absolute left-5 top-10 h-7 w-px ${i < step ? "bg-[#3ED6AE]" : "bg-slate-200"}`}
//                   />
//                 )}
//                 <span>
//                   <b
//                     className={`block text-sm ${i === step ? "text-[#1F4256]" : "text-slate-400"}`}
//                   >
//                     {s.name}
//                   </b>
//                   <small className="text-[11px] text-slate-400">{s.hint}</small>
//                 </span>
//               </div>
//             );
//           })}
//         </aside>
//         <main className="space-y-5">
//           {step === 0 && (
//             <>
//               <Card
//                 title="Property snapshot"
//                 note="Choose the exact property category."
//               >
//                 <div className="space-y-6">
//                   <Field label="Listing Title" required error={errors.title}>
//                     <input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Furnished 2 BHK near City Center" />
//                   </Field>
//                   <Field label="Category" required>
//                     <Chips options={["Rent"]} value="Rent" onChange={() => set("category", "Rent")} single />
//                   </Field>
//                   <Field label="Building Type" required>
//                     <Chips
//                       options={["Residential", "Commercial"]}
//                       value={form.buildingType}
//                       onChange={(v) => set("buildingType", v)}
//                       single
//                     />
//                   </Field>
//                   <Field
//                     label="Property Type"
//                     required
//                     error={errors.propertyType}
//                   >
//                     <Chips
//                       options={TYPES}
//                       value={form.propertyType}
//                       onChange={(v) => set("propertyType", v)}
//                       single
//                     />
//                   </Field>
//                 </div>
//               </Card>
//               <Card title="Location & project">
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <Field label="City" required error={errors.city}>
//                     <input
//                       className={input}
//                       value={form.city}
//                       onChange={(e) => set("city", e.target.value)}
//                       placeholder="Indore"
//                     />
//                   </Field>
//                   <Field
//                     label="Locality / Society"
//                     required
//                     error={errors.locality}
//                   >
//                     <input
//                       className={input}
//                       value={form.locality}
//                       onChange={(e) => set("locality", e.target.value)}
//                       placeholder="Mahalaxmi Nagar"
//                     />
//                   </Field>
//                   <Field label="Society / Project">
//                     <input
//                       className={input}
//                       value={form.society}
//                       onChange={(e) => set("society", e.target.value)}
//                       placeholder="Search project"
//                     />
//                   </Field>
//                   <Field label="PIN Code">
//                     <div className="flex gap-2"><input className={input} maxLength={6} value={form.pinCode} onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, ""))} onBlur={() => form.pinCode.length === 6 && lookupPin()} placeholder="6 digit PIN" /><button type="button" disabled={locationLoading} onClick={() => lookupPin()} className="shrink-0 rounded-xl bg-[#1F4256] px-4 text-xs font-black text-white disabled:opacity-50">Find city</button></div>
//                   </Field>
//                   <Field label="State"><input className={input} value={form.state} onChange={(e) => set("state", e.target.value)} /></Field>
//                   <Field label="Country"><input className={input} value={form.country} onChange={(e) => set("country", e.target.value)} /></Field>
//                   <div className="sm:col-span-2">
//                     <Field label="Complete Address">
//                       <input
//                         className={input}
//                         value={form.address}
//                         onChange={(e) => set("address", e.target.value)}
//                       />
//                     </Field>
//                   </div>
//                   <Field label="Latitude">
//                     <input
//                       type="number"
//                       className={input}
//                       value={form.latitude}
//                       onChange={(e) => set("latitude", e.target.value)}
//                     />
//                   </Field>
//                   <Field label="Longitude">
//                     <input
//                       type="number"
//                       className={input}
//                       value={form.longitude}
//                       onChange={(e) => set("longitude", e.target.value)}
//                     />
//                   </Field>
//                   <div className="sm:col-span-2 overflow-hidden rounded-[20px] border border-[#DCE7EA] bg-[#F9FBFC] p-2">
//                     <div className="mb-2 flex items-center justify-between px-2"><span className="text-xs font-extrabold text-[#526E7C]">Select exact location on map</span>{locationLoading && <span className="text-xs font-bold text-[#26ae8c]">Finding address...</span>}</div>
//                     <MapPicker formData={form} setFormData={setForm} onLocationChange={reverseGeocode} />
//                   </div>
//                   {locationMessage && <p className="sm:col-span-2 rounded-xl bg-[#3ED6AE]/10 px-4 py-3 text-xs font-bold text-[#1F4256]">{locationMessage}</p>}
//                 </div>
//               </Card>
//               <Card title="Rental pricing">
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <Field label="Property Rent" required error={errors.rent}>
//                     <div className="flex">
//                       <input
//                         type="number"
//                         className={`${input} rounded-r-none`}
//                         value={form.rentAmount}
//                         onChange={(e) => set("rentAmount", e.target.value)}
//                         placeholder="₹ Rent"
//                       />
//                       <select
//                         className={`${input} w-36 rounded-l-none`}
//                         value={form.rentFrequency}
//                         onChange={(e) => set("rentFrequency", e.target.value)}
//                       >
//                         <option>Per Month</option>
//                         <option>Per Year</option>
//                       </select>
//                     </div>
//                   </Field>
//                   <Field label="Maintenance">
//                     <div className="flex">
//                       <input
//                         type="number"
//                         className={`${input} rounded-r-none`}
//                         value={form.maintenanceAmount}
//                         onChange={(e) =>
//                           set("maintenanceAmount", e.target.value)
//                         }
//                       />
//                       <select
//                         className={`${input} w-36 rounded-l-none`}
//                         value={form.maintenanceFrequency}
//                         onChange={(e) =>
//                           set("maintenanceFrequency", e.target.value)
//                         }
//                       >
//                         {[
//                           "Per SqFt",
//                           "Monthly",
//                           "Quarterly",
//                           "Yearly",
//                           "One Time",
//                         ].map((x) => (
//                           <option key={x}>{x}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </Field>
//                   <Field label="Security Deposit">
//                     <Select
//                       value={form.depositType}
//                       onChange={(v) => set("depositType", v)}
//                       options={[
//                         "Zero Deposit",
//                         "One Month",
//                         "Two Months",
//                         "Other",
//                       ]}
//                     />
//                   </Field>
//                   <Field label="Deposit Amount">
//                     <input
//                       type="number"
//                       className={input}
//                       value={form.depositAmount}
//                       onChange={(e) => set("depositAmount", e.target.value)}
//                     />
//                   </Field>
//                 </div>
//                 <div className="mt-4 flex flex-wrap gap-5">
//                   {[
//                     ["includedInRent", "Maintenance included in rent"],
//                     ["negotiable", "Rent negotiable"],
//                   ].map(([k, l]) => (
//                     <label key={k} className="text-xs font-bold text-slate-600">
//                       <input
//                         type="checkbox"
//                         className="mr-2 accent-[#1F4256]"
//                         checked={form[k]}
//                         onChange={(e) => set(k, e.target.checked)}
//                       />
//                       {l}
//                     </label>
//                   ))}
//                 </div>
//               </Card>
//               <Card title="Configuration & area">
//                 <div className="space-y-5">
//                   <Field label="BHK" required error={errors.bhk}>
//                     <Chips
//                       options={BHK}
//                       value={form.bhk}
//                       onChange={(v) => set("bhk", v)}
//                       single
//                     />
//                   </Field>
//                   <div className="grid gap-3 sm:grid-cols-3">
//                     <Field label="Area Size" required error={errors.area}>
//                       <input
//                         type="number"
//                         className={input}
//                         value={form.areaValue}
//                         onChange={(e) => set("areaValue", e.target.value)}
//                       />
//                     </Field>
//                     <Field label="Area Type">
//                       <Select
//                         value={form.areaType}
//                         onChange={(v) => set("areaType", v)}
//                         options={[
//                           "Built-up Area",
//                           "Super Built-up Area",
//                           "Carpet Area",
//                           "Saleable Area",
//                           "Plot Area",
//                         ]}
//                       />
//                     </Field>
//                     <Field label="Unit">
//                       <Select
//                         value={form.areaUnit}
//                         onChange={(v) => set("areaUnit", v)}
//                         options={[
//                           "Sq. Ft.",
//                           "Sq. Meter",
//                           "Sq. Yard",
//                           "Acre",
//                           "Hectare",
//                         ]}
//                       />
//                     </Field>
//                   </div>
//                   <Field label="Additional Spaces">
//                     <Chips
//                       options={SPACES}
//                       value={form.additionalSpaces}
//                       onChange={(v) => set("additionalSpaces", v)}
//                     />
//                   </Field>
//                 </div>
//               </Card>
//             </>
//           )}
//           {step === 1 && (
//             <>
//               <Card
//                 title="Media & highlights"
//                 note="First image will be selected as the cover."
//               >
//                 <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#3ED6AE]/60 bg-[#3ED6AE]/5">
//                   <FiUploadCloud size={30} />
//                   <b className="mt-3 text-sm text-[#1F4256]">
//                     Upload property images
//                   </b>
//                   <small className="mt-1 text-slate-400">
//                     JPG, PNG, WEBP · maximum 25
//                   </small>
//                   <input
//                     hidden
//                     multiple
//                     type="file"
//                     accept="image/*"
//                     onChange={chooseImages}
//                   />
//                 </label>
//                 {errors.images && (
//                   <small className="text-rose-500">{errors.images}</small>
//                 )}
//                 <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
//                   {images.map((x, i) => (
//                     <div
//                       key={x.preview}
//                       className={`overflow-hidden rounded-2xl border ${x.isCover ? "border-[#3ED6AE] ring-2 ring-[#3ED6AE]/20" : "border-slate-200"}`}
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={x.preview}
//                           className="h-full w-full object-cover"
//                         />
//                         <button
//                           onClick={() =>
//                             setImages(images.filter((_, n) => n !== i))
//                           }
//                           className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white"
//                         >
//                           <FiX />
//                         </button>
//                         {x.isCover && (
//                           <span className="absolute bottom-2 left-2 rounded-full bg-[#3ED6AE] px-2 py-1 text-[9px] font-black">
//                             COVER
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex gap-2 p-2">
//                         <select
//                           className="min-w-0 flex-1 rounded-lg border p-2 text-[10px]"
//                           value={x.category}
//                           onChange={(e) =>
//                             setImages(
//                               images.map((z, n) =>
//                                 n === i
//                                   ? { ...z, category: e.target.value }
//                                   : z,
//                               ),
//                             )
//                           }
//                         >
//                           {IMAGE_TYPES.map((c) => (
//                             <option key={c}>{c}</option>
//                           ))}
//                         </select>
//                         <button
//                           onClick={() =>
//                             setImages(
//                               images.map((z, n) => ({
//                                 ...z,
//                                 isCover: n === i,
//                               })),
//                             )
//                           }
//                           className="rounded-lg border px-2 text-[9px] font-bold"
//                         >
//                           Cover
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-5 grid gap-4 sm:grid-cols-2">
//                   <Field label="Walkthrough Video (max 1)">
//                     <input type="file" accept="video/mp4,video/webm,video/quicktime" className={`${input} h-auto py-3`} onChange={(e) => setVideo(e.target.files?.[0] || null)} />
//                     {video && <small className="mt-1 block text-emerald-600">{video.name}</small>}
//                   </Field>
//                   <Field label="Floor Plan (max 1)">
//                     <input type="file" accept="application/pdf,image/*" className={`${input} h-auto py-3`} onChange={(e) => setFloorPlan(e.target.files?.[0] || null)} />
//                     {floorPlan && <small className="mt-1 block text-emerald-600">{floorPlan.name}</small>}
//                   </Field>
//                   <Field label="RERA Certificate (max 1)">
//                     <input type="file" accept="application/pdf,image/*" className={`${input} h-auto py-3`} onChange={(e) => setReraCertificate(e.target.files?.[0] || null)} />
//                     {reraCertificate && <small className="mt-1 block text-emerald-600">{reraCertificate.name}</small>}
//                   </Field>
//                   <Field label={`Other Documents (max 3) — ${otherDocuments.length}/3`}>
//                     <input type="file" multiple accept=".pdf,.doc,.docx,image/*" className={`${input} h-auto py-3`} onChange={chooseOtherDocuments} disabled={otherDocuments.length >= 3} />
//                     <div className="mt-2 space-y-1">
//                       {otherDocuments.map((doc, i) => (
//                         <div key={`${doc.file.name}-${i}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
//                           <span className="truncate">{doc.file.name}</span>
//                           <button type="button" onClick={() => setOtherDocuments((p) => p.filter((_, n) => n !== i))} className="ml-2 text-rose-500"><FiX /></button>
//                         </div>
//                       ))}
//                     </div>
//                   </Field>
//                   <Field label="Video Link"><input type="url" className={input} value={form.videoLink} onChange={(e) => set("videoLink", e.target.value)} placeholder="YouTube / Vimeo URL" /></Field>
//                   <Field label="Tags"><input className={input} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="metro, furnished, pet-friendly" /></Field>
//                 </div>
//               </Card>
//               <Card title="Availability & tenant preference">
//                 <div className="space-y-5">
//                   <Field label="Available From">
//                     <Chips
//                       options={["Immediately", "Later"]}
//                       value={form.availability}
//                       onChange={(v) => set("availability", v)}
//                       single
//                     />
//                   </Field>
//                   {form.availability === "Later" && (
//                     <Field label="Available Date" required error={errors.date}>
//                       <input
//                         type="date"
//                         className={input}
//                         value={form.availableDate}
//                         onChange={(e) => set("availableDate", e.target.value)}
//                       />
//                     </Field>
//                   )}
//                   <Field label="Suited For">
//                     <Chips
//                       options={SUITED}
//                       value={form.suitedFor}
//                       onChange={(v) => set("suitedFor", v)}
//                     />
//                   </Field>
//                   <Field
//                     label="Furnishing Status"
//                     required
//                     error={errors.furnishing}
//                   >
//                     <Chips
//                       options={["Furnished", "Semi-Furnished", "Unfurnished"]}
//                       value={form.furnishingStatus}
//                       onChange={(v) => set("furnishingStatus", v)}
//                       single
//                     />
//                   </Field>
//                   {form.furnishingStatus &&
//                     form.furnishingStatus !== "Unfurnished" && (
//                       <Field label="Furnishing Details">
//                         <Chips
//                           options={ITEMS}
//                           value={form.furnishingItems}
//                           onChange={(v) => set("furnishingItems", v)}
//                         />
//                       </Field>
//                     )}
//                 </div>
//               </Card>
//             </>
//           )}
//           {step === 2 && (
//             <>
//               <Card title="Space & specifications">
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   <Field label="Bathrooms" required error={errors.bathrooms}>
//                     <input
//                       type="number"
//                       className={input}
//                       value={form.bathrooms}
//                       onChange={(e) => set("bathrooms", e.target.value)}
//                     />
//                   </Field>
//                   {[
//                     ["coveredParking", "Covered Parking"],
//                     ["openParking", "Open Parking"],
//                     ["balconies", "Balconies"],
//                     ["propertyFloor", "Property Floor"],
//                     ["totalFloors", "Total Floors"],
//                   ].map(([k, l]) => (
//                     <Field key={k} label={l}>
//                       <input
//                         type="number"
//                         className={input}
//                         value={form[k]}
//                         onChange={(e) => set(k, e.target.value)}
//                       />
//                     </Field>
//                   ))}
//                   <Field label="Facing">
//                     <Select
//                       value={form.facing}
//                       onChange={(v) => set("facing", v)}
//                       options={FACINGS}
//                     />
//                   </Field>
//                   <Field label="View">
//                     <Select
//                       value={form.view}
//                       onChange={(v) => set("view", v)}
//                       options={VIEWS}
//                     />
//                   </Field>
//                   <Field label="Flooring">
//                     <Select
//                       value={form.flooring}
//                       onChange={(v) => set("flooring", v)}
//                       options={FLOORING}
//                     />
//                   </Field>
//                   <Field label="Tower / Block">
//                     <input
//                       className={input}
//                       value={form.towerBlock}
//                       onChange={(e) => set("towerBlock", e.target.value)}
//                     />
//                   </Field>
//                   <Field label="Unit No.">
//                     <input
//                       className={input}
//                       value={form.unitNo}
//                       onChange={(e) => set("unitNo", e.target.value)}
//                     />
//                   </Field>
//                   <Field label="Connecting Road">
//                     <div className="flex">
//                       <input
//                         type="number"
//                         className={`${input} rounded-r-none`}
//                         value={form.roadWidth}
//                         onChange={(e) => set("roadWidth", e.target.value)}
//                       />
//                       <select
//                         className={`${input} w-24 rounded-l-none`}
//                         value={form.roadUnit}
//                         onChange={(e) => set("roadUnit", e.target.value)}
//                       >
//                         <option>Feet</option>
//                         <option>Meter</option>
//                       </select>
//                     </div>
//                   </Field>
//                 </div>
//                 <div className="mt-6 space-y-5">
//                   <Field label="Power Backup">
//                     <Chips
//                       options={["Available", "No Backup"]}
//                       value={form.powerBackup ? "Available" : "No Backup"}
//                       onChange={(v) => set("powerBackup", v === "Available")}
//                       single
//                     />
//                   </Field>
//                   <Field label="Lift Availability">
//                     <Chips
//                       options={["Yes", "No"]}
//                       value={form.liftAvailable ? "Yes" : "No"}
//                       onChange={(v) => set("liftAvailable", v === "Yes")}
//                       single
//                     />
//                   </Field>
//                   <Field label="Water Source">
//                     <Chips
//                       options={WATER}
//                       value={form.waterSources}
//                       onChange={(v) => set("waterSources", v)}
//                     />
//                   </Field>
//                   <Field label="Location Advantages">
//                     <Chips
//                       options={ADVANTAGES}
//                       value={form.locationAdvantages}
//                       onChange={(v) => set("locationAdvantages", v)}
//                     />
//                   </Field>
//                   <label className="text-xs font-bold">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       checked={form.keepUnitNoPrivate}
//                       onChange={(e) =>
//                         set("keepUnitNoPrivate", e.target.checked)
//                       }
//                     />
//                     Keep unit number private
//                   </label>
//                 </div>
//               </Card>
//               <Card title="Amenities & property story">
//                 <div className="space-y-6">
//                   <Field label="Amenities">
//                     <Chips
//                       options={AMENITIES}
//                       value={form.amenities}
//                       onChange={(v) => set("amenities", v)}
//                     />
//                   </Field>
//                   <Field label="Property Highlights">
//                     <Chips
//                       options={HIGHLIGHTS}
//                       value={form.highlights}
//                       onChange={(v) => set("highlights", v)}
//                     />
//                   </Field>
//                   <Field
//                     label="One-line Description"
//                     required
//                     error={errors.oneLine}
//                   >
//                     <input
//                       maxLength={200}
//                       className={input}
//                       value={form.oneLineDescription}
//                       onChange={(e) =>
//                         set("oneLineDescription", e.target.value)
//                       }
//                       placeholder="Short listing highlight"
//                     />
//                   </Field>
//                   <Field
//                     label="Property Description"
//                     required
//                     error={errors.description}
//                   >
//                     <textarea
//                       rows={7}
//                       className={`${input} h-auto py-3`}
//                       value={form.description}
//                       onChange={(e) => set("description", e.target.value)}
//                       placeholder="Describe property, neighbourhood and connectivity..."
//                     />
//                   </Field>
//                 </div>
//               </Card>
//             </>
//           )}
//           <div className="sticky bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-white/95 p-3 shadow-[0_12px_40px_rgba(31,66,86,.15)] backdrop-blur">
//             <button
//               type="button"
//               disabled={step === 0}
//               onClick={() => setStep(step - 1)}
//               className="flex h-11 items-center gap-2 rounded-xl border px-5 text-sm font-bold disabled:opacity-30"
//             >
//               <FiArrowLeft /> Previous
//             </button>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 type="button"
//                 onClick={showPreview}
//                 className="flex h-11 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-sm font-bold text-[#1F4256] hover:bg-slate-50"
//               >
//                 <FiEye /> Preview Property
//               </button>
//               <button
//                 type="button"
//                 disabled={saving}
//                 onClick={saveDraft}
//                 className="flex h-11 items-center gap-2 rounded-xl border border-[#3ED6AE] px-4 text-sm font-bold text-[#1F4256] disabled:opacity-50"
//               >
//                 <FiSave /> Save Draft
//               </button>
//               {step < 2 ? (
//                 <button
//                   type="button"
//                   onClick={goNext}
//                   className="flex h-11 items-center gap-2 rounded-xl bg-[#1F4256] px-7 text-sm font-black text-white"
//                 >
//                   Save & Continue <FiArrowRight />
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   disabled={saving}
//                   onClick={submit}
//                   className="flex h-11 items-center gap-2 rounded-xl bg-[#3ED6AE] px-7 text-sm font-black text-[#1F4256] disabled:opacity-60"
//                 >
//                   {saving ? "Publishing..." : "Publish Property"}
//                   <FiCheck />
//                 </button>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHome,
  FiImage,
  FiMapPin,
  FiEye,
  FiSave,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { createRentalPropertyApi, getRentalPropertyByIdApi, updateRentalPropertyApi } from "../../../Services/propertyService";
import MapPicker from "../../../components/MapPicker";
import CommercialRentalPropertyForm from "./CommercialRentalPropertyForm";

const TYPES = [
  "Apartment",
  "Villa",
  "Plot",
  "Builder Floor",
  "Penthouse",
  "Independent House",
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
const SUITED = [
  "Students",
  "Working Professionals",
  "Family",
  "Bachelor",
  "Company Lease",
  "Any",
];
const ITEMS = [
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
const WATER = ["Municipal Supply", "Borewell/Underground", "Tanker", "Others"];
const ADVANTAGES = [
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
const HIGHLIGHTS = [
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
const IMAGE_TYPES = [
  "Living Room",
  "Bedroom",
  "Study Room",
  "Attached Bathroom",
  "Bathroom",
  "Kitchen",
  "Exterior View",
  "Garden",
  "Parking",
  "Terrace",
  "Swimming Pool",
  "Balcony",
  "Floor Plan",
  "Other",
];
const initial = {
  title: "",
  category: "Rent",
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
  rentAmount: "",
  rentFrequency: "Per Month",
  negotiable: false,
  maintenanceAmount: "",
  maintenanceFrequency: "Monthly",
  includedInRent: false,
  depositType: "One Month",
  depositAmount: "",
  bhk: "",
  areaValue: "",
  areaType: "Built-up Area",
  areaUnit: "Sq. Ft.",
  additionalSpaces: [],
  availability: "Immediately",
  availableDate: "",
  suitedFor: [],
  furnishingStatus: "",
  furnishingItems: [],
  bathrooms: "",
  coveredParking: 0,
  openParking: 0,
  powerBackup: false,
  waterSources: [],
  liftAvailable: false,
  locationAdvantages: [],
  balconies: 0,
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
  amenities: [],
  highlights: [],
  oneLineDescription: "",
  description: "",
  videoLink: "",
  tags: "",
  floorPlan: null,
  reraCertificate: null,
  otherDocuments: [],
};
const input =
  "h-12 w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] px-4 text-sm text-[#1F4256] outline-none transition focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";

function Card({ title, note, children }) {
  return (
    <section className="rounded-[24px] border border-[#E4EDEF] bg-white p-5 shadow-[0_8px_30px_rgba(31,66,86,.06)] sm:p-7">
      <header className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-black text-[#1F4256]">{title}</h2>
        {note && <p className="mt-1 text-xs text-slate-400">{note}</p>}
      </header>
      {children}
    </section>
  );
}
function Field({ label, required, children, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#526E7C]">
        {label}
        {required && <b className="ml-1 text-rose-500">*</b>}
      </span>
      {children}
      {error && (
        <small className="mt-1 block font-semibold text-rose-500">
          {error}
        </small>
      )}
    </label>
  );
}
function Chips({ options, value, onChange, single = false }) {
  const selected = single ? [value] : value;
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((x) => {
        const active = selected.includes(x);
        return (
          <button
            type="button"
            key={x}
            onClick={() =>
              onChange(
                single
                  ? x
                  : active
                    ? selected.filter((v) => v !== x)
                    : [...selected, x],
              )
            }
            className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${active ? "border-[#1F4256] bg-[#1F4256] text-white shadow" : "border-slate-200 bg-white text-slate-500 hover:border-[#3ED6AE]"}`}
          >
            {active && <FiCheck className="mr-1 inline" />}
            {x}
          </button>
        );
      })}
    </div>
  );
}
function Select({ value, onChange, options }) {
  return (
    <select
      className={input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      {options.map((x) => (
        <option key={x}>{x}</option>
      ))}
    </select>
  );
}

export default function RentalPropertyForm({ onChangeListingType }) {
  const editId = new URLSearchParams(window.location.search).get("edit");
  const [draftId, setDraftId] = useState(editId || null);
  const [step, setStep] = useState(0),
    [form, setForm] = useState(initial),
    [images, setImages] = useState([]),
    [video, setVideo] = useState(null),
    [floorPlan, setFloorPlan] = useState(null),
    [reraCertificate, setReraCertificate] = useState(null),
    [otherDocuments, setOtherDocuments] = useState([]),
    [errors, setErrors] = useState({}),
    [saving, setSaving] = useState(false),
    [locationLoading, setLocationLoading] = useState(false),
    [locationMessage, setLocationMessage] = useState("");
  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const response = await getRentalPropertyByIdApi(editId);
        const p = response?.data || response;
        setForm({ ...initial, title: p.title || "", propertyType: p.propertyType || "", buildingType: p.buildingType || "Residential", city: p.location?.city || "", state: p.location?.state || "", country: p.location?.country || "India", locality: p.location?.locality || "", society: p.location?.society || "", address: p.location?.address || "", pinCode: p.location?.pinCode || "", latitude: p.location?.latitude ?? "", longitude: p.location?.longitude ?? "", rentAmount: p.rent?.amount ?? "", rentFrequency: p.rent?.frequency || "Per Month", negotiable: Boolean(p.rent?.negotiable), maintenanceAmount: p.maintenance?.amount ?? "", maintenanceFrequency: p.maintenance?.frequency || "Monthly", includedInRent: Boolean(p.maintenance?.includedInRent), depositType: p.securityDeposit?.type || "Zero Deposit", depositAmount: p.securityDeposit?.amount ?? "", bhk: p.bhk || "", areaValue: p.areaDetails?.[0]?.value ?? "", areaType: p.areaDetails?.[0]?.type || "Built-up Area", areaUnit: p.areaDetails?.[0]?.unit || "Sq. Ft.", additionalSpaces: p.additionalSpaces || [], availability: p.availability?.availableFrom || "Immediately", availableDate: p.availability?.availableDate || "", suitedFor: p.suitedFor || [], furnishingStatus: p.furnishing?.status || "", furnishingItems: (p.furnishing?.items || []).map((x) => x.name), bathrooms: p.specifications?.bathrooms ?? "", coveredParking: p.specifications?.coveredParking ?? 0, openParking: p.specifications?.openParking ?? 0, powerBackup: Boolean(p.specifications?.powerBackup), waterSources: p.specifications?.waterSources || [], liftAvailable: Boolean(p.specifications?.liftAvailable), locationAdvantages: p.specifications?.locationAdvantages || [], balconies: p.specifications?.balconies ?? 0, facing: p.specifications?.facing || "", view: p.specifications?.view || "", flooring: p.specifications?.flooring || "", roadWidth: p.specifications?.connectingRoadWidth?.value ?? "", roadUnit: p.specifications?.connectingRoadWidth?.unit || "Feet", totalFloors: p.specifications?.totalFloorCount ?? "", propertyFloor: p.specifications?.propertyFloor ?? "", towerBlock: p.specifications?.towerBlock || "", unitNo: p.specifications?.unitNo || "", keepUnitNoPrivate: Boolean(p.specifications?.keepUnitNoPrivate), amenities: p.amenities || [], highlights: p.propertyHighlights || [], oneLineDescription: p.oneLineDescription || "", description: p.description || "", videoLink: p.videoLink || p.media?.videos?.[0]?.url || "", tags: Array.isArray(p.tags) ? p.tags.join(", ") : "" });
        setImages((p.media?.images || []).map((x) => ({ ...x, preview: x.url, file: null })));
      } catch (e) {
        await Swal.fire({ icon: "error", title: "Unable to load property", text: e?.response?.data?.message || e.message, confirmButtonColor: "#1F4256" });
      }
    })();
  }, [editId]);
  const set = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

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
    } catch (err) {
      setLocationMessage(
        err.message || "Address could not be fetched; coordinates are saved.",
      );
    } finally {
      setLocationLoading(false);
    }
  };
  const lookupPin = async (pin = form.pinCode) => {
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setLocationMessage("Enter a valid 6 digit PIN code.");
      return;
    }

    try {
      setLocationLoading(true);
      setLocationMessage("");

      // 1) PIN -> postal city/state/country
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!res.ok) throw new Error("PIN service unavailable");
      const data = await res.json();
      const offices = data?.[0]?.PostOffice || [];
      const office = offices[0];
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

      // 2) PIN -> approximate geographic center so the map moves immediately.
      // A PIN covers an area, so this is an area-level position, not an exact property address.
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&country=India&postalcode=${encodeURIComponent(pin)}`,
        { headers: { Accept: "application/json" } },
      );
      const geoData = geoRes.ok ? await geoRes.json() : [];
      const geo = geoData?.[0];

      if (geo?.lat && geo?.lon) {
        setForm((p) => ({
          ...p,
          pinCode: pin,
          city,
          state,
          country,
          locality: p.locality || locality,
          latitude: Number(geo.lat).toFixed(6),
          longitude: Number(geo.lon).toFixed(6),
          address: p.address || geo.display_name || `${city}, ${state}, ${country}`,
        }));
      }

      setLocationMessage(`PIN verified: ${city}, ${state}. Map centered on ${city}.`);
    } catch (err) {
      setLocationMessage(err.message || "PIN lookup failed");
    } finally {
      setLocationLoading(false);
    }
  }; 

  // Lookup automatically as soon as the user enters a valid 6-digit PIN.
  useEffect(() => {
    if (!/^[1-9]\d{5}$/.test(form.pinCode)) return undefined;
    const timer = setTimeout(() => lookupPin(form.pinCode), 350);
    return () => clearTimeout(timer);
  }, [form.pinCode]);
  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.title.trim()) e.title = "Property title is required";
      if (!form.propertyType) e.propertyType = "Select property type";
      if (!form.city.trim()) e.city = "City is required";
      if (!form.locality.trim()) e.locality = "Locality is required";
      if (!(Number(form.rentAmount) > 0)) e.rent = "Enter valid rent";
      if (!form.bhk) e.bhk = "Select BHK";
      if (!(Number(form.areaValue) > 0)) e.area = "Enter valid area";
    }
    if (step === 1) {
      if (!images.length) e.images = "At least one image is required";
      if (!form.furnishingStatus) e.furnishing = "Select furnishing status";
      if (form.availability === "Later" && !form.availableDate)
        e.date = "Select available date";
    }
    if (step === 2) {
      if (form.bathrooms === "") e.bathrooms = "Required";
      if (!form.oneLineDescription.trim()) e.oneLine = "Required";
      if (form.description.trim().length < 25)
        e.description = "Minimum 25 characters required";
    }
    setErrors(e);
    return !Object.keys(e).length;
  };
  const goNext = async () => {
    if (!validate()) return;

    const saved = await saveDraft();
    if (!saved) return;

    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const chooseImages = (e) => {
    const files = [...(e.target.files || [])];
    const remaining = Math.max(0, 25 - images.length);
    const selected = files.slice(0, remaining).map((file, i) => ({
      file,
      preview: URL.createObjectURL(file),
      category: images.length + i === 0 ? "Living Room" : "Other",
      isCover: images.length + i === 0,
    }));
    setImages((p) => [...p, ...selected].slice(0, 25));
    e.target.value = "";
  };

  const chooseOtherDocuments = (e) => {
    const files = [...(e.target.files || [])];
    const remaining = Math.max(0, 3 - otherDocuments.length);
    const selected = files.slice(0, remaining).map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
    setOtherDocuments((p) => [...p, ...selected].slice(0, 3));
    e.target.value = "";
  };
  const getDraftDescription = () => {
    const value = String(form.description || "").trim();
    return value.length >= 25
      ? value
      : "Draft property - details pending. Please complete the property description before publishing.";
  };

  const getDraftOneLineDescription = () => {
    const value = String(form.oneLineDescription || "").trim();
    return value || "Draft property - details pending";
  };

  const buildPayload = (status = "Submitted") => ({
    sourceModel: "RentalProperty",
    listingType: "Rent",
    transactionType: "Rent",
    title: form.title,
    category: form.category,
    buildingType: form.buildingType,
    propertyType: form.propertyType,
    location: {
      city: form.city,
      state: form.state,
      country: form.country,
      locality: form.locality,
      society: form.society,
      address: form.address,
      pinCode: form.pinCode || null,
      latitude: form.latitude || null,
      longitude: form.longitude || null,
      isLocationConfirmed: Boolean(form.latitude && form.longitude),
    },
    rent: {
      amount: Number(form.rentAmount || 0),
      frequency: form.rentFrequency,
      negotiable: form.negotiable,
    },
    maintenance: {
      amount: Number(form.maintenanceAmount || 0),
      frequency: form.maintenanceFrequency,
      includedInRent: form.includedInRent,
    },
    securityDeposit: {
      type: form.depositType,
      amount: Number(form.depositAmount || 0),
    },
    bhk: form.bhk,
    areaDetails: [
      {
        value: Number(form.areaValue || 0),
        type: form.areaType,
        unit: form.areaUnit,
        display: true,
      },
    ],
    additionalSpaces: form.additionalSpaces,
    videoLink: form.videoLink,
    tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    imageMeta: images.map(({ category, isCover }) => ({ category, isCover })),
    availability: {
      availableFrom: form.availability,
      availableDate: form.availability === "Later" ? form.availableDate : null,
    },
    suitedFor: form.suitedFor,
    furnishing: {
      status: form.furnishingStatus,
      items: form.furnishingItems.map((name) => ({ name, quantity: 1 })),
    },
    specifications: {
      bathrooms: Number(form.bathrooms || 0),
      coveredParking: Number(form.coveredParking || 0),
      openParking: Number(form.openParking || 0),
      powerBackup: form.powerBackup,
      waterSources: form.waterSources,
      liftAvailable: form.liftAvailable,
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
      propertyFloor: form.propertyFloor ? Number(form.propertyFloor) : null,
      towerBlock: form.towerBlock,
      unitNo: form.unitNo,
      keepUnitNoPrivate: form.keepUnitNoPrivate,
    },
    amenities: form.amenities,
    propertyHighlights: form.highlights,
    oneLineDescription:
      status === "Draft" ? getDraftOneLineDescription() : form.oneLineDescription.trim(),
    description:
      status === "Draft" ? getDraftDescription() : form.description.trim(),
    status,
  });

  const buildFormData = (status = "Submitted") => {
    const body = new FormData();
    body.append("data", JSON.stringify(buildPayload(status)));
    images.forEach((x) => { if (x.file) body.append("images", x.file); });
    if (video) body.append("video", video);
    if (floorPlan) body.append("floorPlan", floorPlan);
    if (reraCertificate) body.append("reraCertificate", reraCertificate);
    otherDocuments.forEach((x) => body.append("documents", x.file));
    return body;
  };

  const saveDraft = async () => {
    try {
      setSaving(true);
      // Keep a local copy as a safety net; the backend also stores the Draft when the API call succeeds.
      localStorage.setItem(
        "diginiwas_rental_property_draft",
        JSON.stringify({ form, imageMeta: images.map(({ category, isCover }) => ({ category, isCover })) }),
      );
      const result = draftId
        ? await updateRentalPropertyApi(draftId, buildFormData("Draft"))
        : await createRentalPropertyApi(buildFormData("Draft"));
      if (!draftId && result?.data?._id) setDraftId(result.data._id);
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Draft saved",
        showConfirmButton: false,
        timer: 1800,
      });
      return true;
    } catch (err) {
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Draft saved locally",
        text: err?.response?.data?.message || "Server draft could not be saved.",
        showConfirmButton: false,
        timer: 2500,
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
      const result = draftId
        ? await updateRentalPropertyApi(draftId, buildFormData("Submitted"))
        : await createRentalPropertyApi(buildFormData("Submitted"));
      localStorage.removeItem("diginiwas_rental_property_draft");
      await Swal.fire({
        icon: "success",
        title: "Property submitted successfully",
        text: `${result?.data?.propertyId || "Property"} has been submitted for review.`,
        confirmButtonColor: "#1F4256",
      });
      setForm(initial);
      setImages([]);
      setVideo(null);
      setFloorPlan(null);
      setReraCertificate(null);
      setOtherDocuments([]);
      setStep(0);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: err?.response?.data?.message || err.message,
        confirmButtonColor: "#1F4256",
      });
    } finally {
      setSaving(false);
    }
  };

  const showPreview = () => {
    Swal.fire({
      title: "Final Property Preview",
      width: 760,
      confirmButtonText: "Edit Property",
      confirmButtonColor: "#1F4256",
      showCancelButton: true,
      cancelButtonText: "Close Preview",
      html: `
        <div style="text-align:left;font-size:12px;color:#526E7C;line-height:1.7">
          <div style="font-size:18px;font-weight:800;color:#1F4256;margin-bottom:10px">${form.title || "Untitled Property"}</div>
          <div><b>Location:</b> ${[form.locality, form.city, form.state, form.pinCode].filter(Boolean).join(", ") || "-"}</div>
          <div><b>Property:</b> ${form.propertyType || "-"} • ${form.bhk || "-"}</div>
          <div><b>Rent:</b> ₹${Number(form.rentAmount || 0).toLocaleString("en-IN")} / ${form.rentFrequency === "Per Year" ? "year" : "month"}</div>
          <div><b>Area:</b> ${form.areaValue || "-"} ${form.areaUnit || ""}</div>
          <div><b>Media:</b> ${images.length} images • ${video ? "1 video" : "0 video"} • ${floorPlan ? "1 floor plan" : "0 floor plan"} • ${reraCertificate ? "1 RERA" : "0 RERA"} • ${otherDocuments.length}/3 other documents</div>
          <div style="margin-top:10px"><b>Description:</b><br/>${(form.description || "-").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        </div>
      `,
    });
  };

  // Building Type is the single source of truth.
  // Residential -> render the residential rental form.
  // Commercial -> immediately render the commercial rental form.
  // Keeping this decision after all hooks prevents the Rules-of-Hooks error.
  if (form.buildingType === "Commercial") {
    return (
      <CommercialRentalPropertyForm
        onBack={() => setForm((p) => ({ ...p, buildingType: "Residential" }))}
        onChangeListingType={onChangeListingType}
      />
    );
  }

  const steps = [
    {
      name: "Property Snapshot",
      hint: "Type, location & pricing",
      icon: FiHome,
    },
    { name: "Space & Lifestyle", hint: "Furnishing & media", icon: FiImage },
    {
      name: "Details & Publish",
      hint: "Specifications & story",
      icon: FiMapPin,
    },
  ];
  return (
    <div className="min-h-screen bg-[#F3F7F8] pb-8">
      <div className="px-4 pt-4 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[24px] bg-[#1F4256] px-5 py-5 shadow-[0_12px_35px_rgba(31,66,86,.16)] sm:px-7">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#3ED6AE] text-[#1F4256]"><FiHome size={23} /></div>
            <div className="min-w-0">
              <button onClick={onChangeListingType} className="mb-1 text-left text-[10px] font-black uppercase tracking-[.16em] text-white/55 hover:text-white">Change listing type</button>
              <h1 className="truncate text-xl font-black sm:text-2xl">Create rental listing</h1>
              <p className="mt-0.5 hidden text-xs text-white/65 sm:block">Create and manage a complete rental property listing.</p>
            </div>
          </div>
          <div className="hidden shrink-0 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-right sm:block">
            <p className="text-[9px] font-black uppercase tracking-wider text-white/45">Current view</p>
            <p className="mt-0.5 text-xs font-black"><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#3ED6AE]" />Rental Property</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-8"><div className="flex items-center justify-between rounded-2xl border border-[#DCE7EA] bg-white px-4 py-3 shadow-sm"><span className="text-xs font-black text-[#526E7C]">Your progress</span><span className="rounded-full bg-[#EAF8F4] px-3 py-1 text-xs font-black text-[#16876B]">{Math.round((step / steps.length) * 100)}% complete</span></div></div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-8 lg:grid-cols-[270px_1fr]">
        <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="mb-5 text-[10px] font-black uppercase tracking-[.2em] text-[#26ae8c]">
            Your progress
          </p>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="relative flex gap-3 pb-7 last:pb-0">
                <span
                  className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${i <= step ? "bg-[#1F4256] text-white" : "bg-slate-100 text-slate-400"}`}
                >
                  {i < step ? <FiCheck /> : <Icon />}
                </span>
                {i < 2 && (
                  <span
                    className={`absolute left-5 top-10 h-7 w-px ${i < step ? "bg-[#3ED6AE]" : "bg-slate-200"}`}
                  />
                )}
                <span>
                  <b
                    className={`block text-sm ${i === step ? "text-[#1F4256]" : "text-slate-400"}`}
                  >
                    {s.name}
                  </b>
                  <small className="text-[11px] text-slate-400">{s.hint}</small>
                </span>
              </div>
            );
          })}
        </aside>
        <main className="space-y-5">
          {step === 0 && (
            <>
              <Card
                title="Property snapshot"
                note="Choose the exact property category."
              >
                <div className="space-y-6">
                  <Field label="Listing Title" required error={errors.title}>
                    <input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Furnished 2 BHK near City Center" />
                  </Field>
                  <Field label="Category" required>
                    <Chips options={["Rent"]} value="Rent" onChange={() => set("category", "Rent")} single />
                  </Field>
                  <Field label="Building Type" required>
                    <Chips
                      options={["Residential", "Commercial"]}
                      value={form.buildingType}
                      onChange={(v) => set("buildingType", v)}
                      single
                    />
                  </Field>
                  <Field
                    label="Property Type"
                    required
                    error={errors.propertyType}
                  >
                    <Chips
                      options={TYPES}
                      value={form.propertyType}
                      onChange={(v) => set("propertyType", v)}
                      single
                    />
                  </Field>
                </div>
              </Card>
              <Card title="Location & project">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="City" required error={errors.city}>
                    <input
                      className={input}
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Indore"
                    />
                  </Field>
                  <Field
                    label="Locality / Society"
                    required
                    error={errors.locality}
                  >
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
                      placeholder="Search project"
                    />
                  </Field>
                  <Field label="PIN Code">
                    <div className="flex gap-2"><input className={input} maxLength={6} value={form.pinCode} onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, ""))} onBlur={() => form.pinCode.length === 6 && lookupPin()} placeholder="6 digit PIN" /><button type="button" disabled={locationLoading} onClick={() => lookupPin()} className="shrink-0 rounded-xl bg-[#1F4256] px-4 text-xs font-black text-white disabled:opacity-50">Find city</button></div>
                  </Field>
                  <Field label="State"><input className={input} value={form.state} onChange={(e) => set("state", e.target.value)} /></Field>
                  <Field label="Country"><input className={input} value={form.country} onChange={(e) => set("country", e.target.value)} /></Field>
                  <div className="sm:col-span-2">
                    <Field label="Complete Address">
                      <input
                        className={input}
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                      />
                    </Field>
                  </div>
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
                  <div className="sm:col-span-2 overflow-hidden rounded-[20px] border border-[#DCE7EA] bg-[#F9FBFC] p-2">
                    <div className="mb-2 flex items-center justify-between px-2"><span className="text-xs font-extrabold text-[#526E7C]">Select exact location on map</span>{locationLoading && <span className="text-xs font-bold text-[#26ae8c]">Finding address...</span>}</div>
                    <MapPicker formData={form} setFormData={setForm} onLocationChange={reverseGeocode} />
                  </div>
                  {locationMessage && <p className="sm:col-span-2 rounded-xl bg-[#3ED6AE]/10 px-4 py-3 text-xs font-bold text-[#1F4256]">{locationMessage}</p>}
                </div>
              </Card>
              <Card title="Rental pricing">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Property Rent" required error={errors.rent}>
                    <div className="flex">
                      <input
                        type="number"
                        className={`${input} rounded-r-none`}
                        value={form.rentAmount}
                        onChange={(e) => set("rentAmount", e.target.value)}
                        placeholder="₹ Rent"
                      />
                      <select
                        className={`${input} w-36 rounded-l-none`}
                        value={form.rentFrequency}
                        onChange={(e) => set("rentFrequency", e.target.value)}
                      >
                        <option>Per Month</option>
                        <option>Per Year</option>
                      </select>
                    </div>
                  </Field>
                  <Field label="Maintenance">
                    <div className="flex">
                      <input
                        type="number"
                        className={`${input} rounded-r-none`}
                        value={form.maintenanceAmount}
                        onChange={(e) =>
                          set("maintenanceAmount", e.target.value)
                        }
                      />
                      <select
                        className={`${input} w-36 rounded-l-none`}
                        value={form.maintenanceFrequency}
                        onChange={(e) =>
                          set("maintenanceFrequency", e.target.value)
                        }
                      >
                        {[
                          "Per SqFt",
                          "Monthly",
                          "Quarterly",
                          "Yearly",
                          "One Time",
                        ].map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </div>
                  </Field>
                  <Field label="Security Deposit">
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
                  <Field label="Deposit Amount">
                    <input
                      type="number"
                      className={input}
                      value={form.depositAmount}
                      onChange={(e) => set("depositAmount", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="mt-4 flex flex-wrap gap-5">
                  {[
                    ["includedInRent", "Maintenance included in rent"],
                    ["negotiable", "Rent negotiable"],
                  ].map(([k, l]) => (
                    <label key={k} className="text-xs font-bold text-slate-600">
                      <input
                        type="checkbox"
                        className="mr-2 accent-[#1F4256]"
                        checked={form[k]}
                        onChange={(e) => set(k, e.target.checked)}
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </Card>
              <Card title="Configuration & area">
                <div className="space-y-5">
                  <Field label="BHK" required error={errors.bhk}>
                    <Chips
                      options={BHK}
                      value={form.bhk}
                      onChange={(v) => set("bhk", v)}
                      single
                    />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Area Size" required error={errors.area}>
                      <input
                        type="number"
                        className={input}
                        value={form.areaValue}
                        onChange={(e) => set("areaValue", e.target.value)}
                      />
                    </Field>
                    <Field label="Area Type">
                      <Select
                        value={form.areaType}
                        onChange={(v) => set("areaType", v)}
                        options={[
                          "Built-up Area",
                          "Super Built-up Area",
                          "Carpet Area",
                          "Saleable Area",
                          "Plot Area",
                        ]}
                      />
                    </Field>
                    <Field label="Unit">
                      <Select
                        value={form.areaUnit}
                        onChange={(v) => set("areaUnit", v)}
                        options={[
                          "Sq. Ft.",
                          "Sq. Meter",
                          "Sq. Yard",
                          "Acre",
                          "Hectare",
                        ]}
                      />
                    </Field>
                  </div>
                  <Field label="Additional Spaces">
                    <Chips
                      options={SPACES}
                      value={form.additionalSpaces}
                      onChange={(v) => set("additionalSpaces", v)}
                    />
                  </Field>
                </div>
              </Card>
            </>
          )}
          {step === 1 && (
            <>
              <Card
                title="Media & highlights"
                note="First image will be selected as the cover."
              >
                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#3ED6AE]/60 bg-[#3ED6AE]/5">
                  <FiUploadCloud size={30} />
                  <b className="mt-3 text-sm text-[#1F4256]">
                    Upload property images
                  </b>
                  <small className="mt-1 text-slate-400">
                    JPG, PNG, WEBP · maximum 25
                  </small>
                  <input
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={chooseImages}
                  />
                </label>
                {errors.images && (
                  <small className="text-rose-500">{errors.images}</small>
                )}
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {images.map((x, i) => (
                    <div
                      key={x.preview}
                      className={`overflow-hidden rounded-2xl border ${x.isCover ? "border-[#3ED6AE] ring-2 ring-[#3ED6AE]/20" : "border-slate-200"}`}
                    >
                      <div className="relative h-32">
                        <img
                          src={x.preview}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() =>
                            setImages(images.filter((_, n) => n !== i))
                          }
                          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white"
                        >
                          <FiX />
                        </button>
                        {x.isCover && (
                          <span className="absolute bottom-2 left-2 rounded-full bg-[#3ED6AE] px-2 py-1 text-[9px] font-black">
                            COVER
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 p-2">
                        <select
                          className="min-w-0 flex-1 rounded-lg border p-2 text-[10px]"
                          value={x.category}
                          onChange={(e) =>
                            setImages(
                              images.map((z, n) =>
                                n === i
                                  ? { ...z, category: e.target.value }
                                  : z,
                              ),
                            )
                          }
                        >
                          {IMAGE_TYPES.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                        <button
                          onClick={() =>
                            setImages(
                              images.map((z, n) => ({
                                ...z,
                                isCover: n === i,
                              })),
                            )
                          }
                          className="rounded-lg border px-2 text-[9px] font-bold"
                        >
                          Cover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Walkthrough Video (max 1)">
                    <input type="file" accept="video/mp4,video/webm,video/quicktime" className={`${input} h-auto py-3`} onChange={(e) => setVideo(e.target.files?.[0] || null)} />
                    {video && <small className="mt-1 block text-emerald-600">{video.name}</small>}
                  </Field>
                  <Field label="Floor Plan (max 1)">
                    <input type="file" accept="application/pdf,image/*" className={`${input} h-auto py-3`} onChange={(e) => setFloorPlan(e.target.files?.[0] || null)} />
                    {floorPlan && <small className="mt-1 block text-emerald-600">{floorPlan.name}</small>}
                  </Field>
                  <Field label="RERA Certificate (max 1)">
                    <input type="file" accept="application/pdf,image/*" className={`${input} h-auto py-3`} onChange={(e) => setReraCertificate(e.target.files?.[0] || null)} />
                    {reraCertificate && <small className="mt-1 block text-emerald-600">{reraCertificate.name}</small>}
                  </Field>
                  <Field label={`Other Documents (max 3) — ${otherDocuments.length}/3`}>
                    <input type="file" multiple accept=".pdf,.doc,.docx,image/*" className={`${input} h-auto py-3`} onChange={chooseOtherDocuments} disabled={otherDocuments.length >= 3} />
                    <div className="mt-2 space-y-1">
                      {otherDocuments.map((doc, i) => (
                        <div key={`${doc.file.name}-${i}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                          <span className="truncate">{doc.file.name}</span>
                          <button type="button" onClick={() => setOtherDocuments((p) => p.filter((_, n) => n !== i))} className="ml-2 text-rose-500"><FiX /></button>
                        </div>
                      ))}
                    </div>
                  </Field>
                  <Field label="Video Link"><input type="url" className={input} value={form.videoLink} onChange={(e) => set("videoLink", e.target.value)} placeholder="YouTube / Vimeo URL" /></Field>
                  <Field label="Tags"><input className={input} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="metro, furnished, pet-friendly" /></Field>
                </div>
              </Card>
              <Card title="Availability & tenant preference">
                <div className="space-y-5">
                  <Field label="Available From">
                    <Chips
                      options={["Immediately", "Later"]}
                      value={form.availability}
                      onChange={(v) => set("availability", v)}
                      single
                    />
                  </Field>
                  {form.availability === "Later" && (
                    <Field label="Available Date" required error={errors.date}>
                      <input
                        type="date"
                        className={input}
                        value={form.availableDate}
                        onChange={(e) => set("availableDate", e.target.value)}
                      />
                    </Field>
                  )}
                  <Field label="Suited For">
                    <Chips
                      options={SUITED}
                      value={form.suitedFor}
                      onChange={(v) => set("suitedFor", v)}
                    />
                  </Field>
                  <Field
                    label="Furnishing Status"
                    required
                    error={errors.furnishing}
                  >
                    <Chips
                      options={["Furnished", "Semi-Furnished", "Unfurnished"]}
                      value={form.furnishingStatus}
                      onChange={(v) => set("furnishingStatus", v)}
                      single
                    />
                  </Field>
                  {form.furnishingStatus &&
                    form.furnishingStatus !== "Unfurnished" && (
                      <Field label="Furnishing Details">
                        <Chips
                          options={ITEMS}
                          value={form.furnishingItems}
                          onChange={(v) => set("furnishingItems", v)}
                        />
                      </Field>
                    )}
                </div>
              </Card>
            </>
          )}
          {step === 2 && (
            <>
              <Card title="Space & specifications">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="Bathrooms" required error={errors.bathrooms}>
                    <input
                      type="number"
                      className={input}
                      value={form.bathrooms}
                      onChange={(e) => set("bathrooms", e.target.value)}
                    />
                  </Field>
                  {[
                    ["coveredParking", "Covered Parking"],
                    ["openParking", "Open Parking"],
                    ["balconies", "Balconies"],
                    ["propertyFloor", "Property Floor"],
                    ["totalFloors", "Total Floors"],
                  ].map(([k, l]) => (
                    <Field key={k} label={l}>
                      <input
                        type="number"
                        className={input}
                        value={form[k]}
                        onChange={(e) => set(k, e.target.value)}
                      />
                    </Field>
                  ))}
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
                  <Field label="Tower / Block">
                    <input
                      className={input}
                      value={form.towerBlock}
                      onChange={(e) => set("towerBlock", e.target.value)}
                    />
                  </Field>
                  <Field label="Unit No.">
                    <input
                      className={input}
                      value={form.unitNo}
                      onChange={(e) => set("unitNo", e.target.value)}
                    />
                  </Field>
                  <Field label="Connecting Road">
                    <div className="flex">
                      <input
                        type="number"
                        className={`${input} rounded-r-none`}
                        value={form.roadWidth}
                        onChange={(e) => set("roadWidth", e.target.value)}
                      />
                      <select
                        className={`${input} w-24 rounded-l-none`}
                        value={form.roadUnit}
                        onChange={(e) => set("roadUnit", e.target.value)}
                      >
                        <option>Feet</option>
                        <option>Meter</option>
                      </select>
                    </div>
                  </Field>
                </div>
                <div className="mt-6 space-y-5">
                  <Field label="Power Backup">
                    <Chips
                      options={["Available", "No Backup"]}
                      value={form.powerBackup ? "Available" : "No Backup"}
                      onChange={(v) => set("powerBackup", v === "Available")}
                      single
                    />
                  </Field>
                  <Field label="Lift Availability">
                    <Chips
                      options={["Yes", "No"]}
                      value={form.liftAvailable ? "Yes" : "No"}
                      onChange={(v) => set("liftAvailable", v === "Yes")}
                      single
                    />
                  </Field>
                  <Field label="Water Source">
                    <Chips
                      options={WATER}
                      value={form.waterSources}
                      onChange={(v) => set("waterSources", v)}
                    />
                  </Field>
                  <Field label="Location Advantages">
                    <Chips
                      options={ADVANTAGES}
                      value={form.locationAdvantages}
                      onChange={(v) => set("locationAdvantages", v)}
                    />
                  </Field>
                  <label className="text-xs font-bold">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={form.keepUnitNoPrivate}
                      onChange={(e) =>
                        set("keepUnitNoPrivate", e.target.checked)
                      }
                    />
                    Keep unit number private
                  </label>
                </div>
              </Card>
              <Card title="Amenities & property story">
                <div className="space-y-6">
                  <Field label="Amenities">
                    <Chips
                      options={AMENITIES}
                      value={form.amenities}
                      onChange={(v) => set("amenities", v)}
                    />
                  </Field>
                  <Field label="Property Highlights">
                    <Chips
                      options={HIGHLIGHTS}
                      value={form.highlights}
                      onChange={(v) => set("highlights", v)}
                    />
                  </Field>
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
                      placeholder="Short listing highlight"
                    />
                  </Field>
                  <Field
                    label="Property Description"
                    required
                    error={errors.description}
                  >
                    <textarea
                      rows={7}
                      className={`${input} h-auto py-3`}
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Describe property, neighbourhood and connectivity..."
                    />
                  </Field>
                </div>
              </Card>
            </>
          )}
          <div className="sticky bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-white/95 p-3 shadow-[0_12px_40px_rgba(31,66,86,.15)] backdrop-blur">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="flex h-11 items-center gap-2 rounded-xl border px-5 text-sm font-bold disabled:opacity-30"
            >
              <FiArrowLeft /> Previous
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={showPreview}
                className="flex h-11 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-sm font-bold text-[#1F4256] hover:bg-slate-50"
              >
                <FiEye /> Preview Property
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={saveDraft}
                className="flex h-11 items-center gap-2 rounded-xl border border-[#3ED6AE] px-4 text-sm font-bold text-[#1F4256] disabled:opacity-50"
              >
                <FiSave /> Save Draft
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-11 items-center gap-2 rounded-xl bg-[#1F4256] px-7 text-sm font-black text-white"
                >
                  Save & Continue <FiArrowRight />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={saving}
                  onClick={submit}
                  className="flex h-11 items-center gap-2 rounded-xl bg-[#3ED6AE] px-7 text-sm font-black text-[#1F4256] disabled:opacity-60"
                >
                  {saving ? "Publishing..." : "Publish Property"}
                  <FiCheck />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
