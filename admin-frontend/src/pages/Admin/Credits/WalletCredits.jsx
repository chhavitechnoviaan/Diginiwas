

// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Search,
//   Wallet,
//   RefreshCcw,
//   TrendingUp,
//   Building2,
//   Users,
//   Eye,
//   X,
//   BadgeIndianRupee,
//   Zap,
//   Star,
//   MapPin,
//   Unlock,
//   Loader2,
//   IndianRupee,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   RotateCcw,
// } from "lucide-react";

// import {
//   getCreditDashboardApi,
//   getPartnerCreditOverviewApi,
//   getPartnerCreditDetailsApi,
//   getPropertyCreditOverviewApi,
//   getPropertyCreditDetailsApi,
//   getCreditHistoryApi,
// } from "../../../Services/creditService";

// const WalletOperationsDashboard =
//   () => {
//     const [
//       activeTab,
//       setActiveTab,
//     ] = useState(
//       "partners"
//     );

//     const [
//       dashboard,
//       setDashboard,
//     ] = useState({});

//     const [
//       partners,
//       setPartners,
//     ] = useState([]);

//     const [
//       properties,
//       setProperties,
//     ] = useState([]);

//     const [
//       transactions,
//       setTransactions,
//     ] = useState([]);

//     const [
//       search,
//       setSearch,
//     ] = useState("");

//     const [
//       loading,
//       setLoading,
//     ] = useState(true);

//     const [
//       detailLoading,
//       setDetailLoading,
//     ] = useState(false);

//     const [
//       error,
//       setError,
//     ] = useState("");

//     const [
//       selectedPartner,
//       setSelectedPartner,
//     ] = useState(null);

//     const [
//       selectedProperty,
//       setSelectedProperty,
//     ] = useState(null);

//     // ======================================================
//     // LOAD ALL DATA
//     // ======================================================

//     const loadData =
//       async () => {
//         try {
//           setLoading(true);

//           setError("");

//           const [
//             dashboardResponse,
//             partnerResponse,
//             propertyResponse,
//             historyResponse,
//           ] =
//             await Promise.all([
//               getCreditDashboardApi(),

//               getPartnerCreditOverviewApi(),

//               getPropertyCreditOverviewApi(),

//               getCreditHistoryApi({
//                 page: 1,
//                 limit: 100,
//               }),
//             ]);

//           setDashboard(
//             dashboardResponse
//               ?.data || {}
//           );

//           setPartners(
//             Array.isArray(
//               partnerResponse
//                 ?.data
//             )
//               ? partnerResponse
//                   .data
//               : []
//           );

//           setProperties(
//             Array.isArray(
//               propertyResponse
//                 ?.data
//             )
//               ? propertyResponse
//                   .data
//               : []
//           );

//           setTransactions(
//             Array.isArray(
//               historyResponse
//                 ?.data
//             )
//               ? historyResponse
//                   .data
//               : []
//           );
//         } catch (
//           apiError
//         ) {
//           console.error(
//             "Wallet load error:",
//             apiError
//           );

//           setError(
//             apiError
//               ?.response
//               ?.data
//               ?.message ||
//               "Unable to load wallet data."
//           );
//         } finally {
//           setLoading(
//             false
//           );
//         }
//       };

//     useEffect(() => {
//       loadData();
//     }, []);

//     // ======================================================
//     // FORMATTERS
//     // ======================================================

//     const numberFormat =
//       (value) =>
//         Number(
//           value || 0
//         ).toLocaleString(
//           "en-IN"
//         );

//     const currencyFormat =
//       (value) =>
//         new Intl.NumberFormat(
//           "en-IN",
//           {
//             style:
//               "currency",

//             currency:
//               "INR",

//             maximumFractionDigits: 0,
//           }
//         ).format(
//           Number(
//             value || 0
//           )
//         );

//     const dateFormat =
//       (date) => {
//         if (!date) {
//           return "-";
//         }

//         return new Date(
//           date
//         ).toLocaleString(
//           "en-IN",
//           {
//             day: "2-digit",

//             month:
//               "short",

//             year:
//               "numeric",

//             hour:
//               "2-digit",

//             minute:
//               "2-digit",
//           }
//         );
//       };

//     // ======================================================
//     // OVERVIEW
//     // ======================================================

//     const overview =
//       dashboard
//         ?.overview || {};

//     const serviceUsage =
//       Array.isArray(
//         dashboard
//           ?.serviceUsage
//       )
//         ? dashboard
//             .serviceUsage
//         : [];

//     const findService =
//       (
//         serviceCode
//       ) =>
//         serviceUsage.find(
//           (item) =>
//             item.code ===
//             serviceCode
//         ) || {
//           totalCredits: 0,
//           totalRequests: 0,
//           propertiesCount: 0,
//           partnersCount: 0,
//         };

//     const boost =
//       findService(
//         "PROPERTY_BOOST"
//       );

//     const featured =
//       findService(
//         "FEATURED_7_DAYS"
//       );

//     const locality =
//       findService(
//         "LOCALITY_TOP_30_DAYS"
//       );

//     const leadUnlock =
//       findService(
//         "LEAD_UNLOCK"
//       );

//     // ======================================================
//     // FILTER PARTNERS
//     // ======================================================

//     const filteredPartners =
//       useMemo(() => {
//         const value =
//           search
//             .trim()
//             .toLowerCase();

//         if (!value) {
//           return partners;
//         }

//         return partners.filter(
//           (partner) =>
//             partner?.name
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             partner?.partnerId
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             partner?.email
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             partner?.phone
//               ?.toLowerCase()
//               .includes(
//                 value
//               )
//         );
//       }, [
//         search,
//         partners,
//       ]);

//     // ======================================================
//     // FILTER PROPERTIES
//     // ======================================================

//     const filteredProperties =
//       useMemo(() => {
//         const value =
//           search
//             .trim()
//             .toLowerCase();

//         if (!value) {
//           return properties;
//         }

//         return properties.filter(
//           (item) =>
//             item
//               ?.propertyCode
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item
//               ?.propertyTitle
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item?.city
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item
//               ?.locality
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item
//               ?.partners
//               ?.some(
//                 (
//                   partner
//                 ) =>
//                   partner
//                     ?.partnerName
//                     ?.toLowerCase()
//                     .includes(
//                       value
//                     ) ||
//                   partner
//                     ?.partnerCode
//                     ?.toLowerCase()
//                     .includes(
//                       value
//                     )
//               )
//         );
//       }, [
//         search,
//         properties,
//       ]);

//     // ======================================================
//     // FILTER TRANSACTIONS
//     // ======================================================

//     const filteredTransactions =
//       useMemo(() => {
//         const value =
//           search
//             .trim()
//             .toLowerCase();

//         if (!value) {
//           return transactions;
//         }

//         return transactions.filter(
//           (
//             transaction
//           ) =>
//             transaction
//               ?.transactionId
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.partnerName
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.partnerCode
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.type
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.productCode
//               ?.toLowerCase()
//               .includes(
//                 value
//               )
//         );
//       }, [
//         transactions,
//         search,
//       ]);

//     // ======================================================
//     // VIEW PARTNER
//     // ======================================================

//     const handlePartnerView =
//       async (
//         partnerMongoId
//       ) => {
//         try {
//           setDetailLoading(
//             true
//           );

//           const response =
//             await getPartnerCreditDetailsApi(
//               partnerMongoId
//             );

//           setSelectedPartner(
//             response?.data ||
//               null
//           );
//         } catch (
//           apiError
//         ) {
//           console.error(
//             "Partner View Error:",
//             apiError
//           );
//         } finally {
//           setDetailLoading(
//             false
//           );
//         }
//       };

//     // ======================================================
//     // VIEW PROPERTY
//     // ======================================================

//     const handlePropertyView =
//       async (
//         propertyMongoId
//       ) => {
//         try {
//           setDetailLoading(
//             true
//           );

//           const response =
//             await getPropertyCreditDetailsApi(
//               propertyMongoId
//             );

//           setSelectedProperty(
//             response?.data ||
//               null
//           );
//         } catch (
//           apiError
//         ) {
//           console.error(
//             "Property View Error:",
//             apiError
//           );
//         } finally {
//           setDetailLoading(
//             false
//           );
//         }
//       };

//     // ======================================================
//     // MAIN LOADER
//     // ======================================================

//     if (loading) {
//       return (
//         <div className="min-h-[600px] flex flex-col items-center justify-center gap-3">

//           <Loader2 className="w-8 h-8 animate-spin text-[#00766C]" />

//           <p className="text-sm text-[#7086A2]">
//             Loading wallet
//             operations...
//           </p>

//         </div>
//       );
//     }

//     return (
//       <div className="min-h-screen w-full overflow-x-hidden px-1 py-1 md:px-[1px] md:py-1 text-[#1F3C50]">

//         <div className="mx-auto max-w-[1700px] space-y-1">

//           {/* ==================================================
//               HEADER
//           ================================================== */}

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//             <div>
//               <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//                 Wallet & Credit Management
//               </h1>

//               <p className="mt-1 text-[12px] text-[#62738B]">
//                 Manage partner credits, purchases, refunds, service usage and property promotion activity.
//               </p>
//             </div>

//             <button
//               onClick={loadData}
//               className="inline-flex h-[52px] w-fit items-center justify-center gap-2 rounded-[11px] border border-[#D7E0E9] bg-white px-5 text-[13px] font-semibold text-[#294766] shadow-[0_2px_5px_rgba(20,50,80,0.04)] transition hover:border-[#00776C] hover:text-[#00776C]"
//             >
//               <RefreshCcw className="h-[17px] w-[17px]" />
//               Refresh
//             </button>
//           </div>

//           {/* ==================================================
//               ERROR
//           ================================================== */}

//           {error && (
//             <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl p-4 text-sm">
//               {error}
//             </div>
//           )}

//           {/* ==================================================
//               MAIN STATS
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">

//             <StatCard
//               title="Total Credits Sold"
//               value={`${numberFormat(
//                 overview
//                   .totalCreditsSold
//               )} Credits`}
//               subtitle={
//                 currencyFormat(
//                   overview
//                     .totalCreditSalesAmount
//                 )
//               }
//               icon={
//                 <BadgeIndianRupee className="h-[19px] w-[19px]" />
//               }
//             />

//             <StatCard
//               title="Credits In Wallets"
//               value={`${numberFormat(
//                 overview
//                   .creditsCurrentlyWithPartners
//               )} Credits`}
//               subtitle={`${numberFormat(
//                 overview
//                   .partnersWithCredits
//               )} partners with balance`}
//               icon={
//                 <Wallet className="h-[19px] w-[19px]" />
//               }
//             />

//             <StatCard
//               title="Credits Used"
//               value={`${numberFormat(
//                 overview
//                   .totalCreditsSpent
//               )} Credits`}
//               subtitle="Across all services"
//               icon={
//                 <TrendingUp className="h-[19px] w-[19px]" />
//               }
//             />

//             <StatCard
//               title="Credits Refunded"
//               value={`${numberFormat(
//                 overview
//                   .totalRefundCredits
//               )} Credits`}
//               subtitle={`${numberFormat(
//                 overview
//                   .totalRefundTransactions
//               )} refund transactions`}
//               icon={
//                 <RotateCcw className="h-[19px] w-[19px]" />
//               }
//             />

//           </div>

//           {/* ==================================================
//               SECONDARY STATS
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
//             <SmallStat
//               label="Total Partners"
//               value={numberFormat(overview?.totalPartners)}
//               icon={<Users className="h-[19px] w-[19px]" />}
//               tone="blue"
//             />

//             <SmallStat
//               label="Purchase Transactions"
//               value={numberFormat(overview?.totalPurchaseTransactions)}
//               icon={<IndianRupee className="h-[19px] w-[19px]" />}
//               tone="orange"
//             />

//             <SmallStat
//               label="Pending Approvals"
//               value={numberFormat(overview?.pendingPromotionApprovals)}
//               icon={<Clock3 className="h-[19px] w-[19px]" />}
//               tone="amber"
//             />

//             <SmallStat
//               label="Approved Promotions"
//               value={numberFormat(overview?.approvedPromotionApprovals)}
//               icon={<CheckCircle2 className="h-[19px] w-[19px]" />}
//               tone="green"
//             />
//           </div>

//           {/* ==================================================
//               SERVICE USAGE
//           ================================================== */}

//           <div className="rounded-[14px] border border-[#D9E1EA] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">

//             <div className="flex flex-col gap-2 border-b border-[#E5EAF0] px-[22px] py-[18px] sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <h2 className="text-[15px] font-bold text-[#1F3C50]">
//                   Service Credit Usage
//                 </h2>
//                 <p className="mt-1 text-[12px] text-[#7E91A8]">
//                   Approved credit consumption by service type.
//                 </p>
//               </div>

//               <span className="w-fit rounded-full bg-[#EAF8F5] px-3 py-1 text-[10px] font-semibold text-[#008C7D]">
//                 Approved Usage
//               </span>
//             </div>

//             <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 xl:grid-cols-4">

//               <ServiceCard
//                 title="Property Boost"
//                 cost="99 Credits"
//                 totalCredits={
//                   boost
//                     .totalCredits
//                 }
//                 count={
//                   boost
//                     .totalRequests
//                 }
//                 properties={
//                   boost
//                     .propertiesCount
//                 }
//                 partners={
//                   boost
//                     .partnersCount
//                 }
//                 icon={
//                   <Zap className="w-5 h-5" />
//                 }
//               />

//               <ServiceCard
//                 title="Featured Property"
//                 cost="199 Credits"
//                 totalCredits={
//                   featured
//                     .totalCredits
//                 }
//                 count={
//                   featured
//                     .totalRequests
//                 }
//                 properties={
//                   featured
//                     .propertiesCount
//                 }
//                 partners={
//                   featured
//                     .partnersCount
//                 }
//                 icon={
//                   <Star className="w-5 h-5" />
//                 }
//               />

//               <ServiceCard
//                 title="Locality Top"
//                 cost="399 Credits"
//                 totalCredits={
//                   locality
//                     .totalCredits
//                 }
//                 count={
//                   locality
//                     .totalRequests
//                 }
//                 properties={
//                   locality
//                     .propertiesCount
//                 }
//                 partners={
//                   locality
//                     .partnersCount
//                 }
//                 icon={
//                   <MapPin className="w-5 h-5" />
//                 }
//               />

//               <ServiceCard
//                 title="Lead Unlock"
//                 cost="149 Credits"
//                 totalCredits={
//                   leadUnlock
//                     .totalCredits
//                 }
//                 count={
//                   leadUnlock
//                     .totalRequests
//                 }
//                 partners={
//                   leadUnlock
//                     .partnersCount
//                 }
//                 icon={
//                   <Unlock className="w-5 h-5" />
//                 }
//               />

//             </div>

//           </div>

//           {/* ==================================================
//               DATA SECTION
//           ================================================== */}

//           <div className="overflow-hidden rounded-[14px] border border-[#D9E1EA] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">

//             {/* HEADER */}

//             <div className="flex flex-col gap-4 border-b border-[#E5EAF0] bg-white px-[22px] pt-[18px] xl:flex-row xl:items-end xl:justify-between">

//               <div className="flex flex-wrap gap-x-7 gap-y-2">

//                 <TabButton
//                   active={
//                     activeTab ===
//                     "partners"
//                   }
//                   onClick={() =>
//                     setActiveTab(
//                       "partners"
//                     )
//                   }
//                   icon={
//                     <Users className="w-4 h-4" />
//                   }
//                 >
//                   Partners
//                 </TabButton>

//                 <TabButton
//                   active={
//                     activeTab ===
//                     "properties"
//                   }
//                   onClick={() =>
//                     setActiveTab(
//                       "properties"
//                     )
//                   }
//                   icon={
//                     <Building2 className="w-4 h-4" />
//                   }
//                 >
//                   Properties
//                 </TabButton>

//                 <TabButton
//                   active={
//                     activeTab ===
//                     "transactions"
//                   }
//                   onClick={() =>
//                     setActiveTab(
//                       "transactions"
//                     )
//                   }
//                   icon={
//                     <Wallet className="w-4 h-4" />
//                   }
//                 >
//                   Transactions
//                 </TabButton>

//               </div>

//               <div className="relative w-full xl:max-w-[540px] xl:flex-1">

//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8CA0BA]" />

//                 <input
//                   type="text"
//                   placeholder={
//                     activeTab ===
//                     "partners"
//                       ? "Search partner..."
//                       : activeTab ===
//                         "properties"
//                       ? "Search property..."
//                       : "Search transaction..."
//                   }
//                   value={
//                     search
//                   }
//                   onChange={(
//                     e
//                   ) =>
//                     setSearch(
//                       e.target
//                         .value
//                     )
//                   }
//                   className="h-[48px] w-full rounded-[9px] border border-[#D8E1EA] bg-white pl-12 pr-4 text-[13px] text-[#294766] outline-none placeholder:text-[#99A7BA] transition focus:border-[#8FA5B9] focus:ring-1 focus:ring-[#8FA5B9]/20"
//                 />

//               </div>

//             </div>

//             {/* ==================================================
//                 PARTNERS TABLE
//             ================================================== */}

//             {activeTab ===
//               "partners" && (
//               <div className="w-full overflow-x-hidden">

//                 <table className="w-full table-fixed border-separate border-spacing-0 [&_th]:overflow-hidden [&_td]:overflow-hidden">

//                   <thead className="bg-[#073A58]">

//                     <tr className="border-y border-[#073A58]">

//                       <TableHeader>
//                         Partner
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Purchased
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Spent
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Refunded
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Balance
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Boost
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Featured
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Locality
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Lead Unlock
//                       </TableHeader>

//                       <TableHeader align="center">
//                         Action
//                       </TableHeader>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredPartners
//                       .length >
//                     0 ? (
//                       filteredPartners.map(
//                         (
//                           partner
//                         ) => (

//                           <tr
//                             key={
//                               partner._id
//                             }
//                             className="transition-colors hover:bg-[#FAFCFD]"
//                           >

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <div className="flex items-center gap-3">

//                                 <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E8F5F2] text-[10px] font-medium text-[#00776C]">
//                                   {partner
//                                     ?.name
//                                     ?.charAt(
//                                       0
//                                     )
//                                     ?.toUpperCase() ||
//                                     "P"}
//                                 </div>

//                                 <div>

//                                   <div className="flex items-center gap-2">

//                                     <p className="text-[11px] font-semibold leading-4 text-[#1F3C50] break-words">
//                                       {
//                                         partner.name
//                                       }
//                                     </p>

//                                     {partner.isVerified && (
//                                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                                     )}

//                                   </div>

//                                   <p className="mt-1 text-[9px] font-medium text-[#008B7D] break-words">
//                                     {
//                                       partner.partnerId
//                                     }
//                                   </p>

//                                   <p className="mt-1 text-[8px] leading-3 text-[#8A9AB0] break-all">
//                                     {
//                                       partner.email
//                                     }
//                                   </p>

//                                 </div>

//                               </div>

//                             </td>

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.totalCreditsPurchased
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.totalSpent
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.totalRefunded
//                               }
//                               className="text-emerald-600"
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.currentBalance
//                               }
//                               className="text-[#274255] font-bold"
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.propertyBoost
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.featured
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.localityTop
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.leadUnlock
//                                   ?.credits
//                               }
//                             />

//                             <td className="px-2.5 py-[16px] text-center align-middle">

