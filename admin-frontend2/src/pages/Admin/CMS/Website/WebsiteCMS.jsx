// import { useState } from "react";
// import { MdOutlineLanguage } from "react-icons/md";
// import HeroSectionCMS from "../HeroSection/HeroSectionCMS";
// import RoundSectionCMS from "../HeroSection/RoundSectionCMS";
// import TestimonialCMS from "../HeroSection/TestimonialCMS";
// import AgentCornerCMS from "../HeroSection/AgentCornerCMS";
// import AgentNetworkCMS from "../HeroSection/AgentNetworkCMS";
// import NetworkDensityCMS from "../HeroSection/NetworkDensityCMS";
// import PlanSectionCMS from "../HeroSection/PlanSectionCMS";
// import AboutStatsCMS from "../HeroSection/AboutStatsCMS";
// import AboutGenesisCMS from "../HeroSection/AboutGenesisCMS";
// import AboutMissionVisionCMS from "../HeroSection/AboutMissionVisionCMS";
// import AboutVisionaryCMS from "../HeroSection/AboutVisionaryCMS";
// import PlatformFeaturesCMS from "../HeroSection/PlatformFeaturesCMS";
// const groups = [
//   {
//     title: "Home Page",
//     items: [
//       ["Hero", "Hero Section"],
//       ["Round", "Round Images Section"],
//       ["Testimonial", "Testimonials"],
//     ],
//   },
//   {
//     title: "Agent Corner",
//     items: [
//       ["AgentCorner", "Agent Corner"],
//       ["AgentNetwork", "Agent Network"],
//       ["NetworkDensity", "Network Density"],
//       ["PlanSection", "Partnership Plans"],
//     ],
//   },
//   {
//     title: "About Page",
//     items: [
//       ["AboutStats", "About Statistics"],
//       ["PlatformFeatures", "Platform Features"],
//       ["AboutGenesis", "About Genesis"],
//       ["MissionVision", "Mission & Vision"],
//       ["Visionaries", "Visionaries"],
//     ],
//   },
// ];

// const sections = {
//   Hero: <HeroSectionCMS />,
//   Round: <RoundSectionCMS />,
//   Testimonial: <TestimonialCMS />,
//   AgentCorner: <AgentCornerCMS />,
//   AgentNetwork: <AgentNetworkCMS />,
//   NetworkDensity: <NetworkDensityCMS />,
//   PlanSection: <PlanSectionCMS />,
//   AboutStats: <AboutStatsCMS />,
//   PlatformFeatures: <PlatformFeaturesCMS />,
//   AboutGenesis: <AboutGenesisCMS />,
//   MissionVision: <AboutMissionVisionCMS />,
//   Visionaries: <AboutVisionaryCMS />,
// };

// export default function WebsiteCMS() {
//   const [active, setActive] = useState("Hero");

//   return (
//     <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)]">
//       <aside className="h-fit overflow-hidden rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)] lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//         <div className="border-b border-[#E7EDF0] bg-[#F8FAFB] p-4">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#15966F]">
//               <MdOutlineLanguage size={21} />
//             </div>
//             <div>
//               <h3 className="text-sm font-extrabold text-[#173247]">Website Sections</h3>
//               <p className="mt-0.5 text-[10px] text-[#8A9AA2]">Select content to manage</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4 p-3">
//           {groups.map((group) => (
//             <div key={group.title}>
//               <p className="mb-2 px-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#8A9AA2]">
//                 {group.title}
//               </p>
//               <div className="space-y-1.5">
//                 {group.items.map(([id, label]) => {
//                   const isActive = active === id;
//                   return (
//                     <button
//                       key={id}
//                       type="button"
//                       onClick={() => setActive(id)}
//                       className={`w-full rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold transition ${
//                         isActive
//                           ? "bg-[#1F3C50] text-white shadow-sm"
//                           : "bg-[#F4F7F8] text-[#617681] hover:bg-[#EAF9F4] hover:text-[#15966F]"
//                       }`}
//                     >
//                       {label}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//       </aside>

//       <main className="min-w-0 rounded-[18px] border border-[#DCE5E9] bg-[#FAFCFD] p-2 sm:p-3">
//         <div className="mb-3 flex items-center justify-between rounded-[14px] border border-[#E0E8EC] bg-white px-4 py-3">
//           <div>
//             <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#35A98C]">Editing Section</p>
//             <h2 className="mt-1 text-base font-extrabold text-[#173247]">
//               {groups.flatMap((g) => g.items).find(([id]) => id === active)?.[1] || "Website Content"}
//             </h2>
//           </div>
//           <span className="rounded-full bg-[#EAF9F4] px-3 py-1.5 text-[9px] font-bold text-[#15966F]">CMS</span>
//         </div>
//         {sections[active]}
//       </main>
//     </div>
//   );
// }


import { useState } from "react";
import { MdOutlineLanguage } from "react-icons/md";

