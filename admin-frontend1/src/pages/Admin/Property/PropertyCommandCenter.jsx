import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  Download,
  Plus,
  X,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileText,
  MoreVertical,
  SlidersHorizontal,
  Building2,
  IndianRupee,
  ShieldCheck,
  UserRound,
} from "lucide-react";

/* =========================================================
   DYNAMIC PROPERTY DATA
========================================================= */

const initialProperties = [
  {
    id: "PRP-1024",
    propertyName: "Skyline Heights",
    propertyType: "Apartment",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300",
    seller: "Rajesh Kumar",
    sellerId: "SL-1021",
    location: "Andheri West",
    city: "Mumbai",
    price: "₹2.5 Cr",
    priceValue: 25000000,
    status: "Action Required",
    verification: "Verification Failed",
    submittedDate: "16 Aug 2026",
    lastUpdated: "18 Aug 2026",
    exception: "Missing Ownership Document",
    exceptionDescription:
      "The automated OCR scan failed to verify the uploaded Title Deed. The document appears blurred or incomplete.",
    lifecycle: [
      {
        title: "Submitted",
        date: "16 Aug 2026",
        status: "completed",
      },
      {
        title: "Partner Assigned",
        date: "16 Aug 2026",
        status: "completed",
      },
      {
        title: "Verification Failed",
        date: "17 Aug 2026",
        status: "failed",
      },
      {
        title: "Admin Approval",
        date: "Pending",
        status: "pending",
      },
    ],
  },

  {
    id: "PRP-1025",
    propertyName: "Green View Residency",
    propertyType: "Villa",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300",
    seller: "Meera Desai",
    sellerId: "SL-1022",
    location: "Kharghar",
    city: "Navi Mumbai",
    price: "₹4.8 Cr",
    priceValue: 48000000,
    status: "Published",
    verification: "Verified",
    submittedDate: "15 Aug 2026",
    lastUpdated: "17 Aug 2026",
    exception: "",
    exceptionDescription: "",
    lifecycle: [
      {
        title: "Submitted",
        date: "15 Aug 2026",
        status: "completed",
      },
      {
        title: "Partner Assigned",
        date: "15 Aug 2026",
        status: "completed",
      },
      {
        title: "Verification Completed",
        date: "16 Aug 2026",
        status: "completed",
      },
      {
        title: "Published",
        date: "17 Aug 2026",
        status: "completed",
      },
    ],
  },

  {
    id: "PRP-1026",
    propertyName: "Ocean Pearl",
    propertyType: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300",
    seller: "Suresh Patel",
    sellerId: "SL-1023",
    location: "Worli",
    city: "Mumbai",
    price: "₹12 Cr",
    priceValue: 120000000,
    status: "Pending Review",
    verification: "Pending",
    submittedDate: "14 Aug 2026",
    lastUpdated: "18 Aug 2026",
    exception: "",
    exceptionDescription: "",
    lifecycle: [
      {
        title: "Submitted",
        date: "14 Aug 2026",
        status: "completed",
      },
      {
        title: "Partner Assigned",
        date: "15 Aug 2026",
        status: "completed",
      },
      {
        title: "Verification",
        date: "In Progress",
        status: "pending",
      },
    ],
  },

  {
    id: "PRP-1027",
    propertyName: "Emerald Heights",
    propertyType: "Penthouse",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=300",
    seller: "Amit Jain",
    sellerId: "SL-1024",
    location: "Bandra",
    city: "Mumbai",
    price: "₹8.2 Cr",
    priceValue: 82000000,
    status: "Admin Approval",
    verification: "Verified",
    submittedDate: "13 Aug 2026",
    lastUpdated: "18 Aug 2026",
    exception: "",
    exceptionDescription: "",
    lifecycle: [
      {
        title: "Submitted",
        date: "13 Aug 2026",
        status: "completed",
      },
      {
        title: "Partner Assigned",
        date: "14 Aug 2026",
        status: "completed",
      },
      {
        title: "Verification Completed",
        date: "15 Aug 2026",
        status: "completed",
      },
      {
        title: "Admin Approval",
        date: "Pending",
        status: "pending",
      },
    ],
  },
];