//                               <button
//                                 onClick={() =>
//                                   handlePartnerView(
//                                     partner._id
//                                   )
//                                 }
//                                 className="inline-flex h-[34px] max-w-full items-center justify-center gap-1 rounded-[8px] border border-[#D7E0E8] bg-white px-2 text-[9px] font-semibold text-[#35516E] transition hover:border-[#9FB2C3] hover:bg-[#FAFCFD]"
//                               >
//                                 <Eye className="w-3.5 h-3.5" />

//                                 View
//                               </button>

//                             </td>

//                           </tr>

//                         )
//                       )
//                     ) : (
//                       <EmptyRow
//                         columns={
//                           10
//                         }
//                         text="No partners found"
//                       />
//                     )}

//                   </tbody>

//                 </table>

//               </div>
//             )}

//             {/* ==================================================
//                 PROPERTIES TABLE
//             ================================================== */}

//             {activeTab ===
//               "properties" && (
//               <div className="w-full overflow-x-hidden">

//                 <table className="w-full table-fixed border-separate border-spacing-0">

//                   <thead className="bg-[#073A58]">

//                     <tr className="border-y border-[#073A58]">

//                       <TableHeader>
//                         Property
//                       </TableHeader>

//                       <TableHeader>
//                         Partner
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Used
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Pending
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Refunded
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Boost
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Featured
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Locality
//                       </TableHeader>

//                       <TableHeader align="center">
//                         Action
//                       </TableHeader>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredProperties
//                       .length >
//                     0 ? (
//                       filteredProperties.map(
//                         (
//                           item
//                         ) => (

//                           <tr
//                             key={
//                               String(
//                                 item.propertyMongoId
//                               )
//                             }
//                             className="transition-colors hover:bg-[#FAFCFD]"
//                           >

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <p className="text-[11px] font-semibold leading-4 text-[#1F3C50] break-words">
//                                 {
//                                   item.propertyTitle
//                                 }
//                               </p>

//                               <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                                 {
//                                   item.propertyCode
//                                 }
//                               </p>

//                               <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                                 {
//                                   item.locality
//                                 }
//                                 {item.city
//                                   ? `, ${item.city}`
//                                   : ""}
//                               </p>

//                             </td>

//                             <td className="px-2.5 py-[16px] align-middle">

//                               {item
//                                 ?.partners
//                                 ?.length >
//                               0 ? (
//                                 <div className="space-y-2">

//                                   {item.partners.map(
//                                     (
//                                       partner
//                                     ) => (

//                                       <div
//                                         key={
//                                           String(
//                                             partner.partnerMongoId
//                                           )
//                                         }
//                                       >

//                                         <p className="text-sm font-semibold">
//                                           {
//                                             partner.partnerName
//                                           }
//                                         </p>

//                                         <p className="mt-1 text-[8px] leading-3 text-[#8A9AB0] break-all">
//                                           {
//                                             partner.partnerCode
//                                           }
//                                         </p>

//                                       </div>

//                                     )
//                                   )}

//                                 </div>
//                               ) : (
//                                 <span className="text-[#8294AE]">
//                                   -
//                                 </span>
//                               )}

//                             </td>

//                             <NumberCell
//                               value={
//                                 item.totalCreditsUsed
//                               }
//                               className="font-bold"
//                             />

//                             <NumberCell
//                               value={
//                                 item.totalCreditsReserved
//                               }
//                               className="text-amber-600"
//                             />

//                             <NumberCell
//                               value={
//                                 item.totalCreditsRefunded
//                               }
//                               className="text-emerald-600"
//                             />

//                             <NumberCell
//                               value={
//                                 item
//                                   ?.services
//                                   ?.propertyBoost
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 item
//                                   ?.services
//                                   ?.featured
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 item
//                                   ?.services
//                                   ?.localityTop
//                                   ?.credits
//                               }
//                             />

//                             <td className="px-2.5 py-[16px] text-center align-middle">

//                               <button
//                                 onClick={() =>
//                                   handlePropertyView(
//                                     item.propertyMongoId
//                                   )
//                                 }
//                                 className="inline-flex h-[34px] max-w-full items-center justify-center gap-1 rounded-[8px] border border-[#D7E0E8] bg-white px-2 text-[9px] font-semibold text-[#35516E] transition hover:border-[#9FB2C3] hover:bg-[#FAFCFD]"
//                               >
//                                 <Eye className="w-3.5 h-3.5" />

//                                 View
//                               </button>

//                             </td>

//                           </tr>

//                         )
//                       )
//                     ) : (
//                       <EmptyRow
//                         columns={
//                           9
//                         }
//                         text="No properties found"
//                       />
//                     )}

//                   </tbody>

//                 </table>

//               </div>
//             )}

//             {/* ==================================================
//                 TRANSACTIONS TABLE
//             ================================================== */}

//             {activeTab ===
//               "transactions" && (
//               <div className="w-full overflow-x-hidden">

//                 <table className="w-full table-fixed border-separate border-spacing-0">

//                   <thead className="bg-[#073A58]">

//                     <tr className="border-y border-[#073A58]">

//                       <TableHeader>
//                         Transaction
//                       </TableHeader>

//                       <TableHeader>
//                         Partner
//                       </TableHeader>

//                       <TableHeader>
//                         Type
//                       </TableHeader>

//                       <TableHeader>
//                         Service
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Amount
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Credits
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Before
//                       </TableHeader>

//                       <TableHeader align="right">
//                         After
//                       </TableHeader>

//                       <TableHeader align="center">
//                         Status
//                       </TableHeader>

//                       <TableHeader>
//                         Date
//                       </TableHeader>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredTransactions
//                       .length >
//                     0 ? (
//                       filteredTransactions.map(
//                         (
//                           item
//                         ) => (

//                           <tr
//                             key={
//                               item._id
//                             }
//                             className="transition-colors hover:bg-[#FAFCFD]"
//                           >

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <p className="break-all font-mono text-[9px] font-medium leading-4 text-[#294766]">
//                                 {
//                                   item.transactionId
//                                 }
//                               </p>

//                             </td>

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <p className="text-[10px] font-semibold leading-4 text-[#1F3C50] break-words">
//                                 {
//                                   item.partnerName
//                                 }
//                               </p>

//                               <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                                 {
//                                   item.partnerCode
//                                 }
//                               </p>

//                             </td>

//                             <td className="px-2.5 py-[16px] text-[10px] leading-4 text-[#294564] break-words">
//                               {
//                                 item.type
//                               }
//                             </td>

//                             <td className="px-2.5 py-[16px] text-[10px] leading-4 text-[#617A97] break-words">
//                               {item.productCode ||
//                                 "-"}
//                             </td>

//                             <td className="px-2.5 py-[16px] text-right text-[10px] font-semibold text-[#1F3C50] break-words">

//                               {item.amountInRupees
//                                 ? currencyFormat(
//                                     item.amountInRupees
//                                   )
//                                 : "-"}

//                             </td>

//                             <td className="px-2.5 py-[16px] text-right align-middle">

//                               <span
//                                 className={`font-bold ${
//                                   item.direction ===
//                                   "CREDIT"
//                                     ? "text-emerald-600"
//                                     : "text-rose-600"
//                                 }`}
//                               >
//                                 {item.direction ===
//                                 "CREDIT"
//                                   ? "+"
//                                   : "-"}

//                                 {numberFormat(
//                                   item.credits
//                                 )}
//                               </span>

//                             </td>

//                             <NumberCell
//                               value={
//                                 item.balanceBefore
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 item.balanceAfter
//                               }
//                               className="font-bold"
//                             />

//                             <td className="px-2.5 py-[16px] text-center align-middle">

//                               <StatusBadge
//                                 status={
//                                   item.status
//                                 }
//                               />

//                             </td>

//                             <td className="px-2.5 py-[16px] text-[9px] leading-4 text-[#7086A2] break-words">
//                               {dateFormat(
//                                 item.createdAt
//                               )}
//                             </td>

//                           </tr>

//                         )
//                       )
//                     ) : (
//                       <EmptyRow
//                         columns={
//                           10
//                         }
//                         text="No transactions found"
//                       />
//                     )}

//                   </tbody>

//                 </table>

//               </div>
//             )}

//           </div>

//         </div>

//         {/* ==================================================
//             DETAIL LOADING OVERLAY
//         ================================================== */}

//         {detailLoading && (
//           <div className="fixed inset-0 bg-black/20 z-[80] flex items-center justify-center">

//             <div className="bg-white p-6 rounded-[18px] shadow-xl border border-[#D9E3EE]">

//               <Loader2 className="w-7 h-7 animate-spin text-[#00766C]" />

//             </div>

//           </div>
//         )}

//         {/* ==================================================
//             PARTNER DRAWER
//         ================================================== */}

//         {selectedPartner && (
//           <PartnerDetailDrawer
//             data={
//               selectedPartner
//             }
//             onClose={() =>
//               setSelectedPartner(
//                 null
//               )
//             }
//             numberFormat={
//               numberFormat
//             }
//             dateFormat={
//               dateFormat
//             }
//           />
//         )}

//         {/* ==================================================
//             PROPERTY DRAWER
//         ================================================== */}

//         {selectedProperty && (
//           <PropertyDetailDrawer
//             data={
//               selectedProperty
//             }
//             onClose={() =>
//               setSelectedProperty(
//                 null
//               )
//             }
//             numberFormat={
//               numberFormat
//             }
//             dateFormat={
//               dateFormat
//             }
//           />
//         )}

//       </div>
//     );
//   };

// export default WalletOperationsDashboard;

// // ======================================================
// // STAT CARD
// // Same compact visual format as secondary cards
// // ======================================================

// const StatCard = ({
//   title,
//   value,
//   subtitle,
//   icon,
// }) => {
//   const toneMap = {
//     "Total Credits Sold": "bg-[#EAF4FD] text-[#3E8ED0]",
//     "Credits In Wallets": "bg-[#EAF8F5] text-[#00A78E]",
//     "Credits Used": "bg-[#FFF4E6] text-[#ED9918]",
//     "Credits Refunded": "bg-[#FFF0F1] text-[#EF6468]",
//   };

//   return (
//     <div className="min-h-[118px] rounded-[13px] border border-[#D9E1EA] bg-white px-[20px] py-[18px] shadow-[0_2px_5px_rgba(20,50,80,0.03)]">
//       <div className="flex items-start justify-between gap-4">
//         <div className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[9px] ${toneMap[title] || toneMap["Total Credits Sold"]}`}>
//           {icon}
//         </div>

//         {subtitle && (
//           <span className="max-w-[145px] truncate text-right text-[10px] font-medium text-[#8B99AD]">
//             {subtitle}
//           </span>
//         )}
//       </div>

//       <p className="mt-[16px] text-[10px] font-medium uppercase tracking-[0.3px] text-[#8B99AD]">
//         {title}
//       </p>

//       <p className="mt-[7px] text-[23px] font-semibold leading-none text-[#1F3C50]">
//         {value}
//       </p>
//     </div>
//   );
// };

// // ======================================================
// // SMALL STAT
// // ======================================================

// const SmallStat = ({
//   label,
//   value,
//   icon,
//   tone = "blue",
// }) => {
//   const toneMap = {
//     blue: "bg-[#EAF4FD] text-[#3E8ED0]",
//     orange: "bg-[#FFF4E6] text-[#ED9918]",
//     amber: "bg-[#FFF7E8] text-[#D98A08]",
//     green: "bg-[#EAF8F5] text-[#00A78E]",
//   };

//   return (
//     <div className="min-h-[118px] rounded-[13px] border border-[#D9E1EA] bg-white px-[20px] py-[18px] shadow-[0_2px_5px_rgba(20,50,80,0.03)]">
//       <div className={`flex h-[40px] w-[40px] items-center justify-center rounded-[9px] ${toneMap[tone]}`}>
//         {icon}
//       </div>

//       <p className="mt-[16px] text-[10px] font-medium uppercase tracking-[0.3px] text-[#8B99AD]">
//         {label}
//       </p>

//       <p className="mt-[7px] text-[23px] font-semibold leading-none text-[#1F3C50]">
//         {value}
//       </p>
//     </div>
//   );
// };

// // ======================================================
// // SERVICE CARD
// // ======================================================

// const ServiceCard = ({
//   title,
//   cost,
//   totalCredits,
//   count,
//   properties,
//   partners,
//   icon,
// }) => {
//   const toneMap = {
//     "Property Boost": "bg-[#EAF8F5] text-[#009B88]",
//     "Featured Property": "bg-[#FFF4E6] text-[#EA9618]",
//     "Locality Top": "bg-[#EAF4FD] text-[#438DD0]",
//     "Lead Unlock": "bg-[#F3EDFB] text-[#8157B6]",
//   };

//   return (
//     <div className="border-b border-[#E8EDF2] px-[22px] py-[20px] transition hover:bg-[#FAFCFD] sm:border-r xl:border-b-0 last:border-r-0">
//       <div className="flex items-start justify-between gap-3">
//         <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-[9px] ${toneMap[title] || toneMap["Property Boost"]}`}>
//           {icon}
//         </div>

//         <span className="rounded-full bg-[#F4F7F9] px-2.5 py-1 text-[9px] font-semibold text-[#657A94]">
//           {cost}
//         </span>
//       </div>

//       <p className="mt-[18px] text-[11px] font-medium uppercase tracking-[0.25px] text-[#8192A8]">
//         {title}
//       </p>

//       <div className="mt-[10px] flex items-baseline gap-1.5">
//         <span className="text-[25px] font-semibold leading-none text-[#1F3C50]">
//           {Number(totalCredits || 0).toLocaleString("en-IN")}
//         </span>
//         <span className="text-[10px] text-[#8A9AAF]">credits</span>
//       </div>

//       <div className="mt-[17px] flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#7E90A6]">
//         <span><b className="font-semibold text-[#294766]">{count || 0}</b> uses</span>
//         {properties !== undefined && (
//           <span><b className="font-semibold text-[#294766]">{properties || 0}</b> properties</span>
//         )}
//         {partners !== undefined && (
//           <span><b className="font-semibold text-[#294766]">{partners || 0}</b> partners</span>
//         )}
//       </div>
//     </div>
//   );
// };

// // ======================================================
// // TAB BUTTON
// // ======================================================

// const TabButton = ({
//   active,
//   onClick,
//   icon,
//   children,
// }) => (
//   <button
//     onClick={onClick}
//     className={`relative inline-flex items-center gap-2 whitespace-nowrap pb-[16px] text-[12px] font-semibold transition ${
//       active
//         ? "text-[#00776C]"
//         : "text-[#8B98AC] hover:text-[#546A84]"
//     }`}
//   >
//     {icon}
//     {children}

//     {active && (
//       <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#00776C]" />
//     )}
//   </button>
// );

// // ======================================================
// // TABLE HEADER
// // ======================================================

// const TableHeader = ({
//   children,
//   align = "left",
// }) => (
//   <th
//     className={`border-y border-[#E7ECF1] bg-[#FAFBFC] px-2.5 py-[13px] text-[8px] font-medium uppercase tracking-[0.45px] text-[#8998AD] ${
//       align === "right"
//         ? "text-right"
//         : align === "center"
//         ? "text-center"
//         : "text-left"
//     }`}
//   >
//     <span className="block break-words leading-4">
//       {children}
//     </span>
//   </th>
// );

// // ======================================================
// // NUMBER CELL
// // ======================================================

// const NumberCell = ({
//   value,
//   className = "",
// }) => (
//   <td
//     className={`px-2.5 py-[16px] text-right text-[11px] font-medium text-[#344F6B] break-words ${className}`}
//   >
//     {Number(value || 0).toLocaleString("en-IN")}
//   </td>
// );

// // ======================================================
// // EMPTY ROW
// // ======================================================

// const EmptyRow = ({
//   columns,
//   text,
// }) => (
//   <tr>
//     <td colSpan={columns} className="py-14 text-center text-[13px] text-[#8294AE]">
//       {text}
//     </td>
//   </tr>
// );

// // ======================================================
// // STATUS BADGE
// // ======================================================

// const StatusBadge = ({ status }) => {
//   const styles = {
//     SUCCESS: "bg-[#EAF8F3] text-[#08775E] border-[#CFEDE3]",
//     PENDING: "bg-[#FFF8E9] text-[#D58100] border-[#F6D77F]",
//     FAILED: "bg-[#FFF0F1] text-[#C94A55] border-[#F3CED2]",
//     REFUNDED: "bg-[#EEF5FC] text-[#4E78A2] border-[#D8E6F4]",
//     REVERSED: "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]",
//     Approved: "bg-[#EAF8F3] text-[#08775E] border-[#CFEDE3]",
//     Pending: "bg-[#FFF8E9] text-[#D58100] border-[#F6D77F]",
//     Rejected: "bg-[#FFF0F1] text-[#C94A55] border-[#F3CED2]",
//     Expired: "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]",
//   };

//   return (
//     <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold ${styles[status] || "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]"}`}>
//       {status || "-"}
//     </span>
//   );
// };

// // ======================================================
// // MINI CARD
// // ======================================================

// const MiniCard = ({ label, value }) => (
//   <div className="bg-[#F8FAFC] border border-[#DDE6EF] rounded-[16px] p-4">
//     <p className="text-[12px] font-semibold text-[#7B90AB]">{label}</p>
//     <p className="text-[22px] font-extrabold text-[#1F3C50] mt-2">{value}</p>
//   </div>
// );

// // ======================================================
// // PARTNER DETAIL DRAWER
// // ======================================================

// const PartnerDetailDrawer =
//   ({
//     data,
//     onClose,
//     numberFormat,
//     dateFormat,
//   }) => {
//     const partner =
//       data?.partner || {};

//     const wallet =
//       data?.wallet || {};

//     const services =
//       data
//         ?.serviceSummary ||
//       {};

//     const history =
//       Array.isArray(
//         data
//           ?.creditHistory
//       )
//         ? data
//             .creditHistory
//         : [];

//     const properties =
//       Array.isArray(
//         data?.properties
//       )
//         ? data.properties
//         : [];

//     return (
//       <div className="fixed inset-0 z-[70] bg-[#1F3C50]/35 backdrop-blur-[1px] flex justify-end">

//         <div className="w-full sm:max-w-2xl h-full bg-white shadow-2xl overflow-y-auto border-l border-[#D9E3EE]">

//           <div className="sticky top-0 z-10 bg-white border-b border-[#D9E3EE] px-5 py-4 flex items-center justify-between">

//             <div>

//               <h2 className="text-[22px] font-extrabold text-[#1F3C50]">
//                 {partner.name ||
//                   "Partner Details"}
//               </h2>

//               <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                 {partner.partnerId}
//               </p>

//             </div>

//             <button
//               onClick={
//                 onClose
//               }
//               className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[#5F7895] hover:bg-[#F3F6F9]"
//             >
//               <X className="w-5 h-5" />
//             </button>

//           </div>

//           <div className="p-5 space-y-6">

//             {/* WALLET */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Wallet Summary
//               </h3>

//               <div className="grid grid-cols-2 gap-3">

//                 <MiniCard
//                   label="Purchased"
//                   value={`${numberFormat(
//                     wallet.totalPurchased
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Available"
//                   value={`${numberFormat(
//                     wallet.balance
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Spent"
//                   value={`${numberFormat(
//                     wallet.totalSpent
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Refunded"
//                   value={`${numberFormat(
//                     wallet.totalRefunded
//                   )} Cr`}
//                 />

//               </div>

//             </div>

//             {/* SERVICES */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Service Usage
//               </h3>

//               <div className="grid grid-cols-2 gap-3">

