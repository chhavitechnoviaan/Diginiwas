// import React, { useState, useRef, useEffect } from "react";
// import axios from "../../api/axios";
// import bg from "../../assets/images/bg.webp"
// import bg2 from "../../assets/images/bg2.webp"
// import bg3 from "../../assets/images/bg3.webp"
// import { IoPlayOutline } from "react-icons/io5";

// const bgImages = [
//   bg,bg2,bg3
// ];

// const url = "https://www.youtube.com/embed/X2NVOSNBbxU"

// const HeroSection = () => {
//   const [stats, setStats] = useState({
//     leads: 0,
//     agents: 0,
//     transactions: 0,
//   });
//   const [agentData, setAgentData] = useState(null);
//     const [currentBg, setCurrentBg] = useState(0);
//   const [fade, setFade] = useState(true);
   
//   const [showVideo, setShowVideo] = useState(false);

//   useEffect(() => {
//       const interval = setInterval(() => {
//         setFade(false);
//         setTimeout(() => {
//           setCurrentBg((prev) => (prev + 1) % bgImages.length);
//           setFade(true);
//         }, 500);
//       }, 10000);
//       return () => clearInterval(interval);
//     }, []);

//   const getAgentCorner = async () => {
//     try {
//       const res = await axios.get("/cms/agentcorner");
  
