import React from "react";
import { ArrowRight, Calculator, CircleDollarSign, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    title: "Area Calculator",
    description: "Convert land and property area between commonly used Indian units.",
    icon: Calculator,
    href: "/area-calculator",
    meta: "Square Feet • Acre • Bigha • Cent",
  },
  {
    title: "Property Valuation",
    description: "Get a quick estimate to understand the potential value of your property.",
    icon: CircleDollarSign,
    href: "/property-valuation",
    meta: "Value • Price • Market estimate",
  },
  {
    title: "Rent Value Calculator",
    description: "Estimate a practical rental value for your property using key property details.",
    icon: Home,
    href: "/rent-value-calculator",
    meta: "Rent • Yield • Property insights",
  },
];

export default function PropertyResearchTools() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#274255] px-4 py-12 text-white sm:px-8 sm:py-16 lg:px-8 ">
      <div className="mx-auto max-w-[1380px] rounded-[30px] bg-[#081522] px-5 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.20)] sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#33CC99]">
              DigiNiwas Tools
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              User property research tools
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#AFC2CC] sm:text-base">
              Calculate area, understand property value and explore practical financial options before your next property decision.
            </p>
          </div>
          <span className="hidden rounded-full border border-[#254354] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8FA8B4] lg:inline-flex">
            Smart property tools
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tools.map(({ title, description, icon: Icon, href, meta }) => (
            <button
              key={title}
              type="button"
              onClick={() => navigate(href)}
              className="group relative overflow-hidden rounded-[24px] border border-[#203747] bg-[#102333] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#33CC99] hover:bg-[#142A3B] hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#33CC99]">DigiNiwas Tool</p>
                  <h3 className="mt-2 text-xl font-black text-white">{title}</h3>
                  <p className="mt-2 max-w-sm text-xs leading-5 text-[#AFC2CC]">{description}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#173A45] text-[#33CC99] ring-1 ring-[#235A5A]">
                  <Icon size={20} />
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-[#254354] bg-[#0C1D2A] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold leading-4 text-[#91A9B4]">{meta}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D9B78] text-white transition group-hover:translate-x-1">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
