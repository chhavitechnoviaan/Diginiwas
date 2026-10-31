// // import { useEffect, useMemo, useState } from "react";
// // import {
// //   Search,
// //   RefreshCw,
// //   UserPlus,
// //   X,
// //   UsersRound,
// //   UserRound,
// //   AlertTriangle,
// // } from "lucide-react";
// // import Swal from "sweetalert2";
// // import {
// //   getTeamPartnersApi,
// //   addSubAgentApplicationApi,
// //   allocateTeamCreditsApi,
// //   getTeamMemberCreditHistoryApi,
// // } from "../../../Services/partnerService";

// // const canAllocate = (member) =>
// //   member?.accountType === "subagent" &&
// //   member?.isApproved === true &&
// //   member?.isVerified === true &&
// //   member?.applicationStatus === "Verified" &&
// //   !member?.isBlocked;

// // const statusClass = (status) => {
// //   const map = {
// //     Pending_Email_Verification:
// //       "bg-[#FFF7E8] text-[#A86F1C]",
// //     Pending_Phone_Verification:
// //       "bg-[#FFF7E8] text-[#A86F1C]",
// //     Submitted:
// //       "bg-[#EAF5FF] text-[#3978A8]",
// //     Under_Review:
// //       "bg-[#F3EEFF] text-[#7057A5]",
// //     Approved_Not_Verified:
// //       "bg-[#F3EEFF] text-[#7057A5]",
// //     Verified:
// //       "bg-[#E8F8F1] text-[#16825F]",
// //     Action_Required:
// //       "bg-[#FFF1E9] text-[#B35F38]",
// //     Rejected:
// //       "bg-[#FFF0F0] text-[#C94A4A]",
// //   };

// //   return map[status] || "bg-[#F1F5F6] text-[#64777F]";
// // };

// // export default function TeamPartnerManagement() {
// //   const [teams, setTeams] = useState([]);
// //   const [selected, setSelected] = useState(null);
// //   const [history, setHistory] = useState(null);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   const load = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await getTeamPartnersApi();
// //       setTeams(response?.data || []);

// //       if (selected?._id) {
// //         const updated = (response?.data || []).find(
// //           (x) => x._id === selected._id
// //         );
// //         if (updated) setSelected(updated);
// //       }
// //     } catch (error) {
// //       Swal.fire(
// //         "Error",
// //         error?.response?.data?.message ||
// //           "Unable to load teams",
// //         "error"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     load();
// //   }, []);

// //   const filtered = useMemo(() => {
// //     const q = search.trim().toLowerCase();
// //     if (!q) return teams;

// //     return teams.filter((item) =>
// //       [
// //         item.name,
// //         item.partnerId,
// //         item.email,
// //         item.business?.businessName,
// //       ]
// //         .filter(Boolean)
// //         .some((x) =>
// //           String(x).toLowerCase().includes(q)
// //         )
// //     );
// //   }, [teams, search]);

// //   const addSubAgent = async (owner) => {
// //     const result = await Swal.fire({
// //       title: "Create Sub-Agent Application",
// //       html: `
// //         <input id="sa-name" class="swal2-input" placeholder="Full name" />
// //         <input id="sa-email" class="swal2-input" placeholder="Email" />
// //         <input id="sa-phone" class="swal2-input" placeholder="Phone" />

// //         <select id="sa-role" class="swal2-select">
// //           <option value="AGENT">Agent</option>
// //           <option value="MANAGER">Manager</option>
// //         </select>

// //         <input id="sa-front" class="swal2-input" placeholder="Aadhaar Front URL" />
// //         <input id="sa-back" class="swal2-input" placeholder="Aadhaar Back URL" />
// //         <input id="sa-city" class="swal2-input" placeholder="City" />

// //         <div style="font-size:11px;text-align:left;margin:12px 24px;color:#64777f">
// //           Sub-Agent will complete Email OTP + Mobile OTP.
// //           DigiNiwas Admin approval and final verification are compulsory.
// //         </div>
// //       `,
// //       showCancelButton: true,
// //       confirmButtonText: "Create Application",
// //       confirmButtonColor: "#1F3C50",
// //       preConfirm: () => {
// //         const name =
// //           document.getElementById("sa-name")?.value?.trim();
// //         const email =
// //           document.getElementById("sa-email")?.value?.trim();
// //         const phone =
// //           document.getElementById("sa-phone")?.value?.trim();
// //         const teamRole =
// //           document.getElementById("sa-role")?.value;
// //         const frontUrl =
// //           document.getElementById("sa-front")?.value?.trim();
// //         const backUrl =
// //           document.getElementById("sa-back")?.value?.trim();
// //         const city =
// //           document.getElementById("sa-city")?.value?.trim();

// //         if (!name || !email || !phone || !frontUrl) {
// //           Swal.showValidationMessage(
// //             "Name, email, phone and Aadhaar Front URL are required"
// //           );
// //           return false;
// //         }

// //         return {
// //           name,
// //           email,
// //           phone,
// //           teamRole,
// //           identityDocuments: [
// //             {
// //               documentType: "AADHAAR",
// //               frontUrl,
// //               backUrl: backUrl || "",
// //               numberMasked: "",
// //               status: "Pending",
// //             },
// //           ],
// //           business: {
// //             businessName:
// //               owner.business?.businessName || "",
// //             businessType: "Agency Sub Agent",
// //           },
// //           location: {
// //             city,
// //             state: owner.location?.state || "Haryana",
// //             country: "India",
// //           },
// //           rera: {
// //             applicable: false,
// //             state: "Haryana",
// //           },
// //           privacyConsent: {
// //             accepted: true,
// //             privacyNoticeVersion: "v1",
// //           },
// //         };
// //       },
// //     });

// //     if (!result.isConfirmed) return;

// //     try {
// //       const response = await addSubAgentApplicationApi(
// //         owner._id,
// //         result.value
// //       );

// //       await Swal.fire(
// //         "Created",
// //         response?.message,
// //         "success"
// //       );

