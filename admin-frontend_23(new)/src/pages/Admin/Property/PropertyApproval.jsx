

// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Download,
//   RotateCw,
//   Clock,
//   Search,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// import {
//   getAllPropertiesApi,
//   updatePropertyStatusApi,
// } from "../../../Services/propertyService";

// import Swal from "sweetalert2";

// const APPROVAL_STATUSES = [
//   "Submitted",
//   "Assigned_To_Partner",
//   "Reviewing",
//   "Verified",
// ];

// const UPDATE_STATUSES = [
//   "Reviewing",
//   "Verified",
//   "Sold",
//   "Rejected",
//   "Rented",
// ];

// const STATUS_STYLE = {
//   Submitted:
//     "bg-amber-50 text-amber-700 border-amber-200",

//   Assigned_To_Partner:
//     "bg-blue-50 text-blue-700 border-blue-200",

//   Reviewing:
//     "bg-purple-50 text-purple-700 border-purple-200",

//   Verified:
//     "bg-emerald-50 text-emerald-700 border-emerald-200",

//   Live:
//     "bg-teal-50 text-teal-700 border-teal-200",

//   Sold:
//     "bg-slate-100 text-slate-700 border-slate-200",

//   Rented:
//     "bg-cyan-50 text-cyan-700 border-cyan-200",

//   Rejected:
//     "bg-red-50 text-red-700 border-red-200",
// };

// export default function PropertyApproval() {
//   const navigate = useNavigate();

//   const [properties, setProperties] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [updatingId, setUpdatingId] =
//     useState(null);

//   const [searchQuery, setSearchQuery] =
//     useState("");

//   const [statusFilter, setStatusFilter] =
//     useState("All");

//   const [sortBy, setSortBy] =
//     useState("newest");

//   const [currentPage, setCurrentPage] =
//     useState(1);

//   const itemsPerPage = 8;

//   // =====================================================
//   // GET APPROVAL PROPERTIES
//   // =====================================================

//   const getApprovalProperties =
//     async () => {
//       try {
//         setLoading(true);

//         const response =
//           await getAllPropertiesApi();

//         const allProperties =
//           response?.data || [];

//         // Only approval pipeline properties
//         const approvalProperties =
//           allProperties.filter((property) =>
//             APPROVAL_STATUSES.includes(
//               property.status
//             )
//           );

//         setProperties(
//           approvalProperties
//         );
//       } catch (error) {
//         console.error(
//           "Approval Properties Error:",
//           error
//         );

//         Swal.fire({
//           icon: "error",
//           title:
//             "Unable to load properties",
//           text:
//             error?.response?.data
//               ?.message ||
//             "Something went wrong while fetching properties.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     getApprovalProperties();
//   }, []);

//   // =====================================================
//   // STATUS COUNTS
//   // =====================================================

//   const pipelineCounts =
//     useMemo(() => {
//       return {
//         Submitted:
//           properties.filter(
//             (p) =>
//               p.status === "Submitted"
//           ).length,

//         Assigned_To_Partner:
//           properties.filter(
//             (p) =>
//               p.status ===
//               "Assigned_To_Partner"
//           ).length,

//         Reviewing:
//           properties.filter(
//             (p) =>
//               p.status === "Reviewing"
//           ).length,

//         Verified:
//           properties.filter(
//             (p) =>
//               p.status === "Verified"
//           ).length,

//         All: properties.length,
//       };
//     }, [properties]);

//   // =====================================================
//   // FILTER
//   // =====================================================

//   const filteredProperties =
//     useMemo(() => {
//       const result =
//         properties.filter(
//           (property) => {
//             const search =
//               searchQuery
//                 .trim()
//                 .toLowerCase();

//             const matchesSearch =
//               !search ||
//               property?.title
//                 ?.toLowerCase()
//                 .includes(search) ||
//               property?.propertyId
//                 ?.toLowerCase()
//                 .includes(search) ||
//               property?.city
//                 ?.toLowerCase()
//                 .includes(search) ||
//               property?.locality
//                 ?.toLowerCase()
//                 .includes(search) ||
//               property?.addedBy?.name
//                 ?.toLowerCase()
//                 .includes(search);

//             const matchesStatus =
//               statusFilter ===
//                 "All" ||
//               property.status ===
//                 statusFilter;

