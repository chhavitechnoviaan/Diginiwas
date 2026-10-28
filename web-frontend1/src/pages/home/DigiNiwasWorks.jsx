


// import React from "react";
// import {
//   HiOutlineShieldCheck,
//   HiOutlineSearch,
//   HiOutlineUserGroup,
//   HiOutlineHome,
//   HiOutlineVolumeUp,
//   HiOutlineVideoCamera,
//   HiOutlineChartBar,
// } from "react-icons/hi";
// import { GiHouse } from "react-icons/gi";
// import { RiRobotLine, RiUserVoiceLine } from "react-icons/ri";
// import { FiUsers, FiArrowRight } from "react-icons/fi";
// import { BiHeadphone } from "react-icons/bi";
// import homelogo from "../../assets/images/homelogo.png";
// import robot from "../../assets/images/robot.png";
// import Background from "../../assets/images/Background.png";
// import grow from "../../assets/images/grow.png";
// import diginiwas from "../../assets/images/diginiwas.webp";

// export default function DiginiwasWorks() {
//   return (
//     <section className="min-h-screen bg-[#274255]  text-white px-10 py-5 sm:pb-20  flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-black">
//       <div className="max-w-7xl mx-auto text-center mb-16 relative w-full">
//         <div className="flex items-center justify-evenly gap-2 text-2xl md:text-4xl font-bold tracking-wide uppercase">
//           <div className="flex flex-row gap-10 items-center">
//             <span> HOW </span>
//             <span className="text-[#33cc99] ">
//               <img src={diginiwas} className="sm:h-20 mb-11" />
//             </span>
//             <span>WORKS</span>
//           </div>
//         </div>

//         <p className="text-slate-400 text-sm md:text-base mt-3 tracking-widest font-medium flex items-center justify-center gap-3">
//           <span className="w-6 h-[1px] bg-slate-700"></span>
//           Trust. AI. Connection. Growth.
//           <span className="w-6 h-[1px] bg-slate-700"></span>
//         </p>
//       </div>

//       {/* 4 Step Workflow Cards Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-16 sm:gap-8 relative w-full mb-16 hover:border-[#33cc99]">
//         {/* STEP 01 */}
//         <div
//           onClick={() =>
//             document.getElementById("agent")?.scrollIntoView({
//               behavior: "smooth",
//               block: "start",
//             })
//           }
//           className="bg-[#061520]/60 border hover:scale-105  border-slate-800/80 
//   rounded-2xl p-6 flex flex-col hover:border-2  items-center text-center relative backdrop-blur-sm group
//    hover:border-[#33cc99] transition-all duration-300"
//         >
//           <div className="absolute -top-6 bg-[#030a10] border border-slate-800 p-3 rounded-full text-xs font-semibold text-slate-400 tracking-wider">
//             01
//           </div>

//           <div className="   flex items-center justify-center text-[#33cc99] mb-6 mt-5 relative   border-slate-700/50">
//             <img src={Background} />
//           </div>

//           <h3 className="text-xl font-bold mb-3 tracking-tight">
//             We Onboard <br />
//             <span className="text-[#33cc99]">Verified</span> Partners
//           </h3>

//           <p className="text-slate-400 text-sm leading-relaxed mb-2 flex-grow">
//             Every Partner goes through onboarding and KYC verification to ensure a
//             trusted network for our customers.
//           </p>

//           <div className="w-full bg-[#04111a] border border-slate-800/60 rounded-xl p-3 flex items-center gap-3 text-left">
//             <HiOutlineShieldCheck
//               className="text-[#33cc99] shrink-0"
//               size={20}
//             />
//             <div className="text-xs font-medium text-slate-300">
//               KYC Verified <br />
//               <span className="text-slate-500 font-normal">
//                 Trusted Professionals
//               </span>
//             </div>
//           </div>

//           <div className="hidden xl:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-700 pointer-events-none">
//             <FiArrowRight size={20} className="animate-pulse" />
//           </div>
//         </div>

//         {/* STEP 02 */}
//         <div
//           onClick={() =>
//             document.getElementById("niwas-ai")?.scrollIntoView({
//               behavior: "smooth",
//               block: "start",
//             })
//           }
//           className="bg-[#061520]/60 border hover:scale-105 border-slate-800/80 rounded-2xl p-6 
//   flex flex-col items-center hover:border-2  text-center relative backdrop-blur-sm group
//    hover:border-[#33cc99] transition-all duration-300"
//         >
//           <div className="absolute -top-6 bg-[#030a10] border border-slate-800 p-3  rounded-full text-xs font-semibold text-slate-400 tracking-wider">
//             02
//           </div>