// //       await load();
// //     } catch (error) {
// //       Swal.fire(
// //         "Error",
// //         error?.response?.data?.error ||
// //           error?.response?.data?.message ||
// //           error.message,
// //         "error"
// //       );
// //     }
// //   };

// //   const allocate = async (owner, member) => {
// //     if (!canAllocate(member)) {
// //       return Swal.fire(
// //         "Verification Pending",
// //         "Admin approval and final verification are required before credit allocation.",
// //         "warning"
// //       );
// //     }

// //     const result = await Swal.fire({
// //       title: `Allocate credits to ${member.name}`,
// //       input: "number",
// //       inputAttributes: { min: 1 },
// //       showCancelButton: true,
// //       confirmButtonText: "Allocate",
// //       confirmButtonColor: "#1F3C50",
// //     });

// //     if (!result.isConfirmed || !result.value) return;

// //     try {
// //       await allocateTeamCreditsApi(
// //         owner._id,
// //         member._id,
// //         { credits: Number(result.value) }
// //       );

// //       await Swal.fire(
// //         "Success",
// //         "Credits allocated successfully",
// //         "success"
// //       );

// //       await load();
// //     } catch (error) {
// //       Swal.fire(
// //         "Error",
// //         error?.response?.data?.error ||
// //           "Unable to allocate credits",
// //         "error"
// //       );
// //     }
// //   };

// //   const openHistory = async (owner, member) => {
// //     try {
// //       const response =
// //         await getTeamMemberCreditHistoryApi(
// //           owner._id,
// //           member._id
// //         );

// //       setHistory(response?.data);
// //     } catch (error) {
// //       Swal.fire(
// //         "Error",
// //         "Unable to load history",
// //         "error"
// //       );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen p-2 text-[#173247]">
// //       {/* <div className="rounded-[18px] bg-[#1F3C50] p-5"> */}
        

// //         <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
// //           Team Partner Management
// //         </h1>

// //         <p className="mt-1 text-[10px] font-medium text-[#8998AF] sm:text-[11px]">
// //           Agency owners, Sub-Agent applications, shared wallets and credit allocations.
// //         </p>
// //       {/* </div> */}

// //       <div className="mt-3 flex gap-2 rounded-[16px] border border-[#E0E8EC] bg-white p-3">
// //         <div className="relative flex-1">
// //           <Search
// //             size={15}
// //             className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8DA0A9]"
// //           />
// //           <input
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             placeholder="Search agency..."
// //             className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none"
// //           />
// //         </div>

// //         <button
// //           onClick={load}
// //           className="flex items-center gap-2 rounded-xl border border-[#DCE5E9] px-4 text-xs font-bold"
// //         >
// //           <RefreshCw size={14} />
// //           Refresh
// //         </button>
// //       </div>

// //       <div className="mt-3 grid gap-3 xl:grid-cols-2">
// //         {loading ? (
// //           <div className="col-span-full rounded-[16px] bg-white py-16 text-center text-xs">
// //             Loading...
// //           </div>
// //         ) : (
// //           filtered.map((team) => (
// //             <div
// //               key={team._id}
// //               className="rounded-[18px] border border-[#E0E8EC] bg-white p-4"
// //             >
// //               <div className="flex justify-between gap-3">
// //                 <div>
// //                   <p className="text-[9px] font-bold uppercase text-[#35A98C]">
// //                     Agency Owner
// //                   </p>
// //                   <h3 className="mt-1 text-base font-extrabold">
// //                     {team.business?.businessName || team.name}
// //                   </h3>
// //                   <p className="mt-1 text-[10px] text-[#7C8E97]">
// //                     {team.name} · {team.partnerId}
// //                   </p>
// //                 </div>

// //                 <span className="h-fit rounded-full bg-[#E8F8F1] px-2.5 py-1 text-[9px] font-bold text-[#16825F]">
// //                   Verified
// //                 </span>
// //               </div>

// //               <div className="mt-4 grid grid-cols-4 gap-2">
// //                 <Card label="Shared" value={team.summary?.sharedBalance || 0} />
// //                 <Card label="Allocated" value={team.summary?.allocatedToMembers || 0} />
// //                 <Card label="Verified" value={team.summary?.verifiedMembers || 0} />
// //                 <Card
// //                   label="Pending"
// //                   value={
// //                     Number(team.summary?.pendingMembers || 0) +
// //                     Number(team.summary?.approvedNotVerified || 0)
// //                   }
// //                 />
// //               </div>

// //               <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F6F9FA] p-3">
// //                 <div className="flex items-center gap-2">
// //                   <UsersRound size={16} className="text-[#168B72]" />
// //                   <div>
// //                     <p className="text-[9px] text-[#82949C]">
// //                       Sub Agents
// //                     </p>
// //                     <p className="text-xs font-extrabold">
// //                       {team.summary?.totalMembers || 0}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => addSubAgent(team)}
// //                     className="flex items-center gap-1 rounded-lg bg-[#35C99A] px-3 py-2 text-[10px] font-bold"
// //                   >
// //                     <UserPlus size={13} />
// //                     Add Sub Agent
// //                   </button>