//             return (
//               matchesSearch &&
//               matchesStatus
//             );
//           }
//         );

//       return result.sort((a, b) => {
//         const dateA =
//           new Date(
//             a.createdAt || 0
//           ).getTime();

//         const dateB =
//           new Date(
//             b.createdAt || 0
//           ).getTime();

//         return sortBy === "newest"
//           ? dateB - dateA
//           : dateA - dateB;
//       });
//     }, [
//       properties,
//       searchQuery,
//       statusFilter,
//       sortBy,
//     ]);

//   // =====================================================
//   // PAGINATION
//   // =====================================================

//   const totalPages =
//     Math.ceil(
//       filteredProperties.length /
//         itemsPerPage
//     ) || 1;

//   const paginatedProperties =
//     filteredProperties.slice(
//       (currentPage - 1) *
//         itemsPerPage,
//       currentPage * itemsPerPage
//     );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [
//     searchQuery,
//     statusFilter,
//   ]);

//   // =====================================================
//   // UPDATE STATUS
//   // =====================================================

//   const handleStatusUpdate =
//     async (
//       property,
//       newStatus
//     ) => {
//       if (
//         !newStatus ||
//         newStatus ===
//           property.status
//       ) {
//         return;
//       }

//       let rejectionReason = "";

//       if (
//         newStatus === "Rejected"
//       ) {
//         const result =
//           await Swal.fire({
//             title:
//               "Reject Property",
//             text:
//               "Please enter rejection reason.",
//             input: "textarea",
//             inputPlaceholder:
//               "Enter rejection reason...",
//             showCancelButton: true,
//             confirmButtonText:
//               "Reject Property",
//             confirmButtonColor:
//               "#dc2626",

//             inputValidator: (
//               value
//             ) => {
//               if (!value?.trim()) {
//                 return "Rejection reason is required.";
//               }
//             },
//           });

//         if (
//           !result.isConfirmed
//         ) {
//           return;
//         }

//         rejectionReason =
//           result.value;
//       } else {
//         const result =
//           await Swal.fire({
//             icon: "question",
//             title:
//               `Change status to ${newStatus}?`,
//             html: `
//               <div style="font-size:13px;color:#64748b">
//                 <strong>${property.title}</strong>
//                 <br/>
//                 ${property.propertyId || ""}
//                 <br/><br/>
//                 Current:
//                 <strong>${property.status}</strong>
//                 →
//                 <strong style="color:#059669">${newStatus}</strong>
//               </div>
//             `,
//             showCancelButton: true,
//             confirmButtonText:
//               "Yes, Update",
//             cancelButtonText:
//               "Cancel",
//             confirmButtonColor:
//               "#1F3C50",
//           });

//         if (
//           !result.isConfirmed
//         ) {
//           return;
//         }
//       }

//       try {
//         setUpdatingId(
//           property._id
//         );

//         const payload = {
//           status: newStatus,

//           notes:
//             `Property status changed from ${property.status} to ${newStatus} from Property Approval.`,

//           rejectionReason:
//             newStatus ===
//             "Rejected"
//               ? rejectionReason
//               : "",
//         };

//         const response =
//           await updatePropertyStatusApi(
//             property._id,
//             payload
//           );

//         if (response?.success) {
//           await Swal.fire({
//             icon: "success",
//             title:
//               "Status Updated",
//             text:
//               response?.message ||
//               `Property moved to ${newStatus}.`,
//             timer: 1500,
//             showConfirmButton: false,
//           });

//           /*
//             Important:

//             Reviewing / Verified approval page me
//             reh sakte hain.

//             Live / Sold / Rejected / Rented
//             approval page se automatically
//             remove ho jayenge because they are
//             not in APPROVAL_STATUSES.
//           */

//           await getApprovalProperties();
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title:
//             "Status Update Failed",
//           text:
//             error?.response?.data
//               ?.message ||
//             "Unable to update property status.",
//         });
//       } finally {
//         setUpdatingId(null);
//       }
//     };

//   // =====================================================
//   // VIEW PROPERTY
//   // =====================================================

// const handleViewProperty = (property) => {
//   console.log("VIEW PROPERTY:", property);
//   console.log("PROPERTY ID:", property?._id);

//   if (!property?._id) {
//     Swal.fire({
//       icon: "error",
//       title: "Property ID Missing",
//       text: "MongoDB property _id nahi mila.",
//     });
//     return;
//   }

