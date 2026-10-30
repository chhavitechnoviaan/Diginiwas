import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, ChevronRight, Clock3, HandCoins, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import AdminModuleShell from "../../components/AdminModuleShell";
import { getAdminNotificationsApi, markAllNotificationsReadApi, markNotificationReadApi } from "../../Services/notificationService";

const FILTERS = [["All", "All"], ["PARTNER_APPLICATION", "Partners"], ["NEW_LEAD", "Leads"], ["PROMOTION_REQUEST", "Promotions"], ["LEAD_REFUND_REQUEST", "Refunds"]];
const META = {
  PARTNER_APPLICATION: { label: "Partner", tone: "bg-violet-50 text-violet-700", icon: ShieldCheck },
  NEW_LEAD: { label: "Lead", tone: "bg-blue-50 text-blue-700", icon: Sparkles },
  PROMOTION_REQUEST: { label: "Promotion", tone: "bg-amber-50 text-amber-700", icon: Bell },
  LEAD_REFUND_REQUEST: { label: "Refund", tone: "bg-rose-50 text-rose-700", icon: HandCoins },
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

  const load = async () => {
    try {
      setLoading(true); setError("");
      const response = await getAdminNotificationsApi(filter === "All" ? {} : { type: filter });
      setItems(response?.data || []); setUnreadCount(response?.unreadCount || 0);
    } catch (err) {
      setItems([]); setError(err?.response?.data?.message || "Unable to load notifications.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);
  const counts = useMemo(() => ({
    partner: items.filter((item) => item.type === "PARTNER_APPLICATION").length,
    operational: items.filter((item) => ["NEW_LEAD", "LEAD_REFUND_REQUEST"].includes(item.type)).length,
  }), [items]);

  const openNotification = async (item) => {
    if (!item.isRead) await markNotificationReadApi(item._id);
    window.dispatchEvent(new Event("admin-notifications-updated"));
    navigate(item.actionUrl || "/dashboard");
  };
  const markAll = async () => { await markAllNotificationsReadApi(); window.dispatchEvent(new Event("admin-notifications-updated")); await load(); };
  const currentView = FILTERS.find(([id]) => id === filter)?.[1] || "All";

  return <AdminModuleShell title="Notifications" description="Track partner applications, leads, promotions and refund activity" icon={Bell} currentView={currentView} actions={<><button onClick={load} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"><RefreshCw size={14} className={loading ? "animate-spin" : ""} />Refresh</button><button onClick={markAll} disabled={!unreadCount} className="flex items-center gap-2 rounded-xl bg-[#35C99A] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2DB88C] disabled:opacity-50"><CheckCheck size={14} />Mark all read</button></>}>
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total" value={items.length} hint="In the selected view" icon={Bell} tone="bg-[#EAF9F4] text-[#15966F]" />
        <StatCard label="Unread" value={unreadCount} hint="Needs your attention" icon={Clock3} tone="bg-amber-50 text-amber-600" />
        <StatCard label="Partner Updates" value={counts.partner} hint="Applications and approvals" icon={ShieldCheck} tone="bg-violet-50 text-violet-600" />
        <StatCard label="Operational" value={counts.operational} hint="Lead and refund activity" icon={Sparkles} tone="bg-blue-50 text-blue-600" />
      </div>
      <section className="rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]"><div className="flex gap-2 overflow-x-auto pb-1">{FILTERS.map(([id, label]) => <button key={id} onClick={() => setFilter(id)} className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${filter === id ? "bg-[#1F3C50] text-white" : "bg-[#F2F6F7] text-[#667B88] hover:bg-[#EAF9F4] hover:text-[#15966F]"}`}>{label}</button>)}</div></section>
      <section className="overflow-hidden rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
        {error && <div className="m-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">{error}</div>}
        {loading ? <div className="p-14 text-center text-sm text-[#80929D]">Loading notifications...</div> : items.length === 0 ? <div className="p-14 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F6F7] text-[#9AAEB9]"><Bell size={24} /></div><p className="mt-3 text-sm font-semibold text-[#526A78]">No notifications found</p><p className="mt-1 text-xs text-[#8CA0AC]">New updates will appear here.</p></div> : items.map((item) => {
          const meta = META[item.type] || { label: item.type || "Update", tone: "bg-slate-100 text-slate-600", icon: Bell }; const TypeIcon = meta.icon;
          return <button key={item._id} onClick={() => openNotification(item)} className={`group flex w-full items-start gap-3 border-b border-[#E7EEF1] p-4 text-left transition last:border-b-0 hover:bg-[#F5FBF9] md:gap-4 ${item.isRead ? "bg-white" : "bg-[#F0FBF7]"}`}><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.tone}`}><TypeIcon size={17} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-[#173247]">{item.title}</h3>{!item.isRead && <span className="rounded-full bg-[#35C99A] px-2 py-0.5 text-[9px] font-bold uppercase text-white">New</span>}<span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${meta.tone}`}>{meta.label}</span></div><p className="mt-1.5 text-xs leading-5 text-[#667B88]">{item.message}</p><p className="mt-2 text-[10px] font-medium text-[#9AAAB3]">{item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : ""}</p></div><ChevronRight className="mt-3 shrink-0 text-[#A9BAC3] transition group-hover:translate-x-0.5 group-hover:text-[#15966F]" size={18} /></button>;
        })}
      </section>
    </div>
  </AdminModuleShell>;
}
