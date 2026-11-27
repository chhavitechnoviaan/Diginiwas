import React, { useState } from "react";
import { X, CheckCircle2, XCircle, Building2, Users, Coins, Clock3 } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
};

const label = (type) => ({
  PARTNER_BOOST: "Partner Boost",
  PROPERTY_BOOST: "Property Boost",
  PARTNER_FEATURED: "Partner Featured",
  FEATURED_7_DAYS: "Featured 7 Days",
  PARTNER_LOCALITY_TOP: "Partner Locality Top",
  LOCALITY_TOP_30_DAYS: "Locality Top 30 Days",
}[type] || type || "Promotion");

export default function PromotionReviewModal({
  request,
  onClose,
  onApprove,
  onReject,
  busy = false,
}) {
  const [remarks, setRemarks] = useState("");
  if (!request) return null;

  const partner = request.partnerMongoId;
  const property = request.propertyMongoId;
  const isPending = (request.effectiveStatus || request.status) === "Pending";

  const approve = () => onApprove(request, remarks || "Approved from Promotion Management");
  const reject = () => onReject(request, remarks || "Rejected from Promotion Management");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4" onMouseDown={onClose}>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#E8EDF3] px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#17867A]">Promotion Review</p>
            <h2 className="mt-1 text-lg font-extrabold text-[#1F3C50]">{label(request.promotionType)}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-[#68798C] hover:bg-[#F3F6F8]"><X size={18} /></button>
        </div>

        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
          <div className="rounded-xl border border-[#E2E9EF] bg-[#FAFCFD] p-3">
            <div className="flex items-center gap-2 text-[#17867A]"><Users size={15} /><span className="text-[10px] font-bold uppercase">Partner</span></div>
            <p className="mt-2 text-[12px] font-bold text-[#2E4358]">{request.partnerName || partner?.name || "—"}</p>
            <p className="mt-1 text-[9px] text-[#168173]">{request.partnerCode || partner?.partnerId || "—"}</p>
            <p className="mt-1 text-[9px] text-[#7D8B9B]">{partner?.email || "—"}</p>
          </div>

          <div className="rounded-xl border border-[#E2E9EF] bg-[#FAFCFD] p-3">
            <div className="flex items-center gap-2 text-[#17867A]"><Building2 size={15} /><span className="text-[10px] font-bold uppercase">Property</span></div>
            <p className="mt-2 text-[12px] font-bold text-[#2E4358]">{request.propertyTitle || property?.title || (request.targetType === "PARTNER" ? "Partner profile promotion" : "—")}</p>
            <p className="mt-1 text-[9px] text-[#168173]">{request.propertyCode || property?.propertyId || "—"}</p>
            <p className="mt-1 text-[9px] text-[#7D8B9B]">{[request.locality, request.city].filter(Boolean).join(", ") || partner?.location?.city || "—"}</p>
          </div>

          <div className="rounded-xl border border-[#E2E9EF] p-3">
            <div className="flex items-center gap-2 text-[#7A52A1]"><Coins size={15} /><span className="text-[10px] font-bold uppercase">Credits Reserved</span></div>
            <p className="mt-2 text-xl font-black text-[#243C54]">{Number(request.creditsCharged || 0).toLocaleString("en-IN")}</p>
            <p className="mt-1 text-[9px] text-[#7D8B9B]">These credits are refunded automatically if rejected.</p>
          </div>

          <div className="rounded-xl border border-[#E2E9EF] p-3">
            <div className="flex items-center gap-2 text-[#C87917]"><Clock3 size={15} /><span className="text-[10px] font-bold uppercase">Requested</span></div>
            <p className="mt-2 text-[10px] font-bold text-[#4D6177]">{formatDate(request.requestedAt || request.createdAt)}</p>
            <p className="mt-1 text-[9px] text-[#7D8B9B]">Status: {request.effectiveStatus || request.status}</p>
          </div>
        </div>

        {isPending && (
          <div className="border-t border-[#E8EDF3] px-5 py-4">
            <label className="text-[10px] font-bold text-[#52657D]">Admin remarks</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} placeholder="Add approval/rejection remarks..." className="mt-2 w-full rounded-xl border border-[#DDE5EE] bg-white p-3 text-[11px] outline-none focus:border-[#62A99F]" />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E8EDF3] bg-[#FBFCFD] px-5 py-4">
          <button onClick={onClose} className="h-9 rounded-lg border border-[#D8E3E8] bg-white px-4 text-[10px] font-bold text-[#52657D]">Close</button>
          {isPending && (
            <div className="flex gap-2">
              <button disabled={busy} onClick={reject} className="flex h-9 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 text-[10px] font-bold text-red-600 disabled:opacity-50"><XCircle size={13} /> Reject & Refund</button>
              <button disabled={busy} onClick={approve} className="flex h-9 items-center gap-1.5 rounded-lg bg-[#0B796D] px-4 text-[10px] font-bold text-white disabled:opacity-50"><CheckCircle2 size={13} /> Approve</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
