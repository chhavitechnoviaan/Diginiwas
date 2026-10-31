// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
// import {
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   Download,
//   MapPin,
//   Search,
//   SlidersHorizontal,
//   XCircle,
//   ChevronLeft,
//   ChevronRight,
//   Building2,
//   Eye,
//   UserRound,
//   History,
//   Check,
//   X,
//   MoreVertical,
//   RefreshCw,
//   CalendarClock,
//   UserX,
//   RotateCcw,
//   MessageSquareMore,
//   LoaderCircle,
//   Phone,
//   Mail,
//   ExternalLink,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import {
//   getVisitSummaryApi,
//   getAdminVisitsApi,
//   getVisitByIdApi,
//   reviewVisitRequestApi,
//   updateVisitStatusApi,
// } from "../../../Services/visitService";

// const TAB_VALUES = [
//   "Today",
//   "Upcoming",
//   "Missed",
//   "Completed",
//   "Cancelled",
//   "No Show",
//   "Rescheduled",
//   "Follow-up",
// ];

// const STATUS_OPTIONS = [
//   "All",
//   "Requested",
//   "Upcoming",
//   "Completed",
//   "Cancelled",
//   "No Show",
//   "Rescheduled",
//   "Follow-up",
// ];

// const getLocalUser = () => {
//   try {
//     return JSON.parse(localStorage.getItem("user") || "{}");
//   } catch {
//     return {};
//   }
// };

// const getActor = () => {
//   const user = getLocalUser();
//   return {
//     userId: user?.id || null,
//     name: user?.name || "Admin",
//     role: user?.role
//       ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}`
//       : "Admin",
//   };
// };

// const formatDate = (value) => {
//   if (!value) return "-";
//   return new Date(value).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatTime = (value) => {
//   if (!value) return "-";
//   return new Date(value).toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// const StatusBadge = ({ status }) => {
//   const styles = {
//     Requested: "bg-[#fff8e8] text-[#b87818] border-[#f2dfb8]",
//     Upcoming: "bg-[#eaf5ff] text-[#3978a8] border-[#cfe4f4]",
//     Completed: "bg-[#EAF9F4] text-[#16825f] border-[#CDEFE4]",
//     Cancelled: "bg-[#fff0f0] text-[#d24a4a] border-[#efd0d0]",
//     "No Show": "bg-[#fff5e8] text-[#bc7622] border-[#edd8b7]",
//     Rescheduled: "bg-[#f2efff] text-[#7458b1] border-[#dfd7f5]",
//     "Follow-up": "bg-[#EAF9F4] text-[#15966F] border-[#CDEFE4]",
//   };
//   return (
//     <span
//       className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ${styles[status] || "bg-gray-50 text-gray-500 border-gray-200"}`}
//     >
//       {status || "-"}
//     </span>
//   );
// };

// const ApprovalBadge = ({ status }) => {
//   const normalizedStatus = status || "Pending";

//   const styles = {
//     Pending: "bg-[#fff8e8] text-[#b87818] border-[#f2dfb8]",

//     Approved: "bg-[#EAF9F4] text-[#16825f] border-[#CDEFE4]",

//     Rejected: "bg-[#fff0f0] text-[#d24a4a] border-[#efd0d0]",
//   };

//   const labels = {
//     Pending: "Pending",
//     Approved: "Approved",
//     Rejected: "Rejected",
//   };

//   return (
//     <span
//       className={`
//         inline-flex
//         items-center
//         gap-1
//         rounded-full
//         border
//         px-2.5
//         py-1
//         text-[11px]
//         font-semibold
//         whitespace-nowrap
//         ${styles[normalizedStatus] || styles.Pending}
//       `}
//     >
//       {normalizedStatus === "Approved" && <Check size={9} />}

//       {normalizedStatus === "Rejected" && <X size={9} />}

//       {normalizedStatus === "Pending" && <Clock3 size={9} />}

//       {labels[normalizedStatus] || normalizedStatus}
//     </span>
//   );
// };
// const StatCard = ({
//   title,
//   value,
//   subtitle,
//   icon: Icon,
//   type = "default",
//   onClick,
// }) => {
//   const styles = {
//     default: {
//       iconBg: "bg-[#EAF9F4]",
//       icon: "text-[#25B98B]",
//     },
//     blue: {
//       iconBg: "bg-[#EEF6FF]",
//       icon: "text-[#2E90FA]",
//     },
//     amber: {
//       iconBg: "bg-[#FFF5E8]",
//       icon: "text-[#F79009]",
//     },
//   };

//   const current = styles[type] || styles.default;

//   return (
//     <button
//       onClick={onClick}
//       className="min-h-[150px] w-full rounded-[18px] border border-[#DCE5E9] bg-white p-5 text-left shadow-[0_2px_5px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-md sm:p-6"
//     >
//       <div className="flex items-start justify-between gap-3">
//         <p className="pt-2 text-[10px] font-bold uppercase tracking-[0.25px] text-[#576D86]">
//           {title}
//         </p>

//         <div
//           className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[15px] ${current.iconBg}`}
//         >
//           <Icon size={22} className={current.icon} />
//         </div>
//       </div>

//       <p className="mt-5 text-[29px] font-bold leading-none text-[#173247]">
//         {value}
//       </p>

//       {subtitle && (
//         <p className="mt-3 text-[10px] font-medium text-[#95A3B5]">
//           {subtitle}
//         </p>
//       )}
//     </button>
//   );
// };

// const MiniMetric = ({ label, value, danger, onClick }) => (
//   <button
//     onClick={onClick}
//     className="flex min-h-[104px] min-w-0 flex-col justify-between rounded-[16px] border border-[#DCE5E9] bg-white p-4 text-left shadow-[0_2px_5px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-sm"
//   >
//     <p className="break-words text-[9px] font-bold uppercase leading-[1.35] tracking-[0.2px] text-[#7D8FA3]">
//       {label}
//     </p>

//     <p
//       className={`mt-4 text-[22px] font-bold leading-none ${
//         danger ? "text-[#E05252]" : "text-[#173247]"
//       }`}
//     >
//       {value}
//     </p>
//   </button>
// );

// const SelectFilter = ({ value, onChange, options, label }) => (
//   <select
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="h-[38px] min-w-[125px] rounded-lg border border-[#DCE5E9] bg-white px-3 text-[10px] font-semibold text-[#607681] outline-none focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
//   >
//     {options.map((item) => (
//       <option key={item} value={item}>
//         {item === "All" ? label : item}
//       </option>
//     ))}
//   </select>
// );

// // export default function VisitManagement() {
// //   const navigate = useNavigate();
// //   const { id: routeVisitId } = useParams();
// export default function VisitManagement({
//   embedded = false,
//   initialVisitId = null,
//   onEmbeddedDetailClose,
// }) {
//   const navigate = useNavigate();

//   const { id: routeVisitId } = useParams();
//   const [visits, setVisits] = useState([]);
//   const [summary, setSummary] = useState({
//     today: 0,
//     upcoming: 0,
//     completed: 0,
//     cancelled: 0,
//     noShow: 0,
//     rescheduled: 0,
//     followUp: 0,
//     missed: 0,
//     pendingApproval: 0,
//     locations: [],
//   });
//   const [activeTab, setActiveTab] = useState("Today");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [approvalFilter, setApprovalFilter] = useState("All");
//   const [locationFilter, setLocationFilter] = useState("All");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [selectedVisit, setSelectedVisit] = useState(null);
//   const [detailLoading, setDetailLoading] = useState(false);
//   const [actionMenu, setActionMenu] = useState(null);
//   const [actionLoading, setActionLoading] = useState("");
//   const itemsPerPage = 10;

