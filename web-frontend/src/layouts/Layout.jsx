// import React, {useState} from "react";
// import Navbar from "./Navbar";
// import { Outlet,  useLocation } from "react-router-dom";
// import Footer from "./Footer";

// const Layout = () => {
//   const location = useLocation();
//   const [show, setShow] = useState(false);


//   const hideNavbar = 
//   location.pathname === "/admin-dashboard" ||
//   location.pathname === "/add-property" 
//   // location.pathname ===  '/user-dashboard' 



//   const hideFooter = location.pathname === '/admin-dashboard' || location.pathname === "/add-property" 
//   // location.pathname === "/b2b-dashboard" || location.pathname === "/user-dashboard"  ;

//   return (
//     <>
//      {!hideNavbar &&   <Navbar show={show} setShow={setShow}/> }
     
//       <Outlet />

//       {/* {show && <Signup setShow={setShow} />} */}
      

//        {!hideFooter && <Footer /> }
      
      
//     </>
//   );
// };

// export default Layout;




import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import FloatingButtons from "../components/common/FloatingButton"; // 1. Sabse pehle yahan import karein

const Layout = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const hideNavbar =
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/add-property";

  const hideFooter =
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/add-property" ||
    location.pathname === "/niwas-ai";

  return (
    <>
      {!hideNavbar && <Navbar show={show} setShow={setShow} />}
      
      <Outlet />

      {/* 2. Yahan par FloatingButtons ko add karein */}
      {/* Isse ye har page par constant dikhega */}
      <FloatingButtons />

      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;