import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBarChartFill } from "react-icons/bs";
import { MdOutlineApartment, MdOutlinePersonAdd, MdOutlineVerifiedUser } from "react-icons/md";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchAdminDashboardSummary, fetchLeadAnalytics } from "../../Services/dashboardService";

const DARK = "#0d2d2a";

function MiniBarChart({ bars, barColor }) {
  const max = Math.max(...bars);
  return (
    <div className="mt-3 flex h-10 items-end gap-1">
      {bars.map((height, index) => (
        <div key={index} className="flex-1 rounded-sm" style={{ height: `${(height / max) * 100}%`, backgroundColor: barColor, opacity: 0.85 }} />
      ))}
    </div>
  );
}

function StatCard({ label, value, barColor, bars }) {
  return (
    <div className="flex min-h-[160px] flex-col justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100"><BsBarChartFill size={18} className="text-gray-500" /></div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-700">Live data</span>
      </div>
      <div>
        <p className="mt-3 text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-0.5 text-2xl font-bold" style={{ color: DARK }}>{value}</p>
        <MiniBarChart bars={bars} barColor={barColor} />
      </div>
    </div>
  );
}

const formatBucket = (key, period) => {
  if (period === "year") return key;
  const date = period === "month" ? new Date(`${key}-01T00:00:00Z`) : new Date(`${key}T00:00:00Z`);
  return date.toLocaleDateString("en-IN", period === "month"
    ? { month: "short", year: "2-digit" }
    : { day: "2-digit", month: "short" });
};