//   // Close action menu when user clicks anywhere outside it or presses Escape
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (!event.target.closest("[data-visit-action-menu]")) {
//         setActionMenu(null);
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === "Escape") setActionMenu(null);
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   const fetchSummary = async () => {
//     try {
//       const response = await getVisitSummaryApi();
//       if (response?.success) setSummary(response.data || {});
//     } catch (error) {
//       console.error("Visit summary error:", error);
//     }
//   };

//   const fetchVisits = async () => {
//     try {
//       setLoading(true);
//       const response = await getAdminVisitsApi({
//         tab: activeTab,
//         search: search.trim(),
//         status: statusFilter,
//         approvalStatus: approvalFilter,
//         location: locationFilter,
//         page,
//         limit: itemsPerPage,
//       });
//       if (response?.success) {
//         setVisits(response.data || []);
//         setTotal(response.total || 0);
//         setTotalPages(response.totalPages || 1);
//       } else {
//         setVisits([]);
//       }
//     } catch (error) {
//       setVisits([]);
//       Swal.fire({
//         icon: "error",
//         title: "Unable to load visits",
//         text: error?.response?.data?.message || "Failed to fetch visit data.",
//         confirmButtonColor: "#25B98B",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary();
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(fetchVisits, 250);
//     return () => clearTimeout(timer);
//   }, [activeTab, search, statusFilter, approvalFilter, locationFilter, page]);

//   useEffect(() => {
//     setPage(1);
//   }, [activeTab, search, statusFilter, approvalFilter, locationFilter]);

//   // const openVisitDetail = async (id) => {
//   //   try {
//   //     setDetailLoading(true);
//   //     setSelectedVisit(null);
//   //     const response = await getVisitByIdApi(id);
//   //     if (response?.success) setSelectedVisit(response.data);
//   //   } catch (error) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Unable to load details",
//   //       text: error?.response?.data?.message || "Visit details not available.",
//   //       confirmButtonColor: "#25B98B",
//   //     });
//   //   } finally {
//   //     setDetailLoading(false);
//   //     setActionMenu(null);
//   //   }
//   // };
// const openVisitDetail = async (id) => {
//   try {
//     if (!id) return;

//     setDetailLoading(true);
//     setSelectedVisit(null);

//     const response = await getVisitByIdApi(id);

//     console.log("VISIT DETAIL RESPONSE =====>", response);

//     if (!response?.success) {
//       throw new Error(
//         response?.message || "Unable to fetch visit detail"
//       );
//     }

//     const responseData = response?.data;

//     // CASE 1:
//     // Backend:
//     // data: {
//     //   visit: {...},
//     //   property: {...},
//     //   partner: {...},
//     //   visitHistory: [...]
//     // }
//     if (responseData?.visit) {
//       setSelectedVisit(responseData);
//       return;
//     }

//     // CASE 2:
//     // Backend:
//     // data: {
//     //   _id: "...",
//     //   visitId: "...",
//     //   ...
//     // }
//     if (responseData?._id || responseData?.visitId) {
//       setSelectedVisit({
//         visit: responseData,
//         property:
//           responseData?.property ||
//           responseData?.propertyId ||
//           null,
//         partner:
//           responseData?.partner ||
//           responseData?.partnerId ||
//           null,
//         visitHistory:
//           responseData?.visitHistory ||
//           responseData?.history ||
//           [],
//       });

//       return;
//     }

//     throw new Error("Visit detail response is empty");
//   } catch (error) {
//     console.error(
//       "OPEN VISIT DETAIL ERROR =====>",
//       error
//     );

//     setSelectedVisit(null);

//     Swal.fire({
//       icon: "error",
//       title: "Unable to load details",
//       text:
//         error?.response?.data?.message ||
//         error?.message ||
//         "Visit details not available.",
//       confirmButtonColor: "#25B98B",
//     });
//   } finally {
//     setDetailLoading(false);
//     setActionMenu(null);
//   }
// };
//   const handleViewVisit = (visit) => {
//     if (!visit?._id) {
//       return;
//     }

//     // ==========================================
//     // PARTNER DASHBOARD KE ANDAR
//     // Route change nahi hoga
//     // ==========================================

//     if (embedded) {
//       openVisitDetail(visit._id);

//       return;
//     }

//     // ==========================================
//     // STANDALONE VISIT MANAGEMENT
//     // URL route maintain hoga
//     // ==========================================

//     navigate(`/visit-management/${visit._id}`);
//   };

//   // useEffect(() => {
//   //   if (routeVisitId) {
//   //     openVisitDetail(routeVisitId);
//   //   }
//   // }, [routeVisitId]);
// useEffect(() => {
//   // Embedded Partner Dashboard me standalone route id use nahi karna
//   if (embedded) {
//     return;
//   }

//   if (routeVisitId) {
//     openVisitDetail(routeVisitId);
//   }
// }, [routeVisitId, embedded]);

// // ======================================================
// // PARTNER DASHBOARD SE SPECIFIC VISIT OPEN
// // Example:
// // /partnerdashboard?tab=visit&visitId=VISIT_MONGO_ID
// // ======================================================
// useEffect(() => {
//   if (!embedded || !initialVisitId) {
//     return;
//   }

//   openVisitDetail(initialVisitId);
// }, [embedded, initialVisitId]);
//   const refreshAll = async () => {
//     await Promise.all([fetchVisits(), fetchSummary()]);
//     if (selectedVisit?.visit?._id)
//       await openVisitDetail(selectedVisit.visit._id);
//   };

//   // const reviewVisit = async (visit, action) => {
//   //   let remarks = "";
//   //   let approvedVisitAt;

//   //   if (action === "approve") {
//   //     const result = await Swal.fire({
//   //       title: "Approve Visit Request?",
//   //       html: `<div style="font-size:12px;color:#667085;line-height:1.6">Approve <strong>${visit.visitId}</strong> for <strong>${visit.propertySnapshot?.title || "property"}</strong>?</div>`,
//   //       input: "datetime-local",
//   //       inputValue: new Date(visit.requestedVisitAt).toISOString().slice(0, 16),
//   //       showCancelButton: true,
//   //       confirmButtonText: "Approve Visit",
//   //       confirmButtonColor: "#25B98B",
//   //     });
//   //     if (!result.isConfirmed) return;
//   //     approvedVisitAt = result.value || visit.requestedVisitAt;
//   //   } else {
//   //     const result = await Swal.fire({
//   //       title: "Reject Visit Request?",
//   //       input: "textarea",
//   //       inputPlaceholder: "Reason for rejection...",
//   //       showCancelButton: true,
//   //       confirmButtonText: "Reject Request",
//   //       confirmButtonColor: "#d24a4a",
//   //       inputValidator: (value) =>
//   //         !value?.trim() ? "Please enter a reason." : undefined,
//   //     });
//   //     if (!result.isConfirmed) return;
//   //     remarks = result.value;
//   //   }

//   //   try {
//   //     setActionLoading(visit._id);
//   //     const response = await reviewVisitRequestApi(visit._id, {
//   //       action,
//   //       actor: getActor(),
//   //       remarks,
//   //       approvedVisitAt,
//   //     });
//   //     if (response?.success) {
//   //       await Swal.fire({
//   //         icon: "success",
//   //         title: action === "approve" ? "Visit Approved" : "Visit Rejected",
//   //         text: response.message,
//   //         confirmButtonColor: "#25B98B",
//   //       });
//   //       await refreshAll();
//   //     }
//   //   } catch (error) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Action failed",
//   //       text: error?.response?.data?.message || "Unable to update visit.",
//   //       confirmButtonColor: "#25B98B",
//   //     });
//   //   } finally {
//   //     setActionLoading("");
//   //   }
//   // };
// const reviewVisit = async (visit, action) => {
//   let remarks = "";
//   let approvedVisitAt;

//   if (action === "approve") {
//     const result = await Swal.fire({
//       title: "Approve Visit Request?",
//       html: `
//         <div style="font-size:12px;color:#667085;line-height:1.6">
//           Approve <strong>${visit.visitId}</strong>
//           for
//           <strong>
//             ${visit.propertySnapshot?.title || "property"}
//           </strong>?
//         </div>
//       `,
//       input: "datetime-local",
//       inputValue: new Date(
//         visit.requestedVisitAt
//       )
//         .toISOString()
//         .slice(0, 16),

//       showCancelButton: true,
//       confirmButtonText:
//         "Approve Visit",
//       confirmButtonColor:
//         "#25B98B",
//     });

//     if (!result.isConfirmed) {
//       return;
//     }

//     approvedVisitAt =
//       result.value ||
//       visit.requestedVisitAt;
//   } else {
//     const result =
//       await Swal.fire({
//         title:
//           "Reject Visit Request?",

//         input: "textarea",

//         inputPlaceholder:
//           "Reason for rejection...",

//         showCancelButton: true,

//         confirmButtonText:
//           "Reject Request",

//         confirmButtonColor:
//           "#d24a4a",

//         inputValidator: (value) =>
//           !value?.trim()
//             ? "Please enter a reason."
//             : undefined,
//       });

//     if (!result.isConfirmed) {
//       return;
//     }

//     remarks = result.value;
//   }

//   try {
//     setActionLoading(visit._id);

//     // ================================================
//     // FRONTEND SE APPROVAL STATUS BHEJ RAHE HAIN
//     // ================================================

//     const approvalStatus =
//       action === "approve"
//         ? "Approved"
//         : "Rejected";

//     const response =
//       await reviewVisitRequestApi(
//         visit._id,
//         {
//           action,

//           // IMPORTANT
//           approvalStatus,

//           actor: getActor(),

//           remarks,

//           approvedVisitAt,
//         }
//       );

//     if (response?.success) {
//       await Swal.fire({
//         icon: "success",

//         title:
//           approvalStatus ===
//           "Approved"
//             ? "Visit Approved"
//             : "Visit Rejected",

//         text:
//           response.message,

//         confirmButtonColor:
//           "#25B98B",
//       });

//       await refreshAll();
//     }
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Action failed",

//       text:
//         error?.response?.data
//           ?.message ||
//         "Unable to update visit.",

//       confirmButtonColor:
//         "#25B98B",
//     });
//   } finally {
//     setActionLoading("");
//   }
// };
//   const updateStatus = async (visit, newStatus) => {
//     let payload = { status: newStatus, actor: getActor(), remarks: "" };

//     if (newStatus === "Rescheduled") {
//       const result = await Swal.fire({
//         title: "Reschedule Visit",
//         input: "datetime-local",
//         showCancelButton: true,
//         confirmButtonText: "Reschedule",
//         confirmButtonColor: "#7458b1",
//         inputValidator: (value) =>
//           !value ? "Select a new date/time." : undefined,
//       });
//       if (!result.isConfirmed) return;
//       payload.nextVisitAt = result.value;
//       payload.remarks = "Visit rescheduled by admin";
//     } else if (newStatus === "Follow-up") {
//       const result = await Swal.fire({
//         title: "Schedule Follow-up",
//         input: "datetime-local",
//         showCancelButton: true,
//         confirmButtonText: "Set Follow-up",
//         confirmButtonColor: "#25B98B",
//       });
//       if (!result.isConfirmed) return;
//       payload.followUpAt = result.value || null;
//       payload.outcome = "Need Follow-up";
//       payload.remarks = "Follow-up required";
//     } else if (newStatus === "Completed") {
//       const result = await Swal.fire({
//         title: "Complete Visit",
//         input: "select",
//         inputOptions: {
//           Completed: "Completed",
//           Positive: "Positive",
//           "Strong Interest": "Strong Interest",
//           "Not Interested": "Not Interested",
//           "Need Follow-up": "Need Follow-up",
//         },
//         showCancelButton: true,
//         confirmButtonText: "Mark Completed",
//         confirmButtonColor: "#25B98B",
//       });
//       if (!result.isConfirmed) return;
//       payload.outcome = result.value || "Completed";
//       payload.remarks = `Visit completed: ${payload.outcome}`;
//     } else {
//       const result = await Swal.fire({
//         title: `Mark as ${newStatus}?`,
//         input: "textarea",
//         inputPlaceholder: "Optional remarks...",
//         showCancelButton: true,
//         confirmButtonText: `Mark ${newStatus}`,
//         confirmButtonColor:
//           newStatus === "Cancelled" || newStatus === "No Show"
//             ? "#d24a4a"
//             : "#25B98B",
//       });
//       if (!result.isConfirmed) return;
//       payload.remarks = result.value || "";
//     }

//     try {
//       setActionLoading(visit._id);
//       const response = await updateVisitStatusApi(visit._id, payload);
//       if (response?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Visit Updated",
//           text: response.message,
//           confirmButtonColor: "#25B98B",
//         });
//         await refreshAll();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Update failed",
//         text:
//           error?.response?.data?.message || "Unable to update visit status.",
//         confirmButtonColor: "#25B98B",
//       });
//     } finally {
//       setActionLoading("");
//       setActionMenu(null);
//     }
//   };

//   const toggleRow = (id) =>
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );
//   const toggleAll = () => {
//     const ids = visits.map((v) => v._id);
//     const all = ids.length > 0 && ids.every((id) => selectedRows.includes(id));
//     setSelectedRows((prev) =>
//       all
//         ? prev.filter((id) => !ids.includes(id))
//         : [...new Set([...prev, ...ids])],
//     );
//   };

//   const exportReport = async () => {
//     try {
//       // Export the complete result for the CURRENT filters, not only the visible page.
//       const response = await getAdminVisitsApi({
//         tab: activeTab,
//         search: search.trim(),
//         status: statusFilter,
//         approvalStatus: approvalFilter,
//         location: locationFilter,
//         page: 1,
//         limit: 5000,
//       });

//       const exportVisits = response?.success ? response.data || [] : [];

//       if (!exportVisits.length) {
//         await Swal.fire({
//           icon: "info",
//           title: "No Data to Export",
//           text: "No visit records match the selected filters.",
//           confirmButtonColor: "#25B98B",
//         });
//         return;
//       }

//       const rows = exportVisits.map((v) => ({
//         "Visit ID": v.visitId || "",
//         "Property Name": v.propertySnapshot?.title || "",
//         "Property ID": v.propertySnapshot?.propertyCode || "",
//         "Partner Name": v.partnerSnapshot?.name || "",
//         "Partner ID": v.partnerSnapshot?.partnerCode || "",
//         "Partner Type": v.partnerSnapshot?.partnerType || "",
//         Date: formatDate(v.requestedVisitAt),
//         Time: formatTime(v.requestedVisitAt),
//         City: v.propertySnapshot?.city || "",
//         Locality: v.propertySnapshot?.locality || "",
//         Approval: v.approvalStatus || "",
//         Status: v.status || "",
//         Outcome: v.outcome || "Pending",
//         "Request Notes": v.requestNotes || "",
//         "Admin Remarks": v.adminRemarks || "",
//       }));

