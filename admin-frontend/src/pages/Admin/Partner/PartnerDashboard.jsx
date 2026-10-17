// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   UsersRound,
//   UserRoundCheck,
//   CalendarDays,
//   ClipboardCheck,
//   Network,
// } from "lucide-react";
// import AdminModuleShell from "../../../components/AdminModuleShell";
// import PartnerManagement from "./PartnerManagement";
// import PartnerApplications from "./PartnerApplication";
// import TeamPartnerManagement from "./TeamPartnerManagement";
// import PartnerAssignmentQueue from "./PartnerAssigned";
// import VisitManagement from "./VisitManagement";

// export default function PartnerDashboard() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const requestedTab = params.get("tab") || "management";
//   const requestedVisitId = params.get("visitId");
//   const [active, setActive] = useState(requestedTab);

//   useEffect(() => setActive(requestedTab), [requestedTab]);

//   const navigation = {
//     management: {
//       label: "Partner Management",
//       description: "Manage verified Single, Team and Sub Partners",
//       icon: UsersRound,
//       component: <PartnerManagement />,
//     },
//     applications: {
//       label: "Partner Applications",
//       description: "Review onboarding, KYC, approvals and final verification",
//       icon: ClipboardCheck,
//       component: <PartnerApplications />,
//     },
//     teams: {
//       label: "Team Partners",
//       description: "Manage agency teams, sub partners and credit allocations",
//       icon: Network,
//       component: <TeamPartnerManagement />,
//     },
//     assignment: {
//       label: "Partner Assignment",
//       description: "Assign properties to verified Single Partners or Team Owners",
//       icon: UserRoundCheck,
//       component: <PartnerAssignmentQueue />,
//     },
//     visit: {
//       label: "Visit Management",
//       description: "Manage verified partner visit requests and approvals",
//       icon: CalendarDays,
//       component: (
//         <VisitManagement
//           embedded
//           initialVisitId={requestedVisitId}
//           onEmbeddedDetailClose={() =>
//             navigate("/partnerdashboard?tab=visit", { replace: true })
//           }
//         />
//       ),
//     },
//   };

//   const current = navigation[active] || navigation.management;
//   const tabs = Object.entries(navigation).map(([id, item]) => ({
//     id,
//     label: item.label,
//     icon: item.icon,
//   }));

//   const change = (key) => {
//     setActive(key);
//     navigate(`/partnerdashboard?tab=${key}`, { replace: true });
//   };

//   return (
//     <AdminModuleShell
//       title="Partner Management"
//       description="Manage partners, applications, agency teams, assignments and visits"
//       icon={UsersRound}
//       currentView={current.label}
//       tabs={tabs}
//       activeTab={active}
//       onTabChange={change}
//     >
//       {current.component}
//     </AdminModuleShell>
//   );
// }


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UsersRound,
  UserRoundCheck,
  CalendarDays,
  ClipboardCheck,
  Network,
} from "lucide-react";

import AdminModuleShell from "../../../components/AdminModuleShell";
import PartnerManagement from "./PartnerManagement";
import PartnerApplications from "./PartnerApplication";
import TeamPartnerManagement from "./TeamPartnerManagement";
import PartnerAssignmentQueue from "./PartnerAssigned";
import VisitManagement from "./VisitManagement";

export default function PartnerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const requestedTab =
    params.get("tab") || "management";

  const requestedVisitId =
    params.get("visitId");

  const requestedPartnerId =
    params.get("partnerId");
  const requestedApplicationId = params.get("applicationId");

  const [active, setActive] =
    useState(requestedTab);

  useEffect(() => {
    setActive(requestedTab);
  }, [requestedTab]);

  const navigation = {
    management: {
      label: "Partner Management",
      description:
        "Manage verified Single, Team and Sub Partners",
      icon: UsersRound,
      component: (
        <PartnerManagement
          initialPartnerId={requestedPartnerId}
          onPartnerDetailClose={() =>
            navigate(
              "/partnerdashboard?tab=management",
              { replace: true }
            )
          }
        />
      ),
    },

    applications: {
      label: "Partner Applications",
      description:
        "Review onboarding, KYC, approvals and final verification",
      icon: ClipboardCheck,
      component: <PartnerApplications initialApplicationId={requestedApplicationId} />,
    },

    teams: {
      label: "Team Partners",
      description:
        "Manage agency teams, sub partners and credit allocations",
      icon: Network,
      component: (
        <TeamPartnerManagement
          initialPartnerId={requestedPartnerId}
          onPartnerDetailClose={() =>
            navigate(
              "/partnerdashboard?tab=teams",
              { replace: true }
            )
          }
        />
      ),
    },

    assignment: {
      label: "Partner Assignment",
      description:
        "Assign properties to verified Single Partners or Team Owners",
      icon: UserRoundCheck,
      component: <PartnerAssignmentQueue />,
    },

    visit: {
      label: "Visit Management",
      description:
        "Manage verified partner visit requests and approvals",
      icon: CalendarDays,
      component: (
        <VisitManagement
          embedded
          initialVisitId={requestedVisitId}
          onEmbeddedDetailClose={() =>
            navigate(
              "/partnerdashboard?tab=visit",
              { replace: true }
            )
          }
        />
      ),
    },
  };

  const current =
    navigation[active] ||
    navigation.management;

  const tabs =
    Object.entries(navigation).map(
      ([id, item]) => ({
        id,
        label: item.label,
        icon: item.icon,
      })
    );

  const change = (key) => {
    setActive(key);

    navigate(
      `/partnerdashboard?tab=${key}`,
      { replace: true }
    );
  };

  return (
    <AdminModuleShell
      title="Partner Management"
      description="Manage partners, applications, agency teams, assignments and visits"
      icon={UsersRound}
      currentView={current.label}
      tabs={tabs}
      activeTab={active}
      onTabChange={change}
    >
      {current.component}
    </AdminModuleShell>
  );
}

