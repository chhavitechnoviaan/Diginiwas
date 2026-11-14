import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Workflow, Target } from "lucide-react";
import AdminModuleShell from "../../../components/AdminModuleShell";
import Leads from "./Leads";
import LeadManagement from "./LeadManagemnet";

export default function LeadDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const requestedTab = searchParams.get("tab");
  const requestedLeadId = searchParams.get("leadId");
  const initial = requestedTab === "leads" ? "operations" : "management";
  const [active, setActive] = useState(initial);

  useEffect(() => {
    setActive(requestedTab === "leads" ? "operations" : "management");
  }, [requestedTab]);

  const closeLead = () =>
    navigate("/leads-dashboard?tab=promotions", { replace: true });

  const navigation = {
    management: {
      label: "Lead Management",
      icon: LayoutDashboard,
      component: (
        <LeadManagement
          embedded
          initialLeadId={requestedLeadId}
          onEmbeddedDetailClose={closeLead}
        />
      ),
    },
    operations: {
      label: "Lead Operations",
      icon: Workflow,
      component: <Leads />,
    },
  };

  const change = (key) => {
    setActive(key);
    navigate(
      key === "operations"
        ? "/leads-dashboard?tab=leads"
        : "/leads-dashboard?tab=promotions"
    );
  };

  const current = navigation[active] || navigation.management;

  return (
    <AdminModuleShell
      title="Lead Management"
      description="Manage lead intake, assignment, follow-ups and operational workflows"
      icon={Target}
      currentView={current.label}
      tabs={Object.entries(navigation).map(([id, item]) => ({
        id,
        label: item.label,
        icon: item.icon,
      }))}
      activeTab={active}
      onTabChange={change}
    >
      {current.component}
    </AdminModuleShell>
  );
}
