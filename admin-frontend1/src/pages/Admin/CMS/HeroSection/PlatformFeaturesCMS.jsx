import React, { useState, useEffect } from "react";
import { MdOutlineTitle, MdDynamicFeed, MdSave } from "react-icons/md";
import axios from "../../../../Services/axios";

export default function PlatformFeaturesCMS() {
  const [topTitle, setTopTitle] = useState("");
  const [features, setFeatures] = useState([
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);

  // Fetch Existing Data from Backend
  const getFeaturesData = async () => {
    try {
      const res = await axios.get("/cms/platform-features");
      if (res.data?.data) {
        setTopTitle(res.data.data.topTitle || "MORE THAN A PLATFORM");
        if (res.data.data.features && res.data.data.features.length === 3) {
          setFeatures(res.data.data.features);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFeaturesData();
  }, []);

  // Handle Input Changes for individual cards
  const handleCardChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  // Save changes to API
  const saveFeatures = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/cms/platform-features", {
        topTitle,
        features,
      });
      alert(res.data.message || "Saved successfully!");
      getFeaturesData();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Configuration Header Card */}
      <div className="bg-white rounded-3xl shadow-sm p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <MdOutlineTitle size={24} className="text-green-700" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-[#0d2d2a]">
              Section Heading Context
            </h3>
            <p className="text-sm text-gray-500">
              Manage the green overhead section tagline title.
            </p>
          </div>
        </div>
        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Section Top Line Title
          </label>
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 uppercase tracking-wider font-semibold"
            placeholder="MORE THAN A PLATFORM"
            value={topTitle}
            onChange={(e) => setTopTitle(e.target.value)}
          />
        </div>
      </div>

      {/* Feature Content Cards Management Area */}
      <div className="bg-white rounded-3xl shadow-sm p-7">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <MdDynamicFeed className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0d2d2a]">Feature Column Blocks</h3>
            <p className="text-sm text-gray-500">
              Modify headings and underlying paragraph narratives here.
            </p>
          </div>
        </div>

        {/* 3 Grid layout mapping precisely with layout screen dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50/50 shadow-sm relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="absolute top-4 right-4 bg-gray-200/60 font-mono text-xs px-2.5 py-1 rounded-full text-gray-600 font-bold">
                  Card 0{idx + 1}
                </span>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleCardChange(idx, "title", e.target.value)}
                    className="w-full font-bold text-lg text-gray-800 border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder={`Feature Title ${idx + 1}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Card Description
                  </label>
                  <textarea
                    rows={4}
                    value={feature.description}
                    onChange={(e) => handleCardChange(idx, "description", e.target.value)}
                    className="w-full text-sm text-gray-600 border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
                    placeholder="Describe specific workflow benefits transparently..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Trigger Panel Component */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end rounded-b-3xl">
        <button
          onClick={saveFeatures}
          disabled={loading}
          className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
        >
          <MdSave size={20} />
          {loading ? "Saving Records..." : "Save Platform Features"}
        </button>
      </div>
    </div>
  );
}