//           <div className="  flex items-center justify-center text-[#33cc99] mb-6 mt-2  r border-slate-700/50">
//             <img src={robot} />
//           </div>

//           <h3 className="text-xl font-bold mb-3 tracking-tight">
//             Use <span className="text-[#33cc99]">Niwas AI</span> <br />
//             for the Best
//           </h3>

//           <p className="text-slate-400 text-sm leading-relaxed mb-3  flex-grow">
//             Niwas AI understands your needs and provides smart recommendations
//             to help you find the best properties.
//           </p>

//           <div className="w-full space-y-2 text-left">
//             {[
//               "2BHK in Ambala under ₹30k",
//               "Commercial property near market",
//               "Villa under ₹80 Lakhs",
//             ].map((tag, idx) => (
//               <div
//                 key={idx}
//                 className="w-full bg-[#04111a] border border-slate-800/60 rounded-xl p-2.5 flex items-center gap-2.5 text-xs text-slate-300"
//               >
//                 <HiOutlineSearch
//                   className="text-slate-500 shrink-0"
//                   size={14}
//                 />
//                 <span className="truncate">{tag}</span>
//               </div>
//             ))}
//           </div>

//           <div className="hidden xl:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-700 pointer-events-none">
//             <FiArrowRight size={20} className="animate-pulse" />
//           </div>
//         </div>

//         {/* STEP 03 */}
//         <div
//           onClick={() =>
//             document.getElementById("future")?.scrollIntoView({
//               behavior: "smooth",
//               block: "start",
//             })
//           }
//           className="bg-[#061520]/60 border hover:scale-105 border-slate-800/80 rounded-2xl 
//   p-6 flex flex-col items-center text-center relative 
//   backdrop-blur-sm group hover:border-[#33cc99] hover:border-2 transition-all duration-300"
//         >
//           <div className="absolute -top-6 bg-[#030a10] border border-slate-800 p-3  rounded-full text-xs font-semibold text-slate-400 tracking-wider">
//             03
//           </div>

//           <div className="  flex items-center justify-center text-[#33cc99] mb-6 mt-2   border-slate-700/50">
//             <img src={homelogo} className="w-56 h-44" />
//           </div>

//           <h3 className="text-xl font-bold mb-3 tracking-tight">
//             Connect with <br />
//             <span className="text-[#33cc99]">Verified & Trusted</span> Partners
//           </h3>

//           <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
//             Connect with verified and trusted Partners who can help you in every
//             step of your real estate journey.
//           </p>

//           <div className="w-full space-y-2.5 text-left text-xs text-slate-300">
//             <div className="flex items-center gap-3">
//               <RiUserVoiceLine size={16} className="text-[#33cc99] shrink-0" />
//               <span>Expert Guidance</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <HiOutlineHome size={16} className="text-[#33cc99] shrink-0" />
//               <span>Local Market Knowledge</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <HiOutlineShieldCheck
//                 size={16}
//                 className="text-[#33cc99] shrink-0"
//               />
//               <span>End-to-End Support</span>
//             </div>
//           </div>

//           <div className="hidden xl:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-700 pointer-events-none">
//             <FiArrowRight size={20} className="animate-pulse" />
//           </div>
//         </div>

//         {/* STEP 04 */}
//         <div
//           onClick={() =>
//             document.getElementById("list-property")?.scrollIntoView({
//               behavior: "smooth",
//               block: "start",
//             })
//           }
//           className="bg-[#061520]/60 border hover:scale-105 border-slate-800/80 rounded-2xl p-6 flex
//    flex-col items-center text-center relative backdrop-blur-sm group
//     hover:border-[#33cc99] hover:border-2 transition-all duration-300"
//         >
//           <div className="absolute -top-6 bg-[#030a10] border border-slate-800 p-3 rounded-full text-xs font-semibold text-slate-400 tracking-wider">
//             04
//           </div>

//           <div className="   flex items-center justify-center text-[#33cc99] mb-6 mt-2   border-slate-700/50">
//             <img src={grow} className="" />
//           </div>