const qualityTone = (accuracy) => {
  if (accuracy >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (accuracy >= 60) return "text-teal-600 bg-teal-50 border-teal-200";
  if (accuracy >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [period, setPeriod] = useState("day");
  const [analytics, setAnalytics] = useState(null);
  const [summaryError, setSummaryError] = useState("");
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchAdminDashboardSummary()
      .then((response) => {
        if (active) {
          setSummary(response?.data || {});
          setSummaryError("");
        }
      })
      .catch((error) => active && setSummaryError(error?.response?.data?.message || "Unable to load dashboard counts"));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    setChartLoading(true);
    fetchLeadAnalytics(period)
      .then((response) => active && setAnalytics(response?.data || null))
      .catch(() => active && setAnalytics(null))
      .finally(() => active && setChartLoading(false));
    return () => { active = false; };
  }, [period]);

  const chartData = useMemo(
    () => (analytics?.trend || []).map((item) => ({ ...item, label: formatBucket(item.key, period) })),
    [analytics, period]
  );

  const formatCount = (value) => summary ? Number(value || 0).toLocaleString("en-IN") : "—";
  const quality = analytics?.todayQuality || { received: 0, verified: 0, verifiedActions: 0, accuracy: 0, label: "Needs Attention" };

  const statCards = [
    { label: "Live Properties", value: formatCount(summary?.liveProperties), barColor: "#9ca3af", bars: [3, 4, 5, 5, 6, 7, 8] },
    { label: "Verified Partners", value: formatCount(summary?.activePartners), barColor: "#6ee7b7", bars: [3, 4, 5, 5, 6, 7, 8] },
    { label: "Registered Users", value: formatCount(summary?.registeredUsers), barColor: "#9ca3af", bars: [3, 4, 5, 6, 7, 8, 9] },
    { label: "Total Buyers", value: formatCount(summary?.totalBuyers), barColor: "#93c5fd", bars: [3, 4, 4, 5, 6, 7, 8] },
    { label: "Total Sellers", value: formatCount(summary?.totalSellers), barColor: "#fde68a", bars: [3, 3, 4, 5, 5, 6, 7] },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: DARK, fontFamily: "Georgia, serif" }}>Welcome back, Admin 👋</h1>
        <p className="mt-1 text-sm text-gray-500">Track platform growth, lead activity and verification accuracy in real time.</p>
      </div>

      {summaryError && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{summaryError}</div>}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => <StatCard key={card.label} {...card} />)}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_18px_45px_rgba(13,45,42,0.10)] sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2"><h2 className="text-xl font-bold text-[#173247]">Lead Activity</h2><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">LIVE</span></div>
              <p className="mt-1 text-xs text-slate-500">Received and admin-verified leads over time.</p>
            </div>
            <div className="flex w-fit rounded-xl bg-slate-100 p-1">
              {[["day", "Day"], ["month", "Month"], ["year", "Year"]].map(([value, label]) => (
                <button key={value} onClick={() => setPeriod(value)} className={`rounded-lg px-4 py-2 text-xs font-bold transition ${period === value ? "bg-[#0d2d2a] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>{label}</button>
              ))}
            </div>
          </div>

          <div className="h-[340px] w-full">
            {chartLoading ? <div className="flex h-full items-center justify-center text-sm text-slate-400">Loading lead graph...</div> : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 14, right: 12, left: -15, bottom: 5 }}>
                  <defs>
                    <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#173247" stopOpacity={0.42} />
                      <stop offset="72%" stopColor="#173247" stopOpacity={0.10} />
                      <stop offset="100%" stopColor="#173247" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="verifiedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.50} />
                      <stop offset="72%" stopColor="#10B981" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.01} />
                    </linearGradient>
                    <filter id="receivedGlow" x="-20%" y="-30%" width="140%" height="170%">
                      <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#173247" floodOpacity="0.24" />
                    </filter>
                    <filter id="verifiedGlow" x="-20%" y="-30%" width="140%" height="170%">
                      <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#10B981" floodOpacity="0.28" />
                    </filter>
                  </defs>
                  <CartesianGrid stroke="#E8EEED" strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", boxShadow: "0 8px 24px rgba(15,23,42,.08)" }} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 14 }} />
                  <Area type="monotone" dataKey="received" name="Leads Received" stroke="#173247" strokeWidth={3} fill="url(#receivedGradient)" dot={{ r: 4, fill: "#173247", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 7, stroke: "#fff", strokeWidth: 3 }} style={{ filter: "url(#receivedGlow)" }} />
                  <Area type="monotone" dataKey="verified" name="Leads Verified" stroke="#10B981" strokeWidth={3} fill="url(#verifiedGradient)" dot={{ r: 4, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 7, stroke: "#fff", strokeWidth: 3 }} style={{ filter: "url(#verifiedGlow)" }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-slate-500"><MdOutlineVerifiedUser size={19} /><span className="text-[10px] font-bold uppercase tracking-widest">Today's Lead Quality</span></div>
            <div className="flex items-end justify-between gap-3">
              <div><p className="text-4xl font-extrabold text-[#173247]">{quality.accuracy}%</p><p className="mt-1 text-xs text-slate-500">Verification accuracy</p></div>
              <span className={`rounded-full border px-3 py-1.5 text-xs font-bold ${quality.received ? qualityTone(quality.accuracy) : "border-slate-200 bg-slate-50 text-slate-500"}`}>{quality.label}</span>
            </div>
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${Math.min(quality.accuracy, 100)}%` }} /></div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-lg font-bold text-[#173247]">{quality.received}</p><p className="text-[10px] text-slate-500">Received today</p></div>
              <div className="rounded-xl bg-emerald-50 p-3"><p className="text-lg font-bold text-emerald-700">{quality.verified}</p><p className="text-[10px] text-slate-500">Today's leads verified</p></div>
              <div className="rounded-xl bg-blue-50 p-3"><p className="text-lg font-bold text-blue-700">{quality.verifiedActions}</p><p className="text-[10px] text-slate-500">Admin verified today</p></div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">Accuracy = verified leads received today ÷ total leads received today. 80%+ is excellent; below 40% needs attention.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#173247]">Executive Actions</h2>
            <button onClick={() => navigate("/add-property")} className="flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-left text-sm font-bold text-white" style={{ backgroundColor: DARK }}><MdOutlineApartment size={20} />Add Property</button>
            <button onClick={() => navigate("/partnerdashboard?tab=applications")} className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-teal-700"><MdOutlinePersonAdd size={20} />Approve Agent</button>
          </section>
        </aside>
      </div>
    </div>
  );
}