//       const worksheet = XLSX.utils.json_to_sheet(rows);
//       worksheet["!cols"] = [
//         { wch: 14 },
//         { wch: 28 },
//         { wch: 15 },
//         { wch: 24 },
//         { wch: 15 },
//         { wch: 14 },
//         { wch: 14 },
//         { wch: 12 },
//         { wch: 18 },
//         { wch: 22 },
//         { wch: 15 },
//         { wch: 16 },
//         { wch: 22 },
//         { wch: 30 },
//         { wch: 30 },
//       ];

//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Visits");

//       const safeTab = activeTab.replace(/[^a-z0-9]/gi, "-").toLowerCase();
//       XLSX.writeFile(
//         workbook,
//         `visit-management-${safeTab}-${new Date().toISOString().slice(0, 10)}.xlsx`,
//       );
//     } catch (error) {
//       console.error("Excel export error:", error);
//       await Swal.fire({
//         icon: "error",
//         title: "Export Failed",
//         text:
//           error?.response?.data?.message || "Unable to export Excel report.",
//         confirmButtonColor: "#25B98B",
//       });
//     }
//   };

//   const locations = ["All", ...(summary.locations || [])];

//   return (
//     <div className="min-h-screen overflow-x-hidden bg-[#F4F7F8] px-3 py-3 font-sans text-[#173247] sm:px-4 lg:px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//         <div>
//           <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//             Visit Management
//           </h1>
//           <p className="mt-1 text-[10px] font-medium text-[#8998AF] sm:text-[11px]">
//             Approve partner visit requests and manage scheduled visits,
//             attendance, outcomes, reschedules and follow-ups.
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={refreshAll}
//             className="flex h-[38px] items-center gap-2 rounded-lg border border-[#DCE5E9] bg-white px-4 text-[10px] font-semibold text-[#536779] shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
//           >
//             <RefreshCw size={11} /> Refresh
//           </button>
//           <button
//             onClick={exportReport}
//             className="flex h-[38px] items-center gap-2 rounded-lg bg-[#25B98B] px-4 text-[10px] font-semibold text-white shadow-[0_4px_12px_rgba(37,185,139,0.18)] transition hover:bg-[#15966F]"
//           >
//             <Download size={11} /> Export Report
//           </button>
//         </div>
//       </div>

//       <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//         <StatCard
//           title="Today's Visits"
//           value={summary.today || 0}
//           subtitle={`${summary.pendingApproval || 0} pending approvals`}
//           icon={CalendarDays}
//           onClick={() => { setActiveTab("Today"); setStatusFilter("All"); }}
//         />
//         <StatCard
//           title="Upcoming"
//           value={summary.upcoming || 0}
//           subtitle="Approved / requested future visits"
//           icon={Clock3}
//           type="blue"
//           onClick={() => { setActiveTab("Upcoming"); setStatusFilter("All"); }}
//         />
//         <StatCard
//           title="Completed"
//           value={summary.completed || 0}
//           subtitle="All completed visits"
//           icon={CheckCircle2}
//           onClick={() => { setActiveTab("Completed"); setStatusFilter("All"); }}
//         />
//       </div>

//       <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
//           <MiniMetric
//             label="Cancelled"
//             value={summary.cancelled || 0}
//             danger
//             onClick={() => { setActiveTab("Cancelled"); setStatusFilter("All"); }}
//           />
//           <MiniMetric
//             label="No Show"
//             value={summary.noShow || 0}
//             danger
//             onClick={() => { setActiveTab("No Show"); setStatusFilter("All"); }}
//           />
//           <MiniMetric
//             label="Rescheduled"
//             value={summary.rescheduled || 0}
//             onClick={() => { setActiveTab("Rescheduled"); setStatusFilter("All"); }}
//           />
//           <MiniMetric
//             label="Follow-up"
//             value={summary.followUp || 0}
//             onClick={() => { setActiveTab("Follow-up"); setStatusFilter("All"); }}
//           />
//           <MiniMetric
//             label="Missed"
//             value={summary.missed || 0}
//             danger
//             onClick={() => { setActiveTab("Missed"); setStatusFilter("All"); }}
//           />
//       </div>

//       <div className="mt-4 flex min-w-0 items-center gap-3 border-b border-[#DCE5E9]">
//         <div className="flex min-w-0 flex-1 gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//           {TAB_VALUES.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setStatusFilter("All");
//                 setPage(1);
//               }}
//               className={`relative min-w-max pb-2.5 text-[10px] font-semibold ${activeTab === tab ? "text-[#15966F]" : "text-[#8B99AC]"}`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#35C99A]" />
//               )}
//             </button>
//           ))}
//         </div>
//         <div className="mb-2 flex shrink-0 items-center gap-1.5 rounded-lg border border-[#DCE5E9] bg-white px-3 py-2 text-[10px] font-semibold text-[#607681]">
//           <SlidersHorizontal size={9} /> Filters
//         </div>
//       </div>

//       <div className="mt-3 flex flex-col gap-2 lg:flex-row">
//         <div className="relative flex-1">
//           <Search
//             size={12}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d9b9e]"
//           />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search visit ID, property, partner, location..."
//             className="h-[38px] w-full rounded-lg border border-[#DCE5E9] bg-white pl-8 pr-3 text-[10px] font-medium text-[#42595f] outline-none placeholder:text-[#A1ADAF] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
//           />
//         </div>
//         <SelectFilter
//           value={statusFilter}
//           onChange={setStatusFilter}
//           options={STATUS_OPTIONS}
//           label="All Statuses"
//         />
//         <SelectFilter
//           value={approvalFilter}
//           onChange={setApprovalFilter}
//           options={["All", "Pending", "Approved", "Rejected"]}
//           label="All Approvals"
//         />
//         <SelectFilter
//           value={locationFilter}
//           onChange={setLocationFilter}
//           options={locations}
//           label="All Locations"
//         />
//       </div>

//       <div className="mt-3 max-w-full rounded-[16px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//         <div className="w-full overflow-x-auto rounded-[16px] [scrollbar-color:#B8C8CC_transparent] [scrollbar-width:thin]">
//           <table className="w-full min-w-[1240px] table-fixed">
//             <colgroup>
//               <col className="w-[42px]" />
//               <col className="w-[104px]" />
//               <col className="w-[190px]" />
//               <col className="w-[164px]" />
//               <col className="w-[126px]" />
//               <col className="w-[128px]" />
//               <col className="w-[112px]" />
//               <col className="w-[104px]" />
//               <col className="w-[106px]" />
//               <col className="w-[164px]" />
//             </colgroup>
//             <thead>
//               <tr className="bg-[#1F3C50] text-white">
//                 <th className="w-8 px-3 py-3 text-left">
//                   <input
//                     type="checkbox"
//                     onChange={toggleAll}
//                     checked={
//                       visits.length > 0 &&
//                       visits.every((v) => selectedRows.includes(v._id))
//                     }
//                   />
//                 </th>
//                 {[
//                   "Visit ID",
//                   "Property",
//                   "Requested By Partner",
//                   "Requested Date / Time",
//                   "Location",
//                   "Approval",
//                   "Status",
//                   "Outcome",
//                   "Actions",
//                 ].map((h) => (
//                   <th
//                     key={h}
//                     className="px-2 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2px]"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={10} className="py-16">
//                     <div className="flex items-center justify-center gap-2 text-[10px] text-[#6d7f82]">
//                       <LoaderCircle
//                         size={17}
//                         className="animate-spin text-[#25B98B]"
//                       />{" "}
//                       Loading visits...
//                     </div>
//                   </td>
//                 </tr>
//               ) : visits.length ? (
//                 visits.map((visit) => (
//                   <tr
//                     key={visit._id}
//                     className="border-b border-[#EEF3F5] transition last:border-b-0 hover:bg-[#f9fcfb]"
//                   >
//                     <td className="px-3 py-3">
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.includes(visit._id)}
//                         onChange={() => toggleRow(visit._id)}
//                       />
//                     </td>
//                     <td className="px-2 py-3">
//                       <p className="text-[10px] font-bold text-[#15966F]">
//                         {visit.visitId}
//                       </p>
//                       <p className="mt-1 text-[10px] text-[#98a5a8]">
//                         {visit.approvalStatus === "Pending"
//                           ? "Needs review"
//                           : "Visit record"}
//                       </p>
//                     </td>

//                     <td className="px-2 py-3">
//                       <div className="flex w-full items-start ">
//                         <div className="min-w-0">
//                           {/* PROPERTY NAME */}

//                           <p
//                             className="
//           line-clamp-2
//           break-words
//           text-[13px]
//           font-bold
//           text-[#3b555b]
//         "
//                           >
//                             {visit.propertySnapshot?.title || "-"}
//                           </p>

//                           {/* PROPERTY ID */}

