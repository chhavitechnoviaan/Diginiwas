import {
  HiMenu,
  HiPlus,
  HiArrowRight,
} from "react-icons/hi";

import {
  MdPersonSearch,
  MdVerifiedUser,
  MdAccountCircle,
  MdAddBusiness,
  MdSmartToy,
  MdHandshake,
  MdTrendingUp,
  MdAccountTree,
  MdChatBubble,
  MdSettings,
} from "react-icons/md";

const steps = [
  {
    icon: <MdPersonSearch size={34} />,
    title: "Register",
    description: "Sign up in minutes",
  },
  {
    icon: <MdVerifiedUser size={34} />,
    title: "Verification",
    description: "Identity & RERA check",
  },
  {
    icon: <MdAccountCircle size={34} />,
    title: "Activation",
    description: "Branded Partner profile",
  },
  {
    icon: <MdAddBusiness size={34} />,
    title: "List",
    description: "Upload premium properties",
  },
  {
    icon: <MdSmartToy size={34} />,
    title: "Receive Leads",
    description: "AI-matched buyer leads",
  },
  {
    icon: <MdHandshake size={34} />,
    title: "Close Deals",
    description: "Scale your revenue",
    active: true,
  },
];

export default function JourneySection() {
  return (
    <div className="bg-[#f8fafb] lg:min-h-screen text-[#191c1d]">
   

      <main className="pt-28 pb-32 max-w-7xl mx-auto px-4 md:px-16">
        <section className="text-center mb-24">
          <p className="uppercase tracking-[4px] text-[#3f6653] font-bold text-xs mb-4">
            THE JOURNEY
          </p>

          <h2
            className="text-4xl md:text-6xl text-[#0d2633]"
            style={{
              fontFamily: "'Source Serif 4', serif",
            }}
          >
            How Niwas AI Works for Agents
          </h2>
        </section>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-10 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 group-hover:text-white group-hover:bg-[#0d2633] 
                     rounded-full flex items-center hover:border-[#0d2633] justify-center mb-5 transition-all duration-800 ${
                    step.active
                      ? "bg-[#0d2633] text-white shadow-xl border-2 transform-all duration-500 hover:border-[#0d2633]"
                      : "bg-white border border-gray-300 text-[#0d2633]"
                  }`}
                >
                  {step.icon}
                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-500 text-sm max-w-[150px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </main>


    </div>
  );
}

function NavItem({ icon, title, active }) {
  return (
    <div
      className={`flex flex-col items-center px-4 py-2 rounded-xl ${
        active
          ? "bg-[#beead1] text-[#274e3d]"
          : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{title}</span>
    </div>
  );
}