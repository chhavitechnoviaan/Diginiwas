
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Plus,
  RefreshCw,
  Search,
  TrendingUp,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";

import Swal from "sweetalert2";

import {
  createLeadApi,
  getLeadDashboardApi,
  getLeadsApi,
} from "../../../Services/leadservice";

const PIPELINE_STATUSES = [
  "Lead_Created",
  "Lead_Verified",
  "Lead_Assigned",
  "Lead_Viewed",
  "Lead_Reviewing",
  "Lead_Rejected",
  "Lead_Closed",
  "Successfully_Converted",
];

const LABELS = {
  Lead_Created:
    "Created",
  Lead_Verified:
    "Verified",
  Lead_Assigned:
    "Assigned",
  Lead_Viewed:
    "Viewed",
  Lead_Reviewing:
    "Reviewing",
  Lead_Rejected:
    "Rejected",
  Lead_Closed:
    "Closed",
  Successfully_Converted:
    "Converted",
};

const formatMoney = (
  amount = 0
) => {
  const value =
    Number(amount || 0);

  if (value >= 10000000) {
    return `₹${(
      value / 10000000
    ).toFixed(1)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(
      value / 100000
    ).toFixed(1)} L`;
  }

  return `₹${value.toLocaleString(
    "en-IN"
  )}`;
};

