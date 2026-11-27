// import { useEffect, useState } from "react";
// import {
//   Search,
//   RefreshCw,
//   Eye,
//   X,
//   FileCheck2,
//   ShieldCheck,
//   Building2,
//   Users,
// } from "lucide-react";
// import Swal from "sweetalert2";

// import {
//   getPartnerApplicationsApi,
//   getPartnerApplicationByIdApi,
//   approvePartnerApplicationApi,
//   verifyApprovedPartnerApi,
//   actionRequiredPartnerApi,
//   rejectPartnerApplicationApi,
// } from "../../../Services/partnerService";

// const TABS = [
//   ["Applications", "Submitted"],
//   ["Under Review", "Under_Review"],
//   ["Action Required", "Action_Required"],
//   ["Approved / Not Verified", "Approved_Not_Verified"],
//   ["Verified", "Verified"],
//   ["Rejected", "Rejected"],
// ];

// const statusClass = (status) =>
//   ({
//     Submitted: "bg-[#EAF5FF] text-[#3679A9]",
//     Under_Review: "bg-[#FFF7E8] text-[#B97614]",
//     Action_Required: "bg-[#FFF0EC] text-[#C35D42]",
//     Approved_Not_Verified: "bg-[#F1EEFF] text-[#6F59AF]",
//     Verified: "bg-[#E8F8F1] text-[#16825F]",
//     Rejected: "bg-[#FFF0F0] text-[#D24A4A]",
//   })[status] || "bg-slate-100 text-slate-600";

// const accountTypeLabel = (type) => {
//   const labels = {
//     single: "Single Partner",
//     team: "Team / Agency Owner",
//     subagent: "Sub Agent",
//   };

//   return labels[type] || type || "-";
// };

// const accountTypeClass = (type) => {
//   const classes = {
//     single: "bg-[#EAF5FF] text-[#3679A9]",
//     team: "bg-[#F1EEFF] text-[#6F59AF]",
//     subagent: "bg-[#EAF9F4] text-[#16825F]",
//   };

//   return classes[type] || "bg-[#F4F7F8] text-[#6B808A]";
// };

// export default function PartnerApplications({ initialApplicationId = null }) {
//   const [rows, setRows] = useState([]);

//   const [active, setActive] = useState("Submitted");

//   const [search, setSearch] = useState("");

//   const [accountTypeFilter, setAccountTypeFilter] =
//     useState("All");

//   const [selected, setSelected] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [actionLoading, setActionLoading] =
//     useState(false);

//   /* =========================================================
//      LOAD APPLICATIONS
//   ========================================================= */

//   const load = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await getPartnerApplicationsApi({
//           status:
//             active === "All"
//               ? undefined
//               : active,

//           search:
//             search.trim() || undefined,

//           accountType:
//             accountTypeFilter === "All"
//               ? undefined
//               : accountTypeFilter,
//         });

//       setRows(response?.data || []);
//     } catch (error) {
//       console.error(
//         "Load Partner Applications Error:",
//         error
//       );

//       Swal.fire(
//         "Error",
//         error?.response?.data?.message ||
//           "Unable to load applications",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      AUTO RELOAD
//   ========================================================= */

//   useEffect(() => {
//     load();
//   }, [active, accountTypeFilter]);

//   useEffect(() => {
//     if (!initialApplicationId) return;
//     getPartnerApplicationByIdApi(initialApplicationId)
//       .then((response) => setSelected(response?.data || null))
//       .catch(() => Swal.fire("Error", "Unable to open this partner application", "error"));
//   }, [initialApplicationId]);

//   /* =========================================================
//      APPROVE
//      PATCH /api/partner-applications/:id/approve
//   ========================================================= */

//   const approve = async (partner) => {
//     const confirmation = await Swal.fire({
//       title: "Approve Partner?",
//       text:
//         partner.accountType === "subagent"
//           ? "Approve this Sub Agent application?"
//           : "Temporary credentials will be generated and emailed.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#1F3C50",
//       confirmButtonText: "Approve",
//     });

//     if (!confirmation.isConfirmed) return;

//     try {
//       setActionLoading(true);

//       await approvePartnerApplicationApi(
//         partner._id,
//         {
//           remarks:
//             "Approved by DigiNiwas Admin",
//         }
//       );

//       await Swal.fire(
//         "Approved",
//         partner.accountType === "subagent"
//           ? "Sub Agent application approved successfully."
//           : "Credentials sent to registered email.",
//         "success"
//       );

//       setSelected(null);

//       await load();
//     } catch (error) {
//       console.error(
//         "Approve Partner Error:",
//         error
//       );

//       Swal.fire(
//         "Error",
//         error?.response?.data?.message ||
//           "Unable to approve application",
//         "error"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   /* =========================================================
//      VERIFY
//      PATCH /api/partner-applications/:id/verify
//   ========================================================= */

//   const verify = async (partner) => {
//     const confirmation = await Swal.fire({
//       title: "Final Verify Partner?",
//       text:
//         "Partner can then receive assignments, visits and spend credits.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#1F3C50",
//       confirmButtonText: "Verify",
//     });

//     if (!confirmation.isConfirmed) return;

//     try {
//       setActionLoading(true);

//       await verifyApprovedPartnerApi(
//         partner._id,
//         {
//           remarks:
//             "KYC and business verification completed",
//         }
//       );

//       await Swal.fire(
//         "Verified",
//         partner.accountType === "subagent"
//           ? "Sub Agent verified successfully."
//           : "Partner verified successfully.",
//         "success"
//       );

//       setSelected(null);

//       await load();
//     } catch (error) {
//       console.error(
//         "Verify Partner Error:",
//         error
//       );

