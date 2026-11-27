import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WalletCards, BadgeIndianRupee, Rocket, Building2 } from "lucide-react";
import AdminModuleShell from "../../../components/AdminModuleShell";
import Credit from "./WalletCredits";
import CreditPlan from "./CreditPricingManagement";
import AdminCredit from "./AdminCreditManagement";
import PromotionRequestManagement from "./PromotionRequestManagement";

export default function CreditDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const requestedTab = new URLSearchParams(location.search).get("tab") || "credit";
  const requestedRequestId = new URLSearchParams(location.search).get("requestId");
  const tabAliases = { boost: "partnerBoost", featured: "promotionRequests", locality: "promotionRequests" };
  const normalizedTab = tabAliases[requestedTab] || requestedTab;
  const [active, setActive] = useState(normalizedTab);
  useEffect(() => setActive(normalizedTab), [normalizedTab]);
  const navigation = {
    credit: { label: "Credit Management", icon: WalletCards, component: <Credit /> },
    pricing: { label: "Credit Pricing", icon: BadgeIndianRupee, component: <CreditPlan /> },
    admin: { label: "Admin Credit Management", icon: WalletCards, component: <AdminCredit /> },
    promotionRequests: { label: "Promotion Plan Requests", icon: Building2, component: <PromotionRequestManagement targetType="PROPERTY" initialRequestId={requestedRequestId} /> },
    partnerBoost: { label: "Boost Partner Requests", icon: Rocket, component: <PromotionRequestManagement targetType="PARTNER" initialRequestId={requestedRequestId} /> },
  };
  const current = navigation[active] || navigation.credit;
  return <AdminModuleShell title="Credit Management" description="Manage credits, promotion plan approvals and partner boost requests" icon={WalletCards} currentView={current.label} tabs={Object.entries(navigation).map(([id, item]) => ({ id, label: item.label, icon: item.icon }))} activeTab={navigation[active] ? active : "credit"} onTabChange={tab => { setActive(tab); navigate(`/credits?tab=${tab}`); }}>{current.component}</AdminModuleShell>;
}
