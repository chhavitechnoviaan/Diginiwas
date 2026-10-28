// import { Check } from "lucide-react";
// import { FaDownload, FaChartLine } from "react-icons/fa";
// import axios from "../../api/axios";
// import { useEffect, useState } from "react";

// const dummyPlans = [
//   {
//     title: "Starter Agent",
//     description: "For individuals beginning their luxury real estate journey.",
//     price: "₹2,499",
//     duration: "/month",
//     buttonText: "Get Started",
//     featured: false,
//     features: [
//       "Up to 5 Premium Listings",
//       "Standard CRM Access",
//       "10 Verified Leads / Mo",
//     ],
//   },
//   {
//     title: "Pro Agent",
//     description: "Full-suite AI tools for the career-driven professional.",
//     price: "₹5,999",
//     duration: "/month",
//     buttonText: "Start 14-Day Free Trial",
//     featured: true,
//     features: [
//       "Unlimited Listings",
//       "Advanced AI Intent Scoring",
//       "50 Verified Leads / Mo",
//       "Priority Listing Support",
//     ],
//   },
//   {
//     title: "Elite Partner",
//     description: "Bespoke solutions for established agencies and brokerages.",
//     price: "Custom Pricing",
//     duration: "",
//     buttonText: "Contact Sales",
//     featured: false,
//     features: [
//       "Multi-Agent CRM Console",
//       "Featured Network Exclusivity",
//       "White-label Property Portal",
//       "Dedicated Account Manager",
//     ],
//   },
// ];

// const dummyCityData = [
//   {
//     name: "Chandigarh",
//     // count: "850+",
//     dotColor: "bg-yellow-300",
//     textColor: "text-yellow-300",
//   },
//   {
//     name: "Mohali",
//     // count: "600+",
//     dotColor: "bg-green-300",
//     textColor: "text-green-300",
//   },
//   {
//     name: "Ludhiana",
//     // count: "450+",
//     dotColor: "bg-slate-300",
//     textColor: "text-slate-300",
//   },
//   {
//     name: "Jalandhar",
//     // count: "300+",
//     dotColor: "bg-slate-500",
//     textColor: "text-slate-400",
//   },
// ];

 
// const PricingPlans = () => {
//   const [networkData, setNetworkData] = useState({
//     headingLine1: "Explore the Agent",
//     headingHighlight: "Network Density",
//     description:
//       "Our network is expanding rapidly across Punjab's major hubs. Join the movement and dominate your local market with Niwas AI's local intelligence.",
//     cities: dummyCityData,
//   });
  
//   const [planData, setPlanData] = useState({
//     topTitle: "Partnership Plans",
//     heading: "Choose Your Growth Path",
//     plans: dummyPlans,
//   });

//   const getNetworkDensity = async () => {
//     try {
  
//       const res = await axios.get("/cms/network-density");
  
//       setNetworkData({
//         headingLine1:
//           res.data.headingLine1 ||
//           "Explore the Agent",
  
//         headingHighlight:
//           res.data.headingHighlight ||
//           "Network Density",
  
//         description:
//           res.data.description ||
//           networkData.description,
  
//         cities:
//           res.data.cities?.length
//             ? res.data.cities
//             : dummyCityData,
//       });
  
//     } catch (err) {
  
//       console.log(err);
  
//     }
//   };

//   const getPlanSection = async () => {
//     try {
  
//       const res = await axios.get("/cms/plan-section");
  
//       setPlanData({
//         topTitle:
//           res.data.topTitle ||
//           "Partnership Plans",
  
//         heading:
//           res.data.heading ||
//           "Choose Your Growth Path",
  
//         plans:
//           res.data.plans?.length
//             ? res.data.plans
//             : dummyPlans,
//       });
  
//     } catch (err) {
  
//       console.log(err);
  
//     }
//   };

//   useEffect(() => {

//     getNetworkDensity();
  
//     getPlanSection();
  
//   }, []);
//   return (
//     <div>
//       <NetworkDensity networkData={networkData} />
//       <section className="bg-slate-50 py-20 sm:py-32 px-4 sm:px-6  ">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center sm:mb-16 mb-8">
//             <p className="text-[#4d8c7a] font-bold tracking-[4px] text-xs uppercase mb-3">
//             {planData.topTitle}
//             </p>