//   navigate(
//     `/property-management/${property._id}`
//   );
// };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <div className="min-h-screen p-1 md:p-1">
//       <div className="mx-auto max-w-[1500px] space-y-6">

//         {/* HEADER */}

//         <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

//           <div>
//             {/* <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//               Properties / Approval
//             </p> */}

//             <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//               Property Approval
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Review, verify and publish property submissions.
//             </p>
//           </div>

//           <button
//             onClick={
//               getApprovalProperties
//             }
//             className="flex items-center gap-2 self-start rounded-xl bg-[#1F3C50] px-4 py-2.5 text-sm font-semibold text-white"
//           >
//             <RotateCw
//               size={16}
//             />

//             Sync Properties
//           </button>

//         </div>

//         {/* STATS */}

//         <div className="grid grid-cols-2 gap-3 md:grid-cols-5">

//           <StatCard
//             label="Total Approval"
//             value={
//               pipelineCounts.All
//             }
//             active={
//               statusFilter ===
//               "All"
//             }
//             onClick={() =>
//               setStatusFilter(
//                 "All"
//               )
//             }
//           />

//           <StatCard
//             label="Submitted"
//             value={
//               pipelineCounts.Submitted
//             }
//             active={
//               statusFilter ===
//               "Submitted"
//             }
//             onClick={() =>
//               setStatusFilter(
//                 "Submitted"
//               )
//             }
//           />

//           <StatCard
//             label="Assigned"
//             value={
//               pipelineCounts.Assigned_To_Partner
//             }
//             active={
//               statusFilter ===
//               "Assigned_To_Partner"
//             }
//             onClick={() =>
//               setStatusFilter(
//                 "Assigned_To_Partner"
//               )
//             }
//           />

//           <StatCard
//             label="Reviewing"
//             value={
//               pipelineCounts.Reviewing
//             }
//             active={
//               statusFilter ===
//               "Reviewing"
//             }
//             onClick={() =>
//               setStatusFilter(
//                 "Reviewing"
//               )
//             }
//           />

//           <StatCard
//             label="Verified"
//             value={
//               pipelineCounts.Verified
//             }
//             active={
//               statusFilter ===
//               "Verified"
//             }
//             onClick={() =>
//               setStatusFilter(
//                 "Verified"
//               )
//             }
//           />

//         </div>

//         {/* TABLE CARD */}

//         <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

//           {/* FILTER BAR */}

//           <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">

//             <div className="relative w-full md:max-w-md">

//               <Search
//                 size={17}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 type="text"
//                 value={
//                   searchQuery
//                 }
//                 onChange={(e) =>
//                   setSearchQuery(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Search title, property ID, city..."
//                 className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-teal-600"
//               />

//             </div>

//             <div className="flex gap-2">

//               <select
//                 value={
//                   statusFilter
//                 }
//                 onChange={(e) =>
//                   setStatusFilter(
//                     e.target.value
//                   )
//                 }
//                 className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none"
//               >
//                 <option value="All">
//                   All Status
//                 </option>

//                 {APPROVAL_STATUSES.map(
//                   (status) => (
//                     <option
//                       value={
//                         status
//                       }
//                       key={
//                         status
//                       }
//                     >
//                       {status.replaceAll(
//                         "_",
//                         " "
//                       )}
//                     </option>
//                   )
//                 )}
//               </select>

//               <select
//                 value={sortBy}
//                 onChange={(e) =>
//                   setSortBy(
//                     e.target.value
//                   )
//                 }
//                 className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none"
//               >
//                 <option value="newest">
//                   Newest
//                 </option>

//                 <option value="oldest">
//                   Oldest
//                 </option>
//               </select>

//             </div>

//           </div>

//           {/* TABLE */}

//           <div className="overflow-x-auto">

//             <table className="w-full min-w-[1000px]">

//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50/70">

//                   {[
//                     "Property",
//                     "Added By",
//                     "Location",
//                     "Status",
//                     "Created",
//                     "Change Status",
//                     "Action",
//                   ].map(
//                     (heading) => (
//                       <th
//                         key={
//                           heading
//                         }
//                         className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400"
//                       >
//                         {
//                           heading
//                         }
//                       </th>
//                     )
//                   )}

//                 </tr>
//               </thead>

//               <tbody>

