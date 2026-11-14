import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Search, BarChart3, Rocket } from "lucide-react";
import axios from "../api/axios";
import ComingSoonVideo from "../components/common/ComingSoonVideo";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import growth from "../assets/images/growth.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dummyStats = [
  {
    value: "10,000+",
    label: "Verified Listings",
  },
  {
    value: "500+",
    label: "Expert Agents",
  },
  {
    value: "500+",
    label: "Portfolio Value",
  },
  {
    value: "24/7",
    label: "AI Concierge",
  },
];

const dummyGenesis = {
  topTitle: "THE GENESIS",

  heading: "Beyond the Fragmented Market.",

  paragraph1:
    "For decades, the real estate landscape in Diginiwas was defined by word-of-mouth, lack of transparency, and immense challenges for the global Diginiwas diaspora (NRIs).",

  paragraph2:
    "We saw a market rich in value but poor in accessibility. Niwas AI was born from the necessity to digitize trust. By integrating advanced machine learning with local ground intelligence, we created a single point of truth.",

  quote:
    "Our mission is simple: To ensure that every brick laid in Diginiwas is a brick built on data and trust.",

  image: {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqcVRcPA-_iwZhWRpYHw58BQhYSbwNc-hudsih9x-l2tp2HQkGvMRbN8TXslB32SiOxsKlvQAnagHcYG-nb_bMWa-x5-E6VazIaNLQd9pskDSqPXTJM-0uMjHQDOedm23zIfvDYH9lOvtcisi8_W3oUX0EdHWTFzDJk-rVoCCLSLHjaKcFcKilz1PPoVIHmgjIhyjd282XKrRne6TFDxjLp865oUCg0zRH8ZsN-J-vnY7E1_0DId4RkiqXMSgqNP5dWdQ4OFMr",
  },
};

const dummyMissionVision = {
  mission: {
    title: "Our Mission",
    heading: "Modernize property discovery through intelligent automation.",
    description:
      "We are committed to removing the friction from real estate transactions by providing instantly accessible, verified, and AI-vetted data.",
  },

  vision: {
    title: "Our Vision",
    heading: "India's most trusted AI-driven property ecosystem.",
    description:
      "To define the next century of Indian real estate by becoming the gold standard for asset valuation and ownership transparency.",
  },
};

const dummyVisionaries = {
  sectionTitle: "The Visionaries",

  sectionSubtitle: "Expert in technology and real estate crafting the future",

  members: [
    {
      name: "Arjun Singh",
      designation: "Co-Founder & CEO",
      description:
        "Former Silicon Valley AI Lead with a passion for Indian urban development.",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcFM28IGjIpvm0W_2uIj8lh9ViBr4BhTmJE4lEf7x71lJIzkavw4g70ybm4JJ8T1EoDXObdi3z5YcvcnDyYi1uBLsWwEgrwEISOtdAJG0Y3mmvXwrsP56VnBBtDh93pvP69qMp0lZLINlGuzPTee6C5sK2Pt1Jd4XDWhDYqqRNp8t9ti14uLTuVZuC-Krl-yRXPtu1SGEP7AXjAliza75hNxmgoLKyo2cCjpqd9Pou9ETr7ZaZw5SWsFUqreJtqB-WFNLMp_89",
      },
    },

    {
      name: "Sandeep Kaur",
      designation: "Head of Strategy",
      description:
        "20 years of expertise in luxury residential assets across North India.",
      image: {
        url: "https://media.istockphoto.com/id/1382284148/photo/shot-of-a-young-businesswoman-standing-with-her-arms-crossed-at-work.jpg?s=612x612&w=0&k=20&c=t4oE3UanKjrhnwWmI3On2Xz6rX0su6Zb-vGQP_A-0Rc=",
      },
    },

    {
      name: "Vikram Dhillon",
      designation: "CTO",
      description:
        "Machine learning expert specializing in spatial data and property analytics.",
      image: {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      },
    },
  ],
};

