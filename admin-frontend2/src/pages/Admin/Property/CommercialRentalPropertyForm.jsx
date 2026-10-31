// // import { useEffect, useMemo, useState, useRef } from "react";
// // import {
// //   FiArrowLeft, FiArrowRight, FiCheck, FiChevronDown, FiHome, FiImage,
// //   FiMapPin, FiTrash2, FiUploadCloud, FiBriefcase, FiFileText,
// //   FiLayers, FiGrid, FiShield, FiWind, FiCoffee, FiZap, FiDroplet,
// //   FiTruck, FiNavigation, FiActivity, FiStar, FiMaximize, FiLock,
// // } from "react-icons/fi";
// // import {
// //   MdApartment, MdBusinessCenter, MdMeetingRoom, MdStorefront, MdWarehouse,
// //   MdOutlineChair, MdOutlineWeekend, MdOutlineKitchen, MdOutlineAcUnit,
// //   MdOutlineLightbulb, MdOutlineTv, MdOutlineBed, MdOutlineLocalLaundryService,
// //   MdOutlineMicrowave, MdOutlineSecurity, MdOutlineElevator, MdOutlinePool,
// //   MdOutlineFitnessCenter, MdOutlineLocalParking, MdOutlineEvStation,
// //   MdOutlineShoppingCart, MdOutlineTheaterComedy, MdOutlinePark, MdOutlineSports,
// //   MdOutlineChildCare, MdOutlineCelebration, MdOutlineHomeWork, MdOutlineCheckCircle,
// //   MdOutlineLocationOn, MdOutlineDirectionsCar, MdOutlineBusiness,
// // } from "react-icons/md";
// // import Swal from "sweetalert2";
// // import MapPicker from "../../../components/MapPicker";
// // import {
// //   createCommercialRentalPropertyApi,
// //   getCommercialRentalPropertyByIdApi,
// //   updateCommercialRentalPropertyApi,
// // } from "../../../Services/propertyService";

// // const C = {
// //   navy: "#1F4256",
// //   teal: "#3ED6AE",
// //   bg: "#F4F8F8",
// //   border: "#DCE7EA",
// //   text: "#526E7C",
// // };

// // const PROPERTY_TYPES = ["Office Space", "Shop", "Land", "Office Space in IT/SEZ", "Showroom", "Warehouse", "Industrial Plot", "Co-working Space"];
// // const OFFICE_TYPES = ["Semi-Fitted", "Fitted Space", "Shell and Core"];
// // const PANTRY = ["Wet", "Dry", "None"];
// // const DEPOSIT = ["Zero Deposit", "One Month", "Two Months", "Other"];
// // const AREA_TYPES = ["Built-up Area", "Super Built-up Area", "Carpet Area", "Saleable Area", "Plot Area"];
// // const UNITS = ["Sq. Ft.", "Sq. Meter", "Sq. Yard", "Acre", "Hectare"];
// // const FACINGS = ["East", "West", "North", "South", "North East", "North West", "South East", "South West"];
// // const VIEWS = ["Beach View", "Garden View", "Golf Course", "Lake View", "Park View", "Road View", "Community View", "Pool View", "Creek View", "Sea View"];
// // const FLOORING = ["Marble", "Concrete", "Cemented", "Carpeted", "Wooden", "Vitrified Tiles", "Wooden Tiles", "Imported Tiles", "Indian Tiles", "Ceramic", "Hardwood", "Carpet", "Others"];
// // const ADVANTAGES = ["Good School in vicinity", "Nearby Metro Station", "Peaceful Vicinity", "Near City Center", "Safe & Secure Locality", "Near Reputed Hospital", "Close to Shopping Mall/Market", "Highway/Expressway Access", "Near IT Park/Business Hub", "Close to Railway Station"];
// // const AMENITIES = [
// //   ["Gymnasium", MdOutlineFitnessCenter], ["Swimming Pool", MdOutlinePool], ["Kids Play Areas", MdOutlineChildCare], ["Jogging/Cycle Track", MdOutlineSports],
// //   ["Power Backup", FiZap], ["Attached Market", MdOutlineShoppingCart], ["24 x 7 Security", MdOutlineSecurity], ["Clubhouse", MdOutlineHomeWork],
// //   ["High Speed Elevators", MdOutlineElevator], ["Day Care Center", MdOutlineChildCare], ["Party Hall", MdOutlineCelebration], ["EV Charging", MdOutlineEvStation],
// //   ["Multi-level Parking", MdOutlineLocalParking], ["Multi-purpose Sports Court", MdOutlineSports], ["Theatre/Mini Cinema", MdOutlineTheaterComedy],
// //   ["Rooftop Deck/Observatory", MdOutlinePark], ["Shopping Complex", MdOutlineShoppingCart], ["Community Shuttle Service", MdOutlineDirectionsCar], ["Central Park", MdOutlinePark],
// // ];
// // const HIGHLIGHTS = [
// //   ["Premium Location", MdOutlineLocationOn], ["Corner Unit", MdOutlineBusiness], ["Vastu Compliant", MdOutlineHomeWork], ["Low Density Project", FiGrid],
// //   ["Quiet/Low Traffic Area", FiNavigation], ["Wheelchair Accessible", FiActivity], ["Never Occupied", FiStar], ["Road Facing", MdOutlineDirectionsCar],
// //   ["High Visibility", FiMaximize], ["Ready to Move", MdOutlineCheckCircle],
// // ];
// // const FURNISHING_ITEMS = [
// //   ["Water Purifier", FiDroplet], ["Fan", FiWind], ["Fridge", FiGrid], ["Exhaust Fan", FiWind], ["Dining Table", MdOutlineChair], ["Geyser", FiZap],
// //   ["Stove", MdOutlineKitchen], ["Light", MdOutlineLightbulb], ["Curtains", MdOutlineWeekend], ["Modular Kitchen", MdOutlineKitchen], ["TV", MdOutlineTv], ["Chimney", FiWind],
// //   ["AC", MdOutlineAcUnit], ["Bed", MdOutlineBed], ["Wardrobe", MdOutlineWeekend], ["Sofa", MdOutlineWeekend], ["Washing Machine", MdOutlineLocalLaundryService], ["Microwave", MdOutlineMicrowave],
// //   ["Home Automation", FiHome], ["Smart Card Access", FiLock], ["Solar Heater", FiZap], ["Split AC", MdOutlineAcUnit], ["VRV AC", MdOutlineAcUnit],
// // ];
// // const FURNISHING_STATUS = [
// //   ["Furnished", MdOutlineChair, "Ready-to-use workspace with furniture & fittings"],
// //   ["Semi-Furnished", MdOutlineWeekend, "Essential fittings with flexible setup"],
// //   ["Unfurnished", MdBusinessCenter, "Open space ready for your custom setup"],
// // ];

// // const initial = {
// //   title: "", propertyType: "", city: "", state: "", country: "India", locality: "", society: "", address: "", pinCode: "", latitude: "", longitude: "",
// //   rentAmount: "", rentFrequency: "Per Month", negotiable: false, maintenanceAmount: "", maintenanceFrequency: "Monthly", includedInRent: false,
// //   depositType: "One Month", depositAmount: "", areaValue: "", areaType: "Built-up Area", areaUnit: "Sq. Ft.", companyLease: false,
// //   officeSpaceType: [], pantry: "None", personalWashroom: false, coveredParking: 0, openParking: 0, powerBackup: false, liftAvailable: false,
// //   furnishingStatus: "", furnishingItems: [], bathrooms: 0, waterSources: [], locationAdvantages: [], balconies: 0, facing: "", view: "", flooring: "",
// //   roadWidth: "", roadUnit: "Feet", totalFloors: "", propertyFloor: "", towerBlock: "", unitNo: "", keepUnitNoPrivate: false,
// //   amenities: [], highlights: [], oneLineDescription: "", description: "", aiGeneratedDescriptions: [], videoLink: "",
// // };

// // const input = "h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] px-3.5 text-sm text-[#1F4256] outline-none transition focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";

// // function getUser() {
// //   try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
// // }

// // function Card({ title, note, icon, children }) {
// //   return <section className="rounded-[24px] border border-[#E4EDEF] bg-white p-5 shadow-[0_8px_30px_rgba(31,66,86,.06)] sm:p-7">
// //     <header className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-4">
// //       <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF8F4] text-[#16876B]">{icon}</div>
// //       <div><h2 className="text-lg font-black text-[#1F4256]">{title}</h2>{note && <p className="mt-1 text-xs text-slate-400">{note}</p>}</div>
// //     </header>{children}
// //   </section>;
// // }

// // function Field({ label, required, error, children }) {
// //   return <label className="block"><span className="mb-2 block text-xs font-extrabold text-[#526E7C]">{label}{required && <b className="ml-1 text-rose-500">*</b>}</span>{children}{error && <small className="mt-1 block font-semibold text-rose-500">{error}</small>}</label>;
// // }

// // function ThemeSelect({ value, onChange, options, placeholder = "Select" }) {
// //   return <div className="relative"><select value={value || ""} onChange={(e) => onChange(e.target.value)} className={`${input} appearance-none pr-10`}><option value="">{placeholder}</option>{options.map((x) => <option key={x}>{x}</option>)}</select><FiChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" /></div>;
// // }

// // function ChoiceCard({ value, selected, onClick, icon: Icon, description }) {
// //   return <button type="button" onClick={onClick} className={`group rounded-2xl border p-4 text-left transition ${selected ? "border-[#1F4256] bg-[#1F4256] text-white shadow-lg" : "border-[#DCE7EA] bg-white text-[#1F4256] hover:-translate-y-0.5 hover:border-[#3ED6AE]"}`}>
// //     <div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl ${selected ? "bg-white/15" : "bg-[#F0F7F7]"}`}><Icon size={21} /></span>{selected && <FiCheck className="mt-1" />}</div>
// //     <p className="mt-4 text-sm font-black">{value}</p>{description && <p className={`mt-1 text-[10px] leading-4 ${selected ? "text-white/70" : "text-slate-400"}`}>{description}</p>}
// //   </button>;
// // }

// // function IconGrid({ items, selected, toggle, columns = "sm:grid-cols-2 lg:grid-cols-3" }) {
// //   return <div className={`grid gap-3 ${columns}`}>{items.map(([label, Icon]) => { const active = selected.includes(label); return <button type="button" key={label} onClick={() => toggle(label)} className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition ${active ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#E4EDEF] bg-white text-[#526E7C] hover:border-[#BFDAD4]"}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-white text-[#16876B]" : "bg-[#F5F8F8] text-[#6C8793]"}`}><Icon size={19} /></span><span className="min-w-0 flex-1 text-xs font-bold">{label}</span>{active && <MdOutlineCheckCircle size={18} />}</button>; })}</div>;
// // }

// // export default function CommercialRentalPropertyForm({ onBack, onChangeListingType }) {
// //   const editId = new URLSearchParams(window.location.search).get("edit");
// //   const [draftId, setDraftId] = useState(editId || null);
// //   const [step, setStep] = useState(0);
// //   const [form, setForm] = useState(initial);
// //   const [images, setImages] = useState([]);
// //   const [existingImages, setExistingImages] = useState([]);
// //   const [video, setVideo] = useState(null);
// //   const [floorPlan, setFloorPlan] = useState(null);
// //   const [reraCertificate, setReraCertificate] = useState(null);
// //   const [otherDocuments, setOtherDocuments] = useState([]);
// //   const [saving, setSaving] = useState(false);
// //   const [loading, setLoading] = useState(Boolean(editId));
// //   const [errors, setErrors] = useState({});
// //   const [locationLoading, setLocationLoading] = useState(false);
// //   const [locationMessage, setLocationMessage] = useState("");
// //   const [previewOpen, setPreviewOpen] = useState(false);
// //   const locationRequestRef = useRef(0);
// //   const locationTimerRef = useRef(null);
// //   const skipCityGeocodeRef = useRef(false);

// //   const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));
// //   const toggle = (key, value) => setForm((p) => ({ ...p, [key]: p[key].includes(value) ? p[key].filter((x) => x !== value) : [...p[key], value] }));

// //   useEffect(() => {
// //     if (!editId) return;
// //     (async () => {
// //       try {
// //         const response = await getCommercialRentalPropertyByIdApi(editId);
// //         const p = response?.data || response?.property || response;
// //         setForm({
// //           ...initial, title: p.title || "", propertyType: p.propertyType || "", city: p.location?.city || "", state: p.location?.state || "", country: p.location?.country || "India",
// //           locality: p.location?.locality || "", society: p.location?.society || "", address: p.location?.address || "", pinCode: p.location?.pinCode || "", latitude: p.location?.latitude ?? "", longitude: p.location?.longitude ?? "",
// //           rentAmount: p.rent?.amount ?? "", rentFrequency: p.rent?.frequency || "Per Month", negotiable: Boolean(p.rent?.negotiable), maintenanceAmount: p.maintenance?.amount ?? "", maintenanceFrequency: p.maintenance?.frequency || "Monthly", includedInRent: Boolean(p.maintenance?.includedInRent),
// //           depositType: p.securityDeposit?.type || "One Month", depositAmount: p.securityDeposit?.amount ?? "", areaValue: p.areaDetails?.[0]?.value ?? "", areaType: p.areaDetails?.[0]?.type || "Built-up Area", areaUnit: p.areaDetails?.[0]?.unit || "Sq. Ft.", companyLease: Boolean(p.companyLease),
// //           officeSpaceType: p.workspaceFacilities?.officeSpaceType || [], pantry: p.workspaceFacilities?.pantry || "None", personalWashroom: Boolean(p.workspaceFacilities?.personalWashroom), coveredParking: p.workspaceFacilities?.coveredParking ?? 0, openParking: p.workspaceFacilities?.openParking ?? 0, powerBackup: Boolean(p.workspaceFacilities?.powerBackup), liftAvailable: Boolean(p.workspaceFacilities?.liftAvailable),
// //           furnishingStatus: p.furnishing?.status || "", furnishingItems: (p.furnishing?.items || []).map((x) => x.name), bathrooms: p.specifications?.bathrooms ?? 0, waterSources: p.specifications?.waterSources || [], locationAdvantages: p.specifications?.locationAdvantages || [], balconies: p.specifications?.balconies ?? 0,
// //           facing: p.specifications?.facing || "", view: p.specifications?.view || "", flooring: p.specifications?.flooring || "", roadWidth: p.specifications?.connectingRoadWidth?.value ?? "", roadUnit: p.specifications?.connectingRoadWidth?.unit || "Feet", totalFloors: p.specifications?.totalFloorCount ?? "", propertyFloor: p.specifications?.propertyFloor ?? "", towerBlock: p.specifications?.towerBlock || "", unitNo: p.specifications?.unitNo || "", keepUnitNoPrivate: Boolean(p.specifications?.keepUnitNoPrivate),
// //           amenities: p.amenities || [], highlights: p.propertyHighlights || [], oneLineDescription: p.oneLineDescription || "", description: p.description || "", aiGeneratedDescriptions: p.aiGeneratedDescriptions || [], videoLink: p.media?.videos?.[0]?.url || "",
// //         });
// //         setExistingImages(p.media?.images || []);
// //         setVideo(null);
// //         setFloorPlan(null);
// //         setReraCertificate(null);
// //         setOtherDocuments([]);
// //       } catch (e) {
// //         Swal.fire({ icon: "error", title: "Unable to load property", text: e?.response?.data?.message || e.message, confirmButtonColor: C.navy });
// //       } finally { setLoading(false); }
// //     })();
// //   }, [editId]);

// //   const imageUrls = useMemo(() => [...existingImages.map((x) => x.url).filter(Boolean), ...images.map((x) => x.preview)], [existingImages, images]);

// //   const applyAddress = (address, displayName) =>
// //     setForm((p) => ({
// //       ...p,
// //       city:
// //         address.city ||
// //         address.town ||
// //         address.village ||
// //         address.municipality ||
// //         address.county ||
// //         p.city,
// //       state: address.state || p.state,
// //       country: address.country || p.country || "India",
// //       locality:
// //         address.suburb ||
// //         address.neighbourhood ||
// //         address.city_district ||
// //         address.village ||
// //         address.postcode ||
// //         p.locality,
// //       pinCode:
// //         address.postcode?.replace(/\D/g, "").slice(0, 6) || p.pinCode,
// //       address: displayName || p.address,
// //     }));

// //   const reverseGeocode = async (lat, lng) => {
// //     // A map click is the most precise location. Do not let the city+PIN
// //     // effect immediately move the map back to the centre of the PIN area.
// //     skipCityGeocodeRef.current = true;
// //     try {
// //       setLocationLoading(true);
// //       const r = await fetch(
// //         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lng}`,
// //         { headers: { Accept: "application/json" } }
// //       );
// //       if (!r.ok) throw new Error("Address lookup unavailable");
// //       const d = await r.json();
// //       applyAddress(d.address || {}, d.display_name || "");
// //       setLocationMessage("Location selected. Address details filled automatically.");
// //     } catch {
// //       setLocationMessage("Coordinates saved. Address lookup is unavailable right now.");
// //     } finally {
// //       setLocationLoading(false);
// //     }
// //   };

// //   const lookupPin = async (pin = form.pinCode, cityOverride = form.city) => {
// //     const cleanPin = String(pin || "").replace(/\D/g, "").slice(0, 6);
// //     if (!/^[1-9]\d{5}$/.test(cleanPin)) {
// //       setLocationMessage("");
// //       return;
// //     }

// //     const requestId = ++locationRequestRef.current;

// //     try {
// //       setLocationLoading(true);
// //       setLocationMessage("Finding PIN location...");

// //       // PIN -> India Post city/state/country/locality.
// //       const r = await fetch(
// //         `https://api.postalpincode.in/pincode/${cleanPin}`
// //       );
// //       if (!r.ok) throw new Error("PIN service unavailable");

// //       const d = await r.json();
// //       const office = d?.[0]?.PostOffice?.[0];
// //       if (!office) throw new Error("PIN not found");

// //       const city =
// //         office.District ||
// //         office.Block ||
// //         office.Name ||
// //         cityOverride ||
// //         "";
// //       const state = office.State || "";
// //       const country = office.Country || "India";
// //       const locality =
// //         office.Name ||
// //         office.Block ||
// //         office.District ||
// //         city;

// //       // First fill the postal fields.
// //       setForm((p) => ({
// //         ...p,
// //         pinCode: cleanPin,
// //         city: city || p.city,
// //         state: state || p.state,
// //         country,
// //         locality: p.locality || locality,
// //       }));

// //       // PINs represent an area, so the map is centered on the PIN/city area.
// //       // Search the postal area first. This is more reliable than searching
// //       // only a free-form "city + PIN" string and still gives us a map point
// //       // even though a PIN represents an area rather than one exact building.
// //       const geoUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&postalcode=${encodeURIComponent(cleanPin)}${city ? `&city=${encodeURIComponent(city)}` : ""}&q=${encodeURIComponent(`${city || ""}, ${cleanPin}, India`)}`;
// //       const geo = await fetch(geoUrl, {
// //         headers: { Accept: "application/json" },
// //       });
// //       const geoData = geo.ok ? await geo.json() : [];
// //       const hit = geoData?.[0];

// //       if (requestId !== locationRequestRef.current) return;

// //       if (hit?.lat && hit?.lon) {
// //         setForm((p) => ({
// //           ...p,
// //           pinCode: cleanPin,
// //           city: city || p.city,
// //           state: state || p.state,
// //           country,
// //           locality: p.locality || locality,
// //           latitude: Number(hit.lat).toFixed(6),
// //           longitude: Number(hit.lon).toFixed(6),
// //           address: p.address || hit.display_name || `${city}, ${state}, ${country}`,
// //         }));
// //         setLocationMessage(`PIN verified: ${city}, ${state}. Map centered on ${city}.`);
// //       } else {
// //         setLocationMessage(`PIN verified: ${city}, ${state}. Map coordinates were not found.`);
// //       }
// //     } catch (e) {
// //       if (requestId === locationRequestRef.current) {
// //         setLocationMessage(e?.message || "PIN lookup failed");
// //       }
// //     } finally {
// //       if (requestId === locationRequestRef.current) {
// //         setLocationLoading(false);
// //       }
// //     }
// //   };

