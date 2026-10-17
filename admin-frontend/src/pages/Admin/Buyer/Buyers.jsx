// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   Users,
//   TrendingUp,
//   UserCheck,
//   Building2,
//   ChevronDown,
//   Heart,
//   MapPin,
//   Phone,
//   Mail,
//   ArrowUpRight,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import { fetchAllBuyers } from "../../../Services/buyerservice";

// const Buyers = () => {
//   const navigate = useNavigate();

//   const [buyers, setBuyers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [location, setLocation] = useState("All");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getBuyers();
//   }, []);

//   const getBuyers = async () => {
//     try {
//       setLoading(true);

//       const response = await fetchAllBuyers();

//       if (response?.success) {
//         const mappedBuyers = (response.data || []).map((item) => {
//           let calculatedStatus = item.status || "Active";

//           if (!item.status && !item.isPhoneVerified) {
//             calculatedStatus = "Pending";
//           }

//           let parsedCity = "Not Provided";
//           let fullLocationText = "Not Provided";

//           if (
//             typeof item.location === "object" &&
//             item.location !== null
//           ) {
//             parsedCity = item.location.city || "Not Provided";

//             const parts = [
//               item.location.address,
//               item.location.city,
//               item.location.state,
//             ].filter(Boolean);

//             fullLocationText =
//               parts.length > 0 ? parts.join(", ") : "Not Provided";
//           } else if (
//             typeof item.location === "string" &&
//             item.location.trim() !== ""
//           ) {
//             parsedCity = item.location;
//             fullLocationText = item.location;
//           }

//           const generatedBuyerId =
//             item.buyerId ||
//             `BUY-${(item._id || item.id || "")
//               .slice(-5)
//               .toUpperCase()}`;

//           return {
//             id: item._id || item.id,
//             buyerId: generatedBuyerId,
//             name: item.name || "N/A",
//             phone: item.phone || "N/A",
//             email: item.email || "N/A",
//             city: parsedCity,
//             locationText: fullLocationText,
//             visits: Number(item.visits || 0),
//             inquiries: Number(item.inquiries || item.leads || 0),
//             savedProperties: Number(item.savedProperties || 0),
//             status: calculatedStatus,
//             avatar: item.avatar || "",
//           };
//         });

//         setBuyers(mappedBuyers);
//       }
//     } catch (error) {
//       console.error("Buyers fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const locations = useMemo(() => {
//     return [
//       "All",
//       ...new Set(
//         buyers
//           .map((buyer) => buyer.city)
//           .filter((city) => city && city !== "Not Provided")
//       ),
//     ];
//   }, [buyers]);

//   const filteredBuyers = useMemo(() => {
//     const searchValue = search.trim().toLowerCase();

//     return buyers.filter((buyer) => {
//       const matchesSearch =
//         !searchValue ||
//         buyer.name.toLowerCase().includes(searchValue) ||
//         buyer.buyerId.toLowerCase().includes(searchValue) ||
//         buyer.phone.toLowerCase().includes(searchValue) ||
//         buyer.email.toLowerCase().includes(searchValue) ||
//         buyer.locationText.toLowerCase().includes(searchValue);

//       const matchesStatus =
//         status === "All" || buyer.status === status;

//       const matchesLocation =
//         location === "All" || buyer.city === location;

//       return matchesSearch && matchesStatus && matchesLocation;
//     });
//   }, [buyers, search, status, location]);

//   const totalBuyers = buyers.length;

//   const activeBuyers = buyers.filter(
//     (buyer) => buyer.status === "Active"
//   ).length;

//   const suspendedBuyers = buyers.filter(
//     (buyer) => buyer.status === "Suspended"
//   ).length;

//   const pendingBuyers = buyers.filter(
//     (buyer) => buyer.status === "Pending"
//   ).length;

//   const totalInquiries = buyers.reduce(
//     (total, buyer) => total + Number(buyer.inquiries || 0),
//     0
//   );

