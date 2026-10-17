// import { useEffect, useMemo, useState } from "react";
// import {
//   ArrowDownCircle,
//   ArrowUpCircle,
//   Check,
//   CheckCircle2,
//   ChevronLeft,
//   ChevronRight,
//   Gift,
//   History,
//   Search,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   X,
// } from "lucide-react";

// import {
//   adminAddCreditApi,
//   adminBulkAddCreditApi,
//   adminWithdrawCreditApi,
//   adminBulkWithdrawCreditApi,
//   createIdempotencyKey,
//   getAdminAdjustmentsApi,
//   getPartnersForCreditApi,
// } from "../../../Services/adminCreditService";

// const EMPTY_FORM = {
//   operation: "ADD",
//   selectionMode: "SINGLE",
//   credits: "",
//   reason: "",
//   source: "ADMIN_PROMOTIONAL",
//   reference: "",
// };

// const formatCredits = (value) =>
//   new Intl.NumberFormat("en-IN").format(Number(value || 0));

// const normalizePartner = (partner) => ({
//   id: partner.partnerId || partner.partnerCode || partner.userId || partner._id,
//   name: partner.name || partner.fullName || "Unknown Partner",
//   email: partner.email || "No email",
//   balance:
//     partner.wallet?.currentBalance ??
//     partner.wallet?.balance ??
//     partner.creditWallet?.balance ??
//     partner.creditBalance ??
//     partner.credits ??
//     0,
//   role: partner.partnerType || partner.type || partner.role || "Partner",
// });

// const getErrorMessage = (error) =>
//   error?.response?.data?.message ||
//   error?.response?.data?.error ||
//   "Unable to complete the credit operation.";

// export default function AdminCreditManagement() {
//   const [partners, setPartners] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);

//   const loadPartners = async () => {
//     try {
//       setLoading(true);
//       const response = await getPartnersForCreditApi({ limit: 500 });
//       const rows =
//         response?.data?.partners || response?.data || response?.partners || [];

//       setPartners(Array.isArray(rows) ? rows.map(normalizePartner) : []);
//     } catch (requestError) {
//       console.error(requestError);
//       setPartners([]);
//       setError(
//         "Partner wallet listing API could not be loaded.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadHistory = async () => {
//     try {
//       const response = await getAdminAdjustmentsApi({ page: 1, limit: 50 });
//       const rows = Array.isArray(response?.data) ? response.data : [];
//       setHistory(
//         rows.map((item) => ({
//           id: item.transactionId || item._id,
//           operation: item.operation || (item.direction === "DEBIT" ? "WITHDRAW" : "ADD"),
//           accounts: item.partnerName || item.partnerId || "Unknown Partner",
//           credits: Number(item.credits || 0),
//           reason: item.reason || item.description || "",
//           source: item.source || "ADMIN_ADJUSTMENT",
//           createdAt: item.createdAt
//             ? new Date(item.createdAt).toLocaleString("en-IN")
//             : "-",
//         })),
//       );
//     } catch (requestError) {
//       console.error(requestError);
//       setHistory([]);
//     }
//   };

//   useEffect(() => {
//     loadPartners();
//     loadHistory();
//   }, []);

//   const visiblePartners = useMemo(() => {
//     const query = search.trim().toLowerCase();
//     if (!query) return partners;

//     return partners.filter((partner) =>
//       `${partner.name} ${partner.email} ${partner.id} ${partner.role}`
//         .toLowerCase()
//         .includes(query),
//     );
//   }, [partners, search]);

//   const totalBalance = useMemo(
//     () =>
//       partners.reduce((total, item) => total + Number(item.balance || 0), 0),
//     [partners],
//   );

//   const selectedCount =
//     form.selectionMode === "ALL" ? partners.length : selectedIds.length;

//   const updateForm = (field, value) => {
//     setForm((current) => ({ ...current, [field]: value }));
//     setError("");
//     setMessage("");

//     if (field === "selectionMode") {
//       setSelectedIds([]);
//     }
//   };

//   const selectPartner = (partnerId) => {
//     setSelectedIds((current) => {
//       if (form.selectionMode === "SINGLE") return [partnerId];
//       return current.includes(partnerId)
//         ? current.filter((id) => id !== partnerId)
//         : [...current, partnerId];
//     });
//   };

//   const selectVisiblePartners = () => {
//     const visibleIds = visiblePartners.map((partner) => partner.id);
//     const allVisibleSelected = visibleIds.every((id) =>
//       selectedIds.includes(id),
//     );

//     setSelectedIds((current) =>
//       allVisibleSelected
//         ? current.filter((id) => !visibleIds.includes(id))
//         : [...new Set([...current, ...visibleIds])],
//     );
//   };

//   const validate = () => {
//     if (Number(form.credits) <= 0) return "Enter a valid credit amount.";
//     if (form.reason.trim().length < 5)
//       return "Reason must contain at least 5 characters.";
//     if (form.selectionMode !== "ALL" && selectedIds.length === 0)
//       return "Please select at least one partner.";
//     return "";
//   };

//   const submitAdjustment = async () => {
//     const validationError = validate();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     const credits = Number(form.credits);
//     const commonPayload = {
//       credits,
//       reason: form.reason.trim(),
//       source: form.source,
//       reference: form.reference.trim() || undefined,
//       idempotencyKey: createIdempotencyKey(form.operation.toLowerCase()),
//     };

//     try {
//       setSaving(true);
//       setError("");
//       setMessage("");

//       // if (form.operation === "WITHDRAW") {
//       //   await adminWithdrawCreditApi({
//       //     ...commonPayload,
//       //     ...(form.selectionMode === "ALL"
//       //       ? { allPartners: true }
//       //       : { partnerIds: selectedIds }),
//       //     ...(form.selectionMode === "SINGLE"
//       //       ? { partnerId: selectedIds[0] }
//       //       : {}),
//       //   });
//       // }
//       if (form.operation === "WITHDRAW") {
//   // SINGLE → normal withdrawal API
//   if (form.selectionMode === "SINGLE") {
//     await adminWithdrawCreditApi({
//       ...commonPayload,
//       partnerId: selectedIds[0],
//     });
//   } else {
//     // MULTIPLE / ALL → bulk withdrawal API
//     await adminBulkWithdrawCreditApi({
//       ...commonPayload,