import HeroSectionCMS from "../HeroSection/HeroSectionCMS";
import RoundSectionCMS from "../HeroSection/RoundSectionCMS";
import TestimonialCMS from "../HeroSection/TestimonialCMS";
import AgentCornerCMS from "../HeroSection/AgentCornerCMS";
import AgentNetworkCMS from "../HeroSection/AgentNetworkCMS";
import NetworkDensityCMS from "../HeroSection/NetworkDensityCMS";
import PlanSectionCMS from "../HeroSection/PlanSectionCMS";
import AboutStatsCMS from "../HeroSection/AboutStatsCMS";
import AboutGenesisCMS from "../HeroSection/AboutGenesisCMS";
import AboutMissionVisionCMS from "../HeroSection/AboutMissionVisionCMS";
import AboutVisionaryCMS from "../HeroSection/AboutVisionaryCMS";
import PlatformFeaturesCMS from "../HeroSection/PlatformFeaturesCMS";
import ServicesPageCMS from "../HeroSection/ServicesPageCMS";
import PropertyReviewsCMS from "../HeroSection/PropertyReviewsCMS";

/* BLOG CMS */
import {
  BlogHeroCMS,
  BlogCategoriesCMS,
  BlogFeaturedCMS,
  BlogArticlesCMS,
  BlogNiwasAICMS,
  BlogTrendingCMS,
  BlogNewsletterCMS,
} from "../HeroSection/BlogCMSSections";

const groups = [
  {
    title: "Home Page",
    items: [
      ["Hero", "Hero Section"],
      ["Round", "Round Images Section"],
      ["Testimonial", "Testimonials"],
    ],
  },

  {
    title: "Agent Corner",
    items: [
      ["AgentCorner", "Agent Corner"],
      ["AgentNetwork", "Agent Network"],
      ["NetworkDensity", "Network Density"],
      ["PlanSection", "Partnership Plans"],
    ],
  },

  {
    title: "About Page",
    items: [
      ["AboutStats", "About Statistics"],
      ["PlatformFeatures", "Platform Features"],
      ["AboutGenesis", "About Genesis"],
      ["MissionVision", "Mission & Vision"],
      ["Visionaries", "Visionaries"],
    ],
  },

  {
    title: "Services Page",
    items: [["ServicesPage", "Services Page Content"], ["PropertyReviews", "Property Reviews"]],
  },

  /* ==============================
      BLOG PAGE
  ============================== */
  {
    title: "Blog Page",
    items: [
      ["BlogHero", "Blog Hero"],
      ["BlogCategories", "Blog Categories"],
      ["BlogFeatured", "Featured Article"],
      ["BlogArticles", "Blog Articles"],
      ["BlogAI", "Niwas AI Section"],
      ["BlogTrending", "Trending Articles"],
      ["BlogNewsletter", "Newsletter"],
    ],
  },
];

const sections = {
  Hero: <HeroSectionCMS />,
  Round: <RoundSectionCMS />,
  Testimonial: <TestimonialCMS />,

  AgentCorner: <AgentCornerCMS />,
  AgentNetwork: <AgentNetworkCMS />,
  NetworkDensity: <NetworkDensityCMS />,
  PlanSection: <PlanSectionCMS />,

  AboutStats: <AboutStatsCMS />,
  PlatformFeatures: <PlatformFeaturesCMS />,
  AboutGenesis: <AboutGenesisCMS />,
  MissionVision: <AboutMissionVisionCMS />,
  Visionaries: <AboutVisionaryCMS />,

  ServicesPage: <ServicesPageCMS />,
  PropertyReviews: <PropertyReviewsCMS />,

  /* BLOG */
  BlogHero: <BlogHeroCMS />,
  BlogCategories: <BlogCategoriesCMS />,
  BlogFeatured: <BlogFeaturedCMS />,
  BlogArticles: <BlogArticlesCMS />,
  BlogAI: <BlogNiwasAICMS />,
  BlogTrending: <BlogTrendingCMS />,
  BlogNewsletter: <BlogNewsletterCMS />,
};

export default function WebsiteCMS() {
  const [active, setActive] = useState("Hero");

  const activeLabel =
    groups
      .flatMap((group) => group.items)
      .find(([id]) => id === active)?.[1] || "Website Content";

  return (
    <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)]">
      {/* =========================
          LEFT SIDEBAR
      ========================= */}
      <aside className="h-fit overflow-hidden rounded-[18px] border border-[#DCE5E9] bg-white shadow-[0_4px_18px_rgba(15,47,69,0.04)] lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="border-b border-[#E7EDF0] bg-[#F8FAFB] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#15966F]">
              <MdOutlineLanguage size={21} />
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-[#173247]">
                Website Sections
              </h3>

              <p className="mt-0.5 text-[10px] text-[#8A9AA2]">
                Select content to manage
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-3">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#8A9AA2]">
                {group.title}
              </p>

              <div className="space-y-1.5">
                {group.items.map(([id, label]) => {
                  const isActive = active === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActive(id)}
                      className={`w-full rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold transition ${
                        isActive
                          ? "bg-[#1F3C50] text-white shadow-sm"
                          : "bg-[#F4F7F8] text-[#617681] hover:bg-[#EAF9F4] hover:text-[#15966F]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* =========================
          RIGHT CMS CONTENT
      ========================= */}
      <main className="min-w-0 rounded-[18px] border border-[#DCE5E9] bg-[#FAFCFD] p-2 sm:p-3">
        <div className="mb-3 flex items-center justify-between rounded-[14px] border border-[#E0E8EC] bg-white px-4 py-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#35A98C]">
              Editing Section
            </p>

            <h2 className="mt-1 text-base font-extrabold text-[#173247]">
              {activeLabel}
            </h2>
          </div>

          <span className="rounded-full bg-[#EAF9F4] px-3 py-1.5 text-[9px] font-bold text-[#15966F]">
            CMS
          </span>
        </div>

        {sections[active]}
      </main>
    </div>
  );
}