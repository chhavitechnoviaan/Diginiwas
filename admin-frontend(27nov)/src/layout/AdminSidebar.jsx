import {
  MdOutlineGridView,
  MdOutlineApartment,
  MdOutlineWeb,
  MdOutlineShield,
} from "react-icons/md";

import {
  FiX,
  FiLogOut,
} from "react-icons/fi";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import Logo from "../assets/images/logo.jpg";
import { FiSearch } from "react-icons/fi";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <MdOutlineGridView size={20} />
    ),
  },
    {
    label: "Users",
    path: "/user",
    icon: (
      <MdOutlineShield size={20} />
    ),
  },
  {
    label: "Leads Dashboard",
    path: "/leads-dashboard",
    icon: (
      <MdOutlineWeb size={20} />
    ),
  },

  {
    label: "Buyer Dashboard",
    path: "/buyer-dashboard",
    icon: (
      <MdOutlineWeb size={20} />
    ),
  },
    {
    label: "Seller Dashboard",
    path: "/seller-dashboard",
    icon: (
      <MdOutlineWeb size={20} />
    ),
  },
   {
    label: "Partner Dashboard",
    path: "/partnerdashboard",
    icon: (
      <MdOutlineWeb size={20} />
    ),
  },
    {
    label: "Property",
    path: "/property",
    icon: (
      <MdOutlineWeb size={20} />
    ),
  },
  {
    label: "Property Management",
    path: "/property-management",
    icon: (
      <MdOutlineApartment size={20} />
    ),
  },

  {
    label: "Credits",
    path: "/credits",
    icon: (
      <MdOutlineShield size={20} />
    ),
  },
  {
    label: "CMS",
    path: "/cms",
    icon: (
      <MdOutlineWeb size={20} />
    ),
  },
  {
    label: "Advertisements",
    path: "/advertisements",
    icon: (
      <MdOutlineWeb size={20} />
    ),
  },
  {
    label: "SEO Management",
    path: "/seo",
    icon: <FiSearch size={20} />,
  },

];

export default function AdminSidebar({
  mobile = false,
  onClose,
}) {
  const navigate =
    useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/", {
      replace: true,
    });
  };

  return (
    <aside
      className={`
        bg-white
        flex
        flex-col
        h-full
        border-r
        border-gray-100
        px-5
        py-6
        overflow-y-auto
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden

        ${
          mobile
            ? "w-64 shadow-2xl"
            : "w-60"
        }
      `}
    >
      {/* LOGO */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex-1">

          <img
            src={Logo}
            alt="DigiNiwas Logo"
            className="h-20 w-full object-contain"
          />

        </div>

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <FiX size={19} />
          </button>
        )}

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 space-y-1">

        {navItems.map(
          (item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (mobile) {
                  onClose?.();
                }
              }}
              className={({
                isActive,
              }) =>
                `
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2.5
                  rounded-xl
                  text-sm
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "text-teal-700 font-semibold border-r-4 border-teal-600 bg-teal-50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `
              }
            >
              {({
                isActive,
              }) => (
                <>
                  <span
                    className={
                      isActive
                        ? "text-teal-600"
                        : "text-gray-400"
                    }
                  >
                    {item.icon}
                  </span>

                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        )}

      </nav>

      {/* LOGOUT */}

      <div className="pt-4 mt-5 border-t border-gray-100">

        <button
          type="button"
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-xl
            text-sm
            font-medium
            text-red-600
            hover:bg-red-50
            transition
          "
        >
          <FiLogOut size={19} />

          Logout
        </button>

      </div>

    </aside>
  );
}