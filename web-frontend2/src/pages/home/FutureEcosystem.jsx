import React,{  useRef, useState, useEffect } from 'react';
import { 
  HiOutlineShieldCheck, 
  HiOutlineUserGroup, 
  HiOutlineHome, 
  HiOutlineVideoCamera, 
  HiOutlineShoppingCart,
//   HiOutlineWrench
} from 'react-icons/hi';
// import { HiOutlineWrench } from "react-icons/hi";
import homelogo from '../../assets/images/homelogo.png'
// import { HiWrench } from "react-icons/hi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

 import big from "../../assets/images/big.webp"

import { 
  MdOutlinePlumbing, 
  MdOutlineRealEstateAgent 
} from 'react-icons/md';
import { RiRocketLine } from "react-icons/ri";
import { IoRocketOutline } from 'react-icons/io5';
import ComingSoonVideo from "../../components/common/ComingSoonVideo"
import PopupImage from '../../components/common/PopupImage';
const ecosystemCards = [
  {
    id: 1,
    icon: MdOutlinePlumbing,
    title: "Plumbing",
    desc: "Find trusted plumbing services near you."
  },
  {
    id: 2,
    icon: HiOutlineShoppingCart,
    title: "Groceries",
    desc: "Get daily groceries delivered to your home."
  },
  {
    id: 3,
    icon: HiOutlineVideoCamera,
    title: "Videography",
    desc: "Professional property videos and shoots."
  },
  {
    id: 4,
    icon: MdOutlineRealEstateAgent,
    title: "Property Management",
    desc: "End-to-end property management services."
  },
  {
    id: 5,
    icon: HiOutlineWrenchScrewdriver,
    title: "Maintenance",
    desc: "Reliable maintenance services at your doorstep."
  }
];



export default function FutureEcosystem() {
  const sectionRef = useRef(null);
const [startCounter, setStartCounter] = useState(false);
   const [showComingSoon, setShowComingSoon] = useState(false);
       const [showPopUpImg, setShowPopUpImg] = useState(false)
    const [image, setImage] = useState(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStartCounter(true);
        observer.disconnect();
      }
    },
    {
      threshold: 0.4,
    }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);

  const [counts, setCounts] = useState({
  agents: 0,
  properties: 0,
  customers: 0,
  secure: 0,
});

useEffect(() => {
  if (!startCounter) return;

  const interval = setInterval(() => {
    setCounts((prev) => ({
      agents: prev.agents < 100 ? prev.agents + 1 : 100,
      properties: prev.properties < 500 ? prev.properties + 5 : 500,
      customers: prev.customers < 10000 ? prev.customers + 100 : 10000,
      secure: prev.secure < 100 ? prev.secure + 1 : 100,
    }));
  }, 20);

  return () => clearInterval(interval);
}, [startCounter]);

const statsData = [
  { icon: HiOutlineUserGroup, count: counts.agents, suffix: "%", label: "Verified Agents" },
  { icon: HiOutlineHome, count: counts.properties, suffix: "+", label: "AI Powered" },
  { icon: HiOutlineUserGroup, count: counts.customers, suffix: "", label: "Easy property listing" },
  { icon: HiOutlineShieldCheck, count: counts.secure, suffix: "%", label: "Genuine leads" }
];
  return (
    <section   ref={sectionRef} id='future' className="min-h-screen bg-[#274255] text-white px-10 py-8 pb-14 sm:pb-16 flex flex-col justify-center items-center font-sans antialiased selection:bg-[#33cc99] selection:text-black">
      <div className="w-full max-w-[1440px] bg-[#040f1a] border border-slate-900 rounded-2xl p-6 sm:p-8  shadow-2xl flex flex-col gap-10">
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          
          <div className="xl:col-span-4 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-12 h-12 rounded-xl border border-[#33cc99]/40 text-[#33cc99] flex items-center justify-center font-bold text-lg bg-[#051625]">
                <img src={homelogo} className="" />
              </span>
              <span className="text-[#33cc99] tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase">
                FUTURE ECOSYSTEM
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
              Beyond Properties,<br />
              <span className="text-[#33cc99]">Endless Possibilities.</span>
            </h2>

            <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed max-w-md">
              DigiNiwas is building an ecosystem that makes life easier for customers and helps businesses grow together.
            </p>

            <button onClick={() => { 
              setShowPopUpImg(true)
              setImage(big)
            }} className="flex items-center hover:cursor-pointer gap-2 bg-[#051727] border border-[#33cc99]/30 text-[#33cc99] px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#33cc99]/10 transition-all duration-300 shadow-md">
              <span>Coming Soon</span>
              <IoRocketOutline size={16} className="transform rotate-45 text-[#33cc99]" />
            </button>
          </div>

          <div className="xl:col-span-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ecosystemCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-[#051422] border border-slate-800/60 rounded-xl hover:scale-105 p-5 
                flex flex-col items-center text-center justify-between sm:min-h-[240px]
                  transition-all duration-300 group   hover:border-[#33cc99] hover:border-2"
              >
                {/* <div className="w-14 sm:w-20 sm:h-20 h-14 text-3xl sm:text-5xl bg-[#071c2f] rounded-xl flex items-center justify-center text-[#33cc99] mb-4 border border-slate-800 group-hover:scale-105 transition-transform duration-300"> */}
                  <card.icon  className='text-3xl sm:text-6xl text-[#33cc99] font-medium' />
                {/* </div> */}

                <div className="flex-grow flex flex-col justify-start">
                  <h3 className="text-base font-semibold pt-3 text-slate-100 mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 font-medium text-xs leading-relaxed px-1">
                    {card.desc}
                  </p>
                </div>

                <div onClick={() => {
                     setShowPopUpImg(true)
                      setImage(big)}                   
                } className="w-full  hover:cursor-pointer  mt-5 max-w-40 border   rounded-md border-[#33cc99]/80">
                    <div className="w-full  bg-[#030d17] border border-slate-800/80
                    rounded-lg py-1.5 text-xs sm:text-base font-medium text-[#33cc99]/80 tracking-wide">
                      Coming Soon
                    </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="w-full border-t border-slate-800/60 pt-8 mt-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-4 items-center justify-between">
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 px-2 sm:px-4 justify-start sm:justify-center md:border-r last:border-0 border-slate-800/60 lg:last:border-0"
              >
                {/* <div className="w-12 h-12 shrink-0 rounded-xl bg-[#051422] border border-slate-800 flex items-center justify-center text-[#33cc99]"> */}
                  <stat.icon  className='text-2xl sm:text-4xl text-[#33cc99] font-medium' />
                {/* </div> */}
                <div className="flex flex-col">
                 {(index === 0 || index === 3 ) && ( <span className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                     {stat.count.toLocaleString()} {stat.suffix}
                  </span>)}
                  <span className="text-xs sm:text-sm font-medium text-slate-400 whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* {  showComingSoon && (
       <ComingSoonVideo
          setShowComingSoon={setShowComingSoon} video={diginiwasVideo}
        />)
      } */}

       {showPopUpImg && (
               <PopupImage  image={image} setShowPopUpImg={setShowPopUpImg} />
            )}
    </section>
  );
}