//             <h2
//               className="text-4xl md:text-5xl text-[#0d2633]"
//               style={{
//                 fontFamily: "'DM Serif Display', serif",
//               }}
//             >
//               {planData.heading}
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-4 sm:mx-0 sm:gap-5 lg:gap-10 pt-8">
//             {planData.plans.map((plan, index) => (
//               <div
//                 key={index}
//                 className={`relative rounded-2xl p-8 flex flex-col border-2 hover:border-[#0d2633] shadow-xl duration-500 transition-all hover:scale-105 justify-between bg-white ${
//                   plan.buttonType === "filled"
//                     ? ""
//                     : "border border-slate-100 shadow-sm"
//                 }`}
//               >
//                 {plan.badge && (
//                   <div className="absolute left-1/2 -translate-x-1/2 -top-4 bg-[#0d2633] text-white text-[10px] font-bold uppercase px-4 py-1 rounded-md tracking-wide">
//                     {plan.badge}
//                   </div>
//                 )}

//                 <div>
//                   <h3
//                     className="text-2xl text-[#0d2633] mb-2"
//                     style={{
//                       fontFamily: "'DM Serif Display', serif",
//                     }}
//                   >
//                     {plan.title}
//                   </h3>

//                   <p className="text-slate-500 text-sm leading-relaxed mb-8">
//                     {plan.description}
//                   </p>

//                   <div className="mb-8">
//                     <span className="text-3xl font-bold text-[#0d2633]">
//                       {plan.price}
//                     </span>

//                     {plan.duration && (
//                       <span className="text-slate-400 text-sm ml-1">
//                         {plan.duration}
//                       </span>
//                     )}
//                   </div>

//                   <ul className="space-y-4 mb-8">
//                     {plan.features.map((feature, featureIndex) => (
//                       <li
//                         key={featureIndex}
//                         className="flex items-start text-sm text-slate-600"
//                       >
//                         <span className="w-4 h-4 rounded-full border border-[#4d8c7a] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                           <Check size={10} className="text-[#4d8c7a]" />
//                         </span>

//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <button
//                   className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
//                     plan.badge
//                       ? "bg-[#274255]  text-white hover:opacity-90"
//                       : "border border-[#274255] text-[#274255] hover:bg-slate-50"
//                   }`}
//                 >
//                   {plan.buttonText}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// function NetworkDensity({ networkData }) {
//   return (
//     <section className="bg-[#274255] text-white sm:min-h-screen py-16 px-4 md:px-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="relative overflow-hidden rounded-[32px] border border-white/10 backdrop-blur-xl bg-white/[0.03] p-8 md:p-12 shadow-2xl">
//             <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-500/20 blur-[80px] rounded-full" />

//             <h2
//               className="text-4xl md:text-6xl leading-tight mb-6 relative z-10"
//               style={{ fontFamily: "'Source Serif 4', serif" }}
//             >
//              {networkData.headingLine1}
//               <br />
//               <span className="text-yellow-300">{networkData.headingHighlight}</span>
//             </h2>

//             <p className="text-slate-300 text-lg max-w-xl mb-8 relative z-10">
//             {networkData.description}
//             </p>

//             {/* <div className="flex flex-wrap gap-3 mb-8 relative z-10">
//             {networkData.cities.map((city, index) => {
//   const colors = [
//     {
//       dot: "bg-yellow-300",
//       text: "text-yellow-300",
//     },
//     {
//       dot: "bg-green-300",
//       text: "text-green-300",
//     },
//     {
//       dot: "bg-slate-300",
//       text: "text-slate-300",
//     },
//     {
//       dot: "bg-slate-500",
//       text: "text-slate-400",
//     },
//   ];

//   const color = colors[index % colors.length];

//   return (
//     <div
//       key={city.name}
//       className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05]"
//     >
//       <span className={`w-2 h-2 rounded-full ${color.dot}`} />

//       <span className={`text-xs font-semibold ${color.text}`}>
//         {city.name}
//       </span>

//       <span className="text-white font-semibold text-xs">
//         {city.count}
//       </span>
//     </div>
//   );
// })}
//             </div> */}

              
//           </div>

//           <div className="relative hidden md:block h-[300px] md:h-[500px]">
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
//               <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-spin [animation-duration:60s]" />
//               <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-spin [animation-duration:100s] [animation-direction:reverse]" />
//             </div>

//             <div className="relative w-full h-full">
//               <div className="absolute top-[20%] left-[60%] group">
//                 <div className="w-6 h-6 rounded-full bg-yellow-300 shadow-[0_0_30px_rgba(255,224,136,0.5)] animate-pulse" />
                
//               </div>

//               <div className="absolute top-[35%] left-[55%] group">
//                 <div className="w-4 h-4 rounded-full bg-green-300 shadow-[0_0_20px_rgba(193,236,212,0.4)] animate-pulse" />
//                 <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur px-3 py-1 rounded-lg text-xs border border-white/20 whitespace-nowrap">
                 