//                           <p
//                             className="
//           mt-1
//           text-[11px]
//           font-bold
//           text-[#15966F]
//         "
//                           >
//                             {visit.propertySnapshot?.propertyCode || "-"}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-2 py-3">
//                       <div className="w-full">
//                         <p className="line-clamp-2 break-words text-[10px] font-bold text-[#40585f]">
//                           {visit.partnerSnapshot?.name || "-"}
//                         </p>
//                         <p className="mt-1 text-[10px] font-bold text-[#15966F]">
//                           {visit.partnerSnapshot?.partnerCode || "-"}
//                         </p>
//                         <p className="mt-1 text-[10px] font-medium capitalize text-[#98a5a8]">
//                           {visit.partnerSnapshot?.partnerType || "-"}
//                         </p>
//                       </div>
//                     </td>
//                     <td className="px-2 py-3">
//                       <p className="text-[10px] font-semibold text-[#465f64]">
//                         {formatDate(visit.requestedVisitAt)}
//                       </p>
//                       <p className="mt-1 text-[10px] text-[#98a5a8]">
//                         {formatTime(visit.requestedVisitAt)}
//                       </p>
//                     </td>
//                     <td className="px-2 py-3">
//                       <div className="flex w-full items-start gap-1">
//                         <MapPin size={9} className="mt-[1px] text-[#6c8984]" />
//                         <div>
//                           <p className="text-[10px] font-semibold text-[#4e676c]">
//                             {visit.propertySnapshot?.city || "-"}
//                           </p>
//                           <p className="mt-1 text-[10px] text-[#98a5a8]">
//                             {visit.propertySnapshot?.locality || "-"}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-2 py-3">
//                       <ApprovalBadge status={visit.approvalStatus} />
//                     </td>
//                     <td className="px-2 py-3">
//                       <StatusBadge status={visit.status} />
//                     </td>
//                     <td className="px-2 py-3">
//                       <p className="break-words text-[10px] text-[#687b7f]">
//                         {visit.outcome || "Pending"}
//                       </p>
//                     </td>
//                     <td
//                       className="relative px-3 py-3"
//                       data-visit-action-menu
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <div className="flex min-w-max items-center justify-end gap-1">
//                         {/* <button
//                           onClick={() => navigate(`/visit-management/${visit._id}`)}
//                           className="flex h-8 items-center gap-1.5 rounded-[6px] border border-[#cfe2de] bg-white px-2.5 text-[11px] font-semibold text-[#167c69] hover:bg-[#f1faf7]"
//                         >
//                           <Eye size={12} /> View
//                         </button> */}
//                         <button
//                           onClick={() => handleViewVisit(visit)}
//                           className="flex h-8 items-center gap-1.5 rounded-[6px] border border-[#cfe2de] bg-white px-2.5 text-[11px] font-semibold text-[#167c69] hover:bg-[#f1faf7]"
//                         >
//                           <Eye size={12} />
//                           View
//                         </button>
//                         {visit.approvalStatus === "Pending" && (
//                           <>
//                             <button
//                               disabled={actionLoading === visit._id}
//                               onClick={() => reviewVisit(visit, "approve")}
//                               className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#e7f8f2] text-[#138266]"
//                               title="Approve"
//                             >
//                               <Check size={11} />
//                             </button>
//                             <button
//                               disabled={actionLoading === visit._id}
//                               onClick={() => reviewVisit(visit, "reject")}
//                               className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#fff0f0] text-[#cf4e4e]"
//                               title="Reject"
//                             >
//                               <X size={11} />
//                             </button>
//                           </>
//                         )}
//                         <button
//                           onClick={() =>
//                             setActionMenu(
//                               actionMenu === visit._id ? null : visit._id,
//                             )
//                           }
//                           className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#dce5e3] text-[#60777b] hover:bg-[#f5f8f7]"
//                         >
//                           <MoreVertical size={15} />
//                         </button>
//                       </div>
//                       {actionMenu === visit._id && (
//                         <div className="absolute right-2 top-11 z-[150] w-[190px] overflow-hidden rounded-[10px] border border-[#dfe7e5] bg-white py-1.5 shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
//                           {[
//                             { label: "Completed", icon: CheckCircle2 },
//                             { label: "Cancelled", icon: XCircle },
//                             { label: "No Show", icon: UserX },
//                             { label: "Rescheduled", icon: RotateCcw },
//                             { label: "Follow-up", icon: MessageSquareMore },
//                           ].map(({ label, icon: Icon }) => (
//                             <button
//                               key={label}
//                               onClick={() => updateStatus(visit, label)}
//                               className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[12px] font-medium text-[#52686e] hover:bg-[#f5faf8]"
//                             >
//                               <Icon size={11} />
//                               {label}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={10} className="py-14 text-center">
//                     <Search size={20} className="mx-auto text-[#a1aeac]" />
//                     <p className="mt-2 text-[12px] font-medium text-[#50676c]">
//                       No visits found
//                     </p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col gap-2 border-t border-[#E7EDF0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
//           <p className="text-[8px] text-[#8f9c9f]">
//             Showing {total === 0 ? 0 : (page - 1) * itemsPerPage + 1} to{" "}
//             {Math.min(page * itemsPerPage, total)} of {total} entries
//           </p>
//           <div className="flex items-center gap-1">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[#dce5e3] bg-white text-[#63777b] disabled:opacity-40"
//             >
//               <ChevronLeft size={11} />
//             </button>
//             <button className="flex h-7 min-w-7 items-center justify-center rounded-md bg-[#1F3C50] px-2 text-[10px] font-semibold text-white">
//               {page}
//             </button>
//             <button
//               disabled={page >= totalPages}
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[#dce5e3] bg-white text-[#63777b] disabled:opacity-40"
//             >
//               <ChevronRight size={11} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {(selectedVisit || detailLoading) && (
//         // <VisitDetailDrawer
//         //   data={selectedVisit}
//         //   loading={detailLoading}
//         //   onClose={() => {
//         //     setSelectedVisit(null);
//         //     if (routeVisitId) navigate("/visit-management");
//         //   }}
//         //   onRefresh={refreshAll}
//         // />
//         <VisitDetailDrawer
//   data={
//     selectedVisit
//   }

//   loading={
//     detailLoading
//   }

//   onClose={() => {

//     setSelectedVisit(
//       null
//     );

//     // ========================================
//     // Partner Dashboard me ho to
//     // bilkul navigate mat karo
//     // ========================================

//     if (embedded) {
//       onEmbeddedDetailClose?.();
//       return;
//     }

//     // ========================================
//     // Standalone detail route se aaye ho
//     // tab normal list par jao
//     // ========================================

//     if (routeVisitId) {
//       navigate(
//         "/visit-management",
//         {
//           replace: true,
//         }
//       );
//     }

//   }}

//   onRefresh={
//     refreshAll
//   }
// />
//       )}
//     </div>
//   );
// }

// function VisitDetailDrawer({ data, loading, onClose }) {
//   const navigate = useNavigate();
//   const visit = data?.visit;
//   const property = data?.property;
//   const partner = data?.partner;
//   const history = data?.visitHistory || [];

//   const propertyMongoId =
//     property?._id || visit?.propertyId?._id || visit?.propertyId || null;

//   const partnerMongoId =
//     partner?._id || visit?.partnerId?._id || visit?.partnerId || null;

//   return (
//     <div className="fixed inset-0 z-[999]">
//       <div
//         onClick={onClose}
//         className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"
//       />
//       <div className="absolute bottom-0 right-0 top-0 w-full max-w-[580px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#F4F7F8] shadow-[-12px_0_35px_rgba(15,23,42,0.13)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//         <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#DCE5E9] bg-white px-5 py-4">
//           <div>
//             <h2 className="text-[18px] font-semibold text-[#173b45]">
//               Visit Details
//             </h2>
//             <p className="mt-1 text-[10px] text-[#8a9a9d]">
//               Property, assigned partner and visit history
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f6f5] text-[#63777b]"
//           >
//             <X size={15} />
//           </button>
//         </div>
//         {loading ? (
//           <div className="flex h-[400px] items-center justify-center">
//             <LoaderCircle size={26} className="animate-spin text-[#25B98B]" />
//           </div>
//         ) : visit ? (
//           <div className="space-y-4 p-5">
//             <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-[10px] font-bold text-[#15966F]">
//                     {visit.visitId}
//                   </p>
//                   <h3 className="mt-1 text-[18px] font-semibold text-[#173c46]">
//                     {visit.propertySnapshot?.title || property?.title}
//                   </h3>
//                   <p className="mt-1 text-[10px] text-[#819194]">
//                     {formatDate(visit.requestedVisitAt)} •{" "}
//                     {formatTime(visit.requestedVisitAt)}
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   <StatusBadge status={visit.status} />
//                   <ApprovalBadge status={visit.approvalStatus} />
//                 </div>
//               </div>
//               <div className="mt-4 grid grid-cols-2 gap-2">
//                 <DetailBox label="Outcome" value={visit.outcome} />
//                 <DetailBox
//                   label="Location"
//                   value={`${visit.propertySnapshot?.locality || ""}, ${visit.propertySnapshot?.city || ""}`}
//                 />
//                 <DetailBox
//                   label="Request Notes"
//                   value={visit.requestNotes || "-"}
//                 />
//                 <DetailBox
//                   label="Admin Remarks"
//                   value={visit.adminRemarks || "-"}
//                 />
//               </div>
//             </div>

//             <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//               <SectionTitle icon={Building2} title="View Property" />
//               <div className="flex gap-3">
//                 {property?.images?.[0]?.url ? (
//                   <img
//                     src={property.images[0].url}
//                     alt=""
//                     className="h-20 w-24 rounded-lg object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-20 w-24 items-center justify-center rounded-lg bg-[#eef7f4] text-[#25B98B]">
//                     <Building2 size={24} />
//                   </div>
//                 )}
//                 <div className="min-w-0 flex-1">
//                   <p className="text-[13px] font-semibold text-[#31515a]">
//                     {property?.title || visit.propertySnapshot?.title}
//                   </p>
//                   <p className="mt-1 text-[10px] font-semibold text-[#15966F]">
//                     {property?.propertyId ||
//                       visit.propertySnapshot?.propertyCode}
//                   </p>
//                   <p className="mt-2 text-[10px] text-[#7d8e92]">
//                     {property?.category || "-"} •{" "}
//                     {property?.propertySize || "-"} {property?.sizeUnit || ""}
//                   </p>
//                   <p className="mt-1 text-[10px] text-[#7d8e92]">
//                     {property?.address ||
//                       visit.propertySnapshot?.address ||
//                       "-"}
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 disabled={!propertyMongoId}
//                 onClick={() =>
//                   propertyMongoId &&
//                   navigate(`/property-management/${propertyMongoId}`)
//                 }
//                 className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1F3C50] px-4 text-[10px] font-semibold text-white transition hover:bg-[#173247] disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <ExternalLink size={14} />
//                 View Property
//               </button>
//             </div>

//             <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//               <SectionTitle icon={UserRound} title="View Partner" />
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF9F4] text-[10px] font-bold text-[#25B98B]">
//                   {getInitials(partner?.name || visit.partnerSnapshot?.name)}
//                 </div>
//                 <div>
//                   <p className="text-[13px] font-semibold text-[#31515a]">
//                     {partner?.name || visit.partnerSnapshot?.name}
//                   </p>
//                   <p className="mt-1 text-[10px] font-semibold text-[#15966F]">
//                     {partner?.partnerId || visit.partnerSnapshot?.partnerCode}
//                   </p>
//                   <p className="mt-1 text-[12px] capitalize text-[#8a989c]">
//                     {partner?.partnerType || visit.partnerSnapshot?.partnerType}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-3 grid grid-cols-2 gap-2">
//                 <DetailBox
//                   icon={Phone}
//                   label="Phone"
//                   value={partner?.phone || visit.partnerSnapshot?.phone}
//                 />
//                 <DetailBox
//                   icon={Mail}
//                   label="Email"
//                   value={partner?.email || visit.partnerSnapshot?.email}
//                 />
//                 <DetailBox
//                   icon={MapPin}
//                   label="City"
//                   value={partner?.location?.city || "-"}
//                 />
//                 <DetailBox
//                   label="Verified"
//                   value={partner?.isVerified ? "Yes" : "No"}
//                 />
//               </div>

//               <button
//                 type="button"
//                 disabled={!partnerMongoId}
//                 onClick={() =>
//                   partnerMongoId &&
//                     navigate(
//                       `/partnerdashboard?tab=dashboard&partnerId=${partnerMongoId}`
//                     )
//                 }
//                 className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#25B98B] px-4 text-[10px] font-semibold text-white transition hover:bg-[#15966F] disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <ExternalLink size={14} />
//                 View Partner
//               </button>
//             </div>

//             <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//               <SectionTitle icon={History} title="Visit History" />
//               <div className="space-y-2">
//                 {history.length ? (
//                   history.map((item) => (
//                     <div
//                       key={item._id}
//                       className="rounded-lg border border-[#E7EDF0] bg-[#F8FAFB] p-3"
//                     >
//                       <div className="flex items-start justify-between gap-2">
//                         <div>
//                           <p className="text-[9px] font-semibold text-[#31515a]">
//                             {item.visitId}
//                           </p>
//                           <p className="mt-1 text-[10px] text-[#8b999c]">
//                             {formatDate(item.requestedVisitAt)} •{" "}
//                             {formatTime(item.requestedVisitAt)}
//                           </p>
//                         </div>
//                         <StatusBadge status={item.status} />
//                       </div>
//                       <p className="mt-2 text-[10px] text-[#63777b]">
//                         Outcome: {item.outcome || "Pending"}
//                       </p>
//                       {item.adminRemarks && (
//                         <p className="mt-1 text-[10px] text-[#8a999c]">
//                           {item.adminRemarks}
//                         </p>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="py-6 text-center text-[10px] text-[#95a3a6]">
//                     No previous visit history.
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//               <SectionTitle icon={CalendarClock} title="Audit Timeline" />
//               <div className="space-y-3">
//                 {(visit.history || [])
//                   .slice()
//                   .reverse()
//                   .map((item) => (
//                     <div key={item._id} className="flex gap-3">
//                       <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#25B98B]" />
//                       <div>
//                         <p className="text-[9px] font-semibold text-[#40585f]">
//                           {item.action}
//                         </p>
//                         <p className="mt-1 text-[10px] text-[#8b999c]">
//                           {formatDate(item.updatedAt)} •{" "}
//                           {formatTime(item.updatedAt)} •{" "}
//                           {item.updatedBy?.name || "-"}
//                         </p>
//                         {item.remarks && (
//                           <p className="mt-1 text-[10px] text-[#63777b]">
//                             {item.remarks}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex h-[400px] items-center justify-center text-[10px] text-[#8a999c]">
//             Visit detail not available.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function SectionTitle({ icon: Icon, title }) {
//   return (
//     <div className="mb-3 flex items-center gap-2">
//       <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF9F4] text-[#25B98B]">
//         <Icon size={13} />
//       </div>
//       <h4 className="text-[10px] font-semibold text-[#31515a]">{title}</h4>
//       <div className="h-px flex-1 bg-[#EEF3F5]" />
//     </div>
//   );
// }

// function DetailBox({ icon: Icon, label, value }) {
//   return (
//     <div className="rounded-lg border border-[#edf1f0] bg-[#F8FAFB] p-3">
//       <div className="flex gap-2">
//         {Icon && <Icon size={12} className="mt-0.5 text-[#159078]" />}
//         <div className="min-w-0">
//           <p className="text-[9px] uppercase tracking-wide text-[#98a5a8]">
//             {label}
//           </p>
//           <p className="mt-1 break-words text-[12px] font-medium text-[#52686e]">
//             {value || "-"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function getInitials(name = "") {
//   return (
//     String(name)
//       .trim()
//       .split(" ")
//       .filter(Boolean)
//       .map((x) => x[0]?.toUpperCase())
//       .join("")
//       .slice(0, 2) || "P"
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  MapPin,
  Search,
  SlidersHorizontal,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
  Eye,
  UserRound,
  History,
  Check,
  X,
  MoreVertical,
  RefreshCw,
  CalendarClock,
  UserX,
  RotateCcw,
  MessageSquareMore,
  LoaderCircle,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  getVisitSummaryApi,
  getAdminVisitsApi,
  getVisitByIdApi,
  reviewVisitRequestApi,
  updateVisitStatusApi,
} from "../../../Services/visitService";

