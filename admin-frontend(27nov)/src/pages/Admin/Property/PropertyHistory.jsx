import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  History,
  Eye,
  User,
  UserCheck,
  Clock,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  MapPin,
  Building2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CircleCheckBig,
  XCircle,
  Home,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getAllPropertiesApi,
  getPropertyByIdApi,
} from "../../../Services/propertyService";

const STATUS_STYLES = {
  Draft:
    "bg-slate-100 text-slate-600 border-slate-200",

  Submitted:
    "bg-amber-50 text-amber-700 border-amber-200",

  Assigned_To_Partner:
    "bg-blue-50 text-blue-700 border-blue-200",

  Reviewing:
    "bg-purple-50 text-purple-700 border-purple-200",

  Verified:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Live:
    "bg-green-50 text-green-700 border-green-200",

  Rejected:
    "bg-red-50 text-red-700 border-red-200",

  Sold:
    "bg-indigo-50 text-indigo-700 border-indigo-200",

  Rented:
    "bg-cyan-50 text-cyan-700 border-cyan-200",
};

const formatDateTime = (date) => {
  if (!date) return "-";

  const parsed = new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "-";
  }

  return parsed.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

const getPartnerObject = (
  property
) => {
  return (
    property?.assignedPartner
      ?.partnerId || null
  );
};

const getPartnerId = (
  property
) => {
  const partner =
    getPartnerObject(
      property
    );

  if (
    typeof partner ===
    "object"
  ) {
    return (
      partner?._id ||
      partner?.partnerId ||
      null
    );
  }

  return (
    partner ||
    property?.assignedPartner
      ?.partnerCode ||
    null
  );
};

const getPartnerName = (
  property
) => {
  const partner =
    getPartnerObject(
      property
    );

  return (
    property?.assignedPartner
      ?.name ||
    partner?.name ||
    "Not Assigned"
  );
};

const getPartnerCode = (
  property
) => {
  const partner =
    getPartnerObject(
      property
    );

  return (
    property?.assignedPartner
      ?.partnerCode ||
    partner?.partnerId ||
    partner?.partnerCode ||
    "-"
  );
};

/* =========================================================
   GENERATE PROPERTY LIFECYCLE
========================================================= */

const buildPropertyTimeline = (
  property
) => {
  if (!property) {
    return [];
  }

  const events = [];

  /*
   * PROPERTY CREATED
   */
  events.push({
    id: `created-${property._id}`,

    type: "created",

    title:
      "Property Created",

    status:
      property
        ?.statusHistory?.[0]
        ?.status ||
      "Created",

    description:
      `Property was created by ${
        property?.addedBy
          ?.name ||
        "Unknown User"
      }.`,

    actor:
      property?.addedBy
        ?.name ||
      "Unknown",

    role:
      property?.addedBy
        ?.role ||
      "Unknown",

    time:
      property.createdAt,

    sortTime:
      new Date(
        property.createdAt ||
          0
      ).getTime(),
  });

  /*
   * STATUS HISTORY
   */
  const statusHistory =
    Array.isArray(
      property.statusHistory
    )
      ? property.statusHistory
      : [];

  statusHistory.forEach(
    (history, index) => {
      /*
       * First history can already be
       * "Property created", therefore
       * avoid duplicate creation card.
       */
      const isCreation =
        index === 0 &&
        String(
          history?.remarks || ""
        )
          .toLowerCase()
          .includes(
            "property created"
          );

      if (isCreation) {
        return;
      }

      const status =
        history?.status ||
        "Updated";

      events.push({
        id:
          history?._id ||
          `status-${index}`,

        type:
          status === "Live"
            ? "live"
            : status ===
                "Verified"
              ? "verified"
              : status ===
                  "Rejected"
                ? "rejected"
                : status ===
                    "Sold"
                  ? "sold"
                  : status ===
                      "Rented"
                    ? "rented"
                    : "status",

        title:
          status === "Live"
            ? "Property Went Live"
            : `Status Changed To ${String(
                status
              ).replaceAll(
                "_",
                " "
              )}`,

        status,

        description:
          history?.remarks ||
          `Property status changed to ${String(
            status
          ).replaceAll(
            "_",
            " "
          )}.`,

        actor:
          history?.updatedBy
            ?.name ||
          "System",

        role:
          history?.updatedBy
            ?.role ||
          "System",

        time:
          history?.updatedAt,

        sortTime:
          new Date(
            history?.updatedAt ||
              0
          ).getTime(),
      });
    }
  );

  /*
   * PARTNER ASSIGNED
   */
  if (
    property
      ?.assignedPartner
      ?.partnerId
  ) {
    events.push({
      id:
        `partner-${property._id}`,

      type:
        "partner",

      title:
        "Partner Assigned",

      status:
        "Assigned_To_Partner",

      description:
        `${getPartnerName(
          property
        )} was assigned to this property.`,

      actor:
        getPartnerName(
          property
        ),

      role: "Partner",

      partnerId:
        getPartnerId(
          property
        ),

      partnerCode:
        getPartnerCode(
          property
        ),

      time:
        property
          ?.assignedPartner
          ?.assignedAt,

      sortTime:
        new Date(
          property
            ?.assignedPartner
            ?.assignedAt ||
            0
        ).getTime(),
    });
  }

  /*
   * REVIEW INFORMATION
   */
  if (
    property?.review
      ?.reviewedAt
  ) {
    const alreadyExists =
      events.some(
        (event) =>
          event.time &&
          new Date(
            event.time
          ).getTime() ===
            new Date(
              property.review
                .reviewedAt
            ).getTime()
      );

    if (!alreadyExists) {
      events.push({
        id:
          `review-${property._id}`,

        type: "review",

        title:
          "Property Reviewed",

        status:
          property.status,

        description:
          property?.review
            ?.notes ||
          "Property review completed.",

        actor:
          property?.review
            ?.reviewedBy
            ?.name ||
          "Admin",

        role:
          property?.review
            ?.reviewedBy
            ?.role ||
          "Admin",

        time:
          property.review
            .reviewedAt,

        sortTime:
          new Date(
            property.review
              .reviewedAt
          ).getTime(),
      });
    }
  }

  /*
   * Oldest → newest
   */
  return events.sort(
    (a, b) =>
      a.sortTime -
      b.sortTime
  );
};

