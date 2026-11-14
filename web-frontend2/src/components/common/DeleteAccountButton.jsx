import { useState } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { deleteOwnAccountApi } from "../../services/accountService";

export default function DeleteAccountButton({ className = "" }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Delete your account?",
      text: "You will be logged out and this account will no longer be able to access DigiNiwas.",
      showCancelButton: true,
      confirmButtonText: "Delete account",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    try {
      setLoading(true);
      const response = await deleteOwnAccountApi();
      if (!response?.success) throw new Error(response?.message || "Unable to delete account");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("partnerToken");
      localStorage.removeItem("sellerToken");
      localStorage.removeItem("buyerToken");

      await Swal.fire({
        icon: "success",
        title: "Account deleted",
        text: "Your account has been deleted successfully.",
        confirmButtonColor: "#1F4256",
      });

      window.location.href = "/";
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Unable to delete account",
        text: error?.response?.data?.message || error.message || "Please try again.",
        confirmButtonColor: "#1F4256",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleDelete}
      className={`inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100 disabled:opacity-50 ${className}`}
    >
      <Trash2 size={15} />
      {loading ? "Deleting..." : "Delete Account"}
    </button>
  );
}