//       setAgentData(res.data);
  
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   useEffect(() => {
//     getAgentCorner();
//   }, []);


//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStats((prev) => ({
//         leads: prev.leads < 10000 ? Math.min(prev.leads + 100, 10000) : 10000,

//         agents: prev.agents < 2500 ? Math.min(prev.agents + 25, 2500) : 2500,

//         transactions:
//           prev.transactions < 500 ? Math.min(prev.transactions + 5, 500) : 500,
//       }));
//     }, 20);

//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div
//       className="relative font-sans text-white bg-[#274255]  overflow-x-hidden pb-12  "
//     >
//         <div
//     className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
//     style={{
//       backgroundImage: `url(${bgImages[currentBg]})`,
//     }}
//   />

//   {/* Gradient Overlay */}
//   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c3345]/40 to-[#1c3345] lg:from-transparent lg:via-[#1c3345]/20 lg:to-[#1c3345] lg:to-[63%]" />

//       <div className="relative z-10"> 
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <section className="order-2 lg:order-1">
//             <h1
//               className="text-4xl md:text-6xl  font-bold leading-tight mb-6"
//               style={{ fontFamily: "Playfair Display, serif" }}
//             >
//               Grow Your Real
//               <br className="hidden md:block" />
//               Estate Business
//               <br className="hidden md:block" />
//               with <span className="text-[#33cc99] ">Diginiwas</span>
//             </h1>

//             <p className="text-white text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
//               AI-powered lead generation, smart CRM workflows, verified buyer
//               matching, and premium property visibility designed for Diginiwas's
//               elite real estate network.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 sm:mb-10">
//               <button className="bg-[#33cc99] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg active:scale-95 transition">
//                 Join as Agent
//               </button>

//               <button className="bg-[#274255] text-[#33cc99] flex items-center justify-center gap-2 border  px-8 py-4 rounded-lg font-semibold text-lg shadow-sm border-[#33cc99] active:scale-95 transition">
//                 Watch How it Works   
//                                 <button
//                                       onClick={() => {
//                                         setShowVideo(true);
//                                       }}
//                                       className="border cursor-pointer  bg-[#062018] border-slate-300 p-2 rounded-full"
//                                     >
//                                       <IoPlayOutline className="text-xl  fill-[#33cc99] hover:text-[#33cc99]" />
//                                     </button>
//               </button>
//             </div>

//             <div className="hidden lg:flex gap-6">
//             {(agentData?.stats?.length
//   ? agentData.stats
//   : [
//       {
//         value: "10,000+",
//         label: "Verified Leads",
//       },
//       {
//         value: "2,500+",
//         label: "Active Agents",
//       },
//       {
//         value: "₹500Cr+",
//         label: "Transactions",
//       },
//     ]
// ).map((item, index) => (
//   <StatCard
//     key={index}
//     number={item.value}
//     label={item.label}
//   />
// ))}
//             </div>
//           </section>

//           <section className="order-1 lg:order-2 relative overflow-hidden">
//             <div className="relative" style={{ perspective: "1000px" }}>
//               <div className="relative  p-2    border-white/15
//   shadow-[0_0_25px_rgba(51,204,153,0.35)] ">
//                 <img
//                   src={
//   agentData?.image?.url ||
//   "https://lh3.googleusercontent.com/aida-public/AB6AXuAYNtvd6YBkkXvhYMXlxjn6SPH208CeaItzJkZTY0DwBCBMpFPaiSHNxaIGshlUTwkYrrmoQkMTHTxvt1-8CwQ8M3AO660gEFww8E5JlcB5-D0zMhytbieByPq2eH46NFP-d3GFraSYIN3etv979zjPgAG5NIMoCapz_E9rpcdFproDestG3p0DR7FNicXSMJYlXer54z42VI4giwMR2JGOMETr26nHV2DJtXeuJl-mzSe0uoQIUy9V4RWMjh9I7pz3jCaJGMsTrQE"
// }
//                   alt="Niwas Dashboard"
//                   className="w-full h-auto rounded-[2rem] object-cover min-h-[300px]"
//                 />

//               </div>
//             </div>
//           </section>
//         </div>

//         <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
//         {(agentData?.stats?.length
//   ? agentData.stats
//   : [
//       {
//         value: `${stats.leads.toLocaleString()}+`,
//         label: "Verified Leads",
//       },
//       {
//         value: `${stats.agents.toLocaleString()}+`,
//         label: "Active Agents",
//       },
//       {
//         value: `₹${stats.transactions}Cr+`,
//         label: "Transactions",
//       },
//     ]
// ).map((item, index) => (
//   <StatCard
//     key={index}
//     number={item.value}
//     label={item.label}
//   />
// ))}
//         </div>
//       </main>
//       </div>
//         {showVideo && (
//               <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                
//                 <div className="relative w-full md:w-1/2 bg-white rounded-2xl p-4">

//                   <button
//                     onClick={() => {
//                       setShowVideo(false);
//                       setSelectedVideo("");
//                     }}
//                     className="absolute right-4 top-2 text-2xl z-50 text-white"
//                   >
//                     ✕
//                   </button>

//                   <iframe
//   className="w-full h-[250px] md:h-[450px] rounded-xl"
//   src={url}
//   title="YouTube Video"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   allowFullScreen
// />

//                 </div>

//               </div>
//             )}
//     </div>
//   );
// };

// const StatCard = ({ number, label }) => {
//   return (
//     <div className="bg-[#33cc99] p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] min-w-[180px]">
//       <p className="text-3xl font-bold">{number}</p>
//       <p className="text-xs uppercase tracking-wider text-white font-semibold mt-1">
//         {label}
//       </p>
//     </div>
//   );
// };

// export default HeroSection;




// import React, { useState, useRef, useEffect } from "react";
// import axios from "../../api/axios";
// import bg from "../../assets/images/bg.webp";
// import bg2 from "../../assets/images/bg2.webp";
// import bg3 from "../../assets/images/bg3.webp";
// import { IoPlayOutline } from "react-icons/io5";
// import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";
// import  ComingSoonVideo from  "../../components/common/ComingSoonVideo"
// import partner from "../../assets/video/partnerCorner.mp4";


// const bgImages = [bg, bg2, bg3];
// const url = "https://www.youtube.com/embed/X2NVOSNBbxU";

// const HeroSection = () => {
//   // const [showComingSoon, setShowComingSoon] = useState(false)

//   const [stats, setStats] = useState({ leads: 0, agents: 0, transactions: 0 });
//   const [agentData, setAgentData] = useState(null);
//   const [currentBg, setCurrentBg] = useState(0);
//   const [isSliderPlaying, setIsSliderPlaying] = useState(true);
//   const [showVideo, setShowVideo] = useState(false);

//   // Background Slider logic with Pause capability
//   useEffect(() => {
//     if (!isSliderPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentBg((prev) => (prev + 1) % bgImages.length);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, [isSliderPlaying]);

//   const getAgentCorner = async () => {
//     try {
//       const res = await axios.get("/cms/agentcorner");
//       setAgentData(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getAgentCorner();
//   }, []);

//   // Numbers increment simulation logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStats((prev) => ({
//         leads: prev.leads < 10000 ? Math.min(prev.leads + 100, 10000) : 10000,
//         agents: prev.agents < 2500 ? Math.min(prev.agents + 25, 2500) : 2500,
//         transactions: prev.transactions < 200 ? Math.min(prev.transactions + 4, 200) : 200,
//       }));
//     }, 20);
//     return () => clearInterval(interval);
//   }, []);

//   const handlePrevBg = () => {
//     setCurrentBg((prev) => (prev === 0 ? bgImages.length - 1 : prev - 1));
//   };

//   const handleNextBg = () => {
//     setCurrentBg((prev) => (prev + 1) % bgImages.length);
//   };

//   const finalStats = agentData?.stats?.length
//     ? agentData.stats.map((item, idx) => ({
//         value: item.value,
//         label: item.label,
//         indexId: `0${idx + 1}`
//       }))
//     : [
//         { value: `${stats.leads.toLocaleString()}+`, label: "Verified Leads", indexId: "01" },
//         { value: `${stats.agents.toLocaleString()}+`, label: "Active Agents", indexId: "02" },
//         { value: `₹${stats.transactions}Cr+`, label: "Transactions", indexId: "03" },
//       ];

//   return (
//     <div className="relative font-sans text-white bg-[#1a2e3d] overflow-x-hidden pb-16 min-h-[90vh] flex items-center">
//       {/* Background Slideshow Layer */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out z-0"
//         style={{ backgroundImage: `url(${bgImages[currentBg]})` }}
//       />

//       {/* <video
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source src={partner} type="video/mp4" />
//       </video> */}

//       {/* Modern Vignette Gradient Overlays */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#11222f]/90 via-[#1c3345]/60 to-[#11222f]/95 lg:from-[#11222f]/70 lg:via-[#1c3345]/30 lg:to-[#11222f] lg:to-[65%] z-0" />

//       <div className="relative z-10 w-full">
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left Content Column */}
//             <section className="order-2 lg:order-1 space-y-8">
//               <h1
//                 className="text-4xl md:text-[54px] font-bold leading-[1.15] tracking-tight text-white"
//                 style={{ fontFamily: "Playfair Display, serif" }}
//               >
//                 Grow Your Real <br />
//                 Estate Business <br />
//                 with <span className="text-[#33cc99] drop-shadow-[0_0_15px_rgba(51,204,153,0.2)]">Diginiwas</span>
//               </h1>

//               <p className="text-slate-200/90 text-base md:text-lg max-w-xl leading-relaxed font-normal">
//                 Diginiwas, an AI-powered lead gen CRM workflows, verified buyer
//                 matching, and premium property visibility designed for Diginiwas's
//                 elite real estate network.
//               </p>

//               {/* Dynamic Action Buttons Row */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
//                 <button className="relative group overflow-hidden bg-[#0e3a3a] text-[#33cc99] border-2 border-[#33cc99] px-7 py-3.5 rounded-xl font-bold text-base tracking-wide shadow-[0_0_20px_rgba(51,204,153,0.15)] transition-all duration-300 hover:bg-[#33cc99] hover:text-white hover:shadow-[0_0_25px_rgba(51,204,153,0.45)] active:scale-[0.98]">
//                   Join as Partner
//                 </button>

//                 <button 
//                   onClick={() => setShowVideo(true)}
//                   className="relative flex items-center justify-center gap-3 bg-[#0d2334] text-white border border-[#33cc99]/40 px-7 py-3.5 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:border-[#33cc99] hover:shadow-[0_0_20px_rgba(51,204,153,0.2)] active:scale-[0.98] group"
//                 >
//                   <span className="text-slate-200 group-hover:text-white transition-colors">Watch How it Works</span>
//                   <div className="bg-[#041a14] border border-[#33cc99]/60 p-1.5 rounded-full flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 group-hover:border-[#33cc99]">
//                     <IoPlayOutline className="text-lg text-[#33cc99] fill-[#33cc99]/20" />
//                   </div>
//                 </button>
//               </div>

//               {/* Stats Deskop Component Container */}
//               <div className="hidden lg:grid grid-cols-3 gap-5 pt-6 max-w-2xl">
//                 {finalStats.map((item, index) => (
//                   <StatCard
//                     key={index}
//                     number={item.value}
//                     label={item.label}
//                     indexId={item.indexId}
//                   />
//                 ))}
//               </div>
//             </section>

//             {/* Right Dashboard Showcasing Frame */}
//             <section className="order-1 lg:order-2 flex flex-col items-end relative">
//               <div className="w-full xl:max-w-[90%] relative rounded-[2rem] p-1.5 bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_40px_rgba(51,204,153,0.15)] overflow-hidden group">
//                 <img
//                   src={
//                     agentData?.image?.url ||
//                     "https://lh3.googleusercontent.com/aida-public/AB6AXuAYNtvd6YBkkXvhYMXlxjn6SPH208CeaItzJkZTY0DwBCBMpFPaiSHNxaIGshlUTwkYrrmoQkMTHTxvt1-8CwQ8M3AO660gEFww8E5JlcB5-D0zMhytbieByPq2eH46NFP-d3GFraSYIN3etv979zjPgAG5NIMoCapz_E9rpcdFproDestG3p0DR7FNicXSMJYlXer54z42VI4giwMR2JGOMETr26nHV2DJtXeuJl-mzSe0uoQIUy9V4RWMjh9I7pz3jCaJGMsTrQE"
//                   }
//                   alt="Niwas Premium Asset Display"
//                   className="w-full h-auto rounded-[1.85rem] object-cover min-h-[280px] md:min-h-[380px] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
//                 />
//               </div>

//               {/* Image Navigation Micro-Controls Element */}
//               <div className="mt-6 flex items-center gap-3 pr-2 select-none">
               
//                 {/* <button 
//                   onClick={() => setIsSliderPlaying(!isSliderPlaying)}
//                   className="w-12 h-12 border-2 border-[#33cc99] bg-[#0d2334] text-[#33cc99] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(51,204,153,0.3)] transition-all active:scale-95 hover:bg-[#33cc99] hover:text-white group"
//                 >
//                   {isSliderPlaying ? <FiPause className="text-base" /> : <FiPlay className="text-base ml-0.5" />}
//                 </button> */}
//               </div>
//             </section>
//           </div>

//           {/* Stats Adaptive Grid Container (Responsive Layout Viewport) */}
//           <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
//             {finalStats.map((item, index) => (
//               <StatCard
//                 key={index}
//                 number={item.value}
//                 label={item.label}
//                 indexId={item.indexId}
//               />
//             ))}
//           </div>
//         </main>
//       </div>

//       {/* Video Popup Overlay Iframe */}
//       {showVideo && (
//         // <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
//         //   <div className="relative w-full max-w-3xl bg-[#11222f] border border-white/10 rounded-2xl p-2 shadow-2xl">
//         //     <button
//         //       onClick={() => setShowVideo(false)}
//         //       className="absolute -top-12 right-0 bg-[#33cc99] text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-lg hover:bg-emerald-400 transition"
//         //     >
//         //       ✕
//         //     </button>
//         //     <div className="aspect-video w-full rounded-xl overflow-hidden">
//         //       <iframe
//         //         className="w-full h-full"
//         //         src={`${url}?autoplay=1`}
//         //         title="Diginiwas Premium Operational Overview"
//         //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         //         allowFullScreen
//         //       />
//         //     </div>
//         //   </div>
//         // </div>

//            <ComingSoonVideo
//           setShowComingSoon={setShowVideo} video={partner}
//         />
//       )}

     
       
    
//     </div>
//   );
// };

// // Premium Custom Bento Glassmorphism Stat Cards Sub-component
// const StatCard = ({ number, label, indexId }) => {
//   return (
//     <div className="relative group overflow-hidden bg-[#1c3345]/40 backdrop-blur-md border border-[#33cc99]/30 p-5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-500 hover:border-[#33cc99] hover:shadow-[0_10px_30px_rgba(51,204,153,0.15)] hover:-translate-y-1">
//       {/* Dynamic Absolute Index Badge */}
     
      
//       {/* Metric Display Text */}
//       <p className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm group-hover:text-[#33cc99] transition-colors duration-300">
//         {number}
//       </p>
      
//       {/* Identity Tag Segment */}
//       <p className="text-[11px] uppercase tracking-wider text-slate-300 font-bold mt-2 group-hover:text-white transition-colors duration-300">
//         {label}
//       </p>

//       {/* Internal Subtle Vector Linear Light Accent */}
//       <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#33cc99]/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
   
//       </div>
//   );
// };

// export default HeroSection;





import React, { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import bg from "../../assets/images/bg.webp";
import bg2 from "../../assets/images/bg2.webp";
import bg3 from "../../assets/images/bg3.webp";
import { IoPlayOutline } from "react-icons/io5";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPause,
  FiPlay,
  FiArrowRight,
} from "react-icons/fi";
import ComingSoonVideo from "../../components/common/ComingSoonVideo";


const bgImages = [bg, bg2, bg3];
const url = "https://www.youtube.com/embed/X2NVOSNBbxU";

const HeroSection = () => {
  // const [showComingSoon, setShowComingSoon] = useState(false)

  const [stats, setStats] = useState({ leads: 0, agents: 0, transactions: 0 });
  const [agentData, setAgentData] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);
  const [isSliderPlaying, setIsSliderPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  // Background Slider logic with Pause capability
  useEffect(() => {
    if (!isSliderPlaying) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isSliderPlaying]);

  const getAgentCorner = async () => {
    try {
      const res = await axios.get("/cms/agentcorner");
      setAgentData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAgentCorner();
  }, []);

  // Numbers increment simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        leads: prev.leads < 10000 ? Math.min(prev.leads + 100, 10000) : 10000,
        agents: prev.agents < 2500 ? Math.min(prev.agents + 25, 2500) : 2500,
        transactions:
          prev.transactions < 200 ? Math.min(prev.transactions + 4, 200) : 200,
      }));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handlePrevBg = () => {
    setCurrentBg((prev) => (prev === 0 ? bgImages.length - 1 : prev - 1));
  };

  const handleNextBg = () => {
    setCurrentBg((prev) => (prev + 1) % bgImages.length);
  };

  const finalStats = agentData?.stats?.length
    ? agentData.stats.map((item, idx) => ({
        value: item.value,
        label: item.label,
        indexId: `0${idx + 1}`,
      }))
    : [
        {
          value: `${stats.leads.toLocaleString()}+`,
          label: "Verified Leads",
          indexId: "01",
        },
        {
          value: `${stats.agents.toLocaleString()}+`,
          label: "Active Agents",
          indexId: "02",
        },
        {
          value: `₹${stats.transactions}Cr+`,
          label: "Transactions",
          indexId: "03",
        },
      ];

  return (
    <div className="relative font-sans text-white bg-[#1a2e3d] overflow-x-hidden pb-16 min-h-[90vh] flex items-center">
      {/* Background Slideshow Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out z-0"
        style={{ backgroundImage: `url(${bgImages[currentBg]})` }}
      />

      {/* Modern Vignette Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#11222f]/90 via-[#1c3345]/60 to-[#11222f]/95 lg:from-[#11222f]/70 lg:via-[#1c3345]/30 lg:to-[#11222f] lg:to-[65%] z-0" />

      <div className="relative z-10 w-full">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content Column */}
            <section className="order-2 lg:order-1 space-y-8">
              <h1
                className="text-4xl md:text-[54px] font-bold leading-[1.15] tracking-tight text-white"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Grow Your Real Estate<br />
                Business 
                with{" "}
                <span className="text-[#33cc99] drop-shadow-[0_0_15px_rgba(51,204,153,0.2)]">
                  Diginiwas
                </span>
              </h1>

              <p className="text-slate-200/90 text-base md:text-lg max-w-xl leading-relaxed font-normal">
                Diginiwas, an AI-powered lead gen CRM workflows, verified buyer
                matching, and premium property visibility designed for
                Diginiwas's elite real estate network.
              </p>

              {/* Dynamic Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* <button className="relative group overflow-hidden bg-[#0e3a3a] text-[#33cc99] border-2 border-[#33cc99] px-7 py-3.5 rounded-xl font-bold text-base tracking-wide shadow-[0_0_20px_rgba(51,204,153,0.15)] transition-all duration-300 hover:bg-[#33cc99] hover:text-white hover:shadow-[0_0_25px_rgba(51,204,153,0.45)] active:scale-[0.98]">
                  Join as Partner
                </button> */}
                <button
                  onClick={() =>
                    window.open("https://forms.gle/zamAV83SH93gtkE77", "_blank")
                  }
                  className="relative group overflow-hidden bg-[#0e3a3a] text-[#33cc99] border-2 border-[#33cc99] px-8 py-3.5 rounded-xl font-bold text-base tracking-wide shadow-[0_0_20px_rgba(51,204,153,0.15)] transition-all duration-300 hover:bg-[#33cc99] hover:text-white hover:shadow-[0_0_25px_rgba(51,204,153,0.45)] active:scale-[0.98]"
                >
                  Join as Partner 
                </button>
                <button
                  onClick={() => setShowVideo(true)}
                  className="relative flex items-center justify-center gap-3 bg-[#0d2334] text-white border border-[#33cc99]/40 px-7 py-3.5 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:border-[#33cc99] hover:shadow-[0_0_20px_rgba(51,204,153,0.2)] active:scale-[0.98] group"
                >
                  <span className="text-slate-200 group-hover:text-white transition-colors">
                    Watch How it Works
                  </span>
                  <div className="bg-[#041a14] border border-[#33cc99]/60 p-1.5 rounded-full flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 group-hover:border-[#33cc99]">
                    <IoPlayOutline className="text-lg text-[#33cc99] fill-[#33cc99]/20" />
                  </div>
                </button>
              </div>

              {/* Stats Deskop Component Container */}
              <div className="hidden lg:grid grid-cols-3 gap-5 pt-6 max-w-2xl">
                {finalStats.map((item, index) => (
                  <StatCard
                    key={index}
                    number={item.value}
                    label={item.label}
                    indexId={item.indexId}
                  />
                ))}
              </div>
            </section>

            {/* Right Dashboard Showcasing Frame */}
            <section className="order-1 lg:order-2 flex flex-col items-end relative">
              <div className="w-full xl:max-w-[90%] relative rounded-[2rem] p-1.5 bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_40px_rgba(51,204,153,0.15)] overflow-hidden group">
                <img
                  src={
                    agentData?.image?.url ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAYNtvd6YBkkXvhYMXlxjn6SPH208CeaItzJkZTY0DwBCBMpFPaiSHNxaIGshlUTwkYrrmoQkMTHTxvt1-8CwQ8M3AO660gEFww8E5JlcB5-D0zMhytbieByPq2eH46NFP-d3GFraSYIN3etv979zjPgAG5NIMoCapz_E9rpcdFproDestG3p0DR7FNicXSMJYlXer54z42VI4giwMR2JGOMETr26nHV2DJtXeuJl-mzSe0uoQIUy9V4RWMjh9I7pz3jCaJGMsTrQE"
                  }
                  alt="Niwas Premium Asset Display"
                  className="w-full h-auto rounded-[1.85rem] object-cover min-h-[280px] md:min-h-[380px] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Image Navigation Micro-Controls Element */}
              <div className="mt-6 flex items-center gap-3 pr-2 select-none">
               

                {/* <button 
                  onClick={() => setIsSliderPlaying(!isSliderPlaying)}
                  className="w-12 h-12 border-2 border-[#33cc99] bg-[#0d2334] text-[#33cc99] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(51,204,153,0.3)] transition-all active:scale-95 hover:bg-[#33cc99] hover:text-white group"
                >
                  {isSliderPlaying ? <FiPause className="text-base" /> : <FiPlay className="text-base ml-0.5" />}
                </button> */}

              
              </div>
            </section>
          </div>

          {/* Stats Adaptive Grid Container (Responsive Layout Viewport) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {finalStats.map((item, index) => (
              <StatCard
                key={index}
                number={item.value}
                label={item.label}
                indexId={item.indexId}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Video Popup Overlay Iframe */}
      {showVideo && (
        // <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        //   <div className="relative w-full max-w-3xl bg-[#11222f] border border-white/10 rounded-2xl p-2 shadow-2xl">
        //     <button
        //       onClick={() => setShowVideo(false)}
        //       className="absolute -top-12 right-0 bg-[#33cc99] text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-lg hover:bg-emerald-400 transition"
        //     >
        //       ✕
        //     </button>
        //     <div className="aspect-video w-full rounded-xl overflow-hidden">
        //       <iframe
        //         className="w-full h-full"
        //         src={${url}?autoplay=1}
        //         title="Diginiwas Premium Operational Overview"
        //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //         allowFullScreen
        //       />
        //     </div>
        //   </div>
        // </div>

        <ComingSoonVideo setShowComingSoon={setShowVideo} video={import.meta.env.VITE_PARTNER} />
      )}
    </div>
  );
};

// Premium Custom Bento Glassmorphism Stat Cards Sub-component
const StatCard = ({ number, label, indexId }) => {
  return (
    <div className="relative group overflow-hidden bg-[#1c3345]/40 backdrop-blur-md border border-[#33cc99]/30 p-5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-500 hover:border-[#33cc99] hover:shadow-[0_10px_30px_rgba(51,204,153,0.15)] hover:-translate-y-1">
     

      {/* Metric Display Text */}
      <p className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm group-hover:text-[#33cc99] transition-colors duration-300">
        {number}
      </p>

      {/* Identity Tag Segment */}
      <p className="text-[11px] uppercase tracking-wider text-slate-300 font-bold mt-2 group-hover:text-white transition-colors duration-300">
        {label}
      </p>

      {/* Internal Subtle Vector Linear Light Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#33cc99]/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </div>
  );
};

export default HeroSection;