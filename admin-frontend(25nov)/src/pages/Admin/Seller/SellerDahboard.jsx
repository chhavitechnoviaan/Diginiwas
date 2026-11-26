import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Store,
  FileCheck2,
  ChevronRight,
  UserRound,
} from "lucide-react";

import Seller from "./SellersManagement";
import SellerApplications from "./SellerApplications";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const params =
    new URLSearchParams(
      location.search
    );

  const requestedTab =
    params.get("tab") ||
    "management";

  const requestedSellerId =
    params.get("sellerId");

  const [activeTab, setActiveTab] =
    useState(
      requestedTab ===
        "applications"
        ? "applications"
        : "management"
    );

  useEffect(() => {
    setActiveTab(
      requestedTab ===
        "applications"
        ? "applications"
        : "management"
    );
  }, [requestedTab]);

  const navigationData = {
    management: {
      label: "Seller Management",
      icon: LayoutDashboard,
      component: (
        <Seller
          embedded={true}
          initialSellerId={
            requestedSellerId
          }
          onEmbeddedDetailClose={() => {
            navigate(
              "/seller-dashboard?tab=management",
              { replace: true }
            );
          }}
        />
      ),
    },

    applications: {
      label: "Seller Applications",
      icon: FileCheck2,
      component: (
        <SellerApplications />
      ),
    },
  };

  const activeItem =
    navigationData[activeTab] ||
    navigationData.management;

  const isSellerDetail =
    Boolean(requestedSellerId);

  const handleTab = (key) => {
    setActiveTab(key);

    navigate(
      `/seller-dashboard?tab=${key}`,
      { replace: true }
    );
  };

  const goToSellerManagement =
    () => {
      navigate(
        "/seller-dashboard?tab=management",
        { replace: true }
      );
    };

  return (
    <div className="min-h-screen bg-[#F4F7F8] text-[#173247]">
      <div className="space-y-3 p-2 md:p-3">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[20px] bg-[#1F3C50] px-5 py-5 shadow-sm md:px-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#35C99A]/10" />
          <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#35C99A] text-white shadow-sm">
                <Store
                  size={21}
                  strokeWidth={2.2}
                />
              </div>

              <div>
                {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9FB3C0]">
                  DigiNiwas Admin
                </p> */}

                <h1 className="mt-0.5 text-xl font-bold tracking-tight text-white md:text-2xl">
                  Seller Management
                </h1>

                <p className="mt-1 text-xs text-[#C3D0D8]">
                  Review applications, approve sellers and manage approved seller accounts
                </p>
              </div>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#35C99A]" />

              <div>
                <p className="text-[9px] font-medium uppercase tracking-wide text-[#AFC0CA]">
                  Current View
                </p>

                <p className="text-xs font-semibold text-white">
                  {isSellerDetail
                    ? "Seller Details"
                    : activeItem.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="rounded-[18px] border border-[#DCE5E9] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(
                navigationData
              ).map(
                ([
                  key,
                  item,
                ]) => {
                  const Icon =
                    item.icon;

                  const isActive =
                    activeTab ===
                    key &&
                    !isSellerDetail;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        handleTab(
                          key
                        )
                      }
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#1F3C50] text-white shadow-sm"
                          : "bg-[#F2F6F7] text-[#667B88] hover:bg-[#EAF9F4] hover:text-[#15966F]"
                      }`}
                    >
                      <Icon
                        size={15}
                      />
                      {item.label}
                    </button>
                  );
                }
              )}
            </div>

            {isSellerDetail && (
              <div className="flex items-center gap-1.5 rounded-lg bg-[#F4F7F8] px-3 py-2">
                <button
                  type="button"
                  onClick={
                    goToSellerManagement
                  }
                  className="text-[11px] font-semibold text-[#15966F]"
                >
                  Sellers
                </button>

                <ChevronRight
                  size={12}
                  className="text-[#A7B5BD]"
                />

                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#526A78]">
                  <UserRound
                    size={12}
                  />
                  Details
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="min-w-0">
          {activeItem.component}
        </div>
      </div>
    </div>
  );
}
