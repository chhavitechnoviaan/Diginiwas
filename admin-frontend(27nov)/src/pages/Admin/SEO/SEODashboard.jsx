// import { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "../../../Services/axios";
// import {
//   FiActivity,
//   FiArrowUpRight,
//   FiCheckCircle,
//   FiFileText,
//   FiGlobe,
//   FiLink2,
//   FiPlus,
//   FiRefreshCw,
//   FiSave,
//   FiSearch,
//   FiSettings,
//   FiTrash2,
//   FiX,
// } from "react-icons/fi";
// import Swal from "sweetalert2";

// const TABS = [
//   { id: "overview", label: "Overview", icon: FiActivity },
//   { id: "settings", label: "Global Settings", icon: FiSettings },
//   { id: "page", label: "Pages SEO", icon: FiFileText },
//   { id: "property", label: "Property SEO", icon: FiGlobe },
//   { id: "location", label: "Location SEO", icon: FiGlobe },
//   { id: "blog", label: "Blog SEO", icon: FiFileText },
//   { id: "template", label: "SEO Templates", icon: FiSettings },
//   { id: "redirects", label: "Redirect Manager", icon: FiLink2 },
// ];
// const blankEntry = {
//   type: "page",
//   key: "",
//   label: "",
//   path: "/",
//   entityId: "",
//   data: {
//     title: "",
//     description: "",
//     canonical: "",
//     focusKeyword: "",
//     robotsIndex: true,
//     robotsFollow: true,
//     sitemapInclude: true,
//     ogTitle: "",
//     ogDescription: "",
//     ogImage: "",
//     schemaType: "WebPage",
//     customSchema: "",
//     footerVisible: false,
//     footerGroup: "Popular Searches",
//     footerLabel: "",
//     footerOrder: 0,
//   },
// };
// const blankSettings = {
//   siteName: "DigiNiwas",
//   defaultTitle: "DigiNiwas | Buy, Rent & Discover Properties",
//   defaultDescription:
//     "Discover verified properties for sale and rent with DigiNiwas.",
//   defaultOgImage: "",
//   canonicalDomain: "https://www.diginiwas.com",
//   organizationName: "DigiNiwas",
//   logo: "",
//   googleSiteVerification: "",
//   googleAnalyticsId: "",
//   googleTagManagerId: "",
//   propertyTitleTemplate: "{property_name} in {locality}, {city} | DigiNiwas",
//   locationTitleTemplate: "Properties in {locality}, {city} | DigiNiwas",
//   blogTitleTemplate: "{post_title} | DigiNiwas",
// };
// const inputClass =
//   "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50";
// const labelClass =
//   "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";
// const Card = ({ children, className = "" }) => (
//   <div
//     className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
//   >
//     {children}
//   </div>
// );
// const Field = ({ label, children, className = "" }) => (
//   <label className={`block ${className}`}>
//     <span className={labelClass}>{label}</span>
//     {children}
//   </label>
// );

// export default function SEODashboard() {
//   const [tab, setTab] = useState("overview");
//   const [dashboard, setDashboard] = useState({});
//   const [settings, setSettings] = useState(blankSettings);
//   const [entries, setEntries] = useState([]);
//   const [redirects, setRedirects] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [editorOpen, setEditorOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [entry, setEntry] = useState(blankEntry);
//   const [redirectForm, setRedirectForm] = useState({
//     source: "",
//     destination: "",
//     statusCode: 301,
//     active: true,
//   });

//   const request = useCallback(async (method, url, data) => {
//     const response = await axios({ method, url, data });
//     return response.data;
//   }, []);
//   const loadDashboard = useCallback(async () => {
//     try {
//       const r = await request("get", "/seo/admin/dashboard");
//       setDashboard(r.data || {});
//     } catch (e) {
//       console.error(e);
//     }
//   }, [request]);
//   const loadSettings = useCallback(async () => {
//     try {
//       const r = await request("get", "/seo/admin/settings");
//       setSettings({ ...blankSettings, ...(r.data || {}) });
//     } catch (e) {
//       console.error(e);
//     }
//   }, [request]);
//   const loadEntries = useCallback(
//     async (type = tab, searchValue = search) => {
//       if (!["page", "property", "location", "blog", "template"].includes(type))
//         return;
//       setLoading(true);
//       try {
//         const r = await request(
//           "get",
//           `/seo/admin/entries?type=${type}&search=${encodeURIComponent(searchValue)}`,
//         );
//         setEntries(r.data || []);
//       } catch (e) {
//         Swal.fire({
//           icon: "error",
//           title: "Unable to load SEO records",
//           text: e.response?.data?.message || e.message,
//         });
//       } finally {
//         setLoading(false);
//       }
//     },
//     [request, tab, search],
//   );
//   const loadRedirects = useCallback(async () => {
//     setLoading(true);
//     try {
//       const r = await request("get", "/seo/admin/redirects");
//       setRedirects(r.data || []);
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Unable to load redirects",
//         text: e.response?.data?.message || e.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [request]);

//   useEffect(() => {
//     loadDashboard();
//     loadSettings();
//   }, [loadDashboard, loadSettings]);
//   useEffect(() => {
//     if (["page", "property", "location", "blog", "template"].includes(tab))
//       loadEntries(tab, "");
//     if (tab === "redirects") loadRedirects();
//   }, [tab, loadEntries, loadRedirects]);

//   const openNewEntry = () => {
//     setEditingId(null);
//     setEntry({ ...blankEntry, type: tab, data: { ...blankEntry.data } });
//     setEditorOpen(true);
//   };
//   const openEditEntry = (item) => {
//     setEditingId(item._id);
//     setEntry({
//       ...blankEntry,
//       ...item,
//       data: {
//         ...blankEntry.data,
//         ...(item.data || {}),
//         customSchema: item.data?.customSchema
//           ? JSON.stringify(item.data.customSchema, null, 2)
//           : "",
//       },
//     });
//     setEditorOpen(true);
//   };
//   const updateEntryData = (key, value) =>
//     setEntry((old) => ({ ...old, data: { ...old.data, [key]: value } }));
//   const saveEntry = async (event) => {
//     event.preventDefault();
//     setSaving(true);
//     try {
//       const payload = { ...entry, data: { ...entry.data } };
//       if (payload.data.customSchema) {
//         try {
//           payload.data.customSchema = JSON.parse(payload.data.customSchema);
//         } catch {
//           throw new Error("Custom Schema valid JSON hona chahiye.");
//         }
//       } else payload.data.customSchema = null;
//       await request(
//         editingId ? "put" : "post",
//         editingId ? `/seo/admin/entries/${editingId}` : "/seo/admin/entries",
//         payload,
//       );
//       setEditorOpen(false);
//       await loadEntries(tab, "");
//       await loadDashboard();
//       Swal.fire({
//         icon: "success",
//         title: "SEO saved",
//         text: "SEO record successfully save ho gaya.",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Save failed",
//         text: e.response?.data?.message || e.message,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };
//   const deleteEntry = async (item) => {
//     const result = await Swal.fire({
//       icon: "warning",
//       title: "Delete SEO record?",
//       text: `${item.label || item.path} will be removed.`,
//       showCancelButton: true,
//       confirmButtonText: "Delete",
//       confirmButtonColor: "#dc2626",
//     });
//     if (!result.isConfirmed) return;
//     try {
//       await request("delete", `/seo/admin/entries/${item._id}`);
//       await loadEntries(tab, "");
//       await loadDashboard();
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: e.response?.data?.message || e.message,
//       });
//     }
//   };
//   const saveSettings = async (event) => {
//     event.preventDefault();
//     setSaving(true);
//     try {
//       await request("put", "/seo/admin/settings", settings);
//       await loadDashboard();
//       Swal.fire({
//         icon: "success",
//         title: "Settings saved",
//         timer: 1400,
//         showConfirmButton: false,
//       });
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Unable to save settings",
//         text: e.response?.data?.message || e.message,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };
//   const saveRedirect = async (event) => {
//     event.preventDefault();
//     setSaving(true);
//     try {
//       await request("post", "/seo/admin/redirects", redirectForm);
//       setRedirectForm({
//         source: "",
//         destination: "",
//         statusCode: 301,
//         active: true,
//       });
//       await loadRedirects();
//       await loadDashboard();
//       Swal.fire({
//         icon: "success",
//         title: "Redirect saved",
//         timer: 1300,
//         showConfirmButton: false,
//       });
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Redirect not saved",
//         text: e.response?.data?.message || e.message,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };
//   const deleteRedirect = async (item) => {
//     const result = await Swal.fire({
//       icon: "warning",
//       title: "Delete redirect?",
//       showCancelButton: true,
//       confirmButtonText: "Delete",
//       confirmButtonColor: "#dc2626",
//     });
//     if (!result.isConfirmed) return;
//     try {
//       await request("delete", `/seo/admin/redirects/${item._id}`);
//       await loadRedirects();
//       await loadDashboard();
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Unable to delete",
//         text: e.response?.data?.message || e.message,
//       });
//     }
//   };

