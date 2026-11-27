
// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Search,
//   Rocket,
//   Building2,
//   Users,
//   Clock3,
//   Coins,
//   Eye,
//   CalendarDays,
//   CheckCircle2,
//   AlertTriangle,
//   TimerReset,
//   RefreshCw,
//   TrendingUp,
//   Wallet,
//   ArrowUpRight,
// } from "lucide-react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   getBoostOperationsDashboardApi,
//   approveBoostRequestApi,
//   rejectBoostRequestApi,
// } from "../../../Services/boostOperationsService";

// const formatDate = (value) => {
//   if (!value) return "—";

//   return new Date(value).toLocaleString(
//     "en-IN",
//     {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }
//   );
// };

// const formatShortDate = (value) => {
//   if (!value) return "—";

//   return new Date(value).toLocaleDateString(
//     "en-IN",
//     {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     }
//   );
// };

// const typeLabel = (value) => {
//   const map = {
//     PROPERTY_BOOST: "Property Boost",
//     FEATURED_7_DAYS: "Featured 7 Days",
//     LOCALITY_TOP_30_DAYS:
//       "Locality Top 30 Days",
//   };

//   return map[value] || value || "—";
// };

// const getRemainingText = (expiresAt) => {
//   if (!expiresAt) {
//     return "No expiry";
//   }

//   const diff =
//     new Date(expiresAt).getTime() -
//     Date.now();

//   if (diff <= 0) {
//     return "Expired";
//   }

//   const days =
//     Math.floor(
//       diff / (1000 * 60 * 60 * 24)
//     );

//   const hours =
//     Math.floor(
//       (
//         diff %
//         (1000 * 60 * 60 * 24)
//       ) /
//         (1000 * 60 * 60)
//     );

//   if (days > 0) {
//     return `${days}d ${hours}h left`;
//   }

//   return `${hours}h left`;
// };

// export default function BoostPropertyPartnerDashboard({ initialRequestId = null }) {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] =
//     useState("Boosted Properties");

//   const [search, setSearch] =
//     useState("");

//   const [status, setStatus] =
//     useState("All");

//   const [loading, setLoading] =
//     useState(true);

