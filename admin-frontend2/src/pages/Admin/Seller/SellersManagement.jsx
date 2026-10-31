import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Users,
  BadgeCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Play,
  FastForward,
  Globe2,
  Filter,
  ArrowRightLeft,
  CalendarDays,
  CalendarCheck2,
  XCircle,
  RotateCcw,
  Eye,
  Loader2,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  getAllSellersApi,
  getAdminSellerBoostRequestsApi,
  getSellerByIdApi,
  getSellerPropertyByIdApi,
  verifySellerApi,
} from "../../../Services/sellerService";

/* ======================================================
   HELPERS
====================================================== */

const formatPrice = (price) => {
  const value =
    Number(price || 0);

  if (value >= 10000000) {
    return `₹ ${(
      value / 10000000
    ).toFixed(1)} Cr`;
  }

  if (value >= 100000) {
    return `₹ ${(
      value / 100000
    ).toFixed(1)} L`;
  }

  return `₹ ${value.toLocaleString(
    "en-IN"
  )}`;
};

const formatDateTime = (value) => {
  if (!value) {
    return "Not scheduled";
  }

  return new Date(
    value
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusClass = {
  Draft:
    "bg-[#F1F5F6] text-[#536779] border-[#DCE5E9]",

  Submitted:
    "bg-amber-50 text-amber-700 border-amber-200",

  Assigned_To_Partner:
    "bg-blue-50 text-blue-700 border-blue-200",

  Reviewing:
    "bg-orange-50 text-orange-700 border-orange-200",

  Verified:
    "bg-[#EAF9F4] text-[#15966F] border-[#35C99A]/30",

  Live:
    "bg-teal-50 text-teal-700 border-teal-200",

  Rejected:
    "bg-red-50 text-red-700 border-red-200",

  Sold:
    "bg-purple-50 text-purple-700 border-purple-200",

  Rented:
    "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const StatusBadge = ({
  status,
}) => (
  <span
    className={`inline-flex rounded border px-2 py-1 text-[10px] font-semibold ${
      statusClass[status] ||
      "bg-[#F8FAFB] text-[#536779] border-[#DCE5E9]"
    }`}
  >
    {status
      ?.replaceAll("_", " ") ||
      "Unknown"}
  </span>
);

const lifecycleIcons = {
  Draft: Play,
  Submitted: FastForward,
  Assigned_To_Partner:
    ShieldCheck,
  Reviewing: AlertTriangle,
  Verified: CheckCircle2,
  Live: Globe2,
};

/* ======================================================
   SELLER MANAGEMENT LIST
====================================================== */

function SellerManagementList({
  onSelectSeller,
}) {
  const [
    sellers,
    setSellers,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    activeTab,
    setActiveTab,
  ] = useState("All");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const itemsPerPage = 10;

  const fetchSellers =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAllSellersApi({
            applicationStatus: "APPROVED",
            search:
              search.trim() ||
              undefined,

            verified:
              activeTab === "Active"
                ? "true"
                : activeTab === "Suspended"
                ? "false"
                : undefined,
          });

        setSellers(
          response?.data || []
        );
      } catch (error) {
        setError(
          error?.response?.data
            ?.message ||
            "Unable to fetch sellers."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const timer =
      setTimeout(() => {
        fetchSellers();
      }, 250);

    return () =>
      clearTimeout(timer);
  }, [search, activeTab]);

  const stats = useMemo(() => {
    return {
      total:
        sellers.length,

      verified:
        sellers.filter(
          (seller) =>
            seller.isVerified
        ).length,

      pending:
        sellers.filter(
          (seller) =>
            !seller.isVerified
        ).length,

      liveProperties:
        sellers.reduce(
          (sum, seller) =>
            sum +
            Number(
              seller.propertyStats
                ?.live || 0
            ),
          0
        ),
    };
  }, [sellers]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        sellers.length /
          itemsPerPage
      )
    );

  const currentRows =
    sellers.slice(
      (currentPage - 1) *
        itemsPerPage,

      currentPage *
        itemsPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  const tabs = [
    {
      label: "All",
      count: stats.total,
    },

    {
      label: "Active",
      count: stats.verified,
    },

    {
      label: "Suspended",
      count: stats.pending,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F8] p-1 font-sans text-[#173247]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
              Seller Management
            </h1>

            <p className="mt-1 text-[10px] font-medium text-[#8998AF] sm:text-[11px]">
              All seller accounts,
              verification and seller
              property portfolios.
            </p>
          </div>

          <button className="flex h-[38px] items-center gap-2 rounded-lg border border-[#DCE5E9] bg-white px-4 text-[10px] font-semibold text-[#536779] shadow-[0_4px_18px_rgba(15,47,69,0.04)] transition hover:border-[#35C99A]/40 hover:bg-[#F8FAFB]">
            <Download size={13} />
            Export Sellers
          </button>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Total Sellers",
              stats.total,
              Users,
            ],

            [
              "Active Sellers",
              stats.verified,
              BadgeCheck,
            ],

            [
              "Suspended Sellers",
              stats.pending,
              Clock3,
            ],

            [
              "Live Properties",
              stats.liveProperties,
              Building2,
            ],
          ].map(
            ([
              label,
              value,
              Icon,
            ]) => (
              <div
                key={label}
                className="min-h-[155px] rounded-[18px] border border-[#DCE5E9] bg-white p-6 shadow-[0_2px_5px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="pt-2 text-[10px] font-bold uppercase tracking-[0.25px] text-[#576D86]">
                      {label}
                    </p>

                    <p className="mt-5 text-[29px] font-bold leading-none text-[#173247]">
                      {value}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-[15px] bg-[#EAF9F4] text-[#25B98B]">
                    <Icon
                      size={22}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="overflow-hidden rounded-[16px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="border-b border-[#E7EDF0] px-4">
            <div className="flex gap-6">
              {tabs.map(
                (tab) => (
                  <button
                    key={
                      tab.label
                    }
                    onClick={() => {
                      setActiveTab(
                        tab.label
                      );

                      setCurrentPage(
                        1
                      );
                    }}
                    className={`relative flex h-11 items-center gap-2 text-[10px] font-semibold ${
                      activeTab ===
                      tab.label
                        ? "text-[#15966F]"
                        : "text-[#91A2AC]"
                    }`}
                  >
                    {tab.label}

                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px]">
                      {tab.count}
                    </span>

                    {activeTab ===
                      tab.label && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#35C99A]" />
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="border-b border-[#E7EDF0] p-3">
            <div className="relative max-w-[380px]">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search seller ID, name, email, phone, city..."
                className="h-[38px] w-full rounded-lg border border-[#DCE5E9] bg-white pl-9 pr-3 text-[10px] font-medium text-[#42595F] outline-none placeholder:text-[#A1ADAF] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
              />
            </div>
          </div>

          {error && (
            <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-[10px] text-red-600">
              {error}
            </div>
          )}

          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="h-[52px] bg-[#1F3C50] text-left text-white">
                  <th className="w-[20%] px-3 text-[10px] font-bold uppercase tracking-[0.2px] text-white">
                    Seller
                  </th>

                  <th className="w-[22%] px-3 text-[10px] font-bold uppercase tracking-[0.2px] text-white">
                    Contact
                  </th>

                  <th className="w-[25%] px-3 text-[10px] font-bold uppercase tracking-[0.2px] text-white">
                    Portfolio
                  </th>

                  <th className="w-[13%] px-3 text-[10px] font-bold uppercase tracking-[0.2px] text-white">
                    Partners
                  </th>

                  <th className="w-[12%] px-3 text-[10px] font-bold uppercase tracking-[0.2px] text-white">
                    Status
                  </th>

                  <th className="w-[8%] px-3 text-right text-[10px] font-bold uppercase tracking-[0.2px] text-white">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="h-[220px] text-center"
                    >
                      <Loader2 className="mx-auto animate-spin text-[#35C99A]" />
                    </td>
                  </tr>
                ) : currentRows.length ? (
                  currentRows.map(
                    (seller) => {
                      const stats =
                        seller.propertyStats ||
                        {};

                      return (
                        <tr
                          key={
                            seller._id
                          }
                          onClick={() =>
                            onSelectSeller(
                              seller._id
                            )
                          }
                          className="h-[76px] cursor-pointer border-b border-[#E7EDF0] hover:bg-[#EAF9F4]/45"
                        >
                          <td className="px-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f5f2] text-[10px] font-bold text-[#15966F]">
                                {(seller.name ||
                                  "S")
                                  .split(" ")
                                  .map(
                                    (
                                      word
                                    ) =>
                                      word[0]
                                  )
                                  .join("")
                                  .slice(
                                    0,
                                    2
                                  )}
                              </div>

                              <div>
                                <p className="text-[10px] font-semibold text-[#26374a]">
                                  {
                                    seller.name
                                  }
                                </p>

                                <p className="mt-0.5 text-[10px] text-[#91A2AC]">
                                  {
                                    seller.sellerId
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-3">
                            <p className="flex items-center gap-1.5 text-[10px] text-[#536779]">
                              <Phone
                                size={
                                  9
                                }
                              />

                              {
                                seller.phone
                              }
                            </p>

                            <p className="mt-1 flex max-w-[180px] items-center gap-1.5 truncate text-[10px] text-[#91A2AC]">
                              <Mail
                                size={
                                  9
                                }
                              />

                              {
                                seller.email
                              }
                            </p>
                          </td>

                          <td className="px-3">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded bg-[#F1F5F6] px-2 py-1 text-[10px]">
                                {stats.total ||
                                  0}{" "}
                                Total
                              </span>

                              <span className="rounded bg-[#EAF9F4] px-2 py-1 text-[10px] text-[#15966F]">
                                {stats.live ||
                                  0}{" "}
                                Live
                              </span>

                              <span className="rounded bg-amber-50 px-2 py-1 text-[10px] text-amber-700">
                                {stats.pending ||
                                  0}{" "}
                                Pending
                              </span>

                              <span className="rounded bg-red-50 px-2 py-1 text-[10px] text-red-600">
                                {stats.rejected ||
                                  0}{" "}
                                Rejected
                              </span>
                            </div>
                          </td>

                          <td className="px-3">
                            <p className="text-[10px] font-semibold text-[#536779]">
                              {stats.assignedPartnerCount ||
                                0}{" "}
                              Partner(s)
                            </p>
                          </td>

                          <td className="px-3">
                            <span
                              className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${
                                seller.isVerified
                                  ? "border-[#35C99A]/30 bg-[#EAF9F4] text-[#15966F]"
                                  : "border-amber-200 bg-amber-50 text-amber-700"
                              }`}
                            >
                              {seller.isVerified
                                ? "Active"
                                : "Suspended"}
                            </span>
                          </td>

                          <td className="px-4 text-right">
                            <button
                              onClick={(
                                e
                              ) => {
                                e.stopPropagation();

                                onSelectSeller(
                                  seller._id
                                );
                              }}
                              className="inline-flex items-center gap-1 rounded px-2 py-1.5 text-[10px] font-semibold text-[#173247] hover:bg-[#F1F5F6]"
                            >
                              <Eye
                                size={
                                  12
                                }
                              />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="h-[220px] text-center text-[10px] text-[#91A2AC]"
                    >
                      No sellers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#E7EDF0] px-4 py-3">
            <p className="text-[9px] text-[#91A2AC]">
              {sellers.length} seller(s)
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.max(
                        1,
                        page - 1
                      )
                  )
                }
                className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE5E9] disabled:opacity-40"
              >
                <ChevronLeft
                  size={12}
                />
              </button>

              <span className="px-2 text-[9px] text-[#7D8C9C]">
                {currentPage} /{" "}
                {totalPages}
              </span>

              <button
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.min(
                        totalPages,
                        page + 1
                      )
                  )
                }
                className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE5E9] disabled:opacity-40"
              >
                <ChevronRight
                  size={12}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function SellerBoostHistory({ sellerId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    getAdminSellerBoostRequestsApi(sellerId, { page, limit: 20 })
      .then(res => { if (active) { setRequests(res.data || []); setPages(res.pagination?.pages || 1); } })
      .catch(err => { if (active) setError(err?.response?.data?.message || "Unable to load boost requests"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [sellerId, page]);
  const statusOf = (r) => r.adminPromotion?.status || r.status;
  return <section className="my-5 rounded-2xl border border-[#DCE5E9] bg-white p-5 shadow-sm">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-base font-bold text-[#173247]">Property Boost Requests</h3><p className="text-xs text-[#667B88]">Properties this seller asked their assigned partners to promote</p></div></div>
    {error && <p role="alert" className="mb-3 text-sm text-red-600">{error}</p>}
    {loading ? <p className="py-6 text-sm text-slate-500">Loading boost requests...</p> : requests.length === 0 ? <p className="py-6 text-sm text-slate-500">No boost requests found for this seller.</p> : <div className="overflow-x-auto"><table className="min-w-full text-left text-xs"><thead className="bg-[#F2F6F7] text-[#526A78]"><tr>{["Property", "Requested Partner", "Boost Plan", "DigiCredits", "Request Date", "Partner / Admin Status", "Reason"].map(h => <th key={h} className="whitespace-nowrap px-3 py-3">{h}</th>)}</tr></thead><tbody>{requests.map(r => <tr key={r._id} className="border-b border-[#E7EEF1]"><td className="px-3 py-3 font-semibold">{r.propertyId?.title || r.propertyId?.propertyId || "Property unavailable"}</td><td className="px-3 py-3">{r.partner?.name || "Partner unavailable"}</td><td className="px-3 py-3">{r.promotionType?.replaceAll("_", " ")}</td><td className="px-3 py-3">{r.creditPriceAtRequest ?? "—"}</td><td className="whitespace-nowrap px-3 py-3">{r.createdAt ? new Date(r.createdAt).toLocaleString("en-IN") : "—"}</td><td className="px-3 py-3"><span className="rounded-full bg-[#EAF9F4] px-2 py-1 font-semibold text-[#15966F]">{statusOf(r)}</span></td><td className="max-w-48 break-words px-3 py-3">{r.rejectionReason || r.adminPromotion?.adminRemarks || "—"}</td></tr>)}</tbody></table></div>}
    <div className="mt-3 flex items-center justify-end gap-2 text-xs"><button disabled={page === 1} onClick={() => setPage(p => p-1)} className="rounded border px-3 py-1 disabled:opacity-40">Previous</button><span>{page} / {pages}</span><button disabled={page >= pages} onClick={() => setPage(p => p+1)} className="rounded border px-3 py-1 disabled:opacity-40">Next</button></div>
  </section>;
}

/* ======================================================
   SELLER CONTROL TOWER
====================================================== */

function SellerControlTower({
  sellerId,
  onBack,
}) {
  const navigate = useNavigate();

  const [
    sellerData,
    setSellerData,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedProperty,
    setSelectedProperty,
  ] = useState(null);

  const [
    verifyLoading,
    setVerifyLoading,
  ] = useState(false);

  const [propertyPage, setPropertyPage] = useState(1);
  const propertyItemsPerPage = 10;

  const [propertyStatusFilter, setPropertyStatusFilter] =
    useState("All");

  const allowedPropertyStatuses = [
    "Submitted",
    "Assigned_To_Partner",
    "Reviewing",
    "Active",
    "Live",
    "Rejected",
    "Sold",
    "Rented",
  ];

  const getAssignedPartnerMongoId = (
    property
  ) => {
    const partnerId =
      property?.assignedPartner
        ?.partnerId;

    if (
      partnerId &&
      typeof partnerId === "object"
    ) {
      return (
        partnerId?._id ||
        null
      );
    }

    return (
      property?.assignedPartner
        ?.partnerMongoId ||
      property?.assignedPartner
        ?.partnerIdMongo ||
      partnerId ||
      null
    );
  };

  const getSellerPartnerMongoId = (
    partner
  ) => {
    return (
      partner?.partnerDoc?._id ||
      partner?.partnerId?._id ||
      partner?.partnerMongoId ||
      partner?._id ||
      null
    );
  };

  const fetchSeller =
    async () => {
      try {
        setLoading(true);

        const response =
          await getSellerByIdApi(
            sellerId
          );

        const rawData = response.data || {};

        const sortedProperties = Array.isArray(rawData.properties)
          ? [...rawData.properties]
              .filter((property) =>
                allowedPropertyStatuses.includes(property?.status)
              )
              .sort(
                (a, b) =>
                  new Date(b?.createdAt || 0).getTime() -
                  new Date(a?.createdAt || 0).getTime()
              )
          : [];

        setSellerData({
          ...rawData,
          properties: sortedProperties,
        });

        setPropertyPage(1);

        setSelectedProperty(
          sortedProperties[0] || null
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchSeller();
  }, [sellerId]);

  const openProperty =
    async (property) => {
      try {
        const response =
          await getSellerPropertyByIdApi(
            sellerId,
            property._id
          );

        setSelectedProperty(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleVerify =
    async () => {
      if (!sellerData?.seller) {
        return;
      }

      try {
        setVerifyLoading(true);

        await verifySellerApi(
          sellerId,
          {
            isVerified:
              !sellerData.seller
                .isVerified,

            remarks:
              sellerData.seller
                .isVerified
                ? "Seller verification removed by admin."
                : "Seller verified by admin.",
          }
        );

        await fetchSeller();
      } finally {
        setVerifyLoading(false);
      }
    };

  // ======================================================
  // IMPORTANT:
  // ALL hooks must run before any conditional return.
  // sellerData may be null on the first render, so use
  // safe fallback values here.
  // ======================================================

  const seller =
    sellerData?.seller || null;

  const propertyStats =
    sellerData?.propertyStats || {};

  const assignedPartners =
    Array.isArray(
      sellerData?.assignedPartners
    )
      ? sellerData.assignedPartners
      : [];

  const properties =
    Array.isArray(
      sellerData?.properties
    )
      ? sellerData.properties
      : [];

  const filteredSellerProperties = useMemo(() => {
    return [...properties]
      .filter((property) =>
        allowedPropertyStatuses.includes(
          property?.status
        )
      )
      .filter(
        (property) =>
          propertyStatusFilter === "All" ||
          property?.status ===
            propertyStatusFilter
      )
      .sort(
        (a, b) =>
          new Date(
            b?.createdAt || 0
          ).getTime() -
          new Date(
            a?.createdAt || 0
          ).getTime()
      );
  }, [
    properties,
    propertyStatusFilter,
  ]);

  useEffect(() => {
    setPropertyPage(1);
  }, [propertyStatusFilter]);

  const totalPropertyPages = Math.max(
    1,
    Math.ceil(
      filteredSellerProperties.length /
        propertyItemsPerPage
    )
  );

  const propertyStartIndex =
    (propertyPage - 1) *
    propertyItemsPerPage;

  const currentProperties =
    filteredSellerProperties.slice(
      propertyStartIndex,
      propertyStartIndex +
        propertyItemsPerPage
    );

  // ======================================================
  // CONDITIONAL RETURNS MUST COME AFTER ALL HOOKS
  // ======================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="animate-spin text-[#35C99A]" />
      </div>
    );
  }

  if (!sellerData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F4F7F8] font-sans text-[#173247]">
      <div className="mx-auto max-w-[1500px] px-1 py-1">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[10px] font-semibold text-[#15966F]"
          >
            <ChevronLeft
              size={12}
            />
            Seller Management
          </button>

          {/* <button
            onClick={onBack}
            className="rounded-md border border-[#DCE5E9] bg-white px-3 py-2 text-[9px]"
          >
            Back to Sellers
          </button> */}
        </div>

        <SellerBoostHistory sellerId={sellerId} />

        <section className="rounded-2xl border border-[#DCE5E9] bg-white p-5 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#DCE5E9] bg-[#F8FAFB] text-lg font-bold text-[#7D8C9C]">
                {(seller.name ||
                  "S")
                  .split(" ")
                  .map(
                    (word) =>
                      word[0]
                  )
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[20px] font-bold text-[#173247]">
                    {seller.name}
                  </h2>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      seller.isVerified
                        ? "bg-[#EAF9F4] text-[#15966F]"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    ●{" "}
                    {seller.isVerified
                      ? "Verified"
                      : "Pending"}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[9px] text-[#7D8C9C]">
                  <span>
                    ID{" "}
                    {seller.sellerId}
                  </span>

                  <span className="flex items-center gap-1">
                    <ShieldCheck
                      size={12}
                    />

                    {seller.isPhoneVerified
                      ? "Phone Verified"
                      : "Phone Pending"}
                  </span>

                  <span className="flex items-center gap-1">
                    <BriefcaseBusiness
                      size={12}
                    />
                    Seller
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin
                      size={12}
                    />

                    {seller.location?.city ||
                      "—"}
                    {seller.location
                      ?.state
                      ? `, ${seller.location.state}`
                      : ""}
                  </span>
                </div>
              </div>
            </div>

            <button
              disabled={
                verifyLoading
              }
              onClick={
                handleVerify
              }
              className="flex h-[38px] items-center gap-2 rounded-lg bg-[#1F3C50] px-4 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#173247] disabled:opacity-50"
            >
              <BadgeCheck
                size={13}
              />

              {seller.isVerified
                ? "Remove Verification"
                : "Verify Seller"}
            </button>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
          {[
            [
              "TOTAL PROP.",
              propertyStats.total,
              Building2,
            ],

            [
              "LIVE",
              propertyStats.live,
              Globe2,
            ],

            [
              "PENDING",
              propertyStats.pending,
              Clock3,
            ],

            [
              "REVIEWING",
              propertyStats.reviewing,
              AlertTriangle,
            ],

            [
              "REJECTED",
              propertyStats.rejected,
              XCircle,
            ],

            [
              "SOLD",
              propertyStats.sold,
              CheckCircle2,
            ],

            [
              "RENTED",
              propertyStats.rented,
              RotateCcw,
            ],

            [
              "VISITS",
              propertyStats.visitScheduled,
              CalendarCheck2,
            ],
          ].map(
            ([
              label,
              value,
              Icon,
            ]) => (
              <div
                key={label}
                className="rounded-xl border border-[#DCE5E9] bg-white p-3 shadow-[0_2px_5px_rgba(15,23,42,0.03)]"
              >
                <Icon
                  size={13}
                  className="text-[#91A2AC]"
                />

                <p className="mt-2 text-[10px] text-[#7D8C9C]">
                  {label}
                </p>

                <p className="mt-2 text-[18px] font-bold text-[#102d3d]">
                  {value || 0}
                </p>
              </div>
            )
          )}
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
          <div className="space-y-4">
            {selectedProperty && (
              <div className="rounded-xl border border-[#DCE5E9] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#DCE5E9] px-4 py-3">
                  <div>
                    <h3 className="text-[11px] font-bold">
                      Selected Property
                      Lifecycle
                    </h3>

                    <p className="mt-1 text-[10px] text-[#91A2AC]">
                      {
                        selectedProperty.propertyId
                      }{" "}
                      •{" "}
                      {
                        selectedProperty.title
                      }
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge
                      status={
                        selectedProperty.status
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/property-management/${selectedProperty._id}`
                        )
                      }
                      className="flex h-8 items-center gap-1.5 rounded-lg bg-[#1F3C50] px-3 text-[10px] font-semibold text-white transition hover:bg-[#173247]"
                    >
                      <Eye size={11} />
                      View Property
                    </button>
                  </div>
                </div>

                <div className="px-4 py-5">
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                    {selectedProperty.lifecycle?.map(
                      (
                        step,
                        index
                      ) => {
                        const Icon =
                          lifecycleIcons[
                            step.key
                          ] ||
                          Clock3;

                        return (
                          <div
                            key={
                              step.key
                            }
                            className="relative flex flex-1 flex-col items-center text-center"
                          >
                            {index <
                              selectedProperty
                                .lifecycle
                                .length -
                                1 && (
                              <div className="absolute left-[65%] top-[20px] hidden h-px w-[70%] border-t border-dashed border-slate-300 lg:block" />
                            )}

                            <div
                              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white ${
                                step.active
                                  ? "border-[#1F3C50] text-[#1F3C50]"
                                  : step.completed
                                  ? "border-emerald-500 text-[#15966F]"
                                  : "border-slate-300 text-[#91A2AC]"
                              }`}
                            >
                              <Icon
                                size={
                                  15
                                }
                              />
                            </div>

                            <p className="mt-2 text-[10px] text-[#7D8C9C]">
                              {
                                step.label
                              }
                            </p>

                            <p className="mt-1 text-[7px] text-[#91A2AC]">
                              {step.active
                                ? "Current"
                                : step.completed
                                ? "Completed"
                                : "Pending"}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-xl border border-[#DCE5E9] bg-white shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="text-[11px] font-bold">
                    Seller Properties
                  </h3>

                  <p className="mt-1 text-[10px] text-[#91A2AC]">
                    Click a property to
                    view lifecycle,
                    verification and
                    partner.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Filter
                    size={12}
                    className="text-[#91A2AC]"
                  />

                  <select
                    value={propertyStatusFilter}
                    onChange={(e) =>
                      setPropertyStatusFilter(
                        e.target.value
                      )
                    }
                    className="h-8 rounded-lg border border-[#DCE5E9] bg-white px-2.5 text-[10px] font-semibold text-[#536779] outline-none focus:border-[#35C99A]"
                  >
                    <option value="All">
                      All Statuses
                    </option>

                    {allowedPropertyStatuses.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status.replaceAll(
                            "_",
                            " "
                          )}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="w-full overflow-hidden">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="bg-[#1F3C50] text-left text-white">
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2px]">
                        PROPERTY
                      </th>

                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2px]">
                        LOCATION
                      </th>

                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2px]">
                        PRICE
                      </th>

                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2px]">
                        STATUS
                      </th>

                      <th className="px-3 py-3 text-[10px]">
                        PARTNER
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentProperties.map(
                      (property) => (
                        <tr
                          key={
                            property._id
                          }
                          onClick={() =>
                            openProperty(
                              property
                            )
                          }
                          className={`cursor-pointer border-b border-[#E7EDF0] ${
                            selectedProperty?._id ===
                            property._id
                              ? "bg-[#f1faf7]"
                              : "hover:bg-[#F8FAFB]"
                          }`}
                        >
                          <td className="px-3 py-3">
                            <p className="text-[9px] font-bold">
                              {
                                property.propertyId
                              }
                            </p>

                            <p className="mt-1 text-[10px] text-[#7D8C9C]">
                              {
                                property.title
                              }
                            </p>
                          </td>

                          <td className="px-4 py-3 text-[10px] text-[#7D8C9C]">
                            {property.locality ||
                              ""}
                            {property.locality &&
                            property.city
                              ? ", "
                              : ""}
                            {property.city ||
                              ""}
                          </td>

                          <td className="px-4 py-3 text-[10px] font-semibold">
                            {formatPrice(
                              property.price
                            )}
                          </td>

                          <td className="px-3 py-3">
                            <StatusBadge
                              status={
                                property.status
                              }
                            />
                          </td>

                          <td className="px-4 py-3 text-[10px] text-[#536779]">
                            {property
                              .assignedPartner
                              ?.name ||
                              "Not Assigned"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {filteredSellerProperties.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-[#E7EDF0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[9px] text-[#91A2AC]">
                    Showing{" "}
                    <span className="font-semibold text-[#536779]">
                      {propertyStartIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-[#536779]">
                      {Math.min(
                        propertyStartIndex + propertyItemsPerPage,
                        filteredSellerProperties.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[#536779]">
                      {filteredSellerProperties.length}
                    </span>
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={propertyPage === 1}
                      onClick={() =>
                        setPropertyPage((page) =>
                          Math.max(1, page - 1)
                        )
                      }
                      className="h-7 rounded-md border border-[#DCE5E9] px-2.5 text-[10px] font-semibold text-[#7D8C9C] disabled:opacity-40"
                    >
                      Prev
                    </button>

                    {Array.from(
                      { length: totalPropertyPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        type="button"
                        key={page}
                        onClick={() => setPropertyPage(page)}
                        className={`h-7 min-w-7 rounded-md px-2 text-[10px] font-semibold ${
                          propertyPage === page
                            ? "bg-[#1F3C50] text-white"
                            : "border border-[#DCE5E9] bg-white text-[#7D8C9C]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={propertyPage === totalPropertyPages}
                      onClick={() =>
                        setPropertyPage((page) =>
                          Math.min(totalPropertyPages, page + 1)
                        )
                      }
                      className="h-7 rounded-md border border-[#DCE5E9] px-2.5 text-[10px] font-semibold text-[#7D8C9C] disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            {selectedProperty ? (
              <>
                <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-bold">
                      Property Verification
                    </h4>

                    <ShieldCheck
                      size={22}
                      className="text-[#15966F]"
                    />
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#7D8C9C]">
                        Status
                      </span>

                      <span className="text-[10px] font-semibold text-[#087D6D]">
                        {
                          selectedProperty.currentVerificationStatus
                        }
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-[#7D8C9C]">
                        Review Notes
                      </span>

                      <p className="mt-1 text-[10px] leading-4 text-[#536779]">
                        {selectedProperty
                          .review
                          ?.notes ||
                          selectedProperty
                            .assignedPartner
                            ?.partnerRemarks ||
                          "No review notes."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-sm">
                  <h4 className="text-[12px] font-bold">
                    Partner Assignment
                  </h4>

                  {selectedProperty
                    .assignedPartner
                    ?.partnerId ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          const partnerMongoId =
                            getAssignedPartnerMongoId(
                              selectedProperty
                            );

                          if (
                            partnerMongoId
                          ) {
                            navigate(
                              `/partnerdashboard?tab=dashboard&partnerId=${partnerMongoId}`
                            );
                          }
                        }}
                        className="mt-4 w-full rounded-lg border border-[#DCE5E9] bg-[#F8FAFB] p-3 text-left transition hover:border-[#35C99A]/40 hover:bg-[#EAF9F4]/40"
                      >
                        <p className="text-[9px] font-bold">
                          {selectedProperty
                            .assignedPartner
                            .name ||
                            selectedProperty
                              .assignedPartner
                              .partnerId
                              ?.name}
                        </p>

                        <p className="mt-1 text-[10px] text-[#7D8C9C]">
                          {selectedProperty
                            .assignedPartner
                            .partnerCode ||
                            selectedProperty
                              .assignedPartner
                              .partnerId
                              ?.partnerId}
                        </p>

                        <p className="mt-1 text-[10px] text-[#91A2AC]">
                          {
                            selectedProperty
                              .assignedPartner
                              .verificationStatus
                          }
                        </p>

                        <p className="mt-2 text-[10px] font-semibold text-[#15966F]">
                          View Partner →
                        </p>
                      </button>

                      {/* <button className="mt-4 flex w-full items-center justify-center gap-2 text-[10px] font-semibold text-[#194b62]">
                        <ArrowRightLeft
                          size={
                            13
                          }
                        />
                        Change Partner
                      </button> */}
                    </>
                  ) : (
                    <div className="mt-4 rounded-lg border border-dashed border-[#DCE5E9] p-4 text-center text-[9px] text-[#91A2AC]">
                      No partner
                      assigned.
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-bold">
                      Visit Schedule
                    </h4>

                    <CalendarCheck2
                      size={22}
                      className="text-blue-600"
                    />
                  </div>

                  {selectedProperty
                    .assignedPartner
                    ?.visitDate ? (
                    <div className="mt-4 rounded-lg bg-blue-50 p-3">
                      <p className="text-[10px] font-semibold text-blue-700">
                        {formatDateTime(
                          selectedProperty
                            .assignedPartner
                            .visitDate
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-[9px] text-[#91A2AC]">
                      No visit
                      scheduled.
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-sm">
                  <h4 className="text-[12px] font-bold">
                    Status History
                  </h4>

                  <div className="mt-3 space-y-2">
                    {selectedProperty.statusHistory
                      ?.slice()
                      .reverse()
                      .map(
                        (
                          item,
                          index
                        ) => (
                          <div
                            key={
                              item._id ||
                              index
                            }
                            className="rounded-lg border border-[#E7EDF0] p-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <StatusBadge
                                status={
                                  item.status
                                }
                              />

                              <span className="text-[7px] text-[#91A2AC]">
                                {item.updatedAt
                                  ? new Date(
                                      item.updatedAt
                                    ).toLocaleDateString(
                                      "en-IN"
                                    )
                                  : ""}
                              </span>
                            </div>

                            <p className="mt-2 text-[10px] text-[#536779]">
                              {item.updatedBy
                                ?.name ||
                                "System"}{" "}
                              •{" "}
                              {item.updatedBy
                                ?.role ||
                                "System"}
                            </p>

                            {item.remarks && (
                              <p className="mt-1 text-[10px] leading-4 text-[#91A2AC]">
                                {
                                  item.remarks
                                }
                              </p>
                            )}
                          </div>
                        )
                      )}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-[#DCE5E9] bg-white p-8 text-center text-[9px] text-[#91A2AC]">
                Select a property.
              </div>
            )}

            <div className="rounded-xl border border-[#DCE5E9] bg-white p-4 shadow-sm">
              <h4 className="text-[12px] font-bold">
                Seller Partners
              </h4>

              <div className="mt-3 space-y-2">
                {assignedPartners?.length ? (
                  assignedPartners.map(
                    (
                      partner,
                      index
                    ) => (
                      <button
                        type="button"
                        key={
                          partner.partnerCode ||
                          partner?._id ||
                          index
                        }
                        onClick={() => {
                          const partnerMongoId =
                            getSellerPartnerMongoId(
                              partner
                            );

                          if (
                            partnerMongoId
                          ) {
                            navigate(
                              `/partnerdashboard?tab=dashboard&partnerId=${partnerMongoId}`
                            );
                          }
                        }}
                        className="w-full rounded-lg border border-[#E7EDF0] p-2.5 text-left transition hover:border-[#35C99A]/40 hover:bg-[#EAF9F4]/40"
                      >
                        <p className="text-[10px] font-semibold">
                          {partner.name ||
                            partner.partnerDoc
                              ?.name}
                        </p>

                        <p className="mt-1 text-[10px] text-[#91A2AC]">
                          {partner.partnerCode ||
                            partner.partnerDoc
                              ?.partnerId ||
                            "—"}
                        </p>

                        <p className="mt-1.5 text-[10px] font-semibold text-[#15966F]">
                          View Partner →
                        </p>
                      </button>
                    )
                  )
                ) : (
                  <p className="text-[9px] text-[#91A2AC]">
                    No assigned
                    partners.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

/* ======================================================
   MAIN
====================================================== */

export default function SellersManagement({
  embedded = false,
  initialSellerId = null,
  onEmbeddedDetailClose,
}) {
  const navigate = useNavigate();

  const [
    selectedSellerId,
    setSelectedSellerId,
  ] = useState(initialSellerId || null);

  useEffect(() => {
    if (embedded && initialSellerId) {
      setSelectedSellerId(initialSellerId);
    }
  }, [embedded, initialSellerId]);

  const handleSellerSelect = (sellerId) => {
    if (embedded) {
      setSelectedSellerId(sellerId);
      return;
    }

    setSelectedSellerId(sellerId);
  };

  const handleBack = () => {
    setSelectedSellerId(null);

    if (embedded && initialSellerId) {
      onEmbeddedDetailClose?.();
    }
  };

  if (selectedSellerId) {
    return (
      <SellerControlTower
        sellerId={selectedSellerId}
        onBack={handleBack}
      />
    );
  }

  return (
    <SellerManagementList
      onSelectSeller={handleSellerSelect}
    />
  );
}