const TAB_VALUES = [
  "Today",
  "Upcoming",
  "Missed",
  "Completed",
  "Cancelled",
  "No Show",
  "Rescheduled",
  "Follow-up",
];

const STATUS_OPTIONS = [
  "All",
  "Requested",
  "Upcoming",
  "Completed",
  "Cancelled",
  "No Show",
  "Rescheduled",
  "Follow-up",
];

const getLocalUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const getActor = () => {
  const user = getLocalUser();
  return {
    userId: user?.id || null,
    name: user?.name || "Admin",
    role: user?.role
      ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}`
      : "Admin",
  };
};

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const StatusBadge = ({ status }) => {
  const styles = {
    Requested: "bg-[#fff8e8] text-[#b87818] border-[#f2dfb8]",
    Upcoming: "bg-[#eaf5ff] text-[#3978a8] border-[#cfe4f4]",
    Completed: "bg-[#EAF9F4] text-[#16825f] border-[#CDEFE4]",
    Cancelled: "bg-[#fff0f0] text-[#d24a4a] border-[#efd0d0]",
    "No Show": "bg-[#fff5e8] text-[#bc7622] border-[#edd8b7]",
    Rescheduled: "bg-[#f2efff] text-[#7458b1] border-[#dfd7f5]",
    "Follow-up": "bg-[#EAF9F4] text-[#15966F] border-[#CDEFE4]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ${styles[status] || "bg-gray-50 text-gray-500 border-gray-200"}`}
    >
      {status || "-"}
    </span>
  );
};

const ApprovalBadge = ({ status }) => {
  const normalizedStatus = status || "Pending";

  const styles = {
    Pending: "bg-[#fff8e8] text-[#b87818] border-[#f2dfb8]",

    Approved: "bg-[#EAF9F4] text-[#16825f] border-[#CDEFE4]",

    Rejected: "bg-[#fff0f0] text-[#d24a4a] border-[#efd0d0]",
  };

  const labels = {
    Pending: "Pending",
    Approved: "Approved",
    Rejected: "Rejected",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1
        rounded-full
        border
        px-2.5
        py-1
        text-[11px]
        font-semibold
        whitespace-nowrap
        ${styles[normalizedStatus] || styles.Pending}
      `}
    >
      {normalizedStatus === "Approved" && <Check size={9} />}

      {normalizedStatus === "Rejected" && <X size={9} />}

      {normalizedStatus === "Pending" && <Clock3 size={9} />}

      {labels[normalizedStatus] || normalizedStatus}
    </span>
  );
};
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  type = "default",
  onClick,
}) => {
  const styles = {
    default: {
      iconBg: "bg-[#EAF9F4]",
      icon: "text-[#25B98B]",
    },
    blue: {
      iconBg: "bg-[#EEF6FF]",
      icon: "text-[#2E90FA]",
    },
    amber: {
      iconBg: "bg-[#FFF5E8]",
      icon: "text-[#F79009]",
    },
  };

  const current = styles[type] || styles.default;

  return (
    <button
      onClick={onClick}
      className="min-h-[150px] w-full rounded-[18px] border border-[#DCE5E9] bg-white p-5 text-left shadow-[0_2px_5px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-md sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="pt-2 text-[10px] font-bold uppercase tracking-[0.25px] text-[#576D86]">
          {title}
        </p>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[15px] ${current.iconBg}`}
        >
          <Icon size={22} className={current.icon} />
        </div>
      </div>

      <p className="mt-5 text-[29px] font-bold leading-none text-[#173247]">
        {value}
      </p>

      {subtitle && (
        <p className="mt-3 text-[10px] font-medium text-[#95A3B5]">
          {subtitle}
        </p>
      )}
    </button>
  );
};

const MiniMetric = ({ label, value, danger, onClick }) => (
  <button
    onClick={onClick}
    className="flex min-h-[104px] min-w-0 flex-col justify-between rounded-[16px] border border-[#DCE5E9] bg-white p-4 text-left shadow-[0_2px_5px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-sm"
  >
    <p className="break-words text-[9px] font-bold uppercase leading-[1.35] tracking-[0.2px] text-[#7D8FA3]">
      {label}
    </p>

    <p
      className={`mt-4 text-[22px] font-bold leading-none ${
        danger ? "text-[#E05252]" : "text-[#173247]"
      }`}
    >
      {value}
    </p>
  </button>
);

const SelectFilter = ({ value, onChange, options, label }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="h-[38px] min-w-[125px] rounded-lg border border-[#DCE5E9] bg-white px-3 text-[10px] font-semibold text-[#607681] outline-none focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
  >
    {options.map((item) => (
      <option key={item} value={item}>
        {item === "All" ? label : item}
      </option>
    ))}
  </select>
);

// export default function VisitManagement() {
//   const navigate = useNavigate();
//   const { id: routeVisitId } = useParams();
export default function VisitManagement({
  embedded = false,
  initialVisitId = null,
  onEmbeddedDetailClose,
}) {
  const navigate = useNavigate();

  const { id: routeVisitId } = useParams();
  const [visits, setVisits] = useState([]);
  const [summary, setSummary] = useState({
    today: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0,
    rescheduled: 0,
    followUp: 0,
    missed: 0,
    pendingApproval: 0,
    locations: [],
  });
  const [activeTab, setActiveTab] = useState("Today");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  // Show only 2 visits per page. Pagination is handled by the API.
  // Action buttons are kept compact so View + Approve + Reject + More always remain visible.
  const itemsPerPage = 10;

  const closeActionMenu = () => {
    setActionMenu(null);
    setActionMenuPosition(null);
  };

  // Close action menu when user clicks anywhere outside it or presses Escape
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-visit-action-menu]")) {
        closeActionMenu();
        setActionMenuPosition(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") closeActionMenu();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await getVisitSummaryApi();
      if (response?.success) setSummary(response.data || {});
    } catch (error) {
      console.error("Visit summary error:", error);
    }
  };

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const response = await getAdminVisitsApi({
        tab: activeTab,
        search: search.trim(),
        status: statusFilter,
        approvalStatus: approvalFilter,
        location: locationFilter,
        page,
        limit: itemsPerPage,
      });
      if (response?.success) {
        setVisits(response.data || []);
        setTotal(response.total || 0);
        setTotalPages(response.totalPages || 1);
      } else {
        setVisits([]);
      }
    } catch (error) {
      setVisits([]);
      Swal.fire({
        icon: "error",
        title: "Unable to load visits",
        text: error?.response?.data?.message || "Failed to fetch visit data.",
        confirmButtonColor: "#25B98B",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchVisits, 250);
    return () => clearTimeout(timer);
  }, [activeTab, search, statusFilter, approvalFilter, locationFilter, page]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, search, statusFilter, approvalFilter, locationFilter]);

  // const openVisitDetail = async (id) => {
  //   try {
  //     setDetailLoading(true);
  //     setSelectedVisit(null);
  //     const response = await getVisitByIdApi(id);
  //     if (response?.success) setSelectedVisit(response.data);
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Unable to load details",
  //       text: error?.response?.data?.message || "Visit details not available.",
  //       confirmButtonColor: "#25B98B",
  //     });
  //   } finally {
  //     setDetailLoading(false);
  //     closeActionMenu();
  //   }
  // };
