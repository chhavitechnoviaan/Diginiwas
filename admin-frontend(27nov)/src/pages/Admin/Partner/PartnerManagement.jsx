// // import { useEffect, useMemo, useState } from "react";
// // import {
// //   Search,
// //   RefreshCw,
// //   Eye,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   WalletCards,
// //   UsersRound,
// //   UserRound,
// //   Building2,
// //   ShieldCheck,
// //   X,
// // } from "lucide-react";
// // import Swal from "sweetalert2";
// // import {
// //   getAllPartnersApi,
// //   getPartnerByIdApi,
// // } from "../../../Services/partnerService";

// // const FILTERS = [
// //   { label: "All Verified", value: "All" },
// //   { label: "Single Partners", value: "single" },
// //   { label: "Team / Agency Owners", value: "team" },
// //   { label: "Sub Partners", value: "subagent" },
// // ];

// // const accountLabel = (p) => {
// //   if (p.accountType === "subagent" || p.isSubPartner) return "Sub Partner";
// //   if (p.accountType === "team") return "Team / Agency Owner";
// //   return "Single Partner";
// // };

// // export default function PartnerManagement() {
// //   const [partners, setPartners] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [accountType, setAccountType] = useState("All");
// //   const [loading, setLoading] = useState(true);
// //   const [selected, setSelected] = useState(null);

// //   const load = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await getAllPartnersApi({
// //         search: search.trim() || undefined,
// //         accountType: accountType === "All" ? undefined : accountType,
// //       });
// //       setPartners(response?.data || []);
// //     } catch (error) {
// //       Swal.fire(
// //         "Error",
// //         error?.response?.data?.message || "Unable to load verified partners",
// //         "error",
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     load();
// //   }, [accountType]);

// //   const stats = useMemo(
// //     () => ({
// //       total: partners.length,
// //       single: partners.filter((x) => x.accountType === "single").length,
// //       team: partners.filter((x) => x.accountType === "team" && !x.isSubPartner)
// //         .length,
// //       sub: partners.filter((x) => x.accountType === "subagent" || x.isSubPartner)
// //         .length,
// //     }),
// //     [partners],
// //   );

// //   const openPartner = async (id) => {
// //     try {
// //       const response = await getPartnerByIdApi(id);
// //       setSelected(response?.data || null);
// //     } catch (error) {
// //       Swal.fire(
// //         "Error",
// //         error?.response?.data?.message || "Unable to load partner details",
// //         "error",
// //       );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#F4F7F8] p-2 text-[#173247] md:p-1">
// //       <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
// //         <div>
// //           <h1 className="text-2xl font-extrabold text-[#173247]">
// //             Partner Management
// //           </h1>
// //           <p className="mt-1 text-xs text-[#8e9da5]">
// //             Only Admin approved + finally verified partners are listed here.
// //           </p>
// //         </div>

// //         <button
// //           onClick={load}
// //           disabled={loading}
// //           className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold disabled:opacity-60"
// //         >
// //           <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
// //           Refresh
// //         </button>
// //       </div>

// //       <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
// //         <Stat label="Verified Partners" value={stats.total} />
// //         <Stat label="Single Partners" value={stats.single} />
// //         <Stat label="Team Owners" value={stats.team} />
// //         <Stat label="Sub Partners" value={stats.sub} />
// //       </div>

// //       <section className="mt-3 rounded-[18px] border border-[#E0E8EC] bg-white p-3">
// //         <div className="flex flex-wrap gap-2">
// //           {FILTERS.map((item) => (
// //             <button
// //               key={item.value}
// //               onClick={() => setAccountType(item.value)}
// //               className={`rounded-xl px-4 py-2.5 text-[11px] font-bold transition ${
// //                 accountType === item.value
// //                   ? "bg-[#1F3C50] text-white"
// //                   : "bg-[#F4F7F8] text-[#6B808A] hover:bg-[#EAF9F4]"
// //               }`}
// //             >
// //               {item.label}
// //             </button>
// //           ))}
// //         </div>

// //         <div className="mt-3 flex gap-2">
// //           <div className="relative flex-1">
// //             <Search
// //               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8BA0AA]"
// //               size={15}
// //             />
// //             <input
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && load()}
// //               placeholder="Search name, Partner ID, email, phone, agency..."
// //               className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none focus:border-[#35C99A]"
// //             />
// //           </div>
// //           <button
// //             onClick={load}
// //             className="rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </section>