//   const filteredEntries = useMemo(() => entries, [entries]);
//   const metricCards = [
//     {
//       label: "SEO Records",
//       value: dashboard.configuredEntries ?? 0,
//       note: "Custom page metadata",
//       icon: FiFileText,
//     },
//     {
//       label: "Missing Titles",
//       value: dashboard.missingTitle ?? 0,
//       note: "Records to review",
//       icon: FiActivity,
//     },
//     {
//       label: "Missing Descriptions",
//       value: dashboard.missingDescription ?? 0,
//       note: "Records to optimize",
//       icon: FiGlobe,
//     },
//     {
//       label: "Active Redirects",
//       value: dashboard.activeRedirects ?? 0,
//       note: "301 / 308 rules",
//       icon: FiLink2,
//     },
//   ];

//   return (
//     <div className="min-h-full bg-slate-50 p-1 sm:p-6 lg:p-18">
//       <div className="mx-auto max-w-[1600px] space-y-6">
//         <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-teal-700">
//               <span className="h-2 w-2 rounded-full bg-teal-500" /> DigiNiwas
//               Control Center
//             </div>
//             <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//               SEO Management
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Manage search metadata, indexability, templates and redirects from
//               one place.
//             </p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <a
//               href="/sitemap.xml"
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-teal-300"
//             >
//               <FiArrowUpRight /> Open sitemap
//             </a>
//             <button
//               onClick={() => {
//                 loadDashboard();
//                 if (tab === "redirects") loadRedirects();
//                 else if (
//                   ["page", "property", "location", "blog", "template"].includes(
//                     tab,
//                   )
//                 )
//                   loadEntries(tab, search);
//               }}
//               className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
//             >
//               <FiRefreshCw /> Refresh
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
//           {metricCards.map((m) => {
//             const Icon = m.icon;
//             return (
//               <Card key={m.label} className="p-4 sm:p-5">
//                 <div className="flex items-start justify-between">
//                   <span className="text-xs font-semibold text-slate-500 sm:text-sm">
//                     {m.label}
//                   </span>
//                   <span className="rounded-xl bg-teal-50 p-2 text-teal-700">
//                     <Icon size={18} />
//                   </span>
//                 </div>
//                 <div className="mt-3 text-2xl font-bold text-slate-900">
//                   {m.value}
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">{m.note}</p>
//               </Card>
//             );
//           })}
//         </div>

//         <div className="grid gap-5 lg:grid-cols-[245px_minmax(0,1fr)]">
//           <Card className="h-fit p-2">
//             <div className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">
//               SEO Workspace
//             </div>
//             <nav className="space-y-1">
//               {TABS.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => {
//                       setTab(item.id);
//                       setSearch("");
//                     }}
//                     className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${tab === item.id ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-50"}`}
//                   >
//                     <Icon size={17} />
//                     {item.label}
//                     {tab === item.id && (
//                       <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-600" />
//                     )}
//                   </button>
//                 );
//               })}
//             </nav>
//             <div className="m-2 mt-4 rounded-xl bg-slate-50 p-3">
//               <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
//                 <FiCheckCircle className="text-teal-600" /> Centralized SEO
//               </div>
//               <p className="mt-1 text-[11px] leading-5 text-slate-500">
//                 Custom metadata is resolved by URL path. Make sure the
//                 production API and website use the same backend.
//               </p>
//             </div>
//           </Card>

//           <div className="min-w-0 space-y-5">
//             {tab === "overview" && (
//               <>
//                 <Card className="p-5 sm:p-6">
//                   <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//                     <div>
//                       <h2 className="text-lg font-bold text-slate-900">
//                         SEO health overview
//                       </h2>
//                       <p className="mt-1 text-sm text-slate-500">
//                         A quick check of your current SEO configuration.
//                       </p>
//                     </div>
//                     <span
//                       className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${dashboard.globalSettingsConfigured ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
//                     >
//                       {dashboard.globalSettingsConfigured
//                         ? "Global settings configured"
//                         : "Global settings not configured"}
//                     </span>
//                   </div>
//                   <div className="mt-5 grid gap-3 sm:grid-cols-2">
//                     <div className="rounded-xl border border-slate-100 p-4">
//                       <div className="text-sm font-semibold text-slate-800">
//                         Live properties
//                       </div>
//                       <div className="mt-2 text-2xl font-bold">
//                         {dashboard.liveProperties ?? 0}
//                       </div>
//                       <p className="mt-1 text-xs text-slate-500">
//                         Properties eligible for public SEO resolution.
//                       </p>
//                     </div>
//                     <div className="rounded-xl border border-slate-100 p-4">
//                       <div className="text-sm font-semibold text-slate-800">
//                         Property descriptions missing
//                       </div>
//                       <div className="mt-2 text-2xl font-bold">
//                         {dashboard.propertyMissingDescription ?? 0}
//                       </div>
//                       <p className="mt-1 text-xs text-slate-500">
//                         Live properties without a description.
//                       </p>
//                     </div>
//                     <div className="rounded-xl border border-slate-100 p-4">
//                       <div className="text-sm font-semibold text-slate-800">
//                         Properties without images
//                       </div>
//                       <div className="mt-2 text-2xl font-bold">
//                         {dashboard.propertyMissingImageAlt ?? 0}
//                       </div>
//                       <p className="mt-1 text-xs text-slate-500">
//                         Image presence check; alt text needs a separate audit.
//                       </p>
//                     </div>
//                     <div className="rounded-xl border border-slate-100 p-4">
//                       <div className="text-sm font-semibold text-slate-800">
//                         Redirects
//                       </div>
//                       <div className="mt-2 text-2xl font-bold">
//                         {dashboard.activeRedirects ?? 0}
//                       </div>
//                       <p className="mt-1 text-xs text-slate-500">
//                         Active redirect rules currently stored.
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//                 <Card className="p-5">
//                   <h3 className="font-bold text-slate-900">
//                     Recommended setup order
//                   </h3>
//                   <div className="mt-4 grid gap-3 md:grid-cols-3">
//                     {[
//                       {
//                         n: "01",
//                         t: "Set global defaults",
//                         d: "Add your canonical domain, default title, description and OG image.",
//                       },
//                       {
//                         n: "02",
//                         t: "Add page-specific SEO",
//                         d: "Create a unique SEO record for important pages and landing URLs.",
//                       },
//                       {
//                         n: "03",
//                         t: "Validate crawl access",
//                         d: "Check sitemap.xml, robots.txt, canonical URLs and rendered metadata.",
//                       },
//                     ].map((x) => (
//                       <div key={x.n} className="rounded-xl bg-slate-50 p-4">
//                         <div className="text-xs font-bold text-teal-700">
//                           {x.n}
//                         </div>
//                         <div className="mt-2 text-sm font-bold text-slate-800">
//                           {x.t}
//                         </div>
//                         <p className="mt-1 text-xs leading-5 text-slate-500">
//                           {x.d}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </>
//             )}