// //   // Automatically lookup a valid 6-digit PIN. No need to press "Find city".
// //   useEffect(() => {
// //     const pin = String(form.pinCode || "").replace(/\D/g, "").slice(0, 6);
// //     if (!/^[1-9]\d{5}$/.test(pin)) {
// //       if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
// //       return;
// //     }

// //     if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
// //     locationTimerRef.current = setTimeout(() => {
// //       lookupPin(pin, form.city);
// //     }, 450);

// //     return () => {
// //       if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
// //     };
// //   }, [form.pinCode]);

// //   // If the user changes City after entering a valid PIN, move the map to City + PIN.
// //   useEffect(() => {
// //     const pin = String(form.pinCode || "").replace(/\D/g, "").slice(0, 6);
// //     const city = String(form.city || "").trim();
// //     if (!city || !/^[1-9]\d{5}$/.test(pin)) return;

// //     // When the user clicked the map, reverseGeocode already supplied the
// //     // exact point. Keep that point instead of snapping back to city centre.
// //     if (skipCityGeocodeRef.current) {
// //       skipCityGeocodeRef.current = false;
// //       return;
// //     }

// //     if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
// //     locationTimerRef.current = setTimeout(async () => {
// //       try {
// //         setLocationLoading(true);
// //         const q = encodeURIComponent(`${city}, ${pin}, India`);
// //         const r = await fetch(
// //           `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&country=India&q=${q}`,
// //           { headers: { Accept: "application/json" } }
// //         );
// //         const data = r.ok ? await r.json() : [];
// //         const hit = data?.[0];
// //         if (hit?.lat && hit?.lon) {
// //           setForm((p) => ({
// //             ...p,
// //             latitude: Number(hit.lat).toFixed(6),
// //             longitude: Number(hit.lon).toFixed(6),
// //           }));
// //           setLocationMessage(`Map moved to ${city}, PIN ${pin}.`);
// //         }
// //       } catch {
// //         // Keep the postal lookup result if city geocoding is unavailable.
// //       } finally {
// //         setLocationLoading(false);
// //       }
// //     }, 650);

// //     return () => {
// //       if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
// //     };
// //   }, [form.city]);

// //   const validateStep = () => {
// //     const e = {};
// //     if (step === 0) {
// //       if (!form.title.trim()) e.title = "Property title is required";
// //       if (!form.propertyType) e.propertyType = "Select property type";
// //       if (!form.city.trim()) e.city = "City is required";
// //       if (!form.locality.trim()) e.locality = "Locality is required";
// //       if (!(Number(form.rentAmount) > 0)) e.rentAmount = "Enter valid rent";
// //       if (!(Number(form.areaValue) > 0)) e.areaValue = "Enter valid area";
// //       if (!form.furnishingStatus) e.furnishingStatus = "Select furnishing status";
// //     }
// //     if (step === 1 && (!form.description.trim() || form.description.trim().length < 25)) e.description = "Property story must contain at least 25 characters";
// //     setErrors(e); return Object.keys(e).length === 0;
// //   };
// //   const next = async () => {
// //     if (step === 0 && !validateStep()) return;
// //     await submitProperty("Draft");
// //     setStep((x) => Math.min(3, x + 1));
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };
// //   const back = () => setStep((x) => Math.max(0, x - 1));

// //   const addImages = (event) => {
// //     const selected = Array.from(event.target.files || []).slice(0, 25 - images.length).map((file, index) => ({ file, preview: URL.createObjectURL(file), category: images.length + index === 0 && !existingImages.some((x) => x.isCover) ? "Exterior View" : "Other", isCover: images.length + index === 0 && !existingImages.some((x) => x.isCover) }));
// //     setImages((p) => [...p, ...selected]); event.target.value = "";
// //   };
// //   const removeImage = (index) => setImages((p) => p.filter((_, i) => i !== index));
// //   const removeExisting = (index) => setExistingImages((p) => p.filter((_, i) => i !== index));
// //   const setCover = (index, existing = false) => {
// //     if (existing) setExistingImages((p) => p.map((x, i) => ({ ...x, isCover: i === index })));
// //     else setImages((p) => p.map((x, i) => ({ ...x, isCover: i === index })));
// //   };

// //   const addSingleFile = (event, setter) => {
// //     const file = event.target.files?.[0] || null;
// //     setter(file);
// //     event.target.value = "";
// //   };

// //   const addOtherDocuments = (event) => {
// //     const selected = Array.from(event.target.files || []);
// //     const remaining = Math.max(0, 3 - otherDocuments.length);
// //     const files = selected.slice(0, remaining);
// //     setOtherDocuments((prev) => [...prev, ...files].slice(0, 3));
// //     event.target.value = "";
// //   };

// //   const removeOtherDocument = (index) => {
// //     setOtherDocuments((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const showFinalPreview = () => setPreviewOpen(true);

// //   const submitProperty = async (status = "Submitted") => {
// //     if (status === "Submitted" && !validateStep()) return;

// //     const user = getUser();

// //     try {
// //       setSaving(true);

// //       const payload = {
// //         title: form.title.trim(),
// //         listingType: "Rent",
// //         transactionType: "Rent",
// //         category: "Commercial",
// //         buildingType: "Commercial",
// //         propertyType: form.propertyType,
// //         location: {
// //           city: form.city.trim(),
// //           state: form.state,
// //           country: form.country || "India",
// //           locality: form.locality.trim(),
// //           society: form.society.trim(),
// //           address: form.address.trim(),
// //           pinCode: form.pinCode || null,
// //           latitude: form.latitude === "" ? null : Number(form.latitude),
// //           longitude: form.longitude === "" ? null : Number(form.longitude),
// //           isLocationConfirmed: Boolean(form.latitude && form.longitude),
// //         },
// //         rent: {
// //           amount: Number(form.rentAmount),
// //           frequency: form.rentFrequency,
// //           negotiable: form.negotiable,
// //         },
// //         maintenance: {
// //           amount: Number(form.maintenanceAmount || 0),
// //           frequency: form.maintenanceFrequency,
// //           includedInRent: form.includedInRent,
// //         },
// //         securityDeposit: {
// //           type: form.depositType,
// //           amount: Number(form.depositAmount || 0),
// //         },
// //         areaDetails: [{
// //           value: Number(form.areaValue),
// //           type: form.areaType,
// //           unit: form.areaUnit,
// //           display: true,
// //         }],
// //         companyLease: form.companyLease,
// //         workspaceFacilities: {
// //           officeSpaceType: form.officeSpaceType,
// //           pantry: form.pantry,
// //           personalWashroom: form.personalWashroom,
// //           coveredParking: Number(form.coveredParking),
// //           openParking: Number(form.openParking),
// //           powerBackup: form.powerBackup,
// //           liftAvailable: form.liftAvailable,
// //         },
// //         furnishing: {
// //           status: form.furnishingStatus,
// //           items: form.furnishingItems.map((name) => ({ name, quantity: 1 })),
// //         },
// //         specifications: {
// //           bathrooms: Number(form.bathrooms || 0),
// //           coveredParking: Number(form.coveredParking),
// //           openParking: Number(form.openParking),
// //           powerBackup: form.powerBackup,
// //           waterSources: form.waterSources,
// //           liftAvailable: form.liftAvailable,
// //           locationAdvantages: form.locationAdvantages,
// //           balconies: Number(form.balconies || 0),
// //           facing: form.facing || null,
// //           view: form.view || null,
// //           flooring: form.flooring || null,
// //           connectingRoadWidth: {
// //             value: form.roadWidth === "" ? null : Number(form.roadWidth),
// //             unit: form.roadUnit,
// //           },
// //           totalFloorCount: form.totalFloors === "" ? null : Number(form.totalFloors),
// //           propertyFloor: form.propertyFloor === "" ? null : Number(form.propertyFloor),
// //           towerBlock: form.towerBlock,
// //           unitNo: form.unitNo,
// //           keepUnitNoPrivate: form.keepUnitNoPrivate,
// //         },
// //         amenities: form.amenities,
// //         propertyHighlights: form.highlights,
// //         oneLineDescription: form.oneLineDescription.trim(),
// //         description: form.description.trim(),
// //         aiGeneratedDescriptions: form.aiGeneratedDescriptions,
// //         media: {
// //           images: existingImages,
// //           videos: form.videoLink
// //             ? [{ url: form.videoLink, title: "Property tour" }]
// //             : [],
// //           floorPlans: [],
// //           reraCertificates: [],
// //           documents: [],
// //         },
// //         status,
// //         sourceModel: "CommercialRentalProperty",
// //         createdBy: {
// //           id: user?.id || user?._id || null,
// //           role: user?.role || "admin",
// //         },
// //         imageMeta: images.map((x) => ({
// //           category: x.category,
// //           isCover: x.isCover,
// //         })),
// //         existingImages,
// //       };

// //       const body = new FormData();
// //       body.append("data", JSON.stringify(payload));
// //       body.append("existingImages", JSON.stringify(existingImages));
// //       body.append(
// //         "imageMeta",
// //         JSON.stringify(images.map((x) => ({
// //           category: x.category,
// //           isCover: x.isCover,
// //         })))
// //       );

// //       images.forEach((x) => { if (x.file) body.append("images", x.file); });
// //       if (video) body.append("video", video);
// //       if (floorPlan) body.append("floorPlan", floorPlan);
// //       if (reraCertificate) body.append("reraCertificate", reraCertificate);
// //       otherDocuments.forEach((file) => body.append("documents", file));

// //       const targetId = draftId || editId;
// //       const result = targetId
// //         ? await updateCommercialRentalPropertyApi(targetId, body)
// //         : await createCommercialRentalPropertyApi(body);

// //       if (status === "Draft") {
// //         const savedId = result?.data?._id || result?.data?.id;
// //         if (!draftId && savedId) setDraftId(savedId);
// //         await Swal.fire({
// //           toast: true,
// //           position: "top-end",
// //           icon: "success",
// //           title: "Draft saved",
// //           text: "Property saved successfully.",
// //           showConfirmButton: false,
// //           timer: 1800,
// //         });
// //         return;
// //       }

// //       await Swal.fire({
// //         toast: true,
// //         position: "top-end",
// //         icon: "success",
// //         title: editId ? "Property updated" : "Property published",
// //         text: result?.data?.propertyId
// //           ? `Property ID: ${result.data.propertyId}`
// //           : "Property submitted successfully.",
// //         showConfirmButton: false,
// //         timer: 2200,
// //       });

// //       setPreviewOpen(false);

// //       // Keep existing behaviour after a successful new submission.
// //       if (!editId) {
// //         setForm(initial);
// //         setImages([]);
// //         setExistingImages([]);
// //         setVideo(null);
// //         setFloorPlan(null);
// //         setReraCertificate(null);
// //         setOtherDocuments([]);
// //         setStep(0);
// //         setDraftId(null);
// //       } else {
// //         window.history.back();
// //       }
// //     } catch (e) {
// //       await Swal.fire({
// //         toast: true,
// //         position: "top-end",
// //         icon: "error",
// //         title: "Unable to save property",
// //         text: e?.response?.data?.message || e.message || "Something went wrong.",
// //         showConfirmButton: false,
// //         timer: 2600,
// //       });
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const saveDraft = () => submitProperty("Draft");

// //   const submit = () => submitProperty("Submitted");


// //   if (loading) return <div className="flex min-h-[70vh] items-center justify-center bg-[#F4F8F8]"><div className="rounded-2xl bg-white px-8 py-6 font-bold text-[#526E7C] shadow">Loading commercial property...</div></div>;

// //   const steps = [
// //     ["Property Snapshot", "Type, location & rent", FiHome],
// //     ["Workspace Facilities", "Area, furnishing & parking", FiBriefcase],
// //     ["Media & Highlights", "Photos, amenities & advantages", FiImage],
// //     ["Property Story", "Description & submit", FiFileText],
// //   ];

// //   const previewImage = existingImages[0]?.url || images[0]?.preview || "";