//           <h3 className="text-xl font-bold mb-3 tracking-tight">
//             List Properties <br />&{" "}
//             <span className="text-[#33cc99]">Grow Digitally</span>
//           </h3>

//           <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
//             List your properties in the easiest way and get maximum visibility
//             through digital promotion.
//           </p>

//           <div className="w-full space-y-2.5 text-left text-xs text-slate-300">
//             <div className="flex items-center gap-3">
//               <HiOutlineHome size={16} className="text-[#33cc99] shrink-0" />
//               <span>Easy Property Listing</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <HiOutlineVolumeUp
//                 size={16}
//                 className="text-[#33cc99] shrink-0"
//               />
//               <span>Digital Promotion</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <HiOutlineVideoCamera
//                 size={16}
//                 className="text-[#33cc99] shrink-0"
//               />
//               <span>Video & Photography</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <HiOutlineChartBar
//                 size={16}
//                 className="text-[#33cc99] shrink-0"
//               />
//               <span>Branding & Visibility</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🔧 FIXED: ab ye ek proper component call hai, JSX ke andar function declaration nahi */}
//       <TrustFeatures />
//     </section>
//   );
// }

// function TrustFeatures() {
//   return (
//     <>
//       {/* Animations */}
//       <style>{`
//         @keyframes featureFadeUp {
//           0% { opacity: 0; transform: translateY(18px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes iconGlow {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(51,204,153,0.25); }
//           50% { box-shadow: 0 0 0 8px rgba(51,204,153,0); }
//         }
//         .feature-card {
//           animation: featureFadeUp 0.6s ease both;
//           transition: transform 0.35s ease, background 0.35s ease, border-color 0.35s ease;
//         }
//         .feature-card:hover {
//           transform: translateY(-6px);
//           background: rgba(51,204,153,0.06);
//           border-color: rgba(51,204,153,0.35);
//         }
//         .feature-icon-box {
//           animation: iconGlow 2.8s ease-in-out infinite;
//           transition: transform 0.4s ease, background 0.4s ease, border-color 0.4s ease;
//         }
//         .feature-card:hover .feature-icon-box {
//           transform: scale(1.12) rotate(-6deg);
//           background: rgba(51,204,153,0.22);
//           border-color: rgba(51,204,153,0.6);
//         }
//         .feature-card:hover .feature-text {
//           color: #ffffff;
//         }
//       `}</style>

//       <div
//         className="max-w-7xl mx-auto w-full rounded-3xl shadow-lg px-6 py-8 mb-6"
//         style={{
//           background: "linear-gradient(135deg, #16283a 0%, #0d1b2a 100%)",
//           border: "1px solid rgba(51,204,153,0.15)",
//         }}
//       >
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 text-center">
//           {[
//             { icon: HiOutlineShieldCheck, text: "100% Verified Partners & Listings" },
//             { icon: RiRobotLine, text: "AI Powered Smart Search" },
//             { icon: HiOutlineUserGroup, text: "Happy Customers Everyday" },
//             { icon: GiHouse, text: "Grow Your Real Estate Business" },
//             { icon: BiHeadphone, text: "Dedicated Support" },
//           ].map(({ icon: Icon, text }, i) => (
//             <div
//               key={text}
//               className={`feature-card flex flex-col sm:flex-row items-center justify-center gap-3 p-3 rounded-2xl ${
//                 i === 4 ? "col-span-2 md:col-span-1" : ""
//               }`}
//               style={{
//                 border: "1px solid rgba(255,255,255,0.06)",
//                 animationDelay: `${i * 0.12}s`,
//               }}
//             >
//               <div
//                 className="feature-icon-box flex items-center justify-center shrink-0 rounded-xl"
//                 style={{
//                   width: 52,
//                   height: 52,
//                   background: "rgba(51,204,153,0.1)",
//                   border: "1px solid rgba(51,204,153,0.25)",
//                 }}
//               >
//                 <Icon className="text-2xl sm:text-2xl md:text-3xl text-[#33cc99]" />
//               </div>

//               <span className="feature-text font-semibold text-sm sm:text-base lg:text-lg text-white/80 transition-colors duration-300">
//                 {text}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";

import {
  HiOutlineShieldCheck,
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineVolumeUp,
  HiOutlineVideoCamera,
  HiOutlineChartBar,
} from "react-icons/hi";