//             {tab === "settings" && (
//               <Card className="p-5 sm:p-6">
//                 <div className="mb-5">
//                   <h2 className="text-lg font-bold text-slate-900">
//                     Global SEO Settings
//                   </h2>
//                   <p className="mt-1 text-sm text-slate-500">
//                     These values are fallbacks when a page does not have custom
//                     SEO.
//                   </p>
//                 </div>
//                 <form onSubmit={saveSettings} className="space-y-5">
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <Field label="Site name">
//                       <input
//                         className={inputClass}
//                         value={settings.siteName || ""}
//                         onChange={(e) =>
//                           setSettings({ ...settings, siteName: e.target.value })
//                         }
//                       />
//                     </Field>
//                     <Field label="Canonical domain">
//                       <input
//                         className={inputClass}
//                         placeholder="https://www.diginiwas.com"
//                         value={settings.canonicalDomain || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             canonicalDomain: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="Default SEO title">
//                       <input
//                         className={inputClass}
//                         maxLength={80}
//                         value={settings.defaultTitle || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             defaultTitle: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="Organization name">
//                       <input
//                         className={inputClass}
//                         value={settings.organizationName || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             organizationName: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="Default OG image URL">
//                       <input
//                         className={inputClass}
//                         placeholder="https://.../image.webp"
//                         value={settings.defaultOgImage || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             defaultOgImage: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="Logo URL">
//                       <input
//                         className={inputClass}
//                         value={settings.logo || ""}
//                         onChange={(e) =>
//                           setSettings({ ...settings, logo: e.target.value })
//                         }
//                       />
//                     </Field>
//                     <Field label="Google Search Console verification">
//                       <input
//                         className={inputClass}
//                         value={settings.googleSiteVerification || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             googleSiteVerification: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="Google Analytics ID">
//                       <input
//                         className={inputClass}
//                         placeholder="G-XXXXXXXXXX"
//                         value={settings.googleAnalyticsId || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             googleAnalyticsId: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="Google Tag Manager ID">
//                       <input
//                         className={inputClass}
//                         placeholder="GTM-XXXXXXX"
//                         value={settings.googleTagManagerId || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             googleTagManagerId: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field
//                       label="Default meta description"
//                       className="md:col-span-2"
//                     >
//                       <textarea
//                         rows={3}
//                         maxLength={320}
//                         className={inputClass}
//                         value={settings.defaultDescription || ""}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             defaultDescription: e.target.value,
//                           })
//                         }
//                       />
//                       <span className="mt-1 block text-right text-[11px] text-slate-400">
//                         {(settings.defaultDescription || "").length}/320
//                       </span>
//                     </Field>
//                   </div>
//                   <div className="border-t border-slate-100 pt-4">
//                     <h3 className="mb-3 text-sm font-bold text-slate-800">
//                       Dynamic SEO templates
//                     </h3>
//                     <div className="grid gap-4">
//                       <Field label="Property title template">
//                         <input
//                           className={inputClass}
//                           value={settings.propertyTitleTemplate || ""}
//                           onChange={(e) =>
//                             setSettings({
//                               ...settings,
//                               propertyTitleTemplate: e.target.value,
//                             })
//                           }
//                         />
//                         <span className="mt-1 block text-xs text-slate-400">
//                           Variables: {"{property_name}"}, {"{locality}"},{" "}
//                           {"{city}"}
//                         </span>
//                       </Field>
//                       <Field label="Location title template">
//                         <input
//                           className={inputClass}
//                           value={settings.locationTitleTemplate || ""}
//                           onChange={(e) =>
//                             setSettings({
//                               ...settings,
//                               locationTitleTemplate: e.target.value,
//                             })
//                           }
//                         />
//                         <span className="mt-1 block text-xs text-slate-400">
//                           Variables: {"{locality}"}, {"{city}"}
//                         </span>
//                       </Field>
//                       <Field label="Blog title template">
//                         <input
//                           className={inputClass}
//                           value={settings.blogTitleTemplate || ""}
//                           onChange={(e) =>
//                             setSettings({
//                               ...settings,
//                               blogTitleTemplate: e.target.value,
//                             })
//                           }
//                         />
//                         <span className="mt-1 block text-xs text-slate-400">
//                           Variable: {"{post_title}"}
//                         </span>
//                       </Field>
//                     </div>
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       disabled={saving}
//                       className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
//                     >
//                       <FiSave />
//                       {saving ? "Saving..." : "Save Global Settings"}
//                     </button>
//                   </div>
//                 </form>
//               </Card>
//             )}

//             {["page", "property", "location", "blog", "template"].includes(
//               tab,
//             ) && (
//               <Card className="overflow-hidden">
//                 <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
//                   <div>
//                     <h2 className="text-lg font-bold text-slate-900">
//                       {TABS.find((x) => x.id === tab)?.label}
//                     </h2>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Create, edit and control metadata for individual URLs.
//                     </p>
//                   </div>
//                   <button
//                     onClick={openNewEntry}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white"
//                   >
//                     <FiPlus /> Add SEO record
//                   </button>
//                 </div>
//                 <div className="border-b border-slate-100 p-4">
//                   <div className="relative max-w-md">
//                     <FiSearch className="absolute left-3 top-3 text-slate-400" />
//                     <input
//                       className={`${inputClass} pl-9`}
//                       placeholder="Search by page name, key or URL..."
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           e.preventDefault();
//                           loadEntries(tab, search);
//                         }
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                   {loading ? (
//                     <div className="p-10 text-center text-sm text-slate-500">
//                       Loading SEO records...
//                     </div>
//                   ) : (
//                     <table className="w-full min-w-[720px] text-left text-sm">
//                       <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
//                         <tr>
//                           <th className="px-5 py-3">Page / Record</th>
//                           <th className="px-5 py-3">SEO title</th>
//                           <th className="px-5 py-3">Indexing</th>
//                           <th className="px-5 py-3">Updated</th>
//                           <th className="px-5 py-3 text-right">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-slate-100">
//                         {filteredEntries.map((item) => (
//                           <tr key={item._id} className="hover:bg-slate-50/70">
//                             <td className="px-5 py-4">
//                               <div className="font-semibold text-slate-800">
//                                 {item.label || item.key}
//                               </div>
//                               <div className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
//                                 {item.path || item.key}
//                               </div>
//                             </td>
//                             <td className="max-w-[260px] px-5 py-4">
//                               <div className="truncate font-medium text-slate-700">
//                                 {item.data?.title || "— Uses fallback —"}
//                               </div>
//                               <div className="mt-1 max-w-[250px] truncate text-xs text-slate-400">
//                                 {item.data?.description ||
//                                   "No custom description"}
//                               </div>
//                             </td>
//                             <td className="px-5 py-4">
//                               <span
//                                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.data?.robotsIndex === false ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
//                               >
//                                 {item.data?.robotsIndex === false
//                                   ? "Noindex"
//                                   : "Index"}
//                               </span>
//                             </td>
//                             <td className="px-5 py-4 text-xs text-slate-500">
//                               {item.updatedAt
//                                 ? new Date(item.updatedAt).toLocaleDateString()
//                                 : "—"}
//                             </td>
//                             <td className="px-5 py-4">
//                               <div className="flex justify-end gap-2">
//                                 <button
//                                   onClick={() => openEditEntry(item)}
//                                   className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:border-teal-400 hover:text-teal-700"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => deleteEntry(item)}
//                                   aria-label="Delete SEO record"
//                                   className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
//                                 >
//                                   <FiTrash2 size={14} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                         {!filteredEntries.length && (
//                           <tr>
//                             <td
//                               colSpan={5}
//                               className="p-10 text-center text-sm text-slate-500"
//                             >
//                               No SEO records yet. Click “Add SEO record” to
//                               create one.
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   )}
//                 </div>
//               </Card>
//             )}