/* =========================================================
   EVENT ICON
========================================================= */

function EventIcon({
  type,
}) {
  switch (type) {
    case "created":
      return (
        <PlusCircle
          size={17}
        />
      );

    case "partner":
      return (
        <UserCheck
          size={17}
        />
      );

    case "verified":
      return (
        <ShieldCheck
          size={17}
        />
      );

    case "live":
      return (
        <CircleCheckBig
          size={17}
        />
      );

    case "rejected":
      return (
        <XCircle size={17} />
      );

    case "review":
      return (
        <Eye size={17} />
      );

    default:
      return (
        <History size={17} />
      );
  }
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function PropertyAuditHistory() {
  const navigate =
    useNavigate();

  const [
    properties,
    setProperties,
  ] = useState([]);

  const [
    selectedProperty,
    setSelectedProperty,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    detailLoading,
    setDetailLoading,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* =======================================================
     GET ALL PROPERTIES
  ======================================================= */

  const fetchProperties =
    async () => {
      try {
        setLoading(true);

        const response =
          await getAllPropertiesApi();

        const data =
          Array.isArray(
            response?.data
          )
            ? response.data
            : [];

        setProperties(data);

        /*
         * First property automatically
         * selected.
         */
        if (
          data.length > 0 &&
          !selectedProperty
        ) {
          await openProperty(
            data[0]
          );
        }
      } catch (error) {
        console.error(
          "PROPERTY HISTORY FETCH ERROR:",
          error
        );

        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProperties();
  }, []);

  /* =======================================================
     GET COMPLETE PROPERTY
  ======================================================= */

  const openProperty =
    async (property) => {
      try {
        setDetailLoading(
          true
        );

        const response =
          await getPropertyByIdApi(
            property._id
          );

        setSelectedProperty(
          response?.data ||
            property
        );
      } catch (error) {
        console.error(
          "PROPERTY DETAIL ERROR:",
          error
        );

        setSelectedProperty(
          property
        );
      } finally {
        setDetailLoading(
          false
        );
      }
    };

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredProperties =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return properties.filter(
        (property) => {
          const matchSearch =
            !query ||
            property?.title
              ?.toLowerCase()
              .includes(
                query
              ) ||
            property
              ?.propertyId
              ?.toLowerCase()
              .includes(
                query
              ) ||
            property?.city
              ?.toLowerCase()
              .includes(
                query
              ) ||
            property
              ?.locality
              ?.toLowerCase()
              .includes(
                query
              ) ||
            property
              ?.addedBy?.name
              ?.toLowerCase()
              .includes(
                query
              ) ||
            getPartnerName(
              property
            )
              ?.toLowerCase()
              .includes(
                query
              );

          const matchStatus =
            statusFilter ===
              "All" ||
            property.status ===
              statusFilter;

          return (
            matchSearch &&
            matchStatus
          );
        }
      );
    }, [
      properties,
      search,
      statusFilter,
    ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const timeline =
    useMemo(
      () =>
        buildPropertyTimeline(
          selectedProperty
        ),
      [selectedProperty]
    );

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const viewProperty = () => {
    if (
      !selectedProperty?._id
    ) {
      return;
    }

    navigate(
      `/property-management/${selectedProperty._id}`
    );
  };

  const viewPartner = () => {
    const partnerId =
      getPartnerId(
        selectedProperty
      );

    if (!partnerId) {
      return;
    }

    /*
     * Tumhare App me /partner route hai.
     * Specific ID query me bhej rahe hain.
     */
    navigate(
      `/partnerdashboard?tab=dashboard&partnerId=${partnerId}`
    );
  };

  return (
    <div className="min-h-screen text-slate-800">

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="mb-4 px-1 py-1 ">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            {/* <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">
              Properties / Audit
            </p> */}

            <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
              Property Lifecycle &
              History
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Complete lifecycle from
              creation to partner
              assignment, verification,
              live status and final
              closure.
            </p>

          </div>

          <button
            onClick={
              fetchProperties
            }
            className="flex h-10 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCw
              size={14}
            />

            Refresh
          </button>

        </div>

      </section>

      {/* ===================================================
          MAIN 2 COLUMN LAYOUT
      =================================================== */}

      <div className="grid min-h-[650px] grid-cols-1 gap-4 xl:grid-cols-[370px_minmax(0,1fr)]">

        {/* ===============================================
            LEFT PROPERTY LIST
        =============================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* LEFT HEADER */}

          <div className="border-b border-slate-100 p-4">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-sm font-extrabold text-[#173c37]">
                  All Properties
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  {
                    filteredProperties.length
                  }{" "}
                  properties
                </p>
              </div>

              <Building2
                size={19}
                className="text-teal-600"
              />

            </div>

            {/* SEARCH */}

            <div className="relative mt-4">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search property, city, creator..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-teal-500 focus:bg-white"
              />

            </div>

            {/* STATUS */}

            <select
              value={
                statusFilter
              }
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold outline-none"
            >
              <option value="All">
                All Statuses
              </option>

              {[
                "Draft",
                "Submitted",
                "Assigned_To_Partner",
                "Reviewing",
                "Verified",
                "Live",
                "Sold",
                "Rented",
                "Rejected",
              ].map(
                (status) => (
                  <option
                    key={
                      status
                    }
                    value={
                      status
                    }
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

          {/* PROPERTY LIST */}

          <div className="max-h-[720px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {loading ? (
              <div className="p-10 text-center text-xs text-slate-400">
                Loading
                properties...
              </div>
            ) : filteredProperties.length ===
              0 ? (
              <div className="p-10 text-center">

                <AlertCircle
                  size={25}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-2 text-xs font-semibold text-slate-500">
                  No properties
                  found
                </p>

              </div>
            ) : (
              paginatedProperties.map(
                (property) => {
                  const selected =
                    selectedProperty?._id ===
                    property._id;

                  return (
                    <button
                      type="button"
                      key={
                        property._id
                      }
                      onClick={() =>
                        openProperty(
                          property
                        )
                      }
                      className={`w-full border-b border-slate-100 p-4 text-left transition ${
                        selected
                          ? "bg-teal-50/70"
                          : "hover:bg-slate-50"
                      }`}
                    >

                      <div className="flex gap-3">

                        <img
                          src={
                            property
                              ?.images?.[0]
                              ?.url ||
                            "https://placehold.co/100x100?text=Property"
                          }
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <div className="min-w-0">

                              <p className="truncate text-xs font-extrabold text-slate-800">
                                {
                                  property.title
                                }
                              </p>

                              <p className="mt-0.5 text-[9px] font-semibold text-teal-700">
                                {
                                  property.propertyId
                                }
                              </p>

                            </div>

                            <span
                              className={`shrink-0 rounded-full border px-2 py-0.5 text-[8px] font-bold ${
                                STATUS_STYLES[
                                  property
                                    .status
                                ] ||
                                STATUS_STYLES.Draft
                              }`}
                            >
                              {String(
                                property.status
                              ).replaceAll(
                                "_",
                                " "
                              )}
                            </span>

                          </div>

                          <div className="mt-2 flex items-center gap-1 text-[9px] text-slate-400">

                            <MapPin
                              size={
                                10
                              }
                            />

                            <span className="truncate">
                              {[
                                property.locality,
                                property.city,
                              ]
                                .filter(
                                  Boolean
                                )
                                .join(
                                  ", "
                                ) ||
                                "Location not added"}
                            </span>

                          </div>

                          <div className="mt-2 flex items-center justify-between text-[9px]">

                            <span className="text-slate-400">
                              By{" "}
                              <strong className="text-slate-600">
                                {property
                                  ?.addedBy
                                  ?.name ||
                                  "-"}
                              </strong>
                            </span>

                            <span className="text-slate-400">
                              {property
                                ?.statusHistory
                                ?.length ||
                                0}{" "}
                              updates
                            </span>

                          </div>

                        </div>

                      </div>

                    </button>
                  );
                }
              )
            )}

          </div>

          {!loading && filteredProperties.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-600">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-bold text-slate-600">
                  {Math.min(startIndex + itemsPerPage, filteredProperties.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-600">
                  {filteredProperties.length}
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="h-8 rounded-lg border border-slate-200 px-3 text-[10px] font-bold text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 min-w-8 rounded-lg px-2 text-[10px] font-bold transition ${
                        currentPage === page
                          ? "bg-[#1F3C50] text-white"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="h-8 rounded-lg border border-slate-200 px-3 text-[10px] font-bold text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </section>

        {/* ===============================================
            RIGHT DETAILS
        =============================================== */}

        <section>

          {!selectedProperty ? (
            <div className="flex min-h-[600px] items-center justify-center rounded-2xl border border-slate-200 bg-white">

              <div className="text-center">

                <History
                  size={38}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-bold text-slate-600">
                  Select a property
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Select property to
                  view complete
                  history.
                </p>

              </div>

            </div>
          ) : (
            <>

              {/* PROPERTY OVERVIEW */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                  <div className="flex gap-4">

                    <img
                      src={
                        selectedProperty
                          ?.images?.[0]
                          ?.url ||
                        "https://placehold.co/120x120?text=Property"
                      }
                      alt=""
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-lg font-extrabold text-[#173c37]">
                          {
                            selectedProperty.title
                          }
                        </h2>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[9px] font-bold ${
                            STATUS_STYLES[
                              selectedProperty
                                .status
                            ] ||
                            STATUS_STYLES.Draft
                          }`}
                        >
                          {String(
                            selectedProperty.status
                          ).replaceAll(
                            "_",
                            " "
                          )}
                        </span>

                      </div>

                      <p className="mt-1 text-xs font-semibold text-teal-700">
                        {
                          selectedProperty.propertyId
                        }
                      </p>

                      <p className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">

                        <MapPin
                          size={11}
                        />

                        {[
                          selectedProperty.locality,
                          selectedProperty.city,
                        ]
                          .filter(
                            Boolean
                          )
                          .join(
                            ", "
                          ) ||
                          "-"}

                      </p>

                    </div>

                  </div>

                  <button
                    onClick={
                      viewProperty
                    }
                    className="flex h-10 items-center gap-2 rounded-xl bg-[#1F3C50] px-4 text-xs font-bold text-white transition hover:bg-[#123b36]"
                  >
                    <Eye
                      size={14}
                    />

                    View Property

                    <ArrowRight
                      size={13}
                    />
                  </button>

                </div>

                {/* INFO GRID */}

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3 xl:grid-cols-6">

                  <InfoItem
                    label="Created"
                    value={formatDateTime(
                      selectedProperty.createdAt
                    )}
                  />

                  <InfoItem
                    label="Created By"
                    value={
                      selectedProperty
                        ?.addedBy
                        ?.name ||
                      "-"
                    }
                    secondary={
                      selectedProperty
                        ?.addedBy
                        ?.role
                    }
                  />

                  <InfoItem
                    label="Current Status"
                    value={String(
                      selectedProperty.status
                    ).replaceAll(
                      "_",
                      " "
                    )}
                  />

                  <InfoItem
                    label="Assigned"
                    value={formatDateTime(
                      selectedProperty
                        ?.assignedPartner
                        ?.assignedAt
                    )}
                  />

                  <InfoItem
                    label="Updated"
                    value={formatDateTime(
                      selectedProperty.updatedAt
                    )}
                  />

                  <InfoItem
                    label="Events"
                    value={
                      timeline.length
                    }
                  />

                </div>

              </section>

              {/* PARTNER */}

              <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Assigned
                      Partner
                    </p>

                    {getPartnerId(
                      selectedProperty
                    ) ? (
                      <>
                        <h3 className="mt-1 text-sm font-extrabold text-[#173c37]">
                          {getPartnerName(
                            selectedProperty
                          )}
                        </h3>

                        <p className="mt-1 text-[10px] text-teal-700">
                          Partner ID:{" "}
                          {getPartnerCode(
                            selectedProperty
                          )}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Assigned:{" "}
                          {formatDateTime(
                            selectedProperty
                              ?.assignedPartner
                              ?.assignedAt
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        No partner
                        assigned
                      </p>
                    )}

                  </div>

                  {getPartnerId(
                    selectedProperty
                  ) && (
                    <button
                      onClick={
                        viewPartner
                      }
                      className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-bold text-teal-700 transition hover:bg-teal-100"
                    >
                      <UserCheck
                        size={
                          14
                        }
                      />

                      View Partner

                      <ArrowRight
                        size={
                          12
                        }
                      />
                    </button>
                  )}

                </div>

              </section>

              {/* ==========================================
                  TIMELINE
              ========================================== */}

              <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <h2 className="text-sm font-extrabold text-[#173c37]">
                      Complete
                      Lifecycle
                    </h2>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Full property
                      audit trail in
                      chronological
                      order.
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-bold text-slate-500">
                    {
                      timeline.length
                    }{" "}
                    Events
                  </span>

                </div>

                {detailLoading ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    Loading
                    history...
                  </div>
                ) : (
                  <div className="relative pl-1">

                    {/* LINE */}

                    <div className="absolute bottom-7 left-[19px] top-7 w-px bg-slate-200" />

                    <div className="space-y-5">

                      {timeline.map(
                        (
                          event,
                          index
                        ) => (
                          <div
                            key={
                              event.id
                            }
                            className="relative flex gap-4"
                          >

                            {/* ICON */}

                            <div
                              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                                event.type ===
                                "live"
                                  ? "border-green-200 bg-green-50 text-green-600"
                                  : event.type ===
                                      "verified"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                    : event.type ===
                                        "partner"
                                      ? "border-blue-200 bg-blue-50 text-blue-600"
                                      : event.type ===
                                          "rejected"
                                        ? "border-red-200 bg-red-50 text-red-600"
                                        : event.type ===
                                            "created"
                                          ? "border-slate-200 bg-slate-100 text-slate-600"
                                          : "border-purple-200 bg-purple-50 text-purple-600"
                              }`}
                            >
                              <EventIcon
                                type={
                                  event.type
                                }
                              />
                            </div>

                            {/* EVENT */}

                            <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal-200 hover:shadow-sm">

                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                                <div>

                                  <div className="flex flex-wrap items-center gap-2">

                                    <h3 className="text-xs font-extrabold text-slate-800">
                                      {
                                        event.title
                                      }
                                    </h3>

                                    {event.status && (
                                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-bold text-slate-500">
                                        {String(
                                          event.status
                                        ).replaceAll(
                                          "_",
                                          " "
                                        )}
                                      </span>
                                    )}

                                  </div>

                                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                                    {
                                      event.description
                                    }
                                  </p>

                                </div>

                                <div className="flex shrink-0 items-center gap-1 text-[9px] font-medium text-slate-400">

                                  <Clock
                                    size={
                                      11
                                    }
                                  />

                                  {formatDateTime(
                                    event.time
                                  )}

                                </div>

                              </div>

                              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">

                                <div className="flex items-center gap-2">

                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1F3C50] text-white">

                                    <User
                                      size={
                                        11
                                      }
                                    />

                                  </div>

                                  <div>

                                    <p className="text-[9px] font-bold text-slate-700">
                                      {
                                        event.actor
                                      }
                                    </p>

                                    <p className="text-[8px] text-slate-400">
                                      {
                                        event.role
                                      }
                                    </p>

                                  </div>

                                </div>

                                {event.partnerId && (
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/partnerdashboard?tab=dashboard&partnerId=${event.partnerId}`
                                      )
                                    }
                                    className="flex items-center gap-1 text-[9px] font-bold text-teal-700"
                                  >
                                    View
                                    Partner

                                    <ArrowRight
                                      size={
                                        10
                                      }
                                    />
                                  </button>
                                )}

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

              </section>

            </>
          )}

        </section>

      </div>

    </div>
  );
}

function InfoItem({
  label,
  value,
  secondary,
}) {
  return (
    <div>
      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-[10px] font-bold text-slate-700">
        {value || "-"}
      </p>

      {secondary && (
        <p className="mt-0.5 text-[8px] text-slate-400">
          {secondary}
        </p>
      )}
    </div>
  );
}