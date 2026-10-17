// import { useEffect, useMemo, useState } from "react";
// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import {
//   getAllPropertiesApi,
//   getPropertyByIdApi,
//   deletePropertyApi,
//   updatePropertyApi,
//   updatePropertyStatusApi,
// } from "../../../Services/propertyService";
// import {
//   FiFilter,
//   FiUpload,
//   FiEye,
//   FiEdit2,
//   FiChevronDown,
//   FiChevronUp,
//   FiInfo,
//   FiTrash2,
//   FiX,
//   FiMapPin,
//   FiChevronLeft,
//   FiChevronRight,
//   FiSearch,
//   FiHome,
//   FiUser,
//   FiCheckCircle,
//   FiClock,
//   FiGrid,
//   FiImage,
//   FiFileText,
//   FiVideo,
//   FiDollarSign,
//   FiMaximize2,
//   FiNavigation,
//   FiPlus,
// } from "react-icons/fi";

// import {
//   MdOutlineCheckCircle,
//   MdOutlineAutoAwesome,
//   MdTrendingUp,
//   MdVerified,
//   MdOutlinePhotoLibrary,
// } from "react-icons/md";

// import { BsRobot } from "react-icons/bs";
// import Swal from "sweetalert2";

// const DARK = "#1F3C50";
// const ACCENT = "#35C99A";

// const SCROLLBAR_HIDDEN =
//   "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

// /* =========================================================
//    HELPERS
// ========================================================= */

// const formatCurrency = (value) =>
//   `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

// const formatStatus = (value) =>
//   String(value || "-").replaceAll("_", " ");

// function StatusBadge({ status }) {
//   const styles = {
//     Draft: "bg-[#F4F7F8] text-[#536779] border-[#DCE5E9]",
//     Submitted: "bg-[#EEF6FF] text-[#2E90FA] border-blue-200",
//     Assigned_To_Partner:
//       "bg-cyan-50 text-cyan-700 border-cyan-200",
//     Reviewing:
//       "bg-[#FFF5E8] text-[#D97706] border-amber-200",
//     Verified:
//       "bg-[#EAF9F4] text-[#15966F] border-[#35C99A]/30",
//     Live:
//       "bg-[#EAF9F4] text-[#15966F] border-green-200",
//     Rejected:
//       "bg-red-50 text-red-700 border-red-200",
//     Sold:
//       "bg-purple-50 text-purple-700 border-purple-200",
//     Rented:
//       "bg-indigo-50 text-indigo-700 border-indigo-200",
//   };

//   return (
//     <span
//       className={`inline-flex max-w-full items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-1.5 py-1 text-[10px] font-bold sm:px-2 sm:text-[10px] lg:px-2.5 lg:text-[10px] ${
//         styles[status] || "bg-[#F4F7F8] text-[#536779] border-[#DCE5E9]"
//       }`}
//     >
//       {formatStatus(status)}
//     </span>
//   );
// }

// function CreatorBadge({ role }) {
//   const styles = {
//     Admin: "bg-[#EEF6FF] text-[#2E90FA]",
//     Partner: "bg-[#EAF9F4] text-[#15966F]",
//     Seller: "bg-orange-50 text-orange-700",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
//         styles[role] || "bg-gray-100 text-[#536779]"
//       }`}
//     >
//       {role || "Unknown"}
//     </span>
//   );
// }


// /* =========================================================
//    CUSTOM HOVER TOOLTIP
// ========================================================= */

// function HoverTooltip({
//   children,
//   text,
//   position = "top",
//   className = "",
// }) {
//   if (!text) {
//     return children;
//   }

//   const positions = {
//     top:
//       "bottom-full left-1/2 -translate-x-1/2 mb-2",
//     bottom:
//       "top-full left-1/2 -translate-x-1/2 mt-2",
//     left:
//       "right-full top-1/2 -translate-y-1/2 mr-2",
//     right:
//       "left-full top-1/2 -translate-y-1/2 ml-2",
//   };

//   const arrows = {
//     top:
//       "left-1/2 top-full -translate-x-1/2 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#173247]",
//     bottom:
//       "left-1/2 bottom-full -translate-x-1/2 border-x-[6px] border-x-transparent border-b-[6px] border-b-[#173247]",
//     left:
//       "left-full top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-[#173247]",
//     right:
//       "right-full top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#173247]",
//   };

//   return (
//     <div
//       className={`group/tooltip relative min-w-0 ${className}`}
//     >
//       {children}

//       <div
//         className={`
//           pointer-events-none
//           absolute
//           ${positions[position]}
//           z-[99999]
//           invisible
//           w-max
//           max-w-[300px]
//           translate-y-1
//           rounded-xl
//           bg-[#173247]
//           px-3
//           py-2
//           text-[10px]
//           font-semibold
//           leading-4
//           text-white
//           opacity-0
//           shadow-[0_10px_30px_rgba(15,23,42,0.25)]
//           transition-all
//           duration-150
//           group-hover/tooltip:visible
//           group-hover/tooltip:translate-y-0
//           group-hover/tooltip:opacity-100
//         `}
//       >
//         <span className="block break-words">
//           {text}
//         </span>

//         <span
//           className={`absolute h-0 w-0 ${arrows[position]}`}
//         />
//       </div>
//     </div>
//   );
// }

// function useBodyScrollLock(locked) {
//   useEffect(() => {
//     if (!locked) return;

//     const oldOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = oldOverflow;
//     };
//   }, [locked]);
// }

// /* =========================================================
//    AI ASSISTANT
// ========================================================= */

// function AIAssistant({ open, onClose }) {
//   if (!open) return null;

//   return (
//     <div className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-[370px] overflow-hidden rounded-[16px] border border-[#DCE5E9] bg-white shadow-2xl sm:right-6">
//       <div className="flex items-center justify-between border-b border-[#E7EDF0] bg-[#EAF9F4] px-4 py-3">
//         <div className="flex items-center gap-2.5">
//           <div
//             className="flex h-8 w-8 items-center justify-center rounded-full text-white"
//             style={{ backgroundColor: DARK }}
//           >
//             <BsRobot size={16} />
//           </div>

//           <div>
//             <p className="text-xs font-extrabold text-[#173247]">
//               AI Property Assistant
//             </p>
//             <p className="text-[10px] text-[#91A2AC]">
//               Smart listing workflows
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={onClose}
//           className="flex h-8 w-8 items-center justify-center rounded-lg text-[#91A2AC] transition hover:bg-white hover:text-[#425A70]"
//         >
//           <FiX size={15} />
//         </button>
//       </div>

//       <div className="space-y-3 p-4">
//         <p className="text-[11px] leading-5 text-[#7D8C9C]">
//           Select a property to unlock AI assisted listing workflows.
//         </p>

//         <button className="flex w-full items-center justify-between rounded-xl bg-[#25B98B] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#15966F]">
//           Generate Description
//           <MdOutlineAutoAwesome size={16} />
//         </button>

//         <button className="flex w-full items-center justify-between rounded-xl border border-[#35C99A]/30 bg-[#EAF9F4] px-4 py-3 text-xs font-semibold text-[#15966F] transition hover:bg-[#EAF9F4]">
//           Suggest Price
//           <MdTrendingUp size={16} />
//         </button>

//         <div className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFB] px-3 py-3">
//           <FiInfo
//             size={14}
//             className="mt-0.5 shrink-0 text-[#91A2AC]"
//           />
//           <p className="text-[10px] leading-4 text-[#7D8C9C]">
//             DIGINIWAS AI can help optimize descriptions, pricing,
//             positioning and lead capture.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN PAGE
// ========================================================= */

// export default function PropertyManagement() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [chatOpen, setChatOpen] = useState(false);

//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     let cancelled = false;

//     const openPropertyFromRoute = async () => {
//       try {
//         const response = await getPropertyByIdApi(id);

//         if (cancelled) return;

//         if (response?.success && response?.data) {
//           setSelectedProperty(response.data);
//           setPreviewOpen(true);
//         } else {
//           throw new Error("Property details were not returned by the API.");
//         }
//       } catch (error) {
//         if (cancelled) return;

//         console.error("Property Detail Error:", error);

//         await Swal.fire({
//           icon: "error",
//           title: "Property Not Found",
//           text:
//             error?.response?.data?.message ||
//             error?.message ||
//             "Unable to load property details.",
//           confirmButtonColor: DARK,
//         });

//         navigate("/property-management", { replace: true });
//       }
//     };

//     openPropertyFromRoute();

//     return () => {
//       cancelled = true;
//     };
//   }, [id, navigate]);

//   const [editOpen, setEditOpen] = useState(false);
//   const [editingProperty, setEditingProperty] = useState(null);

//   const [selectedRole, setSelectedRole] = useState("All");
//   const [selectedStatus, setSelectedStatus] = useState("All");
//   const [selectedCity, setSelectedCity] = useState("All");
//   const [search, setSearch] = useState("");
//   const [filterOpen, setFilterOpen] = useState(false);

//   const [counts, setCounts] = useState({
//     all: 0,
//     admin: 0,
//     partner: 0,
//     seller: 0,
//     draft: 0,
//   });

//   const statusOptions = [
//     "All",
//     "Submitted",
//     "Assigned_To_Partner",
//     "Reviewing",
//     "Verified",
//     "Live",
//     "Rejected",
//     "Sold",
//     "Rented",
//   ];

//   /* =========================================================
//      FETCH
//   ========================================================= */

//   const getProperties = async () => {
//     try {
//       setLoading(true);

//       const response = await getAllPropertiesApi({
//         role:
//           selectedRole === "All" || selectedRole === "Draft"
//             ? ""
//             : selectedRole,
//         draftOnly: selectedRole === "Draft",
//         status:
//           selectedRole === "Draft"
//             ? "Draft"
//             : selectedStatus === "All"
//               ? ""
//               : selectedStatus,
//         city: selectedCity === "All" ? "" : selectedCity,
//         search: search.trim(),
//       });

//       if (response?.success) {
//         const apiProperties = Array.isArray(response?.data)
//           ? response.data
//           : [];

//         // All/Admin/Partner/Seller never include drafts.
//         // The dedicated Draft tab shows ONLY Admin-created drafts.
//         const visibleProperties =
//           selectedRole === "Draft"
//             ? apiProperties.filter(
//                 (item) =>
//                   String(item?.status || "").trim().toLowerCase() === "draft" &&
//                   String(item?.addedBy?.role || "").trim().toLowerCase() === "admin"
//               )
//             : apiProperties.filter(
//                 (item) =>
//                   String(item?.status || "").trim().toLowerCase() !== "draft"
//               );

//         setProperties(visibleProperties);

//         // Prefer backend counts if available.
//         // If backend still includes Draft in counts, list remains safe.
//         setCounts({
//           all: response?.counts?.all ?? visibleProperties.length,
//           admin:
//             response?.counts?.admin ??
//             visibleProperties.filter((p) => p?.addedBy?.role === "Admin").length,
//           partner:
//             response?.counts?.partner ??
//             visibleProperties.filter((p) => p?.addedBy?.role === "Partner").length,
//           seller:
//             response?.counts?.seller ??
//             visibleProperties.filter((p) => p?.addedBy?.role === "Seller").length,
//           draft: response?.counts?.draftAdmin ?? 0,
//         });
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error(
//         "GET PROPERTIES ERROR:",
//         error?.response?.data || error
//       );
//       setProperties([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       getProperties();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [
//     selectedRole,
//     selectedStatus,
//     selectedCity,
//     search,
//   ]);

//   const cityOptions = useMemo(
//     () => [
//       "All",
//       ...Array.from(
//         new Set(
//           properties
//             .map((item) => item?.city)
//             .filter(Boolean)
//         )
//       ).sort(),
//     ],
//     [properties]
//   );

//   const roleTabs = [
//     { label: "All", count: counts.all, icon: FiGrid },
//     { label: "Admin", count: counts.admin, icon: FiUser },
//     { label: "Partner", count: counts.partner, icon: FiCheckCircle },
//     { label: "Seller", count: counts.seller, icon: FiHome },
//     { label: "Draft", count: counts.draft, icon: FiFileText },
//   ];

//   const filteredSummary = useMemo(() => {
//     return {
//       verified: properties.filter(
//         (p) => p.status === "Verified"
//       ).length,
//       live: properties.filter(
//         (p) => p.status === "Live"
//       ).length,
//       reviewing: properties.filter(
//         (p) =>
//           p.status === "Reviewing" ||
//           p.status === "Assigned_To_Partner"
//       ).length,
//     };
//   }, [properties]);

//   /* =========================================================
//      ACTIONS
//   ========================================================= */

//   const handleDeleteProperty = async (id) => {
//     const property = properties.find(
//       (item) => item?._id === id
//     );

//     const result = await Swal.fire({
//       icon: "warning",
//       title: "Delete Property?",
//       html: `
//         <div style="font-size:13px;color:#64748b;line-height:1.6">
//           Are you sure you want to delete
//           <strong style="color:#1F3C50">
//             ${property?.title || "this property"}
//           </strong>
//           ${
//             property?.propertyId
//               ? `(${property.propertyId})`
//               : ""
//           }?
//           <br/>
//           <span style="color:#dc2626;font-weight:600">
//             This action cannot be undone.
//           </span>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#dc2626",
//       cancelButtonColor: "#64748b",
//       reverseButtons: true,
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response =
//         await deletePropertyApi(id);

//       if (response?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Property Deleted",
//           text:
//             response?.message ||
//             "Property deleted successfully.",
//           confirmButtonColor: DARK,
//         });

//         await getProperties();
//       }
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Delete Failed",
//         text:
//           error?.response?.data?.message ||
//           "Unable to delete property.",
//         confirmButtonColor: DARK,
//       });
//     }
//   };

//   const handleVerifyProperty = async (property) => {
//     if (property?.status === "Verified") {
//       await Swal.fire({
//         icon: "info",
//         title: "Already Verified",
//         text: "This property is already verified.",
//         confirmButtonColor: DARK,
//       });

//       return;
//     }

//     const result = await Swal.fire({
//       icon: "question",
//       title: "Verify Property?",
//       html: `
//         <div style="font-size:13px;color:#64748b;line-height:1.6">
//           Verify
//           <strong style="color:#1F3C50">
//             ${property?.title || "this property"}
//           </strong>
//           ${
//             property?.propertyId
//               ? `(${property.propertyId})`
//               : ""
//           }?
//           <br/>
//           Status will be changed to
//           <strong style="color:#25B98B">Verified</strong>.
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: "Yes, Verify",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#25B98B",
//       cancelButtonColor: "#64748b",
//       reverseButtons: true,
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response =
//         await updatePropertyStatusApi(
//           property._id,
//           {
//             status: "Verified",
//             notes:
//               "Property verified by admin from Property Management.",
//           }
//         );

//       if (response?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Property Verified",
//           text:
//             response?.message ||
//             "Property verified successfully.",
//           confirmButtonColor: "#25B98B",
//         });

//         await getProperties();
//       }
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Verification Failed",
//         text:
//           error?.response?.data?.message ||
//           "Unable to verify property.",
//         confirmButtonColor: DARK,
//       });
//     }
//   };

//   const handleOpenPreview = async (property) => {
//     try {
//       const response =
//         await getPropertyByIdApi(
//           property._id
//         );

//       setSelectedProperty(
//         response?.data || property
//       );
//     } catch (error) {
//       setSelectedProperty(property);
//     }

//     setPreviewOpen(true);
//   };

//   const handleOpenEdit = async (property) => {
//     try {
//       const response =
//         await getPropertyByIdApi(
//           property._id
//         );

//       setEditingProperty(
//         response?.data || property
//       );
//     } catch (error) {
//       setEditingProperty(property);
//     }

//     setEditOpen(true);
//   };

//   const handlePropertyUpdated = async () => {
//     setEditOpen(false);
//     setEditingProperty(null);
//     await getProperties();
//   };

//   const clearFilters = () => {
//     setSelectedRole("All");
//     setSelectedStatus("All");
//     setSelectedCity("All");
//     setSearch("");
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <div className="min-h-screen font-sans text-[#173247]">
//       <div className="mx-auto w-full max-w-[1500px] px-1 py-2 sm:px-1 lg:px-1">
//         {/* ================= DIGINIWAS HEADER ================= */}
//         <section className="relative mb-3 overflow-hidden rounded-[20px] bg-[#1F3C50] px-5 py-5 shadow-sm md:px-7">
//           <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#35C99A]/10" />
//           <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

//           <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#35C99A] text-white shadow-sm">
//                 <FiHome size={20} />
//               </div>

//               <div>
//                 {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9FB3C0]">
//                   DigiNiwas Admin
//                 </p> */}

//                 <h1 className="mt-0.5 text-xl font-bold tracking-tight text-white md:text-2xl">
//                   Property Management
//                 </h1>

//                 <p className="mt-1 text-xs text-[#C3D0D8]">
//                   Manage, verify and maintain properties added by Admin, Partner and Seller
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-sm">
//               <span className="h-2 w-2 rounded-full bg-[#35C99A]" />
//               <div>
//                 <p className="text-[9px] font-medium uppercase tracking-wide text-[#AFC0CA]">
//                   Current View
//                 </p>
//                 <p className="text-xs font-semibold text-white">
//                   Property Directory
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ================= ACTION BAR ================= */}
//         <section className="mb-3 rounded-[18px] border border-[#DCE5E9] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-2 rounded-xl bg-[#1F3C50] px-4 py-2.5 text-xs font-semibold text-white shadow-sm">
//                 <FiGrid size={14} />
//                 Dashboard
//               </div>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/add-property")}
//                 className="flex h-[38px] items-center gap-2 rounded-lg bg-[#35C99A] px-4 text-[10px] font-extrabold text-[#173247] transition hover:bg-[#2DB98C]"
//               >
//                 <FiPlus size={14} />
//                 Add Property
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setFilterOpen((prev) => !prev)}
//                 className={`flex h-[38px] items-center gap-2 rounded-lg border px-4 text-[10px] font-semibold transition ${
//                   filterOpen
//                     ? "border-[#1F3C50] bg-[#1F3C50] text-white"
//                     : "border-[#DCE5E9] bg-white text-[#536779] hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
//                 }`}
//               >
//                 <FiFilter size={13} />
//                 Filters
//                 {filterOpen ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
//               </button>

//               <button
//                 type="button"
//                 className="flex h-[38px] items-center gap-2 rounded-lg border border-[#DCE5E9] bg-white px-4 text-[10px] font-semibold text-[#536779] transition hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
//               >
//                 <FiUpload size={13} />
//                 Export
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* SUMMARY */}
//         <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             label="Visible Properties"
//             value={properties.length}
//             icon={<FiGrid />}
//           />

//           <SummaryCard
//             label="Reviewing"
//             value={filteredSummary.reviewing}
//             icon={<FiClock />}
//             tone="amber"
//           />

//           <SummaryCard
//             label="Verified"
//             value={filteredSummary.verified}
//             icon={<FiCheckCircle />}
//             tone="emerald"
//           />

//           <SummaryCard
//             label="Live"
//             value={filteredSummary.live}
//             icon={<MdVerified />}
//             tone="green"
//           />
//         </section>

//         {/* CREATOR TABS */}
//         <section className="mb-3 rounded-[18px] border border-[#DCE5E9] bg-white p-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div
//             className={`flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${SCROLLBAR_HIDDEN}`}
//           >
//             {roleTabs.map(
//               ({ label, count, icon: Icon }) => {
//                 const active =
//                   selectedRole === label;

//                 return (
//                   <button
//                     key={label}
//                     type="button"
//                     onClick={() => {
//                       setSelectedRole(label);
//                       if (label === "Draft") setSelectedStatus("All");
//                     }}
//                     className={`flex min-w-max items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
//                       active
//                         ? "bg-[#1F3C50] text-white shadow-sm"
//                         : "bg-[#F2F6F7] text-[#667B88] hover:bg-[#EAF9F4] hover:text-[#15966F]"
//                     }`}
//                   >
//                     <Icon size={13} />
//                     {label}

//                     <span
//                       className={`rounded-full px-2 py-0.5 text-[10px] ${
//                         active
//                           ? "bg-white/15 text-white"
//                           : "bg-[#F1F5F6] text-[#7D8C9C]"
//                       }`}
//                     >
//                       {count}
//                     </span>
//                   </button>
//                 );
//               }
//             )}
//           </div>
//         </section>

//         {/* SEARCH + FILTERS */}
//         <section className="mb-4 rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div className="flex flex-col gap-3 lg:flex-row">
//             <div className="relative flex-1">
//               <FiSearch
//                 size={15}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
//               />

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(e.target.value)
//                 }
//                 placeholder="Search by property ID, title, city, locality or creator..."
//                 className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-white pl-9 pr-4 text-xs font-medium text-[#173247] outline-none transition placeholder:text-[#9DABB3] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
//               />
//             </div>

//             {filterOpen && (
//               <div className="flex flex-col gap-2 sm:flex-row">
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) =>
//                     setSelectedStatus(
//                       e.target.value
//                     )
//                   }
//                   className="h-10 min-w-[180px] rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs font-semibold text-[#526A78] outline-none focus:border-[#35C99A]"
//                 >
//                   {statusOptions.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item === "All"
//                           ? "All Status"
//                           : formatStatus(item)}
//                       </option>
//                     )
//                   )}
//                 </select>

//                 <select
//                   value={selectedCity}
//                   onChange={(e) =>
//                     setSelectedCity(
//                       e.target.value
//                     )
//                   }
//                   className="h-10 min-w-[165px] rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs font-semibold text-[#526A78] outline-none focus:border-[#35C99A]"
//                 >
//                   {cityOptions.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item === "All"
//                           ? "All Cities"
//                           : item}
//                       </option>
//                     )
//                   )}
//                 </select>

//                 <button
//                   type="button"
//                   onClick={clearFilters}
//                   className="h-[38px] rounded-lg border border-[#DCE5E9] px-4 text-xs font-semibold text-[#7D8C9C] transition hover:bg-[#F8FAFB]"
//                 >
//                   Clear
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ACTIVE FILTER CHIPS */}
//         <div className="mb-3 flex flex-wrap items-center gap-2">
//           <span className="text-[10px] font-semibold uppercase tracking-wider text-[#91A2AC]">
//             Showing
//           </span>

//           <FilterChip>
//             {selectedRole === "All"
//               ? "All Creators"
//               : `${selectedRole} Added`}
//           </FilterChip>

//           {selectedStatus !== "All" && (
//             <FilterChip tone="amber">
//               {formatStatus(selectedStatus)}
//             </FilterChip>
//           )}

//           {selectedCity !== "All" && (
//             <FilterChip tone="blue">
//               {selectedCity}
//             </FilterChip>
//           )}
//         </div>

//         {/* TABLE CARD */}
//         <section className="relative overflow-visible rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div className="flex items-center justify-between border-b border-[#E7EDF0] bg-[#F8FAFB] px-4 py-3 sm:px-5">
//             <div>
//               <h2 className="text-[11px] font-bold text-[#173247]">
//                 Property Directory
//               </h2>

//               <p className="mt-0.5 text-[10px] text-[#91A2AC]">
//                 Draft properties are hidden from this admin view.
//               </p>
//             </div>

//             <span className="rounded-full bg-[#F1F5F6] px-2.5 py-1 text-[10px] font-bold text-[#7D8C9C]">
//               {properties.length}
//             </span>
//           </div>

//           {/* 
//             RESPONSIVE PROPERTY DIRECTORY
//             - No horizontal scrollbar
//             - Table always fits available screen width
//             - Less important columns hide on smaller screens
//           */}
//           <div className="relative w-full overflow-visible">
//             <table className="w-full table-fixed">
//               <colgroup>
//                 <col className="w-[34%] sm:w-[29%] lg:w-[24%]" />
//                 <col className="hidden sm:table-column sm:w-[17%] lg:w-[14%]" />
//                 <col className="hidden lg:table-column lg:w-[15%]" />
//                 <col className="w-[18%] sm:w-[15%] lg:w-[11%]" />
//                 <col className="w-[24%] sm:w-[18%] lg:w-[13%]" />
//                 <col className="hidden xl:table-column xl:w-[15%]" />
//                 <col className="w-[24%] sm:w-[21%] lg:w-[13%] xl:w-[8%]" />
//               </colgroup>

//               <thead>
//                 <tr className="bg-[#1F3C50] text-white">
//                   <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
//                     Property
//                   </th>

//                   <th className="hidden px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:table-cell sm:px-3 sm:text-[10px]">
//                     Added By
//                   </th>

//                   <th className="hidden px-3 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white lg:table-cell">
//                     Location
//                   </th>

//                   <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
//                     Status
//                   </th>

//                   <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
//                     Market Price
//                   </th>

//                   <th className="hidden px-3 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white xl:table-cell">
//                     Assigned Partner
//                   </th>

//                   <th className="px-1 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-2 sm:text-[10px]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <TableLoading />
//                 ) : properties.length === 0 ? (
//                   <TableEmpty />
//                 ) : (
//                   properties.map(
//                     (property, index) => {
//                       const creator =
//                         property?.addedBy || {};

//                       const assignedPartner =
//                         property?.assignedPartner ||
//                         {};

//                       const imageUrl =
//                         property?.images?.[0]
//                           ?.url ||
//                         "https://via.placeholder.com/120";

//                       return (
//                         <tr
//                           key={
//                             property._id ||
//                             property.id
//                           }
//                           className={`transition hover:bg-[#f8fbfa] ${
//                             index !==
//                             properties.length - 1
//                               ? "border-b border-[#E7EDF0]"
//                               : ""
//                           }`}
//                         >
//                           <td className="px-2 py-3 sm:px-3 sm:py-3.5">
//                             <div className="flex min-w-0 items-center gap-2 sm:gap-3">
//                               <img
//                                 src={imageUrl}
//                                 alt={
//                                   property.title ||
//                                   "Property"
//                                 }
//                                 className="hidden h-10 w-10 shrink-0 rounded-xl border border-[#E7EDF0] bg-[#F1F5F6] object-cover sm:block lg:h-11 lg:w-11"
//                               />

//                               <div className="min-w-0 flex-1">
//                                 <HoverTooltip
//                                   text={property.title || "-"}
//                                   position="top"
//                                   className="w-full"
//                                 >
//                                   <p className="w-full cursor-help truncate text-[10px] font-extrabold text-[#173247] sm:text-[11px]">
//                                     {property.title ||
//                                       "-"}
//                                   </p>
//                                 </HoverTooltip>

//                                 <p className="mt-0.5 truncate text-[10px] font-bold text-[#25B98B] sm:mt-1 sm:text-[10px]">
//                                   {property.propertyId ||
//                                     "-"}
//                                 </p>

//                                 <p className="mt-0.5 hidden truncate text-[10px] text-[#91A2AC] sm:block sm:text-[10px]">
//                                   {property.category ||
//                                     "-"}{" "}
//                                   •{" "}
//                                   {property.transactionType ||
//                                     "-"}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>

//                           <td className="hidden px-2 py-3 sm:table-cell sm:px-3 sm:py-3.5">
//                             <HoverTooltip
//                               text={creator?.name || "-"}
//                               position="top"
//                               className="w-full"
//                             >
//                               <p className="cursor-help truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
//                                 {creator?.name || "-"}
//                               </p>
//                             </HoverTooltip>

//                             <div className="mt-1">
//                               <CreatorBadge
//                                 role={creator?.role}
//                               />
//                             </div>

//                             {(creator?.sellerId ||
//                               creator?.partnerId) && (
//                               <p className="mt-1 text-[10px] text-[#91A2AC]">
//                                 {creator?.sellerId ||
//                                   creator?.partnerId}
//                               </p>
//                             )}
//                           </td>

//                           <td className="hidden px-3 py-3.5 lg:table-cell">
//                             <div className="flex min-w-0 items-start gap-2">
//                               <FiMapPin
//                                 size={13}
//                                 className="mt-0.5 shrink-0 text-[#91A2AC]"
//                               />

//                               <HoverTooltip
//                                 text={
//                                   [
//                                     property.locality,
//                                     property.city,
//                                     property.pinCode,
//                                   ]
//                                     .filter(Boolean)
//                                     .join(", ") || "-"
//                                 }
//                                 position="top"
//                                 className="min-w-0 flex-1"
//                               >
//                                 <div className="min-w-0 cursor-help">
//                                   <p className="truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
//                                     {property.locality ||
//                                       "-"}
//                                   </p>

//                                   <p className="mt-1 truncate text-[10px] text-[#91A2AC]">
//                                     {[
//                                       property.city,
//                                       property.pinCode,
//                                     ]
//                                       .filter(Boolean)
//                                       .join(" • ")}
//                                   </p>
//                                 </div>
//                               </HoverTooltip>
//                             </div>
//                           </td>

//                           <td className="px-2 py-3 sm:px-3 sm:py-3.5">
//                             <HoverTooltip
//                               text={formatStatus(
//                                 property.status
//                               )}
//                               position="top"
//                               className="inline-block max-w-full"
//                             >
//                               <div className="cursor-help">
//                                 <StatusBadge
//                                   status={
//                                     property.status
//                                   }
//                                 />
//                               </div>
//                             </HoverTooltip>
//                           </td>

//                           <td className="px-2 py-3 sm:px-3 sm:py-3.5">
//                             <HoverTooltip
//                               text={formatCurrency(
//                                 property.price
//                               )}
//                               position="top"
//                               className="w-full"
//                             >
//                               <p className="cursor-help truncate text-[10px] font-extrabold text-[#173247] sm:text-[10px] lg:text-[11px]">
//                                 {formatCurrency(
//                                   property.price
//                                 )}
//                               </p>
//                             </HoverTooltip>

//                             <p className="mt-0.5 hidden truncate text-[10px] text-[#91A2AC] sm:block sm:text-[10px]">
//                               {property.propertySize ||
//                                 "-"}{" "}
//                               {property.sizeUnit || ""}
//                             </p>
//                           </td>

//                           <td className="hidden px-3 py-3.5 xl:table-cell">
//                             {assignedPartner?.partnerId ? (
//                               <div>
//                                 <HoverTooltip
//                                   text={
//                                     assignedPartner?.name ||
//                                     assignedPartner
//                                       ?.partnerId?.name ||
//                                     "-"
//                                   }
//                                   position="top"
//                                   className="w-full"
//                                 >
//                                   <p className="cursor-help truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
//                                     {assignedPartner?.name ||
//                                       assignedPartner
//                                         ?.partnerId?.name ||
//                                       "-"}
//                                   </p>
//                                 </HoverTooltip>

//                                 <HoverTooltip
//                                   text={
//                                     assignedPartner?.partnerCode ||
//                                     assignedPartner
//                                       ?.partnerId
//                                       ?.partnerId ||
//                                     "-"
//                                   }
//                                   position="top"
//                                   className="mt-1 w-full"
//                                 >
//                                   <p className="cursor-help truncate text-[10px] font-bold text-[#25B98B]">
//                                     {assignedPartner?.partnerCode ||
//                                       assignedPartner
//                                         ?.partnerId
//                                         ?.partnerId ||
//                                       "-"}
//                                   </p>
//                                 </HoverTooltip>

//                                 <p className="mt-1 text-[10px] capitalize text-[#91A2AC]">
//                                   {assignedPartner?.partnerType ||
//                                     assignedPartner
//                                       ?.partnerId
//                                       ?.partnerType ||
//                                     ""}
//                                 </p>
//                               </div>
//                             ) : (
//                               <HoverTooltip
//                                 text="No partner has been assigned to this property."
//                                 position="top"
//                                 className="inline-block"
//                               >
//                                 <span className="inline-flex cursor-help rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-600">
//                                   Not Assigned
//                                 </span>
//                               </HoverTooltip>
//                             )}
//                           </td>

//                           <td className="px-1 py-3 sm:px-2 sm:py-3.5">
//                             <div className="flex flex-wrap items-center justify-center gap-0.5 sm:flex-nowrap">
//                               <ActionButton
//                                 title="View Property"
//                                 tone="teal"
//                                 onClick={() =>
//                                   handleOpenPreview(
//                                     property
//                                   )
//                                 }
//                               >
//                                 <FiEye size={15} />
//                               </ActionButton>

//                               <ActionButton
//                                 title="Edit Property"
//                                 tone="blue"
//                                 onClick={() =>
//                                   handleOpenEdit(
//                                     property
//                                   )
//                                 }
//                               >
//                                 <FiEdit2
//                                   size={14}
//                                 />
//                               </ActionButton>

//                               <ActionButton
//                                 title={
//                                   property?.status ===
//                                   "Verified"
//                                     ? "Already Verified"
//                                     : "Verify Property"
//                                 }
//                                 tone="green"
//                                 disabled={
//                                   property?.status ===
//                                   "Verified"
//                                 }
//                                 onClick={() =>
//                                   handleVerifyProperty(
//                                     property
//                                   )
//                                 }
//                               >
//                                 <MdOutlineCheckCircle
//                                   size={17}
//                                 />
//                               </ActionButton>

