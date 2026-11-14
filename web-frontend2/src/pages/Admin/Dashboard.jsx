import { useState } from "react";
import { FiSearch, FiBell, FiClock, FiMenu, FiX, FiCheck, FiX as FiClose } from "react-icons/fi";
import { MdOutlineGridView, MdOutlineApartment, MdOutlinePeople, MdOutlineContactPhone, MdOutlineLightbulb, MdOutlineBarChart, MdOutlineSettings, MdOutlinePersonAdd, MdOutlineDescription, MdOutlineFlashOn, MdOutlineShield, MdOutlineLocationOn, MdOutlineTrendingUp, MdOutlineVerifiedUser } from "react-icons/md";
import { BsArrowUpShort, BsArrowDownShort, BsBarChartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PropertyManagement from "./PropertyManagement";

const DARK = "#0d2d2a";

const navItems = [
  { icon: <MdOutlineGridView size={20} />, label: "Dashboard", active: true },
  { icon: <MdOutlineApartment size={20} />, label: "Property Management",  },
//   { icon: <MdOutlinePeople size={20} />, label: "Agents" },
//   { icon: <MdOutlineContactPhone size={20} />, label: "CRM" },
//   { icon: <MdOutlineLightbulb size={20} />, label: "AI Recommendations" },
//   { icon: <MdOutlineBarChart size={20} />, label: "Analytics" },
//   { icon: <MdOutlineSettings size={20} />, label: "Settings" },
];

const statCards = [
  {
    label: "Total Properties", value: "12,482", change: "+12.5%", up: true,
    color: "#6b7280", barColor: "#9ca3af",
    bars: [3, 4, 5, 5, 6, 7, 8],
  },
  {
    label: "Active Partners", value: "2,105", change: "+4.2%", up: true,
    color: "#10b981", barColor: "#6ee7b7",
    bars: [3, 4, 5, 5, 6, 7, 8],
  },
  {
    label: "Registered Users", value: "84,930", change: "+18.7%", up: true,
    color: "#6b7280", barColor: "#9ca3af",
    bars: [3, 4, 5, 6, 7, 8, 9],
  },
  {
    label: "Monthly Revenue", value: "₹4.2 Cr", change: "-2.1%", up: false,
    color: "#ca8a04", barColor: "#fde68a",
    bars: [6, 6, 7, 7, 6, 7, 7],
  },
];

const pendingApprovals = [
  { initials: "SK", color: "bg-gray-400", name: "Sameer K.", sub: "Broker License V-45" },
  { initials: "RM", color: "bg-teal-500", name: "Ritu Mehra", sub: "Property Listing #992" },
];

function MiniBarChart({ bars, barColor }) {
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-1 h-10 mt-3">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{ height: `${(h / max) * 100}%`, backgroundColor: barColor, opacity: 0.85 }}
        />
      ))}
    </div>
  );
}