/* =========================================================
   SUMMARY CARD
========================================================= */

const SummaryCard = ({
  title,
  value,
  status,
  active,
  onClick,
}) => {
  const styles = {
    Total: {
      bg: "bg-white",
      border: "border-[#dfe9e7]",
      value: "text-[#274650]",
    },

    Pending: {
      bg: "bg-[#fff9fb]",
      border: "border-[#f0dddd]",
      value: "text-[#3e565d]",
    },

    Action: {
      bg: "bg-[#fff1f1]",
      border: "border-[#efcccc]",
      value: "text-[#c74343]",
    },

    Verification: {
      bg: "bg-[#fff7ee]",
      border: "border-[#f0dcc2]",
      value: "text-[#725c3c]",
    },

    Admin: {
      bg: "bg-[#fff9d9]",
      border: "border-[#f3e7a7]",
      value: "text-[#816d20]",
    },

    Published: {
      bg: "bg-[#e8faef]",
      border: "border-[#c6ecd4]",
      value: "text-[#238255]",
    },

    Exceptions: {
      bg: "bg-[#f6fbff]",
      border: "border-[#dbe7ee]",
      value: "text-[#496977]",
    },

    Sold: {
      bg: "bg-[#fafafa]",
      border: "border-[#e5e8e8]",
      value: "text-[#7a898c]",
    },
  };

  const current = styles[status] || styles.Total;

  return (
    <button
      onClick={onClick}
      className={`
        min-w-[105px] flex-1
        rounded-[8px] border
        px-3 py-2.5 text-left
        transition-all duration-200
        hover:-translate-y-[1px]
        hover:shadow-sm

        ${current.bg}
        ${
          active
            ? "border-[#178678] ring-1 ring-[#178678]/10"
            : current.border
        }
      `}
    >
      <p className="text-[7px] font-semibold uppercase tracking-[0.3px] text-[#7b8b8f]">
        {title}
      </p>

      <p
        className={`mt-2 text-[17px] font-semibold ${current.value}`}
      >
        {value}
      </p>
    </button>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({ status }) => {
  const styles = {
    "Action Required":
      "bg-[#fff0f0] text-[#cf4242] border-[#f3caca]",

    Published:
      "bg-[#e7f8ed] text-[#20885b] border-[#ccebd8]",

    "Pending Review":
      "bg-[#fff7e9] text-[#b37627] border-[#efd9ac]",

    "Admin Approval":
      "bg-[#fff8d6] text-[#987d1a] border-[#ede0a2]",

    Verified:
      "bg-[#e7f8ef] text-[#16835b] border-[#c8ead7]",
  };

  return (
    <span
      className={`
        inline-flex rounded-full border
        px-2 py-[3px]
        text-[7px] font-semibold
        ${styles[status] || "bg-gray-50 text-gray-500 border-gray-200"}
      `}
    >
      {status}
    </span>
  );
};

/* =========================================================
   RIGHT SIDE PROPERTY PANEL
========================================================= */

const PropertyDetailsPanel = ({
  property,
  onClose,
  onResolve,
}) => {
  if (!property) return null;

  return (
    <aside
      className="
        sticky top-0
        h-screen
        overflow-hidden
        border-l border-[#d9e5e2]
        bg-white
        shadow-[-5px_0_18px_rgba(20,50,50,0.06)]
      "
    >
      {/* HEADER */}

      <div className="bg-[#063b5c] px-4 py-3 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <StatusBadge status={property.status} />

              <span className="text-[7px] text-[#d6e5eb]">
                {property.id}
              </span>
            </div>

            <h2 className="mt-2 text-[11px] font-semibold">
              {property.propertyName}
            </h2>

            <div className="mt-1 flex items-center gap-1 text-[7px] text-[#cae0e8]">
              <MapPin size={8} />

              {property.location}, {property.city}
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/10"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* SCROLL AREA */}

      <div
        className="
          h-[calc(100vh-69px)]
          overflow-y-auto
          px-4 pb-8 pt-4

          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* EXCEPTION */}

        {property.exception && (
          <div className="rounded-[7px] border border-[#f1cece] bg-[#fff8f8] p-3">
            <div className="flex gap-2">
              <AlertCircle
                size={13}
                className="mt-[1px] shrink-0 text-[#e44a4a]"
              />

              <div className="flex-1">
                <p className="text-[8px] font-semibold text-[#d24848]">
                  {property.exception}
                </p>

                <p className="mt-1.5 text-[7px] leading-[1.55] text-[#7b8588]">
                  {property.exceptionDescription}
                </p>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => onResolve(property.id)}
                    className="
                      rounded-[4px]
                      bg-[#cb272f]
                      px-3 py-1.5
                      text-[7px] font-semibold text-white
                      transition hover:bg-[#b61e25]
                    "
                  >
                    Request Re-upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROPERTY INFO */}

        <div className="mt-4">
          <h3 className="text-[8px] font-semibold uppercase tracking-[0.3px] text-[#718286]">
            Property Details
          </h3>

          <div className="mt-2 overflow-hidden rounded-[7px] border border-[#dee8e6]">
            <DetailRow
              icon={Building2}
              label="Property Type"
              value={property.propertyType}
            />

            <DetailRow
              icon={IndianRupee}
              label="Listed Price"
              value={property.price}
            />

            <DetailRow
              icon={UserRound}
              label="Seller"
              value={property.seller}
            />

            <DetailRow
              icon={MapPin}
              label="Location"
              value={`${property.location}, ${property.city}`}
              last
            />
          </div>
        </div>

        {/* LIFECYCLE */}

        <div className="mt-5">
          <h3 className="text-[8px] font-semibold uppercase tracking-[0.3px] text-[#718286]">
            Lifecycle Status
          </h3>

          <div className="mt-3">
            {property.lifecycle.map((item, index) => (
              <LifecycleItem
                key={index}
                item={item}
                last={
                  index === property.lifecycle.length - 1
                }
              />
            ))}
          </div>
        </div>

        {/* VERIFICATION */}

        <div className="mt-5 rounded-[7px] border border-[#dce6e4] p-3">
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={13}
              className={
                property.verification === "Verified"
                  ? "text-[#16846a]"
                  : property.verification ===
                    "Verification Failed"
                  ? "text-[#d84c4c]"
                  : "text-[#c08b28]"
              }
            />

            <div>
              <p className="text-[8px] font-semibold text-[#39545a]">
                Verification
              </p>

              <p className="mt-[2px] text-[7px] text-[#859497]">
                {property.verification}
              </p>
            </div>
          </div>
        </div>

        {/* DATES */}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-[6px] border border-[#dde7e5] p-3">
            <p className="text-[7px] text-[#8a989b]">
              Submitted
            </p>

            <p className="mt-1 text-[8px] font-medium text-[#3d555b]">
              {property.submittedDate}
            </p>
          </div>

          <div className="rounded-[6px] border border-[#dde7e5] p-3">
            <p className="text-[7px] text-[#8a989b]">
              Last Updated
            </p>

            <p className="mt-1 text-[8px] font-medium text-[#3d555b]">
              {property.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const DetailRow = ({
  icon: Icon,
  label,
  value,
  last = false,
}) => {
  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2.5
        ${!last ? "border-b border-[#edf2f1]" : ""}
      `}
    >
      <Icon
        size={11}
        className="shrink-0 text-[#718783]"
      />

      <div>
        <p className="text-[6.5px] text-[#8b999c]">
          {label}
        </p>

        <p className="mt-[2px] text-[8px] font-medium text-[#3e575c]">
          {value}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   LIFECYCLE
========================================================= */

const LifecycleItem = ({ item, last }) => {
  const color =
    item.status === "completed"
      ? "bg-[#13ad7d]"
      : item.status === "failed"
      ? "bg-[#e44747]"
      : "bg-[#d6dde0]";

  return (
    <div className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={`mt-[3px] h-[7px] w-[7px] rounded-full ${color}`}
        />

        {!last && (
          <span className="h-[36px] w-px bg-[#dce5e4]" />
        )}
      </div>

      <div className="pb-3">
        <p
          className={`text-[8px] font-medium ${
            item.status === "failed"
              ? "text-[#d24a4a]"
              : item.status === "pending"
              ? "text-[#9aa6a9]"
              : "text-[#415b60]"
          }`}
        >
          {item.title}
        </p>

        <p className="mt-[2px] text-[6.5px] text-[#9aa6a9]">
          {item.date}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function PropertyCommandCenter() {
  const [properties, setProperties] =
    useState(initialProperties);

  const [selectedProperty, setSelectedProperty] =
    useState(initialProperties[0]);

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [search, setSearch] = useState("");

  const [locationFilter, setLocationFilter] =
    useState("All");

  const [sellerFilter, setSellerFilter] =
    useState("All");

  /* ======================================================
     DYNAMIC COUNTS
  ====================================================== */

  const counts = useMemo(() => {
    return {
      total: properties.length,

      pending: properties.filter(
        (item) => item.status === "Pending Review"
      ).length,

      action: properties.filter(
        (item) => item.status === "Action Required"
      ).length,

      verification: properties.filter(
        (item) =>
          item.verification === "Pending" ||
          item.verification === "Verification Failed"
      ).length,

      admin: properties.filter(
        (item) => item.status === "Admin Approval"
      ).length,

      published: properties.filter(
        (item) => item.status === "Published"
      ).length,

      exceptions: properties.filter(
        (item) => item.exception
      ).length,
    };
  }, [properties]);

  /* ======================================================
     FILTERS
  ====================================================== */

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const value = search.toLowerCase();

      const matchesSearch =
        property.propertyName
          .toLowerCase()
          .includes(value) ||
        property.id.toLowerCase().includes(value) ||
        property.seller.toLowerCase().includes(value) ||
        property.location.toLowerCase().includes(value) ||
        property.city.toLowerCase().includes(value);

      const matchesStatus =
        activeFilter === "All" ||
        property.status === activeFilter;

      const matchesLocation =
        locationFilter === "All" ||
        property.city === locationFilter;

      const matchesSeller =
        sellerFilter === "All" ||
        property.seller === sellerFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLocation &&
        matchesSeller
      );
    });
  }, [
    properties,
    search,
    activeFilter,
    locationFilter,
    sellerFilter,
  ]);

  const cities = [
    "All",
    ...new Set(properties.map((item) => item.city)),
  ];

  const sellers = [
    "All",
    ...new Set(properties.map((item) => item.seller)),
  ];

  /* ======================================================
     ACTION
  ====================================================== */

  const handleResolve = (id) => {
    setProperties((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Pending Review",
              exception: "",
              exceptionDescription: "",
            }
          : item
      )
    );

    setSelectedProperty((previous) =>
      previous?.id === id
        ? {
            ...previous,
            status: "Pending Review",
            exception: "",
            exceptionDescription: "",
          }
        : previous
    );
  };

  return (
    <div className="min-h-screen bg-[#f6faf9]">
      <div
        className={`
          grid
          ${
            selectedProperty
              ? "xl:grid-cols-[minmax(0,1fr)_330px]"
              : "grid-cols-1"
          }
        `}
      >
        {/* =================================================
            LEFT CONTENT
        ================================================== */}

        <main className="min-w-0 px-4 py-4 sm:px-5">
          {/* BREADCRUMB */}

          <div className="flex items-center gap-1.5 text-[7px] text-[#849397]">
            <span>Properties</span>
            <span>›</span>

            <span className="text-[#41585e]">
              Property Management
            </span>
          </div>

          {/* HEADER */}

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
                Property Command Center
              </h1>
            </div>

            <div className="flex gap-2">
              <button
                className="
                  flex h-8 items-center gap-1.5
                  rounded-[5px]
                  border border-[#b8d6cf]
                  bg-white px-3
                  text-[8px] font-medium
                  text-[#23806e]
                "
              >
                <Download size={11} />

                Export
              </button>

              <button
                className="
                  flex h-8 items-center gap-1
                  rounded-[5px]
                  bg-[#0ca77c]
                  px-3
                  text-[8px] font-semibold
                  text-white
                  transition hover:bg-[#098d69]
                "
              >
                <Plus size={11} />

                New Property
              </button>
            </div>
          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================== */}

          <div
            className="
              mt-4 flex gap-2
              overflow-x-auto pb-1
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <SummaryCard
              title="Total Properties"
              value={counts.total}
              status="Total"
              active={activeFilter === "All"}
              onClick={() => setActiveFilter("All")}
            />

            <SummaryCard
              title="Pending Review"
              value={counts.pending}
              status="Pending"
              active={activeFilter === "Pending Review"}
              onClick={() =>
                setActiveFilter("Pending Review")
              }
            />

            <SummaryCard
              title="Action Required"
              value={counts.action}
              status="Action"
              active={activeFilter === "Action Required"}
              onClick={() =>
                setActiveFilter("Action Required")
              }
            />

            <SummaryCard
              title="Verification Pend."
              value={counts.verification}
              status="Verification"
            />

            <SummaryCard
              title="Admin Approval"
              value={counts.admin}
              status="Admin"
              active={activeFilter === "Admin Approval"}
              onClick={() =>
                setActiveFilter("Admin Approval")
              }
            />

            <SummaryCard
              title="Published"
              value={counts.published}
              status="Published"
              active={activeFilter === "Published"}
              onClick={() =>
                setActiveFilter("Published")
              }
            />

            <SummaryCard
              title="Exceptions"
              value={counts.exceptions}
              status="Exceptions"
            />

            <SummaryCard
              title="Sold/Rented"
              value="0"
              status="Sold"
            />
          </div>

          {/* =================================================
              STATUS TABS
          ================================================== */}

          <div
            className="
              mt-4 flex gap-5
              overflow-x-auto
              border-b border-[#dce7e5]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {[
              "All",
              "Draft",
              "Submitted",
              "Partner Assigned",
              "Partner Review",
              "Action Required",
              "Verification",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveFilter(
                    tab === "All" ? "All" : tab
                  )
                }
                className={`
                  relative min-w-max pb-2
                  text-[7px] font-medium

                  ${
                    activeFilter === tab ||
                    (tab === "All" &&
                      activeFilter === "All")
                      ? "text-[#147566]"
                      : "text-[#849397]"
                  }
                `}
              >
                {tab}

                {(activeFilter === tab ||
                  (tab === "All" &&
                    activeFilter === "All")) && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#087d6a]" />
                )}
              </button>
            ))}
          </div>

          {/* =================================================
              SEARCH / FILTERS
          ================================================== */}

          <div className="mt-3 flex flex-col gap-2 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={11}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89979a]"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Filter by ID, Seller, Partner..."
                className="
                  h-8 w-full
                  rounded-[5px]
                  border border-[#dae5e2]
                  bg-white
                  pl-8 pr-3
                  text-[8px]
                  text-[#435a60]
                  outline-none
                  placeholder:text-[#a0abad]
                  focus:border-[#74b8a9]
                "
              />
            </div>

            <FilterSelect
              value={activeFilter}
              onChange={setActiveFilter}
              options={[
                "All",
                "Action Required",
                "Pending Review",
                "Admin Approval",
                "Published",
              ]}
              label="All Statuses"
            />

            <FilterSelect
              value={locationFilter}
              onChange={setLocationFilter}
              options={cities}
              label="All Locations"
            />

            <FilterSelect
              value={sellerFilter}
              onChange={setSellerFilter}
              options={sellers}
              label="All Sellers"
            />

            <button
              className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-[5px]
                border border-[#dae5e2]
                bg-white text-[#677d81]
              "
            >
              <SlidersHorizontal size={12} />
            </button>
          </div>

          {/* =================================================
              PROPERTY TABLE
          ================================================== */}

          <div className="mt-3 overflow-hidden rounded-[7px] border border-[#dce6e4] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[690px]">
                <thead>
                  <tr className="border-b border-[#e3ebe9] bg-[#fbfdfc]">
                    <th className="w-8 px-3 py-2 text-left">
                      <input type="checkbox" />
                    </th>

                    <th className="px-2 py-2 text-left text-[7px] font-semibold uppercase text-[#35545b]">
                      Property
                    </th>

                    <th className="px-2 py-2 text-left text-[7px] font-semibold uppercase text-[#35545b]">
                      Seller
                    </th>

                    <th className="px-2 py-2 text-left text-[7px] font-semibold uppercase text-[#35545b]">
                      Location
                    </th>

                    <th className="px-2 py-2 text-left text-[7px] font-semibold uppercase text-[#35545b]">
                      Price
                    </th>

                    <th className="px-2 py-2 text-left text-[7px] font-semibold uppercase text-[#35545b]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProperties.map((property) => {
                    const selected =
                      selectedProperty?.id === property.id;

                    return (
                      <tr
                        key={property.id}
                        onClick={() =>
                          setSelectedProperty(property)
                        }
                        className={`
                          cursor-pointer
                          border-b border-[#edf2f1]
                          transition

                          ${
                            selected
                              ? "bg-[#f5fbf9]"
                              : "hover:bg-[#fafdfc]"
                          }
                        `}
                      >
                        <td className="relative px-3 py-3">
                          {selected && (
                            <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#13a689]" />
                          )}

                          <input
                            type="checkbox"
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                          />
                        </td>

                        {/* PROPERTY */}

                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={property.image}
                              alt={property.propertyName}
                              className="h-9 w-10 rounded-[3px] object-cover"
                            />

                            <div>
                              <p className="text-[8px] font-semibold leading-tight text-[#334f56]">
                                {property.propertyName}
                              </p>

                              <p className="mt-[2px] text-[6.5px] text-[#8b999c]">
                                {property.id}
                              </p>

                              <p className="mt-[2px] text-[6.5px] text-[#a1abad]">
                                {property.propertyType}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SELLER */}

                        <td className="px-2 py-3">
                          <p className="text-[8px] font-medium text-[#435b61]">
                            {property.seller}
                          </p>

                          <p className="mt-[2px] text-[6.5px] text-[#9ca7aa]">
                            {property.sellerId}
                          </p>
                        </td>

                        {/* LOCATION */}

                        <td className="px-2 py-3">
                          <div className="flex items-center gap-1">
                            <MapPin
                              size={8}
                              className="text-[#6e8985]"
                            />

                            <div>
                              <p className="text-[7.5px] text-[#53696e]">
                                {property.location}
                              </p>

                              <p className="text-[6.5px] text-[#9ca7a9]">
                                {property.city}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* PRICE */}

                        <td className="px-2 py-3">
                          <p className="text-[8px] font-semibold text-[#314f56]">
                            {property.price}
                          </p>
                        </td>

                        {/* STATUS */}

                        <td className="px-2 py-3">
                          <div className="flex items-center justify-between gap-2">
                            <StatusBadge
                              status={property.status}
                            />

                            <MoreVertical
                              size={11}
                              className="text-[#8b999c]"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredProperties.length === 0 && (
              <div className="py-14 text-center">
                <Search
                  size={20}
                  className="mx-auto text-[#a1afad]"
                />

                <p className="mt-2 text-[9px] font-medium text-[#52696e]">
                  No properties found
                </p>
              </div>
            )}
          </div>
        </main>

        {/* =================================================
            DESKTOP RIGHT PANEL
        ================================================== */}

        {selectedProperty && (
          <div className="hidden xl:block">
            <PropertyDetailsPanel
              key={selectedProperty.id}
              property={selectedProperty}
              onClose={() =>
                setSelectedProperty(null)
              }
              onResolve={handleResolve}
            />
          </div>
        )}

        {/* =================================================
            MOBILE / TABLET PANEL
        ================================================== */}

        {selectedProperty && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <button
              className="absolute inset-0 bg-black/20"
              onClick={() =>
                setSelectedProperty(null)
              }
            />

            <div className="absolute bottom-0 right-0 top-0 w-[92%] max-w-[360px]">
              <PropertyDetailsPanel
                key={`mobile-${selectedProperty.id}`}
                property={selectedProperty}
                onClose={() =>
                  setSelectedProperty(null)
                }
                onResolve={handleResolve}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

const FilterSelect = ({
  value,
  onChange,
  options,
  label,
}) => {
  return (
    <div className="relative min-w-[115px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-8 w-full
          appearance-none
          rounded-[5px]
          border border-[#dae5e2]
          bg-white
          px-3 pr-7
          text-[7px]
          text-[#61757a]
          outline-none
        "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? label : option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={9}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#839397]"
      />
    </div>
  );
};