import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiFilter,
  FiUpload,
  FiEye,
  FiChevronDown,
  FiX,
  FiInfo,
  FiRefreshCw,
  FiMapPin,
} from "react-icons/fi";
import {
  MdOutlineAutoAwesome,
  MdTrendingUp,
} from "react-icons/md";
import { BsRobot } from "react-icons/bs";

const DARK = "#0d2d2a";
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/160x120?text=Property";

function getTokenConfig() {
  const token = localStorage.getItem("token");
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
}

function formatMoney(value) {
  const amount = Number(value);
  if (!amount || Number.isNaN(amount)) return "—";
  return `₹${amount.toLocaleString("en-IN")}`;
}

function normalizeProperty(property = {}) {
  const location = property.location || {};
  const rent = property.rent || {};
  const images = Array.isArray(property.images)
    ? property.images
    : Array.isArray(property.media?.images)
      ? property.media.images
      : [];

  const image =
    images.find((item) => item?.url)?.url ||
    FALLBACK_IMAGE;

  const isRent = /rent|lease/i.test(
    String(
      property.transactionType ||
        property.listingType ||
        property.category ||
        ""
    )
  );

  const rawPrice = isRent
    ? rent.amount ?? property.price
    : typeof property.price === "object"
      ? property.price?.amount
      : property.price;

  const frequency = rent.frequency || "";

  return {
    id: property._id,
    propertyId: property.propertyId || String(property._id || "—"),
    name: property.title || "Untitled Property",
    img: image,
    location:
      [
        location.locality || property.locality,
        location.city || property.city,
        location.state || property.state,
      ]
        .filter(Boolean)
        .join(", ") || "Location unavailable",
    city: location.city || property.city || "",
    status: String(property.status || "Draft").toUpperCase(),
    propertyType: property.propertyType || "—",
    buildingType: property.buildingType || "—",
    transactionType: property.transactionType || "—",
    category: property.category || "—",
    price: formatMoney(rawPrice),
    priceValue: Number(rawPrice || 0),
    frequency,
    rentLabel: isRent && frequency
      ? `${formatMoney(rawPrice)} / ${String(frequency).toLowerCase().replace(/^per\s+/i, "per ")}`
      : formatMoney(rawPrice),
    size: property.propertySize || property.areaDetails?.[0]?.value || "—",
    sizeUnit:
      property.sizeUnit ||
      property.areaDetails?.[0]?.unit ||
      "sqft",
    bhk: property.bhk || property.bedrooms || "—",
  };
}

