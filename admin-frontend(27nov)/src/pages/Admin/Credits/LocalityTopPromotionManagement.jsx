// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   Star,
//   CheckCircle2,
//   Clock3,
//   Coins,
//   Eye,
//   Users,
//   RefreshCw,
//   Building2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { getBoostOperationsDashboardApi, approveBoostRequestApi, rejectBoostRequestApi } from "../../../Services/boostOperationsService";
import PromotionReviewModal from "./PromotionReviewModal";

// const formatDate = (value) => {
//   if (!value) return "—";

//   return new Date(value).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const getRemainingText = (expiresAt) => {
//   if (!expiresAt) return "No expiry";

//   const diff = new Date(expiresAt).getTime() - Date.now();
//   if (diff <= 0) return "Expired";

//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );

//   if (days > 0) return `${days}d ${hours}h left`;
//   return `${hours}h left`;
// };

// const statusStyle = (status) => {
//   const map = {
//     Approved: "border-emerald-200 bg-emerald-50 text-emerald-600",
//     Pending: "border-amber-200 bg-amber-50 text-amber-600",
//     Expired: "border-slate-200 bg-slate-100 text-slate-500",
//     Rejected: "border-red-200 bg-red-50 text-red-500",
//     Cancelled: "border-orange-200 bg-orange-50 text-orange-500",
//   };

//   return map[status] || "border-slate-200 bg-slate-50 text-slate-500";
// };

// export default function LocalityTopPromotionManagement({ initialRequestId = null }) {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState({ summary: {}, boosts: [] });

//     try {
//       setLoading(true);

//       const response = await getBoostOperationsDashboardApi({
//         requestId: initialRequestId || undefined,
//         search: search.trim() || undefined,
//         status: status === "All" ? undefined : status,
//       });

//       if (response?.success) {
//         setData(response.data || {});
//       }
//     } catch (error) {
//       console.error("Locality-top promotion dashboard error:", error);
//       setData({ summary: {}, boosts: [] });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(loadData, 250);
//     return () => clearTimeout(timer);
//   }, [search, status]);

//   const rows = useMemo(
//     () =>
//       (data?.boosts || []).filter(
//         (item) => ["LOCALITY_TOP_30_DAYS", "PARTNER_LOCALITY_TOP"].includes(item.promotionType)
//       ),
//     [data]
//   );

//   const activeCount = rows.filter((item) => item.isActive).length;
//   const approvedCount = rows.filter(
//     (item) => item.effectiveStatus === "Approved"
//   ).length;
//   const pendingCount = rows.filter((item) => item.status === "Pending").length;
//   const creditsSpent = rows.reduce(
//     (sum, item) => sum + Number(item.creditsCharged || 0),
//     0
//   );

//   const cards = [
//     {
//       title: "ACTIVE LOCALITY TOP",
//       value: activeCount,
//       icon: Star,
//       subtitle: "Currently locality-top properties",
//       tone: "bg-[#E7F8F3] text-[#11846E]",
//     },
//     {
//       title: "TOTAL APPROVED",
//       value: approvedCount,
//       icon: CheckCircle2,
//       subtitle: "Approved locality-top requests",
//       tone: "bg-[#EDF3FA] text-[#4C6C8E]",
//     },
//     {
//       title: "PENDING REQUESTS",
//       value: pendingCount,
//       icon: Clock3,
//       subtitle: "Waiting for approval",
//       tone: "bg-[#FFF7E7] text-[#C87917]",
//     },
//     {
//       title: "CREDITS SPENT",
//       value: creditsSpent.toLocaleString("en-IN"),
//       icon: Coins,
//       subtitle: "Locality-top credits consumed",
//       tone: "bg-[#F6F0FF] text-[#7951A3]",
//     },
//   ];

//   return (
//     <div className="min-h-screen p-1 text-[#10243A]">
//       <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//             Locality Top Property Operations
//           </h1>
//           <p className="mt-1 text-[12px] text-[#62738B]">
//             Track locality-top properties, approval status, expiry dates and partner promotion activity
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={loadData}
//           className="flex h-9 w-fit items-center gap-2 rounded-xl border border-[#DCE4EE] bg-white px-4 text-[11px] font-bold text-[#52657D] shadow-sm"
//         >
//           <RefreshCw size={13} />
//           Refresh
//         </button>
//       </div>

