import { Globe2 } from "lucide-react";
import AdminModuleShell from "../../../components/AdminModuleShell";
import WebsiteCMS from "./Website/WebsiteCMS";

export default function CMSDashboard() {
  return (
    <AdminModuleShell
      title="Website CMS"
      description="Manage website sections, content, media and homepage presentation"
      icon={Globe2}
      currentView="Website Content"
    >
      <div className="rounded-[18px] border border-[#DCE5E9] bg-white p-3 shadow-[0_4px_18px_rgba(15,47,69,0.04)] md:p-4">
        <WebsiteCMS />
      </div>
    </AdminModuleShell>
  );
}