function StatusBadge({ status }) {
  const normalized = String(status || "").toUpperCase();
  const isVerified =
    normalized === "VERIFIED" ||
    normalized === "LIVE";
  const isAssigned = normalized === "ASSIGNED";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold ${
        isVerified
          ? "border-teal-400 bg-white text-teal-700"
          : isAssigned
            ? "border-blue-400 bg-white text-blue-700"
            : "border-yellow-400 bg-white text-yellow-600"
      }`}
    >
      {status}
    </span>
  );
}

function AIAssistant({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl sm:right-6 sm:w-96">
      <div className="flex items-center justify-between bg-[#f0faf8] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: DARK }}
          >
            <BsRobot size={16} />
          </div>
          <span className="text-sm font-bold" style={{ color: DARK }}>
            AI Property Assistant
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FiChevronDown size={16} className="text-gray-500" />
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-200"
            type="button"
          >
            <FiX size={15} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <p className="mb-4 text-xs italic text-gray-500">
          Select a property from the table to unlock AI workflows.
        </p>

        <button
          className="mb-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#10b981" }}
          type="button"
        >
          Generate Description
          <MdOutlineAutoAwesome size={16} />
        </button>

        <button
          className="mb-4 flex w-full items-center justify-between rounded-xl border-2 bg-white px-4 py-3 text-sm font-semibold transition-colors hover:bg-teal-50"
          style={{ borderColor: "#10b981", color: "#10b981" }}
          type="button"
        >
          Suggest Price
          <MdTrendingUp size={16} />
        </button>

        <div className="flex items-start gap-2.5 rounded-xl bg-gray-50 px-4 py-3">
          <FiInfo size={15} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <p className="text-xs leading-relaxed text-gray-600">
            DIGINIWAS AI workflows are available from this property workspace.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PropertyManagement() {
  const [chatOpen, setChatOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const endpoint = token
        ? `${API_BASE_URL}/api/properties/all`
        : `${API_BASE_URL}/api/properties`;

      const response = await axios.get(
        endpoint,
        {
          params: {
            page: 1,
            limit: 100,
          },
          ...getTokenConfig(),
        }
      );

      const payload = response?.data || {};
      const source =
        Array.isArray(payload.properties)
          ? payload.properties
          : Array.isArray(payload.data)
            ? payload.data
            : [];

      setProperties(source.map(normalizeProperty));
    } catch (err) {
      console.error("Property Management Load Error:", err);
      setProperties([]);
      setError(
        err?.response?.data?.message ||
          "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return properties;

    return properties.filter((property) =>
      [
        property.name,
        property.propertyId,
        property.location,
        property.propertyType,
        property.transactionType,
        property.category,
        property.bhk,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [properties, search]);

  const exportProperties = () => {
    const rows = filteredProperties.map((property) => ({
      Property: property.name,
      PropertyID: property.propertyId,
      Location: property.location,
      PropertyType: property.propertyType,
      TransactionType: property.transactionType,
      Status: property.status,
      Price: property.rentLabel,
      BHK: property.bhk,
      Size: `${property.size} ${property.sizeUnit}`,
    }));

    const headers = Object.keys(rows[0] || {});
    if (!headers.length) return;

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) =>
            `"${String(row[header] ?? "").replaceAll("\"", "\"\"")}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diginiwas-properties.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Portfolio / <span className="text-gray-700">Properties</span>
            </p>
            <h1
              className="mb-1 text-3xl font-bold sm:text-4xl"
              style={{ color: DARK, fontFamily: "Georgia, serif" }}
            >
              Property Management
            </h1>
            <p className="text-sm text-gray-500">
              Real property records from DigiNiwas backend.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:mt-1">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search properties..."
                className="w-56 rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="button"
              onClick={fetchProperties}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FiRefreshCw size={15} />
              Refresh
            </button>

            <button
              type="button"
              onClick={exportProperties}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FiUpload size={15} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {loading ? (
            <div className="px-5 py-16 text-center text-sm text-gray-500">
              Loading properties...
            </div>
          ) : error ? (
            <div className="px-5 py-16 text-center">
              <p className="text-sm font-semibold text-red-600">{error}</p>
              <button
                type="button"
                onClick={fetchProperties}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0d2d2a] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <FiRefreshCw size={14} />
                Try Again
              </button>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm text-gray-500">
              No properties found.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {[
                        "Property Name",
                        "Location",
                        "Type",
                        "Transaction",
                        "Status",
                        "Price",
                        "Details",
                        "Actions",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="whitespace-nowrap px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProperties.map((property, index) => (
                      <tr
                        key={property.id || property.propertyId}
                        className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                          index === filteredProperties.length - 1
                            ? "border-0"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={property.img}
                              alt={property.name}
                              className="h-12 w-12 flex-shrink-0 rounded-xl object-cover"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-gray-900">
                                {property.name}
                              </p>
                              <p className="mt-0.5 text-xs text-gray-400">
                                ID: {property.propertyId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex max-w-[240px] items-start gap-1.5 text-sm text-gray-600">
                            <FiMapPin className="mt-0.5 flex-shrink-0" size={14} />
                            <span>{property.location}</span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {property.propertyType}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-400">
                              {property.buildingType}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {property.transactionType}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-400">
                              {property.category}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={property.status} />
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {property.rentLabel}
                        </td>

                        <td className="px-5 py-4">
                          <div className="text-sm text-gray-600">
                            <p>{property.bhk}</p>
                            <p className="mt-0.5 text-xs text-gray-400">
                              {property.size} {property.sizeUnit}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            className="rounded-full p-1 transition-colors hover:bg-gray-100"
                            title="View property"
                          >
                            <FiEye size={17} className="text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-gray-100 px-5 py-4">
                <p className="text-sm font-semibold text-gray-500">
                  Showing {filteredProperties.length} of {properties.length} properties
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <AIAssistant
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      <button
        onClick={() => setChatOpen((value) => !value)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-opacity hover:opacity-90 sm:right-6"
        style={{ backgroundColor: DARK }}
        type="button"
      >
        {chatOpen ? <FiX size={22} /> : <BsRobot size={22} />}
      </button>
    </div>
  );
}