//                 </div>
//               </div>

//               <div className="absolute top-[50%] left-[30%] group">
//                 <div className="w-5 h-5 rounded-full bg-slate-300 shadow-[0_0_25px_rgba(177,202,219,0.4)] animate-pulse" />
//                 <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur px-3 py-1 rounded-lg text-xs border border-white/20 whitespace-nowrap">
                   
//                 </div>
//               </div>

//               <div className="absolute top-[69%] left-[25%]">
//                 <div className="w-3 h-3 rounded-full bg-slate-500 shadow-[0_0_15px_rgba(118,142,158,0.3)] animate-pulse" />
//               </div>

//               <svg
//                 className="absolute left-0 inset-0 w-full h-full opacity-20"
//                 preserveAspectRatio="none"
//                 aria-hidden="true"
//               >
//                 <line
//                   x1="60%"
//                   y1="20%"
//                   x2="55%"
//                   y2="35%"
//                   stroke="white"
//                   strokeDasharray="4 4"
//                   strokeWidth="1"
//                 />
//                 <line
//                   x1="55%"
//                   y1="35%"
//                   x2="30%"
//                   y2="50%"
//                   stroke="white"
//                   strokeDasharray="4 4"
//                   strokeWidth="1"
//                 />
//                 <line
//                   x1="30%"
//                   y1="50%"
//                   x2="24%"
//                   y2="70%"
//                   stroke="white"
//                   strokeDasharray="4 4"
//                   strokeWidth="1"
//                 />
//               </svg>

             
//             </div>
//           </div>
//         </div>

   
//       </div>
//     </section>
//   );
// }

// export default PricingPlans;




import { Check } from "lucide-react";
import { FaDownload, FaChartLine } from "react-icons/fa";
import axios from "../../api/axios";
import { useEffect, useRef, useState } from "react";

import isoHouseImg from "../../assets/images/demo.webp";

const dummyPlans = [
  {
    title: "Starter Partner",
    description: "For individuals beginning their luxury real estate journey.",
    price: "₹2,499",
    duration: "/month",
    buttonText: "Get Started",
    featured: false,
    features: [
      "Up to 5 Premium Listings",
      "Standard CRM Access",
      "10 Verified Leads / Mo",
    ],
  },
  {
    title: "Pro Partner",
    description: "Full-suite AI tools for the career-driven professional.",
    price: "₹5,999",
    duration: "/month",
    buttonText: "Start 14-Day Free Trial",
    featured: true,
    features: [
      "Unlimited Listings",
      "Advanced AI Intent Scoring",
      "50 Verified Leads / Mo",
      "Priority Listing Support",
    ],
  },
  {
    title: "Elite Partner",
    description: "Bespoke solutions for established agencies and brokerages.",
    price: "Custom Pricing",
    duration: "",
    buttonText: "Contact Sales",
    featured: false,
    features: [
      "Multi-Agent CRM Console",
      "Featured Network Exclusivity",
      "White-label Property Portal",
      "Dedicated Account Manager",
    ],
  },
];

const dummyCityData = [
  { name: "Chandigarh", dotColor: "bg-yellow-300", textColor: "text-yellow-300" },
  { name: "Mohali", dotColor: "bg-green-300", textColor: "text-green-300" },
  { name: "Ludhiana", dotColor: "bg-slate-300", textColor: "text-slate-300" },
  { name: "Jalandhar", dotColor: "bg-slate-500", textColor: "text-slate-400" },
];

const PricingPlans = () => {
  const [networkData, setNetworkData] = useState({
    headingLine1: "Explore the Agent",
    headingHighlight: "Network Density",
    description:
      "Our network is expanding rapidly across major hubs. Join the movement and dominate your local market with Niwas AI's local intelligence.",
    cities: dummyCityData,
  });

  const [planData, setPlanData] = useState({
    topTitle: "Partnership Plans",
    heading: "Choose Your Growth Path",
    plans: dummyPlans,
  });

  const getNetworkDensity = async () => {
    try {
      const res = await axios.get("/cms/network-density");
      setNetworkData({
        headingLine1: res.data.headingLine1 || "Explore the Agent",
        headingHighlight: res.data.headingHighlight || "Network Density",
        description: res.data.description || networkData.description,
        cities: res.data.cities?.length ? res.data.cities : dummyCityData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getPlanSection = async () => {
    try {
      const res = await axios.get("/cms/plan-section");
      setPlanData({
        topTitle: res.data.topTitle || "Partnership Plans",
        heading: res.data.heading || "Choose Your Growth Path",
        plans: res.data.plans?.length ? res.data.plans : dummyPlans,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNetworkDensity();
    getPlanSection();
  }, []);

  return (
    <div>
      <NetworkDensity networkData={networkData} />
      <section className="bg-slate-50 py-20 sm:py-32 px-4 sm:px-6  ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center sm:mb-16 mb-8">
            <p className="text-[#4d8c7a] font-bold tracking-[4px] text-xs uppercase mb-3">
              {planData.topTitle}
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0d2633]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {planData.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-4 sm:mx-0 sm:gap-5 lg:gap-10 pt-8">
            {planData.plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 flex flex-col border-2 hover:border-[#0d2633] shadow-xl duration-500 transition-all hover:scale-105 justify-between bg-white ${
                  plan.buttonType === "filled" ? "" : "border border-slate-100 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 bg-[#0d2633] text-white text-[10px] font-bold uppercase px-4 py-1 rounded-md tracking-wide">
                    {plan.badge}
                  </div>
                )}
                <div>
                  <h3
                    className="text-2xl text-[#0d2633] mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {plan.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {plan.description}
                  </p>
                  <div className="mb-8">
                    <span className="text-3xl font-bold text-[#0d2633]">{plan.price}</span>
                    {plan.duration && (
                      <span className="text-slate-400 text-sm ml-1">{plan.duration}</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-slate-600">
                        <span className="w-4 h-4 rounded-full border border-[#4d8c7a] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check size={10} className="text-[#4d8c7a]" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                    plan.badge
                      ? "bg-[#274255]  text-white hover:opacity-90"
                      : "border border-[#274255] text-[#274255] hover:bg-slate-50"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ============================================================
   3D TILT SHOWCASE — pure CSS, koi .glb model ya extra file nahi
   Mouse move par image tilt hoti hai, jaise real 3D object ho
   ============================================================ */
function TiltImageShowcase({ image }) {
  const wrapperRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 18;
    const rotateX = (0.5 - py) * 14;

    setTilt({ rx: rotateX, ry: rotateY });
  };

  const resetTilt = () => {
    setTilt({ rx: 1, ry: 0 });
    setIsHovering(false);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetTilt}
      className="relative w-full h-full [perspective:1200px] cursor-pointer select-none"
    >
      {/* Ambient glow behind image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          // background:
          //   "radial-gradient(ellipse at center, rgba(28,180,109,0.18) 0%, rgba(15,46,70,0) 65%)",
          opacity: isHovering ? 1 : 0.5,
        }}
      />

      {/* Ground shadow */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 h-6 w-2/5 rounded-full blur-xl transition-all duration-300 z-0"
        style={{
          background: "rgba(0,0,0,0.5)",
          transform: `translateX(-80%) scale(${isHovering ? 1.1 : 1})`,
        }}
      />

      {/* 3D Tilting Image */}
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out will-change-transform z-20"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
            isHovering ? 1.04 : 1
          })`,
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={image}
          alt="Property showcase"
          className="w-full h-full object-cover rounded-3xl drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
        />

        {/* Top sheen highlight for realism */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(295deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 35%)",
            opacity: isHovering ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}

function NetworkDensity({ networkData }) {
  return (
    <section className="bg-[#274255] text-white md:min-h-screen py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ---------------- LEFT: Text + Info Card ---------------- */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 backdrop-blur-xl bg-[#0d1b26] p-8 md:p-12 shadow-2xl min-h-[320px] flex flex-col justify-between">
            <div className="pointer-events-none absolute -bottom-20 -right-10 w-80 h-80 bg-orange-500/25 blur-[100px] rounded-full" />
            <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 bg-[#1CB46D]/15 blur-[90px] rounded-full" />

            <div className="relative z-10">
              <h2
                className="text-4xl md:text-6xl leading-tight mb-6"
                style={{ fontFamily: "'Source Serif 4', serif" }}
              >
                {networkData.headingLine1}
                <br />
                <span className="text-yellow-300">
                  {networkData.headingHighlight}
                </span>
              </h2>
              <p className="text-slate-300 text-lg max-w-xl mb-8">
                {networkData.description}
              </p>
            </div>
          </div>

          {/* ---------------- RIGHT: 3D Tilt Image Showcase ---------------- */}
          <div className="relative hidden md:flex items-center justify-center h-[300px] md:h-[500px] rounded-[32px] overflow-hidden p-6">
            <TiltImageShowcase image={isoHouseImg} />

            {/* Bottom label */}
            <div className="absolute bottom-9 left-9 z-20 pointer-events-none">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
                Move to Explore
              </p>
              <p className="text-lg font-bold text-white">
                Luxury Property
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;