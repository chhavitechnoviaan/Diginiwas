import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Users,
  Clock3,
  AlertTriangle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  ShieldCheck,
  X,
} from "lucide-react";

import Swal from "sweetalert2";

import {
  getSellerApplicationsApi,
  getSellerApplicationByIdApi,
  reviewSellerApplicationApi,
} from "../../../Services/sellerService";

const STATUS_OPTIONS = [
  "All",
  "SUBMITTED",
  "UNDER_REVIEW",
  "ACTION_REQUIRED",
  "REJECTED",
  "EMAIL_VERIFICATION_PENDING",
  "PHONE_VERIFICATION_PENDING",
];

const statusStyle = {
  SUBMITTED:
    "border-blue-200 bg-blue-50 text-blue-700",
  UNDER_REVIEW:
    "border-amber-200 bg-amber-50 text-amber-700",
  ACTION_REQUIRED:
    "border-orange-200 bg-orange-50 text-orange-700",
  REJECTED:
    "border-red-200 bg-red-50 text-red-600",
  EMAIL_VERIFICATION_PENDING:
    "border-slate-200 bg-slate-50 text-slate-600",
  PHONE_VERIFICATION_PENDING:
    "border-slate-200 bg-slate-50 text-slate-600",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex max-w-full rounded-full border px-2.5 py-1 text-[9px] font-bold ${statusStyle[status] || "border-[#DCE5E9] bg-[#F8FAFB] text-[#607681]"}`}
  >
    {String(status || "-").replaceAll("_", " ")}
  </span>
);

export default function SellerApplications() {
  const [applications, setApplications] =
    useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    actionRequired: 0,
    rejected: 0,
    verificationPending: 0,
  });

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [detailLoading, setDetailLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const itemsPerPage = 10;

  const fetchApplications =
    async () => {
      try {
        setLoading(true);

        const response =
          await getSellerApplicationsApi({
            search:
              search.trim() || undefined,
            status,
          });

        if (response?.success) {
          setApplications(
            response.data || []
          );

          setSummary(
            response.summary || {}
          );
        }
      } catch (error) {
        console.error(
          "Seller Applications Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const timer = setTimeout(
      fetchApplications,
      250
    );

    return () =>
      clearTimeout(timer);
  }, [search, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      applications.length /
        itemsPerPage
    )
  );

  const visibleApplications =
    useMemo(() => {
      const start =
        (page - 1) * itemsPerPage;

      return applications.slice(
        start,
        start + itemsPerPage
      );
    }, [applications, page]);

  const openDetail =
    async (application) => {
      try {
        setDetailLoading(true);
        setSelectedApplication(
          application
        );

        const response =
          await getSellerApplicationByIdApi(
            application._id
          );

        if (response?.success) {
          setSelectedApplication(
            response.data
          );
        }
      } finally {
        setDetailLoading(false);
      }
    };

  const reviewApplication =
    async (action) => {
      if (!selectedApplication?._id) {
        return;
      }

      const titleMap = {
        approve: "Approve Seller?",
        reject: "Reject Seller?",
        action_required:
          "Request Correction?",
        under_review:
          "Move Under Review?",
      };

      const confirmMap = {
        approve: "Approve Seller",
        reject: "Reject Application",
        action_required:
          "Send Action Required",
        under_review:
          "Mark Under Review",
      };

      let remarks = "";

      if (
        [
          "reject",
          "action_required",
        ].includes(action)
      ) {
        const result =
          await Swal.fire({
            title: titleMap[action],
            input: "textarea",
            inputPlaceholder:
              "Admin remarks...",
            showCancelButton: true,
            confirmButtonText:
              confirmMap[action],
            confirmButtonColor:
              action === "reject"
                ? "#dc2626"
                : "#35C99A",
            inputValidator: (value) =>
              !value?.trim()
                ? "Remarks are required."
                : undefined,
          });

        if (!result.isConfirmed) {
          return;
        }

        remarks = result.value;
      } else {
        const result =
          await Swal.fire({
            title: titleMap[action],
            text:
              action === "approve"
                ? "The seller will receive login credentials by email after approval."
                : "This application will be marked as under review.",
            showCancelButton: true,
            confirmButtonText:
              confirmMap[action],
            confirmButtonColor:
              "#35C99A",
          });

        if (!result.isConfirmed) {
          return;
        }
      }

      try {
        const response =
          await reviewSellerApplicationApi(
            selectedApplication._id,
            {
              action,
              remarks,
            }
          );

        await Swal.fire({
          icon:
            response?.warning
              ? "warning"
              : "success",
          title:
            response?.warning
              ? "Approved with Warning"
              : "Updated",
          text:
            response?.warning ||
            response?.message ||
            "Seller application updated.",
          confirmButtonColor:
            "#35C99A",
        });

        setSelectedApplication(
          null
        );

        await fetchApplications();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Action Failed",
          text:
            error?.response?.data
              ?.message ||
            "Unable to update application.",
          confirmButtonColor:
            "#35C99A",
        });
      }
    };

  const stats = [
    {
      label: "Total Applications",
      value: summary.total || 0,
      icon: Users,
      tone:
        "bg-[#EEF6FF] text-[#2E90FA]",
      sub: "Awaiting admin workflow",
    },
    {
      label: "Submitted",
      value:
        summary.submitted || 0,
      icon: Clock3,
      tone:
        "bg-[#EAF9F4] text-[#25B98B]",
      sub: "Ready for review",
    },
    {
      label: "Action Required",
      value:
        summary.actionRequired || 0,
      icon: AlertTriangle,
      tone:
        "bg-[#FFF5E8] text-[#F79009]",
      sub: "Seller correction needed",
    },
    {
      label: "Rejected",
      value:
        summary.rejected || 0,
      icon: XCircle,
      tone:
        "bg-red-50 text-red-500",
      sub: "Not approved",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F8] p-1 font-sans text-[#173247]">
      {/* HEADER */}
      <div className="mb-4 flex flex-col gap-3 px-1 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
            Seller Applications
          </h1>

          <p className="mt-1 text-[10px] font-medium leading-5 text-[#8998AF] sm:text-[11px]">
            Review seller KYC, email verification, phone verification and approve account access.
          </p>
        </div>

        <div className="rounded-lg border border-[#DCE5E9] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#536779]">
          Approved sellers automatically move to Seller Management
        </div>
      </div>

      {/* STATS */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="min-h-[155px] rounded-[18px] border border-[#DCE5E9] bg-white p-6 shadow-[0_2px_5px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="pt-2 text-[10px] font-bold uppercase tracking-[0.25px] text-[#576D86]">
                  {item.label}
                </p>

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[15px] ${item.tone}`}
                >
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-5 text-[29px] font-bold leading-none text-[#173247]">
                {item.value}
              </p>

              <p className="mt-3 text-[10px] font-medium text-[#95A3B5]">
                {item.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-[16px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
        <div className="flex flex-col gap-3 border-b border-[#E7EDF0] bg-[#F8FAFB] p-4 lg:flex-row">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91A2AC]"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search seller, email, phone, city..."
              className="h-10 w-full rounded-xl border border-[#DCE5E9] bg-white pl-10 pr-4 text-xs font-medium outline-none placeholder:text-[#9DABB3] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="h-10 rounded-xl border border-[#DCE5E9] bg-white px-3 text-xs font-semibold text-[#526A78] outline-none focus:border-[#35C99A] lg:w-56"
          >
            {STATUS_OPTIONS.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Application Status"
                    : item.replaceAll(
                        "_",
                        " "
                      )}
                </option>
              )
            )}
          </select>
        </div>

        <div className="hidden w-full overflow-hidden lg:block">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="h-[52px] bg-[#1F3C50] text-left text-white">
                <th className="w-[22%] px-4 text-[10px] font-bold uppercase tracking-[0.2px]">
                  Seller
                </th>
                <th className="w-[22%] px-4 text-[10px] font-bold uppercase tracking-[0.2px]">
                  Contact
                </th>
                <th className="w-[18%] px-4 text-[10px] font-bold uppercase tracking-[0.2px]">
                  Verification
                </th>
                <th className="w-[16%] px-4 text-[10px] font-bold uppercase tracking-[0.2px]">
                  ID Proof
                </th>
                <th className="w-[14%] px-4 text-[10px] font-bold uppercase tracking-[0.2px]">
                  Status
                </th>
                <th className="w-[8%] px-4 text-right text-[10px] font-bold uppercase tracking-[0.2px]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF1F3]">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center"
                  >
                    <Loader2 className="mx-auto animate-spin text-[#35C99A]" />
                  </td>
                </tr>
              ) : visibleApplications.length ? (
                visibleApplications.map(
                  (seller) => (
                    <tr
                      key={seller._id}
                      onClick={() =>
                        openDetail(
                          seller
                        )
                      }
                      className="cursor-pointer text-[10px] transition hover:bg-[#EAF9F4]/45"
                    >
                      <td className="px-4 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] font-bold text-[#15966F]">
                            {(seller.name || "S")
                              .split(" ")
                              .map((x) => x[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-bold text-[#173247]">
                              {seller.name}
                            </p>
                            <p className="mt-0.5 truncate text-[#91A2AC]">
                              {seller.sellerId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="flex items-center gap-1.5 truncate text-[#536779]">
                          <Mail size={11} />
                          {seller.email}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 truncate text-[#91A2AC]">
                          <Phone size={11} />
                          {seller.phone}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          <span
                            className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${
                              seller
                                .emailVerification
                                ?.isVerified
                                ? "border-[#35C99A]/30 bg-[#EAF9F4] text-[#15966F]"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                            }`}
                          >
                            Email{" "}
                            {seller
                              .emailVerification
                              ?.isVerified
                              ? "✓"
                              : "Pending"}
                          </span>

                          <span
                            className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${
                              seller
                                .phoneVerification
                                ?.isVerified
                                ? "border-[#35C99A]/30 bg-[#EAF9F4] text-[#15966F]"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                            }`}
                          >
                            Phone{" "}
                            {seller
                              .phoneVerification
                              ?.isVerified
                              ? "✓"
                              : "Pending"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-semibold text-[#536779]">
                          {seller.idProof?.type || "-"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge
                          status={
                            seller.applicationStatus
                          }
                        />
                      </td>

                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDetail(
                              seller
                            );
                          }}
                          className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 font-semibold text-[#15966F] hover:bg-[#EAF9F4]"
                        >
                          <Eye size={12} />
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center text-xs text-[#91A2AC]"
                  >
                    No seller applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* RESPONSIVE CARDS */}
        <div className="grid gap-3 p-3 lg:hidden">
          {visibleApplications.map(
            (seller) => (
              <button
                type="button"
                key={seller._id}
                onClick={() =>
                  openDetail(seller)
                }
                className="rounded-2xl border border-[#E3EAED] bg-white p-4 text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#173247]">
                      {seller.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[#91A2AC]">
                      {seller.sellerId}
                    </p>
                  </div>

                  <StatusBadge
                    status={
                      seller.applicationStatus
                    }
                  />
                </div>

                <div className="mt-3 space-y-1 text-[10px] text-[#607681]">
                  <p>{seller.email}</p>
                  <p>{seller.phone}</p>
                  <p>
                    {seller.location?.city ||
                      "-"}
                  </p>
                </div>
              </button>
            )
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#E7EDF0] bg-[#F8FAFB] px-4 py-3">
          <p className="text-[10px] text-[#91A2AC]">
            {applications.length} application(s)
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE5E9] disabled:opacity-40"
            >
              <ChevronLeft size={12} />
            </button>

            <span className="px-2 text-[10px] text-[#607681]">
              {page} / {totalPages}
            </span>

            <button
              disabled={
                page >= totalPages
              }
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE5E9] disabled:opacity-40"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* DETAIL DRAWER */}
      {(selectedApplication ||
        detailLoading) && (
        <div className="fixed inset-0 z-[999]">
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"
            onClick={() =>
              setSelectedApplication(
                null
              )
            }
          />

          <div className="absolute bottom-0 right-0 top-0 w-full max-w-[620px] overflow-y-auto bg-[#F4F7F8] shadow-[-12px_0_35px_rgba(15,23,42,0.13)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#DCE5E9] bg-white px-5 py-4">
              <div>
                <h2 className="text-[18px] font-bold text-[#173247]">
                  Seller Application
                </h2>
                <p className="mt-1 text-[10px] text-[#91A2AC]">
                  KYC, verification and admin approval
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedApplication(
                    null
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F6] text-[#607681]"
              >
                <X size={15} />
              </button>
            </div>

            {detailLoading ? (
              <div className="flex h-[350px] items-center justify-center">
                <Loader2 className="animate-spin text-[#35C99A]" />
              </div>
            ) : selectedApplication ? (
              <div className="space-y-4 p-5">
                <div className="rounded-2xl border border-[#DCE5E9] bg-white p-5 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[17px] font-bold text-[#173247]">
                        {selectedApplication.name}
                      </p>

                      <p className="mt-1 text-[10px] font-semibold text-[#15966F]">
                        {selectedApplication.sellerId}
                      </p>
                    </div>

                    <StatusBadge
                      status={
                        selectedApplication.applicationStatus
                      }
                    />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <DetailBox
                      icon={Mail}
                      label="Email"
                      value={
                        selectedApplication.email
                      }
                    />

                    <DetailBox
                      icon={Phone}
                      label="Phone"
                      value={
                        selectedApplication.phone
                      }
                    />

                    <DetailBox
                      icon={MapPin}
                      label="Location"
                      value={[
                        selectedApplication
                          .location?.address,
                        selectedApplication
                          .location?.city,
                        selectedApplication
                          .location?.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    />

                    <DetailBox
                      icon={FileText}
                      label="ID Proof"
                      value={
                        selectedApplication
                          .idProof?.type
                      }
                    />
                  </div>
                </div>

                {/* VERIFICATION */}
                <div className="rounded-2xl border border-[#DCE5E9] bg-white p-5">
                  <SectionTitle
                    icon={ShieldCheck}
                    title="Verification"
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <VerificationCard
                      label="Email Verification"
                      verified={
                        selectedApplication
                          .emailVerification
                          ?.isVerified
                      }
                    />

                    <VerificationCard
                      label="Phone Verification"
                      verified={
                        selectedApplication
                          .phoneVerification
                          ?.isVerified
                      }
                    />
                  </div>
                </div>

                {/* KYC */}
                <div className="rounded-2xl border border-[#DCE5E9] bg-white p-5">
                  <SectionTitle
                    icon={FileText}
                    title="Identity Documents"
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <DocumentCard
                      label="Front Image"
                      image={
                        selectedApplication
                          .idProof
                          ?.frontImage?.url
                      }
                    />

                    <DocumentCard
                      label="Back Image"
                      image={
                        selectedApplication
                          .idProof
                          ?.backImage?.url
                      }
                      optional={
                        selectedApplication
                          .idProof?.type ===
                        "PAN"
                      }
                    />
                  </div>
                </div>

                {/* HISTORY */}
                <div className="rounded-2xl border border-[#DCE5E9] bg-white p-5">
                  <SectionTitle
                    icon={Clock3}
                    title="Application History"
                  />

                  <div className="space-y-3">
                    {(
                      selectedApplication.verificationHistory ||
                      []
                    )
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
                            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#35C99A]" />
                            <div>
                              <p className="text-[10px] font-bold text-[#425A70]">
                                {String(
                                  item.action ||
                                    ""
                                ).replaceAll(
                                  "_",
                                  " "
                                )}
                              </p>

                              <p className="mt-1 text-[9px] text-[#91A2AC]">
                                {item.updatedAt
                                  ? new Date(
                                      item.updatedAt
                                    ).toLocaleString(
                                      "en-IN"
                                    )
                                  : "-"}
                              </p>

                              {item.remarks && (
                                <p className="mt-1 text-[10px] text-[#607681]">
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
                </div>

                {/* ADMIN ACTIONS */}
                {![
                  "REJECTED",
                ].includes(
                  selectedApplication.applicationStatus
                ) && (
                  <div className="rounded-2xl border border-[#DCE5E9] bg-white p-5">
                    <SectionTitle
                      icon={BadgeCheck}
                      title="Admin Decision"
                    />

                    <div className="grid gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() =>
                          reviewApplication(
                            "approve"
                          )
                        }
                        disabled={
                          !selectedApplication
                            .emailVerification
                            ?.isVerified ||
                          !selectedApplication
                            .phoneVerification
                            ?.isVerified
                        }
                        className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#35C99A] text-[10px] font-bold text-white transition hover:bg-[#15966F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <CheckCircle2
                          size={14}
                        />
                        Approve & Send Login
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          reviewApplication(
                            "under_review"
                          )
                        }
                        className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DCE5E9] bg-white text-[10px] font-bold text-[#536779] hover:bg-[#F8FAFB]"
                      >
                        <Clock3 size={14} />
                        Under Review
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          reviewApplication(
                            "action_required"
                          )
                        }
                        className="flex h-10 items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 text-[10px] font-bold text-amber-700"
                      >
                        <AlertTriangle
                          size={14}
                        />
                        Action Required
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          reviewApplication(
                            "reject"
                          )
                        }
                        className="flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-[10px] font-bold text-red-600"
                      >
                        <XCircle size={14} />
                        Reject
                      </button>
                    </div>

                    {!selectedApplication
                      .emailVerification
                      ?.isVerified ||
                    !selectedApplication
                      .phoneVerification
                      ?.isVerified ? (
                      <p className="mt-3 text-[9px] text-amber-600">
                        Approval is disabled until both email and phone are verified.
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF9F4] text-[#25B98B]">
        <Icon size={14} />
      </div>

      <h3 className="text-[12px] font-bold text-[#173247]">
        {title}
      </h3>

      <div className="h-px flex-1 bg-[#E7EDF0]" />
    </div>
  );
}

function DetailBox({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-[#E7EDF0] bg-[#F8FAFB] p-3">
      <div className="flex gap-2">
        <Icon
          size={13}
          className="mt-0.5 text-[#25B98B]"
        />

        <div className="min-w-0">
          <p className="text-[8px] font-bold uppercase tracking-wide text-[#91A2AC]">
            {label}
          </p>

          <p className="mt-1 break-words text-[10px] font-semibold text-[#536779]">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

function VerificationCard({
  label,
  verified,
}) {
  return (
    <div className="rounded-xl border border-[#E7EDF0] p-3">
      <div className="flex items-center gap-2">
        {verified ? (
          <CheckCircle2
            size={16}
            className="text-[#25B98B]"
          />
        ) : (
          <Clock3
            size={16}
            className="text-amber-500"
          />
        )}

        <div>
          <p className="text-[10px] font-bold text-[#425A70]">
            {label}
          </p>

          <p
            className={`mt-1 text-[9px] font-semibold ${
              verified
                ? "text-[#15966F]"
                : "text-amber-600"
            }`}
          >
            {verified
              ? "Verified"
              : "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({
  label,
  image,
  optional,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#DCE5E9] bg-[#F8FAFB]">
      <div className="border-b border-[#E7EDF0] px-3 py-2 text-[9px] font-bold uppercase tracking-wide text-[#607681]">
        {label}
      </div>

      {image ? (
        <a
          href={image}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <img
            src={image}
            alt={label}
            className="h-44 w-full object-cover transition hover:scale-[1.01]"
          />
        </a>
      ) : (
        <div className="flex h-44 items-center justify-center text-[10px] text-[#91A2AC]">
          {optional
            ? "Not required for PAN"
            : "Not uploaded"}
        </div>
      )}
    </div>
  );
}
