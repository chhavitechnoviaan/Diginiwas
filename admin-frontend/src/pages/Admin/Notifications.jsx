import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, ChevronRight, Clock3, HandCoins, RefreshCw, ShieldCheck, Sparkles, Building2, CalendarDays, Users, Wallet, Megaphone, Search } from "lucide-react";
import AdminModuleShell from "../../components/AdminModuleShell";
import { getAdminNotificationsApi, markAllNotificationsReadApi, markNotificationReadApi } from "../../Services/notificationService";

const FILTERS = ["All", "Buyers", "Sellers", "Partners", "Properties", "Support", "Leads", "Visits", "Promotions", "Payments", "Refunds", "Other"];
const CATEGORY_RULES = [
  ["Refunds", /REFUND/], ["Visits", /VISIT|SITE_VISIT|INSPECTION/],
  ["Promotions", /PROMOTION|BOOST|ADVERTISEMENT/],
  ["Payments", /PAYMENT|CREDIT|WALLET|SUBSCRIPTION|TRANSACTION/],
  ["Buyers", /BUYER_REGISTERED/], ["Sellers", /SELLER_REGISTERED/],
  ["Support", /SUPPORT/], ["Partners", /PARTNER|TEAM/],
  ["Properties", /PROPERTY|DOCUMENT|VERIFICATION|LISTING/],
  ["Leads", /LEAD|INQUIRY|BUYER|SELLER/],
];
const CATEGORY_META = {
  Buyers: { icon: Users, tone: "bg-blue-50 text-blue-700" },
  Sellers: { icon: Users, tone: "bg-indigo-50 text-indigo-700" },
  Support: { icon: Bell, tone: "bg-orange-50 text-orange-700" },
  Partners: { icon: ShieldCheck, tone: "bg-violet-50 text-violet-700" },
  Properties: { icon: Building2, tone: "bg-sky-50 text-sky-700" },
  Leads: { icon: Users, tone: "bg-blue-50 text-blue-700" },
  Visits: { icon: CalendarDays, tone: "bg-teal-50 text-teal-700" },
  Promotions: { icon: Megaphone, tone: "bg-amber-50 text-amber-700" },
  Payments: { icon: Wallet, tone: "bg-emerald-50 text-emerald-700" },
  Refunds: { icon: HandCoins, tone: "bg-rose-50 text-rose-700" },
  Other: { icon: Bell, tone: "bg-slate-100 text-slate-600" },
};
const categoryOf = (item) => {
  const type = String(item.type || item.category || "").toUpperCase();
  return CATEGORY_RULES.find(([, pattern]) => pattern.test(type))?.[0] || "Other";
};
const routeFor = (item) => {
  const url = item.actionUrl;
  // Only navigate to an internal admin route, never to an arbitrary URL.
  if (typeof url === "string" && url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) return url;
  const id = item.entityId || item.data?.visitId || item.data?.visit?._id;
  const type = String(item.type || "").toUpperCase();
  const entity = String(item.entityType || "").toUpperCase();
  if (entity === "VISIT" || /VISIT/.test(type)) return id ? `/visit-management/${encodeURIComponent(id)}` : "/visit-management";
  if (/PARTNER/.test(entity) || /PARTNER_APPLICATION/.test(type)) return "/partner-applications";
  if (/PROPERTY/.test(entity) || /PROPERTY/.test(type)) return "/property-management";
  if (/LEAD|INQUIRY/.test(type)) return "/lead-management";
  if (/CREDIT|WALLET/.test(type)) return "/wallet-credits";
  return "/dashboard";
};

