import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  WalletCards,
  BadgeIndianRupee,
  Rocket,
  Star,
  MapPinned,
} from "lucide-react";
import AdminModuleShell from "../../../components/AdminModuleShell";
import Credit from "./WalletCredits";
import Boost from "./BoostPropertyPartnerDashboard";
import Featured from "./FeaturedPromotionManagement";
import Locality from "./LocalityTopPromotionManagement";
import CreditPlan from "./CreditPricingManagement";
import AdminCredit from "./AdminCreditManagement";

export default function CreditDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const requestedTab = new URLSearchParams(location.search).get("tab") || "credit";
  const requestedRequestId = new URLSearchParams(location.search).get("requestId");
  const [active, setActive] = useState(requestedTab);

  useEffect(() => setActive(requestedTab), [requestedTab]);

  const navigation = {
    credit: {
      label: "Credit Management",
      icon: WalletCards,
      component: <Credit />,
    },
    pricing: {
      label: "Credit Pricing",
      icon: BadgeIndianRupee,
      component: <CreditPlan />,
    },
    admin: {
      label: "Admin Credit Management",
      icon: WalletCards,
      component: <AdminCredit />,
    },
    boost: {
      label: "Boost Management",
      icon: Rocket,
      component: <Boost initialRequestId={requestedRequestId} />,
    },
    featured: {
      label: "Featured Management",
      icon: Star,
      component: <Featured initialRequestId={requestedRequestId} />,
    },
    locality: {
      label: "Locality Management",
      icon: MapPinned,
      component: <Locality initialRequestId={requestedRequestId} />,
    },
  };

  const current = navigation[active];

  return (
    <AdminModuleShell
      title="Credit Management"
      description="Manage credit pricing, wallets, refunds and property promotion services"
      icon={WalletCards}
      currentView={current.label}
      tabs={Object.entries(navigation).map(([id, item]) => ({
        id,
        label: item.label,
        icon: item.icon,
      }))}
      activeTab={active}
      onTabChange={(tab) => { setActive(tab); navigate(`/credits?tab=${tab}`); }}
    >
      {current.component}
    </AdminModuleShell>
  );
}