//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="py-16 text-center text-sm text-slate-400"
//                     >
//                       Loading properties...
//                     </td>
//                   </tr>
//                 ) : paginatedProperties.length ===
//                   0 ? (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="py-16 text-center"
//                     >
//                       <Clock
//                         size={32}
//                         className="mx-auto mb-3 text-slate-300"
//                       />

//                       <p className="font-semibold text-slate-600">
//                         No approval properties found
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         Submitted, Assigned, Reviewing and Verified properties will appear here.
//                       </p>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedProperties.map(
//                     (
//                       property
//                     ) => (
//                       <tr
//                         key={
//                           property._id
//                         }
//                         className="border-b border-slate-50 transition hover:bg-slate-50/60"
//                       >

//                         {/* PROPERTY */}

//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-3">

//                             <img
//                               src={
//                                 property
//                                   ?.images?.[0]
//                                   ?.url ||
//                                 "https://placehold.co/80x80?text=Property"
//                               }
//                               alt={
//                                 property.title
//                               }
//                               className="h-12 w-12 rounded-xl object-cover"
//                             />

//                             <div>
//                               <p className="max-w-[220px] truncate text-sm font-bold text-slate-900">
//                                 {
//                                   property.title
//                                 }
//                               </p>

//                               <p className="mt-0.5 text-[11px] text-slate-400">
//                                 ID:{" "}
//                                 {
//                                   property.propertyId
//                                 }
//                               </p>
//                             </div>

//                           </div>
//                         </td>

//                         {/* ADDED BY */}

//                         <td className="px-5 py-4">

//                           <p className="text-sm font-semibold text-slate-700">
//                             {
//                               property
//                                 ?.addedBy
//                                 ?.name ||
//                               "-"
//                             }
//                           </p>

//                           <p className="text-[10px] text-slate-400">
//                             {
//                               property
//                                 ?.addedBy
//                                 ?.role ||
//                               "-"
//                             }
//                           </p>

//                         </td>

//                         {/* LOCATION */}

//                         <td className="px-5 py-4">

//                           <p className="text-sm text-slate-700">
//                             {
//                               property.city ||
//                               "-"
//                             }
//                           </p>

//                           <p className="text-[10px] text-slate-400">
//                             {
//                               property.locality ||
//                               ""
//                             }
//                           </p>

//                         </td>

//                         {/* STATUS */}

//                         <td className="px-5 py-4">
//                           <span
//                             className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold ${
//                               STATUS_STYLE[
//                                 property
//                                   .status
//                               ] ||
//                               "border-slate-200 bg-slate-50 text-slate-600"
//                             }`}
//                           >
//                             {property.status.replaceAll(
//                               "_",
//                               " "
//                             )}
//                           </span>
//                         </td>

//                         {/* CREATED */}

//                         <td className="px-5 py-4 text-xs text-slate-500">
//                           {property.createdAt
//                             ? new Date(
//                                 property.createdAt
//                               ).toLocaleDateString(
//                                 "en-IN",
//                                 {
//                                   day: "2-digit",
//                                   month:
//                                     "short",
//                                   year: "numeric",
//                                 }
//                               )
//                             : "-"}
//                         </td>

//                         {/* STATUS SELECT */}

//                         <td className="px-5 py-4">

//                           <select
//                             disabled={
//                               updatingId ===
//                               property._id
//                             }
//                             value={
//                               property.status
//                             }
//                             onChange={(
//                               e
//                             ) =>
//                               handleStatusUpdate(
//                                 property,
//                                 e.target
//                                   .value
//                               )
//                             }
//                             className="h-9 min-w-[145px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-teal-600 disabled:opacity-50"
//                           >
//                             <option
//                               value={
//                                 property.status
//                               }
//                             >
//                               {property.status.replaceAll(
//                                 "_",
//                                 " "
//                               )}
//                             </option>

//                             {UPDATE_STATUSES.filter(
//                               (
//                                 status
//                               ) =>
//                                 status !==
//                                 property.status
//                             ).map(
//                               (
//                                 status
//                               ) => (
//                                 <option
//                                   key={
//                                     status
//                                   }
//                                   value={
//                                     status
//                                   }
//                                 >
//                                   {status}
//                                 </option>
//                               )
//                             )}
//                           </select>

//                         </td>

//                         {/* VIEW */}

//                         <td className="px-5 py-4">