function StatCard({ label, value, change, up, barColor, bars }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[160px]">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
          <BsBarChartFill size={18} className="text-gray-500" />
        </div>
        <span className={`text-xs font-bold flex items-center gap-0.5 ${up ? "text-teal-600" : "text-red-500"}`}>
          {change}
          {up ? <BsArrowUpShort size={14} /> : <BsArrowDownShort size={14} />}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mt-3">{label}</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: DARK }}>{value}</p>
        <MiniBarChart bars={bars} barColor={barColor} />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
    const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard")

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-white h-full flex flex-col py-6 px-5 shadow-xl z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-2xl font-black tracking-tight leading-none" style={{ color: DARK, fontFamily: "Georgia, serif" }}>DIGINIWA</div>
                <div className="text-[10px] font-semibold tracking-widest text-gray-400 mt-0.5">AI EXECUTIVE SUITE</div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <FiX size={18} className="text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <button key={item.label}  onClick={() => setActiveTab(item.label)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${item.active ? "text-teal-700 font-semibold border-r-4 border-teal-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`} style={item.active ? { backgroundColor: "#f0faf8" } : {}}>
                  <span className={item.active ? "text-teal-600" : "text-gray-400"}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-white sticky top-0 h-screen py-6 px-5 border-r border-gray-100">
        <div className="mb-8">
          <div className="text-2xl font-black tracking-tight leading-none" style={{ color: DARK, fontFamily: "Georgia, serif" }}>DIGINIWA</div>
          <div className="text-[10px] font-semibold tracking-widest text-gray-400 mt-0.5">AI EXECUTIVE SUITE</div>
        </div>
        <nav className="flex-1 space-y-1">
          {/* {navItems.map((item) => (
            <button key={item.label} onClick={() => setActiveTab(item.label)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm 
            font-medium transition-colors text-left ${item.active ? "text-teal-700 font-semibold border-r-4 border-teal-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`} style={item.active ? { backgroundColor: "#f0faf8" } : {}}>
              <span className={item.active ? "text-teal-600" : "text-gray-400"}>{item.icon}</span>
              {item.label}
            </button>
          ))} */}
          {navItems.map((item) => {
                    const isActive = activeTab === item.label;

                    return (
                        <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`w-full flex items-center gap-3  py-2.5 rounded-xl text-sm transition-all duration-200 text-left
                            ${
                            isActive
                                ? "text-teal-700 font-semibold border-r-4 whitespace-nowrap border-teal-600 bg-teal-50"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                        <span className={isActive ? "text-teal-600" : "text-gray-400"}>
                            {item.icon}
                        </span>

                        <span>{item.label}</span>
                        </button>
                    );
                    })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center gap-3">
          <button className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg flex-shrink-0" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={20} className="text-gray-600" />
          </button>
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <FiSearch size={15} className="text-gray-400 flex-shrink-0" />
              <input className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Search ecosystem data..." />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <FiBell size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <FiClock size={18} />
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-white rounded-full px-4 py-2 whitespace-nowrap" style={{ backgroundColor: DARK }}>
              <MdOutlineFlashOn size={16} /> Deploy AI Agent
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-6">
        {
            activeTab === "Dashboard" && (  
            <div> 
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: DARK, fontFamily: "Georgia, serif" }}>
              Welcome back, Admin 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage India's smartest AI-powered real estate ecosystem with precision and clarity.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          <div className="flex flex-col xl:flex-row gap-6">

            <div className="flex-1 min-w-0 flex flex-col gap-6">

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold" style={{ color: DARK, fontFamily: "Georgia, serif" }}>Predictive AI Insights</h2>
                  <span className="text-[10px] font-bold border border-gray-300 text-gray-600 rounded-full px-3 py-1 whitespace-nowrap">REAL-TIME</span>
                  <span className="text-[10px] font-bold border border-gray-300 text-gray-600 rounded-full px-3 py-1 whitespace-nowrap">VIP ASSETS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MdOutlineTrendingUp size={16} className="text-teal-600" />
                      <span className="text-[10px] font-bold tracking-widest text-teal-600 uppercase">Market Intelligence</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: DARK }}>Demand Forecast</h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">Predicted 14% increase in luxury commercial inventory demand in Mumbai North for Q4 2024.</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-teal-600">88%</p>
                        <p className="text-xs text-teal-600 font-medium mt-0.5">Confidence Score</p>
                      </div>
                      <button className="border border-gray-300 text-sm font-semibold text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors">
                        Detailed Report
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MdOutlineVerifiedUser size={16} className="text-gray-500" />
                      <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Lead Processing</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: DARK }}>Lead Quality Score</h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">Current average lead quality index is 9.2/10. AI filtering has reduced junk leads by 42% this week.</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold" style={{ color: DARK }}>9.2</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">Global Average</p>
                      </div>
                      <button className="border border-gray-300 text-sm font-semibold text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors">
                        Optimize Flow
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80"
                    alt="The Altima Signature"
                    className="w-full sm:w-72 h-52 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-yellow-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">VIP Asset</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: DARK, fontFamily: "Georgia, serif" }}>The Altima Signature</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">A landmark residential development featuring 52 ultra-luxury penthouses with AI-integrated climat...</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MdOutlineLocationOn size={16} className="text-teal-500" />
                      Worli, Mumbai
                    </div>
                    <span className="text-lg font-bold" style={{ color: DARK }}>₹125.0 Cr</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-4">

              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: DARK, fontFamily: "Georgia, serif" }}>Executive Actions</h2>
                <div className="flex flex-col gap-3">
                  <button onClick={() => navigate("/add-property")} className="w-full flex items-center gap-3 text-sm font-bold text-white rounded-2xl px-5 py-4 hover:opacity-90 transition-opacity text-left" style={{ backgroundColor: DARK }}>
                    <MdOutlineApartment size={20} className="flex-shrink-0" />
                    Add Property
                  </button>
                  <button className="w-full flex items-center gap-3 text-sm font-semibold text-teal-700 rounded-2xl px-5 py-4 border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-left">
                    <MdOutlinePersonAdd size={20} className="text-teal-600 flex-shrink-0" />
                    Approve Partner
                  </button>
                  <button className="w-full flex items-center gap-3 text-sm font-semibold text-gray-700 rounded-2xl px-5 py-4 border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-left">
                    <MdOutlineDescription size={20} className="text-gray-500 flex-shrink-0" />
                    View Reports
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Pending Approvals</p>
                <div className="space-y-3">
                  {pendingApprovals.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${p.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {p.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-400 truncate">{p.sub}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-50 transition-colors">
                          <FiCheck size={13} className="text-teal-500" />
                        </button>
                        <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors">
                          <FiClose size={13} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-700 pt-3 border-t border-gray-100">
                  See all 12 pending items
                </button>
              </div>

              <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: DARK }}>
                <div className="flex items-center justify-between mb-2">
                  <MdOutlineShield size={22} className="text-teal-400" />
                  <span className="text-[10px] font-bold bg-teal-500 text-white px-2.5 py-1 rounded-full tracking-wide">SECURE</span>
                </div>
                <h3 className="text-lg font-bold mt-3 mb-1" style={{ fontFamily: "Georgia, serif" }}>System Health</h3>
                <p className="text-xs text-gray-300 mb-4 leading-relaxed">AI Core running optimally. No security anomalies detected in the last 48 hours.</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: "98%" }} />
                  </div>
                  <span className="text-sm font-bold text-teal-400 flex-shrink-0">98%</span>
                </div>
              </div>

            </div>
          </div>
            </div> )
        } 

        {activeTab === "Property Management" && (<PropertyManagement/>)}

        </main>
      </div>
    </div>
  );
}