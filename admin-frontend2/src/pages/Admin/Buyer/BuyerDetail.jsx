import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  Heart,
  MousePointerClick,
  CalendarDays,
  MapPin,
  UserRound,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Clock3,
  Eye,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBuyerDashboard } from "../../../Services/buyerservice";

const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPrice = (amount) => {
  const price = Number(amount || 0);

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
};

const BuyerDetail = () => {
  const { buyerId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Saved Properties");

  useEffect(() => {
    loadBuyer();
  }, [buyerId]);

  const loadBuyer = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchBuyerDashboard(buyerId);

      if (response?.success) {
        setDetail(response.data);
      } else {
        setError(response?.message || "Unable to load buyer.");
      }
    } catch (err) {
      console.error("Buyer detail error:", err);
      setError(err?.response?.data?.message || "Unable to load buyer details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[520px] items-center justify-center text-sm text-[#91A2AC]">
        Loading buyer details...
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">{error || "Buyer not found."}</p>

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border border-[#DCE5E9] bg-white px-4 py-2 text-xs font-semibold text-slate-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    buyer,
    stats = {},
    leads = [],
    visits = [],
    savedProperties = [],
    recentInteractions = [],
  } = detail;

  const locationText =
    [buyer?.location?.city, buyer?.location?.state]
      .filter(Boolean)
      .join(", ") || "Not Provided";

  const cards = [
    {
      title: "Searches",
      value: stats.searches || 0,
      icon: Search,
    },
    {
      title: "Saved Properties",
      value: stats.savedProperties || 0,
      icon: Heart,
    },
    {
      title: "Enquiries / Leads",
      value: stats.leads || 0,
      icon: MousePointerClick,
    },
    {
      title: "Visits Scheduled",
      value: stats.visits || 0,
      icon: CalendarDays,
    },
  ];

  const tabs = ["Enquiries", "Saved Properties", "Visits"];

  return (
    <div className="min-h-screen bg-[#F4F7F8] p-0 font-sans text-[#173247]">
      <div className="rounded-2xl border border-[#DCE5E9] bg-white px-4 py-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-lg border border-[#DCE5E9] bg-[#EAF9F4]">
              {buyer.avatar ? (
                <img
                  src={buyer.avatar}
                  alt={buyer.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-bold text-[#15966F]">
                  {buyer.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-[#173247]">
                  {buyer.name}
                </h1>

                <span className="rounded-full border border-[#35C99A]/30 bg-[#EAF9F4] px-2 py-0.5 text-[9px] font-bold uppercase text-[#15966F]">
                  ● {buyer.status || "Active"}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-[#607681]">
                <span>ID: {buyer.buyerId}</span>

                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {locationText}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-[#DCE5E9] bg-white p-2.5 text-[#607681] transition hover:border-[#35C99A]/40 hover:bg-[#EAF9F4] hover:text-[#15966F]"
            title="Back"
          >
      
            <ArrowLeft size={16} />
            
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#607681]">
                  {title}
                </p>

                <p className="mt-1 text-xl font-bold text-[#173247]">{value}</p>
              </div>

              <div className="rounded-md bg-[#EAF9F4] p-1.5 text-[#15966F]">
                <Icon size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,2fr)_330px]">
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold">
              <UserRound size={15} className="text-[#15966F]" />
              Personal Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem label="Mobile Number" value={buyer.phone} />
              <InfoItem label="Email Address" value={buyer.email} />
              <InfoItem
                label="Primary Location"
                value={
                  buyer.location?.address
                    ? `${buyer.location.address}, ${locationText}`
                    : locationText
                }
              />
              <InfoItem
                label="Account Created"
                value={formatDate(buyer.createdAt)}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
            <div className="flex flex-wrap border-b border-[#E7EDF0] bg-[#F8FAFB]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-4 py-3 text-[10px] font-semibold transition ${
                    activeTab === tab
                      ? "border-[#35C99A] text-[#173247]"
                      : "border-transparent text-[#91A2AC]"
                  }`}
                >
                  {tab}

                  {tab === "Saved Properties" && (
                    <span className="ml-1 rounded-full bg-[#F1F5F6] px-1.5 py-0.5 text-[8px]">
                      {stats.savedProperties || 0}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-4 ">
              {/* {activeTab === "Overview" && <OverviewSection stats={stats} />} */}

              {activeTab === "Enquiries" && <EnquiriesSection leads={leads} navigate={navigate} />}

              {activeTab === "Saved Properties" && (
                <SavedPropertiesSection properties={savedProperties} navigate={navigate} />
              )}

              {activeTab === "Visits" && <VisitsSection visits={visits} navigate={navigate} />}

              <div className="my-4 border-t border-[#1F3C50]" />

              <RecentInteractions items={recentInteractions} navigate={navigate} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
            <div className="flex items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-xs font-bold">
                <ShieldCheck size={15} />
                Privacy & Consent
              </h3>

              <span className="rounded bg-[#EAF9F4] px-2 py-1 text-[8px] font-bold text-[#15966F]">
                COMPLIANT
              </span>
            </div>

            <ConsentRow
              title="Contact-Sharing Consent"
              enabled={buyer.privacy?.contactSharingConsent}
            />

            <ConsentRow
              title="Privacy Notice"
              enabled={buyer.privacy?.privacyNoticeAccepted}
            />
          </div>

          {/* <div className="rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
            <h3 className="flex items-center gap-2 text-xs font-bold">
              <Clock3 size={15} />
              Data Lifecycle
            </h3>

            <div className="mt-3 rounded-lg bg-[#F8FAFB] p-3">
              <div className="flex justify-between text-[9px]">
                <span>Active Retention</span>
                <span className="font-bold text-[#15966F]">Current</span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-full rounded-full bg-[#EAF9F4]0" />
              </div>
            </div>
          </div> */}

          <div className="rounded-2xl border border-[#DCE5E9] bg-white p-4 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
            <h3 className="mb-3 text-xs font-bold">Buyer Activity</h3>

            <SidebarStat label="Leads Generated" value={stats.leads} />

            <SidebarStat label="Visits Scheduled" value={stats.visits} />

            <SidebarStat
              label="Saved Properties"
              value={stats.savedProperties}
            />

            <SidebarStat label="Converted Leads" value={stats.convertedLeads} />

            <SidebarStat
              label="Completed Visits"
              value={stats.completedVisits}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-[8px] font-bold uppercase tracking-wide text-[#91A2AC]">
      {label}
    </p>

    <p className="mt-1 break-words text-[11px] font-medium text-[#173247]">
      {value || "—"}
    </p>
  </div>
);

const SavedPropertiesSection = ({ properties, navigate }) => (
  <div>
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[11px] font-bold">
        Recently Saved ({properties.length})
      </h3>
    </div>

    {properties.length === 0 ? (
      <EmptyState text="No saved properties" />
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 9).map((item) => {
          const property = item.propertySnapshot || {};

          return (
            <button
              type="button"
              key={item._id}
              onClick={() => {
                const propertyMongoId =
                  item?.propertyId ||
                  property?.propertyMongoId ||
                  null;

                if (propertyMongoId) {
                  navigate(`/property-management/${propertyMongoId}`);
                }
              }}
              className="w-full overflow-hidden rounded-lg border border-[#DCE5E9] bg-white text-left transition hover:-translate-y-[1px] hover:border-[#35C99A]/40 hover:shadow-sm"
            >
              <div className="h-24 bg-[#F1F5F6]">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.title || "Property"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#B8C5CB]">
                    <Building2 size={24} />
                  </div>
                )}
              </div>

              <div className="p-2.5">
                <p className="truncate text-[10px] font-bold">
                  {property.title || "Property"}
                </p>

                <p className="mt-0.5 truncate text-[8px] text-[#91A2AC]">
                  {[property.locality, property.city]
                    .filter(Boolean)
                    .join(", ") || "Location unavailable"}
                </p>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-[11px] font-bold">
                    {formatPrice(property.price)}
                  </p>

                  <span className="text-[8px] text-[#91A2AC]">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    )}
  </div>
);

const EnquiriesSection = ({ leads, navigate }) => (
  <div className="space-y-2">
    <h3 className="mb-3 text-[11px] font-bold">
      Enquiries / Leads ({leads.length})
    </h3>

    {leads.length === 0 ? (
      <EmptyState text="No enquiries generated" />
    ) : (
      leads.map((lead) => (
        <button
          type="button"
          key={lead._id}
          onClick={() => {
            if (lead?._id) {
              navigate(
                `/leads-dashboard?tab=promotions&leadId=${lead._id}`
              );
            }
          }}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#E7EDF0] p-3 text-left transition hover:border-[#35C99A]/40 hover:bg-[#EAF9F4]/30"
        >
          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold">
              {lead.property?.title || "Property Enquiry"}
            </p>

            <p className="mt-1 text-[8px] text-[#91A2AC]">
              {lead.leadId || "Lead"} • {formatDate(lead.createdAt)}
            </p>

            {lead.enquiryMessage && (
              <p className="mt-1 line-clamp-2 text-[8px] text-[#607681]">
                {lead.enquiryMessage}
              </p>
            )}
          </div>

          <span className="shrink-0 rounded-full bg-[#EAF9F4] px-2 py-1 text-[8px] font-bold text-[#15966F]">
            {lead.status?.replaceAll("_", " ") || "Lead"}
          </span>
        </button>
      ))
    )}
  </div>
);

const VisitsSection = ({ visits, navigate }) => (
  <div className="space-y-2">
    <h3 className="mb-3 text-[11px] font-bold">Visits ({visits.length})</h3>

    {visits.length === 0 ? (
      <EmptyState text="No visits scheduled" />
    ) : (
      visits.map((visit) => (
        <button
          type="button"
          key={visit._id}
          onClick={() => {
            if (visit?._id) {
              navigate(
                `/partnerdashboard?tab=visit&visitId=${visit._id}`
              );
            }
          }}
          className="w-full rounded-lg border border-[#E7EDF0] p-3 text-left transition hover:border-[#35C99A]/40 hover:bg-[#EAF9F4]/30"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold">
                {visit.propertySnapshot?.title || "Property Visit"}
              </p>

              <p className="mt-1 text-[8px] text-[#91A2AC]">
                With {visit.partnerSnapshot?.name || "Partner"}
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#EAF9F4] px-2 py-1 text-[8px] font-bold text-[#15966F]">
              {visit.status}
            </span>
          </div>

          <p className="mt-2 flex items-center gap-1 text-[8px] text-[#607681]">
            <CalendarDays size={10} />
            {formatDateTime(visit.requestedVisitAt)}
          </p>
        </button>
      ))
    )}
  </div>
);

const OverviewSection = ({ stats }) => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    <MiniStat label="Leads" value={stats.leads} />
    <MiniStat label="Saved" value={stats.savedProperties} />
    <MiniStat label="Visits" value={stats.visits} />
    <MiniStat label="Converted" value={stats.convertedLeads} />
  </div>
);

const RecentInteractions = ({ items, navigate }) => (
  <div>
    <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wide text-[#173247]">
      Recent Interactions
    </h3>

    {items.length === 0 ? (
      <EmptyState text="No recent interactions" />
    ) : (
      <div className="space-y-3">
        {items.slice(0, 8).map((item) => (
          <button
            type="button"
            key={`${item.type}-${item.id}`}
            onClick={() => {
              if (item.type === "lead" && item.id) {
                navigate(
                  `/leads-dashboard?tab=promotions&leadId=${item.id}`
                );
                return;
              }

              if (item.type === "visit" && item.id) {
                navigate(
                  `/partnerdashboard?tab=visit&visitId=${item.id}`
                );
                return;
              }

              if (item.type === "saved") {
                const propertyMongoId =
                  item?.propertyMongoId ||
                  item?.property?.propertyMongoId ||
                  null;

                if (propertyMongoId) {
                  navigate(
                    `/property-management/${propertyMongoId}`
                  );
                }
              }
            }}
            className="relative block w-full border-l border-[#35C99A] py-0.5 pl-4 text-left transition hover:border-[#35C99A]/70 hover:bg-[#EAF9F4]/10"
          >
            <span className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-[#EAF9F4]0" />

            <p className="text-[9px] font-semibold text-[#173247]">
              {item.title}
            </p>

            {item.description && (
              <p className="mt-0.5 text-[8px] text-[#607681]">
                {item.description}
              </p>
            )}

            <p className="mt-0.5 text-[8px] text-[#91A2AC]">
              {formatDateTime(item.createdAt)}
            </p>
          </button>
        ))}
      </div>
    )}
  </div>
);

const ConsentRow = ({ title, enabled }) => (
  <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#E7EDF0] bg-[#F8FAFB] p-2.5">
    <CheckCircle2
      size={13}
      className={enabled ? "text-[#35C99A]" : "text-[#B8C5CB]"}
    />

    <div>
      <p className="text-[9px] font-semibold">{title}</p>
      <p className="text-[7px] text-[#91A2AC]">
        {enabled ? "Granted" : "Not granted"}
      </p>
    </div>
  </div>
);

const SidebarStat = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-[#E7EDF0] py-2 last:border-0">
    <span className="text-[9px] text-[#607681]">{label}</span>
    <span className="text-[11px] font-bold">{value || 0}</span>
  </div>
);

const MiniStat = ({ label, value }) => (
  <div className="rounded-lg bg-[#F8FAFB] p-3 text-center">
    <p className="text-lg font-bold">{value || 0}</p>
    <p className="text-[8px] uppercase text-[#91A2AC]">{label}</p>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="rounded-lg border border-dashed border-[#DCE5E9] py-8 text-center text-[10px] text-[#91A2AC]">
    {text}
  </div>
);

export default BuyerDetail;