const team = [
  {
    name: "Arjun Singh",
    role: "Co-Founder & CEO",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcFM28IGjIpvm0W_2uIj8lh9ViBr4BhTmJE4lEf7x71lJIzkavw4g70ybm4JJ8T1EoDXObdi3z5YcvcnDyYi1uBLsWwEgrwEISOtdAJG0Y3mmvXwrsP56VnBBtDh93pvP69qMp0lZLINlGuzPTee6C5sK2Pt1Jd4XDWhDYqqRNp8t9ti14uLTuVZuC-Krl-yRXPtu1SGEP7AXjAliza75hNxmgoLKyo2cCjpqd9Pou9ETr7ZaZw5SWsFUqreJtqB-WFNLMp_89",
    desc: "Former Silicon Valley AI Lead with a passion for Indian urban development.",
  },
  {
    name: "Sandeep Kaur",
    role: "Head of Strategy",
    image:
      "https://media.istockphoto.com/id/1382284148/photo/shot-of-a-young-businesswoman-standing-with-her-arms-crossed-at-work.jpg?s=612x612&w=0&k=20&c=t4oE3UanKjrhnwWmI3On2Xz6rX0su6Zb-vGQP_A-0Rc=",
    desc: "20 years of expertise in luxury residential assets across North India.",
  },
  {
    name: "Vikram Dhillon",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    desc: "Machine learning expert specializing in spatial data and property analytics.",
  },
];

// function HeroSection() {

//   const [aboutStats, setAboutStats] = useState(dummyStats);

//   const getAboutStats = async () => {
//     try {
//       const res = await axios.get("/cms/about-stats");

//       setAboutStats(
//         res.data.stats?.length
//           ? res.data.stats
//           : dummyStats
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getAboutStats();
//   }, []);

//   const [stats, setStats] = useState({
//   listings: 0,
//   agents: 0,
//   portfolio: 0,
// });

// useEffect(() => {
//   const interval = setInterval(() => {
//     setStats((prev) => ({
//       listings:
//         prev.listings < 10000
//           ? Math.min(prev.listings + 100, 10000)
//           : 10000,

//       agents:
//         prev.agents < 500
//           ? Math.min(prev.agents + 5, 500)
//           : 500,

//       portfolio:
//         prev.portfolio < 5000
//           ? Math.min(prev.portfolio + 50, 5000)
//           : 5000,
//     }));
//   }, 20);

//   return () => clearInterval(interval);
// }, []);

//   return (
//     <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 pt-32 pb-20 overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-[#1628394d] to-[#162839cc] z-10"></div>

//         <img
//           src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBPZawAd1oy-smKp5UtCyQ1weMdzx-1bJh9nHxOUuSI1oxE0QjahuEBO0u_QC8L0QCAj7yRcM39Ypw2lgFnAwlWCfgCnmFIinPhXN6cDSfrladXNhbVU63iHidNHXJm8bY0gl3mDF1sU2imz0kzQfM0adN9JM7Ij1cWo6wqnoqWQDGIZR863K0JtXzSZ_4Hj_Z8mJa4BuCGQNXSomM9fVIUPZbQpAbZNChb1dcNVkq5ZH8bVMEhHnp9T8QL33ppcxzx3E71Hl9"
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="relative z-20 max-w-5xl mx-auto">
//         <h1 className="text-4xl md:text-6xl font-semibold text-white mb-8 leading-tight">
//           Building the Future of{" "}
//           <span className="text-[#ffe088]">AI-Powered</span> Real Estate in
//           Diginiwas
//         </h1>

//         <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-16">
//           We're bridging the gap between visionary investors, global NRIs, and
//           the heart of Diginiwas through intelligent discovery and verified data.
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//   {aboutStats.map((item, index) => (
//     <div
//       key={index}
//       className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl p-6"
//     >
//       <h3 className="text-3xl font-bold text-[#162839]">
//         {item.value}
//       </h3>

