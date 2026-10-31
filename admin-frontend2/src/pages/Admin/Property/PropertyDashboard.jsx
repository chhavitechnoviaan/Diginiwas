import { useState } from "react";
import { ClipboardCheck, ShieldCheck, History, Building2 } from "lucide-react";
import AdminModuleShell from "../../../components/AdminModuleShell";
import PropertyApproval from "./PropertyApproval";
import PropertyVerificationCenter from "./PropertyVerification";
import PropertyAuditHistory from "./PropertyHistory";
import PropertyCommandCenter from "./PropertyCommandCenter";

export default function PropertyDashboard() {
  const [active, setActive] = useState("approval");

  const navigation = {
    approval: {
      label: "Approval Center",
      icon: ClipboardCheck,
      component: <PropertyApproval />,
    },
    verification: {
      label: "Verification Center",
      icon: ShieldCheck,
      component: <PropertyVerificationCenter />,
    },
    audit: {
      label: "Audit & History",
      icon: History,
      component: <PropertyAuditHistory />,
    },
    //  command: {
    //   label: "command & History",
    //   icon: History,
    //   component: <PropertyCommandCenter />,
    // },
  };

  const current = navigation[active];

  return (
    <AdminModuleShell
      title="Property Operations"
      description="Review approvals, verification and complete property audit history"
      icon={Building2}
      currentView={current.label}
      tabs={Object.entries(navigation).map(([id, item]) => ({
        id,
        label: item.label,
        icon: item.icon,
      }))}
      activeTab={active}
      onTabChange={setActive}
    >
      {current.component}
    </AdminModuleShell>
  );
}
