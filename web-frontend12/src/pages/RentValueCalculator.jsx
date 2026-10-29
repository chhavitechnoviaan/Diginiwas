import React, { useMemo, useState } from "react";
import { Calculator, IndianRupee } from "lucide-react";

export default function RentValueCalculator() {
  const [value, setValue] = useState("");
  const [yieldRate, setYieldRate] = useState("4");
  const monthly = useMemo(() => {
    const v = Number(value), y = Number(yieldRate);
    return Number.isFinite(v) && Number.isFinite(y) ? (v * y / 100) / 12 : 0;
  }, [value, yieldRate]);

  return (
    <div className="min-h-screen bg-[#F5F9FA] px-4 py-12 text-[#102E46] sm:px-8 lg:px-14">
      <div className="mx-auto max-w-[760px] rounded-[28px] bg-white p-7 shadow-[0_18px_50px_rgba(16,46,70,0.08)] sm:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#0D8D70]"><Calculator size={20} /></span>
        <h1 className="mt-5 text-3xl font-black sm:text-4xl">Rent Value Calculator</h1>
        <p className="mt-2 text-sm leading-6 text-[#71858D]">Estimate monthly rent from property value and an indicative annual rental yield.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field label="Property Value" value={value} onChange={setValue} placeholder="e.g. ₹80,00,000" />
          <Field label="Annual Yield %" value={yieldRate} onChange={setYieldRate} placeholder="e.g. 4" />
        </div>
        <div className="mt-5 rounded-2xl bg-[#0F2E46] p-5 text-white">
          <p className="text-[9px] font-black uppercase tracking-wider text-white/55">Estimated Monthly Rent</p>
          <p className="mt-1 flex items-center gap-1 text-3xl font-black text-[#33CC99]"><IndianRupee size={24} />{monthly.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
    </div>
  );
}
function Field({ label, value, onChange, placeholder }) {
  return <label className="block"><span className="text-[10px] font-black uppercase tracking-wider text-[#71858D]">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} type="number" min="0" className="mt-2 h-12 w-full rounded-xl border border-[#D7E5E7] px-4 text-sm font-bold outline-none focus:border-[#33CC99]" placeholder={placeholder} /></label>;
}
