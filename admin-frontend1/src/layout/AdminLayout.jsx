import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-gray-100
      "
    >
      {/* DESKTOP SIDEBAR */}

      <div
        className="
          hidden
          lg:block
          h-screen
          shrink-0
        "
      >
        <AdminSidebar />
      </div>

      {/* MOBILE SIDEBAR */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            lg:hidden
          "
        >
          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-black/40
            "
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
          />

          {/* SIDEBAR */}

          <div className="relative z-10 h-full">

            <AdminSidebar
              mobile
              onClose={() =>
                setSidebarOpen(
                  false
                )
              }
            />

          </div>

        </div>
      )}

      {/* RIGHT SIDE */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          h-screen
        "
      >
        {/* NAVBAR */}

        <AdminNavbar
          onMenuClick={() =>
            setSidebarOpen(
              true
            )
          }
        />

        {/* PAGE CONTENT */}

        <main
          className="
            min-h-0
            flex-1
            overflow-y-auto
            bg-gray-100
            px-4
            py-6
            sm:px-6
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}