//                           <button
//                             onClick={() =>
//                               handleViewProperty(
//                                 property
//                               )
//                             }
//                             className="flex items-center gap-2 rounded-lg bg-[#1F3C50] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#123b36]"
//                           >
//                             <Eye
//                               size={
//                                 14
//                               }
//                             />

//                             View
//                           </button>

//                         </td>

//                       </tr>
//                     )
//                   )
//                 )}

//               </tbody>

//             </table>

//           </div>

//           {/* PAGINATION */}

//           {!loading &&
//             filteredProperties.length >
//               0 && (
//               <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">

//                 <p className="text-xs text-slate-400">
//                   Showing{" "}
//                   {
//                     paginatedProperties.length
//                   }{" "}
//                   of{" "}
//                   {
//                     filteredProperties.length
//                   }{" "}
//                   properties
//                 </p>

//                 <div className="flex items-center gap-2">

//                   <button
//                     disabled={
//                       currentPage ===
//                       1
//                     }
//                     onClick={() =>
//                       setCurrentPage(
//                         (
//                           page
//                         ) =>
//                           Math.max(
//                             1,
//                             page -
//                               1
//                           )
//                       )
//                     }
//                     className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
//                   >
//                     <ChevronLeft
//                       size={
//                         15
//                       }
//                     />
//                   </button>

//                   <span className="text-xs font-semibold text-slate-600">
//                     {
//                       currentPage
//                     }{" "}
//                     /{" "}
//                     {
//                       totalPages
//                     }
//                   </span>

//                   <button
//                     disabled={
//                       currentPage ===
//                       totalPages
//                     }
//                     onClick={() =>
//                       setCurrentPage(
//                         (
//                           page
//                         ) =>
//                           Math.min(
//                             totalPages,
//                             page +
//                               1
//                           )
//                       )
//                     }
//                     className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
//                   >
//                     <ChevronRight
//                       size={
//                         15
//                       }
//                     />
//                   </button>

//                 </div>

//               </div>
//             )}

//         </div>

//       </div>
//     </div>
//   );
// }

// function StatCard({
//   label,
//   value,
//   active,
//   onClick,
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`rounded-2xl border p-4 text-left transition ${
//         active
//           ? "border-teal-700 bg-teal-50 shadow-sm"
//           : "border-slate-200 bg-white hover:border-teal-300"
//       }`}
//     >
//       <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//         {label}
//       </p>

//       <p className="mt-2 text-2xl font-extrabold text-slate-900">
//         {value}
//       </p>
//     </button>
//   );
// }




import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Download,
  RotateCw,
  Clock,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getAllPropertiesApi,
  updatePropertyStatusApi,
} from "../../../Services/propertyService";

import Swal from "sweetalert2";

const APPROVAL_STATUSES = [
  "Submitted",
  "Assigned_To_Partner",
  "Reviewing",
  "Verified",
];

const UPDATE_STATUSES = [
  "Reviewing",
  "Verified",
  "Sold",
  "Rejected",
  "Rented",
];

const STATUS_STYLE = {
  Submitted:
    "bg-amber-50 text-amber-700 border-amber-200",

  Assigned_To_Partner:
    "bg-blue-50 text-blue-700 border-blue-200",

  Reviewing:
    "bg-purple-50 text-purple-700 border-purple-200",

  Verified:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Live:
    "bg-teal-50 text-teal-700 border-teal-200",

  Sold:
    "bg-slate-100 text-slate-700 border-slate-200",

  Rented:
    "bg-cyan-50 text-cyan-700 border-cyan-200",

  Rejected:
    "bg-red-50 text-red-700 border-red-200",
};