import { GiHouse } from "react-icons/gi";
import { RiRobotLine, RiUserVoiceLine } from "react-icons/ri";
import { FiArrowRight } from "react-icons/fi";
import { BiHeadphone } from "react-icons/bi";

import homelogo from "../../assets/images/homelogo.png";
import robot from "../../assets/images/robot.png";
import Background from "../../assets/images/Background.png";
import grow from "../../assets/images/grow.png";
import diginiwas from "../../assets/images/diginiwas.webp";

export default function DiginiwasWorks() {
  return (
    <section
      className="
        min-h-screen
        bg-[#274255]
        text-white
        px-5
        sm:px-8
        lg:px-10
        pt-8
        sm:pt-10
        pb-16
        sm:pb-20
        flex
        flex-col
        font-sans
        selection:bg-emerald-500
        selection:text-black
        overflow-hidden
      "
    >
      {/* =====================================================
          HEADER / TITLE
      ====================================================== */}
      <div
        className="
          max-w-7xl
          mx-auto
          w-full
          text-center
          relative
          mb-14
          sm:mb-16
        "
      >
        {/* HOW + LOGO + WORKS */}
        <div
          className="
            w-full
            flex
            items-center
            justify-center
            whitespace-nowrap
          "
        >
          {/* HOW */}
          <span
            className="
              text-[20px]
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              tracking-wide
              leading-none
              shrink-0
              mt-12
            "
          >
            HOW
          </span>

          {/* LOGO */}
          <div
            className="
              mx-4
              sm:mx-6
              md:mx-8
              lg:mx-10
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <img
              src={diginiwas}
              alt="DigiNiwas"
              className="
                h-[82px]
                sm:h-[100px]
                md:h-[118px]
                lg:h-[135px]
                xl:h-[150px]
                w-auto
                object-contain
                block
              "
            />
          </div>

          {/* WORKS */}
          <span
            className="
              text-[20px]
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              tracking-wide
              leading-none
              shrink-0
              mt-12
            "
          >
            WORKS
          </span>
        </div>

        {/* SUBTITLE */}
        <p
          className="
            text-slate-400
            text-xs
            sm:text-sm
            md:text-base
            mt-4
            sm:mt-5
            tracking-[0.18em]
            font-medium
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="w-5 sm:w-6 h-[1px] bg-slate-700" />

          <span>Trust. AI. Connection. Growth.</span>

          <span className="w-5 sm:w-6 h-[1px] bg-slate-700" />
        </p>
      </div>

      {/* =====================================================
          4 STEP WORKFLOW
      ====================================================== */}
      <div
        className="
          max-w-7xl
          mx-auto
          w-full
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-14
          sm:gap-8
          mb-14
          sm:mb-16
        "
      >
        {/* =================================================
            STEP 01
        ================================================== */}
        <div
          onClick={() =>
            document.getElementById("agent")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="
            relative
            group
            flex
            flex-col
            items-center
            text-center
            bg-[#061520]/60
            border
            border-slate-800/80
            rounded-2xl
            p-6
            min-h-[510px]
            backdrop-blur-sm
            hover:scale-[1.03]
            hover:border-2
            hover:border-[#33cc99]
            transition-all
            duration-300
          "
        >
          {/* NUMBER */}
          <div
            className="
              absolute
              -top-6
              bg-[#030a10]
              border
              border-slate-800
              p-3
              rounded-full
              text-xs
              font-semibold
              text-slate-400
              tracking-wider
              z-20
            "
          >
            01
          </div>

          {/* IMAGE AREA - SAME HEIGHT FOR EVERY CARD */}
          <div
            className="
              w-full
              h-44
              flex
              items-center
              justify-center
              mt-3
              mb-3
              shrink-0
            "
          >
            <img
              src={Background}
              alt="Verified Partners"
              className="
                max-h-full
                max-w-full
                object-contain
              "
            />
          </div>

          {/* HEADING - SAME HEIGHT */}
          <h3
            className="
              w-full
              min-h-[60px]
              flex
              items-center
              justify-center
              text-xl
              font-bold
              tracking-tight
              leading-7
              mb-3
              shrink-0
            "
          >
            <span>
              We Onboard <br />
              <span className="text-[#33cc99]">Verified</span> Partners
            </span>
          </h3>

          {/* DESCRIPTION - SAME AREA */}
          <p
            className="
              w-full
              min-h-[74px]
              text-slate-400
              text-sm
              leading-relaxed
              flex
              items-start
              justify-center
              mb-4
              shrink-0
            "
          >
            Every Partner goes through onboarding and KYC verification to
            ensure a trusted network for our customers.
          </p>

          {/* KYC BOX */}
          <div
            className="
              w-full
              mt-auto
              bg-[#04111a]
              border
              border-slate-800/60
              rounded-xl
              p-3
              flex
              items-center
              gap-3
              text-left
            "
          >
            <HiOutlineShieldCheck
              className="text-[#33cc99] shrink-0"
              size={20}
            />

            <div className="text-xs font-medium text-slate-300">
              KYC Verified
              <br />

              <span className="text-slate-500 font-normal">
                Trusted Professionals
              </span>
            </div>
          </div>

          {/* ARROW */}
          <div
            className="
              hidden
              xl:block
              absolute
              top-1/2
              -right-4
              -translate-y-1/2
              z-10
              text-slate-700
              pointer-events-none
            "
          >
            <FiArrowRight
              size={20}
              className="animate-pulse"
            />
          </div>
        </div>

        {/* =================================================
            STEP 02
        ================================================== */}
        <div
          onClick={() =>
            document.getElementById("niwas-ai")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="
            relative
            group
            flex
            flex-col
            items-center
            text-center
            bg-[#061520]/60
            border
            border-slate-800/80
            rounded-2xl
            p-6
            min-h-[510px]
            backdrop-blur-sm
            hover:scale-[1.03]
            hover:border-2
            hover:border-[#33cc99]
            transition-all
            duration-300
          "
        >
          {/* NUMBER */}
          <div
            className="
              absolute
              -top-6
              bg-[#030a10]
              border
              border-slate-800
              p-3
              rounded-full
              text-xs
              font-semibold
              text-slate-400
              tracking-wider
              z-20
            "
          >
            02
          </div>

          {/* IMAGE AREA */}
          <div
            className="
              w-full
              h-44
              flex
              items-center
              justify-center
              mt-3
              mb-3
              shrink-0
            "
          >
            <img
              src={robot}
              alt="Niwas AI"
              className="
                max-h-full
                max-w-full
                object-contain
              "
            />
          </div>

          {/* HEADING */}
          <h3
            className="
              w-full
              min-h-[60px]
              flex
              items-center
              justify-center
              text-xl
              font-bold
              tracking-tight
              leading-7
              mb-3
              shrink-0
            "
          >
            <span>
              Use{" "}
              <span className="text-[#33cc99]">
                Niwas AI
              </span>
              <br />
              for the Best
            </span>
          </h3>

          {/* DESCRIPTION */}
          <p
            className="
              w-full
              min-h-[74px]
              text-slate-400
              text-sm
              leading-relaxed
              flex
              items-start
              justify-center
              mb-4
              shrink-0
            "
          >
            Niwas AI understands your needs and provides smart
            recommendations to help you find the best properties.
          </p>

          {/* SEARCH TAGS */}
          <div className="w-full mt-auto space-y-2 text-left">
            {[
              "2BHK in Ambala under ₹30k",
              "Commercial property near market",
              "Villa under ₹80 Lakhs",
            ].map((tag, idx) => (
              <div
                key={idx}
                className="
                  w-full
                  bg-[#04111a]
                  border
                  border-slate-800/60
                  rounded-xl
                  p-2.5
                  flex
                  items-center
                  gap-2.5
                  text-xs
                  text-slate-300
                "
              >
                <HiOutlineSearch
                  className="text-slate-500 shrink-0"
                  size={14}
                />

                <span className="truncate">
                  {tag}
                </span>
              </div>
            ))}
          </div>

          {/* ARROW */}
          <div
            className="
              hidden
              xl:block
              absolute
              top-1/2
              -right-4
              -translate-y-1/2
              z-10
              text-slate-700
              pointer-events-none
            "
          >
            <FiArrowRight
              size={20}
              className="animate-pulse"
            />
          </div>
        </div>

        {/* =================================================
            STEP 03
        ================================================== */}
        <div
          onClick={() =>
            document.getElementById("future")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="
            relative
            group
            flex
            flex-col
            items-center
            text-center
            bg-[#061520]/60
            border
            border-slate-800/80
            rounded-2xl
            p-6
            min-h-[510px]
            backdrop-blur-sm
            hover:scale-[1.03]
            hover:border-2
            hover:border-[#33cc99]
            transition-all
            duration-300
          "
        >
          {/* NUMBER */}
          <div
            className="
              absolute
              -top-6
              bg-[#030a10]
              border
              border-slate-800
              p-3
              rounded-full
              text-xs
              font-semibold
              text-slate-400
              tracking-wider
              z-20
            "
          >
            03
          </div>

          {/* IMAGE AREA */}
          <div
            className="
              w-full
              h-44
              flex
              items-center
              justify-center
              mt-3
              mb-3
              shrink-0
            "
          >
            <img
              src={homelogo}
              alt="Connect with Partners"
              className="
                max-h-full
                max-w-[230px]
                object-contain
              "
            />
          </div>

          {/* HEADING */}
          <h3
            className="
              w-full
              min-h-[60px]
              flex
              items-center
              justify-center
              text-xl
              font-bold
              tracking-tight
              leading-7
              mb-3
              shrink-0
            "
          >
            <span>
              Connect with <br />
              <span className="text-[#33cc99]">
                Verified & Trusted
              </span>{" "}
              Partners
            </span>
          </h3>

          {/* DESCRIPTION */}
          <p
            className="
              w-full
              min-h-[74px]
              text-slate-400
              text-sm
              leading-relaxed
              flex
              items-start
              justify-center
              mb-4
              shrink-0
            "
          >
            Connect with verified and trusted Partners who can help you in
            every step of your real estate journey.
          </p>

          {/* FEATURES */}
          <div
            className="
              w-full
              mt-auto
              space-y-2.5
              text-left
              text-xs
              text-slate-300
            "
          >
            <div className="flex items-center gap-3">
              <RiUserVoiceLine
                size={16}
                className="text-[#33cc99] shrink-0"
              />
              <span>Expert Guidance</span>
            </div>

            <div className="flex items-center gap-3">
              <HiOutlineHome
                size={16}
                className="text-[#33cc99] shrink-0"
              />
              <span>Local Market Knowledge</span>
            </div>

            <div className="flex items-center gap-3">
              <HiOutlineShieldCheck
                size={16}
                className="text-[#33cc99] shrink-0"
              />
              <span>End-to-End Support</span>
            </div>
          </div>

          {/* ARROW */}
          <div
            className="
              hidden
              xl:block
              absolute
              top-1/2
              -right-4
              -translate-y-1/2
              z-10
              text-slate-700
              pointer-events-none
            "
          >
            <FiArrowRight
              size={20}
              className="animate-pulse"
            />
          </div>
        </div>

        {/* =================================================
            STEP 04
        ================================================== */}
        <div
          onClick={() =>
            document.getElementById("list-property")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="
            relative
            group
            flex
            flex-col
            items-center
            text-center
            bg-[#061520]/60
            border
            border-slate-800/80
            rounded-2xl
            p-6
            min-h-[510px]
            backdrop-blur-sm
            hover:scale-[1.03]
            hover:border-2
            hover:border-[#33cc99]
            transition-all
            duration-300
          "
        >
          {/* NUMBER */}
          <div
            className="
              absolute
              -top-6
              bg-[#030a10]
              border
              border-slate-800
              p-3
              rounded-full
              text-xs
              font-semibold
              text-slate-400
              tracking-wider
              z-20
            "
          >
            04
          </div>

          {/* IMAGE AREA */}
          <div
            className="
              w-full
              h-44
              flex
              items-center
              justify-center
              mt-3
              mb-3
              shrink-0
            "
          >
            <img
              src={grow}
              alt="Grow Digitally"
              className="
                max-h-full
                max-w-full
                object-contain
              "
            />
          </div>

          {/* HEADING */}
          <h3
            className="
              w-full
              min-h-[60px]
              flex
              items-center
              justify-center
              text-xl
              font-bold
              tracking-tight
              leading-7
              mb-3
              shrink-0
            "
          >
            <span>
              List Properties <br />
              &{" "}
              <span className="text-[#33cc99]">
                Grow Digitally
              </span>
            </span>
          </h3>

          {/* DESCRIPTION */}
          <p
            className="
              w-full
              min-h-[74px]
              text-slate-400
              text-sm
              leading-relaxed
              flex
              items-start
              justify-center
              mb-4
              shrink-0
            "
          >
            List your properties in the easiest way and get maximum
            visibility through digital promotion.
          </p>

          {/* FEATURES */}
          <div
            className="
              w-full
              mt-auto
              space-y-2.5
              text-left
              text-xs
              text-slate-300
            "
          >
            <div className="flex items-center gap-3">
              <HiOutlineHome
                size={16}
                className="text-[#33cc99] shrink-0"
              />
              <span>Easy Property Listing</span>
            </div>

            <div className="flex items-center gap-3">
              <HiOutlineVolumeUp
                size={16}
                className="text-[#33cc99] shrink-0"
              />
              <span>Digital Promotion</span>
            </div>

            <div className="flex items-center gap-3">
              <HiOutlineVideoCamera
                size={16}
                className="text-[#33cc99] shrink-0"
              />
              <span>Video & Photography</span>
            </div>

            <div className="flex items-center gap-3">
              <HiOutlineChartBar
                size={16}
                className="text-[#33cc99] shrink-0"
              />
              <span>Branding & Visibility</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TRUST FEATURES
      ====================================================== */}
      <TrustFeatures />
    </section>
  );
}

/* =========================================================
   TRUST FEATURES COMPONENT
========================================================= */

function TrustFeatures() {
  return (
    <>
      <style>{`
        @keyframes featureFadeUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(51, 204, 153, 0.25);
          }

          50% {
            box-shadow: 0 0 0 8px rgba(51, 204, 153, 0);
          }
        }

        .feature-card {
          animation: featureFadeUp 0.6s ease both;
          transition:
            transform 0.35s ease,
            background 0.35s ease,
            border-color 0.35s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          background: rgba(51, 204, 153, 0.06);
          border-color: rgba(51, 204, 153, 0.35);
        }

        .feature-icon-box {
          animation: iconGlow 2.8s ease-in-out infinite;
          transition:
            transform 0.4s ease,
            background 0.4s ease,
            border-color 0.4s ease;
        }

        .feature-card:hover .feature-icon-box {
          transform: scale(1.12) rotate(-6deg);
          background: rgba(51, 204, 153, 0.22);
          border-color: rgba(51, 204, 153, 0.6);
        }

        .feature-card:hover .feature-text {
          color: #ffffff;
        }
      `}</style>

      <div
        className="
          max-w-7xl
          mx-auto
          w-full
          rounded-3xl
          shadow-lg
          px-6
          py-8
          mb-2
        "
        style={{
          background:
            "linear-gradient(135deg, #16283a 0%, #0d1b2a 100%)",
          border: "1px solid rgba(51,204,153,0.15)",
        }}
      >
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-5
            text-center
          "
        >
          {[
            {
              icon: HiOutlineShieldCheck,
              text: "100% Verified Partners & Listings",
            },
            {
              icon: RiRobotLine,
              text: "AI Powered Smart Search",
            },
            {
              icon: HiOutlineUserGroup,
              text: "Happy Customers Everyday",
            },
            {
              icon: GiHouse,
              text: "Grow Your Real Estate Business",
            },
            {
              icon: BiHeadphone,
              text: "Dedicated Support",
            },
          ].map(({ icon: Icon, text }, i) => (
            <div
              key={text}
              className={`
                feature-card
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                gap-3
                p-3
                rounded-2xl
                ${
                  i === 4
                    ? "col-span-2 md:col-span-1"
                    : ""
                }
              `}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.06)",
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <div
                className="
                  feature-icon-box
                  flex
                  items-center
                  justify-center
                  shrink-0
                  rounded-xl
                "
                style={{
                  width: 52,
                  height: 52,
                  background:
                    "rgba(51,204,153,0.1)",
                  border:
                    "1px solid rgba(51,204,153,0.25)",
                }}
              >
                <Icon
                  className="
                    text-2xl
                    sm:text-2xl
                    md:text-3xl
                    text-[#33cc99]
                  "
                />
              </div>

              <span
                className="
                  feature-text
                  font-semibold
                  text-sm
                  sm:text-base
                  lg:text-lg
                  text-white/80
                  transition-colors
                  duration-300
                "
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}