//   const statistics = [
//     {
//       title: "Total Buyers",
//       value: totalBuyers.toLocaleString(),
//       smallText: "Registered buyers",
//       icon: Users,
//     },
//     {
//       title: "Active Buyers",
//       value: activeBuyers.toLocaleString(),
//       smallText: "Currently active",
//       icon: TrendingUp,
//     },
//     {
//       title: "Account Status",
//       value: activeBuyers,
//       smallText: "Pending / Suspended",
//       icon: UserCheck,
//       secondary: `${pendingBuyers} / ${suspendedBuyers}`,
//     },
//     {
//       title: "Current Inquiries",
//       value: totalInquiries,
//       smallText: "Buyer generated leads",
//       icon: Building2,
//     },
//   ];

//   const getStatusStyle = (buyerStatus) => {
//     switch (buyerStatus) {
//       case "Active":
//         return "border-[#35C99A]/30 bg-[#EAF9F4] text-[#15966F]";
//       case "Suspended":
//       case "Blocked":
//         return "border-red-200 bg-red-50 text-red-600";
//       case "Pending":
//         return "border-amber-200 bg-amber-50 text-amber-600";
//       default:
//         return "border-slate-200 bg-slate-100 text-slate-600";
//     }
//   };

//   const openBuyer = (buyer) => {
//     navigate(`/buyer-dashboard/${buyer.id}`);
//   };

//   return (
//     <div className="space-y-4 font-sans text-[#173247]">
//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         {statistics.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.title}
//               className="group rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-[0_8px_24px_rgba(15,47,69,0.07)]"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#7B8F9A]">
//                     {item.title}
//                   </p>

//                   <div className="mt-2 flex items-baseline gap-2">
//                     <h3 className="text-2xl font-black text-[#173247]">
//                       {item.value}
//                     </h3>

//                     {item.secondary && (
//                       <span className="text-[10px] font-bold text-amber-600">
//                         ({item.secondary})
//                       </span>
//                     )}
//                   </div>

//                   <p className="mt-1 text-[11px] font-medium text-[#94A4AD]">
//                     {item.smallText}
//                   </p>
//                 </div>

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#25B98B] transition group-hover:bg-[#35C99A] group-hover:text-white">
//                   <Icon size={19} />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ================= LIST ================= */}
//       <div className="overflow-hidden rounded-2xl border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
//         {/* FILTERS */}
//         <div className="border-b border-[#E7EDF0] bg-[#F8FAFB] p-4">
//           <div className="flex flex-col gap-3 lg:flex-row">
//             <div className="relative min-w-0 flex-1 lg:max-w-md">
//               <Search
//                 size={16}
//                 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A2AC]"
//               />

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search buyer, ID, mobile or email..."
//                 className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-white pl-10 pr-4 text-xs font-medium text-[#173247] outline-none transition placeholder:text-[#9DABB3] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
//               />
//             </div>

//             <div className="relative lg:w-40">
//               <select
//                 value={status}
//                 onChange={(event) => setStatus(event.target.value)}
//                 className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#DCE5E9] bg-white px-3 pr-8 text-xs font-semibold text-[#526A78] outline-none transition focus:border-[#35C99A]"
//               >
//                 <option value="All">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Suspended">Suspended</option>
//                 <option value="Blocked">Blocked</option>
//               </select>

//               <ChevronDown
//                 size={14}
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
//               />
//             </div>

//             <div className="relative lg:w-44">
//               <select
//                 value={location}
//                 onChange={(event) => setLocation(event.target.value)}
//                 className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#DCE5E9] bg-white px-3 pr-8 text-xs font-semibold text-[#526A78] outline-none transition focus:border-[#35C99A]"
//               >
//                 {locations.map((item) => (
//                   <option key={item} value={item}>
//                     {item === "All" ? "All Locations" : item}
//                   </option>
//                 ))}
//               </select>

//               <ChevronDown
//                 size={14}
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
//               />
//             </div>
//           </div>
//         </div>