export default function PropertyApproval() {
  const navigate = useNavigate();

  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  // =====================================================
  // GET APPROVAL PROPERTIES
  // =====================================================

  const getApprovalProperties =
    async () => {
      try {
        setLoading(true);

        const response =
          await getAllPropertiesApi();

        const allProperties =
          response?.data || [];

        // Only approval pipeline properties
        const approvalProperties =
          allProperties.filter((property) =>
            APPROVAL_STATUSES.includes(
              property.status
            )
          );

        setProperties(
          approvalProperties
        );
      } catch (error) {
        console.error(
          "Approval Properties Error:",
          error
        );

        Swal.fire({
          icon: "error",
          title:
            "Unable to load properties",
          text:
            error?.response?.data
              ?.message ||
            "Something went wrong while fetching properties.",
        });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    getApprovalProperties();
  }, []);

  // =====================================================
  // STATUS COUNTS
  // =====================================================

  const pipelineCounts =
    useMemo(() => {
      return {
        Submitted:
          properties.filter(
            (p) =>
              p.status === "Submitted"
          ).length,

        Assigned_To_Partner:
          properties.filter(
            (p) =>
              p.status ===
              "Assigned_To_Partner"
          ).length,

        Reviewing:
          properties.filter(
            (p) =>
              p.status === "Reviewing"
          ).length,

        Verified:
          properties.filter(
            (p) =>
              p.status === "Verified"
          ).length,

        All: properties.length,
      };
    }, [properties]);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredProperties =
    useMemo(() => {
      const result =
        properties.filter(
          (property) => {
            const search =
              searchQuery
                .trim()
                .toLowerCase();

            const matchesSearch =
              !search ||
              property?.title
                ?.toLowerCase()
                .includes(search) ||
              property?.propertyId
                ?.toLowerCase()
                .includes(search) ||
              property?.city
                ?.toLowerCase()
                .includes(search) ||
              property?.locality
                ?.toLowerCase()
                .includes(search) ||
              property?.addedBy?.name
                ?.toLowerCase()
                .includes(search);

            const matchesStatus =
              statusFilter ===
                "All" ||
              property.status ===
                statusFilter;

            return (
              matchesSearch &&
              matchesStatus
            );
          }
        );

      return result.sort((a, b) => {
        const dateA =
          new Date(
            a.createdAt || 0
          ).getTime();

        const dateB =
          new Date(
            b.createdAt || 0
          ).getTime();

        return sortBy === "newest"
          ? dateB - dateA
          : dateA - dateB;
      });
    }, [
      properties,
      searchQuery,
      statusFilter,
      sortBy,
    ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages =
    Math.ceil(
      filteredProperties.length /
        itemsPerPage
    ) || 1;

  const paginatedProperties =
    filteredProperties.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    statusFilter,
  ]);

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const handleStatusUpdate =
    async (
      property,
      newStatus
    ) => {
      if (
        !newStatus ||
        newStatus ===
          property.status
      ) {
        return;
      }

      let rejectionReason = "";

      if (
        newStatus === "Rejected"
      ) {
        const result =
          await Swal.fire({
            title:
              "Reject Property",
            text:
              "Please enter rejection reason.",
            input: "textarea",
            inputPlaceholder:
              "Enter rejection reason...",
            showCancelButton: true,
            confirmButtonText:
              "Reject Property",
            confirmButtonColor:
              "#dc2626",

            inputValidator: (
              value
            ) => {
              if (!value?.trim()) {
                return "Rejection reason is required.";
              }
            },
          });

        if (
          !result.isConfirmed
        ) {
          return;
        }

        rejectionReason =
          result.value;
      } else {
        const result =
          await Swal.fire({
            icon: "question",
            title:
              `Change status to ${newStatus}?`,
            html: `
              <div style="font-size:13px;color:#64748b">
                <strong>${property.title}</strong>
                <br/>
                ${property.propertyId || ""}
                <br/><br/>
                Current:
                <strong>${property.status}</strong>
                →
                <strong style="color:#059669">${newStatus}</strong>
              </div>
            `,
            showCancelButton: true,
            confirmButtonText:
              "Yes, Update",
            cancelButtonText:
              "Cancel",
            confirmButtonColor:
              "#1F3C50",
          });

        if (
          !result.isConfirmed
        ) {
          return;
        }
      }

      try {
        setUpdatingId(
          property._id
        );

        const payload = {
          status: newStatus,

          notes:
            `Property status changed from ${property.status} to ${newStatus} from Property Approval.`,

          rejectionReason:
            newStatus ===
            "Rejected"
              ? rejectionReason
              : "",
        };

        const response =
          await updatePropertyStatusApi(
            property._id,
            payload
          );

        if (response?.success) {
          await Swal.fire({
            icon: "success",
            title:
              "Status Updated",
            text:
              response?.message ||
              `Property moved to ${newStatus}.`,
            timer: 1500,
            showConfirmButton: false,
          });

          /*
            Important:

            Reviewing / Verified approval page me
            reh sakte hain.

            Live / Sold / Rejected / Rented
            approval page se automatically
            remove ho jayenge because they are
            not in APPROVAL_STATUSES.
          */

          await getApprovalProperties();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title:
            "Status Update Failed",
          text:
            error?.response?.data
              ?.message ||
            "Unable to update property status.",
        });
      } finally {
        setUpdatingId(null);
      }
    };

  // =====================================================
  // VIEW PROPERTY
  // =====================================================