//       Swal.fire(
//         "Error",
//         error?.response?.data?.message ||
//           "Unable to verify application",
//         "error"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   /* =========================================================
//      ACTION REQUIRED
//      PATCH /api/partner-applications/:id/action-required
//   ========================================================= */

//   const actionReq = async (partner) => {
//     const confirmation = await Swal.fire({
//       title: "Action Required",
//       input: "textarea",
//       inputPlaceholder:
//         "What needs correction?",
//       showCancelButton: true,
//       confirmButtonColor: "#1F3C50",
//       confirmButtonText: "Send Request",
//     });

//     if (!confirmation.isConfirmed) return;

//     try {
//       setActionLoading(true);

//       await actionRequiredPartnerApi(
//         partner._id,
//         {
//           remarks:
//             confirmation.value ||
//             "Additional information required",
//         }
//       );

//       await Swal.fire(
//         "Updated",
//         "Application marked as Action Required.",
//         "success"
//       );

//       setSelected(null);

//       await load();
//     } catch (error) {
//       console.error(
//         "Action Required Error:",
//         error
//       );

//       Swal.fire(
//         "Error",
//         error?.response?.data?.message ||
//           "Unable to update application",
//         "error"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   /* =========================================================
//      REJECT
//      PATCH /api/partner-applications/:id/reject
//   ========================================================= */

//   const reject = async (partner) => {
//     const confirmation = await Swal.fire({
//       title: "Reject Application?",
//       input: "textarea",
//       inputPlaceholder:
//         "Enter rejection reason",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#D24A4A",
//       confirmButtonText: "Reject",
//     });

//     if (!confirmation.isConfirmed) return;

//     try {
//       setActionLoading(true);

//       await rejectPartnerApplicationApi(
//         partner._id,
//         {
//           remarks:
//             confirmation.value ||
//             "Rejected by admin",
//         }
//       );

//       await Swal.fire(
//         "Rejected",
//         "Partner application rejected.",
//         "success"
//       );

//       setSelected(null);

//       await load();
//     } catch (error) {
//       console.error(
//         "Reject Partner Error:",
//         error
//       );

//       Swal.fire(
//         "Error",
//         error?.response?.data?.message ||
//           "Unable to reject application",
//         "error"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen text-[#173247] md:p-1">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//             Partner Applications
//           </h1>

//           <p className="mt-1 text-xs text-[#7a8991]">
//             Review Single Partners, Agency Owners and
//             Sub Agents with KYC and final verification.
//           </p>
//         </div>

//         <button
//           onClick={load}
//           disabled={loading}
//           className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold transition hover:bg-[#EAF9F4] disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           <RefreshCw
//             size={15}
//             className={
//               loading ? "animate-spin" : ""
//             }
//           />

//           Refresh
//         </button>
//       </div>

//       {/* =====================================================
//           FILTER SECTION
//       ===================================================== */}

//       <section className="mt-3 rounded-[18px] border border-[#E0E8EC] bg-white p-3">

//         {/* STATUS TABS */}

//         <div className="flex flex-wrap gap-2">
//           {TABS.map(([label, value]) => (
//             <button
//               key={value}
//               onClick={() =>
//                 setActive(value)
//               }
//               className={`rounded-xl px-4 py-2.5 text-[11px] font-bold transition ${
//                 active === value
//                   ? "bg-[#1F3C50] text-white"
//                   : "bg-[#F4F7F8] text-[#6B808A] hover:bg-[#EAF9F4]"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* SEARCH + ACCOUNT FILTER */}

//         <div className="mt-3 flex flex-col gap-2 lg:flex-row">

//           <div className="relative flex-1">
//             <Search
//               size={15}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8AA0AA]"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   load();
//                 }
//               }}
//               placeholder="Search name, email, phone, Partner ID..."
//               className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none transition focus:border-[#35C99A]"
//             />
//           </div>

//           {/* ACCOUNT TYPE FILTER */}

//           <select
//             value={accountTypeFilter}
//             onChange={(e) =>
//               setAccountTypeFilter(
//                 e.target.value
//               )
//             }
//             className="h-10 min-w-[190px] rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] px-3 text-xs font-semibold text-[#425A66] outline-none focus:border-[#35C99A]"
//           >
//             <option value="All">
//               All Accounts
//             </option>

//             <option value="single">
//               Single Partner
//             </option>

//             <option value="team">
//               Team / Agency Owner
//             </option>

//             <option value="subagent">
//               Sub Agent
//             </option>
//           </select>

//           <button
//             onClick={load}
//             disabled={loading}
//             className="h-10 rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold text-[#173247] transition hover:bg-[#2FC091] disabled:opacity-60"
//           >
//             Search
//           </button>
//         </div>
//       </section>

//       {/* =====================================================
//           TABLE
//       ===================================================== */}

//       <section className="mt-3 overflow-hidden border border-[#E0E8EC] bg-white">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left">

//             <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">
//               <tr>
//                 <th className="px-4 py-3">
//                   Partner
//                 </th>

//                 <th className="px-4 py-3">
//                   Account
//                 </th>

//                 <th className="px-4 py-3">
//                   Verification
//                 </th>

//                 <th className="px-4 py-3">
//                   Location
//                 </th>

//                 <th className="px-4 py-3">
//                   Status
//                 </th>

//                 <th className="px-4 py-3 text-right">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-[#EDF2F4]">

//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="py-14 text-center text-xs text-[#71858E]"
//                   >
//                     Loading applications...
//                   </td>
//                 </tr>
//               ) : rows.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="py-14 text-center text-xs text-[#71858E]"
//                   >
//                     No applications found.
//                   </td>
//                 </tr>
//               ) : (
//                 rows.map((partner) => (
//                   <tr
//                     key={partner._id}
//                     className="transition hover:bg-[#FAFCFD]"
//                   >
//                     {/* PARTNER */}