//   const [data, setData] =
//     useState({
//       summary: {},
//       boosts: [],
//       partnerPerformance: [],
//     });

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await getBoostOperationsDashboardApi({
//           requestId: initialRequestId || undefined,
//           search:
//             search.trim() ||
//             undefined,
//           status:
//             activeTab ===
//             "Boosted Properties"
//               ? (
//                   status === "All"
//                     ? undefined
//                     : status
//                 )
//               : undefined,
//         });

//       if (response?.success) {
//         setData(
//           response.data || {}
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Boost dashboard error:",
//         error
//       );

//       setData({
//         summary: {},
//         boosts: [],
//         partnerPerformance: [],
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (request) => {
//     try {
//       await approveBoostRequestApi(request._id, {
//         remarks: "Approved from Boost Management",
//         actor: { name: "Admin", role: "Admin" },
//       });
//       await loadDashboard();
//     } catch (error) {
//       alert(error?.response?.data?.message || "Unable to approve request");
//     }
//   };

//   const handleReject = async (request) => {
//     try {
//       await rejectBoostRequestApi(request._id, {
//         remarks: "Rejected from Boost Management",
//         actor: { name: "Admin", role: "Admin" },
//       });
//       await loadDashboard();
//     } catch (error) {
//       alert(error?.response?.data?.message || "Unable to reject request");
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(
//       loadDashboard,
//       250
//     );

//     return () =>
//       clearTimeout(timer);
//   }, [
//     search,
//     status,
//     activeTab,
//   ]);

//   const summary =
//     data?.summary || {};

//   const cards = [
//     {
//       title: "ACTIVE BOOSTS",
//       value:
//         summary.activeBoosts || 0,
//       icon: Rocket,
//       caption:
//         "Currently promoted properties",
//       tone:
//         "bg-[#E8F8F4] text-[#11846E]",
//     },
//     {
//       title: "TOTAL APPROVED",
//       value:
//         summary.approvedTotal || 0,
//       icon: CheckCircle2,
//       caption:
//         "Approved promotion requests",
//       tone:
//         "bg-[#EEF3FA] text-[#4D6B8B]",
//     },
//     {
//       title: "PENDING REQUESTS",
//       value:
//         summary.pendingBoosts || 0,
//       icon: Clock3,
//       caption:
//         "Waiting for approval",
//       tone:
//         "bg-[#FFF7E7] text-[#C87917]",
//     },
//     {
//       title: "CREDITS SPENT",
//       value:
//         Number(
//           summary.creditsSpent || 0
//         ).toLocaleString(
//           "en-IN"
//         ),
//       icon: Coins,
//       caption:
//         "Promotion credits consumed",
//       tone:
//         "bg-[#F6F0FF] text-[#7A52A1]",
//     },
//   ];

//   const visibleBoosts =
//     useMemo(
//       () =>
//         data?.boosts || [],
//       [data]
//     );

//   const partnerRows =
//     useMemo(
//       () =>
//         data?.partnerPerformance ||
//         [],
//       [data]
//     );

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-1 text-[#10243A]">
//       {/* HEADER */}
//       <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//             Boost Property & Partner Operations
//           </h1>

//           <p className="mt-1 text-[12px] text-[#62738B]">
//             Track boosted properties, expiry dates, credits and partner promotion activity
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={loadDashboard}
//           className="flex h-9 w-fit items-center gap-2 rounded-xl border border-[#DCE4EE] bg-white px-4 text-[11px] font-bold text-[#52657D] shadow-sm"
//         >
//           <RefreshCw size={13} />
//           Refresh
//         </button>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {cards.map(
//           ({
//             title,
//             value,
//             icon: Icon,
//             caption,
//             tone,
//           }) => (
//             <div
//               key={title}
//               className="rounded-2xl border border-[#E0E6EF] bg-white p-5 shadow-[0_2px_5px_rgba(15,23,42,0.04)]"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-[10px] font-bold tracking-wide text-[#8390A6]">
//                     {title}
//                   </p>

//                   <p className="mt-3 text-[28px] font-black text-[#0B1D35]">
//                     {value}
//                   </p>
//                 </div>

//                 <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
//                   <Icon size={18} />
//                 </div>
//               </div>

//               <p className="mt-2 text-[10px] text-[#8A97AA]">
//                 {caption}
//               </p>
//             </div>
//           )
//         )}
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="mt-5 rounded-2xl border border-[#E0E6EF] bg-white shadow-[0_2px_5px_rgba(15,23,42,0.04)]">
//         {/* TABS */}
//         <div className="flex overflow-x-auto border-b border-[#E8EDF3] px-4">
//           {[
//             "Boosted Properties",
//             "Partner Performance",
//           ].map((tab) => (
//             <button
//               type="button"
//               key={tab}
//               onClick={() =>
//                 setActiveTab(tab)
//               }
//               className={`relative min-w-max px-4 py-4 text-[11px] font-bold ${
//                 activeTab === tab
//                   ? "text-[#137B70]"
//                   : "text-[#7E8CA2]"
//               }`}
//             >
//               {tab}

//               {activeTab === tab && (
//                 <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#17867A]" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* FILTER */}
//         <div className="flex flex-col gap-3 border-b border-[#E8EDF3] p-4 md:flex-row md:items-center md:justify-between">
//           <div className="relative w-full max-w-[390px]">
//             <Search
//               size={14}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA6B8]"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               placeholder={
//                 activeTab ===
//                 "Boosted Properties"
//                   ? "Search property, partner, request ID..."
//                   : "Search partner..."
//               }
//               className="h-10 w-full rounded-xl border border-[#DDE5EE] bg-[#FAFBFC] pl-9 pr-3 text-[11px] outline-none focus:border-[#62A99F]"
//             />
//           </div>

//           {activeTab ===
//             "Boosted Properties" && (
//             <select
//               value={status}
//               onChange={(e) =>
//                 setStatus(
//                   e.target.value
//                 )
//               }
//               className="h-10 rounded-xl border border-[#DDE5EE] bg-white px-3 text-[11px] font-semibold text-[#607089] outline-none"
//             >
//               <option value="All">
//                 All Status
//               </option>
//               <option value="Approved">
//                 Approved
//               </option>
//               <option value="Pending">
//                 Pending
//               </option>
//               <option value="Expired">
//                 Expired
//               </option>
//               <option value="Rejected">
//                 Rejected
//               </option>
//               <option value="Cancelled">
//                 Cancelled
//               </option>
//             </select>
//           )}
//         </div>

//         {activeTab ===
//         "Boosted Properties" ? (
//           <BoostTable
//             rows={visibleBoosts}
//             loading={loading}
//             navigate={navigate}
//             onApprove={handleApprove}
//             onReject={handleReject}
//           />
//         ) : (
//           <PartnerTable
//             rows={partnerRows}
//             loading={loading}
//             navigate={navigate}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// function BoostTable({
//   rows,
//   loading,
//   navigate,
//   onApprove,
//   onReject,
// }) {
//   if (loading) {
//     return (
//       <LoadingState />
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[1180px]">
//         <thead>
//           <tr className="bg-[#073A58] text-white">
//             <Th>Property</Th>
//             <Th>Partner</Th>
//             <Th>Boost Type</Th>
//             <Th>Credits</Th>
//             <Th>Boosted On</Th>
//             <Th>Expiry</Th>
//             <Th>Status</Th>
//             <Th>Actions</Th>
//           </tr>
//         </thead>

//         <tbody>
//           {rows.length ? (
//             rows.map((item) => {
//               const property =
//                 item.propertyMongoId;
//               const partner =
//                 item.partnerMongoId;

//               return (
//                 <tr
//                   key={item._id}
//                   className="border-b border-[#EDF1F5] last:border-0 hover:bg-[#FAFCFD]"
//                 >
//                   <td className="px-4 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="h-12 w-14 overflow-hidden rounded-lg bg-[#EDF3F5]">
//                         {property
//                           ?.images?.[0]
//                           ?.url ? (
//                           <img
//                             src={
//                               property
//                                 .images[0]
//                                 .url
//                             }
//                             alt={
//                               item.propertyTitle
//                             }
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-full items-center justify-center text-[#8FA0AC]">
//                             <Building2
//                               size={17}
//                             />
//                           </div>
//                         )}
//                       </div>

//                       <div>
//                         <p className="max-w-[180px] text-[11px] font-bold text-[#243C54]">
//                           {item.propertyTitle ||
//                             property?.title ||
//                             "Property"}
//                         </p>

//                         <p className="mt-1 text-[9px] font-bold text-[#188374]">
//                           {item.propertyCode ||
//                             property?.propertyId}
//                         </p>

//                         <p className="mt-1 text-[8px] text-[#8B98A9]">
//                           {[
//                             item.locality,
//                             item.city,
//                           ]
//                             .filter(
//                               Boolean
//                             )
//                             .join(", ")}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-4 py-4">
//                     <p className="text-[11px] font-bold text-[#3A4E64]">
//                       {item.partnerName ||
//                         partner?.name ||
//                         "—"}
//                     </p>

//                     <p className="mt-1 text-[9px] text-[#168173]">
//                       {item.partnerCode ||
//                         partner?.partnerId ||
//                         "—"}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <span className="rounded-full bg-[#EEF6F5] px-2.5 py-1 text-[9px] font-bold text-[#197A70]">
//                       {typeLabel(
//                         item.promotionType
//                       )}
//                     </span>
//                   </td>

//                   <td className="px-4 py-4">
//                     <p className="flex items-center gap-1 text-[11px] font-black text-[#3A4D63]">
//                       <Coins size={12} />
//                       {Number(
//                         item.creditsCharged ||
//                           0
//                       ).toLocaleString(
//                         "en-IN"
//                       )}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <p className="text-[10px] font-semibold text-[#4D6177]">
//                       {formatDate(
//                         item.approvedAt ||
//                           item.requestedAt
//                       )}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <p className="text-[10px] font-semibold text-[#4D6177]">
//                       {formatDate(
//                         item.expiresAt
//                       )}
//                     </p>

//                     <p
//                       className={`mt-1 text-[8px] font-bold ${
//                         getRemainingText(
//                           item.expiresAt
//                         ) ===
//                         "Expired"
//                           ? "text-red-500"
//                           : "text-[#168173]"
//                       }`}
//                     >
//                       {getRemainingText(
//                         item.expiresAt
//                       )}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <StatusPill
//                       status={
//                         item.effectiveStatus ||
//                         item.status
//                       }
//                     />
//                   </td>

//                   <td className="px-4 py-4">
//                     <div className="flex gap-2">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           property?._id &&
//                           navigate(
//                             `/property-management/${property._id}`
//                           )
//                         }
//                         className="flex h-8 items-center gap-1.5 rounded-lg border border-[#D8E3E8] bg-white px-2.5 text-[9px] font-bold text-[#416172] hover:bg-[#F4F8F8]"
//                       >
//                         <Eye size={11} />
//                         Property
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           partner?._id &&
//                           navigate(
//                             `/partnerdashboard?tab=dashboard&partnerId=${partner._id}`
//                           )
//                         }
//                         className="flex h-8 items-center gap-1.5 rounded-lg border border-[#D8E3E8] bg-white px-2.5 text-[9px] font-bold text-[#416172] hover:bg-[#F4F8F8]"
//                       >
//                         <Users size={11} />
//                         Partner
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <EmptyRow
//               colSpan={8}
//               text="No boost records found"
//             />
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function PartnerTable({
//   rows,
//   loading,
//   navigate,
// }) {
//   if (loading) {
//     return (
//       <LoadingState />
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[950px]">
//         <thead>
//           <tr className="bg-[#073A58] text-white">
//             <Th>Partner</Th>
//             <Th>Wallet</Th>
//             <Th>Active Boosts</Th>
//             <Th>Approved</Th>
//             <Th>Expired</Th>
//             <Th>Credits Spent</Th>
//             <Th>Last Boost</Th>
//             <Th>Action</Th>
//           </tr>
//         </thead>

//         <tbody>
//           {rows.length ? (
//             rows.map((row) => {
//               const partner =
//                 row.partner;

//               return (
//                 <tr
//                   key={
//                     row.partnerMongoId
//                   }
//                   className="border-b border-[#EDF1F5] last:border-0 hover:bg-[#FAFCFD]"
//                 >
//                   <td className="px-4 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7F3] text-[11px] font-black text-[#168173]">
//                         {(row.partnerName ||
//                           partner?.name ||
//                           "P")
//                           .split(" ")
//                           .map(
//                             (x) =>
//                               x[0]
//                           )
//                           .join("")
//                           .slice(0, 2)}
//                       </div>

//                       <div>
//                         <p className="text-[11px] font-bold text-[#33495F]">
//                           {row.partnerName ||
//                             partner?.name}
//                         </p>

//                         <p className="mt-1 text-[9px] text-[#188374]">
//                           {row.partnerCode ||
//                             partner?.partnerId}
//                         </p>

//                         <p className="mt-1 text-[8px] text-[#8B98A9]">
//                           {partner
//                             ?.location
//                             ?.city ||
//                             "—"}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-4 py-4">
//                     <p className="flex items-center gap-1 text-[11px] font-black text-[#3B5065]">
//                       <Wallet size={12} />
//                       {Number(
//                         partner
//                           ?.creditWallet
//                           ?.balance ||
//                           0
//                       ).toLocaleString(
//                         "en-IN"
//                       )}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">
//                     <MetricValue
//                       value={
//                         row.activeBoosts
//                       }
//                       tone="text-[#10816F]"
//                     />
//                   </td>

//                   <td className="px-4 py-4">
//                     <MetricValue
//                       value={
//                         row.approvedBoosts
//                       }
//                     />
//                   </td>

//                   <td className="px-4 py-4">
//                     <MetricValue
//                       value={
//                         row.expiredBoosts
//                       }
//                       tone="text-[#D76B5E]"
//                     />
//                   </td>

//                   <td className="px-4 py-4">
//                     <MetricValue
//                       value={Number(
//                         row.creditsSpent ||
//                           0
//                       ).toLocaleString(
//                         "en-IN"
//                       )}
//                       icon={Coins}
//                     />
//                   </td>

//                   <td className="px-4 py-4 text-[10px] font-semibold text-[#596E82]">
//                     {formatDate(
//                       row.lastBoostAt
//                     )}
//                   </td>

//                   <td className="px-4 py-4">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         partner?._id &&
//                         navigate(
//                           `/partnerdashboard?tab=dashboard&partnerId=${partner._id}`
//                         )
//                       }
//                       className="flex h-8 items-center gap-1.5 rounded-lg bg-[#0B796D] px-3 text-[9px] font-bold text-white shadow-sm hover:bg-[#086A60]"
//                     >
//                       View Partner
//                       <ArrowUpRight
//                         size={11}
//                       />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <EmptyRow
//               colSpan={8}
//               text="No partner promotion activity found"
//             />
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function StatusPill({
//   status,
// }) {
//   const map = {
//     Approved:
//       "border-emerald-200 bg-emerald-50 text-emerald-600",
//     Pending:
//       "border-amber-200 bg-amber-50 text-amber-600",
//     Expired:
//       "border-slate-200 bg-slate-100 text-slate-500",
//     Rejected:
//       "border-red-200 bg-red-50 text-red-500",
//     Cancelled:
//       "border-orange-200 bg-orange-50 text-orange-500",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold ${
//         map[status] ||
//         "border-slate-200 bg-slate-50 text-slate-500"
//       }`}
//     >
//       {status}
//     </span>
//   );
// }

// function MetricValue({
//   value,
//   tone = "text-[#3A5065]",
//   icon: Icon,
// }) {
//   return (
//     <p className={`flex items-center gap-1 text-[12px] font-black ${tone}`}>
//       {Icon && (
//         <Icon size={12} />
//       )}
//       {value ?? 0}
//     </p>
//   );
// }

// function Th({
//   children,
// }) {
//   return (
//     <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wide">
//       {children}
//     </th>
//   );
// }

// function LoadingState() {
//   return (
//     <div className="flex min-h-[280px] items-center justify-center">
//       <div className="text-center">
//         <RefreshCw
//           size={21}
//           className="mx-auto animate-spin text-[#188374]"
//         />
//         <p className="mt-2 text-[10px] font-semibold text-[#8A98AA]">
//           Loading boost data...
//         </p>
//       </div>
//     </div>
//   );
// }

// function EmptyRow({
//   colSpan,
//   text,
// }) {
//   return (
//     <tr>
//       <td
//         colSpan={colSpan}
//         className="py-14 text-center text-[11px] font-semibold text-[#8A98AA]"
//       >
//         {text}
//       </td>
//     </tr>
//   );
// }


import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Rocket,
  Building2,
  Users,
  Clock3,
  Coins,
  Eye,
  CheckCircle2,
  RefreshCw,
  Wallet,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getBoostOperationsDashboardApi,
  approveBoostRequestApi,
  rejectBoostRequestApi,
} from "../../../Services/boostOperationsService";
import PromotionReviewModal from "./PromotionReviewModal";

/* =========================================================
   CONSTANTS
========================================================= */

const BOOSTS_PER_PAGE = 10;

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const typeLabel = (value) => {
  const map = {
    PROPERTY_BOOST: "Property Boost",
    FEATURED_7_DAYS: "Featured 7 Days",
    LOCALITY_TOP_30_DAYS: "Locality Top 30 Days",
    PARTNER_BOOST: "Partner Boost",
    PARTNER_FEATURED: "Partner Featured",
    PARTNER_LOCALITY_TOP: "Partner Locality Top",
  };

  return map[value] || value || "—";
};

const getRemainingText = (expiresAt) => {
  if (!expiresAt) {
    return "No expiry";
  }

  const expiryTime = new Date(expiresAt).getTime();

  if (Number.isNaN(expiryTime)) {
    return "No expiry";
  }

  const diff = expiryTime - Date.now();

  if (diff <= 0) {
    return "Expired";
  }

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );

  if (days > 0) {
    return `${days}d ${hours}h left`;
  }

  return `${hours}h left`;
};

/*
  Latest record date.

  Priority:
  1. approvedAt
  2. requestedAt
  3. createdAt
  4. updatedAt

  This ensures newest boost activity comes first.
*/
const getBoostSortTime = (item) => {
  const value =
    item?.approvedAt ||
    item?.requestedAt ||
    item?.createdAt ||
    item?.updatedAt;

  if (!value) {
    return 0;
  }

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function BoostPropertyPartnerDashboard({
  initialRequestId = null,
}) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    "Boosted Properties"
  );

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);

  /*
    Pagination state only for Boosted Properties
  */
  const [boostPage, setBoostPage] = useState(1);

  const [data, setData] = useState({
    summary: {},
    boosts: [],
    partnerPerformance: [],
  });

  const [reviewRequest, setReviewRequest] = useState(null);
  const [reviewBusy, setReviewBusy] = useState(false);

  /* =========================================================
     LOAD DASHBOARD
  ========================================================= */

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response =
        await getBoostOperationsDashboardApi({
          requestId:
            initialRequestId || undefined,

          search:
            search.trim() || undefined,

          status:
            activeTab === "Boosted Properties"
              ? status === "All"
                ? undefined
                : status
              : undefined,
        });

      if (response?.success) {
        setData(response.data || {});
      }
    } catch (error) {
      console.error(
        "Boost dashboard error:",
        error
      );

      setData({
        summary: {},
        boosts: [],
        partnerPerformance: [],
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     APPROVE BOOST
  ========================================================= */

  const handleApprove = async (request, remarks = "Approved from Boost Management") => {
    try {
      setReviewBusy(true);
      await approveBoostRequestApi(request._id, { remarks });
      setReviewRequest(null);
      await loadDashboard();
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to approve request");
    } finally {
      setReviewBusy(false);
    }
  };

  /* =========================================================
     REJECT BOOST
  ========================================================= */

  const handleReject = async (request, remarks = "Rejected from Boost Management") => {
    try {
      setReviewBusy(true);
      await rejectBoostRequestApi(request._id, { remarks });
      setReviewRequest(null);
      await loadDashboard();
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to reject request");
    } finally {
      setReviewBusy(false);
    }
  };

  /* =========================================================
     LOAD ON SEARCH / STATUS / TAB
  ========================================================= */

  useEffect(() => {
    const timer = setTimeout(
      loadDashboard,
      250
    );

    return () => clearTimeout(timer);
  }, [
    search,
    status,
    activeTab,
  ]);

  /* =========================================================
     RESET PAGINATION
     
     Whenever search/status/tab changes,
     start from page 1.
  ========================================================= */

  useEffect(() => {
    setBoostPage(1);
  }, [
    search,
    status,
    activeTab,
  ]);

  /* =========================================================
     SUMMARY
  ========================================================= */

  const summary = data?.summary || {};

  /* =========================================================
     SUMMARY CARDS
  ========================================================= */

  const cards = [
    {
      title: "ACTIVE BOOSTS",
      value:
        summary.activeBoosts || 0,

      icon: Rocket,

      caption:
        "Currently active promotions",

      tone:
        "bg-[#E8F8F4] text-[#11846E]",
    },

    {
      title: "TOTAL APPROVED",

      value:
        summary.approvedTotal || 0,

      icon: CheckCircle2,

      caption:
        "Approved promotion requests",

      tone:
        "bg-[#EEF3FA] text-[#4D6B8B]",
    },

    {
      title: "PENDING REQUESTS",

      value:
        summary.pendingBoosts || 0,

      icon: Clock3,

      caption:
        "Waiting for approval",

      tone:
        "bg-[#FFF7E7] text-[#C87917]",
    },

    {
      title: "CREDITS SPENT",

      value: Number(
        summary.creditsSpent || 0
      ).toLocaleString("en-IN"),

      icon: Coins,

      caption:
        "Promotion credits consumed",

      tone:
        "bg-[#F6F0FF] text-[#7A52A1]",
    },
  ];

  /* =========================================================
     BOOSTED PROPERTIES
     
     Latest first
  ========================================================= */

  const visibleBoosts = useMemo(() => {
    const rows = Array.isArray(
      data?.boosts
    )
      ? [...data.boosts]
      : [];

    return rows.sort((a, b) => {
      return (
        getBoostSortTime(b) -
        getBoostSortTime(a)
      );
    });
  }, [data]);

  /* =========================================================
     BOOST PAGINATION
  ========================================================= */

  const boostTotalPages = Math.max(
    1,
    Math.ceil(
      visibleBoosts.length /
        BOOSTS_PER_PAGE
    )
  );

  const paginatedBoosts = useMemo(() => {
    const startIndex =
      (boostPage - 1) *
      BOOSTS_PER_PAGE;

    return visibleBoosts.slice(
      startIndex,
      startIndex + BOOSTS_PER_PAGE
    );
  }, [
    visibleBoosts,
    boostPage,
  ]);

  /* =========================================================
     PROTECT AGAINST INVALID PAGE
  ========================================================= */

  useEffect(() => {
    if (
      boostPage >
      boostTotalPages
    ) {
      setBoostPage(
        boostTotalPages
      );
    }
  }, [
    boostPage,
    boostTotalPages,
  ]);

  /* =========================================================
     PARTNER PERFORMANCE
  ========================================================= */

  const partnerRows = useMemo(
    () =>
      data?.partnerPerformance || [],
    [data]
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-1 text-[#10243A]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
            Boost Property & Partner Operations
          </h1>

          <p className="mt-1 text-[12px] text-[#62738B]">
            Track boosted properties, expiry dates,
            credits and partner promotion activity
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          className="flex h-9 w-fit items-center gap-2 rounded-xl border border-[#DCE4EE] bg-white px-4 text-[11px] font-bold text-[#52657D] shadow-sm"
        >
          <RefreshCw size={13} />

          Refresh
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map(
          ({
            title,
            value,
            icon: Icon,
            caption,
            tone,
          }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#E0E6EF] bg-white p-5 shadow-[0_2px_5px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-[10px] font-bold tracking-wide text-[#8390A6]">
                    {title}
                  </p>

                  <p className="mt-3 text-[28px] font-black text-[#0B1D35]">
                    {value}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon size={18} />
                </div>

              </div>

              <p className="mt-2 text-[10px] text-[#8A97AA]">
                {caption}
              </p>
            </div>
          )
        )}

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#E0E6EF] bg-white shadow-[0_2px_5px_rgba(15,23,42,0.04)]">

        {/* ===================================================
            TABS
        =================================================== */}

        <div className="flex border-b border-[#E8EDF3] px-4">

          {[
            "Boosted Properties",
            "Partner Performance",
          ].map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`relative min-w-max px-4 py-4 text-[11px] font-bold ${
                activeTab === tab
                  ? "text-[#137B70]"
                  : "text-[#7E8CA2]"
              }`}
            >
              {tab}

              {activeTab === tab && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#17867A]" />
              )}
            </button>
          ))}

        </div>

        {/* ===================================================
            FILTER
        =================================================== */}

        <div className="flex flex-col gap-3 border-b border-[#E8EDF3] p-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full max-w-[390px]">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA6B8]"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder={
                activeTab ===
                "Boosted Properties"
                  ? "Search property, partner, request ID..."
                  : "Search partner..."
              }
              className="h-10 w-full rounded-xl border border-[#DDE5EE] bg-[#FAFBFC] pl-9 pr-3 text-[11px] outline-none focus:border-[#62A99F]"
            />

          </div>

          {activeTab ===
            "Boosted Properties" && (
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="h-10 rounded-xl border border-[#DDE5EE] bg-white px-3 text-[11px] font-semibold text-[#607089] outline-none"
            >
              <option value="All">
                All Status
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Expired">
                Expired
              </option>

              <option value="Rejected">
                Rejected
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          )}

        </div>

        {/* ===================================================
            BOOSTED PROPERTIES
        =================================================== */}

        {activeTab ===
        "Boosted Properties" ? (
          <>
            <BoostTable
              rows={paginatedBoosts}
              loading={loading}
              navigate={navigate}
              onApprove={handleApprove}
              onReject={handleReject}
              onReview={setReviewRequest}
            />

            {!loading &&
              visibleBoosts.length >
                0 && (
                <BoostPagination
                  currentPage={boostPage}
                  totalPages={
                    boostTotalPages
                  }
                  totalItems={
                    visibleBoosts.length
                  }
                  itemsPerPage={
                    BOOSTS_PER_PAGE
                  }
                  onPageChange={
                    setBoostPage
                  }
                />
              )}
          </>
        ) : (
          /* =================================================
             PARTNER PERFORMANCE
          ================================================= */

          <PartnerTable
            rows={partnerRows}
            loading={loading}
            navigate={navigate}
          />
        )}

        {reviewRequest && (
          <PromotionReviewModal
            request={reviewRequest}
            onClose={() => setReviewRequest(null)}
            onApprove={handleApprove}
            onReject={handleReject}
            busy={reviewBusy}
          />
        )}

      </div>
    </div>
  );
}

/* =========================================================
   BOOST TABLE
========================================================= */

function BoostTable({
  rows,
  loading,
  navigate,
  onApprove,
  onReject,
  onReview,
}) {
  if (loading) {
    return <LoadingState />;
  }

  return (
    /*
      IMPORTANT:
      overflow-x-auto removed.
      overflow-hidden prevents horizontal scrollbar.
    */
    <div className="w-full overflow-hidden">

      <table className="w-full table-fixed">

        <thead>
          <tr className="bg-[#073A58] text-white">

            <Th className="w-[21%]">
              Property / Target
            </Th>

            <Th className="w-[12%]">
              Partner
            </Th>

            <Th className="w-[13%]">
              Boost Type
            </Th>

            <Th className="w-[7%]">
              Credits
            </Th>

            <Th className="w-[11%]">
              Boosted On
            </Th>

            <Th className="w-[11%]">
              Expiry
            </Th>

            <Th className="w-[8%]">
              Status
            </Th>

            <Th className="w-[17%]">
              Actions
            </Th>

          </tr>
        </thead>

        <tbody>

          {rows.length ? (
            rows.map((item) => {
              const property =
                item.propertyMongoId;

              const partner =
                item.partnerMongoId;

              return (
                <tr
                  key={item._id}
                  className="border-b border-[#EDF1F5] last:border-0 hover:bg-[#FAFCFD]"
                >

                  {/* =========================================
                      PROPERTY
                  ========================================= */}

                  <td className="overflow-hidden px-3 py-4">

                    <div className="flex min-w-0 items-center gap-2">

                      <div className="h-11 w-12 shrink-0 overflow-hidden rounded-lg bg-[#EDF3F5]">

                        {property
                          ?.images?.[0]
                          ?.url ? (
                          <img
                            src={
                              property
                                .images[0]
                                .url
                            }
                            alt={
                              item.propertyTitle ||
                              (item.targetType === "PARTNER" ? "Partner" : "Property")
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#8FA0AC]">
                            <Building2
                              size={17}
                            />
                          </div>
                        )}

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-[10px] font-bold text-[#243C54]">
                          {item.targetType === "PARTNER"
                            ? "Partner Profile"
                            : item.propertyTitle || property?.title || "Property"}
                        </p>

                        <p className="mt-1 truncate text-[8px] font-bold text-[#188374]">
                          {item.targetType === "PARTNER"
                            ? (item.partnerCode || partner?.partnerId || "—")
                            : item.propertyCode || property?.propertyId || "—"}
                        </p>

                        <p className="mt-1 truncate text-[8px] text-[#8B98A9]">
                          {item.targetType === "PARTNER"
                            ? (partner?.location?.city || item.city || "Partner profile")
                            : ([item.locality, item.city].filter(Boolean).join(", ") || "—")}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* =========================================
                      PARTNER
                  ========================================= */}

                  <td className="overflow-hidden px-3 py-4">

                    <p className="truncate text-[10px] font-bold text-[#3A4E64]">
                      {item.partnerName ||
                        partner?.name ||
                        "—"}
                    </p>

                    <p className="mt-1 truncate text-[8px] text-[#168173]">
                      {item.partnerCode ||
                        partner?.partnerId ||
                        "—"}
                    </p>

                  </td>

                  {/* =========================================
                      BOOST TYPE
                  ========================================= */}

                  <td className="overflow-hidden px-3 py-4">

                    <span className="inline-block max-w-full truncate rounded-full bg-[#EEF6F5] px-2 py-1 text-[8px] font-bold text-[#197A70]">
                      {typeLabel(
                        item.promotionType
                      )}
                    </span>

                  </td>

                  {/* =========================================
                      CREDITS
                  ========================================= */}

                  <td className="px-2 py-4">

                    <p className="flex items-center gap-1 text-[10px] font-black text-[#3A4D63]">

                      <Coins
                        size={11}
                      />

                      <span>
                        {Number(
                          item.creditsCharged ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </p>

                  </td>

                  {/* =========================================
                      BOOSTED ON
                  ========================================= */}

                  <td className="overflow-hidden px-2 py-4">

                    <p className="truncate text-[9px] font-semibold text-[#4D6177]">
                      {formatDate(
                        item.approvedAt ||
                          item.requestedAt ||
                          item.createdAt
                      )}
                    </p>

                  </td>

                  {/* =========================================
                      EXPIRY
                  ========================================= */}

                  <td className="overflow-hidden px-2 py-4">

                    <p className="truncate text-[9px] font-semibold text-[#4D6177]">
                      {formatDate(
                        item.expiresAt
                      )}
                    </p>

                    <p
                      className={`mt-1 truncate text-[8px] font-bold ${
                        getRemainingText(
                          item.expiresAt
                        ) ===
                        "Expired"
                          ? "text-red-500"
                          : "text-[#168173]"
                      }`}
                    >
                      {getRemainingText(
                        item.expiresAt
                      )}
                    </p>

                  </td>

                  {/* =========================================
                      STATUS
                  ========================================= */}

                  <td className="px-2 py-4">

                    <StatusPill
                      status={
                        item.effectiveStatus ||
                        item.status
                      }
                    />

                  </td>

                  {/* =========================================
                      ACTIONS
                  ========================================= */}

                  <td className="overflow-hidden px-2 py-4">

                    <div className="flex flex-wrap gap-1">
                      {(item.effectiveStatus || item.status) === "Pending" && (
                        <button
                          type="button"
                          onClick={() => onReview?.(item)}
                          className="flex h-7 items-center gap-1 rounded-lg bg-[#0B796D] px-2 text-[8px] font-bold text-white hover:bg-[#086A60]"
                        >
                          <Eye size={10} /> Review
                        </button>
                      )}

                      {property?._id && (
                        <button
                          type="button"
                          onClick={() => navigate(`/property-management/${property._id}`)}
                          className="flex h-7 items-center gap-1 rounded-lg border border-[#D8E3E8] bg-white px-2 text-[8px] font-bold text-[#416172] hover:bg-[#F4F8F8]"
                        >
                          <Building2 size={10} /> Property
                        </button>
                      )}

                      {partner?._id && (
                        <button
                          type="button"
                          onClick={() => navigate(`/partnerdashboard?tab=dashboard&partnerId=${partner._id}`)}
                          className="flex h-7 items-center gap-1 rounded-lg border border-[#D8E3E8] bg-white px-2 text-[8px] font-bold text-[#416172] hover:bg-[#F4F8F8]"
                        >
                          <Users size={10} /> Partner
                        </button>
                      )}
                    </div>

                  </td>

                </tr>
              );
            })
          ) : (
            <EmptyRow
              colSpan={8}
              text="No boost records found"
            />
          )}

        </tbody>

      </table>

    </div>
  );
}

/* =========================================================
   PARTNER TABLE
========================================================= */

function PartnerTable({
  rows,
  loading,
  navigate,
}) {
  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="w-full overflow-hidden">

      <table className="w-full table-fixed">

        <thead>
          <tr className="bg-[#073A58] text-white">

            <Th className="w-[20%]">
              Partner
            </Th>

            <Th className="w-[10%]">
              Wallet
            </Th>

            <Th className="w-[12%]">
              Active Boosts
            </Th>

            <Th className="w-[10%]">
              Approved
            </Th>

            <Th className="w-[10%]">
              Expired
            </Th>

            <Th className="w-[13%]">
              Credits Spent
            </Th>

            <Th className="w-[12%]">
              Last Boost
            </Th>

            <Th className="w-[13%]">
              Action
            </Th>

          </tr>
        </thead>

        <tbody>

          {rows.length ? (
            rows.map((row) => {
              const partner =
                row.partner;

              const partnerName =
                row.partnerName ||
                partner?.name ||
                "P";

              return (
                <tr
                  key={
                    row.partnerMongoId
                  }
                  className="border-b border-[#EDF1F5] last:border-0 hover:bg-[#FAFCFD]"
                >

                  {/* PARTNER */}

                  <td className="overflow-hidden px-3 py-4">

                    <div className="flex min-w-0 items-center gap-2">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F7F3] text-[10px] font-black text-[#168173]">

                        {partnerName
                          .split(" ")
                          .map(
                            (x) =>
                              x[0]
                          )
                          .join("")
                          .slice(
                            0,
                            2
                          )}

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-[10px] font-bold text-[#33495F]">
                          {partnerName}
                        </p>

                        <p className="mt-1 truncate text-[8px] text-[#188374]">
                          {row.partnerCode ||
                            partner?.partnerId ||
                            "—"}
                        </p>

                        <p className="mt-1 truncate text-[8px] text-[#8B98A9]">
                          {partner
                            ?.location
                            ?.city ||
                            "—"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* WALLET */}

                  <td className="px-2 py-4">

                    <p className="flex items-center gap-1 text-[10px] font-black text-[#3B5065]">

                      <Wallet
                        size={11}
                      />

                      {Number(
                        partner
                          ?.creditWallet
                          ?.balance ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </p>

                  </td>

                  {/* ACTIVE BOOSTS */}

                  <td className="px-2 py-4">

                    <MetricValue
                      value={
                        row.activeBoosts
                      }
                      tone="text-[#10816F]"
                    />

                  </td>

                  {/* APPROVED */}

                  <td className="px-2 py-4">

                    <MetricValue
                      value={
                        row.approvedBoosts
                      }
                    />

                  </td>

                  {/* EXPIRED */}

                  <td className="px-2 py-4">

                    <MetricValue
                      value={
                        row.expiredBoosts
                      }
                      tone="text-[#D76B5E]"
                    />

                  </td>

                  {/* CREDITS */}

                  <td className="px-2 py-4">

                    <MetricValue
                      value={Number(
                        row.creditsSpent ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                      icon={Coins}
                    />

                  </td>

                  {/* LAST BOOST */}

                  <td className="overflow-hidden px-2 py-4">

                    <p className="truncate text-[9px] font-semibold text-[#596E82]">
                      {formatDate(
                        row.lastBoostAt
                      )}
                    </p>

                  </td>

                  {/* ACTION */}

                  <td className="px-2 py-4">

                    <button
                      type="button"
                      onClick={() =>
                        partner?._id &&
                        navigate(
                          `/partnerdashboard?tab=dashboard&partnerId=${partner._id}`
                        )
                      }
                      className="flex h-8 items-center gap-1 rounded-lg bg-[#0B796D] px-2.5 text-[8px] font-bold text-white shadow-sm hover:bg-[#086A60]"
                    >
                      View Partner

                      <ArrowUpRight
                        size={10}
                      />
                    </button>

                  </td>

                </tr>
              );
            })
          ) : (
            <EmptyRow
              colSpan={8}
              text="No partner promotion activity found"
            />
          )}

        </tbody>

      </table>

    </div>
  );
}

/* =========================================================
   STATUS PILL
========================================================= */

function StatusPill({
  status,
}) {
  const map = {
    Approved:
      "border-emerald-200 bg-emerald-50 text-emerald-600",

    Pending:
      "border-amber-200 bg-amber-50 text-amber-600",

    Expired:
      "border-slate-200 bg-slate-100 text-slate-500",

    Rejected:
      "border-red-200 bg-red-50 text-red-500",

    Cancelled:
      "border-orange-200 bg-orange-50 text-orange-500",
  };

  return (
    <span
      className={`inline-flex max-w-full truncate rounded-full border px-2 py-1 text-[8px] font-bold ${
        map[status] ||
        "border-slate-200 bg-slate-50 text-slate-500"
      }`}
    >
      {status || "—"}
    </span>
  );
}

/* =========================================================
   METRIC VALUE
========================================================= */

function MetricValue({
  value,
  tone = "text-[#3A5065]",
  icon: Icon,
}) {
  return (
    <p
      className={`flex items-center gap-1 text-[11px] font-black ${tone}`}
    >
      {Icon && (
        <Icon size={11} />
      )}

      {value ?? 0}
    </p>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function Th({
  children,
  className = "",
}) {
  return (
    <th
      className={`overflow-hidden px-2 py-3 text-left text-[8px] font-bold uppercase tracking-wide ${className}`}
    >
      <span className="block truncate">
        {children}
      </span>
    </th>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div className="flex min-h-[280px] items-center justify-center">

      <div className="text-center">

        <RefreshCw
          size={21}
          className="mx-auto animate-spin text-[#188374]"
        />

        <p className="mt-2 text-[10px] font-semibold text-[#8A98AA]">
          Loading boost data...
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   EMPTY ROW
========================================================= */

function EmptyRow({
  colSpan,
  text,
}) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="py-14 text-center text-[11px] font-semibold text-[#8A98AA]"
      >
        {text}
      </td>
    </tr>
  );
}

/* =========================================================
   BOOST PAGINATION
========================================================= */

function BoostPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          itemsPerPage +
        1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  /* =======================================================
     PAGE NUMBERS
  ======================================================= */

  const pageNumbers = [];

  if (totalPages <= 5) {
    for (
      let page = 1;
      page <= totalPages;
      page++
    ) {
      pageNumbers.push(page);
    }
  } else {
    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push("left-dots");
    }

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pageNumbers.push(page);
    }

    if (
      currentPage <
      totalPages - 2
    ) {
      pageNumbers.push(
        "right-dots"
      );
    }

    pageNumbers.push(
      totalPages
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex flex-col gap-3 border-t border-[#E8EDF3] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

      {/* ===================================================
          SHOWING COUNT
      =================================================== */}

      <p className="text-[10px] text-[#8794A7]">

        Showing{" "}

        <span className="font-bold text-[#52657D]">
          {startItem}
        </span>

        {" - "}

        <span className="font-bold text-[#52657D]">
          {endItem}
        </span>

        {" of "}

        <span className="font-bold text-[#52657D]">
          {totalItems}
        </span>

        {" boosted properties"}

      </p>

      {/* ===================================================
          PAGINATION CONTROLS
      =================================================== */}

      <div className="flex items-center gap-1">

        {/* PREVIOUS */}

        <button
          type="button"
          disabled={
            currentPage === 1
          }
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D8E1E8] bg-white text-[#607089] transition hover:bg-[#F4F8F8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft
            size={14}
          />
        </button>

        {/* PAGE NUMBERS */}

        {pageNumbers.map(
          (page, index) => {
            if (
              page ===
                "left-dots" ||
              page ===
                "right-dots"
            ) {
              return (
                <span
                  key={`${page}-${index}`}
                  className="px-1.5 text-[10px] text-[#9AA6B8]"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                type="button"
                onClick={() =>
                  onPageChange(page)
                }
                className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-[10px] font-bold transition ${
                  currentPage === page
                    ? "bg-[#0B796D] text-white"
                    : "border border-[#D8E1E8] bg-white text-[#607089] hover:bg-[#F4F8F8]"
                }`}
              >
                {page}
              </button>
            );
          }
        )}

        {/* NEXT */}

        <button
          type="button"
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D8E1E8] bg-white text-[#607089] transition hover:bg-[#F4F8F8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight
            size={14}
          />
        </button>

      </div>
    </div>
  );
}