function StatCard({ label, value, hint, icon: Icon, tone }) {
  return <div className="rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#80929D]">{label}</p><p className="mt-2 text-2xl font-bold text-[#173247]">{value}</p><p className="mt-1 text-[11px] text-[#80929D]">{hint}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon size={18} /></div></div></div>;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async (silent = false) => {
    try {
      if (silent !== true) setLoading(true); setError("");
      const response = await getAdminNotificationsApi({ page, limit: 50,  });
      setItems(response?.data || []); setUnreadCount(response?.unreadCount || 0);
      setPages(response?.pagination?.pages || 1); setTotal(response?.pagination?.total || 0);
    } catch (err) {
      setItems([]); setError(err?.response?.data?.message || "Unable to load notifications.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); const timer = setInterval(() => load(true), 30000); return () => clearInterval(timer); }, [page]);
  const visibleItems = useMemo(() => items.filter(item => (filter === "All" || categoryOf(item) === filter) && `${item.title || ""} ${item.message || ""} ${item.type || ""}`.toLowerCase().includes(query.toLowerCase())), [items, filter, query]);
  const counts = useMemo(() => ({
    partner: items.filter((item) => categoryOf(item) === "Partners").length,
    operational: items.filter((item) => ["Leads", "Refunds", "Visits", "Support"].includes(categoryOf(item))).length,
  }), [items]);

  const openNotification = async (item) => {
    try {
      if (!item.isRead) {
        await markNotificationReadApi(item._id);
        setItems(previous => previous.map(n => n._id === item._id ? { ...n, isRead: true } : n));
        setUnreadCount(n => Math.max(0, n - 1));
        window.dispatchEvent(new Event("admin-notifications-updated"));
      }
      navigate(routeFor(item));
    } catch (err) { setError(err?.response?.data?.message || "Unable to mark notification as read."); }
  };
  const markAll = async () => {
    try { setBusy(true); setError(""); await markAllNotificationsReadApi(); window.dispatchEvent(new Event("admin-notifications-updated")); await load(); }
    catch (err) { setError(err?.response?.data?.message || "Unable to mark notifications as read."); }
    finally { setBusy(false); }
  };
  const currentView = filter;
  const changeFilter = (next) => { setFilter(next); };

  return <AdminModuleShell title="Notifications" description="All Admin notifications, including property, partner, boost, lead and payment updates" icon={Bell} currentView={currentView} actions={<><button onClick={load} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"><RefreshCw size={14} className={loading ? "animate-spin" : ""} />Refresh</button><button onClick={markAll} disabled={!unreadCount || busy} className="flex items-center gap-2 rounded-xl bg-[#35C99A] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2DB88C] disabled:opacity-50"><CheckCheck size={14} />Mark all read</button></>}>
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total" value={total} hint="In the selected view" icon={Bell} tone="bg-[#EAF9F4] text-[#15966F]" />
        <StatCard label="Unread" value={unreadCount} hint="Needs your attention" icon={Clock3} tone="bg-amber-50 text-amber-600" />
        <StatCard label="Partner Updates" value={counts.partner} hint="Applications and approvals" icon={ShieldCheck} tone="bg-violet-50 text-violet-600" />
        <StatCard label="Operational" value={counts.operational} hint="Lead and refund activity" icon={Sparkles} tone="bg-blue-50 text-blue-600" />
      </div>
      <section className="rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]"><div className="flex gap-2 overflow-x-auto pb-1">{FILTERS.map((id) => <button key={id} onClick={() => changeFilter(id)} className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${filter === id ? "bg-[#1F3C50] text-white" : "bg-[#F2F6F7] text-[#667B88] hover:bg-[#EAF9F4] hover:text-[#15966F]"}`}>{id}</button>)}</div><div className="relative mt-3"><Search size={15} className="absolute left-3 top-3 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search notifications on this page..." className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-400" /></div></section>
      <section className="overflow-hidden rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
        {error && <div className="m-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">{error}</div>}
        {loading ? <div className="p-14 text-center text-sm text-[#80929D]">Loading notifications...</div> : visibleItems.length === 0 ? <div className="p-14 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F6F7] text-[#9AAEB9]"><Bell size={24} /></div><p className="mt-3 text-sm font-semibold text-[#526A78]">No notifications found</p><p className="mt-1 text-xs text-[#8CA0AC]">New updates will appear here.</p></div> : visibleItems.map((item) => {
          const category = categoryOf(item); const meta = { ...CATEGORY_META[category], label: category }; const TypeIcon = meta.icon;
          return <button key={item._id} onClick={() => openNotification(item)} className={`group flex w-full items-start gap-3 border-b border-[#E7EEF1] p-4 text-left transition last:border-b-0 hover:bg-[#F5FBF9] md:gap-4 ${item.isRead ? "bg-white" : "bg-[#F0FBF7]"}`}><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.tone}`}><TypeIcon size={17} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-[#173247]">{item.title}</h3>{!item.isRead && <span className="rounded-full bg-[#35C99A] px-2 py-0.5 text-[9px] font-bold uppercase text-white">New</span>}<span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${meta.tone}`}>{meta.label}</span></div><p className="mt-1.5 text-xs leading-5 text-[#667B88]">{item.message}</p><p className="mt-2 text-[10px] font-medium text-[#9AAAB3]">{item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : ""}</p></div><ChevronRight className="mt-3 shrink-0 text-[#A9BAC3] transition group-hover:translate-x-0.5 group-hover:text-[#15966F]" size={18} /></button>;
        })}
      </section>
      <div className="flex items-center justify-between rounded-xl bg-white p-3 text-xs text-[#526A78]">
        <span>Page {page} of {pages} · {total} notifications</span>
        <div className="flex gap-2"><button className="rounded border px-3 py-1 disabled:opacity-40" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button><button className="rounded border px-3 py-1 disabled:opacity-40" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button></div>
      </div>
    </div>
  </AdminModuleShell>;
}