//                     <td className="px-4 py-3">
//                       <div className="text-[12px] font-extrabold">
//                         {partner.name || "-"}
//                       </div>

//                       <div className="mt-1 text-[10px] text-[#82949D]">
//                         {partner.partnerId ||
//                           "Partner ID Pending"}

//                         {" · "}

//                         {partner.email || "-"}
//                       </div>

//                       {partner.accountType ===
//                         "subagent" &&
//                         partner.agencyDetails
//                           ?.agencyName && (
//                           <div className="mt-1 text-[9px] font-semibold text-[#35A98C]">
//                             Agency:{" "}
//                             {
//                               partner
//                                 .agencyDetails
//                                 .agencyName
//                             }
//                           </div>
//                         )}
//                     </td>

//                     {/* ACCOUNT TYPE */}

//                     <td className="px-4 py-3">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ${accountTypeClass(
//                           partner.accountType
//                         )}`}
//                       >
//                         {accountTypeLabel(
//                           partner.accountType
//                         )}
//                       </span>
//                     </td>

//                     {/* VERIFICATION */}

//                     <td className="px-4 py-3 text-[10px]">

//                       <div
//                         className={
//                           partner
//                             .emailVerification
//                             ?.isVerified
//                             ? "font-semibold text-[#16825F]"
//                             : "font-semibold text-[#B97614]"
//                         }
//                       >
//                         Email:{" "}
//                         {partner
//                           .emailVerification
//                           ?.isVerified
//                           ? "Verified"
//                           : "Pending"}
//                       </div>

//                       <div
//                         className={
//                           partner
//                             .phoneVerification
//                             ?.isVerified
//                             ? "mt-1 font-semibold text-[#16825F]"
//                             : "mt-1 font-semibold text-[#B97614]"
//                         }
//                       >
//                         Mobile:{" "}
//                         {partner
//                           .phoneVerification
//                           ?.isVerified
//                           ? "Verified"
//                           : "Pending"}
//                       </div>
//                     </td>

//                     {/* LOCATION */}

//                     <td className="px-4 py-3 text-[11px]">
//                       {partner.location?.city ||
//                         "-"}

//                       {partner.location?.state
//                         ? `, ${partner.location.state}`
//                         : ""}
//                     </td>

//                     {/* STATUS */}

//                     <td className="px-4 py-3">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${statusClass(
//                           partner.applicationStatus
//                         )}`}
//                       >
//                         {partner.applicationStatus
//                           ?.replaceAll("_", " ") ||
//                           "-"}
//                       </span>
//                     </td>

//                     {/* ACTION */}

//                     <td className="px-4 py-3 text-right">
//                       <button
//                         onClick={() =>
//                           setSelected(partner)
//                         }
//                         className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold transition hover:border-[#35C99A] hover:bg-[#EAF9F4]"
//                       >
//                         <Eye size={13} />
//                         Review
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* =====================================================
//           APPLICATION DETAILS DRAWER
//       ===================================================== */}

//       {selected && (
//         <div className="fixed inset-0 z-50 flex justify-end bg-[#0E2736]/50">

//           <div className="h-full w-full max-w-[620px] overflow-y-auto bg-[#F4F7F8]">

//             {/* DRAWER HEADER */}

//             <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DCE5E9] bg-white px-5 py-4">

//               <div>
//                 <p className="text-[10px] font-bold uppercase text-[#35A98C]">
//                   Application Review
//                 </p>

//                 <h2 className="text-lg font-extrabold">
//                   {selected.name || "-"}
//                 </h2>