const handleViewProperty = (property) => {
  console.log("VIEW PROPERTY:", property);
  console.log("PROPERTY ID:", property?._id);

  if (!property?._id) {
    Swal.fire({
      icon: "error",
      title: "Property ID Missing",
      text: "MongoDB property _id nahi mila.",
    });
    return;
  }

  navigate(
    `/property-management/${property._id}`
  );
};

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen p-1 md:p-1">
      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            {/* <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Properties / Approval
            </p> */}

            <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
              Property Approval
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review, verify and publish property submissions.
            </p>
          </div>

          <button
            onClick={
              getApprovalProperties
            }
            className="flex items-center gap-2 self-start rounded-xl bg-[#1F3C50] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <RotateCw
              size={16}
            />

            Sync Properties
          </button>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">

          <StatCard
            label="Total Approval"
            value={
              pipelineCounts.All
            }
            active={
              statusFilter ===
              "All"
            }
            onClick={() =>
              setStatusFilter(
                "All"
              )
            }
          />

          <StatCard
            label="Submitted"
            value={
              pipelineCounts.Submitted
            }
            active={
              statusFilter ===
              "Submitted"
            }
            onClick={() =>
              setStatusFilter(
                "Submitted"
              )
            }
          />

          <StatCard
            label="Assigned"
            value={
              pipelineCounts.Assigned_To_Partner
            }
            active={
              statusFilter ===
              "Assigned_To_Partner"
            }
            onClick={() =>
              setStatusFilter(
                "Assigned_To_Partner"
              )
            }
          />

          <StatCard
            label="Reviewing"
            value={
              pipelineCounts.Reviewing
            }
            active={
              statusFilter ===
              "Reviewing"
            }
            onClick={() =>
              setStatusFilter(
                "Reviewing"
              )
            }
          />

          <StatCard
            label="Verified"
            value={
              pipelineCounts.Verified
            }
            active={
              statusFilter ===
              "Verified"
            }
            onClick={() =>
              setStatusFilter(
                "Verified"
              )
            }
          />

        </div>

        {/* TABLE CARD */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* FILTER BAR */}

          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">

            <div className="relative w-full md:max-w-md">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={
                  searchQuery
                }
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                placeholder="Search title, property ID, city..."
                className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-teal-600"
              />

            </div>

            <div className="flex gap-2">

              <select
                value={
                  statusFilter
                }
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none"
              >
                <option value="All">
                  All Status
                </option>

                {APPROVAL_STATUSES.map(
                  (status) => (
                    <option
                      value={
                        status
                      }
                      key={
                        status
                      }
                    >
                      {status.replaceAll(
                        "_",
                        " "
                      )}
                    </option>
                  )
                )}
              </select>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none"
              >
                <option value="newest">
                  Newest
                </option>

                <option value="oldest">
                  Oldest
                </option>
              </select>

            </div>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">

                  {[
                    "Property",
                    "Added By",
                    "Location",
                    "Status",
                    "Created",
                    "Change Status",
                    "Action",
                  ].map(
                    (heading) => (
                      <th
                        key={
                          heading
                        }
                        className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400"
                      >
                        {
                          heading
                        }
                      </th>
                    )
                  )}

                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-16 text-center text-sm text-slate-400"
                    >
                      Loading properties...
                    </td>
                  </tr>
                ) : paginatedProperties.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-16 text-center"
                    >
                      <Clock
                        size={32}
                        className="mx-auto mb-3 text-slate-300"
                      />

                      <p className="font-semibold text-slate-600">
                        No approval properties found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Submitted, Assigned, Reviewing and Verified properties will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedProperties.map(
                    (
                      property
                    ) => (
                      <tr
                        key={
                          property._id
                        }
                        className="border-b border-slate-50 transition hover:bg-slate-50/60"
                      >

                        {/* PROPERTY */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">

                            <img
                              src={
                                property
                                  ?.images?.[0]
                                  ?.url ||
                                "https://placehold.co/80x80?text=Property"
                              }
                              alt={
                                property.title
                              }
                              className="h-12 w-12 rounded-xl object-cover"
                            />

                            <div>
                              <p className="max-w-[220px] truncate text-sm font-bold text-slate-900">
                                {
                                  property.title
                                }
                              </p>

                              <p className="mt-0.5 text-[11px] text-slate-400">
                                ID:{" "}
                                {
                                  property.propertyId
                                }
                              </p>
                            </div>

                          </div>
                        </td>

                        {/* ADDED BY */}

                        <td className="px-5 py-4">

                          <p className="text-sm font-semibold text-slate-700">
                            {
                              property
                                ?.addedBy
                                ?.name ||
                              "-"
                            }
                          </p>

                          <p className="text-[10px] text-slate-400">
                            {
                              property
                                ?.addedBy
                                ?.role ||
                              "-"
                            }
                          </p>

                        </td>

                        {/* LOCATION */}

                        <td className="px-5 py-4">

                          <p className="text-sm text-slate-700">
                            {
                              property.city ||
                              "-"
                            }
                          </p>

                          <p className="text-[10px] text-slate-400">
                            {
                              property.locality ||
                              ""
                            }
                          </p>

                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold ${
                              STATUS_STYLE[
                                property
                                  .status
                              ] ||
                              "border-slate-200 bg-slate-50 text-slate-600"
                            }`}
                          >
                            {property.status.replaceAll(
                              "_",
                              " "
                            )}
                          </span>
                        </td>

                        {/* CREATED */}

                        <td className="px-5 py-4 text-xs text-slate-500">
                          {property.createdAt
                            ? new Date(
                                property.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month:
                                    "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}
                        </td>

                        {/* STATUS SELECT */}

                        <td className="px-5 py-4">

                          <select
                            disabled={
                              updatingId ===
                              property._id
                            }
                            value={
                              property.status
                            }
                            onChange={(
                              e
                            ) =>
                              handleStatusUpdate(
                                property,
                                e.target
                                  .value
                              )
                            }
                            className="h-9 min-w-[145px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-teal-600 disabled:opacity-50"
                          >
                            <option
                              value={
                                property.status
                              }
                            >
                              {property.status.replaceAll(
                                "_",
                                " "
                              )}
                            </option>

                            {UPDATE_STATUSES.filter(
                              (
                                status
                              ) =>
                                status !==
                                property.status
                            ).map(
                              (
                                status
                              ) => (
                                <option
                                  key={
                                    status
                                  }
                                  value={
                                    status
                                  }
                                >
                                  {status}
                                </option>
                              )
                            )}
                          </select>

                        </td>

                        {/* VIEW */}

                        <td className="px-5 py-4">

                          <button
                            onClick={() =>
                              handleViewProperty(
                                property
                              )
                            }
                            className="flex items-center gap-2 rounded-lg bg-[#1F3C50] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#123b36]"
                          >
                            <Eye
                              size={
                                14
                              }
                            />

                            View
                          </button>

                        </td>

                      </tr>
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          {!loading &&
            filteredProperties.length >
              0 && (
              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">

                <p className="text-xs text-slate-400">
                  Showing{" "}
                  {
                    paginatedProperties.length
                  }{" "}
                  of{" "}
                  {
                    filteredProperties.length
                  }{" "}
                  properties
                </p>

                <div className="flex items-center gap-2">

                  <button
                    disabled={
                      currentPage ===
                      1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (
                          page
                        ) =>
                          Math.max(
                            1,
                            page -
                              1
                          )
                      )
                    }
                    className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
                  >
                    <ChevronLeft
                      size={
                        15
                      }
                    />
                  </button>

                  <span className="text-xs font-semibold text-slate-600">
                    {
                      currentPage
                    }{" "}
                    /{" "}
                    {
                      totalPages
                    }
                  </span>

                  <button
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (
                          page
                        ) =>
                          Math.min(
                            totalPages,
                            page +
                              1
                          )
                      )
                    }
                    className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
                  >
                    <ChevronRight
                      size={
                        15
                      }
                    />
                  </button>

                </div>

              </div>
            )}

        </div>

      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-teal-700 bg-teal-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-teal-300"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-extrabold text-slate-900">
        {value}
      </p>
    </button>
  );
}