const openVisitDetail = async (id) => {
  try {
    if (!id) return;

    setDetailLoading(true);
    setSelectedVisit(null);

    const response = await getVisitByIdApi(id);

    console.log("VISIT DETAIL RESPONSE =====>", response);

    if (!response?.success) {
      throw new Error(
        response?.message || "Unable to fetch visit detail"
      );
    }

    const responseData = response?.data;

    // CASE 1:
    // Backend:
    // data: {
    //   visit: {...},
    //   property: {...},
    //   partner: {...},
    //   visitHistory: [...]
    // }
    if (responseData?.visit) {
      setSelectedVisit(responseData);
      return;
    }

    // CASE 2:
    // Backend:
    // data: {
    //   _id: "...",
    //   visitId: "...",
    //   ...
    // }
    if (responseData?._id || responseData?.visitId) {
      setSelectedVisit({
        visit: responseData,
        property:
          responseData?.property ||
          responseData?.propertyId ||
          null,
        partner:
          responseData?.partner ||
          responseData?.partnerId ||
          null,
        visitHistory:
          responseData?.visitHistory ||
          responseData?.history ||
          [],
      });

      return;
    }

    throw new Error("Visit detail response is empty");
  } catch (error) {
    console.error(
      "OPEN VISIT DETAIL ERROR =====>",
      error
    );

    setSelectedVisit(null);

    Swal.fire({
      icon: "error",
      title: "Unable to load details",
      text:
        error?.response?.data?.message ||
        error?.message ||
        "Visit details not available.",
      confirmButtonColor: "#25B98B",
    });
  } finally {
    setDetailLoading(false);
    closeActionMenu();
  }
};
  const handleViewVisit = (visit) => {
    if (!visit?._id) {
      return;
    }

    // ==========================================
    // PARTNER DASHBOARD KE ANDAR
    // Route change nahi hoga
    // ==========================================

    if (embedded) {
      openVisitDetail(visit._id);

      return;
    }

    // ==========================================
    // STANDALONE VISIT MANAGEMENT
    // URL route maintain hoga
    // ==========================================

    navigate(`/visit-management/${visit._id}`);
  };

  // useEffect(() => {
  //   if (routeVisitId) {
  //     openVisitDetail(routeVisitId);
  //   }
  // }, [routeVisitId]);
useEffect(() => {
  // Embedded Partner Dashboard me standalone route id use nahi karna
  if (embedded) {
    return;
  }

  if (routeVisitId) {
    openVisitDetail(routeVisitId);
  }
}, [routeVisitId, embedded]);

// ======================================================
// PARTNER DASHBOARD SE SPECIFIC VISIT OPEN
// Example:
// /partnerdashboard?tab=visit&visitId=VISIT_MONGO_ID
// ======================================================
useEffect(() => {
  if (!embedded || !initialVisitId) {
    return;
  }

  openVisitDetail(initialVisitId);
}, [embedded, initialVisitId]);
  const refreshAll = async () => {
    await Promise.all([fetchVisits(), fetchSummary()]);
    if (selectedVisit?.visit?._id)
      await openVisitDetail(selectedVisit.visit._id);
  };

  // const reviewVisit = async (visit, action) => {
  //   let remarks = "";
  //   let approvedVisitAt;

  //   if (action === "approve") {
  //     const result = await Swal.fire({
  //       title: "Approve Visit Request?",
  //       html: `<div style="font-size:12px;color:#667085;line-height:1.6">Approve <strong>${visit.visitId}</strong> for <strong>${visit.propertySnapshot?.title || "property"}</strong>?</div>`,
  //       input: "datetime-local",
  //       inputValue: new Date(visit.requestedVisitAt).toISOString().slice(0, 16),
  //       showCancelButton: true,
  //       confirmButtonText: "Approve Visit",
  //       confirmButtonColor: "#25B98B",
  //     });
  //     if (!result.isConfirmed) return;
  //     approvedVisitAt = result.value || visit.requestedVisitAt;
  //   } else {
  //     const result = await Swal.fire({
  //       title: "Reject Visit Request?",
  //       input: "textarea",
  //       inputPlaceholder: "Reason for rejection...",
  //       showCancelButton: true,
  //       confirmButtonText: "Reject Request",
  //       confirmButtonColor: "#d24a4a",
  //       inputValidator: (value) =>
  //         !value?.trim() ? "Please enter a reason." : undefined,
  //     });
  //     if (!result.isConfirmed) return;
  //     remarks = result.value;
  //   }

  //   try {
  //     setActionLoading(visit._id);
  //     const response = await reviewVisitRequestApi(visit._id, {
  //       action,
  //       actor: getActor(),
  //       remarks,
  //       approvedVisitAt,
  //     });
  //     if (response?.success) {
  //       await Swal.fire({
  //         icon: "success",
  //         title: action === "approve" ? "Visit Approved" : "Visit Rejected",
  //         text: response.message,
  //         confirmButtonColor: "#25B98B",
  //       });
  //       await refreshAll();
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Action failed",
  //       text: error?.response?.data?.message || "Unable to update visit.",
  //       confirmButtonColor: "#25B98B",
  //     });
  //   } finally {
  //     setActionLoading("");
  //   }
  // };