//                               <ActionButton
//                                 title="Delete Property"
//                                 tone="red"
//                                 onClick={() =>
//                                   handleDeleteProperty(
//                                     property._id
//                                   )
//                                 }
//                               >
//                                 <FiTrash2
//                                   size={14}
//                                 />
//                               </ActionButton>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     }
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex flex-col gap-2 border-t border-[#E7EDF0] bg-[#fcfdfd] px-4 py-3 text-[10px] sm:flex-row sm:items-center sm:justify-between sm:px-5">
//             <p className="font-semibold text-[#7D8C9C]">
//               Showing {properties.length} properties
//             </p>

//             <p className="text-[#91A2AC]">
//               Admin {counts.admin} • Partner{" "}
//               {counts.partner} • Seller{" "}
//               {counts.seller}
//             </p>
//           </div>
//         </section>
//       </div>

//       <AIAssistant
//         open={chatOpen}
//         onClose={() =>
//           setChatOpen(false)
//         }
//       />

//       <EditPropertyModal
//         open={editOpen}
//         property={editingProperty}
//         onClose={() => {
//           setEditOpen(false);
//           setEditingProperty(null);
//         }}
//         onUpdated={
//           handlePropertyUpdated
//         }
//       />

//       <PropertyPreview
//         open={previewOpen}
//         property={selectedProperty}
//         onClose={() => {
//           setPreviewOpen(false);
//           setSelectedProperty(null);

//           // If preview was opened from /property-management/:id,
//           // remove the id from the URL when the preview closes.
//           if (id) {
//             navigate("/property-management", { replace: true });
//           }
//         }}
//       />

//       <button
//         onClick={() =>
//           setChatOpen(
//             (value) => !value
//           )
//         }
//         className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#1F3C50] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:right-6"
//       >
//         {chatOpen ? (
//           <FiX size={19} />
//         ) : (
//           <BsRobot size={19} />
//         )}
//       </button>
//     </div>
//   );
// }

// /* =========================================================
//    SMALL UI COMPONENTS
// ========================================================= */

// function SummaryCard({
//   label,
//   value,
//   icon,
//   tone = "default",
// }) {
//   const tones = {
//     default: {
//       icon: "bg-[#EAF9F4] text-[#25B98B]",
//       value: "text-[#173247]",
//     },
//     amber: {
//       icon: "bg-[#FFF5E8] text-[#F79009]",
//       value: "text-[#173247]",
//     },
//     emerald: {
//       icon: "bg-[#EAF9F4] text-[#25B98B]",
//       value: "text-[#173247]",
//     },
//     green: {
//       icon: "bg-[#EAF9F4] text-[#25B98B]",
//       value: "text-[#173247]",
//     },
//   };

//   const current = tones[tone] || tones.default;

//   return (
//     <div className="group rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-[0_8px_24px_rgba(15,47,69,0.07)]">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#7B8F9A]">
//             {label}
//           </p>

//           <p className={`mt-3 text-2xl font-black ${current.value}`}>
//             {Number(value || 0).toLocaleString()}
//           </p>

//           <p className="mt-1 text-[11px] font-medium text-[#94A4AD]">
//             Property records
//           </p>
//         </div>

//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition group-hover:bg-[#35C99A] group-hover:text-white ${current.icon}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function FilterChip({
//   children,
//   tone = "teal",
// }) {
//   const tones = {
//     teal:
//       "bg-[#EAF9F4] text-[#15966F] border-teal-100",
//     amber:
//       "bg-[#FFF5E8] text-[#D97706] border-amber-100",
//     blue:
//       "bg-[#EEF6FF] text-[#2E90FA] border-blue-100",
//   };

//   return (
//     <span
//       className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${tones[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// function ActionButton({
//   children,
//   title,
//   onClick,
//   disabled = false,
//   tone = "slate",
// }) {
//   const tones = {
//     teal:
//       "text-[#25B98B] hover:bg-[#EAF9F4]",
//     blue:
//       "text-blue-600 hover:bg-blue-50",
//     green:
//       "text-[#25B98B] hover:bg-[#EAF9F4]",
//     red:
//       "text-red-500 hover:bg-red-50",
//     slate:
//       "text-[#7D8C9C] hover:bg-[#F1F5F6]",
//   };

//   return (
//     <HoverTooltip
//       text={title}
//       position="top"
//       className="inline-flex"
//     >
//       <button
//         type="button"
//         aria-label={title}
//         disabled={disabled}
//         onClick={onClick}
//         className={`flex h-7 w-7 items-center justify-center rounded-md transition sm:h-7 sm:w-7 ${
//           tones[tone]
//         } ${
//           disabled
//             ? "cursor-not-allowed opacity-40"
//             : ""
//         }`}
//       >
//         {children}
//       </button>
//     </HoverTooltip>
//   );
// }

// function TableLoading() {
//   return (
//     <tr>
//       <td
//         colSpan={7}
//         className="py-16 text-center"
//       >
//         <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#DCE5E9] border-t-teal-600" />
//         <p className="mt-3 text-xs text-[#91A2AC]">
//           Loading properties...
//         </p>
//       </td>
//     </tr>
//   );
// }

// function TableEmpty() {
//   return (
//     <tr>
//       <td
//         colSpan={7}
//         className="py-16 text-center"
//       >
//         <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#F1F5F6] text-[#91A2AC]">
//           <FiHome size={18} />
//         </div>

//         <p className="mt-3 text-[11px] font-bold text-[#536779]">
//           No Property Found
//         </p>

//         <p className="mt-1 text-[10px] text-[#91A2AC]">
//           Try changing your filters or search.
//         </p>
//       </td>
//     </tr>
//   );
// }

// /* =========================================================
//    EDIT MODAL
// ========================================================= */

// function EditPropertyModal({
//   open,
//   property,
//   onClose,
//   onUpdated,
// }) {
//   const [form, setForm] =
//     useState({});

//   const [
//     existingImages,
//     setExistingImages,
//   ] = useState([]);

//   const [
//     newImages,
//     setNewImages,
//   ] = useState([]);

//   const [
//     floorPlan,
//     setFloorPlan,
//   ] = useState(null);

//   const [
//     reraCertificate,
//     setReraCertificate,
//   ] = useState(null);

//   const [video, setVideo] =
//     useState(null);

//   const [saving, setSaving] =
//     useState(false);

//   useBodyScrollLock(open);

//   useEffect(() => {
//     if (!property) return;

//     setForm({
//       title: property.title || "",
//       transactionType:
//         property.transactionType ||
//         "Sale",
//       category:
//         property.category ||
//         "Residential",
//       propertySize:
//         property.propertySize || "",
//       sizeUnit:
//         property.sizeUnit ||
//         "sqft",
//       price:
//         property.price || "",
//       projectName:
//         property.projectName ||
//         "",
//       developerName:
//         property.developerName ||
//         "",
//       description:
//         property.description ||
//         "",
//       city: property.city || "",
//       locality:
//         property.locality || "",
//       pinCode:
//         property.pinCode || "",
//       address:
//         property.address || "",
//       latitude:
//         property.latitude ?? "",
//       longitude:
//         property.longitude ?? "",
//       maintenance:
//         property.maintenance ?? "",
//       bookingAmount:
//         property.bookingAmount ?? "",
//       negotiable:
//         Boolean(
//           property.negotiable
//         ),
//       superBuiltupArea:
//         property.superBuiltupArea ??
//         "",
//       carpetArea:
//         property.carpetArea ?? "",
//       bedrooms:
//         property.bedrooms || "",
//       bathrooms:
//         property.bathrooms || "",
//       balconies:
//         property.balconies || "",
//       parking:
//         property.parking || "",
//       floorNo:
//         property.floorNo ?? "",
//       totalFloors:
//         property.totalFloors ?? "",
//       facing:
//         property.facing || "",
//       furnishing:
//         property.furnishing || "",
//       amenities:
//         Array.isArray(
//           property.amenities
//         )
//           ? property.amenities.join(
//               ", "
//             )
//           : "",
//       tags: Array.isArray(
//         property.tags
//       )
//         ? property.tags.join(", ")
//         : "",
//     });

//     setExistingImages(
//       property.images || []
//     );

//     setNewImages([]);
//     setFloorPlan(null);
//     setReraCertificate(null);
//     setVideo(null);
//   }, [property]);

//   if (!open || !property)
//     return null;

//   const setField = (
//     name,
//     value
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const removeExistingImage = (
//     index
//   ) => {
//     setExistingImages((prev) =>
//       prev.filter(
//         (_, imageIndex) =>
//           imageIndex !== index
//       )
//     );
//   };

//   const handleSubmit = async (
//     event
//   ) => {
//     event.preventDefault();

//     const confirm =
//       await Swal.fire({
//         icon: "question",
//         title: "Update Property?",
//         text:
//           "Property details, images and documents will be updated.",
//         showCancelButton: true,
//         confirmButtonText:
//           "Yes, Update",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: DARK,
//         cancelButtonColor:
//           "#64748b",
//       });

//     if (!confirm.isConfirmed)
//       return;

//     try {
//       setSaving(true);

//       const payload =
//         new FormData();

//       Object.entries(form).forEach(
//         ([key, value]) => {
//           if (
//             key === "amenities" ||
//             key === "tags"
//           )
//             return;

//           if (
//             typeof value ===
//             "boolean"
//           ) {
//             payload.append(
//               key,
//               value
//                 ? "true"
//                 : "false"
//             );
//           } else if (
//             value !== undefined &&
//             value !== null
//           ) {
//             payload.append(
//               key,
//               value
//             );
//           }
//         }
//       );

//       payload.append(
//         "amenities",
//         JSON.stringify(
//           String(
//             form.amenities || ""
//           )
//             .split(",")
//             .map((item) =>
//               item.trim()
//             )
//             .filter(Boolean)
//         )
//       );

//       payload.append(
//         "tags",
//         JSON.stringify(
//           String(form.tags || "")
//             .split(",")
//             .map((item) =>
//               item.trim()
//             )
//             .filter(Boolean)
//         )
//       );

//       payload.append(
//         "existingImages",
//         JSON.stringify(
//           existingImages
//         )
//       );

//       newImages.forEach(
//         (file) => {
//           payload.append(
//             "images",
//             file
//           );
//         }
//       );

//       if (floorPlan) {
//         payload.append(
//           "floorPlan",
//           floorPlan
//         );
//       }

//       if (reraCertificate) {
//         payload.append(
//           "reraCertificate",
//           reraCertificate
//         );
//       }

//       if (video) {
//         payload.append(
//           "video",
//           video
//         );
//       }

//       const response =
//         await updatePropertyApi(
//           property._id,
//           payload
//         );

//       if (response?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Property Updated",
//           text:
//             response?.message ||
//             "Property updated successfully.",
//           confirmButtonColor: DARK,
//         });

//         await onUpdated();
//       }
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text:
//           error?.response?.data
//             ?.message ||
//           "Unable to update property.",
//         confirmButtonColor: DARK,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass =
//     "h-10 w-full rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs text-[#425A70] outline-none transition focus:border-[#35C99A]/50 focus:ring-2 focus:ring-teal-50";

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5">
//       <div className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[18px] border border-white/20 bg-white shadow-2xl">
//         {/* HEADER - NOT SCROLLING */}
//         <div className="flex shrink-0 items-center justify-between border-b border-[#E7EDF0] bg-white px-5 py-4 sm:px-6">
//           <div>
//             <div className="flex items-center gap-2">
//               <FiEdit2 className="text-[#25B98B]" />

//               <h2 className="text-lg font-extrabold text-[#173247]">
//                 Edit Property
//               </h2>
//             </div>

//             <p className="mt-1 text-[10px] text-[#91A2AC]">
//               {property.propertyId} •
//               Update details, images and documents
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1F5F6] text-[#7D8C9C] transition hover:bg-slate-200"
//           >
//             <FiX size={16} />
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="flex min-h-0 flex-1 flex-col"
//         >
//           {/* BODY - ONLY THIS SCROLLS */}
//           <div
//             className={`min-h-0 flex-1 overflow-y-auto bg-[#fbfcfc] p-4 sm:p-6 ${SCROLLBAR_HIDDEN}`}
//           >
//             <SectionCard
//               title="Basic Information"
//               subtitle="Core property information"
//             >
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 <EditField label="Title">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.title || ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "title",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Category">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.category ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "category",
//                         e.target.value
//                       )
//                     }
//                   >
//                     {[
//                       "Residential",
//                       "Commercial",
//                       "Rental",
//                       "Sell",
//                       "Plot/Land",
//                     ].map(
//                       (item) => (
//                         <option
//                           key={item}
//                         >
//                           {item}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </EditField>

//                 <EditField label="Transaction">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.transactionType ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "transactionType",
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option>
//                       Sale
//                     </option>
//                     <option>
//                       Rent
//                     </option>
//                   </select>
//                 </EditField>

//                 <EditField label="Price">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.price || ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "price",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Property Size">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.propertySize ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "propertySize",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Size Unit">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.sizeUnit ||
//                       "sqft"
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "sizeUnit",
//                         e.target.value
//                       )
//                     }
//                   >
//                     {[
//                       "sqft",
//                       "sqyd",
//                       "sqm",
//                       "acre",
//                       "bigha",
//                     ].map(
//                       (item) => (
//                         <option
//                           key={item}
//                         >
//                           {item}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </EditField>
//               </div>
//             </SectionCard>

//             <SectionCard
//               title="Project & Location"
//               subtitle="Project and map-related details"
//             >
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {[
//                   [
//                     "projectName",
//                     "Project Name",
//                   ],
//                   [
//                     "developerName",
//                     "Developer Name",
//                   ],
//                   ["city", "City"],
//                   [
//                     "locality",
//                     "Locality",
//                   ],
//                   [
//                     "pinCode",
//                     "Pin Code",
//                   ],
//                   [
//                     "address",
//                     "Address",
//                   ],
//                   [
//                     "latitude",
//                     "Latitude",
//                   ],
//                   [
//                     "longitude",
//                     "Longitude",
//                   ],
//                 ].map(
//                   ([name, label]) => (
//                     <EditField
//                       key={name}
//                       label={label}
//                     >
//                       <input
//                         className={
//                           inputClass
//                         }
//                         value={
//                           form[name] ??
//                           ""
//                         }
//                         onChange={(
//                           e
//                         ) =>
//                           setField(
//                             name,
//                             e.target
//                               .value
//                           )
//                         }
//                       />
//                     </EditField>
//                   )
//                 )}
//               </div>
//             </SectionCard>

//             <SectionCard
//               title="Specifications"
//               subtitle="Physical and pricing specifications"
//             >
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {[
//                   [
//                     "maintenance",
//                     "Maintenance",
//                   ],
//                   [
//                     "bookingAmount",
//                     "Booking Amount",
//                   ],
//                   [
//                     "superBuiltupArea",
//                     "Super Built-up Area",
//                   ],
//                   [
//                     "carpetArea",
//                     "Carpet Area",
//                   ],
//                   [
//                     "bedrooms",
//                     "Bedrooms",
//                   ],
//                   [
//                     "bathrooms",
//                     "Bathrooms",
//                   ],
//                   [
//                     "balconies",
//                     "Balconies",
//                   ],
//                   [
//                     "parking",
//                     "Parking",
//                   ],
//                   [
//                     "floorNo",
//                     "Floor No",
//                   ],
//                   [
//                     "totalFloors",
//                     "Total Floors",
//                   ],
//                   [
//                     "facing",
//                     "Facing",
//                   ],
//                   [
//                     "furnishing",
//                     "Furnishing",
//                   ],
//                 ].map(
//                   ([name, label]) => (
//                     <EditField
//                       key={name}
//                       label={label}
//                     >
//                       <input
//                         className={
//                           inputClass
//                         }
//                         value={
//                           form[name] ??
//                           ""
//                         }
//                         onChange={(
//                           e
//                         ) =>
//                           setField(
//                             name,
//                             e.target
//                               .value
//                           )
//                         }
//                       />
//                     </EditField>
//                   )
//                 )}

//                 <EditField label="Negotiable">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.negotiable
//                         ? "true"
//                         : "false"
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "negotiable",
//                         e.target
//                           .value ===
//                           "true"
//                       )
//                     }
//                   >
//                     <option value="false">
//                       No
//                     </option>
//                     <option value="true">
//                       Yes
//                     </option>
//                   </select>
//                 </EditField>

//                 <EditField label="Amenities (comma separated)">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.amenities ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "amenities",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Tags (comma separated)">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.tags || ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "tags",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <div className="md:col-span-2 lg:col-span-3">
//                   <EditField label="Description">
//                     <textarea
//                       rows={4}
//                       className="w-full rounded-xl border border-[#DCE5E9] bg-white p-3 text-xs text-[#425A70] outline-none transition focus:border-[#35C99A]/50 focus:ring-2 focus:ring-teal-50"
//                       value={
//                         form.description ||
//                         ""
//                       }
//                       onChange={(e) =>
//                         setField(
//                           "description",
//                           e.target
//                             .value
//                         )
//                       }
//                     />
//                   </EditField>
//                 </div>
//               </div>
//             </SectionCard>

//             <SectionCard
//               title="Media & Documents"
//               subtitle="Manage listing images and documents"
//             >
//               <div>
//                 <p className="text-xs font-bold text-[#425A70]">
//                   Existing Images
//                 </p>

//                 <div
//                   className={`mt-3 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 ${SCROLLBAR_HIDDEN}`}
//                 >
//                   {existingImages.length ? (
//                     existingImages.map(
//                       (
//                         image,
//                         index
//                       ) => (
//                         <div
//                           key={
//                             image?.public_id ||
//                             index
//                           }
//                           className="relative shrink-0"
//                         >
//                           <img
//                             src={
//                               image?.url
//                             }
//                             alt=""
//                             className="h-24 w-32 rounded-xl border border-[#DCE5E9] object-cover"
//                           />

//                           <button
//                             type="button"
//                             onClick={() =>
//                               removeExistingImage(
//                                 index
//                               )
//                             }
//                             className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
//                           >
//                             <FiX
//                               size={
//                                 12
//                               }
//                             />
//                           </button>
//                         </div>
//                       )
//                     )
//                   ) : (
//                     <p className="text-[10px] text-[#91A2AC]">
//                       No existing
//                       images.
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
//                 <UploadCard
//                   icon={<FiImage />}
//                   label="Add Images"
//                   text={
//                     newImages.length
//                       ? `${newImages.length} selected`
//                       : "Multiple images"
//                   }
//                 >
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) =>
//                       setNewImages(
//                         Array.from(
//                           e.target
//                             .files || []
//                         )
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>

//                 <UploadCard
//                   icon={
//                     <FiFileText />
//                   }
//                   label="Floor Plan"
//                   text={
//                     floorPlan?.name ||
//                     "Replace file"
//                   }
//                 >
//                   <input
//                     type="file"
//                     onChange={(e) =>
//                       setFloorPlan(
//                         e.target
//                           .files?.[0] ||
//                           null
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>

//                 <UploadCard
//                   icon={
//                     <FiFileText />
//                   }
//                   label="RERA"
//                   text={
//                     reraCertificate?.name ||
//                     "Replace certificate"
//                   }
//                 >
//                   <input
//                     type="file"
//                     onChange={(e) =>
//                       setReraCertificate(
//                         e.target
//                           .files?.[0] ||
//                           null
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>

//                 <UploadCard
//                   icon={<FiVideo />}
//                   label="Video"
//                   text={
//                     video?.name ||
//                     "Upload walkthrough"
//                   }
//                 >
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) =>
//                       setVideo(
//                         e.target
//                           .files?.[0] ||
//                           null
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>
//               </div>
//             </SectionCard>
//           </div>

//           {/* FOOTER - ALWAYS VISIBLE */}
//           <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#E7EDF0] bg-white px-5 py-3 sm:px-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="h-[38px] rounded-lg border border-[#DCE5E9] px-5 text-xs font-semibold text-[#536779] transition hover:bg-[#F8FAFB]"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={saving}
//               className="h-[38px] rounded-lg bg-[#1F3C50] px-6 text-xs font-bold text-white transition hover:bg-[#123b36] disabled:opacity-50"
//             >
//               {saving
//                 ? "Updating..."
//                 : "Update Property"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function EditField({
//   label,
//   children,
// }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#91A2AC]">
//         {label}
//       </span>
//       {children}
//     </label>
//   );
// }

// function SectionCard({
//   title,
//   subtitle,
//   children,
// }) {
//   return (
//     <section className="mb-4 rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm sm:p-5">
//       <div className="mb-4">
//         <h3 className="text-sm font-extrabold text-[#173247]">
//           {title}
//         </h3>
//         <p className="mt-0.5 text-[10px] text-[#91A2AC]">
//           {subtitle}
//         </p>
//       </div>

//       {children}
//     </section>
//   );
// }

// function UploadCard({
//   icon,
//   label,
//   text,
//   children,
// }) {
//   return (
//     <div className="rounded-[16px] border border-dashed border-slate-300 bg-[#F8FAFB] p-4">
//       <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#25B98B] shadow-sm">
//         {icon}
//       </div>

//       <p className="mt-3 text-xs font-bold text-[#425A70]">
//         {label}
//       </p>

//       <p className="mt-1 truncate text-[10px] text-[#91A2AC]">
//         {text}
//       </p>

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    PROPERTY PREVIEW
// ========================================================= */

// function PropertyPreview({
//   open,
//   property,
//   onClose,
// }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [downloadingDoc, setDownloadingDoc] = useState("");

//   useBodyScrollLock(open);

//   useEffect(() => {
//     setSelectedImage(0);
//   }, [property]);

//   if (!open || !property) return null;

//   const images =
//     Array.isArray(property.images) &&
//     property.images.length > 0
//       ? property.images.filter(
//           (item) => item?.url
//         )
//       : [
//           {
//             url: "https://via.placeholder.com/1200x700?text=Property+Image",
//           },
//         ];

//   const locationText =
//     [
//       property.locality,
//       property.city,
//     ]
//       .filter(Boolean)
//       .join(", ") ||
//     "Location not available";

//   const money = (value) => {
//     const amount = Number(value || 0);

//     if (!amount) return "—";

//     return `₹${amount.toLocaleString(
//       "en-IN"
//     )}`;
//   };

//   const shortPrice = (value) => {
//     const amount = Number(value || 0);

//     if (!amount) return "Price not added";

//     if (amount >= 10000000) {
//       return `₹${(
//         amount / 10000000
//       ).toFixed(2)} Cr`;
//     }

//     if (amount >= 100000) {
//       return `₹${(
//         amount / 100000
//       ).toFixed(2)} L`;
//     }

//     return money(amount);
//   };

//   const floorPlanUrl =
//     typeof property.floorPlan ===
//     "string"
//       ? property.floorPlan
//       : property.floorPlan?.url || "";

//   const reraUrl =
//     typeof property.reraCertificate ===
//     "string"
//       ? property.reraCertificate
//       : property.reraCertificate?.url ||
//         "";

//   const uploadedVideoUrl =
//     typeof property.video === "string"
//       ? property.video
//       : property.video?.url || "";

//   const getYouTubeEmbedUrl = (
//     url = ""
//   ) => {
//     if (!url) return "";

//     try {
//       const parsed = new URL(url);

//       if (
//         parsed.hostname.includes(
//           "youtube.com"
//         )
//       ) {
//         if (
//           parsed.pathname.startsWith(
//             "/embed/"
//           )
//         ) {
//           return url;
//         }

//         const id =
//           parsed.searchParams.get("v");

//         return id
//           ? `https://www.youtube.com/embed/${id}`
//           : "";
//       }

//       if (
//         parsed.hostname.includes(
//           "youtu.be"
//         )
//       ) {
//         const id =
//           parsed.pathname
//             .replace("/", "")
//             .split("/")[0];

//         return id
//           ? `https://www.youtube.com/embed/${id}`
//           : "";
//       }

//       return "";
//     } catch {
//       return "";
//     }
//   };

//   const youtubeEmbed =
//     getYouTubeEmbedUrl(
//       property.videoLink || ""
//     );

//   const isDirectVideo = (
//     url = ""
//   ) =>
//     /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(
//       String(url)
//     );

//   const cleanFilePart = (
//     value,
//     fallback
//   ) =>
//     String(value || fallback)
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "_")
//       .replace(/_+/g, "_")
//       .replace(/^_+|_+$/g, "");

//   const getExtension = (
//     url,
//     fallback = "pdf"
//   ) => {
//     try {
//       const cleanUrl =
//         String(url || "").split("?")[0];

//       const filename =
//         cleanUrl.split("/").pop() || "";

//       const ext =
//         filename.includes(".")
//           ? filename
//               .split(".")
//               .pop()
//               .toLowerCase()
//           : "";

//       return ext &&
//         ext.length <= 6
//         ? ext
//         : fallback;
//     } catch {
//       return fallback;
//     }
//   };

//   const downloadDocument = async (
//     url,
//     type
//   ) => {
//     if (!url) return;

//     const propertyName =
//       cleanFilePart(
//         property.title,
//         property.propertyId ||
//           "Property"
//       );

//     const location =
//       cleanFilePart(
//         [
//           property.locality,
//           property.city,
//         ]
//           .filter(Boolean)
//           .join("_"),
//         "Location"
//       );

//     const documentName =
//       cleanFilePart(
//         type,
//         "Document"
//       );

//     const extension =
//       getExtension(url);

//     const filename =
//       `${propertyName}_${location}_${documentName}.${extension}`;

//     try {
//       setDownloadingDoc(type);

//       const response =
//         await fetch(url);

//       if (!response.ok) {
//         throw new Error(
//           "Document download failed"
//         );
//       }

//       const blob =
//         await response.blob();

//       const objectUrl =
//         URL.createObjectURL(blob);

//       const link =
//         document.createElement("a");

//       link.href = objectUrl;
//       link.download = filename;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       URL.revokeObjectURL(
//         objectUrl
//       );
//     } catch (error) {
//       console.error(
//         "Document Download Error:",
//         error
//       );

//       const link =
//         document.createElement("a");

//       link.href = url;
//       link.download = filename;
//       link.target = "_blank";
//       link.rel = "noreferrer";

//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } finally {
//       setDownloadingDoc("");
//     }
//   };

//   const previousImage = () =>
//     setSelectedImage((prev) =>
//       prev === 0
//         ? images.length - 1
//         : prev - 1
//     );

//   const nextImage = () =>
//     setSelectedImage((prev) =>
//       prev ===
//       images.length - 1
//         ? 0
//         : prev + 1
//     );

//   const DetailCard = ({
//     label,
//     value,
//     icon,
//   }) => (
//     <div className="rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
//       <div className="flex items-start gap-3">
//         {icon && (
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E9FBF6] text-[#168A70]">
//             {icon}
//           </div>
//         )}

//         <div className="min-w-0">
//           <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//             {label}
//           </p>

//           <p className="mt-1 break-words text-sm font-bold text-[#1F4256]">
//             {value === "" ||
//             value === null ||
//             value === undefined
//               ? "—"
//               : value}
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   const SectionHeading = ({
//     icon,
//     title,
//     subtitle,
//   }) => (
//     <div className="mb-5 flex items-start gap-3">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F4256] text-white">
//         {icon}
//       </div>

//       <div>
//         <h3 className="text-lg font-bold text-[#1F4256]">
//           {title}
//         </h3>

//         {subtitle && (
//           <p className="mt-0.5 text-xs leading-5 text-[#8197A2]">
//             {subtitle}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#102C3A]/75 p-2 backdrop-blur-sm sm:p-4">
//       <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">

//         {/* HEADER */}
//         <div className="relative shrink-0 overflow-hidden bg-[#1F4256] px-5 py-5 text-white sm:px-7">
//           <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-[#3ED6AE]/10" />
//           <div className="pointer-events-none absolute right-28 top-0 h-40 w-40 rounded-full bg-white/[0.04]" />

//           <div className="relative z-10 flex items-center justify-between gap-4">
//             <div className="min-w-0">
//               <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9BD8E5]">
//                 DIGINIWAS PROPERTY VIEW
//               </p>

//               <div className="mt-1 flex flex-wrap items-center gap-2">
//                 <h2 className="truncate text-xl font-bold sm:text-2xl">
//                   {property.title ||
//                     "Untitled Property"}
//                 </h2>

//                 <StatusBadge
//                   status={
//                     property.status
//                   }
//                 />
//               </div>

//               <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
//                 <FiMapPin size={14} />
//                 {locationText}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition hover:bg-white/20"
//             >
//               <FiX size={18} />
//             </button>
//           </div>
//         </div>

//         {/* SCROLL CONTENT */}
//         <div
//           className={`min-h-0 flex-1 overflow-y-auto bg-[#F4F7F8] ${SCROLLBAR_HIDDEN}`}
//         >
//           <div className="space-y-6 p-3 sm:p-6">

//             {/* IMAGE GALLERY */}
//             <section className="overflow-hidden rounded-3xl border border-[#DDE7EA] bg-white shadow-sm">
//               <div className="relative h-[280px] bg-slate-100 sm:h-[460px]">
//                 <img
//                   src={
//                     images[
//                       selectedImage
//                     ]?.url
//                   }
//                   alt={
//                     property.title ||
//                     "Property"
//                   }
//                   className="h-full w-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

//                 <div className="absolute left-4 top-4 flex flex-wrap gap-2">
//                   <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
//                     {formatStatus(
//                       property.status
//                     )}
//                   </span>

//                   {property.transactionType && (
//                     <span className="rounded-full bg-[#E9FBF6]/95 px-3 py-1.5 text-xs font-bold text-[#168A70] shadow-sm">
//                       {
//                         property.transactionType
//                       }
//                     </span>
//                   )}

//                   {property.category && (
//                     <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
//                       {
//                         property.category
//                       }
//                     </span>
//                   )}
//                 </div>

//                 {images.length > 1 && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={
//                         previousImage
//                       }
//                       className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
//                     >
//                       <FiChevronLeft
//                         size={20}
//                       />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={nextImage}
//                       className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
//                     >
//                       <FiChevronRight
//                         size={20}
//                       />
//                     </button>
//                   </>
//                 )}

//                 <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
//                   <div className="min-w-0 text-white">
//                     <p className="text-xs text-white/70">
//                       {property.propertyId ||
//                         "Property Listing"}
//                     </p>

//                     <h3 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
//                       {property.title ||
//                         "Untitled Property"}
//                     </h3>

//                     <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
//                       <FiMapPin />
//                       {
//                         locationText
//                       }
//                     </p>
//                   </div>

//                   <div className="shrink-0 rounded-2xl bg-black/35 px-4 py-3 text-right text-white backdrop-blur">
//                     <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">
//                       Listing Price
//                     </p>

//                     <p className="mt-1 text-xl font-bold">
//                       {shortPrice(
//                         property.price
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {images.length > 1 && (
//                 <div
//                   className={`flex gap-3 overflow-x-auto p-4 ${SCROLLBAR_HIDDEN}`}
//                 >
//                   {images.map(
//                     (
//                       image,
//                       index
//                     ) => (
//                       <button
//                         type="button"
//                         key={
//                           image.url ||
//                           index
//                         }
//                         onClick={() =>
//                           setSelectedImage(
//                             index
//                           )
//                         }
//                         className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
//                           selectedImage ===
//                           index
//                             ? "border-[#3ED6AE]"
//                             : "border-transparent"
//                         }`}
//                       >
//                         <img
//                           src={
//                             image.url
//                           }
//                           alt=""
//                           className="h-full w-full object-cover"
//                         />

//                         <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">
//                           {index + 1}
//                         </span>
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </section>

//             {/* PRICING */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiDollarSign
//                     size={20}
//                   />
//                 }
//                 title="Pricing & Commercial Details"
//                 subtitle="Complete commercial and transaction information."
//               />

//               <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                 <DetailCard
//                   label="Total Price"
//                   value={money(
//                     property.price
//                   )}
//                   icon={
//                     <FiDollarSign />
//                   }
//                 />

//                 <DetailCard
//                   label="Price / Sq.Ft"
//                   value={
//                     property.pricePerSqft
//                       ? money(
//                           property.pricePerSqft
//                         )
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Booking Amount"
//                   value={money(
//                     property.bookingAmount
//                   )}
//                 />

//                 <DetailCard
//                   label="Maintenance"
//                   value={money(
//                     property.maintenance
//                   )}
//                 />

//                 <DetailCard
//                   label="Negotiable"
//                   value={
//                     property.negotiable
//                       ? "Yes"
//                       : "No"
//                   }
//                 />

//                 <DetailCard
//                   label="Transaction Type"
//                   value={
//                     property.transactionType ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Category"
//                   value={
//                     property.category ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Property ID"
//                   value={
//                     property.propertyId ||
//                     "—"
//                   }
//                 />
//               </div>
//             </section>

//             {/* LOCATION */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiNavigation
//                     size={20}
//                   />
//                 }
//                 title="Location Details"
//                 subtitle="Property address and geographic coordinates."
//               />

//               <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <DetailCard
//                     label="City"
//                     value={
//                       property.city ||
//                       "—"
//                     }
//                     icon={
//                       <FiMapPin />
//                     }
//                   />

//                   <DetailCard
//                     label="Locality"
//                     value={
//                       property.locality ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="PIN Code"
//                     value={
//                       property.pinCode ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Latitude"
//                     value={
//                       property.latitude ??
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Longitude"
//                     value={
//                       property.longitude ??
//                       "—"
//                     }
//                   />

//                   <div className="sm:col-span-2">
//                     <DetailCard
//                       label="Full Address"
//                       value={
//                         property.address ||
//                         "—"
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="overflow-hidden rounded-2xl border border-[#DDE7EA] bg-[#EEF3F5]">
//                   {property.latitude &&
//                   property.longitude ? (
//                     <iframe
//                       title="Property location"
//                       width="100%"
//                       height="100%"
//                       className="min-h-[300px]"
//                       loading="lazy"
//                       src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
//                     />
//                   ) : (
//                     <div className="flex min-h-[300px] items-center justify-center text-sm text-[#8197A2]">
//                       Location map not
//                       available
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </section>

//             {/* SPECS */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiHome size={20} />
//                 }
//                 title="Property Specifications"
//                 subtitle="Area, room, floor, parking and furnishing information."
//               />

//               <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                 <DetailCard
//                   label="Property Size"
//                   value={
//                     property.propertySize
//                       ? `${
//                           property.propertySize
//                         } ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                   icon={
//                     <FiMaximize2 />
//                   }
//                 />

//                 <DetailCard
//                   label="Super Built-up Area"
//                   value={
//                     property.superBuiltupArea
//                       ? `${property.superBuiltupArea} ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Carpet Area"
//                   value={
//                     property.carpetArea
//                       ? `${property.carpetArea} ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Bedrooms"
//                   value={
//                     property.bedrooms ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Bathrooms"
//                   value={
//                     property.bathrooms ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Balconies"
//                   value={
//                     property.balconies ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Parking"
//                   value={
//                     property.parking ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Floor No."
//                   value={
//                     property.floorNo ??
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Total Floors"
//                   value={
//                     property.totalFloors ??
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Facing"
//                   value={
//                     property.facing ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Furnishing"
//                   value={
//                     property.furnishing ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Size Unit"
//                   value={
//                     property.sizeUnit ||
//                     "—"
//                   }
//                 />
//               </div>
//             </section>

//             {/* PROJECT */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiGrid size={20} />
//                 }
//                 title="Project Information"
//                 subtitle="Project, developer and property description."
//               />

//               <div className="grid gap-3 sm:grid-cols-2">
//                 <DetailCard
//                   label="Project Name"
//                   value={
//                     property.projectName ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Developer Name"
//                   value={
//                     property.developerName ||
//                     "—"
//                   }
//                 />
//               </div>

//               <div className="mt-4 rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
//                 <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                   Description
//                 </p>

//                 <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#536779]">
//                   {property.description ||
//                     "Description has not been added."}
//                 </p>
//               </div>
//             </section>

//             {/* AMENITIES */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiCheckCircle
//                     size={20}
//                   />
//                 }
//                 title="Amenities & Property Tags"
//                 subtitle="Features and highlights associated with this listing."
//               />

//               <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                 Amenities
//               </p>

//               {property.amenities
//                 ?.length ? (
//                 <div className="flex flex-wrap gap-2">
//                   {property.amenities.map(
//                     (
//                       amenity,
//                       index
//                     ) => (
//                       <span
//                         key={
//                           index
//                         }
//                         className="rounded-full border border-[#3ED6AE]/30 bg-[#E9FBF6] px-3 py-1.5 text-xs font-bold text-[#168A70]"
//                       >
//                         {
//                           amenity
//                         }
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-[#8197A2]">
//                   No amenities added.
//                 </p>
//               )}

//               <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                 Property Tags
//               </p>

//               {property.tags?.length ? (
//                 <div className="flex flex-wrap gap-2">
//                   {property.tags.map(
//                     (
//                       tag,
//                       index
//                     ) => (
//                       <span
//                         key={
//                           index
//                         }
//                         className="rounded-full bg-[#1F4256]/5 px-3 py-1.5 text-xs font-bold text-[#1F4256]"
//                       >
//                         #{tag}
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-[#8197A2]">
//                   No tags added.
//                 </p>
//               )}
//             </section>

//             {/* VIDEO */}
//             {(uploadedVideoUrl ||
//               property.videoLink) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiVideo
//                       size={20}
//                     />
//                   }
//                   title="Property Video / Walkthrough"
//                   subtitle="Watch the property video directly from Property Management."
//                 />

//                 {uploadedVideoUrl && (
//                   <div className="overflow-hidden rounded-2xl bg-black">
//                     <video
//                       src={
//                         uploadedVideoUrl
//                       }
//                       controls
//                       playsInline
//                       preload="metadata"
//                       className="max-h-[560px] w-full"
//                     />
//                   </div>
//                 )}

//                 {!uploadedVideoUrl &&
//                   youtubeEmbed && (
//                     <div className="aspect-video overflow-hidden rounded-2xl bg-black">
//                       <iframe
//                         src={
//                           youtubeEmbed
//                         }
//                         title="Property walkthrough"
//                         className="h-full w-full"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       />
//                     </div>
//                   )}

//                 {!uploadedVideoUrl &&
//                   !youtubeEmbed &&
//                   isDirectVideo(
//                     property.videoLink
//                   ) && (
//                     <video
//                       src={
//                         property.videoLink
//                       }
//                       controls
//                       playsInline
//                       className="max-h-[560px] w-full rounded-2xl bg-black"
//                     />
//                   )}

//                 {!uploadedVideoUrl &&
//                   !youtubeEmbed &&
//                   property.videoLink &&
//                   !isDirectVideo(
//                     property.videoLink
//                   ) && (
//                     <a
//                       href={
//                         property.videoLink
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center justify-between rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-sm font-bold text-[#1F4256] transition hover:border-[#3ED6AE]"
//                     >
//                       <span>
//                         Open Property
//                         Walkthrough
//                       </span>

//                       <FiVideo />
//                     </a>
//                   )}
//               </section>
//             )}

//             {/* DOCUMENTS */}
//             {(floorPlanUrl ||
//               reraUrl) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiFileText
//                       size={20}
//                     />
//                   }
//                   title="Property Documents"
//                   subtitle="Download property documents with a clean property and location based file name."
//                 />

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {floorPlanUrl && (
//                     <button
//                       type="button"
//                       disabled={
//                         downloadingDoc ===
//                         "Floor_Plan"
//                       }
//                       onClick={() =>
//                         downloadDocument(
//                           floorPlanUrl,
//                           "Floor_Plan"
//                         )
//                       }
//                       className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F4256] text-white">
//                           <FiFileText />
//                         </div>

//                         <div>
//                           <p className="font-bold text-[#1F4256]">
//                             Floor Plan
//                           </p>

//                           <p className="mt-1 text-xs text-[#8197A2]">
//                             {downloadingDoc ===
//                             "Floor_Plan"
//                               ? "Downloading..."
//                               : "Click to download"}
//                           </p>
//                         </div>
//                       </div>

//                       <FiUpload className="rotate-180 text-[#168A70]" />
//                     </button>
//                   )}

//                   {reraUrl && (
//                     <button
//                       type="button"
//                       disabled={
//                         downloadingDoc ===
//                         "RERA_Certificate"
//                       }
//                       onClick={() =>
//                         downloadDocument(
//                           reraUrl,
//                           "RERA_Certificate"
//                         )
//                       }
//                       className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ED6AE] text-[#173247]">
//                           <FiFileText />
//                         </div>

//                         <div>
//                           <p className="font-bold text-[#1F4256]">
//                             RERA Certificate
//                           </p>

//                           <p className="mt-1 text-xs text-[#8197A2]">
//                             {downloadingDoc ===
//                             "RERA_Certificate"
//                               ? "Downloading..."
//                               : "Click to download"}
//                           </p>
//                         </div>
//                       </div>

//                       <FiUpload className="rotate-180 text-[#168A70]" />
//                     </button>
//                   )}
//                 </div>
//               </section>
//             )}

//             {/* CREATOR */}
//             {(property.addedBy ||
//               property.createdBy) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiUser size={20} />
//                   }
//                   title="Property Ownership & Creator"
//                   subtitle="Information about who added this property."
//                 />

//                 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                   <DetailCard
//                     label="Created By"
//                     value={
//                       property.addedBy
//                         ?.name ||
//                       property.createdBy
//                         ?.name ||
//                       property.addedBy
//                         ?.role ||
//                       property.createdBy
//                         ?.role ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Creator Role"
//                     value={
//                       property.addedBy
//                         ?.role ||
//                       property.createdBy
//                         ?.role ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Creator ID"
//                     value={
//                       property.addedBy
//                         ?.id ||
//                       property.createdBy
//                         ?.id ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Status"
//                     value={formatStatus(
//                       property.status
//                     )}
//                   />
//                 </div>
//               </section>
//             )}

//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="h-11 rounded-xl bg-[#1F4256] px-6 text-sm font-bold text-white transition hover:bg-[#18394B]"
//               >
//                 Close Property View
//               </button>
//             </div>

//             <div className="h-1" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PreviewRow({
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <span className="text-[10px] text-white/55">
//         {label}
//       </span>
//       <span className="max-w-[60%] truncate text-right text-[10px] font-bold text-white">
//         {value || "-"}
//       </span>
//     </div>
//   );
// }

// function PropertyStat({
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-[#91A2AC]">
//         {label}
//       </p>
//       <p className="mt-2 text-lg font-extrabold text-[#173247]">
//         {value || "-"}
//       </p>
//     </div>
//   );
// }

// function InfoPanel({
//   title,
//   icon,
//   children,
//   className = "",
// }) {
//   return (
//     <section
//       className={`rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm sm:p-5 ${className}`}
//     >
//       <div className="mb-4 flex items-center gap-2">
//         <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#25B98B]">
//           {icon}
//         </div>
//         <h3 className="text-sm font-extrabold text-[#173247]">
//           {title}
//         </h3>
//       </div>

//       {children}
//     </section>
//   );
// }

// function DetailItem({
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-start justify-between gap-4 border-b border-[#E7EDF0] py-2.5 last:border-b-0">
//       <span className="text-[10px] text-[#91A2AC]">
//         {label}
//       </span>
//       <span className="max-w-[60%] break-words text-right text-[10px] font-bold text-[#425A70]">
//         {value === 0
//           ? 0
//           : value || "-"}
//       </span>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  getAllPropertiesApi,
  getPropertyByIdApi,
  deletePropertyApi,
  updatePropertyApi,
  updatePropertyStatusApi,
} from "../../../Services/propertyService";
import {
  FiFilter,
  FiUpload,
  FiEye,
  FiEdit2,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiTrash2,
  FiX,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiHome,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiGrid,
  FiImage,
  FiFileText,
  FiVideo,
  FiDollarSign,
  FiMaximize2,
  FiNavigation,
  FiPlus,
} from "react-icons/fi";

import {
  MdOutlineCheckCircle,
  MdOutlineAutoAwesome,
  MdTrendingUp,
  MdVerified,
  MdOutlinePhotoLibrary,
} from "react-icons/md";

import { BsRobot } from "react-icons/bs";
import Swal from "sweetalert2";

const DARK = "#1F3C50";
const ACCENT = "#35C99A";

const SCROLLBAR_HIDDEN =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (value) =>
  `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

const formatStatus = (value) =>
  String(value || "-").replaceAll("_", " ");

function StatusBadge({ status }) {
  const styles = {
    Draft: "bg-[#F4F7F8] text-[#536779] border-[#DCE5E9]",
    Submitted: "bg-[#EEF6FF] text-[#2E90FA] border-blue-200",
    Assigned_To_Partner:
      "bg-cyan-50 text-cyan-700 border-cyan-200",
    Reviewing:
      "bg-[#FFF5E8] text-[#D97706] border-amber-200",
    Verified:
      "bg-[#EAF9F4] text-[#15966F] border-[#35C99A]/30",
    Live:
      "bg-[#EAF9F4] text-[#15966F] border-green-200",
    Rejected:
      "bg-red-50 text-red-700 border-red-200",
    Sold:
      "bg-purple-50 text-purple-700 border-purple-200",
    Rented:
      "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <span
      className={`inline-flex max-w-full items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-1.5 py-1 text-[10px] font-bold sm:px-2 sm:text-[10px] lg:px-2.5 lg:text-[10px] ${
        styles[status] || "bg-[#F4F7F8] text-[#536779] border-[#DCE5E9]"
      }`}
    >
      {formatStatus(status)}
    </span>
  );
}

function CreatorBadge({ role }) {
  const styles = {
    Admin: "bg-[#EEF6FF] text-[#2E90FA]",
    Partner: "bg-[#EAF9F4] text-[#15966F]",
    Seller: "bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
        styles[role] || "bg-gray-100 text-[#536779]"
      }`}
    >
      {role || "Unknown"}
    </span>
  );
}


/* =========================================================
   CUSTOM HOVER TOOLTIP
========================================================= */

function HoverTooltip({
  children,
  text,
  position = "top",
  className = "",
}) {
  if (!text) {
    return children;
  }

  const positions = {
    top:
      "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom:
      "top-full left-1/2 -translate-x-1/2 mt-2",
    left:
      "right-full top-1/2 -translate-y-1/2 mr-2",
    right:
      "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrows = {
    top:
      "left-1/2 top-full -translate-x-1/2 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#173247]",
    bottom:
      "left-1/2 bottom-full -translate-x-1/2 border-x-[6px] border-x-transparent border-b-[6px] border-b-[#173247]",
    left:
      "left-full top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-[#173247]",
    right:
      "right-full top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#173247]",
  };

  return (
    <div
      className={`group/tooltip relative min-w-0 ${className}`}
    >
      {children}

      <div
        className={`
          pointer-events-none
          absolute
          ${positions[position]}
          z-[99999]
          invisible
          w-max
          max-w-[300px]
          translate-y-1
          rounded-xl
          bg-[#173247]
          px-3
          py-2
          text-[10px]
          font-semibold
          leading-4
          text-white
          opacity-0
          shadow-[0_10px_30px_rgba(15,23,42,0.25)]
          transition-all
          duration-150
          group-hover/tooltip:visible
          group-hover/tooltip:translate-y-0
          group-hover/tooltip:opacity-100
        `}
      >
        <span className="block break-words">
          {text}
        </span>

        <span
          className={`absolute h-0 w-0 ${arrows[position]}`}
        />
      </div>
    </div>
  );
}

function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [locked]);
}

/* =========================================================
   AI ASSISTANT
========================================================= */

function AIAssistant({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-[370px] overflow-hidden rounded-[16px] border border-[#DCE5E9] bg-white shadow-2xl sm:right-6">
      <div className="flex items-center justify-between border-b border-[#E7EDF0] bg-[#EAF9F4] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: DARK }}
          >
            <BsRobot size={16} />
          </div>

          <div>
            <p className="text-xs font-extrabold text-[#173247]">
              AI Property Assistant
            </p>
            <p className="text-[10px] text-[#91A2AC]">
              Smart listing workflows
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#91A2AC] transition hover:bg-white hover:text-[#425A70]"
        >
          <FiX size={15} />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <p className="text-[11px] leading-5 text-[#7D8C9C]">
          Select a property to unlock AI assisted listing workflows.
        </p>

        <button className="flex w-full items-center justify-between rounded-xl bg-[#25B98B] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#15966F]">
          Generate Description
          <MdOutlineAutoAwesome size={16} />
        </button>

        <button className="flex w-full items-center justify-between rounded-xl border border-[#35C99A]/30 bg-[#EAF9F4] px-4 py-3 text-xs font-semibold text-[#15966F] transition hover:bg-[#EAF9F4]">
          Suggest Price
          <MdTrendingUp size={16} />
        </button>

        <div className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFB] px-3 py-3">
          <FiInfo
            size={14}
            className="mt-0.5 shrink-0 text-[#91A2AC]"
          />
          <p className="text-[10px] leading-4 text-[#7D8C9C]">
            DIGINIWAS AI can help optimize descriptions, pricing,
            positioning and lead capture.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function PropertyManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const openPropertyFromRoute = async () => {
      try {
        const response = await getPropertyByIdApi(id);

        if (cancelled) return;

        if (response?.success && response?.data) {
          setSelectedProperty(response.data);
          setPreviewOpen(true);
        } else {
          throw new Error("Property details were not returned by the API.");
        }
      } catch (error) {
        if (cancelled) return;

        console.error("Property Detail Error:", error);

        await Swal.fire({
          icon: "error",
          title: "Property Not Found",
          text:
            error?.response?.data?.message ||
            error?.message ||
            "Unable to load property details.",
          confirmButtonColor: DARK,
        });

        navigate("/property-management", { replace: true });
      }
    };

    openPropertyFromRoute();

    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  const [editOpen, setEditOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [counts, setCounts] = useState({
    all: 0,
    admin: 0,
    partner: 0,
    seller: 0,
    draft: 0,
  });

  // =========================================================
  // PAGINATION
  // Show 5 properties per page
  // =========================================================
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = [
    "All",
    "Submitted",
    "Assigned_To_Partner",
    "Reviewing",
    "Verified",
    "Live",
    "Rejected",
    "Sold",
    "Rented",
  ];

  /* =========================================================
     FETCH
  ========================================================= */

  const getProperties = async () => {
    try {
      setLoading(true);

      // =========================================================
      // 1. FETCH CURRENT TABLE DATA
      // =========================================================
      // This request respects the currently selected tab,
      // status, city and search filters.
      const response = await getAllPropertiesApi({
        role:
          selectedRole === "All" || selectedRole === "Draft"
            ? ""
            : selectedRole,
        draftOnly: selectedRole === "Draft",
        status:
          selectedRole === "Draft"
            ? "Draft"
            : selectedStatus === "All"
              ? ""
              : selectedStatus,
        city: selectedCity === "All" ? "" : selectedCity,
        search: search.trim(),
      });

      // =========================================================
      // 2. FETCH ALL PROPERTIES FOR TAB COUNTS
      // =========================================================
      // Counts must be independent of the currently selected tab,
      // status, city or search filter.
      const countResponse = await getAllPropertiesApi({
        role: "",
        draftOnly: false,
        status: "",
        city: "",
        search: "",
      });

      if (response?.success) {
        const apiProperties = Array.isArray(response?.data)
          ? response.data
          : [];

        // =========================================================
        // CURRENT TABLE DATA
        // =========================================================
        // Draft properties are hidden from All/Admin/Partner/Seller.
        // Draft tab shows only Admin-created draft properties.
        const visibleProperties =
          selectedRole === "Draft"
            ? apiProperties.filter(
                (item) =>
                  String(item?.status || "")
                    .trim()
                    .toLowerCase() === "draft" &&
                  String(item?.addedBy?.role || "")
                    .trim()
                    .toLowerCase() === "admin"
              )
            : apiProperties.filter(
                (item) =>
                  String(item?.status || "")
                    .trim()
                    .toLowerCase() !== "draft"
              );

        setProperties(visibleProperties);

        // =========================================================
        // TAB COUNTS
        // =========================================================
        // IMPORTANT:
        // Draft properties are NOT counted in All/Admin/Partner/Seller.
        // Only Admin-created drafts are shown in the Draft tab count.
        const allProperties = Array.isArray(countResponse?.data)
          ? countResponse.data
          : [];

        const nonDraftProperties = allProperties.filter(
          (item) =>
            String(item?.status || "")
              .trim()
              .toLowerCase() !== "draft"
        );

        const adminCount = nonDraftProperties.filter(
          (item) =>
            String(item?.addedBy?.role || "")
              .trim()
              .toLowerCase() === "admin"
        ).length;

        const partnerCount = nonDraftProperties.filter(
          (item) =>
            String(item?.addedBy?.role || "")
              .trim()
              .toLowerCase() === "partner"
        ).length;

        const sellerCount = nonDraftProperties.filter(
          (item) =>
            String(item?.addedBy?.role || "")
              .trim()
              .toLowerCase() === "seller"
        ).length;

        const draftAdminCount = allProperties.filter(
          (item) =>
            String(item?.status || "")
              .trim()
              .toLowerCase() === "draft" &&
            String(item?.addedBy?.role || "")
              .trim()
              .toLowerCase() === "admin"
        ).length;

        setCounts({
          all: nonDraftProperties.length,
          admin: adminCount,
          partner: partnerCount,
          seller: sellerCount,
          draft: draftAdminCount,
        });
      } else {
        setProperties([]);
        setCounts({
          all: 0,
          admin: 0,
          partner: 0,
          seller: 0,
          draft: 0,
        });
      }
    } catch (error) {
      console.error(
        "GET PROPERTIES ERROR:",
        error?.response?.data || error
      );
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getProperties();
    }, 300);

    return () => clearTimeout(timer);
  }, [
    selectedRole,
    selectedStatus,
    selectedCity,
    search,
  ]);

  // =========================================================
  // SORT
  // =========================================================

  const getLatestDate = (item) => {
    const dateValue =
      item?.createdAt ||
      item?.updatedAt ||
      item?.createdDate ||
      item?.date;

    const time = dateValue ? new Date(dateValue).getTime() : 0;
    return Number.isNaN(time) ? 0 : time;
  };

  // Latest properties first
  const sortedProperties = useMemo(
    () =>
      [...properties].sort(
        (a, b) => getLatestDate(b) - getLatestDate(a)
      ),
    [properties]
  );

  // =========================================================
  // PAGINATION CALCULATIONS
  // =========================================================
  const totalPages = Math.max(
    1,
    Math.ceil(sortedProperties.length / ITEMS_PER_PAGE)
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = Math.min(
    startIndex + ITEMS_PER_PAGE,
    sortedProperties.length
  );

  const paginatedProperties = useMemo(
    () =>
      sortedProperties.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      ),
    [sortedProperties, startIndex]
  );

  // Reset to page 1 whenever the selected tab/filter/search changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedRole,
    selectedStatus,
    selectedCity,
    search,
  ]);

  // Keep the current page valid after delete/filter/API updates.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const cityOptions = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          properties
            .map((item) => item?.city)
            .filter(Boolean)
        )
      ).sort(),
    ],
    [properties]
  );

  const roleTabs = [
    { label: "All", count: counts.all, icon: FiGrid },
    { label: "Admin", count: counts.admin, icon: FiUser },
    { label: "Partner", count: counts.partner, icon: FiCheckCircle },
    { label: "Seller", count: counts.seller, icon: FiHome },
    { label: "Draft", count: counts.draft, icon: FiFileText },
  ];

  const filteredSummary = useMemo(() => {
    return {
      verified: properties.filter(
        (p) => p.status === "Verified"
      ).length,
      live: properties.filter(
        (p) => p.status === "Live"
      ).length,
      reviewing: properties.filter(
        (p) =>
          p.status === "Reviewing" ||
          p.status === "Assigned_To_Partner"
      ).length,
    };
  }, [properties]);

  /* =========================================================
     ACTIONS
  ========================================================= */

  const handleDeleteProperty = async (id) => {
    const property = properties.find(
      (item) => item?._id === id
    );

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Property?",
      html: `
        <div style="font-size:13px;color:#64748b;line-height:1.6">
          Are you sure you want to delete
          <strong style="color:#1F3C50">
            ${property?.title || "this property"}
          </strong>
          ${
            property?.propertyId
              ? `(${property.propertyId})`
              : ""
          }?
          <br/>
          <span style="color:#dc2626;font-weight:600">
            This action cannot be undone.
          </span>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const response =
        await deletePropertyApi(id);

      if (response?.success) {
        await Swal.fire({
          icon: "success",
          title: "Property Deleted",
          text:
            response?.message ||
            "Property deleted successfully.",
          confirmButtonColor: DARK,
        });

        await getProperties();
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          "Unable to delete property.",
        confirmButtonColor: DARK,
      });
    }
  };

  const handleVerifyProperty = async (property) => {
    if (property?.status === "Verified") {
      await Swal.fire({
        icon: "info",
        title: "Already Verified",
        text: "This property is already verified.",
        confirmButtonColor: DARK,
      });

      return;
    }

    const result = await Swal.fire({
      icon: "question",
      title: "Verify Property?",
      html: `
        <div style="font-size:13px;color:#64748b;line-height:1.6">
          Verify
          <strong style="color:#1F3C50">
            ${property?.title || "this property"}
          </strong>
          ${
            property?.propertyId
              ? `(${property.propertyId})`
              : ""
          }?
          <br/>
          Status will be changed to
          <strong style="color:#25B98B">Verified</strong>.
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, Verify",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#25B98B",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const response =
        await updatePropertyStatusApi(
          property._id,
          {
            status: "Verified",
            notes:
              "Property verified by admin from Property Management.",
          }
        );

      if (response?.success) {
        await Swal.fire({
          icon: "success",
          title: "Property Verified",
          text:
            response?.message ||
            "Property verified successfully.",
          confirmButtonColor: "#25B98B",
        });

        await getProperties();
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text:
          error?.response?.data?.message ||
          "Unable to verify property.",
        confirmButtonColor: DARK,
      });
    }
  };

  const handleOpenPreview = async (property) => {
    try {
      const response =
        await getPropertyByIdApi(
          property._id
        );

      setSelectedProperty(
        response?.data || property
      );
    } catch (error) {
      setSelectedProperty(property);
    }

    setPreviewOpen(true);
  };

  const handleOpenEdit = async (property) => {
    try {
      const response =
        await getPropertyByIdApi(
          property._id
        );

      setEditingProperty(
        response?.data || property
      );
    } catch (error) {
      setEditingProperty(property);
    }

    setEditOpen(true);
  };

  const handlePropertyUpdated = async () => {
    setEditOpen(false);
    setEditingProperty(null);
    await getProperties();
  };

  const clearFilters = () => {
    setSelectedRole("All");
    setSelectedStatus("All");
    setSelectedCity("All");
    setSearch("");
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen font-sans text-[#173247]">
      <div className="mx-auto w-full max-w-[1500px] px-1 py-2 sm:px-1 lg:px-1">
        {/* ================= DIGINIWAS HEADER ================= */}
        <section className="relative mb-3 overflow-hidden rounded-[20px] bg-[#1F3C50] px-5 py-5 shadow-sm md:px-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#35C99A]/10" />
          <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#35C99A] text-white shadow-sm">
                <FiHome size={20} />
              </div>

              <div>
                {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9FB3C0]">
                  DigiNiwas Admin
                </p> */}

                <h1 className="mt-0.5 text-xl font-bold tracking-tight text-white md:text-2xl">
                  Property Management
                </h1>

                <p className="mt-1 text-xs text-[#C3D0D8]">
                  Manage, verify and maintain properties added by Admin, Partner and Seller
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#35C99A]" />
              <div>
                <p className="text-[9px] font-medium uppercase tracking-wide text-[#AFC0CA]">
                  Current View
                </p>
                <p className="text-xs font-semibold text-white">
                  Property Directory
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ACTION BAR ================= */}
        <section className="mb-3 rounded-[18px] border border-[#DCE5E9] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-[#1F3C50] px-4 py-2.5 text-xs font-semibold text-white shadow-sm">
                <FiGrid size={14} />
                Dashboard
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/add-property")}
                className="flex h-[38px] items-center gap-2 rounded-lg bg-[#35C99A] px-4 text-[10px] font-extrabold text-[#173247] transition hover:bg-[#2DB98C]"
              >
                <FiPlus size={14} />
                Add Property
              </button>

              <button
                type="button"
                onClick={() => setFilterOpen((prev) => !prev)}
                className={`flex h-[38px] items-center gap-2 rounded-lg border px-4 text-[10px] font-semibold transition ${
                  filterOpen
                    ? "border-[#1F3C50] bg-[#1F3C50] text-white"
                    : "border-[#DCE5E9] bg-white text-[#536779] hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
                }`}
              >
                <FiFilter size={13} />
                Filters
                {filterOpen ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
              </button>

              <button
                type="button"
                className="flex h-[38px] items-center gap-2 rounded-lg border border-[#DCE5E9] bg-white px-4 text-[10px] font-semibold text-[#536779] transition hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
              >
                <FiUpload size={13} />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Visible Properties"
            value={properties.length}
            icon={<FiGrid />}
          />

          <SummaryCard
            label="Reviewing"
            value={filteredSummary.reviewing}
            icon={<FiClock />}
            tone="amber"
          />

          <SummaryCard
            label="Verified"
            value={filteredSummary.verified}
            icon={<FiCheckCircle />}
            tone="emerald"
          />

          <SummaryCard
            label="Live"
            value={filteredSummary.live}
            icon={<MdVerified />}
            tone="green"
          />
        </section>

        {/* CREATOR TABS */}
        <section className="mb-3 rounded-[18px] border border-[#DCE5E9] bg-white p-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div
            className={`flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${SCROLLBAR_HIDDEN}`}
          >
            {roleTabs.map(
              ({ label, count, icon: Icon }) => {
                const active =
                  selectedRole === label;

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setSelectedRole(label);
                      if (label === "Draft") setSelectedStatus("All");
                    }}
                    className={`flex min-w-max items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                      active
                        ? "bg-[#1F3C50] text-white shadow-sm"
                        : "bg-[#F2F6F7] text-[#667B88] hover:bg-[#EAF9F4] hover:text-[#15966F]"
                    }`}
                  >
                    <Icon size={13} />
                    {label}

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-[#F1F5F6] text-[#7D8C9C]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* SEARCH + FILTERS */}
        <section className="mb-4 rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <FiSearch
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by property ID, title, city, locality or creator..."
                className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-white pl-9 pr-4 text-xs font-medium text-[#173247] outline-none transition placeholder:text-[#9DABB3] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
              />
            </div>

            {filterOpen && (
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(
                      e.target.value
                    )
                  }
                  className="h-10 min-w-[180px] rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs font-semibold text-[#526A78] outline-none focus:border-[#35C99A]"
                >
                  {statusOptions.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item === "All"
                          ? "All Status"
                          : formatStatus(item)}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={selectedCity}
                  onChange={(e) =>
                    setSelectedCity(
                      e.target.value
                    )
                  }
                  className="h-10 min-w-[165px] rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs font-semibold text-[#526A78] outline-none focus:border-[#35C99A]"
                >
                  {cityOptions.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item === "All"
                          ? "All Cities"
                          : item}
                      </option>
                    )
                  )}
                </select>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-[38px] rounded-lg border border-[#DCE5E9] px-4 text-xs font-semibold text-[#7D8C9C] transition hover:bg-[#F8FAFB]"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ACTIVE FILTER CHIPS */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#91A2AC]">
            Showing
          </span>

          <FilterChip>
            {selectedRole === "All"
              ? "All Creators"
              : `${selectedRole} Added`}
          </FilterChip>

          {selectedStatus !== "All" && (
            <FilterChip tone="amber">
              {formatStatus(selectedStatus)}
            </FilterChip>
          )}

          {selectedCity !== "All" && (
            <FilterChip tone="blue">
              {selectedCity}
            </FilterChip>
          )}
        </div>

        {/* TABLE CARD */}
        <section className="relative overflow-visible rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="flex items-center justify-between border-b border-[#E7EDF0] bg-[#F8FAFB] px-4 py-3 sm:px-5">
            <div>
              <h2 className="text-[11px] font-bold text-[#173247]">
                Property Directory
              </h2>

              <p className="mt-0.5 text-[10px] text-[#91A2AC]">
                Draft properties are hidden from this admin view.
              </p>
            </div>

            <span className="rounded-full bg-[#F1F5F6] px-2.5 py-1 text-[10px] font-bold text-[#7D8C9C]">
              {properties.length}
            </span>
          </div>

          {/* 
            RESPONSIVE PROPERTY DIRECTORY
            - No horizontal scrollbar
            - Table always fits available screen width
            - Less important columns hide on smaller screens
          */}
          <div className="relative w-full overflow-visible">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[34%] sm:w-[29%] lg:w-[24%]" />
                <col className="hidden sm:table-column sm:w-[17%] lg:w-[14%]" />
                <col className="hidden lg:table-column lg:w-[15%]" />
                <col className="w-[18%] sm:w-[15%] lg:w-[11%]" />
                <col className="w-[24%] sm:w-[18%] lg:w-[13%]" />
                <col className="hidden xl:table-column xl:w-[15%]" />
                <col className="w-[24%] sm:w-[21%] lg:w-[13%] xl:w-[8%]" />
              </colgroup>

              <thead>
                <tr className="bg-[#1F3C50] text-white">
                  <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
                    Property
                  </th>

                  <th className="hidden px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:table-cell sm:px-3 sm:text-[10px]">
                    Added By
                  </th>

                  <th className="hidden px-3 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white lg:table-cell">
                    Location
                  </th>

                  <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
                    Status
                  </th>

                  <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
                    Market Price
                  </th>

                  <th className="hidden px-3 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white xl:table-cell">
                    Assigned Partner
                  </th>

                  <th className="px-1 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-2 sm:text-[10px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <TableLoading />
                ) : properties.length === 0 ? (
                  <TableEmpty />
                ) : (
                  paginatedProperties.map(
                    (property, index) => {
                      const creator =
                        property?.addedBy || {};

                      const assignedPartner =
                        property?.assignedPartner ||
                        {};

                      // `newproperties/all` may expose media images as
                      // `media.images` while top-level `images` is empty.
                      // The service normalizes this, but keep a defensive
                      // fallback here for older API responses as well.
                      const propertyImages =
                        Array.isArray(property?.images) && property.images.length > 0
                          ? property.images
                          : Array.isArray(property?.media?.images)
                            ? property.media.images
                            : [];

                      const orderedImages = [...propertyImages].sort(
                        (a, b) =>
                          Number(Boolean(b?.isCover)) -
                          Number(Boolean(a?.isCover))
                      );

                      const imageUrl =
                        typeof orderedImages?.[0] === "string"
                          ? orderedImages[0]
                          : orderedImages?.[0]?.url ||
                            "https://via.placeholder.com/120";

                      return (
                        <tr
                          key={
                            property._id ||
                            property.id
                          }
                          className={`transition hover:bg-[#f8fbfa] ${
                            index !==
                            paginatedProperties.length - 1
                              ? "border-b border-[#E7EDF0]"
                              : ""
                          }`}
                        >
                          <td className="px-2 py-3 sm:px-3 sm:py-3.5">
                            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                              <img
                                src={imageUrl}
                                alt={
                                  property.title ||
                                  "Property"
                                }
                                onError={(event) => {
                                  event.currentTarget.onerror = null;
                                  event.currentTarget.src =
                                    "https://via.placeholder.com/120?text=Property";
                                }}
                                className="hidden h-10 w-10 shrink-0 rounded-xl border border-[#E7EDF0] bg-[#F1F5F6] object-cover sm:block lg:h-11 lg:w-11"
                              />

                              <div className="min-w-0 flex-1">
                                <HoverTooltip
                                  text={property.title || "-"}
                                  position="top"
                                  className="w-full"
                                >
                                  <p className="w-full cursor-help truncate text-[10px] font-extrabold text-[#173247] sm:text-[11px]">
                                    {property.title ||
                                      "-"}
                                  </p>
                                </HoverTooltip>

                                <p className="mt-0.5 truncate text-[10px] font-bold text-[#25B98B] sm:mt-1 sm:text-[10px]">
                                  {property.propertyId ||
                                    "-"}
                                </p>

                                <p className="mt-0.5 hidden truncate text-[10px] text-[#91A2AC] sm:block sm:text-[10px]">
                                  {property.buildingType ||
                                    "-"}{" "}
                                  •{" "}
                                  {property.transactionType ||
                                    "-"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* <td className="hidden px-2 py-3 sm:table-cell sm:px-3 sm:py-3.5">
                            <HoverTooltip
                              text={creator?.name || "-"}
                              position="top"
                              className="w-full"
                            >
                              <p className="cursor-help truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
                                {creator?.name || "-"}
                              </p>
                            </HoverTooltip>

                            <div className="mt-1">
                              <CreatorBadge
                                role={creator?.role}
                              />
                            </div>

                            {(creator?.sellerId ||
                              creator?.partnerId) && (
                              <p className="mt-1 text-[10px] text-[#91A2AC]">
                                {creator?.sellerId ||
                                  creator?.partnerId}
                              </p>
                            )}
                          </td> */}
<td className="hidden px-2 py-3 sm:table-cell sm:px-3 sm:py-3.5">
  {creator?.role?.toLowerCase() === "admin" ? (
    <p className="text-[11px] font-bold text-[#425A70] lg:text-[12px]">
      Admin
    </p>
  ) : (
    <>
      <HoverTooltip
        text={creator?.name || "-"}
        position="top"
        className="w-full"
      >
        <p className="cursor-help truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
          {creator?.name || "-"}
        </p>
      </HoverTooltip>

      <div className="mt-1">
        <CreatorBadge role={creator?.role} />
      </div>

      {(creator?.sellerId || creator?.partnerId) && (
        <p className="mt-1 text-[10px] text-[#91A2AC]">
          {creator?.sellerId || creator?.partnerId}
        </p>
      )}
    </>
  )}
</td>
                          <td className="hidden px-3 py-3.5 lg:table-cell">
                            <div className="flex min-w-0 items-start gap-2">
                              <FiMapPin
                                size={13}
                                className="mt-0.5 shrink-0 text-[#91A2AC]"
                              />

                              <HoverTooltip
                                text={
                                  [
                                    property.locality,
                                    property.city,
                                    property.pinCode,
                                  ]
                                    .filter(Boolean)
                                    .join(", ") || "-"
                                }
                                position="top"
                                className="min-w-0 flex-1"
                              >
                                <div className="min-w-0 cursor-help">
                                  <p className="truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
                                    {property.locality ||
                                      "-"}
                                  </p>

                                  <p className="mt-1 truncate text-[10px] text-[#91A2AC]">
                                    {[
                                      property.city,
                                      property.pinCode,
                                    ]
                                      .filter(Boolean)
                                      .join(" • ")}
                                  </p>
                                </div>
                              </HoverTooltip>
                            </div>
                          </td>

                          <td className="px-2 py-3 sm:px-3 sm:py-3.5">
                            <HoverTooltip
                              text={formatStatus(
                                property.status
                              )}
                              position="top"
                              className="inline-block max-w-full"
                            >
                              <div className="cursor-help">
                                <StatusBadge
                                  status={
                                    property.status
                                  }
                                />
                              </div>
                            </HoverTooltip>
                          </td>

                          {/* <td className="px-2 py-3 sm:px-3 sm:py-3.5">
                            <HoverTooltip
                              text={formatCurrency(
                                property.price
                              )}
                              position="top"
                              className="w-full"
                            >
                              <p className="cursor-help truncate text-[10px] font-extrabold text-[#173247] sm:text-[10px] lg:text-[11px]">
                                {formatCurrency(
                                  property.price
                                )}
                              </p>
                            </HoverTooltip>

                            <p className="mt-0.5 hidden truncate text-[10px] text-[#91A2AC] sm:block sm:text-[10px]">
                              {property.propertySize ||
                                "-"}{" "}
                              {property.sizeUnit || ""}
                            </p>
                          </td> */}
<td className="px-2 py-3 sm:px-3 sm:py-3.5">
  <HoverTooltip
    text={`${formatCurrency(property.price)} / ${
      property.frequency?.toLowerCase() || "month"
    }`}
    position="top"
    className="w-full"
  >
    <p className="cursor-help truncate text-[10px] font-extrabold text-[#173247] sm:text-[10px] lg:text-[11px]">
      {formatCurrency(property.price)}{" "}
      <span className="font-semibold text-[#91A2AC]">
        / {property.frequency?.toLowerCase() || "month"}
      </span>
    </p>
  </HoverTooltip>

  <p className="mt-0.5 hidden truncate text-[10px] text-[#91A2AC] sm:block sm:text-[10px]">
    {property.propertySize || "-"}{" "}
    {property.sizeUnit || ""}
  </p>
</td>
                          <td className="hidden px-3 py-3.5 xl:table-cell">
                            {assignedPartner?.partnerId ? (
                              <div>
                                <HoverTooltip
                                  text={
                                    assignedPartner?.name ||
                                    assignedPartner
                                      ?.partnerId?.name ||
                                    "-"
                                  }
                                  position="top"
                                  className="w-full"
                                >
                                  <p className="cursor-help truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
                                    {assignedPartner?.name ||
                                      assignedPartner
                                        ?.partnerId?.name ||
                                      "-"}
                                  </p>
                                </HoverTooltip>

                                <HoverTooltip
                                  text={
                                    assignedPartner?.partnerCode ||
                                    assignedPartner
                                      ?.partnerId
                                      ?.partnerId ||
                                    "-"
                                  }
                                  position="top"
                                  className="mt-1 w-full"
                                >
                                  <p className="cursor-help truncate text-[10px] font-bold text-[#25B98B]">
                                    {assignedPartner?.partnerCode ||
                                      assignedPartner
                                        ?.partnerId
                                        ?.partnerId ||
                                      "-"}
                                  </p>
                                </HoverTooltip>

                                <p className="mt-1 text-[10px] capitalize text-[#91A2AC]">
                                  {assignedPartner?.partnerType ||
                                    assignedPartner
                                      ?.partnerId
                                      ?.partnerType ||
                                    ""}
                                </p>
                              </div>
                            ) : (
                              <HoverTooltip
                                text="No partner has been assigned to this property."
                                position="top"
                                className="inline-block"
                              >
                                <span className="inline-flex cursor-help rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-600">
                                  Not Assigned
                                </span>
                              </HoverTooltip>
                            )}
                          </td>

                          <td className="px-1 py-3 sm:px-2 sm:py-3.5">
                            <div className="flex flex-wrap items-center justify-center gap-0.5 sm:flex-nowrap">
                              <ActionButton
                                title="View Property"
                                tone="teal"
                                onClick={() =>
                                  handleOpenPreview(
                                    property
                                  )
                                }
                              >
                                <FiEye size={15} />
                              </ActionButton>

                              <ActionButton
                                title="Edit Property"
                                tone="blue"
                                onClick={() =>
                                  handleOpenEdit(
                                    property
                                  )
                                }
                              >
                                <FiEdit2
                                  size={14}
                                />
                              </ActionButton>

                              <ActionButton
                                title={
                                  property?.status ===
                                  "Verified"
                                    ? "Already Verified"
                                    : "Verify Property"
                                }
                                tone="green"
                                disabled={
                                  property?.status ===
                                  "Verified"
                                }
                                onClick={() =>
                                  handleVerifyProperty(
                                    property
                                  )
                                }
                              >
                                <MdOutlineCheckCircle
                                  size={17}
                                />
                              </ActionButton>

                              <ActionButton
                                title="Delete Property"
                                tone="red"
                                onClick={() =>
                                  handleDeleteProperty(
                                    property._id
                                  )
                                }
                              >
                                <FiTrash2
                                  size={14}
                                />
                              </ActionButton>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-[#E7EDF0] bg-[#fcfdfd] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-[10px] font-semibold text-[#7D8C9C]">
              {sortedProperties.length === 0
                ? "Showing 0 properties"
                : `Showing ${startIndex + 1}-${endIndex} of ${sortedProperties.length} properties`}
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DCE5E9] bg-white text-[#536779] transition hover:border-[#35C99A] hover:bg-[#EAF9F4] hover:text-[#15966F] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiChevronLeft size={14} />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold transition ${
                        currentPage === page
                          ? "bg-[#1F3C50] text-white shadow-sm"
                          : "border border-[#DCE5E9] bg-white text-[#536779] hover:border-[#35C99A] hover:bg-[#EAF9F4] hover:text-[#15966F]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DCE5E9] bg-white text-[#536779] transition hover:border-[#35C99A] hover:bg-[#EAF9F4] hover:text-[#15966F] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <AIAssistant
        open={chatOpen}
        onClose={() =>
          setChatOpen(false)
        }
      />

      <EditPropertyModal
        open={editOpen}
        property={editingProperty}
        onClose={() => {
          setEditOpen(false);
          setEditingProperty(null);
        }}
        onUpdated={
          handlePropertyUpdated
        }
      />

      <PropertyPreview
        open={previewOpen}
        property={selectedProperty}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedProperty(null);

          // If preview was opened from /property-management/:id,
          // remove the id from the URL when the preview closes.
          if (id) {
            navigate("/property-management", { replace: true });
          }
        }}
      />

      <button
        onClick={() =>
          setChatOpen(
            (value) => !value
          )
        }
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#1F3C50] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:right-6"
      >
        {chatOpen ? (
          <FiX size={19} />
        ) : (
          <BsRobot size={19} />
        )}
      </button>
    </div>
  );
}

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SummaryCard({
  label,
  value,
  icon,
  tone = "default",
}) {
  const tones = {
    default: {
      icon: "bg-[#EAF9F4] text-[#25B98B]",
      value: "text-[#173247]",
    },
    amber: {
      icon: "bg-[#FFF5E8] text-[#F79009]",
      value: "text-[#173247]",
    },
    emerald: {
      icon: "bg-[#EAF9F4] text-[#25B98B]",
      value: "text-[#173247]",
    },
    green: {
      icon: "bg-[#EAF9F4] text-[#25B98B]",
      value: "text-[#173247]",
    },
  };

  const current = tones[tone] || tones.default;

  return (
    <div className="group rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-[0_8px_24px_rgba(15,47,69,0.07)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#7B8F9A]">
            {label}
          </p>

          <p className={`mt-3 text-2xl font-black ${current.value}`}>
            {Number(value || 0).toLocaleString()}
          </p>

          <p className="mt-1 text-[11px] font-medium text-[#94A4AD]">
            Property records
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition group-hover:bg-[#35C99A] group-hover:text-white ${current.icon}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  children,
  tone = "teal",
}) {
  const tones = {
    teal:
      "bg-[#EAF9F4] text-[#15966F] border-teal-100",
    amber:
      "bg-[#FFF5E8] text-[#D97706] border-amber-100",
    blue:
      "bg-[#EEF6FF] text-[#2E90FA] border-blue-100",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function ActionButton({
  children,
  title,
  onClick,
  disabled = false,
  tone = "slate",
}) {
  const tones = {
    teal:
      "text-[#25B98B] hover:bg-[#EAF9F4]",
    blue:
      "text-blue-600 hover:bg-blue-50",
    green:
      "text-[#25B98B] hover:bg-[#EAF9F4]",
    red:
      "text-red-500 hover:bg-red-50",
    slate:
      "text-[#7D8C9C] hover:bg-[#F1F5F6]",
  };

  return (
    <HoverTooltip
      text={title}
      position="top"
      className="inline-flex"
    >
      <button
        type="button"
        aria-label={title}
        disabled={disabled}
        onClick={onClick}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition sm:h-7 sm:w-7 ${
          tones[tone]
        } ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : ""
        }`}
      >
        {children}
      </button>
    </HoverTooltip>
  );
}

function TableLoading() {
  return (
    <tr>
      <td
        colSpan={7}
        className="py-16 text-center"
      >
        <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#DCE5E9] border-t-teal-600" />
        <p className="mt-3 text-xs text-[#91A2AC]">
          Loading properties...
        </p>
      </td>
    </tr>
  );
}

function TableEmpty() {
  return (
    <tr>
      <td
        colSpan={7}
        className="py-16 text-center"
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#F1F5F6] text-[#91A2AC]">
          <FiHome size={18} />
        </div>

        <p className="mt-3 text-[11px] font-bold text-[#536779]">
          No Property Found
        </p>

        <p className="mt-1 text-[10px] text-[#91A2AC]">
          Try changing your filters or search.
        </p>
      </td>
    </tr>
  );
}

/* =========================================================
   EDIT MODAL
========================================================= */

function EditPropertyModal({
  open,
  property,
  onClose,
  onUpdated,
}) {
  const [form, setForm] =
    useState({});

  const [
    existingImages,
    setExistingImages,
  ] = useState([]);

  const [
    newImages,
    setNewImages,
  ] = useState([]);

  const [
    floorPlan,
    setFloorPlan,
  ] = useState(null);

  const [
    reraCertificate,
    setReraCertificate,
  ] = useState(null);

  const [video, setVideo] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!property) return;

    setForm({
      title: property.title || "",
      transactionType:
        property.transactionType ||
        "Sale",
      category:
        property.category ||
        "Residential",
      propertySize:
        property.propertySize || "",
      sizeUnit:
        property.sizeUnit ||
        "sqft",
      price:
        property.price || "",
      projectName:
        property.projectName ||
        "",
      developerName:
        property.developerName ||
        "",
      description:
        property.description ||
        "",
      city: property.city || "",
      locality:
        property.locality || "",
      pinCode:
        property.pinCode || "",
      address:
        property.address || "",
      latitude:
        property.latitude ?? "",
      longitude:
        property.longitude ?? "",
      maintenance:
        property.maintenance ?? "",
      bookingAmount:
        property.bookingAmount ?? "",
      negotiable:
        Boolean(
          property.negotiable
        ),
      superBuiltupArea:
        property.superBuiltupArea ??
        "",
      carpetArea:
        property.carpetArea ?? "",
      bedrooms:
        property.bedrooms || "",
      bathrooms:
        property.bathrooms || "",
      balconies:
        property.balconies || "",
      parking:
        property.parking || "",
      floorNo:
        property.floorNo ?? "",
      totalFloors:
        property.totalFloors ?? "",
      facing:
        property.facing || "",
      furnishing:
        property.furnishing || "",
      amenities:
        Array.isArray(
          property.amenities
        )
          ? property.amenities.join(
              ", "
            )
          : "",
      tags: Array.isArray(
        property.tags
      )
        ? property.tags.join(", ")
        : "",
    });

    setExistingImages(
      property.images || []
    );

    setNewImages([]);
    setFloorPlan(null);
    setReraCertificate(null);
    setVideo(null);
  }, [property]);

  if (!open || !property)
    return null;

  const setField = (
    name,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeExistingImage = (
    index
  ) => {
    setExistingImages((prev) =>
      prev.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const confirm =
      await Swal.fire({
        icon: "question",
        title: "Update Property?",
        text:
          "Property details, images and documents will be updated.",
        showCancelButton: true,
        confirmButtonText:
          "Yes, Update",
        cancelButtonText: "Cancel",
        confirmButtonColor: DARK,
        cancelButtonColor:
          "#64748b",
      });

    if (!confirm.isConfirmed)
      return;

    try {
      setSaving(true);

      const payload =
        new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          if (
            key === "amenities" ||
            key === "tags"
          )
            return;

          if (
            typeof value ===
            "boolean"
          ) {
            payload.append(
              key,
              value
                ? "true"
                : "false"
            );
          } else if (
            value !== undefined &&
            value !== null
          ) {
            payload.append(
              key,
              value
            );
          }
        }
      );

      payload.append(
        "amenities",
        JSON.stringify(
          String(
            form.amenities || ""
          )
            .split(",")
            .map((item) =>
              item.trim()
            )
            .filter(Boolean)
        )
      );

      payload.append(
        "tags",
        JSON.stringify(
          String(form.tags || "")
            .split(",")
            .map((item) =>
              item.trim()
            )
            .filter(Boolean)
        )
      );

      payload.append(
        "existingImages",
        JSON.stringify(
          existingImages
        )
      );

      newImages.forEach(
        (file) => {
          payload.append(
            "images",
            file
          );
        }
      );

      if (floorPlan) {
        payload.append(
          "floorPlan",
          floorPlan
        );
      }

      if (reraCertificate) {
        payload.append(
          "reraCertificate",
          reraCertificate
        );
      }

      if (video) {
        payload.append(
          "video",
          video
        );
      }

      const response =
        await updatePropertyApi(
          property._id,
          payload
        );

      if (response?.success) {
        await Swal.fire({
          icon: "success",
          title: "Property Updated",
          text:
            response?.message ||
            "Property updated successfully.",
          confirmButtonColor: DARK,
        });

        await onUpdated();
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data
            ?.message ||
          "Unable to update property.",
        confirmButtonColor: DARK,
      });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "h-10 w-full rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs text-[#425A70] outline-none transition focus:border-[#35C99A]/50 focus:ring-2 focus:ring-teal-50";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5">
      <div className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[18px] border border-white/20 bg-white shadow-2xl">
        {/* HEADER - NOT SCROLLING */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#E7EDF0] bg-white px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <FiEdit2 className="text-[#25B98B]" />

              <h2 className="text-lg font-extrabold text-[#173247]">
                Edit Property
              </h2>
            </div>

            <p className="mt-1 text-[10px] text-[#91A2AC]">
              {property.propertyId} •
              Update details, images and documents
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1F5F6] text-[#7D8C9C] transition hover:bg-slate-200"
          >
            <FiX size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* BODY - ONLY THIS SCROLLS */}
          <div
            className={`min-h-0 flex-1 overflow-y-auto bg-[#fbfcfc] p-4 sm:p-6 ${SCROLLBAR_HIDDEN}`}
          >
            <SectionCard
              title="Basic Information"
              subtitle="Core property information"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <EditField label="Title">
                  <input
                    className={
                      inputClass
                    }
                    value={
                      form.title || ""
                    }
                    onChange={(e) =>
                      setField(
                        "title",
                        e.target.value
                      )
                    }
                  />
                </EditField>

                <EditField label="Category">
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.category ||
                      ""
                    }
                    onChange={(e) =>
                      setField(
                        "category",
                        e.target.value
                      )
                    }
                  >
                    {[
                      "Residential",
                      "Commercial",
                      "Rental",
                      "Sell",
                      "Plot/Land",
                    ].map(
                      (item) => (
                        <option
                          key={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </EditField>

                <EditField label="Transaction">
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.transactionType ||
                      ""
                    }
                    onChange={(e) =>
                      setField(
                        "transactionType",
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Sale
                    </option>
                    <option>
                      Rent
                    </option>
                  </select>
                </EditField>

                <EditField label="Price">
                  <input
                    className={
                      inputClass
                    }
                    value={
                      form.price || ""
                    }
                    onChange={(e) =>
                      setField(
                        "price",
                        e.target.value
                      )
                    }
                  />
                </EditField>

                <EditField label="Property Size">
                  <input
                    className={
                      inputClass
                    }
                    value={
                      form.propertySize ||
                      ""
                    }
                    onChange={(e) =>
                      setField(
                        "propertySize",
                        e.target.value
                      )
                    }
                  />
                </EditField>

                <EditField label="Size Unit">
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.sizeUnit ||
                      "sqft"
                    }
                    onChange={(e) =>
                      setField(
                        "sizeUnit",
                        e.target.value
                      )
                    }
                  >
                    {[
                      "sqft",
                      "sqyd",
                      "sqm",
                      "acre",
                      "bigha",
                    ].map(
                      (item) => (
                        <option
                          key={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </EditField>
              </div>
            </SectionCard>

            <SectionCard
              title="Project & Location"
              subtitle="Project and map-related details"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  [
                    "projectName",
                    "Project Name",
                  ],
                  [
                    "developerName",
                    "Developer Name",
                  ],
                  ["city", "City"],
                  [
                    "locality",
                    "Locality",
                  ],
                  [
                    "pinCode",
                    "Pin Code",
                  ],
                  [
                    "address",
                    "Address",
                  ],
                  [
                    "latitude",
                    "Latitude",
                  ],
                  [
                    "longitude",
                    "Longitude",
                  ],
                ].map(
                  ([name, label]) => (
                    <EditField
                      key={name}
                      label={label}
                    >
                      <input
                        className={
                          inputClass
                        }
                        value={
                          form[name] ??
                          ""
                        }
                        onChange={(
                          e
                        ) =>
                          setField(
                            name,
                            e.target
                              .value
                          )
                        }
                      />
                    </EditField>
                  )
                )}
              </div>
            </SectionCard>

            <SectionCard
              title="Specifications"
              subtitle="Physical and pricing specifications"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  [
                    "maintenance",
                    "Maintenance",
                  ],
                  [
                    "bookingAmount",
                    "Booking Amount",
                  ],
                  [
                    "superBuiltupArea",
                    "Super Built-up Area",
                  ],
                  [
                    "carpetArea",
                    "Carpet Area",
                  ],
                  [
                    "bedrooms",
                    "Bedrooms",
                  ],
                  [
                    "bathrooms",
                    "Bathrooms",
                  ],
                  [
                    "balconies",
                    "Balconies",
                  ],
                  [
                    "parking",
                    "Parking",
                  ],
                  [
                    "floorNo",
                    "Floor No",
                  ],
                  [
                    "totalFloors",
                    "Total Floors",
                  ],
                  [
                    "facing",
                    "Facing",
                  ],
                  [
                    "furnishing",
                    "Furnishing",
                  ],
                ].map(
                  ([name, label]) => (
                    <EditField
                      key={name}
                      label={label}
                    >
                      <input
                        className={
                          inputClass
                        }
                        value={
                          form[name] ??
                          ""
                        }
                        onChange={(
                          e
                        ) =>
                          setField(
                            name,
                            e.target
                              .value
                          )
                        }
                      />
                    </EditField>
                  )
                )}

                <EditField label="Negotiable">
                  <select
                    className={
                      inputClass
                    }
                    value={
                      form.negotiable
                        ? "true"
                        : "false"
                    }
                    onChange={(e) =>
                      setField(
                        "negotiable",
                        e.target
                          .value ===
                          "true"
                      )
                    }
                  >
                    <option value="false">
                      No
                    </option>
                    <option value="true">
                      Yes
                    </option>
                  </select>
                </EditField>

                <EditField label="Amenities (comma separated)">
                  <input
                    className={
                      inputClass
                    }
                    value={
                      form.amenities ||
                      ""
                    }
                    onChange={(e) =>
                      setField(
                        "amenities",
                        e.target.value
                      )
                    }
                  />
                </EditField>

                <EditField label="Tags (comma separated)">
                  <input
                    className={
                      inputClass
                    }
                    value={
                      form.tags || ""
                    }
                    onChange={(e) =>
                      setField(
                        "tags",
                        e.target.value
                      )
                    }
                  />
                </EditField>

                <div className="md:col-span-2 lg:col-span-3">
                  <EditField label="Description">
                    <textarea
                      rows={4}
                      className="w-full rounded-xl border border-[#DCE5E9] bg-white p-3 text-xs text-[#425A70] outline-none transition focus:border-[#35C99A]/50 focus:ring-2 focus:ring-teal-50"
                      value={
                        form.description ||
                        ""
                      }
                      onChange={(e) =>
                        setField(
                          "description",
                          e.target
                            .value
                        )
                      }
                    />
                  </EditField>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Media & Documents"
              subtitle="Manage listing images and documents"
            >
              <div>
                <p className="text-xs font-bold text-[#425A70]">
                  Existing Images
                </p>

                <div
                  className={`mt-3 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 ${SCROLLBAR_HIDDEN}`}
                >
                  {existingImages.length ? (
                    existingImages.map(
                      (
                        image,
                        index
                      ) => (
                        <div
                          key={
                            image?.public_id ||
                            index
                          }
                          className="relative shrink-0"
                        >
                          <img
                            src={
                              image?.url
                            }
                            alt=""
                            className="h-24 w-32 rounded-xl border border-[#DCE5E9] object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeExistingImage(
                                index
                              )
                            }
                            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
                          >
                            <FiX
                              size={
                                12
                              }
                            />
                          </button>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-[10px] text-[#91A2AC]">
                      No existing
                      images.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <UploadCard
                  icon={<FiImage />}
                  label="Add Images"
                  text={
                    newImages.length
                      ? `${newImages.length} selected`
                      : "Multiple images"
                  }
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      setNewImages(
                        Array.from(
                          e.target
                            .files || []
                        )
                      )
                    }
                    className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
                  />
                </UploadCard>

                <UploadCard
                  icon={
                    <FiFileText />
                  }
                  label="Floor Plan"
                  text={
                    floorPlan?.name ||
                    "Replace file"
                  }
                >
                  <input
                    type="file"
                    onChange={(e) =>
                      setFloorPlan(
                        e.target
                          .files?.[0] ||
                          null
                      )
                    }
                    className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
                  />
                </UploadCard>

                <UploadCard
                  icon={
                    <FiFileText />
                  }
                  label="RERA"
                  text={
                    reraCertificate?.name ||
                    "Replace certificate"
                  }
                >
                  <input
                    type="file"
                    onChange={(e) =>
                      setReraCertificate(
                        e.target
                          .files?.[0] ||
                          null
                      )
                    }
                    className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
                  />
                </UploadCard>

                <UploadCard
                  icon={<FiVideo />}
                  label="Video"
                  text={
                    video?.name ||
                    "Upload walkthrough"
                  }
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setVideo(
                        e.target
                          .files?.[0] ||
                          null
                      )
                    }
                    className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
                  />
                </UploadCard>
              </div>
            </SectionCard>
          </div>

          {/* FOOTER - ALWAYS VISIBLE */}
          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#E7EDF0] bg-white px-5 py-3 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] rounded-lg border border-[#DCE5E9] px-5 text-xs font-semibold text-[#536779] transition hover:bg-[#F8FAFB]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="h-[38px] rounded-lg bg-[#1F3C50] px-6 text-xs font-bold text-white transition hover:bg-[#123b36] disabled:opacity-50"
            >
              {saving
                ? "Updating..."
                : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditField({
  label,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#91A2AC]">
        {label}
      </span>
      {children}
    </label>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}) {
  return (
    <section className="mb-4 rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h3 className="text-sm font-extrabold text-[#173247]">
          {title}
        </h3>
        <p className="mt-0.5 text-[10px] text-[#91A2AC]">
          {subtitle}
        </p>
      </div>

      {children}
    </section>
  );
}

function UploadCard({
  icon,
  label,
  text,
  children,
}) {
  return (
    <div className="rounded-[16px] border border-dashed border-slate-300 bg-[#F8FAFB] p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#25B98B] shadow-sm">
        {icon}
      </div>

      <p className="mt-3 text-xs font-bold text-[#425A70]">
        {label}
      </p>

      <p className="mt-1 truncate text-[10px] text-[#91A2AC]">
        {text}
      </p>

      {children}
    </div>
  );
}

/* =========================================================
   PROPERTY PREVIEW
========================================================= */

// function PropertyPreview({
//   open,
//   property,
//   onClose,
// }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [downloadingDoc, setDownloadingDoc] = useState("");

//   useBodyScrollLock(open);

//   useEffect(() => {
//     setSelectedImage(0);
//   }, [property]);

//   if (!open || !property) return null;

//   const images =
//     Array.isArray(property.images) &&
//     property.images.length > 0
//       ? property.images.filter(
//           (item) => item?.url
//         )
//       : [
//           {
//             url: "https://via.placeholder.com/1200x700?text=Property+Image",
//           },
//         ];

//   const locationText =
//     [
//       property.locality,
//       property.city,
//     ]
//       .filter(Boolean)
//       .join(", ") ||
//     "Location not available";

//   const money = (value) => {
//     const amount = Number(value || 0);

//     if (!amount) return "—";

//     return `₹${amount.toLocaleString(
//       "en-IN"
//     )}`;
//   };

//   const shortPrice = (value) => {
//     const amount = Number(value || 0);

//     if (!amount) return "Price not added";

//     if (amount >= 10000000) {
//       return `₹${(
//         amount / 10000000
//       ).toFixed(2)} Cr`;
//     }

//     if (amount >= 100000) {
//       return `₹${(
//         amount / 100000
//       ).toFixed(2)} L`;
//     }

//     return money(amount);
//   };

//   const floorPlanUrl =
//     typeof property.floorPlan ===
//     "string"
//       ? property.floorPlan
//       : property.floorPlan?.url || "";

//   const reraUrl =
//     typeof property.reraCertificate ===
//     "string"
//       ? property.reraCertificate
//       : property.reraCertificate?.url ||
//         "";

//   const uploadedVideoUrl =
//     typeof property.video === "string"
//       ? property.video
//       : property.video?.url || "";

//   const getYouTubeEmbedUrl = (
//     url = ""
//   ) => {
//     if (!url) return "";

//     try {
//       const parsed = new URL(url);

//       if (
//         parsed.hostname.includes(
//           "youtube.com"
//         )
//       ) {
//         if (
//           parsed.pathname.startsWith(
//             "/embed/"
//           )
//         ) {
//           return url;
//         }

//         const id =
//           parsed.searchParams.get("v");

//         return id
//           ? `https://www.youtube.com/embed/${id}`
//           : "";
//       }

//       if (
//         parsed.hostname.includes(
//           "youtu.be"
//         )
//       ) {
//         const id =
//           parsed.pathname
//             .replace("/", "")
//             .split("/")[0];

//         return id
//           ? `https://www.youtube.com/embed/${id}`
//           : "";
//       }

//       return "";
//     } catch {
//       return "";
//     }
//   };

//   const youtubeEmbed =
//     getYouTubeEmbedUrl(
//       property.videoLink || ""
//     );

//   const isDirectVideo = (
//     url = ""
//   ) =>
//     /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(
//       String(url)
//     );

//   const cleanFilePart = (
//     value,
//     fallback
//   ) =>
//     String(value || fallback)
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "_")
//       .replace(/_+/g, "_")
//       .replace(/^_+|_+$/g, "");

//   const getExtension = (
//     url,
//     fallback = "pdf"
//   ) => {
//     try {
//       const cleanUrl =
//         String(url || "").split("?")[0];

//       const filename =
//         cleanUrl.split("/").pop() || "";

//       const ext =
//         filename.includes(".")
//           ? filename
//               .split(".")
//               .pop()
//               .toLowerCase()
//           : "";

//       return ext &&
//         ext.length <= 6
//         ? ext
//         : fallback;
//     } catch {
//       return fallback;
//     }
//   };

//   const downloadDocument = async (
//     url,
//     type
//   ) => {
//     if (!url) return;

//     const propertyName =
//       cleanFilePart(
//         property.title,
//         property.propertyId ||
//           "Property"
//       );

//     const location =
//       cleanFilePart(
//         [
//           property.locality,
//           property.city,
//         ]
//           .filter(Boolean)
//           .join("_"),
//         "Location"
//       );

//     const documentName =
//       cleanFilePart(
//         type,
//         "Document"
//       );

//     const extension =
//       getExtension(url);

//     const filename =
//       `${propertyName}_${location}_${documentName}.${extension}`;

//     try {
//       setDownloadingDoc(type);

//       const response =
//         await fetch(url);

//       if (!response.ok) {
//         throw new Error(
//           "Document download failed"
//         );
//       }

//       const blob =
//         await response.blob();

//       const objectUrl =
//         URL.createObjectURL(blob);

//       const link =
//         document.createElement("a");

//       link.href = objectUrl;
//       link.download = filename;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       URL.revokeObjectURL(
//         objectUrl
//       );
//     } catch (error) {
//       console.error(
//         "Document Download Error:",
//         error
//       );

//       const link =
//         document.createElement("a");

//       link.href = url;
//       link.download = filename;
//       link.target = "_blank";
//       link.rel = "noreferrer";

//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } finally {
//       setDownloadingDoc("");
//     }
//   };

//   const previousImage = () =>
//     setSelectedImage((prev) =>
//       prev === 0
//         ? images.length - 1
//         : prev - 1
//     );

//   const nextImage = () =>
//     setSelectedImage((prev) =>
//       prev ===
//       images.length - 1
//         ? 0
//         : prev + 1
//     );

//   const DetailCard = ({
//     label,
//     value,
//     icon,
//   }) => (
//     <div className="rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
//       <div className="flex items-start gap-3">
//         {icon && (
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E9FBF6] text-[#168A70]">
//             {icon}
//           </div>
//         )}

//         <div className="min-w-0">
//           <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//             {label}
//           </p>

//           <p className="mt-1 break-words text-sm font-bold text-[#1F4256]">
//             {value === "" ||
//             value === null ||
//             value === undefined
//               ? "—"
//               : value}
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   const SectionHeading = ({
//     icon,
//     title,
//     subtitle,
//   }) => (
//     <div className="mb-5 flex items-start gap-3">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F4256] text-white">
//         {icon}
//       </div>

//       <div>
//         <h3 className="text-lg font-bold text-[#1F4256]">
//           {title}
//         </h3>

//         {subtitle && (
//           <p className="mt-0.5 text-xs leading-5 text-[#8197A2]">
//             {subtitle}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#102C3A]/75 p-2 backdrop-blur-sm sm:p-4">
//       <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">

//         {/* HEADER */}
//         <div className="relative shrink-0 overflow-hidden bg-[#1F4256] px-5 py-5 text-white sm:px-7">
//           <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-[#3ED6AE]/10" />
//           <div className="pointer-events-none absolute right-28 top-0 h-40 w-40 rounded-full bg-white/[0.04]" />

//           <div className="relative z-10 flex items-center justify-between gap-4">
//             <div className="min-w-0">
//               <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9BD8E5]">
//                 DIGINIWAS PROPERTY VIEW
//               </p>

//               <div className="mt-1 flex flex-wrap items-center gap-2">
//                 <h2 className="truncate text-xl font-bold sm:text-2xl">
//                   {property.title ||
//                     "Untitled Property"}
//                 </h2>

//                 <StatusBadge
//                   status={
//                     property.status
//                   }
//                 />
//               </div>

//               <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
//                 <FiMapPin size={14} />
//                 {locationText}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition hover:bg-white/20"
//             >
//               <FiX size={18} />
//             </button>
//           </div>
//         </div>

//         {/* SCROLL CONTENT */}
//         <div
//           className={`min-h-0 flex-1 overflow-y-auto bg-[#F4F7F8] ${SCROLLBAR_HIDDEN}`}
//         >
//           <div className="space-y-6 p-3 sm:p-6">

//             {/* IMAGE GALLERY */}
//             <section className="overflow-hidden rounded-3xl border border-[#DDE7EA] bg-white shadow-sm">
//               <div className="relative h-[280px] bg-slate-100 sm:h-[460px]">
//                 <img
//                   src={
//                     images[
//                       selectedImage
//                     ]?.url
//                   }
//                   alt={
//                     property.title ||
//                     "Property"
//                   }
//                   className="h-full w-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

//                 <div className="absolute left-4 top-4 flex flex-wrap gap-2">
//                   <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
//                     {formatStatus(
//                       property.status
//                     )}
//                   </span>

//                   {property.buildingType && (
//                     <span className="rounded-full bg-[#E9FBF6]/95 px-3 py-1.5 text-xs font-bold text-[#168A70] shadow-sm">
//                       {
//                         property.buildingType
//                       }
//                     </span>
//                   )}

//                   {property.category && (
//                     <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
//                       {
//                         property.category
//                       }
//                     </span>
//                   )}
//                 </div>

//                 {images.length > 1 && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={
//                         previousImage
//                       }
//                       className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
//                     >
//                       <FiChevronLeft
//                         size={20}
//                       />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={nextImage}
//                       className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
//                     >
//                       <FiChevronRight
//                         size={20}
//                       />
//                     </button>
//                   </>
//                 )}

//                 <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
//                   <div className="min-w-0 text-white">
//                     <p className="text-xs text-white/70">
//                       {property.propertyId ||
//                         "Property Listing"}
//                     </p>

//                     <h3 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
//                       {property.title ||
//                         "Untitled Property"}
//                     </h3>

//                     <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
//                       <FiMapPin />
//                       {
//                         locationText
//                       }
//                     </p>
//                   </div>

//                   <div className="shrink-0 rounded-2xl bg-black/35 px-4 py-3 text-right text-white backdrop-blur">
//                     <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">
//                       Listing Price
//                     </p>

//                     <p className="mt-1 text-xl font-bold">
//                       {shortPrice(
//                         property.price
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {images.length > 1 && (
//                 <div
//                   className={`flex gap-3 overflow-x-auto p-4 ${SCROLLBAR_HIDDEN}`}
//                 >
//                   {images.map(
//                     (
//                       image,
//                       index
//                     ) => (
//                       <button
//                         type="button"
//                         key={
//                           image.url ||
//                           index
//                         }
//                         onClick={() =>
//                           setSelectedImage(
//                             index
//                           )
//                         }
//                         className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
//                           selectedImage ===
//                           index
//                             ? "border-[#3ED6AE]"
//                             : "border-transparent"
//                         }`}
//                       >
//                         <img
//                           src={
//                             image.url
//                           }
//                           alt=""
//                           className="h-full w-full object-cover"
//                         />

//                         <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">
//                           {index + 1}
//                         </span>
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </section>

//             {/* PRICING */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiDollarSign
//                     size={20}
//                   />
//                 }
//                 title="Pricing & Commercial Details"
//                 subtitle="Complete commercial and transaction information."
//               />

//               <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                 <DetailCard
//                   label="Total Price"
//                   value={money(
//                     property.price
//                   )}
//                   icon={
//                     <FiDollarSign />
//                   }
//                 />

//                 <DetailCard
//                   label="Price / Sq.Ft"
//                   value={
//                     property.pricePerSqft
//                       ? money(
//                           property.pricePerSqft
//                         )
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Booking Amount"
//                   value={money(
//                     property.bookingAmount
//                   )}
//                 />

//                 <DetailCard
//                   label="Maintenance"
//                   value={money(
//                     property.maintenance
//                   )}
//                 />

//                 <DetailCard
//                   label="Negotiable"
//                   value={
//                     property.negotiable
//                       ? "Yes"
//                       : "No"
//                   }
//                 />

//                 <DetailCard
//                   label="Transaction Type"
//                   value={
//                     property.transactionType ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Category"
//                   value={
//                     property.category ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Property ID"
//                   value={
//                     property.propertyId ||
//                     "—"
//                   }
//                 />
//               </div>
//             </section>

//             {/* LOCATION */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiNavigation
//                     size={20}
//                   />
//                 }
//                 title="Location Details"
//                 subtitle="Property address and geographic coordinates."
//               />

//               <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <DetailCard
//                     label="City"
//                     value={
//                       property.city ||
//                       "—"
//                     }
//                     icon={
//                       <FiMapPin />
//                     }
//                   />

//                   <DetailCard
//                     label="Locality"
//                     value={
//                       property.locality ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="PIN Code"
//                     value={
//                       property.pinCode ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Latitude"
//                     value={
//                       property.latitude ??
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Longitude"
//                     value={
//                       property.longitude ??
//                       "—"
//                     }
//                   />

//                   <div className="sm:col-span-2">
//                     <DetailCard
//                       label="Full Address"
//                       value={
//                         property.address ||
//                         "—"
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="overflow-hidden rounded-2xl border border-[#DDE7EA] bg-[#EEF3F5]">
//                   {property.latitude &&
//                   property.longitude ? (
//                     <iframe
//                       title="Property location"
//                       width="100%"
//                       height="100%"
//                       className="min-h-[300px]"
//                       loading="lazy"
//                       src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
//                     />
//                   ) : (
//                     <div className="flex min-h-[300px] items-center justify-center text-sm text-[#8197A2]">
//                       Location map not
//                       available
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </section>

//             {/* SPECS */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiHome size={20} />
//                 }
//                 title="Property Specifications"
//                 subtitle="Area, room, floor, parking and furnishing information."
//               />

//               <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                 <DetailCard
//                   label="Property Size"
//                   value={
//                     property.propertySize
//                       ? `${
//                           property.propertySize
//                         } ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                   icon={
//                     <FiMaximize2 />
//                   }
//                 />

//                 <DetailCard
//                   label="Super Built-up Area"
//                   value={
//                     property.superBuiltupArea
//                       ? `${property.superBuiltupArea} ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Carpet Area"
//                   value={
//                     property.carpetArea
//                       ? `${property.carpetArea} ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Bedrooms"
//                   value={
//                     property.bedrooms ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Bathrooms"
//                   value={
//                     property.bathrooms ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Balconies"
//                   value={
//                     property.balconies ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Parking"
//                   value={
//                     property.parking ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Floor No."
//                   value={
//                     property.floorNo ??
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Total Floors"
//                   value={
//                     property.totalFloors ??
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Facing"
//                   value={
//                     property.facing ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Furnishing"
//                   value={
//                     property.furnishing ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Size Unit"
//                   value={
//                     property.sizeUnit ||
//                     "—"
//                   }
//                 />
//               </div>
//             </section>

//             {/* PROJECT */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiGrid size={20} />
//                 }
//                 title="Project Information"
//                 subtitle="Project, developer and property description."
//               />

//               <div className="grid gap-3 sm:grid-cols-2">
//                 <DetailCard
//                   label="Project Name"
//                   value={
//                     property.projectName ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Developer Name"
//                   value={
//                     property.developerName ||
//                     "—"
//                   }
//                 />
//               </div>

//               <div className="mt-4 rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
//                 <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                   Description
//                 </p>

//                 <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#536779]">
//                   {property.description ||
//                     "Description has not been added."}
//                 </p>
//               </div>
//             </section>

//             {/* AMENITIES */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiCheckCircle
//                     size={20}
//                   />
//                 }
//                 title="Amenities & Property Tags"
//                 subtitle="Features and highlights associated with this listing."
//               />

//               <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                 Amenities
//               </p>

//               {property.amenities
//                 ?.length ? (
//                 <div className="flex flex-wrap gap-2">
//                   {property.amenities.map(
//                     (
//                       amenity,
//                       index
//                     ) => (
//                       <span
//                         key={
//                           index
//                         }
//                         className="rounded-full border border-[#3ED6AE]/30 bg-[#E9FBF6] px-3 py-1.5 text-xs font-bold text-[#168A70]"
//                       >
//                         {
//                           amenity
//                         }
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-[#8197A2]">
//                   No amenities added.
//                 </p>
//               )}

//               <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                 Property Tags
//               </p>

//               {property.tags?.length ? (
//                 <div className="flex flex-wrap gap-2">
//                   {property.tags.map(
//                     (
//                       tag,
//                       index
//                     ) => (
//                       <span
//                         key={
//                           index
//                         }
//                         className="rounded-full bg-[#1F4256]/5 px-3 py-1.5 text-xs font-bold text-[#1F4256]"
//                       >
//                         #{tag}
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-[#8197A2]">
//                   No tags added.
//                 </p>
//               )}
//             </section>

//             {/* VIDEO */}
//             {(uploadedVideoUrl ||
//               property.videoLink) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiVideo
//                       size={20}
//                     />
//                   }
//                   title="Property Video / Walkthrough"
//                   subtitle="Watch the property video directly from Property Management."
//                 />

//                 {uploadedVideoUrl && (
//                   <div className="overflow-hidden rounded-2xl bg-black">
//                     <video
//                       src={
//                         uploadedVideoUrl
//                       }
//                       controls
//                       playsInline
//                       preload="metadata"
//                       className="max-h-[560px] w-full"
//                     />
//                   </div>
//                 )}

//                 {!uploadedVideoUrl &&
//                   youtubeEmbed && (
//                     <div className="aspect-video overflow-hidden rounded-2xl bg-black">
//                       <iframe
//                         src={
//                           youtubeEmbed
//                         }
//                         title="Property walkthrough"
//                         className="h-full w-full"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       />
//                     </div>
//                   )}

//                 {!uploadedVideoUrl &&
//                   !youtubeEmbed &&
//                   isDirectVideo(
//                     property.videoLink
//                   ) && (
//                     <video
//                       src={
//                         property.videoLink
//                       }
//                       controls
//                       playsInline
//                       className="max-h-[560px] w-full rounded-2xl bg-black"
//                     />
//                   )}

//                 {!uploadedVideoUrl &&
//                   !youtubeEmbed &&
//                   property.videoLink &&
//                   !isDirectVideo(
//                     property.videoLink
//                   ) && (
//                     <a
//                       href={
//                         property.videoLink
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center justify-between rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-sm font-bold text-[#1F4256] transition hover:border-[#3ED6AE]"
//                     >
//                       <span>
//                         Open Property
//                         Walkthrough
//                       </span>

//                       <FiVideo />
//                     </a>
//                   )}
//               </section>
//             )}

//             {/* DOCUMENTS */}
//             {(floorPlanUrl ||
//               reraUrl) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiFileText
//                       size={20}
//                     />
//                   }
//                   title="Property Documents"
//                   subtitle="Download property documents with a clean property and location based file name."
//                 />

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {floorPlanUrl && (
//                     <button
//                       type="button"
//                       disabled={
//                         downloadingDoc ===
//                         "Floor_Plan"
//                       }
//                       onClick={() =>
//                         downloadDocument(
//                           floorPlanUrl,
//                           "Floor_Plan"
//                         )
//                       }
//                       className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F4256] text-white">
//                           <FiFileText />
//                         </div>

//                         <div>
//                           <p className="font-bold text-[#1F4256]">
//                             Floor Plan
//                           </p>

//                           <p className="mt-1 text-xs text-[#8197A2]">
//                             {downloadingDoc ===
//                             "Floor_Plan"
//                               ? "Downloading..."
//                               : "Click to download"}
//                           </p>
//                         </div>
//                       </div>

//                       <FiUpload className="rotate-180 text-[#168A70]" />
//                     </button>
//                   )}

//                   {reraUrl && (
//                     <button
//                       type="button"
//                       disabled={
//                         downloadingDoc ===
//                         "RERA_Certificate"
//                       }
//                       onClick={() =>
//                         downloadDocument(
//                           reraUrl,
//                           "RERA_Certificate"
//                         )
//                       }
//                       className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ED6AE] text-[#173247]">
//                           <FiFileText />
//                         </div>

//                         <div>
//                           <p className="font-bold text-[#1F4256]">
//                             RERA Certificate
//                           </p>

//                           <p className="mt-1 text-xs text-[#8197A2]">
//                             {downloadingDoc ===
//                             "RERA_Certificate"
//                               ? "Downloading..."
//                               : "Click to download"}
//                           </p>
//                         </div>
//                       </div>

//                       <FiUpload className="rotate-180 text-[#168A70]" />
//                     </button>
//                   )}
//                 </div>
//               </section>
//             )}

//             {/* CREATOR */}
//             {(property.addedBy ||
//               property.createdBy) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiUser size={20} />
//                   }
//                   title="Property Ownership & Creator"
//                   subtitle="Information about who added this property."
//                 />

//                 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                   <DetailCard
//                     label="Created By"
//                     value={
//                       property.addedBy
//                         ?.name ||
//                       property.createdBy
//                         ?.name ||
//                       property.addedBy
//                         ?.role ||
//                       property.createdBy
//                         ?.role ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Creator Role"
//                     value={
//                       property.addedBy
//                         ?.role ||
//                       property.createdBy
//                         ?.role ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Creator ID"
//                     value={
//                       property.addedBy
//                         ?.id ||
//                       property.createdBy
//                         ?.id ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Status"
//                     value={formatStatus(
//                       property.status
//                     )}
//                   />
//                 </div>
//               </section>
//             )}

//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="h-11 rounded-xl bg-[#1F4256] px-6 text-sm font-bold text-white transition hover:bg-[#18394B]"
//               >
//                 Close Property View
//               </button>
//             </div>

//             <div className="h-1" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/* =========================================================
   PROPERTY PREVIEW
========================================================= */

function PropertyPreview({
  open,
  property,
  onClose,
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [downloadingDoc, setDownloadingDoc] = useState("");

  useBodyScrollLock(open);

  useEffect(() => {
    setSelectedImage(0);
  }, [property]);

  if (!open || !property) return null;

  /* =========================================================
     HELPERS
  ========================================================= */

  const hasValue = (value) => {
    return (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    );
  };

  const toArray = (value) => {
    if (Array.isArray(value)) {
      return value.filter(
        (item) =>
          item !== undefined &&
          item !== null &&
          String(item).trim() !== ""
      );
    }

    if (
      typeof value === "string" &&
      value.trim()
    ) {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const money = (value) => {
    const amount = Number(value);

    if (!amount || Number.isNaN(amount)) {
      return "—";
    }

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const shortPrice = (value) => {
    const amount = Number(value);

    if (!amount || Number.isNaN(amount)) {
      return "Price not added";
    }

    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }

    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }

    return money(amount);
  };

  const formatFrequency = (value) => {
    if (!value) return "";

    const text = String(value).trim();

    if (/^per\s+month$/i.test(text)) {
      return "per month";
    }

    if (/^per\s+week$/i.test(text)) {
      return "per week";
    }

    if (/^per\s+day$/i.test(text)) {
      return "per day";
    }

    if (/^per\s+year$/i.test(text)) {
      return "per year";
    }

    return text.toLowerCase();
  };

  const normalizeBoolean = (value) => {
    if (
      value === true ||
      value === "true" ||
      value === 1 ||
      value === "1" ||
      String(value).toLowerCase() === "yes"
    ) {
      return "Yes";
    }

    if (
      value === false ||
      value === "false" ||
      value === 0 ||
      value === "0" ||
      String(value).toLowerCase() === "no"
    ) {
      return "No";
    }

    return "—";
  };

  /* =========================================================
     NESTED RESPONSE MAPPING
  ========================================================= */

  const location = property.location || {};

  const rent = property.rent || {};

  const securityDeposit =
    property.securityDeposit || {};

  const specifications =
    property.specifications || {};

  const media = property.media || {};

  const availability =
    property.availability || {};

  const images =
    Array.isArray(property.images) &&
    property.images.length
      ? property.images.filter(
          (item) => item?.url
        )
      : Array.isArray(media.images) &&
        media.images.length
      ? media.images.filter(
          (item) => item?.url
        )
      : [
          {
            url:
              "https://via.placeholder.com/1200x700?text=Property+Image",
          },
        ];

  const videos =
    Array.isArray(media.videos)
      ? media.videos.filter(
          (item) => item?.url
        )
      : [];

  const locationText =
    [
      location.locality || property.locality,
      location.city || property.city,
      location.state || property.state,
    ]
      .filter(Boolean)
      .join(", ") ||
    "Location not available";

  const rentAmount = hasValue(rent.amount)
    ? rent.amount
    : property.price;

  const rentFrequency =
    rent.frequency ||
    property.frequency ||
    "";

  const rentNegotiable =
    rent.negotiable !== undefined
      ? rent.negotiable
      : property.negotiable;

  const maintenance =
    hasValue(property.maintenance)
      ? property.maintenance
      : null;

  const securityDepositAmount =
    hasValue(securityDeposit.amount)
      ? securityDeposit.amount
      : null;

  const securityDepositText =
    securityDepositAmount !== null
      ? `${money(securityDepositAmount)}${
          securityDeposit.type
            ? ` (${securityDeposit.type})`
            : ""
        }`
      : "—";

  const bhk =
    property.bhk ||
    property.bedrooms ||
    "—";

  const areaDetails = Array.isArray(
    property.areaDetails
  )
    ? property.areaDetails.filter(Boolean)
    : [];

  const additionalSpaces = toArray(
    property.additionalSpaces
  );

  const suitedFor = toArray(
    property.suitedFor
  );

  const amenities = toArray(
    property.amenities
  );

  const propertyHighlights = toArray(
    property.propertyHighlights
  );

  const tags = toArray(
    property.tags
  );

  const waterSources = toArray(
    specifications.waterSources
  );

  const locationAdvantages = toArray(
    specifications.locationAdvantages
  );

  const isRentProperty =
    /rent|lease/i.test(
      String(
        property.transactionType ||
          property.category ||
          property.listingType ||
          property.purpose ||
          property.propertyFor ||
          property.propertyType ||
          ""
      )
    ) ||
    hasValue(property.rent) ||
    hasValue(property.securityDeposit);

  const displayBedrooms =
    hasValue(property.bedrooms)
      ? property.bedrooms
      : bhk;

  const displayBathrooms =
    hasValue(
      specifications.bathrooms
    )
      ? specifications.bathrooms
      : property.bathrooms;

  const displayBalconies =
    hasValue(
      specifications.balconies
    )
      ? specifications.balconies
      : property.balconies;

  const displayParking =
    hasValue(property.parking)
      ? property.parking
      : hasValue(
          specifications.coveredParking
        ) ||
        hasValue(
          specifications.openParking
        )
      ? Number(
          specifications.coveredParking || 0
        ) +
          Number(
            specifications.openParking || 0
          )
      : null;

  const displayFloorNo =
    hasValue(
      specifications.propertyFloor
    )
      ? specifications.propertyFloor
      : property.floorNo;

  const displayTotalFloors =
    hasValue(
      specifications.totalFloorCount
    )
      ? specifications.totalFloorCount
      : property.totalFloors;

  const displayFacing =
    specifications.facing ||
    property.facing ||
    "";

  const projectName =
    property.projectName ||
    property.project?.name ||
    "";

  const developerName =
    property.developerName ||
    property.project?.developerName ||
    property.developer?.name ||
    "";

  /* =========================================================
     CONNECTING ROAD
     HIDE WHEN keepUnitNoPrivate = true
  ========================================================= */

  const keepUnitNoPrivate =
    specifications.keepUnitNoPrivate === true;

  const connectingRoadWidth =
    specifications.connectingRoadWidth || {};

  const hasConnectingRoadWidth =
    hasValue(
      connectingRoadWidth.value
    );

  /* =========================================================
     DOCUMENTS / MEDIA
  ========================================================= */

  const floorPlanUrl =
    typeof property.floorPlan === "string"
      ? property.floorPlan
      : property.floorPlan?.url || "";

  const reraUrl =
    typeof property.reraCertificate ===
    "string"
      ? property.reraCertificate
      : property.reraCertificate?.url ||
        "";

  const uploadedVideoUrl =
    typeof property.video === "string"
      ? property.video
      : property.video?.url || "";

  const getYouTubeEmbedUrl = (
    url = ""
  ) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);

      if (
        parsed.hostname.includes(
          "youtube.com"
        )
      ) {
        if (
          parsed.pathname.startsWith(
            "/embed/"
          )
        ) {
          return url;
        }

        if (
          parsed.pathname.startsWith(
            "/shorts/"
          )
        ) {
          const id =
            parsed.pathname
              .split("/shorts/")[1]
              ?.split("/")[0];

          return id
            ? `https://www.youtube.com/embed/${id}`
            : "";
        }

        const id =
          parsed.searchParams.get("v");

        return id
          ? `https://www.youtube.com/embed/${id}`
          : "";
      }

      if (
        parsed.hostname.includes(
          "youtu.be"
        )
      ) {
        const id =
          parsed.pathname
            .replace("/", "")
            .split("/")[0];

        return id
          ? `https://www.youtube.com/embed/${id}`
          : "";
      }

      return "";
    } catch {
      return "";
    }
  };

  const youtubeEmbed =
    getYouTubeEmbedUrl(
      property.videoLink || ""
    );

  const isDirectVideo = (url = "") =>
    /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(
      String(url)
    );

  /* =========================================================
     DOCUMENT DOWNLOAD
  ========================================================= */

  const cleanFilePart = (
    value,
    fallback
  ) =>
    String(value || fallback)
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");

  const getExtension = (
    url,
    fallback = "pdf"
  ) => {
    try {
      const cleanUrl =
        String(url || "").split("?")[0];

      const filename =
        cleanUrl.split("/").pop() || "";

      const ext = filename.includes(".")
        ? filename
            .split(".")
            .pop()
            .toLowerCase()
        : "";

      return ext && ext.length <= 6
        ? ext
        : fallback;
    } catch {
      return fallback;
    }
  };

  const downloadDocument = async (
    url,
    type
  ) => {
    if (!url) return;

    const propertyName =
      cleanFilePart(
        property.title,
        property.propertyId ||
          "Property"
      );

    const locationName =
      cleanFilePart(
        [
          location.locality ||
            property.locality,
          location.city ||
            property.city,
        ]
          .filter(Boolean)
          .join("_"),
        "Location"
      );

    const documentName =
      cleanFilePart(
        type,
        "Document"
      );

    const extension =
      getExtension(url);

    const filename =
      `${propertyName}_${locationName}_${documentName}.${extension}`;

    try {
      setDownloadingDoc(type);

      const response =
        await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Document download failed"
        );
      }

      const blob =
        await response.blob();

      const objectUrl =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = objectUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error(
        "Document Download Error:",
        error
      );

      const link =
        document.createElement("a");

      link.href = url;
      link.download = filename;
      link.target = "_blank";
      link.rel = "noreferrer";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setDownloadingDoc("");
    }
  };

  /* =========================================================
     IMAGE NAVIGATION
  ========================================================= */

  const previousImage = () =>
    setSelectedImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );

  const nextImage = () =>
    setSelectedImage((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );

  /* =========================================================
     REUSABLE CARD
  ========================================================= */

  const DetailCard = ({
    label,
    value,
    icon,
    highlight = false,
  }) => (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-[#3ED6AE]/40 bg-[#E9FBF6]"
          : "border-[#E3EBEE] bg-[#F8FBFC]"
      }`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              highlight
                ? "bg-white text-[#168A70]"
                : "bg-[#E9FBF6] text-[#168A70]"
            }`}
          >
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
            {label}
          </p>

          <p
            className={`mt-1 break-words text-sm ${
              highlight
                ? "font-extrabold text-[#168A70]"
                : "font-bold text-[#1F4256]"
            }`}
          >
            {value === "" ||
            value === null ||
            value === undefined
              ? "—"
              : value}
          </p>
        </div>
      </div>
    </div>
  );

  const SectionHeading = ({
    icon,
    title,
    subtitle,
  }) => (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F4256] text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#1F4256]">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-0.5 text-xs leading-5 text-[#8197A2]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const Pill = ({
    children,
    type = "default",
  }) => {
    const classes =
      type === "highlight"
        ? "border-[#3ED6AE]/50 bg-[#E9FBF6] text-[#168A70]"
        : type === "tag"
        ? "bg-[#1F4256]/5 text-[#1F4256]"
        : "border-[#3ED6AE]/30 bg-[#E9FBF6] text-[#168A70]";

    return (
      <span
        className={`rounded-full border px-3 py-1.5 text-xs font-bold ${classes}`}
      >
        {children}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#102C3A]/75 p-2 backdrop-blur-sm sm:p-4">
      <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="relative shrink-0 overflow-hidden bg-[#1F4256] px-5 py-5 text-white sm:px-7">
          <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-[#3ED6AE]/10" />
          <div className="pointer-events-none absolute right-28 top-0 h-40 w-40 rounded-full bg-white/[0.04]" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9BD8E5]">
                DIGINIWAS PROPERTY VIEW
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h2 className="truncate text-xl font-bold sm:text-2xl">
                  {property.title ||
                    "Untitled Property"}
                </h2>

                <StatusBadge
                  status={
                    property.status
                  }
                />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                {property.transactionType && (
                  <span className="rounded-full bg-white/10 px-3 py-1.5 font-bold text-white">
                    {property.transactionType}
                  </span>
                )}

                {property.buildingType && (
                  <span className="rounded-full bg-white/10 px-3 py-1.5 font-bold text-white">
                    {property.buildingType}
                  </span>
                )}

                {property.propertyType && (
                  <span className="rounded-full bg-white/10 px-3 py-1.5 font-bold text-white">
                    {property.propertyType}
                  </span>
                )}
              </div>

              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                <FiMapPin size={14} />
                {locationText}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition hover:bg-white/20"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* =====================================================
            SCROLL AREA
        ===================================================== */}

        <div
          className={`min-h-0 flex-1 overflow-y-auto bg-[#F4F7F8] ${SCROLLBAR_HIDDEN}`}
        >
          <div className="space-y-6 p-3 sm:p-6">

            {/* =================================================
                IMAGE GALLERY
            ================================================= */}

            <section className="overflow-hidden rounded-3xl border border-[#DDE7EA] bg-white shadow-sm">
              <div className="relative h-[280px] bg-slate-100 sm:h-[460px]">

                <img
                  src={
                    images[
                      selectedImage
                    ]?.url
                  }
                  alt={
                    property.title ||
                    "Property"
                  }
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {property.transactionType && (
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
                      {
                        property.transactionType
                      }
                    </span>
                  )}

                  {property.buildingType && (
                    <span className="rounded-full bg-[#E9FBF6]/95 px-3 py-1.5 text-xs font-bold text-[#168A70] shadow-sm">
                      {
                        property.buildingType
                      }
                    </span>
                  )}

                  {property.propertyType && (
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
                      {
                        property.propertyType
                      }
                    </span>
                  )}
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={
                        previousImage
                      }
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
                    >
                      <FiChevronLeft
                        size={20}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={
                        nextImage
                      }
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
                    >
                      <FiChevronRight
                        size={20}
                      />
                    </button>
                  </>
                )}

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div className="min-w-0 text-white">
                    <p className="text-xs text-white/70">
                      {property.propertyId ||
                        "Property Listing"}
                    </p>

                    <h3 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                      {property.title ||
                        "Untitled Property"}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
                      <FiMapPin />
                      {
                        locationText
                      }
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl bg-black/35 px-4 py-3 text-right text-white backdrop-blur">
                    <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">
                      {isRentProperty
                        ? "Rent"
                        : "Listing Price"}
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {shortPrice(
                        rentAmount
                      )}
                    </p>

                    {isRentProperty &&
                      rentFrequency && (
                        <p className="mt-0.5 text-[11px] font-semibold text-white/70">
                          /{" "}
                          {formatFrequency(
                            rentFrequency
                          )}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div
                  className={`flex gap-3 overflow-x-auto p-4 ${SCROLLBAR_HIDDEN}`}
                >
                  {images.map(
                    (
                      image,
                      index
                    ) => (
                      <button
                        type="button"
                        key={
                          image.url ||
                          index
                        }
                        onClick={() =>
                          setSelectedImage(
                            index
                          )
                        }
                        className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                          selectedImage ===
                          index
                            ? "border-[#3ED6AE]"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={
                            image.url
                          }
                          alt=""
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">
                          {index + 1}
                        </span>
                      </button>
                    )
                  )}
                </div>
              )}
            </section>

            {/* =================================================
                BASIC PROPERTY DETAILS
            ================================================= */}

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={
                  <FiHome size={20} />
                }
                title="Property Details"
                subtitle="Basic details of this property."
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <DetailCard
                  label="Title"
                  value={
                    property.title ||
                    "—"
                  }
                />

                <DetailCard
                  label="Transaction Type"
                  value={
                    property.transactionType ||
                    "—"
                  }
                />

                <DetailCard
                  label="Building Type"
                  value={
                    property.buildingType ||
                    "—"
                  }
                />

                <DetailCard
                  label="Property Type"
                  value={
                    property.propertyType ||
                    "—"
                  }
                />

                <DetailCard
                  label="City"
                  value={
                    location.city ||
                    property.city ||
                    "—"
                  }
                  icon={
                    <FiMapPin />
                  }
                />

                <DetailCard
                  label="State"
                  value={
                    location.state ||
                    property.state ||
                    "—"
                  }
                />

                <DetailCard
                  label="Country"
                  value={
                    location.country ||
                    property.country ||
                    "—"
                  }
                />

                <DetailCard
                  label="Locality"
                  value={
                    location.locality ||
                    property.locality ||
                    "—"
                  }
                />

                <div className="sm:col-span-2 lg:col-span-4">
                  <DetailCard
                    label="Address"
                    value={
                      location.address ||
                      property.address ||
                      "—"
                    }
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                PRICING
            ================================================= */}

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={
                  <FiDollarSign
                    size={20}
                  />
                }
                title="Pricing & Commercial Details"
                subtitle="Rent, maintenance and security deposit information."
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {isRentProperty ? (
                  <>
                    <DetailCard
                      label="Rent Amount"
                      value={money(
                        rentAmount
                      )}
                      icon={
                        <FiDollarSign />
                      }
                    />

                    <DetailCard
                      label="Frequency"
                      value={
                        formatFrequency(
                          rentFrequency
                        ) || "—"
                      }
                    />

                    <DetailCard
                      label="Maintenance"
                      value={money(
                        maintenance
                      )}
                    />

                    <DetailCard
                      label="Security Deposit"
                      value={
                        securityDepositText
                      }
                    />

                    <DetailCard
                      label="Negotiable"
                      value={normalizeBoolean(
                        rentNegotiable
                      )}
                    />

                    <DetailCard
                      label="Category"
                      value={
                        property.category ||
                        "—"
                      }
                    />

                    <DetailCard
                      label="Listing Type"
                      value={
                        property.listingType ||
                        "—"
                      }
                    />

                    <DetailCard
                      label="Property ID"
                      value={
                        property.propertyId ||
                        "—"
                      }
                    />
                  </>
                ) : (
                  <>
                    <DetailCard
                      label="Total Price"
                      value={money(
                        property.price
                      )}
                      icon={
                        <FiDollarSign />
                      }
                    />

                    <DetailCard
                      label="Price / Sq.Ft"
                      value={
                        property.pricePerSqft
                          ? money(
                              property.pricePerSqft
                            )
                          : "—"
                      }
                    />

                    <DetailCard
                      label="Booking Amount"
                      value={money(
                        property.bookingAmount
                      )}
                    />

                    <DetailCard
                      label="Maintenance"
                      value={money(
                        maintenance
                      )}
                    />

                    <DetailCard
                      label="Negotiable"
                      value={normalizeBoolean(
                        property.negotiable
                      )}
                    />

                    <DetailCard
                      label="Transaction Type"
                      value={
                        property.transactionType ||
                        "—"
                      }
                    />

                    <DetailCard
                      label="Category"
                      value={
                        property.category ||
                        "—"
                      }
                    />

                    <DetailCard
                      label="Property ID"
                      value={
                        property.propertyId ||
                        "—"
                      }
                    />
                  </>
                )}
              </div>
            </section>

            {/* =================================================
                BHK + AREA + AVAILABILITY
            ================================================= */}

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={
                  <FiMaximize2
                    size={20}
                  />
                }
                title="Area, BHK & Availability"
                subtitle="Property size, occupancy and availability information."
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <DetailCard
                  label="BHK"
                  value={bhk}
                />

                <DetailCard
                  label="Bedrooms"
                  value={
                    displayBedrooms
                  }
                />

                <DetailCard
                  label="Availability"
                  value={
                    availability.availableFrom ||
                    "—"
                  }
                />

                {availability.availableDate && (
                  <DetailCard
                    label="Available Date"
                    value={new Date(
                      availability.availableDate
                    ).toLocaleDateString(
                      "en-IN"
                    )}
                  />
                )}

                {areaDetails.map(
                  (area, index) => (
                    <DetailCard
                      key={`area-${index}`}
                      label={
                        area.type ||
                        "Area"
                      }
                      value={
                        hasValue(
                          area.value
                        )
                          ? `${area.value} ${
                              area.unit ||
                              ""
                            }`
                          : "—"
                      }
                    />
                  )
                )}

                {property.propertySize &&
                  areaDetails.length ===
                    0 && (
                    <DetailCard
                      label="Property Size"
                      value={`${property.propertySize} ${
                        property.sizeUnit ||
                        ""
                      }`}
                    />
                  )}

                {property.superBuiltupArea && (
                  <DetailCard
                    label="Super Built-up Area"
                    value={`${property.superBuiltupArea} ${
                      property.sizeUnit ||
                      ""
                    }`}
                  />
                )}

                {property.carpetArea && (
                  <DetailCard
                    label="Carpet Area"
                    value={`${property.carpetArea} ${
                      property.sizeUnit ||
                      ""
                    }`}
                  />
                )}
              </div>
            </section>

            {/* =================================================
                SUITED FOR
            ================================================= */}

            {suitedFor.length > 0 && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiUser size={20} />
                  }
                  title="Suited For"
                  subtitle="Target occupants selected for this property."
                />

                <div className="flex flex-wrap gap-2">
                  {suitedFor.map(
                    (item, index) => (
                      <Pill key={index}>
                        {item}
                      </Pill>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                LOCATION
            ================================================= */}

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={
                  <FiNavigation
                    size={20}
                  />
                }
                title="Location Details"
                subtitle="Property location and address information."
              />

              <div className="grid gap-4 lg:grid-cols-2">

                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailCard
                    label="City"
                    value={
                      location.city ||
                      property.city ||
                      "—"
                    }
                    icon={
                      <FiMapPin />
                    }
                  />

                  <DetailCard
                    label="State"
                    value={
                      location.state ||
                      property.state ||
                      "—"
                    }
                  />

                  <DetailCard
                    label="Country"
                    value={
                      location.country ||
                      property.country ||
                      "—"
                    }
                  />

                  <DetailCard
                    label="Locality"
                    value={
                      location.locality ||
                      property.locality ||
                      "—"
                    }
                  />

                  <DetailCard
                    label="Society"
                    value={
                      location.society ||
                      "—"
                    }
                  />

                  <DetailCard
                    label="PIN Code"
                    value={
                      location.pinCode ||
                      property.pinCode ||
                      "—"
                    }
                  />

                  <div className="sm:col-span-2">
                    <DetailCard
                      label="Full Address"
                      value={
                        location.address ||
                        property.address ||
                        "—"
                      }
                    />
                  </div>

                  {hasValue(
                    location.latitude ??
                      property.latitude
                  ) && (
                    <DetailCard
                      label="Latitude"
                      value={
                        location.latitude ??
                        property.latitude
                      }
                    />
                  )}

                  {hasValue(
                    location.longitude ??
                      property.longitude
                  ) && (
                    <DetailCard
                      label="Longitude"
                      value={
                        location.longitude ??
                        property.longitude
                      }
                    />
                  )}
                </div>

                {/* <div className="overflow-hidden rounded-2xl border border-[#DDE7EA] bg-[#EEF3F5]">
                  {hasValue(
                    location.latitude ??
                      property.latitude
                  ) &&
                  hasValue(
                    location.longitude ??
                      property.longitude
                  ) ? (
                    <iframe
                      title="Property location"
                      width="100%"
                      height="100%"
                      className="min-h-[300px]"
                      loading="lazy"
                      src={`https://maps.google.com/maps?q=${
                        location.latitude ??
                        property.latitude
                      },${
                        location.longitude ??
                        property.longitude
                      }&z=15&output=embed`}
                    />
                  ) : (
                    <div className="flex min-h-[300px] items-center justify-center text-sm text-[#8197A2]">
                      Location map not
                      available
                    </div>
                  )}
                </div> */}
                <div className="overflow-hidden rounded-2xl border border-[#DDE7EA] bg-[#EEF3F5]">
  {property.latitude &&
  property.longitude ? (
    <iframe
      title="Property location"
      width="100%"
      height="100%"
      className="min-h-[300px] w-full border-0"
      loading="lazy"
      src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
    />
  ) : (
    <div className="flex min-h-[300px] items-center justify-center text-sm text-[#8197A2]">
      Location map not available
    </div>
  )}
</div>
              </div>
            </section>

            {/* =================================================
                PROPERTY SPECIFICATIONS
            ================================================= */}

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={
                  <FiHome size={20} />
                }
                title="Property Specifications"
                subtitle="Room, floor, parking and property specification details."
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <DetailCard
                  label="Bedrooms"
                  value={
                    displayBedrooms
                  }
                />

                <DetailCard
                  label="Bathrooms"
                  value={
                    hasValue(
                      displayBathrooms
                    )
                      ? displayBathrooms
                      : "—"
                  }
                />

                <DetailCard
                  label="Balconies"
                  value={
                    hasValue(
                      displayBalconies
                    )
                      ? displayBalconies
                      : "—"
                  }
                />

                <DetailCard
                  label="Parking"
                  value={
                    hasValue(
                      displayParking
                    )
                      ? displayParking
                      : "—"
                  }
                />

                <DetailCard
                  label="Floor No."
                  value={
                    hasValue(
                      displayFloorNo
                    )
                      ? displayFloorNo
                      : "—"
                  }
                />

                <DetailCard
                  label="Total Floors"
                  value={
                    hasValue(
                      displayTotalFloors
                    )
                      ? displayTotalFloors
                      : "—"
                  }
                />

                <DetailCard
                  label="Facing"
                  value={
                    displayFacing || "—"
                  }
                />

                <DetailCard
                  label="Furnishing"
                  value={
                    property.furnishing ||
                    "—"
                  }
                />

                {hasValue(
                  specifications.coveredParking
                ) && (
                  <DetailCard
                    label="Covered Parking"
                    value={
                      specifications.coveredParking
                    }
                  />
                )}

                {hasValue(
                  specifications.openParking
                ) && (
                  <DetailCard
                    label="Open Parking"
                    value={
                      specifications.openParking
                    }
                  />
                )}

                {hasValue(
                  specifications.powerBackup
                ) && (
                  <DetailCard
                    label="Power Backup"
                    value={normalizeBoolean(
                      specifications.powerBackup
                    )}
                  />
                )}

                {hasValue(
                  specifications.liftAvailable
                ) && (
                  <DetailCard
                    label="Lift Available"
                    value={normalizeBoolean(
                      specifications.liftAvailable
                    )}
                  />
                )}

                {specifications.view && (
                  <DetailCard
                    label="View"
                    value={
                      specifications.view
                    }
                  />
                )}

                {waterSources.length > 0 && (
                  <DetailCard
                    label="Water Sources"
                    value={waterSources.join(
                      ", "
                    )}
                  />
                )}

                {!keepUnitNoPrivate &&
                  hasConnectingRoadWidth && (
                    <DetailCard
                      label="Connecting Road Width"
                      value={`${connectingRoadWidth.value}${
                        connectingRoadWidth.unit
                          ? ` ${connectingRoadWidth.unit}`
                          : ""
                      }`}
                    />
                  )}
              </div>
            </section>

            {/* =================================================
                LOCATION ADVANTAGES
            ================================================= */}

            {locationAdvantages.length > 0 && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiMapPin size={20} />
                  }
                  title="Location Advantages"
                  subtitle="Advantages and nearby facilities associated with the property."
                />

                <div className="flex flex-wrap gap-2">
                  {locationAdvantages.map(
                    (item, index) => (
                      <Pill
                        key={index}
                      >
                        {item}
                      </Pill>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                ADDITIONAL SPACES
            ================================================= */}

            {additionalSpaces.length > 0 && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiGrid size={20} />
                  }
                  title="Additional Spaces"
                  subtitle="Additional usable spaces available with the property."
                />

                <div className="flex flex-wrap gap-2">
                  {additionalSpaces.map(
                    (space, index) => (
                      <Pill key={index}>
                        {space}
                      </Pill>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                AMENITIES & PROPERTY TAGS
            ================================================= */}

            <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={
                  <FiCheckCircle
                    size={20}
                  />
                }
                title="Amenities & Property Tags"
                subtitle="Amenities, highlights and important property features."
              />

              {/* FURNISHING */}
              {property.furnishing && (
                <div className="mb-6">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                    Furnishing
                  </p>

                  <DetailCard
                    label="Furnishing Type"
                    value={
                      property.furnishing
                    }
                  />
                </div>
              )}

              {/* AMENITIES */}
              <div className="mb-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                  Amenities
                </p>

                {amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {amenities.map(
                      (
                        amenity,
                        index
                      ) => (
                        <Pill key={index}>
                          {amenity}
                        </Pill>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#8197A2]">
                    No amenities added.
                  </p>
                )}
              </div>

              {/* PROPERTY HIGHLIGHTS */}
              <div className="mb-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                  Property Highlights
                </p>

                {propertyHighlights.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {propertyHighlights.map(
                      (
                        highlight,
                        index
                      ) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-[#3ED6AE]/40 bg-[#E9FBF6] p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#168A70]">
                              <FiCheckCircle
                                size={17}
                              />
                            </div>

                            <div>
                              <p className="text-sm font-extrabold leading-5 text-[#168A70]">
                                {
                                  highlight
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#8197A2]">
                    No property highlights added.
                  </p>
                )}
              </div>

              {/* ADDITIONAL SPACES */}
              {additionalSpaces.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                    Additional Spaces
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {additionalSpaces.map(
                      (
                        space,
                        index
                      ) => (
                        <Pill key={index}>
                          {space}
                        </Pill>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* SPECIFICATION FEATURES */}
              <div className="mb-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                  Key Specifications
                </p>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  <DetailCard
                    label="Bathrooms"
                    value={
                      hasValue(
                        displayBathrooms
                      )
                        ? displayBathrooms
                        : "—"
                    }
                  />

                  <DetailCard
                    label="Balconies"
                    value={
                      hasValue(
                        displayBalconies
                      )
                        ? displayBalconies
                        : "—"
                    }
                  />

                  <DetailCard
                    label="Parking"
                    value={
                      hasValue(
                        displayParking
                      )
                        ? displayParking
                        : "—"
                    }
                  />

                  <DetailCard
                    label="Floor No."
                    value={
                      hasValue(
                        displayFloorNo
                      )
                        ? displayFloorNo
                        : "—"
                    }
                  />

                  <DetailCard
                    label="Total Floors"
                    value={
                      hasValue(
                        displayTotalFloors
                      )
                        ? displayTotalFloors
                        : "—"
                    }
                  />

                  <DetailCard
                    label="Facing"
                    value={
                      displayFacing || "—"
                    }
                  />

                  {hasValue(
                    specifications.coveredParking
                  ) && (
                    <DetailCard
                      label="Covered Parking"
                      value={
                        specifications.coveredParking
                      }
                    />
                  )}

                  {hasValue(
                    specifications.openParking
                  ) && (
                    <DetailCard
                      label="Open Parking"
                      value={
                        specifications.openParking
                      }
                    />
                  )}

                  {hasValue(
                    specifications.powerBackup
                  ) && (
                    <DetailCard
                      label="Power Backup"
                      value={normalizeBoolean(
                        specifications.powerBackup
                      )}
                    />
                  )}

                  {hasValue(
                    specifications.liftAvailable
                  ) && (
                    <DetailCard
                      label="Lift Available"
                      value={normalizeBoolean(
                        specifications.liftAvailable
                      )}
                    />
                  )}

                  {specifications.view && (
                    <DetailCard
                      label="View"
                      value={
                        specifications.view
                      }
                    />
                  )}

                  {waterSources.length > 0 && (
                    <DetailCard
                      label="Water Sources"
                      value={waterSources.join(
                        ", "
                      )}
                    />
                  )}

                  {!keepUnitNoPrivate &&
                    hasConnectingRoadWidth && (
                      <DetailCard
                        label="Connecting Road Width"
                        value={`${connectingRoadWidth.value}${
                          connectingRoadWidth.unit
                            ? ` ${connectingRoadWidth.unit}`
                            : ""
                        }`}
                      />
                    )}
                </div>
              </div>

              {/* TAGS */}
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                  Property Tags
                </p>

                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tags.map(
                      (tag, index) => (
                        <Pill
                          key={index}
                          type="tag"
                        >
                          #{tag}
                        </Pill>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#8197A2]">
                    No tags added.
                  </p>
                )}
              </div>
            </section>

            {/* =================================================
                PROJECT INFORMATION
                SHOW ONLY WHEN VALUES EXIST
            ================================================= */}

            {(projectName ||
              developerName) && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiGrid size={20} />
                  }
                  title="Project Information"
                  subtitle="Project and developer information."
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  {projectName && (
                    <DetailCard
                      label="Project Name"
                      value={
                        projectName
                      }
                    />
                  )}

                  {developerName && (
                    <DetailCard
                      label="Developer Name"
                      value={
                        developerName
                      }
                    />
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            {(property.oneLineDescription ||
              property.description) && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiFileText
                      size={20}
                    />
                  }
                  title="Property Description"
                  subtitle="Property description and overview."
                />

                {property.oneLineDescription && (
                  <div className="mb-4 rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                      One Line Description
                    </p>

                    <p className="mt-2 text-sm font-bold leading-6 text-[#1F4256]">
                      {
                        property.oneLineDescription
                      }
                    </p>
                  </div>
                )}

                {property.description && (
                  <div className="rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
                      Description
                    </p>

                    <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#536779]">
                      {
                        property.description
                      }
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* =================================================
                VIDEO
            ================================================= */}

            {(uploadedVideoUrl ||
              youtubeEmbed ||
              videos.length > 0 ||
              property.videoLink) && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiVideo
                      size={20}
                    />
                  }
                  title="Property Video / Walkthrough"
                  subtitle="Property videos uploaded or linked with this listing."
                />

                {uploadedVideoUrl && (
                  <div className="overflow-hidden rounded-2xl bg-black">
                    <video
                      src={
                        uploadedVideoUrl
                      }
                      controls
                      playsInline
                      preload="metadata"
                      className="max-h-[560px] w-full"
                    />
                  </div>
                )}

                {!uploadedVideoUrl &&
                  videos.length > 0 && (
                    <div className="space-y-4">
                      {videos.map(
                        (videoItem, index) => (
                          <div
                            key={
                              videoItem._id ||
                              videoItem.url ||
                              index
                            }
                            className="overflow-hidden rounded-2xl bg-black"
                          >
                            <video
                              src={
                                videoItem.url
                              }
                              controls
                              playsInline
                              preload="metadata"
                              className="max-h-[560px] w-full"
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}

                {!uploadedVideoUrl &&
                  videos.length === 0 &&
                  youtubeEmbed && (
                    <div className="aspect-video overflow-hidden rounded-2xl bg-black">
                      <iframe
                        src={
                          youtubeEmbed
                        }
                        title="Property walkthrough"
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                {!uploadedVideoUrl &&
                  videos.length === 0 &&
                  !youtubeEmbed &&
                  property.videoLink &&
                  isDirectVideo(
                    property.videoLink
                  ) && (
                    <video
                      src={
                        property.videoLink
                      }
                      controls
                      playsInline
                      className="max-h-[560px] w-full rounded-2xl bg-black"
                    />
                  )}

                {!uploadedVideoUrl &&
                  videos.length === 0 &&
                  !youtubeEmbed &&
                  property.videoLink &&
                  !isDirectVideo(
                    property.videoLink
                  ) && (
                    <a
                      href={
                        property.videoLink
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-sm font-bold text-[#1F4256] transition hover:border-[#3ED6AE]"
                    >
                      <span>
                        Open Property
                        Walkthrough
                      </span>

                      <FiVideo />
                    </a>
                  )}
              </section>
            )}

            {/* =================================================
                DOCUMENTS
            ================================================= */}

            {(floorPlanUrl ||
              reraUrl ||
              property.documents?.length) && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiFileText
                      size={20}
                    />
                  }
                  title="Property Documents"
                  subtitle="Documents associated with this property."
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {floorPlanUrl && (
                    <button
                      type="button"
                      disabled={
                        downloadingDoc ===
                        "Floor_Plan"
                      }
                      onClick={() =>
                        downloadDocument(
                          floorPlanUrl,
                          "Floor_Plan"
                        )
                      }
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F4256] text-white">
                          <FiFileText />
                        </div>

                        <div>
                          <p className="font-bold text-[#1F4256]">
                            Floor Plan
                          </p>

                          <p className="mt-1 text-xs text-[#8197A2]">
                            {downloadingDoc ===
                            "Floor_Plan"
                              ? "Downloading..."
                              : "Click to download"}
                          </p>
                        </div>
                      </div>

                      <FiUpload className="rotate-180 text-[#168A70]" />
                    </button>
                  )}

                  {reraUrl && (
                    <button
                      type="button"
                      disabled={
                        downloadingDoc ===
                        "RERA_Certificate"
                      }
                      onClick={() =>
                        downloadDocument(
                          reraUrl,
                          "RERA_Certificate"
                        )
                      }
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ED6AE] text-[#173247]">
                          <FiFileText />
                        </div>

                        <div>
                          <p className="font-bold text-[#1F4256]">
                            RERA Certificate
                          </p>

                          <p className="mt-1 text-xs text-[#8197A2]">
                            {downloadingDoc ===
                            "RERA_Certificate"
                              ? "Downloading..."
                              : "Click to download"}
                          </p>
                        </div>
                      </div>

                      <FiUpload className="rotate-180 text-[#168A70]" />
                    </button>
                  )}

                  {Array.isArray(
                    property.documents
                  ) &&
                    property.documents.map(
                      (
                        documentItem,
                        index
                      ) => (
                        <button
                          type="button"
                          key={
                            documentItem._id ||
                            documentItem.url ||
                            index
                          }
                          disabled={
                            downloadingDoc ===
                            `Document_${index}`
                          }
                          onClick={() =>
                            downloadDocument(
                              documentItem.url,
                              `Document_${index + 1}`
                            )
                          }
                          className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#1F4256]">
                              <FiFileText />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-bold text-[#1F4256]">
                                {
                                  documentItem.name ||
                                    `Document ${
                                      index + 1
                                    }`
                                }
                              </p>

                              <p className="mt-1 text-xs text-[#8197A2]">
                                {downloadingDoc ===
                                `Document_${index}`
                                  ? "Downloading..."
                                  : documentItem.mimeType ||
                                    "Document"}
                              </p>
                            </div>
                          </div>

                          <FiUpload className="rotate-180 shrink-0 text-[#168A70]" />
                        </button>
                      )
                    )}
                </div>
              </section>
            )}

            {/* =================================================
                CREATOR
            ================================================= */}

            {(property.addedBy ||
              property.createdBy) && (
              <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                  icon={
                    <FiUser size={20} />
                  }
                  title="Property Creator"
                  subtitle="Information about who added this property."
                />

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  <DetailCard
                    label="Created By"
                    value={
                      property.addedBy
                        ?.role?.toLowerCase() ===
                      "admin"
                        ? "Admin"
                        : property.addedBy
                            ?.name ||
                          property.createdBy
                            ?.name ||
                          property.addedBy
                            ?.role ||
                          property.createdBy
                            ?.role ||
                          "—"
                    }
                  />

                  <DetailCard
                    label="Creator Role"
                    value={
                      property.addedBy
                        ?.role ||
                      property.createdBy
                        ?.role ||
                      "—"
                    }
                  />

                  <DetailCard
                    label="Creator ID"
                    value={
                      property.addedBy
                        ?.userId ||
                      property.addedBy
                        ?.id ||
                      property.createdBy
                        ?.id ||
                      "—"
                    }
                  />

                  <DetailCard
                    label="Status"
                    value={
                      formatStatus(
                        property.status
                      )
                    }
                  />
                </div>
              </section>
            )}

            {/* =================================================
                CLOSE
            ================================================= */}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-xl bg-[#1F4256] px-6 text-sm font-bold text-white transition hover:bg-[#18394B]"
              >
                Close Property View
              </button>
            </div>

            <div className="h-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] text-white/55">
        {label}
      </span>
      <span className="max-w-[60%] truncate text-right text-[10px] font-bold text-white">
        {value || "-"}
      </span>
    </div>
  );
}

function PropertyStat({
  label,
  value,
}) {
  return (
    <div className="rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#91A2AC]">
        {label}
      </p>
      <p className="mt-2 text-lg font-extrabold text-[#173247]">
        {value || "-"}
      </p>
    </div>
  );
}

function InfoPanel({
  title,
  icon,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#25B98B]">
          {icon}
        </div>
        <h3 className="text-sm font-extrabold text-[#173247]">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E7EDF0] py-2.5 last:border-b-0">
      <span className="text-[10px] text-[#91A2AC]">
        {label}
      </span>
      <span className="max-w-[60%] break-words text-right text-[10px] font-bold text-[#425A70]">
        {value === 0
          ? 0
          : value || "-"}
      </span>
    </div>
  );
}



// import { useEffect, useMemo, useState } from "react";
// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import {
//   getAllPropertiesApi,
//   getPropertyByIdApi,
//   deletePropertyApi,
//   updatePropertyApi,
//   updatePropertyStatusApi,
// } from "../../../Services/propertyService";
// import {
//   FiFilter,
//   FiUpload,
//   FiEye,
//   FiEdit2,
//   FiChevronDown,
//   FiChevronUp,
//   FiInfo,
//   FiTrash2,
//   FiX,
//   FiMapPin,
//   FiChevronLeft,
//   FiChevronRight,
//   FiSearch,
//   FiHome,
//   FiUser,
//   FiCheckCircle,
//   FiClock,
//   FiGrid,
//   FiImage,
//   FiFileText,
//   FiVideo,
//   FiDollarSign,
//   FiMaximize2,
//   FiNavigation,
//   FiPlus,
// } from "react-icons/fi";

// import {
//   MdOutlineCheckCircle,
//   MdOutlineAutoAwesome,
//   MdTrendingUp,
//   MdVerified,
//   MdOutlinePhotoLibrary,
// } from "react-icons/md";

// import { BsRobot } from "react-icons/bs";
// import Swal from "sweetalert2";

// const DARK = "#1F3C50";
// const ACCENT = "#35C99A";

// const SCROLLBAR_HIDDEN =
//   "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

// /* =========================================================
//    HELPERS
// ========================================================= */

// const formatCurrency = (value) =>
//   `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

// const formatStatus = (value) =>
//   String(value || "-").replaceAll("_", " ");

// function StatusBadge({ status }) {
//   const styles = {
//     Draft: "bg-[#F4F7F8] text-[#536779] border-[#DCE5E9]",
//     Submitted: "bg-[#EEF6FF] text-[#2E90FA] border-blue-200",
//     Assigned_To_Partner:
//       "bg-cyan-50 text-cyan-700 border-cyan-200",
//     Reviewing:
//       "bg-[#FFF5E8] text-[#D97706] border-amber-200",
//     Verified:
//       "bg-[#EAF9F4] text-[#15966F] border-[#35C99A]/30",
//     Live:
//       "bg-[#EAF9F4] text-[#15966F] border-green-200",
//     Rejected:
//       "bg-red-50 text-red-700 border-red-200",
//     Sold:
//       "bg-purple-50 text-purple-700 border-purple-200",
//     Rented:
//       "bg-indigo-50 text-indigo-700 border-indigo-200",
//   };

//   return (
//     <span
//       className={`inline-flex max-w-full items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-1.5 py-1 text-[10px] font-bold sm:px-2 sm:text-[10px] lg:px-2.5 lg:text-[10px] ${
//         styles[status] || "bg-[#F4F7F8] text-[#536779] border-[#DCE5E9]"
//       }`}
//     >
//       {formatStatus(status)}
//     </span>
//   );
// }

// function CreatorBadge({ role }) {
//   const styles = {
//     Admin: "bg-[#EEF6FF] text-[#2E90FA]",
//     Partner: "bg-[#EAF9F4] text-[#15966F]",
//     Seller: "bg-orange-50 text-orange-700",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
//         styles[role] || "bg-gray-100 text-[#536779]"
//       }`}
//     >
//       {role || "Unknown"}
//     </span>
//   );
// }


// /* =========================================================
//    CUSTOM HOVER TOOLTIP
// ========================================================= */

// function HoverTooltip({
//   children,
//   text,
//   position = "top",
//   className = "",
// }) {
//   if (!text) {
//     return children;
//   }

//   const positions = {
//     top:
//       "bottom-full left-1/2 -translate-x-1/2 mb-2",
//     bottom:
//       "top-full left-1/2 -translate-x-1/2 mt-2",
//     left:
//       "right-full top-1/2 -translate-y-1/2 mr-2",
//     right:
//       "left-full top-1/2 -translate-y-1/2 ml-2",
//   };

//   const arrows = {
//     top:
//       "left-1/2 top-full -translate-x-1/2 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#173247]",
//     bottom:
//       "left-1/2 bottom-full -translate-x-1/2 border-x-[6px] border-x-transparent border-b-[6px] border-b-[#173247]",
//     left:
//       "left-full top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-[#173247]",
//     right:
//       "right-full top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#173247]",
//   };

//   return (
//     <div
//       className={`group/tooltip relative min-w-0 ${className}`}
//     >
//       {children}

//       <div
//         className={`
//           pointer-events-none
//           absolute
//           ${positions[position]}
//           z-[99999]
//           invisible
//           w-max
//           max-w-[300px]
//           translate-y-1
//           rounded-xl
//           bg-[#173247]
//           px-3
//           py-2
//           text-[10px]
//           font-semibold
//           leading-4
//           text-white
//           opacity-0
//           shadow-[0_10px_30px_rgba(15,23,42,0.25)]
//           transition-all
//           duration-150
//           group-hover/tooltip:visible
//           group-hover/tooltip:translate-y-0
//           group-hover/tooltip:opacity-100
//         `}
//       >
//         <span className="block break-words">
//           {text}
//         </span>

//         <span
//           className={`absolute h-0 w-0 ${arrows[position]}`}
//         />
//       </div>
//     </div>
//   );
// }

// function useBodyScrollLock(locked) {
//   useEffect(() => {
//     if (!locked) return;

//     const oldOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = oldOverflow;
//     };
//   }, [locked]);
// }

// /* =========================================================
//    AI ASSISTANT
// ========================================================= */

// function AIAssistant({ open, onClose }) {
//   if (!open) return null;

//   return (
//     <div className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-[370px] overflow-hidden rounded-[16px] border border-[#DCE5E9] bg-white shadow-2xl sm:right-6">
//       <div className="flex items-center justify-between border-b border-[#E7EDF0] bg-[#EAF9F4] px-4 py-3">
//         <div className="flex items-center gap-2.5">
//           <div
//             className="flex h-8 w-8 items-center justify-center rounded-full text-white"
//             style={{ backgroundColor: DARK }}
//           >
//             <BsRobot size={16} />
//           </div>

//           <div>
//             <p className="text-xs font-extrabold text-[#173247]">
//               AI Property Assistant
//             </p>
//             <p className="text-[10px] text-[#91A2AC]">
//               Smart listing workflows
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={onClose}
//           className="flex h-8 w-8 items-center justify-center rounded-lg text-[#91A2AC] transition hover:bg-white hover:text-[#425A70]"
//         >
//           <FiX size={15} />
//         </button>
//       </div>

//       <div className="space-y-3 p-4">
//         <p className="text-[11px] leading-5 text-[#7D8C9C]">
//           Select a property to unlock AI assisted listing workflows.
//         </p>

//         <button className="flex w-full items-center justify-between rounded-xl bg-[#25B98B] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#15966F]">
//           Generate Description
//           <MdOutlineAutoAwesome size={16} />
//         </button>

//         <button className="flex w-full items-center justify-between rounded-xl border border-[#35C99A]/30 bg-[#EAF9F4] px-4 py-3 text-xs font-semibold text-[#15966F] transition hover:bg-[#EAF9F4]">
//           Suggest Price
//           <MdTrendingUp size={16} />
//         </button>

//         <div className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFB] px-3 py-3">
//           <FiInfo
//             size={14}
//             className="mt-0.5 shrink-0 text-[#91A2AC]"
//           />
//           <p className="text-[10px] leading-4 text-[#7D8C9C]">
//             DIGINIWAS AI can help optimize descriptions, pricing,
//             positioning and lead capture.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN PAGE
// ========================================================= */

// export default function PropertyManagement() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [chatOpen, setChatOpen] = useState(false);

//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     let cancelled = false;

//     const openPropertyFromRoute = async () => {
//       try {
//         const response = await getPropertyByIdApi(id);

//         if (cancelled) return;

//         if (response?.success && response?.data) {
//           setSelectedProperty(response.data);
//           setPreviewOpen(true);
//         } else {
//           throw new Error("Property details were not returned by the API.");
//         }
//       } catch (error) {
//         if (cancelled) return;

//         console.error("Property Detail Error:", error);

//         await Swal.fire({
//           icon: "error",
//           title: "Property Not Found",
//           text:
//             error?.response?.data?.message ||
//             error?.message ||
//             "Unable to load property details.",
//           confirmButtonColor: DARK,
//         });

//         navigate("/property-management", { replace: true });
//       }
//     };

//     openPropertyFromRoute();

//     return () => {
//       cancelled = true;
//     };
//   }, [id, navigate]);

//   const [editOpen, setEditOpen] = useState(false);
//   const [editingProperty, setEditingProperty] = useState(null);

//   const [selectedRole, setSelectedRole] = useState("All");
//   const [selectedStatus, setSelectedStatus] = useState("All");
//   const [selectedCity, setSelectedCity] = useState("All");
//   const [search, setSearch] = useState("");
//   const [filterOpen, setFilterOpen] = useState(false);

//   const [counts, setCounts] = useState({
//     all: 0,
//     admin: 0,
//     partner: 0,
//     seller: 0,
//     draft: 0,
//   });

//   const statusOptions = [
//     "All",
//     "Submitted",
//     "Assigned_To_Partner",
//     "Reviewing",
//     "Verified",
//     "Live",
//     "Rejected",
//     "Sold",
//     "Rented",
//   ];

//   /* =========================================================
//      FETCH
//   ========================================================= */

//   const getProperties = async () => {
//     try {
//       setLoading(true);

//       // =========================================================
//       // 1. FETCH CURRENT TABLE DATA
//       // =========================================================
//       // This request respects the currently selected tab,
//       // status, city and search filters.
//       const response = await getAllPropertiesApi({
//         role:
//           selectedRole === "All" || selectedRole === "Draft"
//             ? ""
//             : selectedRole,
//         draftOnly: selectedRole === "Draft",
//         status:
//           selectedRole === "Draft"
//             ? "Draft"
//             : selectedStatus === "All"
//               ? ""
//               : selectedStatus,
//         city: selectedCity === "All" ? "" : selectedCity,
//         search: search.trim(),
//       });

//       // =========================================================
//       // 2. FETCH ALL PROPERTIES FOR TAB COUNTS
//       // =========================================================
//       // Counts must be independent of the currently selected tab,
//       // status, city or search filter.
//       const countResponse = await getAllPropertiesApi({
//         role: "",
//         draftOnly: false,
//         status: "",
//         city: "",
//         search: "",
//       });

//       if (response?.success) {
//         const apiProperties = Array.isArray(response?.data)
//           ? response.data
//           : [];

//         // =========================================================
//         // CURRENT TABLE DATA
//         // =========================================================
//         // Draft properties are hidden from All/Admin/Partner/Seller.
//         // Draft tab shows only Admin-created draft properties.
//         const visibleProperties =
//           selectedRole === "Draft"
//             ? apiProperties.filter(
//                 (item) =>
//                   String(item?.status || "")
//                     .trim()
//                     .toLowerCase() === "draft" &&
//                   String(item?.addedBy?.role || "")
//                     .trim()
//                     .toLowerCase() === "admin"
//               )
//             : apiProperties.filter(
//                 (item) =>
//                   String(item?.status || "")
//                     .trim()
//                     .toLowerCase() !== "draft"
//               );

//         setProperties(visibleProperties);

//         // =========================================================
//         // TAB COUNTS
//         // =========================================================
//         // IMPORTANT:
//         // Draft properties are NOT counted in All/Admin/Partner/Seller.
//         // Only Admin-created drafts are shown in the Draft tab count.
//         const allProperties = Array.isArray(countResponse?.data)
//           ? countResponse.data
//           : [];

//         const nonDraftProperties = allProperties.filter(
//           (item) =>
//             String(item?.status || "")
//               .trim()
//               .toLowerCase() !== "draft"
//         );

//         const adminCount = nonDraftProperties.filter(
//           (item) =>
//             String(item?.addedBy?.role || "")
//               .trim()
//               .toLowerCase() === "admin"
//         ).length;

//         const partnerCount = nonDraftProperties.filter(
//           (item) =>
//             String(item?.addedBy?.role || "")
//               .trim()
//               .toLowerCase() === "partner"
//         ).length;

//         const sellerCount = nonDraftProperties.filter(
//           (item) =>
//             String(item?.addedBy?.role || "")
//               .trim()
//               .toLowerCase() === "seller"
//         ).length;

//         const draftAdminCount = allProperties.filter(
//           (item) =>
//             String(item?.status || "")
//               .trim()
//               .toLowerCase() === "draft" &&
//             String(item?.addedBy?.role || "")
//               .trim()
//               .toLowerCase() === "admin"
//         ).length;

//         setCounts({
//           all: nonDraftProperties.length,
//           admin: adminCount,
//           partner: partnerCount,
//           seller: sellerCount,
//           draft: draftAdminCount,
//         });
//       } else {
//         setProperties([]);
//         setCounts({
//           all: 0,
//           admin: 0,
//           partner: 0,
//           seller: 0,
//           draft: 0,
//         });
//       }
//     } catch (error) {
//       console.error(
//         "GET PROPERTIES ERROR:",
//         error?.response?.data || error
//       );
//       setProperties([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       getProperties();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [
//     selectedRole,
//     selectedStatus,
//     selectedCity,
//     search,
//   ]);

//   // =========================================================
//   // SORT
//   // =========================================================

//   const getLatestDate = (item) => {
//     const dateValue =
//       item?.createdAt ||
//       item?.updatedAt ||
//       item?.createdDate ||
//       item?.date;

//     const time = dateValue ? new Date(dateValue).getTime() : 0;
//     return Number.isNaN(time) ? 0 : time;
//   };

//   // Latest properties first
//   const sortedProperties = useMemo(
//     () =>
//       [...properties].sort(
//         (a, b) => getLatestDate(b) - getLatestDate(a)
//       ),
//     [properties]
//   );

//   const cityOptions = useMemo(
//     () => [
//       "All",
//       ...Array.from(
//         new Set(
//           properties
//             .map((item) => item?.city)
//             .filter(Boolean)
//         )
//       ).sort(),
//     ],
//     [properties]
//   );

//   const roleTabs = [
//     { label: "All", count: counts.all, icon: FiGrid },
//     { label: "Admin", count: counts.admin, icon: FiUser },
//     { label: "Partner", count: counts.partner, icon: FiCheckCircle },
//     { label: "Seller", count: counts.seller, icon: FiHome },
//     { label: "Draft", count: counts.draft, icon: FiFileText },
//   ];

//   const filteredSummary = useMemo(() => {
//     return {
//       verified: properties.filter(
//         (p) => p.status === "Verified"
//       ).length,
//       live: properties.filter(
//         (p) => p.status === "Live"
//       ).length,
//       reviewing: properties.filter(
//         (p) =>
//           p.status === "Reviewing" ||
//           p.status === "Assigned_To_Partner"
//       ).length,
//     };
//   }, [properties]);

//   /* =========================================================
//      ACTIONS
//   ========================================================= */

//   const handleDeleteProperty = async (id) => {
//     const property = properties.find(
//       (item) => item?._id === id
//     );

//     const result = await Swal.fire({
//       icon: "warning",
//       title: "Delete Property?",
//       html: `
//         <div style="font-size:13px;color:#64748b;line-height:1.6">
//           Are you sure you want to delete
//           <strong style="color:#1F3C50">
//             ${property?.title || "this property"}
//           </strong>
//           ${
//             property?.propertyId
//               ? `(${property.propertyId})`
//               : ""
//           }?
//           <br/>
//           <span style="color:#dc2626;font-weight:600">
//             This action cannot be undone.
//           </span>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#dc2626",
//       cancelButtonColor: "#64748b",
//       reverseButtons: true,
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response =
//         await deletePropertyApi(id);

//       if (response?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Property Deleted",
//           text:
//             response?.message ||
//             "Property deleted successfully.",
//           confirmButtonColor: DARK,
//         });

//         await getProperties();
//       }
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Delete Failed",
//         text:
//           error?.response?.data?.message ||
//           "Unable to delete property.",
//         confirmButtonColor: DARK,
//       });
//     }
//   };

//   const handleVerifyProperty = async (property) => {
//     if (property?.status === "Verified") {
//       await Swal.fire({
//         icon: "info",
//         title: "Already Verified",
//         text: "This property is already verified.",
//         confirmButtonColor: DARK,
//       });

//       return;
//     }

//     const result = await Swal.fire({
//       icon: "question",
//       title: "Verify Property?",
//       html: `
//         <div style="font-size:13px;color:#64748b;line-height:1.6">
//           Verify
//           <strong style="color:#1F3C50">
//             ${property?.title || "this property"}
//           </strong>
//           ${
//             property?.propertyId
//               ? `(${property.propertyId})`
//               : ""
//           }?
//           <br/>
//           Status will be changed to
//           <strong style="color:#25B98B">Verified</strong>.
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: "Yes, Verify",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#25B98B",
//       cancelButtonColor: "#64748b",
//       reverseButtons: true,
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response =
//         await updatePropertyStatusApi(
//           property._id,
//           {
//             status: "Verified",
//             notes:
//               "Property verified by admin from Property Management.",
//           }
//         );

//       if (response?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Property Verified",
//           text:
//             response?.message ||
//             "Property verified successfully.",
//           confirmButtonColor: "#25B98B",
//         });

//         await getProperties();
//       }
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Verification Failed",
//         text:
//           error?.response?.data?.message ||
//           "Unable to verify property.",
//         confirmButtonColor: DARK,
//       });
//     }
//   };

//   const handleOpenPreview = async (property) => {
//     try {
//       const response =
//         await getPropertyByIdApi(
//           property._id
//         );

//       setSelectedProperty(
//         response?.data || property
//       );
//     } catch (error) {
//       setSelectedProperty(property);
//     }

//     setPreviewOpen(true);
//   };

//   const handleOpenEdit = async (property) => {
//     try {
//       const response =
//         await getPropertyByIdApi(
//           property._id
//         );

//       setEditingProperty(
//         response?.data || property
//       );
//     } catch (error) {
//       setEditingProperty(property);
//     }

//     setEditOpen(true);
//   };

//   const handlePropertyUpdated = async () => {
//     setEditOpen(false);
//     setEditingProperty(null);
//     await getProperties();
//   };

//   const clearFilters = () => {
//     setSelectedRole("All");
//     setSelectedStatus("All");
//     setSelectedCity("All");
//     setSearch("");
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <div className="min-h-screen font-sans text-[#173247]">
//       <div className="mx-auto w-full max-w-[1500px] px-1 py-2 sm:px-1 lg:px-1">
//         {/* ================= DIGINIWAS HEADER ================= */}
//         <section className="relative mb-3 overflow-hidden rounded-[20px] bg-[#1F3C50] px-5 py-5 shadow-sm md:px-7">
//           <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#35C99A]/10" />
//           <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

//           <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#35C99A] text-white shadow-sm">
//                 <FiHome size={20} />
//               </div>

//               <div>
//                 {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9FB3C0]">
//                   DigiNiwas Admin
//                 </p> */}

//                 <h1 className="mt-0.5 text-xl font-bold tracking-tight text-white md:text-2xl">
//                   Property Management
//                 </h1>

//                 <p className="mt-1 text-xs text-[#C3D0D8]">
//                   Manage, verify and maintain properties added by Admin, Partner and Seller
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-sm">
//               <span className="h-2 w-2 rounded-full bg-[#35C99A]" />
//               <div>
//                 <p className="text-[9px] font-medium uppercase tracking-wide text-[#AFC0CA]">
//                   Current View
//                 </p>
//                 <p className="text-xs font-semibold text-white">
//                   Property Directory
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ================= ACTION BAR ================= */}
//         <section className="mb-3 rounded-[18px] border border-[#DCE5E9] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-2 rounded-xl bg-[#1F3C50] px-4 py-2.5 text-xs font-semibold text-white shadow-sm">
//                 <FiGrid size={14} />
//                 Dashboard
//               </div>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/add-property")}
//                 className="flex h-[38px] items-center gap-2 rounded-lg bg-[#35C99A] px-4 text-[10px] font-extrabold text-[#173247] transition hover:bg-[#2DB98C]"
//               >
//                 <FiPlus size={14} />
//                 Add Property
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setFilterOpen((prev) => !prev)}
//                 className={`flex h-[38px] items-center gap-2 rounded-lg border px-4 text-[10px] font-semibold transition ${
//                   filterOpen
//                     ? "border-[#1F3C50] bg-[#1F3C50] text-white"
//                     : "border-[#DCE5E9] bg-white text-[#536779] hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
//                 }`}
//               >
//                 <FiFilter size={13} />
//                 Filters
//                 {filterOpen ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
//               </button>

//               <button
//                 type="button"
//                 className="flex h-[38px] items-center gap-2 rounded-lg border border-[#DCE5E9] bg-white px-4 text-[10px] font-semibold text-[#536779] transition hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
//               >
//                 <FiUpload size={13} />
//                 Export
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* SUMMARY */}
//         <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//           <SummaryCard
//             label="Visible Properties"
//             value={properties.length}
//             icon={<FiGrid />}
//           />

//           <SummaryCard
//             label="Reviewing"
//             value={filteredSummary.reviewing}
//             icon={<FiClock />}
//             tone="amber"
//           />

//           <SummaryCard
//             label="Verified"
//             value={filteredSummary.verified}
//             icon={<FiCheckCircle />}
//             tone="emerald"
//           />

//           <SummaryCard
//             label="Live"
//             value={filteredSummary.live}
//             icon={<MdVerified />}
//             tone="green"
//           />
//         </section>

//         {/* CREATOR TABS */}
//         <section className="mb-3 rounded-[18px] border border-[#DCE5E9] bg-white p-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div
//             className={`flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${SCROLLBAR_HIDDEN}`}
//           >
//             {roleTabs.map(
//               ({ label, count, icon: Icon }) => {
//                 const active =
//                   selectedRole === label;

//                 return (
//                   <button
//                     key={label}
//                     type="button"
//                     onClick={() => {
//                       setSelectedRole(label);
//                       if (label === "Draft") setSelectedStatus("All");
//                     }}
//                     className={`flex min-w-max items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
//                       active
//                         ? "bg-[#1F3C50] text-white shadow-sm"
//                         : "bg-[#F2F6F7] text-[#667B88] hover:bg-[#EAF9F4] hover:text-[#15966F]"
//                     }`}
//                   >
//                     <Icon size={13} />
//                     {label}

//                     <span
//                       className={`rounded-full px-2 py-0.5 text-[10px] ${
//                         active
//                           ? "bg-white/15 text-white"
//                           : "bg-[#F1F5F6] text-[#7D8C9C]"
//                       }`}
//                     >
//                       {count}
//                     </span>
//                   </button>
//                 );
//               }
//             )}
//           </div>
//         </section>

//         {/* SEARCH + FILTERS */}
//         <section className="mb-4 rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div className="flex flex-col gap-3 lg:flex-row">
//             <div className="relative flex-1">
//               <FiSearch
//                 size={15}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
//               />

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(e.target.value)
//                 }
//                 placeholder="Search by property ID, title, city, locality or creator..."
//                 className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-white pl-9 pr-4 text-xs font-medium text-[#173247] outline-none transition placeholder:text-[#9DABB3] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
//               />
//             </div>

//             {filterOpen && (
//               <div className="flex flex-col gap-2 sm:flex-row">
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) =>
//                     setSelectedStatus(
//                       e.target.value
//                     )
//                   }
//                   className="h-10 min-w-[180px] rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs font-semibold text-[#526A78] outline-none focus:border-[#35C99A]"
//                 >
//                   {statusOptions.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item === "All"
//                           ? "All Status"
//                           : formatStatus(item)}
//                       </option>
//                     )
//                   )}
//                 </select>

//                 <select
//                   value={selectedCity}
//                   onChange={(e) =>
//                     setSelectedCity(
//                       e.target.value
//                     )
//                   }
//                   className="h-10 min-w-[165px] rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs font-semibold text-[#526A78] outline-none focus:border-[#35C99A]"
//                 >
//                   {cityOptions.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item === "All"
//                           ? "All Cities"
//                           : item}
//                       </option>
//                     )
//                   )}
//                 </select>

//                 <button
//                   type="button"
//                   onClick={clearFilters}
//                   className="h-[38px] rounded-lg border border-[#DCE5E9] px-4 text-xs font-semibold text-[#7D8C9C] transition hover:bg-[#F8FAFB]"
//                 >
//                   Clear
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ACTIVE FILTER CHIPS */}
//         <div className="mb-3 flex flex-wrap items-center gap-2">
//           <span className="text-[10px] font-semibold uppercase tracking-wider text-[#91A2AC]">
//             Showing
//           </span>

//           <FilterChip>
//             {selectedRole === "All"
//               ? "All Creators"
//               : `${selectedRole} Added`}
//           </FilterChip>

//           {selectedStatus !== "All" && (
//             <FilterChip tone="amber">
//               {formatStatus(selectedStatus)}
//             </FilterChip>
//           )}

//           {selectedCity !== "All" && (
//             <FilterChip tone="blue">
//               {selectedCity}
//             </FilterChip>
//           )}
//         </div>

//         {/* TABLE CARD */}
//         <section className="relative overflow-visible rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//           <div className="flex items-center justify-between border-b border-[#E7EDF0] bg-[#F8FAFB] px-4 py-3 sm:px-5">
//             <div>
//               <h2 className="text-[11px] font-bold text-[#173247]">
//                 Property Directory
//               </h2>

//               <p className="mt-0.5 text-[10px] text-[#91A2AC]">
//                 Draft properties are hidden from this admin view.
//               </p>
//             </div>

//             <span className="rounded-full bg-[#F1F5F6] px-2.5 py-1 text-[10px] font-bold text-[#7D8C9C]">
//               {properties.length}
//             </span>
//           </div>

//           {/* 
//             RESPONSIVE PROPERTY DIRECTORY
//             - No horizontal scrollbar
//             - Table always fits available screen width
//             - Less important columns hide on smaller screens
//           */}
//           <div className="relative w-full overflow-visible">
//             <table className="w-full table-fixed">
//               <colgroup>
//                 <col className="w-[34%] sm:w-[29%] lg:w-[24%]" />
//                 <col className="hidden sm:table-column sm:w-[17%] lg:w-[14%]" />
//                 <col className="hidden lg:table-column lg:w-[15%]" />
//                 <col className="w-[18%] sm:w-[15%] lg:w-[11%]" />
//                 <col className="w-[24%] sm:w-[18%] lg:w-[13%]" />
//                 <col className="hidden xl:table-column xl:w-[15%]" />
//                 <col className="w-[24%] sm:w-[21%] lg:w-[13%] xl:w-[8%]" />
//               </colgroup>

//               <thead>
//                 <tr className="bg-[#1F3C50] text-white">
//                   <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
//                     Property
//                   </th>

//                   <th className="hidden px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:table-cell sm:px-3 sm:text-[10px]">
//                     Added By
//                   </th>

//                   <th className="hidden px-3 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white lg:table-cell">
//                     Location
//                   </th>

//                   <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
//                     Status
//                   </th>

//                   <th className="px-2 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-3 sm:text-[10px]">
//                     Market Price
//                   </th>

//                   <th className="hidden px-3 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-white xl:table-cell">
//                     Assigned Partner
//                   </th>

//                   <th className="px-1 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:px-2 sm:text-[10px]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <TableLoading />
//                 ) : properties.length === 0 ? (
//                   <TableEmpty />
//                 ) : (
//                   sortedProperties.map(
//                     (property, index) => {
//                       const creator =
//                         property?.addedBy || {};

//                       const assignedPartner =
//                         property?.assignedPartner ||
//                         {};

//                       const imageUrl =
//                         property?.images?.[0]
//                           ?.url ||
//                         "https://via.placeholder.com/120";

//                       return (
//                         <tr
//                           key={
//                             property._id ||
//                             property.id
//                           }
//                           className={`transition hover:bg-[#f8fbfa] ${
//                             index !==
//                             sortedProperties.length - 1
//                               ? "border-b border-[#E7EDF0]"
//                               : ""
//                           }`}
//                         >
//                           <td className="px-2 py-3 sm:px-3 sm:py-3.5">
//                             <div className="flex min-w-0 items-center gap-2 sm:gap-3">
//                               <img
//                                 src={imageUrl}
//                                 alt={
//                                   property.title ||
//                                   "Property"
//                                 }
//                                 className="hidden h-10 w-10 shrink-0 rounded-xl border border-[#E7EDF0] bg-[#F1F5F6] object-cover sm:block lg:h-11 lg:w-11"
//                               />

//                               <div className="min-w-0 flex-1">
//                                 <HoverTooltip
//                                   text={property.title || "-"}
//                                   position="top"
//                                   className="w-full"
//                                 >
//                                   <p className="w-full cursor-help truncate text-[10px] font-extrabold text-[#173247] sm:text-[11px]">
//                                     {property.title ||
//                                       "-"}
//                                   </p>
//                                 </HoverTooltip>

//                                 <p className="mt-0.5 truncate text-[10px] font-bold text-[#25B98B] sm:mt-1 sm:text-[10px]">
//                                   {property.propertyId ||
//                                     "-"}
//                                 </p>

//                                 <p className="mt-0.5 hidden truncate text-[10px] text-[#91A2AC] sm:block sm:text-[10px]">
//                                   {property.category ||
//                                     "-"}{" "}
//                                   •{" "}
//                                   {property.transactionType ||
//                                     "-"}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>

//                           <td className="hidden px-2 py-3 sm:table-cell sm:px-3 sm:py-3.5">
//                             <HoverTooltip
//                               text={creator?.name || "-"}
//                               position="top"
//                               className="w-full"
//                             >
//                               <p className="cursor-help truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
//                                 {creator?.name || "-"}
//                               </p>
//                             </HoverTooltip>

//                             <div className="mt-1">
//                               <CreatorBadge
//                                 role={creator?.role}
//                               />
//                             </div>

//                             {(creator?.sellerId ||
//                               creator?.partnerId) && (
//                               <p className="mt-1 text-[10px] text-[#91A2AC]">
//                                 {creator?.sellerId ||
//                                   creator?.partnerId}
//                               </p>
//                             )}
//                           </td>

//                           <td className="hidden px-3 py-3.5 lg:table-cell">
//                             <div className="flex min-w-0 items-start gap-2">
//                               <FiMapPin
//                                 size={13}
//                                 className="mt-0.5 shrink-0 text-[#91A2AC]"
//                               />

//                               <HoverTooltip
//                                 text={
//                                   [
//                                     property.locality,
//                                     property.city,
//                                     property.pinCode,
//                                   ]
//                                     .filter(Boolean)
//                                     .join(", ") || "-"
//                                 }
//                                 position="top"
//                                 className="min-w-0 flex-1"
//                               >
//                                 <div className="min-w-0 cursor-help">
//                                   <p className="truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
//                                     {property.locality ||
//                                       "-"}
//                                   </p>

//                                   <p className="mt-1 truncate text-[10px] text-[#91A2AC]">
//                                     {[
//                                       property.city,
//                                       property.pinCode,
//                                     ]
//                                       .filter(Boolean)
//                                       .join(" • ")}
//                                   </p>
//                                 </div>
//                               </HoverTooltip>
//                             </div>
//                           </td>

//                           <td className="px-2 py-3 sm:px-3 sm:py-3.5">
//                             <HoverTooltip
//                               text={formatStatus(
//                                 property.status
//                               )}
//                               position="top"
//                               className="inline-block max-w-full"
//                             >
//                               <div className="cursor-help">
//                                 <StatusBadge
//                                   status={
//                                     property.status
//                                   }
//                                 />
//                               </div>
//                             </HoverTooltip>
//                           </td>

//                           <td className="px-2 py-3 sm:px-3 sm:py-3.5">
//                             <HoverTooltip
//                               text={formatCurrency(
//                                 property.price
//                               )}
//                               position="top"
//                               className="w-full"
//                             >
//                               <p className="cursor-help truncate text-[10px] font-extrabold text-[#173247] sm:text-[10px] lg:text-[11px]">
//                                 {formatCurrency(
//                                   property.price
//                                 )}
//                               </p>
//                             </HoverTooltip>

//                             <p className="mt-0.5 hidden truncate text-[10px] text-[#91A2AC] sm:block sm:text-[10px]">
//                               {property.propertySize ||
//                                 "-"}{" "}
//                               {property.sizeUnit || ""}
//                             </p>
//                           </td>

//                           <td className="hidden px-3 py-3.5 xl:table-cell">
//                             {assignedPartner?.partnerId ? (
//                               <div>
//                                 <HoverTooltip
//                                   text={
//                                     assignedPartner?.name ||
//                                     assignedPartner
//                                       ?.partnerId?.name ||
//                                     "-"
//                                   }
//                                   position="top"
//                                   className="w-full"
//                                 >
//                                   <p className="cursor-help truncate text-[10px] font-semibold text-[#425A70] lg:text-[11px]">
//                                     {assignedPartner?.name ||
//                                       assignedPartner
//                                         ?.partnerId?.name ||
//                                       "-"}
//                                   </p>
//                                 </HoverTooltip>

//                                 <HoverTooltip
//                                   text={
//                                     assignedPartner?.partnerCode ||
//                                     assignedPartner
//                                       ?.partnerId
//                                       ?.partnerId ||
//                                     "-"
//                                   }
//                                   position="top"
//                                   className="mt-1 w-full"
//                                 >
//                                   <p className="cursor-help truncate text-[10px] font-bold text-[#25B98B]">
//                                     {assignedPartner?.partnerCode ||
//                                       assignedPartner
//                                         ?.partnerId
//                                         ?.partnerId ||
//                                       "-"}
//                                   </p>
//                                 </HoverTooltip>

//                                 <p className="mt-1 text-[10px] capitalize text-[#91A2AC]">
//                                   {assignedPartner?.partnerType ||
//                                     assignedPartner
//                                       ?.partnerId
//                                       ?.partnerType ||
//                                     ""}
//                                 </p>
//                               </div>
//                             ) : (
//                               <HoverTooltip
//                                 text="No partner has been assigned to this property."
//                                 position="top"
//                                 className="inline-block"
//                               >
//                                 <span className="inline-flex cursor-help rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-600">
//                                   Not Assigned
//                                 </span>
//                               </HoverTooltip>
//                             )}
//                           </td>

//                           <td className="px-1 py-3 sm:px-2 sm:py-3.5">
//                             <div className="flex flex-wrap items-center justify-center gap-0.5 sm:flex-nowrap">
//                               <ActionButton
//                                 title="View Property"
//                                 tone="teal"
//                                 onClick={() =>
//                                   handleOpenPreview(
//                                     property
//                                   )
//                                 }
//                               >
//                                 <FiEye size={15} />
//                               </ActionButton>

//                               <ActionButton
//                                 title="Edit Property"
//                                 tone="blue"
//                                 onClick={() =>
//                                   handleOpenEdit(
//                                     property
//                                   )
//                                 }
//                               >
//                                 <FiEdit2
//                                   size={14}
//                                 />
//                               </ActionButton>

//                               <ActionButton
//                                 title={
//                                   property?.status ===
//                                   "Verified"
//                                     ? "Already Verified"
//                                     : "Verify Property"
//                                 }
//                                 tone="green"
//                                 disabled={
//                                   property?.status ===
//                                   "Verified"
//                                 }
//                                 onClick={() =>
//                                   handleVerifyProperty(
//                                     property
//                                   )
//                                 }
//                               >
//                                 <MdOutlineCheckCircle
//                                   size={17}
//                                 />
//                               </ActionButton>

//                               <ActionButton
//                                 title="Delete Property"
//                                 tone="red"
//                                 onClick={() =>
//                                   handleDeleteProperty(
//                                     property._id
//                                   )
//                                 }
//                               >
//                                 <FiTrash2
//                                   size={14}
//                                 />
//                               </ActionButton>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     }
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>

//       <AIAssistant
//         open={chatOpen}
//         onClose={() =>
//           setChatOpen(false)
//         }
//       />

//       <EditPropertyModal
//         open={editOpen}
//         property={editingProperty}
//         onClose={() => {
//           setEditOpen(false);
//           setEditingProperty(null);
//         }}
//         onUpdated={
//           handlePropertyUpdated
//         }
//       />

//       <PropertyPreview
//         open={previewOpen}
//         property={selectedProperty}
//         onClose={() => {
//           setPreviewOpen(false);
//           setSelectedProperty(null);

//           // If preview was opened from /property-management/:id,
//           // remove the id from the URL when the preview closes.
//           if (id) {
//             navigate("/property-management", { replace: true });
//           }
//         }}
//       />

//       <button
//         onClick={() =>
//           setChatOpen(
//             (value) => !value
//           )
//         }
//         className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#1F3C50] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:right-6"
//       >
//         {chatOpen ? (
//           <FiX size={19} />
//         ) : (
//           <BsRobot size={19} />
//         )}
//       </button>
//     </div>
//   );
// }

// /* =========================================================
//    SMALL UI COMPONENTS
// ========================================================= */

// function SummaryCard({
//   label,
//   value,
//   icon,
//   tone = "default",
// }) {
//   const tones = {
//     default: {
//       icon: "bg-[#EAF9F4] text-[#25B98B]",
//       value: "text-[#173247]",
//     },
//     amber: {
//       icon: "bg-[#FFF5E8] text-[#F79009]",
//       value: "text-[#173247]",
//     },
//     emerald: {
//       icon: "bg-[#EAF9F4] text-[#25B98B]",
//       value: "text-[#173247]",
//     },
//     green: {
//       icon: "bg-[#EAF9F4] text-[#25B98B]",
//       value: "text-[#173247]",
//     },
//   };

//   const current = tones[tone] || tones.default;

//   return (
//     <div className="group rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-[0_8px_24px_rgba(15,47,69,0.07)]">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#7B8F9A]">
//             {label}
//           </p>

//           <p className={`mt-3 text-2xl font-black ${current.value}`}>
//             {Number(value || 0).toLocaleString()}
//           </p>

//           <p className="mt-1 text-[11px] font-medium text-[#94A4AD]">
//             Property records
//           </p>
//         </div>

//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition group-hover:bg-[#35C99A] group-hover:text-white ${current.icon}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function FilterChip({
//   children,
//   tone = "teal",
// }) {
//   const tones = {
//     teal:
//       "bg-[#EAF9F4] text-[#15966F] border-teal-100",
//     amber:
//       "bg-[#FFF5E8] text-[#D97706] border-amber-100",
//     blue:
//       "bg-[#EEF6FF] text-[#2E90FA] border-blue-100",
//   };

//   return (
//     <span
//       className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${tones[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// function ActionButton({
//   children,
//   title,
//   onClick,
//   disabled = false,
//   tone = "slate",
// }) {
//   const tones = {
//     teal:
//       "text-[#25B98B] hover:bg-[#EAF9F4]",
//     blue:
//       "text-blue-600 hover:bg-blue-50",
//     green:
//       "text-[#25B98B] hover:bg-[#EAF9F4]",
//     red:
//       "text-red-500 hover:bg-red-50",
//     slate:
//       "text-[#7D8C9C] hover:bg-[#F1F5F6]",
//   };

//   return (
//     <HoverTooltip
//       text={title}
//       position="top"
//       className="inline-flex"
//     >
//       <button
//         type="button"
//         aria-label={title}
//         disabled={disabled}
//         onClick={onClick}
//         className={`flex h-7 w-7 items-center justify-center rounded-md transition sm:h-7 sm:w-7 ${
//           tones[tone]
//         } ${
//           disabled
//             ? "cursor-not-allowed opacity-40"
//             : ""
//         }`}
//       >
//         {children}
//       </button>
//     </HoverTooltip>
//   );
// }

// function TableLoading() {
//   return (
//     <tr>
//       <td
//         colSpan={7}
//         className="py-16 text-center"
//       >
//         <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#DCE5E9] border-t-teal-600" />
//         <p className="mt-3 text-xs text-[#91A2AC]">
//           Loading properties...
//         </p>
//       </td>
//     </tr>
//   );
// }

// function TableEmpty() {
//   return (
//     <tr>
//       <td
//         colSpan={7}
//         className="py-16 text-center"
//       >
//         <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#F1F5F6] text-[#91A2AC]">
//           <FiHome size={18} />
//         </div>

//         <p className="mt-3 text-[11px] font-bold text-[#536779]">
//           No Property Found
//         </p>

//         <p className="mt-1 text-[10px] text-[#91A2AC]">
//           Try changing your filters or search.
//         </p>
//       </td>
//     </tr>
//   );
// }

// /* =========================================================
//    EDIT MODAL
// ========================================================= */

// function EditPropertyModal({
//   open,
//   property,
//   onClose,
//   onUpdated,
// }) {
//   const [form, setForm] =
//     useState({});

//   const [
//     existingImages,
//     setExistingImages,
//   ] = useState([]);

//   const [
//     newImages,
//     setNewImages,
//   ] = useState([]);

//   const [
//     floorPlan,
//     setFloorPlan,
//   ] = useState(null);

//   const [
//     reraCertificate,
//     setReraCertificate,
//   ] = useState(null);

//   const [video, setVideo] =
//     useState(null);

//   const [saving, setSaving] =
//     useState(false);

//   useBodyScrollLock(open);

//   useEffect(() => {
//     if (!property) return;

//     setForm({
//       title: property.title || "",
//       transactionType:
//         property.transactionType ||
//         "Sale",
//       category:
//         property.category ||
//         "Residential",
//       propertySize:
//         property.propertySize || "",
//       sizeUnit:
//         property.sizeUnit ||
//         "sqft",
//       price:
//         property.price || "",
//       projectName:
//         property.projectName ||
//         "",
//       developerName:
//         property.developerName ||
//         "",
//       description:
//         property.description ||
//         "",
//       city: property.city || "",
//       locality:
//         property.locality || "",
//       pinCode:
//         property.pinCode || "",
//       address:
//         property.address || "",
//       latitude:
//         property.latitude ?? "",
//       longitude:
//         property.longitude ?? "",
//       maintenance:
//         property.maintenance ?? "",
//       bookingAmount:
//         property.bookingAmount ?? "",
//       negotiable:
//         Boolean(
//           property.negotiable
//         ),
//       superBuiltupArea:
//         property.superBuiltupArea ??
//         "",
//       carpetArea:
//         property.carpetArea ?? "",
//       bedrooms:
//         property.bedrooms || "",
//       bathrooms:
//         property.bathrooms || "",
//       balconies:
//         property.balconies || "",
//       parking:
//         property.parking || "",
//       floorNo:
//         property.floorNo ?? "",
//       totalFloors:
//         property.totalFloors ?? "",
//       facing:
//         property.facing || "",
//       furnishing:
//         property.furnishing || "",
//       amenities:
//         Array.isArray(
//           property.amenities
//         )
//           ? property.amenities.join(
//               ", "
//             )
//           : "",
//       tags: Array.isArray(
//         property.tags
//       )
//         ? property.tags.join(", ")
//         : "",
//     });

//     setExistingImages(
//       property.images || []
//     );

//     setNewImages([]);
//     setFloorPlan(null);
//     setReraCertificate(null);
//     setVideo(null);
//   }, [property]);

//   if (!open || !property)
//     return null;

//   const setField = (
//     name,
//     value
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const removeExistingImage = (
//     index
//   ) => {
//     setExistingImages((prev) =>
//       prev.filter(
//         (_, imageIndex) =>
//           imageIndex !== index
//       )
//     );
//   };

//   const handleSubmit = async (
//     event
//   ) => {
//     event.preventDefault();

//     const confirm =
//       await Swal.fire({
//         icon: "question",
//         title: "Update Property?",
//         text:
//           "Property details, images and documents will be updated.",
//         showCancelButton: true,
//         confirmButtonText:
//           "Yes, Update",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: DARK,
//         cancelButtonColor:
//           "#64748b",
//       });

//     if (!confirm.isConfirmed)
//       return;

//     try {
//       setSaving(true);

//       const payload =
//         new FormData();

//       Object.entries(form).forEach(
//         ([key, value]) => {
//           if (
//             key === "amenities" ||
//             key === "tags"
//           )
//             return;

//           if (
//             typeof value ===
//             "boolean"
//           ) {
//             payload.append(
//               key,
//               value
//                 ? "true"
//                 : "false"
//             );
//           } else if (
//             value !== undefined &&
//             value !== null
//           ) {
//             payload.append(
//               key,
//               value
//             );
//           }
//         }
//       );

//       payload.append(
//         "amenities",
//         JSON.stringify(
//           String(
//             form.amenities || ""
//           )
//             .split(",")
//             .map((item) =>
//               item.trim()
//             )
//             .filter(Boolean)
//         )
//       );

//       payload.append(
//         "tags",
//         JSON.stringify(
//           String(form.tags || "")
//             .split(",")
//             .map((item) =>
//               item.trim()
//             )
//             .filter(Boolean)
//         )
//       );

//       payload.append(
//         "existingImages",
//         JSON.stringify(
//           existingImages
//         )
//       );

//       newImages.forEach(
//         (file) => {
//           payload.append(
//             "images",
//             file
//           );
//         }
//       );

//       if (floorPlan) {
//         payload.append(
//           "floorPlan",
//           floorPlan
//         );
//       }

//       if (reraCertificate) {
//         payload.append(
//           "reraCertificate",
//           reraCertificate
//         );
//       }

//       if (video) {
//         payload.append(
//           "video",
//           video
//         );
//       }

//       const response =
//         await updatePropertyApi(
//           property._id,
//           payload
//         );

//       if (response?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Property Updated",
//           text:
//             response?.message ||
//             "Property updated successfully.",
//           confirmButtonColor: DARK,
//         });

//         await onUpdated();
//       }
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text:
//           error?.response?.data
//             ?.message ||
//           "Unable to update property.",
//         confirmButtonColor: DARK,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass =
//     "h-10 w-full rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs text-[#425A70] outline-none transition focus:border-[#35C99A]/50 focus:ring-2 focus:ring-teal-50";

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5">
//       <div className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[18px] border border-white/20 bg-white shadow-2xl">
//         {/* HEADER - NOT SCROLLING */}
//         <div className="flex shrink-0 items-center justify-between border-b border-[#E7EDF0] bg-white px-5 py-4 sm:px-6">
//           <div>
//             <div className="flex items-center gap-2">
//               <FiEdit2 className="text-[#25B98B]" />

//               <h2 className="text-lg font-extrabold text-[#173247]">
//                 Edit Property
//               </h2>
//             </div>

//             <p className="mt-1 text-[10px] text-[#91A2AC]">
//               {property.propertyId} •
//               Update details, images and documents
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1F5F6] text-[#7D8C9C] transition hover:bg-slate-200"
//           >
//             <FiX size={16} />
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="flex min-h-0 flex-1 flex-col"
//         >
//           {/* BODY - ONLY THIS SCROLLS */}
//           <div
//             className={`min-h-0 flex-1 overflow-y-auto bg-[#fbfcfc] p-4 sm:p-6 ${SCROLLBAR_HIDDEN}`}
//           >
//             <SectionCard
//               title="Basic Information"
//               subtitle="Core property information"
//             >
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 <EditField label="Title">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.title || ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "title",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Category">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.category ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "category",
//                         e.target.value
//                       )
//                     }
//                   >
//                     {[
//                       "Residential",
//                       "Commercial",
//                       "Rental",
//                       "Sell",
//                       "Plot/Land",
//                     ].map(
//                       (item) => (
//                         <option
//                           key={item}
//                         >
//                           {item}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </EditField>

//                 <EditField label="Transaction">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.transactionType ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "transactionType",
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option>
//                       Sale
//                     </option>
//                     <option>
//                       Rent
//                     </option>
//                   </select>
//                 </EditField>

//                 <EditField label="Price">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.price || ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "price",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Property Size">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.propertySize ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "propertySize",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Size Unit">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.sizeUnit ||
//                       "sqft"
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "sizeUnit",
//                         e.target.value
//                       )
//                     }
//                   >
//                     {[
//                       "sqft",
//                       "sqyd",
//                       "sqm",
//                       "acre",
//                       "bigha",
//                     ].map(
//                       (item) => (
//                         <option
//                           key={item}
//                         >
//                           {item}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </EditField>
//               </div>
//             </SectionCard>

//             <SectionCard
//               title="Project & Location"
//               subtitle="Project and map-related details"
//             >
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {[
//                   [
//                     "projectName",
//                     "Project Name",
//                   ],
//                   [
//                     "developerName",
//                     "Developer Name",
//                   ],
//                   ["city", "City"],
//                   [
//                     "locality",
//                     "Locality",
//                   ],
//                   [
//                     "pinCode",
//                     "Pin Code",
//                   ],
//                   [
//                     "address",
//                     "Address",
//                   ],
//                   [
//                     "latitude",
//                     "Latitude",
//                   ],
//                   [
//                     "longitude",
//                     "Longitude",
//                   ],
//                 ].map(
//                   ([name, label]) => (
//                     <EditField
//                       key={name}
//                       label={label}
//                     >
//                       <input
//                         className={
//                           inputClass
//                         }
//                         value={
//                           form[name] ??
//                           ""
//                         }
//                         onChange={(
//                           e
//                         ) =>
//                           setField(
//                             name,
//                             e.target
//                               .value
//                           )
//                         }
//                       />
//                     </EditField>
//                   )
//                 )}
//               </div>
//             </SectionCard>

//             <SectionCard
//               title="Specifications"
//               subtitle="Physical and pricing specifications"
//             >
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {[
//                   [
//                     "maintenance",
//                     "Maintenance",
//                   ],
//                   [
//                     "bookingAmount",
//                     "Booking Amount",
//                   ],
//                   [
//                     "superBuiltupArea",
//                     "Super Built-up Area",
//                   ],
//                   [
//                     "carpetArea",
//                     "Carpet Area",
//                   ],
//                   [
//                     "bedrooms",
//                     "Bedrooms",
//                   ],
//                   [
//                     "bathrooms",
//                     "Bathrooms",
//                   ],
//                   [
//                     "balconies",
//                     "Balconies",
//                   ],
//                   [
//                     "parking",
//                     "Parking",
//                   ],
//                   [
//                     "floorNo",
//                     "Floor No",
//                   ],
//                   [
//                     "totalFloors",
//                     "Total Floors",
//                   ],
//                   [
//                     "facing",
//                     "Facing",
//                   ],
//                   [
//                     "furnishing",
//                     "Furnishing",
//                   ],
//                 ].map(
//                   ([name, label]) => (
//                     <EditField
//                       key={name}
//                       label={label}
//                     >
//                       <input
//                         className={
//                           inputClass
//                         }
//                         value={
//                           form[name] ??
//                           ""
//                         }
//                         onChange={(
//                           e
//                         ) =>
//                           setField(
//                             name,
//                             e.target
//                               .value
//                           )
//                         }
//                       />
//                     </EditField>
//                   )
//                 )}

//                 <EditField label="Negotiable">
//                   <select
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.negotiable
//                         ? "true"
//                         : "false"
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "negotiable",
//                         e.target
//                           .value ===
//                           "true"
//                       )
//                     }
//                   >
//                     <option value="false">
//                       No
//                     </option>
//                     <option value="true">
//                       Yes
//                     </option>
//                   </select>
//                 </EditField>

//                 <EditField label="Amenities (comma separated)">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.amenities ||
//                       ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "amenities",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <EditField label="Tags (comma separated)">
//                   <input
//                     className={
//                       inputClass
//                     }
//                     value={
//                       form.tags || ""
//                     }
//                     onChange={(e) =>
//                       setField(
//                         "tags",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </EditField>

//                 <div className="md:col-span-2 lg:col-span-3">
//                   <EditField label="Description">
//                     <textarea
//                       rows={4}
//                       className="w-full rounded-xl border border-[#DCE5E9] bg-white p-3 text-xs text-[#425A70] outline-none transition focus:border-[#35C99A]/50 focus:ring-2 focus:ring-teal-50"
//                       value={
//                         form.description ||
//                         ""
//                       }
//                       onChange={(e) =>
//                         setField(
//                           "description",
//                           e.target
//                             .value
//                         )
//                       }
//                     />
//                   </EditField>
//                 </div>
//               </div>
//             </SectionCard>

//             <SectionCard
//               title="Media & Documents"
//               subtitle="Manage listing images and documents"
//             >
//               <div>
//                 <p className="text-xs font-bold text-[#425A70]">
//                   Existing Images
//                 </p>

//                 <div
//                   className={`mt-3 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 ${SCROLLBAR_HIDDEN}`}
//                 >
//                   {existingImages.length ? (
//                     existingImages.map(
//                       (
//                         image,
//                         index
//                       ) => (
//                         <div
//                           key={
//                             image?.public_id ||
//                             index
//                           }
//                           className="relative shrink-0"
//                         >
//                           <img
//                             src={
//                               image?.url
//                             }
//                             alt=""
//                             className="h-24 w-32 rounded-xl border border-[#DCE5E9] object-cover"
//                           />

//                           <button
//                             type="button"
//                             onClick={() =>
//                               removeExistingImage(
//                                 index
//                               )
//                             }
//                             className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
//                           >
//                             <FiX
//                               size={
//                                 12
//                               }
//                             />
//                           </button>
//                         </div>
//                       )
//                     )
//                   ) : (
//                     <p className="text-[10px] text-[#91A2AC]">
//                       No existing
//                       images.
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
//                 <UploadCard
//                   icon={<FiImage />}
//                   label="Add Images"
//                   text={
//                     newImages.length
//                       ? `${newImages.length} selected`
//                       : "Multiple images"
//                   }
//                 >
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) =>
//                       setNewImages(
//                         Array.from(
//                           e.target
//                             .files || []
//                         )
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>

//                 <UploadCard
//                   icon={
//                     <FiFileText />
//                   }
//                   label="Floor Plan"
//                   text={
//                     floorPlan?.name ||
//                     "Replace file"
//                   }
//                 >
//                   <input
//                     type="file"
//                     onChange={(e) =>
//                       setFloorPlan(
//                         e.target
//                           .files?.[0] ||
//                           null
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>

//                 <UploadCard
//                   icon={
//                     <FiFileText />
//                   }
//                   label="RERA"
//                   text={
//                     reraCertificate?.name ||
//                     "Replace certificate"
//                   }
//                 >
//                   <input
//                     type="file"
//                     onChange={(e) =>
//                       setReraCertificate(
//                         e.target
//                           .files?.[0] ||
//                           null
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>

//                 <UploadCard
//                   icon={<FiVideo />}
//                   label="Video"
//                   text={
//                     video?.name ||
//                     "Upload walkthrough"
//                   }
//                 >
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) =>
//                       setVideo(
//                         e.target
//                           .files?.[0] ||
//                           null
//                       )
//                     }
//                     className="mt-3 block w-full text-[10px] text-[#7D8C9C]"
//                   />
//                 </UploadCard>
//               </div>
//             </SectionCard>
//           </div>

//           {/* FOOTER - ALWAYS VISIBLE */}
//           <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#E7EDF0] bg-white px-5 py-3 sm:px-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="h-[38px] rounded-lg border border-[#DCE5E9] px-5 text-xs font-semibold text-[#536779] transition hover:bg-[#F8FAFB]"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={saving}
//               className="h-[38px] rounded-lg bg-[#1F3C50] px-6 text-xs font-bold text-white transition hover:bg-[#123b36] disabled:opacity-50"
//             >
//               {saving
//                 ? "Updating..."
//                 : "Update Property"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function EditField({
//   label,
//   children,
// }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#91A2AC]">
//         {label}
//       </span>
//       {children}
//     </label>
//   );
// }

// function SectionCard({
//   title,
//   subtitle,
//   children,
// }) {
//   return (
//     <section className="mb-4 rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm sm:p-5">
//       <div className="mb-4">
//         <h3 className="text-sm font-extrabold text-[#173247]">
//           {title}
//         </h3>
//         <p className="mt-0.5 text-[10px] text-[#91A2AC]">
//           {subtitle}
//         </p>
//       </div>

//       {children}
//     </section>
//   );
// }

// function UploadCard({
//   icon,
//   label,
//   text,
//   children,
// }) {
//   return (
//     <div className="rounded-[16px] border border-dashed border-slate-300 bg-[#F8FAFB] p-4">
//       <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#25B98B] shadow-sm">
//         {icon}
//       </div>

//       <p className="mt-3 text-xs font-bold text-[#425A70]">
//         {label}
//       </p>

//       <p className="mt-1 truncate text-[10px] text-[#91A2AC]">
//         {text}
//       </p>

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    PROPERTY PREVIEW
// ========================================================= */

// function PropertyPreview({
//   open,
//   property,
//   onClose,
// }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [downloadingDoc, setDownloadingDoc] = useState("");

//   useBodyScrollLock(open);

//   useEffect(() => {
//     setSelectedImage(0);
//   }, [property]);

//   if (!open || !property) return null;

//   const images =
//     Array.isArray(property.images) &&
//     property.images.length > 0
//       ? property.images.filter(
//           (item) => item?.url
//         )
//       : [
//           {
//             url: "https://via.placeholder.com/1200x700?text=Property+Image",
//           },
//         ];

//   const locationText =
//     [
//       property.locality,
//       property.city,
//     ]
//       .filter(Boolean)
//       .join(", ") ||
//     "Location not available";

//   const money = (value) => {
//     const amount = Number(value || 0);

//     if (!amount) return "—";

//     return `₹${amount.toLocaleString(
//       "en-IN"
//     )}`;
//   };

//   const shortPrice = (value) => {
//     const amount = Number(value || 0);

//     if (!amount) return "Price not added";

//     if (amount >= 10000000) {
//       return `₹${(
//         amount / 10000000
//       ).toFixed(2)} Cr`;
//     }

//     if (amount >= 100000) {
//       return `₹${(
//         amount / 100000
//       ).toFixed(2)} L`;
//     }

//     return money(amount);
//   };

//   const floorPlanUrl =
//     typeof property.floorPlan ===
//     "string"
//       ? property.floorPlan
//       : property.floorPlan?.url || "";

//   const reraUrl =
//     typeof property.reraCertificate ===
//     "string"
//       ? property.reraCertificate
//       : property.reraCertificate?.url ||
//         "";

//   const uploadedVideoUrl =
//     typeof property.video === "string"
//       ? property.video
//       : property.video?.url || "";

//   const getYouTubeEmbedUrl = (
//     url = ""
//   ) => {
//     if (!url) return "";

//     try {
//       const parsed = new URL(url);

//       if (
//         parsed.hostname.includes(
//           "youtube.com"
//         )
//       ) {
//         if (
//           parsed.pathname.startsWith(
//             "/embed/"
//           )
//         ) {
//           return url;
//         }

//         const id =
//           parsed.searchParams.get("v");

//         return id
//           ? `https://www.youtube.com/embed/${id}`
//           : "";
//       }

//       if (
//         parsed.hostname.includes(
//           "youtu.be"
//         )
//       ) {
//         const id =
//           parsed.pathname
//             .replace("/", "")
//             .split("/")[0];

//         return id
//           ? `https://www.youtube.com/embed/${id}`
//           : "";
//       }

//       return "";
//     } catch {
//       return "";
//     }
//   };

//   const youtubeEmbed =
//     getYouTubeEmbedUrl(
//       property.videoLink || ""
//     );

//   const isDirectVideo = (
//     url = ""
//   ) =>
//     /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(
//       String(url)
//     );

//   const cleanFilePart = (
//     value,
//     fallback
//   ) =>
//     String(value || fallback)
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "_")
//       .replace(/_+/g, "_")
//       .replace(/^_+|_+$/g, "");

//   const getExtension = (
//     url,
//     fallback = "pdf"
//   ) => {
//     try {
//       const cleanUrl =
//         String(url || "").split("?")[0];

//       const filename =
//         cleanUrl.split("/").pop() || "";

//       const ext =
//         filename.includes(".")
//           ? filename
//               .split(".")
//               .pop()
//               .toLowerCase()
//           : "";

//       return ext &&
//         ext.length <= 6
//         ? ext
//         : fallback;
//     } catch {
//       return fallback;
//     }
//   };

//   const downloadDocument = async (
//     url,
//     type
//   ) => {
//     if (!url) return;

//     const propertyName =
//       cleanFilePart(
//         property.title,
//         property.propertyId ||
//           "Property"
//       );

//     const location =
//       cleanFilePart(
//         [
//           property.locality,
//           property.city,
//         ]
//           .filter(Boolean)
//           .join("_"),
//         "Location"
//       );

//     const documentName =
//       cleanFilePart(
//         type,
//         "Document"
//       );

//     const extension =
//       getExtension(url);

//     const filename =
//       `${propertyName}_${location}_${documentName}.${extension}`;

//     try {
//       setDownloadingDoc(type);

//       const response =
//         await fetch(url);

//       if (!response.ok) {
//         throw new Error(
//           "Document download failed"
//         );
//       }

//       const blob =
//         await response.blob();

//       const objectUrl =
//         URL.createObjectURL(blob);

//       const link =
//         document.createElement("a");

//       link.href = objectUrl;
//       link.download = filename;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       URL.revokeObjectURL(
//         objectUrl
//       );
//     } catch (error) {
//       console.error(
//         "Document Download Error:",
//         error
//       );

//       const link =
//         document.createElement("a");

//       link.href = url;
//       link.download = filename;
//       link.target = "_blank";
//       link.rel = "noreferrer";

//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } finally {
//       setDownloadingDoc("");
//     }
//   };

//   const previousImage = () =>
//     setSelectedImage((prev) =>
//       prev === 0
//         ? images.length - 1
//         : prev - 1
//     );

//   const nextImage = () =>
//     setSelectedImage((prev) =>
//       prev ===
//       images.length - 1
//         ? 0
//         : prev + 1
//     );

//   const DetailCard = ({
//     label,
//     value,
//     icon,
//   }) => (
//     <div className="rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
//       <div className="flex items-start gap-3">
//         {icon && (
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E9FBF6] text-[#168A70]">
//             {icon}
//           </div>
//         )}

//         <div className="min-w-0">
//           <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//             {label}
//           </p>

//           <p className="mt-1 break-words text-sm font-bold text-[#1F4256]">
//             {value === "" ||
//             value === null ||
//             value === undefined
//               ? "—"
//               : value}
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   const SectionHeading = ({
//     icon,
//     title,
//     subtitle,
//   }) => (
//     <div className="mb-5 flex items-start gap-3">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F4256] text-white">
//         {icon}
//       </div>

//       <div>
//         <h3 className="text-lg font-bold text-[#1F4256]">
//           {title}
//         </h3>

//         {subtitle && (
//           <p className="mt-0.5 text-xs leading-5 text-[#8197A2]">
//             {subtitle}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#102C3A]/75 p-2 backdrop-blur-sm sm:p-4">
//       <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">

//         {/* HEADER */}
//         <div className="relative shrink-0 overflow-hidden bg-[#1F4256] px-5 py-5 text-white sm:px-7">
//           <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-[#3ED6AE]/10" />
//           <div className="pointer-events-none absolute right-28 top-0 h-40 w-40 rounded-full bg-white/[0.04]" />

//           <div className="relative z-10 flex items-center justify-between gap-4">
//             <div className="min-w-0">
//               <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9BD8E5]">
//                 DIGINIWAS PROPERTY VIEW
//               </p>

//               <div className="mt-1 flex flex-wrap items-center gap-2">
//                 <h2 className="truncate text-xl font-bold sm:text-2xl">
//                   {property.title ||
//                     "Untitled Property"}
//                 </h2>

//                 <StatusBadge
//                   status={
//                     property.status
//                   }
//                 />
//               </div>

//               <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
//                 <FiMapPin size={14} />
//                 {locationText}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition hover:bg-white/20"
//             >
//               <FiX size={18} />
//             </button>
//           </div>
//         </div>

//         {/* SCROLL CONTENT */}
//         <div
//           className={`min-h-0 flex-1 overflow-y-auto bg-[#F4F7F8] ${SCROLLBAR_HIDDEN}`}
//         >
//           <div className="space-y-6 p-3 sm:p-6">

//             {/* IMAGE GALLERY */}
//             <section className="overflow-hidden rounded-3xl border border-[#DDE7EA] bg-white shadow-sm">
//               <div className="relative h-[280px] bg-slate-100 sm:h-[460px]">
//                 <img
//                   src={
//                     images[
//                       selectedImage
//                     ]?.url
//                   }
//                   alt={
//                     property.title ||
//                     "Property"
//                   }
//                   className="h-full w-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

//                 <div className="absolute left-4 top-4 flex flex-wrap gap-2">
//                   <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
//                     {formatStatus(
//                       property.status
//                     )}
//                   </span>

//                   {property.transactionType && (
//                     <span className="rounded-full bg-[#E9FBF6]/95 px-3 py-1.5 text-xs font-bold text-[#168A70] shadow-sm">
//                       {
//                         property.transactionType
//                       }
//                     </span>
//                   )}

//                   {property.category && (
//                     <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1F4256] shadow-sm">
//                       {
//                         property.category
//                       }
//                     </span>
//                   )}
//                 </div>

//                 {images.length > 1 && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={
//                         previousImage
//                       }
//                       className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
//                     >
//                       <FiChevronLeft
//                         size={20}
//                       />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={nextImage}
//                       className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
//                     >
//                       <FiChevronRight
//                         size={20}
//                       />
//                     </button>
//                   </>
//                 )}

//                 <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
//                   <div className="min-w-0 text-white">
//                     <p className="text-xs text-white/70">
//                       {property.propertyId ||
//                         "Property Listing"}
//                     </p>

//                     <h3 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
//                       {property.title ||
//                         "Untitled Property"}
//                     </h3>

//                     <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
//                       <FiMapPin />
//                       {
//                         locationText
//                       }
//                     </p>
//                   </div>

//                   <div className="shrink-0 rounded-2xl bg-black/35 px-4 py-3 text-right text-white backdrop-blur">
//                     <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">
//                       Listing Price
//                     </p>

//                     <p className="mt-1 text-xl font-bold">
//                       {shortPrice(
//                         property.price
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {images.length > 1 && (
//                 <div
//                   className={`flex gap-3 overflow-x-auto p-4 ${SCROLLBAR_HIDDEN}`}
//                 >
//                   {images.map(
//                     (
//                       image,
//                       index
//                     ) => (
//                       <button
//                         type="button"
//                         key={
//                           image.url ||
//                           index
//                         }
//                         onClick={() =>
//                           setSelectedImage(
//                             index
//                           )
//                         }
//                         className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
//                           selectedImage ===
//                           index
//                             ? "border-[#3ED6AE]"
//                             : "border-transparent"
//                         }`}
//                       >
//                         <img
//                           src={
//                             image.url
//                           }
//                           alt=""
//                           className="h-full w-full object-cover"
//                         />

//                         <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">
//                           {index + 1}
//                         </span>
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </section>

//             {/* PRICING */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiDollarSign
//                     size={20}
//                   />
//                 }
//                 title="Pricing & Commercial Details"
//                 subtitle="Complete commercial and transaction information."
//               />

//               <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                 <DetailCard
//                   label="Total Price"
//                   value={money(
//                     property.price
//                   )}
//                   icon={
//                     <FiDollarSign />
//                   }
//                 />

//                 <DetailCard
//                   label="Price / Sq.Ft"
//                   value={
//                     property.pricePerSqft
//                       ? money(
//                           property.pricePerSqft
//                         )
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Booking Amount"
//                   value={money(
//                     property.bookingAmount
//                   )}
//                 />

//                 <DetailCard
//                   label="Maintenance"
//                   value={money(
//                     property.maintenance
//                   )}
//                 />

//                 <DetailCard
//                   label="Negotiable"
//                   value={
//                     property.negotiable
//                       ? "Yes"
//                       : "No"
//                   }
//                 />

//                 <DetailCard
//                   label="Transaction Type"
//                   value={
//                     property.transactionType ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Category"
//                   value={
//                     property.category ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Property ID"
//                   value={
//                     property.propertyId ||
//                     "—"
//                   }
//                 />
//               </div>
//             </section>

//             {/* LOCATION */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiNavigation
//                     size={20}
//                   />
//                 }
//                 title="Location Details"
//                 subtitle="Property address and geographic coordinates."
//               />

//               <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <DetailCard
//                     label="City"
//                     value={
//                       property.city ||
//                       "—"
//                     }
//                     icon={
//                       <FiMapPin />
//                     }
//                   />

//                   <DetailCard
//                     label="Locality"
//                     value={
//                       property.locality ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="PIN Code"
//                     value={
//                       property.pinCode ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Latitude"
//                     value={
//                       property.latitude ??
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Longitude"
//                     value={
//                       property.longitude ??
//                       "—"
//                     }
//                   />

//                   <div className="sm:col-span-2">
//                     <DetailCard
//                       label="Full Address"
//                       value={
//                         property.address ||
//                         "—"
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="overflow-hidden rounded-2xl border border-[#DDE7EA] bg-[#EEF3F5]">
//                   {property.latitude &&
//                   property.longitude ? (
//                     <iframe
//                       title="Property location"
//                       width="100%"
//                       height="100%"
//                       className="min-h-[300px]"
//                       loading="lazy"
//                       src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
//                     />
//                   ) : (
//                     <div className="flex min-h-[300px] items-center justify-center text-sm text-[#8197A2]">
//                       Location map not
//                       available
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </section>

//             {/* SPECS */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiHome size={20} />
//                 }
//                 title="Property Specifications"
//                 subtitle="Area, room, floor, parking and furnishing information."
//               />

//               <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                 <DetailCard
//                   label="Property Size"
//                   value={
//                     property.propertySize
//                       ? `${
//                           property.propertySize
//                         } ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                   icon={
//                     <FiMaximize2 />
//                   }
//                 />

//                 <DetailCard
//                   label="Super Built-up Area"
//                   value={
//                     property.superBuiltupArea
//                       ? `${property.superBuiltupArea} ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Carpet Area"
//                   value={
//                     property.carpetArea
//                       ? `${property.carpetArea} ${
//                           property.sizeUnit ||
//                           "sqft"
//                         }`
//                       : "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Bedrooms"
//                   value={
//                     property.bedrooms ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Bathrooms"
//                   value={
//                     property.bathrooms ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Balconies"
//                   value={
//                     property.balconies ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Parking"
//                   value={
//                     property.parking ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Floor No."
//                   value={
//                     property.floorNo ??
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Total Floors"
//                   value={
//                     property.totalFloors ??
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Facing"
//                   value={
//                     property.facing ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Furnishing"
//                   value={
//                     property.furnishing ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Size Unit"
//                   value={
//                     property.sizeUnit ||
//                     "—"
//                   }
//                 />
//               </div>
//             </section>

//             {/* PROJECT */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiGrid size={20} />
//                 }
//                 title="Project Information"
//                 subtitle="Project, developer and property description."
//               />

//               <div className="grid gap-3 sm:grid-cols-2">
//                 <DetailCard
//                   label="Project Name"
//                   value={
//                     property.projectName ||
//                     "—"
//                   }
//                 />

//                 <DetailCard
//                   label="Developer Name"
//                   value={
//                     property.developerName ||
//                     "—"
//                   }
//                 />
//               </div>

//               <div className="mt-4 rounded-2xl border border-[#E3EBEE] bg-[#F8FBFC] p-4">
//                 <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                   Description
//                 </p>

//                 <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#536779]">
//                   {property.description ||
//                     "Description has not been added."}
//                 </p>
//               </div>
//             </section>

//             {/* AMENITIES */}
//             <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//               <SectionHeading
//                 icon={
//                   <FiCheckCircle
//                     size={20}
//                   />
//                 }
//                 title="Amenities & Property Tags"
//                 subtitle="Features and highlights associated with this listing."
//               />

//               <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                 Amenities
//               </p>

//               {property.amenities
//                 ?.length ? (
//                 <div className="flex flex-wrap gap-2">
//                   {property.amenities.map(
//                     (
//                       amenity,
//                       index
//                     ) => (
//                       <span
//                         key={
//                           index
//                         }
//                         className="rounded-full border border-[#3ED6AE]/30 bg-[#E9FBF6] px-3 py-1.5 text-xs font-bold text-[#168A70]"
//                       >
//                         {
//                           amenity
//                         }
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-[#8197A2]">
//                   No amenities added.
//                 </p>
//               )}

//               <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8197A2]">
//                 Property Tags
//               </p>

//               {property.tags?.length ? (
//                 <div className="flex flex-wrap gap-2">
//                   {property.tags.map(
//                     (
//                       tag,
//                       index
//                     ) => (
//                       <span
//                         key={
//                           index
//                         }
//                         className="rounded-full bg-[#1F4256]/5 px-3 py-1.5 text-xs font-bold text-[#1F4256]"
//                       >
//                         #{tag}
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-[#8197A2]">
//                   No tags added.
//                 </p>
//               )}
//             </section>

//             {/* VIDEO */}
//             {(uploadedVideoUrl ||
//               property.videoLink) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiVideo
//                       size={20}
//                     />
//                   }
//                   title="Property Video / Walkthrough"
//                   subtitle="Watch the property video directly from Property Management."
//                 />

//                 {uploadedVideoUrl && (
//                   <div className="overflow-hidden rounded-2xl bg-black">
//                     <video
//                       src={
//                         uploadedVideoUrl
//                       }
//                       controls
//                       playsInline
//                       preload="metadata"
//                       className="max-h-[560px] w-full"
//                     />
//                   </div>
//                 )}

//                 {!uploadedVideoUrl &&
//                   youtubeEmbed && (
//                     <div className="aspect-video overflow-hidden rounded-2xl bg-black">
//                       <iframe
//                         src={
//                           youtubeEmbed
//                         }
//                         title="Property walkthrough"
//                         className="h-full w-full"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       />
//                     </div>
//                   )}

//                 {!uploadedVideoUrl &&
//                   !youtubeEmbed &&
//                   isDirectVideo(
//                     property.videoLink
//                   ) && (
//                     <video
//                       src={
//                         property.videoLink
//                       }
//                       controls
//                       playsInline
//                       className="max-h-[560px] w-full rounded-2xl bg-black"
//                     />
//                   )}

//                 {!uploadedVideoUrl &&
//                   !youtubeEmbed &&
//                   property.videoLink &&
//                   !isDirectVideo(
//                     property.videoLink
//                   ) && (
//                     <a
//                       href={
//                         property.videoLink
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center justify-between rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-sm font-bold text-[#1F4256] transition hover:border-[#3ED6AE]"
//                     >
//                       <span>
//                         Open Property
//                         Walkthrough
//                       </span>

//                       <FiVideo />
//                     </a>
//                   )}
//               </section>
//             )}

//             {/* DOCUMENTS */}
//             {(floorPlanUrl ||
//               reraUrl) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiFileText
//                       size={20}
//                     />
//                   }
//                   title="Property Documents"
//                   subtitle="Download property documents with a clean property and location based file name."
//                 />

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {floorPlanUrl && (
//                     <button
//                       type="button"
//                       disabled={
//                         downloadingDoc ===
//                         "Floor_Plan"
//                       }
//                       onClick={() =>
//                         downloadDocument(
//                           floorPlanUrl,
//                           "Floor_Plan"
//                         )
//                       }
//                       className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F4256] text-white">
//                           <FiFileText />
//                         </div>

//                         <div>
//                           <p className="font-bold text-[#1F4256]">
//                             Floor Plan
//                           </p>

//                           <p className="mt-1 text-xs text-[#8197A2]">
//                             {downloadingDoc ===
//                             "Floor_Plan"
//                               ? "Downloading..."
//                               : "Click to download"}
//                           </p>
//                         </div>
//                       </div>

//                       <FiUpload className="rotate-180 text-[#168A70]" />
//                     </button>
//                   )}

//                   {reraUrl && (
//                     <button
//                       type="button"
//                       disabled={
//                         downloadingDoc ===
//                         "RERA_Certificate"
//                       }
//                       onClick={() =>
//                         downloadDocument(
//                           reraUrl,
//                           "RERA_Certificate"
//                         )
//                       }
//                       className="flex items-center justify-between gap-4 rounded-2xl border border-[#DDE7EA] bg-[#F8FBFC] p-5 text-left transition hover:border-[#3ED6AE] hover:bg-[#F4FCFA] disabled:opacity-60"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ED6AE] text-[#173247]">
//                           <FiFileText />
//                         </div>

//                         <div>
//                           <p className="font-bold text-[#1F4256]">
//                             RERA Certificate
//                           </p>

//                           <p className="mt-1 text-xs text-[#8197A2]">
//                             {downloadingDoc ===
//                             "RERA_Certificate"
//                               ? "Downloading..."
//                               : "Click to download"}
//                           </p>
//                         </div>
//                       </div>

//                       <FiUpload className="rotate-180 text-[#168A70]" />
//                     </button>
//                   )}
//                 </div>
//               </section>
//             )}

//             {/* CREATOR */}
//             {(property.addedBy ||
//               property.createdBy) && (
//               <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeading
//                   icon={
//                     <FiUser size={20} />
//                   }
//                   title="Property Ownership & Creator"
//                   subtitle="Information about who added this property."
//                 />

//                 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//                   <DetailCard
//                     label="Created By"
//                     value={
//                       property.addedBy
//                         ?.name ||
//                       property.createdBy
//                         ?.name ||
//                       property.addedBy
//                         ?.role ||
//                       property.createdBy
//                         ?.role ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Creator Role"
//                     value={
//                       property.addedBy
//                         ?.role ||
//                       property.createdBy
//                         ?.role ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Creator ID"
//                     value={
//                       property.addedBy
//                         ?.id ||
//                       property.createdBy
//                         ?.id ||
//                       "—"
//                     }
//                   />

//                   <DetailCard
//                     label="Status"
//                     value={formatStatus(
//                       property.status
//                     )}
//                   />
//                 </div>
//               </section>
//             )}

//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="h-11 rounded-xl bg-[#1F4256] px-6 text-sm font-bold text-white transition hover:bg-[#18394B]"
//               >
//                 Close Property View
//               </button>
//             </div>

//             <div className="h-1" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PreviewRow({
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <span className="text-[10px] text-white/55">
//         {label}
//       </span>
//       <span className="max-w-[60%] truncate text-right text-[10px] font-bold text-white">
//         {value || "-"}
//       </span>
//     </div>
//   );
// }

// function PropertyStat({
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-[#91A2AC]">
//         {label}
//       </p>
//       <p className="mt-2 text-lg font-extrabold text-[#173247]">
//         {value || "-"}
//       </p>
//     </div>
//   );
// }

// function InfoPanel({
//   title,
//   icon,
//   children,
//   className = "",
// }) {
//   return (
//     <section
//       className={`rounded-[16px] border border-[#DCE5E9] bg-white p-4 shadow-sm sm:p-5 ${className}`}
//     >
//       <div className="mb-4 flex items-center gap-2">
//         <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#25B98B]">
//           {icon}
//         </div>
//         <h3 className="text-sm font-extrabold text-[#173247]">
//           {title}
//         </h3>
//       </div>

//       {children}
//     </section>
//   );
// }

// function DetailItem({
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-start justify-between gap-4 border-b border-[#E7EDF0] py-2.5 last:border-b-0">
//       <span className="text-[10px] text-[#91A2AC]">
//         {label}
//       </span>
//       <span className="max-w-[60%] break-words text-right text-[10px] font-bold text-[#425A70]">
//         {value === 0
//           ? 0
//           : value || "-"}
//       </span>
//     </div>
//   );
// }


