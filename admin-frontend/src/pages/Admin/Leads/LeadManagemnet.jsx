import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  UserRoundCheck,
  XCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import Swal from "sweetalert2";

import {
  addLeadContactHistoryApi,
  assignLeadPartnerApi,
  closeLeadApi,
  convertLeadApi,
  getLeadByIdApi,
  getLeadsApi,
  rejectLeadApi,
  reviewLeadApi,
  updateLeadStatusApi,
  verifyLeadByAdminApi,
} from "../../../Services/leadservice";


const STATUSES = [
  "Lead_Created",
  "Lead_Verified",
  "Lead_Assigned",
  "Lead_Viewed",
  "Lead_Reviewing",
  "Lead_Rejected",
  "Lead_Closed",
  "Successfully_Converted",
];

const STATUS_LABELS = {
  Lead_Created:
    "Lead Created",
  Lead_Verified:
    "Lead Verified",
  Lead_Assigned:
    "Lead Assigned",
  Lead_Viewed:
    "Lead Viewed",
  Lead_Reviewing:
    "Lead Reviewing",
  Lead_Rejected:
    "Lead Rejected",
  Lead_Closed:
    "Lead Closed",
  Successfully_Converted:
    "Successfully Converted",
};

const STATUS_CLASS = {
  Lead_Created:
    "border-blue-200 bg-blue-50 text-blue-700",
  Lead_Verified:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  Lead_Assigned:
    "border-amber-200 bg-amber-50 text-amber-700",
  Lead_Viewed:
    "border-cyan-200 bg-cyan-50 text-cyan-700",
  Lead_Reviewing:
    "border-orange-200 bg-orange-50 text-orange-700",
  Lead_Rejected:
    "border-red-200 bg-red-50 text-red-700",
  Lead_Closed:
    "border-slate-200 bg-slate-100 text-slate-700",
  Successfully_Converted:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const formatDateTime = (
  value
) => {
  if (!value) return "-";

  return new Date(
    value
  ).toLocaleString(
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

const formatPrice = (
  value
) => {
  const amount =
    Number(value || 0);

  if (amount >= 10000000) {
    return `₹${(
      amount / 10000000
    ).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(
      amount / 100000
    ).toFixed(2)} L`;
  }

  return `₹${amount.toLocaleString(
    "en-IN"
  )}`;
};

const StatusBadge = ({
  status,
}) => (
  <span
    className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold ${
      STATUS_CLASS[
        status
      ] ||
      "border-slate-200 bg-slate-50 text-slate-600"
    }`}
  >
    {STATUS_LABELS[
      status
    ] ||
      status ||
      "-"}
  </span>
);

export default function LeadManagement({
  embedded = false,
  initialLeadId = null,
  onEmbeddedDetailClose,
}) {
  const navigate =
    useNavigate();

  const [
    leads,
    setLeads,
  ] = useState([]);

  const [
    selectedLead,
    setSelectedLead,
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
    actionLoading,
    setActionLoading,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("");

  const [
    page,
    setPage,
  ] = useState(1);

  const limit = 10;

  const [
    total,
    setTotal,
  ] = useState(0);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);



  const [
    contactForm,
    setContactForm,
  ] = useState({
    type: "Call",
    status: "Attempted",
    notes: "",
  });

  const fetchLeads =
    async () => {
      try {
        setLoading(true);

        const response =
          await getLeadsApi({
            search,
            status:
              statusFilter,
            page,
            limit,
          });

        const data =
          response?.data ||
          response?.leads ||
          [];

        setLeads(
          Array.isArray(data)
            ? data
            : []
        );

        const pagination =
          response?.pagination ||
          {};

        setTotal(
          pagination.total ??
            response?.total ??
            0
        );

        setTotalPages(
          pagination.totalPages ??
            response?.totalPages ??
            1
        );
      } catch (error) {
        console.error(
          "GET LEADS ERROR:",
          error
        );

        setLeads([]);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    const timer =
      setTimeout(
        fetchLeads,
        300
      );

    return () =>
      clearTimeout(timer);
  }, [
    search,
    statusFilter,
    page,
  ]);


  useEffect(() => {
    setPage(1);
  }, [
    search,
    statusFilter,
  ]);

  const openLead =
    async (id) => {
      try {
        setDetailLoading(
          true
        );

        const response =
          await getLeadByIdApi(
            id
          );

        setSelectedLead(
          response?.data ||
            null
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title:
            "Lead not found",
          text:
            error?.response
              ?.data
              ?.message ||
            "Unable to load lead.",
        });
      } finally {
        setDetailLoading(
          false
        );
      }
    };

  // ======================================================
  // LEADS DASHBOARD SE SPECIFIC LEAD DETAIL OPEN
  // Example:
  // /leads-dashboard?tab=promotions&leadId=LEAD_MONGO_ID
  // ======================================================
  useEffect(() => {
    if (!embedded || !initialLeadId) {
      return;
    }

    openLead(initialLeadId);
  }, [embedded, initialLeadId]);

  const closeLeadDetail = () => {
    setSelectedLead(null);

    if (embedded) {
      onEmbeddedDetailClose?.();
    }
  };

  const refreshSelected =
    async () => {
      if (
        selectedLead?._id
      ) {
        await openLead(
          selectedLead._id
        );
      }

      await fetchLeads();
    };

  const runAction =
    async (
      fn,
      successMessage
    ) => {
      try {
        setActionLoading(
          true
        );

        await fn();

        await Swal.fire({
          icon: "success",
          title:
            successMessage,
          timer: 1200,
          showConfirmButton:
            false,
        });

        await refreshSelected();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title:
            "Action failed",
          text:
            error?.response
              ?.data
              ?.message ||
            error?.message ||
            "Unable to update lead.",
        });
      } finally {
        setActionLoading(
          false
        );
      }
    };


  const handleStatus =
    async (status) => {
      if (!selectedLead?._id)
        return;

      await runAction(
        () =>
          updateLeadStatusApi(
            selectedLead._id,
            {
              status,
              actor: {
                name: "Admin",
                role: "Admin",
              },
            }
          ),
        "Status Updated"
      );
    };

  const handleReview =
    async () => {
      const {
        value: notes,
      } = await Swal.fire({
        title:
          "Review Lead",
        input: "textarea",
        inputLabel:
          "Review notes",
        showCancelButton:
          true,
        confirmButtonColor:
          "#08786b",
      });

      if (notes === undefined)
        return;

      await runAction(
        () =>
          reviewLeadApi(
            selectedLead._id,
            {
              notes,
              actor: {
                name: "Admin",
                role: "Admin",
              },
            }
          ),
        "Lead In Review"
      );
    };

  const handleVerify = async () => {
    if (!selectedLead?._id) return;

    const result = await Swal.fire({
      title: "Verify Lead",
      input: "textarea",
      inputLabel: "Verification notes (optional)",
      inputPlaceholder: "Buyer enquiry and property details checked",
      showCancelButton: true,
      confirmButtonText: "Verify Lead",
      confirmButtonColor: "#08786b",
    });

    if (!result.isConfirmed) return;

    await runAction(
      () =>
        verifyLeadByAdminApi(selectedLead._id, {
          notes: result.value || "",
          actor: { name: "DigiNiwas Admin", role: "Admin" },
        }),
      "Lead Verified"
    );
  };

  const handleAssignPropertyPartner = async () => {
    if (!selectedLead?._id) return;

    const result = await Swal.fire({
      icon: "question",
      title: "Assign Property Partner?",
      text: "The partner currently assigned to this property will receive this verified lead.",
      showCancelButton: true,
      confirmButtonText: "Assign Partner",
      confirmButtonColor: "#08786b",
    });

    if (!result.isConfirmed) return;

    await runAction(
      () =>
        assignLeadPartnerApi(selectedLead._id, {
          remarks: "Verified lead assigned to property's current partner",
          actor: { name: "DigiNiwas Admin", role: "Admin" },
        }),
      "Property Partner Assigned"
    );
  };

  const handleReject =
    async () => {
      const {
        value: reason,
      } = await Swal.fire({
        title:
          "Reject Lead",
        input: "textarea",
        inputLabel:
          "Reason",
        showCancelButton:
          true,
        confirmButtonColor:
          "#dc2626",
      });

      if (!reason) return;

      await runAction(
        () =>
          rejectLeadApi(
            selectedLead._id,
            {
              reason,
              actor: {
                name: "Admin",
                role: "Admin",
              },
            }
          ),
        "Lead Rejected"
      );
    };

  const handleClose =
    async () => {
      const {
        value: reason,
      } = await Swal.fire({
        title:
          "Close Lead",
        input: "textarea",
        inputLabel:
          "Closure reason",
        showCancelButton:
          true,
        confirmButtonColor:
          "#475569",
      });

      if (!reason) return;

      await runAction(
        () =>
          closeLeadApi(
            selectedLead._id,
            {
              reason,
              actor: {
                name: "Admin",
                role: "Admin",
              },
            }
          ),
        "Lead Closed"
      );
    };

  const handleConvert =
    async () => {
      const result =
        await Swal.fire({
          title:
            "Convert Lead",
          html: `
            <input
              id="conversion-amount"
              class="swal2-input"
              type="number"
              placeholder="Conversion amount"
            />
            <textarea
              id="conversion-notes"
              class="swal2-textarea"
              placeholder="Conversion notes"
            ></textarea>
          `,
          showCancelButton:
            true,
          confirmButtonColor:
            "#08786b",
          preConfirm: () => ({
            amount:
              document.getElementById(
                "conversion-amount"
              )?.value || 0,
            notes:
              document.getElementById(
                "conversion-notes"
              )?.value || "",
          }),
        });

      if (!result.isConfirmed)
        return;

      await runAction(
        () =>
          convertLeadApi(
            selectedLead._id,
            {
              ...result.value,
              actor: {
                name: "Admin",
                role: "Admin",
              },
            }
          ),
        "Lead Converted"
      );
    };

  const handleContact =
    async () => {
      if (
        !selectedLead?._id
      ) {
        return;
      }

      await runAction(
        () =>
          addLeadContactHistoryApi(
            selectedLead._id,
            {
              ...contactForm,
              doneBy: {
                name: "Admin",
                role: "Admin",
              },
            }
          ),
        "Contact Added"
      );

      setContactForm({
        type: "Call",
        status:
          "Attempted",
        notes: "",
      });
    };

  if (
    selectedLead ||
    detailLoading
  ) {
    return (
      <div className="min-h-screen p-1">
        <button
          type="button"
          onClick={closeLeadDetail}
          className="mb-3 flex items-center gap-1 text-[11px] font-semibold text-slate-500"
        >
          <ArrowLeft
            size={14}
          />
          Back to Lead Queue
        </button>

        {detailLoading ? (
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-500" />
          </div>
        ) : (
          <LeadDetail
            lead={
              selectedLead
            }
            handleStatus={
              handleStatus
            }
            handleReview={
              handleReview
            }
            handleVerify={handleVerify}
            handleAssignPropertyPartner={handleAssignPropertyPartner}
            handleReject={
              handleReject
            }
            handleClose={
              handleClose
            }
            handleConvert={
              handleConvert
            }
            actionLoading={
              actionLoading
            }
            navigate={
              navigate
            }
            contactForm={
              contactForm
            }
            setContactForm={
              setContactForm
            }
            handleContact={
              handleContact
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-1">
      <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
        <div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
            Lead Management
          </h1>

          <p className="mt-1 text-[11px] text-slate-500">
            Manage buyer enquiries, assignments, reviews, contact history and conversion.
          </p>
        </div>

        <button
          type="button"
          onClick={
            fetchLeads
          }
          className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-600"
        >
          <RefreshCw
            size={13}
          />
          Refresh
        </button>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search lead, buyer, property, partner..."
              className="h-9 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-[11px] outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={
              statusFilter
            }
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px]"
          >
            <option value="">
              All Statuses
            </option>

            {STATUSES.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {
                    STATUS_LABELS[
                      status
                    ]
                  }
                </option>
              )
            )}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="bg-[#1F3C50] text-left text-white">
                <th className="px-4 py-3 text-[9px]">
                  LEAD
                </th>
                <th className="px-3 py-3 text-[9px]">
                  BUYER
                </th>
                <th className="px-3 py-3 text-[9px]">
                  PROPERTY
                </th>
                <th className="px-3 py-3 text-[9px]">
                  PARTNER
                </th>
                <th className="px-3 py-3 text-[9px]">
                  STATUS
                </th>
                <th className="px-3 py-3 text-[9px]">
                  LAST CONTACT
                </th>
                <th className="px-3 py-3 text-[9px]">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="h-48 text-center text-xs text-slate-400"
                  >
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="h-48 text-center text-xs text-slate-400"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map(
                  (lead) => (
                    <tr
                      key={
                        lead._id
                      }
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">
                        <p className="text-[10px] font-bold text-slate-800">
                          {
                            lead.leadId
                          }
                        </p>
                        <p className="mt-1 text-[8px] text-slate-400">
                          {
                            lead.source
                          }
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <p className="text-[10px] font-semibold text-slate-700">
                          {
                            lead
                              ?.buyer
                              ?.name
                          }
                        </p>
                        <p className="mt-1 text-[8px] text-slate-400">
                          {lead
                            ?.buyer
                            ?.phone ||
                            lead
                              ?.buyer
                              ?.email ||
                            "-"}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <p className="max-w-[190px] truncate text-[10px] font-semibold text-slate-700">
                          {lead
                            ?.property
                            ?.title ||
                            "-"}
                        </p>
                        <p className="mt-1 text-[8px] font-semibold text-emerald-600">
                          {lead
                            ?.property
                            ?.propertyCode ||
                            "-"}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <p className="text-[10px] text-slate-600">
                          {lead
                            ?.assignedPartner
                            ?.name ||
                            "Unassigned"}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <StatusBadge
                          status={
                            lead.status
                          }
                        />
                      </td>

                      <td className="px-3 py-3 text-[9px] text-slate-500">
                        {formatDateTime(
                          lead.lastContactAt
                        )}
                      </td>

                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            openLead(
                              lead._id
                            )
                          }
                          className="flex h-8 items-center gap-1 rounded-md border border-emerald-200 px-2.5 text-[9px] font-semibold text-emerald-700"
                        >
                          <Eye
                            size={11}
                          />
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-[9px] text-slate-400">
            {total} lead(s)
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.max(
                      1,
                      prev - 1
                    )
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 disabled:opacity-40"
            >
              <ChevronLeft
                size={12}
              />
            </button>

            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setPage(
                      item
                    )
                  }
                  className={`h-7 min-w-7 rounded px-2 text-[9px] ${
                    item ===
                    page
                      ? "bg-[#1F3C50] text-white"
                      : "border border-slate-200 text-slate-600"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              disabled={
                page ===
                totalPages
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    Math.min(
                      totalPages,
                      prev + 1
                    )
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 disabled:opacity-40"
            >
              <ChevronRight
                size={12}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function LeadDetail({
  lead,
  handleStatus,
  handleReview,
  handleVerify,
  handleAssignPropertyPartner,
  handleReject,
  handleClose,
  handleConvert,
  actionLoading,
  navigate,
  contactForm,
  setContactForm,
  handleContact,
}) {
  const partnerMongoId =
    lead?.assignedPartner
      ?.partnerMongoId;

  const propertyMongoId =
    lead?.property
      ?.propertyMongoId;

  return (
    <div>
      <div className="mb-4 flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-5 lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              Lead:{" "}
              {lead.leadId}
            </h1>

            <StatusBadge
              status={
                lead.status
              }
            />

            <span
              className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${
                lead.leadVerificationStatus === "Verified"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : lead.leadVerificationStatus === "Rejected"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {lead.leadVerificationStatus || "Pending"} Verification
            </span>

            {lead.isUnlockedByPartner && (
              <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-1 text-[9px] font-semibold text-purple-700">
                Unlocked by Partner
              </span>
            )}
          </div>

          <p className="mt-1 text-[10px] text-slate-400">
            Created{" "}
            {formatDateTime(
              lead.createdAt
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            disabled={
              !propertyMongoId
            }
            onClick={() =>
              propertyMongoId &&
              navigate(
                `/property-management/${propertyMongoId}`
              )
            }
            className="h-9 rounded-lg bg-[#1F3C50] px-3 text-[10px] font-semibold text-white disabled:opacity-40"
          >
            View Property
          </button>

          <button
            disabled={
              !partnerMongoId
            }
            onClick={() =>
              partnerMongoId &&
              navigate(
                `/partnerdashboard?tab=dashboard&partnerId=${partnerMongoId}`
              )
            }
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-700 disabled:opacity-40"
          >
            View Partner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)_310px]">
        <div className="space-y-4">
          <InfoCard
            title="Buyer Profile"
            icon={
              <UserRound
                size={15}
              />
            }
          >
            <InfoRow
              label="Name"
              value={
                lead?.buyer?.name
              }
            />
            <InfoRow
              label="Phone"
              value={
                lead?.buyer?.phone
              }
            />
            <InfoRow
              label="Email"
              value={
                lead?.buyer?.email
              }
            />
            <InfoRow
              label="City"
              value={
                lead?.buyer?.city
              }
            />
          </InfoCard>

          <InfoCard
            title="Property"
            icon={
              <Building2
                size={15}
              />
            }
          >
            {lead?.property
              ?.image && (
              <img
                src={
                  lead.property
                    .image
                }
                alt=""
                className="mb-3 h-32 w-full rounded-lg object-cover"
              />
            )}

            <InfoRow
              label="Code"
              value={
                lead?.property
                  ?.propertyCode
              }
            />

            <InfoRow
              label="Title"
              value={
                lead?.property
                  ?.title
              }
            />

            <InfoRow
              label="Price"
              value={formatPrice(
                lead?.property
                  ?.price
              )}
            />

            <InfoRow
              label="Location"
              value={[
                lead?.property
                  ?.locality,
                lead?.property
                  ?.city,
              ]
                .filter(Boolean)
                .join(", ")}
            />

            <InfoRow
              label="Added By"
              value={`${
                lead?.property
                  ?.addedByName ||
                "-"
              } (${
                lead?.property
                  ?.addedByRole ||
                "-"
              })`}
            />
          </InfoCard>
        </div>

        <div className="space-y-4">
          <InfoCard
            title="Lifecycle"
            icon={
              <Clock3
                size={15}
              />
            }
          >
            <div className="space-y-3">
              {(lead.lifecycle ||
                [])
                .slice()
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
                      className="flex gap-3"
                    >
                      <div className="flex flex-col items-center">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="mt-1 min-h-8 w-px flex-1 bg-slate-200" />
                      </div>

                      <div className="pb-2">
                        <p className="text-[10px] font-semibold text-slate-700">
                          {item.event ||
                            STATUS_LABELS[
                              item
                                .status
                            ] ||
                            item.status}
                        </p>

                        <p className="mt-1 text-[8px] text-slate-400">
                          {formatDateTime(
                            item.createdAt
                          )}
                          {" • "}
                          {item?.actor
                            ?.name ||
                            "System"}
                        </p>

                        {item.remarks && (
                          <p className="mt-1 text-[9px] text-slate-500">
                            {
                              item.remarks
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
            </div>
          </InfoCard>

          <InfoCard
            title="Contact History"
            icon={
              <MessageSquare
                size={15}
              />
            }
          >
            <div className="space-y-2">
              {(lead.contactHistory ||
                [])
                .slice()
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
                      className="rounded-lg border border-slate-100 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-semibold text-slate-700">
                          {
                            item.type
                          }
                        </p>

                        <span className="text-[8px] text-slate-400">
                          {
                            item.status
                          }
                        </span>
                      </div>

                      <p className="mt-1 text-[8px] text-slate-400">
                        {formatDateTime(
                          item.contactedAt
                        )}
                      </p>

                      {item.notes && (
                        <p className="mt-2 text-[9px] text-slate-600">
                          {
                            item.notes
                          }
                        </p>
                      )}
                    </div>
                  )
                )}

              {!lead
                ?.contactHistory
                ?.length && (
                <p className="py-4 text-center text-[9px] text-slate-400">
                  No contact history yet.
                </p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
              <select
                value={
                  contactForm.type
                }
                onChange={(e) =>
                  setContactForm(
                    (prev) => ({
                      ...prev,
                      type:
                        e.target.value,
                    })
                  )
                }
                className="h-9 rounded-lg border border-slate-200 px-2 text-[9px]"
              >
                {[
                  "Call",
                  "WhatsApp",
                  "SMS",
                  "Email",
                  "Note",
                  "Visit",
                  "Other",
                ].map(
                  (item) => (
                    <option
                      key={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <select
                value={
                  contactForm.status
                }
                onChange={(e) =>
                  setContactForm(
                    (prev) => ({
                      ...prev,
                      status:
                        e.target.value,
                    })
                  )
                }
                className="h-9 rounded-lg border border-slate-200 px-2 text-[9px]"
              >
                {[
                  "Attempted",
                  "Connected",
                  "No_Response",
                  "Sent",
                  "Received",
                  "Scheduled",
                  "Completed",
                  "Cancelled",
                  "Other",
                ].map(
                  (item) => (
                    <option
                      key={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <textarea
                value={
                  contactForm.notes
                }
                onChange={(e) =>
                  setContactForm(
                    (prev) => ({
                      ...prev,
                      notes:
                        e.target.value,
                    })
                  )
                }
                placeholder="Contact notes..."
                className="col-span-2 min-h-20 rounded-lg border border-slate-200 p-2 text-[9px] outline-none"
              />

              <button
                disabled={
                  actionLoading
                }
                onClick={
                  handleContact
                }
                className="col-span-2 h-9 rounded-lg bg-emerald-600 text-[10px] font-semibold text-white"
              >
                Add Contact
              </button>
            </div>
          </InfoCard>
        </div>

        <div className="space-y-4">
          <InfoCard
            title="Partner Assignment"
            icon={
              <UserRoundCheck
                size={15}
              />
            }
          >
            {lead?.assignedPartner?.partnerMongoId ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <UserRoundCheck size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-bold text-slate-800">
                        {lead.assignedPartner.name || "Assigned Partner"}
                      </p>

                      <p className="mt-0.5 text-[9px] font-semibold text-emerald-700">
                        {lead.assignedPartner.partnerCode || "-"}
                      </p>

                      <p className="mt-1 truncate text-[8px] text-slate-500">
                        {lead.assignedPartner.phone || "-"}
                      </p>

                      <p className="truncate text-[8px] text-slate-500">
                        {lead.assignedPartner.email || "-"}
                      </p>

                      {lead.assignedPartner.partnerType && (
                        <p className="mt-1 text-[8px] capitalize text-slate-400">
                          Type: {lead.assignedPartner.partnerType}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-emerald-200 bg-white px-2 py-1 text-[7px] font-bold text-emerald-700">
                    PROPERTY PARTNER
                  </span>
                </div>

                <div className="mt-3 border-t border-emerald-100 pt-3">
                  <p className="text-[8px] uppercase tracking-wide text-slate-400">
                    Assignment Source
                  </p>

                  <p className="mt-1 text-[9px] font-semibold text-slate-600">
                    {lead.assignedPartner.assignmentSource === "Property"
                      ? "Inherited from Property Assignment"
                      : lead.assignedPartner.assignmentSource ||
                        "Property Assignment"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/partnerdashboard?tab=dashboard&partnerId=${lead.assignedPartner.partnerMongoId}`
                    )
                  }
                  className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-white text-[9px] font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  <Eye size={11} />
                  View Partner Profile
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                <UserRound
                  size={21}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-2 text-[10px] font-semibold text-slate-600">
                  No partner assigned to this property
                </p>

                <p className="mt-1 text-[8px] leading-4 text-slate-400">
                  First verify the lead, then use “Assign Property Partner”. Only that property partner can unlock it.
                </p>
              </div>
            )}
          </InfoCard>

          <InfoCard
            title="Workflow Actions"
            icon={
              <ShieldCheck
                size={15}
              />
            }
          >
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={
                  actionLoading ||
                  lead.leadVerificationStatus === "Verified" ||
                  lead.leadVerificationStatus === "Rejected"
                }
                onClick={handleVerify}
                className="col-span-2 h-10 rounded-lg bg-emerald-600 text-[10px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {lead.leadVerificationStatus === "Verified"
                  ? "Lead Verified"
                  : "Verify Lead"}
              </button>

              <button
                type="button"
                disabled={
                  actionLoading ||
                  lead.leadVerificationStatus !== "Verified" ||
                  lead?.assignedPartner?.assignmentSource === "Lead"
                }
                onClick={handleAssignPropertyPartner}
                className="col-span-2 h-10 rounded-lg bg-[#1F3C50] text-[10px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {lead?.assignedPartner?.assignmentSource === "Lead"
                  ? "Property Partner Assigned"
                  : lead.leadVerificationStatus !== "Verified"
                    ? "Verify Lead Before Assignment"
                    : "Assign Property Partner"}
              </button>

              <ActionButton
                label="Mark Viewed"
                onClick={() =>
                  handleStatus(
                    "Lead_Viewed"
                  )
                }
              />

              <ActionButton
                label="Review"
                onClick={
                  handleReview
                }
              />

              <ActionButton
                label="Reject"
                danger
                onClick={
                  handleReject
                }
              />

              <ActionButton
                label="Close"
                onClick={
                  handleClose
                }
              />

              <button
                disabled={
                  actionLoading
                }
                onClick={
                  handleConvert
                }
                className="col-span-2 h-10 rounded-lg bg-emerald-600 text-[10px] font-semibold text-white disabled:opacity-40"
              >
                Successfully Convert Lead
              </button>
            </div>
          </InfoCard>

          {lead
            .enquiryMessage && (
            <InfoCard
              title="Buyer Enquiry"
              icon={
                <Mail
                  size={15}
                />
              }
            >
              <p className="text-[10px] leading-5 text-slate-600">
                {
                  lead.enquiryMessage
                }
              </p>
            </InfoCard>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  icon,
  children,
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-emerald-600">
          {icon}
        </span>
        <h3 className="text-[12px] font-semibold text-slate-800">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="mb-3">
      <p className="text-[8px] uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-[10px] font-medium text-slate-700">
        {value || "-"}
      </p>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-lg border text-[9px] font-semibold ${
        danger
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}