//                 <div className="mt-1 flex flex-wrap items-center gap-2">
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${accountTypeClass(
//                       selected.accountType
//                     )}`}
//                   >
//                     {accountTypeLabel(
//                       selected.accountType
//                     )}
//                   </span>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${statusClass(
//                       selected.applicationStatus
//                     )}`}
//                   >
//                     {selected.applicationStatus
//                       ?.replaceAll("_", " ")}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={() =>
//                   setSelected(null)
//                 }
//                 className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-[#F4F7F8]"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* DRAWER CONTENT */}

//             <div className="space-y-3 p-4">

//               {/* ACCOUNT INFORMATION */}

//               <Section
//                 title="Account Information"
//                 icon={<Users size={16} />}
//               >
//                 <Info
//                   label="Account Type"
//                   value={accountTypeLabel(
//                     selected.accountType
//                   )}
//                 />

//                 <Info
//                   label="Partner ID"
//                   value={selected.partnerId}
//                 />

//                 <Info
//                   label="Name"
//                   value={selected.name}
//                 />

//                 <Info
//                   label="Phone"
//                   value={selected.phone}
//                 />
//               </Section>

//               {/* VERIFICATION */}

//               <Section
//                 title="Verification"
//                 icon={
//                   <ShieldCheck size={16} />
//                 }
//               >
//                 <Info
//                   label="Email"
//                   value={
//                     selected.emailVerification
//                       ?.isVerified
//                       ? "Verified"
//                       : "Pending"
//                   }
//                 />

//                 <Info
//                   label="Mobile"
//                   value={
//                     selected.phoneVerification
//                       ?.isVerified
//                       ? "Verified"
//                       : "Pending"
//                   }
//                 />

//                 <Info
//                   label="Admin Approved"
//                   value={
//                     selected.isApproved
//                       ? "Yes"
//                       : "No"
//                   }
//                 />

//                 <Info
//                   label="Final Verified"
//                   value={
//                     selected.isVerified
//                       ? "Yes"
//                       : "No"
//                   }
//                 />
//               </Section>

//               {/* BUSINESS */}

//               <Section
//                 title="Business"
//                 icon={<Building2 size={16} />}
//               >
//                 <Info
//                   label="Business"
//                   value={
//                     selected.business
//                       ?.businessName
//                   }
//                 />

//                 <Info
//                   label="GSTIN"
//                   value={
//                     selected.business?.gstin
//                   }
//                 />

//                 <Info
//                   label="City"
//                   value={
//                     selected.location?.city
//                   }
//                 />

//                 <Info
//                   label="RERA"
//                   value={
//                     selected.rera?.applicable
//                       ? selected.rera
//                           ?.registrationNumber ||
//                         "Applicable"
//                       : "Not Applicable"
//                   }
//                 />
//               </Section>

//               {/* =================================================
//                   SUBAGENT AGENCY ASSOCIATION
//               ================================================= */}

//               {selected.accountType ===
//                 "subagent" && (
//                 <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">

//                   <div className="mb-3 flex items-center gap-2">
//                     <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#168B72]">
//                       <Users size={16} />
//                     </span>

//                     <h3 className="text-sm font-extrabold">
//                       Agency Association
//                     </h3>
//                   </div>

//                   <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">

//                     <div className="rounded-xl bg-[#F7F9FA] p-3">
//                       <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
//                         Agency
//                       </p>

//                       <p className="mt-1 font-bold text-[#344D59]">
//                         {selected
//                           .agencyDetails
//                           ?.agencyName ||
//                           "-"}
//                       </p>
//                     </div>

//                     <div className="rounded-xl bg-[#F7F9FA] p-3">
//                       <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
//                         Agency Code
//                       </p>

//                       <p className="mt-1 font-bold text-[#344D59]">
//                         {selected
//                           .agencyDetails
//                           ?.agencyPartnerCode ||
//                           "-"}
//                       </p>
//                     </div>

//                     <div className="rounded-xl bg-[#F7F9FA] p-3">
//                       <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
//                         Owner
//                       </p>

//                       <p className="mt-1 font-bold text-[#344D59]">
//                         {selected
//                           .agencyDetails
//                           ?.agencyOwnerName ||
//                           "-"}
//                       </p>
//                     </div>

//                     <div className="rounded-xl bg-[#F7F9FA] p-3">
//                       <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
//                         Team Role
//                       </p>

//                       <p className="mt-1 font-bold text-[#344D59]">
//                         {selected.teamRole ||
//                           "-"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* IDENTITY DOCUMENTS */}

//               <Section
//                 title="Identity Documents"
//                 icon={
//                   <FileCheck2 size={16} />
//                 }
//               >
//                 <div className="col-span-1 space-y-2 sm:col-span-2">

//                   {(
//                     selected.identityDocuments ||
//                     []
//                   ).length === 0 ? (
//                     <div className="rounded-xl bg-[#F7F9FA] p-4 text-center text-[10px] text-[#82949D]">
//                       No identity documents
//                       uploaded.
//                     </div>
//                   ) : (
//                     (
//                       selected.identityDocuments ||
//                       []
//                     ).map(
//                       (document, index) => (
//                         <div
//                           key={
//                             document._id ||
//                             `${document.documentType}-${index}`
//                           }
//                           className="rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
//                         >
//                           <div className="text-xs font-bold capitalize">
//                             {document.documentType ||
//                               "Document"}
//                           </div>

//                           <div className="mt-2 flex flex-wrap gap-2">

//                             {document.frontUrl && (
//                               <a
//                                 href={
//                                   document.frontUrl
//                                 }
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="rounded-lg bg-[#EAF9F4] px-3 py-2 text-[10px] font-bold text-[#08745F]"
//                               >
//                                 View Front
//                               </a>
//                             )}

//                             {document.backUrl && (
//                               <a
//                                 href={
//                                   document.backUrl
//                                 }
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="rounded-lg bg-[#EAF9F4] px-3 py-2 text-[10px] font-bold text-[#08745F]"
//                               >
//                                 View Back
//                               </a>
//                             )}

//                             {!document.frontUrl &&
//                               !document.backUrl && (
//                                 <span className="text-[10px] text-[#8A9AA2]">
//                                   No document URL
//                                 </span>
//                               )}
//                           </div>
//                         </div>
//                       )
//                     )
//                   )}
//                 </div>
//               </Section>
//             </div>

//             {/* =================================================
//                 ADMIN ACTIONS
//             ================================================= */}

//             <div className="sticky bottom-0 border-t border-[#DCE5E9] bg-white p-4 shadow-[0_-5px_20px_rgba(15,23,42,0.04)]">

//               <div className="flex flex-wrap gap-2">

//                 {[
//                   "Submitted",
//                   "Under_Review",
//                   "Action_Required",
//                 ].includes(
//                   selected.applicationStatus
//                 ) && (
//                   <>
//                     {/* APPROVE */}

//                     <button
//                       disabled={
//                         actionLoading
//                       }
//                       onClick={() =>
//                         approve(selected)
//                       }
//                       className="rounded-xl bg-[#1F3C50] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#004D46] disabled:cursor-not-allowed disabled:opacity-50"
//                     >
//                       Approve
//                     </button>

//                     {/* ACTION REQUIRED */}

//                     <button
//                       disabled={
//                         actionLoading
//                       }
//                       onClick={() =>
//                         actionReq(selected)
//                       }
//                       className="rounded-xl bg-[#FFF8EA] px-4 py-2.5 text-xs font-bold text-[#A76C18] transition hover:bg-[#FFF1D3] disabled:opacity-50"
//                     >
//                       Action Required
//                     </button>

//                     {/* REJECT */}

//                     <button
//                       disabled={
//                         actionLoading
//                       }
//                       onClick={() =>
//                         reject(selected)
//                       }
//                       className="rounded-xl bg-[#FFF2F2] px-4 py-2.5 text-xs font-bold text-[#C74949] transition hover:bg-[#FFE5E5] disabled:opacity-50"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {/* FINAL VERIFY */}

//                 {selected.applicationStatus ===
//                   "Approved_Not_Verified" && (
//                   <button
//                     disabled={actionLoading}
//                     onClick={() =>
//                       verify(selected)
//                     }
//                     className="rounded-xl bg-[#35C99A] px-4 py-2.5 text-xs font-extrabold text-[#173247] transition hover:bg-[#2EB98E] disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     Final Verify Partner
//                   </button>
//                 )}

//                 {selected.applicationStatus ===
//                   "Verified" && (
//                   <div className="flex items-center gap-2 rounded-xl bg-[#E8F8F1] px-4 py-2.5 text-xs font-bold text-[#16825F]">
//                     <ShieldCheck size={15} />

//                     Partner Verified
//                   </div>
//                 )}

//                 {selected.applicationStatus ===
//                   "Rejected" && (
//                   <div className="rounded-xl bg-[#FFF0F0] px-4 py-2.5 text-xs font-bold text-[#D24A4A]">
//                     Application Rejected
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    SECTION
// ========================================================= */

// const Section = ({
//   title,
//   icon,
//   children,
// }) => (
//   <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">
//     <div className="mb-3 flex items-center gap-2 text-sm font-extrabold">
//       <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#168B72]">
//         {icon}
//       </span>

//       {title}
//     </div>

//     <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//       {children}
//     </div>
//   </div>
// );

// /* =========================================================
//    INFO
// ========================================================= */

// const Info = ({ label, value }) => (
//   <div className="rounded-xl bg-[#F7F9FA] p-3">
//     <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A9AA2]">
//       {label}
//     </p>

//     <p className="mt-1 break-words text-[11px] font-semibold text-[#344D59]">
//       {value || "-"}
//     </p>
//   </div>
// );


import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  FileCheck2,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";
import Swal from "sweetalert2";

import {
  getPartnerApplicationsApi,
  getPartnerApplicationByIdApi,
  approvePartnerApplicationApi,
  verifyApprovedPartnerApi,
  actionRequiredPartnerApi,
  rejectPartnerApplicationApi,
} from "../../../Services/partnerService";

const TABS = [
  ["Applications", "Submitted"],
  ["Under Review", "Under_Review"],
  ["Action Required", "Action_Required"],
  ["Approved / Not Verified", "Approved_Not_Verified"],
  ["Verified", "Verified"],
  ["Rejected", "Rejected"],
];

const statusClass = (status) =>
  ({
    Submitted: "bg-[#EAF5FF] text-[#3679A9]",
    Under_Review: "bg-[#FFF7E8] text-[#B97614]",
    Action_Required: "bg-[#FFF0EC] text-[#C35D42]",
    Approved_Not_Verified: "bg-[#F1EEFF] text-[#6F59AF]",
    Verified: "bg-[#E8F8F1] text-[#16825F]",
    Rejected: "bg-[#FFF0F0] text-[#D24A4A]",
  })[status] || "bg-slate-100 text-slate-600";

const accountTypeLabel = (type) => {
  const labels = {
    single: "Single Partner",
    team: "Team / Agency Owner",
    subagent: "Sub Agent",
  };

  return labels[type] || type || "-";
};

const accountTypeClass = (type) => {
  const classes = {
    single: "bg-[#EAF5FF] text-[#3679A9]",
    team: "bg-[#F1EEFF] text-[#6F59AF]",
    subagent: "bg-[#EAF9F4] text-[#16825F]",
  };

  return classes[type] || "bg-[#F4F7F8] text-[#6B808A]";
};

export default function PartnerApplications({ initialApplicationId = null }) {
  const [rows, setRows] = useState([]);

  const [active, setActive] = useState("Submitted");

  const [search, setSearch] = useState("");

  const [accountTypeFilter, setAccountTypeFilter] =
    useState("All");

  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(true);

  // =========================================================
  // PAGINATION
  // =========================================================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(rows.length / itemsPerPage) || 1;

  const paginatedRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [actionLoading, setActionLoading] =
    useState(false);

  /* =========================================================
     LOAD APPLICATIONS
  ========================================================= */

  const load = async () => {
    try {
      setLoading(true);

      const response =
        await getPartnerApplicationsApi({
          status:
            active === "All"
              ? undefined
              : active,

          search:
            search.trim() || undefined,

          accountType:
            accountTypeFilter === "All"
              ? undefined
              : accountTypeFilter,
        });

      setRows(response?.data || []);
    } catch (error) {
      console.error(
        "Load Partner Applications Error:",
        error
      );

      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          "Unable to load applications",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     AUTO RELOAD
  ========================================================= */

  useEffect(() => {
    load();
  }, [active, accountTypeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [active, accountTypeFilter, search]);

  useEffect(() => {
    if (!initialApplicationId) return;
    getPartnerApplicationByIdApi(initialApplicationId)
      .then((response) => setSelected(response?.data || null))
      .catch(() => Swal.fire("Error", "Unable to open this partner application", "error"));
  }, [initialApplicationId]);

  /* =========================================================
     APPROVE
     PATCH /api/partner-applications/:id/approve
  ========================================================= */

  const approve = async (partner) => {
    const confirmation = await Swal.fire({
      title: "Approve Partner?",
      text:
        partner.accountType === "subagent"
          ? "Approve this Sub Agent application?"
          : "Temporary credentials will be generated and emailed.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1F3C50",
      confirmButtonText: "Approve",
    });

    if (!confirmation.isConfirmed) return;

    try {
      setActionLoading(true);

      await approvePartnerApplicationApi(
        partner._id,
        {
          remarks:
            "Approved by DigiNiwas Admin",
        }
      );

      await Swal.fire(
        "Approved",
        partner.accountType === "subagent"
          ? "Sub Agent application approved successfully."
          : "Credentials sent to registered email.",
        "success"
      );

      setSelected(null);

      await load();
    } catch (error) {
      console.error(
        "Approve Partner Error:",
        error
      );

      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          "Unable to approve application",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     VERIFY
     PATCH /api/partner-applications/:id/verify
  ========================================================= */

  const verify = async (partner) => {
    const confirmation = await Swal.fire({
      title: "Final Verify Partner?",
      text:
        "Partner can then receive assignments, visits and spend credits.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1F3C50",
      confirmButtonText: "Verify",
    });

    if (!confirmation.isConfirmed) return;

    try {
      setActionLoading(true);

      await verifyApprovedPartnerApi(
        partner._id,
        {
          remarks:
            "KYC and business verification completed",
        }
      );

      await Swal.fire(
        "Verified",
        partner.accountType === "subagent"
          ? "Sub Agent verified successfully."
          : "Partner verified successfully.",
        "success"
      );

      setSelected(null);

      await load();
    } catch (error) {
      console.error(
        "Verify Partner Error:",
        error
      );

      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          "Unable to verify application",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     ACTION REQUIRED
     PATCH /api/partner-applications/:id/action-required
  ========================================================= */

  const actionReq = async (partner) => {
    const confirmation = await Swal.fire({
      title: "Action Required",
      input: "textarea",
      inputPlaceholder:
        "What needs correction?",
      showCancelButton: true,
      confirmButtonColor: "#1F3C50",
      confirmButtonText: "Send Request",
    });

    if (!confirmation.isConfirmed) return;

    try {
      setActionLoading(true);

      await actionRequiredPartnerApi(
        partner._id,
        {
          remarks:
            confirmation.value ||
            "Additional information required",
        }
      );

      await Swal.fire(
        "Updated",
        "Application marked as Action Required.",
        "success"
      );

      setSelected(null);

      await load();
    } catch (error) {
      console.error(
        "Action Required Error:",
        error
      );

      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          "Unable to update application",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     REJECT
     PATCH /api/partner-applications/:id/reject
  ========================================================= */

  const reject = async (partner) => {
    const confirmation = await Swal.fire({
      title: "Reject Application?",
      input: "textarea",
      inputPlaceholder:
        "Enter rejection reason",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D24A4A",
      confirmButtonText: "Reject",
    });

    if (!confirmation.isConfirmed) return;

    try {
      setActionLoading(true);

      await rejectPartnerApplicationApi(
        partner._id,
        {
          remarks:
            confirmation.value ||
            "Rejected by admin",
        }
      );

      await Swal.fire(
        "Rejected",
        "Partner application rejected.",
        "success"
      );

      setSelected(null);

      await load();
    } catch (error) {
      console.error(
        "Reject Partner Error:",
        error
      );

      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          "Unable to reject application",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-[#173247] md:p-1">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
            Partner Applications
          </h1>

          <p className="mt-1 text-xs text-[#7a8991]">
            Review Single Partners, Agency Owners and
            Sub Agents with KYC and final verification.
          </p>
        </div>

        <button
          onClick={load}
          disabled={loading}
          className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold transition hover:bg-[#EAF9F4] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={
              loading ? "animate-spin" : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* =====================================================
          FILTER SECTION
      ===================================================== */}

      <section className="mt-3 rounded-[18px] border border-[#E0E8EC] bg-white p-3">

        {/* STATUS TABS */}

        <div className="flex flex-wrap gap-2">
          {TABS.map(([label, value]) => (
            <button
              key={value}
              onClick={() =>
                setActive(value)
              }
              className={`rounded-xl px-4 py-2.5 text-[11px] font-bold transition ${
                active === value
                  ? "bg-[#1F3C50] text-white"
                  : "bg-[#F4F7F8] text-[#6B808A] hover:bg-[#EAF9F4]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* SEARCH + ACCOUNT FILTER */}

        <div className="mt-3 flex flex-col gap-2 lg:flex-row">

          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8AA0AA]"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  load();
                }
              }}
              placeholder="Search name, email, phone, Partner ID..."
              className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none transition focus:border-[#35C99A]"
            />
          </div>

          {/* ACCOUNT TYPE FILTER */}

          <select
            value={accountTypeFilter}
            onChange={(e) =>
              setAccountTypeFilter(
                e.target.value
              )
            }
            className="h-10 min-w-[190px] rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] px-3 text-xs font-semibold text-[#425A66] outline-none focus:border-[#35C99A]"
          >
            <option value="All">
              All Accounts
            </option>

            <option value="single">
              Single Partner
            </option>

            <option value="team">
              Team / Agency Owner
            </option>

            <option value="subagent">
              Sub Agent
            </option>
          </select>

          <button
            onClick={load}
            disabled={loading}
            className="h-10 rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold text-[#173247] transition hover:bg-[#2FC091] disabled:opacity-60"
          >
            Search
          </button>
        </div>
      </section>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <section className="mt-3 overflow-hidden border border-[#E0E8EC] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">

            <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">
              <tr>
                <th className="px-4 py-3">
                  Partner
                </th>

                <th className="px-4 py-3">
                  Account
                </th>

                <th className="px-4 py-3">
                  Verification
                </th>

                <th className="px-4 py-3">
                  Location
                </th>

                <th className="px-4 py-3">
                  Status
                </th>

                <th className="px-4 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF2F4]">

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-14 text-center text-xs text-[#71858E]"
                  >
                    Loading applications...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-14 text-center text-xs text-[#71858E]"
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((partner) => (
                  <tr
                    key={partner._id}
                    className="transition hover:bg-[#FAFCFD]"
                  >
                    {/* PARTNER */}

                    <td className="px-4 py-3">
                      <div className="text-[12px] font-extrabold">
                        {partner.name || "-"}
                      </div>

                      <div className="mt-1 text-[10px] text-[#82949D]">
                        {partner.partnerId ||
                          "Partner ID Pending"}

                        {" · "}

                        {partner.email || "-"}
                      </div>

                      {partner.accountType ===
                        "subagent" &&
                        partner.agencyDetails
                          ?.agencyName && (
                          <div className="mt-1 text-[9px] font-semibold text-[#35A98C]">
                            Agency:{" "}
                            {
                              partner
                                .agencyDetails
                                .agencyName
                            }
                          </div>
                        )}
                    </td>

                    {/* ACCOUNT TYPE */}

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ${accountTypeClass(
                          partner.accountType
                        )}`}
                      >
                        {accountTypeLabel(
                          partner.accountType
                        )}
                      </span>
                    </td>

                    {/* VERIFICATION */}

                    <td className="px-4 py-3 text-[10px]">

                      <div
                        className={
                          partner
                            .emailVerification
                            ?.isVerified
                            ? "font-semibold text-[#16825F]"
                            : "font-semibold text-[#B97614]"
                        }
                      >
                        Email:{" "}
                        {partner
                          .emailVerification
                          ?.isVerified
                          ? "Verified"
                          : "Pending"}
                      </div>

                      <div
                        className={
                          partner
                            .phoneVerification
                            ?.isVerified
                            ? "mt-1 font-semibold text-[#16825F]"
                            : "mt-1 font-semibold text-[#B97614]"
                        }
                      >
                        Mobile:{" "}
                        {partner
                          .phoneVerification
                          ?.isVerified
                          ? "Verified"
                          : "Pending"}
                      </div>
                    </td>

                    {/* LOCATION */}

                    <td className="px-4 py-3 text-[11px]">
                      {partner.location?.city ||
                        "-"}

                      {partner.location?.state
                        ? `, ${partner.location.state}`
                        : ""}
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${statusClass(
                          partner.applicationStatus
                        )}`}
                      >
                        {partner.applicationStatus
                          ?.replaceAll("_", " ") ||
                          "-"}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          setSelected(partner)
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold transition hover:border-[#35C99A] hover:bg-[#EAF9F4]"
                      >
                        <Eye size={13} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          PAGINATION
      ===================================================== */}
      {!loading && rows.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-[#E0E8EC] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] text-[#8A989C]">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              rows.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              rows.length
            )}{" "}
            of {rows.length} applications
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D8E3E0] bg-white text-[#50676D] transition hover:bg-[#F3F9F7] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>

            <span className="min-w-[70px] text-center text-[10px] font-bold text-[#50676D]">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D8E3E0] bg-white text-[#50676D] transition hover:bg-[#F3F9F7] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          APPLICATION DETAILS DRAWER
      ===================================================== */}

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#0E2736]/50">

          <div className="h-full w-full max-w-[620px] overflow-y-auto bg-[#F4F7F8]">

            {/* DRAWER HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DCE5E9] bg-white px-5 py-4">

              <div>
                <p className="text-[10px] font-bold uppercase text-[#35A98C]">
                  Application Review
                </p>

                <h2 className="text-lg font-extrabold">
                  {selected.name || "-"}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${accountTypeClass(
                      selected.accountType
                    )}`}
                  >
                    {accountTypeLabel(
                      selected.accountType
                    )}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${statusClass(
                      selected.applicationStatus
                    )}`}
                  >
                    {selected.applicationStatus
                      ?.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-[#F4F7F8]"
              >
                <X size={18} />
              </button>
            </div>

            {/* DRAWER CONTENT */}

            <div className="space-y-3 p-4">

              {/* ACCOUNT INFORMATION */}

              <Section
                title="Account Information"
                icon={<Users size={16} />}
              >
                <Info
                  label="Account Type"
                  value={accountTypeLabel(
                    selected.accountType
                  )}
                />

                <Info
                  label="Partner ID"
                  value={selected.partnerId}
                />

                <Info
                  label="Name"
                  value={selected.name}
                />

                <Info
                  label="Phone"
                  value={selected.phone}
                />
              </Section>

              {/* VERIFICATION */}

              <Section
                title="Verification"
                icon={
                  <ShieldCheck size={16} />
                }
              >
                <Info
                  label="Email"
                  value={
                    selected.emailVerification
                      ?.isVerified
                      ? "Verified"
                      : "Pending"
                  }
                />

                <Info
                  label="Mobile"
                  value={
                    selected.phoneVerification
                      ?.isVerified
                      ? "Verified"
                      : "Pending"
                  }
                />

                <Info
                  label="Admin Approved"
                  value={
                    selected.isApproved
                      ? "Yes"
                      : "No"
                  }
                />

                <Info
                  label="Final Verified"
                  value={
                    selected.isVerified
                      ? "Yes"
                      : "No"
                  }
                />
              </Section>

              {/* BUSINESS */}

              <Section
                title="Business"
                icon={<Building2 size={16} />}
              >
                <Info
                  label="Business"
                  value={
                    selected.business
                      ?.businessName
                  }
                />

                <Info
                  label="GSTIN"
                  value={
                    selected.business?.gstin
                  }
                />

                <Info
                  label="City"
                  value={
                    selected.location?.city
                  }
                />

                <Info
                  label="RERA"
                  value={
                    selected.rera?.applicable
                      ? selected.rera
                          ?.registrationNumber ||
                        "Applicable"
                      : "Not Applicable"
                  }
                />
              </Section>

              {/* =================================================
                  SUBAGENT AGENCY ASSOCIATION
              ================================================= */}

              {selected.accountType ===
                "subagent" && (
                <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">

                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#168B72]">
                      <Users size={16} />
                    </span>

                    <h3 className="text-sm font-extrabold">
                      Agency Association
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">

                    <div className="rounded-xl bg-[#F7F9FA] p-3">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
                        Agency
                      </p>

                      <p className="mt-1 font-bold text-[#344D59]">
                        {selected
                          .agencyDetails
                          ?.agencyName ||
                          "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F7F9FA] p-3">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
                        Agency Code
                      </p>

                      <p className="mt-1 font-bold text-[#344D59]">
                        {selected
                          .agencyDetails
                          ?.agencyPartnerCode ||
                          "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F7F9FA] p-3">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
                        Owner
                      </p>

                      <p className="mt-1 font-bold text-[#344D59]">
                        {selected
                          .agencyDetails
                          ?.agencyOwnerName ||
                          "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F7F9FA] p-3">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#83959E]">
                        Team Role
                      </p>

                      <p className="mt-1 font-bold text-[#344D59]">
                        {selected.teamRole ||
                          "-"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* IDENTITY DOCUMENTS */}

              <Section
                title="Identity Documents"
                icon={
                  <FileCheck2 size={16} />
                }
              >
                <div className="col-span-1 space-y-2 sm:col-span-2">

                  {(
                    selected.identityDocuments ||
                    []
                  ).length === 0 ? (
                    <div className="rounded-xl bg-[#F7F9FA] p-4 text-center text-[10px] text-[#82949D]">
                      No identity documents
                      uploaded.
                    </div>
                  ) : (
                    (
                      selected.identityDocuments ||
                      []
                    ).map(
                      (document, index) => (
                        <div
                          key={
                            document._id ||
                            `${document.documentType}-${index}`
                          }
                          className="rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
                        >
                          <div className="text-xs font-bold capitalize">
                            {document.documentType ||
                              "Document"}
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2">

                            {document.frontUrl && (
                              <a
                                href={
                                  document.frontUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg bg-[#EAF9F4] px-3 py-2 text-[10px] font-bold text-[#08745F]"
                              >
                                View Front
                              </a>
                            )}

                            {document.backUrl && (
                              <a
                                href={
                                  document.backUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg bg-[#EAF9F4] px-3 py-2 text-[10px] font-bold text-[#08745F]"
                              >
                                View Back
                              </a>
                            )}

                            {!document.frontUrl &&
                              !document.backUrl && (
                                <span className="text-[10px] text-[#8A9AA2]">
                                  No document URL
                                </span>
                              )}
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </Section>
            </div>

            {/* =================================================
                ADMIN ACTIONS
            ================================================= */}

            <div className="sticky bottom-0 border-t border-[#DCE5E9] bg-white p-4 shadow-[0_-5px_20px_rgba(15,23,42,0.04)]">

              <div className="flex flex-wrap gap-2">

                {[
                  "Submitted",
                  "Under_Review",
                  "Action_Required",
                ].includes(
                  selected.applicationStatus
                ) && (
                  <>
                    {/* APPROVE */}

                    <button
                      disabled={
                        actionLoading
                      }
                      onClick={() =>
                        approve(selected)
                      }
                      className="rounded-xl bg-[#1F3C50] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#004D46] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Approve
                    </button>

                    {/* ACTION REQUIRED */}

                    <button
                      disabled={
                        actionLoading
                      }
                      onClick={() =>
                        actionReq(selected)
                      }
                      className="rounded-xl bg-[#FFF8EA] px-4 py-2.5 text-xs font-bold text-[#A76C18] transition hover:bg-[#FFF1D3] disabled:opacity-50"
                    >
                      Action Required
                    </button>

                    {/* REJECT */}

                    <button
                      disabled={
                        actionLoading
                      }
                      onClick={() =>
                        reject(selected)
                      }
                      className="rounded-xl bg-[#FFF2F2] px-4 py-2.5 text-xs font-bold text-[#C74949] transition hover:bg-[#FFE5E5] disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* FINAL VERIFY */}

                {selected.applicationStatus ===
                  "Approved_Not_Verified" && (
                  <button
                    disabled={actionLoading}
                    onClick={() =>
                      verify(selected)
                    }
                    className="rounded-xl bg-[#35C99A] px-4 py-2.5 text-xs font-extrabold text-[#173247] transition hover:bg-[#2EB98E] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Final Verify Partner
                  </button>
                )}

                {selected.applicationStatus ===
                  "Verified" && (
                  <div className="flex items-center gap-2 rounded-xl bg-[#E8F8F1] px-4 py-2.5 text-xs font-bold text-[#16825F]">
                    <ShieldCheck size={15} />

                    Partner Verified
                  </div>
                )}

                {selected.applicationStatus ===
                  "Rejected" && (
                  <div className="rounded-xl bg-[#FFF0F0] px-4 py-2.5 text-xs font-bold text-[#D24A4A]">
                    Application Rejected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

const Section = ({
  title,
  icon,
  children,
}) => (
  <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">
    <div className="mb-3 flex items-center gap-2 text-sm font-extrabold">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#168B72]">
        {icon}
      </span>

      {title}
    </div>

    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {children}
    </div>
  </div>
);

/* =========================================================
   INFO
========================================================= */

const Info = ({ label, value }) => (
  <div className="rounded-xl bg-[#F7F9FA] p-3">
    <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A9AA2]">
      {label}
    </p>

    <p className="mt-1 break-words text-[11px] font-semibold text-[#344D59]">
      {value || "-"}
    </p>
  </div>
);