//                 <MiniCard
//                   label="Boost"
//                   value={`${numberFormat(
//                     services
//                       ?.propertyBoost
//                       ?.credits
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Featured"
//                   value={`${numberFormat(
//                     services
//                       ?.featured
//                       ?.credits
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Locality Top"
//                   value={`${numberFormat(
//                     services
//                       ?.localityTop
//                       ?.credits
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Lead Unlock"
//                   value={`${numberFormat(
//                     services
//                       ?.leadUnlock
//                       ?.credits
//                   )} Cr`}
//                 />

//               </div>

//             </div>

//             {/* PROPERTY PROMOTIONS */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Property Promotion History
//               </h3>

//               <div className="space-y-3">

//                 {properties.length >
//                 0 ? (
//                   properties.map(
//                     (
//                       item
//                     ) => (

//                       <div
//                         key={
//                           item._id
//                         }
//                         className="border border-[#D9E3EE] rounded-[16px] p-4"
//                       >

//                         <div className="flex items-start justify-between gap-3">

//                           <div>

//                             <p className="font-semibold">
//                               {
//                                 item.propertyTitle
//                               }
//                             </p>

//                             <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                               {
//                                 item.propertyCode
//                               }
//                             </p>

//                           </div>

//                           <StatusBadge
//                             status={
//                               item.status
//                             }
//                           />

//                         </div>

//                         <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

//                           <div>

//                             <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                               Service
//                             </p>

//                             <p className="font-bold mt-1 text-[#1F3C50]">
//                               {
//                                 item.promotionType
//                               }
//                             </p>

//                           </div>

//                           <div className="text-right">

//                             <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                               Credits
//                             </p>

//                             <p className="font-bold mt-1">
//                               {
//                                 item.creditsCharged
//                               }
//                             </p>

//                           </div>

//                         </div>

//                       </div>

//                     )
//                   )
//                 ) : (
//                   <div className="text-sm text-[#8294AE] py-6 text-center border border-dashed rounded-xl">
//                     No property
//                     promotion history
//                   </div>
//                 )}

//               </div>

//             </div>

//             {/* CREDIT HISTORY */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Credit History
//               </h3>

//               <div className="space-y-3">

//                 {history.length >
//                 0 ? (
//                   history.map(
//                     (
//                       item
//                     ) => (

//                       <div
//                         key={
//                           item._id
//                         }
//                         className="border border-[#D9E3EE] rounded-[16px] p-4 flex items-start justify-between gap-4"
//                       >

//                         <div>

//                           <div className="flex items-center gap-2">

//                             <p className="text-[10px] font-semibold leading-4 text-[#1F3C50] break-words">
//                               {
//                                 item.type
//                               }
//                             </p>

//                             <StatusBadge
//                               status={
//                                 item.status
//                               }
//                             />

//                           </div>

//                           <p className="text-[12px] text-[#8294AE] mt-1">
//                             {
//                               item.transactionId
//                             }
//                           </p>

//                           <p className="text-[12px] text-[#8294AE] mt-1">
//                             {dateFormat(
//                               item.createdAt
//                             )}
//                           </p>

//                         </div>

//                         <div className="text-right">

//                           <p
//                             className={`font-extrabold ${
//                               item.direction ===
//                               "CREDIT"
//                                 ? "text-emerald-600"
//                                 : "text-rose-600"
//                             }`}
//                           >
//                             {item.direction ===
//                             "CREDIT"
//                               ? "+"
//                               : "-"}

//                             {numberFormat(
//                               item.credits
//                             )}
//                           </p>

//                           <p className="text-[12px] text-[#8294AE] mt-1">
//                             Balance:{" "}
//                             {numberFormat(
//                               item.balanceAfter
//                             )}
//                           </p>

//                         </div>

//                       </div>

//                     )
//                   )
//                 ) : (
//                   <div className="text-sm text-[#8294AE] text-center border border-dashed rounded-xl py-6">
//                     No credit
//                     transactions
//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     );
//   };

// // ======================================================
// // PROPERTY DETAIL DRAWER
// // ======================================================

// const PropertyDetailDrawer =
//   ({
//     data,
//     onClose,
//     numberFormat,
//     dateFormat,
//   }) => {
//     const property =
//       data?.property || {};

//     const summary =
//       data?.summary || {};

//     const history =
//       Array.isArray(
//         data
//           ?.promotionHistory
//       )
//         ? data
//             .promotionHistory
//         : [];

//     return (
//       <div className="fixed inset-0 z-[70] bg-[#1F3C50]/35 backdrop-blur-[1px] flex justify-end">

//         <div className="w-full sm:max-w-2xl h-full bg-white shadow-2xl overflow-y-auto border-l border-[#D9E3EE]">

//           <div className="sticky top-0 z-10 bg-white border-b border-[#D9E3EE] px-5 py-4 flex justify-between items-center">

//             <div>

//               <h2 className="text-xl font-bold">
//                 {property.title ||
//                   "Property Details"}
//               </h2>

//               <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                 {
//                   property.propertyId
//                 }
//               </p>

//             </div>

//             <button
//               onClick={
//                 onClose
//               }
//               className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[#5F7895] hover:bg-[#F3F6F9]"
//             >
//               <X className="w-5 h-5" />
//             </button>

//           </div>

//           <div className="p-5 space-y-6">

//             {/* SUMMARY */}

//             <div className="grid grid-cols-2 gap-3">

//               <MiniCard
//                 label="Credits Used"
//                 value={
//                   numberFormat(
//                     summary.usedCredits
//                   )
//                 }
//               />

//               <MiniCard
//                 label="Pending Credits"
//                 value={
//                   numberFormat(
//                     summary.pendingCredits
//                   )
//                 }
//               />

//               <MiniCard
//                 label="Refunded"
//                 value={
//                   numberFormat(
//                     summary.refundedCredits
//                   )
//                 }
//               />

//               <MiniCard
//                 label="Total Requests"
//                 value={
//                   numberFormat(
//                     summary.totalRequests
//                   )
//                 }
//               />

//             </div>

//             {/* PROPERTY INFO */}

//             <div className="border border-[#D9E3EE] rounded-[16px] p-4">

//               <h3 className="font-bold mb-3">
//                 Property Information
//               </h3>

//               <div className="grid grid-cols-2 gap-4 text-sm">

//                 <InfoItem
//                   label="Status"
//                   value={
//                     property.status
//                   }
//                 />

//                 <InfoItem
//                   label="Verification"
//                   value={
//                     property.propertyVerificationStatus
//                   }
//                 />

//                 <InfoItem
//                   label="City"
//                   value={
//                     property.city
//                   }
//                 />

//                 <InfoItem
//                   label="Locality"
//                   value={
//                     property.locality
//                   }
//                 />

//               </div>

//             </div>

//             {/* PROMOTION HISTORY */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Promotion History
//               </h3>

//               <div className="space-y-3">

//                 {history.length >
//                 0 ? (
//                   history.map(
//                     (
//                       item
//                     ) => (

//                       <div
//                         key={
//                           item._id
//                         }
//                         className="border border-[#D9E3EE] rounded-[16px] p-4"
//                       >

//                         <div className="flex justify-between gap-3">

//                           <div>

//                             <p className="font-semibold">
//                               {
//                                 item.promotionType
//                               }
//                             </p>

//                             <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                               {
//                                 item.partnerName
//                               }{" "}
//                               •{" "}
//                               {
//                                 item.partnerCode
//                               }
//                             </p>

//                           </div>

//                           <StatusBadge
//                             status={
//                               item.status
//                             }
//                           />

//                         </div>

//                         <div className="mt-4 flex items-center justify-between">

//                           <span className="text-sm text-[#7086A2]">
//                             Credits Charged
//                           </span>

//                           <span className="font-extrabold">
//                             {
//                               item.creditsCharged
//                             }
//                           </span>

//                         </div>

//                         <p className="text-[12px] text-[#8294AE] mt-3">
//                           Requested:{" "}
//                           {dateFormat(
//                             item.requestedAt
//                           )}
//                         </p>

//                         {item.approvedAt && (
//                           <p className="text-xs text-emerald-500 mt-1">
//                             Approved:{" "}
//                             {dateFormat(
//                               item.approvedAt
//                             )}
//                           </p>
//                         )}

//                         {item.rejectedAt && (
//                           <p className="text-xs text-rose-500 mt-1">
//                             Rejected:{" "}
//                             {dateFormat(
//                               item.rejectedAt
//                             )}
//                           </p>
//                         )}

//                       </div>

//                     )
//                   )
//                 ) : (
//                   <div className="text-center py-6 border border-dashed rounded-xl text-sm text-[#8294AE]">
//                     No promotion
//                     history
//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     );
//   };

// // ======================================================
// // INFO ITEM
// // ======================================================

// const InfoItem = ({
//   label,
//   value,
// }) => (
//   <div>

//     <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//       {label}
//     </p>

//     <p className="font-bold mt-1 text-[#1F3C50]">
//       {value || "-"}
//     </p>

//   </div>
// );

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Wallet,
  RefreshCcw,
  TrendingUp,
  Building2,
  Users,
  Eye,
  X,
  BadgeIndianRupee,
  Zap,
  Star,
  MapPin,
  Unlock,
  Loader2,
  IndianRupee,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getCreditDashboardApi,
  getPartnerCreditOverviewApi,
  getPartnerCreditDetailsApi,
  getPropertyCreditOverviewApi,
  getPropertyCreditDetailsApi,
  getCreditHistoryApi,
} from "../../../Services/creditService";