//         {/* DESKTOP TABLE - NO HORIZONTAL SCROLLBAR */}
//         <div className="hidden w-full overflow-hidden lg:block">
//           <table className="w-full table-fixed border-collapse text-left">
//             <thead>
//               <tr className="bg-[#1F3C50] text-[10px] font-bold uppercase tracking-[0.08em] text-[#EAF1F4]">
//                 <th className="w-[21%] px-4 py-3.5">Buyer</th>
//                 <th className="w-[22%] px-4 py-3.5">Contact</th>
//                 <th className="w-[22%] px-4 py-3.5">Location</th>
//                 <th className="w-[25%] px-4 py-3.5">Activity</th>
//                 <th className="w-[10%] px-4 py-3.5">Status</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-[#EDF1F3] text-xs">
//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="py-12 text-center font-medium text-[#91A2AC]"
//                   >
//                     Loading buyers data...
//                   </td>
//                 </tr>
//               ) : filteredBuyers.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="py-12 text-center font-medium text-[#91A2AC]"
//                   >
//                     No buyers found matching criteria.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredBuyers.map((buyer) => (
//                   <tr
//                     key={buyer.id}
//                     onClick={() => openBuyer(buyer)}
//                     className="cursor-pointer transition-colors hover:bg-[#EAF9F4]/65"
//                   >
//                     <td className="px-4 py-4">
//                       <div className="flex min-w-0 items-center gap-3">
//                         {buyer.avatar ? (
//                           <img
//                             src={buyer.avatar}
//                             alt={buyer.name}
//                             className="h-9 w-9 shrink-0 rounded-xl border border-[#DCE5E9] object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#35C99A]/20 bg-[#EAF9F4] text-xs font-bold text-[#15966F]">
//                             {buyer.name
//                               .split(" ")
//                               .map((word) => word[0])
//                               .join("")
//                               .slice(0, 2)}
//                           </div>
//                         )}

//                         <div className="min-w-0">
//                           <p
//                             title={buyer.name}
//                             className="truncate font-bold text-[#173247]"
//                           >
//                             {buyer.name}
//                           </p>
//                           <p className="mt-0.5 truncate text-[10px] font-semibold text-[#91A2AC]">
//                             {buyer.buyerId}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-4 py-4">
//                       <p
//                         title={buyer.phone}
//                         className="truncate font-semibold text-[#526A78]"
//                       >
//                         {buyer.phone}
//                       </p>
//                       <p
//                         title={buyer.email}
//                         className="mt-0.5 truncate text-[10px] text-[#91A2AC]"
//                       >
//                         {buyer.email}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4">
//                       <p
//                         title={buyer.locationText}
//                         className="truncate font-medium text-[#607681]"
//                       >
//                         {buyer.locationText}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4">
//                       <div className="flex min-w-0 flex-wrap items-center gap-1.5">
//                         <span className="rounded-lg bg-[#F1F5F6] px-2 py-1 text-[10px] font-semibold text-[#607681]">
//                           {buyer.visits} Visits
//                         </span>

//                         <span className="rounded-lg bg-[#EAF9F4] px-2 py-1 text-[10px] font-semibold text-[#15966F]">
//                           {buyer.inquiries} Enq.
//                         </span>

