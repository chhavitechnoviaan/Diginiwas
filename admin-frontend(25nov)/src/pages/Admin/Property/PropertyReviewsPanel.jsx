import { useCallback, useEffect, useState } from "react";
import { MessageSquare, RefreshCw, Save, Star, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../../../Services/axios";

/** Admin-only reviews: includes hidden reviews and uses existing CMS admin endpoints. */
export default function PropertyReviewsPanel({ propertyId, isOpen = true }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const loadReviews = useCallback(async () => {
    if (!propertyId || !isOpen) return;
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(`/property-reviews/admin/property/${encodeURIComponent(String(propertyId))}`);
      setReviews(Array.isArray(response.data?.reviews) ? response.data.reviews : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load property reviews.");
    } finally {
      setLoading(false);
    }
  }, [propertyId, isOpen]);

  useEffect(() => { loadReviews(); }, [loadReviews]);
  const changeReview = (id, field, value) => {
    setReviews((current) => current.map((r) => String(r._id) === String(id) ? { ...r, [field]: value } : r));
  };
  const saveReview = async (review) => {
    setBusy(String(review._id));
    try {
      await axiosInstance.patch(`/property-reviews/admin/${review._id}`, {
        rating: Number(review.rating), remark: review.remark, isVisible: review.isVisible !== false,
      });
      await loadReviews();
      await Swal.fire({ icon: "success", title: "Review Updated", timer: 1400, showConfirmButton: false });
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Update Failed", text: err.response?.data?.message || "Could not update review." });
    } finally { setBusy(""); }
  };
  const deleteReview = async (review) => {
    const confirm = await Swal.fire({ icon: "warning", title: "Delete this property review?", text: "This cannot be undone.", showCancelButton: true, confirmButtonText: "Delete Review", confirmButtonColor: "#DC2626" });
    if (!confirm.isConfirmed) return;
    setBusy(String(review._id));
    try {
      await axiosInstance.delete(`/property-reviews/admin/${review._id}`);
      setReviews((current) => current.filter((r) => String(r._id) !== String(review._id)));
      await Swal.fire({ icon: "success", title: "Review Deleted", timer: 1400, showConfirmButton: false });
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Delete Failed", text: err.response?.data?.message || "Could not delete review." });
    } finally { setBusy(""); }
  };

  return (
    <section className="rounded-3xl border border-[#DDE7EA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-[#0C9376]" />
          <div><h3 className="text-lg font-bold text-[#173247]">Property Reviews</h3>
          <p className="text-xs text-[#8296A2]">View, edit, hide or delete reviews for this property</p></div>
        </div>
        <button type="button" onClick={loadReviews} className="flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold text-[#1F4256]"><RefreshCw size={14} /> Refresh</button>
      </div>
      {loading && <p className="text-sm text-[#64748B]">Loading reviews…</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {!loading && !error && reviews.length === 0 && <div className="rounded-xl border border-dashed p-6 text-center text-sm text-[#8296A2]">No reviews have been submitted for this property.</div>}
      {!loading && reviews.map((review) => (
        <div key={review._id} className="mb-3 rounded-xl border border-[#DCE8E9] bg-[#FAFCFC] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div><p className="text-sm font-bold text-[#173247]">{review.reviewerName || "Reviewer"}</p>
            <p className="text-xs capitalize text-[#8296A2]">{review.reviewerRole || "User"} · {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-IN") : ""}</p></div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700"><Star size={13} /> {review.rating}/5</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-[130px_1fr]">
            <label className="text-xs font-semibold text-[#526A78]">Rating
              <select value={review.rating} onChange={(event) => changeReview(review._id,"rating",event.target.value)} className="mt-1 w-full rounded-lg border bg-white p-2 text-sm">{[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} / 5</option>)}</select>
            </label>
            <label className="text-xs font-semibold text-[#526A78]">Review remark
              <textarea value={review.remark || ""} onChange={(event) => changeReview(review._id,"remark",event.target.value)} maxLength={2000} rows={2} className="mt-1 w-full rounded-lg border bg-white p-2 text-sm" />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-xs text-[#526A78]"><input type="checkbox" checked={review.isVisible !== false} onChange={(e) => changeReview(review._id,"isVisible",e.target.checked)} /> Visible publicly</label>
            <div className="flex gap-2">
              <button type="button" disabled={busy === String(review._id)} onClick={() => saveReview(review)} className="flex items-center gap-1 rounded-lg bg-[#087F68] px-3 py-2 text-xs font-bold text-white disabled:opacity-50"><Save size={13}/> Save</button>
              <button type="button" disabled={busy === String(review._id)} onClick={() => deleteReview(review)} className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 disabled:opacity-50"><Trash2 size={13}/> Delete</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