const WalletOperationsDashboard =
  () => {
    const [
      activeTab,
      setActiveTab,
    ] = useState(
      "partners"
    );

    const [
      dashboard,
      setDashboard,
    ] = useState({});

    const [
      partners,
      setPartners,
    ] = useState([]);

    const [
      properties,
      setProperties,
    ] = useState([]);

    const [
      transactions,
      setTransactions,
    ] = useState([]);

    const [
      search,
      setSearch,
    ] = useState("");

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      detailLoading,
      setDetailLoading,
    ] = useState(false);

    const [
      error,
      setError,
    ] = useState("");

    const [
      selectedPartner,
      setSelectedPartner,
    ] = useState(null);

    const [
      selectedProperty,
      setSelectedProperty,
    ] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // ======================================================
    // LOAD ALL DATA
    // ======================================================

    const loadData =
      async () => {
        try {
          setLoading(true);

          setError("");

          const [
            dashboardResponse,
            partnerResponse,
            propertyResponse,
            historyResponse,
          ] =
            await Promise.all([
              getCreditDashboardApi(),

              getPartnerCreditOverviewApi(),

              getPropertyCreditOverviewApi(),

              getCreditHistoryApi({
                page: 1,
                limit: 100,
              }),
            ]);

          setDashboard(
            dashboardResponse
              ?.data || {}
          );

          setPartners(
            Array.isArray(
              partnerResponse
                ?.data
            )
              ? partnerResponse
                  .data
              : []
          );

          setProperties(
            Array.isArray(
              propertyResponse
                ?.data
            )
              ? propertyResponse
                  .data
              : []
          );

          setTransactions(
            Array.isArray(
              historyResponse
                ?.data
            )
              ? historyResponse
                  .data
              : []
          );
        } catch (
          apiError
        ) {
          console.error(
            "Wallet load error:",
            apiError
          );

          setError(
            apiError
              ?.response
              ?.data
              ?.message ||
              "Unable to load wallet data."
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    useEffect(() => {
      loadData();
    }, []);

    // ======================================================
    // FORMATTERS
    // ======================================================

    const numberFormat =
      (value) =>
        Number(
          value || 0
        ).toLocaleString(
          "en-IN"
        );

    const currencyFormat =
      (value) =>
        new Intl.NumberFormat(
          "en-IN",
          {
            style:
              "currency",

            currency:
              "INR",

            maximumFractionDigits: 0,
          }
        ).format(
          Number(
            value || 0
          )
        );

    const dateFormat =
      (date) => {
        if (!date) {
          return "-";
        }

        return new Date(
          date
        ).toLocaleString(
          "en-IN",
          {
            day: "2-digit",

            month:
              "short",

            year:
              "numeric",

            hour:
              "2-digit",

            minute:
              "2-digit",
          }
        );
      };

    // ======================================================
    // OVERVIEW
    // ======================================================

    const overview =
      dashboard
        ?.overview || {};

    const serviceUsage =
      Array.isArray(
        dashboard
          ?.serviceUsage
      )
        ? dashboard
            .serviceUsage
        : [];

    const findService =
      (
        serviceCode
      ) =>
        serviceUsage.find(
          (item) =>
            item.code ===
            serviceCode
        ) || {
          totalCredits: 0,
          totalRequests: 0,
          propertiesCount: 0,
          partnersCount: 0,
        };

    const boost =
      findService(
        "PROPERTY_BOOST"
      );

    const featured =
      findService(
        "FEATURED_7_DAYS"
      );

    const locality =
      findService(
        "LOCALITY_TOP_30_DAYS"
      );

    const leadUnlock =
      findService(
        "LEAD_UNLOCK"
      );

    // ======================================================
    // FILTER PARTNERS
    // ======================================================

    const filteredPartners =
      useMemo(() => {
        const value =
          search
            .trim()
            .toLowerCase();

        if (!value) {
          return partners;
        }

        return partners.filter(
          (partner) =>
            partner?.name
              ?.toLowerCase()
              .includes(
                value
              ) ||
            partner?.partnerId
              ?.toLowerCase()
              .includes(
                value
              ) ||
            partner?.email
              ?.toLowerCase()
              .includes(
                value
              ) ||
            partner?.phone
              ?.toLowerCase()
              .includes(
                value
              )
        );
      }, [
        search,
        partners,
      ]);

    // ======================================================
    // FILTER PROPERTIES
    // ======================================================

    const filteredProperties =
      useMemo(() => {
        const value =
          search
            .trim()
            .toLowerCase();

        if (!value) {
          return properties;
        }

        return properties.filter(
          (item) =>
            item
              ?.propertyCode
              ?.toLowerCase()
              .includes(
                value
              ) ||
            item
              ?.propertyTitle
              ?.toLowerCase()
              .includes(
                value
              ) ||
            item?.city
              ?.toLowerCase()
              .includes(
                value
              ) ||
            item
              ?.locality
              ?.toLowerCase()
              .includes(
                value
              ) ||
            item
              ?.partners
              ?.some(
                (
                  partner
                ) =>
                  partner
                    ?.partnerName
                    ?.toLowerCase()
                    .includes(
                      value
                    ) ||
                  partner
                    ?.partnerCode
                    ?.toLowerCase()
                    .includes(
                      value
                    )
              )
        );
      }, [
        search,
        properties,
      ]);

    // ======================================================
    // FILTER TRANSACTIONS
    // ======================================================

    const filteredTransactions =
      useMemo(() => {
        const value =
          search
            .trim()
            .toLowerCase();

        if (!value) {
          return transactions;
        }

        return transactions.filter(
          (
            transaction
          ) =>
            transaction
              ?.transactionId
              ?.toLowerCase()
              .includes(
                value
              ) ||
            transaction
              ?.partnerName
              ?.toLowerCase()
              .includes(
                value
              ) ||
            transaction
              ?.partnerCode
              ?.toLowerCase()
              .includes(
                value
              ) ||
            transaction
              ?.type
              ?.toLowerCase()
              .includes(
                value
              ) ||
            transaction
              ?.productCode
              ?.toLowerCase()
              .includes(
                value
              )
        );
      }, [
        transactions,
        search,
      ]);

    // ======================================================
    // SORT + PAGINATION
    // ======================================================

    const getLatestDate = (item) => {
      const dateValue =
        item?.createdAt ||
        item?.updatedAt ||
        item?.createdDate ||
        item?.date;

      const time = dateValue ? new Date(dateValue).getTime() : 0;
      return Number.isNaN(time) ? 0 : time;
    };

    const sortedPartners = useMemo(
      () => [...filteredPartners].sort((a, b) => getLatestDate(b) - getLatestDate(a)),
      [filteredPartners]
    );

    const sortedProperties = useMemo(
      () => [...filteredProperties].sort((a, b) => getLatestDate(b) - getLatestDate(a)),
      [filteredProperties]
    );

    const sortedTransactions = useMemo(
      () => [...filteredTransactions].sort((a, b) => getLatestDate(b) - getLatestDate(a)),
      [filteredTransactions]
    );

    const activeData =
      activeTab === "partners"
        ? sortedPartners
        : activeTab === "properties"
        ? sortedProperties
        : sortedTransactions;

    const totalPages = Math.max(
      1,
      Math.ceil(activeData.length / ITEMS_PER_PAGE)
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    const paginatedPartners = sortedPartners.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    const paginatedProperties = sortedProperties.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    const paginatedTransactions = sortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    const startItem = activeData.length === 0 ? 0 : startIndex + 1;
    const endItem = Math.min(startIndex + ITEMS_PER_PAGE, activeData.length);

    const handlePageChange = (page) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    };

    useEffect(() => {
      setCurrentPage(1);
    }, [activeTab, search]);

    useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);

    // ======================================================
    // VIEW PARTNER
    // ======================================================

    const handlePartnerView =
      async (
        partnerMongoId
      ) => {
        try {
          setDetailLoading(
            true
          );

          const response =
            await getPartnerCreditDetailsApi(
              partnerMongoId
            );

          setSelectedPartner(
            response?.data ||
              null
          );
        } catch (
          apiError
        ) {
          console.error(
            "Partner View Error:",
            apiError
          );
        } finally {
          setDetailLoading(
            false
          );
        }
      };

    // ======================================================
    // VIEW PROPERTY
    // ======================================================

    const handlePropertyView =
      async (
        propertyMongoId
      ) => {
        try {
          setDetailLoading(
            true
          );

          const response =
            await getPropertyCreditDetailsApi(
              propertyMongoId
            );

          setSelectedProperty(
            response?.data ||
              null
          );
        } catch (
          apiError
        ) {
          console.error(
            "Property View Error:",
            apiError
          );
        } finally {
          setDetailLoading(
            false
          );
        }
      };

    // ======================================================
    // MAIN LOADER
    // ======================================================

    if (loading) {
      return (
        <div className="min-h-[600px] flex flex-col items-center justify-center gap-3">

          <Loader2 className="w-8 h-8 animate-spin text-[#00766C]" />

          <p className="text-sm text-[#7086A2]">
            Loading wallet
            operations...
          </p>

        </div>
      );
    }

    return (
      <div className="min-h-screen w-full overflow-x-hidden px-1 py-1 md:px-[1px] md:py-1 text-[#1F3C50]">

        <div className="mx-auto max-w-[1700px] space-y-1">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
                Wallet & Credit Management
              </h1>

              <p className="mt-1 text-[12px] text-[#62738B]">
                Manage partner credits, purchases, refunds, service usage and property promotion activity.
              </p>
            </div>

            <button
              onClick={loadData}
              className="inline-flex h-[52px] w-fit items-center justify-center gap-2 rounded-[11px] border border-[#D7E0E9] bg-white px-5 text-[13px] font-semibold text-[#294766] shadow-[0_2px_5px_rgba(20,50,80,0.04)] transition hover:border-[#00776C] hover:text-[#00776C]"
            >
              <RefreshCcw className="h-[17px] w-[17px]" />
              Refresh
            </button>
          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          {/* ==================================================
              MAIN STATS
          ================================================== */}

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Credits Sold"
              value={`${numberFormat(
                overview
                  .totalCreditsSold
              )} Credits`}
              subtitle={
                currencyFormat(
                  overview
                    .totalCreditSalesAmount
                )
              }
              icon={
                <BadgeIndianRupee className="h-[19px] w-[19px]" />
              }
            />

            <StatCard
              title="Credits In Wallets"
              value={`${numberFormat(
                overview
                  .creditsCurrentlyWithPartners
              )} Credits`}
              subtitle={`${numberFormat(
                overview
                  .partnersWithCredits
              )} partners with balance`}
              icon={
                <Wallet className="h-[19px] w-[19px]" />
              }
            />

            <StatCard
              title="Credits Used"
              value={`${numberFormat(
                overview
                  .totalCreditsSpent
              )} Credits`}
              subtitle="Across all services"
              icon={
                <TrendingUp className="h-[19px] w-[19px]" />
              }
            />

            <StatCard
              title="Credits Refunded"
              value={`${numberFormat(
                overview
                  .totalRefundCredits
              )} Credits`}
              subtitle={`${numberFormat(
                overview
                  .totalRefundTransactions
              )} refund transactions`}
              icon={
                <RotateCcw className="h-[19px] w-[19px]" />
              }
            />

          </div>

          {/* ==================================================
              SECONDARY STATS
          ================================================== */}

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
            <SmallStat
              label="Total Partners"
              value={numberFormat(overview?.totalPartners)}
              icon={<Users className="h-[19px] w-[19px]" />}
              tone="blue"
            />

            <SmallStat
              label="Purchase Transactions"
              value={numberFormat(overview?.totalPurchaseTransactions)}
              icon={<IndianRupee className="h-[19px] w-[19px]" />}
              tone="orange"
            />

            <SmallStat
              label="Pending Approvals"
              value={numberFormat(overview?.pendingPromotionApprovals)}
              icon={<Clock3 className="h-[19px] w-[19px]" />}
              tone="amber"
            />

            <SmallStat
              label="Approved Promotions"
              value={numberFormat(overview?.approvedPromotionApprovals)}
              icon={<CheckCircle2 className="h-[19px] w-[19px]" />}
              tone="green"
            />
          </div>

          {/* ==================================================
              SERVICE USAGE
          ================================================== */}

          <div className="rounded-[14px] border border-[#D9E1EA] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">

            <div className="flex flex-col gap-2 border-b border-[#E5EAF0] px-[22px] py-[18px] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-[#1F3C50]">
                  Service Credit Usage
                </h2>
                <p className="mt-1 text-[12px] text-[#7E91A8]">
                  Approved credit consumption by service type.
                </p>
              </div>

              <span className="w-fit rounded-full bg-[#EAF8F5] px-3 py-1 text-[10px] font-semibold text-[#008C7D]">
                Approved Usage
              </span>
            </div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 xl:grid-cols-4">

              <ServiceCard
                title="Property Boost"
                cost="99 Credits"
                totalCredits={
                  boost
                    .totalCredits
                }
                count={
                  boost
                    .totalRequests
                }
                properties={
                  boost
                    .propertiesCount
                }
                partners={
                  boost
                    .partnersCount
                }
                icon={
                  <Zap className="w-5 h-5" />
                }
              />

              <ServiceCard
                title="Featured Property"
                cost="199 Credits"
                totalCredits={
                  featured
                    .totalCredits
                }
                count={
                  featured
                    .totalRequests
                }
                properties={
                  featured
                    .propertiesCount
                }
                partners={
                  featured
                    .partnersCount
                }
                icon={
                  <Star className="w-5 h-5" />
                }
              />

              <ServiceCard
                title="Locality Top"
                cost="399 Credits"
                totalCredits={
                  locality
                    .totalCredits
                }
                count={
                  locality
                    .totalRequests
                }
                properties={
                  locality
                    .propertiesCount
                }
                partners={
                  locality
                    .partnersCount
                }
                icon={
                  <MapPin className="w-5 h-5" />
                }
              />

              <ServiceCard
                title="Lead Unlock"
                cost="149 Credits"
                totalCredits={
                  leadUnlock
                    .totalCredits
                }
                count={
                  leadUnlock
                    .totalRequests
                }
                partners={
                  leadUnlock
                    .partnersCount
                }
                icon={
                  <Unlock className="w-5 h-5" />
                }
              />

            </div>

          </div>

          {/* ==================================================
              DATA SECTION
          ================================================== */}

          <div className="overflow-hidden rounded-[14px] border border-[#D9E1EA] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">

            {/* HEADER */}

            <div className="flex flex-col gap-4 border-b border-[#E5EAF0] bg-white px-[22px] pt-[18px] xl:flex-row xl:items-end xl:justify-between">

              <div className="flex flex-wrap gap-x-7 gap-y-2">

                <TabButton
                  active={
                    activeTab ===
                    "partners"
                  }
                  onClick={() => {
                    setActiveTab("partners");
                    setCurrentPage(1);
                  }}
                  icon={
                    <Users className="w-4 h-4" />
                  }
                >
                  Partners
                </TabButton>

                <TabButton
                  active={
                    activeTab ===
                    "properties"
                  }
                  onClick={() => {
                    setActiveTab("properties");
                    setCurrentPage(1);
                  }}
                  icon={
                    <Building2 className="w-4 h-4" />
                  }
                >
                  Properties
                </TabButton>

                <TabButton
                  active={
                    activeTab ===
                    "transactions"
                  }
                  onClick={() => {
                    setActiveTab("transactions");
                    setCurrentPage(1);
                  }}
                  icon={
                    <Wallet className="w-4 h-4" />
                  }
                >
                  Transactions
                </TabButton>

              </div>

              <div className="relative w-full xl:max-w-[540px] xl:flex-1">

                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8CA0BA]" />

                <input
                  type="text"
                  placeholder={
                    activeTab ===
                    "partners"
                      ? "Search partner..."
                      : activeTab ===
                        "properties"
                      ? "Search property..."
                      : "Search transaction..."
                  }
                  value={
                    search
                  }
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-[48px] w-full rounded-[9px] border border-[#D8E1EA] bg-white pl-12 pr-4 text-[13px] text-[#294766] outline-none placeholder:text-[#99A7BA] transition focus:border-[#8FA5B9] focus:ring-1 focus:ring-[#8FA5B9]/20"
                />

              </div>

            </div>

            {/* ==================================================
                PARTNERS TABLE
            ================================================== */}

            {activeTab ===
              "partners" && (
              <div className="w-full overflow-x-hidden">

                <table className="w-full table-fixed border-separate border-spacing-0 [&_th]:overflow-hidden [&_td]:overflow-hidden">

                  <thead className="bg-[#073A58]">

                    <tr className="border-y border-[#073A58]">

                      <TableHeader>
                        Partner
                      </TableHeader>

                      <TableHeader align="right">
                        Purchased
                      </TableHeader>

                      <TableHeader align="right">
                        Spent
                      </TableHeader>

                      <TableHeader align="right">
                        Refunded
                      </TableHeader>

                      <TableHeader align="right">
                        Balance
                      </TableHeader>

                      <TableHeader align="right">
                        Boost
                      </TableHeader>

                      <TableHeader align="right">
                        Featured
                      </TableHeader>

                      <TableHeader align="right">
                        Locality
                      </TableHeader>

                      <TableHeader align="right">
                        Lead Unlock
                      </TableHeader>

                      <TableHeader align="center">
                        Action
                      </TableHeader>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredPartners
                      .length >
                    0 ? (
                      paginatedPartners.map(
                        (
                          partner
                        ) => (

                          <tr
                            key={
                              partner._id
                            }
                            className="transition-colors hover:bg-[#FAFCFD]"
                          >

                            <td className="px-2.5 py-[16px] align-middle">

                              <div className="flex items-center gap-3">

                                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E8F5F2] text-[10px] font-medium text-[#00776C]">
                                  {partner
                                    ?.name
                                    ?.charAt(
                                      0
                                    )
                                    ?.toUpperCase() ||
                                    "P"}
                                </div>

                                <div>

                                  <div className="flex items-center gap-2">

                                    <p className="text-[11px] font-semibold leading-4 text-[#1F3C50] break-words">
                                      {
                                        partner.name
                                      }
                                    </p>

                                    {partner.isVerified && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    )}

                                  </div>

                                  <p className="mt-1 text-[9px] font-medium text-[#008B7D] break-words">
                                    {
                                      partner.partnerId
                                    }
                                  </p>

                                  <p className="mt-1 text-[8px] leading-3 text-[#8A9AB0] break-all">
                                    {
                                      partner.email
                                    }
                                  </p>

                                </div>

                              </div>

                            </td>

                            <NumberCell
                              value={
                                partner
                                  ?.wallet
                                  ?.totalCreditsPurchased
                              }
                            />

                            <NumberCell
                              value={
                                partner
                                  ?.wallet
                                  ?.totalSpent
                              }
                            />

                            <NumberCell
                              value={
                                partner
                                  ?.wallet
                                  ?.totalRefunded
                              }
                              className="text-emerald-600"
                            />

                            <NumberCell
                              value={
                                partner
                                  ?.wallet
                                  ?.currentBalance
                              }
                              className="text-[#274255] font-bold"
                            />

                            <NumberCell
                              value={
                                partner
                                  ?.services
                                  ?.propertyBoost
                                  ?.credits
                              }
                            />

                            <NumberCell
                              value={
                                partner
                                  ?.services
                                  ?.featured
                                  ?.credits
                              }
                            />

                            <NumberCell
                              value={
                                partner
                                  ?.services
                                  ?.localityTop
                                  ?.credits
                              }
                            />

                            <NumberCell
                              value={
                                partner
                                  ?.services
                                  ?.leadUnlock
                                  ?.credits
                              }
                            />

                            <td className="px-2.5 py-[16px] text-center align-middle">

                              <button
                                onClick={() =>
                                  handlePartnerView(
                                    partner._id
                                  )
                                }
                                className="inline-flex h-[34px] max-w-full items-center justify-center gap-1 rounded-[8px] border border-[#D7E0E8] bg-white px-2 text-[9px] font-semibold text-[#35516E] transition hover:border-[#9FB2C3] hover:bg-[#FAFCFD]"
                              >
                                <Eye className="w-3.5 h-3.5" />

                                View
                              </button>

                            </td>

                          </tr>

                        )
                      )
                    ) : (
                      <EmptyRow
                        columns={
                          10
                        }
                        text="No partners found"
                      />
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {/* ==================================================
                PROPERTIES TABLE
            ================================================== */}

            {activeTab ===
              "properties" && (
              <div className="w-full overflow-x-hidden">

                <table className="w-full table-fixed border-separate border-spacing-0">

                  <thead className="bg-[#073A58]">

                    <tr className="border-y border-[#073A58]">

                      <TableHeader>
                        Property
                      </TableHeader>

                      <TableHeader>
                        Partner
                      </TableHeader>

                      <TableHeader align="right">
                        Used
                      </TableHeader>

                      <TableHeader align="right">
                        Pending
                      </TableHeader>

                      <TableHeader align="right">
                        Refunded
                      </TableHeader>

                      <TableHeader align="right">
                        Boost
                      </TableHeader>

                      <TableHeader align="right">
                        Featured
                      </TableHeader>

                      <TableHeader align="right">
                        Locality
                      </TableHeader>

                      <TableHeader align="center">
                        Action
                      </TableHeader>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredProperties
                      .length >
                    0 ? (
                      paginatedProperties.map(
                        (
                          item
                        ) => (

                          <tr
                            key={
                              String(
                                item.propertyMongoId
                              )
                            }
                            className="transition-colors hover:bg-[#FAFCFD]"
                          >

                            <td className="px-2.5 py-[16px] align-middle">

                              <p className="text-[11px] font-semibold leading-4 text-[#1F3C50] break-words">
                                {
                                  item.propertyTitle
                                }
                              </p>

                              <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
                                {
                                  item.propertyCode
                                }
                              </p>

                              <p className="text-[9px] leading-4 text-[#8294AE] break-words">
                                {
                                  item.locality
                                }
                                {item.city
                                  ? `, ${item.city}`
                                  : ""}
                              </p>

                            </td>

                            <td className="px-2.5 py-[16px] align-middle">

                              {item
                                ?.partners
                                ?.length >
                              0 ? (
                                <div className="space-y-2">

                                  {item.partners.map(
                                    (
                                      partner
                                    ) => (

                                      <div
                                        key={
                                          String(
                                            partner.partnerMongoId
                                          )
                                        }
                                      >

                                        <p className="text-sm font-semibold">
                                          {
                                            partner.partnerName
                                          }
                                        </p>

                                        <p className="mt-1 text-[8px] leading-3 text-[#8A9AB0] break-all">
                                          {
                                            partner.partnerCode
                                          }
                                        </p>

                                      </div>

                                    )
                                  )}

                                </div>
                              ) : (
                                <span className="text-[#8294AE]">
                                  -
                                </span>
                              )}

                            </td>

                            <NumberCell
                              value={
                                item.totalCreditsUsed
                              }
                              className="font-bold"
                            />

                            <NumberCell
                              value={
                                item.totalCreditsReserved
                              }
                              className="text-amber-600"
                            />

                            <NumberCell
                              value={
                                item.totalCreditsRefunded
                              }
                              className="text-emerald-600"
                            />

                            <NumberCell
                              value={
                                item
                                  ?.services
                                  ?.propertyBoost
                                  ?.credits
                              }
                            />

                            <NumberCell
                              value={
                                item
                                  ?.services
                                  ?.featured
                                  ?.credits
                              }
                            />

                            <NumberCell
                              value={
                                item
                                  ?.services
                                  ?.localityTop
                                  ?.credits
                              }
                            />

                            <td className="px-2.5 py-[16px] text-center align-middle">

                              <button
                                onClick={() =>
                                  handlePropertyView(
                                    item.propertyMongoId
                                  )
                                }
                                className="inline-flex h-[34px] max-w-full items-center justify-center gap-1 rounded-[8px] border border-[#D7E0E8] bg-white px-2 text-[9px] font-semibold text-[#35516E] transition hover:border-[#9FB2C3] hover:bg-[#FAFCFD]"
                              >
                                <Eye className="w-3.5 h-3.5" />

                                View
                              </button>

                            </td>

                          </tr>

                        )
                      )
                    ) : (
                      <EmptyRow
                        columns={
                          9
                        }
                        text="No properties found"
                      />
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {/* ==================================================
                TRANSACTIONS TABLE
            ================================================== */}

            {activeTab ===
              "transactions" && (
              <div className="w-full overflow-x-hidden">

                <table className="w-full table-fixed border-separate border-spacing-0">

                  <thead className="bg-[#073A58]">

                    <tr className="border-y border-[#073A58]">

                      <TableHeader>
                        Transaction
                      </TableHeader>

                      <TableHeader>
                        Partner
                      </TableHeader>

                      <TableHeader>
                        Type
                      </TableHeader>

                      <TableHeader>
                        Service
                      </TableHeader>

                      <TableHeader align="right">
                        Amount
                      </TableHeader>

                      <TableHeader align="right">
                        Credits
                      </TableHeader>

                      <TableHeader align="right">
                        Before
                      </TableHeader>

                      <TableHeader align="right">
                        After
                      </TableHeader>

                      <TableHeader align="center">
                        Status
                      </TableHeader>

                      <TableHeader>
                        Date
                      </TableHeader>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredTransactions
                      .length >
                    0 ? (
                      paginatedTransactions.map(
                        (
                          item
                        ) => (

                          <tr
                            key={
                              item._id
                            }
                            className="transition-colors hover:bg-[#FAFCFD]"
                          >

                            <td className="px-2.5 py-[16px] align-middle">

                              <p className="break-all font-mono text-[9px] font-medium leading-4 text-[#294766]">
                                {
                                  item.transactionId
                                }
                              </p>

                            </td>

                            <td className="px-2.5 py-[16px] align-middle">

                              <p className="text-[10px] font-semibold leading-4 text-[#1F3C50] break-words">
                                {
                                  item.partnerName
                                }
                              </p>

                              <p className="text-[9px] leading-4 text-[#8294AE] break-words">
                                {
                                  item.partnerCode
                                }
                              </p>

                            </td>

                            <td className="px-2.5 py-[16px] text-[10px] leading-4 text-[#294564] break-words">
                              {
                                item.type
                              }
                            </td>

                            <td className="px-2.5 py-[16px] text-[10px] leading-4 text-[#617A97] break-words">
                              {item.productCode ||
                                "-"}
                            </td>

                            <td className="px-2.5 py-[16px] text-right text-[10px] font-semibold text-[#1F3C50] break-words">

                              {item.amountInRupees
                                ? currencyFormat(
                                    item.amountInRupees
                                  )
                                : "-"}

                            </td>

                            <td className="px-2.5 py-[16px] text-right align-middle">

                              <span
                                className={`font-bold ${
                                  item.direction ===
                                  "CREDIT"
                                    ? "text-emerald-600"
                                    : "text-rose-600"
                                }`}
                              >
                                {item.direction ===
                                "CREDIT"
                                  ? "+"
                                  : "-"}

                                {numberFormat(
                                  item.credits
                                )}
                              </span>

                            </td>

                            <NumberCell
                              value={
                                item.balanceBefore
                              }
                            />

                            <NumberCell
                              value={
                                item.balanceAfter
                              }
                              className="font-bold"
                            />

                            <td className="px-2.5 py-[16px] text-center align-middle">

                              <StatusBadge
                                status={
                                  item.status
                                }
                              />

                            </td>

                            <td className="px-2.5 py-[16px] text-[9px] leading-4 text-[#7086A2] break-words">
                              {dateFormat(
                                item.createdAt
                              )}
                            </td>

                          </tr>

                        )
                      )
                    ) : (
                      <EmptyRow
                        columns={
                          10
                        }
                        text="No transactions found"
                      />
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {/* ==================================================
                PAGINATION
            ================================================== */}
            {activeData.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-[#E5EAF0] bg-white px-[22px] py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] font-medium text-[#8294AE]">
                  Showing <span className="font-semibold text-[#294766]">{startItem}</span>{" "}
                  to <span className="font-semibold text-[#294766]">{endItem}</span>{" "}
                  of <span className="font-semibold text-[#294766]">{activeData.length}</span>{" "}
                  records
                </p>

                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handlePageChange(safeCurrentPage - 1)}
                      disabled={safeCurrentPage === 1}
                      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#D8E1EA] bg-white text-[#536C87] transition hover:border-[#00776C] hover:text-[#00776C] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                      (page) => (
                        <button
                          type="button"
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
                            safeCurrentPage === page
                              ? "bg-[#00776C] text-white"
                              : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )} */}
{/* PAGE NUMBERS */}
<div className="flex items-center gap-1.5">

  {/* First visible page */}
  <button
    onClick={() =>
      handlePageChange(currentPage)
    }
    className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
      currentPage === 1
        ? "bg-[#00776C] text-white"
        : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
    }`}
  >
    {currentPage}
  </button>

  {/* Second visible page */}
  {currentPage < totalPages && (
    <button
      onClick={() =>
        handlePageChange(currentPage + 1)
      }
      className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
        currentPage + 1 === currentPage
          ? "bg-[#00776C] text-white"
          : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
      }`}
    >
      {currentPage + 1}
    </button>
  )}

  {/* Dots */}
  {currentPage + 1 < totalPages && (
    <span className="flex h-9 min-w-7 items-center justify-center text-[11px] font-semibold text-[#8294AE]">
      ...
    </span>
  )}

  {/* Last page */}
  {currentPage + 1 < totalPages && (
    <button
      onClick={() =>
        handlePageChange(totalPages)
      }
      className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
        currentPage === totalPages
          ? "bg-[#00776C] text-white"
          : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
      }`}
    >
      {totalPages}
    </button>
  )}

</div>
                    <button
                      type="button"
                      onClick={() => handlePageChange(safeCurrentPage + 1)}
                      disabled={safeCurrentPage === totalPages}
                      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#D8E1EA] bg-white text-[#536C87] transition hover:border-[#00776C] hover:text-[#00776C] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* ==================================================
            DETAIL LOADING OVERLAY
        ================================================== */}

        {detailLoading && (
          <div className="fixed inset-0 bg-black/20 z-[80] flex items-center justify-center">

            <div className="bg-white p-6 rounded-[18px] shadow-xl border border-[#D9E3EE]">

              <Loader2 className="w-7 h-7 animate-spin text-[#00766C]" />

            </div>

          </div>
        )}

        {/* ==================================================
            PARTNER DRAWER
        ================================================== */}

        {selectedPartner && (
          <PartnerDetailDrawer
            data={
              selectedPartner
            }
            onClose={() =>
              setSelectedPartner(
                null
              )
            }
            numberFormat={
              numberFormat
            }
            dateFormat={
              dateFormat
            }
          />
        )}

        {/* ==================================================
            PROPERTY DRAWER
        ================================================== */}

        {selectedProperty && (
          <PropertyDetailDrawer
            data={
              selectedProperty
            }
            onClose={() =>
              setSelectedProperty(
                null
              )
            }
            numberFormat={
              numberFormat
            }
            dateFormat={
              dateFormat
            }
          />
        )}

      </div>
    );
  };

export default WalletOperationsDashboard;

// ======================================================
// STAT CARD
// Same compact visual format as secondary cards
// ======================================================

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
}) => {
  const toneMap = {
    "Total Credits Sold": "bg-[#EAF4FD] text-[#3E8ED0]",
    "Credits In Wallets": "bg-[#EAF8F5] text-[#00A78E]",
    "Credits Used": "bg-[#FFF4E6] text-[#ED9918]",
    "Credits Refunded": "bg-[#FFF0F1] text-[#EF6468]",
  };

  return (
    <div className="min-h-[118px] rounded-[13px] border border-[#D9E1EA] bg-white px-[20px] py-[18px] shadow-[0_2px_5px_rgba(20,50,80,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[9px] ${toneMap[title] || toneMap["Total Credits Sold"]}`}>
          {icon}
        </div>

        {subtitle && (
          <span className="max-w-[145px] truncate text-right text-[10px] font-medium text-[#8B99AD]">
            {subtitle}
          </span>
        )}
      </div>

      <p className="mt-[16px] text-[10px] font-medium uppercase tracking-[0.3px] text-[#8B99AD]">
        {title}
      </p>

      <p className="mt-[7px] text-[23px] font-semibold leading-none text-[#1F3C50]">
        {value}
      </p>
    </div>
  );
};

// ======================================================
// SMALL STAT
// ======================================================

const SmallStat = ({
  label,
  value,
  icon,
  tone = "blue",
}) => {
  const toneMap = {
    blue: "bg-[#EAF4FD] text-[#3E8ED0]",
    orange: "bg-[#FFF4E6] text-[#ED9918]",
    amber: "bg-[#FFF7E8] text-[#D98A08]",
    green: "bg-[#EAF8F5] text-[#00A78E]",
  };

  return (
    <div className="min-h-[118px] rounded-[13px] border border-[#D9E1EA] bg-white px-[20px] py-[18px] shadow-[0_2px_5px_rgba(20,50,80,0.03)]">
      <div className={`flex h-[40px] w-[40px] items-center justify-center rounded-[9px] ${toneMap[tone]}`}>
        {icon}
      </div>

      <p className="mt-[16px] text-[10px] font-medium uppercase tracking-[0.3px] text-[#8B99AD]">
        {label}
      </p>

      <p className="mt-[7px] text-[23px] font-semibold leading-none text-[#1F3C50]">
        {value}
      </p>
    </div>
  );
};

// ======================================================
// SERVICE CARD
// ======================================================

const ServiceCard = ({
  title,
  cost,
  totalCredits,
  count,
  properties,
  partners,
  icon,
}) => {
  const toneMap = {
    "Property Boost": "bg-[#EAF8F5] text-[#009B88]",
    "Featured Property": "bg-[#FFF4E6] text-[#EA9618]",
    "Locality Top": "bg-[#EAF4FD] text-[#438DD0]",
    "Lead Unlock": "bg-[#F3EDFB] text-[#8157B6]",
  };

  return (
    <div className="border-b border-[#E8EDF2] px-[22px] py-[20px] transition hover:bg-[#FAFCFD] sm:border-r xl:border-b-0 last:border-r-0">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-[9px] ${toneMap[title] || toneMap["Property Boost"]}`}>
          {icon}
        </div>

        <span className="rounded-full bg-[#F4F7F9] px-2.5 py-1 text-[9px] font-semibold text-[#657A94]">
          {cost}
        </span>
      </div>

      <p className="mt-[18px] text-[11px] font-medium uppercase tracking-[0.25px] text-[#8192A8]">
        {title}
      </p>

      <div className="mt-[10px] flex items-baseline gap-1.5">
        <span className="text-[25px] font-semibold leading-none text-[#1F3C50]">
          {Number(totalCredits || 0).toLocaleString("en-IN")}
        </span>
        <span className="text-[10px] text-[#8A9AAF]">credits</span>
      </div>

      <div className="mt-[17px] flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#7E90A6]">
        <span><b className="font-semibold text-[#294766]">{count || 0}</b> uses</span>
        {properties !== undefined && (
          <span><b className="font-semibold text-[#294766]">{properties || 0}</b> properties</span>
        )}
        {partners !== undefined && (
          <span><b className="font-semibold text-[#294766]">{partners || 0}</b> partners</span>
        )}
      </div>
    </div>
  );
};

// ======================================================
// TAB BUTTON
// ======================================================

const TabButton = ({
  active,
  onClick,
  icon,
  children,
}) => (
  <button
    onClick={onClick}
    className={`relative inline-flex items-center gap-2 whitespace-nowrap pb-[16px] text-[12px] font-semibold transition ${
      active
        ? "text-[#00776C]"
        : "text-[#8B98AC] hover:text-[#546A84]"
    }`}
  >
    {icon}
    {children}

    {active && (
      <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#00776C]" />
    )}
  </button>
);

// ======================================================
// TABLE HEADER
// ======================================================

const TableHeader = ({
  children,
  align = "left",
}) => (
  <th
    className={`border-y border-[#E7ECF1] bg-[#FAFBFC] px-2.5 py-[13px] text-[8px] font-medium uppercase tracking-[0.45px] text-[#8998AD] ${
      align === "right"
        ? "text-right"
        : align === "center"
        ? "text-center"
        : "text-left"
    }`}
  >
    <span className="block break-words leading-4">
      {children}
    </span>
  </th>
);

// ======================================================
// NUMBER CELL
// ======================================================

const NumberCell = ({
  value,
  className = "",
}) => (
  <td
    className={`px-2.5 py-[16px] text-right text-[11px] font-medium text-[#344F6B] break-words ${className}`}
  >
    {Number(value || 0).toLocaleString("en-IN")}
  </td>
);

// ======================================================
// EMPTY ROW
// ======================================================

const EmptyRow = ({
  columns,
  text,
}) => (
  <tr>
    <td colSpan={columns} className="py-14 text-center text-[13px] text-[#8294AE]">
      {text}
    </td>
  </tr>
);

// ======================================================
// STATUS BADGE
// ======================================================

const StatusBadge = ({ status }) => {
  const styles = {
    SUCCESS: "bg-[#EAF8F3] text-[#08775E] border-[#CFEDE3]",
    PENDING: "bg-[#FFF8E9] text-[#D58100] border-[#F6D77F]",
    FAILED: "bg-[#FFF0F1] text-[#C94A55] border-[#F3CED2]",
    REFUNDED: "bg-[#EEF5FC] text-[#4E78A2] border-[#D8E6F4]",
    REVERSED: "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]",
    Approved: "bg-[#EAF8F3] text-[#08775E] border-[#CFEDE3]",
    Pending: "bg-[#FFF8E9] text-[#D58100] border-[#F6D77F]",
    Rejected: "bg-[#FFF0F1] text-[#C94A55] border-[#F3CED2]",
    Expired: "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold ${styles[status] || "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]"}`}>
      {status || "-"}
    </span>
  );
};

// ======================================================
// MINI CARD
// ======================================================

const MiniCard = ({ label, value }) => (
  <div className="bg-[#F8FAFC] border border-[#DDE6EF] rounded-[16px] p-4">
    <p className="text-[12px] font-semibold text-[#7B90AB]">{label}</p>
    <p className="text-[22px] font-extrabold text-[#1F3C50] mt-2">{value}</p>
  </div>
);

// ======================================================
// PARTNER DETAIL DRAWER
// ======================================================

const PartnerDetailDrawer = ({
  data,
  onClose,
  numberFormat,
  dateFormat,
}) => {
  const partner = data?.partner || {};
  const wallet = data?.wallet || {};
  const services = data?.serviceSummary || {};

  const history = Array.isArray(data?.creditHistory)
    ? data.creditHistory
    : [];

  const properties = Array.isArray(data?.properties)
    ? data.properties
    : [];

  const serviceCards = [
    {
      label: "Property Boost",
      value: services?.propertyBoost?.credits,
      icon: <Zap className="h-4 w-4" />,
      iconClass: "bg-[#EAF8F5] text-[#009B88]",
    },
    {
      label: "Featured Property",
      value: services?.featured?.credits,
      icon: <Star className="h-4 w-4" />,
      iconClass: "bg-[#FFF4E6] text-[#EA9618]",
    },
    {
      label: "Locality Top",
      value: services?.localityTop?.credits,
      icon: <MapPin className="h-4 w-4" />,
      iconClass: "bg-[#EAF4FD] text-[#438DD0]",
    },
    {
      label: "Lead Unlock",
      value: services?.leadUnlock?.credits,
      icon: <Unlock className="h-4 w-4" />,
      iconClass: "bg-[#F3EDFB] text-[#8157B6]",
    },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#17384D]/45 backdrop-blur-[2px]">
      <div className="flex h-full w-full flex-col overflow-hidden bg-[#F6F8FA] shadow-2xl sm:max-w-2xl lg:max-w-3xl">

        {/* ==================================================
            HEADER - CREDIT MANAGEMENT THEME
        ================================================== */}
        <div className="shrink-0 bg-[#21465D] px-5 pb-5 pt-4 text-white sm:px-6">
          <div className="flex items-start justify-between gap-4">

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#31C7A0] shadow-sm">
                <Wallet className="h-5 w-5 text-white" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-[19px] font-extrabold tracking-[-0.2px]">
                  Credit Management
                </h2>
                <p className="mt-0.5 text-[11px] text-[#D8E8EE]">
                  Manage partner wallet, credits & activity
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden rounded-[10px] border border-white/15 bg-white/10 px-3 py-2 sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#31C7A0]" />
                  <span className="text-[8px] uppercase tracking-[0.4px] text-[#B8CDD6]">
                    Current View
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] font-bold text-white">
                  Partner Details
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close partner details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Partner identity */}
          <div className="mt-5 flex items-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.07] p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#31C7A0] text-[15px] font-extrabold text-white">
              {partner?.name?.charAt(0)?.toUpperCase() || "P"}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-[14px] font-bold text-white">
                  {partner.name || "Partner Details"}
                </p>

                {partner.isVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#31C7A0]/15 px-2 py-0.5 text-[8px] font-bold text-[#63E0C0]">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-0.5 truncate text-[9px] text-[#BBD0D9]">
                {partner.partnerId || "Partner ID unavailable"}
              </p>

              {partner.email && (
                <p className="mt-0.5 truncate text-[9px] text-[#91B0BD]">
                  {partner.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================
            CONTENT
        ================================================== */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">

          {/* WALLET SUMMARY */}
          <section className="rounded-[14px] border border-[#D9E2E9] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">
            <div className="flex items-center justify-between border-b border-[#E7EDF1] px-4 py-3.5 sm:px-5">
              <div>
                <h3 className="text-[14px] font-extrabold text-[#1F3C50]">
                  Wallet Summary
                </h3>
                <p className="mt-0.5 text-[10px] text-[#8294AE]">
                  Current partner credit position
                </p>
              </div>

              <span className="rounded-full bg-[#EAF8F5] px-2.5 py-1 text-[9px] font-bold text-[#008B7D]">
                Active Wallet
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-5">
              <PartnerMetricCard
                label="Purchased"
                value={`${numberFormat(wallet.totalPurchased)} Cr`}
                icon={<IndianRupee className="h-4 w-4" />}
                iconClass="bg-[#EAF4FD] text-[#438DD0]"
              />

              <PartnerMetricCard
                label="Available"
                value={`${numberFormat(wallet.balance)} Cr`}
                icon={<Wallet className="h-4 w-4" />}
                iconClass="bg-[#EAF8F5] text-[#009B88]"
              />

              <PartnerMetricCard
                label="Spent"
                value={`${numberFormat(wallet.totalSpent)} Cr`}
                icon={<TrendingUp className="h-4 w-4" />}
                iconClass="bg-[#FFF4E6] text-[#EA9618]"
              />

              <PartnerMetricCard
                label="Refunded"
                value={`${numberFormat(wallet.totalRefunded)} Cr`}
                icon={<RotateCcw className="h-4 w-4" />}
                iconClass="bg-[#FFF0F1] text-[#D85B65]"
              />
            </div>
          </section>

          {/* SERVICE USAGE */}
          <section className="mt-4 rounded-[14px] border border-[#D9E2E9] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">
            <div className="border-b border-[#E7EDF1] px-4 py-3.5 sm:px-5">
              <h3 className="text-[14px] font-extrabold text-[#1F3C50]">
                Service Credit Usage
              </h3>
              <p className="mt-0.5 text-[10px] text-[#8294AE]">
                Credits consumed across promotion services
              </p>
            </div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {serviceCards.map((service) => (
                <div
                  key={service.label}
                  className="flex items-center justify-between border-b border-[#EDF1F4] px-4 py-4 last:border-b-0 sm:px-5 sm:even:border-l"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] ${service.iconClass}`}
                    >
                      {service.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-bold text-[#294766]">
                        {service.label}
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#8A9AAF]">
                        Service usage
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 text-right">
                    <p className="text-[17px] font-extrabold text-[#1F3C50]">
                      {numberFormat(service.value)}
                    </p>
                    <p className="text-[8px] font-medium uppercase tracking-[0.3px] text-[#91A0B2]">
                      Credits
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROPERTY PROMOTIONS */}
          <section className="mt-4 rounded-[14px] border border-[#D9E2E9] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">
            <div className="flex items-center justify-between border-b border-[#E7EDF1] px-4 py-3.5 sm:px-5">
              <div>
                <h3 className="text-[14px] font-extrabold text-[#1F3C50]">
                  Property Promotion History
                </h3>
                <p className="mt-0.5 text-[10px] text-[#8294AE]">
                  Promotion activity linked to this partner
                </p>
              </div>

              <span className="rounded-full bg-[#F3F6F8] px-2.5 py-1 text-[9px] font-bold text-[#657A94]">
                {properties.length} Records
              </span>
            </div>

            <div className="space-y-3 p-4 sm:p-5">
              {properties.length > 0 ? (
                properties.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-[12px] border border-[#E0E7EC] bg-[#FBFCFD] p-4 transition hover:border-[#BFD5D5] hover:bg-[#FAFDFC]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="break-words text-[11px] font-bold text-[#1F3C50]">
                          {item.propertyTitle || "Property"}
                        </p>

                        <p className="mt-1 break-all text-[8px] font-medium text-[#7A90AC]">
                          {item.propertyCode || "-"}
                        </p>
                      </div>

                      <StatusBadge status={item.status} />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-[9px] bg-white p-3 border border-[#E8EDF1]">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.3px] text-[#91A0B2]">
                          Service
                        </p>
                        <p className="mt-1 break-words text-[10px] font-bold text-[#294766]">
                          {item.promotionType || "-"}
                        </p>
                      </div>

                      <div className="rounded-[9px] bg-white p-3 border border-[#E8EDF1] text-right">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.3px] text-[#91A0B2]">
                          Credits
                        </p>
                        <p className="mt-1 text-[13px] font-extrabold text-[#00776C]">
                          {numberFormat(item.creditsCharged)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[11px] border border-dashed border-[#D5DEE6] py-8 text-center">
                  <Building2 className="mx-auto h-6 w-6 text-[#A7B5C3]" />
                  <p className="mt-2 text-[11px] font-semibold text-[#8294AE]">
                    No property promotion history
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CREDIT HISTORY */}
          {/* <section className="mt-4 rounded-[14px] border border-[#D9E2E9] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">
            <div className="flex items-center justify-between border-b border-[#E7EDF1] px-4 py-3.5 sm:px-5">
              <div>
                <h3 className="text-[14px] font-extrabold text-[#1F3C50]">
                  Credit History
                </h3>
                <p className="mt-0.5 text-[10px] text-[#8294AE]">
                  Wallet transactions and balance changes
                </p>
              </div>

              <span className="rounded-full bg-[#F3F6F8] px-2.5 py-1 text-[9px] font-bold text-[#657A94]">
                {history.length} Records
              </span>
            </div>

            <div className="space-y-2.5 p-4 sm:p-5">
              {history.length > 0 ? (
                history.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-start justify-between gap-4 rounded-[12px] border border-[#E0E7EC] bg-[#FBFCFD] p-3.5"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="break-words text-[10px] font-bold text-[#1F3C50]">
                          {item.type || "-"}
                        </p>

                        <StatusBadge status={item.status} />
                      </div>

                      <p className="mt-1 break-all font-mono text-[8px] text-[#8A9AAF]">
                        {item.transactionId || "-"}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-[8px] text-[#8294AE]">
                        <Clock3 className="h-3 w-3" />
                        {dateFormat(item.createdAt)}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p
                        className={`text-[14px] font-extrabold ${
                          item.direction === "CREDIT"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {item.direction === "CREDIT" ? "+" : "-"}
                        {numberFormat(item.credits)}
                      </p>

                      <p className="mt-1 text-[8px] text-[#8294AE]">
                        Balance:{" "}
                        <span className="font-bold text-[#536C87]">
                          {numberFormat(item.balanceAfter)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[11px] border border-dashed border-[#D5DEE6] py-8 text-center">
                  <Wallet className="mx-auto h-6 w-6 text-[#A7B5C3]" />
                  <p className="mt-2 text-[11px] font-semibold text-[#8294AE]">
                    No credit transactions
                  </p>
                </div>
              )}
            </div>
          </section> */}

        </div>
      </div>
    </div>
  );
};

// ======================================================
// PARTNER METRIC CARD
// ======================================================

const PartnerMetricCard = ({
  label,
  value,
  icon,
  iconClass,
}) => (
  <div className="rounded-[11px] border border-[#E1E8ED] bg-[#FBFCFD] p-3">
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-[8px] ${iconClass}`}
    >
      {icon}
    </div>

    <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.35px] text-[#8B99AD]">
      {label}
    </p>

    <p className="mt-1 text-[15px] font-extrabold text-[#1F3C50]">
      {value}
    </p>
  </div>
);

// ======================================================
// PROPERTY DETAIL DRAWER
// ======================================================

const PropertyDetailDrawer =
  ({
    data,
    onClose,
    numberFormat,
    dateFormat,
  }) => {
    const property =
      data?.property || {};

    const summary =
      data?.summary || {};

    const history =
      Array.isArray(
        data
          ?.promotionHistory
      )
        ? data
            .promotionHistory
        : [];

    return (
      <div className="fixed inset-0 z-[70] bg-[#1F3C50]/35 backdrop-blur-[1px] flex justify-end">

        <div className="w-full sm:max-w-2xl h-full bg-white shadow-2xl overflow-y-auto border-l border-[#D9E3EE]">

          <div className="sticky top-0 z-10 bg-white border-b border-[#D9E3EE] px-5 py-4 flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold">
                {property.title ||
                  "Property Details"}
              </h2>

              <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
                {
                  property.propertyId
                }
              </p>

            </div>

            <button
              onClick={
                onClose
              }
              className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[#5F7895] hover:bg-[#F3F6F9]"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

          <div className="p-5 space-y-6">

            {/* SUMMARY */}

            <div className="grid grid-cols-2 gap-3">

              <MiniCard
                label="Credits Used"
                value={
                  numberFormat(
                    summary.usedCredits
                  )
                }
              />

              <MiniCard
                label="Pending Credits"
                value={
                  numberFormat(
                    summary.pendingCredits
                  )
                }
              />

              <MiniCard
                label="Refunded"
                value={
                  numberFormat(
                    summary.refundedCredits
                  )
                }
              />

              <MiniCard
                label="Total Requests"
                value={
                  numberFormat(
                    summary.totalRequests
                  )
                }
              />

            </div>

            {/* PROPERTY INFO */}

            <div className="border border-[#D9E3EE] rounded-[16px] p-4">

              <h3 className="font-bold mb-3">
                Property Information
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm">

                <InfoItem
                  label="Status"
                  value={
                    property.status
                  }
                />

                <InfoItem
                  label="Verification"
                  value={
                    property.propertyVerificationStatus
                  }
                />

                <InfoItem
                  label="City"
                  value={
                    property.city
                  }
                />

                <InfoItem
                  label="Locality"
                  value={
                    property.locality
                  }
                />

              </div>

            </div>

            {/* PROMOTION HISTORY */}

            <div>

              <h3 className="font-extrabold text-[#1F3C50] mb-3">
                Promotion History
              </h3>

              <div className="space-y-3">

                {history.length >
                0 ? (
                  history.map(
                    (
                      item
                    ) => (

                      <div
                        key={
                          item._id
                        }
                        className="border border-[#D9E3EE] rounded-[16px] p-4"
                      >

                        <div className="flex justify-between gap-3">

                          <div>

                            <p className="font-semibold">
                              {
                                item.promotionType
                              }
                            </p>

                            <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
                              {
                                item.partnerName
                              }{" "}
                              •{" "}
                              {
                                item.partnerCode
                              }
                            </p>

                          </div>

                          <StatusBadge
                            status={
                              item.status
                            }
                          />

                        </div>

                        <div className="mt-4 flex items-center justify-between">

                          <span className="text-sm text-[#7086A2]">
                            Credits Charged
                          </span>

                          <span className="font-extrabold">
                            {
                              item.creditsCharged
                            }
                          </span>

                        </div>

                        <p className="text-[12px] text-[#8294AE] mt-3">
                          Requested:{" "}
                          {dateFormat(
                            item.requestedAt
                          )}
                        </p>

                        {item.approvedAt && (
                          <p className="text-xs text-emerald-500 mt-1">
                            Approved:{" "}
                            {dateFormat(
                              item.approvedAt
                            )}
                          </p>
                        )}

                        {item.rejectedAt && (
                          <p className="text-xs text-rose-500 mt-1">
                            Rejected:{" "}
                            {dateFormat(
                              item.rejectedAt
                            )}
                          </p>
                        )}

                      </div>

                    )
                  )
                ) : (
                  <div className="text-center py-6 border border-dashed rounded-xl text-sm text-[#8294AE]">
                    No promotion
                    history
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  };

// ======================================================
// INFO ITEM
// ======================================================

const InfoItem = ({
  label,
  value,
}) => (
  <div>

    <p className="text-[9px] leading-4 text-[#8294AE] break-words">
      {label}
    </p>

    <p className="font-bold mt-1 text-[#1F3C50]">
      {value || "-"}
    </p>

  </div>
);



// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Search,
//   Wallet,
//   RefreshCcw,
//   TrendingUp,
//   Building2,
//   Users,
//   Eye,
//   X,
//   BadgeIndianRupee,
//   Zap,
//   Star,
//   MapPin,
//   Unlock,
//   Loader2,
//   IndianRupee,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   RotateCcw,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import {
//   getCreditDashboardApi,
//   getPartnerCreditOverviewApi,
//   getPartnerCreditDetailsApi,
//   getPropertyCreditOverviewApi,
//   getPropertyCreditDetailsApi,
//   getCreditHistoryApi,
// } from "../../../Services/creditService";

// const WalletOperationsDashboard =
//   () => {
//     const [
//       activeTab,
//       setActiveTab,
//     ] = useState(
//       "partners"
//     );

//     const [
//       dashboard,
//       setDashboard,
//     ] = useState({});

//     const [
//       partners,
//       setPartners,
//     ] = useState([]);

//     const [
//       properties,
//       setProperties,
//     ] = useState([]);

//     const [
//       transactions,
//       setTransactions,
//     ] = useState([]);

//     const [
//       search,
//       setSearch,
//     ] = useState("");

//     const [
//       loading,
//       setLoading,
//     ] = useState(true);

//     const [
//       detailLoading,
//       setDetailLoading,
//     ] = useState(false);

//     const [
//       error,
//       setError,
//     ] = useState("");

//     const [
//       selectedPartner,
//       setSelectedPartner,
//     ] = useState(null);

//     const [
//       selectedProperty,
//       setSelectedProperty,
//     ] = useState(null);

//     const [currentPage, setCurrentPage] = useState(1);
//     const ITEMS_PER_PAGE = 10;

//     // ======================================================
//     // LOAD ALL DATA
//     // ======================================================

//     const loadData =
//       async () => {
//         try {
//           setLoading(true);

//           setError("");

//           const [
//             dashboardResponse,
//             partnerResponse,
//             propertyResponse,
//             historyResponse,
//           ] =
//             await Promise.all([
//               getCreditDashboardApi(),

//               getPartnerCreditOverviewApi(),

//               getPropertyCreditOverviewApi(),

//               getCreditHistoryApi({
//                 page: 1,
//                 limit: 100,
//               }),
//             ]);

//           setDashboard(
//             dashboardResponse
//               ?.data || {}
//           );

//           setPartners(
//             Array.isArray(
//               partnerResponse
//                 ?.data
//             )
//               ? partnerResponse
//                   .data
//               : []
//           );

//           setProperties(
//             Array.isArray(
//               propertyResponse
//                 ?.data
//             )
//               ? propertyResponse
//                   .data
//               : []
//           );

//           setTransactions(
//             Array.isArray(
//               historyResponse
//                 ?.data
//             )
//               ? historyResponse
//                   .data
//               : []
//           );
//         } catch (
//           apiError
//         ) {
//           console.error(
//             "Wallet load error:",
//             apiError
//           );

//           setError(
//             apiError
//               ?.response
//               ?.data
//               ?.message ||
//               "Unable to load wallet data."
//           );
//         } finally {
//           setLoading(
//             false
//           );
//         }
//       };

//     useEffect(() => {
//       loadData();
//     }, []);

//     // ======================================================
//     // FORMATTERS
//     // ======================================================

//     const numberFormat =
//       (value) =>
//         Number(
//           value || 0
//         ).toLocaleString(
//           "en-IN"
//         );

//     const currencyFormat =
//       (value) =>
//         new Intl.NumberFormat(
//           "en-IN",
//           {
//             style:
//               "currency",

//             currency:
//               "INR",

//             maximumFractionDigits: 0,
//           }
//         ).format(
//           Number(
//             value || 0
//           )
//         );

//     const dateFormat =
//       (date) => {
//         if (!date) {
//           return "-";
//         }

//         return new Date(
//           date
//         ).toLocaleString(
//           "en-IN",
//           {
//             day: "2-digit",

//             month:
//               "short",

//             year:
//               "numeric",

//             hour:
//               "2-digit",

//             minute:
//               "2-digit",
//           }
//         );
//       };

//     // ======================================================
//     // OVERVIEW
//     // ======================================================

//     const overview =
//       dashboard
//         ?.overview || {};

//     const serviceUsage =
//       Array.isArray(
//         dashboard
//           ?.serviceUsage
//       )
//         ? dashboard
//             .serviceUsage
//         : [];

//     const findService =
//       (
//         serviceCode
//       ) =>
//         serviceUsage.find(
//           (item) =>
//             item.code ===
//             serviceCode
//         ) || {
//           totalCredits: 0,
//           totalRequests: 0,
//           propertiesCount: 0,
//           partnersCount: 0,
//         };

//     const boost =
//       findService(
//         "PROPERTY_BOOST"
//       );

//     const featured =
//       findService(
//         "FEATURED_7_DAYS"
//       );

//     const locality =
//       findService(
//         "LOCALITY_TOP_30_DAYS"
//       );

//     const leadUnlock =
//       findService(
//         "LEAD_UNLOCK"
//       );

//     // ======================================================
//     // FILTER PARTNERS
//     // ======================================================

//     const filteredPartners =
//       useMemo(() => {
//         const value =
//           search
//             .trim()
//             .toLowerCase();

//         if (!value) {
//           return partners;
//         }

//         return partners.filter(
//           (partner) =>
//             partner?.name
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             partner?.partnerId
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             partner?.email
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             partner?.phone
//               ?.toLowerCase()
//               .includes(
//                 value
//               )
//         );
//       }, [
//         search,
//         partners,
//       ]);

//     // ======================================================
//     // FILTER PROPERTIES
//     // ======================================================

//     const filteredProperties =
//       useMemo(() => {
//         const value =
//           search
//             .trim()
//             .toLowerCase();

//         if (!value) {
//           return properties;
//         }

//         return properties.filter(
//           (item) =>
//             item
//               ?.propertyCode
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item
//               ?.propertyTitle
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item?.city
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item
//               ?.locality
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             item
//               ?.partners
//               ?.some(
//                 (
//                   partner
//                 ) =>
//                   partner
//                     ?.partnerName
//                     ?.toLowerCase()
//                     .includes(
//                       value
//                     ) ||
//                   partner
//                     ?.partnerCode
//                     ?.toLowerCase()
//                     .includes(
//                       value
//                     )
//               )
//         );
//       }, [
//         search,
//         properties,
//       ]);

//     // ======================================================
//     // FILTER TRANSACTIONS
//     // ======================================================

//     const filteredTransactions =
//       useMemo(() => {
//         const value =
//           search
//             .trim()
//             .toLowerCase();

//         if (!value) {
//           return transactions;
//         }

//         return transactions.filter(
//           (
//             transaction
//           ) =>
//             transaction
//               ?.transactionId
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.partnerName
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.partnerCode
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.type
//               ?.toLowerCase()
//               .includes(
//                 value
//               ) ||
//             transaction
//               ?.productCode
//               ?.toLowerCase()
//               .includes(
//                 value
//               )
//         );
//       }, [
//         transactions,
//         search,
//       ]);

//     // ======================================================
//     // SORT + PAGINATION
//     // ======================================================

//     const getLatestDate = (item) => {
//       const dateValue =
//         item?.createdAt ||
//         item?.updatedAt ||
//         item?.createdDate ||
//         item?.date;

//       const time = dateValue ? new Date(dateValue).getTime() : 0;
//       return Number.isNaN(time) ? 0 : time;
//     };

//     const sortedPartners = useMemo(
//       () => [...filteredPartners].sort((a, b) => getLatestDate(b) - getLatestDate(a)),
//       [filteredPartners]
//     );

//     const sortedProperties = useMemo(
//       () => [...filteredProperties].sort((a, b) => getLatestDate(b) - getLatestDate(a)),
//       [filteredProperties]
//     );

//     const sortedTransactions = useMemo(
//       () => [...filteredTransactions].sort((a, b) => getLatestDate(b) - getLatestDate(a)),
//       [filteredTransactions]
//     );

//     const activeData =
//       activeTab === "partners"
//         ? sortedPartners
//         : activeTab === "properties"
//         ? sortedProperties
//         : sortedTransactions;

//     const totalPages = Math.max(
//       1,
//       Math.ceil(activeData.length / ITEMS_PER_PAGE)
//     );

//     const safeCurrentPage = Math.min(currentPage, totalPages);
//     const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

//     const paginatedPartners = sortedPartners.slice(
//       startIndex,
//       startIndex + ITEMS_PER_PAGE
//     );

//     const paginatedProperties = sortedProperties.slice(
//       startIndex,
//       startIndex + ITEMS_PER_PAGE
//     );

//     const paginatedTransactions = sortedTransactions.slice(
//       startIndex,
//       startIndex + ITEMS_PER_PAGE
//     );

//     const startItem = activeData.length === 0 ? 0 : startIndex + 1;
//     const endItem = Math.min(startIndex + ITEMS_PER_PAGE, activeData.length);

//     const handlePageChange = (page) => {
//       if (page < 1 || page > totalPages) return;
//       setCurrentPage(page);
//     };

//     useEffect(() => {
//       setCurrentPage(1);
//     }, [activeTab, search]);

//     useEffect(() => {
//       if (currentPage > totalPages) {
//         setCurrentPage(totalPages);
//       }
//     }, [currentPage, totalPages]);

//     // ======================================================
//     // VIEW PARTNER
//     // ======================================================

//     const handlePartnerView =
//       async (
//         partnerMongoId
//       ) => {
//         try {
//           setDetailLoading(
//             true
//           );

//           const response =
//             await getPartnerCreditDetailsApi(
//               partnerMongoId
//             );

//           setSelectedPartner(
//             response?.data ||
//               null
//           );
//         } catch (
//           apiError
//         ) {
//           console.error(
//             "Partner View Error:",
//             apiError
//           );
//         } finally {
//           setDetailLoading(
//             false
//           );
//         }
//       };

//     // ======================================================
//     // VIEW PROPERTY
//     // ======================================================

//     const handlePropertyView =
//       async (
//         propertyMongoId
//       ) => {
//         try {
//           setDetailLoading(
//             true
//           );

//           const response =
//             await getPropertyCreditDetailsApi(
//               propertyMongoId
//             );

//           setSelectedProperty(
//             response?.data ||
//               null
//           );
//         } catch (
//           apiError
//         ) {
//           console.error(
//             "Property View Error:",
//             apiError
//           );
//         } finally {
//           setDetailLoading(
//             false
//           );
//         }
//       };

//     // ======================================================
//     // MAIN LOADER
//     // ======================================================

//     if (loading) {
//       return (
//         <div className="min-h-[600px] flex flex-col items-center justify-center gap-3">

//           <Loader2 className="w-8 h-8 animate-spin text-[#00766C]" />

//           <p className="text-sm text-[#7086A2]">
//             Loading wallet
//             operations...
//           </p>

//         </div>
//       );
//     }

//     return (
//       <div className="min-h-screen w-full overflow-x-hidden px-1 py-1 md:px-[1px] md:py-1 text-[#1F3C50]">

//         <div className="mx-auto max-w-[1700px] space-y-1">

//           {/* ==================================================
//               HEADER
//           ================================================== */}

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//             <div>
//               <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
//                 Wallet & Credit Management
//               </h1>

//               <p className="mt-1 text-[12px] text-[#62738B]">
//                 Manage partner credits, purchases, refunds, service usage and property promotion activity.
//               </p>
//             </div>

//             <button
//               onClick={loadData}
//               className="inline-flex h-[52px] w-fit items-center justify-center gap-2 rounded-[11px] border border-[#D7E0E9] bg-white px-5 text-[13px] font-semibold text-[#294766] shadow-[0_2px_5px_rgba(20,50,80,0.04)] transition hover:border-[#00776C] hover:text-[#00776C]"
//             >
//               <RefreshCcw className="h-[17px] w-[17px]" />
//               Refresh
//             </button>
//           </div>

//           {/* ==================================================
//               ERROR
//           ================================================== */}

//           {error && (
//             <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl p-4 text-sm">
//               {error}
//             </div>
//           )}

//           {/* ==================================================
//               MAIN STATS
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">

//             <StatCard
//               title="Total Credits Sold"
//               value={`${numberFormat(
//                 overview
//                   .totalCreditsSold
//               )} Credits`}
//               subtitle={
//                 currencyFormat(
//                   overview
//                     .totalCreditSalesAmount
//                 )
//               }
//               icon={
//                 <BadgeIndianRupee className="h-[19px] w-[19px]" />
//               }
//             />

//             <StatCard
//               title="Credits In Wallets"
//               value={`${numberFormat(
//                 overview
//                   .creditsCurrentlyWithPartners
//               )} Credits`}
//               subtitle={`${numberFormat(
//                 overview
//                   .partnersWithCredits
//               )} partners with balance`}
//               icon={
//                 <Wallet className="h-[19px] w-[19px]" />
//               }
//             />

//             <StatCard
//               title="Credits Used"
//               value={`${numberFormat(
//                 overview
//                   .totalCreditsSpent
//               )} Credits`}
//               subtitle="Across all services"
//               icon={
//                 <TrendingUp className="h-[19px] w-[19px]" />
//               }
//             />

//             <StatCard
//               title="Credits Refunded"
//               value={`${numberFormat(
//                 overview
//                   .totalRefundCredits
//               )} Credits`}
//               subtitle={`${numberFormat(
//                 overview
//                   .totalRefundTransactions
//               )} refund transactions`}
//               icon={
//                 <RotateCcw className="h-[19px] w-[19px]" />
//               }
//             />

//           </div>

//           {/* ==================================================
//               SECONDARY STATS
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
//             <SmallStat
//               label="Total Partners"
//               value={numberFormat(overview?.totalPartners)}
//               icon={<Users className="h-[19px] w-[19px]" />}
//               tone="blue"
//             />

//             <SmallStat
//               label="Purchase Transactions"
//               value={numberFormat(overview?.totalPurchaseTransactions)}
//               icon={<IndianRupee className="h-[19px] w-[19px]" />}
//               tone="orange"
//             />

//             <SmallStat
//               label="Pending Approvals"
//               value={numberFormat(overview?.pendingPromotionApprovals)}
//               icon={<Clock3 className="h-[19px] w-[19px]" />}
//               tone="amber"
//             />

//             <SmallStat
//               label="Approved Promotions"
//               value={numberFormat(overview?.approvedPromotionApprovals)}
//               icon={<CheckCircle2 className="h-[19px] w-[19px]" />}
//               tone="green"
//             />
//           </div>

//           {/* ==================================================
//               SERVICE USAGE
//           ================================================== */}

//           <div className="rounded-[14px] border border-[#D9E1EA] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">

//             <div className="flex flex-col gap-2 border-b border-[#E5EAF0] px-[22px] py-[18px] sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <h2 className="text-[15px] font-bold text-[#1F3C50]">
//                   Service Credit Usage
//                 </h2>
//                 <p className="mt-1 text-[12px] text-[#7E91A8]">
//                   Approved credit consumption by service type.
//                 </p>
//               </div>

//               <span className="w-fit rounded-full bg-[#EAF8F5] px-3 py-1 text-[10px] font-semibold text-[#008C7D]">
//                 Approved Usage
//               </span>
//             </div>

//             <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 xl:grid-cols-4">

//               <ServiceCard
//                 title="Property Boost"
//                 cost="99 Credits"
//                 totalCredits={
//                   boost
//                     .totalCredits
//                 }
//                 count={
//                   boost
//                     .totalRequests
//                 }
//                 properties={
//                   boost
//                     .propertiesCount
//                 }
//                 partners={
//                   boost
//                     .partnersCount
//                 }
//                 icon={
//                   <Zap className="w-5 h-5" />
//                 }
//               />

//               <ServiceCard
//                 title="Featured Property"
//                 cost="199 Credits"
//                 totalCredits={
//                   featured
//                     .totalCredits
//                 }
//                 count={
//                   featured
//                     .totalRequests
//                 }
//                 properties={
//                   featured
//                     .propertiesCount
//                 }
//                 partners={
//                   featured
//                     .partnersCount
//                 }
//                 icon={
//                   <Star className="w-5 h-5" />
//                 }
//               />

//               <ServiceCard
//                 title="Locality Top"
//                 cost="399 Credits"
//                 totalCredits={
//                   locality
//                     .totalCredits
//                 }
//                 count={
//                   locality
//                     .totalRequests
//                 }
//                 properties={
//                   locality
//                     .propertiesCount
//                 }
//                 partners={
//                   locality
//                     .partnersCount
//                 }
//                 icon={
//                   <MapPin className="w-5 h-5" />
//                 }
//               />

//               <ServiceCard
//                 title="Lead Unlock"
//                 cost="149 Credits"
//                 totalCredits={
//                   leadUnlock
//                     .totalCredits
//                 }
//                 count={
//                   leadUnlock
//                     .totalRequests
//                 }
//                 partners={
//                   leadUnlock
//                     .partnersCount
//                 }
//                 icon={
//                   <Unlock className="w-5 h-5" />
//                 }
//               />

//             </div>

//           </div>

//           {/* ==================================================
//               DATA SECTION
//           ================================================== */}

//           <div className="overflow-hidden rounded-[14px] border border-[#D9E1EA] bg-white shadow-[0_2px_5px_rgba(20,50,80,0.035)]">

//             {/* HEADER */}

//             <div className="flex flex-col gap-4 border-b border-[#E5EAF0] bg-white px-[22px] pt-[18px] xl:flex-row xl:items-end xl:justify-between">

//               <div className="flex flex-wrap gap-x-7 gap-y-2">

//                 <TabButton
//                   active={
//                     activeTab ===
//                     "partners"
//                   }
//                   onClick={() => {
//                     setActiveTab("partners");
//                     setCurrentPage(1);
//                   }}
//                   icon={
//                     <Users className="w-4 h-4" />
//                   }
//                 >
//                   Partners
//                 </TabButton>

//                 <TabButton
//                   active={
//                     activeTab ===
//                     "properties"
//                   }
//                   onClick={() => {
//                     setActiveTab("properties");
//                     setCurrentPage(1);
//                   }}
//                   icon={
//                     <Building2 className="w-4 h-4" />
//                   }
//                 >
//                   Properties
//                 </TabButton>

//                 <TabButton
//                   active={
//                     activeTab ===
//                     "transactions"
//                   }
//                   onClick={() => {
//                     setActiveTab("transactions");
//                     setCurrentPage(1);
//                   }}
//                   icon={
//                     <Wallet className="w-4 h-4" />
//                   }
//                 >
//                   Transactions
//                 </TabButton>

//               </div>

//               <div className="relative w-full xl:max-w-[540px] xl:flex-1">

//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8CA0BA]" />

//                 <input
//                   type="text"
//                   placeholder={
//                     activeTab ===
//                     "partners"
//                       ? "Search partner..."
//                       : activeTab ===
//                         "properties"
//                       ? "Search property..."
//                       : "Search transaction..."
//                   }
//                   value={
//                     search
//                   }
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="h-[48px] w-full rounded-[9px] border border-[#D8E1EA] bg-white pl-12 pr-4 text-[13px] text-[#294766] outline-none placeholder:text-[#99A7BA] transition focus:border-[#8FA5B9] focus:ring-1 focus:ring-[#8FA5B9]/20"
//                 />

//               </div>

//             </div>

//             {/* ==================================================
//                 PARTNERS TABLE
//             ================================================== */}

//             {activeTab ===
//               "partners" && (
//               <div className="w-full overflow-x-hidden">

//                 <table className="w-full table-fixed border-separate border-spacing-0 [&_th]:overflow-hidden [&_td]:overflow-hidden">

//                   <thead className="bg-[#073A58]">

//                     <tr className="border-y border-[#073A58]">

//                       <TableHeader>
//                         Partner
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Purchased
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Spent
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Refunded
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Balance
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Boost
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Featured
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Locality
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Lead Unlock
//                       </TableHeader>

//                       <TableHeader align="center">
//                         Action
//                       </TableHeader>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredPartners
//                       .length >
//                     0 ? (
//                       paginatedPartners.map(
//                         (
//                           partner
//                         ) => (

//                           <tr
//                             key={
//                               partner._id
//                             }
//                             className="transition-colors hover:bg-[#FAFCFD]"
//                           >

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <div className="flex items-center gap-3">

//                                 <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E8F5F2] text-[10px] font-medium text-[#00776C]">
//                                   {partner
//                                     ?.name
//                                     ?.charAt(
//                                       0
//                                     )
//                                     ?.toUpperCase() ||
//                                     "P"}
//                                 </div>

//                                 <div>

//                                   <div className="flex items-center gap-2">

//                                     <p className="text-[11px] font-semibold leading-4 text-[#1F3C50] break-words">
//                                       {
//                                         partner.name
//                                       }
//                                     </p>

//                                     {partner.isVerified && (
//                                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                                     )}

//                                   </div>

//                                   <p className="mt-1 text-[9px] font-medium text-[#008B7D] break-words">
//                                     {
//                                       partner.partnerId
//                                     }
//                                   </p>

//                                   <p className="mt-1 text-[8px] leading-3 text-[#8A9AB0] break-all">
//                                     {
//                                       partner.email
//                                     }
//                                   </p>

//                                 </div>

//                               </div>

//                             </td>

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.totalCreditsPurchased
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.totalSpent
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.totalRefunded
//                               }
//                               className="text-emerald-600"
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.wallet
//                                   ?.currentBalance
//                               }
//                               className="text-[#274255] font-bold"
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.propertyBoost
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.featured
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.localityTop
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 partner
//                                   ?.services
//                                   ?.leadUnlock
//                                   ?.credits
//                               }
//                             />

//                             <td className="px-2.5 py-[16px] text-center align-middle">

//                               <button
//                                 onClick={() =>
//                                   handlePartnerView(
//                                     partner._id
//                                   )
//                                 }
//                                 className="inline-flex h-[34px] max-w-full items-center justify-center gap-1 rounded-[8px] border border-[#D7E0E8] bg-white px-2 text-[9px] font-semibold text-[#35516E] transition hover:border-[#9FB2C3] hover:bg-[#FAFCFD]"
//                               >
//                                 <Eye className="w-3.5 h-3.5" />

//                                 View
//                               </button>

//                             </td>

//                           </tr>

//                         )
//                       )
//                     ) : (
//                       <EmptyRow
//                         columns={
//                           10
//                         }
//                         text="No partners found"
//                       />
//                     )}

//                   </tbody>

//                 </table>

//               </div>
//             )}

//             {/* ==================================================
//                 PROPERTIES TABLE
//             ================================================== */}

//             {activeTab ===
//               "properties" && (
//               <div className="w-full overflow-x-hidden">

//                 <table className="w-full table-fixed border-separate border-spacing-0">

//                   <thead className="bg-[#073A58]">

//                     <tr className="border-y border-[#073A58]">

//                       <TableHeader>
//                         Property
//                       </TableHeader>

//                       <TableHeader>
//                         Partner
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Used
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Pending
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Refunded
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Boost
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Featured
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Locality
//                       </TableHeader>

//                       <TableHeader align="center">
//                         Action
//                       </TableHeader>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredProperties
//                       .length >
//                     0 ? (
//                       paginatedProperties.map(
//                         (
//                           item
//                         ) => (

//                           <tr
//                             key={
//                               String(
//                                 item.propertyMongoId
//                               )
//                             }
//                             className="transition-colors hover:bg-[#FAFCFD]"
//                           >

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <p className="text-[11px] font-semibold leading-4 text-[#1F3C50] break-words">
//                                 {
//                                   item.propertyTitle
//                                 }
//                               </p>

//                               <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                                 {
//                                   item.propertyCode
//                                 }
//                               </p>

//                               <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                                 {
//                                   item.locality
//                                 }
//                                 {item.city
//                                   ? `, ${item.city}`
//                                   : ""}
//                               </p>

//                             </td>

//                             <td className="px-2.5 py-[16px] align-middle">

//                               {item
//                                 ?.partners
//                                 ?.length >
//                               0 ? (
//                                 <div className="space-y-2">

//                                   {item.partners.map(
//                                     (
//                                       partner
//                                     ) => (

//                                       <div
//                                         key={
//                                           String(
//                                             partner.partnerMongoId
//                                           )
//                                         }
//                                       >

//                                         <p className="text-sm font-semibold">
//                                           {
//                                             partner.partnerName
//                                           }
//                                         </p>

//                                         <p className="mt-1 text-[8px] leading-3 text-[#8A9AB0] break-all">
//                                           {
//                                             partner.partnerCode
//                                           }
//                                         </p>

//                                       </div>

//                                     )
//                                   )}

//                                 </div>
//                               ) : (
//                                 <span className="text-[#8294AE]">
//                                   -
//                                 </span>
//                               )}

//                             </td>

//                             <NumberCell
//                               value={
//                                 item.totalCreditsUsed
//                               }
//                               className="font-bold"
//                             />

//                             <NumberCell
//                               value={
//                                 item.totalCreditsReserved
//                               }
//                               className="text-amber-600"
//                             />

//                             <NumberCell
//                               value={
//                                 item.totalCreditsRefunded
//                               }
//                               className="text-emerald-600"
//                             />

//                             <NumberCell
//                               value={
//                                 item
//                                   ?.services
//                                   ?.propertyBoost
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 item
//                                   ?.services
//                                   ?.featured
//                                   ?.credits
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 item
//                                   ?.services
//                                   ?.localityTop
//                                   ?.credits
//                               }
//                             />

//                             <td className="px-2.5 py-[16px] text-center align-middle">

//                               <button
//                                 onClick={() =>
//                                   handlePropertyView(
//                                     item.propertyMongoId
//                                   )
//                                 }
//                                 className="inline-flex h-[34px] max-w-full items-center justify-center gap-1 rounded-[8px] border border-[#D7E0E8] bg-white px-2 text-[9px] font-semibold text-[#35516E] transition hover:border-[#9FB2C3] hover:bg-[#FAFCFD]"
//                               >
//                                 <Eye className="w-3.5 h-3.5" />

//                                 View
//                               </button>

//                             </td>

//                           </tr>

//                         )
//                       )
//                     ) : (
//                       <EmptyRow
//                         columns={
//                           9
//                         }
//                         text="No properties found"
//                       />
//                     )}

//                   </tbody>

//                 </table>

//               </div>
//             )}

//             {/* ==================================================
//                 TRANSACTIONS TABLE
//             ================================================== */}

//             {activeTab ===
//               "transactions" && (
//               <div className="w-full overflow-x-hidden">

//                 <table className="w-full table-fixed border-separate border-spacing-0">

//                   <thead className="bg-[#073A58]">

//                     <tr className="border-y border-[#073A58]">

//                       <TableHeader>
//                         Transaction
//                       </TableHeader>

//                       <TableHeader>
//                         Partner
//                       </TableHeader>

//                       <TableHeader>
//                         Type
//                       </TableHeader>

//                       <TableHeader>
//                         Service
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Amount
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Credits
//                       </TableHeader>

//                       <TableHeader align="right">
//                         Before
//                       </TableHeader>

//                       <TableHeader align="right">
//                         After
//                       </TableHeader>

//                       <TableHeader align="center">
//                         Status
//                       </TableHeader>

//                       <TableHeader>
//                         Date
//                       </TableHeader>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredTransactions
//                       .length >
//                     0 ? (
//                       paginatedTransactions.map(
//                         (
//                           item
//                         ) => (

//                           <tr
//                             key={
//                               item._id
//                             }
//                             className="transition-colors hover:bg-[#FAFCFD]"
//                           >

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <p className="break-all font-mono text-[9px] font-medium leading-4 text-[#294766]">
//                                 {
//                                   item.transactionId
//                                 }
//                               </p>

//                             </td>

//                             <td className="px-2.5 py-[16px] align-middle">

//                               <p className="text-[10px] font-semibold leading-4 text-[#1F3C50] break-words">
//                                 {
//                                   item.partnerName
//                                 }
//                               </p>

//                               <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                                 {
//                                   item.partnerCode
//                                 }
//                               </p>

//                             </td>

//                             <td className="px-2.5 py-[16px] text-[10px] leading-4 text-[#294564] break-words">
//                               {
//                                 item.type
//                               }
//                             </td>

//                             <td className="px-2.5 py-[16px] text-[10px] leading-4 text-[#617A97] break-words">
//                               {item.productCode ||
//                                 "-"}
//                             </td>

//                             <td className="px-2.5 py-[16px] text-right text-[10px] font-semibold text-[#1F3C50] break-words">

//                               {item.amountInRupees
//                                 ? currencyFormat(
//                                     item.amountInRupees
//                                   )
//                                 : "-"}

//                             </td>

//                             <td className="px-2.5 py-[16px] text-right align-middle">

//                               <span
//                                 className={`font-bold ${
//                                   item.direction ===
//                                   "CREDIT"
//                                     ? "text-emerald-600"
//                                     : "text-rose-600"
//                                 }`}
//                               >
//                                 {item.direction ===
//                                 "CREDIT"
//                                   ? "+"
//                                   : "-"}

//                                 {numberFormat(
//                                   item.credits
//                                 )}
//                               </span>

//                             </td>

//                             <NumberCell
//                               value={
//                                 item.balanceBefore
//                               }
//                             />

//                             <NumberCell
//                               value={
//                                 item.balanceAfter
//                               }
//                               className="font-bold"
//                             />

//                             <td className="px-2.5 py-[16px] text-center align-middle">

//                               <StatusBadge
//                                 status={
//                                   item.status
//                                 }
//                               />

//                             </td>

//                             <td className="px-2.5 py-[16px] text-[9px] leading-4 text-[#7086A2] break-words">
//                               {dateFormat(
//                                 item.createdAt
//                               )}
//                             </td>

//                           </tr>

//                         )
//                       )
//                     ) : (
//                       <EmptyRow
//                         columns={
//                           10
//                         }
//                         text="No transactions found"
//                       />
//                     )}

//                   </tbody>

//                 </table>

//               </div>
//             )}

//             {/* ==================================================
//                 PAGINATION
//             ================================================== */}
//             {activeData.length > 0 && (
//               <div className="flex flex-col gap-3 border-t border-[#E5EAF0] bg-white px-[22px] py-4 sm:flex-row sm:items-center sm:justify-between">
//                 <p className="text-[11px] font-medium text-[#8294AE]">
//                   Showing <span className="font-semibold text-[#294766]">{startItem}</span>{" "}
//                   to <span className="font-semibold text-[#294766]">{endItem}</span>{" "}
//                   of <span className="font-semibold text-[#294766]">{activeData.length}</span>{" "}
//                   records
//                 </p>

//                 {totalPages > 1 && (
//                   <div className="flex flex-wrap items-center gap-1.5">
//                     <button
//                       type="button"
//                       onClick={() => handlePageChange(safeCurrentPage - 1)}
//                       disabled={safeCurrentPage === 1}
//                       className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#D8E1EA] bg-white text-[#536C87] transition hover:border-[#00776C] hover:text-[#00776C] disabled:cursor-not-allowed disabled:opacity-40"
//                       aria-label="Previous page"
//                     >
//                       <ChevronLeft className="h-4 w-4" />
//                     </button>

//                     {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//                       (page) => (
//                         <button
//                           type="button"
//                           key={page}
//                           onClick={() => handlePageChange(page)}
//                           className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
//                             safeCurrentPage === page
//                               ? "bg-[#00776C] text-white"
//                               : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       )
//                     )} */}
// {/* PAGE NUMBERS */}
// <div className="flex items-center gap-1.5">

//   {/* First visible page */}
//   <button
//     onClick={() =>
//       handlePageChange(currentPage)
//     }
//     className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
//       currentPage === 1
//         ? "bg-[#00776C] text-white"
//         : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
//     }`}
//   >
//     {currentPage}
//   </button>

//   {/* Second visible page */}
//   {currentPage < totalPages && (
//     <button
//       onClick={() =>
//         handlePageChange(currentPage + 1)
//       }
//       className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
//         currentPage + 1 === currentPage
//           ? "bg-[#00776C] text-white"
//           : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
//       }`}
//     >
//       {currentPage + 1}
//     </button>
//   )}

//   {/* Dots */}
//   {currentPage + 1 < totalPages && (
//     <span className="flex h-9 min-w-7 items-center justify-center text-[11px] font-semibold text-[#8294AE]">
//       ...
//     </span>
//   )}

//   {/* Last page */}
//   {currentPage + 1 < totalPages && (
//     <button
//       onClick={() =>
//         handlePageChange(totalPages)
//       }
//       className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] px-2 text-[11px] font-semibold transition ${
//         currentPage === totalPages
//           ? "bg-[#00776C] text-white"
//           : "border border-[#D8E1EA] bg-white text-[#536C87] hover:border-[#00776C] hover:text-[#00776C]"
//       }`}
//     >
//       {totalPages}
//     </button>
//   )}

// </div>
//                     <button
//                       type="button"
//                       onClick={() => handlePageChange(safeCurrentPage + 1)}
//                       disabled={safeCurrentPage === totalPages}
//                       className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#D8E1EA] bg-white text-[#536C87] transition hover:border-[#00776C] hover:text-[#00776C] disabled:cursor-not-allowed disabled:opacity-40"
//                       aria-label="Next page"
//                     >
//                       <ChevronRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//           </div>

//         </div>

//         {/* ==================================================
//             DETAIL LOADING OVERLAY
//         ================================================== */}

//         {detailLoading && (
//           <div className="fixed inset-0 bg-black/20 z-[80] flex items-center justify-center">

//             <div className="bg-white p-6 rounded-[18px] shadow-xl border border-[#D9E3EE]">

//               <Loader2 className="w-7 h-7 animate-spin text-[#00766C]" />

//             </div>

//           </div>
//         )}

//         {/* ==================================================
//             PARTNER DRAWER
//         ================================================== */}

//         {selectedPartner && (
//           <PartnerDetailDrawer
//             data={
//               selectedPartner
//             }
//             onClose={() =>
//               setSelectedPartner(
//                 null
//               )
//             }
//             numberFormat={
//               numberFormat
//             }
//             dateFormat={
//               dateFormat
//             }
//           />
//         )}

//         {/* ==================================================
//             PROPERTY DRAWER
//         ================================================== */}

//         {selectedProperty && (
//           <PropertyDetailDrawer
//             data={
//               selectedProperty
//             }
//             onClose={() =>
//               setSelectedProperty(
//                 null
//               )
//             }
//             numberFormat={
//               numberFormat
//             }
//             dateFormat={
//               dateFormat
//             }
//           />
//         )}

//       </div>
//     );
//   };

// export default WalletOperationsDashboard;

// // ======================================================
// // STAT CARD
// // Same compact visual format as secondary cards
// // ======================================================

// const StatCard = ({
//   title,
//   value,
//   subtitle,
//   icon,
// }) => {
//   const toneMap = {
//     "Total Credits Sold": "bg-[#EAF4FD] text-[#3E8ED0]",
//     "Credits In Wallets": "bg-[#EAF8F5] text-[#00A78E]",
//     "Credits Used": "bg-[#FFF4E6] text-[#ED9918]",
//     "Credits Refunded": "bg-[#FFF0F1] text-[#EF6468]",
//   };

//   return (
//     <div className="min-h-[118px] rounded-[13px] border border-[#D9E1EA] bg-white px-[20px] py-[18px] shadow-[0_2px_5px_rgba(20,50,80,0.03)]">
//       <div className="flex items-start justify-between gap-4">
//         <div className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[9px] ${toneMap[title] || toneMap["Total Credits Sold"]}`}>
//           {icon}
//         </div>

//         {subtitle && (
//           <span className="max-w-[145px] truncate text-right text-[10px] font-medium text-[#8B99AD]">
//             {subtitle}
//           </span>
//         )}
//       </div>

//       <p className="mt-[16px] text-[10px] font-medium uppercase tracking-[0.3px] text-[#8B99AD]">
//         {title}
//       </p>

//       <p className="mt-[7px] text-[23px] font-semibold leading-none text-[#1F3C50]">
//         {value}
//       </p>
//     </div>
//   );
// };

// // ======================================================
// // SMALL STAT
// // ======================================================

// const SmallStat = ({
//   label,
//   value,
//   icon,
//   tone = "blue",
// }) => {
//   const toneMap = {
//     blue: "bg-[#EAF4FD] text-[#3E8ED0]",
//     orange: "bg-[#FFF4E6] text-[#ED9918]",
//     amber: "bg-[#FFF7E8] text-[#D98A08]",
//     green: "bg-[#EAF8F5] text-[#00A78E]",
//   };

//   return (
//     <div className="min-h-[118px] rounded-[13px] border border-[#D9E1EA] bg-white px-[20px] py-[18px] shadow-[0_2px_5px_rgba(20,50,80,0.03)]">
//       <div className={`flex h-[40px] w-[40px] items-center justify-center rounded-[9px] ${toneMap[tone]}`}>
//         {icon}
//       </div>

//       <p className="mt-[16px] text-[10px] font-medium uppercase tracking-[0.3px] text-[#8B99AD]">
//         {label}
//       </p>

//       <p className="mt-[7px] text-[23px] font-semibold leading-none text-[#1F3C50]">
//         {value}
//       </p>
//     </div>
//   );
// };

// // ======================================================
// // SERVICE CARD
// // ======================================================

// const ServiceCard = ({
//   title,
//   cost,
//   totalCredits,
//   count,
//   properties,
//   partners,
//   icon,
// }) => {
//   const toneMap = {
//     "Property Boost": "bg-[#EAF8F5] text-[#009B88]",
//     "Featured Property": "bg-[#FFF4E6] text-[#EA9618]",
//     "Locality Top": "bg-[#EAF4FD] text-[#438DD0]",
//     "Lead Unlock": "bg-[#F3EDFB] text-[#8157B6]",
//   };

//   return (
//     <div className="border-b border-[#E8EDF2] px-[22px] py-[20px] transition hover:bg-[#FAFCFD] sm:border-r xl:border-b-0 last:border-r-0">
//       <div className="flex items-start justify-between gap-3">
//         <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-[9px] ${toneMap[title] || toneMap["Property Boost"]}`}>
//           {icon}
//         </div>

//         <span className="rounded-full bg-[#F4F7F9] px-2.5 py-1 text-[9px] font-semibold text-[#657A94]">
//           {cost}
//         </span>
//       </div>

//       <p className="mt-[18px] text-[11px] font-medium uppercase tracking-[0.25px] text-[#8192A8]">
//         {title}
//       </p>

//       <div className="mt-[10px] flex items-baseline gap-1.5">
//         <span className="text-[25px] font-semibold leading-none text-[#1F3C50]">
//           {Number(totalCredits || 0).toLocaleString("en-IN")}
//         </span>
//         <span className="text-[10px] text-[#8A9AAF]">credits</span>
//       </div>

//       <div className="mt-[17px] flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#7E90A6]">
//         <span><b className="font-semibold text-[#294766]">{count || 0}</b> uses</span>
//         {properties !== undefined && (
//           <span><b className="font-semibold text-[#294766]">{properties || 0}</b> properties</span>
//         )}
//         {partners !== undefined && (
//           <span><b className="font-semibold text-[#294766]">{partners || 0}</b> partners</span>
//         )}
//       </div>
//     </div>
//   );
// };

// // ======================================================
// // TAB BUTTON
// // ======================================================

// const TabButton = ({
//   active,
//   onClick,
//   icon,
//   children,
// }) => (
//   <button
//     onClick={onClick}
//     className={`relative inline-flex items-center gap-2 whitespace-nowrap pb-[16px] text-[12px] font-semibold transition ${
//       active
//         ? "text-[#00776C]"
//         : "text-[#8B98AC] hover:text-[#546A84]"
//     }`}
//   >
//     {icon}
//     {children}

//     {active && (
//       <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#00776C]" />
//     )}
//   </button>
// );

// // ======================================================
// // TABLE HEADER
// // ======================================================

// const TableHeader = ({
//   children,
//   align = "left",
// }) => (
//   <th
//     className={`border-y border-[#E7ECF1] bg-[#FAFBFC] px-2.5 py-[13px] text-[8px] font-medium uppercase tracking-[0.45px] text-[#8998AD] ${
//       align === "right"
//         ? "text-right"
//         : align === "center"
//         ? "text-center"
//         : "text-left"
//     }`}
//   >
//     <span className="block break-words leading-4">
//       {children}
//     </span>
//   </th>
// );

// // ======================================================
// // NUMBER CELL
// // ======================================================

// const NumberCell = ({
//   value,
//   className = "",
// }) => (
//   <td
//     className={`px-2.5 py-[16px] text-right text-[11px] font-medium text-[#344F6B] break-words ${className}`}
//   >
//     {Number(value || 0).toLocaleString("en-IN")}
//   </td>
// );

// // ======================================================
// // EMPTY ROW
// // ======================================================

// const EmptyRow = ({
//   columns,
//   text,
// }) => (
//   <tr>
//     <td colSpan={columns} className="py-14 text-center text-[13px] text-[#8294AE]">
//       {text}
//     </td>
//   </tr>
// );

// // ======================================================
// // STATUS BADGE
// // ======================================================

// const StatusBadge = ({ status }) => {
//   const styles = {
//     SUCCESS: "bg-[#EAF8F3] text-[#08775E] border-[#CFEDE3]",
//     PENDING: "bg-[#FFF8E9] text-[#D58100] border-[#F6D77F]",
//     FAILED: "bg-[#FFF0F1] text-[#C94A55] border-[#F3CED2]",
//     REFUNDED: "bg-[#EEF5FC] text-[#4E78A2] border-[#D8E6F4]",
//     REVERSED: "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]",
//     Approved: "bg-[#EAF8F3] text-[#08775E] border-[#CFEDE3]",
//     Pending: "bg-[#FFF8E9] text-[#D58100] border-[#F6D77F]",
//     Rejected: "bg-[#FFF0F1] text-[#C94A55] border-[#F3CED2]",
//     Expired: "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]",
//   };

//   return (
//     <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold ${styles[status] || "bg-[#F1F3F5] text-[#607389] border-[#E0E5E9]"}`}>
//       {status || "-"}
//     </span>
//   );
// };

// // ======================================================
// // MINI CARD
// // ======================================================

// const MiniCard = ({ label, value }) => (
//   <div className="bg-[#F8FAFC] border border-[#DDE6EF] rounded-[16px] p-4">
//     <p className="text-[12px] font-semibold text-[#7B90AB]">{label}</p>
//     <p className="text-[22px] font-extrabold text-[#1F3C50] mt-2">{value}</p>
//   </div>
// );

// // ======================================================
// // PARTNER DETAIL DRAWER
// // ======================================================

// const PartnerDetailDrawer =
//   ({
//     data,
//     onClose,
//     numberFormat,
//     dateFormat,
//   }) => {
//     const partner =
//       data?.partner || {};

//     const wallet =
//       data?.wallet || {};

//     const services =
//       data
//         ?.serviceSummary ||
//       {};

//     const history =
//       Array.isArray(
//         data
//           ?.creditHistory
//       )
//         ? data
//             .creditHistory
//         : [];

//     const properties =
//       Array.isArray(
//         data?.properties
//       )
//         ? data.properties
//         : [];

//     return (
//       <div className="fixed inset-0 z-[70] bg-[#1F3C50]/35 backdrop-blur-[1px] flex justify-end">

//         <div className="w-full sm:max-w-2xl h-full bg-white shadow-2xl overflow-y-auto border-l border-[#D9E3EE]">

//           <div className="sticky top-0 z-10 bg-white border-b border-[#D9E3EE] px-5 py-4 flex items-center justify-between">

//             <div>

//               <h2 className="text-[22px] font-extrabold text-[#1F3C50]">
//                 {partner.name ||
//                   "Partner Details"}
//               </h2>

//               <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                 {partner.partnerId}
//               </p>

//             </div>

//             <button
//               onClick={
//                 onClose
//               }
//               className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[#5F7895] hover:bg-[#F3F6F9]"
//             >
//               <X className="w-5 h-5" />
//             </button>

//           </div>

//           <div className="p-5 space-y-6">

//             {/* WALLET */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Wallet Summary
//               </h3>

//               <div className="grid grid-cols-2 gap-3">

//                 <MiniCard
//                   label="Purchased"
//                   value={`${numberFormat(
//                     wallet.totalPurchased
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Available"
//                   value={`${numberFormat(
//                     wallet.balance
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Spent"
//                   value={`${numberFormat(
//                     wallet.totalSpent
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Refunded"
//                   value={`${numberFormat(
//                     wallet.totalRefunded
//                   )} Cr`}
//                 />

//               </div>

//             </div>

//             {/* SERVICES */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Service Usage
//               </h3>

//               <div className="grid grid-cols-2 gap-3">

//                 <MiniCard
//                   label="Boost"
//                   value={`${numberFormat(
//                     services
//                       ?.propertyBoost
//                       ?.credits
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Featured"
//                   value={`${numberFormat(
//                     services
//                       ?.featured
//                       ?.credits
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Locality Top"
//                   value={`${numberFormat(
//                     services
//                       ?.localityTop
//                       ?.credits
//                   )} Cr`}
//                 />

//                 <MiniCard
//                   label="Lead Unlock"
//                   value={`${numberFormat(
//                     services
//                       ?.leadUnlock
//                       ?.credits
//                   )} Cr`}
//                 />

//               </div>

//             </div>

//             {/* PROPERTY PROMOTIONS */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Property Promotion History
//               </h3>

//               <div className="space-y-3">

//                 {properties.length >
//                 0 ? (
//                   properties.map(
//                     (
//                       item
//                     ) => (

//                       <div
//                         key={
//                           item._id
//                         }
//                         className="border border-[#D9E3EE] rounded-[16px] p-4"
//                       >

//                         <div className="flex items-start justify-between gap-3">

//                           <div>

//                             <p className="font-semibold">
//                               {
//                                 item.propertyTitle
//                               }
//                             </p>

//                             <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                               {
//                                 item.propertyCode
//                               }
//                             </p>

//                           </div>

//                           <StatusBadge
//                             status={
//                               item.status
//                             }
//                           />

//                         </div>

//                         <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

//                           <div>

//                             <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                               Service
//                             </p>

//                             <p className="font-bold mt-1 text-[#1F3C50]">
//                               {
//                                 item.promotionType
//                               }
//                             </p>

//                           </div>

//                           <div className="text-right">

//                             <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//                               Credits
//                             </p>

//                             <p className="font-bold mt-1">
//                               {
//                                 item.creditsCharged
//                               }
//                             </p>

//                           </div>

//                         </div>

//                       </div>

//                     )
//                   )
//                 ) : (
//                   <div className="text-sm text-[#8294AE] py-6 text-center border border-dashed rounded-xl">
//                     No property
//                     promotion history
//                   </div>
//                 )}

//               </div>

//             </div>

//             {/* CREDIT HISTORY */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Credit History
//               </h3>

//               <div className="space-y-3">

//                 {history.length >
//                 0 ? (
//                   history.map(
//                     (
//                       item
//                     ) => (

//                       <div
//                         key={
//                           item._id
//                         }
//                         className="border border-[#D9E3EE] rounded-[16px] p-4 flex items-start justify-between gap-4"
//                       >

//                         <div>

//                           <div className="flex items-center gap-2">

//                             <p className="text-[10px] font-semibold leading-4 text-[#1F3C50] break-words">
//                               {
//                                 item.type
//                               }
//                             </p>

//                             <StatusBadge
//                               status={
//                                 item.status
//                               }
//                             />

//                           </div>

//                           <p className="text-[12px] text-[#8294AE] mt-1">
//                             {
//                               item.transactionId
//                             }
//                           </p>

//                           <p className="text-[12px] text-[#8294AE] mt-1">
//                             {dateFormat(
//                               item.createdAt
//                             )}
//                           </p>

//                         </div>

//                         <div className="text-right">

//                           <p
//                             className={`font-extrabold ${
//                               item.direction ===
//                               "CREDIT"
//                                 ? "text-emerald-600"
//                                 : "text-rose-600"
//                             }`}
//                           >
//                             {item.direction ===
//                             "CREDIT"
//                               ? "+"
//                               : "-"}

//                             {numberFormat(
//                               item.credits
//                             )}
//                           </p>

//                           <p className="text-[12px] text-[#8294AE] mt-1">
//                             Balance:{" "}
//                             {numberFormat(
//                               item.balanceAfter
//                             )}
//                           </p>

//                         </div>

//                       </div>

//                     )
//                   )
//                 ) : (
//                   <div className="text-sm text-[#8294AE] text-center border border-dashed rounded-xl py-6">
//                     No credit
//                     transactions
//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     );
//   };

// // ======================================================
// // PROPERTY DETAIL DRAWER
// // ======================================================

// const PropertyDetailDrawer =
//   ({
//     data,
//     onClose,
//     numberFormat,
//     dateFormat,
//   }) => {
//     const property =
//       data?.property || {};

//     const summary =
//       data?.summary || {};

//     const history =
//       Array.isArray(
//         data
//           ?.promotionHistory
//       )
//         ? data
//             .promotionHistory
//         : [];

//     return (
//       <div className="fixed inset-0 z-[70] bg-[#1F3C50]/35 backdrop-blur-[1px] flex justify-end">

//         <div className="w-full sm:max-w-2xl h-full bg-white shadow-2xl overflow-y-auto border-l border-[#D9E3EE]">

//           <div className="sticky top-0 z-10 bg-white border-b border-[#D9E3EE] px-5 py-4 flex justify-between items-center">

//             <div>

//               <h2 className="text-xl font-bold">
//                 {property.title ||
//                   "Property Details"}
//               </h2>

//               <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                 {
//                   property.propertyId
//                 }
//               </p>

//             </div>

//             <button
//               onClick={
//                 onClose
//               }
//               className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[#5F7895] hover:bg-[#F3F6F9]"
//             >
//               <X className="w-5 h-5" />
//             </button>

//           </div>

//           <div className="p-5 space-y-6">

//             {/* SUMMARY */}

//             <div className="grid grid-cols-2 gap-3">

//               <MiniCard
//                 label="Credits Used"
//                 value={
//                   numberFormat(
//                     summary.usedCredits
//                   )
//                 }
//               />

//               <MiniCard
//                 label="Pending Credits"
//                 value={
//                   numberFormat(
//                     summary.pendingCredits
//                   )
//                 }
//               />

//               <MiniCard
//                 label="Refunded"
//                 value={
//                   numberFormat(
//                     summary.refundedCredits
//                   )
//                 }
//               />

//               <MiniCard
//                 label="Total Requests"
//                 value={
//                   numberFormat(
//                     summary.totalRequests
//                   )
//                 }
//               />

//             </div>

//             {/* PROPERTY INFO */}

//             <div className="border border-[#D9E3EE] rounded-[16px] p-4">

//               <h3 className="font-bold mb-3">
//                 Property Information
//               </h3>

//               <div className="grid grid-cols-2 gap-4 text-sm">

//                 <InfoItem
//                   label="Status"
//                   value={
//                     property.status
//                   }
//                 />

//                 <InfoItem
//                   label="Verification"
//                   value={
//                     property.propertyVerificationStatus
//                   }
//                 />

//                 <InfoItem
//                   label="City"
//                   value={
//                     property.city
//                   }
//                 />

//                 <InfoItem
//                   label="Locality"
//                   value={
//                     property.locality
//                   }
//                 />

//               </div>

//             </div>

//             {/* PROMOTION HISTORY */}

//             <div>

//               <h3 className="font-extrabold text-[#1F3C50] mb-3">
//                 Promotion History
//               </h3>

//               <div className="space-y-3">

//                 {history.length >
//                 0 ? (
//                   history.map(
//                     (
//                       item
//                     ) => (

//                       <div
//                         key={
//                           item._id
//                         }
//                         className="border border-[#D9E3EE] rounded-[16px] p-4"
//                       >

//                         <div className="flex justify-between gap-3">

//                           <div>

//                             <p className="font-semibold">
//                               {
//                                 item.promotionType
//                               }
//                             </p>

//                             <p className="mt-1 text-[9px] leading-4 text-[#7A90AC] break-words">
//                               {
//                                 item.partnerName
//                               }{" "}
//                               •{" "}
//                               {
//                                 item.partnerCode
//                               }
//                             </p>

//                           </div>

//                           <StatusBadge
//                             status={
//                               item.status
//                             }
//                           />

//                         </div>

//                         <div className="mt-4 flex items-center justify-between">

//                           <span className="text-sm text-[#7086A2]">
//                             Credits Charged
//                           </span>

//                           <span className="font-extrabold">
//                             {
//                               item.creditsCharged
//                             }
//                           </span>

//                         </div>

//                         <p className="text-[12px] text-[#8294AE] mt-3">
//                           Requested:{" "}
//                           {dateFormat(
//                             item.requestedAt
//                           )}
//                         </p>

//                         {item.approvedAt && (
//                           <p className="text-xs text-emerald-500 mt-1">
//                             Approved:{" "}
//                             {dateFormat(
//                               item.approvedAt
//                             )}
//                           </p>
//                         )}

//                         {item.rejectedAt && (
//                           <p className="text-xs text-rose-500 mt-1">
//                             Rejected:{" "}
//                             {dateFormat(
//                               item.rejectedAt
//                             )}
//                           </p>
//                         )}

//                       </div>

//                     )
//                   )
//                 ) : (
//                   <div className="text-center py-6 border border-dashed rounded-xl text-sm text-[#8294AE]">
//                     No promotion
//                     history
//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     );
//   };

// // ======================================================
// // INFO ITEM
// // ======================================================

// const InfoItem = ({
//   label,
//   value,
// }) => (
//   <div>

//     <p className="text-[9px] leading-4 text-[#8294AE] break-words">
//       {label}
//     </p>

//     <p className="font-bold mt-1 text-[#1F3C50]">
//       {value || "-"}
//     </p>

//   </div>
// );