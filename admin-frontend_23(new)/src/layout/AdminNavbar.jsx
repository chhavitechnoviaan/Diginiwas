import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiLock,
  FiMenu,
  FiPlus,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { getAdminNotificationsApi } from "../Services/notificationService";
import {
  changeAdminPasswordApi,
  getAdminProfileApi,
} from "../Services/adminProfileService";

const DARK = "#0d2d2a";

export default function AdminNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAdminProfileApi()
      .then((response) => {
        const value = response?.data || {};
        setProfile(value);
        localStorage.setItem("user", JSON.stringify(value));
      })
      .catch(() => {});

    const loadUnread = () =>
      getAdminNotificationsApi({ unread: true, limit: 1 })
        .then((response) => setUnreadCount(response?.unreadCount || 0))
        .catch(() => {});
    loadUnread();
    window.addEventListener("admin-notifications-updated", loadUnread);
    const timer = setInterval(loadUnread, 60000);
    return () => {
      clearInterval(timer);
      window.removeEventListener("admin-notifications-updated", loadUnread);
    };
  }, []);

  useEffect(() => {
    const close = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const changePassword = async (event) => {
    event.preventDefault();
    setPasswordMessage("");
    if (passwords.newPassword !== passwords.confirmPassword)
      return setPasswordMessage("New passwords do not match.");
    try {
      setSaving(true);
      const response = await changeAdminPasswordApi({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswordMessage(response?.message || "Password changed successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordMessage(
        error?.response?.data?.message || "Unable to change password",
      );
    } finally {
      setSaving(false);
    }
  };

  const initials = String(profile?.name || "Admin")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <FiMenu size={20} />
        </button>
        {/* <div className="max-w-md flex-1">
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
            <FiSearch size={15} className="shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search ecosystem data..."
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div> */}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="Open notifications"
          >
            <FiBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-2.5 text-left hover:bg-slate-50"
            >
              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.name || "Admin"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-800">
                  {initials}
                </span>
              )}
              <span className="hidden max-w-28 truncate text-xs font-bold text-[#173247] sm:block">
                {profile?.name || "Admin"}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="bg-[#0d2d2a] p-4 text-white">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 font-extrabold">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-bold">
                        {profile?.name || "Admin"}
                      </p>
                      <p className="truncate text-xs text-white/70">
                        Administrator
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 p-4 text-sm">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Email
                    </p>
                    <p className="truncate font-medium text-slate-700">
                      {profile?.email || "Not available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Phone
                    </p>
                    <p className="font-medium text-slate-700">
                      {profile?.phone || "Not added"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setPasswordOpen(true);
                      setPasswordMessage("");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 font-bold text-[#173247] hover:bg-slate-50"
                  >
                    <FiLock /> Change password
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate("/add-property")}
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold text-white sm:px-4"
            style={{ backgroundColor: DARK }}
          >
            <FiPlus size={17} />
            <span className="hidden sm:inline">Add Property</span>
          </button>
        </div>
      </header>

      {passwordOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 p-4">
          <form
            onSubmit={changePassword}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xl font-bold text-[#173247]">
                  <FiUser /> Admin password
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Choose a secure new password.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPasswordOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <FiX />
              </button>
            </div>
            <div className="space-y-4">
              {[
                ["Current password", "currentPassword"],
                ["New password", "newPassword"],
                ["Confirm new password", "confirmPassword"],
              ].map(([label, key]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-600">
                    {label}
                  </span>
                  <input
                    required
                    minLength={key === "currentPassword" ? undefined : 6}
                    type="password"
                    value={passwords[key]}
                    onChange={(event) =>
                      setPasswords((value) => ({
                        ...value,
                        [key]: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />
                </label>
              ))}
            </div>
            {passwordMessage && (
              <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                {passwordMessage}
              </p>
            )}
            <button
              disabled={saving}
              className="mt-5 w-full rounded-xl bg-[#0d2d2a] py-3 font-bold text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : "Change password"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