//       <p className="uppercase text-sm font-semibold text-gray-600">
//         {item.label}
//       </p>
//     </div>
//   ))}
// </div>
//       </div>
//     </section>
//   );
// }
const flattenStory = (story) => {
  return story.map((item) => {
    if (!item.length) {
      return {
        text: "",
        extraGap: true,
      };
    }

    return {
      text: item[0],
      extraGap: false,
    };
  });
};
function HeroSection() {
  const [aboutStats, setAboutStats] = useState(dummyStats);

  const sectionRef = useRef(null);
  const storyRef = useRef(null);
  const storyBoxRef = useRef(null);
  const storyInnerRef = useRef(null);

  const story = [
    ["every property"],
    ["has a story."],
    [],
    ["every dream"],
    ["needs a place."],
    [],
    ["we believe"],
    ["buying, selling,"],
    ["renting and leasing"],
    [],
    ["should be simple."],
    [],
    ["transparent."],
    [],
    ["intelligent."],
    [],
    ["trusted."],
    [],
    ["that's why"],
    ["we built"],
    ["DigiNiwas."],
    [],
    ["where technology"],
    ["meets trust."],
    [],
    ["where AI"],
    ["meets real estate."],
    [],
    ["where every property"],
    ["finds the right owner."],
  ];

  const lines = flattenStory(story);
  const lineRefs = useRef([]);
  lineRefs.current = [];

  const getAboutStats = async () => {
    try {
      const res = await axios.get("/cms/about-stats");
      setAboutStats(res.data.stats?.length ? res.data.stats : dummyStats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAboutStats();
  }, []);

  const [stats, setStats] = useState({
    listings: 0,
    agents: 0,
    portfolio: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        listings:
          prev.listings < 10000 ? Math.min(prev.listings + 100, 10000) : 10000,
        agents: prev.agents < 500 ? Math.min(prev.agents + 5, 500) : 500,
        portfolio:
          prev.portfolio < 5000 ? Math.min(prev.portfolio + 50, 5000) : 5000,
      }));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    let ctx;

    const setup = () => {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const container = storyBoxRef.current;
        const inner = storyInnerRef.current;
        const lineEls = lineRefs.current.filter(Boolean);

        if (!container || !inner || !lineEls.length) return;

        const containerHeight = container.offsetHeight;
        const centerY = containerHeight * 0.45;

        // Set baseline muted color and zero shadow blur (normal appearance)
        gsap.set(lineEls, {
          color: "#4a525d",
          textShadow: "0px 0px 0px rgba(255,255,255,0)",
        });

        const lineCenters = lineEls.map(
          (el) => el.offsetTop + el.offsetHeight / 2,
        );

        const startY = centerY - lineCenters[0];
        const endY = centerY - lineCenters[lineCenters.length - 1];

        gsap.set(inner, { y: startY });

        const scrollDistance =
          Math.abs(endY - startY) + window.innerHeight * 0.6;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          inner,
          {
            y: endY,
            ease: "none",
            duration: 1,
          },
          0,
        );

        const totalTravel = endY - startY;
        lineEls.forEach((el, i) => {
          const t = (centerY - lineCenters[i] - startY) / totalTravel;
          const clamped = Math.min(Math.max(t, 0), 1);
          const fadeWindow = 0.04;

          // Transition color and text shadow tracking together for the bold white effect
          tl.to(
            el,
            {
              color: "#ffffff",
              textShadow:
                "0px 0px 1px rgba(255,255,255,1), 0.5px 0px 0px rgba(255,255,255,1)",
              ease: "none",
              duration: fadeWindow,
            },
            Math.max(clamped - fadeWindow / 2, 0),
          );
        });
      }, sectionRef);
    };

    setup();
    ScrollTrigger.refresh();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("load", ScrollTrigger.refresh);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", ScrollTrigger.refresh);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (ctx) ctx.revert();
    };
  }, [lines.length]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] overflow-hidden bg-black"
    >
      {/* Background Image Layer with Premium Text Overlay Support */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10"></div>

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBPZawAd1oy-smKp5UtCyQ1weMdzx-1bJh9nHxOUuSI1oxE0QjahuEBO0u_QC8L0QCAj7yRcM39Ypw2lgFnAwlWCfgCnmFIinPhXN6cDSfrladXNhbVU63iHidNHXJm8bY0gl3mDF1sU2imz0kzQfM0adN9JM7Ij1cWo6wqnoqWQDGIZR863K0JtXzSZ_4Hj_Z8mJa4BuCGQNXSomM9fVIUPZbQpAbZNChb1dcNVkq5ZH8bVMEhHnp9T8QL33ppcxzx3E71Hl9"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={storyRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center z-20 px-4"
      >
        <div className="max-w-5xl mx-auto mt-44 text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-6 md:mb-10 leading-tight">
            Building the Future of{" "}
            <span className="text-[#ffe088]">AI-Powered</span> Real Estate in
            Diginiwas
          </h1>

          <div
            ref={storyBoxRef}
            className="relative mt-8 md:mt-12 w-full max-w-3xl mx-auto h-[320px] sm:h-[400px] md:h-[500px] overflow-hidden mask-fade-edges"
          >
            <div ref={storyInnerRef} className="absolute left-0 right-0">
              {lines.map((line, i) => (
                <p
                  key={i}
                  ref={(el) => (lineRefs.current[i] = el)}
                  className={`text-[22px] sm:text-[28px] md:text-[42px] leading-[1.4] font-medium font-serif text-center will-change-transform ${
                    line.extraGap ? "mb-6 sm:mb-10" : "mb-1"
                  }`}
                  style={{
                    fontSmooth: "always",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mask-fade-edges {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%);
        }
      `}</style>
    </section>
  );
}
function GenesisSection() {
  const [genesisData, setGenesisData] = useState(dummyGenesis);

  const getGenesis = async () => {
    try {
      const res = await axios.get("/cms/about-genesis");

      setGenesisData({
        topTitle: res.data.topTitle || dummyGenesis.topTitle,

        heading: res.data.heading || dummyGenesis.heading,

        paragraph1: res.data.paragraph1 || dummyGenesis.paragraph1,

        paragraph2: res.data.paragraph2 || dummyGenesis.paragraph2,

        quote: res.data.quote || dummyGenesis.quote,

        image: res.data.image?.url ? res.data.image : dummyGenesis.image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGenesis();
  }, []);

  return (
    <section className="py-10 sm:py-28 px-5 md:px-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <span className="text-[#006d44] font-medium uppercase tracking-[4px]">
            {genesisData.topTitle}
          </span>

          <h2 className="text-4xl font-bold text-[#274255]">
            {genesisData.heading}
          </h2>

          <div className="space-y-4 text-gray-600 leading-8">
            <p>{genesisData.paragraph1}</p>

            <p>{genesisData.paragraph2}</p>

            <p className="italic font-bold text-[#274255] border-l-4 border-[#006d44] pl-4">
              {genesisData.quote}
            </p>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="rounded-[40px] overflow-hidden shadow-2xl">
            <img
              src={genesisData.image?.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-200 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}

GenesisSection;

function StatisticsSection() {
  return (
    <section className="py-10 sm:py-28 px-5 md:px-16 bg-[#162839] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">
            Building India's Most Trusted{" "}
            <span className="text-[#33cc99]"> Property</span> Cycle.
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div>
                {/* <h3 className="font-bold text-[#ffe088] mb-2">
                  Digital Transformation
                </h3> */}
                <p className="text-slate-300">
                  Diginiwas's is on a mission to make property transaction
                  simple, transparent and intelligent for everyone.
                </p>
              </div>
            </div>

            {/* <div className="flex gap-4">
              <div>
                <h3 className="font-bold text-[#ffe088] mb-2">NRI Demand</h3>
                <p className="text-slate-300">
                  A $50 Billion untapped investment potential from the global
                  diaspora.
                </p>
              </div>
            </div> */}
          </div>
        </div>

        <div className="bg-[#2c3e50] rounded-2xl ">
          {/* <div className="flex items-end justify-between h-[300px] gap-4"> */}
          {/* <div className="flex flex-col justify-end items-center flex-1 h-full">
              <div
                className="w-full bg-[#006d44] rounded-t-lg"
                style={{ height: "20%" }}
              />
              <span className="mt-4 text-xs">2020</span>
            </div>

            <div className="flex flex-col justify-end items-center flex-1 h-full">
              <div
                className="w-full bg-[#006d44] rounded-t-lg"
                style={{ height: "40%" }}
              />
              <span className="mt-4 text-xs">2022</span>
            </div>

            <div className="flex flex-col justify-end items-center flex-1 h-full">
              <div
                className="w-full bg-[#006d44] rounded-t-lg"
                style={{ height: "65%" }}
              />
              <span className="mt-4 text-xs">2024</span>
            </div>

            <div className="flex flex-col justify-end items-center flex-1 h-full">
              <div
                className="w-full bg-[#cca730] rounded-t-lg"
                style={{ height: "90%" }}
              />
              <span className="mt-4 text-xs text-[#ffe088]">2026F</span>
            </div> */}
          <img src={growth} className="rounded-2xl md:h-56 lg:h-full" />
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="py-10 sm:py-28 px-5 md:px-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="  text-3xl  c">Our Approach</span>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#006d44] -translate-x-1/2" />

        <div className="block md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-[#006d44]" />

        <div className="relative flex md:justify-start items-center mb-24">
          <div className="md:w-1/2 md:pr-12 pl-16 md:pl-0 ">
            <div className="bg-white p-8 rounded-2xl text-end shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#006d44] hover:border-2">
              <h3 className="text-2xl font-medium text-[#162839] mb-2">
                Verified Network
              </h3>

              <p className="text-gray-600">
                Every DigiNiwas partner is carefully verified to build a trusted
                real estate community.
              </p>
            </div>
          </div>

          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#006d44] border-4 border-white flex items-center justify-center shadow-lg">
            <Search size={22} className="text-white" />
          </div>
        </div>

        <div className="relative flex justify-end items-center mb-24">
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#cca730] border-4 border-white flex items-center justify-center shadow-lg">
            <BarChart3 size={22} className="text-white" />
          </div>

          <div className="md:w-1/2 md:pl-12 pl-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg  transition-all duration-300 hover:border-[#006d44] hover:border-2">
              <h3 className="text-2xl font-medium text-[#162839] mb-2">
                One Digital Platform
              </h3>

              <p className="text-gray-600">
                Search, list, promote and manage properties—all from one
                seamless platform.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex md:justify-start items-center">
          <div className="md:w-1/2 md:pr-12 pl-16 md:pl-0">
            <div className="bg-white p-8 rounded-2xl text-end shadow-sm hover:shadow-lg  transition-all duration-300 hover:border-[#006d44] hover:border-2">
              <h3 className="text-2xl font-medium text-[#162839] mb-2">
                Smarter with Niwas AI
              </h3>

              <p className="text-gray-600">
                AI-powered property discovery designed to make buying, renting,
                selling and leasing faster, simpler and more personalized.
              </p>
            </div>
          </div>

          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#006d44] border-4 border-white flex items-center justify-center shadow-lg">
            <Rocket size={22} className="text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const [missionVision, setMissionVision] = useState(dummyMissionVision);

  const getMissionVision = async () => {
    try {
      const res = await axios.get("/cms/about-mission-vision");

      setMissionVision({
        mission: {
          title: res.data.mission?.title || dummyMissionVision.mission.title,

          heading:
            res.data.mission?.heading || dummyMissionVision.mission.heading,

          description:
            res.data.mission?.description ||
            dummyMissionVision.mission.description,
        },

        vision: {
          title: res.data.vision?.title || dummyMissionVision.vision.title,

          heading:
            res.data.vision?.heading || dummyMissionVision.vision.heading,

          description:
            res.data.vision?.description ||
            dummyMissionVision.vision.description,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMissionVision();
  }, []);

  return (
    <section className="py-12 sm:py-28 px-5 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-[#274255] text-white p-12 rounded-[40px]  group hover:border   hover:bg-gray-100 hover:text-[#162839] transition-all duration-500">
          <span className="text-[#ffe088] font-bold group-hover:text-[#006d44]">
            {missionVision.mission.title}
          </span>

          <h3 className="text-2xl sm:text-3xl text-center sm:text-left font-semibold mt-4 mb-4">
            {missionVision.mission.heading}
          </h3>

          <p className="text-center sm:text-left">
            {missionVision.mission.description}
          </p>
        </div>

        <div
          className="bg-gray-100 p-12 rounded-[40px] border   group  transition-all duration-500
      hover:bg-[#274255] hover:text-white"
        >
          <span className="text-[#006d44] font-bold duration-500 group-hover:text-[#ffe088]">
            {missionVision.vision.title}
          </span>

          <h3 className="text-3xl font-semibold mt-4 mb-4 ">
            {missionVision.vision.heading}
          </h3>

          <p>{missionVision.vision.description}</p>
        </div>
      </div>
    </section>
  );
}

// function FeaturesSection() {
//   return (
//     <section className="py-12 sm:py-28 px-5 md:px-16 bg-white">
//       <div className="max-w-7xl mx-auto text-center mb-16">
//         <span className="uppercase tracking-widest text-[#006d44] font-bold">
//           More Than a Platform
//         </span>
//       </div>

//       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
//         <div className="bg-gray-50 p-8 rounded-3xl border  transition-all duration-300 hover:border-[#274255] hover:border-2">
//           <h4 className="text-2xl font-semibold text-[#162839] mb-4">
//             AI Real Estate Assistant
//           </h4>
//           <p>
//             Personalized property recommendations based on financial goals and
//             lifestyle preferences.
//           </p>
//         </div>

//         <div className="bg-gray-50 p-8 rounded-3xl border  transition-all duration-300 hover:border-[#274255] hover:border-2">
//           <h4 className="text-2xl font-semibold text-[#24255] mb-4">
//             Verified Listings
//           </h4>
//           <p>
//             Every property undergoes a 42-point background check before
//             appearing on Niwas AI.
//           </p>
//         </div>

//         <div className="bg-gray-50 p-8 rounded-3xl border  transition-all duration-300 hover:border-[#274255] hover:border-2">
//           <h4 className="text-2xl font-semibold text-[#274255] mb-4">
//             NRI Priority Support
//           </h4>
//           <p>
//             Seamless digital documentation and virtual walkthroughs for our
//             global Diginiwas family.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
function FeaturesSection() {
  const [cmsData, setCmsData] = useState({
    topTitle: "More Than a Platform",
    features: [
      {
        title: "AI Real Estate Assistant",
        description:
          "Personalized property recommendations based on financial goals and lifestyle preferences.",
      },
      {
        title: "Verified Listings",
        description:
          "Every property undergoes a 42-point background check before appearing on Niwas AI.",
      },
      {
        title: "NRI Priority Support",
        description:
          "Seamless digital documentation and virtual walkthroughs for our global Diginiwas family.",
      },
    ],
  });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get("/cms/platform-features");

        if (res.data?.success && res.data?.data) {
          setCmsData({
            topTitle: res.data.data.topTitle || "More Than a Platform",
            features:
              res.data.data.features?.length === 3
                ? res.data.data.features
                : cmsData.features,
          });
        }
      } catch (error) {
        console.error("Error fetching platform features from CMS:", error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section className="py-12 sm:py-28 px-5 md:px-16 bg-white">
      {/* Dynamic Top Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="uppercase tracking-widest text-[#006d44] font-bold">
          {cmsData.topTitle}
        </span>
      </div>

      {/* Dynamic 3-Card Grid Setup */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {cmsData.features.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-8 rounded-3xl border transition-all duration-300 hover:border-[#274255] hover:border-2"
          >
            <h4 className="text-2xl font-semibold text-[#162839] mb-4">
              {item.title}
            </h4>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisionariesSection() {
  const [visionaryData, setVisionaryData] = useState(dummyVisionaries);

  const getVisionaries = async () => {
    try {
      const res = await axios.get("/cms/about-visionaries");
      const payload = res?.data?.data || res?.data?.section || res?.data || {};
      const members = Array.isArray(payload.members) ? payload.members : [];

      setVisionaryData({
        sectionTitle: payload.sectionTitle || dummyVisionaries.sectionTitle,
        sectionSubtitle: payload.sectionSubtitle || dummyVisionaries.sectionSubtitle,
        members: members.length
          ? members.map((member) => ({
              ...member,
              image: typeof member?.image === "string"
                ? { url: member.image }
                : member?.image?.url
                  ? member.image
                  : undefined,
            }))
          : dummyVisionaries.members,
      });
    } catch (err) {
      console.log("Visionaries CMS unavailable; using defaults.", err);
      setVisionaryData(dummyVisionaries);
    }
  };

  useEffect(() => {
    getVisionaries();
  }, []);

  return (
    <section className="py-28 px-5 md:px-16 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-medium text-[#274255]">
          {visionaryData.sectionTitle}
        </h2>

        <span className="  text-xl sm:text-2xl  ">
          {visionaryData.sectionSubtitle}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {visionaryData.members.map((member, index) => (
          <div key={index}>
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden mb-6 shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={member.image?.url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}
                alt={member.name || "Visionary"}
                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
            </div>

            <h3 className="text-2xl font-semibold text-[#274255]">
              {member.name}
            </h3>

            <p className="text-[#006d44] font-semibold mb-4">
              {member.designation}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {member.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  return (
    <section className="bg-[#162839] text-center py-20 px-5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-semibold leading-[1.05] text-white mb-12">
          The Future of Real Estate is
          <br />
          <span className="text-[#ffe088] inline-block mt-2">
            Intelligent, Trusted and 
          </span>
          <span className="text-[#ffe088] inline-block mt-4" > Connected. </span>
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button
            onClick={() => setShowComingSoon(true)}
            className="bg-[#33cc99] text-white px-10 py-4 rounded-full"
          >
            Start Your Search
          </button>

          <button
            onClick={() => navigate("/agent-corner")}
            className="border-2 border-white text-white px-10 py-4 rounded-full"
          >
            Partner With Us
          </button>
        </div>
      </div>

      {showComingSoon && (
        <ComingSoonVideo
          setShowComingSoon={setShowComingSoon}
          video={import.meta.env.VITE_NIWAS_AI}
        />
      )}
    </section>
  );
}

const About = () => {
  return (
    <main className="bg-[#f8f9fa] text-[#191c1d]">
      <HeroSection />
      <GenesisSection />
      <JourneySection />
      <MissionVisionSection />
      <FeaturesSection />
      <StatisticsSection />

      <VisionariesSection />
      <CTASection />
    </main>
  );
};

export default About;
