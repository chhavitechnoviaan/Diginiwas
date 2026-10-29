// import React from "react";
// import {
//   MdPersonSearch,
//   MdPsychology,
//   MdAccountTree,
//   MdVisibility,
//   MdChatBubble,
//   MdQueryStats,
//   MdMenu,
// } from "react-icons/md";



// const features = [
//   {
//     icon: <MdPersonSearch size={28} />,
//     title: "Verified Leads",
//     description:
//       "Access a pre-qualified pool of buyers with verified identities and budget transparency.",
//     iconBg: "bg-green-200",
//     hoverBg: "hover:bg-green-200",
//     iconColor: "text-green-700",
//   },
//   {
//     icon: <MdPsychology size={28} />,
//     title: "AI Property Matching",
//     description:
//       "AI engine matches your listings with perfect buyers.",
//     iconBg: "bg-[#0d2633]",
//      hoverBg: "hover:bg-[#0d2633]",
//     iconColor: "text-white",
//   },
//   {
//     icon: <MdAccountTree size={28} />,
//     title: "CRM Management",
//     description:
//       "Integrated pipeline for real estate workflows.",
//     iconBg: "bg-yellow-200",
//      hoverBg: "hover:bg-yellow-200",
//     iconColor: "text-yellow-900",
//   },
//   {
//     icon: <MdVisibility size={28} />,
//     title: "Property Visibility",
//     description:
//       "Reach premium buyers through Punjab's network.",
//     iconBg: "bg-blue-200",
//       hoverBg: "hover:bg-blue-200",
//     iconColor: "text-blue-900",
//   },
//   {
//     icon: <MdChatBubble size={28} />,
//     title: "WhatsApp Integration",
//     description:
//       "Built-in communication and brochure sharing.",
//     iconBg: "bg-green-200",
//      hoverBg: "hover:bg-green-200",
//     iconColor: "text-green-900",
//   },
//   {
//     icon: <MdQueryStats size={28} />,
//     title: "Market Analytics",
//     description:
//       "Real-time insights into Diginiwas's micro markets.",
//     iconBg: "bg-gray-200",
//      hoverBg: "hover:bg-green-200",
//     iconColor: "text-[#0d2633]",
//   },
// ];

// const ValueProposition = () => {
//   return (
//     <div className="sm:min-h-screen bg-[#f8fafb]">


//       <main className="pt-5 sm:pt-32 pb-5 sm:pb-24 px-4 lg:px-16">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <span className="uppercase tracking-[4px] text-yellow-700 text-xs font-bold">
//               OUR VALUE PROPOSITION
//             </span>

//             <h2
//               className="text-4xl md:text-6xl text-[#0d2633] mt-4"
//               style={{
//                 fontFamily:
//                   "'Source Serif 4', serif",
//               }}
//             >
//               Built for Modern Real Estate
//               Professionals
//             </h2>