//                         <span className="flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-500">
//                           <Heart size={10} />
//                           {buyer.savedProperties}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-4 py-4">
//                       <span
//                         className={`inline-flex max-w-full truncate rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
//                           buyer.status
//                         )}`}
//                       >
//                         {buyer.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* MOBILE / TABLET CARDS - NO SCROLLBAR */}
//         <div className="grid gap-3 p-3 lg:hidden">
//           {loading ? (
//             <div className="py-10 text-center text-xs font-medium text-[#91A2AC]">
//               Loading buyers data...
//             </div>
//           ) : filteredBuyers.length === 0 ? (
//             <div className="py-10 text-center text-xs font-medium text-[#91A2AC]">
//               No buyers found matching criteria.
//             </div>
//           ) : (
//             filteredBuyers.map((buyer) => (
//               <button
//                 key={buyer.id}
//                 type="button"
//                 onClick={() => openBuyer(buyer)}
//                 className="w-full rounded-2xl border border-[#E3EAED] bg-white p-4 text-left transition hover:border-[#35C99A]/40 hover:bg-[#EAF9F4]/35"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 items-center gap-3">
//                     {buyer.avatar ? (
//                       <img
//                         src={buyer.avatar}
//                         alt={buyer.name}
//                         className="h-11 w-11 shrink-0 rounded-xl border border-[#DCE5E9] object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] text-sm font-bold text-[#15966F]">
//                         {buyer.name
//                           .split(" ")
//                           .map((word) => word[0])
//                           .join("")
//                           .slice(0, 2)}
//                       </div>
//                     )}

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-bold text-[#173247]">
//                         {buyer.name}
//                       </p>
//                       <p className="mt-0.5 text-[10px] font-semibold text-[#91A2AC]">
//                         {buyer.buyerId}
//                       </p>
//                     </div>
//                   </div>

//                   <ArrowUpRight
//                     size={16}
//                     className="shrink-0 text-[#35C99A]"
//                   />
//                 </div>

//                 <div className="mt-4 grid gap-2 text-[11px] text-[#607681] sm:grid-cols-2">
//                   <p className="flex min-w-0 items-center gap-2">
//                     <Phone size={13} className="shrink-0 text-[#35C99A]" />
//                     <span className="truncate">{buyer.phone}</span>
//                   </p>

//                   <p className="flex min-w-0 items-center gap-2">
//                     <Mail size={13} className="shrink-0 text-[#35C99A]" />
//                     <span className="truncate">{buyer.email}</span>
//                   </p>

//                   <p className="flex min-w-0 items-center gap-2 sm:col-span-2">
//                     <MapPin size={13} className="shrink-0 text-[#35C99A]" />
//                     <span className="truncate">{buyer.locationText}</span>
//                   </p>
//                 </div>

//                 <div className="mt-3 flex flex-wrap items-center gap-2">
//                   <span className="rounded-lg bg-[#F1F5F6] px-2 py-1 text-[10px] font-semibold text-[#607681]">
//                     {buyer.visits} Visits
//                   </span>
//                   <span className="rounded-lg bg-[#EAF9F4] px-2 py-1 text-[10px] font-semibold text-[#15966F]">
//                     {buyer.inquiries} Enquiries
//                   </span>
//                   <span className="flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-500">
//                     <Heart size={10} />
//                     {buyer.savedProperties}
//                   </span>

//                   <span
//                     className={`ml-auto rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
//                       buyer.status
//                     )}`}
//                   >
//                     {buyer.status}
//                   </span>
//                 </div>
//               </button>
//             ))
//           )}
//         </div>

//         <div className="flex items-center justify-between border-t border-[#E7EDF0] bg-[#F8FAFB] px-4 py-3 text-[11px] font-medium text-[#91A2AC]">
//           <p>
//             Showing{" "}
//             <span className="font-bold text-[#173247]">
//               {filteredBuyers.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-bold text-[#173247]">
//               {buyers.length.toLocaleString()}
//             </span>{" "}
//             entries
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Buyers;


import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  TrendingUp,
  UserCheck,
  Building2,
  ChevronDown,
  Heart,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { fetchAllBuyers } from "../../../Services/buyerservice";

const Buyers = () => {
  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getBuyers();
  }, []);

  const getBuyers = async () => {
    try {
      setLoading(true);

      const response = await fetchAllBuyers();

      if (response?.success) {
        const mappedBuyers = (response.data || []).map((item) => {
          let calculatedStatus = item.status || "Active";

          if (!item.status && !item.isPhoneVerified) {
            calculatedStatus = "Pending";
          }

          let parsedCity = "Not Provided";
          let fullLocationText = "Not Provided";

          if (
            typeof item.location === "object" &&
            item.location !== null
          ) {
            parsedCity = item.location.city || "Not Provided";

            const parts = [
              item.location.address,
              item.location.city,
              item.location.state,
            ].filter(Boolean);

            fullLocationText =
              parts.length > 0 ? parts.join(", ") : "Not Provided";
          } else if (
            typeof item.location === "string" &&
            item.location.trim() !== ""
          ) {
            parsedCity = item.location;
            fullLocationText = item.location;
          }

          const generatedBuyerId =
            item.buyerId ||
            `BUY-${(item._id || item.id || "")
              .slice(-5)
              .toUpperCase()}`;

          return {
            id: item._id || item.id,
            buyerId: generatedBuyerId,
            name: item.name || "N/A",
            phone: item.phone || "N/A",
            email: item.email || "N/A",
            city: parsedCity,
            locationText: fullLocationText,
            visits: Number(item.visits || 0),
            inquiries: Number(item.inquiries || item.leads || 0),
            savedProperties: Number(item.savedProperties || 0),
            status: calculatedStatus,
            avatar: item.avatar || "",
            createdAt: item.createdAt || item.created_at || "",
            updatedAt: item.updatedAt || item.updated_at || "",
          };
        });

        const latestFirstBuyers = [...mappedBuyers].sort((a, b) => {
          const aDate = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const bDate = new Date(b.createdAt || b.updatedAt || 0).getTime();

          if (bDate !== aDate) return bDate - aDate;
          return 0;
        });

        setBuyers(latestFirstBuyers);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Buyers fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const locations = useMemo(() => {
    return [
      "All",
      ...new Set(
        buyers
          .map((buyer) => buyer.city)
          .filter((city) => city && city !== "Not Provided")
      ),
    ];
  }, [buyers]);

  const filteredBuyers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return buyers.filter((buyer) => {
      const matchesSearch =
        !searchValue ||
        buyer.name.toLowerCase().includes(searchValue) ||
        buyer.buyerId.toLowerCase().includes(searchValue) ||
        buyer.phone.toLowerCase().includes(searchValue) ||
        buyer.email.toLowerCase().includes(searchValue) ||
        buyer.locationText.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" || buyer.status === status;

      const matchesLocation =
        location === "All" || buyer.city === location;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [buyers, search, status, location]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBuyers.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedBuyers = useMemo(() => {
    const startIndex = (safePage - 1) * itemsPerPage;
    return filteredBuyers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBuyers, safePage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, location]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const totalBuyers = buyers.length;

  const activeBuyers = buyers.filter(
    (buyer) => buyer.status === "Active"
  ).length;

  const suspendedBuyers = buyers.filter(
    (buyer) => buyer.status === "Suspended"
  ).length;

  const pendingBuyers = buyers.filter(
    (buyer) => buyer.status === "Pending"
  ).length;

  const totalInquiries = buyers.reduce(
    (total, buyer) => total + Number(buyer.inquiries || 0),
    0
  );

  const statistics = [
    {
      title: "Total Buyers",
      value: totalBuyers.toLocaleString(),
      smallText: "Registered buyers",
      icon: Users,
    },
    {
      title: "Active Buyers",
      value: activeBuyers.toLocaleString(),
      smallText: "Currently active",
      icon: TrendingUp,
    },
    {
      title: "Account Status",
      value: activeBuyers,
      smallText: "Pending / Suspended",
      icon: UserCheck,
      secondary: `${pendingBuyers} / ${suspendedBuyers}`,
    },
    {
      title: "Current Inquiries",
      value: totalInquiries,
      smallText: "Buyer generated leads",
      icon: Building2,
    },
  ];

  const getStatusStyle = (buyerStatus) => {
    switch (buyerStatus) {
      case "Active":
        return "border-[#35C99A]/30 bg-[#EAF9F4] text-[#15966F]";
      case "Suspended":
      case "Blocked":
        return "border-red-200 bg-red-50 text-red-600";
      case "Pending":
        return "border-amber-200 bg-amber-50 text-amber-600";
      default:
        return "border-slate-200 bg-slate-100 text-slate-600";
    }
  };

  const openBuyer = (buyer) => {
    navigate(`/buyer-dashboard/${buyer.id}`);
  };

  return (
    <div className="space-y-4 font-sans text-[#173247]">
      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-[0_8px_24px_rgba(15,47,69,0.07)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#7B8F9A]">
                    {item.title}
                  </p>

                  <div className="mt-2 flex items-baseline gap-2">
                    <h3 className="text-2xl font-black text-[#173247]">
                      {item.value}
                    </h3>

                    {item.secondary && (
                      <span className="text-[10px] font-bold text-amber-600">
                        ({item.secondary})
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-[11px] font-medium text-[#94A4AD]">
                    {item.smallText}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#25B98B] transition group-hover:bg-[#35C99A] group-hover:text-white">
                  <Icon size={19} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= LIST ================= */}
      <div className="overflow-hidden rounded-2xl border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
        {/* FILTERS */}
        <div className="border-b border-[#E7EDF0] bg-[#F8FAFB] p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1 lg:max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A2AC]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search buyer, ID, mobile or email..."
                className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-white pl-10 pr-4 text-xs font-medium text-[#173247] outline-none transition placeholder:text-[#9DABB3] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
              />
            </div>

            <div className="relative lg:w-40">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#DCE5E9] bg-white px-3 pr-8 text-xs font-semibold text-[#526A78] outline-none transition focus:border-[#35C99A]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
                <option value="Blocked">Blocked</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
              />
            </div>

            <div className="relative lg:w-44">
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#DCE5E9] bg-white px-3 pr-8 text-xs font-semibold text-[#526A78] outline-none transition focus:border-[#35C99A]"
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Locations" : item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
              />
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE - NO HORIZONTAL SCROLLBAR */}
        <div className="hidden w-full overflow-hidden lg:block">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="bg-[#1F3C50] text-[10px] font-bold uppercase tracking-[0.08em] text-[#EAF1F4]">
                <th className="w-[21%] px-4 py-3.5">Buyer</th>
                <th className="w-[22%] px-4 py-3.5">Contact</th>
                <th className="w-[22%] px-4 py-3.5">Location</th>
                <th className="w-[25%] px-4 py-3.5">Activity</th>
                <th className="w-[10%] px-4 py-3.5">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF1F3] text-xs">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center font-medium text-[#91A2AC]"
                  >
                    Loading buyers data...
                  </td>
                </tr>
              ) : filteredBuyers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center font-medium text-[#91A2AC]"
                  >
                    No buyers found matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedBuyers.map((buyer) => (
                  <tr
                    key={buyer.id}
                    onClick={() => openBuyer(buyer)}
                    className="cursor-pointer transition-colors hover:bg-[#EAF9F4]/65"
                  >
                    <td className="px-4 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        {buyer.avatar ? (
                          <img
                            src={buyer.avatar}
                            alt={buyer.name}
                            className="h-9 w-9 shrink-0 rounded-xl border border-[#DCE5E9] object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#35C99A]/20 bg-[#EAF9F4] text-xs font-bold text-[#15966F]">
                            {buyer.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p
                            title={buyer.name}
                            className="truncate font-bold text-[#173247]"
                          >
                            {buyer.name}
                          </p>
                          <p className="mt-0.5 truncate text-[10px] font-semibold text-[#91A2AC]">
                            {buyer.buyerId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p
                        title={buyer.phone}
                        className="truncate font-semibold text-[#526A78]"
                      >
                        {buyer.phone}
                      </p>
                      <p
                        title={buyer.email}
                        className="mt-0.5 truncate text-[10px] text-[#91A2AC]"
                      >
                        {buyer.email}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p
                        title={buyer.locationText}
                        className="truncate font-medium text-[#607681]"
                      >
                        {buyer.locationText}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                        <span className="rounded-lg bg-[#F1F5F6] px-2 py-1 text-[10px] font-semibold text-[#607681]">
                          {buyer.visits} Visits
                        </span>

                        <span className="rounded-lg bg-[#EAF9F4] px-2 py-1 text-[10px] font-semibold text-[#15966F]">
                          {buyer.inquiries} Enq.
                        </span>

                        <span className="flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-500">
                          <Heart size={10} />
                          {buyer.savedProperties}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex max-w-full truncate rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
                          buyer.status
                        )}`}
                      >
                        {buyer.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE / TABLET CARDS - NO SCROLLBAR */}
        <div className="grid gap-3 p-3 lg:hidden">
          {loading ? (
            <div className="py-10 text-center text-xs font-medium text-[#91A2AC]">
              Loading buyers data...
            </div>
          ) : filteredBuyers.length === 0 ? (
            <div className="py-10 text-center text-xs font-medium text-[#91A2AC]">
              No buyers found matching criteria.
            </div>
          ) : (
            paginatedBuyers.map((buyer) => (
              <button
                key={buyer.id}
                type="button"
                onClick={() => openBuyer(buyer)}
                className="w-full rounded-2xl border border-[#E3EAED] bg-white p-4 text-left transition hover:border-[#35C99A]/40 hover:bg-[#EAF9F4]/35"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {buyer.avatar ? (
                      <img
                        src={buyer.avatar}
                        alt={buyer.name}
                        className="h-11 w-11 shrink-0 rounded-xl border border-[#DCE5E9] object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] text-sm font-bold text-[#15966F]">
                        {buyer.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#173247]">
                        {buyer.name}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold text-[#91A2AC]">
                        {buyer.buyerId}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-[#35C99A]"
                  />
                </div>

                <div className="mt-4 grid gap-2 text-[11px] text-[#607681] sm:grid-cols-2">
                  <p className="flex min-w-0 items-center gap-2">
                    <Phone size={13} className="shrink-0 text-[#35C99A]" />
                    <span className="truncate">{buyer.phone}</span>
                  </p>

                  <p className="flex min-w-0 items-center gap-2">
                    <Mail size={13} className="shrink-0 text-[#35C99A]" />
                    <span className="truncate">{buyer.email}</span>
                  </p>

                  <p className="flex min-w-0 items-center gap-2 sm:col-span-2">
                    <MapPin size={13} className="shrink-0 text-[#35C99A]" />
                    <span className="truncate">{buyer.locationText}</span>
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-[#F1F5F6] px-2 py-1 text-[10px] font-semibold text-[#607681]">
                    {buyer.visits} Visits
                  </span>
                  <span className="rounded-lg bg-[#EAF9F4] px-2 py-1 text-[10px] font-semibold text-[#15966F]">
                    {buyer.inquiries} Enquiries
                  </span>
                  <span className="flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-500">
                    <Heart size={10} />
                    {buyer.savedProperties}
                  </span>

                  <span
                    className={`ml-auto rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
                      buyer.status
                    )}`}
                  >
                    {buyer.status}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E7EDF0] bg-[#F8FAFB] px-4 py-3 text-[11px] font-medium text-[#91A2AC] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing{" "}
            <span className="font-bold text-[#173247]">
              {filteredBuyers.length === 0
                ? 0
                : (safePage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-[#173247]">
              {Math.min(safePage * itemsPerPage, filteredBuyers.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#173247]">
              {filteredBuyers.length.toLocaleString()}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DCE5E9] bg-white text-[#607681] transition hover:bg-[#EAF9F4] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>

            <button
              type="button"
              className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#1F3C50] px-2 text-[11px] font-bold text-white"
            >
              {safePage}
            </button>

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DCE5E9] bg-white text-[#607681] transition hover:bg-[#EAF9F4] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyers;