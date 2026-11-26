// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";

// const dummyData = {
//   topTitle: "THE NETWORK",

//   heading: "Voices of Top Agents",

//   cards: [
//     {
//       name: "Vikram Singh",

//       designation: "LUDHIANA LUXURY ESTATES",

//       image: {
//         url:
//           "https://lh3.googleusercontent.com/aida-public/AB6AXuC7y05-0B-r5jIejyFwqDlFNzr-e5bXk8d_oUUewyLbvy5orJhAvGFD_pZsCa_ufe-GRBzaxenMlkquNGSesSFPUiO-XhkolrQkaPr_szXNTwEbsK5M4moNSFtOM4zFWmwlErTJO6OTIMxbLcTNw785N_ewytEhlLx0rqfSdqE60rIxtWo_phuYUWbSVeH3t_DRACDaYWgCg3fV5OPqGOtWcHATaMdjn0ODuu6DenEQFTvwwUpXt2eP-9XB42jze4VouoxW4ZhEMsk",
//       },

//       review:
//         "Niwas AI didn't just give me leads; it gave me the intelligence to close the right ones. My transaction volume doubled in six months.",
//     },

    
//   ],
// };

// const NetworkSection = () => {
//   const [networkData, setNetworkData] = useState(dummyData);

//   const getAgentNetwork = async () => {
//     try {
  
//       const res = await axios.get("/cms/agent-network");
  
//       if (res.data) {
  
//         setNetworkData({
//           topTitle:
//             res.data.topTitle || dummyData.topTitle,
  
//           heading:
//             res.data.heading || dummyData.heading,
  
//           cards:
//             res.data.cards?.length
//               ? res.data.cards
//               : dummyData.cards,
//         });
  
//       }
  
//     } catch (err) {
  
//       console.log(err);
  
//       setNetworkData(dummyData);
  
//     }
//   };
  
//   useEffect(() => {
  
//     getAgentNetwork();
  
//   }, []);
//   return (
//     <section className="bg-[#f8fafb] py-20 sm:py-32 px-4 md:px-10 lg:px-16">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16 space-y-4">
//           <span className="block text-[#3f6653] uppercase tracking-[0.2em] text-xs font-bold">
//           {networkData.topTitle}
//           </span>

//           <h2
//             className="max-w-2xl mx-auto text-[#274255] text-4xl md:text-5xl font-semibold"
//             style={{
//               fontFamily: "'Source Serif 4', serif",
//             }}
//           >
//            {networkData.heading}
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {networkData.cards.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white border border-[#c3c7cb] p-10 md:p-14 rounded-[40px] shadow-[0_24px_48px_rgba(13,38,51,0.08)] flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300"
//             >
//               <div className="relative w-28 h-28 mb-8">
//                 <div className="absolute inset-0 rounded-full border-2 border-[#beead1] p-1">
//                   <img
//                    src={item.image?.url} 
//                     alt={item.name}
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 </div>
//               </div>

//               <blockquote className="mb-10">
//                 <p
//                   className="italic text-[#42474b] font-medium leading-relaxed text-lg md:text-2xl"
//                   style={{
//                     fontFamily: "'Source Serif 4', serif",
//                   }}
//                 >
//                   "{item.review}"
//                 </p>
//               </blockquote>

//               <div className="space-y-1">
//                 <p className="text-[#274255] font-bold text-xl">
//                   {item.name}
//                 </p>

//                 <p className="text-[#73787c] uppercase tracking-wider text-xs">
//                 {item.designation}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NetworkSection;







// import React from "react";
// import { useEffect, useState, useRef } from "react";
// import axios from "../../api/axios";
// import { motion, useInView } from "framer-motion";

// const dummyData = {
//   topTitle: "THE NETWORK",
//   heading: "Voices of Top Agents",
//   cards: [
//     {
//       name: "Vikram Singh",
//       designation: "LUDHIANA LUXURY ESTATES",
//       image: {
//         url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
//       },
//       review:
//         "Niwas AI didn't just give me leads; it gave me the intelligence to close the right ones. My transaction volume doubled in six months.",
//     },
//     {
//       name: "Ananya Sharma",
//       designation: "MALABAR HILLS REALTORS",
//       image: {
//         url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
//       },
//       review:
//         "The digital asset ecosystem here has completely changed our conversion metrics. Highly premium and predictable results.",
//     },
//     {
//       name: "Sarah Chen",
//       designation: "EAST COAST REALTORS",
//       image: {
//         url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
//       },
//       review:
//         "Excellent promotion quality and absolute predictability. Our scaling and network connections have grown multifold.",
//     },
//   ],
// };

// const NetworkSection = () => {
//   const [networkData, setNetworkData] = useState(dummyData);
//   const containerRef = useRef(null);
//   const isInView = useInView(containerRef, { once: true, amount: 0.1 });

//   const getAgentNetwork = async () => {
//     try {
//       const res = await axios.get("/cms/agent-network");
//       if (res.data) {
//         setNetworkData({
//           topTitle: res.data.topTitle || dummyData.topTitle,
//           heading: res.data.heading || dummyData.heading,
//           cards: res.data.cards?.length ? res.data.cards : dummyData.cards,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       setNetworkData(dummyData);
//     }
//   };

//   useEffect(() => {
//     getAgentNetwork();
//   }, []);

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: { staggerChildren: 0.2 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.85, y: 30 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 70, damping: 16 }
//     }
//   };

//   return (
//     <section ref={containerRef} className="relative w-full bg-slate-50/50 py-24 sm:py-32 px-4 md:px-8 lg:px-12 overflow-hidden">
      
//       {/* Background Subtle Mesh */}
//       <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#16836E_1px,transparent_1px),linear-gradient(to_bottom,#16836E_1px,transparent_1px)] bg-[size:30px_30px]" />

//       <div className="relative z-10 max-w-7xl mx-auto">
        
//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-20 space-y-3"
//         >
//           <span className="text-[#16836E] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block">
//             {networkData.topTitle}
//           </span>
//           <h2
//             className="max-w-2xl mx-auto text-[#1A2E40] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
//             style={{ fontFamily: "'Source Serif 4', serif" }}
//           >
//             {networkData.heading}
//           </h2>
//         </motion.div>

//         {/* 1-Line Flex Row Grid System for up to 3 cards */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="flex flex-row flex-wrap xl:flex-nowrap justify-center items-center gap-12 lg:gap-16 max-w-7xl mx-auto"
//         >
//           {networkData.cards.slice(0, 3).map((item, index) => (
//             <div key={index} className="relative group w-[340px] h-[340px] sm:w-[390px] sm:h-[390px] md:w-[410px] md:h-[410px] shrink-0">
              
//               {/* LEFT SHIFTED OVERLAPPING GRADIENT BACKGROUND CIRCLE */}
//               <div className="absolute top-0 -left-6 sm:-left-10 md:-left-12 w-full h-full rounded-full bg-gradient-to-br from-[#16836E]/80 via-[#279d85]/60 to-[#beead1]/40 blur-[2px] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-x-3 -z-10 shadow-[inner_0_4px_12px_rgba(255,255,255,0.3)]" />
              
//               {/* Decorative Subtle Counter Ring */}
//               <div className="absolute inset-0 rounded-full border border-slate-200/60 pointer-events-none -z-10" />

//               {/* MAIN CONTENT CARD (With soft gradient backdrop) */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover={{ y: -4 }}
//                 className="relative w-full h-full rounded-full bg-gradient-to-b from-white via-white to-teal-50/20 border border-white/80 p-6 sm:p-10 flex flex-col justify-center items-center text-center shadow-[6px_15px_35px_rgba(13,38,51,0.07)] overflow-hidden z-10 transition-shadow duration-500 group-hover:shadow-[10px_25px_50px_rgba(22,131,110,0.12)]"
//               >
//                 {/* Floating Index/Counter Asset */}
//                 <div className="absolute top-6 right-12 sm:right-16 text-xs font-bold tracking-widest text-[#16836E]/40 bg-slate-100 px-2 py-0.5 rounded-full">
//                   0{index + 1}
//                 </div>

//                 {/* Profile Avatar Container */}
//                 <div className="relative mb-3 sm:mb-4 flex-shrink-0">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#16836E] to-[#beead1]">
//                     <img
//                       src={item.image?.url}
//                       alt={item.name}
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   </div>
//                   {/* Styled Quote Mark Icon */}
//                   <div className="absolute -bottom-1 -right-1 bg-[#16836E] text-white w-6 h-6 rounded-full flex items-center justify-center font-serif text-xs shadow-md select-none">
//                     “
//                   </div>
//                 </div>

//                 {/* Review Text Area */}
//                 <div className="max-w-[260px] sm:max-w-[290px] mb-3 sm:mb-4">
//                   <p
//                     className="text-[#2D4356] font-medium leading-relaxed text-xs sm:text-sm md:text-[14px] line-clamp-4 group-hover:line-clamp-none transition-all duration-300"
//                     style={{ fontFamily: "'Source Serif 4', serif" }}
//                   >
//                     "{item.review}"
//                   </p>
//                 </div>

//                 {/* Divider Accent */}
//                 <div className="w-10 h-[1.5px] bg-[#16836E]/20 mb-2 sm:mb-3 group-hover:w-16 transition-all duration-500" />

//                 {/* Metadata Row */}
//                 <div className="flex flex-col items-center">
//                   <p className="text-[#1A2E40] font-extrabold text-sm sm:text-base tracking-tight group-hover:text-[#16836E] transition-colors duration-300">
//                     {item.name}
//                   </p>
//                   <p className="text-[#64748B] font-bold text-[9px] uppercase tracking-[0.1em] mt-0.5">
//                     {item.designation}
//                   </p>
//                 </div>

//               </motion.div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default NetworkSection;





import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { motion, useInView } from "framer-motion";
import { Quote, Star, Sparkles, Building2, TrendingUp } from "lucide-react";

const dummyData = {
  topTitle: "THE NETWORK",
  heading: "Voices of Top Partners",
  subheading:
    "Real numbers, real closings. Here's what partners across the country say after switching to Niwas AI.",
  stats: [
    { label: "Active Partners", value: "500+" },
    { label: "Avg. Rating", value: "4.9" },
    { label: "Deals Accelerated", value: "12k+" },
  ],
  cards: [
    {
      name: "Vikram Singh",
      designation: "Ludhiana Luxury Estates",
      rating: 5,
      image: {
        url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
      },
      review:
        "Niwas AI didn't just give me leads; it gave me the intelligence to close the right ones. My transaction volume doubled in six months.",
    },
    {
      name: "Ananya Sharma",
      designation: "Malabar Hills Realtors",
      rating: 5,
      image: {
        url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      },
      review:
        "The digital asset ecosystem here has completely changed our conversion metrics. Highly premium and predictable results.",
    },
    {
      name: "Sarah Chen",
      designation: "East Coast Realtors",
      rating: 5,
      image: {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      },
      review:
        "Excellent promotion quality and absolute predictability. Our scaling and network connections have grown multifold.",
    },
  ],
};

const NetworkSection = () => {
  const [networkData, setNetworkData] = useState(dummyData);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const getAgentNetwork = async () => {
    try {
      const res = await axios.get("/cms/agent-network");
      if (res.data) {
        setNetworkData({
          topTitle: res.data.topTitle || dummyData.topTitle,
          heading: res.data.heading || dummyData.heading,
          subheading: res.data.subheading || dummyData.subheading,
          stats: res.data.stats?.length ? res.data.stats : dummyData.stats,
          cards: res.data.cards?.length ? res.data.cards : dummyData.cards,
        });
      }
    } catch (err) {
      console.log(err);
      setNetworkData(dummyData);
    }
  };

  useEffect(() => {
    getAgentNetwork();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 18 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#274255] py-14 sm:py-16 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[26rem] h-[26rem] rounded-full bg-[#16836E] blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -bottom-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#C9A24B] blur-[130px] pointer-events-none"
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#BEEAD1_1px,transparent_1px),linear-gradient(to_bottom,#BEEAD1_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-[#BEEAD1]/20 rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" strokeWidth={2} />
            <span className="text-[#BEEAD1] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
              {networkData.topTitle}
            </span>
          </div>

          <h2
            className="max-w-2xl text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            {networkData.heading}
          </h2>

          <p className="max-w-lg mt-4 text-[#9FC2B8] text-sm sm:text-base leading-relaxed">
            {networkData.subheading}
          </p>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-9">
            {networkData.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className="text-2xl sm:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Source Serif 4', serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#7FA79B] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {networkData.cards.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-xl p-7 sm:p-8 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-[#C9A24B]/30 hover:shadow-[0_25px_60px_rgba(22,131,110,0.25)]"
            >
              <div className="flex items-start justify-between mb-6">
                {/* <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#16836E] to-[#0B4A3F] flex items-center justify-center shadow-lg shadow-[#16836E]/20">
                  <Quote className="w-5 h-5 text-[#BEEAD1]" strokeWidth={2} fill="currentColor" />
                </div> */}
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#5CE6B8] via-[#33CC99] to-[#1FA87A] flex items-center justify-center shadow-lg shadow-[#33CC99]/20">
                <Quote className="w-5 h-5 text-white" strokeWidth={2} fill="currentColor" />
              </div>
                <Building2 className="w-5 h-5 text-white/10 group-hover:text-[#C9A24B]/30 transition-colors duration-500" strokeWidth={1.5} />
              </div>

              <p
                className="text-[#DCEEE6] font-medium leading-relaxed text-sm sm:text-[15px] mb-6 line-clamp-5"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                "{item.review}"
              </p>

              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < (item.rating || 5) ? "text-[#C9A24B]" : "text-white/15"
                    }`}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#C9A24B] to-[#16836E] flex-shrink-0">
                  <img
                    src={item.image?.url}
                    alt={item.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm truncate">{item.name}</p>
                  <p className="text-[#7FA79B] font-semibold text-[10px] uppercase tracking-[0.1em] truncate">
                    {item.designation}
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ width: "2.5rem" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16836E] via-[#C9A24B] to-[#16836E] rounded-full"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-12 sm:mt-16"
        >
          <TrendingUp className="w-4 h-4 text-[#C9A24B]" strokeWidth={2} />
          <span className="text-[#9FC2B8] text-xs sm:text-sm font-medium tracking-wide">
            Growth partner can see, before they sign a single deal
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkSection;

















// import React from "react";
// import { useEffect, useState, useRef } from "react";
// import axios from "../../api/axios";
// import { motion, useInView } from "framer-motion";

// const dummyData = {
//   topTitle: "THE NETWORK",
//   heading: "Voices of Top Agents",
//   cards: [
//     {
//       name: "Vikram Singh",
//       designation: "LUDHIANA LUXURY ESTATES",
//       image: {
//         url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
//       },
//       review:
//         "Niwas AI didn't just give me leads; it gave me the intelligence to close the right ones. My transaction volume doubled in six months.",
//     },
//     {
//       name: "Rajesh Thapar",
//       designation: "MALABAR HILLS REALTORS",
//       image: {
//         url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
//       },
//       review:
//         "The digital asset ecosystem here has completely changed our conversion metrics. Highly premium and predictable results.",
//     },
//   ],
// };

// const NetworkSection = () => {
//   const [networkData, setNetworkData] = useState(dummyData);
//   const containerRef = useRef(null);
//   const isInView = useInView(containerRef, { once: true, amount: 0.1 });

//   const getAgentNetwork = async () => {
//     try {
//       const res = await axios.get("/cms/agent-network");
//       if (res.data) {
//         setNetworkData({
//           topTitle: res.data.topTitle || dummyData.topTitle,
//           heading: res.data.heading || dummyData.heading,
//           cards: res.data.cards?.length ? res.data.cards : dummyData.cards,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       setNetworkData(dummyData);
//     }
//   };

//   useEffect(() => {
//     getAgentNetwork();
//   }, []);

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: { staggerChildren: 0.3 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 40 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 60, damping: 15 }
//     }
//   };

//   return (
//     <section ref={containerRef} className="relative w-full bg-white py-24 sm:py-36 px-4 md:px-10 lg:px-16 overflow-hidden">
      
//       {/* Background Decorative Grid for Texture */}
//       <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.04]">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#16836E_1px,transparent_1px),linear-gradient(to_bottom,#16836E_1px,transparent_1px)] bg-[size:40px_40px]" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto">
        
//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-24 space-y-4"
//         >
//           <span className="text-[#16836E] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase block drop-shadow-sm">
//             {networkData.topTitle}
//           </span>

//           <h2
//             className="max-w-2xl mx-auto text-[#1A2E40] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight"
//             style={{ fontFamily: "'Source Serif 4', serif" }}
//           >
//             {networkData.heading}
//           </h2>
//         </motion.div>

//         {/* Circular Cards Flex/Grid Wrapper */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="flex flex-wrap justify-center items-center gap-16 lg:gap-24 max-w-6xl mx-auto"
//         >
//           {networkData.cards.map((item, index) => (
//             <div key={index} className="relative group">
              
//               {/* BACKDROP GRADIENT CIRCLE (Always visible background glow) */}
//               <div className="absolute inset-[-15px] rounded-full bg-gradient-to-tr from-[#16836E]/20 via-[#beead1]/40 to-[#243B53]/10 blur-xl group-hover:blur-2xl opacity-80 group-hover:scale-110 transition-all duration-700 -z-10" />

//               {/* ROTATING GRADIENT BORDER RING */}
//               <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#16836E] via-[#beead1] to-[#243B53] opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000 -z-10" />

//               {/* MAIN CIRCULAR CARD */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover={{ scale: 1.03 }}
//                 className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-white border border-slate-100 p-8 sm:p-12 flex flex-col justify-center items-center text-center shadow-[0_20px_50px_rgba(13,38,51,0.06)] overflow-hidden z-10 transition-shadow duration-500 group-hover:shadow-[0_30px_60px_rgba(22,131,110,0.15)]"
//               >
//                 {/* Subtle Inner Mesh Pattern inside the circle */}
//                 <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#16836E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-full" />
                
//                 {/* Micro-Interaction Overlay Mask */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-[#beead1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full" />

//                 {/* Profile Avatar (Small Circle inside Card) */}
//                 <div className="relative mb-4 sm:mb-6 flex-shrink-0">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#16836E] to-[#beead1] shadow-inner">
//                     <img
//                       src={item.image?.url}
//                       alt={item.name}
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   </div>
//                   {/* Floating Quote Icon Asset */}
//                   <div className="absolute -bottom-1 -right-1 bg-[#16836E] text-white w-6 h-6 rounded-full flex items-center justify-center font-serif text-sm shadow-md select-none">
//                     “
//                   </div>
//                 </div>

//                 {/* Review Text Block */}
//                 <div className="max-w-[280px] sm:max-w-[320px] mb-4 sm:mb-6 overflow-hidden">
//                   <p
//                     className="italic text-[#2D4356] font-medium leading-relaxed text-sm sm:text-base md:text-[17px] line-clamp-4 group-hover:line-clamp-none transition-all duration-300"
//                     style={{ fontFamily: "'Source Serif 4', serif" }}
//                   >
//                     {item.review}
//                   </p>
//                 </div>

//                 {/* Divider Line */}
//                 <div className="w-12 h-[2px] bg-[#16836E]/20 mb-3 group-hover:w-20 transition-all duration-500" />

//                 {/* Metadata Row */}
//                 <div className="flex flex-col items-center">
//                   <p className="text-[#1A2E40] font-extrabold text-base sm:text-lg tracking-tight group-hover:text-[#16836E] transition-colors duration-300">
//                     {item.name}
//                   </p>
//                   <p className="text-[#64748B] font-bold text-[10px] uppercase tracking-[0.1em] mt-0.5">
//                     {item.designation}
//                   </p>
//                 </div>

//               </motion.div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default NetworkSection;