//             <div className="w-24 h-1.5 bg-[#0d2633] mx-auto mt-6 rounded-full" />
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((item, index) => (
//               <FeatureCard
//                 key={index}
//                 {...item}
//               />
//             ))}
//           </div>

       
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ValueProposition;



// export const FeatureCard = ({
//   icon,
//   title,
//   description,
//   iconBg,
//   iconColor,
// }) => {
//   const isDarkIcon = iconBg === "bg-[#0d2633]";
//   console.log('bg', iconBg)
//   return (
//     // <div className="bg-white p-8 rounded-xl border   hover:border-[#274255] hover:border-2 border-gray-200 shadow-[0_24px_48px_rgba(13,38,51,0.08)] hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(13,38,51,0.12)] transition-all duration-300 flex flex-col gap-4">
//     //   <div
//     //     className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
//     //   >
//     //     <span className={iconColor}>{icon}</span>
//     //   </div>

//     //   <h3 className="text-xl font-semibold text-[#0d2633]">
//     //     {title}
//     //   </h3>

//     //   <p className="text-gray-600 leading-relaxed">
//     //     {description}
//     //   </p>
//     // </div>
//       <div
//       className={`group rounded-xl border border-gray-200 p-8 shadow-[0_24px_48px_rgba(13,38,51,0.08)]
//       hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(13,38,51,0.12)]
//       transition-all duration-300 flex flex-col gap-4
//       hover:${iconBg}`}
//     >
//       <div
//         className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}
//         group-hover:bg-white transition-all duration-300`}
//       >
//         <span
//           className={`${iconColor} group-hover:text-[#274255] transition-all duration-300`}
//         >
//           {icon}
//         </span>
//       </div>

//       <h3
//         className={`text-xl font-semibold transition-all duration-300 ${
//           isDarkIcon
//             ? "text-[#0d2633] group-hover:text-white"
//             : "text-[#0d2633]"
//         }`}
//       >
//         {title}
//       </h3>

//       <p
//         className={`leading-relaxed transition-all duration-300 ${
//           isDarkIcon
//             ? "text-gray-600 group-hover:text-white/90"
//             : "text-gray-600"
//         }`}
//       >
//         {description}
//       </p>
//     </div>

//   );
// };



import React from "react";
import {
  MdPersonSearch,
  MdPsychology,
  MdAccountTree,
  MdVisibility,
  MdChatBubble,
  MdQueryStats,
  MdMenu,
  MdArrowOutward,
} from "react-icons/md";

const features = [
  {
    icon: <MdPersonSearch size={26} />,
    title: "Verified Leads",
    description:
      "Access a pre-qualified pool of buyers with verified identities and budget transparency.",
    iconBg: "bg-green-200",
    iconColor: "text-green-700",
  },
  {
    icon: <MdPsychology size={26} />,
    title: "AI Property Matching",
    description: "AI engine matches your listings with perfect buyers.",
    iconBg: "bg-[#0d2633]",
    iconColor: "text-white",
  },
  {
    icon: <MdAccountTree size={26} />,
    title: "CRM Management",
    description: "Integrated pipeline for real estate workflows.",
    iconBg: "bg-yellow-200",
    iconColor: "text-yellow-900",
  },
  {
    icon: <MdVisibility size={26} />,
    title: "Property Visibility",
    description: "Reach premium buyers through Punjab's network.",
    iconBg: "bg-blue-200",
    iconColor: "text-blue-900",
  },
  {
    icon: <MdChatBubble size={26} />,
    title: "WhatsApp Integration",
    description: "Built-in communication and brochure sharing.",
    iconBg: "bg-green-200",
    iconColor: "text-green-900",
  },
  {
    icon: <MdQueryStats size={26} />,
    title: "Market Analytics",
    description: "Real-time insights into Diginiwas's micro markets.",
    iconBg: "bg-gray-200",
    iconColor: "text-[#0d2633]",
  },
];

const ValueProposition = () => {
  return (
    <div className="sm:min-h-screen bg-[#f8fafb]">
      <main className="pt-5 sm:pt-32 pb-5 sm:pb-24 px-4 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[4px] text-yellow-700 text-xs font-bold">
              OUR VALUE PROPOSITION
            </span>

            <h2
              className="text-4xl md:text-6xl text-[#0d2633] mt-4"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Built for Modern Real Estate Professionals
            </h2>

            <div className="w-24 h-1.5 bg-[#0d2633] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ValueProposition;

export const FeatureCard = ({ icon, title, description, iconBg, iconColor }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-gray-200 hover:bg-[#0d2633] bg-white p-8
      shadow-[0_24px_48px_rgba(13,38,51,0.08)]
      transition-all duration-300 ease-out
      hover:-translate-y-2 hover:border-[#0d2633]/20 hover:shadow-[0_32px_64px_rgba(13,38,51,0.14)]
      flex flex-col gap-4"
    >
      {/* subtle top accent line that grows in on hover */}
      <span className="absolute left-0 top-0 h-1 w-0 bg-[#0d2633]  transition-all duration-500 ease-out group-hover:w-full" />

      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}
          transition-transform duration-300 ease-out
          group-hover:scale-110 group-hover:-rotate-6 `}
        >
          <span className={`${iconColor} `}>{icon}</span>
        </div>

        <MdArrowOutward
          size={18}
          className="text-gray-300 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300
          group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#0d2633]"
        />
      </div>

      <h3 className="text-xl font-semibold text-[#0d2633]  group-hover:text-white  transition-colors duration-300">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed  group-hover:text-white transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};