//             {tab === "redirects" && (
//               <>
//                 <Card className="p-5">
//                   <h2 className="text-lg font-bold text-slate-900">
//                     Create redirect
//                   </h2>
//                   <p className="mt-1 text-sm text-slate-500">
//                     Use a permanent redirect when a public page slug changes.
//                   </p>
//                   <form
//                     onSubmit={saveRedirect}
//                     className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_150px_auto] md:items-end"
//                   >
//                     <Field label="Old path">
//                       <input
//                         required
//                         className={inputClass}
//                         placeholder="/old-property-slug"
//                         value={redirectForm.source}
//                         onChange={(e) =>
//                           setRedirectForm({
//                             ...redirectForm,
//                             source: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="New path">
//                       <input
//                         required
//                         className={inputClass}
//                         placeholder="/property/123/new-slug"
//                         value={redirectForm.destination}
//                         onChange={(e) =>
//                           setRedirectForm({
//                             ...redirectForm,
//                             destination: e.target.value,
//                           })
//                         }
//                       />
//                     </Field>
//                     <Field label="Status code">
//                       <select
//                         className={inputClass}
//                         value={redirectForm.statusCode}
//                         onChange={(e) =>
//                           setRedirectForm({
//                             ...redirectForm,
//                             statusCode: Number(e.target.value),
//                           })
//                         }
//                       >
//                         <option value={301}>301 Permanent</option>
//                         <option value={308}>308 Permanent</option>
//                       </select>
//                     </Field>
//                     <button
//                       disabled={saving}
//                       className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white disabled:opacity-50"
//                     >
//                       <FiPlus /> Add redirect
//                     </button>
//                   </form>
//                 </Card>
//                 <Card className="overflow-hidden">
//                   <div className="border-b border-slate-100 p-5">
//                     <h3 className="font-bold text-slate-900">
//                       Saved redirects ({redirects.length})
//                     </h3>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="w-full min-w-[650px] text-left text-sm">
//                       <thead className="bg-slate-50 text-[11px] uppercase text-slate-500">
//                         <tr>
//                           <th className="px-5 py-3">Source</th>
//                           <th className="px-5 py-3">Destination</th>
//                           <th className="px-5 py-3">Type</th>
//                           <th className="px-5 py-3">Status</th>
//                           <th className="px-5 py-3 text-right">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-slate-100">
//                         {redirects.map((r) => (
//                           <tr key={r._id}>
//                             <td className="px-5 py-4 font-medium text-slate-700">
//                               {r.source}
//                             </td>
//                             <td className="px-5 py-4 text-slate-500">
//                               {r.destination}
//                             </td>
//                             <td className="px-5 py-4">{r.statusCode}</td>
//                             <td className="px-5 py-4">
//                               <span
//                                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
//                               >
//                                 {r.active ? "Active" : "Inactive"}
//                               </span>
//                             </td>
//                             <td className="px-5 py-4 text-right">
//                               <button
//                                 onClick={() => deleteRedirect(r)}
//                                 className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
//                               >
//                                 <FiTrash2 size={14} />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                         {!redirects.length && (
//                           <tr>
//                             <td
//                               colSpan={5}
//                               className="p-8 text-center text-sm text-slate-500"
//                             >
//                               No redirects created yet.
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </Card>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {editorOpen && (
//         <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5">
//           <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
//             <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   {editingId ? "Edit SEO record" : "Create SEO record"}
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Fields save to the backend and are resolved by the public SEO
//                   API.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setEditorOpen(false)}
//                 className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
//               >
//                 <FiX size={20} />
//               </button>
//             </div>
//             <form onSubmit={saveEntry} className="space-y-5 p-5 sm:p-7">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <Field label="Record type">
//                   <select
//                     disabled={Boolean(editingId)}
//                     className={inputClass}
//                     value={entry.type}
//                     onChange={(e) =>
//                       setEntry({ ...entry, type: e.target.value })
//                     }
//                   >
//                     <option value="page">Page SEO</option>
//                     <option value="property">Property SEO</option>
//                     <option value="location">Location SEO</option>
//                     <option value="blog">Blog SEO</option>
//                     <option value="template">Template</option>
//                   </select>
//                 </Field>
//                 <Field label="Display name">
//                   <input
//                     required
//                     className={inputClass}
//                     placeholder="Indore landing page"
//                     value={entry.label}
//                     onChange={(e) =>
//                       setEntry({ ...entry, label: e.target.value })
//                     }
//                   />
//                 </Field>
//                 <Field label="Unique key">
//                   <input
//                     required
//                     className={inputClass}
//                     placeholder="indore-landing"
//                     value={entry.key}
//                     onChange={(e) =>
//                       setEntry({ ...entry, key: e.target.value })
//                     }
//                   />
//                   <span className="mt-1 block text-[11px] text-slate-400">
//                     Must be unique for this record type.
//                   </span>
//                 </Field>
//                 <Field label="Page path">
//                   <input
//                     required
//                     className={inputClass}
//                     placeholder="/indore"
//                     value={entry.path}
//                     onChange={(e) =>
//                       setEntry({ ...entry, path: e.target.value })
//                     }
//                   />
//                 </Field>
//                 <Field label="Entity ID (optional)">
//                   <input
//                     className={inputClass}
//                     placeholder="Property or blog database ID"
//                     value={entry.entityId || ""}
//                     onChange={(e) =>
//                       setEntry({ ...entry, entityId: e.target.value })
//                     }
//                   />
//                 </Field>
//                 {entry.type === "location" && (
//                   <>
//                     <Field label="Footer link label">
//                       <input
//                         className={inputClass}
//                         placeholder="Commercial Property for Sale in Indore"
//                         value={entry.data.footerLabel || ""}
//                         onChange={(e) =>
//                           updateEntryData("footerLabel", e.target.value)
//                         }
//                       />
//                     </Field>
//                     <Field label="Footer group">
//                       <select
//                         className={inputClass}
//                         value={entry.data.footerGroup || "Popular Searches"}
//                         onChange={(e) =>
//                           updateEntryData("footerGroup", e.target.value)
//                         }
//                       >
//                         {[
//                           "For Buyers",
//                           "For Tenants",
//                           "Projects",
//                           "Popular Searches",
//                         ].map((x) => (
//                           <option key={x}>{x}</option>
//                         ))}
//                       </select>
//                     </Field>
//                     <Field label="Footer order">
//                       <input
//                         type="number"
//                         min="0"
//                         className={inputClass}
//                         value={entry.data.footerOrder ?? 0}
//                         onChange={(e) =>
//                           updateEntryData("footerOrder", Number(e.target.value))
//                         }
//                       />
//                     </Field>
//                     <label className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
//                       <input
//                         type="checkbox"
//                         checked={entry.data.footerVisible === true}
//                         onChange={(e) =>
//                           updateEntryData("footerVisible", e.target.checked)
//                         }
//                       />{" "}
//                       Show this landing page in website footer
//                     </label>
//                   </>
//                 )}
//                 <Field label="SEO title">
//                   <input
//                     className={inputClass}
//                     maxLength={100}
//                     value={entry.data.title || ""}
//                     onChange={(e) => updateEntryData("title", e.target.value)}
//                   />
//                 </Field>
//                 <Field label="Meta description" className="md:col-span-2">
//                   <textarea
//                     rows={3}
//                     maxLength={320}
//                     className={inputClass}
//                     value={entry.data.description || ""}
//                     onChange={(e) =>
//                       updateEntryData("description", e.target.value)
//                     }
//                   />
//                   <span className="mt-1 block text-right text-[11px] text-slate-400">
//                     {(entry.data.description || "").length}/320
//                   </span>
//                 </Field>
//                 <Field label="Canonical URL">
//                   <input
//                     className={inputClass}
//                     placeholder="https://www.diginiwas.com/indore"
//                     value={entry.data.canonical || ""}
//                     onChange={(e) =>
//                       updateEntryData("canonical", e.target.value)
//                     }
//                   />
//                 </Field>
//                 <Field label="Focus keyword">
//                   <input
//                     className={inputClass}
//                     value={entry.data.focusKeyword || ""}
//                     onChange={(e) =>
//                       updateEntryData("focusKeyword", e.target.value)
//                     }
//                   />
//                 </Field>
//                 <Field label="Open Graph title">
//                   <input
//                     className={inputClass}
//                     value={entry.data.ogTitle || ""}
//                     onChange={(e) => updateEntryData("ogTitle", e.target.value)}
//                   />
//                 </Field>
//                 <Field label="Open Graph description">
//                   <input
//                     className={inputClass}
//                     value={entry.data.ogDescription || ""}
//                     onChange={(e) =>
//                       updateEntryData("ogDescription", e.target.value)
//                     }
//                   />
//                 </Field>
//                 <Field label="Open Graph image URL" className="md:col-span-2">
//                   <input
//                     className={inputClass}
//                     placeholder="https://.../social-share.webp"
//                     value={entry.data.ogImage || ""}
//                     onChange={(e) => updateEntryData("ogImage", e.target.value)}
//                   />
//                 </Field>
//                 <Field label="Schema type">
//                   <select
//                     className={inputClass}
//                     value={entry.data.schemaType || "WebPage"}
//                     onChange={(e) =>
//                       updateEntryData("schemaType", e.target.value)
//                     }
//                   >
//                     {[
//                       "WebPage",
//                       "WebSite",
//                       "CollectionPage",
//                       "Article",
//                       "BlogPosting",
//                       "Residence",
//                       "Organization",
//                       "LocalBusiness",
//                       "BreadcrumbList",
//                       "FAQPage",
//                     ].map((x) => (
//                       <option key={x}>{x}</option>
//                     ))}
//                   </select>
//                 </Field>
//                 <Field label="Custom schema JSON-LD">
//                   <textarea
//                     rows={4}
//                     className={`${inputClass} font-mono text-xs`}
//                     placeholder={
//                       '{\n  "@context": "https://schema.org",\n  "@type": "WebPage"\n}'
//                     }
//                     value={entry.data.customSchema || ""}
//                     onChange={(e) =>
//                       updateEntryData("customSchema", e.target.value)
//                     }
//                   />
//                 </Field>
//               </div>
//               <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
//                 {[
//                   {
//                     key: "robotsIndex",
//                     title: "Allow indexing",
//                     desc: "Search engines may index this URL.",
//                   },
//                   {
//                     key: "robotsFollow",
//                     title: "Follow links",
//                     desc: "Search engines may follow page links.",
//                   },
//                   {
//                     key: "sitemapInclude",
//                     title: "Include in sitemap",
//                     desc: "Include URL in eligible URL registry.",
//                   },
//                 ].map((x) => (
//                   <label
//                     key={x.key}
//                     className="flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3"
//                   >
//                     <input
//                       type="checkbox"
//                       className="mt-1 accent-teal-700"
//                       checked={entry.data[x.key] !== false}
//                       onChange={(e) => updateEntryData(x.key, e.target.checked)}
//                     />
//                     <span>
//                       <span className="block text-sm font-semibold text-slate-800">
//                         {x.title}
//                       </span>
//                       <span className="mt-1 block text-xs leading-4 text-slate-500">
//                         {x.desc}
//                       </span>
//                     </span>
//                   </label>
//                 ))}
//               </div>
//               <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setEditorOpen(false)}
//                   className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   disabled={saving}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
//                 >
//                   <FiSave />
//                   {saving ? "Saving..." : "Save SEO record"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "../../../Services/axios";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheckCircle,
  FiFileText,
  FiGlobe,
  FiLink2,
  FiMap,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiSettings,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";

const TABS = [
  { id: "overview", label: "Overview", icon: FiActivity },
  { id: "settings", label: "Global Settings", icon: FiSettings },
  { id: "page", label: "Pages SEO", icon: FiFileText },
  { id: "property", label: "Property SEO", icon: FiGlobe },
  { id: "location", label: "Location SEO", icon: FiGlobe },
  { id: "blog", label: "Blog SEO", icon: FiFileText },
  { id: "template", label: "SEO Templates", icon: FiSettings },
  { id: "redirects", label: "Redirect Manager", icon: FiLink2 },
  { id: "sitemap", label: "Sitemap", icon: FiMap },
];
const blankEntry = {
  type: "page",
  key: "",
  label: "",
  path: "/",
  entityId: "",
  data: {
    title: "",
    description: "",
    canonical: "",
    focusKeyword: "",
    robotsIndex: true,
    robotsFollow: true,
    sitemapInclude: true,
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    schemaType: "WebPage",
    customSchema: "",
    footerVisible: false,
    footerGroup: "Popular Searches",
    footerLabel: "",
    footerOrder: 0,
  },
};
const blankSettings = {
  siteName: "DigiNiwas",
  defaultTitle: "DigiNiwas | Buy, Rent & Discover Properties",
  defaultDescription:
    "Discover verified properties for sale and rent with DigiNiwas.",
  defaultOgImage: "",
  canonicalDomain: "https://www.diginiwas.com",
  organizationName: "DigiNiwas",
  logo: "",
  googleSiteVerification: "",
  googleAnalyticsId: "",
  googleTagManagerId: "",
  propertyTitleTemplate: "{property_name} in {locality}, {city} | DigiNiwas",
  locationTitleTemplate: "Properties in {locality}, {city} | DigiNiwas",
  blogTitleTemplate: "{post_title} | DigiNiwas",
};
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50";
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);
const Field = ({ label, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className={labelClass}>{label}</span>
    {children}
  </label>
);

export default function SEODashboard() {
  const [tab, setTab] = useState("overview");
  const [dashboard, setDashboard] = useState({});
  const [settings, setSettings] = useState(blankSettings);
  const [entries, setEntries] = useState([]);
  const [redirects, setRedirects] = useState([]);
  const [sitemapUrls, setSitemapUrls] = useState([]);
  const [sitemapLoading, setSitemapLoading] = useState(false);
  const [sitemapError, setSitemapError] = useState("");
  const [sitemapSearch, setSitemapSearch] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [entry, setEntry] = useState(blankEntry);
  const [redirectForm, setRedirectForm] = useState({
    source: "",
    destination: "",
    statusCode: 301,
    active: true,
  });

  const request = useCallback(async (method, url, data) => {
    const response = await axios({ method, url, data });
    return response.data;
  }, []);
  const loadDashboard = useCallback(async () => {
    try {
      const r = await request("get", "/seo/admin/dashboard");
      setDashboard(r.data || {});
    } catch (e) {
      console.error(e);
    }
  }, [request]);
  const loadSettings = useCallback(async () => {
    try {
      const r = await request("get", "/seo/admin/settings");
      setSettings({ ...blankSettings, ...(r.data || {}) });
    } catch (e) {
      console.error(e);
    }
  }, [request]);
  const loadEntries = useCallback(
    async (type = tab, searchValue = search) => {
      if (!["page", "property", "location", "blog", "template"].includes(type))
        return;
      setLoading(true);
      try {
        const r = await request(
          "get",
          `/seo/admin/entries?type=${type}&search=${encodeURIComponent(searchValue)}`,
        );
        setEntries(r.data || []);
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Unable to load SEO records",
          text: e.response?.data?.message || e.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [request, tab, search],
  );
  const loadSitemap = useCallback(async () => {
    setSitemapLoading(true);
    setSitemapError("");
    try {
      const response = await axios.get("/seo/sitemap.xml", { responseType: "text" });
      const xmlText = typeof response.data === "string" ? response.data : String(response.data || "");
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");
      if (xml.querySelector("parsererror")) throw new Error("Sitemap response valid XML nahi hai.");
      const parsed = Array.from(xml.getElementsByTagName("url")).map((node) => ({
        loc: node.getElementsByTagName("loc")[0]?.textContent?.trim() || "",
        lastmod: node.getElementsByTagName("lastmod")[0]?.textContent?.trim() || "",
      })).filter((item) => item.loc);
      setSitemapUrls(parsed);
    } catch (error) {
      setSitemapError(error.response?.data?.message || error.message || "Sitemap load nahi ho paya.");
      setSitemapUrls([]);
    } finally {
      setSitemapLoading(false);
    }
  }, []);

  const loadRedirects = useCallback(async () => {
    setLoading(true);
    try {
      const r = await request("get", "/seo/admin/redirects");
      setRedirects(r.data || []);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Unable to load redirects",
        text: e.response?.data?.message || e.message,
      });
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    loadDashboard();
    loadSettings();
  }, [loadDashboard, loadSettings]);
  useEffect(() => {
    if (["page", "property", "location", "blog", "template"].includes(tab))
      loadEntries(tab, "");
    if (tab === "redirects") loadRedirects();
    if (tab === "sitemap") loadSitemap();
  }, [tab, loadEntries, loadRedirects, loadSitemap]);

  const openNewEntry = () => {
    setEditingId(null);
    setEntry({ ...blankEntry, type: tab, data: { ...blankEntry.data } });
    setEditorOpen(true);
  };
  const openEditEntry = (item) => {
    setEditingId(item._id);
    setEntry({
      ...blankEntry,
      ...item,
      data: {
        ...blankEntry.data,
        ...(item.data || {}),
        customSchema: item.data?.customSchema
          ? JSON.stringify(item.data.customSchema, null, 2)
          : "",
      },
    });
    setEditorOpen(true);
  };
  const updateEntryData = (key, value) =>
    setEntry((old) => ({ ...old, data: { ...old.data, [key]: value } }));
  const saveEntry = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = { ...entry, data: { ...entry.data } };
      if (payload.data.customSchema) {
        try {
          payload.data.customSchema = JSON.parse(payload.data.customSchema);
        } catch {
          throw new Error("Custom Schema valid JSON hona chahiye.");
        }
      } else payload.data.customSchema = null;
      await request(
        editingId ? "put" : "post",
        editingId ? `/seo/admin/entries/${editingId}` : "/seo/admin/entries",
        payload,
      );
      setEditorOpen(false);
      await loadEntries(tab, "");
      await loadDashboard();
      Swal.fire({
        icon: "success",
        title: "SEO saved",
        text: "SEO record successfully save ho gaya.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Save failed",
        text: e.response?.data?.message || e.message,
      });
    } finally {
      setSaving(false);
    }
  };
  const deleteEntry = async (item) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete SEO record?",
      text: `${item.label || item.path} will be removed.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;
    try {
      await request("delete", `/seo/admin/entries/${item._id}`);
      await loadEntries(tab, "");
      await loadDashboard();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: e.response?.data?.message || e.message,
      });
    }
  };
  const saveSettings = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await request("put", "/seo/admin/settings", settings);
      await loadDashboard();
      Swal.fire({
        icon: "success",
        title: "Settings saved",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Unable to save settings",
        text: e.response?.data?.message || e.message,
      });
    } finally {
      setSaving(false);
    }
  };
  const saveRedirect = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await request("post", "/seo/admin/redirects", redirectForm);
      setRedirectForm({
        source: "",
        destination: "",
        statusCode: 301,
        active: true,
      });
      await loadRedirects();
      await loadDashboard();
      Swal.fire({
        icon: "success",
        title: "Redirect saved",
        timer: 1300,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Redirect not saved",
        text: e.response?.data?.message || e.message,
      });
    } finally {
      setSaving(false);
    }
  };
  const deleteRedirect = async (item) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete redirect?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;
    try {
      await request("delete", `/seo/admin/redirects/${item._id}`);
      await loadRedirects();
      await loadDashboard();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Unable to delete",
        text: e.response?.data?.message || e.message,
      });
    }
  };

  const filteredEntries = useMemo(() => entries, [entries]);
  const metricCards = [
    {
      label: "SEO Records",
      value: dashboard.configuredEntries ?? 0,
      note: "Custom page metadata",
      icon: FiFileText,
    },
    {
      label: "Missing Titles",
      value: dashboard.missingTitle ?? 0,
      note: "Records to review",
      icon: FiActivity,
    },
    {
      label: "Missing Descriptions",
      value: dashboard.missingDescription ?? 0,
      note: "Records to optimize",
      icon: FiGlobe,
    },
    {
      label: "Active Redirects",
      value: dashboard.activeRedirects ?? 0,
      note: "301 / 308 rules",
      icon: FiLink2,
    },
  ];

  return (
    <div >
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-[24px] border border-slate-200/70 bg-[#203f50] px-5 py-5 text-white shadow-sm sm:px-7 sm:py-6 md:flex-row md:items-center">
          <div className="pointer-events-none absolute -right-5 -top-12 h-36 w-36 rounded-full border-[24px] border-white/[0.035]" />
          <div className="relative flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2fd09a] text-white shadow-sm">
              <FiGlobe size={22} />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                SEO Management
              </h1>
              <p className="mt-1 text-sm text-slate-200">
                Manage search metadata, indexability, templates and redirects from one place.
              </p>
            </div>
          </div>
          <div className="relative flex flex-wrap items-center gap-2 sm:pl-2">
            <a
              href={`${import.meta.env.VITE_API_URL}/v1/seo/sitemap.xml`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <FiArrowUpRight /> Open sitemap
            </a>
            <button
              onClick={() => {
                loadDashboard();
                if (tab === "redirects") loadRedirects();
                else if (tab === "sitemap") loadSitemap();
                else if (["page", "property", "location", "blog", "template"].includes(tab)) loadEntries(tab, search);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0f8177] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0c7068]"
            >
              <FiRefreshCw /> Refresh
            </button>
            <div className="hidden items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 xl:flex">
              <span className="h-2 w-2 rounded-full bg-[#2fd09a]" /> SEO Workspace
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {metricCards.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.label} className="p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-slate-500 sm:text-sm">
                    {m.label}
                  </span>
                  <span className="rounded-xl bg-teal-50 p-2 text-teal-700">
                    <Icon size={18} />
                  </span>
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900">
                  {m.value}
                </div>
                <p className="mt-1 text-xs text-slate-400">{m.note}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[245px_minmax(0,1fr)]">
          <Card className="h-fit p-2">
            <div className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">
              SEO Workspace
            </div>
            <nav className="space-y-1">
              {TABS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setSearch("");
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${tab === item.id ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    <Icon size={17} />
                    {item.label}
                    {tab === item.id && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-600" />
                    )}
                  </button>
                );
              })}
            </nav>
            <div className="m-2 mt-4 rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <FiCheckCircle className="text-teal-600" /> Centralized SEO
              </div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Custom metadata is resolved by URL path. Make sure the
                production API and website use the same backend.
              </p>
            </div>
          </Card>

          <div className="min-w-0 space-y-5">
            {tab === "sitemap" && (
              <>
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-800 to-teal-600 p-5 text-white sm:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-teal-100"><FiMap /> Search engine discovery</div>
                        <h2 className="text-2xl font-bold">XML Sitemap</h2>
                        <p className="mt-1 max-w-2xl text-sm text-teal-50">Website ke public URLs ki list. Yahan sitemap ko readable table mein review karein.</p>
                      </div>
                      <a href={`${import.meta.env.VITE_API_URL}/v1/seo/sitemap.xml`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-teal-800 hover:bg-teal-50"><FiArrowUpRight /> Open raw XML</a>
                    </div>
                  </div>
                  <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">URLs in sitemap</p><p className="mt-2 text-3xl font-bold text-slate-900">{sitemapUrls.length}</p></div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Unique URLs</p><p className="mt-2 text-3xl font-bold text-slate-900">{new Set(sitemapUrls.map((item) => item.loc.replace(/\/$/, ""))).size}</p></div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Duplicate URLs</p><p className={`mt-2 text-3xl font-bold ${sitemapUrls.length - new Set(sitemapUrls.map((item) => item.loc.replace(/\/$/, ""))).size ? "text-amber-600" : "text-emerald-600"}`}>{sitemapUrls.length - new Set(sitemapUrls.map((item) => item.loc.replace(/\/$/, ""))).size}</p></div>
                  </div>
                </Card>
                <Card className="p-4 sm:p-5">
                  <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div><h3 className="text-lg font-bold text-slate-900">Sitemap URLs</h3><p className="mt-1 text-sm text-slate-500">Search, inspect and open each listed URL.</p></div>
                    <div className="flex gap-2"><div className="relative min-w-0 flex-1 sm:w-72"><FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input className={`${inputClass} pl-9`} value={sitemapSearch} onChange={(e) => setSitemapSearch(e.target.value)} placeholder="Search city, property, URL..." /></div><button onClick={loadSitemap} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><FiRefreshCw /> Refresh</button></div>
                  </div>
                  {sitemapLoading ? <div className="py-12 text-center text-sm text-slate-500">Loading sitemap URLs…</div> : sitemapError ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"><p className="font-bold">Sitemap load nahi hua</p><p className="mt-1">{sitemapError}</p><p className="mt-2 text-xs">API route check karein: `/api/v1/seo/sitemap.xml`</p><button onClick={loadSitemap} className="mt-3 rounded-lg bg-rose-700 px-3 py-2 font-semibold text-white">Try again</button></div> : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">#</th><th className="px-4 py-3">URL</th><th className="px-4 py-3">Last modified</th><th className="px-4 py-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{sitemapUrls.filter((item) => `${item.loc} ${item.lastmod}`.toLowerCase().includes(sitemapSearch.toLowerCase())).map((item, index) => <tr key={`${item.loc}-${index}`} className="hover:bg-teal-50/40"><td className="px-4 py-3 text-slate-400">{index + 1}</td><td className="max-w-[520px] px-4 py-3"><div className="break-all font-medium text-slate-800">{item.loc}</div><div className="mt-1 text-xs text-slate-400">{item.loc.includes("/property/") ? "Property page" : item.loc.match(/\/[^/]+\/[^/]+/) ? "Location / landing page" : "Website page"}</div></td><td className="whitespace-nowrap px-4 py-3 text-slate-500">{item.lastmod ? new Date(item.lastmod).toLocaleDateString() : "—"}</td><td className="px-4 py-3 text-right"><a href={item.loc} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-teal-800 hover:border-teal-300">Open <FiArrowUpRight /></a></td></tr>)}{sitemapUrls.filter((item) => `${item.loc} ${item.lastmod}`.toLowerCase().includes(sitemapSearch.toLowerCase())).length === 0 && <tr><td colSpan="4" className="px-4 py-10 text-center text-slate-500">No matching sitemap URLs found.</td></tr>}</tbody></table></div>
                  )}
                  <p className="mt-3 text-xs leading-5 text-slate-400">Note: Sitemap mein URL hona Google indexing ki guarantee nahi hai. Production domain aur public, valid URLs hi sitemap mein hone chahiye.</p>
                </Card>
              </>
            )}

            {tab === "overview" && (
              <>
                <Card className="p-5 sm:p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        SEO health overview
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        A quick check of your current SEO configuration.
                      </p>
                    </div>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${dashboard.globalSettingsConfigured ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {dashboard.globalSettingsConfigured
                        ? "Global settings configured"
                        : "Global settings not configured"}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-100 p-4">
                      <div className="text-sm font-semibold text-slate-800">
                        Live properties
                      </div>
                      <div className="mt-2 text-2xl font-bold">
                        {dashboard.liveProperties ?? 0}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Properties eligible for public SEO resolution.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                      <div className="text-sm font-semibold text-slate-800">
                        Property descriptions missing
                      </div>
                      <div className="mt-2 text-2xl font-bold">
                        {dashboard.propertyMissingDescription ?? 0}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Live properties without a description.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                      <div className="text-sm font-semibold text-slate-800">
                        Properties without images
                      </div>
                      <div className="mt-2 text-2xl font-bold">
                        {dashboard.propertyMissingImageAlt ?? 0}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Image presence check; alt text needs a separate audit.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                      <div className="text-sm font-semibold text-slate-800">
                        Redirects
                      </div>
                      <div className="mt-2 text-2xl font-bold">
                        {dashboard.activeRedirects ?? 0}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Active redirect rules currently stored.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <h3 className="font-bold text-slate-900">
                    Recommended setup order
                  </h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {[
                      {
                        n: "01",
                        t: "Set global defaults",
                        d: "Add your canonical domain, default title, description and OG image.",
                      },
                      {
                        n: "02",
                        t: "Add page-specific SEO",
                        d: "Create a unique SEO record for important pages and landing URLs.",
                      },
                      {
                        n: "03",
                        t: "Validate crawl access",
                        d: "Check sitemap.xml, robots.txt, canonical URLs and rendered metadata.",
                      },
                    ].map((x) => (
                      <div key={x.n} className="rounded-xl bg-slate-50 p-4">
                        <div className="text-xs font-bold text-teal-700">
                          {x.n}
                        </div>
                        <div className="mt-2 text-sm font-bold text-slate-800">
                          {x.t}
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {x.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {tab === "settings" && (
              <Card className="p-5 sm:p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    Global SEO Settings
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    These values are fallbacks when a page does not have custom
                    SEO.
                  </p>
                </div>
                <form onSubmit={saveSettings} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Site name">
                      <input
                        className={inputClass}
                        value={settings.siteName || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, siteName: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Canonical domain">
                      <input
                        className={inputClass}
                        placeholder="https://www.diginiwas.com"
                        value={settings.canonicalDomain || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            canonicalDomain: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Default SEO title">
                      <input
                        className={inputClass}
                        maxLength={80}
                        value={settings.defaultTitle || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            defaultTitle: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Organization name">
                      <input
                        className={inputClass}
                        value={settings.organizationName || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            organizationName: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Default OG image URL">
                      <input
                        className={inputClass}
                        placeholder="https://.../image.webp"
                        value={settings.defaultOgImage || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            defaultOgImage: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Logo URL">
                      <input
                        className={inputClass}
                        value={settings.logo || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, logo: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Google Search Console verification">
                      <input
                        className={inputClass}
                        value={settings.googleSiteVerification || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            googleSiteVerification: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Google Analytics ID">
                      <input
                        className={inputClass}
                        placeholder="G-XXXXXXXXXX"
                        value={settings.googleAnalyticsId || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            googleAnalyticsId: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Google Tag Manager ID">
                      <input
                        className={inputClass}
                        placeholder="GTM-XXXXXXX"
                        value={settings.googleTagManagerId || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            googleTagManagerId: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field
                      label="Default meta description"
                      className="md:col-span-2"
                    >
                      <textarea
                        rows={3}
                        maxLength={320}
                        className={inputClass}
                        value={settings.defaultDescription || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            defaultDescription: e.target.value,
                          })
                        }
                      />
                      <span className="mt-1 block text-right text-[11px] text-slate-400">
                        {(settings.defaultDescription || "").length}/320
                      </span>
                    </Field>
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <h3 className="mb-3 text-sm font-bold text-slate-800">
                      Dynamic SEO templates
                    </h3>
                    <div className="grid gap-4">
                      <Field label="Property title template">
                        <input
                          className={inputClass}
                          value={settings.propertyTitleTemplate || ""}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              propertyTitleTemplate: e.target.value,
                            })
                          }
                        />
                        <span className="mt-1 block text-xs text-slate-400">
                          Variables: {"{property_name}"}, {"{locality}"},{" "}
                          {"{city}"}
                        </span>
                      </Field>
                      <Field label="Location title template">
                        <input
                          className={inputClass}
                          value={settings.locationTitleTemplate || ""}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              locationTitleTemplate: e.target.value,
                            })
                          }
                        />
                        <span className="mt-1 block text-xs text-slate-400">
                          Variables: {"{locality}"}, {"{city}"}
                        </span>
                      </Field>
                      <Field label="Blog title template">
                        <input
                          className={inputClass}
                          value={settings.blogTitleTemplate || ""}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              blogTitleTemplate: e.target.value,
                            })
                          }
                        />
                        <span className="mt-1 block text-xs text-slate-400">
                          Variable: {"{post_title}"}
                        </span>
                      </Field>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                    >
                      <FiSave />
                      {saving ? "Saving..." : "Save Global Settings"}
                    </button>
                  </div>
                </form>
              </Card>
            )}

            {["page", "property", "location", "blog", "template"].includes(
              tab,
            ) && (
              <Card className="overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {TABS.find((x) => x.id === tab)?.label}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Create, edit and control metadata for individual URLs.
                    </p>
                  </div>
                  <button
                    onClick={openNewEntry}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white"
                  >
                    <FiPlus /> Add SEO record
                  </button>
                </div>
                <div className="border-b border-slate-100 p-4">
                  <div className="relative max-w-md">
                    <FiSearch className="absolute left-3 top-3 text-slate-400" />
                    <input
                      className={`${inputClass} pl-9`}
                      placeholder="Search by page name, key or URL..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          loadEntries(tab, search);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-10 text-center text-sm text-slate-500">
                      Loading SEO records...
                    </div>
                  ) : (
                    <table className="w-full min-w-[720px] text-left text-sm">
                      <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-5 py-3">Page / Record</th>
                          <th className="px-5 py-3">SEO title</th>
                          <th className="px-5 py-3">Indexing</th>
                          <th className="px-5 py-3">Updated</th>
                          <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredEntries.map((item) => (
                          <tr key={item._id} className="hover:bg-slate-50/70">
                            <td className="px-5 py-4">
                              <div className="font-semibold text-slate-800">
                                {item.label || item.key}
                              </div>
                              <div className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
                                {item.path || item.key}
                              </div>
                            </td>
                            <td className="max-w-[260px] px-5 py-4">
                              <div className="truncate font-medium text-slate-700">
                                {item.data?.title || "— Uses fallback —"}
                              </div>
                              <div className="mt-1 max-w-[250px] truncate text-xs text-slate-400">
                                {item.data?.description ||
                                  "No custom description"}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.data?.robotsIndex === false ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
                              >
                                {item.data?.robotsIndex === false
                                  ? "Noindex"
                                  : "Index"}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-xs text-slate-500">
                              {item.updatedAt
                                ? new Date(item.updatedAt).toLocaleDateString()
                                : "—"}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => openEditEntry(item)}
                                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:border-teal-400 hover:text-teal-700"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteEntry(item)}
                                  aria-label="Delete SEO record"
                                  className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!filteredEntries.length && (
                          <tr>
                            <td
                              colSpan={5}
                              className="p-10 text-center text-sm text-slate-500"
                            >
                              No SEO records yet. Click “Add SEO record” to
                              create one.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </Card>
            )}

            {tab === "redirects" && (
              <>
                <Card className="p-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    Create redirect
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Use a permanent redirect when a public page slug changes.
                  </p>
                  <form
                    onSubmit={saveRedirect}
                    className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_150px_auto] md:items-end"
                  >
                    <Field label="Old path">
                      <input
                        required
                        className={inputClass}
                        placeholder="/old-property-slug"
                        value={redirectForm.source}
                        onChange={(e) =>
                          setRedirectForm({
                            ...redirectForm,
                            source: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="New path">
                      <input
                        required
                        className={inputClass}
                        placeholder="/property/123/new-slug"
                        value={redirectForm.destination}
                        onChange={(e) =>
                          setRedirectForm({
                            ...redirectForm,
                            destination: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Status code">
                      <select
                        className={inputClass}
                        value={redirectForm.statusCode}
                        onChange={(e) =>
                          setRedirectForm({
                            ...redirectForm,
                            statusCode: Number(e.target.value),
                          })
                        }
                      >
                        <option value={301}>301 Permanent</option>
                        <option value={308}>308 Permanent</option>
                      </select>
                    </Field>
                    <button
                      disabled={saving}
                      className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white disabled:opacity-50"
                    >
                      <FiPlus /> Add redirect
                    </button>
                  </form>
                </Card>
                <Card className="overflow-hidden">
                  <div className="border-b border-slate-100 p-5">
                    <h3 className="font-bold text-slate-900">
                      Saved redirects ({redirects.length})
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-sm">
                      <thead className="bg-slate-50 text-[11px] uppercase text-slate-500">
                        <tr>
                          <th className="px-5 py-3">Source</th>
                          <th className="px-5 py-3">Destination</th>
                          <th className="px-5 py-3">Type</th>
                          <th className="px-5 py-3">Status</th>
                          <th className="px-5 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {redirects.map((r) => (
                          <tr key={r._id}>
                            <td className="px-5 py-4 font-medium text-slate-700">
                              {r.source}
                            </td>
                            <td className="px-5 py-4 text-slate-500">
                              {r.destination}
                            </td>
                            <td className="px-5 py-4">{r.statusCode}</td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                              >
                                {r.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => deleteRedirect(r)}
                                className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {!redirects.length && (
                          <tr>
                            <td
                              colSpan={5}
                              className="p-8 text-center text-sm text-slate-500"
                            >
                              No redirects created yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>

      {editorOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId ? "Edit SEO record" : "Create SEO record"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Fields save to the backend and are resolved by the public SEO
                  API.
                </p>
              </div>
              <button
                onClick={() => setEditorOpen(false)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={saveEntry} className="space-y-5 p-5 sm:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Record type">
                  <select
                    disabled={Boolean(editingId)}
                    className={inputClass}
                    value={entry.type}
                    onChange={(e) =>
                      setEntry({ ...entry, type: e.target.value })
                    }
                  >
                    <option value="page">Page SEO</option>
                    <option value="property">Property SEO</option>
                    <option value="location">Location SEO</option>
                    <option value="blog">Blog SEO</option>
                    <option value="template">Template</option>
                  </select>
                </Field>
                <Field label="Display name">
                  <input
                    required
                    className={inputClass}
                    placeholder="Indore landing page"
                    value={entry.label}
                    onChange={(e) =>
                      setEntry({ ...entry, label: e.target.value })
                    }
                  />
                </Field>
                <Field label="Unique key">
                  <input
                    required
                    className={inputClass}
                    placeholder="indore-landing"
                    value={entry.key}
                    onChange={(e) =>
                      setEntry({ ...entry, key: e.target.value })
                    }
                  />
                  <span className="mt-1 block text-[11px] text-slate-400">
                    Must be unique for this record type.
                  </span>
                </Field>
                <Field label="Page path">
                  <input
                    required
                    className={inputClass}
                    placeholder="/indore"
                    value={entry.path}
                    onChange={(e) =>
                      setEntry({ ...entry, path: e.target.value })
                    }
                  />
                </Field>
                <Field label="Entity ID (optional)">
                  <input
                    className={inputClass}
                    placeholder="Property or blog database ID"
                    value={entry.entityId || ""}
                    onChange={(e) =>
                      setEntry({ ...entry, entityId: e.target.value })
                    }
                  />
                </Field>
                {entry.type === "location" && (
                  <>
                    <Field label="Footer link label">
                      <input
                        className={inputClass}
                        placeholder="Commercial Property for Sale in Indore"
                        value={entry.data.footerLabel || ""}
                        onChange={(e) =>
                          updateEntryData("footerLabel", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Footer group">
                      <select
                        className={inputClass}
                        value={entry.data.footerGroup || "Popular Searches"}
                        onChange={(e) =>
                          updateEntryData("footerGroup", e.target.value)
                        }
                      >
                        {[
                          "For Buyers",
                          "For Tenants",
                          "Projects",
                          "Popular Searches",
                        ].map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Footer order">
                      <input
                        type="number"
                        min="0"
                        className={inputClass}
                        value={entry.data.footerOrder ?? 0}
                        onChange={(e) =>
                          updateEntryData("footerOrder", Number(e.target.value))
                        }
                      />
                    </Field>
                    <label className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                      <input
                        type="checkbox"
                        checked={entry.data.footerVisible === true}
                        onChange={(e) =>
                          updateEntryData("footerVisible", e.target.checked)
                        }
                      />{" "}
                      Show this landing page in website footer
                    </label>
                  </>
                )}
                <Field label="SEO title">
                  <input
                    className={inputClass}
                    maxLength={100}
                    value={entry.data.title || ""}
                    onChange={(e) => updateEntryData("title", e.target.value)}
                  />
                </Field>
                <Field label="Meta description" className="md:col-span-2">
                  <textarea
                    rows={3}
                    maxLength={320}
                    className={inputClass}
                    value={entry.data.description || ""}
                    onChange={(e) =>
                      updateEntryData("description", e.target.value)
                    }
                  />
                  <span className="mt-1 block text-right text-[11px] text-slate-400">
                    {(entry.data.description || "").length}/320
                  </span>
                </Field>
                <Field label="Canonical URL">
                  <input
                    className={inputClass}
                    placeholder="https://www.diginiwas.com/indore"
                    value={entry.data.canonical || ""}
                    onChange={(e) =>
                      updateEntryData("canonical", e.target.value)
                    }
                  />
                </Field>
                <Field label="Focus keyword">
                  <input
                    className={inputClass}
                    value={entry.data.focusKeyword || ""}
                    onChange={(e) =>
                      updateEntryData("focusKeyword", e.target.value)
                    }
                  />
                </Field>
                <Field label="Open Graph title">
                  <input
                    className={inputClass}
                    value={entry.data.ogTitle || ""}
                    onChange={(e) => updateEntryData("ogTitle", e.target.value)}
                  />
                </Field>
                <Field label="Open Graph description">
                  <input
                    className={inputClass}
                    value={entry.data.ogDescription || ""}
                    onChange={(e) =>
                      updateEntryData("ogDescription", e.target.value)
                    }
                  />
                </Field>
                <Field label="Open Graph image URL" className="md:col-span-2">
                  <input
                    className={inputClass}
                    placeholder="https://.../social-share.webp"
                    value={entry.data.ogImage || ""}
                    onChange={(e) => updateEntryData("ogImage", e.target.value)}
                  />
                </Field>
                <Field label="Schema type">
                  <select
                    className={inputClass}
                    value={entry.data.schemaType || "WebPage"}
                    onChange={(e) =>
                      updateEntryData("schemaType", e.target.value)
                    }
                  >
                    {[
                      "WebPage",
                      "WebSite",
                      "CollectionPage",
                      "Article",
                      "BlogPosting",
                      "Residence",
                      "Organization",
                      "LocalBusiness",
                      "BreadcrumbList",
                      "FAQPage",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Custom schema JSON-LD">
                  <textarea
                    rows={4}
                    className={`${inputClass} font-mono text-xs`}
                    placeholder={
                      '{\n  "@context": "https://schema.org",\n  "@type": "WebPage"\n}'
                    }
                    value={entry.data.customSchema || ""}
                    onChange={(e) =>
                      updateEntryData("customSchema", e.target.value)
                    }
                  />
                </Field>
              </div>
              <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
                {[
                  {
                    key: "robotsIndex",
                    title: "Allow indexing",
                    desc: "Search engines may index this URL.",
                  },
                  {
                    key: "robotsFollow",
                    title: "Follow links",
                    desc: "Search engines may follow page links.",
                  },
                  {
                    key: "sitemapInclude",
                    title: "Include in sitemap",
                    desc: "Include URL in eligible URL registry.",
                  },
                ].map((x) => (
                  <label
                    key={x.key}
                    className="flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-teal-700"
                      checked={entry.data[x.key] !== false}
                      onChange={(e) => updateEntryData(x.key, e.target.checked)}
                    />
                    <span>
                      <span className="block text-sm font-semibold text-slate-800">
                        {x.title}
                      </span>
                      <span className="mt-1 block text-xs leading-4 text-slate-500">
                        {x.desc}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                >
                  <FiSave />
                  {saving ? "Saving..." : "Save SEO record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
