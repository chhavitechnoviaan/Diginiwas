import React, { useMemo, useState } from "react";
import { Calculator, IndianRupee } from "lucide-react";

export default function PropertyValuation() {
  const [area, setArea] = useState("");
  const [rate, setRate] = useState("");
  const value = useMemo(() => {
    const a = Number(area), r = Number(rate);
    return Number.isFinite(a) && Number.isFinite(r) ? a * r : 0;
  }, [area, rate]);

  return <CalculatorPage title="Property Valuation Calculator" subtitle="Get a simple indicative property value using your area and local rate." fields={[
    ["Property Area (sq ft)", area, setArea, "e.g. 1500"],
    ["Rate per sq ft", rate, setRate, "e.g. ₹8000"],
  ]} result={value} />;
}

function CalculatorPage({ title, subtitle, fields, result }) {
  return (
    <div className="min-h-screen bg-[#F5F9FA] px-4 py-12 text-[#102E46] sm:px-8 lg:px-14">
      <div className="mx-auto max-w-[760px]">
        <div className="rounded-[28px] bg-[#0F2E46] p-7 text-white sm:p-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#33CC99] text-[#0F2E46]"><Calculator size={20} /></span>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-white/65">{subtitle}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {fields.map(([label, value, setValue, placeholder]) => (
              <label key={label} className="block">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/60">{label}</span>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="number" min="0" placeholder={placeholder} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-bold text-white outline-none placeholder:text-white/30 focus:border-[#33CC99]" />
              </label>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-white p-5 text-[#102E46]">
            <p className="text-[9px] font-black uppercase tracking-wider text-[#71858D]">Indicative Value</p>
            <p className="mt-1 flex items-center gap-1 text-3xl font-black text-[#0D8D70]"><IndianRupee size={24} />{result.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
