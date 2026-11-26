import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Trash2,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";
import AdminModuleShell from "../../components/AdminModuleShell";
import { deleteUserAccountApi, getUnifiedUsersApi } from "../../Services/userService";

const TABS = ["All", "Buyer", "Seller", "Partner"];

const statusTone = (status = "") => {
  const value = status.toLowerCase();
  if (value.includes("verified") && !value.includes("pending"))
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (value.includes("active") || value === "approved")
    return "bg-teal-50 text-teal-700 border-teal-200";
  if (value.includes("pending") || value.includes("submitted"))
    return "bg-amber-50 text-amber-700 border-amber-200";
  if (value.includes("reject") || value.includes("suspend") || value.includes("block"))
    return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-slate-50 text-slate-600 border-slate-200";
};

const typeTone = {
  Buyer: "bg-blue-50 text-blue-700",
  Seller: "bg-orange-50 text-orange-700",
  Partner: "bg-violet-50 text-violet-700",
  "Sub Partner": "bg-fuchsia-50 text-fuchsia-700",
};

const StatCard = ({ label, value, hint, icon: Icon, tone = "teal" }) => {
  const colors = {
    teal: "bg-[#EAF9F4] text-[#15966F]",
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <div className="rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#80929D]">{label}</p>
          <p className="mt-2 text-2xl font-bold text-[#173247]">{value ?? 0}</p>
          <p className="mt-1 text-[11px] text-[#80929D]">{hint}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[tone]}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
};

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [activeTab, setActiveTab] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const load = async (page = 1) => {
    try {
      setLoading(true);
      setError("");
      const response = await getUnifiedUsersApi({
        page,
        limit: 20,
        type: activeTab,
        status,
        search: debouncedSearch,
      });
      setUsers(response?.data || []);
      setStats(response?.stats || {});
      setPagination(response?.pagination || { page: 1, pages: 1, total: 0 });
    } catch (requestError) {
      setUsers([]);
      setError(requestError?.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, [activeTab, status, debouncedSearch]);

  const handleDeleteUser = async () => {
    if (!selected?._id || !["Buyer", "Seller", "Partner", "Sub Partner"].includes(selected.type)) return;

    const confirmed = window.confirm(
      `Delete ${selected.type} account for ${selected.name}? This will disable login, hide owned properties, and disable partner credits.`
    );
    if (!confirmed) return;

    try {
      setError("");
      const response = await deleteUserAccountApi(selected.type, selected._id);
      if (!response?.success) throw new Error(response?.message || "Unable to delete account");
      setSelected(null);
      await load(pagination.page || 1);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || "Unable to delete account.");
    }
  };

  const counts = useMemo(
    () => ({ All: stats.total || 0, Buyer: stats.buyers || 0, Seller: stats.sellers || 0, Partner: stats.partners || 0 }),
    [stats]
  );

  return (
    <AdminModuleShell
      title="User Management"
      description="Monitor every buyer, seller and partner across registration and verification stages"
      icon={Users}
      currentView={activeTab === "All" ? "All Users" : `${activeTab}s`}
      actions={
        <button onClick={() => load(pagination.page)} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Users" value={stats.total} hint="Across all account types" icon={Users} />
          <StatCard label="Buyers + Sellers" value={(stats.buyers || 0) + (stats.sellers || 0)} hint={`${stats.buyers || 0} buyers, ${stats.sellers || 0} sellers`} icon={UserRoundCheck} tone="blue" />
          <StatCard label="Verified Partners" value={stats.verifiedPartners} hint="Approved and verified" icon={ShieldCheck} tone="violet" />
          <StatCard label="Pending Partners" value={stats.pendingPartners} hint="Approval or verification pending" icon={Clock3} tone="amber" />
        </div>

        <section className="rounded-[18px] border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {TABS.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${activeTab === tab ? "bg-[#1F3C50] text-white shadow-sm" : "bg-[#F2F6F7] text-[#667B88] hover:bg-[#EAF9F4] hover:text-[#15966F]"}`}>
                  {tab === "All" ? "All Users" : `${tab}s`}
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] ${activeTab === tab ? "bg-white/15" : "bg-white"}`}>{counts[tab]}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative min-w-0 sm:w-72">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA0AC]" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, ID, email or phone" className="w-full rounded-xl border border-[#DCE5E9] bg-[#F9FBFB] py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10" />
              </label>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-[#DCE5E9] bg-[#F9FBFB] px-3 py-2.5 text-xs font-semibold text-[#526A78] outline-none">
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="Verified">Verified</option>
                <option value="Approval Pending">Approval Pending</option>
                <option value="Approved - Verification Pending">Approved - Verification Pending</option>
                <option value="Email Verification Pending">Email Verification Pending</option>
                <option value="Phone Verification Pending">Phone Verification Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          {error && <div className="m-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700"><AlertCircle size={16} />{error}</div>}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#1F3C50] text-[10px] uppercase tracking-[0.12em] text-white">
                <tr><th className="px-4 py-3.5">User</th><th className="px-4 py-3.5">Account Type</th><th className="px-4 py-3.5">Location</th><th className="px-4 py-3.5">Verification</th><th className="px-4 py-3.5">Status</th><th className="px-4 py-3.5 text-right">Joined</th></tr>
              </thead>
              <tbody className="divide-y divide-[#E7EEF1]">
                {loading ? (
                  <tr><td colSpan="6" className="py-14 text-center text-sm text-[#80929D]">Loading users...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="6" className="py-14 text-center"><Users className="mx-auto text-[#B8C6CE]" size={32} /><p className="mt-3 text-sm font-semibold text-[#526A78]">No users found</p></td></tr>
                ) : users.map((user) => (
                  <tr key={`${user.type}-${user._id}`} onClick={() => setSelected(user)} className="cursor-pointer text-xs text-[#526A78] transition hover:bg-[#F5FBF9]">
                    <td className="px-4 py-3.5"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF9F4] font-bold text-[#15966F]">{user.initials}</div><div><p className="font-bold text-[#173247]">{user.name}</p><p className="mt-0.5 text-[10px] text-[#8CA0AC]">{user.userCode} • {user.email}</p></div></div></td>
                    <td className="px-4 py-3.5"><span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${typeTone[user.type] || "bg-slate-50 text-slate-600"}`}>{user.type}{user.accountType ? ` • ${user.accountType}` : ""}</span></td>
                    <td className="px-4 py-3.5"><span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#8CA0AC]" />{user.location}</span></td>
                    <td className="px-4 py-3.5"><div className="flex flex-wrap gap-1.5"><span className={`rounded-md px-2 py-1 text-[9px] font-bold ${user.emailVerified ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>Email {user.emailVerified ? "✓" : "Pending"}</span><span className={`rounded-md px-2 py-1 text-[9px] font-bold ${user.phoneVerified ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>Phone {user.phoneVerified ? "✓" : "Pending"}</span></div></td>
                    <td className="px-4 py-3.5"><span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusTone(user.status)}`}>{user.status}</span></td>
                    <td className="px-4 py-3.5 text-right text-[10px] text-[#80929D]">{user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-[#E7EEF1] px-4 py-3 text-xs text-[#80929D]">
            <span>{pagination.total || 0} matching users</span>
            <div className="flex items-center gap-2"><button disabled={pagination.page <= 1 || loading} onClick={() => load(pagination.page - 1)} className="rounded-lg border border-[#DCE5E9] p-2 disabled:opacity-40"><ChevronLeft size={14} /></button><span className="font-semibold text-[#526A78]">Page {pagination.page || 1} of {pagination.pages || 1}</span><button disabled={pagination.page >= pagination.pages || loading} onClick={() => load(pagination.page + 1)} className="rounded-lg border border-[#DCE5E9] p-2 disabled:opacity-40"><ChevronRight size={14} /></button></div>
          </div>
        </section>
      </div>

      {selected && <><button aria-label="Close user details" onClick={() => setSelected(null)} className="fixed inset-0 z-40 bg-[#0C2333]/25 backdrop-blur-[2px]" /><aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl"><div className="relative overflow-hidden bg-[#1F3C50] p-5 text-white"><div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#35C99A]/15" /><div className="relative flex items-start justify-between"><div className="flex gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#35C99A] text-sm font-bold">{selected.initials}</div><div><h2 className="text-lg font-bold">{selected.name}</h2><p className="text-xs text-[#C3D0D8]">{selected.type} • {selected.userCode}</p></div></div><div className="flex items-center gap-1">
<button
  onClick={handleDeleteUser}
  className="rounded-lg p-2 text-rose-200 hover:bg-rose-500/20"
  title="Delete account"
>
  <Trash2 size={18} />
</button>
<button onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-white/10"><X size={18} /></button>
</div></div></div><div className="flex-1 space-y-4 overflow-y-auto p-5"><div className="rounded-2xl border border-[#DCE5E9] bg-[#F9FBFB] p-4"><h3 className="text-xs font-bold text-[#173247]">Contact information</h3><div className="mt-3 space-y-3 text-xs text-[#526A78]"><p className="flex gap-2"><Mail size={14} className="text-[#15966F]" />{selected.email}</p><p className="flex gap-2"><Phone size={14} className="text-[#15966F]" />{selected.phone}</p><p className="flex gap-2"><MapPin size={14} className="text-[#15966F]" />{selected.location}</p></div></div><div className="rounded-2xl border border-[#DCE5E9] p-4"><h3 className="text-xs font-bold text-[#173247]">Account progress</h3><div className="mt-4 space-y-3">{[["Email verified",selected.emailVerified],["Phone verified",selected.phoneVerified],["Admin approved",selected.approved],["Final verification",selected.verified]].map(([label,done])=><div key={label} className="flex items-center justify-between text-xs"><span className="text-[#526A78]">{label}</span>{done?<CheckCircle2 size={16} className="text-[#15966F]"/>:<Clock3 size={16} className="text-amber-500"/>}</div>)}</div></div><div className="rounded-2xl border border-[#DCE5E9] p-4"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#173247]">Current status</span><span className={`rounded-full border px-3 py-1 text-[10px] font-bold ${statusTone(selected.status)}`}>{selected.status}</span></div>{selected.applicationStatus && <p className="mt-3 text-[11px] text-[#80929D]">Application status: {selected.applicationStatus}</p>}</div></div></aside></>}
    </AdminModuleShell>
  );
}
