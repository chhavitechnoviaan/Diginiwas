import React from "react";
import { HiOutlineMenu, HiOutlineUserCircle } from "react-icons/hi";
import { MdGroup, MdAccountTree, MdForum, MdSettings } from "react-icons/md";

import { FaUserGroup } from "react-icons/fa6";

import agent from "../../assets/images/agent.webp";

import { TfiHeadphone } from "react-icons/tfi";
import { MdVerifiedUser } from "react-icons/md";
import { WiTime3 } from "react-icons/wi";



import { FiHeart, FiChevronRight,FiChevronLeft,  
       FiHome,
    FiVideo, FiArrowRight, FiMessageCircle,  FiCheck,FiTarget,FiTrendingUp, FiUsers,
    FiBarChart2, } from "react-icons/fi";
import { FaBrain, FaRegClock,  FaInstagram, FaFacebook, FaWhatsapp, FaBullhorn } from "react-icons/fa";

const workflowSteps = [
  {
    id: 1,
    title: "CRM Handled by Our Dedicated Team",
    icon: <FaUserGroup />,
    description:
      "We manage your leads follow-ups and lead nurturing 24/7. You receive only verified and genuine leads.",
    active: false,
  },
  {
    id: 2,
    icon: <FaWhatsapp />,
    title: "WhatsApp Warmup by Our Team",
    description:
      "Our team takes care of Whatsapp warmup for your number ensuring higher delivery and better response.",
    active: true,
  },
];


   const featuress = [
        { icon: MdVerifiedUser, title: "100% verified leads", title2: "Property Listing" },
        { icon: TfiHeadphone, title: "Human support real result Professional", title2: "Video Shoots" },
        { icon: WiTime3, title: "Save time & close more deals ", title2: "Promotion" },
        { icon: FiBarChart2, title: "Grow your business faster with Diginiwas ", title2: "Visibility" },
      ]

// console.log('agent')
const AgentCRMWorkflow = () => {

  
  return (
    <div className="bg-[#274255] lg:min-h-screen h-full text-white ">
      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto  ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20   h-full xl:gap-16 items-center    ">
          <section className=" ">
            <div className="flex flex-col">
              <p className="text-[#33cc99] text-sm font-bold tracking-[3px] uppercase mb-4">
                Partner support that works for you
              </p>

              <h2
                className="text-4xl md:text-5xl   font-medium leading-tight mb-6"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                }}
              >
                Dedicated Teams Verified Leads.{" "}
                <span className="text-[#33cc99] ">Real Growth </span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-6 ">
                At Diginiwas our dedicated teams handle your lead management and
                Whatsapp warmup - so you can focus on closing more deals.
              </p>
              <div className="w-20 h-[2px] bg-[#33cc99]"> </div>
            </div>

            <section className="space-y-4 py-4  ">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className={`flex gap-6 items-center relative px-5 py-6 rounded-xl bg-[#163042]`}
                >
                  <div
                    className={`w-14 h-14 rounded-full sm:flex  bg-green-100 hidden   items-center justify-center font-bold text-sm flex-shrink-0 `}
                  >
                    <span className="text-[#1dac7d] text-3xl">
                      {" "}
                      {step.icon}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#33cc99] ">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 leading-snug">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

                <div className="grid grid-cols-2 sm:grid-cols-4  mt-8 max-w-xl">
              {featuress.map((f) => (
                <div
                  key={f.title2}
                  className=" bg-[#274255]/60 p-3 border-r-0  flex flex-row items-center gap-4"
                >
                  <div className=" hover:scale-110 duration-100 transition-all rounded-md   text-[#2dd4a8] flex items-center justify-center">
                    <f.icon size={26} />
                  </div>
                  <div className="text-[11px]  leading-tight">
                    <div>{f.title}</div>
                   
                  </div>
                </div>
              ))}
            </div>
            </section>
          </section>

          <section className="relative h-full   flex flex-col md:flex-row gap-16 justify-center items-center    ">
            <div className="xl:absolute  lg:left-0 xl:left-0    min-h-[500px]   h-[500px] rounded-[40px]      shadow-2xl overflow-hidden">
              <div className=" h-full ">
                <img
                  src={agent}
                  alt="CRM Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AgentCRMWorkflow;
