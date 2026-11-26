import React from "react";
import { useState, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { navItems } from "../data/navlinks";
import logo from "../assets/images/logo.jpg";
import { RxCross1 } from "react-icons/rx";
import ComingSoonVideo from "../components/common/ComingSoonVideo";
import DeleteAccountButton from "../components/common/DeleteAccountButton";


const Navbar = ({ show, setShow }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const isLoggedIn = !!localStorage.getItem("token");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  

  const onDashboard = () => {
    navigate("/admin-dashboard");
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-[9999] shadow-lg ">
      <div className="">
        <nav className="  mx-auto   bg-white/80  transparent  rounded-2xl ">
          <div className="flex items-center justify-between px-4 gap-5 sm:px-6 md:px-8 lg:px-10 h-[65px] sm:h-[70px] lg:h-[75px] max-w-screen-2xl mx-auto">
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center text-black duration-200"
            >
              <div className="flex items-center gap-1 justify-center  ">
                <img
                  src={
                    "https://res.cloudinary.com/dhuabv2it/image/upload/v1780739165/logo-removebg-preview_sh6cxs.png"
                  }
                  className="object-contain w-17  sm:h-16 h-12 "
                />
              </div>
            </NavLink>

            <div className="hidden lg:flex items-center   lg:gap-4 xl:gap-8 text-base font-medium tracking-wide">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    // `relative inline-block text-black transition-colors duration-200 
                    //     after:content-[''] after:absolute after:left-0 after:bottom-0  whitespace-nowrap
                    //     after:h-[2px] after:bg-green-700  after:transition-all after:duration-300 
                    //     ${
                    //       isActive ? " text-gray-700" : " hover:text-[0F766E] "
                    //     }`

                     `relative inline-block pb-1 text-black transition-colors duration-200
      after:absolute after:left-0 after:bottom-0 after:h-[2px]
      after:bg-green-700 after:transition-all after:duration-300 after:content-['']
      ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`

                  }
                ><span>  {item.name} </span>
                
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-3 overflow-hidden">
              <div className="flex gap-0 sm:gap-4 overflow-hidden">
              
                <div className="sm:min-w-40 ">
                  {" "}
                  <button
                    onClick={() => {
                     setShowComingSoon(true)
                    }}
                    className="hidden sm:block px-4 py-2 bg-[#274255]  text-white rounded-full cursor-pointer"
                  >
                    Get Digital
                  </button>{" "}
                </div>
              </div>

              {/* {isLoggedIn && (
                <div className="relative hidden sm:block">
                  <button
                    type="button"
                    onClick={() => setAccountMenuOpen((prev) => !prev)}
                    className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-[#274255] shadow-sm transition hover:border-[#33cc99]"
                  >
                    <CgProfile className="text-lg" />
                    Account
                  </button>

                  {accountMenuOpen && (
                    <div className="absolute right-0 top-12 z-[10001] w-52 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          localStorage.removeItem("role");
                          localStorage.removeItem("partnerToken");
                          localStorage.removeItem("sellerToken");
                          localStorage.removeItem("buyerToken");
                          setAccountMenuOpen(false);
                          navigate("/");
                          window.location.reload();
                        }}
                        className="mb-2 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold text-[#274255] hover:bg-slate-50"
                      >
                        <LuLogOut size={15} />
                        Logout
                      </button>

                      <DeleteAccountButton className="w-full justify-center" />
                    </div>
                  )}
                </div>
              )} */}

              {!mobileMenuOpen && (
                <button
                  className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                  <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                  <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                </button>
              )}

              {mobileMenuOpen && (
                <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
                  <RxCross1 className="text-2xl block lg:hidden" />
                </button>
              )}
            </div>
          </div>

          <div
            className={[
              "lg:hidden overflow-hidden   transition-all duration-300 ease-in-out bg-white rounded-b-2xl",
              mobileMenuOpen
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="flex flex-col px-6 py-4 gap-4 text-[15px] font-medium border-t border-gray-100">
              {navItems.map((item, index) => (
                <div key={index}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `inline-block text-green-800 pb-1 transition-all duration-100 ${
                        isActive
                          ? "text-gray-700  border-[#0A2540] border-b-2  "
                          : "hover:text-[#0A2540]   "
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <span
                        key={index}
                        className={`inline-block  ${isActive ? "border-[#0A2540] duration-100  transform-all" : ""}`}
                      >
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </div>
              ))}           
            </div>

            <div className="flex flex-col items-start ml-6 mb-1 gap-3 pb-5">
              {isLoggedIn && (
                <div className="flex w-[calc(100%-24px)] flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      localStorage.removeItem("role");
                      localStorage.removeItem("partnerToken");
                      localStorage.removeItem("sellerToken");
                      localStorage.removeItem("buyerToken");
                      navigate("/");
                      window.location.reload();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#274255]"
                  >
                    <LuLogOut size={16} /> Logout
                  </button>
                  <DeleteAccountButton className="w-full justify-center" />
                </div>
              )}

              {!isLoggedIn && (
                <button
                  onClick={() => {
                    setMobileMenuOpen((prev) => !prev);
                    setShowComingSoon(true)
                  }}
                  className="sm:hidden w-40 text-center block  px-4 py-2 bg-[#274255]   text-white rounded-full  cursor-pointer"
                >
                  Get Digital
                </button>
              )}
            </div>
          </div>
        </nav>


        {showComingSoon && (
        <ComingSoonVideo
          setShowComingSoon={setShowComingSoon} video={import.meta.env.VITE_NIWAS_AI}
        />
      )}

      </div>
    </div>
  );
};

export default Navbar;