export default function Leads() {
  const [
    dashboard,
    setDashboard,
  ] = useState({});

  const [
    pipeline,
    setPipeline,
  ] = useState([]);

  const [
    leads,
    setLeads,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

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
    totalPages,
    setTotalPages,
  ] = useState(1);

  const [
    total,
    setTotal,
  ] = useState(0);

  const [
    showAdd,
    setShowAdd,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState({
    buyerName: "",
    phone: "",
    email: "",
    propertyId: "",
    message: "",
    priority: "Medium",
  });

  const fetchDashboard =
    async () => {
      try {
        const response =
          await getLeadDashboardApi();

        setDashboard(
          response?.dashboard ||
            {}
        );

        setPipeline(
          Array.isArray(
            response?.pipeline
          )
            ? response.pipeline
            : []
        );
      } catch (error) {
        console.error(
          "LEAD DASHBOARD ERROR:",
          error
        );
      }
    };

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

        setLeads(
          response?.data ||
            response?.leads ||
            []
        );

        setTotal(
          response?.pagination
            ?.total ??
            response?.total ??
            0
        );

        setTotalPages(
          response?.pagination
            ?.totalPages ??
            response?.totalPages ??
            1
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    const timer =
      setTimeout(
        fetchLeads,
        250
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

  const pipelineMap =
    useMemo(
      () =>
        Object.fromEntries(
          pipeline.map(
            (item) => [
              item.status,
              item.count,
            ]
          )
        ),
      [pipeline]
    );

  const createLead =
    async () => {
      if (
        !form.buyerName ||
        !form.propertyId
      ) {
        Swal.fire({
          icon: "warning",
          title:
            "Required fields missing",
          text:
            "Buyer name and property ID are required.",
        });

        return;
      }

      try {
        const response =
          await createLeadApi({
            buyer: {
              name:
                form.buyerName,
              phone:
                form.phone,
              email:
                form.email,
            },
            propertyId:
              form.propertyId,
            message:
              form.message,
            priority:
              form.priority,
            createdBy: {
              name: "Admin",
              role: "Admin",
            },
          });

        if (
          response?.success
        ) {
          setShowAdd(false);

          setForm({
            buyerName: "",
            phone: "",
            email: "",
            propertyId: "",
            message: "",
            priority: "Medium",
          });

          await Promise.all([
            fetchDashboard(),
            fetchLeads(),
          ]);

          Swal.fire({
            icon: "success",
            title:
              "Lead Created",
            timer: 1200,
            showConfirmButton:
              false,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title:
            "Unable to create lead",
          text:
            error?.response
              ?.data
              ?.message ||
            "Please check property ID and buyer details.",
        });
      }
    };

  return (
    <div className="min-h-screen p-1">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
            Lead Operations
          </h1>

          <p className="mt-1 text-[11px] text-slate-500">
            Track lifecycle, assignment, unlock and conversion performance.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              fetchDashboard();
              fetchLeads();
            }}
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-600"
          >
            <RefreshCw
              size={13}
            />
            Refresh
          </button>

          {/* <button
            onClick={() =>
              setShowAdd(true)
            }
            className="flex h-9 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-[10px] font-semibold text-white"
          >
            <Plus size={14} />
            New Lead
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric
          label="Total Leads"
          value={
            dashboard.totalLeads ||
            0
          }
          icon={
            <TrendingUp
              size={17}
            />
          }
        />

        <Metric
          label="Conversion Rate"
          value={`${
            dashboard.conversionRate ||
            0
          }%`}
          icon={
            <TrendingUp
              size={17}
            />
          }
        />

        <Metric
          label="Active Lead Value"
          value={formatMoney(
            dashboard.totalLeadValue
          )}
          icon={
            <WalletCards
              size={17}
            />
          }
        />

        <Metric
          label="Unlocked By Partner"
          value={
            dashboard.unlocked ||
            0
          }
          icon={
            <UserRoundCheck
              size={17}
            />
          }
        />
      </div>

      <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-[12px] font-semibold text-slate-800">
            Lead Lifecycle Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4 xl:grid-cols-7">
          {PIPELINE_STATUSES.map(
            (status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(
                    status
                  );
                  setPage(1);
                }}
                className={`rounded-lg border p-3 text-left transition ${
                  statusFilter ===
                  status
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-[8px] uppercase tracking-wide text-slate-400">
                  {
                    LABELS[
                      status
                    ]
                  }
                </p>

                <p className="mt-2 text-xl font-bold text-slate-800">
                  {pipelineMap[
                    status
                  ] || 0}
                </p>
              </button>
            )
          )}
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
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
              placeholder="Search leads..."
              className="h-9 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-[10px]"
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
            className="h-9 rounded-lg border border-slate-200 px-3 text-[10px]"
          >
            <option value="">
              All Statuses
            </option>

            {PIPELINE_STATUSES.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {
                    LABELS[
                      status
                    ]
                  }
                </option>
              )
            )}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
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
                  STATUS
                </th>
                <th className="px-3 py-3 text-[9px]">
                  PARTNER
                </th>
                <th className="px-3 py-3 text-[9px]">
                  VALUE
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="h-44 text-center text-xs text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                leads.map(
                  (lead) => (
                    <tr
                      key={
                        lead._id
                      }
                      className="border-b border-slate-100"
                    >
                      <td className="px-4 py-3 text-[10px] font-semibold text-slate-800">
                        {
                          lead.leadId
                        }
                      </td>

                      <td className="px-3 py-3">
                        <p className="text-[10px] font-semibold">
                          {lead
                            ?.buyer
                            ?.name ||
                            "-"}
                        </p>
                        <p className="text-[8px] text-slate-400">
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
                        <p className="max-w-[200px] truncate text-[10px]">
                          {lead
                            ?.property
                            ?.title ||
                            "-"}
                        </p>
                        <p className="text-[8px] font-semibold text-emerald-600">
                          {lead
                            ?.property
                            ?.propertyCode ||
                            "-"}
                        </p>
                      </td>

                      <td className="px-3 py-3 text-[9px]">
                        <p>{LABELS[lead.status] || lead.status}</p>
                        <p
                          className={`mt-1 text-[8px] font-semibold ${
                            lead.leadVerificationStatus === "Verified"
                              ? "text-emerald-600"
                              : lead.leadVerificationStatus === "Rejected"
                                ? "text-red-600"
                                : "text-amber-600"
                          }`}
                        >
                          {lead.leadVerificationStatus || "Pending"} Verification
                        </p>
                      </td>

                      <td className="px-3 py-3 text-[9px]">
                        {lead
                          ?.assignedPartner
                          ?.name ||
                          "Unassigned"}
                      </td>

                      <td className="px-3 py-3 text-[9px] font-semibold">
                        {formatMoney(
                          lead.estimatedValue
                        )}
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

          <div className="flex gap-1">
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
              className="flex h-7 w-7 items-center justify-center rounded border disabled:opacity-40"
            >
              <ChevronLeft
                size={12}
              />
            </button>

            <span className="flex h-7 min-w-8 items-center justify-center rounded bg-[#1F3C50] px-2 text-[9px] text-white">
              {page} /{" "}
              {totalPages}
            </span>

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
              className="flex h-7 w-7 items-center justify-center rounded border disabled:opacity-40"
            >
              <ChevronRight
                size={12}
              />
            </button>
          </div>
        </div>
      </section>

      {showAdd && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              Create Lead
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="Buyer Name"
                value={
                  form.buyerName
                }
                onChange={(
                  value
                ) =>
                  setForm(
                    (prev) => ({
                      ...prev,
                      buyerName:
                        value,
                    })
                  )
                }
              />

              <Input
                label="Phone"
                value={
                  form.phone
                }
                onChange={(
                  value
                ) =>
                  setForm(
                    (prev) => ({
                      ...prev,
                      phone:
                        value,
                    })
                  )
                }
              />

              <Input
                label="Email"
                value={
                  form.email
                }
                onChange={(
                  value
                ) =>
                  setForm(
                    (prev) => ({
                      ...prev,
                      email:
                        value,
                    })
                  )
                }
              />

              <Input
                label="Property Mongo ID / Code"
                value={
                  form.propertyId
                }
                onChange={(
                  value
                ) =>
                  setForm(
                    (prev) => ({
                      ...prev,
                      propertyId:
                        value,
                    })
                  )
                }
              />

              <select
                value={
                  form.priority
                }
                onChange={(e) =>
                  setForm(
                    (prev) => ({
                      ...prev,
                      priority:
                        e.target
                          .value,
                    })
                  )
                }
                className="h-10 rounded-lg border border-slate-200 px-3 text-[10px]"
              >
                {[
                  "Low",
                  "Medium",
                  "High",
                  "Urgent",
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
                  form.message
                }
                onChange={(e) =>
                  setForm(
                    (prev) => ({
                      ...prev,
                      message:
                        e.target
                          .value,
                    })
                  )
                }
                placeholder="Lead notes / enquiry..."
                className="min-h-24 rounded-lg border border-slate-200 p-3 text-[10px] sm:col-span-2"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowAdd(
                    false
                  )
                }
                className="h-9 rounded-lg border border-slate-200 px-4 text-[10px] font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={
                  createLead
                }
                className="h-9 rounded-lg bg-emerald-600 px-4 text-[10px] font-semibold text-white"
              >
                Create Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  icon,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-[9px] uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <span className="text-emerald-600">
          {icon}
        </span>
      </div>

      <p className="mt-2 text-xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}) {
  return (
    <label>
      <span className="mb-1 block text-[9px] font-semibold text-slate-500">
        {label}
      </span>

      <input
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-[10px]"
      />
    </label>
  );
}
