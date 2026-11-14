import { useState } from "react";
import { FiFilter, FiUpload, FiEye, FiEdit2, FiChevronDown, FiChevronUp, FiX, FiInfo } from "react-icons/fi";
import { MdOutlineCheckCircle, MdOutlineAutoAwesome, MdTrendingUp } from "react-icons/md";
import { BsRobot } from "react-icons/bs";

const DARK = "#0d2d2a";

const properties = [
  {
    id: "DNW-8829",
    name: "The Obsidian Penthouse",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120&q=80",
    location: "Downtown, Singapore",
    status: "VERIFIED",
    price: "$4,250,000",
    agent: { name: "Elena Vance", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    leads: 24,
  },
  {
    id: "DNW-7741",
    name: "Azure Coast Estate",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=120&q=80",
    location: "Sentosa Cove",
    status: "PENDING",
    price: "$12,800,000",
    agent: { name: "Marcus Th...", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    leads: 18,
  },
  {
    id: "DNW-9002",
    name: "Neo-Industrial Loft",
    img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=120&q=80",
    location: "Tanjong Pagar",
    status: "VERIFIED",
    price: "$1,950,000",
    agent: { name: "Leo Zhang", img: "https://randomuser.me/api/portraits/men/65.jpg" },
    leads: 11,
  },
];

function StatusBadge({ status }) {
  const isVerified = status === "VERIFIED";
  return (
    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${isVerified ? "text-teal-700 border-teal-400 bg-white" : "text-yellow-600 border-yellow-400 bg-white"}`}>
      {status}
    </span>
  );
}

function AIAssistant({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#f0faf8" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: DARK }}>
            <BsRobot size={16} />
          </div>
          <span className="text-sm font-bold" style={{ color: DARK }}>AI Property Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <FiChevronDown size={16} className="text-gray-500" />
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <FiX size={15} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <p className="text-xs text-gray-500 italic mb-4">Select a property from the table to unlock AI workflows.</p>

        <button className="w-full flex items-center justify-between text-sm font-semibold text-white px-4 py-3 rounded-xl mb-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: "#10b981" }}>
          Generate Description
          <MdOutlineAutoAwesome size={16} className="text-white" />
        </button>

        <button className="w-full flex items-center justify-between text-sm font-semibold px-4 py-3 rounded-xl border-2 mb-4 hover:bg-teal-50 transition-colors" style={{ borderColor: "#10b981", color: "#10b981", backgroundColor: "white" }}>
          Suggest Price
          <MdTrendingUp size={16} />
        </button>

        <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-start gap-2.5">
          <FiInfo size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            DIGINIWAS AI analyzed <span className="font-bold text-gray-900">market volatility</span>. Recommendation: Increase lead capture requirements for premium estates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PropertyManagement() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Portfolio / <span className="text-gray-700">Properties</span></p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: DARK, fontFamily: "Georgia, serif" }}>Property Management</h1>
            <p className="text-sm text-gray-500">Oversee asset verification, lead distribution, and AI-driven valuation.</p>
          </div>
          <div className="flex items-center gap-3 self-start mt-1">
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors">
              <FiFilter size={15} /> Filter
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors">
              <FiUpload size={15} /> Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Property Name", "Location", "Status", "Market Price", "Assigned Agent", "Leads", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase px-5 py-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map((p, i) => (
                  <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i === properties.length - 1 ? "border-0" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.img} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{p.location}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">{p.price}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <img src={p.agent.img} alt={p.agent.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                        <span className="text-sm text-gray-700">{p.agent.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-900">{p.leads}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <FiEye size={17} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <FiEdit2 size={15} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <MdOutlineCheckCircle size={19} className="text-teal-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500">Showing 1 to 3 of 152 Assets</p>
          </div>
        </div>

      </div>

      <AIAssistant open={chatOpen} onClose={() => setChatOpen(false)} />

      <button
        onClick={() => setChatOpen(v => !v)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-opacity"
        style={{ backgroundColor: DARK }}
      >
        {chatOpen ? <FiX size={22} /> : <BsRobot size={22} />}
      </button>

    </div>
  );
}