//       <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {cards.map(({ title, value, icon: Icon, subtitle, tone }) => (
//           <div
//             key={title}
//             className="rounded-2xl border border-[#E0E6EF] bg-white p-5 shadow-[0_2px_5px_rgba(15,23,42,0.04)]"
//           >
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-[10px] font-bold tracking-wide text-[#8390A6]">
//                   {title}
//                 </p>
//                 <p className="mt-3 text-[28px] font-black text-[#0B1D35]">
//                   {value}
//                 </p>
//               </div>

//               <div
//                 className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}
//               >
//                 <Icon size={18} />
//               </div>
//             </div>

//             <p className="mt-2 text-[10px] text-[#8A97AA]">{subtitle}</p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-5 overflow-hidden rounded-2xl border border-[#E0E6EF] bg-white shadow-[0_2px_5px_rgba(15,23,42,0.04)]">
//         <div className="border-b border-[#E8EDF3] px-4 py-4">
//           <div className="inline-flex border-b-2 border-[#17867A] px-4 pb-3 text-[11px] font-bold text-[#137B70]">
//             Locality Top Properties & Partners
//           </div>
//         </div>

//         <div className="flex flex-col gap-3 border-b border-[#E8EDF3] p-4 md:flex-row md:items-center md:justify-between">
//           <div className="relative w-full max-w-[390px]">
//             <Search
//               size={14}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA6B8]"
//             />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search property, partner, request ID..."
//               className="h-10 w-full rounded-xl border border-[#DDE5EE] bg-[#FAFBFC] pl-9 pr-3 text-[11px] outline-none focus:border-[#62A99F]"
//             />
//           </div>

//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="h-10 rounded-xl border border-[#DDE5EE] bg-white px-3 text-[11px] font-semibold text-[#607089] outline-none"
//           >
//             <option value="All">All Status</option>
//             <option value="Approved">Approved</option>
//             <option value="Pending">Pending</option>
//             <option value="Expired">Expired</option>
//             <option value="Rejected">Rejected</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1180px]">
//             <thead>
//               <tr className="bg-[#073A58] text-white">
//                 <Th>Property</Th>
//                 <Th>Partner</Th>
//                 <Th>Promotion</Th>
//                 <Th>Credits</Th>
//                 <Th>Activated On</Th>
//                 <Th>Expiry</Th>
//                 <Th>Status</Th>
//                 <Th>Actions</Th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={8} className="py-14 text-center text-[11px] text-[#8A98AA]">
//                     Loading locality-top properties...
//                   </td>
//                 </tr>
//               ) : rows.length ? (
//                 rows.map((item) => {
//                   const property = item.propertyMongoId;
//                   const partner = item.partnerMongoId;
//                   const displayStatus = item.effectiveStatus || item.status;

//                   return (
//                     <tr
//                       key={item._id}
//                       className="border-b border-[#EDF1F5] last:border-0 hover:bg-[#FAFCFD]"
//                     >
//                       <td className="px-4 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="h-12 w-14 overflow-hidden rounded-lg bg-[#EDF3F5]">
//                             {property?.images?.[0]?.url ? (
//                               <img
//                                 src={property.images[0].url}
//                                 alt={item.propertyTitle}
//                                 className="h-full w-full object-cover"
//                               />
//                             ) : (
//                               <div className="flex h-full items-center justify-center text-[#8FA0AC]">
//                                 <Building2 size={17} />
//                               </div>
//                             )}
//                           </div>

//                           <div>
//                             <p className="max-w-[180px] text-[11px] font-bold text-[#243C54]">
//                               {item.propertyTitle || property?.title || "Property"}
//                             </p>
//                             <p className="mt-1 text-[9px] font-bold text-[#188374]">
//                               {item.propertyCode || property?.propertyId}
//                             </p>
//                             <p className="mt-1 text-[8px] text-[#8B98A9]">
//                               {[item.locality, item.city].filter(Boolean).join(", ")}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-4 py-4">
//                         <p className="text-[11px] font-bold text-[#3A4E64]">
//                           {item.partnerName || partner?.name || "—"}
//                         </p>
//                         <p className="mt-1 text-[9px] text-[#168173]">
//                           {item.partnerCode || partner?.partnerId || "—"}
//                         </p>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span className="rounded-full bg-[#EEF6F5] px-2.5 py-1 text-[9px] font-bold text-[#197A70]">
//                           Locality Top 30 Days
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <p className="flex items-center gap-1 text-[11px] font-black text-[#3A4D63]">
//                           <Coins size={12} />
//                           {Number(item.creditsCharged || 0).toLocaleString("en-IN")}
//                         </p>
//                       </td>

//                       <td className="px-4 py-4">
//                         <p className="text-[10px] font-semibold text-[#4D6177]">
//                           {formatDate(item.approvedAt || item.requestedAt)}
//                         </p>
//                       </td>

//                       <td className="px-4 py-4">
//                         <p className="text-[10px] font-semibold text-[#4D6177]">
//                           {formatDate(item.expiresAt)}
//                         </p>
//                         <p
//                           className={`mt-1 text-[8px] font-bold ${
//                             getRemainingText(item.expiresAt) === "Expired"
//                               ? "text-red-500"
//                               : "text-[#168173]"
//                           }`}
//                         >
//                           {getRemainingText(item.expiresAt)}
//                         </p>
//                       </td>

//                       <td className="px-4 py-4">
//                         <span
//                           className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold ${statusStyle(
//                             displayStatus
//                           )}`}
//                         >
//                           {displayStatus}
//                         </span>
//                       </td>

//                       <td className="px-4 py-4">
//                         <div className="flex gap-2">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               property?._id &&
//                               navigate(`/property-management/${property._id}`)
//                             }
//                             className="flex h-8 items-center gap-1.5 rounded-lg border border-[#D8E3E8] bg-white px-2.5 text-[9px] font-bold text-[#416172] hover:bg-[#F4F8F8]"
//                           >
//                             <Eye size={11} />
//                             Property
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() =>
//                               partner?._id && navigate(`/partners/${partner._id}`)
//                             }
//                             className="flex h-8 items-center gap-1.5 rounded-lg border border-[#D8E3E8] bg-white px-2.5 text-[9px] font-bold text-[#416172] hover:bg-[#F4F8F8]"
//                           >
//                             <Users size={11} />
//                             Partner
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={8} className="py-14 text-center text-[11px] font-semibold text-[#8A98AA]">
//                     No locality-top promotion records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Th({ children }) {
//   return (
//     <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wide">
//       {children}
//     </th>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  CheckCircle2,
  Clock3,
  Coins,
  Eye,
  Users,
  RefreshCw,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBoostOperationsDashboardApi } from "../../../Services/boostOperationsService";

