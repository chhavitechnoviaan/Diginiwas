
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Building2,
  MapPin,
  Eye,
  User,
  UserCheck,
  ShieldCheck,
  History,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  getAllPropertiesApi,
  getPropertyByIdApi,
  updatePropertyStatusApi,
} from "../../../Services/propertyService";

const ALLOWED_STATUSES = [
  "Submitted",
  "Assigned_To_Partner",
  "Reviewing",
  "Verified",
  "Live",
  "Rejected",
  "Sold",
  "Rented",
];

const CREATOR_FILTERS = ["All", "Admin", "Seller", "Partner"];

const STATUS_STYLES = {
  Submitted: "bg-amber-50 text-amber-700 border-amber-200",
  Assigned_To_Partner: "bg-blue-50 text-blue-700 border-blue-200",
  Reviewing: "bg-orange-50 text-orange-700 border-orange-200",
  Verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Live: "bg-[#EAF9F4] text-[#15966F] border-[#35C99A]/30",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Sold: "bg-purple-50 text-purple-700 border-purple-200",
  Rented: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const normalizeRole = (role = "") => {
  const value = String(role).trim().toLowerCase();
  if (value === "partner") return "Partner";
  if (value === "seller") return "Seller";
  if (value === "admin") return "Admin";
  return value ? value[0].toUpperCase() + value.slice(1) : "Unknown";
};

const getCreatorMongoId = (property) =>
  property?.addedBy?.userId?._id ||
  property?.addedBy?.userId ||
  null;

const getSellerRouteId = (property) =>
  property?.addedBy?.sellerMongoId ||
  property?.addedBy?.userId?._id ||
  property?.addedBy?.userId ||
  null;

const getPartnerRouteId = (property) =>
  property?.addedBy?.partnerMongoId ||
  property?.addedBy?.userId?._id ||
  property?.addedBy?.userId ||
  property?.assignedPartner?.partnerId?._id ||
  null;

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${
      STATUS_STYLES[status] ||
      "border-[#DCE5E9] bg-[#F8FAFB] text-[#536779]"
    }`}
  >
    {String(status || "-").replaceAll("_", " ")}
  </span>
);

export default function SellerProperty() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [creatorFilter, setCreatorFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const response = await getAllPropertiesApi();
      const data = Array.isArray(response?.data) ? response.data : [];

      const filtered = data
        .filter((property) => ALLOWED_STATUSES.includes(property?.status))
        .sort(
          (a, b) =>
            new Date(b?.createdAt || 0).getTime() -
            new Date(a?.createdAt || 0).getTime()
        );

      setProperties(filtered);

      if (filtered.length) {
        await openProperty(filtered[0]);
      } else {
        setSelectedProperty(null);
      }
    } catch (error) {
      console.error("ALL PROPERTY FETCH ERROR:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const openProperty = async (property) => {
    if (!property?._id) return;

    try {
      setDetailLoading(true);

      const response = await getPropertyByIdApi(property._id);
      setSelectedProperty(response?.data || property);
    } catch (error) {
      console.error("PROPERTY DETAIL ERROR:", error);
      setSelectedProperty(property);
    } finally {
      setDetailLoading(false);
    }
  };

  const filteredProperties = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return properties.filter((property) => {
      const creatorRole = normalizeRole(property?.addedBy?.role);

      const matchesSearch =
        !keyword ||
        property?.propertyId?.toLowerCase().includes(keyword) ||
        property?.title?.toLowerCase().includes(keyword) ||
        property?.city?.toLowerCase().includes(keyword) ||
        property?.locality?.toLowerCase().includes(keyword) ||
        property?.addedBy?.name?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" || property?.status === statusFilter;

      const matchesCreator =
        creatorFilter === "All" || creatorRole === creatorFilter;

      return matchesSearch && matchesStatus && matchesCreator;
    });
  }, [properties, search, statusFilter, creatorFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, creatorFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCreatorView = (property) => {
    const role = normalizeRole(property?.addedBy?.role);

    if (role === "Partner") {
      const partnerId = getPartnerRouteId(property);

      if (!partnerId) {
        Swal.fire("Partner unavailable", "Partner Mongo ID is not available.", "info");
        return;
      }

      navigate(
        `/partnerdashboard?tab=dashboard&partnerId=${partnerId}`
      );
      return;
    }

    if (role === "Seller") {
      const sellerId = getSellerRouteId(property);

      if (!sellerId) {
        Swal.fire("Seller unavailable", "Seller Mongo ID is not available.", "info");
        return;
      }

      navigate(
        `/seller-dashboard?tab=dashboard&sellerId=${sellerId}`
      );
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Added by Admin",
      text: "This property was added by an admin account.",
      confirmButtonColor: "#25B98B",
    });
  };

  const updateStatus = async (status) => {
    if (!selectedProperty?._id || !status) return;

    try {
      setStatusUpdating(true);

      const response = await updatePropertyStatusApi(
        selectedProperty._id,
        {
          status,
          remarks: `Status changed to ${status} from Property Control Tower.`,
        }
      );

      if (!response?.success) {
        throw new Error(response?.message || "Unable to update status");
      }

      await Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Property status changed to ${status.replaceAll("_", " ")}.`,
        confirmButtonColor: "#25B98B",
      });

      await fetchProperties();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to update status",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Status update failed.",
      });
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F8] font-sans text-[#173247]">
      <section className="mb-4 rounded-2xl border border-[#DCE5E9] bg-white px-5 py-5 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#25B98B]">
          Properties / Control Tower
        </p>

        <h1 className="mt-1 text-[21px] font-bold text-[#173247] sm:text-[23px]">
          Property Lifecycle & Management
        </h1>

        <p className="mt-1 text-[10px] font-medium text-[#8998AF] sm:text-[11px]">
          Manage active workflow properties, update status and open the account that created each property.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[390px_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-2xl border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="border-b border-[#E7EDF0] p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-bold text-[#173247]">
                  All Properties
                </h2>

                <p className="mt-0.5 text-[10px] text-[#91A2AC]">
                  {filteredProperties.length} properties
                </p>
              </div>

              <Building2 size={19} className="text-[#25B98B]" />
            </div>

            <div className="relative mt-4">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A2AC]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search property, city, creator..."
                className="h-[38px] w-full rounded-lg border border-[#DCE5E9] bg-white pl-9 pr-3 text-[10px] font-medium text-[#42595F] outline-none placeholder:text-[#A1ADAF] focus:border-[#35C99A] focus:ring-2 focus:ring-[#35C99A]/10"
              />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[38px] rounded-lg border border-[#DCE5E9] bg-white px-3 text-[10px] font-semibold text-[#607681] outline-none focus:border-[#35C99A]"
              >
                <option value="All">All Statuses</option>

                {ALLOWED_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.replaceAll("_", " ")}
                  </option>
                ))}
              </select>

              <select
                value={creatorFilter}
                onChange={(e) => setCreatorFilter(e.target.value)}
                className="h-[38px] rounded-lg border border-[#DCE5E9] bg-white px-3 text-[10px] font-semibold text-[#607681] outline-none focus:border-[#35C99A]"
              >
                {CREATOR_FILTERS.map((creator) => (
                  <option key={creator} value={creator}>
                    {creator === "All" ? "All Creators" : creator}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="flex min-h-[360px] items-center justify-center">
                <Loader2 className="animate-spin text-[#25B98B]" />
              </div>
            ) : currentProperties.length === 0 ? (
              <div className="p-10 text-center text-[10px] text-[#91A2AC]">
                No properties found.
              </div>
            ) : (
              currentProperties.map((property) => {
                const selected =
                  selectedProperty?._id === property._id;

                return (
                  <button
                    type="button"
                    key={property._id}
                    onClick={() => openProperty(property)}
                    className={`w-full border-b border-[#E7EDF0] p-4 text-left transition ${
                      selected
                        ? "bg-[#EAF9F4]/70"
                        : "hover:bg-[#F8FAFB]"
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={
                          property?.images?.[0]?.url ||
                          "https://placehold.co/100x100?text=Property"
                        }
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-extrabold text-[#173247]">
                              {property?.title || "Untitled Property"}
                            </p>

                            <p className="mt-0.5 text-[10px] font-semibold text-[#15966F]">
                              {property?.propertyId || "-"}
                            </p>
                          </div>

                          <StatusBadge status={property?.status} />
                        </div>

                        <p className="mt-2 flex items-center gap-1 truncate text-[10px] text-[#91A2AC]">
                          <MapPin size={10} />
                          {[property?.locality, property?.city]
                            .filter(Boolean)
                            .join(", ") || "Location not added"}
                        </p>

                        <p className="mt-2 text-[10px] text-[#91A2AC]">
                          By{" "}
                          <strong className="text-[#536779]">
                            {property?.addedBy?.name || "-"}
                          </strong>
                          {" • "}
                          {normalizeRole(property?.addedBy?.role)}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {!loading && filteredProperties.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-[#E7EDF0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] text-[#91A2AC]">
                {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredProperties.length)}
                {" "}of {filteredProperties.length}
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE5E9] disabled:opacity-40"
                >
                  <ChevronLeft size={12} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-7 min-w-7 rounded px-2 text-[10px] font-semibold ${
                        page === currentPage
                          ? "bg-[#1F3C50] text-white"
                          : "border border-[#DCE5E9] text-[#7D8C9C]"
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
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE5E9] disabled:opacity-40"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          )}
        </section>

        <section>
          {!selectedProperty ? (
            <div className="flex min-h-[560px] items-center justify-center rounded-2xl border border-[#DCE5E9] bg-white">
              <p className="text-[10px] text-[#91A2AC]">Select a property.</p>
            </div>
          ) : (
            <>
              <section className="rounded-2xl border border-[#DCE5E9] bg-white p-5 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <img
                      src={
                        selectedProperty?.images?.[0]?.url ||
                        "https://placehold.co/120x120?text=Property"
                      }
                      alt=""
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-extrabold text-[#173247]">
                          {selectedProperty?.title}
                        </h2>

                        <StatusBadge status={selectedProperty?.status} />
                      </div>

                      <p className="mt-1 text-[10px] font-semibold text-[#15966F]">
                        {selectedProperty?.propertyId}
                      </p>

                      <p className="mt-2 text-[10px] text-[#91A2AC]">
                        {[selectedProperty?.locality, selectedProperty?.city]
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/property-management/${selectedProperty._id}`
                      )
                    }
                    className="flex h-[38px] items-center gap-2 rounded-lg bg-[#1F3C50] px-4 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#173247]"
                  >
                    <Eye size={14} />
                    View Property
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#E7EDF0] pt-4 sm:grid-cols-4">
                  <Info
                    label="Added By"
                    value={selectedProperty?.addedBy?.name || "-"}
                    secondary={normalizeRole(selectedProperty?.addedBy?.role)}
                  />

                  <Info
                    label="Created"
                    value={
                      selectedProperty?.createdAt
                        ? new Date(selectedProperty.createdAt).toLocaleDateString("en-IN")
                        : "-"
                    }
                  />

                  <Info
                    label="Status"
                    value={String(selectedProperty?.status || "-").replaceAll("_", " ")}
                  />

                  <Info
                    label="Partner"
                    value={
                      selectedProperty?.assignedPartner?.name ||
                      selectedProperty?.assignedPartner?.partnerId?.name ||
                      "Not Assigned"
                    }
                  />
                </div>
              </section>

              <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-[#DCE5E9] bg-white p-5 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-[#15966F]" />
                    <h3 className="text-[13px] font-bold text-[#173247]">
                      Property Creator
                    </h3>
                  </div>

                  <p className="mt-4 text-sm font-bold text-[#425A70]">
                    {selectedProperty?.addedBy?.name || "-"}
                  </p>

                  <p className="mt-1 text-[10px] text-[#91A2AC]">
                    {normalizeRole(selectedProperty?.addedBy?.role)}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCreatorView(selectedProperty)}
                    className="mt-4 flex h-[38px] w-full items-center justify-center gap-2 rounded-lg border border-[#35C99A]/30 bg-[#EAF9F4] text-[10px] font-semibold text-[#15966F] transition hover:bg-[#DDF6EE]"
                  >
                    <UserCheck size={13} />
                    View {normalizeRole(selectedProperty?.addedBy?.role)}
                  </button>
                </div>

                <div className="rounded-2xl border border-[#DCE5E9] bg-white p-5 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={15} className="text-[#15966F]" />
                    <h3 className="text-[13px] font-bold text-[#173247]">
                      Update Property Status
                    </h3>
                  </div>

                  <select
                    disabled={statusUpdating}
                    value={selectedProperty?.status || ""}
                    onChange={(e) => updateStatus(e.target.value)}
                    className="mt-4 h-10 w-full rounded-xl border border-[#DCE5E9] bg-white px-3 text-[10px] font-semibold outline-none disabled:opacity-50"
                  >
                    {ALLOWED_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="mt-4 rounded-2xl border border-[#DCE5E9] bg-white p-5 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
                <div className="flex items-center gap-2">
                  <History size={15} className="text-[#15966F]" />
                  <h3 className="text-[13px] font-bold text-[#173247]">
                    Status History
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  {(selectedProperty?.statusHistory || [])
                    .slice()
                    .reverse()
                    .map((item, index) => (
                      <div
                        key={item?._id || index}
                        className="rounded-xl border border-[#E7EDF0] p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <StatusBadge status={item?.status} />

                          <span className="text-[10px] text-[#91A2AC]">
                            {item?.updatedAt
                              ? new Date(item.updatedAt).toLocaleString("en-IN")
                              : "-"}
                          </span>
                        </div>

                        <p className="mt-2 text-[10px] text-[#536779]">
                          {item?.updatedBy?.name || "System"}
                          {" • "}
                          {item?.updatedBy?.role || "System"}
                        </p>

                        {item?.remarks && (
                          <p className="mt-1 text-[10px] text-[#91A2AC]">
                            {item.remarks}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function Info({ label, value, secondary }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#91A2AC]">
        {label}
      </p>

      <p className="mt-1 text-[10px] font-bold text-[#425A70]">
        {value || "-"}
      </p>

      {secondary && (
        <p className="mt-0.5 text-[10px] text-[#91A2AC]">
          {secondary}
        </p>
      )}
    </div>
  );
}