const reviewVisit = async (visit, action) => {
  let remarks = "";
  let approvedVisitAt;

  if (action === "approve") {
    const result = await Swal.fire({
      title: "Approve Visit Request?",
      html: `
        <div style="font-size:12px;color:#667085;line-height:1.6">
          Approve <strong>${visit.visitId}</strong>
          for
          <strong>
            ${visit.propertySnapshot?.title || "property"}
          </strong>?
        </div>
      `,
      input: "datetime-local",
      inputValue: new Date(
        visit.requestedVisitAt
      )
        .toISOString()
        .slice(0, 16),

      showCancelButton: true,
      confirmButtonText:
        "Approve Visit",
      confirmButtonColor:
        "#25B98B",
    });

    if (!result.isConfirmed) {
      return;
    }

    approvedVisitAt =
      result.value ||
      visit.requestedVisitAt;
  } else {
    const result =
      await Swal.fire({
        title:
          "Reject Visit Request?",

        input: "textarea",

        inputPlaceholder:
          "Reason for rejection...",

        showCancelButton: true,

        confirmButtonText:
          "Reject Request",

        confirmButtonColor:
          "#d24a4a",

        inputValidator: (value) =>
          !value?.trim()
            ? "Please enter a reason."
            : undefined,
      });

    if (!result.isConfirmed) {
      return;
    }

    remarks = result.value;
  }

  try {
    setActionLoading(visit._id);

    // ================================================
    // FRONTEND SE APPROVAL STATUS BHEJ RAHE HAIN
    // ================================================

    const approvalStatus =
      action === "approve"
        ? "Approved"
        : "Rejected";

    const response =
      await reviewVisitRequestApi(
        visit._id,
        {
          action,

          // IMPORTANT
          approvalStatus,

          actor: getActor(),

          remarks,

          approvedVisitAt,
        }
      );

    if (response?.success) {
      await Swal.fire({
        icon: "success",

        title:
          approvalStatus ===
          "Approved"
            ? "Visit Approved"
            : "Visit Rejected",

        text:
          response.message,

        confirmButtonColor:
          "#25B98B",
      });

      await refreshAll();
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Action failed",

      text:
        error?.response?.data
          ?.message ||
        "Unable to update visit.",

      confirmButtonColor:
        "#25B98B",
    });
  } finally {
    setActionLoading("");
  }
};
  const updateStatus = async (visit, newStatus) => {
    let payload = { status: newStatus, actor: getActor(), remarks: "" };

    if (newStatus === "Rescheduled") {
      const result = await Swal.fire({
        title: "Reschedule Visit",
        input: "datetime-local",
        showCancelButton: true,
        confirmButtonText: "Reschedule",
        confirmButtonColor: "#7458b1",
        inputValidator: (value) =>
          !value ? "Select a new date/time." : undefined,
      });
      if (!result.isConfirmed) return;
      payload.nextVisitAt = result.value;
      payload.remarks = "Visit rescheduled by admin";
    } else if (newStatus === "Follow-up") {
      const result = await Swal.fire({
        title: "Schedule Follow-up",
        input: "datetime-local",
        showCancelButton: true,
        confirmButtonText: "Set Follow-up",
        confirmButtonColor: "#25B98B",
      });
      if (!result.isConfirmed) return;
      payload.followUpAt = result.value || null;
      payload.outcome = "Need Follow-up";
      payload.remarks = "Follow-up required";
    } else if (newStatus === "Completed") {
      const result = await Swal.fire({
        title: "Complete Visit",
        input: "select",
        inputOptions: {
          Completed: "Completed",
          Positive: "Positive",
          "Strong Interest": "Strong Interest",
          "Not Interested": "Not Interested",
          "Need Follow-up": "Need Follow-up",
        },
        showCancelButton: true,
        confirmButtonText: "Mark Completed",
        confirmButtonColor: "#25B98B",
      });
      if (!result.isConfirmed) return;
      payload.outcome = result.value || "Completed";
      payload.remarks = `Visit completed: ${payload.outcome}`;
    } else {
      const result = await Swal.fire({
        title: `Mark as ${newStatus}?`,
        input: "textarea",
        inputPlaceholder: "Optional remarks...",
        showCancelButton: true,
        confirmButtonText: `Mark ${newStatus}`,
        confirmButtonColor:
          newStatus === "Cancelled" || newStatus === "No Show"
            ? "#d24a4a"
            : "#25B98B",
      });
      if (!result.isConfirmed) return;
      payload.remarks = result.value || "";
    }

    try {
      setActionLoading(visit._id);
      const response = await updateVisitStatusApi(visit._id, payload);
      if (response?.success) {
        await Swal.fire({
          icon: "success",
          title: "Visit Updated",
          text: response.message,
          confirmButtonColor: "#25B98B",
        });
        await refreshAll();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text:
          error?.response?.data?.message || "Unable to update visit status.",
        confirmButtonColor: "#25B98B",
      });
    } finally {
      setActionLoading("");
      closeActionMenu();
    }
  };

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const toggleAll = () => {
    const ids = visits.map((v) => v._id);
    const all = ids.length > 0 && ids.every((id) => selectedRows.includes(id));
    setSelectedRows((prev) =>
      all
        ? prev.filter((id) => !ids.includes(id))
        : [...new Set([...prev, ...ids])],
    );
  };

  const exportReport = async () => {
    try {
      // Export the complete result for the CURRENT filters, not only the visible page.
      const response = await getAdminVisitsApi({
        tab: activeTab,
        search: search.trim(),
        status: statusFilter,
        approvalStatus: approvalFilter,
        location: locationFilter,
        page: 1,
        limit: 5000,
      });

      const exportVisits = response?.success ? response.data || [] : [];

      if (!exportVisits.length) {
        await Swal.fire({
          icon: "info",
          title: "No Data to Export",
          text: "No visit records match the selected filters.",
          confirmButtonColor: "#25B98B",
        });
        return;
      }

      const rows = exportVisits.map((v) => ({
        "Visit ID": v.visitId || "",
        "Property Name": v.propertySnapshot?.title || "",
        "Property ID": v.propertySnapshot?.propertyCode || "",
        "Partner Name": v.partnerSnapshot?.name || "",
        "Partner ID": v.partnerSnapshot?.partnerCode || "",
        "Partner Type": v.partnerSnapshot?.partnerType || "",
        Date: formatDate(v.requestedVisitAt),
        Time: formatTime(v.requestedVisitAt),
        City: v.propertySnapshot?.city || "",
        Locality: v.propertySnapshot?.locality || "",
        Approval: v.approvalStatus || "",
        Status: v.status || "",
        Outcome: v.outcome || "Pending",
        "Request Notes": v.requestNotes || "",
        "Admin Remarks": v.adminRemarks || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      worksheet["!cols"] = [
        { wch: 14 },
        { wch: 28 },
        { wch: 15 },
        { wch: 24 },
        { wch: 15 },
        { wch: 14 },
        { wch: 14 },
        { wch: 12 },
        { wch: 18 },
        { wch: 22 },
        { wch: 15 },
        { wch: 16 },
        { wch: 22 },
        { wch: 30 },
        { wch: 30 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Visits");

      const safeTab = activeTab.replace(/[^a-z0-9]/gi, "-").toLowerCase();
      XLSX.writeFile(
        workbook,
        `visit-management-${safeTab}-${new Date().toISOString().slice(0, 10)}.xlsx`,
      );
    } catch (error) {
      console.error("Excel export error:", error);
      await Swal.fire({
        icon: "error",
        title: "Export Failed",
        text:
          error?.response?.data?.message || "Unable to export Excel report.",
        confirmButtonColor: "#25B98B",
      });
    }
  };

  const locations = ["All", ...(summary.locations || [])];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4F7F8] px-3 py-3 font-sans text-[#173247] sm:px-4 lg:px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
            Visit Management
          </h1>
          <p className="mt-1 text-[10px] font-medium text-[#8998AF] sm:text-[11px]">
            Approve partner visit requests and manage scheduled visits,
            attendance, outcomes, reschedules and follow-ups.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refreshAll}
            className="flex h-[38px] items-center gap-2 rounded-lg border border-[#DCE5E9] bg-white px-4 text-[10px] font-semibold text-[#536779] shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]"
          >
            <RefreshCw size={11} /> Refresh
          </button>
          <button
            onClick={exportReport}
            className="flex h-[38px] items-center gap-2 rounded-lg bg-[#25B98B] px-4 text-[10px] font-semibold text-white shadow-[0_4px_12px_rgba(37,185,139,0.18)] transition hover:bg-[#15966F]"
          >
            <Download size={11} /> Export Report
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Today's Visits"
          value={summary.today || 0}
          subtitle={`${summary.pendingApproval || 0} pending approvals`}
          icon={CalendarDays}
          onClick={() => { setActiveTab("Today"); setStatusFilter("All"); }}
        />
        <StatCard
          title="Upcoming"
          value={summary.upcoming || 0}
          subtitle="Approved / requested future visits"
          icon={Clock3}
          type="blue"
          onClick={() => { setActiveTab("Upcoming"); setStatusFilter("All"); }}
        />
        <StatCard
          title="Completed"
          value={summary.completed || 0}
          subtitle="All completed visits"
          icon={CheckCircle2}
          onClick={() => { setActiveTab("Completed"); setStatusFilter("All"); }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          <MiniMetric
            label="Cancelled"
            value={summary.cancelled || 0}
            danger
            onClick={() => { setActiveTab("Cancelled"); setStatusFilter("All"); }}
          />
          <MiniMetric
            label="No Show"
            value={summary.noShow || 0}
            danger
            onClick={() => { setActiveTab("No Show"); setStatusFilter("All"); }}
          />
          <MiniMetric
            label="Rescheduled"
            value={summary.rescheduled || 0}
            onClick={() => { setActiveTab("Rescheduled"); setStatusFilter("All"); }}
          />
          <MiniMetric
            label="Follow-up"
            value={summary.followUp || 0}
            onClick={() => { setActiveTab("Follow-up"); setStatusFilter("All"); }}
          />
          <MiniMetric
            label="Missed"
            value={summary.missed || 0}
            danger
            onClick={() => { setActiveTab("Missed"); setStatusFilter("All"); }}
          />
      </div>

      <div className="mt-4 flex min-w-0 items-center gap-3 border-b border-[#DCE5E9]">
        <div className="flex min-w-0 flex-1 flex-wrap gap-x-4 gap-y-2">
          {TAB_VALUES.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setStatusFilter("All");
                setPage(1);
              }}
              className={`relative min-w-max pb-2.5 text-[10px] font-semibold ${activeTab === tab ? "text-[#15966F]" : "text-[#8B99AC]"}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#35C99A]" />
              )}
            </button>
          ))}
        </div>
        <div className="mb-2 flex shrink-0 items-center gap-1.5 rounded-lg border border-[#DCE5E9] bg-white px-3 py-2 text-[10px] font-semibold text-[#607681]">
          <SlidersHorizontal size={9} /> Filters
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d9b9e]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search visit ID, property, partner, location..."
            className="h-[38px] w-full rounded-lg border border-[#DCE5E9] bg-white pl-8 pr-3 text-[10px] font-medium text-[#42595f] outline-none placeholder:text-[#A1ADAF] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
          />
        </div>
        <SelectFilter
          value={statusFilter}
          onChange={setStatusFilter}
          options={STATUS_OPTIONS}
          label="All Statuses"
        />
        <SelectFilter
          value={approvalFilter}
          onChange={setApprovalFilter}
          options={["All", "Pending", "Approved", "Rejected"]}
          label="All Approvals"
        />
        <SelectFilter
          value={locationFilter}
          onChange={setLocationFilter}
          options={locations}
          label="All Locations"
        />
      </div>

      <div className="mt-3 max-w-full rounded-[16px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
        <div className="w-full overflow-visible rounded-[16px]">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[3%]" />
              <col className="w-[9%]" />
              <col className="w-[14%]" />
              <col className="hidden w-[12%] lg:table-column" />
              <col className="w-[11%]" />
              <col className="hidden w-[9%] lg:table-column" />
              <col className="hidden w-[8%] lg:table-column" />
              <col className="w-[8%]" />
              <col className="hidden w-[6%] lg:table-column" />
              <col className="w-[20%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#1F3C50] text-white">
                <th className="w-8 px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={toggleAll}
                    checked={
                      visits.length > 0 &&
                      visits.every((v) => selectedRows.includes(v._id))
                    }
                  />
                </th>
                {[
                  "Visit ID",
                  "Property",
                  "Requested By Partner",
                  "Requested Date / Time",
                  "Location",
                  "Approval",
                  "Status",
                  "Outcome",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-1.5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.15px] sm:px-2 sm:text-[10px] ${
                      ["Requested By Partner", "Location", "Approval", "Outcome"].includes(h)
                        ? "hidden lg:table-cell"
                        : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-16">
                    <div className="flex items-center justify-center gap-2 text-[10px] text-[#6d7f82]">
                      <LoaderCircle
                        size={17}
                        className="animate-spin text-[#25B98B]"
                      />{" "}
                      Loading visits...
                    </div>
                  </td>
                </tr>
              ) : visits.length ? (
                visits.map((visit) => (
                  <tr
                    key={visit._id}
                    className="border-b border-[#EEF3F5] transition last:border-b-0 hover:bg-[#f9fcfb]"
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(visit._id)}
                        onChange={() => toggleRow(visit._id)}
                      />
                    </td>
                    <td className="w-[17%] px-1.5 py-3 sm:w-[13%] sm:px-2">
                      <p className="truncate text-[10px] font-bold text-[#15966F]">
                        {visit.visitId}
                      </p>
                      <p className="mt-1 text-[10px] text-[#98a5a8]">
                        {visit.approvalStatus === "Pending"
                          ? "Needs review"
                          : "Visit record"}
                      </p>
                    </td>

                    <td className="w-[27%] px-1.5 py-3 sm:w-[28%] sm:px-2">
                      <div className="flex w-full min-w-0 items-start">
                        <div className="min-w-0">
                          {/* PROPERTY NAME */}

                          <p
                            className="
          line-clamp-2
          break-words
          text-[13px]
          font-bold
          text-[#3b555b]
        "
                          >
                            {visit.propertySnapshot?.title || "-"}
                          </p>

                          {/* PROPERTY ID */}

                          <p
                            className="
          mt-1
          text-[11px]
          font-bold
          text-[#15966F]
        "
                          >
                            {visit.propertySnapshot?.propertyCode || "-"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-2 py-3 lg:table-cell">
                      <div className="w-full">
                        <p className="line-clamp-2 break-words text-[10px] font-bold text-[#40585f]">
                          {visit.partnerSnapshot?.name || "-"}
                        </p>
                        <p className="mt-1 text-[10px] font-bold text-[#15966F]">
                          {visit.partnerSnapshot?.partnerCode || "-"}
                        </p>
                        <p className="mt-1 text-[10px] font-medium capitalize text-[#98a5a8]">
                          {visit.partnerSnapshot?.partnerType || "-"}
                        </p>
                      </div>
                    </td>
                    <td className="w-[18%] px-1.5 py-3 sm:w-[17%] sm:px-2">
                      <p className="text-[9px] font-semibold text-[#465f64] sm:text-[10px]">
                        {formatDate(visit.requestedVisitAt)}
                      </p>
                      <p className="mt-1 text-[10px] text-[#98a5a8]">
                        {formatTime(visit.requestedVisitAt)}
                      </p>
                    </td>
                    <td className="hidden px-2 py-3 lg:table-cell">
                      <div className="flex w-full items-start gap-1">
                        <MapPin size={9} className="mt-[1px] text-[#6c8984]" />
                        <div>
                          <p className="text-[10px] font-semibold text-[#4e676c]">
                            {visit.propertySnapshot?.city || "-"}
                          </p>
                          <p className="mt-1 text-[10px] text-[#98a5a8]">
                            {visit.propertySnapshot?.locality || "-"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-2 py-3 lg:table-cell">
                      <ApprovalBadge status={visit.approvalStatus} />
                    </td>
                    <td className="w-[17%] px-1.5 py-3 sm:w-[15%] sm:px-2">
                      <StatusBadge status={visit.status} />
                    </td>
                    <td className="hidden px-2 py-3 lg:table-cell">
                      <p className="break-words text-[10px] text-[#687b7f]">
                        {visit.outcome || "Pending"}
                      </p>
                    </td>
                    <td
                      className="w-[20%] min-w-[170px] px-1 py-3 sm:px-1.5"
                      data-visit-action-menu
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex w-full min-w-0 items-center justify-end gap-1">
                        {/* <button
                          onClick={() => navigate(`/visit-management/${visit._id}`)}
                          className="flex h-7 shrink-0 items-center gap-1 rounded-[6px] border border-[#cfe2de] bg-white px-2 text-[10px] font-semibold text-[#167c69] hover:bg-[#f1faf7]"
                        >
                          <Eye size={12} /> View
                        </button> */}
                        <button
                          onClick={() => handleViewVisit(visit)}
                          className="flex h-8 items-center gap-1.5 rounded-[6px] border border-[#cfe2de] bg-white px-2.5 text-[11px] font-semibold text-[#167c69] hover:bg-[#f1faf7]"
                        >
                          <Eye size={12} />
                          View
                        </button>
                        {visit.approvalStatus === "Pending" && (
                          <>
                            <button
                              disabled={actionLoading === visit._id}
                              onClick={() => reviewVisit(visit, "approve")}
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-[#e7f8f2] text-[#138266]"
                              title="Approve"
                            >
                              <Check size={11} />
                            </button>
                            <button
                              disabled={actionLoading === visit._id}
                              onClick={() => reviewVisit(visit, "reject")}
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-[#fff0f0] text-[#cf4e4e]"
                              title="Reject"
                            >
                              <X size={11} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (actionMenu === visit._id) {
                              closeActionMenu();
                              return;
                            }

                            const rect = e.currentTarget.getBoundingClientRect();
                            const menuWidth = 190;
                            const menuHeight = 230;
                            const gap = 6;
                            const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));
                            const shouldOpenAbove = rect.bottom + menuHeight + gap > window.innerHeight;
                            const top = shouldOpenAbove
                              ? Math.max(8, rect.top - menuHeight - gap)
                              : rect.bottom + gap;

                            setActionMenu(visit._id);
                            setActionMenuPosition({ top, left });
                          }}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-[#dce5e3] text-[#60777b] hover:bg-[#f5f8f7]"
                        >
                          <MoreVertical size={15} />
                        </button>
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-14 text-center">
                    <Search size={20} className="mx-auto text-[#a1aeac]" />
                    <p className="mt-2 text-[12px] font-medium text-[#50676c]">
                      No visits found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#E7EDF0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[8px] text-[#8f9c9f]">
            Showing {total === 0 ? 0 : (page - 1) * itemsPerPage + 1} to{" "}
            {Math.min(page * itemsPerPage, total)} of {total} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[#dce5e3] bg-white text-[#63777b] disabled:opacity-40"
            >
              <ChevronLeft size={11} />
            </button>
            <button className="flex h-7 min-w-7 items-center justify-center rounded-md bg-[#1F3C50] px-2 text-[10px] font-semibold text-white">
              {page}
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[#dce5e3] bg-white text-[#63777b] disabled:opacity-40"
            >
              <ChevronRight size={11} />
            </button>
          </div>
        </div>
      </div>

      {actionMenu && actionMenuPosition && (
        <div
          data-visit-action-menu
          className="fixed z-[99999] w-[190px] overflow-hidden rounded-[10px] border border-[#dfe7e5] bg-white py-1.5 shadow-[0_14px_35px_rgba(15,23,42,0.18)]"
          style={{ top: actionMenuPosition.top, left: actionMenuPosition.left }}
          onClick={(e) => e.stopPropagation()}
        >
          {[
            { label: "Completed", icon: CheckCircle2 },
            { label: "Cancelled", icon: XCircle },
            { label: "No Show", icon: UserX },
            { label: "Rescheduled", icon: RotateCcw },
            { label: "Follow-up", icon: MessageSquareMore },
          ].map(({ label, icon: Icon }) => {
            const visit = visits.find((item) => item._id === actionMenu);
            if (!visit) return null;
            return (
              <button
                key={label}
                onClick={() => updateStatus(visit, label)}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[12px] font-medium text-[#52686e] hover:bg-[#f5faf8]"
              >
                <Icon size={11} />
                {label}
              </button>
            );
          })}
        </div>
      )}

      {(selectedVisit || detailLoading) && (
        // <VisitDetailDrawer
        //   data={selectedVisit}
        //   loading={detailLoading}
        //   onClose={() => {
        //     setSelectedVisit(null);
        //     if (routeVisitId) navigate("/visit-management");
        //   }}
        //   onRefresh={refreshAll}
        // />
        <VisitDetailDrawer
  data={
    selectedVisit
  }

  loading={
    detailLoading
  }

  onClose={() => {

    setSelectedVisit(
      null
    );

    // ========================================
    // Partner Dashboard me ho to
    // bilkul navigate mat karo
    // ========================================

    if (embedded) {
      onEmbeddedDetailClose?.();
      return;
    }

    // ========================================
    // Standalone detail route se aaye ho
    // tab normal list par jao
    // ========================================

    if (routeVisitId) {
      navigate(
        "/visit-management",
        {
          replace: true,
        }
      );
    }

  }}

  onRefresh={
    refreshAll
  }
/>
      )}
    </div>
  );
}

function VisitDetailDrawer({ data, loading, onClose }) {
  const navigate = useNavigate();
  const visit = data?.visit;
  const property = data?.property;
  const partner = data?.partner;
  const history = data?.visitHistory || [];

  const propertyMongoId =
    property?._id || visit?.propertyId?._id || visit?.propertyId || null;

  const partnerMongoId =
    partner?._id || visit?.partnerId?._id || visit?.partnerId || null;

  return (
    <div className="fixed inset-0 z-[999]">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"
      />
      <div className="absolute bottom-0 right-0 top-0 w-full max-w-[580px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#F4F7F8] shadow-[-12px_0_35px_rgba(15,23,42,0.13)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#DCE5E9] bg-white px-5 py-4">
          <div>
            <h2 className="text-[18px] font-semibold text-[#173b45]">
              Visit Details
            </h2>
            <p className="mt-1 text-[10px] text-[#8a9a9d]">
              Property, assigned partner and visit history
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f6f5] text-[#63777b]"
          >
            <X size={15} />
          </button>
        </div>
        {loading ? (
          <div className="flex h-[400px] items-center justify-center">
            <LoaderCircle size={26} className="animate-spin text-[#25B98B]" />
          </div>
        ) : visit ? (
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold text-[#15966F]">
                    {visit.visitId}
                  </p>
                  <h3 className="mt-1 text-[18px] font-semibold text-[#173c46]">
                    {visit.propertySnapshot?.title || property?.title}
                  </h3>
                  <p className="mt-1 text-[10px] text-[#819194]">
                    {formatDate(visit.requestedVisitAt)} •{" "}
                    {formatTime(visit.requestedVisitAt)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={visit.status} />
                  <ApprovalBadge status={visit.approvalStatus} />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <DetailBox label="Outcome" value={visit.outcome} />
                <DetailBox
                  label="Location"
                  value={`${visit.propertySnapshot?.locality || ""}, ${visit.propertySnapshot?.city || ""}`}
                />
                <DetailBox
                  label="Request Notes"
                  value={visit.requestNotes || "-"}
                />
                <DetailBox
                  label="Admin Remarks"
                  value={visit.adminRemarks || "-"}
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
              <SectionTitle icon={Building2} title="View Property" />
              <div className="flex gap-3">
                {property?.images?.[0]?.url ? (
                  <img
                    src={property.images[0].url}
                    alt=""
                    className="h-20 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-24 items-center justify-center rounded-lg bg-[#eef7f4] text-[#25B98B]">
                    <Building2 size={24} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-[#31515a]">
                    {property?.title || visit.propertySnapshot?.title}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-[#15966F]">
                    {property?.propertyId ||
                      visit.propertySnapshot?.propertyCode}
                  </p>
                  <p className="mt-2 text-[10px] text-[#7d8e92]">
                    {property?.category || "-"} •{" "}
                    {property?.propertySize || "-"} {property?.sizeUnit || ""}
                  </p>
                  <p className="mt-1 text-[10px] text-[#7d8e92]">
                    {property?.address ||
                      visit.propertySnapshot?.address ||
                      "-"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={!propertyMongoId}
                onClick={() =>
                  propertyMongoId &&
                  navigate(`/property-management/${propertyMongoId}`)
                }
                className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1F3C50] px-4 text-[10px] font-semibold text-white transition hover:bg-[#173247] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ExternalLink size={14} />
                View Property
              </button>
            </div>

            <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
              <SectionTitle icon={UserRound} title="View Partner" />
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF9F4] text-[10px] font-bold text-[#25B98B]">
                  {getInitials(partner?.name || visit.partnerSnapshot?.name)}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#31515a]">
                    {partner?.name || visit.partnerSnapshot?.name}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-[#15966F]">
                    {partner?.partnerId || visit.partnerSnapshot?.partnerCode}
                  </p>
                  <p className="mt-1 text-[12px] capitalize text-[#8a989c]">
                    {partner?.partnerType || visit.partnerSnapshot?.partnerType}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <DetailBox
                  icon={Phone}
                  label="Phone"
                  value={partner?.phone || visit.partnerSnapshot?.phone}
                />
                <DetailBox
                  icon={Mail}
                  label="Email"
                  value={partner?.email || visit.partnerSnapshot?.email}
                />
                <DetailBox
                  icon={MapPin}
                  label="City"
                  value={partner?.location?.city || "-"}
                />
                <DetailBox
                  label="Verified"
                  value={partner?.isVerified ? "Yes" : "No"}
                />
              </div>

              <button
                type="button"
                disabled={!partnerMongoId}
                onClick={() =>
                  partnerMongoId &&
                    navigate(
                      `/partnerdashboard?tab=dashboard&partnerId=${partnerMongoId}`
                    )
                }
                className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#25B98B] px-4 text-[10px] font-semibold text-white transition hover:bg-[#15966F] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ExternalLink size={14} />
                View Partner
              </button>
            </div>

            <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
              <SectionTitle icon={History} title="Visit History" />
              <div className="space-y-2">
                {history.length ? (
                  history.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-lg border border-[#E7EDF0] bg-[#F8FAFB] p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[9px] font-semibold text-[#31515a]">
                            {item.visitId}
                          </p>
                          <p className="mt-1 text-[10px] text-[#8b999c]">
                            {formatDate(item.requestedVisitAt)} •{" "}
                            {formatTime(item.requestedVisitAt)}
                          </p>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="mt-2 text-[10px] text-[#63777b]">
                        Outcome: {item.outcome || "Pending"}
                      </p>
                      {item.adminRemarks && (
                        <p className="mt-1 text-[10px] text-[#8a999c]">
                          {item.adminRemarks}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="py-6 text-center text-[10px] text-[#95a3a6]">
                    No previous visit history.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
              <SectionTitle icon={CalendarClock} title="Audit Timeline" />
              <div className="space-y-3">
                {(visit.history || [])
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#25B98B]" />
                      <div>
                        <p className="text-[9px] font-semibold text-[#40585f]">
                          {item.action}
                        </p>
                        <p className="mt-1 text-[10px] text-[#8b999c]">
                          {formatDate(item.updatedAt)} •{" "}
                          {formatTime(item.updatedAt)} •{" "}
                          {item.updatedBy?.name || "-"}
                        </p>
                        {item.remarks && (
                          <p className="mt-1 text-[10px] text-[#63777b]">
                            {item.remarks}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center text-[10px] text-[#8a999c]">
            Visit detail not available.
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF9F4] text-[#25B98B]">
        <Icon size={13} />
      </div>
      <h4 className="text-[10px] font-semibold text-[#31515a]">{title}</h4>
      <div className="h-px flex-1 bg-[#EEF3F5]" />
    </div>
  );
}

function DetailBox({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-[#edf1f0] bg-[#F8FAFB] p-3">
      <div className="flex gap-2">
        {Icon && <Icon size={12} className="mt-0.5 text-[#159078]" />}
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wide text-[#98a5a8]">
            {label}
          </p>
          <p className="mt-1 break-words text-[12px] font-medium text-[#52686e]">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

function getInitials(name = "") {
  return (
    String(name)
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((x) => x[0]?.toUpperCase())
      .join("")
      .slice(0, 2) || "P"
  );
}