const ITEMS_PER_PAGE = 10;

const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getRemainingText = (expiresAt) => {
  if (!expiresAt) return "No expiry";

  const diff = new Date(expiresAt).getTime() - Date.now();

  if (diff <= 0) return "Expired";

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );

  if (days > 0) return `${days}d ${hours}h left`;

  return `${hours}h left`;
};

const statusStyle = (status) => {
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
    map[status] ||
    "border-slate-200 bg-slate-50 text-slate-500"
  );
};

// Latest record first
const getSortTime = (item) => {
  const value =
    item?.createdAt ||
    item?.requestedAt ||
    item?.approvedAt ||
    item?.updatedAt;

  if (!value) return 0;

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
};

export default function LocalityTopPromotionManagement({
  initialRequestId = null,
}) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState({
    summary: {},
    boosts: [],
  });

  const [reviewRequest, setReviewRequest] = useState(null);
  const [reviewBusy, setReviewBusy] = useState(false);

  const handleApprove = async (request, remarks = "Approved from Promotion Management") => {
    try {
      setReviewBusy(true);
      await approveBoostRequestApi(request._id, { remarks });
      setReviewRequest(null);
      await loadData();
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to approve request");
    } finally {
      setReviewBusy(false);
    }
  };

  const handleReject = async (request, remarks = "Rejected from Promotion Management") => {
    try {
      setReviewBusy(true);
      await rejectBoostRequestApi(request._id, { remarks });
      setReviewRequest(null);
      await loadData();
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to reject request");
    } finally {
      setReviewBusy(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const response =
        await getBoostOperationsDashboardApi({
          requestId:
            initialRequestId || undefined,
          search:
            search.trim() || undefined,
          status:
            status === "All"
              ? undefined
              : status,
        });

      if (response?.success) {
        setData(response.data || {});
      }
    } catch (error) {
      console.error(
        "Locality-top promotion dashboard error:",
        error
      );

      setData({
        summary: {},
        boosts: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(
      loadData,
      250
    );

    return () => clearTimeout(timer);
  }, [search, status]);

  // Only locality-top promotions + latest first
  const rows = useMemo(() => {
    const localityRows = Array.isArray(
      data?.boosts
    )
      ? [...data.boosts].filter((item) =>
          [
            "LOCALITY_TOP_30_DAYS",
            "PARTNER_LOCALITY_TOP",
          ].includes(item.promotionType)
        )
      : [];

    return localityRows.sort(
      (a, b) =>
        getSortTime(b) -
        getSortTime(a)
    );
  }, [data]);

  const activeCount = rows.filter(
    (item) => item.isActive
  ).length;

  const approvedCount = rows.filter(
    (item) =>
      item.effectiveStatus === "Approved"
  ).length;

  const pendingCount = rows.filter(
    (item) => item.status === "Pending"
  ).length;

  const creditsSpent = rows.reduce(
    (sum, item) =>
      sum +
      (["Approved", "Expired"].includes(item.effectiveStatus || item.status)
        ? Number(item.creditsCharged || 0)
        : 0),
    0
  );

  // =========================
  // PAGINATION
  // =========================

  const totalItems = rows.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalItems / ITEMS_PER_PAGE
    )
  );

  // Reset page when search/status changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  // Prevent invalid page
  useEffect(() => {
    if (
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  const paginatedRows = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      ITEMS_PER_PAGE;

    return rows.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [
    rows,
    currentPage,
  ]);

  const cards = [
    {
      title: "ACTIVE LOCALITY TOP",
      value: activeCount,
      icon: Star,
      subtitle:
        "Currently locality-top properties",
      tone:
        "bg-[#E7F8F3] text-[#11846E]",
    },
    {
      title: "TOTAL APPROVED",
      value: approvedCount,
      icon: CheckCircle2,
      subtitle:
        "Approved locality-top requests",
      tone:
        "bg-[#EDF3FA] text-[#4C6C8E]",
    },
    {
      title: "PENDING REQUESTS",
      value: pendingCount,
      icon: Clock3,
      subtitle:
        "Waiting for approval",
      tone:
        "bg-[#FFF7E7] text-[#C87917]",
    },
    {
      title: "CREDITS SPENT",
      value:
        creditsSpent.toLocaleString(
          "en-IN"
        ),
      icon: Coins,
      subtitle:
        "Locality-top credits consumed",
      tone:
        "bg-[#F6F0FF] text-[#7951A3]",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden p-1 text-[#10243A]">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h1 className="mt-1 truncate text-2xl font-extrabold text-[#1F3C50]">
            Locality Top Property Operations
          </h1>

          <p className="mt-1 max-w-full truncate text-[12px] text-[#62738B]">
            Track locality-top properties,
            approval status, expiry dates and
            partner promotion activity
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          className="flex h-9 w-fit shrink-0 items-center gap-2 rounded-xl border border-[#DCE4EE] bg-white px-4 text-[11px] font-bold text-[#52657D] shadow-sm"
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(
          ({
            title,
            value,
            icon: Icon,
            subtitle,
            tone,
          }) => (
            <div
              key={title}
              className="min-w-0 rounded-2xl border border-[#E0E6EF] bg-white p-5 shadow-[0_2px_5px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-bold tracking-wide text-[#8390A6]">
                    {title}
                  </p>

                  <p className="mt-3 text-[28px] font-black text-[#0B1D35]">
                    {value}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon size={18} />
                </div>
              </div>

              <p className="mt-2 truncate text-[10px] text-[#8A97AA]">
                {subtitle}
              </p>
            </div>
          )
        )}
      </div>

      {/* ================= TABLE CARD ================= */}

      <div className="mt-5 w-full overflow-hidden rounded-2xl border border-[#E0E6EF] bg-white shadow-[0_2px_5px_rgba(15,23,42,0.04)]">
        {/* TAB */}

        <div className="border-b border-[#E8EDF3] px-4 py-4">
          <div className="inline-flex border-b-2 border-[#17867A] px-4 pb-3 text-[11px] font-bold text-[#137B70]">
            Locality Top Properties & Partners
          </div>
        </div>

        {/* SEARCH + FILTER */}

        <div className="flex flex-col gap-3 border-b border-[#E8EDF3] p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-[390px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA6B8]"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search property, partner, request ID..."
              className="h-10 w-full rounded-xl border border-[#DDE5EE] bg-[#FAFBFC] pl-9 pr-3 text-[11px] outline-none focus:border-[#62A99F]"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-10 w-full max-w-[180px] rounded-xl border border-[#DDE5EE] bg-white px-3 text-[11px] font-semibold text-[#607089] outline-none"
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
        </div>

        {/* ================= TABLE ================= */}

        {/* IMPORTANT:
            No overflow-x-auto.
            No min-width.
            Table always stays inside screen width.
        */}

        <div className="w-full overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-[#073A58] text-white">
                <Th className="w-[20%]">
                  Property
                </Th>

                <Th className="w-[12%]">
                  Partner
                </Th>

                <Th className="w-[12%]">
                  Promotion
                </Th>

                <Th className="w-[8%]">
                  Credits
                </Th>

                <Th className="w-[13%]">
                  Activated On
                </Th>

                <Th className="w-[13%]">
                  Expiry
                </Th>

                <Th className="w-[8%]">
                  Status
                </Th>

                <Th className="w-[14%]">
                  Actions
                </Th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-14 text-center text-[11px] text-[#8A98AA]"
                  >
                    Loading locality-top
                    properties...
                  </td>
                </tr>
              ) : paginatedRows.length ? (
                paginatedRows.map((item) => {
                  const property =
                    item.propertyMongoId;

                  const partner =
                    item.partnerMongoId;

                  const displayStatus =
                    item.effectiveStatus ||
                    item.status;

                  return (
                    <tr
                      key={item._id}
                      className="border-b border-[#EDF1F5] last:border-0 hover:bg-[#FAFCFD]"
                    >
                      {/* PROPERTY */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="h-10 w-11 shrink-0 overflow-hidden rounded-lg bg-[#EDF3F5] sm:h-12 sm:w-14">
                            {property?.images?.[0]
                              ?.url ? (
                              <img
                                src={
                                  property
                                    .images[0]
                                    .url
                                }
                                alt={
                                  item.propertyTitle ||
                                  "Property"
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[#8FA0AC]">
                                <Building2
                                  size={16}
                                />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-bold text-[#243C54] sm:text-[11px]">
                              {item.propertyTitle ||
                                property?.title ||
                                "Property"}
                            </p>

                            <p className="mt-1 truncate text-[8px] font-bold text-[#188374] sm:text-[9px]">
                              {item.propertyCode ||
                                property?.propertyId ||
                                "—"}
                            </p>

                            <p className="mt-1 truncate text-[7px] text-[#8B98A9] sm:text-[8px]">
                              {[
                                item.locality,
                                item.city,
                              ]
                                .filter(Boolean)
                                .join(
                                  ", "
                                ) || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* PARTNER */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <p className="truncate text-[9px] font-bold text-[#3A4E64] sm:text-[10px]">
                          {item.partnerName ||
                            partner?.name ||
                            "—"}
                        </p>

                        <p className="mt-1 truncate text-[8px] text-[#168173] sm:text-[9px]">
                          {item.partnerCode ||
                            partner?.partnerId ||
                            "—"}
                        </p>
                      </td>

                      {/* PROMOTION */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <span className="block truncate rounded-full bg-[#EEF6F5] px-2 py-1 text-center text-[7px] font-bold text-[#197A70] sm:text-[8px]">
                          Locality Top 30 Days
                        </span>
                      </td>

                      {/* CREDITS */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <p className="flex items-center gap-1 truncate text-[9px] font-black text-[#3A4D63] sm:text-[10px]">
                          <Coins
                            size={11}
                            className="shrink-0"
                          />

                          {Number(
                            item.creditsCharged ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </td>

                      {/* ACTIVATED */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <p className="truncate text-[8px] font-semibold text-[#4D6177] sm:text-[9px]">
                          {formatDate(
                            item.approvedAt ||
                              item.requestedAt
                          )}
                        </p>
                      </td>

                      {/* EXPIRY */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <p className="truncate text-[8px] font-semibold text-[#4D6177] sm:text-[9px]">
                          {formatDate(
                            item.expiresAt
                          )}
                        </p>

                        <p
                          className={`mt-1 truncate text-[7px] font-bold sm:text-[8px] ${
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

                      {/* STATUS */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <span
                          className={`inline-flex max-w-full truncate rounded-full border px-2 py-1 text-[7px] font-bold sm:text-[8px] ${statusStyle(
                            displayStatus
                          )}`}
                        >
                          {displayStatus ||
                            "—"}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="max-w-0 overflow-hidden px-2 py-4 sm:px-3">
                        <div className="flex min-w-0 flex-wrap gap-1">
                          {displayStatus === "Pending" && (
                            <button type="button" onClick={() => setReviewRequest(item)} className="flex h-7 items-center justify-center gap-1 rounded-lg bg-[#0B796D] px-2 text-[8px] font-bold text-white hover:bg-[#086A60]">
                              <Eye size={10} /> Review
                            </button>
                          )}
                          {property?._id && (
                          <button
                            type="button"
                            onClick={() =>
                              property?._id &&
                              navigate(
                                `/property-management/${property._id}`
                              )
                            }
                            className="flex h-7 min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg border border-[#D8E3E8] bg-white px-1 text-[7px] font-bold text-[#416172] hover:bg-[#F4F8F8] sm:h-8 sm:px-2 sm:text-[8px]"
                            title="View Property"
                          >
                            <Eye
                              size={10}
                              className="shrink-0"
                            />

                            <span className="truncate">
                              Property
                            </span>
                          </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              partner?._id &&
                              navigate(
                                `/partners/${partner._id}`
                              )
                            }
                            className="flex h-7 min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg border border-[#D8E3E8] bg-white px-1 text-[7px] font-bold text-[#416172] hover:bg-[#F4F8F8] sm:h-8 sm:px-2 sm:text-[8px]"
                            title="View Partner"
                          >
                            <Users
                              size={10}
                              className="shrink-0"
                            />

                            <span className="truncate">
                              Partner
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-14 text-center text-[11px] font-semibold text-[#8A98AA]"
                  >
                    No locality-top promotion
                    records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}

        {!loading &&
          totalItems > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={
                ITEMS_PER_PAGE
              }
              onPageChange={
                setCurrentPage
              }
            />
          )}
      </div>

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
      className={`max-w-0 overflow-hidden px-2 py-3 text-left text-[8px] font-bold uppercase tracking-wide sm:px-3 sm:text-[9px] ${className}`}
    >
      <span className="block truncate">
        {children}
      </span>
    </th>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
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
      pageNumbers.push(
        "left-dots"
      );
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

  return (
    <div className="flex flex-col gap-3 border-t border-[#E8EDF3] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* RECORD COUNT */}

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

        {" locality-top properties"}
      </p>

      {/* PAGE BUTTONS */}

      <div className="flex items-center gap-1">
        {/* PREVIOUS */}

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D8E1E8] bg-white text-[#607089] transition hover:bg-[#F4F8F8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={14} />
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
                  className="px-1 text-[10px] text-[#9AA6B8]"
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
                  currentPage ===
                  page
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
          <ChevronRight size={14} />
        </button>
      </div>
    </div>


  );
}

