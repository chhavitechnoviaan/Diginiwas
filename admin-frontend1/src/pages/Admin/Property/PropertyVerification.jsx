

  // import React, {
  //   useEffect,
  //   useMemo,
  //   useState,
  // } from "react";

  // import {
  //   Search,
  //   Eye,
  //   CheckCircle2,
  //   Building2,
  //   Radio,
  //   UserCheck,
  //   AlertCircle,
  //   X,
  //   MapPin,
  //   IndianRupee,
  //   Ruler,
  //   BedDouble,
  //   Bath,
  //   Car,
  //   Layers3,
  //   Compass,
  //   Sofa,
  //   FileText,
  //   Image as ImageIcon,
  //   Video,
  //   ExternalLink,
  //   RefreshCw,
  //   LoaderCircle,
  //   BadgeCheck,
  //   UserRound,
  // } from "lucide-react";

  // import Swal from "sweetalert2";

  // import {
  //   getPropertyPublishingSummaryApi,
  //   getReadyForFinalReviewPropertiesApi,
  //   getLivePublishingPropertiesApi,
  //   getFinalReviewPropertyApi,
  //   makePropertyLiveApi,
  // } from "../../../Services/propertyPublishingService";

  // const formatMoney = (value) => {
  //   const amount = Number(value || 0);

  //   if (amount >= 10000000) {
  //     return `₹${(amount / 10000000).toFixed(2)} Cr`;
  //   }

  //   if (amount >= 100000) {
  //     return `₹${(amount / 100000).toFixed(2)} L`;
  //   }

  //   return `₹${amount.toLocaleString("en-IN")}`;
  // };

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

  // export default function PropertyVerificationCenter() {
  //   const [activeTab, setActiveTab] =
  //     useState("Ready for Final Review");

  //   const [summary, setSummary] =
  //     useState({
  //       readyForFinalReview: 0,
  //       live: 0,
  //       verifiedWithoutPartner: 0,
  //       totalVerified: 0,
  //     });

  //   const [properties, setProperties] =
  //     useState([]);

  //   const [search, setSearch] =
  //     useState("");

  //   const [loading, setLoading] =
  //     useState(true);

  //   const [detailLoading, setDetailLoading] =
  //     useState(false);

  //   const [selectedDetail, setSelectedDetail] =
  //     useState(null);

  //   const [actionLoading, setActionLoading] =
  //     useState(false);

  //   const loadSummary = async () => {
  //     try {
  //       const response =
  //         await getPropertyPublishingSummaryApi();

  //       if (response?.success) {
  //         setSummary(
  //           response.data || {}
  //         );
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Publishing summary error:",
  //         error
  //       );
  //     }
  //   };

  //   const loadProperties = async () => {
  //     try {
  //       setLoading(true);

  //       const params = {
  //         search:
  //           search.trim() ||
  //           undefined,
  //       };

  //       const response =
  //         activeTab === "Live Properties"
  //           ? await getLivePublishingPropertiesApi(
  //               params
  //             )
  //           : await getReadyForFinalReviewPropertiesApi(
  //               params
  //             );

  //       if (response?.success) {
  //         setProperties(
  //           response.data || []
  //         );
  //       } else {
  //         setProperties([]);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Publishing properties error:",
  //         error
  //       );

  //       setProperties([]);

  //       Swal.fire({
  //         icon: "error",
  //         title:
  //           "Unable to load properties",
  //         text:
  //           error?.response?.data?.message ||
  //           "Property data could not be loaded.",
  //         confirmButtonColor:
  //           "#00796B",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     loadSummary();
  //   }, []);

  //   useEffect(() => {
  //     const timer = setTimeout(
  //       loadProperties,
  //       250
  //     );

  //     return () =>
  //       clearTimeout(timer);
  //   }, [
  //     activeTab,
  //     search,
  //   ]);

  //   const refreshAll = async () => {
  //     await Promise.all([
  //       loadSummary(),
  //       loadProperties(),
  //     ]);
  //   };

  //   const openFinalReview = async (
  //     propertyId
  //   ) => {
  //     try {
  //       setDetailLoading(true);
  //       setSelectedDetail(null);

  //       const response =
  //         await getFinalReviewPropertyApi(
  //           propertyId
  //         );

  //       if (response?.success) {
  //         setSelectedDetail(
  //           response.data
  //         );
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title:
  //           "Unable to open final review",
  //         text:
  //           error?.response?.data?.message ||
  //           "Property details could not be loaded.",
  //         confirmButtonColor:
  //           "#00796B",
  //       });
  //     } finally {
  //       setDetailLoading(false);
  //     }
  //   };

  //   const makeLive = async () => {
  //     const property =
  //       selectedDetail?.property;

  //     if (!property?._id) return;

  //     const result =
  //       await Swal.fire({
  //         icon: "question",
  //         title:
  //           "Make Property Live?",
  //         html: `
  //           <div style="font-size:12px;color:#667085;line-height:1.7">
  //             You are publishing
  //             <strong>${property.title || property.propertyId}</strong>.
  //             <br/>
  //             It will become visible in the public live-property feed.
  //           </div>
  //         `,
  //         input: "textarea",
  //         inputPlaceholder:
  //           "Optional final review notes...",
  //         showCancelButton: true,
  //         confirmButtonText:
  //           "Final Review Complete & Make Live",
  //         cancelButtonText:
  //           "Cancel",
  //         confirmButtonColor:
  //           "#00796B",
  //       });

  //     if (!result.isConfirmed) {
  //       return;
  //     }

  //     try {
  //       setActionLoading(true);

  //       const response =
  //         await makePropertyLiveApi(
  //           property._id,
  //           {
  //             notes:
  //               result.value ||
  //               "Final review completed by admin.",
  //           }
  //         );

  //       if (response?.success) {
  //         await Swal.fire({
  //           icon: "success",
  //           title:
  //             "Property is Live",
  //           text:
  //             response.message,
  //           confirmButtonColor:
  //             "#00796B",
  //         });

  //         setSelectedDetail(null);

  //         await refreshAll();

  //         setActiveTab(
  //           "Live Properties"
  //         );
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title:
  //           "Unable to make property Live",
  //         text:
  //           error?.response?.data?.message ||
  //           "Final publishing failed.",
  //         confirmButtonColor:
  //           "#00796B",
  //       });
  //     } finally {
  //       setActionLoading(false);
  //     }
  //   };

  //   const cards = useMemo(
  //     () => [
  //       {
  //         title:
  //           "READY FOR FINAL REVIEW",
  //         value:
  //           summary.readyForFinalReview ||
  //           0,
  //         icon: BadgeCheck,
  //         description:
  //           "Verified + partner assigned",
  //       },
  //       {
  //         title:
  //           "LIVE PROPERTIES",
  //         value:
  //           summary.live || 0,
  //         icon: Radio,
  //         description:
  //           "Currently public",
  //       },
  //       {
  //         title:
  //           "VERIFIED TOTAL",
  //         value:
  //           summary.totalVerified ||
  //           0,
  //         icon: CheckCircle2,
  //         description:
  //           "Verification completed",
  //       },
  //       {
  //         title:
  //           "WAITING FOR PARTNER",
  //         value:
  //           summary.verifiedWithoutPartner ||
  //           0,
  //         icon: UserCheck,
  //         description:
  //           "Verified but no partner",
  //       },
  //     ],
  //     [summary]
  //   );

  //   return (
  //     <div className="min-h-screen  p-3 text-[#1D2939] sm:p-1">
  //       {/* HEADER */}
  //       <div className="flex flex-col gap-3  p-1  sm:flex-row sm:items-center sm:justify-between">
  //         <div>
  //           <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
  //             Property Final Review & Publishing
  //           </h1>

  //           <p className="mt-1 text-[11px] text-[#849497]">
  //             Only verified properties with an assigned verified partner appear in the final review queue.
  //           </p>
  //         </div>

  //         <button
  //           type="button"
  //           onClick={refreshAll}
  //           className="flex h-9 w-fit items-center gap-2 rounded-lg border border-[#BFD8D2] bg-white px-3 text-[11px] font-semibold text-[#267D6D]"
  //         >
  //           <RefreshCw size={13} />
  //           Refresh
  //         </button>
  //       </div>

  //       {/* SUMMARY */}
  //       <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
  //         {cards.map(
  //           ({
  //             title,
  //             value,
  //             icon: Icon,
  //             description,
  //           }) => (
  //             <div
  //               key={title}
  //               className="rounded-xl border border-[#DCE5E3] bg-white p-4 shadow-sm"
  //             >
  //               <div className="flex items-start justify-between gap-3">
  //                 <div>
  //                   <p className="text-[8px] font-bold tracking-wide text-[#718087]">
  //                     {title}
  //                   </p>

  //                   <p className="mt-2 text-[26px] font-bold text-[#173B45]">
  //                     {value}
  //                   </p>

  //                   <p className="mt-1 text-[9px] text-[#94A1A4]">
  //                     {description}
  //                   </p>
  //                 </div>

  //                 <div className="rounded-lg bg-[#EAF8F4] p-2 text-[#12846F]">
  //                   <Icon size={16} />
  //                 </div>
  //               </div>
  //             </div>
  //           )
  //         )}
  //       </div>

  //       {/* CONTENT */}
  //       <div className="mt-3 overflow-hidden rounded-xl border border-[#DCE5E3] bg-white shadow-sm">
  //         {/* TABS */}
  //         <div className="flex overflow-x-auto border-b border-[#E7EEEC]">
  //           {[
  //             "Ready for Final Review",
  //             "Live Properties",
  //           ].map((tab) => (
  //             <button
  //               type="button"
  //               key={tab}
  //               onClick={() =>
  //                 setActiveTab(tab)
  //               }
  //               className={`relative min-w-max px-5 py-3 text-[11px] font-semibold ${
  //                 activeTab === tab
  //                   ? "text-[#087C69]"
  //                   : "text-[#8A989C]"
  //               }`}
  //             >
  //               {tab}

  //               {activeTab === tab && (
  //                 <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#087C69]" />
  //               )}
  //             </button>
  //           ))}
  //         </div>

  //         {/* SEARCH */}
  //         <div className="border-b border-[#E7EEEC] p-3">
  //           <div className="relative max-w-[360px]">
  //             <Search
  //               size={13}
  //               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
  //             />

  //             <input
  //               value={search}
  //               onChange={(event) =>
  //                 setSearch(
  //                   event.target.value
  //                 )
  //               }
  //               placeholder="Search property ID, name, city, partner..."
  //               className="h-9 w-full rounded-lg border border-[#D8E1DF] bg-white pl-9 pr-3 text-[11px] outline-none focus:border-[#5DAD9E]"
  //             />
  //           </div>
  //         </div>

  //         {/* TABLE */}
  //         <div className="overflow-x-auto">
  //           <table className="w-full min-w-[980px]">
  //             <thead>
  //               <tr className="bg-[#073C5C] text-white">
  //                 <TableHead>
  //                   Property
  //                 </TableHead>

  //                 <TableHead>
  //                   Location
  //                 </TableHead>

  //                 <TableHead>
  //                   Assigned Partner
  //                 </TableHead>

  //                 <TableHead>
  //                   Verification
  //                 </TableHead>

  //                 <TableHead>
  //                   Media / Docs
  //                 </TableHead>

  //                 <TableHead>
  //                   Status
  //                 </TableHead>

  //                 <TableHead>
  //                   Action
  //                 </TableHead>
  //               </tr>
  //             </thead>

  //             <tbody>
  //               {loading ? (
  //                 <tr>
  //                   <td
  //                     colSpan={7}
  //                     className="py-16 text-center"
  //                   >
  //                     <LoaderCircle
  //                       size={20}
  //                       className="mx-auto animate-spin text-[#0A8A72]"
  //                     />

  //                     <p className="mt-2 text-[11px] text-[#859396]">
  //                       Loading properties...
  //                     </p>
  //                   </td>
  //                 </tr>
  //               ) : properties.length ? (
  //                 properties.map(
  //                   (property) => {
  //                     const partner =
  //                       property
  //                         ?.assignedPartner
  //                         ?.partnerId;

  //                     const imageCount =
  //                       property.images
  //                         ?.length || 0;

  //                     const docCount =
  //                       [
  //                         property.floorPlan,
  //                         property.reraCertificate,
  //                       ].filter(
  //                         Boolean
  //                       ).length;

  //                     const hasVideo =
  //                       Boolean(
  //                         property.video ||
  //                           property.videoLink
  //                       );

  //                     return (
  //                       <tr
  //                         key={
  //                           property._id
  //                         }
  //                         className="border-b border-[#EDF2F1] last:border-0 hover:bg-[#F9FCFB]"
  //                       >
  //                         <td className="px-4 py-4">
  //                           <div className="flex items-center gap-3">
  //                             <div className="h-11 w-14 overflow-hidden rounded-md bg-[#EEF4F5]">
  //                               {property
  //                                 .images?.[0]
  //                                 ?.url ? (
  //                                 <img
  //                                   src={
  //                                     property
  //                                       .images[0]
  //                                       .url
  //                                   }
  //                                   alt={
  //                                     property.title
  //                                   }
  //                                   className="h-full w-full object-cover"
  //                                 />
  //                               ) : (
  //                                 <div className="flex h-full items-center justify-center text-[#9BACAF]">
  //                                   <Building2
  //                                     size={16}
  //                                   />
  //                                 </div>
  //                               )}
  //                             </div>

  //                             <div>
  //                               <p className="max-w-[200px] text-[11px] font-bold text-[#304E56]">
  //                                 {property.title}
  //                               </p>

  //                               <p className="mt-1 text-[9px] font-semibold text-[#0B8B73]">
  //                                 {property.propertyId}
  //                               </p>

  //                               <p className="mt-1 text-[8px] text-[#98A4A7]">
  //                                 {property.category} • {property.transactionType}
  //                               </p>
  //                             </div>
  //                           </div>
  //                         </td>

  //                         <td className="px-4 py-4">
  //                           <p className="text-[10px] font-semibold text-[#50676D]">
  //                             {property.city ||
  //                               "—"}
  //                           </p>

  //                           <p className="mt-1 text-[9px] text-[#98A4A7]">
  //                             {property.locality ||
  //                               property.address ||
  //                               "—"}
  //                           </p>
  //                         </td>

  //                         <td className="px-4 py-4">
  //                           <p className="text-[10px] font-bold text-[#425E65]">
  //                             {partner?.name ||
  //                               property
  //                                 ?.assignedPartner
  //                                 ?.name ||
  //                               "—"}
  //                           </p>

  //                           <p className="mt-1 text-[9px] text-[#0A8A72]">
  //                             {partner?.partnerId ||
  //                               property
  //                                 ?.assignedPartner
  //                                 ?.partnerCode ||
  //                               "—"}
  //                           </p>

  //                           <p className="mt-1 text-[8px] text-[#98A4A7]">
  //                             {partner?.partnerType ||
  //                               property
  //                                 ?.assignedPartner
  //                                 ?.partnerType ||
  //                               "—"}
  //                           </p>
  //                         </td>

  //                         <td className="px-4 py-4">
  //                           <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
  //                             <CheckCircle2
  //                               size={10}
  //                             />
  //                             {
  //                               property.propertyVerificationStatus
  //                             }
  //                           </span>
  //                         </td>

  //                         <td className="px-4 py-4">
  //                           <div className="flex flex-wrap gap-1">
  //                             <MiniPill>
  //                               <ImageIcon
  //                                 size={9}
  //                               />
  //                               {imageCount} images
  //                             </MiniPill>

  //                             <MiniPill>
  //                               <FileText
  //                                 size={9}
  //                               />
  //                               {docCount} docs
  //                             </MiniPill>

  //                             <MiniPill>
  //                               <Video size={9} />
  //                               {hasVideo
  //                                 ? "Video"
  //                                 : "No video"}
  //                             </MiniPill>
  //                           </div>
  //                         </td>

  //                         <td className="px-4 py-4">
  //                           <span
  //                             className={`rounded-full border px-2 py-1 text-[9px] font-bold ${
  //                               property.status ===
  //                               "Live"
  //                                 ? "border-emerald-200 bg-emerald-50 text-emerald-600"
  //                                 : "border-blue-200 bg-blue-50 text-blue-600"
  //                             }`}
  //                           >
  //                             {property.status}
  //                           </span>
  //                         </td>

  //                         <td className="px-4 py-4">
  //                           <button
  //                             type="button"
  //                             onClick={() =>
  //                               openFinalReview(
  //                                 property._id
  //                               )
  //                             }
  //                             className="flex items-center gap-1.5 rounded-lg border border-[#CDE0DC] bg-white px-3 py-2 text-[10px] font-bold text-[#167C69] hover:bg-[#F2FAF7]"
  //                           >
  //                             <Eye size={12} />
  //                             {property.status ===
  //                             "Live"
  //                               ? "View Property"
  //                               : "Final Review"}
  //                           </button>
  //                         </td>
  //                       </tr>
  //                     );
  //                   }
  //                 )
  //               ) : (
  //                 <tr>
  //                   <td
  //                     colSpan={7}
  //                     className="py-16 text-center"
  //                   >
  //                     <Building2
  //                       size={22}
  //                       className="mx-auto text-[#A5B1B3]"
  //                     />

  //                     <p className="mt-2 text-[11px] font-semibold text-[#61777C]">
  //                       No properties found
  //                     </p>
  //                   </td>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </table>
  //         </div>

  //         <div className="border-t border-[#EDF2F1] px-4 py-3 text-[9px] text-[#8A989C]">
  //           Showing {properties.length} properties
  //         </div>
  //       </div>

  //       {(selectedDetail ||
  //         detailLoading) && (
  //         <FinalReviewDrawer
  //           data={selectedDetail}
  //           loading={detailLoading}
  //           actionLoading={
  //             actionLoading
  //           }
  //           onClose={() =>
  //             setSelectedDetail(null)
  //           }
  //           onMakeLive={makeLive}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  // function FinalReviewDrawer({
  //   data,
  //   loading,
  //   actionLoading,
  //   onClose,
  //   onMakeLive,
  // }) {
  //   const property =
  //     data?.property;

  //   const checks =
  //     data?.checks || {};

  //   const partner =
  //     property?.assignedPartner
  //       ?.partnerId;

  //   if (loading) {
  //     return (
  //       <DrawerShell
  //         onClose={onClose}
  //       >
  //         <div className="flex min-h-[500px] items-center justify-center">
  //           <LoaderCircle
  //             size={28}
  //             className="animate-spin text-[#0B8B73]"
  //           />
  //         </div>
  //       </DrawerShell>
  //     );
  //   }

  //   if (!property) {
  //     return (
  //       <DrawerShell
  //         onClose={onClose}
  //       >
  //         <div className="flex min-h-[500px] items-center justify-center text-[11px] text-[#8A989C]">
  //           Property detail not available.
  //         </div>
  //       </DrawerShell>
  //     );
  //   }

  //   return (
  //     <DrawerShell
  //       onClose={onClose}
  //     >
  //       <div className="space-y-4 p-5">
  //         {/* PROPERTY HEADER */}
  //         <div className="rounded-xl border border-[#DDE8E5] bg-white p-4">
  //           <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
  //             <div>
  //               <p className="text-[10px] font-bold text-[#0B8B73]">
  //                 {property.propertyId}
  //               </p>

  //               <h3 className="mt-1 text-[20px] font-bold text-[#173C46]">
  //                 {property.title}
  //               </h3>

  //               <p className="mt-1 flex items-center gap-1 text-[10px] text-[#819194]">
  //                 <MapPin size={11} />
  //                 {[
  //                   property.locality,
  //                   property.city,
  //                   property.address,
  //                 ]
  //                   .filter(Boolean)
  //                   .join(", ")}
  //               </p>
  //             </div>

  //             <div className="flex flex-col items-start gap-2 sm:items-end">
  //               <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
  //                 Verification:{" "}
  //                 {
  //                   property.propertyVerificationStatus
  //                 }
  //               </span>

  //               <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600">
  //                 Status: {property.status}
  //               </span>
  //             </div>
  //           </div>
  //         </div>

  //         {/* FINAL CHECKS */}
  //         <SectionCard
  //           title="Final Publishing Checks"
  //           icon={CheckCircle2}
  //         >
  //           <div className="grid gap-2 sm:grid-cols-2">
  //             <CheckRow
  //               label="Property Verified"
  //               ok={
  //                 checks.propertyVerified
  //               }
  //             />

  //             <CheckRow
  //               label="Partner Assigned"
  //               ok={
  //                 checks.partnerAssigned
  //               }
  //             />

  //             <CheckRow
  //               label="Assigned Partner Verified"
  //               ok={
  //                 checks.partnerVerified
  //               }
  //             />

  //             <CheckRow
  //               label="Partner Not Blocked"
  //               ok={
  //                 checks.partnerNotBlocked
  //               }
  //             />
  //           </div>
  //         </SectionCard>

  //         {/* IMAGES */}
  //         <SectionCard
  //           title={`Property Images (${property.images?.length || 0})`}
  //           icon={ImageIcon}
  //         >
  //           {property.images?.length ? (
  //             <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
  //               {property.images.map(
  //                 (image) => (
  //                   <a
  //                     key={
  //                       image._id ||
  //                       image.url
  //                     }
  //                     href={image.url}
  //                     target="_blank"
  //                     rel="noreferrer"
  //                     className="group relative h-28 overflow-hidden rounded-lg bg-slate-100"
  //                   >
  //                     <img
  //                       src={image.url}
  //                       alt={
  //                         property.title
  //                       }
  //                       className="h-full w-full object-cover transition group-hover:scale-105"
  //                     />
  //                   </a>
  //                 )
  //               )}
  //             </div>
  //           ) : (
  //             <EmptyText>
  //               No property images uploaded.
  //             </EmptyText>
  //           )}
  //         </SectionCard>

  //         {/* BASIC DETAIL */}
  //         <SectionCard
  //           title="Property Details"
  //           icon={Building2}
  //         >
  //           <div className="grid gap-2 sm:grid-cols-2">
  //             <Detail
  //               icon={IndianRupee}
  //               label="Price"
  //               value={formatMoney(
  //                 property.price
  //               )}
  //             />

  //             <Detail
  //               icon={Ruler}
  //               label="Property Size"
  //               value={`${property.propertySize || "—"} ${property.sizeUnit || ""}`}
  //             />

  //             <Detail
  //               icon={BedDouble}
  //               label="Bedrooms"
  //               value={
  //                 property.bedrooms ||
  //                 "—"
  //               }
  //             />

  //             <Detail
  //               icon={Bath}
  //               label="Bathrooms"
  //               value={
  //                 property.bathrooms ||
  //                 "—"
  //               }
  //             />

  //             <Detail
  //               icon={Car}
  //               label="Parking"
  //               value={
  //                 property.parking ||
  //                 "—"
  //               }
  //             />

  //             <Detail
  //               icon={Layers3}
  //               label="Floor"
  //               value={`${property.floorNo ?? "—"} / ${property.totalFloors ?? "—"}`}
  //             />

  //             <Detail
  //               icon={Compass}
  //               label="Facing"
  //               value={
  //                 property.facing ||
  //                 "—"
  //               }
  //             />

  //             <Detail
  //               icon={Sofa}
  //               label="Furnishing"
  //               value={
  //                 property.furnishing ||
  //                 "—"
  //               }
  //             />
  //           </div>

  //           <div className="mt-3 rounded-lg bg-[#F8FAFA] p-3">
  //             <p className="text-[8px] font-bold uppercase text-[#8A989C]">
  //               Description
  //             </p>

  //             <p className="mt-1 whitespace-pre-wrap text-[10px] leading-5 text-[#536A70]">
  //               {property.description ||
  //                 "No description"}
  //             </p>
  //           </div>

  //           {property.amenities?.length >
  //             0 && (
  //             <div className="mt-3">
  //               <p className="mb-2 text-[8px] font-bold uppercase text-[#8A989C]">
  //                 Amenities
  //               </p>

  //               <div className="flex flex-wrap gap-1.5">
  //                 {property.amenities.map(
  //                   (item) => (
  //                     <span
  //                       key={item}
  //                       className="rounded-full bg-[#EDF8F5] px-2.5 py-1 text-[9px] font-semibold text-[#197C69]"
  //                     >
  //                       {item}
  //                     </span>
  //                   )
  //                 )}
  //               </div>
  //             </div>
  //           )}
  //         </SectionCard>

  //         {/* PARTNER */}
  //         <SectionCard
  //           title="Assigned Partner"
  //           icon={UserRound}
  //         >
  //           <div className="rounded-lg border border-[#E4ECEA] bg-[#FAFCFB] p-3">
  //             <p className="text-[11px] font-bold text-[#35545C]">
  //               {partner?.name ||
  //                 property
  //                   ?.assignedPartner
  //                   ?.name ||
  //                 "—"}
  //             </p>

  //             <p className="mt-1 text-[9px] font-semibold text-[#0B8B73]">
  //               {partner?.partnerId ||
  //                 property
  //                   ?.assignedPartner
  //                   ?.partnerCode ||
  //                 "—"}
  //             </p>

  //             <p className="mt-2 text-[9px] text-[#819194]">
  //               {partner?.email ||
  //                 property
  //                   ?.assignedPartner
  //                   ?.email ||
  //                 "—"}
  //             </p>

  //             <p className="mt-1 text-[9px] text-[#819194]">
  //               {partner?.phone ||
  //                 property
  //                   ?.assignedPartner
  //                   ?.phone ||
  //                 "—"}
  //             </p>
  //           </div>
  //         </SectionCard>

  //         {/* DOCUMENTS */}
  //         <SectionCard
  //           title="Documents"
  //           icon={FileText}
  //         >
  //           <div className="grid gap-2 sm:grid-cols-2">
  //             <DocumentLink
  //               label="Floor Plan"
  //               url={
  //                 property.floorPlan
  //               }
  //             />

  //             <DocumentLink
  //               label="RERA Certificate"
  //               url={
  //                 property.reraCertificate
  //               }
  //             />
  //           </div>
  //         </SectionCard>

  //         {/* VIDEO */}
  //         <SectionCard
  //           title="Property Video"
  //           icon={Video}
  //         >
  //           {property.video ? (
  //             <video
  //               controls
  //               className="max-h-[320px] w-full rounded-lg bg-black"
  //               src={property.video}
  //             />
  //           ) : property.videoLink ? (
  //             <a
  //               href={
  //                 property.videoLink
  //               }
  //               target="_blank"
  //               rel="noreferrer"
  //               className="flex items-center gap-2 rounded-lg border border-[#D7E5E1] bg-[#F7FBFA] p-3 text-[10px] font-semibold text-[#137C69]"
  //             >
  //               <ExternalLink
  //                 size={12}
  //               />
  //               Open Video Link
  //             </a>
  //           ) : (
  //             <EmptyText>
  //               No property video uploaded.
  //             </EmptyText>
  //           )}
  //         </SectionCard>

  //         {/* REVIEW */}
  //         <SectionCard
  //           title="Verification Review"
  //           icon={AlertCircle}
  //         >
  //           <div className="grid gap-3 sm:grid-cols-2">
  //             <SimpleValue
  //               label="Reviewed By"
  //               value={
  //                 property.review
  //                   ?.reviewedBy?.name ||
  //                 "—"
  //               }
  //             />

  //             <SimpleValue
  //               label="Reviewed At"
  //               value={formatDate(
  //                 property.review
  //                   ?.reviewedAt
  //               )}
  //             />
  //           </div>

  //           <div className="mt-3 rounded-lg bg-[#F8FAFA] p-3">
  //             <p className="text-[8px] font-bold uppercase text-[#8A989C]">
  //               Review Notes
  //             </p>

  //             <p className="mt-1 text-[10px] leading-5 text-[#536A70]">
  //               {property.review
  //                 ?.notes ||
  //                 "No review notes"}
  //             </p>
  //           </div>
  //         </SectionCard>

  //         {/* HISTORY */}
  //         <SectionCard
  //           title="Status History"
  //           icon={RefreshCw}
  //         >
  //           <div className="space-y-2">
  //             {(property.statusHistory ||
  //               [])
  //               .slice()
  //               .reverse()
  //               .map((item) => (
  //                 <div
  //                   key={item._id}
  //                   className="border-l-2 border-[#CFE5DF] pl-3"
  //                 >
  //                   <p className="text-[10px] font-bold text-[#36535B]">
  //                     {item.status}
  //                   </p>

  //                   <p className="mt-0.5 text-[8px] text-[#8A989C]">
  //                     {formatDate(
  //                       item.updatedAt
  //                     )}{" "}
  //                     •{" "}
  //                     {item.updatedBy
  //                       ?.name || "—"}
  //                   </p>

  //                   {item.remarks && (
  //                     <p className="mt-1 text-[9px] text-[#61777C]">
  //                       {item.remarks}
  //                     </p>
  //                   )}
  //                 </div>
  //               ))}
  //           </div>
  //         </SectionCard>

  //         {/* ACTION */}
  //         <div className="sticky bottom-0 -mx-5 border-t border-[#E2EBE9] bg-white p-4">
  //           {property.status ===
  //           "Live" ? (
  //             <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-[11px] font-bold text-emerald-600">
  //               <Radio size={14} />
  //               This property is currently Live
  //             </div>
  //           ) : (
  //             <>
  //               {!data?.canMakeLive && (
  //                 <div className="mb-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[9px] text-amber-700">
  //                   <AlertCircle
  //                     size={13}
  //                     className="mt-0.5 shrink-0"
  //                   />
  //                   Property cannot be published until verification and assigned-partner checks pass.
  //                 </div>
  //               )}

  //               <button
  //                 type="button"
  //                 disabled={
  //                   !data?.canMakeLive ||
  //                   actionLoading
  //                 }
  //                 onClick={
  //                   onMakeLive
  //                 }
  //                 className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#087C69] text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
  //               >
  //                 {actionLoading ? (
  //                   <LoaderCircle
  //                     size={14}
  //                     className="animate-spin"
  //                   />
  //                 ) : (
  //                   <Radio
  //                     size={14}
  //                   />
  //                 )}

  //                 Final Review Complete & Make Live
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </DrawerShell>
  //   );
  // }

  // function DrawerShell({
  //   children,
  //   onClose,
  // }) {
  //   return (
  //     <div className="fixed inset-0 z-[999]">
  //       <div
  //         onClick={onClose}
  //         className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
  //       />

  //       <div className="absolute bottom-0 right-0 top-0 w-full max-w-[720px] overflow-y-auto bg-[#F6FAF9] shadow-[-12px_0_35px_rgba(15,23,42,0.16)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  //         <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E3EBE9] bg-white px-5 py-4">
  //           <div>
  //             <h2 className="text-[18px] font-bold text-[#173B45]">
  //               Final Property Review
  //             </h2>

  //             <p className="mt-1 text-[10px] text-[#8A9A9D]">
  //               Review property details, documents, images, video and assigned partner before publishing.
  //             </p>
  //           </div>

  //           <button
  //             type="button"
  //             onClick={onClose}
  //             className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F6F5] text-[#63777B]"
  //           >
  //             <X size={15} />
  //           </button>
  //         </div>

  //         {children}
  //       </div>
  //     </div>
  //   );
  // }

  // function TableHead({
  //   children,
  // }) {
  //   return (
  //     <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wide">
  //       {children}
  //     </th>
  //   );
  // }

  // function MiniPill({
  //   children,
  // }) {
  //   return (
  //     <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F6F5] px-2 py-1 text-[8px] font-medium text-[#61777C]">
  //       {children}
  //     </span>
  //   );
  // }

  // function SectionCard({
  //   title,
  //   icon: Icon,
  //   children,
  // }) {
  //   return (
  //     <div className="rounded-xl border border-[#DDE8E5] bg-white p-4 shadow-sm">
  //       <div className="mb-3 flex items-center gap-2">
  //         <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF8F4] text-[#138B75]">
  //           <Icon size={13} />
  //         </div>

  //         <h4 className="text-[11px] font-bold text-[#31515A]">
  //           {title}
  //         </h4>

  //         <div className="h-px flex-1 bg-[#EDF2F1]" />
  //       </div>

  //       {children}
  //     </div>
  //   );
  // }

  // function CheckRow({
  //   label,
  //   ok,
  // }) {
  //   return (
  //     <div className="flex items-center gap-2 rounded-lg border border-[#E5ECEA] bg-[#FAFCFB] p-2.5">
  //       {ok ? (
  //         <CheckCircle2
  //           size={13}
  //           className="text-emerald-500"
  //         />
  //       ) : (
  //         <AlertCircle
  //           size={13}
  //           className="text-amber-500"
  //         />
  //       )}

  //       <span className="text-[9px] font-semibold text-[#51676D]">
  //         {label}
  //       </span>
  //     </div>
  //   );
  // }

  // function Detail({
  //   icon: Icon,
  //   label,
  //   value,
  // }) {
  //   return (
  //     <div className="flex items-start gap-2 rounded-lg border border-[#E5ECEA] bg-[#FAFCFB] p-3">
  //       <Icon
  //         size={13}
  //         className="mt-0.5 text-[#16806C]"
  //       />

  //       <div>
  //         <p className="text-[8px] font-bold uppercase text-[#98A4A7]">
  //           {label}
  //         </p>

  //         <p className="mt-1 text-[10px] font-semibold text-[#435D64]">
  //           {value}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // function DocumentLink({
  //   label,
  //   url,
  // }) {
  //   if (!url) {
  //     return (
  //       <div className="rounded-lg border border-dashed border-[#DCE5E3] p-3">
  //         <p className="text-[9px] font-semibold text-[#75868B]">
  //           {label}
  //         </p>

  //         <p className="mt-1 text-[8px] text-[#A0ACAF]">
  //           Not uploaded
  //         </p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <a
  //       href={url}
  //       target="_blank"
  //       rel="noreferrer"
  //       className="flex items-center justify-between rounded-lg border border-[#D7E5E1] bg-[#F7FBFA] p-3"
  //     >
  //       <div>
  //         <p className="text-[9px] font-bold text-[#486169]">
  //           {label}
  //         </p>

  //         <p className="mt-1 text-[8px] text-[#0A8A72]">
  //           View document
  //         </p>
  //       </div>

  //       <ExternalLink
  //         size={12}
  //         className="text-[#16806C]"
  //       />
  //     </a>
  //   );
  // }

  // function SimpleValue({
  //   label,
  //   value,
  // }) {
  //   return (
  //     <div>
  //       <p className="text-[8px] font-bold uppercase text-[#98A4A7]">
  //         {label}
  //       </p>

  //       <p className="mt-1 text-[10px] font-semibold text-[#486169]">
  //         {value}
  //       </p>
  //     </div>
  //   );
  // }

  // function EmptyText({
  //   children,
  // }) {
  //   return (
  //     <div className="rounded-lg border border-dashed border-[#DCE5E3] py-6 text-center text-[9px] text-[#95A2A5]">
  //       {children}
  //     </div>
  //   );
  // }





  import React, {
    useEffect,
    useMemo,
    useState,
  } from "react";

  import {
    Search,
    Eye,
    CheckCircle2,
    Building2,
    Radio,
    UserCheck,
    AlertCircle,
    X,
    MapPin,
    IndianRupee,
    Ruler,
    BedDouble,
    Bath,
    Car,
    Layers3,
    Compass,
    Sofa,
    FileText,
    Image as ImageIcon,
    Video,
    ExternalLink,
    RefreshCw,
    LoaderCircle,
    BadgeCheck,
    UserRound,
    ChevronLeft,
    ChevronRight,
  } from "lucide-react";

  import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

  import Swal from "sweetalert2";

  import {
    getPropertyPublishingSummaryApi,
    getReadyForFinalReviewPropertiesApi,
    getLivePublishingPropertiesApi,
    getFinalReviewPropertyApi,
    makePropertyLiveApi,
  } from "../../../Services/propertyPublishingService";

  const formatMoney = (value) => {
    const amount = Number(value || 0);

    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }

    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const formatDate = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  function FinalReviewMapFix() {
    const map = useMap();
    useEffect(() => {
      const timer = setTimeout(() => map.invalidateSize(), 120);
      return () => clearTimeout(timer);
    }, [map]);
    return null;
  }

  export default function PropertyVerificationCenter() {
    const [activeTab, setActiveTab] =
      useState("Ready for Final Review");

    const [summary, setSummary] =
      useState({
        readyForFinalReview: 0,
        live: 0,
        verifiedWithoutPartner: 0,
        totalVerified: 0,
      });

    const [properties, setProperties] =
      useState([]);

    const [search, setSearch] =
      useState("");

    const [loading, setLoading] =
      useState(true);

    // =====================================================
    // PAGINATION
    // =====================================================
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages =
      Math.ceil(properties.length / itemsPerPage) || 1;

    const paginatedProperties = properties.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const [detailLoading, setDetailLoading] =
      useState(false);

    const [selectedDetail, setSelectedDetail] =
      useState(null);

    const [actionLoading, setActionLoading] =
      useState(false);

    const loadSummary = async () => {
      try {
        const response =
          await getPropertyPublishingSummaryApi();

        if (response?.success) {
          setSummary(
            response.data || {}
          );
        }
      } catch (error) {
        console.error(
          "Publishing summary error:",
          error
        );
      }
    };

    const loadProperties = async () => {
      try {
        setLoading(true);

        const params = {
          search:
            search.trim() ||
            undefined,
        };

        const response =
          activeTab === "Live Properties"
            ? await getLivePublishingPropertiesApi(
                params
              )
            : await getReadyForFinalReviewPropertiesApi(
                params
              );

        if (response?.success) {
          setProperties(
            response.data || []
          );
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error(
          "Publishing properties error:",
          error
        );

        setProperties([]);

        Swal.fire({
          icon: "error",
          title:
            "Unable to load properties",
          text:
            error?.response?.data?.message ||
            "Property data could not be loaded.",
          confirmButtonColor:
            "#00796B",
        });
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      loadSummary();
    }, []);

    useEffect(() => {
      setCurrentPage(1);
    }, [activeTab, search]);

    useEffect(() => {
      const timer = setTimeout(
        loadProperties,
        250
      );

      return () =>
        clearTimeout(timer);
    }, [
      activeTab,
      search,
    ]);

    const refreshAll = async () => {
      await Promise.all([
        loadSummary(),
        loadProperties(),
      ]);
    };

    const openFinalReview = async (
      propertyId
    ) => {
      try {
        setDetailLoading(true);
        setSelectedDetail(null);

        const response =
          await getFinalReviewPropertyApi(
            propertyId
          );

        if (response?.success) {
          setSelectedDetail(
            response.data
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title:
            "Unable to open final review",
          text:
            error?.response?.data?.message ||
            "Property details could not be loaded.",
          confirmButtonColor:
            "#00796B",
        });
      } finally {
        setDetailLoading(false);
      }
    };

    const makeLive = async () => {
      const property =
        selectedDetail?.property;

      if (!property?._id) return;

      const result =
        await Swal.fire({
          icon: "question",
          title:
            "Make Property Live?",
          html: `
            <div style="font-size:12px;color:#667085;line-height:1.7">
              You are publishing
              <strong>${property.title || property.propertyId}</strong>.
              <br/>
              It will become visible in the public live-property feed.
            </div>
          `,
          input: "textarea",
          inputPlaceholder:
            "Optional final review notes...",
          showCancelButton: true,
          confirmButtonText:
            "Final Review Complete & Make Live",
          cancelButtonText:
            "Cancel",
          confirmButtonColor:
            "#00796B",
        });

      if (!result.isConfirmed) {
        return;
      }

      try {
        setActionLoading(true);

        const response =
          await makePropertyLiveApi(
            property._id,
            {
              notes:
                result.value ||
                "Final review completed by admin.",
            }
          );

        if (response?.success) {
          await Swal.fire({
            icon: "success",
            title:
              "Property is Live",
            text:
              response.message,
            confirmButtonColor:
              "#00796B",
          });

          setSelectedDetail(null);

          await refreshAll();

          setActiveTab(
            "Live Properties"
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title:
            "Unable to make property Live",
          text:
            error?.response?.data?.message ||
            "Final publishing failed.",
          confirmButtonColor:
            "#00796B",
        });
      } finally {
        setActionLoading(false);
      }
    };

    const cards = useMemo(
      () => [
        {
          title:
            "READY FOR FINAL REVIEW",
          value:
            summary.readyForFinalReview ||
            0,
          icon: BadgeCheck,
          description:
            "Verified + partner assigned",
        },
        {
          title:
            "LIVE PROPERTIES",
          value:
            summary.live || 0,
          icon: Radio,
          description:
            "Currently public",
        },
        {
          title:
            "VERIFIED TOTAL",
          value:
            summary.totalVerified ||
            0,
          icon: CheckCircle2,
          description:
            "Verification completed",
        },
        {
          title:
            "WAITING FOR PARTNER",
          value:
            summary.verifiedWithoutPartner ||
            0,
          icon: UserCheck,
          description:
            "Verified but no partner",
        },
      ],
      [summary]
    );

    return (
      <div className="min-h-screen  p-3 text-[#1D2939] sm:p-1">
        {/* HEADER */}
        <div className="flex flex-col gap-3  p-1  sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
              Property Final Review & Publishing
            </h1>

            <p className="mt-1 text-[11px] text-[#849497]">
              Only verified properties with an assigned verified partner appear in the final review queue.
            </p>
          </div>

          <button
            type="button"
            onClick={refreshAll}
            className="flex h-9 w-fit items-center gap-2 rounded-lg border border-[#BFD8D2] bg-white px-3 text-[11px] font-semibold text-[#267D6D]"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>

        {/* SUMMARY */}
        <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {cards.map(
            ({
              title,
              value,
              icon: Icon,
              description,
            }) => (
              <div
                key={title}
                className="rounded-xl border border-[#DCE5E3] bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[8px] font-bold tracking-wide text-[#718087]">
                      {title}
                    </p>

                    <p className="mt-2 text-[26px] font-bold text-[#173B45]">
                      {value}
                    </p>

                    <p className="mt-1 text-[9px] text-[#94A1A4]">
                      {description}
                    </p>
                  </div>

                  <div className="rounded-lg bg-[#EAF8F4] p-2 text-[#12846F]">
                    <Icon size={16} />
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* CONTENT */}
        <div className="mt-3 overflow-hidden rounded-xl border border-[#DCE5E3] bg-white shadow-sm">
          {/* TABS */}
          <div className="flex overflow-x-auto border-b border-[#E7EEEC]">
            {[
              "Ready for Final Review",
              "Live Properties",
            ].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`relative min-w-max px-5 py-3 text-[11px] font-semibold ${
                  activeTab === tab
                    ? "text-[#087C69]"
                    : "text-[#8A989C]"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#087C69]" />
                )}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="border-b border-[#E7EEEC] p-3">
            <div className="relative max-w-[360px]">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search property ID, name, city, partner..."
                className="h-9 w-full rounded-lg border border-[#D8E1DF] bg-white pl-9 pr-3 text-[11px] outline-none focus:border-[#5DAD9E]"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px]">
              <thead>
                <tr className="bg-[#073C5C] text-white">
                  <TableHead>
                    Property
                  </TableHead>

                  <TableHead>
                    Location
                  </TableHead>

                  <TableHead>
                    Assigned Partner
                  </TableHead>

                  <TableHead>
                    Verification
                  </TableHead>

                  <TableHead>
                    Media / Docs
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead>
                    Action
                  </TableHead>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center"
                    >
                      <LoaderCircle
                        size={20}
                        className="mx-auto animate-spin text-[#0A8A72]"
                      />

                      <p className="mt-2 text-[11px] text-[#859396]">
                        Loading properties...
                      </p>
                    </td>
                  </tr>
                ) : paginatedProperties.length ? (
                  paginatedProperties.map(
                    (property) => {
                      const partner =
                        property
                          ?.assignedPartner
                          ?.partnerId;

                      const imageCount =
                        property.images
                          ?.length || 0;

                      const docCount =
                        [
                          property.floorPlan,
                          property.reraCertificate,
                        ].filter(
                          Boolean
                        ).length;

                      const hasVideo =
                        Boolean(
                          property.video ||
                            property.videoLink
                        );

                      return (
                        <tr
                          key={
                            property._id
                          }
                          className="border-b border-[#EDF2F1] last:border-0 hover:bg-[#F9FCFB]"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-11 w-14 overflow-hidden rounded-md bg-[#EEF4F5]">
                                {property
                                  .images?.[0]
                                  ?.url ? (
                                  <img
                                    src={
                                      property
                                        .images[0]
                                        .url
                                    }
                                    alt={
                                      property.title
                                    }
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-[#9BACAF]">
                                    <Building2
                                      size={16}
                                    />
                                  </div>
                                )}
                              </div>

                              <div>
                                <p className="max-w-[200px] text-[11px] font-bold text-[#304E56]">
                                  {property.title}
                                </p>

                                <p className="mt-1 text-[9px] font-semibold text-[#0B8B73]">
                                  {property.propertyId}
                                </p>

                                <p className="mt-1 text-[8px] text-[#98A4A7]">
                                  {property.category} • {property.transactionType}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <p className="text-[10px] font-semibold text-[#50676D]">
                              {property.city ||
                                "—"}
                            </p>

                            <p className="mt-1 text-[9px] text-[#98A4A7]">
                              {property.locality ||
                                property.address ||
                                "—"}
                            </p>
                          </td>

                          <td className="px-4 py-4">
                            <p className="text-[10px] font-bold text-[#425E65]">
                              {partner?.name ||
                                property
                                  ?.assignedPartner
                                  ?.name ||
                                "—"}
                            </p>

                            <p className="mt-1 text-[9px] text-[#0A8A72]">
                              {partner?.partnerId ||
                                property
                                  ?.assignedPartner
                                  ?.partnerCode ||
                                "—"}
                            </p>

                            <p className="mt-1 text-[8px] text-[#98A4A7]">
                              {partner?.partnerType ||
                                property
                                  ?.assignedPartner
                                  ?.partnerType ||
                                "—"}
                            </p>
                          </td>

                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
                              <CheckCircle2
                                size={10}
                              />
                              {
                                property.propertyVerificationStatus
                              }
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              <MiniPill>
                                <ImageIcon
                                  size={9}
                                />
                                {imageCount} images
                              </MiniPill>

                              <MiniPill>
                                <FileText
                                  size={9}
                                />
                                {docCount} docs
                              </MiniPill>

                              <MiniPill>
                                <Video size={9} />
                                {hasVideo
                                  ? "Video"
                                  : "No video"}
                              </MiniPill>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full border px-2 py-1 text-[9px] font-bold ${
                                property.status ===
                                "Live"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                  : "border-blue-200 bg-blue-50 text-blue-600"
                              }`}
                            >
                              {property.status}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <button
                              type="button"
                              onClick={() =>
                                openFinalReview(
                                  property._id
                                )
                              }
                              className="flex items-center gap-1.5 rounded-lg border border-[#CDE0DC] bg-white px-3 py-2 text-[10px] font-bold text-[#167C69] hover:bg-[#F2FAF7]"
                            >
                              <Eye size={12} />
                              {property.status ===
                              "Live"
                                ? "View Property"
                                : "Final Review"}
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center"
                    >
                      <Building2
                        size={22}
                        className="mx-auto text-[#A5B1B3]"
                      />

                      <p className="mt-2 text-[11px] font-semibold text-[#61777C]">
                        No properties found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!loading && properties.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-[#EDF2F1] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[9px] text-[#8A989C]">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  properties.length
                )}{" "}
                to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  properties.length
                )}{" "}
                of {properties.length} properties
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
        </div>

        {(selectedDetail ||
          detailLoading) && (
          <FinalReviewDrawer
            data={selectedDetail}
            loading={detailLoading}
            actionLoading={
              actionLoading
            }
            onClose={() =>
              setSelectedDetail(null)
            }
            onMakeLive={makeLive}
          />
        )}
      </div>
    );
  }

  function FinalReviewDrawer({
    data,
    loading,
    actionLoading,
    onClose,
    onMakeLive,
  }) {
    const property =
      data?.property;

    const checks =
      data?.checks || {};

    const latitude =
      property?.latitude ??
      property?.location?.latitude ??
      null;

    const longitude =
      property?.longitude ??
      property?.location?.longitude ??
      null;

    const partner =
      property?.assignedPartner
        ?.partnerId;

    if (loading) {
      return (
        <DrawerShell
          onClose={onClose}
        >
          <div className="flex min-h-[500px] items-center justify-center">
            <LoaderCircle
              size={28}
              className="animate-spin text-[#0B8B73]"
            />
          </div>
        </DrawerShell>
      );
    }

    if (!property) {
      return (
        <DrawerShell
          onClose={onClose}
        >
          <div className="flex min-h-[500px] items-center justify-center text-[11px] text-[#8A989C]">
            Property detail not available.
          </div>
        </DrawerShell>
      );
    }

    return (
      <DrawerShell
        onClose={onClose}
      >
        <div className="space-y-4 p-5">
          {/* PROPERTY HEADER */}
          <div className="rounded-xl border border-[#DDE8E5] bg-white p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#0B8B73]">
                  {property.propertyId}
                </p>

                <h3 className="mt-1 text-[20px] font-bold text-[#173C46]">
                  {property.title}
                </h3>

                <p className="mt-1 flex items-center gap-1 text-[10px] text-[#819194]">
                  <MapPin size={11} />
                  {[
                    property.locality,
                    property.city,
                    property.address,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                  Verification:{" "}
                  {
                    property.propertyVerificationStatus
                  }
                </span>

                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600">
                  Status: {property.status}
                </span>
              </div>
            </div>
          </div>

          {/* FINAL REVIEW LOCATION MAP */}
          <section className="rounded-xl border border-[#DDE8E5] bg-white p-4">
            <div className="mb-3">
              <p className="text-[12px] font-bold text-[#173C46]">Property Location</p>
              <p className="mt-0.5 text-[9px] text-[#819194]">Exact location saved with the property.</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <SimpleValue label="City" value={property.city || property.location?.city || "—"} />
              <SimpleValue label="Locality" value={property.locality || property.location?.locality || "—"} />
              <SimpleValue label="Property Type" value={property.propertyType || "—"} />
              <SimpleValue label="Building Type" value={property.buildingType || "—"} />
              <SimpleValue label="Latitude" value={latitude ?? "—"} />
              <SimpleValue label="Longitude" value={longitude ?? "—"} />
            </div>

            <div className="mt-3 rounded-xl border border-[#DDE8E5] overflow-hidden bg-[#EEF3F5]">
              {latitude != null && longitude != null ? (
                <MapContainer
                  center={[Number(latitude), Number(longitude)]}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: "320px", width: "100%" }}
                >
                  <FinalReviewMapFix />
                  <TileLayer
                    attribution="© OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[Number(latitude), Number(longitude)]} />
                </MapContainer>
              ) : (
                <div className="flex h-[320px] items-center justify-center text-[10px] text-[#8A989C]">
                  Location coordinates are not available for this property.
                </div>
              )}
            </div>

            <p className="mt-3 rounded-lg bg-[#F8FAFA] p-3 text-[10px] leading-5 text-[#536A70]">
              {property.address || property.location?.address || "Address not available."}
            </p>
          </section>

          {/* FINAL CHECKS */}
          <SectionCard
            title="Final Publishing Checks"
            icon={CheckCircle2}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <CheckRow
                label="Property Verified"
                ok={
                  checks.propertyVerified
                }
              />

              <CheckRow
                label="Partner Assigned"
                ok={
                  checks.partnerAssigned
                }
              />

              <CheckRow
                label="Assigned Partner Verified"
                ok={
                  checks.partnerVerified
                }
              />

              <CheckRow
                label="Partner Not Blocked"
                ok={
                  checks.partnerNotBlocked
                }
              />
            </div>
          </SectionCard>

          {/* IMAGES */}
          <SectionCard
            title={`Property Images (${property.images?.length || 0})`}
            icon={ImageIcon}
          >
            {property.images?.length ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.images.map(
                  (image) => (
                    <a
                      key={
                        image._id ||
                        image.url
                      }
                      href={image.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative h-28 overflow-hidden rounded-lg bg-slate-100"
                    >
                      <img
                        src={image.url}
                        alt={
                          property.title
                        }
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </a>
                  )
                )}
              </div>
            ) : (
              <EmptyText>
                No property images uploaded.
              </EmptyText>
            )}
          </SectionCard>

          {/* BASIC DETAIL */}
          <SectionCard
            title="Property Details"
            icon={Building2}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <Detail
                icon={IndianRupee}
                label="Price"
                value={formatMoney(
                  property.price
                )}
              />

              <Detail
                icon={Ruler}
                label="Property Size"
                value={`${property.propertySize || "—"} ${property.sizeUnit || ""}`}
              />

              <Detail
                icon={BedDouble}
                label="Bedrooms"
                value={
                  property.bedrooms ||
                  "—"
                }
              />

              <Detail
                icon={Bath}
                label="Bathrooms"
                value={
                  property.bathrooms ||
                  "—"
                }
              />

              <Detail
                icon={Car}
                label="Parking"
                value={
                  property.parking ||
                  "—"
                }
              />

              <Detail
                icon={Layers3}
                label="Floor"
                value={`${property.floorNo ?? "—"} / ${property.totalFloors ?? "—"}`}
              />

              <Detail
                icon={Compass}
                label="Facing"
                value={
                  property.facing ||
                  "—"
                }
              />

              <Detail
                icon={Sofa}
                label="Furnishing"
                value={
                  property.furnishing ||
                  "—"
                }
              />
            </div>

            <div className="mt-3 rounded-lg bg-[#F8FAFA] p-3">
              <p className="text-[8px] font-bold uppercase text-[#8A989C]">
                Description
              </p>

              <p className="mt-1 whitespace-pre-wrap text-[10px] leading-5 text-[#536A70]">
                {property.description ||
                  "No description"}
              </p>
            </div>

            {property.amenities?.length >
              0 && (
              <div className="mt-3">
                <p className="mb-2 text-[8px] font-bold uppercase text-[#8A989C]">
                  Amenities
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {property.amenities.map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#EDF8F5] px-2.5 py-1 text-[9px] font-semibold text-[#197C69]"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </SectionCard>

          {/* PARTNER */}
          <SectionCard
            title="Assigned Partner"
            icon={UserRound}
          >
            <div className="rounded-lg border border-[#E4ECEA] bg-[#FAFCFB] p-3">
              <p className="text-[11px] font-bold text-[#35545C]">
                {partner?.name ||
                  property
                    ?.assignedPartner
                    ?.name ||
                  "—"}
              </p>

              <p className="mt-1 text-[9px] font-semibold text-[#0B8B73]">
                {partner?.partnerId ||
                  property
                    ?.assignedPartner
                    ?.partnerCode ||
                  "—"}
              </p>

              <p className="mt-2 text-[9px] text-[#819194]">
                {partner?.email ||
                  property
                    ?.assignedPartner
                    ?.email ||
                  "—"}
              </p>

              <p className="mt-1 text-[9px] text-[#819194]">
                {partner?.phone ||
                  property
                    ?.assignedPartner
                    ?.phone ||
                  "—"}
              </p>
            </div>
          </SectionCard>

          {/* DOCUMENTS */}
          <SectionCard
            title="Documents"
            icon={FileText}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <DocumentLink
                label="Floor Plan"
                url={
                  property.floorPlan
                }
              />

              <DocumentLink
                label="RERA Certificate"
                url={
                  property.reraCertificate
                }
              />
            </div>
          </SectionCard>

          {/* VIDEO */}
          <SectionCard
            title="Property Video"
            icon={Video}
          >
            {property.video ? (
              <video
                controls
                className="max-h-[320px] w-full rounded-lg bg-black"
                src={property.video}
              />
            ) : property.videoLink ? (
              <a
                href={
                  property.videoLink
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[#D7E5E1] bg-[#F7FBFA] p-3 text-[10px] font-semibold text-[#137C69]"
              >
                <ExternalLink
                  size={12}
                />
                Open Video Link
              </a>
            ) : (
              <EmptyText>
                No property video uploaded.
              </EmptyText>
            )}
          </SectionCard>

          {/* REVIEW */}
          <SectionCard
            title="Verification Review"
            icon={AlertCircle}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <SimpleValue
                label="Reviewed By"
                value={
                  property.review
                    ?.reviewedBy?.name ||
                  "—"
                }
              />

              <SimpleValue
                label="Reviewed At"
                value={formatDate(
                  property.review
                    ?.reviewedAt
                )}
              />
            </div>

            <div className="mt-3 rounded-lg bg-[#F8FAFA] p-3">
              <p className="text-[8px] font-bold uppercase text-[#8A989C]">
                Review Notes
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#536A70]">
                {property.review
                  ?.notes ||
                  "No review notes"}
              </p>
            </div>
          </SectionCard>

          {/* HISTORY */}
          <SectionCard
            title="Status History"
            icon={RefreshCw}
          >
            <div className="space-y-2">
              {(property.statusHistory ||
                [])
                .slice()
                .reverse()
                .map((item) => (
                  <div
                    key={item._id}
                    className="border-l-2 border-[#CFE5DF] pl-3"
                  >
                    <p className="text-[10px] font-bold text-[#36535B]">
                      {item.status}
                    </p>

                    <p className="mt-0.5 text-[8px] text-[#8A989C]">
                      {formatDate(
                        item.updatedAt
                      )}{" "}
                      •{" "}
                      {item.updatedBy
                        ?.name || "—"}
                    </p>

                    {item.remarks && (
                      <p className="mt-1 text-[9px] text-[#61777C]">
                        {item.remarks}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </SectionCard>

          {/* ACTION */}
          <div className="sticky bottom-0 -mx-5 border-t border-[#E2EBE9] bg-white p-4">
            {property.status ===
            "Live" ? (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-[11px] font-bold text-emerald-600">
                <Radio size={14} />
                This property is currently Live
              </div>
            ) : (
              <>
                {!data?.canMakeLive && (
                  <div className="mb-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[9px] text-amber-700">
                    <AlertCircle
                      size={13}
                      className="mt-0.5 shrink-0"
                    />
                    Property cannot be published until verification and assigned-partner checks pass.
                  </div>
                )}

                <button
                  type="button"
                  disabled={
                    !data?.canMakeLive ||
                    actionLoading
                  }
                  onClick={
                    onMakeLive
                  }
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#087C69] text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {actionLoading ? (
                    <LoaderCircle
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <Radio
                      size={14}
                    />
                  )}

                  Final Review Complete & Make Live
                </button>
              </>
            )}
          </div>
        </div>
      </DrawerShell>
    );
  }

  function DrawerShell({
    children,
    onClose,
  }) {
    return (
      <div className="fixed inset-0 z-[999]">
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
        />

        <div className="absolute bottom-0 right-0 top-0 w-full max-w-[720px] overflow-y-auto bg-[#F6FAF9] shadow-[-12px_0_35px_rgba(15,23,42,0.16)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E3EBE9] bg-white px-5 py-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#173B45]">
                Final Property Review
              </h2>

              <p className="mt-1 text-[10px] text-[#8A9A9D]">
                Review property details, documents, images, video and assigned partner before publishing.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F6F5] text-[#63777B]"
            >
              <X size={15} />
            </button>
          </div>

          {children}
        </div>
      </div>
    );
  }

  function TableHead({
    children,
  }) {
    return (
      <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wide">
        {children}
      </th>
    );
  }

  function MiniPill({
    children,
  }) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F6F5] px-2 py-1 text-[8px] font-medium text-[#61777C]">
        {children}
      </span>
    );
  }

  function SectionCard({
    title,
    icon: Icon,
    children,
  }) {
    return (
      <div className="rounded-xl border border-[#DDE8E5] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF8F4] text-[#138B75]">
            <Icon size={13} />
          </div>

          <h4 className="text-[11px] font-bold text-[#31515A]">
            {title}
          </h4>

          <div className="h-px flex-1 bg-[#EDF2F1]" />
        </div>

        {children}
      </div>
    );
  }

  function CheckRow({
    label,
    ok,
  }) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[#E5ECEA] bg-[#FAFCFB] p-2.5">
        {ok ? (
          <CheckCircle2
            size={13}
            className="text-emerald-500"
          />
        ) : (
          <AlertCircle
            size={13}
            className="text-amber-500"
          />
        )}

        <span className="text-[9px] font-semibold text-[#51676D]">
          {label}
        </span>
      </div>
    );
  }

  function Detail({
    icon: Icon,
    label,
    value,
  }) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-[#E5ECEA] bg-[#FAFCFB] p-3">
        <Icon
          size={13}
          className="mt-0.5 text-[#16806C]"
        />

        <div>
          <p className="text-[8px] font-bold uppercase text-[#98A4A7]">
            {label}
          </p>

          <p className="mt-1 text-[10px] font-semibold text-[#435D64]">
            {value}
          </p>
        </div>
      </div>
    );
  }

  function DocumentLink({
    label,
    url,
  }) {
    if (!url) {
      return (
        <div className="rounded-lg border border-dashed border-[#DCE5E3] p-3">
          <p className="text-[9px] font-semibold text-[#75868B]">
            {label}
          </p>

          <p className="mt-1 text-[8px] text-[#A0ACAF]">
            Not uploaded
          </p>
        </div>
      );
    }

    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between rounded-lg border border-[#D7E5E1] bg-[#F7FBFA] p-3"
      >
        <div>
          <p className="text-[9px] font-bold text-[#486169]">
            {label}
          </p>

          <p className="mt-1 text-[8px] text-[#0A8A72]">
            View document
          </p>
        </div>

        <ExternalLink
          size={12}
          className="text-[#16806C]"
        />
      </a>
    );
  }

  function SimpleValue({
    label,
    value,
  }) {
    return (
      <div>
        <p className="text-[8px] font-bold uppercase text-[#98A4A7]">
          {label}
        </p>

        <p className="mt-1 text-[10px] font-semibold text-[#486169]">
          {value}
        </p>
      </div>
    );
  }

  function EmptyText({
    children,
  }) {
    return (
      <div className="rounded-lg border border-dashed border-[#DCE5E3] py-6 text-center text-[9px] text-[#95A2A5]">
        {children}
      </div>
    );
  }