// //                   <button
// //                     onClick={() => setSelected(team)}
// //                     className="rounded-lg bg-[#1F3C50] px-3 py-2 text-[10px] font-bold text-white"
// //                   >
// //                     Manage
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {selected && (
// //         <div className="fixed inset-0 z-50 bg-[#0B2432]/50">
// //           <div className="ml-auto h-full w-full max-w-[820px] overflow-y-auto bg-[#F4F7F8]">
// //             <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
// //               <div>
// //                 <p className="text-[9px] font-bold uppercase text-[#35A98C]">
// //                   Agency
// //                 </p>
// //                 <h2 className="text-lg font-extrabold">
// //                   {selected.business?.businessName || selected.name}
// //                 </h2>
// //               </div>

// //               <button onClick={() => setSelected(null)}>
// //                 <X size={20} />
// //               </button>
// //             </div>

// //             <div className="p-4">
// //               <button
// //                 onClick={() => addSubAgent(selected)}
// //                 className="mb-4 flex items-center gap-2 rounded-xl bg-[#1F3C50] px-4 py-2.5 text-[10px] font-bold text-white"
// //               >
// //                 <UserPlus size={14} />
// //                 New Sub-Agent Application
// //               </button>

// //               <div className="space-y-2">
// //                 {(selected.members || []).map((member) => {
// //                   const eligible = canAllocate(member);

// //                   return (
// //                     <div
// //                       key={member._id}
// //                       className="rounded-[16px] border border-[#E0E8EC] bg-white p-4"
// //                     >
// //                       <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
// //                         <div className="flex gap-3">
// //                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#168B72]">
// //                             <UserRound size={18} />
// //                           </div>

// //                           <div>
// //                             <div className="flex flex-wrap items-center gap-2">
// //                               <p className="text-xs font-extrabold">
// //                                 {member.name}
// //                               </p>

// //                               <span
// //                                 className={`rounded-full px-2 py-1 text-[8px] font-bold ${statusClass(
// //                                   member.applicationStatus
// //                                 )}`}
// //                               >
// //                                 {member.applicationStatus?.replaceAll("_", " ")}
// //                               </span>
// //                             </div>

// //                             <p className="mt-1 text-[10px] text-[#7D8F98]">
// //                               {member.partnerId} · {member.teamRole} · {member.email}
// //                             </p>

// //                             <p className="mt-1 text-[9px] text-[#7D8F98]">
// //                               Email:{" "}
// //                               {member.emailVerification?.isVerified ? "Verified" : "Pending"}
// //                               {" · "}
// //                               Mobile:{" "}
// //                               {member.phoneVerification?.isVerified ? "Verified" : "Pending"}
// //                               {" · "}
// //                               Admin: {member.isApproved ? "Approved" : "Pending"}
// //                             </p>
// //                           </div>
// //                         </div>

// //                         <div className="flex flex-wrap items-center gap-2">
// //                           <div className="rounded-lg bg-[#F4F7F8] px-3 py-2">
// //                             <p className="text-[8px] uppercase text-[#84969E]">
// //                               Available
// //                             </p>
// //                             <p className="text-xs font-extrabold text-[#08745F]">
// //                               {member.teamCreditAllocation?.availableLimit || 0} cr
// //                             </p>
// //                           </div>

// //                           <button
// //                             disabled={!eligible}
// //                             onClick={() => allocate(selected, member)}
// //                             className={`rounded-lg px-3 py-2 text-[10px] font-bold ${
// //                               eligible
// //                                 ? "bg-[#35C99A] text-[#173247]"
// //                                 : "cursor-not-allowed bg-[#E9EEF0] text-[#91A0A7]"
// //                             }`}
// //                           >
// //                             {eligible ? "Allocate Credits" : "Verification Pending"}
// //                           </button>

// //                           <button
// //                             onClick={() => openHistory(selected, member)}
// //                             className="rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold"
// //                           >
// //                             History
// //                           </button>
// //                         </div>
// //                       </div>

// //                       {!eligible && (
// //                         <div className="mt-3 flex gap-2 rounded-xl bg-[#FFF8EA] p-3 text-[10px] text-[#976A26]">
// //                           <AlertTriangle size={13} />
// //                           Credits unlock only after Email OTP, Mobile OTP, Admin approval and final verification.
// //                         </div>
// //                       )}
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {history && (
// //         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0B2432]/60 p-4">
// //           <div className="max-h-[80vh] w-full max-w-[680px] overflow-y-auto rounded-[18px] bg-white p-4">
// //             <div className="flex items-center justify-between">
// //               <h3 className="text-base font-extrabold">
// //                 {history.member?.name} Credit History
// //               </h3>
// //               <button onClick={() => setHistory(null)}>
// //                 <X size={18} />
// //               </button>
// //             </div>

// //             <div className="mt-4 space-y-2">
// //               {(history.transactions || []).map((t) => (
// //                 <div
// //                   key={t._id}
// //                   className="rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
// //                 >
// //                   <div className="flex justify-between">
// //                     <p className="text-[11px] font-bold">{t.type}</p>
// //                     <p className="text-xs font-extrabold">
// //                       {t.direction === "DEBIT" ? "-" : t.direction === "CREDIT" ? "+" : ""}
// //                       {t.credits} cr
// //                     </p>
// //                   </div>
// //                   <p className="mt-1 text-[10px] text-[#7D8F98]">
// //                     {t.description}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function Card({ label, value }) {
// //   return (
// //     <div className="rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3">
// //       <p className="text-[8px] font-bold uppercase text-[#84969E]">{label}</p>
// //       <p className="mt-1 text-lg font-extrabold">{value}</p>
// //     </div>
// //   );
// // }



// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   Network,
//   Search,
//   RefreshCw,
//   Eye,
//   X,
//   Building2,
//   UsersRound,
//   Mail,
//   Phone,
//   MapPin,
//   WalletCards,
//   Home,
//   ArrowUpRight,
//   UserCheck,
//   MapPinned,
// } from "lucide-react";

// import Swal from "sweetalert2";

// import {
//   getAllPartnersApi,
//   getPartnerByIdApi,
// } from "../../../Services/partnerService";


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

//   return (
//     candidates.find(Array.isArray) ||
//     []
//   ).filter(Boolean);
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
//   const source =
//     property?.assignedPartner ||
//     property?.partnerAssigned ||
//     property?.assignedToPartner ||
//     property?.assignedPartnerDetails ||
//     property?.partner ||
//     property?.assignedPartnerId;

//   if (
//     !source ||
//     typeof source !== "object"
//   ) {
//     return null;
//   }

//   return {
//     _id:
//       source._id ||
//       source.id ||
//       source.partnerMongoId ||
//       null,

//     partnerId:
//       source.partnerId ||
//       source.partnerCode ||
//       source.code ||
//       "",

//     name:
//       source.name ||
//       source.partnerName ||
//       "Assigned Partner",
//   };
// };


// export default function TeamPartnerManagement({
//   initialPartnerId = null,
//   onPartnerDetailClose,
// }) {
//   const navigate = useNavigate();

//   const [teams, setTeams] =
//     useState([]);

//   const [search, setSearch] =
//     useState("");

//   const [loading, setLoading] =
//     useState(true);

//   const [selected, setSelected] =
//     useState(null);

//   const [
//     detailLoading,
//     setDetailLoading,
//   ] = useState(false);


//   const loadTeams = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await getAllPartnersApi({
//           search:
//             search.trim() ||
//             undefined,

//           accountType: "team",
//         });

//       const list =
//         response?.data || [];

//       setTeams(
//         list.filter(
//           (item) =>
//             item.accountType ===
//               "team" &&
//             !item.isSubPartner
//         )
//       );

//     } catch (error) {

//       Swal.fire(
//         "Error",
//         error?.response?.data
//           ?.message ||
//           "Unable to load team partners",
//         "error"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     loadTeams();
//   }, []);


//   const openTeam =
//     async (
//       id,
//       updateUrl = true
//     ) => {

//     if (!id) return;

//     try {
//       setDetailLoading(true);

//       const response =
//         await getPartnerByIdApi(id);

//       setSelected(
//         response?.data || null
//       );

//       if (updateUrl) {
//         navigate(
//           `/partnerdashboard?tab=teams&partnerId=${id}`,
//           { replace: true }
//         );
//       }

//     } catch (error) {

//       Swal.fire(
//         "Error",
//         error?.response?.data
//           ?.message ||
//           "Unable to load team details",
//         "error"
//       );

//     } finally {
//       setDetailLoading(false);
//     }
//   };


//   useEffect(() => {
//     if (!initialPartnerId) return;

//     openTeam(
//       initialPartnerId,
//       false
//     );

//   }, [initialPartnerId]);


//   const closeDetail = () => {
//     setSelected(null);

//     if (onPartnerDetailClose) {
//       onPartnerDetailClose();
//       return;
//     }

//     navigate(
//       "/partnerdashboard?tab=teams",
//       { replace: true }
//     );
//   };


//   const stats = useMemo(
//     () => ({
//       teams: teams.length,

//       members:
//         teams.reduce(
//           (sum, team) =>
//             sum +
//             (
//               team.teamMembers ||
//               []
//             ).length,
//           0
//         ),

//       properties:
//         teams.reduce(
//           (sum, team) =>
//             sum +
//             resolveAddedProperties(
//               team
//             ).length,
//           0
//         ),
//     }),
//     [teams]
//   );


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


//   const viewPartner = (id) => {
//     if (!id) return;

//     navigate(
//       `/partnerdashboard?tab=management&partnerId=${id}`
//     );
//   };


//   return (
//     <div className="min-h-screen bg-[#F4F7F8] p-1 text-[#173247]">

//       <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

//         <div>
//           <h1 className="text-2xl font-extrabold">
//             Team Partner Management
//           </h1>

//           <p className="mt-1 text-xs text-[#8e9da5]">
//             Team owners, sub partners,
//             added properties and property
//             assignments.
//           </p>
//         </div>


//         <button
//           onClick={loadTeams}
//           disabled={loading}
//           className="flex h-10 items-center gap-2 rounded-xl border border-[#DCE5E9] bg-white px-4 text-xs font-bold"
//         >
//           <RefreshCw
//             size={14}
//             className={
//               loading
//                 ? "animate-spin"
//                 : ""
//             }
//           />
//           Refresh
//         </button>

//       </div>


//       <div className="mt-3 grid gap-3 sm:grid-cols-3">

//         <Stat
//           label="Team Owners"
//           value={stats.teams}
//         />

//         <Stat
//           label="Total Sub Partners"
//           value={stats.members}
//         />

//         <Stat
//           label="Properties Added"
//           value={stats.properties}
//         />

//       </div>


//       <section className="mt-3 rounded-2xl border border-[#E0E8EC] bg-white p-3">

//         <div className="flex gap-2">

//           <div className="relative flex-1">

//             <Search
//               size={14}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8BA0AA]"
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
//                 loadTeams()
//               }
//               placeholder="Search team owner, agency, partner ID..."
//               className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none focus:border-[#35C99A]"
//             />

//           </div>


//           <button
//             onClick={loadTeams}
//             className="rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold"
//           >
//             Search
//           </button>

//         </div>

//       </section>


//       <section className="mt-3 overflow-hidden rounded-2xl border border-[#E0E8EC] bg-white">

//         <div className="overflow-x-auto">

//           <table className="min-w-full text-left">

//             <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">

//               <tr>
//                 <th className="px-4 py-3">
//                   Team Owner
//                 </th>

//                 <th className="px-4 py-3">
//                   Agency
//                 </th>

//                 <th className="px-4 py-3">
//                   Location
//                 </th>

//                 <th className="px-4 py-3">
//                   Sub Partners
//                 </th>

//                 <th className="px-4 py-3">
//                   Properties
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
//                     className="py-14 text-center text-xs"
//                   >
//                     Loading...
//                   </td>
//                 </tr>

//               ) : teams.length === 0 ? (

//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="py-14 text-center text-xs text-[#82949D]"
//                   >
//                     No team partners found.
//                   </td>
//                 </tr>

//               ) : (

//                 teams.map((team) => (

//                   <tr
//                     key={team._id}
//                     className="hover:bg-[#FAFCFD]"
//                   >

//                     <td className="px-4 py-3">

//                       <p className="text-[12px] font-extrabold">
//                         {team.name}
//                       </p>

//                       <p className="mt-1 text-[9px] text-[#82949D]">
//                         {team.partnerId}
//                       </p>

//                     </td>


//                     <td className="px-4 py-3 text-[10px]">

//                       <p className="font-bold">
//                         {team.business
//                           ?.businessName ||
//                           team.agencyDetails
//                             ?.agencyName ||
//                           team.name}
//                       </p>

//                       <p className="mt-1 text-[#82949D]">
//                         Agency Owner
//                       </p>

//                     </td>


//                     <td className="px-4 py-3 text-[10px]">
//                       {team.location?.city ||
//                         "-"}

//                       {team.location?.state
//                         ? `, ${team.location.state}`
//                         : ""}
//                     </td>


//                     <td className="px-4 py-3 text-[10px] font-bold">
//                       {(team.teamMembers ||
//                         []).length}
//                     </td>


//                     <td className="px-4 py-3 text-[10px] font-bold text-[#16825F]">
//                       {
//                         resolveAddedProperties(
//                           team
//                         ).length
//                       }
//                     </td>


//                     <td className="px-4 py-3 text-right">

//                       <button
//                         onClick={() =>
//                           openTeam(
//                             team._id
//                           )
//                         }
//                         className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold hover:bg-[#EAF9F4]"
//                       >
//                         <Eye size={12} />
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

//         <div className="fixed inset-0 z-[100] flex justify-end bg-[#0E2736]/55">

//           <div className="h-full w-full max-w-[760px] overflow-y-auto bg-[#F4F7F8] shadow-2xl">

//             {detailLoading &&
//             !selected ? (

//               <div className="flex h-full items-center justify-center">
//                 <RefreshCw className="animate-spin text-[#35C99A]" />
//               </div>

//             ) : (

//               <>
//                 <div className="sticky top-0 z-20 flex items-center justify-between bg-[#1F3C50] p-5 text-white">

//                   <div>

//                     <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7EE6C6]">
//                       Team / Agency Owner
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
//                       closeDetail
//                     }
//                     className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10"
//                   >
//                     <X size={18} />
//                   </button>

//                 </div>


//                 <div className="space-y-3 p-4">

//                   <Section
//                     title="Agency Details"
//                     icon={
//                       <Building2
//                         size={16}
//                       />
//                     }
//                   >

//                     <Detail
//                       icon={
//                         <Mail size={12} />
//                       }
//                       label="Email"
//                       value={
//                         selected?.email
//                       }
//                     />

//                     <Detail
//                       icon={
//                         <Phone size={12} />
//                       }
//                       label="Phone"
//                       value={
//                         selected?.phone
//                       }
//                     />

//                     <Detail
//                       icon={
//                         <MapPin size={12} />
//                       }
//                       label="Location"
//                       value={`${selected?.location?.city || "-"}, ${selected?.location?.state || "-"}`}
//                     />

//                     <Detail
//                       icon={
//                         <WalletCards
//                           size={12}
//                         />
//                       }
//                       label="Credits"
//                       value={
//                         selected
//                           ?.creditWallet
//                           ?.balance ||
//                         0
//                       }
//                     />

//                   </Section>


//                   <Section
//                     title="Sub Partners"
//                     icon={
//                       <UsersRound
//                         size={16}
//                       />
//                     }
//                   >

//                     <div className="col-span-1 space-y-2 sm:col-span-2">

//                       {(selected?.teamMembers ||
//                         []).length ===
//                       0 ? (

//                         <p className="rounded-xl bg-[#F7F9FA] p-4 text-[10px] text-[#82949D]">
//                           No Sub Partners yet.
//                         </p>

//                       ) : (

//                         selected.teamMembers.map(
//                           (member) => (

//                             <div
//                               key={
//                                 member._id
//                               }
//                               className="flex items-center justify-between gap-3 rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
//                             >

//                               <div>
//                                 <p className="text-[11px] font-extrabold">
//                                   {
//                                     member.name
//                                   }
//                                 </p>

//                                 <p className="mt-1 text-[9px] text-[#82949D]">
//                                   {
//                                     member.partnerId
//                                   }{" "}
//                                   ·{" "}
//                                   {
//                                     member.teamRole
//                                   }
//                                 </p>
//                               </div>


//                               <button
//                                 onClick={() =>
//                                   viewPartner(
//                                     member._id
//                                   )
//                                 }
//                                 className="inline-flex items-center gap-1 rounded-lg bg-[#EAF9F4] px-3 py-2 text-[9px] font-bold text-[#16825F]"
//                               >
//                                 <Eye size={11} />
//                                 View Partner
//                               </button>

//                             </div>

//                           )
//                         )

//                       )}

//                     </div>

//                   </Section>


//                   <Section
//                     title="Properties Added By Team Partner"
//                     icon={
//                       <Home size={16} />
//                     }
//                   >

//                     <div className="col-span-1 space-y-3 sm:col-span-2">

//                       {resolveAddedProperties(
//                         selected
//                       ).length ===
//                       0 ? (

//                         <div className="rounded-xl border border-dashed border-[#DCE5E9] p-5 text-center text-[10px] text-[#82949D]">
//                           No properties added
//                           by this team
//                           partner.
//                         </div>

//                       ) : (

//                         resolveAddedProperties(
//                           selected
//                         ).map(
//                           (
//                             property,
//                             index
//                           ) => {

//                             const assigned =
//                               resolveAssignedPartner(
//                                 property
//                               );

//                             return (
//                               <article
//                                 key={
//                                   resolvePropertyId(
//                                     property
//                                   ) ||
//                                   index
//                                 }
//                                 className="rounded-2xl border border-[#DCE5E9] bg-white p-3"
//                               >

//                                 <div className="flex gap-3">

//                                   <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EEF3F5]">

//                                     {property
//                                       ?.images?.[0]
//                                       ?.url ? (

//                                       <img
//                                         src={
//                                           property
//                                             .images[0]
//                                             .url
//                                         }
//                                         alt=""
//                                         className="h-full w-full object-cover"
//                                       />

//                                     ) : (

//                                       <div className="flex h-full items-center justify-center">
//                                         <Home className="text-[#A4B2B9]" />
//                                       </div>

//                                     )}

//                                   </div>


//                                   <div className="min-w-0 flex-1">

//                                     <p className="line-clamp-1 text-[11px] font-extrabold">
//                                       {property.title ||
//                                         "Untitled Property"}
//                                     </p>

//                                     <p className="mt-1 text-[9px] font-bold text-[#16825F]">
//                                       {property.propertyId ||
//                                         "-"}
//                                     </p>

//                                     <p className="mt-1 inline-flex items-center gap-1 text-[9px] text-[#82949D]">
//                                       <MapPinned
//                                         size={
//                                           10
//                                         }
//                                       />

//                                       {[
//                                         property.locality,
//                                         property.city,
//                                       ]
//                                         .filter(
//                                           Boolean
//                                         )
//                                         .join(
//                                           ", "
//                                         ) ||
//                                         "-"}
//                                     </p>

//                                     <p className="mt-1 text-[10px] font-bold">
//                                       {formatPrice(
//                                         property.price
//                                       )}
//                                     </p>

//                                   </div>

//                                 </div>


//                                 <div className="mt-3 rounded-xl bg-[#F7F9FA] p-2.5">

//                                   <p className="text-[8px] font-bold uppercase text-[#8A9AA2]">
//                                     Assigned Partner
//                                   </p>

//                                   {assigned ? (

//                                     <div className="mt-1.5 flex items-center justify-between gap-2">

//                                       <div>
//                                         <p className="text-[10px] font-extrabold">
//                                           {
//                                             assigned.name
//                                           }
//                                         </p>

//                                         <p className="text-[8px] text-[#82949D]">
//                                           {
//                                             assigned.partnerId
//                                           }
//                                         </p>
//                                       </div>


//                                       {assigned._id && (

//                                         <button
//                                           onClick={() =>
//                                             viewPartner(
//                                               assigned._id
//                                             )
//                                           }
//                                           className="inline-flex items-center gap-1 rounded-lg bg-[#EAF9F4] px-2.5 py-1.5 text-[8px] font-bold text-[#16825F]"
//                                         >
//                                           <UserCheck
//                                             size={
//                                               10
//                                             }
//                                           />
//                                           View Partner
//                                         </button>

//                                       )}

//                                     </div>

//                                   ) : (

//                                     <p className="mt-1 text-[9px] text-[#A0ADB3]">
//                                       No partner
//                                       assigned
//                                     </p>

//                                   )}

//                                 </div>


//                                 <button
//                                   onClick={() =>
//                                     viewProperty(
//                                       property
//                                     )
//                                   }
//                                   className="mt-3 inline-flex h-9 items-center gap-1 rounded-lg bg-[#1F3C50] px-3 text-[9px] font-bold text-white"
//                                 >
//                                   <Eye size={11} />
//                                   View Property
//                                   <ArrowUpRight
//                                     size={
//                                       10
//                                     }
//                                   />
//                                 </button>

//                               </article>
//                             );
//                           }
//                         )

//                       )}

//                     </div>

//                   </Section>

//                 </div>
//               </>
//             )}

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


// const Stat = ({
//   label,
//   value,
// }) => (
//   <div className="rounded-2xl border border-[#E0E8EC] bg-white p-4">

//     <p className="text-[9px] font-bold uppercase text-[#83959E]">
//       {label}
//     </p>

//     <p className="mt-2 text-2xl font-extrabold">
//       {value}
//     </p>

//   </div>
// );


// const Section = ({
//   title,
//   icon,
//   children,
// }) => (
//   <section className="rounded-2xl border border-[#E0E8EC] bg-white p-4">

//     <div className="mb-3 flex items-center gap-2 text-sm font-extrabold">

//       <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#168B72]">
//         {icon}
//       </span>

//       {title}

//     </div>

//     <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//       {children}
//     </div>

//   </section>
// );


// const Detail = ({
//   icon,
//   label,
//   value,
// }) => (
//   <div className="rounded-xl bg-[#F7F9FA] p-3">

//     <div className="flex items-center gap-2 text-[#8A9AA2]">

//       {icon}

//       <p className="text-[9px] font-bold uppercase">
//         {label}
//       </p>

//     </div>

//     <p className="mt-1 break-words text-[11px] font-semibold">
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
  Network,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Building2,
  UsersRound,
  Mail,
  Phone,
  MapPin,
  WalletCards,
  Home,
  ArrowUpRight,
  UserCheck,
  MapPinned,
} from "lucide-react";

import Swal from "sweetalert2";

import {
  getAllPartnersApi,
  getPartnerByIdApi,
} from "../../../Services/partnerService";


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

  return (
    candidates.find(Array.isArray) ||
    []
  ).filter(Boolean);
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
  const source =
    property?.assignedPartner ||
    property?.partnerAssigned ||
    property?.assignedToPartner ||
    property?.assignedPartnerDetails ||
    property?.partner ||
    property?.assignedPartnerId;

  if (
    !source ||
    typeof source !== "object"
  ) {
    return null;
  }

  return {
    _id:
      source._id ||
      source.id ||
      source.partnerMongoId ||
      null,

    partnerId:
      source.partnerId ||
      source.partnerCode ||
      source.code ||
      "",

    name:
      source.name ||
      source.partnerName ||
      "Assigned Partner",
  };
};


export default function TeamPartnerManagement({
  initialPartnerId = null,
  onPartnerDetailClose,
}) {
  const navigate = useNavigate();

  const [teams, setTeams] =
    useState([]);

  const [search, setSearch] =
    useState("");

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
  const itemsPerPage = 2;

  const totalPages =
    Math.ceil(teams.length / itemsPerPage) || 1;

  const paginatedTeams = teams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const loadTeams = async () => {
    try {
      setLoading(true);

      const response =
        await getAllPartnersApi({
          search:
            search.trim() ||
            undefined,

          accountType: "team",
        });

      const list =
        response?.data || [];

      setTeams(
        list.filter(
          (item) =>
            item.accountType ===
              "team" &&
            !item.isSubPartner
        )
      );

    } catch (error) {

      Swal.fire(
        "Error",
        error?.response?.data
          ?.message ||
          "Unable to load team partners",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);


  const openTeam =
    async (
      id,
      updateUrl = true
    ) => {

    if (!id) return;

    try {
      setDetailLoading(true);

      const response =
        await getPartnerByIdApi(id);

      setSelected(
        response?.data || null
      );

      if (updateUrl) {
        navigate(
          `/partnerdashboard?tab=teams&partnerId=${id}`,
          { replace: true }
        );
      }

    } catch (error) {

      Swal.fire(
        "Error",
        error?.response?.data
          ?.message ||
          "Unable to load team details",
        "error"
      );

    } finally {
      setDetailLoading(false);
    }
  };


  useEffect(() => {
    if (!initialPartnerId) return;

    openTeam(
      initialPartnerId,
      false
    );

  }, [initialPartnerId]);


  const closeDetail = () => {
    setSelected(null);

    if (onPartnerDetailClose) {
      onPartnerDetailClose();
      return;
    }

    navigate(
      "/partnerdashboard?tab=teams",
      { replace: true }
    );
  };


  const stats = useMemo(
    () => ({
      teams: teams.length,

      members:
        teams.reduce(
          (sum, team) =>
            sum +
            (
              team.teamMembers ||
              []
            ).length,
          0
        ),

      properties:
        teams.reduce(
          (sum, team) =>
            sum +
            resolveAddedProperties(
              team
            ).length,
          0
        ),
    }),
    [teams]
  );


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


  const viewPartner = (id) => {
    if (!id) return;

    navigate(
      `/partnerdashboard?tab=management&partnerId=${id}`
    );
  };


  return (
    <div className="min-h-screen bg-[#F4F7F8] p-1 text-[#173247]">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-extrabold">
            Team Partner Management
          </h1>

          <p className="mt-1 text-xs text-[#8e9da5]">
            Team owners, sub partners,
            added properties and property
            assignments.
          </p>
        </div>


        <button
          onClick={loadTeams}
          disabled={loading}
          className="flex h-10 items-center gap-2 rounded-xl border border-[#DCE5E9] bg-white px-4 text-xs font-bold"
        >
          <RefreshCw
            size={14}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />
          Refresh
        </button>

      </div>


      <div className="mt-3 grid gap-3 sm:grid-cols-3">

        <Stat
          label="Team Owners"
          value={stats.teams}
        />

        <Stat
          label="Total Sub Partners"
          value={stats.members}
        />

        <Stat
          label="Properties Added"
          value={stats.properties}
        />

      </div>


      <section className="mt-3 rounded-2xl border border-[#E0E8EC] bg-white p-3">

        <div className="flex gap-2">

          <div className="relative flex-1">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8BA0AA]"
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
                loadTeams()
              }
              placeholder="Search team owner, agency, partner ID..."
              className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-[#FAFCFD] pl-9 pr-3 text-xs outline-none focus:border-[#35C99A]"
            />

          </div>


          <button
            onClick={loadTeams}
            className="rounded-xl bg-[#35C99A] px-5 text-xs font-extrabold"
          >
            Search
          </button>

        </div>

      </section>


      <section className="mt-3 overflow-hidden rounded-2xl border border-[#E0E8EC] bg-white">

        <div className="overflow-x-auto">

          <table className="min-w-full text-left">

            <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-wider text-white">

              <tr>
                <th className="px-4 py-3">
                  Team Owner
                </th>

                <th className="px-4 py-3">
                  Agency
                </th>

                <th className="px-4 py-3">
                  Location
                </th>

                <th className="px-4 py-3">
                  Sub Partners
                </th>

                <th className="px-4 py-3">
                  Properties
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
                    className="py-14 text-center text-xs"
                  >
                    Loading...
                  </td>
                </tr>

              ) : teams.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="py-14 text-center text-xs text-[#82949D]"
                  >
                    No team partners found.
                  </td>
                </tr>

              ) : (

                paginatedTeams.map((team) => (

                  <tr
                    key={team._id}
                    className="hover:bg-[#FAFCFD]"
                  >

                    <td className="px-4 py-3">

                      <p className="text-[12px] font-extrabold">
                        {team.name}
                      </p>

                      <p className="mt-1 text-[9px] text-[#82949D]">
                        {team.partnerId}
                      </p>

                    </td>


                    <td className="px-4 py-3 text-[10px]">

                      <p className="font-bold">
                        {team.business
                          ?.businessName ||
                          team.agencyDetails
                            ?.agencyName ||
                          team.name}
                      </p>

                      <p className="mt-1 text-[#82949D]">
                        Agency Owner
                      </p>

                    </td>


                    <td className="px-4 py-3 text-[10px]">
                      {team.location?.city ||
                        "-"}

                      {team.location?.state
                        ? `, ${team.location.state}`
                        : ""}
                    </td>


                    <td className="px-4 py-3 text-[10px] font-bold">
                      {(team.teamMembers ||
                        []).length}
                    </td>


                    <td className="px-4 py-3 text-[10px] font-bold text-[#16825F]">
                      {
                        resolveAddedProperties(
                          team
                        ).length
                      }
                    </td>


                    <td className="px-4 py-3 text-right">

                      <button
                        onClick={() =>
                          openTeam(
                            team._id
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5E9] px-3 py-2 text-[10px] font-bold hover:bg-[#EAF9F4]"
                      >
                        <Eye size={12} />
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
      {!loading && teams.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-[#E0E8EC] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] text-[#8A989C]">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              teams.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              teams.length
            )}{" "}
            of {teams.length} team partners
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

        <div className="fixed inset-0 z-[100] flex justify-end bg-[#0E2736]/55">

          <div className="h-full w-full max-w-[760px] overflow-y-auto bg-[#F4F7F8] shadow-2xl">

            {detailLoading &&
            !selected ? (

              <div className="flex h-full items-center justify-center">
                <RefreshCw className="animate-spin text-[#35C99A]" />
              </div>

            ) : (

              <>
                <div className="sticky top-0 z-20 flex items-center justify-between bg-[#1F3C50] p-5 text-white">

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7EE6C6]">
                      Team / Agency Owner
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
                      closeDetail
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10"
                  >
                    <X size={18} />
                  </button>

                </div>


                <div className="space-y-3 p-4">

                  <Section
                    title="Agency Details"
                    icon={
                      <Building2
                        size={16}
                      />
                    }
                  >

                    <Detail
                      icon={
                        <Mail size={12} />
                      }
                      label="Email"
                      value={
                        selected?.email
                      }
                    />

                    <Detail
                      icon={
                        <Phone size={12} />
                      }
                      label="Phone"
                      value={
                        selected?.phone
                      }
                    />

                    <Detail
                      icon={
                        <MapPin size={12} />
                      }
                      label="Location"
                      value={`${selected?.location?.city || "-"}, ${selected?.location?.state || "-"}`}
                    />

                    <Detail
                      icon={
                        <WalletCards
                          size={12}
                        />
                      }
                      label="Credits"
                      value={
                        selected
                          ?.creditWallet
                          ?.balance ||
                        0
                      }
                    />

                  </Section>


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
                          (member) => (

                            <div
                              key={
                                member._id
                              }
                              className="flex items-center justify-between gap-3 rounded-xl border border-[#E0E8EC] bg-[#FAFCFD] p-3"
                            >

                              <div>
                                <p className="text-[11px] font-extrabold">
                                  {
                                    member.name
                                  }
                                </p>

                                <p className="mt-1 text-[9px] text-[#82949D]">
                                  {
                                    member.partnerId
                                  }{" "}
                                  ·{" "}
                                  {
                                    member.teamRole
                                  }
                                </p>
                              </div>


                              <button
                                onClick={() =>
                                  viewPartner(
                                    member._id
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-lg bg-[#EAF9F4] px-3 py-2 text-[9px] font-bold text-[#16825F]"
                              >
                                <Eye size={11} />
                                View Partner
                              </button>

                            </div>

                          )
                        )

                      )}

                    </div>

                  </Section>


                  <Section
                    title="Properties Added By Team Partner"
                    icon={
                      <Home size={16} />
                    }
                  >

                    <div className="col-span-1 space-y-3 sm:col-span-2">

                      {resolveAddedProperties(
                        selected
                      ).length ===
                      0 ? (

                        <div className="rounded-xl border border-dashed border-[#DCE5E9] p-5 text-center text-[10px] text-[#82949D]">
                          No properties added
                          by this team
                          partner.
                        </div>

                      ) : (

                        resolveAddedProperties(
                          selected
                        ).map(
                          (
                            property,
                            index
                          ) => {

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
                                  index
                                }
                                className="rounded-2xl border border-[#DCE5E9] bg-white p-3"
                              >

                                <div className="flex gap-3">

                                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EEF3F5]">

                                    {property
                                      ?.images?.[0]
                                      ?.url ? (

                                      <img
                                        src={
                                          property
                                            .images[0]
                                            .url
                                        }
                                        alt=""
                                        className="h-full w-full object-cover"
                                      />

                                    ) : (

                                      <div className="flex h-full items-center justify-center">
                                        <Home className="text-[#A4B2B9]" />
                                      </div>

                                    )}

                                  </div>


                                  <div className="min-w-0 flex-1">

                                    <p className="line-clamp-1 text-[11px] font-extrabold">
                                      {property.title ||
                                        "Untitled Property"}
                                    </p>

                                    <p className="mt-1 text-[9px] font-bold text-[#16825F]">
                                      {property.propertyId ||
                                        "-"}
                                    </p>

                                    <p className="mt-1 inline-flex items-center gap-1 text-[9px] text-[#82949D]">
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
                                        ) ||
                                        "-"}
                                    </p>

                                    <p className="mt-1 text-[10px] font-bold">
                                      {formatPrice(
                                        property.price
                                      )}
                                    </p>

                                  </div>

                                </div>


                                <div className="mt-3 rounded-xl bg-[#F7F9FA] p-2.5">

                                  <p className="text-[8px] font-bold uppercase text-[#8A9AA2]">
                                    Assigned Partner
                                  </p>

                                  {assigned ? (

                                    <div className="mt-1.5 flex items-center justify-between gap-2">

                                      <div>
                                        <p className="text-[10px] font-extrabold">
                                          {
                                            assigned.name
                                          }
                                        </p>

                                        <p className="text-[8px] text-[#82949D]">
                                          {
                                            assigned.partnerId
                                          }
                                        </p>
                                      </div>


                                      {assigned._id && (

                                        <button
                                          onClick={() =>
                                            viewPartner(
                                              assigned._id
                                            )
                                          }
                                          className="inline-flex items-center gap-1 rounded-lg bg-[#EAF9F4] px-2.5 py-1.5 text-[8px] font-bold text-[#16825F]"
                                        >
                                          <UserCheck
                                            size={
                                              10
                                            }
                                          />
                                          View Partner
                                        </button>

                                      )}

                                    </div>

                                  ) : (

                                    <p className="mt-1 text-[9px] text-[#A0ADB3]">
                                      No partner
                                      assigned
                                    </p>

                                  )}

                                </div>


                                <button
                                  onClick={() =>
                                    viewProperty(
                                      property
                                    )
                                  }
                                  className="mt-3 inline-flex h-9 items-center gap-1 rounded-lg bg-[#1F3C50] px-3 text-[9px] font-bold text-white"
                                >
                                  <Eye size={11} />
                                  View Property
                                  <ArrowUpRight
                                    size={
                                      10
                                    }
                                  />
                                </button>

                              </article>
                            );
                          }
                        )

                      )}

                    </div>

                  </Section>

                </div>
              </>
            )}

          </div>

        </div>

      )}

    </div>
  );
}


const Stat = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border border-[#E0E8EC] bg-white p-4">

    <p className="text-[9px] font-bold uppercase text-[#83959E]">
      {label}
    </p>

    <p className="mt-2 text-2xl font-extrabold">
      {value}
    </p>

  </div>
);


const Section = ({
  title,
  icon,
  children,
}) => (
  <section className="rounded-2xl border border-[#E0E8EC] bg-white p-4">

    <div className="mb-3 flex items-center gap-2 text-sm font-extrabold">

      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#168B72]">
        {icon}
      </span>

      {title}

    </div>

    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {children}
    </div>

  </section>
);


const Detail = ({
  icon,
  label,
  value,
}) => (
  <div className="rounded-xl bg-[#F7F9FA] p-3">

    <div className="flex items-center gap-2 text-[#8A9AA2]">

      {icon}

      <p className="text-[9px] font-bold uppercase">
        {label}
      </p>

    </div>

    <p className="mt-1 break-words text-[11px] font-semibold">
      {value || "-"}
    </p>

  </div>
);