// //   return <>
// //     {previewOpen && (
// //       <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
// //         <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
// //           <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
// //             <div>
// //               <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#16876B]">Final Property Preview</p>
// //               <h2 className="mt-1 text-xl font-black text-[#1F4256]">{form.title || "Untitled Property"}</h2>
// //             </div>
// //             <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-xl border px-3 py-2 text-xs font-black text-[#526E7C]">Close</button>
// //           </div>
// //           <div className="p-5 sm:p-7">
// //             {previewImage && <img src={previewImage} alt="" className="h-64 w-full rounded-2xl object-cover" />}
// //             <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Property</p><b className="text-sm text-[#1F4256]">{form.propertyType || "—"}</b></div>
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Location</p><b className="text-sm text-[#1F4256]">{[form.city, form.state].filter(Boolean).join(", ") || "—"}</b></div>
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">PIN</p><b className="text-sm text-[#1F4256]">{form.pinCode || "—"}</b></div>
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Rent</p><b className="text-sm text-[#1F4256]">{form.rentAmount ? `₹${Number(form.rentAmount).toLocaleString("en-IN")} / ${form.rentFrequency === "Per Year" ? "year" : "month"}` : "—"}</b></div>
// //             </div>
// //             <div className="mt-4 rounded-2xl border border-[#DCE7EA] p-4">
// //               <p className="text-xs font-black text-[#1F4256]">Location</p>
// //               <p className="mt-1 text-xs text-[#526E7C]">{form.address || [form.locality, form.city, form.state, form.pinCode].filter(Boolean).join(", ") || "—"}</p>
// //               {form.latitude && form.longitude && <p className="mt-1 text-[10px] text-slate-400">Map: {form.latitude}, {form.longitude}</p>}
// //             </div>
// //             <div className="mt-4 rounded-2xl border border-[#DCE7EA] p-4">
// //               <p className="text-xs font-black text-[#1F4256]">Media & Documents</p>
// //               <div className="mt-2 grid gap-2 sm:grid-cols-4">
// //                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{existingImages.length + images.length} images</span>
// //                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{video ? "1 video" : "0 video"}</span>
// //                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{floorPlan ? "1 floor plan" : "0 floor plan"}</span>
// //                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{reraCertificate ? "1 RERA + " : ""}{otherDocuments.length} other docs</span>
// //               </div>
// //             </div>
// //             <div className="mt-4">
// //               <p className="text-xs font-black text-[#1F4256]">Description</p>
// //               <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#526E7C]">{form.description || "No description added."}</p>
// //             </div>
// //             <div className="mt-6 flex flex-wrap justify-end gap-2">
// //               <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-xl border border-[#1F4256] px-5 py-3 text-xs font-black text-[#1F4256]">Edit Property</button>
// //               <button type="button" disabled={saving} onClick={submit} className="rounded-xl bg-[#3ED6AE] px-5 py-3 text-xs font-black text-[#1F4256] disabled:opacity-50">
// //                 {saving ? "Publishing..." : editId ? "Update Property" : "Publish Property"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     )}

// //    <div className="min-h-screen bg-[#F4F8F8] pb-10">
// //     <div className="px-4 pt-4 text-white sm:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[24px] bg-[#1F4256] px-5 py-5 shadow-[0_12px_35px_rgba(31,66,86,.16)] sm:px-7"><div className="flex min-w-0 items-center gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#3ED6AE] text-[#1F4256]"><FiHome size={23} /></div><div className="min-w-0"><button onClick={onBack || onChangeListingType} className="mb-1 text-left text-[10px] font-black uppercase tracking-[.16em] text-white/55 hover:text-white">Change building type</button><h1 className="truncate text-xl font-black sm:text-2xl">{editId ? "Edit Commercial Rental" : "Create rental listing"}</h1><p className="mt-0.5 hidden text-xs text-white/65 sm:block">Commercial rental listing with workspace, rent and leasing details.</p></div></div><div className="hidden shrink-0 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-right sm:block"><p className="text-[9px] font-black uppercase tracking-wider text-white/45">Current view</p><p className="mt-0.5 text-xs font-black"><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#3ED6AE]" />Commercial Rental</p></div></div></div>
// //     <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-8"><div className="flex items-center justify-between rounded-2xl border border-[#DCE7EA] bg-white px-4 py-3 shadow-sm"><span className="text-xs font-black text-[#526E7C]">Your progress</span><span className="rounded-full bg-[#EAF8F4] px-3 py-1 text-xs font-black text-[#16876B]">{Math.round((step / steps.length) * 100)}% complete</span></div></div>
    // <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-8 lg:grid-cols-[260px_1fr]">
// //       <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-5"><p className="mb-6 text-[10px] font-black uppercase tracking-[.2em] text-[#16876B]">List your property</p>{steps.map(([name, hint, Icon], i) => <div key={name} className="relative flex gap-3 pb-8 last:pb-0"><span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${i <= step ? "bg-[#1F4256] text-white" : "bg-slate-100 text-slate-400"}`}>{i < step ? <FiCheck /> : <Icon />}</span>{i < 3 && <span className={`absolute left-5 top-10 h-8 w-px ${i < step ? "bg-[#3ED6AE]" : "bg-slate-200"}`} />}<span><b className={`block text-xs ${i === step ? "text-[#1F4256]" : "text-slate-400"}`}>{name}</b><small className="text-[10px] text-slate-400">{hint}</small></span></div>)}</aside>
// //       <main className="space-y-5">
// //         {step === 0 && <>
// //           <Card title="Property Snapshot" note="Commercial rental identity and property category." icon={<MdBusinessCenter size={20} />}>
// //             <div className="space-y-5"><Field label="Property Title" required error={errors.title}><input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Premium furnished office in Mahalaxmi Nagar" /></Field>
// //               <Field label="Property Type" required error={errors.propertyType}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{PROPERTY_TYPES.map((x) => <button key={x} type="button" onClick={() => set("propertyType", x)} className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${form.propertyType === x ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C] hover:border-[#3ED6AE]"}`}>{x}</button>)}</div></Field>
// //               <div className="grid gap-4 sm:grid-cols-2"><Field label="City" required error={errors.city}><input className={input} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Indore" /></Field><Field label="Locality / Society" required error={errors.locality}><input className={input} value={form.locality} onChange={(e) => set("locality", e.target.value)} placeholder="Mahalaxmi Nagar, Indore East" /></Field><Field label="Society / Project"><input className={input} value={form.society} onChange={(e) => set("society", e.target.value)} placeholder="Search for project" /></Field><Field label="PIN Code"><div className="flex gap-2"><input maxLength={6} className={input} value={form.pinCode} onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, ""))} /><button type="button" onClick={lookupPin} className="shrink-0 rounded-xl bg-[#1F4256] px-4 text-xs font-black text-white">Find city</button></div></Field><Field label="State"><input className={input} value={form.state} onChange={(e) => set("state", e.target.value)} /></Field><Field label="Country"><input className={input} value={form.country} onChange={(e) => set("country", e.target.value)} /></Field><div className="sm:col-span-2"><Field label="Complete Address"><input className={input} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Building, floor, street, landmark" /></Field></div></div>
// //             </div></Card>
// //           <Card title="Location & Project" note="Click the map to place the exact property pin. Dragging/clicking the pin updates coordinates." icon={<FiMapPin size={20} />}>
// //             <div className="grid gap-4 sm:grid-cols-2"><Field label="Latitude"><input className={input} value={form.latitude} onChange={(e) => set("latitude", e.target.value)} /></Field><Field label="Longitude"><input className={input} value={form.longitude} onChange={(e) => set("longitude", e.target.value)} /></Field></div>
// //             <div className="mt-5 overflow-hidden rounded-2xl border border-[#DCE7EA]"><div className="flex items-center justify-between bg-[#F7FAFA] px-4 py-3"><span className="text-xs font-black text-[#526E7C]">Select exact location</span>{locationLoading && <span className="text-[10px] font-bold text-[#16876B]">Finding address...</span>}</div><MapPicker key={`${form.latitude || "default"}-${form.longitude || "default"}`} formData={form} setFormData={setForm} onLocationChange={reverseGeocode} /></div>{locationMessage && <p className="mt-3 rounded-xl bg-[#EAF8F4] px-4 py-3 text-xs font-bold text-[#1F4256]">{locationMessage}</p>}
// //           </Card>
// //           <Card title="Rent, Maintenance & Deposit" note="Commercial leasing amount and terms." icon={<FiLayers size={20} />}>
// //             <div className="grid gap-4 sm:grid-cols-2"><Field label="Property Rent" required error={errors.rentAmount}><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.rentAmount} onChange={(e) => set("rentAmount", e.target.value)} placeholder="30000" /><ThemeSelect value={form.rentFrequency} onChange={(v) => set("rentFrequency", v)} options={["Per Month", "Per Year"]} /></div></Field><Field label="Maintenance"><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.maintenanceAmount} onChange={(e) => set("maintenanceAmount", e.target.value)} placeholder="5000" /><ThemeSelect value={form.maintenanceFrequency} onChange={(v) => set("maintenanceFrequency", v)} options={["Per SqFt", "Monthly", "Quarterly", "Yearly", "One Time"]} /></div></Field><Field label="Included in Rent"><button type="button" onClick={() => set("includedInRent", !form.includedInRent)} className={`h-11 rounded-xl border px-4 text-xs font-black ${form.includedInRent ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.includedInRent ? "✓ Included in rent" : "Not included"}</button></Field><Field label="Security Deposit"><ThemeSelect value={form.depositType} onChange={(v) => set("depositType", v)} options={DEPOSIT} /></Field>{form.depositType === "Other" && <Field label="Deposit Amount"><input type="number" className={input} value={form.depositAmount} onChange={(e) => set("depositAmount", e.target.value)} /></Field>}<Field label="Rent Negotiable"><button type="button" onClick={() => set("negotiable", !form.negotiable)} className={`h-11 rounded-xl border px-4 text-xs font-black ${form.negotiable ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.negotiable ? "✓ Negotiable" : "Not Negotiable"}</button></Field></div>
// //           </Card>
// //         </>}

// //         {step === 1 && <>
// //           <Card title="Area Details" note="Add the area and measurement used for this commercial listing." icon={<FiMaximize size={20} />}><div className="grid gap-4 sm:grid-cols-3"><Field label="Area" required error={errors.areaValue}><input type="number" className={input} value={form.areaValue} onChange={(e) => set("areaValue", e.target.value)} placeholder="2000" /></Field><Field label="Area Type"><ThemeSelect value={form.areaType} onChange={(v) => set("areaType", v)} options={AREA_TYPES} /></Field><Field label="Unit"><ThemeSelect value={form.areaUnit} onChange={(v) => set("areaUnit", v)} options={UNITS} /></Field></div></Card>
// //           <Card title="Workspace Facilities" note="Facilities shown in your commercial listing." icon={<MdOutlineBusiness size={20} />}><div className="space-y-6"><Field label="Office Space Type"><div className="grid gap-3 sm:grid-cols-3">{OFFICE_TYPES.map((x) => <button key={x} type="button" onClick={() => toggle("officeSpaceType", x)} className={`rounded-xl border px-4 py-3 text-xs font-bold ${form.officeSpaceType.includes(x) ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.officeSpaceType.includes(x) && "✓ "}{x}</button>)}</div></Field><Field label="Pantry"><div className="flex flex-wrap gap-2">{PANTRY.map((x) => <button key={x} type="button" onClick={() => set("pantry", x)} className={`rounded-xl border px-4 py-2.5 text-xs font-bold ${form.pantry === x ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>{x}</button>)}</div></Field><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Personal Washroom"><button type="button" onClick={() => set("personalWashroom", !form.personalWashroom)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.personalWashroom ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.personalWashroom ? "✓ Yes" : "No"}</button></Field><Field label="Covered Parking"><input type="number" min="0" className={input} value={form.coveredParking} onChange={(e) => set("coveredParking", e.target.value)} /></Field><Field label="Open Parking"><input type="number" min="0" className={input} value={form.openParking} onChange={(e) => set("openParking", e.target.value)} /></Field><Field label="Bathrooms"><input type="number" min="0" className={input} value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} /></Field><Field label="Power Backup"><button type="button" onClick={() => set("powerBackup", !form.powerBackup)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.powerBackup ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.powerBackup ? "✓ Available" : "No Back-up"}</button></Field><Field label="Lift Availability"><button type="button" onClick={() => set("liftAvailable", !form.liftAvailable)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.liftAvailable ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.liftAvailable ? "✓ Yes" : "No"}</button></Field></div></div></Card>
// //           <Card title="Furnishing Status" note="Use icon cards for a clear commercial workspace presentation." icon={<MdOutlineChair size={20} />}><div className="grid gap-3 md:grid-cols-3">{FURNISHING_STATUS.map(([label, Icon, desc]) => <ChoiceCard key={label} value={label} selected={form.furnishingStatus === label} onClick={() => set("furnishingStatus", label)} icon={Icon} description={desc} />)}</div>{errors.furnishingStatus && <p className="mt-2 text-xs font-bold text-rose-500">{errors.furnishingStatus}</p>}{form.furnishingStatus && form.furnishingStatus !== "Unfurnished" && <div className="mt-6"><p className="mb-3 text-xs font-black text-[#526E7C]">Furnishing Details</p><IconGrid items={FURNISHING_ITEMS} selected={form.furnishingItems} toggle={(x) => toggle("furnishingItems", x)} columns="sm:grid-cols-2 lg:grid-cols-4" /></div>}</Card>
// //           <Card title="Commercial Specifications" note="Floor, road, facing and unit information." icon={<FiGrid size={20} />}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Field label="Facing"><ThemeSelect value={form.facing} onChange={(v) => set("facing", v)} options={FACINGS} /></Field><Field label="View"><ThemeSelect value={form.view} onChange={(v) => set("view", v)} options={VIEWS} /></Field><Field label="Flooring"><ThemeSelect value={form.flooring} onChange={(v) => set("flooring", v)} options={FLOORING} /></Field><Field label="Connecting Road Width"><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.roadWidth} onChange={(e) => set("roadWidth", e.target.value)} /><ThemeSelect value={form.roadUnit} onChange={(v) => set("roadUnit", v)} options={["Feet", "Meter"]} /></div></Field><Field label="Floor Number"><input type="number" className={input} value={form.propertyFloor} onChange={(e) => set("propertyFloor", e.target.value)} /></Field><Field label="Total Floors"><input type="number" className={input} value={form.totalFloors} onChange={(e) => set("totalFloors", e.target.value)} /></Field><Field label="Tower / Block"><input className={input} value={form.towerBlock} onChange={(e) => set("towerBlock", e.target.value)} /></Field><Field label="Unit No."><input className={input} value={form.unitNo} onChange={(e) => set("unitNo", e.target.value)} /></Field></div><label className="mt-5 flex items-center gap-2 text-xs font-bold text-[#526E7C]"><input type="checkbox" checked={form.keepUnitNoPrivate} onChange={(e) => set("keepUnitNoPrivate", e.target.checked)} /> Keep unit number private</label></Card>
// //         </>}

// //         {step === 2 && <>
// //           <Card title="Media & Highlights" note="At least one image is required for a submitted listing." icon={<FiImage size={20} />}><label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C8D8DC] bg-[#FAFCFC] px-5 py-9 text-center hover:border-[#3ED6AE] hover:bg-[#F1FBF8]"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1F4256] text-white"><FiUploadCloud size={22} /></span><b className="mt-3 text-sm text-[#1F4256]">Upload Property Images</b><span className="mt-1 text-[10px] text-slate-400">JPG, PNG, WEBP · up to 25 images</span><input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={addImages} /></label>
// //             {(existingImages.length || images.length) > 0 && <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">{existingImages.map((x, i) => <div key={`e-${i}`} className="group relative aspect-square overflow-hidden rounded-2xl border"><img src={x.url} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => removeExisting(i)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white"><FiTrash2 size={13} /></button><button type="button" onClick={() => setCover(i, true)} className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-[9px] font-black ${x.isCover ? "bg-[#3ED6AE] text-[#1F4256]" : "bg-black/60 text-white"}`}>{x.isCover ? "Cover" : "Make cover"}</button></div>)}{images.map((x, i) => <div key={`n-${i}`} className="group relative aspect-square overflow-hidden rounded-2xl border"><img src={x.preview} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => removeImage(i)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white"><FiTrash2 size={13} /></button><button type="button" onClick={() => setCover(i, false)} className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-[9px] font-black ${x.isCover ? "bg-[#3ED6AE] text-[#1F4256]" : "bg-black/60 text-white"}`}>{x.isCover ? "Cover" : "Make cover"}</button></div>)}</div>}
// //             <div className="mt-5 grid gap-4 sm:grid-cols-2">
// //               <Field label="Property Video">
// //                 <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => addSingleFile(e, setVideo)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
// //                 {video && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {video.name}</p>}
// //               </Field>
// //               <Field label="Floor Plan">
// //                 <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={(e) => addSingleFile(e, setFloorPlan)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
// //                 {floorPlan && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {floorPlan.name}</p>}
// //               </Field>
// //               <Field label="RERA Certificate">
// //                 <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={(e) => addSingleFile(e, setReraCertificate)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
// //                 {reraCertificate && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {reraCertificate.name}</p>}
// //               </Field>
// //               <Field label="Other Documents" error={otherDocuments.length >= 3 ? undefined : undefined}>
// //                 <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" onChange={addOtherDocuments} disabled={otherDocuments.length >= 3} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs disabled:opacity-50" />
// //                 <p className="mt-1 text-[10px] text-slate-400">Maximum 3 additional documents.</p>
// //                 {otherDocuments.length > 0 && (
// //                   <div className="mt-2 space-y-1">
// //                     {otherDocuments.map((file, i) => (
// //                       <div key={`${file.name}-${i}`} className="flex items-center justify-between rounded-lg bg-[#F4F8F8] px-2.5 py-2 text-[10px]">
// //                         <span className="truncate font-bold text-[#526E7C]">{file.name}</span>
// //                         <button type="button" onClick={() => removeOtherDocument(i)} className="ml-2 text-rose-500">Remove</button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </Field>
// //             </div>
// //           </Card>
// //           <Card title="Location Advantages" note="Select the advantages relevant to this commercial property." icon={<FiNavigation size={20} />}><IconGrid items={ADVANTAGES.map((x) => [x, MdOutlineLocationOn])} selected={form.locationAdvantages} toggle={(x) => toggle("locationAdvantages", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
// //           <Card title="Amenities" note="Icon-based amenities make the listing easier to scan." icon={<MdOutlineHomeWork size={20} />}><IconGrid items={AMENITIES} selected={form.amenities} toggle={(x) => toggle("amenities", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
// //           <Card title="Property Highlights" note="Show your strongest selling points." icon={<FiStar size={20} />}><IconGrid items={HIGHLIGHTS} selected={form.highlights} toggle={(x) => toggle("highlights", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
// //         </>}

// //         {step === 3 && <>
// //           <Card title="Amenities & Property Story" note="Write a short hook and detailed commercial property story." icon={<FiFileText size={20} />}><div className="space-y-5"><Field label="One-line Description" required><input maxLength={200} className={input} value={form.oneLineDescription} onChange={(e) => set("oneLineDescription", e.target.value)} placeholder="Premium furnished office with excellent road connectivity" /></Field><Field label="Property Description" required error={errors.description}><textarea rows={9} className={`${input} h-auto py-3`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the workspace, location, access, layout, business suitability, facilities and nearby connectivity..." /></Field></div></Card>
// //           <Card title="Company Lease" note="Whether the property is available specifically for company/corporate lease." icon={<FiBriefcase size={20} />}><div className="flex flex-wrap gap-3"><button type="button" onClick={() => set("companyLease", true)} className={`rounded-xl border px-5 py-3 text-xs font-black ${form.companyLease ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>✓ Yes</button><button type="button" onClick={() => set("companyLease", false)} className={`rounded-xl border px-5 py-3 text-xs font-black ${!form.companyLease ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>No</button></div></Card>
// //           <Card title="Ready to Submit" note="Review the selected property information before publishing." icon={<MdOutlineCheckCircle size={20} />}>
// //             <div className="grid gap-3 sm:grid-cols-5">
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Type</p><b className="mt-1 block text-sm text-[#1F4256]">{form.propertyType || "—"}</b></div>
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Rent</p><b className="mt-1 block text-sm text-[#1F4256]">{form.rentAmount ? `₹${Number(form.rentAmount).toLocaleString("en-IN")}` : "—"}</b></div>
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Area</p><b className="mt-1 block text-sm text-[#1F4256]">{form.areaValue ? `${form.areaValue} ${form.areaUnit}` : "—"}</b></div>
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Images</p><b className="mt-1 block text-sm text-[#1F4256]">{existingImages.length + images.length}</b></div>
// //               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Documents</p><b className="mt-1 block text-sm text-[#1F4256]">{otherDocuments.length}/3</b></div>
// //             </div>
// //             <div className="mt-5 flex flex-wrap gap-2">
// //               <button type="button" onClick={showFinalPreview} className="flex h-10 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-xs font-black text-[#1F4256] hover:bg-slate-50">
// //                 <FiImage /> Final Preview
// //               </button>
// //               <button type="button" onClick={saveDraft} disabled={saving} className="flex h-10 items-center gap-2 rounded-xl border border-[#3ED6AE] px-4 text-xs font-black text-[#1F4256] disabled:opacity-50">
// //                 Save Draft
// //               </button>
// //             </div>
// //           </Card>
// //         </>}

// //         <div className="sticky bottom-3 z-20 flex flex-wrap justify-between gap-3 rounded-2xl border border-[#DCE7EA] bg-white/95 p-3 shadow-[0_12px_40px_rgba(31,66,86,.15)] backdrop-blur">
// //           <button type="button" onClick={back} disabled={step === 0} className="flex h-11 items-center gap-2 rounded-xl border border-[#DCE7EA] px-5 text-xs font-black text-[#526E7C] disabled:opacity-30"><FiArrowLeft /> Previous</button>
// //           <div className="flex flex-wrap gap-2">
// //             {step === 3 && (
// //               <>
// //                 <button type="button" onClick={showFinalPreview} className="flex h-11 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-xs font-black text-[#1F4256]">
// //                   <FiImage /> Preview Property
// //                 </button>
// //                 <button type="button" disabled={saving} onClick={saveDraft} className="flex h-11 items-center gap-2 rounded-xl border border-[#3ED6AE] px-5 text-xs font-black text-[#1F4256] disabled:opacity-50">
// //                   Save Draft
// //                 </button>
// //               </>
// //             )}
// //             {step < 3 ? (
// //               <button type="button" onClick={next} className="flex h-11 items-center gap-2 rounded-xl bg-[#1F4256] px-7 text-xs font-black text-white">
// //                 Save & Continue <FiArrowRight />
// //               </button>
// //             ) : (
// //               <button type="button" disabled={saving} onClick={submit} className="flex h-11 items-center gap-2 rounded-xl bg-[#3ED6AE] px-7 text-xs font-black text-[#1F4256] disabled:opacity-50">
// //                 {saving ? "Saving..." : editId ? "Update Property" : "Publish Property"} <FiCheck />
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   </div>
// //   </>;
// // }


// import { useEffect, useMemo, useState, useRef } from "react";
// import {
//   FiArrowLeft, FiArrowRight, FiCheck, FiChevronDown, FiHome, FiImage,
//   FiMapPin, FiTrash2, FiUploadCloud, FiBriefcase, FiFileText,
//   FiLayers, FiGrid, FiShield, FiWind, FiCoffee, FiZap, FiDroplet,
//   FiTruck, FiNavigation, FiActivity, FiStar, FiMaximize, FiLock,
// } from "react-icons/fi";
// import {
//   MdApartment, MdBusinessCenter, MdMeetingRoom, MdStorefront, MdWarehouse,
//   MdOutlineChair, MdOutlineWeekend, MdOutlineKitchen, MdOutlineAcUnit,
//   MdOutlineLightbulb, MdOutlineTv, MdOutlineBed, MdOutlineLocalLaundryService,
//   MdOutlineMicrowave, MdOutlineSecurity, MdOutlineElevator, MdOutlinePool,
//   MdOutlineFitnessCenter, MdOutlineLocalParking, MdOutlineEvStation,
//   MdOutlineShoppingCart, MdOutlineTheaterComedy, MdOutlinePark, MdOutlineSports,
//   MdOutlineChildCare, MdOutlineCelebration, MdOutlineHomeWork, MdOutlineCheckCircle,
//   MdOutlineLocationOn, MdOutlineDirectionsCar, MdOutlineBusiness,
// } from "react-icons/md";
// import Swal from "sweetalert2";
// import MapPicker from "../../../components/MapPicker";
// import {
//   createCommercialRentalPropertyApi,
//   getCommercialRentalPropertyByIdApi,
//   updateCommercialRentalPropertyApi,
// } from "../../../Services/propertyService";

// const C = {
//   navy: "#1F4256",
//   teal: "#3ED6AE",
//   bg: "#F4F8F8",
//   border: "#DCE7EA",
//   text: "#526E7C",
// };

// const PROPERTY_TYPES = ["Office Space", "Shop", "Land", "Office Space in IT/SEZ", "Showroom", "Warehouse", "Industrial Plot", "Co-working Space"];
// const OFFICE_TYPES = ["Semi-Fitted", "Fitted Space", "Shell and Core"];
// const PANTRY = ["Wet", "Dry", "None"];
// const DEPOSIT = ["Zero Deposit", "One Month", "Two Months", "Other"];
// const AREA_TYPES = ["Built-up Area", "Super Built-up Area", "Carpet Area", "Saleable Area", "Plot Area"];
// const UNITS = ["Sq. Ft.", "Sq. Meter", "Sq. Yard", "Acre", "Hectare"];
// const FACINGS = ["East", "West", "North", "South", "North East", "North West", "South East", "South West"];
// const VIEWS = ["Beach View", "Garden View", "Golf Course", "Lake View", "Park View", "Road View", "Community View", "Pool View", "Creek View", "Sea View"];
// const FLOORING = ["Marble", "Concrete", "Cemented", "Carpeted", "Wooden", "Vitrified Tiles", "Wooden Tiles", "Imported Tiles", "Indian Tiles", "Ceramic", "Hardwood", "Carpet", "Others"];
// const ADVANTAGES = ["Good School in vicinity", "Nearby Metro Station", "Peaceful Vicinity", "Near City Center", "Safe & Secure Locality", "Near Reputed Hospital", "Close to Shopping Mall/Market", "Highway/Expressway Access", "Near IT Park/Business Hub", "Close to Railway Station"];
// const AMENITIES = [
//   ["Gymnasium", MdOutlineFitnessCenter], ["Swimming Pool", MdOutlinePool], ["Kids Play Areas", MdOutlineChildCare], ["Jogging/Cycle Track", MdOutlineSports],
//   ["Power Backup", FiZap], ["Attached Market", MdOutlineShoppingCart], ["24 x 7 Security", MdOutlineSecurity], ["Clubhouse", MdOutlineHomeWork],
//   ["High Speed Elevators", MdOutlineElevator], ["Day Care Center", MdOutlineChildCare], ["Party Hall", MdOutlineCelebration], ["EV Charging", MdOutlineEvStation],
//   ["Multi-level Parking", MdOutlineLocalParking], ["Multi-purpose Sports Court", MdOutlineSports], ["Theatre/Mini Cinema", MdOutlineTheaterComedy],
//   ["Rooftop Deck/Observatory", MdOutlinePark], ["Shopping Complex", MdOutlineShoppingCart], ["Community Shuttle Service", MdOutlineDirectionsCar], ["Central Park", MdOutlinePark],
// ];
// const HIGHLIGHTS = [
//   ["Premium Location", MdOutlineLocationOn], ["Corner Unit", MdOutlineBusiness], ["Vastu Compliant", MdOutlineHomeWork], ["Low Density Project", FiGrid],
//   ["Quiet/Low Traffic Area", FiNavigation], ["Wheelchair Accessible", FiActivity], ["Never Occupied", FiStar], ["Road Facing", MdOutlineDirectionsCar],
//   ["High Visibility", FiMaximize], ["Ready to Move", MdOutlineCheckCircle],
// ];
// const FURNISHING_ITEMS = [
//   ["Water Purifier", FiDroplet], ["Fan", FiWind], ["Fridge", FiGrid], ["Exhaust Fan", FiWind], ["Dining Table", MdOutlineChair], ["Geyser", FiZap],
//   ["Stove", MdOutlineKitchen], ["Light", MdOutlineLightbulb], ["Curtains", MdOutlineWeekend], ["Modular Kitchen", MdOutlineKitchen], ["TV", MdOutlineTv], ["Chimney", FiWind],
//   ["AC", MdOutlineAcUnit], ["Bed", MdOutlineBed], ["Wardrobe", MdOutlineWeekend], ["Sofa", MdOutlineWeekend], ["Washing Machine", MdOutlineLocalLaundryService], ["Microwave", MdOutlineMicrowave],
//   ["Home Automation", FiHome], ["Smart Card Access", FiLock], ["Solar Heater", FiZap], ["Split AC", MdOutlineAcUnit], ["VRV AC", MdOutlineAcUnit],
// ];
// const FURNISHING_STATUS = [
//   ["Furnished", MdOutlineChair, "Ready-to-use workspace with furniture & fittings"],
//   ["Semi-Furnished", MdOutlineWeekend, "Essential fittings with flexible setup"],
//   ["Unfurnished", MdBusinessCenter, "Open space ready for your custom setup"],
// ];

// const initial = {
//   title: "", propertyType: "", city: "", state: "", country: "India", locality: "", society: "", address: "", pinCode: "", latitude: "", longitude: "",
//   rentAmount: "", rentFrequency: "Per Month", negotiable: false, maintenanceAmount: "", maintenanceFrequency: "Monthly", includedInRent: false,
//   depositType: "One Month", depositAmount: "", areaValue: "", areaType: "Built-up Area", areaUnit: "Sq. Ft.", companyLease: false,
//   officeSpaceType: [], pantry: "None", personalWashroom: false, coveredParking: 0, openParking: 0, powerBackup: false, liftAvailable: false,
//   furnishingStatus: "", furnishingItems: [], bathrooms: 0, waterSources: [], locationAdvantages: [], balconies: 0, facing: "", view: "", flooring: "",
//   roadWidth: "", roadUnit: "Feet", totalFloors: "", propertyFloor: "", towerBlock: "", unitNo: "", keepUnitNoPrivate: false,
//   amenities: [], highlights: [], oneLineDescription: "", description: "", aiGeneratedDescriptions: [], videoLink: "",
// };

// const input = "h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] px-3.5 text-sm text-[#1F4256] outline-none transition focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";

// function getUser() {
//   try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
// }

// function Card({ title, note, icon, children }) {
//   return <section className="rounded-[24px] border border-[#E4EDEF] bg-white p-5 shadow-[0_8px_30px_rgba(31,66,86,.06)] sm:p-7">
//     <header className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-4">
//       <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF8F4] text-[#16876B]">{icon}</div>
//       <div><h2 className="text-lg font-black text-[#1F4256]">{title}</h2>{note && <p className="mt-1 text-xs text-slate-400">{note}</p>}</div>
//     </header>{children}
//   </section>;
// }

// function Field({ label, required, error, children }) {
//   return <label className="block"><span className="mb-2 block text-xs font-extrabold text-[#526E7C]">{label}{required && <b className="ml-1 text-rose-500">*</b>}</span>{children}{error && <small className="mt-1 block font-semibold text-rose-500">{error}</small>}</label>;
// }

// function ThemeSelect({ value, onChange, options, placeholder = "Select" }) {
//   return <div className="relative"><select value={value || ""} onChange={(e) => onChange(e.target.value)} className={`${input} appearance-none pr-10`}><option value="">{placeholder}</option>{options.map((x) => <option key={x}>{x}</option>)}</select><FiChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" /></div>;
// }

// function ChoiceCard({ value, selected, onClick, icon: Icon, description }) {
//   return <button type="button" onClick={onClick} className={`group rounded-2xl border p-4 text-left transition ${selected ? "border-[#1F4256] bg-[#1F4256] text-white shadow-lg" : "border-[#DCE7EA] bg-white text-[#1F4256] hover:-translate-y-0.5 hover:border-[#3ED6AE]"}`}>
//     <div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl ${selected ? "bg-white/15" : "bg-[#F0F7F7]"}`}><Icon size={21} /></span>{selected && <FiCheck className="mt-1" />}</div>
//     <p className="mt-4 text-sm font-black">{value}</p>{description && <p className={`mt-1 text-[10px] leading-4 ${selected ? "text-white/70" : "text-slate-400"}`}>{description}</p>}
//   </button>;
// }

// function IconGrid({ items, selected, toggle, columns = "sm:grid-cols-2 lg:grid-cols-3" }) {
//   return <div className={`grid gap-3 ${columns}`}>{items.map(([label, Icon]) => { const active = selected.includes(label); return <button type="button" key={label} onClick={() => toggle(label)} className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition ${active ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#E4EDEF] bg-white text-[#526E7C] hover:border-[#BFDAD4]"}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-white text-[#16876B]" : "bg-[#F5F8F8] text-[#6C8793]"}`}><Icon size={19} /></span><span className="min-w-0 flex-1 text-xs font-bold">{label}</span>{active && <MdOutlineCheckCircle size={18} />}</button>; })}</div>;
// }

// export default function CommercialRentalPropertyForm({ onBack, onChangeListingType }) {
//   const editId = new URLSearchParams(window.location.search).get("edit");
//   const [draftId, setDraftId] = useState(editId || null);
//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState(initial);
//   const [images, setImages] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [video, setVideo] = useState(null);
//   const [floorPlan, setFloorPlan] = useState(null);
//   const [reraCertificate, setReraCertificate] = useState(null);
//   const [otherDocuments, setOtherDocuments] = useState([]);
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(Boolean(editId));
//   const [errors, setErrors] = useState({});
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [locationMessage, setLocationMessage] = useState("");
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const locationRequestRef = useRef(0);
//   const locationTimerRef = useRef(null);
//   const skipCityGeocodeRef = useRef(false);

//   const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));
//   const toggle = (key, value) => setForm((p) => ({ ...p, [key]: p[key].includes(value) ? p[key].filter((x) => x !== value) : [...p[key], value] }));

//   useEffect(() => {
//     if (!editId) return;
//     (async () => {
//       try {
//         const response = await getCommercialRentalPropertyByIdApi(editId);
//         const p = response?.data || response?.property || response;
//         setForm({
//           ...initial, title: p.title || "", propertyType: p.propertyType || "", city: p.location?.city || "", state: p.location?.state || "", country: p.location?.country || "India",
//           locality: p.location?.locality || "", society: p.location?.society || "", address: p.location?.address || "", pinCode: p.location?.pinCode || "", latitude: p.location?.latitude ?? "", longitude: p.location?.longitude ?? "",
//           rentAmount: p.rent?.amount ?? "", rentFrequency: p.rent?.frequency || "Per Month", negotiable: Boolean(p.rent?.negotiable), maintenanceAmount: p.maintenance?.amount ?? "", maintenanceFrequency: p.maintenance?.frequency || "Monthly", includedInRent: Boolean(p.maintenance?.includedInRent),
//           depositType: p.securityDeposit?.type || "One Month", depositAmount: p.securityDeposit?.amount ?? "", areaValue: p.areaDetails?.[0]?.value ?? "", areaType: p.areaDetails?.[0]?.type || "Built-up Area", areaUnit: p.areaDetails?.[0]?.unit || "Sq. Ft.", companyLease: Boolean(p.companyLease),
//           officeSpaceType: p.workspaceFacilities?.officeSpaceType || [], pantry: p.workspaceFacilities?.pantry || "None", personalWashroom: Boolean(p.workspaceFacilities?.personalWashroom), coveredParking: p.workspaceFacilities?.coveredParking ?? 0, openParking: p.workspaceFacilities?.openParking ?? 0, powerBackup: Boolean(p.workspaceFacilities?.powerBackup), liftAvailable: Boolean(p.workspaceFacilities?.liftAvailable),
//           furnishingStatus: p.furnishing?.status || "", furnishingItems: (p.furnishing?.items || []).map((x) => x.name), bathrooms: p.specifications?.bathrooms ?? 0, waterSources: p.specifications?.waterSources || [], locationAdvantages: p.specifications?.locationAdvantages || [], balconies: p.specifications?.balconies ?? 0,
//           facing: p.specifications?.facing || "", view: p.specifications?.view || "", flooring: p.specifications?.flooring || "", roadWidth: p.specifications?.connectingRoadWidth?.value ?? "", roadUnit: p.specifications?.connectingRoadWidth?.unit || "Feet", totalFloors: p.specifications?.totalFloorCount ?? "", propertyFloor: p.specifications?.propertyFloor ?? "", towerBlock: p.specifications?.towerBlock || "", unitNo: p.specifications?.unitNo || "", keepUnitNoPrivate: Boolean(p.specifications?.keepUnitNoPrivate),
//           amenities: p.amenities || [], highlights: p.propertyHighlights || [], oneLineDescription: p.oneLineDescription || "", description: p.description || "", aiGeneratedDescriptions: p.aiGeneratedDescriptions || [], videoLink: p.media?.videos?.[0]?.url || "",
//         });
//         setExistingImages(p.media?.images || []);
//         setVideo(null);
//         setFloorPlan(null);
//         setReraCertificate(null);
//         setOtherDocuments([]);
//       } catch (e) {
//         Swal.fire({ icon: "error", title: "Unable to load property", text: e?.response?.data?.message || e.message, confirmButtonColor: C.navy });
//       } finally { setLoading(false); }
//     })();
//   }, [editId]);

//   const imageUrls = useMemo(() => [...existingImages.map((x) => x.url).filter(Boolean), ...images.map((x) => x.preview)], [existingImages, images]);

//   const applyAddress = (address, displayName) =>
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
//       pinCode:
//         address.postcode?.replace(/\D/g, "").slice(0, 6) || p.pinCode,
//       address: displayName || p.address,
//     }));

//   const reverseGeocode = async (lat, lng) => {
//     // A map click is the most precise location. Do not let the city+PIN
//     // effect immediately move the map back to the centre of the PIN area.
//     skipCityGeocodeRef.current = true;
//     try {
//       setLocationLoading(true);
//       const r = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lng}`,
//         { headers: { Accept: "application/json" } }
//       );
//       if (!r.ok) throw new Error("Address lookup unavailable");
//       const d = await r.json();
//       applyAddress(d.address || {}, d.display_name || "");
//       setLocationMessage("Location selected. Address details filled automatically.");
//     } catch {
//       setLocationMessage("Coordinates saved. Address lookup is unavailable right now.");
//     } finally {
//       setLocationLoading(false);
//     }
//   };

//   const lookupPin = async (pin = form.pinCode, cityOverride = form.city) => {
//     const cleanPin = String(pin || "").replace(/\D/g, "").slice(0, 6);
//     if (!/^[1-9]\d{5}$/.test(cleanPin)) {
//       setLocationMessage("");
//       return;
//     }

//     const requestId = ++locationRequestRef.current;

//     try {
//       setLocationLoading(true);
//       setLocationMessage("Finding PIN location...");

//       // PIN -> India Post city/state/country/locality.
//       const r = await fetch(
//         `https://api.postalpincode.in/pincode/${cleanPin}`
//       );
//       if (!r.ok) throw new Error("PIN service unavailable");

//       const d = await r.json();
//       const office = d?.[0]?.PostOffice?.[0];
//       if (!office) throw new Error("PIN not found");

//       const city =
//         office.District ||
//         office.Block ||
//         office.Name ||
//         cityOverride ||
//         "";
//       const state = office.State || "";
//       const country = office.Country || "India";
//       const locality =
//         office.Name ||
//         office.Block ||
//         office.District ||
//         city;

//       // First fill the postal fields.
//       setForm((p) => ({
//         ...p,
//         pinCode: cleanPin,
//         city: city || p.city,
//         state: state || p.state,
//         country,
//         locality: p.locality || locality,
//       }));

//       // PINs represent an area, so the map is centered on the PIN/city area.
//       // Search the postal area first. This is more reliable than searching
//       // only a free-form "city + PIN" string and still gives us a map point
//       // even though a PIN represents an area rather than one exact building.
//       const geoUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&postalcode=${encodeURIComponent(cleanPin)}${city ? `&city=${encodeURIComponent(city)}` : ""}&q=${encodeURIComponent(`${city || ""}, ${cleanPin}, India`)}`;
//       const geo = await fetch(geoUrl, {
//         headers: { Accept: "application/json" },
//       });
//       const geoData = geo.ok ? await geo.json() : [];
//       const hit = geoData?.[0];

//       if (requestId !== locationRequestRef.current) return;

//       if (hit?.lat && hit?.lon) {
//         setForm((p) => ({
//           ...p,
//           pinCode: cleanPin,
//           city: city || p.city,
//           state: state || p.state,
//           country,
//           locality: p.locality || locality,
//           latitude: Number(hit.lat).toFixed(6),
//           longitude: Number(hit.lon).toFixed(6),
//           address: p.address || hit.display_name || `${city}, ${state}, ${country}`,
//         }));
//         setLocationMessage(`PIN verified: ${city}, ${state}. Map centered on ${city}.`);
//       } else {
//         setLocationMessage(`PIN verified: ${city}, ${state}. Map coordinates were not found.`);
//       }
//     } catch (e) {
//       if (requestId === locationRequestRef.current) {
//         setLocationMessage(e?.message || "PIN lookup failed");
//       }
//     } finally {
//       if (requestId === locationRequestRef.current) {
//         setLocationLoading(false);
//       }
//     }
//   };

//   // Automatically lookup a valid 6-digit PIN. No need to press "Find city".
//   useEffect(() => {
//     const pin = String(form.pinCode || "").replace(/\D/g, "").slice(0, 6);
//     if (!/^[1-9]\d{5}$/.test(pin)) {
//       if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
//       return;
//     }

//     if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
//     locationTimerRef.current = setTimeout(() => {
//       lookupPin(pin, form.city);
//     }, 450);

//     return () => {
//       if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
//     };
//   }, [form.pinCode]);

//   // If the user changes City after entering a valid PIN, move the map to City + PIN.
//   useEffect(() => {
//     const pin = String(form.pinCode || "").replace(/\D/g, "").slice(0, 6);
//     const city = String(form.city || "").trim();
//     if (!city || !/^[1-9]\d{5}$/.test(pin)) return;

//     // When the user clicked the map, reverseGeocode already supplied the
//     // exact point. Keep that point instead of snapping back to city centre.
//     if (skipCityGeocodeRef.current) {
//       skipCityGeocodeRef.current = false;
//       return;
//     }

//     if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
//     locationTimerRef.current = setTimeout(async () => {
//       try {
//         setLocationLoading(true);
//         const q = encodeURIComponent(`${city}, ${pin}, India`);
//         const r = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&country=India&q=${q}`,
//           { headers: { Accept: "application/json" } }
//         );
//         const data = r.ok ? await r.json() : [];
//         const hit = data?.[0];
//         if (hit?.lat && hit?.lon) {
//           setForm((p) => ({
//             ...p,
//             latitude: Number(hit.lat).toFixed(6),
//             longitude: Number(hit.lon).toFixed(6),
//           }));
//           setLocationMessage(`Map moved to ${city}, PIN ${pin}.`);
//         }
//       } catch {
//         // Keep the postal lookup result if city geocoding is unavailable.
//       } finally {
//         setLocationLoading(false);
//       }
//     }, 650);

//     return () => {
//       if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
//     };
//   }, [form.city]);

//   const validateStep = () => {
//     const e = {};
//     if (step === 0) {
//       if (!form.title.trim()) e.title = "Property title is required";
//       if (!form.propertyType) e.propertyType = "Select property type";
//       if (!form.city.trim()) e.city = "City is required";
//       if (!form.locality.trim()) e.locality = "Locality is required";
//       if (!(Number(form.rentAmount) > 0)) e.rentAmount = "Enter valid rent";
//       if (!(Number(form.areaValue) > 0)) e.areaValue = "Enter valid area";
//       if (!form.furnishingStatus) e.furnishingStatus = "Select furnishing status";
//     }
//     if (step === 1 && (!form.description.trim() || form.description.trim().length < 25)) e.description = "Property story must contain at least 25 characters";
//     setErrors(e); return Object.keys(e).length === 0;
//   };
//   // const next = async () => {
//   //   // Save & Continue is a draft action. Do NOT require the full
//   //   // step validation here; users should be able to save partial progress.
//   //   const saved = await submitProperty("Draft");
//   //   if (!saved) return;

//   //   setStep((x) => Math.min(3, x + 1));
//   //   window.scrollTo({ top: 0, behavior: "smooth" });
//   // };
  
//   const next = async () => {
//   const isValid = validateStep();

//   if (!isValid) {
//     return;
//   }

//   setSaving(true);

//   try {
//     const saved = await submitProperty("Draft");

//     // API failed → do NOT move to next step
//     if (!saved) {
//       return;
//     }

//     setStep((x) => Math.min(3, x + 1));
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   } finally {
//     setSaving(false);
//   }
// };


//   const back = () => setStep((x) => Math.max(0, x - 1));

//   const addImages = (event) => {
//     const selected = Array.from(event.target.files || []).slice(0, 25 - images.length).map((file, index) => ({ file, preview: URL.createObjectURL(file), category: images.length + index === 0 && !existingImages.some((x) => x.isCover) ? "Exterior View" : "Other", isCover: images.length + index === 0 && !existingImages.some((x) => x.isCover) }));
//     setImages((p) => [...p, ...selected]); event.target.value = "";
//   };
//   const removeImage = (index) => setImages((p) => p.filter((_, i) => i !== index));
//   const removeExisting = (index) => setExistingImages((p) => p.filter((_, i) => i !== index));
//   const setCover = (index, existing = false) => {
//     if (existing) setExistingImages((p) => p.map((x, i) => ({ ...x, isCover: i === index })));
//     else setImages((p) => p.map((x, i) => ({ ...x, isCover: i === index })));
//   };

//   const addSingleFile = (event, setter) => {
//     const file = event.target.files?.[0] || null;
//     setter(file);
//     event.target.value = "";
//   };

//   const addOtherDocuments = (event) => {
//     const selected = Array.from(event.target.files || []);
//     const remaining = Math.max(0, 3 - otherDocuments.length);
//     const files = selected.slice(0, remaining);
//     setOtherDocuments((prev) => [...prev, ...files].slice(0, 3));
//     event.target.value = "";
//   };

//   const removeOtherDocument = (index) => {
//     setOtherDocuments((prev) => prev.filter((_, i) => i !== index));
//   };

//   const showFinalPreview = () => setPreviewOpen(true);

//   const submitProperty = async (status = "Submitted") => {

//     if (status === "Draft" && !(Number(form.areaValue) > 0)) {
//   setErrors((prev) => ({
//     ...prev,
//     areaValue: "Please enter area greater than 0",
//   }));

//   await Swal.fire({
//     toast: true,
//     position: "top-end",
//     icon: "error",
//     title: "Area is required",
//     text: "Please enter property area before continuing.",
//     showConfirmButton: false,
//     timer: 2200,
//   });

//   setSaving(false);
//   return;
// }

//     if (status === "Submitted" && !validateStep()) return;

//     const user = getUser();

//     try {
//       setSaving(true);

//       const payload = {
//         title: form.title.trim(),
//         listingType: "Rent",
//         transactionType: "Rent",
//         category: "Commercial",
//         buildingType: "Commercial",
//         propertyType: form.propertyType,
//         location: {
//           city: form.city.trim(),
//           state: form.state,
//           country: form.country || "India",
//           locality: form.locality.trim(),
//           society: form.society.trim(),
//           address: form.address.trim(),
//           pinCode: form.pinCode || null,
//           latitude: form.latitude === "" ? null : Number(form.latitude),
//           longitude: form.longitude === "" ? null : Number(form.longitude),
//           isLocationConfirmed: Boolean(form.latitude && form.longitude),
//         },
//         rent: {
//           amount: Number(form.rentAmount),
//           frequency: form.rentFrequency,
//           negotiable: form.negotiable,
//         },
//         maintenance: {
//           amount: Number(form.maintenanceAmount || 0),
//           frequency: form.maintenanceFrequency,
//           includedInRent: form.includedInRent,
//         },
//         securityDeposit: {
//           type: form.depositType,
//           amount: Number(form.depositAmount || 0),
//         },
//     areaDetails: [{
//   value: Number(form.areaValue || 0),
//   type: form.areaType,
//   unit: form.areaUnit,
//   display: true,
// }],
//         companyLease: form.companyLease,
//         workspaceFacilities: {
//           officeSpaceType: form.officeSpaceType,
//           pantry: form.pantry,
//           personalWashroom: form.personalWashroom,
//           coveredParking: Number(form.coveredParking),
//           openParking: Number(form.openParking),
//           powerBackup: form.powerBackup,
//           liftAvailable: form.liftAvailable,
//         },
//         furnishing: {
//           status: form.furnishingStatus,
//           items: form.furnishingItems.map((name) => ({ name, quantity: 1 })),
//         },
//         specifications: {
//           bathrooms: Number(form.bathrooms || 0),
//           coveredParking: Number(form.coveredParking),
//           openParking: Number(form.openParking),
//           powerBackup: form.powerBackup,
//           waterSources: form.waterSources,
//           liftAvailable: form.liftAvailable,
//           locationAdvantages: form.locationAdvantages,
//           balconies: Number(form.balconies || 0),
//           facing: form.facing || null,
//           view: form.view || null,
//           flooring: form.flooring || null,
//           connectingRoadWidth: {
//             value: form.roadWidth === "" ? null : Number(form.roadWidth),
//             unit: form.roadUnit,
//           },
//           totalFloorCount: form.totalFloors === "" ? null : Number(form.totalFloors),
//           propertyFloor: form.propertyFloor === "" ? null : Number(form.propertyFloor),
//           towerBlock: form.towerBlock,
//           unitNo: form.unitNo,
//           keepUnitNoPrivate: form.keepUnitNoPrivate,
//         },
//         amenities: form.amenities,
//         propertyHighlights: form.highlights,
//         oneLineDescription: form.oneLineDescription.trim(),
//         description: form.description.trim(),
//         aiGeneratedDescriptions: form.aiGeneratedDescriptions,
//         media: {
//           images: existingImages,
//           videos: form.videoLink
//             ? [{ url: form.videoLink, title: "Property tour" }]
//             : [],
//           floorPlans: [],
//           reraCertificates: [],
//           documents: [],
//         },
//         status,
//         sourceModel: "CommercialRentalProperty",
//         createdBy: {
//           id: user?.id || user?._id || null,
//           role: user?.role || "admin",
//         },
//         imageMeta: images.map((x) => ({
//           category: x.category,
//           isCover: x.isCover,
//         })),
//         existingImages,
//       };

//       const body = new FormData();
//       body.append("data", JSON.stringify(payload));
//       body.append("existingImages", JSON.stringify(existingImages));
//       body.append(
//         "imageMeta",
//         JSON.stringify(images.map((x) => ({
//           category: x.category,
//           isCover: x.isCover,
//         })))
//       );

//       images.forEach((x) => { if (x.file) body.append("images", x.file); });
//       if (video) body.append("video", video);
//       if (floorPlan) body.append("floorPlan", floorPlan);
//       if (reraCertificate) body.append("reraCertificate", reraCertificate);
//       otherDocuments.forEach((file) => body.append("documents", file));

//       const targetId = draftId || editId;
//       const result = targetId
//         ? await updateCommercialRentalPropertyApi(targetId, body)
//         : await createCommercialRentalPropertyApi(body);

//       if (status === "Draft") {
//         const savedId = result?.data?._id || result?.data?.id;
//         if (!draftId && savedId) setDraftId(savedId);
//         await Swal.fire({
//           toast: true,
//           position: "top-end",
//           icon: "success",
//           title: "Draft saved",
//           text: "Property saved successfully.",
//           showConfirmButton: false,
//           timer: 1800,
//         });
//         return true;
//       }

//       await Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: editId ? "Property updated" : "Property published",
//         text: result?.data?.propertyId
//           ? `Property ID: ${result.data.propertyId}`
//           : "Property submitted successfully.",
//         showConfirmButton: false,
//         timer: 2200,
//       });

//       setPreviewOpen(false);

//       // Keep existing behaviour after a successful new submission.
//       if (!editId) {
//         setForm(initial);
//         setImages([]);
//         setExistingImages([]);
//         setVideo(null);
//         setFloorPlan(null);
//         setReraCertificate(null);
//         setOtherDocuments([]);
//         setStep(0);
//         setDraftId(null);
//       } else {
//         window.history.back();
//       }

//       return true;
//     } catch (e) {
//       await Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "error",
//         title: "Unable to save property",
//         text: e?.response?.data?.message || e.message || "Something went wrong.",
//         showConfirmButton: false,
//         timer: 2600,
//       });
//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   const saveDraft = () => submitProperty("Draft");

//   const submit = () => submitProperty("Submitted");


//   if (loading) return <div className="flex min-h-[70vh] items-center justify-center bg-[#F4F8F8]"><div className="rounded-2xl bg-white px-8 py-6 font-bold text-[#526E7C] shadow">Loading commercial property...</div></div>;

//   const steps = [
//     ["Property Snapshot", "Type, location & rent", FiHome],
//     ["Workspace Facilities", "Area, furnishing & parking", FiBriefcase],
//     ["Media & Highlights", "Photos, amenities & advantages", FiImage],
//     ["Property Story", "Description & submit", FiFileText],
//   ];

//   const previewImage = existingImages[0]?.url || images[0]?.preview || "";

//   return <>
//     {previewOpen && (
//       <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
//         <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
//           <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
//             <div>
//               <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#16876B]">Final Property Preview</p>
//               <h2 className="mt-1 text-xl font-black text-[#1F4256]">{form.title || "Untitled Property"}</h2>
//             </div>
//             <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-xl border px-3 py-2 text-xs font-black text-[#526E7C]">Close</button>
//           </div>
//           <div className="p-5 sm:p-7">
//             {previewImage && <img src={previewImage} alt="" className="h-64 w-full rounded-2xl object-cover" />}
//             <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Property</p><b className="text-sm text-[#1F4256]">{form.propertyType || "—"}</b></div>
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Location</p><b className="text-sm text-[#1F4256]">{[form.city, form.state].filter(Boolean).join(", ") || "—"}</b></div>
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">PIN</p><b className="text-sm text-[#1F4256]">{form.pinCode || "—"}</b></div>
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Rent</p><b className="text-sm text-[#1F4256]">{form.rentAmount ? `₹${Number(form.rentAmount).toLocaleString("en-IN")} / ${form.rentFrequency === "Per Year" ? "year" : "month"}` : "—"}</b></div>
//             </div>
//             <div className="mt-4 rounded-2xl border border-[#DCE7EA] p-4">
//               <p className="text-xs font-black text-[#1F4256]">Location</p>
//               <p className="mt-1 text-xs text-[#526E7C]">{form.address || [form.locality, form.city, form.state, form.pinCode].filter(Boolean).join(", ") || "—"}</p>
//               {form.latitude && form.longitude && <p className="mt-1 text-[10px] text-slate-400">Map: {form.latitude}, {form.longitude}</p>}
//             </div>
//             <div className="mt-4 rounded-2xl border border-[#DCE7EA] p-4">
//               <p className="text-xs font-black text-[#1F4256]">Media & Documents</p>
//               <div className="mt-2 grid gap-2 sm:grid-cols-4">
//                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{existingImages.length + images.length} images</span>
//                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{video ? "1 video" : "0 video"}</span>
//                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{floorPlan ? "1 floor plan" : "0 floor plan"}</span>
//                 <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{reraCertificate ? "1 RERA + " : ""}{otherDocuments.length} other docs</span>
//               </div>
//             </div>
//             <div className="mt-4">
//               <p className="text-xs font-black text-[#1F4256]">Description</p>
//               <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#526E7C]">{form.description || "No description added."}</p>
//             </div>
//             <div className="mt-6 flex flex-wrap justify-end gap-2">
//               <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-xl border border-[#1F4256] px-5 py-3 text-xs font-black text-[#1F4256]">Edit Property</button>
//               <button type="button" disabled={saving} onClick={submit} className="rounded-xl bg-[#3ED6AE] px-5 py-3 text-xs font-black text-[#1F4256] disabled:opacity-50">
//                 {saving ? "Publishing..." : editId ? "Update Property" : "Publish Property"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}

//    <div className="min-h-screen bg-[#F4F8F8] pb-10">
//     <div className="bg-[#1F4256] px-4 py-7 text-white sm:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><div><button onClick={onBack || onChangeListingType} className="mb-3 flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white"><FiArrowLeft /> Change building type</button><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#3ED6AE]">Rent · Commercial</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">{editId ? "Edit Commercial Rental" : "Commercial Rental Property"}</h1><p className="mt-1 text-sm text-white/60">A guided commercial leasing form with map, workspace facilities and rich property highlights.</p></div><div className="hidden rounded-2xl bg-white/10 px-5 py-3 text-center sm:block"><p className="text-[10px] uppercase tracking-widest text-white/50">Progress</p><p className="mt-1 text-xl font-black">{Math.round(((step + 1) / 4) * 100)}%</p></div></div></div>
//     <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-8 lg:grid-cols-[260px_1fr]">
//       <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-5"><p className="mb-6 text-[10px] font-black uppercase tracking-[.2em] text-[#16876B]">List your property</p>{steps.map(([name, hint, Icon], i) => <div key={name} className="relative flex gap-3 pb-8 last:pb-0"><span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${i <= step ? "bg-[#1F4256] text-white" : "bg-slate-100 text-slate-400"}`}>{i < step ? <FiCheck /> : <Icon />}</span>{i < 3 && <span className={`absolute left-5 top-10 h-8 w-px ${i < step ? "bg-[#3ED6AE]" : "bg-slate-200"}`} />}<span><b className={`block text-xs ${i === step ? "text-[#1F4256]" : "text-slate-400"}`}>{name}</b><small className="text-[10px] text-slate-400">{hint}</small></span></div>)}</aside>
//       <main className="space-y-5">
//         {step === 0 && <>
//           <Card title="Property Snapshot" note="Commercial rental identity and property category." icon={<MdBusinessCenter size={20} />}>
//             <div className="space-y-5"><Field label="Property Title" required error={errors.title}><input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Premium furnished office in Mahalaxmi Nagar" /></Field>
//               <Field label="Property Type" required error={errors.propertyType}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{PROPERTY_TYPES.map((x) => <button key={x} type="button" onClick={() => set("propertyType", x)} className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${form.propertyType === x ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C] hover:border-[#3ED6AE]"}`}>{x}</button>)}</div></Field>
//               <div className="grid gap-4 sm:grid-cols-2"><Field label="City" required error={errors.city}><input className={input} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Indore" /></Field><Field label="Locality / Society" required error={errors.locality}><input className={input} value={form.locality} onChange={(e) => set("locality", e.target.value)} placeholder="Mahalaxmi Nagar, Indore East" /></Field><Field label="Society / Project"><input className={input} value={form.society} onChange={(e) => set("society", e.target.value)} placeholder="Search for project" /></Field><Field label="PIN Code"><div className="flex gap-2"><input maxLength={6} className={input} value={form.pinCode} onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, ""))} /><button type="button" onClick={lookupPin} className="shrink-0 rounded-xl bg-[#1F4256] px-4 text-xs font-black text-white">Find city</button></div></Field><Field label="State"><input className={input} value={form.state} onChange={(e) => set("state", e.target.value)} /></Field><Field label="Country"><input className={input} value={form.country} onChange={(e) => set("country", e.target.value)} /></Field><div className="sm:col-span-2"><Field label="Complete Address"><input className={input} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Building, floor, street, landmark" /></Field></div></div>
//             </div></Card>
//           <Card title="Location & Project" note="Click the map to place the exact property pin. Dragging/clicking the pin updates coordinates." icon={<FiMapPin size={20} />}>
//             <div className="grid gap-4 sm:grid-cols-2"><Field label="Latitude"><input className={input} value={form.latitude} onChange={(e) => set("latitude", e.target.value)} /></Field><Field label="Longitude"><input className={input} value={form.longitude} onChange={(e) => set("longitude", e.target.value)} /></Field></div>
//             <div className="mt-5 overflow-hidden rounded-2xl border border-[#DCE7EA]"><div className="flex items-center justify-between bg-[#F7FAFA] px-4 py-3"><span className="text-xs font-black text-[#526E7C]">Select exact location</span>{locationLoading && <span className="text-[10px] font-bold text-[#16876B]">Finding address...</span>}</div><MapPicker key={`${form.latitude || "default"}-${form.longitude || "default"}`} formData={form} setFormData={setForm} onLocationChange={reverseGeocode} /></div>{locationMessage && <p className="mt-3 rounded-xl bg-[#EAF8F4] px-4 py-3 text-xs font-bold text-[#1F4256]">{locationMessage}</p>}
//           </Card>
//           <Card title="Rent, Maintenance & Deposit" note="Commercial leasing amount and terms." icon={<FiLayers size={20} />}>
//             <div className="grid gap-4 sm:grid-cols-2"><Field label="Property Rent" required error={errors.rentAmount}><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.rentAmount} onChange={(e) => set("rentAmount", e.target.value)} placeholder="30000" /><ThemeSelect value={form.rentFrequency} onChange={(v) => set("rentFrequency", v)} options={["Per Month", "Per Year"]} /></div></Field><Field label="Maintenance"><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.maintenanceAmount} onChange={(e) => set("maintenanceAmount", e.target.value)} placeholder="5000" /><ThemeSelect value={form.maintenanceFrequency} onChange={(v) => set("maintenanceFrequency", v)} options={["Per SqFt", "Monthly", "Quarterly", "Yearly", "One Time"]} /></div></Field><Field label="Included in Rent"><button type="button" onClick={() => set("includedInRent", !form.includedInRent)} className={`h-11 rounded-xl border px-4 text-xs font-black ${form.includedInRent ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.includedInRent ? "✓ Included in rent" : "Not included"}</button></Field><Field label="Security Deposit"><ThemeSelect value={form.depositType} onChange={(v) => set("depositType", v)} options={DEPOSIT} /></Field>{form.depositType === "Other" && <Field label="Deposit Amount"><input type="number" className={input} value={form.depositAmount} onChange={(e) => set("depositAmount", e.target.value)} /></Field>}<Field label="Rent Negotiable"><button type="button" onClick={() => set("negotiable", !form.negotiable)} className={`h-11 rounded-xl border px-4 text-xs font-black ${form.negotiable ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.negotiable ? "✓ Negotiable" : "Not Negotiable"}</button></Field></div>
//           </Card>
//         </>}

//         {step === 1 && <>
//           <Card title="Area Details" note="Add the area and measurement used for this commercial listing." icon={<FiMaximize size={20} />}><div className="grid gap-4 sm:grid-cols-3"><Field label="Area" required error={errors.areaValue}><input type="number" className={input} value={form.areaValue} onChange={(e) => set("areaValue", e.target.value)} placeholder="2000" /></Field><Field label="Area Type"><ThemeSelect value={form.areaType} onChange={(v) => set("areaType", v)} options={AREA_TYPES} /></Field><Field label="Unit"><ThemeSelect value={form.areaUnit} onChange={(v) => set("areaUnit", v)} options={UNITS} /></Field></div></Card>
//           <Card title="Workspace Facilities" note="Facilities shown in your commercial listing." icon={<MdOutlineBusiness size={20} />}><div className="space-y-6"><Field label="Office Space Type"><div className="grid gap-3 sm:grid-cols-3">{OFFICE_TYPES.map((x) => <button key={x} type="button" onClick={() => toggle("officeSpaceType", x)} className={`rounded-xl border px-4 py-3 text-xs font-bold ${form.officeSpaceType.includes(x) ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.officeSpaceType.includes(x) && "✓ "}{x}</button>)}</div></Field><Field label="Pantry"><div className="flex flex-wrap gap-2">{PANTRY.map((x) => <button key={x} type="button" onClick={() => set("pantry", x)} className={`rounded-xl border px-4 py-2.5 text-xs font-bold ${form.pantry === x ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>{x}</button>)}</div></Field><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Personal Washroom"><button type="button" onClick={() => set("personalWashroom", !form.personalWashroom)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.personalWashroom ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.personalWashroom ? "✓ Yes" : "No"}</button></Field><Field label="Covered Parking"><input type="number" min="0" className={input} value={form.coveredParking} onChange={(e) => set("coveredParking", e.target.value)} /></Field><Field label="Open Parking"><input type="number" min="0" className={input} value={form.openParking} onChange={(e) => set("openParking", e.target.value)} /></Field><Field label="Bathrooms"><input type="number" min="0" className={input} value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} /></Field><Field label="Power Backup"><button type="button" onClick={() => set("powerBackup", !form.powerBackup)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.powerBackup ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.powerBackup ? "✓ Available" : "No Back-up"}</button></Field><Field label="Lift Availability"><button type="button" onClick={() => set("liftAvailable", !form.liftAvailable)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.liftAvailable ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.liftAvailable ? "✓ Yes" : "No"}</button></Field></div></div></Card>
//           <Card title="Furnishing Status" note="Use icon cards for a clear commercial workspace presentation." icon={<MdOutlineChair size={20} />}><div className="grid gap-3 md:grid-cols-3">{FURNISHING_STATUS.map(([label, Icon, desc]) => <ChoiceCard key={label} value={label} selected={form.furnishingStatus === label} onClick={() => set("furnishingStatus", label)} icon={Icon} description={desc} />)}</div>{errors.furnishingStatus && <p className="mt-2 text-xs font-bold text-rose-500">{errors.furnishingStatus}</p>}{form.furnishingStatus && form.furnishingStatus !== "Unfurnished" && <div className="mt-6"><p className="mb-3 text-xs font-black text-[#526E7C]">Furnishing Details</p><IconGrid items={FURNISHING_ITEMS} selected={form.furnishingItems} toggle={(x) => toggle("furnishingItems", x)} columns="sm:grid-cols-2 lg:grid-cols-4" /></div>}</Card>
//           <Card title="Commercial Specifications" note="Floor, road, facing and unit information." icon={<FiGrid size={20} />}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Field label="Facing"><ThemeSelect value={form.facing} onChange={(v) => set("facing", v)} options={FACINGS} /></Field><Field label="View"><ThemeSelect value={form.view} onChange={(v) => set("view", v)} options={VIEWS} /></Field><Field label="Flooring"><ThemeSelect value={form.flooring} onChange={(v) => set("flooring", v)} options={FLOORING} /></Field><Field label="Connecting Road Width"><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.roadWidth} onChange={(e) => set("roadWidth", e.target.value)} /><ThemeSelect value={form.roadUnit} onChange={(v) => set("roadUnit", v)} options={["Feet", "Meter"]} /></div></Field><Field label="Floor Number"><input type="number" className={input} value={form.propertyFloor} onChange={(e) => set("propertyFloor", e.target.value)} /></Field><Field label="Total Floors"><input type="number" className={input} value={form.totalFloors} onChange={(e) => set("totalFloors", e.target.value)} /></Field><Field label="Tower / Block"><input className={input} value={form.towerBlock} onChange={(e) => set("towerBlock", e.target.value)} /></Field><Field label="Unit No."><input className={input} value={form.unitNo} onChange={(e) => set("unitNo", e.target.value)} /></Field></div><label className="mt-5 flex items-center gap-2 text-xs font-bold text-[#526E7C]"><input type="checkbox" checked={form.keepUnitNoPrivate} onChange={(e) => set("keepUnitNoPrivate", e.target.checked)} /> Keep unit number private</label></Card>
//         </>}

//         {step === 2 && <>
//           <Card title="Media & Highlights" note="At least one image is required for a submitted listing." icon={<FiImage size={20} />}><label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C8D8DC] bg-[#FAFCFC] px-5 py-9 text-center hover:border-[#3ED6AE] hover:bg-[#F1FBF8]"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1F4256] text-white"><FiUploadCloud size={22} /></span><b className="mt-3 text-sm text-[#1F4256]">Upload Property Images</b><span className="mt-1 text-[10px] text-slate-400">JPG, PNG, WEBP · up to 25 images</span><input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={addImages} /></label>
//             {(existingImages.length || images.length) > 0 && <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">{existingImages.map((x, i) => <div key={`e-${i}`} className="group relative aspect-square overflow-hidden rounded-2xl border"><img src={x.url} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => removeExisting(i)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white"><FiTrash2 size={13} /></button><button type="button" onClick={() => setCover(i, true)} className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-[9px] font-black ${x.isCover ? "bg-[#3ED6AE] text-[#1F4256]" : "bg-black/60 text-white"}`}>{x.isCover ? "Cover" : "Make cover"}</button></div>)}{images.map((x, i) => <div key={`n-${i}`} className="group relative aspect-square overflow-hidden rounded-2xl border"><img src={x.preview} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => removeImage(i)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white"><FiTrash2 size={13} /></button><button type="button" onClick={() => setCover(i, false)} className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-[9px] font-black ${x.isCover ? "bg-[#3ED6AE] text-[#1F4256]" : "bg-black/60 text-white"}`}>{x.isCover ? "Cover" : "Make cover"}</button></div>)}</div>}
//             <div className="mt-5 grid gap-4 sm:grid-cols-2">
//               <Field label="Property Video">
//                 <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => addSingleFile(e, setVideo)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
//                 {video && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {video.name}</p>}
//               </Field>
//               <Field label="Floor Plan">
//                 <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={(e) => addSingleFile(e, setFloorPlan)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
//                 {floorPlan && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {floorPlan.name}</p>}
//               </Field>
//               <Field label="RERA Certificate">
//                 <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={(e) => addSingleFile(e, setReraCertificate)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
//                 {reraCertificate && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {reraCertificate.name}</p>}
//               </Field>
//               <Field label="Other Documents" error={otherDocuments.length >= 3 ? undefined : undefined}>
//                 <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" onChange={addOtherDocuments} disabled={otherDocuments.length >= 3} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs disabled:opacity-50" />
//                 <p className="mt-1 text-[10px] text-slate-400">Maximum 3 additional documents.</p>
//                 {otherDocuments.length > 0 && (
//                   <div className="mt-2 space-y-1">
//                     {otherDocuments.map((file, i) => (
//                       <div key={`${file.name}-${i}`} className="flex items-center justify-between rounded-lg bg-[#F4F8F8] px-2.5 py-2 text-[10px]">
//                         <span className="truncate font-bold text-[#526E7C]">{file.name}</span>
//                         <button type="button" onClick={() => removeOtherDocument(i)} className="ml-2 text-rose-500">Remove</button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </Field>
//             </div>
//           </Card>
//           <Card title="Location Advantages" note="Select the advantages relevant to this commercial property." icon={<FiNavigation size={20} />}><IconGrid items={ADVANTAGES.map((x) => [x, MdOutlineLocationOn])} selected={form.locationAdvantages} toggle={(x) => toggle("locationAdvantages", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
//           <Card title="Amenities" note="Icon-based amenities make the listing easier to scan." icon={<MdOutlineHomeWork size={20} />}><IconGrid items={AMENITIES} selected={form.amenities} toggle={(x) => toggle("amenities", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
//           <Card title="Property Highlights" note="Show your strongest selling points." icon={<FiStar size={20} />}><IconGrid items={HIGHLIGHTS} selected={form.highlights} toggle={(x) => toggle("highlights", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
//         </>}

//         {step === 3 && <>
//           <Card title="Amenities & Property Story" note="Write a short hook and detailed commercial property story." icon={<FiFileText size={20} />}><div className="space-y-5"><Field label="One-line Description" required><input maxLength={200} className={input} value={form.oneLineDescription} onChange={(e) => set("oneLineDescription", e.target.value)} placeholder="Premium furnished office with excellent road connectivity" /></Field><Field label="Property Description" required error={errors.description}><textarea rows={9} className={`${input} h-auto py-3`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the workspace, location, access, layout, business suitability, facilities and nearby connectivity..." /></Field></div></Card>
//           <Card title="Company Lease" note="Whether the property is available specifically for company/corporate lease." icon={<FiBriefcase size={20} />}><div className="flex flex-wrap gap-3"><button type="button" onClick={() => set("companyLease", true)} className={`rounded-xl border px-5 py-3 text-xs font-black ${form.companyLease ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>✓ Yes</button><button type="button" onClick={() => set("companyLease", false)} className={`rounded-xl border px-5 py-3 text-xs font-black ${!form.companyLease ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>No</button></div></Card>
//           <Card title="Ready to Submit" note="Review the selected property information before publishing." icon={<MdOutlineCheckCircle size={20} />}>
//             <div className="grid gap-3 sm:grid-cols-5">
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Type</p><b className="mt-1 block text-sm text-[#1F4256]">{form.propertyType || "—"}</b></div>
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Rent</p><b className="mt-1 block text-sm text-[#1F4256]">{form.rentAmount ? `₹${Number(form.rentAmount).toLocaleString("en-IN")}` : "—"}</b></div>
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Area</p><b className="mt-1 block text-sm text-[#1F4256]">{form.areaValue ? `${form.areaValue} ${form.areaUnit}` : "—"}</b></div>
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Images</p><b className="mt-1 block text-sm text-[#1F4256]">{existingImages.length + images.length}</b></div>
//               <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Documents</p><b className="mt-1 block text-sm text-[#1F4256]">{otherDocuments.length}/3</b></div>
//             </div>
//             <div className="mt-5 flex flex-wrap gap-2">
//               <button type="button" onClick={showFinalPreview} className="flex h-10 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-xs font-black text-[#1F4256] hover:bg-slate-50">
//                 <FiImage /> Final Preview
//               </button>
//               <button type="button" onClick={saveDraft} disabled={saving} className="flex h-10 items-center gap-2 rounded-xl border border-[#3ED6AE] px-4 text-xs font-black text-[#1F4256] disabled:opacity-50">
//                 Save Draft
//               </button>
//             </div>
//           </Card>
//         </>}

//         <div className="sticky bottom-3 z-20 flex flex-wrap justify-between gap-3 rounded-2xl border border-[#DCE7EA] bg-white/95 p-3 shadow-[0_12px_40px_rgba(31,66,86,.15)] backdrop-blur">
//           <button type="button" onClick={back} disabled={step === 0} className="flex h-11 items-center gap-2 rounded-xl border border-[#DCE7EA] px-5 text-xs font-black text-[#526E7C] disabled:opacity-30"><FiArrowLeft /> Previous</button>
//           <div className="flex flex-wrap gap-2">
//             {step === 3 && (
//               <>
//                 <button type="button" onClick={showFinalPreview} className="flex h-11 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-xs font-black text-[#1F4256]">
//                   <FiImage /> Preview Property
//                 </button>
//                 <button type="button" disabled={saving} onClick={saveDraft} className="flex h-11 items-center gap-2 rounded-xl border border-[#3ED6AE] px-5 text-xs font-black text-[#1F4256] disabled:opacity-50">
//                   Save Draft
//                 </button>
//               </>
//             )}
//             {step < 3 ? (
//               <button type="button" onClick={next} className="flex h-11 items-center gap-2 rounded-xl bg-[#1F4256] px-7 text-xs font-black text-white">
//                 Save & Continue <FiArrowRight />
//               </button>
//             ) : (
//               <button type="button" disabled={saving} onClick={submit} className="flex h-11 items-center gap-2 rounded-xl bg-[#3ED6AE] px-7 text-xs font-black text-[#1F4256] disabled:opacity-50">
//                 {saving ? "Saving..." : editId ? "Update Property" : "Publish Property"} <FiCheck />
//               </button>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   </div>
//   </>;
// }


import { useEffect, useMemo, useState, useRef } from "react";
import {
  FiArrowLeft, FiArrowRight, FiCheck, FiChevronDown, FiHome, FiImage,
  FiMapPin, FiTrash2, FiUploadCloud, FiBriefcase, FiFileText,
  FiLayers, FiGrid, FiShield, FiWind, FiCoffee, FiZap, FiDroplet,
  FiTruck, FiNavigation, FiActivity, FiStar, FiMaximize, FiLock,
} from "react-icons/fi";
import {
  MdApartment, MdBusinessCenter, MdMeetingRoom, MdStorefront, MdWarehouse,
  MdOutlineChair, MdOutlineWeekend, MdOutlineKitchen, MdOutlineAcUnit,
  MdOutlineLightbulb, MdOutlineTv, MdOutlineBed, MdOutlineLocalLaundryService,
  MdOutlineMicrowave, MdOutlineSecurity, MdOutlineElevator, MdOutlinePool,
  MdOutlineFitnessCenter, MdOutlineLocalParking, MdOutlineEvStation,
  MdOutlineShoppingCart, MdOutlineTheaterComedy, MdOutlinePark, MdOutlineSports,
  MdOutlineChildCare, MdOutlineCelebration, MdOutlineHomeWork, MdOutlineCheckCircle,
  MdOutlineLocationOn, MdOutlineDirectionsCar, MdOutlineBusiness,
} from "react-icons/md";
import Swal from "sweetalert2";
import MapPicker from "../../../components/MapPicker";
import {
  createCommercialRentalPropertyApi,
  getCommercialRentalPropertyByIdApi,
  updateCommercialRentalPropertyApi,
} from "../../../Services/propertyService";

const C = {
  navy: "#1F4256",
  teal: "#3ED6AE",
  bg: "#F4F8F8",
  border: "#DCE7EA",
  text: "#526E7C",
};

const PROPERTY_TYPES = ["Office Space", "Shop", "Land", "Office Space in IT/SEZ", "Showroom", "Warehouse", "Industrial Plot", "Co-working Space"];
const OFFICE_TYPES = ["Semi-Fitted", "Fitted Space", "Shell and Core"];
const PANTRY = ["Wet", "Dry", "None"];
const DEPOSIT = ["Zero Deposit", "One Month", "Two Months", "Other"];
const AREA_TYPES = ["Built-up Area", "Super Built-up Area", "Carpet Area", "Saleable Area", "Plot Area"];
const UNITS = ["Sq. Ft.", "Sq. Meter", "Sq. Yard", "Acre", "Hectare"];
const FACINGS = ["East", "West", "North", "South", "North East", "North West", "South East", "South West"];
const VIEWS = ["Beach View", "Garden View", "Golf Course", "Lake View", "Park View", "Road View", "Community View", "Pool View", "Creek View", "Sea View"];
const FLOORING = ["Marble", "Concrete", "Cemented", "Carpeted", "Wooden", "Vitrified Tiles", "Wooden Tiles", "Imported Tiles", "Indian Tiles", "Ceramic", "Hardwood", "Carpet", "Others"];
const ADVANTAGES = ["Good School in vicinity", "Nearby Metro Station", "Peaceful Vicinity", "Near City Center", "Safe & Secure Locality", "Near Reputed Hospital", "Close to Shopping Mall/Market", "Highway/Expressway Access", "Near IT Park/Business Hub", "Close to Railway Station"];
const AMENITIES = [
  ["Gymnasium", MdOutlineFitnessCenter], ["Swimming Pool", MdOutlinePool], ["Kids Play Areas", MdOutlineChildCare], ["Jogging/Cycle Track", MdOutlineSports],
  ["Power Backup", FiZap], ["Attached Market", MdOutlineShoppingCart], ["24 x 7 Security", MdOutlineSecurity], ["Clubhouse", MdOutlineHomeWork],
  ["High Speed Elevators", MdOutlineElevator], ["Day Care Center", MdOutlineChildCare], ["Party Hall", MdOutlineCelebration], ["EV Charging", MdOutlineEvStation],
  ["Multi-level Parking", MdOutlineLocalParking], ["Multi-purpose Sports Court", MdOutlineSports], ["Theatre/Mini Cinema", MdOutlineTheaterComedy],
  ["Rooftop Deck/Observatory", MdOutlinePark], ["Shopping Complex", MdOutlineShoppingCart], ["Community Shuttle Service", MdOutlineDirectionsCar], ["Central Park", MdOutlinePark],
];
const HIGHLIGHTS = [
  ["Premium Location", MdOutlineLocationOn], ["Corner Unit", MdOutlineBusiness], ["Vastu Compliant", MdOutlineHomeWork], ["Low Density Project", FiGrid],
  ["Quiet/Low Traffic Area", FiNavigation], ["Wheelchair Accessible", FiActivity], ["Never Occupied", FiStar], ["Road Facing", MdOutlineDirectionsCar],
  ["High Visibility", FiMaximize], ["Ready to Move", MdOutlineCheckCircle],
];
const FURNISHING_ITEMS = [
  ["Water Purifier", FiDroplet], ["Fan", FiWind], ["Fridge", FiGrid], ["Exhaust Fan", FiWind], ["Dining Table", MdOutlineChair], ["Geyser", FiZap],
  ["Stove", MdOutlineKitchen], ["Light", MdOutlineLightbulb], ["Curtains", MdOutlineWeekend], ["Modular Kitchen", MdOutlineKitchen], ["TV", MdOutlineTv], ["Chimney", FiWind],
  ["AC", MdOutlineAcUnit], ["Bed", MdOutlineBed], ["Wardrobe", MdOutlineWeekend], ["Sofa", MdOutlineWeekend], ["Washing Machine", MdOutlineLocalLaundryService], ["Microwave", MdOutlineMicrowave],
  ["Home Automation", FiHome], ["Smart Card Access", FiLock], ["Solar Heater", FiZap], ["Split AC", MdOutlineAcUnit], ["VRV AC", MdOutlineAcUnit],
];
const FURNISHING_STATUS = [
  ["Furnished", MdOutlineChair, "Ready-to-use workspace with furniture & fittings"],
  ["Semi-Furnished", MdOutlineWeekend, "Essential fittings with flexible setup"],
  ["Unfurnished", MdBusinessCenter, "Open space ready for your custom setup"],
];

const initial = {
  title: "", propertyType: "", city: "", state: "", country: "India", locality: "", society: "", address: "", pinCode: "", latitude: "", longitude: "",
  rentAmount: "", rentFrequency: "Per Month", negotiable: false, maintenanceAmount: "", maintenanceFrequency: "Monthly", includedInRent: false,
  depositType: "One Month", depositAmount: "", areaValue: "", areaType: "Built-up Area", areaUnit: "Sq. Ft.", companyLease: false,
  officeSpaceType: [], pantry: "None", personalWashroom: false, coveredParking: 0, openParking: 0, powerBackup: false, liftAvailable: false,
  furnishingStatus: "", furnishingItems: [], bathrooms: 0, waterSources: [], locationAdvantages: [], balconies: 0, facing: "", view: "", flooring: "",
  roadWidth: "", roadUnit: "Feet", totalFloors: "", propertyFloor: "", towerBlock: "", unitNo: "", keepUnitNoPrivate: false,
  amenities: [], highlights: [], oneLineDescription: "", description: "", aiGeneratedDescriptions: [], videoLink: "",
};

const input = "h-11 w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] px-3.5 text-sm text-[#1F4256] outline-none transition focus:border-[#3ED6AE] focus:bg-white focus:ring-4 focus:ring-[#3ED6AE]/15";

function getUser() {
  try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
}

function Card({ title, note, icon, children }) {
  return <section className="rounded-[24px] border border-[#E4EDEF] bg-white p-5 shadow-[0_8px_30px_rgba(31,66,86,.06)] sm:p-7">
    <header className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF8F4] text-[#16876B]">{icon}</div>
      <div><h2 className="text-lg font-black text-[#1F4256]">{title}</h2>{note && <p className="mt-1 text-xs text-slate-400">{note}</p>}</div>
    </header>{children}
  </section>;
}

function Field({ label, required, error, children }) {
  return <label className="block"><span className="mb-2 block text-xs font-extrabold text-[#526E7C]">{label}{required && <b className="ml-1 text-rose-500">*</b>}</span>{children}{error && <small className="mt-1 block font-semibold text-rose-500">{error}</small>}</label>;
}

function ThemeSelect({ value, onChange, options, placeholder = "Select" }) {
  return <div className="relative"><select value={value || ""} onChange={(e) => onChange(e.target.value)} className={`${input} appearance-none pr-10`}><option value="">{placeholder}</option>{options.map((x) => <option key={x}>{x}</option>)}</select><FiChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" /></div>;
}

function ChoiceCard({ value, selected, onClick, icon: Icon, description }) {
  return <button type="button" onClick={onClick} className={`group rounded-2xl border p-4 text-left transition ${selected ? "border-[#1F4256] bg-[#1F4256] text-white shadow-lg" : "border-[#DCE7EA] bg-white text-[#1F4256] hover:-translate-y-0.5 hover:border-[#3ED6AE]"}`}>
    <div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl ${selected ? "bg-white/15" : "bg-[#F0F7F7]"}`}><Icon size={21} /></span>{selected && <FiCheck className="mt-1" />}</div>
    <p className="mt-4 text-sm font-black">{value}</p>{description && <p className={`mt-1 text-[10px] leading-4 ${selected ? "text-white/70" : "text-slate-400"}`}>{description}</p>}
  </button>;
}

function IconGrid({ items, selected, toggle, columns = "sm:grid-cols-2 lg:grid-cols-3" }) {
  return <div className={`grid gap-3 ${columns}`}>{items.map(([label, Icon]) => { const active = selected.includes(label); return <button type="button" key={label} onClick={() => toggle(label)} className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition ${active ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#E4EDEF] bg-white text-[#526E7C] hover:border-[#BFDAD4]"}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-white text-[#16876B]" : "bg-[#F5F8F8] text-[#6C8793]"}`}><Icon size={19} /></span><span className="min-w-0 flex-1 text-xs font-bold">{label}</span>{active && <MdOutlineCheckCircle size={18} />}</button>; })}</div>;
}