//       ...(form.selectionMode === "ALL"
//         ? {
//             allPartners: true,
//           }
//         : {
//             partnerIds: selectedIds,
//           }),
//     });
//   }
// } else if (form.selectionMode === "SINGLE") {
//   await adminAddCreditApi({
//     ...commonPayload,
//     partnerId: selectedIds[0],
//   });
// } else {
//   await adminBulkAddCreditApi({
//     ...commonPayload,
//     ...(form.selectionMode === "ALL"
//       ? { allPartners: true }
//       : { partnerIds: selectedIds }),
//   });
// }
//       // else if (form.selectionMode === "SINGLE") {
//       //   await adminAddCreditApi({
//       //     ...commonPayload,
//       //     partnerId: selectedIds[0],
//       //   });
//       // } else {
//       //   await adminBulkAddCreditApi({
//       //     ...commonPayload,
//       //     ...(form.selectionMode === "ALL"
//       //       ? { allPartners: true }
//       //       : { partnerIds: selectedIds }),
//       //   });
//       // }

//       await Promise.all([loadPartners(), loadHistory()]);

//       setMessage(
//         `${formatCredits(credits)} credits ${
//           form.operation === "ADD" ? "added" : "withdrawn"
//         } successfully for ${selectedCount} account(s).`,
//       );
//       setForm(EMPTY_FORM);
//       setSelectedIds([]);
//     } catch (requestError) {
//       console.error(requestError);
//       setError(getErrorMessage(requestError));
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[500px] items-center justify-center bg-[#f4f6f8]">
//         <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#007566]/20 border-t-[#007566]" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-1 md:p-1">
//       <div className="rounded-[18px] px-1 py-1">
//         <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//           <div>
//             <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//               Admin Credit Management
//             </h1>
//             <p className="mt-1 text-[11px] text-slate-500">
//               Add promotional or cash credits and withdraw wallet credits with
//               an auditable reason.
//             </p>
//           </div>

//           <div className="flex items-center gap-2 rounded-full bg-[#e8f7f4] px-4 py-2 text-xs font-bold text-[#007566]">
//             <ShieldCheck size={15} /> Admin Protected
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         <SummaryCard
//           icon={WalletCards}
//           title="Credits In Wallets"
//           value={`${formatCredits(totalBalance)} Credits`}
//           subtext={`${partners.length} wallet owners`}
//         />
//         <SummaryCard
//           icon={UsersRound}
//           title="Selected Accounts"
//           value={`${selectedCount} Accounts`}
//           subtext={
//             form.selectionMode === "ALL"
//               ? "All partners selected"
//               : "Current selection"
//           }
//         />
//         <SummaryCard
//           icon={ArrowDownCircle}
//           title="Current Action"
//           value={form.operation === "ADD" ? "Add Credits" : "Withdraw"}
//           subtext="Admin wallet adjustment"
//         />
//         <SummaryCard
//           icon={History}
//           title="Recent Adjustments"
//           value={`${history.length} Actions`}
//           subtext="Loaded from transaction ledger"
//         />
//       </div>

//       <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
//         <section className="overflow-hidden rounded-[18px] border border-[#d8e1e8] bg-white">
//           <div className="flex flex-col justify-between gap-4 border-b border-[#d8e1e8] p-5 md:flex-row md:items-center">
//             <SectionTitle
//               icon={UserRound}
//               title="Select Wallet Owners"
//               description="Choose one, multiple, or every eligible partner."
//             />

//             <div className="relative w-full md:max-w-sm">
//               <Search
//                 size={17}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//               <input
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search partner, email or ID..."
//                 className="h-11 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] pl-10 pr-4 text-sm outline-none transition focus:border-[#007566]"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-2 border-b border-[#d8e1e8] p-4">
//             {[
//               ["SINGLE", "Single"],
//               ["MULTIPLE", "Multiple"],
//               ["ALL", "All Partners"],
//             ].map(([value, label]) => (
//               <button
//                 key={value}
//                 type="button"
//                 onClick={() => updateForm("selectionMode", value)}
//                 className={`h-10 rounded-xl border text-xs font-bold transition ${
//                   form.selectionMode === value
//                     ? "border-[#007566] bg-[#e8f7f4] text-[#007566]"
//                     : "border-[#d8e1e8] bg-white text-slate-500 hover:bg-slate-50"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {form.selectionMode === "ALL" ? (
//             <div className="m-5 flex items-start gap-3 rounded-[16px] border border-[#bce9df] bg-[#eefaf7] p-5">
//               <Gift className="mt-0.5 text-[#007566]" size={22} />
//               <div>
//                 <p className="font-extrabold text-[#1F3C50]">
//                   All wallet owners selected
//                 </p>
//                 <p className="mt-1 text-xs leading-5 text-slate-500">
//                   The adjustment will be applied to all {partners.length}
//                   eligible partner wallets.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {form.selectionMode === "MULTIPLE" && (
//                 <div className="flex justify-end border-b border-[#edf1f4] px-5 py-3">
//                   <button
//                     type="button"
//                     onClick={selectVisiblePartners}
//                     className="text-xs font-bold text-[#007566]"
//                   >
//                     Select / Clear Visible
//                   </button>
//                 </div>
//               )}

//               <div className="max-h-[430px] overflow-y-auto">
//                 {visiblePartners.map((partner) => {
//                   const selected = selectedIds.includes(partner.id);

//                   return (
//                     <button
//                       key={partner.id}
//                       type="button"
//                       onClick={() => selectPartner(partner.id)}
//                       className={`flex w-full items-center gap-3 border-b border-[#edf1f4] px-5 py-4 text-left transition last:border-b-0 ${
//                         selected ? "bg-[#f1fbf8]" : "hover:bg-[#f8fafc]"
//                       }`}
//                     >
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f7f4] text-xs font-extrabold text-[#007566]">
//                         {partner.name.charAt(0).toUpperCase()}
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="truncate text-sm font-extrabold text-[#1F3C50]">
//                           {partner.name}
//                         </p>
//                         <p className="mt-0.5 truncate text-[11px] text-slate-400">
//                           {partner.id} · {partner.email}
//                         </p>
//                       </div>

//                       <div className="text-right">
//                         <p className="text-sm font-extrabold text-[#1F3C50]">
//                           {formatCredits(partner.balance)}
//                         </p>
//                         <p className="text-[10px] uppercase text-slate-400">
//                           Credits
//                         </p>
//                       </div>

//                       <div
//                         className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
//                           selected
//                             ? "border-[#007566] bg-[#007566] text-white"
//                             : "border-[#cfd9e0] text-transparent"
//                         }`}
//                       >
//                         <Check size={14} />
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </section>

//         <section className="h-fit rounded-[18px] border border-[#d8e1e8] bg-white p-5">
//           <SectionTitle
//             icon={form.operation === "ADD" ? ArrowDownCircle : ArrowUpCircle}
//             title="Credit Adjustment"
//             description="Reason is stored and displayed to the wallet owner."
//           />

//           <div className="mt-5 grid grid-cols-2 gap-2">
//             <OperationButton
//               active={form.operation === "ADD"}
//               icon={ArrowDownCircle}
//               label="Add Credits"
//               onClick={() => updateForm("operation", "ADD")}
//             />
//             <OperationButton
//               active={form.operation === "WITHDRAW"}
//               danger
//               icon={ArrowUpCircle}
//               label="Withdraw"
//               onClick={() => updateForm("operation", "WITHDRAW")}
//             />
//           </div>

//           <div className="mt-5">
//             <InputLabel>Credit Amount</InputLabel>
//             <div className="relative">
//               <input
//                 type="number"
//                 min="1"
//                 value={form.credits}
//                 onChange={(event) => updateForm("credits", event.target.value)}
//                 placeholder="Example: 100"
//                 className="h-12 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] px-4 pr-20 text-sm font-extrabold text-[#1F3C50] outline-none focus:border-[#007566]"
//               />
//               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-slate-400">
//                 Credits
//               </span>
//             </div>
//           </div>

//           <div className="mt-4">
//             <InputLabel>Credit Source</InputLabel>
//             <select
//               value={form.source}
//               onChange={(event) => updateForm("source", event.target.value)}
//               className="h-12 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] px-4 text-sm font-bold text-[#1F3C50] outline-none focus:border-[#007566]"
//             >
//               <option value="ADMIN_PROMOTIONAL">Free / Promotional</option>
//               <option value="CASH_PAYMENT">Cash Payment</option>
//               <option value="FESTIVE_BONUS">Festive Bonus</option>
//               <option value="MAINTENANCE">Maintenance Adjustment</option>
//               <option value="OTHER">Other</option>
//             </select>
//           </div>

//           <div className="mt-4">
//             <InputLabel>Reference (Optional)</InputLabel>
//             <input
//               value={form.reference}
//               onChange={(event) => updateForm("reference", event.target.value)}
//               placeholder="Cash receipt or campaign ID"
//               className="h-12 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#007566]"
//             />
//           </div>

//           <div className="mt-4">
//             <InputLabel>User Visible Reason *</InputLabel>
//             <textarea
//               rows={4}
//               value={form.reason}
//               onChange={(event) => updateForm("reason", event.target.value)}
//               placeholder="Example: DigiNiwas deducted 25 credits for maintenance."
//               className="w-full resize-none rounded-xl border border-[#d8e1e8] bg-[#f8fafc] p-4 text-sm leading-6 outline-none focus:border-[#007566]"
//             />
//             <p className="mt-1 text-right text-[10px] text-slate-400">
//               Minimum 5 characters
//             </p>
//           </div>

//           <div className="mt-5 rounded-xl bg-[#f6f8fa] p-4">
//             <div className="flex justify-between text-xs text-slate-500">
//               <span>Selected accounts</span>
//               <strong className="text-[#1F3C50]">{selectedCount}</strong>
//             </div>
//             <div className="mt-2 flex justify-between text-xs text-slate-500">
//               <span>Total adjustment</span>
//               <strong
//                 className={
//                   form.operation === "ADD" ? "text-[#007566]" : "text-rose-600"
//                 }
//               >
//                 {form.operation === "ADD" ? "+" : "-"}
//                 {formatCredits(Number(form.credits || 0) * selectedCount)}{" "}
//                 Credits
//               </strong>
//             </div>
//           </div>

//           {error && (
//             <div className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
//               <span>{error}</span>
//               <button type="button" onClick={() => setError("")}>
//                 <X size={15} />
//               </button>
//             </div>
//           )}

//           {message && (
//             <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#bce9df] bg-[#eefaf7] p-3 text-xs font-semibold text-[#007566]">
//               <CheckCircle2 size={16} className="shrink-0" /> {message}
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={submitAdjustment}
//             disabled={saving}
//             className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white shadow-lg transition disabled:opacity-60 ${
//               form.operation === "ADD"
//                 ? "bg-[#007566] shadow-[#007566]/15 hover:bg-[#005f54]"
//                 : "bg-rose-600 shadow-rose-600/15 hover:bg-rose-700"
//             }`}
//           >
//             {form.operation === "ADD" ? (
//               <ArrowDownCircle size={17} />
//             ) : (
//               <ArrowUpCircle size={17} />
//             )}
//             {saving
//               ? "Processing..."
//               : form.operation === "ADD"
//                 ? "Confirm Credit Addition"
//                 : "Confirm Credit Withdrawal"}
//           </button>
//         </section>
//       </div>

//       <section className="mt-4 overflow-hidden rounded-[18px] border border-[#d8e1e8] bg-white">
//         <div className="border-b border-[#d8e1e8] p-5">
//           <SectionTitle
//             icon={History}
//             title="Recent Admin Adjustments"
//             description="Successful admin credit actions saved in the transaction ledger."
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[850px] text-left">
//             <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase tracking-wider text-slate-500">
//               <tr>
//                 <th className="px-5 py-3">Transaction</th>
//                 <th className="px-5 py-3">Account</th>
//                 <th className="px-5 py-3">Type</th>
//                 <th className="px-5 py-3">Credits</th>
//                 <th className="px-5 py-3">Source & Reason</th>
//                 <th className="px-5 py-3">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.length ? (
//                 history.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-t border-[#edf1f4] text-sm"
//                   >
//                     <td className="px-5 py-4 font-bold text-[#1F3C50]">
//                       {item.id}
//                     </td>
//                     <td className="max-w-[220px] truncate px-5 py-4 text-slate-600">
//                       {item.accounts}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
//                           item.operation === "ADD"
//                             ? "bg-[#e8f7f4] text-[#007566]"
//                             : "bg-rose-50 text-rose-600"
//                         }`}
//                       >
//                         {item.operation}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 font-extrabold text-[#1F3C50]">
//                       {item.operation === "ADD" ? "+" : "-"}
//                       {formatCredits(item.credits)}
//                     </td>
//                     <td className="max-w-[300px] px-5 py-4">
//                       <p className="text-[10px] font-bold text-[#007566]">
//                         {item.source}
//                       </p>
//                       <p className="mt-1 truncate text-xs text-slate-500">
//                         {item.reason}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4 text-xs text-slate-500">
//                       {item.createdAt}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-5 py-12 text-center">
//                     <History className="mx-auto text-slate-300" size={28} />
//                     <p className="mt-2 text-sm font-bold text-[#1F3C50]">
//                       No admin adjustments found
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Successful additions and withdrawals will appear here.
//                     </p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between border-t border-[#edf1f4] px-5 py-4 text-xs text-slate-400">
//           <span>{history.length} adjustment(s)</span>
//           <div className="flex gap-1">
//             <button className="rounded-lg border border-[#d8e1e8] p-2">
//               <ChevronLeft size={14} />
//             </button>
//             <button className="rounded-lg bg-[#1F3C50] px-3 text-white">
//               1
//             </button>
//             <button className="rounded-lg border border-[#d8e1e8] p-2">
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// function InputLabel({ children }) {
//   return (
//     <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
//       {children}
//     </p>
//   );
// }

// function SummaryCard({ icon: Icon, title, value, subtext }) {
//   return (
//     <div className="rounded-[18px] border border-[#d8e1e8] bg-white p-5">
//       <div className="flex items-start justify-between">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7f4] text-[#007566]">
//           <Icon size={19} />
//         </div>
//         <span className="rounded-full bg-[#f1f5f7] px-2.5 py-1 text-[9px] font-bold uppercase text-slate-500">
//           Live
//         </span>
//       </div>
//       <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
//         {title}
//       </p>
//       <h3 className="mt-1 text-[21px] font-extrabold text-[#1F3C50]">
//         {value}
//       </h3>
//       <p className="mt-1 text-xs text-slate-400">{subtext}</p>
//     </div>
//   );
// }

// function SectionTitle({ icon: Icon, title, description }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f7f4] text-[#007566]">
//         <Icon size={18} />
//       </div>
//       <div>
//         <h2 className="text-[17px] font-extrabold text-[#1F3C50]">{title}</h2>
//         <p className="mt-0.5 text-xs text-slate-500">{description}</p>
//       </div>
//     </div>
//   );
// }

// function OperationButton({ active, danger, icon: Icon, label, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition ${
//         active
//           ? danger
//             ? "border-rose-600 bg-rose-50 text-rose-600"
//             : "border-[#007566] bg-[#e8f7f4] text-[#007566]"
//           : "border-[#d8e1e8] bg-white text-slate-500 hover:bg-slate-50"
//       }`}
//     >
//       <Icon size={16} /> {label}
//     </button>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gift,
  History,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";

import {
  adminAddCreditApi,
  adminBulkAddCreditApi,
  adminWithdrawCreditApi,
  adminBulkWithdrawCreditApi,
  createIdempotencyKey,
  getAdminAdjustmentsApi,
  getPartnersForCreditApi,
} from "../../../Services/adminCreditService";

const EMPTY_FORM = {
  operation: "ADD",
  selectionMode: "SINGLE",
  credits: "",
  reason: "",
  source: "ADMIN_PROMOTIONAL",
  reference: "",
};

const PARTNERS_PER_PAGE = 10;
const HISTORY_PER_PAGE = 10;

const formatCredits = (value) =>
  new Intl.NumberFormat("en-IN").format(Number(value || 0));

const normalizePartner = (partner) => ({
  id:
    partner.partnerId ||
    partner.partnerCode ||
    partner.userId ||
    partner._id,

  name:
    partner.name ||
    partner.fullName ||
    "Unknown Partner",

  email: partner.email || "No email",

  balance:
    partner.wallet?.currentBalance ??
    partner.wallet?.balance ??
    partner.creditWallet?.balance ??
    partner.creditBalance ??
    partner.credits ??
    0,

  role:
    partner.partnerType ||
    partner.type ||
    partner.role ||
    "Partner",
});

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  "Unable to complete the credit operation.";

export default function AdminCreditManagement() {
  const [partners, setPartners] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [form, setForm] = useState(EMPTY_FORM);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);

  // --------------------------------------------------
  // PAGINATION STATES
  // --------------------------------------------------

  const [partnerPage, setPartnerPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);

  // --------------------------------------------------
  // LOAD PARTNERS
  // --------------------------------------------------

  const loadPartners = async () => {
    try {
      setLoading(true);

      const response = await getPartnersForCreditApi({
        limit: 500,
      });

      const rows =
        response?.data?.partners ||
        response?.data ||
        response?.partners ||
        [];

      setPartners(
        Array.isArray(rows)
          ? rows.map(normalizePartner)
          : [],
      );
    } catch (requestError) {
      console.error(requestError);

      setPartners([]);

      setError(
        "Partner wallet listing API could not be loaded.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD HISTORY
  // --------------------------------------------------

  const loadHistory = async () => {
    try {
      const response = await getAdminAdjustmentsApi({
        page: 1,
        limit: 500,
      });

      const rows = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.adjustments)
          ? response.data.adjustments
          : Array.isArray(response?.adjustments)
            ? response.adjustments
            : [];

      const normalizedHistory = rows
        .map((item) => ({
          id:
            item.transactionId ||
            item._id ||
            `${item.partnerId}-${item.createdAt}`,

          operation:
            item.operation ||
            (item.direction === "DEBIT"
              ? "WITHDRAW"
              : "ADD"),

          accounts:
            item.partnerName ||
            item.partnerId ||
            "Unknown Partner",

          credits: Number(item.credits || 0),

          reason:
            item.reason ||
            item.description ||
            "",

          source:
            item.source ||
            "ADMIN_ADJUSTMENT",

          createdAt: item.createdAt
            ? new Date(item.createdAt).toLocaleString("en-IN")
            : "-",

          // Keep original date for sorting
          sortDate: item.createdAt
            ? new Date(item.createdAt).getTime()
            : 0,
        }))
        .sort((a, b) => b.sortDate - a.sortDate);

      setHistory(normalizedHistory);
    } catch (requestError) {
      console.error(requestError);
      setHistory([]);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    loadPartners();
    loadHistory();
  }, []);

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const visiblePartners = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return partners;

    return partners.filter((partner) =>
      `${partner.name} ${partner.email} ${partner.id} ${partner.role}`
        .toLowerCase()
        .includes(query),
    );
  }, [partners, search]);

  // --------------------------------------------------
  // PARTNER PAGINATION
  // --------------------------------------------------

  const partnerTotalPages = Math.max(
    1,
    Math.ceil(
      visiblePartners.length / PARTNERS_PER_PAGE,
    ),
  );

  const paginatedPartners = useMemo(() => {
    const startIndex =
      (partnerPage - 1) * PARTNERS_PER_PAGE;

    return visiblePartners.slice(
      startIndex,
      startIndex + PARTNERS_PER_PAGE,
    );
  }, [visiblePartners, partnerPage]);

  // --------------------------------------------------
  // HISTORY PAGINATION
  // --------------------------------------------------

  const historyTotalPages = Math.max(
    1,
    Math.ceil(
      history.length / HISTORY_PER_PAGE,
    ),
  );

  const paginatedHistory = useMemo(() => {
    const startIndex =
      (historyPage - 1) * HISTORY_PER_PAGE;

    return history.slice(
      startIndex,
      startIndex + HISTORY_PER_PAGE,
    );
  }, [history, historyPage]);

  // --------------------------------------------------
  // KEEP PAGINATION VALID
  // --------------------------------------------------

  useEffect(() => {
    if (partnerPage > partnerTotalPages) {
      setPartnerPage(partnerTotalPages);
    }
  }, [partnerPage, partnerTotalPages]);

  useEffect(() => {
    if (historyPage > historyTotalPages) {
      setHistoryPage(historyTotalPages);
    }
  }, [historyPage, historyTotalPages]);

  // --------------------------------------------------
  // SEARCH RESET PAGE
  // --------------------------------------------------

  useEffect(() => {
    setPartnerPage(1);
  }, [search]);

  // --------------------------------------------------
  // TOTAL BALANCE
  // --------------------------------------------------

  const totalBalance = useMemo(
    () =>
      partners.reduce(
        (total, item) =>
          total + Number(item.balance || 0),
        0,
      ),
    [partners],
  );

  // --------------------------------------------------
  // SELECTED COUNT
  // --------------------------------------------------

  const selectedCount =
    form.selectionMode === "ALL"
      ? partners.length
      : selectedIds.length;

  // --------------------------------------------------
  // FORM UPDATE
  // --------------------------------------------------

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setMessage("");

    if (field === "selectionMode") {
      setSelectedIds([]);
      setPartnerPage(1);
    }
  };

  // --------------------------------------------------
  // SELECT PARTNER
  // --------------------------------------------------

  const selectPartner = (partnerId) => {
    setSelectedIds((current) => {
      if (form.selectionMode === "SINGLE") {
        return [partnerId];
      }

      return current.includes(partnerId)
        ? current.filter(
            (id) => id !== partnerId,
          )
        : [...current, partnerId];
    });
  };

  // --------------------------------------------------
  // SELECT / CLEAR VISIBLE PARTNERS
  // --------------------------------------------------

  const selectVisiblePartners = () => {
    const visibleIds = paginatedPartners.map(
      (partner) => partner.id,
    );

    const allVisibleSelected = visibleIds.every(
      (id) => selectedIds.includes(id),
    );

    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter(
            (id) => !visibleIds.includes(id),
          )
        : [
            ...new Set([
              ...current,
              ...visibleIds,
            ]),
          ],
    );
  };

  // --------------------------------------------------
  // VALIDATION
  // --------------------------------------------------

  const validate = () => {
    if (Number(form.credits) <= 0) {
      return "Enter a valid credit amount.";
    }

    if (form.reason.trim().length < 5) {
      return "Reason must contain at least 5 characters.";
    }

    if (
      form.selectionMode !== "ALL" &&
      selectedIds.length === 0
    ) {
      return "Please select at least one partner.";
    }

    return "";
  };

  // --------------------------------------------------
  // SUBMIT ADJUSTMENT
  // --------------------------------------------------

  const submitAdjustment = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    const credits = Number(form.credits);

    const commonPayload = {
      credits,
      reason: form.reason.trim(),
      source: form.source,
      reference:
        form.reference.trim() || undefined,
      idempotencyKey: createIdempotencyKey(
        form.operation.toLowerCase(),
      ),
    };

    try {
      setSaving(true);
      setError("");
      setMessage("");

      // --------------------------------------------
      // WITHDRAW
      // --------------------------------------------

      if (form.operation === "WITHDRAW") {
        // SINGLE
        if (form.selectionMode === "SINGLE") {
          await adminWithdrawCreditApi({
            ...commonPayload,
            partnerId: selectedIds[0],
          });
        }

        // MULTIPLE / ALL
        else {
          await adminBulkWithdrawCreditApi({
            ...commonPayload,

            ...(form.selectionMode === "ALL"
              ? {
                  allPartners: true,
                }
              : {
                  partnerIds: selectedIds,
                }),
          });
        }
      }

      // --------------------------------------------
      // ADD
      // --------------------------------------------

      else if (
        form.selectionMode === "SINGLE"
      ) {
        await adminAddCreditApi({
          ...commonPayload,
          partnerId: selectedIds[0],
        });
      }

      // MULTIPLE / ALL ADD
      else {
        await adminBulkAddCreditApi({
          ...commonPayload,

          ...(form.selectionMode === "ALL"
            ? {
                allPartners: true,
              }
            : {
                partnerIds: selectedIds,
              }),
        });
      }

      // --------------------------------------------
      // REFRESH
      // --------------------------------------------

      await Promise.all([
        loadPartners(),
        loadHistory(),
      ]);

      // --------------------------------------------
      // SUCCESS MESSAGE
      // --------------------------------------------

      setMessage(
        `${formatCredits(credits)} credits ${
          form.operation === "ADD"
            ? "added"
            : "withdrawn"
        } successfully for ${selectedCount} account(s).`,
      );

      setForm(EMPTY_FORM);
      setSelectedIds([]);

      setPartnerPage(1);
      setHistoryPage(1);
    } catch (requestError) {
      console.error(requestError);

      setError(
        getErrorMessage(requestError),
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // PARTNER PAGINATION HELPERS
  // --------------------------------------------------

  const goToPartnerPage = (page) => {
    const safePage = Math.min(
      Math.max(page, 1),
      partnerTotalPages,
    );

    setPartnerPage(safePage);
  };

  // --------------------------------------------------
  // HISTORY PAGINATION HELPERS
  // --------------------------------------------------

  const goToHistoryPage = (page) => {
    const safePage = Math.min(
      Math.max(page, 1),
      historyTotalPages,
    );

    setHistoryPage(safePage);
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#f4f6f8]">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#007566]/20 border-t-[#007566]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-1 md:p-1">
      <div className="rounded-[18px] px-1 py-1">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
              Admin Credit Management
            </h1>

            <p className="mt-1 text-[11px] text-slate-500">
              Add promotional or cash credits and withdraw
              wallet credits with an auditable reason.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#e8f7f4] px-4 py-2 text-xs font-bold text-[#007566]">
            <ShieldCheck size={15} />
            Admin Protected
          </div>
        </div>
      </div>

      {/* ==================================================
          SUMMARY CARDS
      ================================================== */}

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={WalletCards}
          title="Credits In Wallets"
          value={`${formatCredits(totalBalance)} Credits`}
          subtext={`${partners.length} wallet owners`}
        />

        <SummaryCard
          icon={UsersRound}
          title="Selected Accounts"
          value={`${selectedCount} Accounts`}
          subtext={
            form.selectionMode === "ALL"
              ? "All partners selected"
              : "Current selection"
          }
        />

        <SummaryCard
          icon={ArrowDownCircle}
          title="Current Action"
          value={
            form.operation === "ADD"
              ? "Add Credits"
              : "Withdraw"
          }
          subtext="Admin wallet adjustment"
        />

        <SummaryCard
          icon={History}
          title="Recent Adjustments"
          value={`${history.length} Actions`}
          subtext="Loaded from transaction ledger"
        />
      </div>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">

        {/* ==================================================
            SELECT WALLET OWNERS
        ================================================== */}

        <section className="overflow-hidden rounded-[18px] border border-[#d8e1e8] bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#d8e1e8] p-5 md:flex-row md:items-center">
            <SectionTitle
              icon={UserRound}
              title="Select Wallet Owners"
              description="Choose one, multiple, or every eligible partner."
            />

            <div className="relative w-full md:max-w-sm">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search partner, email or ID..."
                className="h-11 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] pl-10 pr-4 text-sm outline-none transition focus:border-[#007566]"
              />
            </div>
          </div>

          {/* SELECTION MODE */}

          <div className="grid grid-cols-3 gap-2 border-b border-[#d8e1e8] p-4">
            {[
              ["SINGLE", "Single"],
              ["MULTIPLE", "Multiple"],
              ["ALL", "All Partners"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  updateForm(
                    "selectionMode",
                    value,
                  )
                }
                className={`h-10 rounded-xl border text-xs font-bold transition ${
                  form.selectionMode === value
                    ? "border-[#007566] bg-[#e8f7f4] text-[#007566]"
                    : "border-[#d8e1e8] bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ALL MODE */}

          {form.selectionMode === "ALL" ? (
            <div className="m-5 flex items-start gap-3 rounded-[16px] border border-[#bce9df] bg-[#eefaf7] p-5">
              <Gift
                className="mt-0.5 text-[#007566]"
                size={22}
              />

              <div>
                <p className="font-extrabold text-[#1F3C50]">
                  All wallet owners selected
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The adjustment will be applied to all{" "}
                  {partners.length} eligible partner wallets.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* MULTIPLE SELECT CONTROLS */}

              {form.selectionMode === "MULTIPLE" && (
                <div className="flex items-center justify-between border-b border-[#edf1f4] px-5 py-3">
                  <span className="text-[11px] text-slate-400">
                    {selectedIds.length} selected
                  </span>

                  <button
                    type="button"
                    onClick={selectVisiblePartners}
                    className="text-xs font-bold text-[#007566]"
                  >
                    Select / Clear Visible
                  </button>
                </div>
              )}

              {/* PARTNER LIST */}

              <div className="max-h-[430px] overflow-y-auto">
                {paginatedPartners.length ? (
                  paginatedPartners.map(
                    (partner) => {
                      const selected =
                        selectedIds.includes(
                          partner.id,
                        );

                      return (
                        <button
                          key={partner.id}
                          type="button"
                          onClick={() =>
                            selectPartner(
                              partner.id,
                            )
                          }
                          className={`flex w-full items-center gap-3 border-b border-[#edf1f4] px-5 py-4 text-left transition last:border-b-0 ${
                            selected
                              ? "bg-[#f1fbf8]"
                              : "hover:bg-[#f8fafc]"
                          }`}
                        >
                          {/* AVATAR */}

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f7f4] text-xs font-extrabold text-[#007566]">
                            {partner.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          {/* INFO */}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-extrabold text-[#1F3C50]">
                              {partner.name}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-slate-400">
                              {partner.id} ·{" "}
                              {partner.email}
                            </p>
                          </div>

                          {/* BALANCE */}

                          <div className="text-right">
                            <p className="text-sm font-extrabold text-[#1F3C50]">
                              {formatCredits(
                                partner.balance,
                              )}
                            </p>

                            <p className="text-[10px] uppercase text-slate-400">
                              Credits
                            </p>
                          </div>

                          {/* CHECK */}

                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                              selected
                                ? "border-[#007566] bg-[#007566] text-white"
                                : "border-[#cfd9e0] text-transparent"
                            }`}
                          >
                            <Check size={14} />
                          </div>
                        </button>
                      );
                    },
                  )
                ) : (
                  <div className="px-5 py-12 text-center">
                    <UserRound
                      size={28}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-sm font-bold text-[#1F3C50]">
                      No partners found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try another search.
                    </p>
                  </div>
                )}
              </div>

              {/* PARTNER PAGINATION */}

              {visiblePartners.length > 0 && (
                <Pagination
                  currentPage={partnerPage}
                  totalPages={partnerTotalPages}
                  totalItems={visiblePartners.length}
                  itemsPerPage={PARTNERS_PER_PAGE}
                  onPageChange={goToPartnerPage}
                />
              )}
            </>
          )}
        </section>

        {/* ==================================================
            CREDIT ADJUSTMENT
        ================================================== */}

        <section className="h-fit rounded-[18px] border border-[#d8e1e8] bg-white p-5">
          <SectionTitle
            icon={
              form.operation === "ADD"
                ? ArrowDownCircle
                : ArrowUpCircle
            }
            title="Credit Adjustment"
            description="Reason is stored and displayed to the wallet owner."
          />

          {/* OPERATION */}

          <div className="mt-5 grid grid-cols-2 gap-2">
            <OperationButton
              active={form.operation === "ADD"}
              icon={ArrowDownCircle}
              label="Add Credits"
              onClick={() =>
                updateForm(
                  "operation",
                  "ADD",
                )
              }
            />

            <OperationButton
              active={form.operation === "WITHDRAW"}
              danger
              icon={ArrowUpCircle}
              label="Withdraw"
              onClick={() =>
                updateForm(
                  "operation",
                  "WITHDRAW",
                )
              }
            />
          </div>

          {/* CREDIT AMOUNT */}

          <div className="mt-5">
            <InputLabel>
              Credit Amount
            </InputLabel>

            <div className="relative">
              <input
                type="number"
                min="1"
                value={form.credits}
                onChange={(event) =>
                  updateForm(
                    "credits",
                    event.target.value,
                  )
                }
                placeholder="Example: 100"
                className="h-12 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] px-4 pr-20 text-sm font-extrabold text-[#1F3C50] outline-none focus:border-[#007566]"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-slate-400">
                Credits
              </span>
            </div>
          </div>

          {/* SOURCE */}

          <div className="mt-4">
            <InputLabel>
              Credit Source
            </InputLabel>

            <select
              value={form.source}
              onChange={(event) =>
                updateForm(
                  "source",
                  event.target.value,
                )
              }
              className="h-12 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] px-4 text-sm font-bold text-[#1F3C50] outline-none focus:border-[#007566]"
            >
              <option value="ADMIN_PROMOTIONAL">
                Free / Promotional
              </option>

              <option value="CASH_PAYMENT">
                Cash Payment
              </option>

              <option value="FESTIVE_BONUS">
                Festive Bonus
              </option>

              <option value="MAINTENANCE">
                Maintenance Adjustment
              </option>

              <option value="OTHER">
                Other
              </option>
            </select>
          </div>

          {/* REFERENCE */}

          <div className="mt-4">
            <InputLabel>
              Reference (Optional)
            </InputLabel>

            <input
              value={form.reference}
              onChange={(event) =>
                updateForm(
                  "reference",
                  event.target.value,
                )
              }
              placeholder="Cash receipt or campaign ID"
              className="h-12 w-full rounded-xl border border-[#d8e1e8] bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#007566]"
            />
          </div>

          {/* REASON */}

          <div className="mt-4">
            <InputLabel>
              User Visible Reason *
            </InputLabel>

            <textarea
              rows={4}
              value={form.reason}
              onChange={(event) =>
                updateForm(
                  "reason",
                  event.target.value,
                )
              }
              placeholder="Example: DigiNiwas deducted 25 credits for maintenance."
              className="w-full resize-none rounded-xl border border-[#d8e1e8] bg-[#f8fafc] p-4 text-sm leading-6 outline-none focus:border-[#007566]"
            />

            <p className="mt-1 text-right text-[10px] text-slate-400">
              Minimum 5 characters
            </p>
          </div>

          {/* SUMMARY */}

          <div className="mt-5 rounded-xl bg-[#f6f8fa] p-4">
            <div className="flex justify-between text-xs text-slate-500">
              <span>
                Selected accounts
              </span>

              <strong className="text-[#1F3C50]">
                {selectedCount}
              </strong>
            </div>

            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>
                Total adjustment
              </span>

              <strong
                className={
                  form.operation === "ADD"
                    ? "text-[#007566]"
                    : "text-rose-600"
                }
              >
                {form.operation === "ADD"
                  ? "+"
                  : "-"}
                {formatCredits(
                  Number(
                    form.credits || 0,
                  ) * selectedCount,
                )}{" "}
                Credits
              </strong>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
              <span>{error}</span>

              <button
                type="button"
                onClick={() =>
                  setError("")
                }
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* SUCCESS */}

          {message && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#bce9df] bg-[#eefaf7] p-3 text-xs font-semibold text-[#007566]">
              <CheckCircle2
                size={16}
                className="shrink-0"
              />

              {message}
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="button"
            onClick={submitAdjustment}
            disabled={saving}
            className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white shadow-lg transition disabled:opacity-60 ${
              form.operation === "ADD"
                ? "bg-[#007566] shadow-[#007566]/15 hover:bg-[#005f54]"
                : "bg-rose-600 shadow-rose-600/15 hover:bg-rose-700"
            }`}
          >
            {form.operation === "ADD" ? (
              <ArrowDownCircle size={17} />
            ) : (
              <ArrowUpCircle size={17} />
            )}

            {saving
              ? "Processing..."
              : form.operation === "ADD"
                ? "Confirm Credit Addition"
                : "Confirm Credit Withdrawal"}
          </button>
        </section>
      </div>

      {/* ==================================================
          RECENT ADMIN ADJUSTMENTS
      ================================================== */}

      <section className="mt-4 overflow-hidden rounded-[18px] border border-[#d8e1e8] bg-white">
        <div className="border-b border-[#d8e1e8] p-5">
          <SectionTitle
            icon={History}
            title="Recent Admin Adjustments"
            description="Newest adjustments appear first. Older adjustments appear on the next pages."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">
                  Transaction
                </th>

                <th className="px-5 py-3">
                  Account
                </th>

                <th className="px-5 py-3">
                  Type
                </th>

                <th className="px-5 py-3">
                  Credits
                </th>

                <th className="px-5 py-3">
                  Source & Reason
                </th>

                <th className="px-5 py-3">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedHistory.length ? (
                paginatedHistory.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-t border-[#edf1f4] text-sm"
                    >
                      <td className="px-5 py-4 font-bold text-[#1F3C50]">
                        {item.id}
                      </td>

                      <td className="max-w-[220px] truncate px-5 py-4 text-slate-600">
                        {item.accounts}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            item.operation ===
                            "ADD"
                              ? "bg-[#e8f7f4] text-[#007566]"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {item.operation}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-extrabold text-[#1F3C50]">
                        {item.operation ===
                        "ADD"
                          ? "+"
                          : "-"}
                        {formatCredits(
                          item.credits,
                        )}
                      </td>

                      <td className="max-w-[300px] px-5 py-4">
                        <p className="text-[10px] font-bold text-[#007566]">
                          {item.source}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {item.reason}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-xs text-slate-500">
                        {item.createdAt}
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center"
                  >
                    <History
                      className="mx-auto text-slate-300"
                      size={28}
                    />

                    <p className="mt-2 text-sm font-bold text-[#1F3C50]">
                      No admin adjustments found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Successful additions and
                      withdrawals will appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* HISTORY PAGINATION */}

        {history.length > 0 && (
          <Pagination
            currentPage={historyPage}
            totalPages={historyTotalPages}
            totalItems={history.length}
            itemsPerPage={HISTORY_PER_PAGE}
            onPageChange={goToHistoryPage}
          />
        )}
      </section>
    </div>
  );
}

// ======================================================
// PAGINATION COMPONENT
// ======================================================

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
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems,
  );

  // --------------------------------------------
  // PAGE NUMBERS
  // --------------------------------------------

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
      pageNumbers.push("...");
    }

    const start = Math.max(
      2,
      currentPage - 1,
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1,
    );

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pageNumbers.push(page);
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex flex-col gap-3 border-t border-[#edf1f4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* COUNT */}

      <span className="text-xs text-slate-400">
        Showing{" "}
        <strong className="text-slate-600">
          {startItem}
        </strong>{" "}
        -{" "}
        <strong className="text-slate-600">
          {endItem}
        </strong>{" "}
        of{" "}
        <strong className="text-slate-600">
          {totalItems}
        </strong>
      </span>

      {/* PAGINATION */}

      <div className="flex items-center gap-1">
        {/* PREVIOUS */}

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              currentPage - 1,
            )
          }
          className="rounded-lg border border-[#d8e1e8] p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={14} />
        </button>

        {/* PAGE NUMBERS */}

        {pageNumbers.map(
          (page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-2 text-xs text-slate-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() =>
                  onPageChange(page)
                }
                className={`min-w-[32px] rounded-lg px-2 py-2 text-xs font-bold transition ${
                  currentPage === page
                    ? "bg-[#1F3C50] text-white"
                    : "border border-[#d8e1e8] bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ),
        )}

        {/* NEXT */}

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1,
            )
          }
          className="rounded-lg border border-[#d8e1e8] p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ======================================================
// INPUT LABEL
// ======================================================

function InputLabel({ children }) {
  return (
    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
      {children}
    </p>
  );
}

// ======================================================
// SUMMARY CARD
// ======================================================

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtext,
}) {
  return (
    <div className="rounded-[18px] border border-[#d8e1e8] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7f4] text-[#007566]">
          <Icon size={19} />
        </div>

        <span className="rounded-full bg-[#f1f5f7] px-2.5 py-1 text-[9px] font-bold uppercase text-slate-500">
          Live
        </span>
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-[21px] font-extrabold text-[#1F3C50]">
        {value}
      </h3>

      <p className="mt-1 text-xs text-slate-400">
        {subtext}
      </p>
    </div>
  );
}

// ======================================================
// SECTION TITLE
// ======================================================

function SectionTitle({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f7f4] text-[#007566]">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="text-[17px] font-extrabold text-[#1F3C50]">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

// ======================================================
// OPERATION BUTTON
// ======================================================

function OperationButton({
  active,
  danger,
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition ${
        active
          ? danger
            ? "border-rose-600 bg-rose-50 text-rose-600"
            : "border-[#007566] bg-[#e8f7f4] text-[#007566]"
          : "border-[#d8e1e8] bg-white text-slate-500 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}