// //       <section className="mt-3 overflow-hidden border border-[#E0E8EC] bg-white">
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full text-left">
// //             <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">
// //               <tr>
// //                 <th className="px-4 py-3">Partner</th>
// //                 <th className="px-4 py-3">Type</th>
// //                 <th className="px-4 py-3">Agency / Parent</th>
// //                 <th className="px-4 py-3">Location</th>
// //                 <th className="px-4 py-3">Credits</th>
// //                 <th className="px-4 py-3">Status</th>
// //                 <th className="px-4 py-3 text-right">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-[#EDF2F4]">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="7" className="py-14 text-center text-xs">
// //                     Loading...
// //                   </td>
// //                 </tr>
// //               ) : partners.length === 0 ? (
// //                 <tr>
// //                   <td
// //                     colSpan="7"
// //                     className="py-14 text-center text-xs text-[#71858E]"
// //                   >
// //                     No verified partners found.
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 partners.map((p) => (
// //                   <tr key={p._id} className="hover:bg-[#FAFCFD]">
// //                     <td className="px-4 py-3">
// //                       <div className="text-[12px] font-extrabold">{p.name}</div>
// //                       <div className="mt-1 text-[10px] text-[#82949D]">
// //                         {p.partnerId} · {p.email}
// //                       </div>
// //                     </td>

// //                     <td className="px-4 py-3 text-[10px] font-bold">
// //                       <span className="rounded-full bg-[#EAF9F4] px-2.5 py-1 text-[#16825F]">
// //                         {accountLabel(p)}
// //                       </span>
// //                     </td>

// //                     <td className="px-4 py-3 text-[10px]">
// //                       {p.accountType === "subagent" || p.isSubPartner ? (
// //                         <>
// //                           <div className="font-bold">
// //                             {p.agencyDetails?.agencyName || "-"}
// //                           </div>
// //                           <div className="mt-1 text-[#82949D]">
// //                             {p.agencyDetails?.agencyPartnerCode || "-"} · {p.teamRole}
// //                           </div>
// //                         </>
// //                       ) : p.accountType === "team" ? (
// //                         <>
// //                           <div className="font-bold">
// //                             {p.business?.businessName || p.name}
// //                           </div>
// //                           <div className="mt-1 text-[#82949D]">Agency Owner</div>
// //                         </>
// //                       ) : (
// //                         <span className="text-[#82949D]">Independent</span>
// //                       )}
// //                     </td>

// //                     <td className="px-4 py-3 text-[10px]">
// //                       {p.location?.city || "-"}
// //                       {p.location?.state ? `, ${p.location.state}` : ""}
// //                     </td>

// //                     <td className="px-4 py-3 text-[10px] font-bold">
// //                       {p.accountType === "subagent" || p.isSubPartner ? (
// //                         <div>
// //                           <div className="text-[#16825F]">
// //                             {p.teamCreditAllocation?.availableLimit || 0} allocated
// //                           </div>
// //                           <div className="mt-1 text-[9px] font-medium text-[#82949D]">
// //                             Cannot buy credits
// //                           </div>
// //                         </div>
// //                       ) : (
// //                         `${p.creditWallet?.balance || 0} cr`
// //                       )}
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F8F1] px-2.5 py-1 text-[9px] font-bold text-[#16825F]">
// //                         <ShieldCheck size={11} />
// //                         Verified
// //                       </span>
// //                     </td>

// //                     <td className="px-4 py-3 text-right">
// //                       <button
// //                         onClick={() => openPartner(p._id)}
// //                         className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold hover:bg-[#EAF9F4]"
// //                       >
// //                         <Eye size={13} />
// //                         View
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </section>

// //       {selected && (
// //         <div className="fixed inset-0 z-50 flex justify-end bg-[#0E2736]/50">
// //           <div className="h-full w-full max-w-[650px] overflow-y-auto bg-[#F4F7F8]">
// //             <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DCE5E9] bg-white p-4">
// //               <div>
// //                 <p className="text-[9px] font-bold uppercase text-[#35A98C]">
// //                   {accountLabel(selected)}
// //                 </p>
// //                 <h2 className="text-lg font-extrabold">{selected.name}</h2>
// //                 <p className="text-[10px] text-[#7C8E97]">{selected.partnerId}</p>
// //               </div>
// //               <button onClick={() => setSelected(null)}>
// //                 <X size={18} />
// //               </button>
// //             </div>

// //             <div className="space-y-3 p-4">
// //               <Section title="Contact & Location" icon={<UserRound size={16} />}>
// //                 <Detail icon={<Mail size={13} />} label="Email" value={selected.email} />
// //                 <Detail icon={<Phone size={13} />} label="Phone" value={selected.phone} />
// //                 <Detail
// //                   icon={<MapPin size={13} />}
// //                   label="Location"
// //                   value={`${selected.location?.city || "-"}, ${selected.location?.state || "-"}`}
// //                 />
// //                 <Detail
// //                   icon={<WalletCards size={13} />}
// //                   label="Credits"
// //                   value={
// //                     selected.accountType === "subagent" || selected.isSubPartner
// //                       ? `${selected.teamCreditAllocation?.availableLimit || 0} Team Allocated`
// //                       : `${selected.creditWallet?.balance || 0}`
// //                   }
// //                 />
// //               </Section>

// //               {selected.accountType === "subagent" || selected.isSubPartner ? (
// //                 <Section title="Agency Association" icon={<Building2 size={16} />}>
// //                   <Detail label="Agency" value={selected.agencyDetails?.agencyName} />
// //                   <Detail
// //                     label="Agency Code"
// //                     value={selected.agencyDetails?.agencyPartnerCode}
// //                   />
// //                   <Detail
// //                     label="Agency Owner"
// //                     value={selected.agencyDetails?.agencyOwnerName}
// //                   />
// //                   <Detail label="Team Role" value={selected.teamRole} />
// //                 </Section>
// //               ) : null}

// //               {selected.accountType === "team" && !selected.isSubPartner ? (
// //                 <Section title="Sub Partners" icon={<UsersRound size={16} />}>
// //                   <div className="col-span-1 space-y-2 sm:col-span-2">
// //                     {(selected.teamMembers || []).length === 0 ? (
// //                       <p className="rounded-xl bg-[#F7F9FA] p-4 text-[10px] text-[#82949D]">
// //                         No Sub Partners yet.
// //                       </p>
// //                     ) : (
// //                       selected.teamMembers.map((m) => (
// //                         <div
// //                           key={m._id}
// //                           className="rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
// //                         >
// //                           <div className="flex items-center justify-between gap-2">
// //                             <div>
// //                               <p className="text-[11px] font-extrabold">{m.name}</p>
// //                               <p className="mt-1 text-[9px] text-[#82949D]">
// //                                 {m.partnerId} · {m.teamRole} · {m.applicationStatus?.replaceAll("_", " ")}
// //                               </p>
// //                             </div>
// //                             <span
// //                               className={`rounded-full px-2 py-1 text-[8px] font-bold ${
// //                                 m.isVerified
// //                                   ? "bg-[#E8F8F1] text-[#16825F]"
// //                                   : "bg-[#FFF7E8] text-[#B97614]"
// //                               }`}
// //                             >
// //                               {m.isVerified ? "Verified" : "Pending Verification"}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       ))
// //                     )}
// //                   </div>
// //                 </Section>
// //               ) : null}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const Stat = ({ label, value }) => (
// //   <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">
// //     <p className="text-[9px] font-bold uppercase text-[#83959E]">{label}</p>
// //     <p className="mt-2 text-2xl font-extrabold text-[#173247]">{value}</p>
// //   </div>
// // );

// // const Section = ({ title, icon, children }) => (
// //   <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">
// //     <div className="mb-3 flex items-center gap-2 text-sm font-extrabold">
// //       <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#168B72]">
// //         {icon}
// //       </span>
// //       {title}
// //     </div>
// //     <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{children}</div>
// //   </div>
// // );

// // const Detail = ({ icon, label, value }) => (
// //   <div className="rounded-xl bg-[#F7F9FA] p-3">
// //     <div className="flex items-center gap-2 text-[#8A9AA2]">
// //       {icon}
// //       <p className="text-[9px] font-bold uppercase tracking-wider">{label}</p>
// //     </div>
// //     <p className="mt-1 break-words text-[11px] font-semibold text-[#344D59]">
// //       {value || "-"}
// //     </p>
// //   </div>
// // );

// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   Search,
//   RefreshCw,
//   Eye,
//   Mail,
//   Phone,
//   MapPin,
//   WalletCards,
//   UsersRound,
//   UserRound,
//   Building2,
//   ShieldCheck,
//   X,
//   Home,
//   BadgeCheck,
//   ArrowUpRight,
//   UserCheck,
//   MapPinned,
// } from "lucide-react";

// import Swal from "sweetalert2";

// import {
//   getAllPartnersApi,
//   getPartnerByIdApi,
// } from "../../../Services/partnerService";


// const FILTERS = [
//   {
//     label: "All Verified",
//     value: "All",
//   },
//   {
//     label: "Single Partners",
//     value: "single",
//   },
//   {
//     label: "Team / Agency Owners",
//     value: "team",
//   },
//   {
//     label: "Sub Partners",
//     value: "subagent",
//   },
// ];


// const accountLabel = (p) => {
//   if (
//     p?.accountType === "subagent" ||
//     p?.isSubPartner
//   ) {
//     return "Sub Partner";
//   }

//   if (p?.accountType === "team") {
//     return "Team / Agency Owner";
//   }

//   return "Single Partner";
// };


// const formatPrice = (value) => {
//   const price = Number(value || 0);

//   if (!price) return "Price not added";

//   if (price >= 10000000) {
//     return `₹${(
//       price / 10000000
//     ).toFixed(2)} Cr`;
//   }

//   if (price >= 100000) {
//     return `₹${(
//       price / 100000
//     ).toFixed(2)} L`;
//   }

//   return `₹${price.toLocaleString(
//     "en-IN"
//   )}`;
// };


// const resolveAddedProperties = (
//   partner
// ) => {
//   const candidates = [
//     partner?.addedProperties,
//     partner?.propertiesAdded,
//     partner?.createdProperties,
//     partner?.properties,
//     partner?.propertyListings,
//   ];

//   const list =
//     candidates.find(Array.isArray) || [];

//   return list.filter(Boolean);
// };


// const resolvePropertyId = (
//   property
// ) =>
//   property?._id ||
//   property?.id ||
//   property?.propertyMongoId ||
//   property?.propertyId?._id ||
//   null;


// const resolveAssignedPartner = (
//   property
// ) => {
//   const direct =
//     property?.assignedPartner ||
//     property?.partnerAssigned ||
//     property?.assignedToPartner ||
//     property?.assignedPartnerDetails ||
//     property?.partner;

//   if (direct) {
//     return {
//       _id:
//         direct?._id ||
//         direct?.id ||
//         direct?.partnerMongoId ||
//         direct?.partnerId?._id ||
//         null,

//       partnerId:
//         direct?.partnerId ||
//         direct?.partnerCode ||
//         direct?.code ||
//         "",

//       name:
//         direct?.name ||
//         direct?.partnerName ||
//         "Assigned Partner",

//       accountType:
//         direct?.accountType ||
//         direct?.partnerType ||
//         "",
//     };
//   }

//   const partnerId =
//     property?.assignedPartnerId;

//   if (
//     partnerId &&
//     typeof partnerId === "object"
//   ) {
//     return {
//       _id:
//         partnerId._id ||
//         partnerId.id ||
//         null,

//       partnerId:
//         partnerId.partnerId ||
//         partnerId.partnerCode ||
//         "",

//       name:
//         partnerId.name ||
//         "Assigned Partner",

//       accountType:
//         partnerId.accountType || "",
//     };
//   }

//   return null;
// };


// export default function PartnerManagement({
//   initialPartnerId = null,
//   onPartnerDetailClose,
// }) {
//   const navigate = useNavigate();

//   const [partners, setPartners] =
//     useState([]);

//   const [search, setSearch] =
//     useState("");

//   const [
//     accountType,
//     setAccountType,
//   ] = useState("All");

//   const [loading, setLoading] =
//     useState(true);

//   const [selected, setSelected] =
//     useState(null);

//   const [
//     detailLoading,
//     setDetailLoading,
//   ] = useState(false);


//   const load = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await getAllPartnersApi({
//           search:
//             search.trim() ||
//             undefined,

//           accountType:
//             accountType === "All"
//               ? undefined
//               : accountType,
//         });

//       setPartners(
//         response?.data || []
//       );

//     } catch (error) {

//       Swal.fire(
//         "Error",
//         error?.response?.data
//           ?.message ||
//           "Unable to load verified partners",
//         "error"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     load();
//   }, [accountType]);


//   const openPartner =
//     async (
//       id,
//       updateUrl = true
//     ) => {

//     if (!id) return;

//     try {
//       setDetailLoading(true);

//       const response =
//         await getPartnerByIdApi(id);

//       const data =
//         response?.data || null;

//       setSelected(data);

//       if (updateUrl) {
//         navigate(
//           `/partnerdashboard?tab=management&partnerId=${id}`,
//           { replace: true }
//         );
//       }

//     } catch (error) {

//       Swal.fire(
//         "Error",
//         error?.response?.data
//           ?.message ||
//           "Unable to load partner details",
//         "error"
//       );

//     } finally {
//       setDetailLoading(false);
//     }
//   };


//   useEffect(() => {
//     if (!initialPartnerId) {
//       return;
//     }

//     openPartner(
//       initialPartnerId,
//       false
//     );

//   }, [initialPartnerId]);


//   const closePartner = () => {
//     setSelected(null);

//     if (onPartnerDetailClose) {
//       onPartnerDetailClose();
//       return;
//     }

//     navigate(
//       "/partnerdashboard?tab=management",
//       { replace: true }
//     );
//   };


//   const viewProperty = (
//     property
//   ) => {
//     const id =
//       resolvePropertyId(property);

//     if (!id) {
//       Swal.fire(
//         "Property unavailable",
//         "MongoDB property ID is missing.",
//         "info"
//       );

//       return;
//     }

//     navigate(
//       `/property-management/${id}`
//     );
//   };


//   const viewAssignedPartner = (
//     property
//   ) => {
//     const assigned =
//       resolveAssignedPartner(
//         property
//       );

//     if (!assigned?._id) {
//       Swal.fire(
//         "Partner unavailable",
//         "Assigned partner detail ID is not available.",
//         "info"
//       );

//       return;
//     }

//     setSelected(null);

//     navigate(
//       `/partnerdashboard?tab=management&partnerId=${assigned._id}`
//     );
//   };


//   const stats = useMemo(
//     () => ({
//       total: partners.length,

//       single:
//         partners.filter(
//           (x) =>
//             x.accountType ===
//             "single"
//         ).length,

//       team:
//         partners.filter(
//           (x) =>
//             x.accountType ===
//               "team" &&
//             !x.isSubPartner
//         ).length,

//       sub:
//         partners.filter(
//           (x) =>
//             x.accountType ===
//               "subagent" ||
//             x.isSubPartner
//         ).length,
//     }),
//     [partners]
//   );


//   return (
//     <div className="min-h-screen bg-[#F4F7F8] p-2 text-[#173247] md:p-1">

//       <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="text-2xl font-extrabold text-[#173247]">
//             Partner Management
//           </h1>

//           <p className="mt-1 text-xs text-[#8e9da5]">
//             Verified partners, their added properties and property assignments.
//           </p>
//         </div>

//         <button
//           onClick={load}
//           disabled={loading}
//           className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold disabled:opacity-60"
//         >
//           <RefreshCw
//             size={15}
//             className={
//               loading
//                 ? "animate-spin"
//                 : ""
//             }
//           />

//           Refresh
//         </button>
//       </div>


//       <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         <Stat
//           label="Verified Partners"
//           value={stats.total}
//         />

//         <Stat
//           label="Single Partners"
//           value={stats.single}
//         />

//         <Stat
//           label="Team Owners"
//           value={stats.team}
//         />

//         <Stat
//           label="Sub Partners"
//           value={stats.sub}
//         />
//       </div>


//       <section className="mt-3 rounded-[18px] border border-[#E0E8EC] bg-white p-3">

//         <div className="flex flex-wrap gap-2">
//           {FILTERS.map(
//             (item) => (
//               <button
//                 key={item.value}
//                 onClick={() =>
//                   setAccountType(
//                     item.value
//                   )
//                 }
//                 className={`rounded-xl px-4 py-2.5 text-[11px] font-bold transition ${
//                   accountType ===
//                   item.value
//                     ? "bg-[#1F3C50] text-white"
//                     : "bg-[#F4F7F8] text-[#6B808A] hover:bg-[#EAF9F4]"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             )
//           )}
//         </div>


//         <div className="mt-3 flex gap-2">

//           <div className="relative flex-1">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8BA0AA]"
//               size={15}
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               onKeyDown={(e) =>
//                 e.key === "Enter" &&
//                 load()
//               }
//               placeholder="Search name, Partner ID, email, phone, agency..."
//               className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none focus:border-[#35C99A]"
//             />
//           </div>

//           <button
//             onClick={load}
//             className="rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold"
//           >
//             Search
//           </button>

//         </div>
//       </section>


//       <section className="mt-3 overflow-hidden border border-[#E0E8EC] bg-white">

//         <div className="overflow-x-auto">

//           <table className="min-w-full text-left">

//             <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">

//               <tr>
//                 <th className="px-4 py-3">
//                   Partner
//                 </th>

//                 <th className="px-4 py-3">
//                   Type
//                 </th>

//                 <th className="px-4 py-3">
//                   Agency / Parent
//                 </th>

//                 <th className="px-4 py-3">
//                   Location
//                 </th>

//                 <th className="px-4 py-3">
//                   Credits
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
//                     colSpan="7"
//                     className="py-14 text-center text-xs"
//                   >
//                     Loading...
//                   </td>
//                 </tr>

//               ) : partners.length ===
//                 0 ? (

//                 <tr>
//                   <td
//                     colSpan="7"
//                     className="py-14 text-center text-xs text-[#71858E]"
//                   >
//                     No verified partners
//                     found.
//                   </td>
//                 </tr>

//               ) : (

//                 partners.map((p) => (

//                   <tr
//                     key={p._id}
//                     className="hover:bg-[#FAFCFD]"
//                   >

//                     <td className="px-4 py-3">

//                       <div className="text-[12px] font-extrabold">
//                         {p.name}
//                       </div>

//                       <div className="mt-1 text-[10px] text-[#82949D]">
//                         {p.partnerId} ·{" "}
//                         {p.email}
//                       </div>

//                     </td>


//                     <td className="px-4 py-3 text-[10px] font-bold">

//                       <span className="rounded-full bg-[#EAF9F4] px-2.5 py-1 text-[#16825F]">
//                         {accountLabel(p)}
//                       </span>

//                     </td>


//                     <td className="px-4 py-3 text-[10px]">

//                       {p.accountType ===
//                         "subagent" ||
//                       p.isSubPartner ? (

//                         <>
//                           <div className="font-bold">
//                             {p
//                               .agencyDetails
//                               ?.agencyName ||
//                               "-"}
//                           </div>

//                           <div className="mt-1 text-[#82949D]">
//                             {p
//                               .agencyDetails
//                               ?.agencyPartnerCode ||
//                               "-"}{" "}
//                             · {p.teamRole}
//                           </div>
//                         </>

//                       ) : p.accountType ===
//                         "team" ? (

//                         <>
//                           <div className="font-bold">
//                             {p.business
//                               ?.businessName ||
//                               p.name}
//                           </div>

//                           <div className="mt-1 text-[#82949D]">
//                             Agency Owner
//                           </div>
//                         </>

//                       ) : (

//                         <span className="text-[#82949D]">
//                           Independent
//                         </span>

//                       )}

//                     </td>


//                     <td className="px-4 py-3 text-[10px]">
//                       {p.location?.city ||
//                         "-"}

//                       {p.location?.state
//                         ? `, ${p.location.state}`
//                         : ""}
//                     </td>


//                     <td className="px-4 py-3 text-[10px] font-bold">

//                       {p.accountType ===
//                         "subagent" ||
//                       p.isSubPartner ? (

//                         <div>
//                           <div className="text-[#16825F]">
//                             {p
//                               .teamCreditAllocation
//                               ?.availableLimit ||
//                               0}{" "}
//                             allocated
//                           </div>

//                           <div className="mt-1 text-[9px] font-medium text-[#82949D]">
//                             Cannot buy credits
//                           </div>
//                         </div>

//                       ) : (

//                         `${p.creditWallet?.balance || 0} cr`

//                       )}

//                     </td>


//                     <td className="px-4 py-3">

//                       <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F8F1] px-2.5 py-1 text-[9px] font-bold text-[#16825F]">
//                         <ShieldCheck
//                           size={11}
//                         />
//                         Verified
//                       </span>

//                     </td>


//                     <td className="px-4 py-3 text-right">

//                       <button
//                         onClick={() =>
//                           openPartner(
//                             p._id
//                           )
//                         }
//                         className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold hover:bg-[#EAF9F4]"
//                       >
//                         <Eye size={13} />
//                         View
//                       </button>

//                     </td>

//                   </tr>

//                 ))

//               )}

//             </tbody>

//           </table>

//         </div>
//       </section>


//       {(selected ||
//         detailLoading) && (

//         <div className="fixed inset-0 z-[100] flex justify-end bg-[#0E2736]/55 backdrop-blur-[2px]">

//           <div className="h-full w-full max-w-[760px] overflow-y-auto bg-[#F4F7F8] shadow-2xl">

//             {detailLoading &&
//             !selected ? (

//               <div className="flex h-full items-center justify-center">
//                 <RefreshCw className="animate-spin text-[#35C99A]" />
//               </div>

//             ) : (

//               <>
//                 <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#DCE5E9] bg-[#1F3C50] p-5 text-white">

//                   <div>

//                     <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7EE6C6]">
//                       {accountLabel(
//                         selected
//                       )}
//                     </p>

//                     <h2 className="mt-1 text-xl font-extrabold">
//                       {selected?.name}
//                     </h2>

//                     <p className="mt-1 text-[10px] text-white/60">
//                       {selected?.partnerId}
//                     </p>

//                   </div>


//                   <button
//                     onClick={
//                       closePartner
//                     }
//                     className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20"
//                   >
//                     <X size={18} />
//                   </button>

//                 </div>


//                 <div className="space-y-3 p-4">

//                   <Section
//                     title="Contact & Location"
//                     icon={
//                       <UserRound
//                         size={16}
//                       />
//                     }
//                   >

//                     <Detail
//                       icon={
//                         <Mail size={13} />
//                       }
//                       label="Email"
//                       value={
//                         selected?.email
//                       }
//                     />

//                     <Detail
//                       icon={
//                         <Phone size={13} />
//                       }
//                       label="Phone"
//                       value={
//                         selected?.phone
//                       }
//                     />

//                     <Detail
//                       icon={
//                         <MapPin size={13} />
//                       }
//                       label="Location"
//                       value={`${selected?.location?.city || "-"}, ${selected?.location?.state || "-"}`}
//                     />

//                     <Detail
//                       icon={
//                         <WalletCards
//                           size={13}
//                         />
//                       }
//                       label="Credits"
//                       value={
//                         selected
//                           ?.accountType ===
//                           "subagent" ||
//                         selected?.isSubPartner
//                           ? `${selected?.teamCreditAllocation?.availableLimit || 0} Team Allocated`
//                           : `${selected?.creditWallet?.balance || 0}`
//                       }
//                     />

//                   </Section>


//                   {(selected?.accountType ===
//                     "subagent" ||
//                     selected?.isSubPartner) && (

//                     <Section
//                       title="Agency Association"
//                       icon={
//                         <Building2
//                           size={16}
//                         />
//                       }
//                     >

//                       <Detail
//                         label="Agency"
//                         value={
//                           selected
//                             ?.agencyDetails
//                             ?.agencyName
//                         }
//                       />

//                       <Detail
//                         label="Agency Code"
//                         value={
//                           selected
//                             ?.agencyDetails
//                             ?.agencyPartnerCode
//                         }
//                       />

//                       <Detail
//                         label="Agency Owner"
//                         value={
//                           selected
//                             ?.agencyDetails
//                             ?.agencyOwnerName
//                         }
//                       />

//                       <Detail
//                         label="Team Role"
//                         value={
//                           selected
//                             ?.teamRole
//                         }
//                       />

//                     </Section>

//                   )}


//                   {selected?.accountType ===
//                     "team" &&
//                     !selected?.isSubPartner && (

//                     <Section
//                       title="Sub Partners"
//                       icon={
//                         <UsersRound
//                           size={16}
//                         />
//                       }
//                     >

//                       <div className="col-span-1 space-y-2 sm:col-span-2">

//                         {(selected?.teamMembers ||
//                           []).length ===
//                         0 ? (

//                           <p className="rounded-xl bg-[#F7F9FA] p-4 text-[10px] text-[#82949D]">
//                             No Sub Partners yet.
//                           </p>

//                         ) : (

//                           selected.teamMembers.map(
//                             (m) => (

//                               <div
//                                 key={
//                                   m._id
//                                 }
//                                 className="flex items-center justify-between gap-3 rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
//                               >

//                                 <div>
//                                   <p className="text-[11px] font-extrabold">
//                                     {
//                                       m.name
//                                     }
//                                   </p>

//                                   <p className="mt-1 text-[9px] text-[#82949D]">
//                                     {
//                                       m.partnerId
//                                     }{" "}
//                                     ·{" "}
//                                     {
//                                       m.teamRole
//                                     }
//                                   </p>
//                                 </div>


//                                 <button
//                                   onClick={() =>
//                                     navigate(
//                                       `/partnerdashboard?tab=management&partnerId=${m._id}`
//                                     )
//                                   }
//                                   className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] bg-white px-3 py-2 text-[9px] font-bold text-[#16825F] hover:bg-[#EAF9F4]"
//                                 >
//                                   <Eye
//                                     size={
//                                       12
//                                     }
//                                   />
//                                   View Partner
//                                 </button>

//                               </div>

//                             )
//                           )

//                         )}

//                       </div>

//                     </Section>

//                   )}


//                   <PartnerPropertiesSection
//                     partner={selected}
//                     onViewProperty={
//                       viewProperty
//                     }
//                     onViewAssignedPartner={
//                       viewAssignedPartner
//                     }
//                   />

//                 </div>
//               </>
//             )}

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


// function PartnerPropertiesSection({
//   partner,
//   onViewProperty,
//   onViewAssignedPartner,
// }) {
//   const properties =
//     resolveAddedProperties(
//       partner
//     );

//   return (
//     <Section
//       title="Properties Added By Partner"
//       icon={<Home size={16} />}
//     >

//       <div className="col-span-1 space-y-3 sm:col-span-2">

//         <div className="flex items-center justify-between rounded-xl bg-[#EAF9F4] px-3 py-2">

//           <div>
//             <p className="text-[9px] font-bold uppercase text-[#16825F]">
//               Added Properties
//             </p>

//             <p className="mt-1 text-lg font-extrabold text-[#173247]">
//               {properties.length}
//             </p>
//           </div>

//           <Home className="text-[#35C99A]" />

//         </div>


//         {properties.length ===
//         0 ? (

//           <div className="rounded-xl border border-dashed border-[#DCE5E9] bg-[#FAFCFD] p-5 text-center">

//             <Home
//               size={22}
//               className="mx-auto text-[#A4B2B9]"
//             />

//             <p className="mt-2 text-[10px] font-semibold text-[#82949D]">
//               No properties added by this
//               partner.
//             </p>

//           </div>

//         ) : (

//           properties.map(
//             (property, index) => {

//               const assigned =
//                 resolveAssignedPartner(
//                   property
//                 );

//               return (
//                 <article
//                   key={
//                     resolvePropertyId(
//                       property
//                     ) ||
//                     property.propertyId ||
//                     index
//                   }
//                   className="overflow-hidden rounded-2xl border border-[#DCE5E9] bg-white"
//                 >

//                   <div className="flex flex-col gap-3 p-3 sm:flex-row">

//                     <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-[#EEF3F5] sm:w-32">

//                       {property
//                         ?.images?.[0]
//                         ?.url ? (

//                         <img
//                           src={
//                             property
//                               .images[0]
//                               .url
//                           }
//                           alt={
//                             property.title ||
//                             "Property"
//                           }
//                           className="h-full w-full object-cover"
//                         />

//                       ) : (

//                         <div className="flex h-full items-center justify-center">
//                           <Home className="text-[#A4B2B9]" />
//                         </div>

//                       )}

//                     </div>


//                     <div className="min-w-0 flex-1">

//                       <div className="flex flex-wrap items-start justify-between gap-2">

//                         <div>

//                           <p className="line-clamp-1 text-[12px] font-extrabold text-[#173247]">
//                             {property.title ||
//                               "Untitled Property"}
//                           </p>

//                           <p className="mt-1 text-[9px] font-bold text-[#16825F]">
//                             {property.propertyId ||
//                               "Property ID unavailable"}
//                           </p>

//                         </div>


//                         <span className="rounded-full bg-[#F4F7F8] px-2.5 py-1 text-[8px] font-bold text-[#607681]">
//                           {property.status ||
//                             "—"}
//                         </span>

//                       </div>


//                       <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-[#82949D]">

//                         <span className="inline-flex items-center gap-1">
//                           <MapPinned
//                             size={
//                               10
//                             }
//                           />
//                           {[
//                             property.locality,
//                             property.city,
//                           ]
//                             .filter(
//                               Boolean
//                             )
//                             .join(
//                               ", "
//                             ) || "-"}
//                         </span>

//                         <span className="font-bold text-[#173247]">
//                           {formatPrice(
//                             property.price
//                           )}
//                         </span>

//                       </div>


//                       <div className="mt-3 rounded-xl bg-[#F7F9FA] p-2.5">

//                         <p className="text-[8px] font-bold uppercase tracking-wide text-[#8A9AA2]">
//                           Assigned Partner
//                         </p>

//                         {assigned ? (

//                           <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">

//                             <div>
//                               <p className="text-[10px] font-extrabold text-[#173247]">
//                                 {
//                                   assigned.name
//                                 }
//                               </p>

//                               <p className="mt-0.5 text-[8px] text-[#82949D]">
//                                 {assigned.partnerId ||
//                                   "Partner ID unavailable"}
//                               </p>
//                             </div>


//                             {assigned._id && (

//                               <button
//                                 onClick={() =>
//                                   onViewAssignedPartner(
//                                     property
//                                   )
//                                 }
//                                 className="inline-flex items-center gap-1 rounded-lg border border-[#CDEFE4] bg-[#EAF9F4] px-2.5 py-1.5 text-[8px] font-bold text-[#16825F]"
//                               >
//                                 <UserCheck
//                                   size={
//                                     11
//                                   }
//                                 />
//                                 View Partner
//                               </button>

//                             )}

//                           </div>

//                         ) : (

//                           <p className="mt-1 text-[9px] font-semibold text-[#A0ADB3]">
//                             No partner assigned
//                           </p>

//                         )}

//                       </div>


//                       <button
//                         onClick={() =>
//                           onViewProperty(
//                             property
//                           )
//                         }
//                         className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#1F3C50] px-3 text-[9px] font-bold text-white transition hover:bg-[#173247]"
//                       >
//                         <Eye size={12} />
//                         View Property
//                         <ArrowUpRight
//                           size={11}
//                         />
//                       </button>

//                     </div>

//                   </div>

//                 </article>
//               );
//             }
//           )

//         )}

//       </div>

//     </Section>
//   );
// }


// const Stat = ({
//   label,
//   value,
// }) => (
//   <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">

//     <p className="text-[9px] font-bold uppercase text-[#83959E]">
//       {label}
//     </p>

//     <p className="mt-2 text-2xl font-extrabold text-[#173247]">
//       {value}
//     </p>

//   </div>
// );


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


// const Detail = ({
//   icon,
//   label,
//   value,
// }) => (
//   <div className="rounded-xl bg-[#F7F9FA] p-3">

//     <div className="flex items-center gap-2 text-[#8A9AA2]">
//       {icon}

//       <p className="text-[9px] font-bold uppercase tracking-wider">
//         {label}
//       </p>
//     </div>

//     <p className="mt-1 break-words text-[11px] font-semibold text-[#344D59]">
//       {value || "-"}
//     </p>

//   </div>
// );



// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   Search,
//   RefreshCw,
//   Eye,
//   Mail,
//   Phone,
//   MapPin,
//   WalletCards,
//   UsersRound,
//   UserRound,
//   Building2,
//   ShieldCheck,
//   X,
//   Home,
//   BadgeCheck,
//   ArrowUpRight,
//   UserCheck,
//   MapPinned,
// } from "lucide-react";

// import Swal from "sweetalert2";

// import {
//   getAllPartnersApi,
//   getPartnerByIdApi,
// } from "../../../Services/partnerService";

// import {
//   getAllPropertiesApi,
// } from "../../../Services/propertyService";


// const FILTERS = [
//   {
//     label: "All Verified",
//     value: "All",
//   },
//   {
//     label: "Single Partners",
//     value: "single",
//   },
//   {
//     label: "Team / Agency Owners",
//     value: "team",
//   },
//   {
//     label: "Sub Partners",
//     value: "subagent",
//   },
// ];


// const accountLabel = (p) => {
//   if (
//     p?.accountType === "subagent" ||
//     p?.isSubPartner
//   ) {
//     return "Sub Partner";
//   }

//   if (p?.accountType === "team") {
//     return "Team / Agency Owner";
//   }

//   return "Single Partner";
// };


// const formatPrice = (value) => {
//   const price = Number(value || 0);

//   if (!price) return "Price not added";

//   if (price >= 10000000) {
//     return `₹${(
//       price / 10000000
//     ).toFixed(2)} Cr`;
//   }

//   if (price >= 100000) {
//     return `₹${(
//       price / 100000
//     ).toFixed(2)} L`;
//   }

//   return `₹${price.toLocaleString(
//     "en-IN"
//   )}`;
// };


// const resolveAddedProperties = (
//   partner
// ) => {
//   const candidates = [
//     partner?.addedProperties,
//     partner?.propertiesAdded,
//     partner?.createdProperties,
//     partner?.properties,
//     partner?.propertyListings,
//   ];

//   const list =
//     candidates.find(Array.isArray) || [];

//   return list.filter(Boolean);
// };


// const resolvePropertyId = (
//   property
// ) =>
//   property?._id ||
//   property?.id ||
//   property?.propertyMongoId ||
//   property?.propertyId?._id ||
//   null;


// const resolveAssignedPartner = (
//   property
// ) => {
//   const direct =
//     property?.assignedPartner ||
//     property?.partnerAssigned ||
//     property?.assignedToPartner ||
//     property?.assignedPartnerDetails ||
//     property?.partner;

//   if (direct) {
//     return {
//       _id:
//         direct?._id ||
//         direct?.id ||
//         direct?.partnerMongoId ||
//         direct?.partnerId?._id ||
//         direct?.partnerId ||
//         null,

//       partnerId:
//         direct?.partnerCode ||
//         direct?.code ||
//         (typeof direct?.partnerId === "string"
//           ? direct.partnerId
//           : direct?.partnerId?.partnerId) ||
//         "",

//       name:
//         direct?.name ||
//         direct?.partnerName ||
//         "Assigned Partner",

//       accountType:
//         direct?.accountType ||
//         direct?.partnerType ||
//         "",
//     };
//   }

//   const partnerId =
//     property?.assignedPartnerId;

//   if (
//     partnerId &&
//     typeof partnerId === "object"
//   ) {
//     return {
//       _id:
//         partnerId._id ||
//         partnerId.id ||
//         null,

//       partnerId:
//         partnerId.partnerId ||
//         partnerId.partnerCode ||
//         "",

//       name:
//         partnerId.name ||
//         "Assigned Partner",

//       accountType:
//         partnerId.accountType || "",
//     };
//   }

//   return null;
// };


// export default function PartnerManagement({
//   initialPartnerId = null,
//   onPartnerDetailClose,
// }) {
//   const navigate = useNavigate();

//   const [partners, setPartners] =
//     useState([]);

//   const [search, setSearch] =
//     useState("");

//   const [
//     accountType,
//     setAccountType,
//   ] = useState("All");

//   const [loading, setLoading] =
//     useState(true);

//   const [selected, setSelected] =
//     useState(null);

//   const [
//     detailLoading,
//     setDetailLoading,
//   ] = useState(false);


//   const load = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await getAllPartnersApi({
//           search:
//             search.trim() ||
//             undefined,

//           accountType:
//             accountType === "All"
//               ? undefined
//               : accountType,
//         });

//       setPartners(
//         response?.data || []
//       );

//     } catch (error) {

//       Swal.fire(
//         "Error",
//         error?.response?.data
//           ?.message ||
//           "Unable to load verified partners",
//         "error"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     load();
//   }, [accountType]);


//   const openPartner =
//     async (
//       id,
//       updateUrl = true
//     ) => {

//     if (!id) return;

//     try {
//       setDetailLoading(true);

//       // =========================================================
//       // 1. PARTNER DETAIL + ALL PROPERTIES PARALLEL FETCH
//       // =========================================================
//       const [
//         partnerResponse,
//         propertiesResponse,
//       ] = await Promise.all([
//         getPartnerByIdApi(id),
//         getAllPropertiesApi(),
//       ]);

//       const partnerData =
//         partnerResponse?.data || null;

//       if (!partnerData) {
//         throw new Error(
//           "Partner details not found"
//         );
//       }

//       const allProperties =
//         Array.isArray(
//           propertiesResponse?.data
//         )
//           ? propertiesResponse.data
//           : [];

//       // =========================================================
//       // 2. ONLY THOSE PROPERTIES WHICH THIS PARTNER CREATED
//       //
//       // Property DB:
//       // addedBy.userId = Partner MongoDB _id
//       //
//       // Example:
//       // partner._id:
//       // 6a8d745f6398551e22344fe2
//       //
//       // property.addedBy.userId:
//       // 6a8d745f6398551e22344fe2
//       // =========================================================
//       const addedProperties =
//         allProperties.filter(
//           (property) => {
//             const addedByUserId =
//               property?.addedBy
//                 ?.userId;

//             if (!addedByUserId) {
//               return false;
//             }

//             return (
//               String(
//                 addedByUserId
//               ) === String(id)
//             );
//           }
//         );

//       console.log(
//         "PARTNER DETAIL:",
//         partnerData
//       );

//       console.log(
//         "ALL PROPERTIES:",
//         allProperties
//       );

//       console.log(
//         "PARTNER ADDED PROPERTIES:",
//         addedProperties
//       );

//       // =========================================================
//       // 3. ATTACH FILTERED PROPERTIES TO PARTNER DETAIL
//       // =========================================================
//       setSelected({
//         ...partnerData,

//         addedProperties,

//         addedPropertiesCount:
//           addedProperties.length,
//       });

//       if (updateUrl) {
//         navigate(
//           `/partnerdashboard?tab=management&partnerId=${id}`,
//           { replace: true }
//         );
//       }

//     } catch (error) {

//       console.error(
//         "OPEN PARTNER DETAIL ERROR:",
//         error
//       );

//       Swal.fire(
//         "Error",
//         error?.response?.data
//           ?.message ||
//           error?.message ||
//           "Unable to load partner details",
//         "error"
//       );

//     } finally {
//       setDetailLoading(false);
//     }
//   };


//   useEffect(() => {
//     if (!initialPartnerId) {
//       return;
//     }

//     openPartner(
//       initialPartnerId,
//       false
//     );

//   }, [initialPartnerId]);


//   const closePartner = () => {
//     setSelected(null);

//     if (onPartnerDetailClose) {
//       onPartnerDetailClose();
//       return;
//     }

//     navigate(
//       "/partnerdashboard?tab=management",
//       { replace: true }
//     );
//   };


//   const viewProperty = (
//     property
//   ) => {
//     const id =
//       resolvePropertyId(property);

//     if (!id) {
//       Swal.fire(
//         "Property unavailable",
//         "MongoDB property ID is missing.",
//         "info"
//       );

//       return;
//     }

//     navigate(
//       `/property-management/${id}`
//     );
//   };


//   const viewAssignedPartner = (
//     property
//   ) => {
//     const assigned =
//       resolveAssignedPartner(
//         property
//       );

//     if (!assigned?._id) {
//       Swal.fire(
//         "Partner unavailable",
//         "Assigned partner detail ID is not available.",
//         "info"
//       );

//       return;
//     }

//     setSelected(null);

//     navigate(
//       `/partnerdashboard?tab=management&partnerId=${assigned._id}`
//     );
//   };


//   const stats = useMemo(
//     () => ({
//       total: partners.length,

//       single:
//         partners.filter(
//           (x) =>
//             x.accountType ===
//             "single"
//         ).length,

//       team:
//         partners.filter(
//           (x) =>
//             x.accountType ===
//               "team" &&
//             !x.isSubPartner
//         ).length,

//       sub:
//         partners.filter(
//           (x) =>
//             x.accountType ===
//               "subagent" ||
//             x.isSubPartner
//         ).length,
//     }),
//     [partners]
//   );


//   return (
//     <div className="min-h-screen bg-[#F4F7F8] p-2 text-[#173247] md:p-1">

//       <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="text-2xl font-extrabold text-[#173247]">
//             Partner Management
//           </h1>

//           <p className="mt-1 text-xs text-[#8e9da5]">
//             Verified partners, their added properties and property assignments.
//           </p>
//         </div>

//         <button
//           onClick={load}
//           disabled={loading}
//           className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold disabled:opacity-60"
//         >
//           <RefreshCw
//             size={15}
//             className={
//               loading
//                 ? "animate-spin"
//                 : ""
//             }
//           />

//           Refresh
//         </button>
//       </div>


//       <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         <Stat
//           label="Verified Partners"
//           value={stats.total}
//         />

//         <Stat
//           label="Single Partners"
//           value={stats.single}
//         />

//         <Stat
//           label="Team Owners"
//           value={stats.team}
//         />

//         <Stat
//           label="Sub Partners"
//           value={stats.sub}
//         />
//       </div>


//       <section className="mt-3 rounded-[18px] border border-[#E0E8EC] bg-white p-3">

//         <div className="flex flex-wrap gap-2">
//           {FILTERS.map(
//             (item) => (
//               <button
//                 key={item.value}
//                 onClick={() =>
//                   setAccountType(
//                     item.value
//                   )
//                 }
//                 className={`rounded-xl px-4 py-2.5 text-[11px] font-bold transition ${
//                   accountType ===
//                   item.value
//                     ? "bg-[#1F3C50] text-white"
//                     : "bg-[#F4F7F8] text-[#6B808A] hover:bg-[#EAF9F4]"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             )
//           )}
//         </div>


//         <div className="mt-3 flex gap-2">

//           <div className="relative flex-1">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8BA0AA]"
//               size={15}
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               onKeyDown={(e) =>
//                 e.key === "Enter" &&
//                 load()
//               }
//               placeholder="Search name, Partner ID, email, phone, agency..."
//               className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none focus:border-[#35C99A]"
//             />
//           </div>

//           <button
//             onClick={load}
//             className="rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold"
//           >
//             Search
//           </button>

//         </div>
//       </section>


//       <section className="mt-3 overflow-hidden border border-[#E0E8EC] bg-white">

//         <div className="overflow-x-auto">

//           <table className="min-w-full text-left">

//             <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">

//               <tr>
//                 <th className="px-4 py-3">
//                   Partner
//                 </th>

//                 <th className="px-4 py-3">
//                   Type
//                 </th>

//                 <th className="px-4 py-3">
//                   Agency / Parent
//                 </th>

//                 <th className="px-4 py-3">
//                   Location
//                 </th>

//                 <th className="px-4 py-3">
//                   Credits
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
//                     colSpan="7"
//                     className="py-14 text-center text-xs"
//                   >
//                     Loading...
//                   </td>
//                 </tr>

//               ) : partners.length ===
//                 0 ? (

//                 <tr>
//                   <td
//                     colSpan="7"
//                     className="py-14 text-center text-xs text-[#71858E]"
//                   >
//                     No verified partners
//                     found.
//                   </td>
//                 </tr>

//               ) : (

//                 partners.map((p) => (

//                   <tr
//                     key={p._id}
//                     className="hover:bg-[#FAFCFD]"
//                   >

//                     <td className="px-4 py-3">

//                       <div className="text-[12px] font-extrabold">
//                         {p.name}
//                       </div>

//                       <div className="mt-1 text-[10px] text-[#82949D]">
//                         {p.partnerId} ·{" "}
//                         {p.email}
//                       </div>

//                     </td>


//                     <td className="px-4 py-3 text-[10px] font-bold">

//                       <span className="rounded-full bg-[#EAF9F4] px-2.5 py-1 text-[#16825F]">
//                         {accountLabel(p)}
//                       </span>

//                     </td>


//                     <td className="px-4 py-3 text-[10px]">

//                       {p.accountType ===
//                         "subagent" ||
//                       p.isSubPartner ? (

//                         <>
//                           <div className="font-bold">
//                             {p
//                               .agencyDetails
//                               ?.agencyName ||
//                               "-"}
//                           </div>

//                           <div className="mt-1 text-[#82949D]">
//                             {p
//                               .agencyDetails
//                               ?.agencyPartnerCode ||
//                               "-"}{" "}
//                             · {p.teamRole}
//                           </div>
//                         </>

//                       ) : p.accountType ===
//                         "team" ? (

//                         <>
//                           <div className="font-bold">
//                             {p.business
//                               ?.businessName ||
//                               p.name}
//                           </div>

//                           <div className="mt-1 text-[#82949D]">
//                             Agency Owner
//                           </div>
//                         </>

//                       ) : (

//                         <span className="text-[#82949D]">
//                           Independent
//                         </span>

//                       )}

//                     </td>


//                     <td className="px-4 py-3 text-[10px]">
//                       {p.location?.city ||
//                         "-"}

//                       {p.location?.state
//                         ? `, ${p.location.state}`
//                         : ""}
//                     </td>


//                     <td className="px-4 py-3 text-[10px] font-bold">

//                       {p.accountType ===
//                         "subagent" ||
//                       p.isSubPartner ? (

//                         <div>
//                           <div className="text-[#16825F]">
//                             {p
//                               .teamCreditAllocation
//                               ?.availableLimit ||
//                               0}{" "}
//                             allocated
//                           </div>

//                           <div className="mt-1 text-[9px] font-medium text-[#82949D]">
//                             Cannot buy credits
//                           </div>
//                         </div>

//                       ) : (

//                         `${p.creditWallet?.balance || 0} cr`

//                       )}

//                     </td>


//                     <td className="px-4 py-3">

//                       <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F8F1] px-2.5 py-1 text-[9px] font-bold text-[#16825F]">
//                         <ShieldCheck
//                           size={11}
//                         />
//                         Verified
//                       </span>

//                     </td>


//                     <td className="px-4 py-3 text-right">

//                       <button
//                         onClick={() =>
//                           openPartner(
//                             p._id
//                           )
//                         }
//                         className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold hover:bg-[#EAF9F4]"
//                       >
//                         <Eye size={13} />
//                         View
//                       </button>

//                     </td>

//                   </tr>

//                 ))

//               )}

//             </tbody>

//           </table>

//         </div>
//       </section>


//       {(selected ||
//         detailLoading) && (

//         <div className="fixed inset-0 z-[100] flex justify-end bg-[#0E2736]/55 backdrop-blur-[2px]">

//           <div className="h-full w-full max-w-[760px] overflow-y-auto bg-[#F4F7F8] shadow-2xl">

//             {detailLoading &&
//             !selected ? (

//               <div className="flex h-full items-center justify-center">
//                 <RefreshCw className="animate-spin text-[#35C99A]" />
//               </div>

//             ) : (

//               <>
//                 <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#DCE5E9] bg-[#1F3C50] p-5 text-white">

//                   <div>

//                     <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7EE6C6]">
//                       {accountLabel(
//                         selected
//                       )}
//                     </p>

//                     <h2 className="mt-1 text-xl font-extrabold">
//                       {selected?.name}
//                     </h2>

//                     <p className="mt-1 text-[10px] text-white/60">
//                       {selected?.partnerId}
//                     </p>

//                   </div>


//                   <button
//                     onClick={
//                       closePartner
//                     }
//                     className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20"
//                   >
//                     <X size={18} />
//                   </button>

//                 </div>


//                 <div className="space-y-3 p-4">

//                   <Section
//                     title="Contact & Location"
//                     icon={
//                       <UserRound
//                         size={16}
//                       />
//                     }
//                   >

//                     <Detail
//                       icon={
//                         <Mail size={13} />
//                       }
//                       label="Email"
//                       value={
//                         selected?.email
//                       }
//                     />

//                     <Detail
//                       icon={
//                         <Phone size={13} />
//                       }
//                       label="Phone"
//                       value={
//                         selected?.phone
//                       }
//                     />

//                     <Detail
//                       icon={
//                         <MapPin size={13} />
//                       }
//                       label="Location"
//                       value={`${selected?.location?.city || "-"}, ${selected?.location?.state || "-"}`}
//                     />

//                     <Detail
//                       icon={
//                         <WalletCards
//                           size={13}
//                         />
//                       }
//                       label="Credits"
//                       value={
//                         selected
//                           ?.accountType ===
//                           "subagent" ||
//                         selected?.isSubPartner
//                           ? `${selected?.teamCreditAllocation?.availableLimit || 0} Team Allocated`
//                           : `${selected?.creditWallet?.balance || 0}`
//                       }
//                     />

//                   </Section>


//                   {(selected?.accountType ===
//                     "subagent" ||
//                     selected?.isSubPartner) && (

//                     <Section
//                       title="Agency Association"
//                       icon={
//                         <Building2
//                           size={16}
//                         />
//                       }
//                     >

//                       <Detail
//                         label="Agency"
//                         value={
//                           selected
//                             ?.agencyDetails
//                             ?.agencyName
//                         }
//                       />

//                       <Detail
//                         label="Agency Code"
//                         value={
//                           selected
//                             ?.agencyDetails
//                             ?.agencyPartnerCode
//                         }
//                       />

//                       <Detail
//                         label="Agency Owner"
//                         value={
//                           selected
//                             ?.agencyDetails
//                             ?.agencyOwnerName
//                         }
//                       />

//                       <Detail
//                         label="Team Role"
//                         value={
//                           selected
//                             ?.teamRole
//                         }
//                       />

//                     </Section>

//                   )}


//                   {selected?.accountType ===
//                     "team" &&
//                     !selected?.isSubPartner && (

//                     <Section
//                       title="Sub Partners"
//                       icon={
//                         <UsersRound
//                           size={16}
//                         />
//                       }
//                     >

//                       <div className="col-span-1 space-y-2 sm:col-span-2">

//                         {(selected?.teamMembers ||
//                           []).length ===
//                         0 ? (

//                           <p className="rounded-xl bg-[#F7F9FA] p-4 text-[10px] text-[#82949D]">
//                             No Sub Partners yet.
//                           </p>

//                         ) : (

//                           selected.teamMembers.map(
//                             (m) => (

//                               <div
//                                 key={
//                                   m._id
//                                 }
//                                 className="flex items-center justify-between gap-3 rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
//                               >

//                                 <div>
//                                   <p className="text-[11px] font-extrabold">
//                                     {
//                                       m.name
//                                     }
//                                   </p>

//                                   <p className="mt-1 text-[9px] text-[#82949D]">
//                                     {
//                                       m.partnerId
//                                     }{" "}
//                                     ·{" "}
//                                     {
//                                       m.teamRole
//                                     }
//                                   </p>
//                                 </div>


//                                 <button
//                                   onClick={() =>
//                                     navigate(
//                                       `/partnerdashboard?tab=management&partnerId=${m._id}`
//                                     )
//                                   }
//                                   className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] bg-white px-3 py-2 text-[9px] font-bold text-[#16825F] hover:bg-[#EAF9F4]"
//                                 >
//                                   <Eye
//                                     size={
//                                       12
//                                     }
//                                   />
//                                   View Partner
//                                 </button>

//                               </div>

//                             )
//                           )

//                         )}

//                       </div>

//                     </Section>

//                   )}


//                   <PartnerPropertiesSection
//                     partner={selected}
//                     onViewProperty={
//                       viewProperty
//                     }
//                     onViewAssignedPartner={
//                       viewAssignedPartner
//                     }
//                   />

//                 </div>
//               </>
//             )}

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


// function PartnerPropertiesSection({
//   partner,
//   onViewProperty,
//   onViewAssignedPartner,
// }) {
//   const properties =
//     resolveAddedProperties(
//       partner
//     );

//   return (
//     <Section
//       title="Properties Added By Partner"
//       icon={<Home size={16} />}
//     >

//       <div className="col-span-1 space-y-3 sm:col-span-2">

//         <div className="flex items-center justify-between rounded-xl bg-[#EAF9F4] px-3 py-2">

//           <div>
//             <p className="text-[9px] font-bold uppercase text-[#16825F]">
//               Added Properties
//             </p>

//             <p className="mt-1 text-lg font-extrabold text-[#173247]">
//               {properties.length}
//             </p>
//           </div>

//           <Home className="text-[#35C99A]" />

//         </div>


//         {properties.length ===
//         0 ? (

//           <div className="rounded-xl border border-dashed border-[#DCE5E9] bg-[#FAFCFD] p-5 text-center">

//             <Home
//               size={22}
//               className="mx-auto text-[#A4B2B9]"
//             />

//             <p className="mt-2 text-[10px] font-semibold text-[#82949D]">
//               No properties added by this
//               partner.
//             </p>

//           </div>

//         ) : (

//           properties.map(
//             (property, index) => {

//               const assigned =
//                 resolveAssignedPartner(
//                   property
//                 );

//               return (
//                 <article
//                   key={
//                     resolvePropertyId(
//                       property
//                     ) ||
//                     property.propertyId ||
//                     index
//                   }
//                   className="overflow-hidden rounded-2xl border border-[#DCE5E9] bg-white"
//                 >

//                   <div className="flex flex-col gap-3 p-3 sm:flex-row">

//                     <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-[#EEF3F5] sm:w-32">

//                       {property
//                         ?.images?.[0]
//                         ?.url ? (

//                         <img
//                           src={
//                             property
//                               .images[0]
//                               .url
//                           }
//                           alt={
//                             property.title ||
//                             "Property"
//                           }
//                           className="h-full w-full object-cover"
//                         />

//                       ) : (

//                         <div className="flex h-full items-center justify-center">
//                           <Home className="text-[#A4B2B9]" />
//                         </div>

//                       )}

//                     </div>


//                     <div className="min-w-0 flex-1">

//                       <div className="flex flex-wrap items-start justify-between gap-2">

//                         <div>

//                           <p className="line-clamp-1 text-[12px] font-extrabold text-[#173247]">
//                             {property.title ||
//                               "Untitled Property"}
//                           </p>

//                           <p className="mt-1 text-[9px] font-bold text-[#16825F]">
//                             {property.propertyId ||
//                               "Property ID unavailable"}
//                           </p>

//                         </div>


//                         <span className="rounded-full bg-[#F4F7F8] px-2.5 py-1 text-[8px] font-bold text-[#607681]">
//                           {property.status ||
//                             "—"}
//                         </span>

//                       </div>


//                       <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-[#82949D]">

//                         <span className="inline-flex items-center gap-1">
//                           <MapPinned
//                             size={
//                               10
//                             }
//                           />
//                           {[
//                             property.locality,
//                             property.city,
//                           ]
//                             .filter(
//                               Boolean
//                             )
//                             .join(
//                               ", "
//                             ) || "-"}
//                         </span>

//                         <span className="font-bold text-[#173247]">
//                           {formatPrice(
//                             property.price
//                           )}
//                         </span>

//                       </div>


//                       <div className="mt-3 rounded-xl bg-[#F7F9FA] p-2.5">

//                         <p className="text-[8px] font-bold uppercase tracking-wide text-[#8A9AA2]">
//                           Assigned Partner
//                         </p>

//                         {assigned ? (

//                           <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">

//                             <div>
//                               <p className="text-[10px] font-extrabold text-[#173247]">
//                                 {
//                                   assigned.name
//                                 }
//                               </p>

//                               <p className="mt-0.5 text-[8px] text-[#82949D]">
//                                 {assigned.partnerId ||
//                                   "Partner ID unavailable"}
//                               </p>
//                             </div>


//                             {assigned._id && (

//                               <button
//                                 onClick={() =>
//                                   onViewAssignedPartner(
//                                     property
//                                   )
//                                 }
//                                 className="inline-flex items-center gap-1 rounded-lg border border-[#CDEFE4] bg-[#EAF9F4] px-2.5 py-1.5 text-[8px] font-bold text-[#16825F]"
//                               >
//                                 <UserCheck
//                                   size={
//                                     11
//                                   }
//                                 />
//                                 View Partner
//                               </button>

//                             )}

//                           </div>

//                         ) : (

//                           <p className="mt-1 text-[9px] font-semibold text-[#A0ADB3]">
//                             No partner assigned
//                           </p>

//                         )}

//                       </div>


//                       <button
//                         onClick={() =>
//                           onViewProperty(
//                             property
//                           )
//                         }
//                         className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#1F3C50] px-3 text-[9px] font-bold text-white transition hover:bg-[#173247]"
//                       >
//                         <Eye size={12} />
//                         View Property
//                         <ArrowUpRight
//                           size={11}
//                         />
//                       </button>

//                     </div>

//                   </div>

//                 </article>
//               );
//             }
//           )

//         )}

//       </div>

//     </Section>
//   );
// }


// const Stat = ({
//   label,
//   value,
// }) => (
//   <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">

//     <p className="text-[9px] font-bold uppercase text-[#83959E]">
//       {label}
//     </p>

//     <p className="mt-2 text-2xl font-extrabold text-[#173247]">
//       {value}
//     </p>

//   </div>
// );


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


// const Detail = ({
//   icon,
//   label,
//   value,
// }) => (
//   <div className="rounded-xl bg-[#F7F9FA] p-3">

//     <div className="flex items-center gap-2 text-[#8A9AA2]">
//       {icon}

//       <p className="text-[9px] font-bold uppercase tracking-wider">
//         {label}
//       </p>
//     </div>

//     <p className="mt-1 break-words text-[11px] font-semibold text-[#344D59]">
//       {value || "-"}
//     </p>

//   </div>
// );



import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  MapPin,
  WalletCards,
  UsersRound,
  UserRound,
  Building2,
  ShieldCheck,
  X,
  Home,
  BadgeCheck,
  ArrowUpRight,
  UserCheck,
  MapPinned,
} from "lucide-react";

import Swal from "sweetalert2";

import {
  getAllPartnersApi,
  getPartnerByIdApi,
} from "../../../Services/partnerService";

import {
  getAllPropertiesApi,
} from "../../../Services/propertyService";


const FILTERS = [
  {
    label: "All Verified",
    value: "All",
  },
  {
    label: "Single Partners",
    value: "single",
  },
  {
    label: "Team / Agency Owners",
    value: "team",
  },
  {
    label: "Sub Partners",
    value: "subagent",
  },
];


const accountLabel = (p) => {
  if (
    p?.accountType === "subagent" ||
    p?.isSubPartner
  ) {
    return "Sub Partner";
  }

  if (p?.accountType === "team") {
    return "Team / Agency Owner";
  }

  return "Single Partner";
};


const formatPrice = (value) => {
  const price = Number(value || 0);

  if (!price) return "Price not added";

  if (price >= 10000000) {
    return `₹${(
      price / 10000000
    ).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `₹${(
      price / 100000
    ).toFixed(2)} L`;
  }

  return `₹${price.toLocaleString(
    "en-IN"
  )}`;
};


const resolveAddedProperties = (
  partner
) => {
  const candidates = [
    partner?.addedProperties,
    partner?.propertiesAdded,
    partner?.createdProperties,
    partner?.properties,
    partner?.propertyListings,
  ];

  const list =
    candidates.find(Array.isArray) || [];

  return list.filter(Boolean);
};


const resolvePropertyId = (
  property
) =>
  property?._id ||
  property?.id ||
  property?.propertyMongoId ||
  property?.propertyId?._id ||
  null;


const resolveAssignedPartner = (
  property
) => {
  const direct =
    property?.assignedPartner ||
    property?.partnerAssigned ||
    property?.assignedToPartner ||
    property?.assignedPartnerDetails ||
    property?.partner;

  if (direct) {
    return {
      _id:
        direct?._id ||
        direct?.id ||
        direct?.partnerMongoId ||
        direct?.partnerId?._id ||
        direct?.partnerId ||
        null,

      partnerId:
        direct?.partnerCode ||
        direct?.code ||
        (typeof direct?.partnerId === "string"
          ? direct.partnerId
          : direct?.partnerId?.partnerId) ||
        "",

      name:
        direct?.name ||
        direct?.partnerName ||
        "Assigned Partner",

      accountType:
        direct?.accountType ||
        direct?.partnerType ||
        "",
    };
  }

  const partnerId =
    property?.assignedPartnerId;

  if (
    partnerId &&
    typeof partnerId === "object"
  ) {
    return {
      _id:
        partnerId._id ||
        partnerId.id ||
        null,

      partnerId:
        partnerId.partnerId ||
        partnerId.partnerCode ||
        "",

      name:
        partnerId.name ||
        "Assigned Partner",

      accountType:
        partnerId.accountType || "",
    };
  }

  return null;
};


export default function PartnerManagement({
  initialPartnerId = null,
  onPartnerDetailClose,
}) {
  const navigate = useNavigate();

  const [partners, setPartners] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    accountType,
    setAccountType,
  ] = useState("All");

  const [loading, setLoading] =
    useState(true);

  const [selected, setSelected] =
    useState(null);

  const [
    detailLoading,
    setDetailLoading,
  ] = useState(false);

  // =========================================================
  // PAGINATION
  // =========================================================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages =
    Math.ceil(partners.length / itemsPerPage) || 1;

  const paginatedPartners = partners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const load = async () => {
    try {
      setLoading(true);

      const response =
        await getAllPartnersApi({
          search:
            search.trim() ||
            undefined,

          accountType:
            accountType === "All"
              ? undefined
              : accountType,
        });

      setPartners(
        response?.data || []
      );

    } catch (error) {

      Swal.fire(
        "Error",
        error?.response?.data
          ?.message ||
          "Unable to load verified partners",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    load();
  }, [accountType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [accountType, search]);


  const openPartner =
    async (
      id,
      updateUrl = true
    ) => {

    if (!id) return;

    try {
      setDetailLoading(true);

      // =========================================================
      // 1. PARTNER DETAIL + ALL PROPERTIES PARALLEL FETCH
      // =========================================================
      const [
        partnerResponse,
        propertiesResponse,
      ] = await Promise.all([
        getPartnerByIdApi(id),
        getAllPropertiesApi(),
      ]);

      const partnerData =
        partnerResponse?.data || null;

      if (!partnerData) {
        throw new Error(
          "Partner details not found"
        );
      }

      const allProperties =
        Array.isArray(
          propertiesResponse?.data
        )
          ? propertiesResponse.data
          : [];

      // =========================================================
      // 2. ONLY THOSE PROPERTIES WHICH THIS PARTNER CREATED
      //
      // Property DB:
      // addedBy.userId = Partner MongoDB _id
      //
      // Example:
      // partner._id:
      // 6a8d745f6398551e22344fe2
      //
      // property.addedBy.userId:
      // 6a8d745f6398551e22344fe2
      // =========================================================
      const addedProperties =
        allProperties.filter(
          (property) => {
            const addedByUserId =
              property?.addedBy
                ?.userId;

            if (!addedByUserId) {
              return false;
            }

            return (
              String(
                addedByUserId
              ) === String(id)
            );
          }
        );

      console.log(
        "PARTNER DETAIL:",
        partnerData
      );

      console.log(
        "ALL PROPERTIES:",
        allProperties
      );

      console.log(
        "PARTNER ADDED PROPERTIES:",
        addedProperties
      );

      // =========================================================
      // 3. ATTACH FILTERED PROPERTIES TO PARTNER DETAIL
      // =========================================================
      setSelected({
        ...partnerData,

        addedProperties,

        addedPropertiesCount:
          addedProperties.length,
      });

      if (updateUrl) {
        navigate(
          `/partnerdashboard?tab=management&partnerId=${id}`,
          { replace: true }
        );
      }

    } catch (error) {

      console.error(
        "OPEN PARTNER DETAIL ERROR:",
        error
      );

      Swal.fire(
        "Error",
        error?.response?.data
          ?.message ||
          error?.message ||
          "Unable to load partner details",
        "error"
      );

    } finally {
      setDetailLoading(false);
    }
  };


  useEffect(() => {
    if (!initialPartnerId) {
      return;
    }

    openPartner(
      initialPartnerId,
      false
    );

  }, [initialPartnerId]);


  const closePartner = () => {
    setSelected(null);

    if (onPartnerDetailClose) {
      onPartnerDetailClose();
      return;
    }

    navigate(
      "/partnerdashboard?tab=management",
      { replace: true }
    );
  };


  const viewProperty = (
    property
  ) => {
    const id =
      resolvePropertyId(property);

    if (!id) {
      Swal.fire(
        "Property unavailable",
        "MongoDB property ID is missing.",
        "info"
      );

      return;
    }

    navigate(
      `/property-management/${id}`
    );
  };


  const viewAssignedPartner = (
    property
  ) => {
    const assigned =
      resolveAssignedPartner(
        property
      );

    if (!assigned?._id) {
      Swal.fire(
        "Partner unavailable",
        "Assigned partner detail ID is not available.",
        "info"
      );

      return;
    }

    setSelected(null);

    navigate(
      `/partnerdashboard?tab=management&partnerId=${assigned._id}`
    );
  };


  const stats = useMemo(
    () => ({
      total: partners.length,

      single:
        partners.filter(
          (x) =>
            x.accountType ===
            "single"
        ).length,

      team:
        partners.filter(
          (x) =>
            x.accountType ===
              "team" &&
            !x.isSubPartner
        ).length,

      sub:
        partners.filter(
          (x) =>
            x.accountType ===
              "subagent" ||
            x.isSubPartner
        ).length,
    }),
    [partners]
  );


  return (
    <div className="min-h-screen bg-[#F4F7F8] p-2 text-[#173247] md:p-1">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#173247]">
            Partner Management
          </h1>

          <p className="mt-1 text-xs text-[#8e9da5]">
            Verified partners, their added properties and property assignments.
          </p>
        </div>

        <button
          onClick={load}
          disabled={loading}
          className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>


      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Verified Partners"
          value={stats.total}
        />

        <Stat
          label="Single Partners"
          value={stats.single}
        />

        <Stat
          label="Team Owners"
          value={stats.team}
        />

        <Stat
          label="Sub Partners"
          value={stats.sub}
        />
      </div>


      <section className="mt-3 rounded-[18px] border border-[#E0E8EC] bg-white p-3">

        <div className="flex flex-wrap gap-2">
          {FILTERS.map(
            (item) => (
              <button
                key={item.value}
                onClick={() =>
                  setAccountType(
                    item.value
                  )
                }
                className={`rounded-xl px-4 py-2.5 text-[11px] font-bold transition ${
                  accountType ===
                  item.value
                    ? "bg-[#1F3C50] text-white"
                    : "bg-[#F4F7F8] text-[#6B808A] hover:bg-[#EAF9F4]"
                }`}
              >
                {item.label}
              </button>
            )
          )}
        </div>


        <div className="mt-3 flex gap-2">

          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8BA0AA]"
              size={15}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                load()
              }
              placeholder="Search name, Partner ID, email, phone, agency..."
              className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none focus:border-[#35C99A]"
            />
          </div>

          <button
            onClick={load}
            className="rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold"
          >
            Search
          </button>

        </div>
      </section>


      <section className="mt-3 overflow-hidden border border-[#E0E8EC] bg-white">

        <div className="overflow-x-auto">

          <table className="min-w-full text-left">

            <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">

              <tr>
                <th className="px-4 py-3">
                  Partner
                </th>

                <th className="px-4 py-3">
                  Type
                </th>

                <th className="px-4 py-3">
                  Agency / Parent
                </th>

                <th className="px-4 py-3">
                  Location
                </th>

                <th className="px-4 py-3">
                  Credits
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
                    colSpan="7"
                    className="py-14 text-center text-xs"
                  >
                    Loading...
                  </td>
                </tr>

              ) : partners.length ===
                0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="py-14 text-center text-xs text-[#71858E]"
                  >
                    No verified partners
                    found.
                  </td>
                </tr>

              ) : (

                paginatedPartners.map((p) => (

                  <tr
                    key={p._id}
                    className="hover:bg-[#FAFCFD]"
                  >

                    <td className="px-4 py-3">

                      <div className="text-[12px] font-extrabold">
                        {p.name}
                      </div>

                      <div className="mt-1 text-[10px] text-[#82949D]">
                        {p.partnerId} ·{" "}
                        {p.email}
                      </div>

                    </td>


                    <td className="px-4 py-3 text-[10px] font-bold">

                      <span className="rounded-full bg-[#EAF9F4] px-2.5 py-1 text-[#16825F]">
                        {accountLabel(p)}
                      </span>

                    </td>


                    <td className="px-4 py-3 text-[10px]">

                      {p.accountType ===
                        "subagent" ||
                      p.isSubPartner ? (

                        <>
                          <div className="font-bold">
                            {p
                              .agencyDetails
                              ?.agencyName ||
                              "-"}
                          </div>

                          <div className="mt-1 text-[#82949D]">
                            {p
                              .agencyDetails
                              ?.agencyPartnerCode ||
                              "-"}{" "}
                            · {p.teamRole}
                          </div>
                        </>

                      ) : p.accountType ===
                        "team" ? (

                        <>
                          <div className="font-bold">
                            {p.business
                              ?.businessName ||
                              p.name}
                          </div>

                          <div className="mt-1 text-[#82949D]">
                            Agency Owner
                          </div>
                        </>

                      ) : (

                        <span className="text-[#82949D]">
                          Independent
                        </span>

                      )}

                    </td>


                    <td className="px-4 py-3 text-[10px]">
                      {p.location?.city ||
                        "-"}

                      {p.location?.state
                        ? `, ${p.location.state}`
                        : ""}
                    </td>


                    <td className="px-4 py-3 text-[10px] font-bold">

                      {p.accountType ===
                        "subagent" ||
                      p.isSubPartner ? (

                        <div>
                          <div className="text-[#16825F]">
                            {p
                              .teamCreditAllocation
                              ?.availableLimit ||
                              0}{" "}
                            allocated
                          </div>

                          <div className="mt-1 text-[9px] font-medium text-[#82949D]">
                            Cannot buy credits
                          </div>
                        </div>

                      ) : (

                        `${p.creditWallet?.balance || 0} cr`

                      )}

                    </td>


                    <td className="px-4 py-3">

                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F8F1] px-2.5 py-1 text-[9px] font-bold text-[#16825F]">
                        <ShieldCheck
                          size={11}
                        />
                        Verified
                      </span>

                    </td>


                    <td className="px-4 py-3 text-right">

                      <button
                        onClick={() =>
                          openPartner(
                            p._id
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold hover:bg-[#EAF9F4]"
                      >
                        <Eye size={13} />
                        View
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
      {!loading && partners.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-[#E0E8EC] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] text-[#8A989C]">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              partners.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              partners.length
            )}{" "}
            of {partners.length} partners
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


      {(selected ||
        detailLoading) && (

        <div className="fixed inset-0 z-[100] flex justify-end bg-[#0E2736]/55 backdrop-blur-[2px]">

          <div className="h-full w-full max-w-[760px] overflow-y-auto bg-[#F4F7F8] shadow-2xl">

            {detailLoading &&
            !selected ? (

              <div className="flex h-full items-center justify-center">
                <RefreshCw className="animate-spin text-[#35C99A]" />
              </div>

            ) : (

              <>
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#DCE5E9] bg-[#1F3C50] p-5 text-white">

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7EE6C6]">
                      {accountLabel(
                        selected
                      )}
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold">
                      {selected?.name}
                    </h2>

                    <p className="mt-1 text-[10px] text-white/60">
                      {selected?.partnerId}
                    </p>

                  </div>


                  <button
                    onClick={
                      closePartner
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20"
                  >
                    <X size={18} />
                  </button>

                </div>


                <div className="space-y-3 p-4">

                  <Section
                    title="Contact & Location"
                    icon={
                      <UserRound
                        size={16}
                      />
                    }
                  >

                    <Detail
                      icon={
                        <Mail size={13} />
                      }
                      label="Email"
                      value={
                        selected?.email
                      }
                    />

                    <Detail
                      icon={
                        <Phone size={13} />
                      }
                      label="Phone"
                      value={
                        selected?.phone
                      }
                    />

                    <Detail
                      icon={
                        <MapPin size={13} />
                      }
                      label="Location"
                      value={`${selected?.location?.city || "-"}, ${selected?.location?.state || "-"}`}
                    />

                    <Detail
                      icon={
                        <WalletCards
                          size={13}
                        />
                      }
                      label="Credits"
                      value={
                        selected
                          ?.accountType ===
                          "subagent" ||
                        selected?.isSubPartner
                          ? `${selected?.teamCreditAllocation?.availableLimit || 0} Team Allocated`
                          : `${selected?.creditWallet?.balance || 0}`
                      }
                    />

                  </Section>


                  {(selected?.accountType ===
                    "subagent" ||
                    selected?.isSubPartner) && (

                    <Section
                      title="Agency Association"
                      icon={
                        <Building2
                          size={16}
                        />
                      }
                    >

                      <Detail
                        label="Agency"
                        value={
                          selected
                            ?.agencyDetails
                            ?.agencyName
                        }
                      />

                      <Detail
                        label="Agency Code"
                        value={
                          selected
                            ?.agencyDetails
                            ?.agencyPartnerCode
                        }
                      />

                      <Detail
                        label="Agency Owner"
                        value={
                          selected
                            ?.agencyDetails
                            ?.agencyOwnerName
                        }
                      />

                      <Detail
                        label="Team Role"
                        value={
                          selected
                            ?.teamRole
                        }
                      />

                    </Section>

                  )}


                  {selected?.accountType ===
                    "team" &&
                    !selected?.isSubPartner && (

                    <Section
                      title="Sub Partners"
                      icon={
                        <UsersRound
                          size={16}
                        />
                      }
                    >

                      <div className="col-span-1 space-y-2 sm:col-span-2">

                        {(selected?.teamMembers ||
                          []).length ===
                        0 ? (

                          <p className="rounded-xl bg-[#F7F9FA] p-4 text-[10px] text-[#82949D]">
                            No Sub Partners yet.
                          </p>

                        ) : (

                          selected.teamMembers.map(
                            (m) => (

                              <div
                                key={
                                  m._id
                                }
                                className="flex items-center justify-between gap-3 rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
                              >

                                <div>
                                  <p className="text-[11px] font-extrabold">
                                    {
                                      m.name
                                    }
                                  </p>

                                  <p className="mt-1 text-[9px] text-[#82949D]">
                                    {
                                      m.partnerId
                                    }{" "}
                                    ·{" "}
                                    {
                                      m.teamRole
                                    }
                                  </p>
                                </div>


                                <button
                                  onClick={() =>
                                    navigate(
                                      `/partnerdashboard?tab=management&partnerId=${m._id}`
                                    )
                                  }
                                  className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] bg-white px-3 py-2 text-[9px] font-bold text-[#16825F] hover:bg-[#EAF9F4]"
                                >
                                  <Eye
                                    size={
                                      12
                                    }
                                  />
                                  View Partner
                                </button>

                              </div>

                            )
                          )

                        )}

                      </div>

                    </Section>

                  )}


                  <PartnerPropertiesSection
                    partner={selected}
                    onViewProperty={
                      viewProperty
                    }
                    onViewAssignedPartner={
                      viewAssignedPartner
                    }
                  />

                </div>
              </>
            )}

          </div>

        </div>

      )}

    </div>
  );
}


function PartnerPropertiesSection({
  partner,
  onViewProperty,
  onViewAssignedPartner,
}) {
  const properties =
    resolveAddedProperties(
      partner
    );

  return (
    <Section
      title="Properties Added By Partner"
      icon={<Home size={16} />}
    >

      <div className="col-span-1 space-y-3 sm:col-span-2">

        <div className="flex items-center justify-between rounded-xl bg-[#EAF9F4] px-3 py-2">

          <div>
            <p className="text-[9px] font-bold uppercase text-[#16825F]">
              Added Properties
            </p>

            <p className="mt-1 text-lg font-extrabold text-[#173247]">
              {properties.length}
            </p>
          </div>

          <Home className="text-[#35C99A]" />

        </div>


        {properties.length ===
        0 ? (

          <div className="rounded-xl border border-dashed border-[#DCE5E9] bg-[#FAFCFD] p-5 text-center">

            <Home
              size={22}
              className="mx-auto text-[#A4B2B9]"
            />

            <p className="mt-2 text-[10px] font-semibold text-[#82949D]">
              No properties added by this
              partner.
            </p>

          </div>

        ) : (

          properties.map(
            (property, index) => {

              const assigned =
                resolveAssignedPartner(
                  property
                );

              return (
                <article
                  key={
                    resolvePropertyId(
                      property
                    ) ||
                    property.propertyId ||
                    index
                  }
                  className="overflow-hidden rounded-2xl border border-[#DCE5E9] bg-white"
                >

                  <div className="flex flex-col gap-3 p-3 sm:flex-row">

                    <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-[#EEF3F5] sm:w-32">

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
                            property.title ||
                            "Property"
                          }
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center">
                          <Home className="text-[#A4B2B9]" />
                        </div>

                      )}

                    </div>


                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-start justify-between gap-2">

                        <div>

                          <p className="line-clamp-1 text-[12px] font-extrabold text-[#173247]">
                            {property.title ||
                              "Untitled Property"}
                          </p>

                          <p className="mt-1 text-[9px] font-bold text-[#16825F]">
                            {property.propertyId ||
                              "Property ID unavailable"}
                          </p>

                        </div>


                        <span className="rounded-full bg-[#F4F7F8] px-2.5 py-1 text-[8px] font-bold text-[#607681]">
                          {property.status ||
                            "—"}
                        </span>

                      </div>


                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-[#82949D]">

                        <span className="inline-flex items-center gap-1">
                          <MapPinned
                            size={
                              10
                            }
                          />
                          {[
                            property.locality,
                            property.city,
                          ]
                            .filter(
                              Boolean
                            )
                            .join(
                              ", "
                            ) || "-"}
                        </span>

                        <span className="font-bold text-[#173247]">
                          {formatPrice(
                            property.price
                          )}
                        </span>

                      </div>


                      <div className="mt-3 rounded-xl bg-[#F7F9FA] p-2.5">

                        <p className="text-[8px] font-bold uppercase tracking-wide text-[#8A9AA2]">
                          Assigned Partner
                        </p>

                        {assigned ? (

                          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">

                            <div>
                              <p className="text-[10px] font-extrabold text-[#173247]">
                                {
                                  assigned.name
                                }
                              </p>

                              <p className="mt-0.5 text-[8px] text-[#82949D]">
                                {assigned.partnerId ||
                                  "Partner ID unavailable"}
                              </p>
                            </div>


                            {assigned._id && (

                              <button
                                onClick={() =>
                                  onViewAssignedPartner(
                                    property
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-lg border border-[#CDEFE4] bg-[#EAF9F4] px-2.5 py-1.5 text-[8px] font-bold text-[#16825F]"
                              >
                                <UserCheck
                                  size={
                                    11
                                  }
                                />
                                View Partner
                              </button>

                            )}

                          </div>

                        ) : (

                          <p className="mt-1 text-[9px] font-semibold text-[#A0ADB3]">
                            No partner assigned
                          </p>

                        )}

                      </div>


                      <button
                        onClick={() =>
                          onViewProperty(
                            property
                          )
                        }
                        className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#1F3C50] px-3 text-[9px] font-bold text-white transition hover:bg-[#173247]"
                      >
                        <Eye size={12} />
                        View Property
                        <ArrowUpRight
                          size={11}
                        />
                      </button>

                    </div>

                  </div>

                </article>
              );
            }
          )

        )}

      </div>

    </Section>
  );
}


const Stat = ({
  label,
  value,
}) => (
  <div className="rounded-[16px] border border-[#E0E8EC] bg-white p-4">

    <p className="text-[9px] font-bold uppercase text-[#83959E]">
      {label}
    </p>

    <p className="mt-2 text-2xl font-extrabold text-[#173247]">
      {value}
    </p>

  </div>
);


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


const Detail = ({
  icon,
  label,
  value,
}) => (
  <div className="rounded-xl bg-[#F7F9FA] p-3">

    <div className="flex items-center gap-2 text-[#8A9AA2]">
      {icon}

      <p className="text-[9px] font-bold uppercase tracking-wider">
        {label}
      </p>
    </div>

    <p className="mt-1 break-words text-[11px] font-semibold text-[#344D59]">
      {value || "-"}
    </p>

  </div>
);