export default function CommercialRentalPropertyForm({ onBack, onChangeListingType }) {
  const editId = new URLSearchParams(window.location.search).get("edit");
  const [draftId, setDraftId] = useState(editId || null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [floorPlan, setFloorPlan] = useState(null);
  const [reraCertificate, setReraCertificate] = useState(null);
  const [otherDocuments, setOtherDocuments] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(Boolean(editId));
  const [errors, setErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const locationRequestRef = useRef(0);
  const locationTimerRef = useRef(null);
  const skipCityGeocodeRef = useRef(false);

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const toggle = (key, value) => setForm((p) => ({ ...p, [key]: p[key].includes(value) ? p[key].filter((x) => x !== value) : [...p[key], value] }));

  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const response = await getCommercialRentalPropertyByIdApi(editId);
        const p = response?.data || response?.property || response;
        setForm({
          ...initial, title: p.title || "", propertyType: p.propertyType || "", city: p.location?.city || "", state: p.location?.state || "", country: p.location?.country || "India",
          locality: p.location?.locality || "", society: p.location?.society || "", address: p.location?.address || "", pinCode: p.location?.pinCode || "", latitude: p.location?.latitude ?? "", longitude: p.location?.longitude ?? "",
          rentAmount: p.rent?.amount ?? "", rentFrequency: p.rent?.frequency || "Per Month", negotiable: Boolean(p.rent?.negotiable), maintenanceAmount: p.maintenance?.amount ?? "", maintenanceFrequency: p.maintenance?.frequency || "Monthly", includedInRent: Boolean(p.maintenance?.includedInRent),
          depositType: p.securityDeposit?.type || "One Month", depositAmount: p.securityDeposit?.amount ?? "", areaValue: p.areaDetails?.[0]?.value ?? "", areaType: p.areaDetails?.[0]?.type || "Built-up Area", areaUnit: p.areaDetails?.[0]?.unit || "Sq. Ft.", companyLease: Boolean(p.companyLease),
          officeSpaceType: p.workspaceFacilities?.officeSpaceType || [], pantry: p.workspaceFacilities?.pantry || "None", personalWashroom: Boolean(p.workspaceFacilities?.personalWashroom), coveredParking: p.workspaceFacilities?.coveredParking ?? 0, openParking: p.workspaceFacilities?.openParking ?? 0, powerBackup: Boolean(p.workspaceFacilities?.powerBackup), liftAvailable: Boolean(p.workspaceFacilities?.liftAvailable),
          furnishingStatus: p.furnishing?.status || "", furnishingItems: (p.furnishing?.items || []).map((x) => x.name), bathrooms: p.specifications?.bathrooms ?? 0, waterSources: p.specifications?.waterSources || [], locationAdvantages: p.specifications?.locationAdvantages || [], balconies: p.specifications?.balconies ?? 0,
          facing: p.specifications?.facing || "", view: p.specifications?.view || "", flooring: p.specifications?.flooring || "", roadWidth: p.specifications?.connectingRoadWidth?.value ?? "", roadUnit: p.specifications?.connectingRoadWidth?.unit || "Feet", totalFloors: p.specifications?.totalFloorCount ?? "", propertyFloor: p.specifications?.propertyFloor ?? "", towerBlock: p.specifications?.towerBlock || "", unitNo: p.specifications?.unitNo || "", keepUnitNoPrivate: Boolean(p.specifications?.keepUnitNoPrivate),
          amenities: p.amenities || [], highlights: p.propertyHighlights || [], oneLineDescription: p.oneLineDescription || "", description: p.description || "", aiGeneratedDescriptions: p.aiGeneratedDescriptions || [], videoLink: p.media?.videos?.[0]?.url || "",
        });
        setExistingImages(p.media?.images || []);
        setVideo(null);
        setFloorPlan(null);
        setReraCertificate(null);
        setOtherDocuments([]);
      } catch (e) {
        Swal.fire({ icon: "error", title: "Unable to load property", text: e?.response?.data?.message || e.message, confirmButtonColor: C.navy });
      } finally { setLoading(false); }
    })();
  }, [editId]);

  const imageUrls = useMemo(() => [...existingImages.map((x) => x.url).filter(Boolean), ...images.map((x) => x.preview)], [existingImages, images]);

  const applyAddress = (address, displayName) =>
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
      pinCode:
        address.postcode?.replace(/\D/g, "").slice(0, 6) || p.pinCode,
      address: displayName || p.address,
    }));

  const reverseGeocode = async (lat, lng) => {
    // A map click is the most precise location. Do not let the city+PIN
    // effect immediately move the map back to the centre of the PIN area.
    skipCityGeocodeRef.current = true;
    try {
      setLocationLoading(true);
      const r = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lng}`,
        { headers: { Accept: "application/json" } }
      );
      if (!r.ok) throw new Error("Address lookup unavailable");
      const d = await r.json();
      applyAddress(d.address || {}, d.display_name || "");
      setLocationMessage("Location selected. Address details filled automatically.");
    } catch {
      setLocationMessage("Coordinates saved. Address lookup is unavailable right now.");
    } finally {
      setLocationLoading(false);
    }
  };

  const lookupPin = async (pin = form.pinCode, cityOverride = form.city) => {
    const cleanPin = String(pin || "").replace(/\D/g, "").slice(0, 6);
    if (!/^[1-9]\d{5}$/.test(cleanPin)) {
      setLocationMessage("");
      return;
    }

    const requestId = ++locationRequestRef.current;

    try {
      setLocationLoading(true);
      setLocationMessage("Finding PIN location...");

      // PIN -> India Post city/state/country/locality.
      const r = await fetch(
        `https://api.postalpincode.in/pincode/${cleanPin}`
      );
      if (!r.ok) throw new Error("PIN service unavailable");

      const d = await r.json();
      const office = d?.[0]?.PostOffice?.[0];
      if (!office) throw new Error("PIN not found");

      const city =
        office.District ||
        office.Block ||
        office.Name ||
        cityOverride ||
        "";
      const state = office.State || "";
      const country = office.Country || "India";
      const locality =
        office.Name ||
        office.Block ||
        office.District ||
        city;

      // First fill the postal fields.
      setForm((p) => ({
        ...p,
        pinCode: cleanPin,
        city: city || p.city,
        state: state || p.state,
        country,
        locality: p.locality || locality,
      }));

      // PINs represent an area, so the map is centered on the PIN/city area.
      // Search the postal area first. This is more reliable than searching
      // only a free-form "city + PIN" string and still gives us a map point
      // even though a PIN represents an area rather than one exact building.
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&postalcode=${encodeURIComponent(cleanPin)}${city ? `&city=${encodeURIComponent(city)}` : ""}&q=${encodeURIComponent(`${city || ""}, ${cleanPin}, India`)}`;
      const geo = await fetch(geoUrl, {
        headers: { Accept: "application/json" },
      });
      const geoData = geo.ok ? await geo.json() : [];
      const hit = geoData?.[0];

      if (requestId !== locationRequestRef.current) return;

      if (hit?.lat && hit?.lon) {
        setForm((p) => ({
          ...p,
          pinCode: cleanPin,
          city: city || p.city,
          state: state || p.state,
          country,
          locality: p.locality || locality,
          latitude: Number(hit.lat).toFixed(6),
          longitude: Number(hit.lon).toFixed(6),
          address: p.address || hit.display_name || `${city}, ${state}, ${country}`,
        }));
        setLocationMessage(`PIN verified: ${city}, ${state}. Map centered on ${city}.`);
      } else {
        setLocationMessage(`PIN verified: ${city}, ${state}. Map coordinates were not found.`);
      }
    } catch (e) {
      if (requestId === locationRequestRef.current) {
        setLocationMessage(e?.message || "PIN lookup failed");
      }
    } finally {
      if (requestId === locationRequestRef.current) {
        setLocationLoading(false);
      }
    }
  };

  // Automatically lookup a valid 6-digit PIN. No need to press "Find city".
  useEffect(() => {
    const pin = String(form.pinCode || "").replace(/\D/g, "").slice(0, 6);
    if (!/^[1-9]\d{5}$/.test(pin)) {
      if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
      return;
    }

    if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
    locationTimerRef.current = setTimeout(() => {
      lookupPin(pin, form.city);
    }, 450);

    return () => {
      if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
    };
  }, [form.pinCode]);

  // If the user changes City after entering a valid PIN, move the map to City + PIN.
  useEffect(() => {
    const pin = String(form.pinCode || "").replace(/\D/g, "").slice(0, 6);
    const city = String(form.city || "").trim();
    if (!city || !/^[1-9]\d{5}$/.test(pin)) return;

    // When the user clicked the map, reverseGeocode already supplied the
    // exact point. Keep that point instead of snapping back to city centre.
    if (skipCityGeocodeRef.current) {
      skipCityGeocodeRef.current = false;
      return;
    }

    if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
    locationTimerRef.current = setTimeout(async () => {
      try {
        setLocationLoading(true);
        const q = encodeURIComponent(`${city}, ${pin}, India`);
        const r = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&country=India&q=${q}`,
          { headers: { Accept: "application/json" } }
        );
        const data = r.ok ? await r.json() : [];
        const hit = data?.[0];
        if (hit?.lat && hit?.lon) {
          setForm((p) => ({
            ...p,
            latitude: Number(hit.lat).toFixed(6),
            longitude: Number(hit.lon).toFixed(6),
          }));
          setLocationMessage(`Map moved to ${city}, PIN ${pin}.`);
        }
      } catch {
        // Keep the postal lookup result if city geocoding is unavailable.
      } finally {
        setLocationLoading(false);
      }
    }, 650);

    return () => {
      if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
    };
  }, [form.city]);

  const validateStep = () => {
    const e = {};

    // Validate only the fields belonging to the current step.
    if (step === 0) {
      if (!form.title.trim()) e.title = "Property title is required";
      if (!form.propertyType) e.propertyType = "Select property type";
      if (!form.city.trim()) e.city = "City is required";
      if (!form.locality.trim()) e.locality = "Locality is required";
      if (!(Number(form.rentAmount) > 0)) e.rentAmount = "Enter valid rent";
    }

    if (step === 1) {
      if (!(Number(form.areaValue) > 0)) e.areaValue = "Enter valid area";
      if (!form.furnishingStatus) e.furnishingStatus = "Select furnishing status";
    }

    if (step === 3) {
      if (!form.oneLineDescription.trim()) {
        e.oneLineDescription = "One-line description is required";
      }
      if (!form.description.trim() || form.description.trim().length < 25) {
        e.description = "Property story must contain at least 25 characters";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (!validateStep()) return;

    const saved = await submitProperty("Draft");

    // Never move forward when the draft API fails.
    if (!saved) return;

    setStep((x) => Math.min(3, x + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => setStep((x) => Math.max(0, x - 1));

  const addImages = (event) => {
    const selected = Array.from(event.target.files || []).slice(0, 25 - images.length).map((file, index) => ({ file, preview: URL.createObjectURL(file), category: images.length + index === 0 && !existingImages.some((x) => x.isCover) ? "Exterior View" : "Other", isCover: images.length + index === 0 && !existingImages.some((x) => x.isCover) }));
    setImages((p) => [...p, ...selected]); event.target.value = "";
  };
  const removeImage = (index) => setImages((p) => p.filter((_, i) => i !== index));
  const removeExisting = (index) => setExistingImages((p) => p.filter((_, i) => i !== index));
  const setCover = (index, existing = false) => {
    if (existing) setExistingImages((p) => p.map((x, i) => ({ ...x, isCover: i === index })));
    else setImages((p) => p.map((x, i) => ({ ...x, isCover: i === index })));
  };

  const addSingleFile = (event, setter) => {
    const file = event.target.files?.[0] || null;
    setter(file);
    event.target.value = "";
  };

  const addOtherDocuments = (event) => {
    const selected = Array.from(event.target.files || []);
    const remaining = Math.max(0, 3 - otherDocuments.length);
    const files = selected.slice(0, remaining);
    setOtherDocuments((prev) => [...prev, ...files].slice(0, 3));
    event.target.value = "";
  };

  const removeOtherDocument = (index) => {
    setOtherDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const showFinalPreview = () => setPreviewOpen(true);

  const submitProperty = async (status = "Submitted") => {
    // Submitted requires the current/final validation.
    // Drafts are validated by next() for the current step, so they can
    // safely persist partial progress without sending invalid placeholder
    // values such as areaDetails.value = 0.
    if (status === "Submitted" && !validateStep()) return false;

    const user = getUser();

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        listingType: "Rent",
        transactionType: "Rent",
        category: "Commercial",
        buildingType: "Commercial",
        propertyType: form.propertyType,
        location: {
          city: form.city.trim(),
          state: form.state,
          country: form.country || "India",
          locality: form.locality.trim(),
          society: form.society.trim(),
          address: form.address.trim(),
          pinCode: form.pinCode || null,
          latitude: form.latitude === "" ? null : Number(form.latitude),
          longitude: form.longitude === "" ? null : Number(form.longitude),
          isLocationConfirmed: Boolean(form.latitude && form.longitude),
        },
        rent: {
          amount: Number(form.rentAmount),
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
        // Only include areaDetails after a valid area is entered.
        ...(Number(form.areaValue) > 0
          ? {
              areaDetails: [{
                value: Number(form.areaValue),
                type: form.areaType,
                unit: form.areaUnit,
                display: true,
              }],
            }
          : {}),

        companyLease: form.companyLease,
        workspaceFacilities: {
          officeSpaceType: form.officeSpaceType,
          pantry: form.pantry,
          personalWashroom: form.personalWashroom,
          coveredParking: Number(form.coveredParking || 0),
          openParking: Number(form.openParking || 0),
          powerBackup: form.powerBackup,
          liftAvailable: form.liftAvailable,
        },

        ...(form.furnishingStatus
          ? {
              furnishing: {
                status: form.furnishingStatus,
                items: form.furnishingItems.map((name) => ({ name, quantity: 1 })),
              },
            }
          : {}),
        specifications: {
          bathrooms: Number(form.bathrooms || 0),
          coveredParking: Number(form.coveredParking),
          openParking: Number(form.openParking),
          powerBackup: form.powerBackup,
          waterSources: form.waterSources,
          liftAvailable: form.liftAvailable,
          locationAdvantages: form.locationAdvantages,
          balconies: Number(form.balconies || 0),
          facing: form.facing || null,
          view: form.view || null,
          flooring: form.flooring || null,
          connectingRoadWidth: {
            value: form.roadWidth === "" ? null : Number(form.roadWidth),
            unit: form.roadUnit,
          },
          totalFloorCount: form.totalFloors === "" ? null : Number(form.totalFloors),
          propertyFloor: form.propertyFloor === "" ? null : Number(form.propertyFloor),
          towerBlock: form.towerBlock,
          unitNo: form.unitNo,
          keepUnitNoPrivate: form.keepUnitNoPrivate,
        },
        amenities: form.amenities,
        propertyHighlights: form.highlights,
        oneLineDescription: form.oneLineDescription.trim(),
        description: form.description.trim(),
        aiGeneratedDescriptions: form.aiGeneratedDescriptions,
        media: {
          images: existingImages,
          videos: form.videoLink
            ? [{ url: form.videoLink, title: "Property tour" }]
            : [],
          floorPlans: [],
          reraCertificates: [],
          documents: [],
        },
        status,
        sourceModel: "CommercialRentalProperty",
        createdBy: {
          id: user?.id || user?._id || null,
          role: user?.role || "admin",
        },
        imageMeta: images.map((x) => ({
          category: x.category,
          isCover: x.isCover,
        })),
        existingImages,
      };

      const body = new FormData();
      body.append("data", JSON.stringify(payload));
      body.append("existingImages", JSON.stringify(existingImages));
      body.append(
        "imageMeta",
        JSON.stringify(images.map((x) => ({
          category: x.category,
          isCover: x.isCover,
        })))
      );

      images.forEach((x) => { if (x.file) body.append("images", x.file); });
      if (video) body.append("video", video);
      if (floorPlan) body.append("floorPlan", floorPlan);
      if (reraCertificate) body.append("reraCertificate", reraCertificate);
      otherDocuments.forEach((file) => body.append("documents", file));

      const targetId = draftId || editId;
      const result = targetId
        ? await updateCommercialRentalPropertyApi(targetId, body)
        : await createCommercialRentalPropertyApi(body);

      if (status === "Draft") {
        const savedId = result?.data?._id || result?.data?.id;
        if (!draftId && savedId) setDraftId(savedId);
        await Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Draft saved",
          text: "Property saved successfully.",
          showConfirmButton: false,
          timer: 1800,
        });
        return true;
      }

      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: editId ? "Property updated" : "Property published",
        text: result?.data?.propertyId
          ? `Property ID: ${result.data.propertyId}`
          : "Property submitted successfully.",
        showConfirmButton: false,
        timer: 2200,
      });

      setPreviewOpen(false);

      // Keep existing behaviour after a successful new submission.
      if (!editId) {
        setForm(initial);
        setImages([]);
        setExistingImages([]);
        setVideo(null);
        setFloorPlan(null);
        setReraCertificate(null);
        setOtherDocuments([]);
        setStep(0);
        setDraftId(null);
      } else {
        window.history.back();
      }

      return true;
    } catch (e) {
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Unable to save property",
        text: e?.response?.data?.message || e.message || "Something went wrong.",
        showConfirmButton: false,
        timer: 2600,
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveDraft = () => submitProperty("Draft");

  const submit = () => submitProperty("Submitted");


  if (loading) return <div className="flex min-h-[70vh] items-center justify-center bg-[#F4F8F8]"><div className="rounded-2xl bg-white px-8 py-6 font-bold text-[#526E7C] shadow">Loading commercial property...</div></div>;

  const steps = [
    ["Property Snapshot", "Type, location & rent", FiHome],
    ["Workspace Facilities", "Area, furnishing & parking", FiBriefcase],
    ["Media & Highlights", "Photos, amenities & advantages", FiImage],
    ["Property Story", "Description & submit", FiFileText],
  ];

  const previewImage = existingImages[0]?.url || images[0]?.preview || "";

  return <>
    {previewOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
        <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#16876B]">Final Property Preview</p>
              <h2 className="mt-1 text-xl font-black text-[#1F4256]">{form.title || "Untitled Property"}</h2>
            </div>
            <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-xl border px-3 py-2 text-xs font-black text-[#526E7C]">Close</button>
          </div>
          <div className="p-5 sm:p-7">
            {previewImage && <img src={previewImage} alt="" className="h-64 w-full rounded-2xl object-cover" />}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Property</p><b className="text-sm text-[#1F4256]">{form.propertyType || "—"}</b></div>
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Location</p><b className="text-sm text-[#1F4256]">{[form.city, form.state].filter(Boolean).join(", ") || "—"}</b></div>
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">PIN</p><b className="text-sm text-[#1F4256]">{form.pinCode || "—"}</b></div>
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Rent</p><b className="text-sm text-[#1F4256]">{form.rentAmount ? `₹${Number(form.rentAmount).toLocaleString("en-IN")} / ${form.rentFrequency === "Per Year" ? "year" : "month"}` : "—"}</b></div>
            </div>
            <div className="mt-4 rounded-2xl border border-[#DCE7EA] p-4">
              <p className="text-xs font-black text-[#1F4256]">Location</p>
              <p className="mt-1 text-xs text-[#526E7C]">{form.address || [form.locality, form.city, form.state, form.pinCode].filter(Boolean).join(", ") || "—"}</p>
              {form.latitude && form.longitude && <p className="mt-1 text-[10px] text-slate-400">Map: {form.latitude}, {form.longitude}</p>}
            </div>
            <div className="mt-4 rounded-2xl border border-[#DCE7EA] p-4">
              <p className="text-xs font-black text-[#1F4256]">Media & Documents</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-4">
                <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{existingImages.length + images.length} images</span>
                <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{video ? "1 video" : "0 video"}</span>
                <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{floorPlan ? "1 floor plan" : "0 floor plan"}</span>
                <span className="rounded-xl bg-[#F7FAFA] p-3 text-xs font-bold text-[#526E7C]">{reraCertificate ? "1 RERA + " : ""}{otherDocuments.length} other docs</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-black text-[#1F4256]">Description</p>
              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#526E7C]">{form.description || "No description added."}</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-xl border border-[#1F4256] px-5 py-3 text-xs font-black text-[#1F4256]">Edit Property</button>
              <button type="button" disabled={saving} onClick={submit} className="rounded-xl bg-[#3ED6AE] px-5 py-3 text-xs font-black text-[#1F4256] disabled:opacity-50">
                {saving ? "Publishing..." : editId ? "Update Property" : "Publish Property"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

   <div className="min-h-screen bg-[#F4F8F8] pb-10">
    <div className="bg-[#1F4256] px-4 py-7 text-white sm:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><div><button onClick={onBack || onChangeListingType} className="mb-3 flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white"><FiArrowLeft /> Change building type</button><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#3ED6AE]">Rent · Commercial</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">{editId ? "Edit Commercial Rental" : "Commercial Rental Property"}</h1><p className="mt-1 text-sm text-white/60">A guided commercial leasing form with map, workspace facilities and rich property highlights.</p></div><div className="hidden rounded-2xl bg-white/10 px-5 py-3 text-center sm:block"><p className="text-[10px] uppercase tracking-widest text-white/50">Progress</p><p className="mt-1 text-xl font-black">{Math.round(((step + 1) / 4) * 100)}%</p></div></div></div>
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-5"><p className="mb-6 text-[10px] font-black uppercase tracking-[.2em] text-[#16876B]">List your property</p>{steps.map(([name, hint, Icon], i) => <div key={name} className="relative flex gap-3 pb-8 last:pb-0"><span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${i <= step ? "bg-[#1F4256] text-white" : "bg-slate-100 text-slate-400"}`}>{i < step ? <FiCheck /> : <Icon />}</span>{i < 3 && <span className={`absolute left-5 top-10 h-8 w-px ${i < step ? "bg-[#3ED6AE]" : "bg-slate-200"}`} />}<span><b className={`block text-xs ${i === step ? "text-[#1F4256]" : "text-slate-400"}`}>{name}</b><small className="text-[10px] text-slate-400">{hint}</small></span></div>)}</aside>
      <main className="space-y-5">
        {step === 0 && <>
          <Card title="Property Snapshot" note="Commercial rental identity and property category." icon={<MdBusinessCenter size={20} />}>
            <div className="space-y-5"><Field label="Property Title" required error={errors.title}><input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Premium furnished office in Mahalaxmi Nagar" /></Field>
              <Field label="Property Type" required error={errors.propertyType}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{PROPERTY_TYPES.map((x) => <button key={x} type="button" onClick={() => set("propertyType", x)} className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${form.propertyType === x ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C] hover:border-[#3ED6AE]"}`}>{x}</button>)}</div></Field>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="City" required error={errors.city}><input className={input} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Indore" /></Field><Field label="Locality / Society" required error={errors.locality}><input className={input} value={form.locality} onChange={(e) => set("locality", e.target.value)} placeholder="Mahalaxmi Nagar, Indore East" /></Field><Field label="Society / Project"><input className={input} value={form.society} onChange={(e) => set("society", e.target.value)} placeholder="Search for project" /></Field><Field label="PIN Code"><div className="flex gap-2"><input maxLength={6} className={input} value={form.pinCode} onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, ""))} /><button type="button" onClick={lookupPin} className="shrink-0 rounded-xl bg-[#1F4256] px-4 text-xs font-black text-white">Find city</button></div></Field><Field label="State"><input className={input} value={form.state} onChange={(e) => set("state", e.target.value)} /></Field><Field label="Country"><input className={input} value={form.country} onChange={(e) => set("country", e.target.value)} /></Field><div className="sm:col-span-2"><Field label="Complete Address"><input className={input} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Building, floor, street, landmark" /></Field></div></div>
            </div></Card>
          <Card title="Location & Project" note="Click the map to place the exact property pin. Dragging/clicking the pin updates coordinates." icon={<FiMapPin size={20} />}>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="Latitude"><input className={input} value={form.latitude} onChange={(e) => set("latitude", e.target.value)} /></Field><Field label="Longitude"><input className={input} value={form.longitude} onChange={(e) => set("longitude", e.target.value)} /></Field></div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-[#DCE7EA]"><div className="flex items-center justify-between bg-[#F7FAFA] px-4 py-3"><span className="text-xs font-black text-[#526E7C]">Select exact location</span>{locationLoading && <span className="text-[10px] font-bold text-[#16876B]">Finding address...</span>}</div><MapPicker key={`${form.latitude || "default"}-${form.longitude || "default"}`} formData={form} setFormData={setForm} onLocationChange={reverseGeocode} /></div>{locationMessage && <p className="mt-3 rounded-xl bg-[#EAF8F4] px-4 py-3 text-xs font-bold text-[#1F4256]">{locationMessage}</p>}
          </Card>
          <Card title="Rent, Maintenance & Deposit" note="Commercial leasing amount and terms." icon={<FiLayers size={20} />}>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="Property Rent" required error={errors.rentAmount}><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.rentAmount} onChange={(e) => set("rentAmount", e.target.value)} placeholder="30000" /><ThemeSelect value={form.rentFrequency} onChange={(v) => set("rentFrequency", v)} options={["Per Month", "Per Year"]} /></div></Field><Field label="Maintenance"><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.maintenanceAmount} onChange={(e) => set("maintenanceAmount", e.target.value)} placeholder="5000" /><ThemeSelect value={form.maintenanceFrequency} onChange={(v) => set("maintenanceFrequency", v)} options={["Per SqFt", "Monthly", "Quarterly", "Yearly", "One Time"]} /></div></Field><Field label="Included in Rent"><button type="button" onClick={() => set("includedInRent", !form.includedInRent)} className={`h-11 rounded-xl border px-4 text-xs font-black ${form.includedInRent ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.includedInRent ? "✓ Included in rent" : "Not included"}</button></Field><Field label="Security Deposit"><ThemeSelect value={form.depositType} onChange={(v) => set("depositType", v)} options={DEPOSIT} /></Field>{form.depositType === "Other" && <Field label="Deposit Amount"><input type="number" className={input} value={form.depositAmount} onChange={(e) => set("depositAmount", e.target.value)} /></Field>}<Field label="Rent Negotiable"><button type="button" onClick={() => set("negotiable", !form.negotiable)} className={`h-11 rounded-xl border px-4 text-xs font-black ${form.negotiable ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.negotiable ? "✓ Negotiable" : "Not Negotiable"}</button></Field></div>
          </Card>
        </>}

        {step === 1 && <>
          <Card title="Area Details" note="Add the area and measurement used for this commercial listing." icon={<FiMaximize size={20} />}><div className="grid gap-4 sm:grid-cols-3"><Field label="Area" required error={errors.areaValue}><input type="number" className={input} value={form.areaValue} onChange={(e) => set("areaValue", e.target.value)} placeholder="2000" /></Field><Field label="Area Type"><ThemeSelect value={form.areaType} onChange={(v) => set("areaType", v)} options={AREA_TYPES} /></Field><Field label="Unit"><ThemeSelect value={form.areaUnit} onChange={(v) => set("areaUnit", v)} options={UNITS} /></Field></div></Card>
          <Card title="Workspace Facilities" note="Facilities shown in your commercial listing." icon={<MdOutlineBusiness size={20} />}><div className="space-y-6"><Field label="Office Space Type"><div className="grid gap-3 sm:grid-cols-3">{OFFICE_TYPES.map((x) => <button key={x} type="button" onClick={() => toggle("officeSpaceType", x)} className={`rounded-xl border px-4 py-3 text-xs font-bold ${form.officeSpaceType.includes(x) ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.officeSpaceType.includes(x) && "✓ "}{x}</button>)}</div></Field><Field label="Pantry"><div className="flex flex-wrap gap-2">{PANTRY.map((x) => <button key={x} type="button" onClick={() => set("pantry", x)} className={`rounded-xl border px-4 py-2.5 text-xs font-bold ${form.pantry === x ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>{x}</button>)}</div></Field><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Personal Washroom"><button type="button" onClick={() => set("personalWashroom", !form.personalWashroom)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.personalWashroom ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.personalWashroom ? "✓ Yes" : "No"}</button></Field><Field label="Covered Parking"><input type="number" min="0" className={input} value={form.coveredParking} onChange={(e) => set("coveredParking", e.target.value)} /></Field><Field label="Open Parking"><input type="number" min="0" className={input} value={form.openParking} onChange={(e) => set("openParking", e.target.value)} /></Field><Field label="Bathrooms"><input type="number" min="0" className={input} value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} /></Field><Field label="Power Backup"><button type="button" onClick={() => set("powerBackup", !form.powerBackup)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.powerBackup ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.powerBackup ? "✓ Available" : "No Back-up"}</button></Field><Field label="Lift Availability"><button type="button" onClick={() => set("liftAvailable", !form.liftAvailable)} className={`h-11 w-full rounded-xl border text-xs font-black ${form.liftAvailable ? "border-[#3ED6AE] bg-[#EAF8F4] text-[#16876B]" : "border-[#DCE7EA] text-[#526E7C]"}`}>{form.liftAvailable ? "✓ Yes" : "No"}</button></Field></div></div></Card>
          <Card title="Furnishing Status" note="Use icon cards for a clear commercial workspace presentation." icon={<MdOutlineChair size={20} />}><div className="grid gap-3 md:grid-cols-3">{FURNISHING_STATUS.map(([label, Icon, desc]) => <ChoiceCard key={label} value={label} selected={form.furnishingStatus === label} onClick={() => set("furnishingStatus", label)} icon={Icon} description={desc} />)}</div>{errors.furnishingStatus && <p className="mt-2 text-xs font-bold text-rose-500">{errors.furnishingStatus}</p>}{form.furnishingStatus && form.furnishingStatus !== "Unfurnished" && <div className="mt-6"><p className="mb-3 text-xs font-black text-[#526E7C]">Furnishing Details</p><IconGrid items={FURNISHING_ITEMS} selected={form.furnishingItems} toggle={(x) => toggle("furnishingItems", x)} columns="sm:grid-cols-2 lg:grid-cols-4" /></div>}</Card>
          <Card title="Commercial Specifications" note="Floor, road, facing and unit information." icon={<FiGrid size={20} />}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Field label="Facing"><ThemeSelect value={form.facing} onChange={(v) => set("facing", v)} options={FACINGS} /></Field><Field label="View"><ThemeSelect value={form.view} onChange={(v) => set("view", v)} options={VIEWS} /></Field><Field label="Flooring"><ThemeSelect value={form.flooring} onChange={(v) => set("flooring", v)} options={FLOORING} /></Field><Field label="Connecting Road Width"><div className="flex"><input type="number" className={`${input} rounded-r-none`} value={form.roadWidth} onChange={(e) => set("roadWidth", e.target.value)} /><ThemeSelect value={form.roadUnit} onChange={(v) => set("roadUnit", v)} options={["Feet", "Meter"]} /></div></Field><Field label="Floor Number"><input type="number" className={input} value={form.propertyFloor} onChange={(e) => set("propertyFloor", e.target.value)} /></Field><Field label="Total Floors"><input type="number" className={input} value={form.totalFloors} onChange={(e) => set("totalFloors", e.target.value)} /></Field><Field label="Tower / Block"><input className={input} value={form.towerBlock} onChange={(e) => set("towerBlock", e.target.value)} /></Field><Field label="Unit No."><input className={input} value={form.unitNo} onChange={(e) => set("unitNo", e.target.value)} /></Field></div><label className="mt-5 flex items-center gap-2 text-xs font-bold text-[#526E7C]"><input type="checkbox" checked={form.keepUnitNoPrivate} onChange={(e) => set("keepUnitNoPrivate", e.target.checked)} /> Keep unit number private</label></Card>
        </>}

        {step === 2 && <>
          <Card title="Media & Highlights" note="At least one image is required for a submitted listing." icon={<FiImage size={20} />}><label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C8D8DC] bg-[#FAFCFC] px-5 py-9 text-center hover:border-[#3ED6AE] hover:bg-[#F1FBF8]"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1F4256] text-white"><FiUploadCloud size={22} /></span><b className="mt-3 text-sm text-[#1F4256]">Upload Property Images</b><span className="mt-1 text-[10px] text-slate-400">JPG, PNG, WEBP · up to 25 images</span><input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={addImages} /></label>
            {(existingImages.length || images.length) > 0 && <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">{existingImages.map((x, i) => <div key={`e-${i}`} className="group relative aspect-square overflow-hidden rounded-2xl border"><img src={x.url} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => removeExisting(i)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white"><FiTrash2 size={13} /></button><button type="button" onClick={() => setCover(i, true)} className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-[9px] font-black ${x.isCover ? "bg-[#3ED6AE] text-[#1F4256]" : "bg-black/60 text-white"}`}>{x.isCover ? "Cover" : "Make cover"}</button></div>)}{images.map((x, i) => <div key={`n-${i}`} className="group relative aspect-square overflow-hidden rounded-2xl border"><img src={x.preview} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => removeImage(i)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white"><FiTrash2 size={13} /></button><button type="button" onClick={() => setCover(i, false)} className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-[9px] font-black ${x.isCover ? "bg-[#3ED6AE] text-[#1F4256]" : "bg-black/60 text-white"}`}>{x.isCover ? "Cover" : "Make cover"}</button></div>)}</div>}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Property Video">
                <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => addSingleFile(e, setVideo)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
                {video && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {video.name}</p>}
              </Field>
              <Field label="Floor Plan">
                <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={(e) => addSingleFile(e, setFloorPlan)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
                {floorPlan && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {floorPlan.name}</p>}
              </Field>
              <Field label="RERA Certificate">
                <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={(e) => addSingleFile(e, setReraCertificate)} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs" />
                {reraCertificate && <p className="mt-1 text-[10px] font-bold text-[#16876B]">✓ {reraCertificate.name}</p>}
              </Field>
              <Field label="Other Documents" error={otherDocuments.length >= 3 ? undefined : undefined}>
                <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" onChange={addOtherDocuments} disabled={otherDocuments.length >= 3} className="block w-full rounded-xl border border-[#DCE7EA] bg-[#F9FBFC] p-2 text-xs disabled:opacity-50" />
                <p className="mt-1 text-[10px] text-slate-400">Maximum 3 additional documents.</p>
                {otherDocuments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {otherDocuments.map((file, i) => (
                      <div key={`${file.name}-${i}`} className="flex items-center justify-between rounded-lg bg-[#F4F8F8] px-2.5 py-2 text-[10px]">
                        <span className="truncate font-bold text-[#526E7C]">{file.name}</span>
                        <button type="button" onClick={() => removeOtherDocument(i)} className="ml-2 text-rose-500">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          </Card>
          <Card title="Location Advantages" note="Select the advantages relevant to this commercial property." icon={<FiNavigation size={20} />}><IconGrid items={ADVANTAGES.map((x) => [x, MdOutlineLocationOn])} selected={form.locationAdvantages} toggle={(x) => toggle("locationAdvantages", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
          <Card title="Amenities" note="Icon-based amenities make the listing easier to scan." icon={<MdOutlineHomeWork size={20} />}><IconGrid items={AMENITIES} selected={form.amenities} toggle={(x) => toggle("amenities", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
          <Card title="Property Highlights" note="Show your strongest selling points." icon={<FiStar size={20} />}><IconGrid items={HIGHLIGHTS} selected={form.highlights} toggle={(x) => toggle("highlights", x)} columns="sm:grid-cols-2 lg:grid-cols-3" /></Card>
        </>}

        {step === 3 && <>
          <Card title="Amenities & Property Story" note="Write a short hook and detailed commercial property story." icon={<FiFileText size={20} />}><div className="space-y-5"><Field label="One-line Description" required><input maxLength={200} className={input} value={form.oneLineDescription} onChange={(e) => set("oneLineDescription", e.target.value)} placeholder="Premium furnished office with excellent road connectivity" /></Field><Field label="Property Description" required error={errors.description}><textarea rows={9} className={`${input} h-auto py-3`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the workspace, location, access, layout, business suitability, facilities and nearby connectivity..." /></Field></div></Card>
          <Card title="Company Lease" note="Whether the property is available specifically for company/corporate lease." icon={<FiBriefcase size={20} />}><div className="flex flex-wrap gap-3"><button type="button" onClick={() => set("companyLease", true)} className={`rounded-xl border px-5 py-3 text-xs font-black ${form.companyLease ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>✓ Yes</button><button type="button" onClick={() => set("companyLease", false)} className={`rounded-xl border px-5 py-3 text-xs font-black ${!form.companyLease ? "border-[#1F4256] bg-[#1F4256] text-white" : "border-[#DCE7EA] text-[#526E7C]"}`}>No</button></div></Card>
          <Card title="Ready to Submit" note="Review the selected property information before publishing." icon={<MdOutlineCheckCircle size={20} />}>
            <div className="grid gap-3 sm:grid-cols-5">
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Type</p><b className="mt-1 block text-sm text-[#1F4256]">{form.propertyType || "—"}</b></div>
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Rent</p><b className="mt-1 block text-sm text-[#1F4256]">{form.rentAmount ? `₹${Number(form.rentAmount).toLocaleString("en-IN")}` : "—"}</b></div>
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Area</p><b className="mt-1 block text-sm text-[#1F4256]">{form.areaValue ? `${form.areaValue} ${form.areaUnit}` : "—"}</b></div>
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Images</p><b className="mt-1 block text-sm text-[#1F4256]">{existingImages.length + images.length}</b></div>
              <div className="rounded-2xl bg-[#F7FAFA] p-4"><p className="text-[10px] text-slate-400">Documents</p><b className="mt-1 block text-sm text-[#1F4256]">{otherDocuments.length}/3</b></div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={showFinalPreview} className="flex h-10 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-xs font-black text-[#1F4256] hover:bg-slate-50">
                <FiImage /> Final Preview
              </button>
              <button type="button" onClick={saveDraft} disabled={saving} className="flex h-10 items-center gap-2 rounded-xl border border-[#3ED6AE] px-4 text-xs font-black text-[#1F4256] disabled:opacity-50">
                Save Draft
              </button>
            </div>
          </Card>
        </>}

        <div className="sticky bottom-3 z-20 flex flex-wrap justify-between gap-3 rounded-2xl border border-[#DCE7EA] bg-white/95 p-3 shadow-[0_12px_40px_rgba(31,66,86,.15)] backdrop-blur">
          <button type="button" onClick={back} disabled={step === 0} className="flex h-11 items-center gap-2 rounded-xl border border-[#DCE7EA] px-5 text-xs font-black text-[#526E7C] disabled:opacity-30"><FiArrowLeft /> Previous</button>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={showFinalPreview} className="flex h-11 items-center gap-2 rounded-xl border border-[#1F4256] px-4 text-xs font-black text-[#1F4256] hover:bg-[#EAF8F4]">
              <FiImage /> Preview Property
            </button>
            <button type="button" disabled={saving} onClick={saveDraft} className="flex h-11 items-center gap-2 rounded-xl border border-[#3ED6AE] px-5 text-xs font-black text-[#1F4256] disabled:opacity-50">
              Save Draft
            </button>
            {step < 3 ? (
              <button type="button" onClick={next} className="flex h-11 items-center gap-2 rounded-xl bg-[#1F4256] px-7 text-xs font-black text-white">
                Save & Continue <FiArrowRight />
              </button>
            ) : (
              <button type="button" disabled={saving} onClick={submit} className="flex h-11 items-center gap-2 rounded-xl bg-[#3ED6AE] px-7 text-xs font-black text-[#1F4256] disabled:opacity-50">
                {saving ? "Saving..." : editId ? "Update Property" : "Publish Property"} <FiCheck />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  </div>
  </>;
}
