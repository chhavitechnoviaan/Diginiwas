import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Copy,
  FileText,
  HelpCircle,
  Info,
  MapPinned,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const units = [
  ["sqm", "Square Meter", "m²"],
  ["sqft", "Square Feet", "sq ft"],
  ["sqyd", "Square Yard", "sq yd"],
  ["acre", "Acre", "ac"],
  ["hectare", "Hectare", "ha"],
  ["cent", "Cent", "cent"],
  ["guntha", "Guntha", "guntha"],
  ["bigha", "Bigha", "bigha"],
  ["sqkm", "Square Kilometer", "km²"],
];

const toSqFt = {
  sqft: 1,
  sqm: 10.7639,
  sqyd: 9,
  acre: 4046.86 * 10.7639,
  hectare: 107639.104167,
  cent: 435.6,
  guntha: 1089,
  bigha: 27225,
  sqkm: 10763910.4167,
};

const popular = [
  {
    title: "Square Meter to Square Feet",
    description: "Convert m² to sq ft for Indian real estate sizing and property comparisons.",
    factor: "1 m² = 10.7639 sq ft",
    from: "sqm",
    to: "sqft",
  },
  {
    title: "Hectare to Acre",
    description: "Land measurement conversion for farms, plots, and large parcels.",
    factor: "1 ha = 2.47105 acre",
    from: "hectare",
    to: "acre",
  },
  {
    title: "Cent to Square Feet",
    description: "South India land-unit conversion used in listings and registry discussions.",
    factor: "1 cent = 435.6 sq ft",
    from: "cent",
    to: "sqft",
  },
  {
    title: "Square Feet to Cent",
    description: "Reverse conversion to estimate cents from sq ft area values.",
    factor: "1 sq ft = 0.00229568 cent",
    from: "sqft",
    to: "cent",
  },
  {
    title: "Square Feet to Square Yard",
    description: "Plotting conversion when areas are quoted in sq yd.",
    factor: "1 sq ft = 0.111111 sq yd",
    from: "sqft",
    to: "sqyd",
  },
  {
    title: "Square Yard to Square Feet",
    description: "Common plotting conversion used by brokers and developers.",
    factor: "1 sq yd = 9 sq ft",
    from: "sqyd",
    to: "sqft",
  },
  {
    title: "Square Feet to Acre",
    description: "Large-parcel conversion for agricultural and land-area references.",
    factor: "1 sq ft = 0.0000229568 acre",
    from: "sqft",
    to: "acre",
  },
];

const majorUnits = [
  ["Square Foot (sq ft)", "Most popular unit used in Indian real estate for area measurement.", "1 Square Foot = 0.092903 Square Meter", "Common in property listings, agreements, and home measurements across India."],
  ["Square Meter (sq m)", "Standard metric unit for land and building area.", "1 Square Meter = 10.7639 Square Feet", "Used in official documents and modern property measurements across India."],
  ["Acre (ac)", "Unit used for measuring large land areas like farms and plots.", "1 Acre = 4046.86 Square Meters", "Common for agricultural land and big properties."],
  ["Cent (cent)", "Popular unit for measuring small to medium land plots.", "1 Cent = 435.6 Square Feet", "Mostly used in South Indian property transactions and listings."],
  ["Hectare (ha)", "Metric unit for large land areas primarily used in agriculture.", "1 Hectare = 2.47105 Acres", "Common in agriculture and government land records."],
];

const faqs = [
  ["What is an area converter and why do I need it?", "An area converter helps you switch between units used to measure land or property sizes. It is useful because Indian listings, legal documents and approvals may use different units."],
  ["Which units are common in Indian real estate area measurement?", "Common units include Square Feet, Square Meter, Acre, Cent, Bigha and regional variants. Square Feet is widely used in cities, while Acre and Cent are common for agricultural or rural land."],
  ["How accurate are the conversions on this tool?", "The calculator uses standard conversion factors. Regional units such as Bigha can vary by state, so local standards should be verified before a transaction."],
  ["Can I convert from any unit to any other unit?", "Yes. Select the unit you have, select the unit you want, enter the value and view the converted result instantly."],
  ["Is this converter useful for agricultural land too?", "Yes. Units such as Acre, Hectare and Bigha are commonly used for agricultural land measurement and sales."],
  ["How do I use the converter?", "Select the From unit, select the To unit, enter the area value and view the result. You can also swap units or copy the result."],
  ["Can I trust the conversion for official documents?", "Use standard conversion factors as a reference, but verify the applicable local or official measurement standard when preparing legal or government documentation."],
  ["Why are there so many different units for land in India?", "India has a diverse land-measurement history. Regional units developed in different areas, while metric and imperial systems continue to be used alongside them."],
];

export default function AreaCalculator() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("sqm");
  const [to, setTo] = useState("sqft");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) return 0;
    return (number * toSqFt[from]) / toSqFt[to];
  }, [value, from, to]);

  const format = (number) =>
    Number(number).toLocaleString("en-IN", { maximumFractionDigits: 6 });

  const fromName = units.find((unit) => unit[0] === from)?.[1] || "";
  const toName = units.find((unit) => unit[0] === to)?.[1] || "";

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const copyResult = async () => {
    const text = `${format(result)} ${toName}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7F7] text-[#15364A]">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#11354B] via-[#1B4C55] to-[#047E69] px-5 pb-24 pt-14 text-white lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border-[64px] border-white/5" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-[#3FE5B4]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#80EACB]/40 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-[#8FF8D9]">
            <Sparkles size={14}/> DigiNiwas property tools
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Every area, <span className="text-[#6DE8BE]">perfectly converted.</span></h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">Instantly convert property and land measurements across India. One simple tool for homes, plots, investments and property documents.</p>
        </div>
      </section>

      <div className="relative mx-auto -mt-16 grid max-w-6xl items-stretch gap-5 px-4 lg:grid-cols-[.9fr_1.1fr] lg:gap-8">
        <aside className="overflow-hidden rounded-[28px] border border-[#DDEBE8] bg-gradient-to-b from-[#EAF9F2] to-white p-7 shadow-[0_16px_60px_rgba(16,53,75,.08)] lg:p-9">
          <span className="text-[11px] font-black uppercase tracking-[.18em] text-[#0B9878]">DIGINIWAS AREA INTELLIGENCE</span>
          <h2 className="mt-3 text-3xl font-black leading-tight">Measure with ease.<br/><span className="text-[#0E9C7D]">Decide with confidence.</span></h2>
          <p className="mt-4 text-sm leading-7 text-[#627A83]">From square feet to acres, switch between the measurements you use every day—without the guesswork.</p>
          <div className="my-9 flex h-48 items-center justify-center rounded-[25px] bg-gradient-to-br from-[#D7F6E8] to-[#EAF2FF]">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-[32px] bg-white shadow-xl">
              <Ruler size={61} strokeWidth={1.4} className="text-[#087E69]"/>
              <div className="absolute -right-8 -top-5 rounded-2xl bg-[#143D50] p-3 text-white shadow-lg"><ArrowLeftRight size={27}/></div>
              <div className="absolute -bottom-5 -left-9 rounded-2xl bg-white p-3 text-[#0A9E80] shadow-lg"><MapPinned size={27}/></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[[Ruler,"9 area units"],[ArrowLeftRight,"Instant results"],[MapPinned,"Land & property"],[ShieldCheck,"Clear reference"]].map(([Icon,label])=>(
              <div key={label} className="rounded-2xl border border-[#D9ECE6] bg-white p-4"><Icon size={20} className="text-[#09A580]"/><p className="mt-2 text-xs font-extrabold">{label}</p></div>
            ))}
          </div>
        </aside>

        <section aria-label="Area conversion calculator" className="rounded-[28px] border border-[#DDE8E9] bg-white p-6 shadow-[0_16px_60px_rgba(16,53,75,.08)] sm:p-9">
          <div className="flex items-center justify-between gap-3">
            <div><p className="text-[11px] font-black uppercase tracking-[.18em] text-[#0C9C7A]">Area converter</p><h2 className="mt-1 text-2xl font-black">Convert your area</h2></div>
            <span className="rounded-xl bg-[#E8F8F1] px-3 py-2 text-xs font-black text-[#0B8F70]">Live result</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#728A91]">Enter a measurement, choose your units and see the result instantly.</p>
          <div className="mt-8">
            <label htmlFor="area-converter-value" className="mb-2 block text-xs font-extrabold text-[#365769]">Area value</label>
            <input id="area-converter-value" value={value} onChange={(e) => setValue(e.target.value)} type="number" min="0" step="any" className="h-14 w-full rounded-xl border border-[#D8E7E7] bg-[#F8FBFB] px-4 text-lg font-extrabold text-[#15364A] outline-none transition focus:border-[#0BA381] focus:ring-4 focus:ring-[#0BA381]/10" placeholder="Enter property area" />
          </div>
          <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-2 sm:gap-3">
            <UnitSelect label="Convert from" value={from} onChange={setFrom}/>
            <button type="button" onClick={swap} className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl border border-[#CBEAE1] bg-[#E8F8F1] text-[#098F71] transition hover:rotate-180 hover:bg-[#D4F3E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0BA381]" aria-label="Swap area units" title="Swap units"><ArrowLeftRight size={19}/></button>
            <UnitSelect label="Convert to" value={to} onChange={setTo}/>
          </div>
          <div className="mt-7 overflow-hidden rounded-[22px] bg-[#15394C] p-6 text-white">
            <div className="flex items-center justify-between"><p className="text-[11px] font-bold uppercase tracking-[.15em] text-[#8DEBD0]">Converted result</p><CheckCircle2 size={19} className="text-[#6DE8BE]"/></div>
            <p className="mt-3 break-words text-3xl font-black leading-tight text-[#6DE8BE] sm:text-4xl">{format(result)}</p>
            <p className="mt-1 text-sm font-bold text-white">{toName}</p>
            <div className="my-5 h-px bg-white/15"/>
            <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-white/70">{format(Number(value) || 0)} {fromName} = {format(result)} {toName}</p><button type="button" onClick={copyResult} className="inline-flex items-center gap-2 rounded-lg bg-[#E3F9F1] px-3 py-2 text-xs font-black text-[#087E69] transition hover:bg-white">{copied ? <CheckCircle2 size={14}/> : <Copy size={14}/>} {copied ? "Copied!" : "Copy result"}</button></div>
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-[#DDEDE8] bg-[#F6FBF9] p-4"><Info size={16} className="mt-0.5 shrink-0 text-[#0D9B78]"/><p className="text-xs leading-5 text-[#607B84]">Calculations use standard unit factors. Bigha and other regional land units can vary by state—confirm local records for official use.</p></div>
        </section>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D9B78]">Quick reference</p>
              <h2 className="mt-1 text-2xl font-black">Popular Conversions</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => { setFrom(item.from); setTo(item.to); setValue("1"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group rounded-[20px] border border-[#DDE7EA] bg-white p-5 text-left shadow-[0_10px_30px_rgba(16,46,70,0.05)] transition hover:-translate-y-1 hover:border-[#86D9C3]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black text-[#274255]">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#71858D]">{item.description}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF8F4] text-[#0D9B78]"><ArrowLeftRight size={15} /></span>
                </div>
                <p className="mt-4 text-xs font-black text-[#0D8D70]">{item.factor}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[26px] border border-[#DDE7EA] bg-white p-6 shadow-[0_10px_30px_rgba(16,46,70,0.04)] sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#0D9B78]"><Ruler size={18} /></span>
            <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0D9B78]">Reference library</p><h2 className="text-2xl font-black">All Area Units (A-Z)</h2></div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["A", "Acre, Ankanam, Are"], ["B", "Bigha (MP), Bigha Gujarat"], ["C", "Cent, Centiare, Chatak"],
              ["D", "Decimal, Dhur-Bihar, Dhur-Jharkhand"], ["G", "Ghumaon, Ground, Guntha"], ["H", "Hectare"],
              ["K", "Kachwansi, Kanal, Kattha-Assam, Kattha-Bengal"], ["L", "Lecha"], ["M", "Marla, Murabba"],
              ["N", "Nalli"], ["P", "Perch"], ["R", "Rood"], ["S", "Sarsahi, Shatak, Square Centimeters, Square Feet, Square Inch, Square Kilometer, Square Meter, Square Mile, Square Yard"], ["U", "Unwasi"],
            ].map(([letter, value]) => (
              <div key={letter} className="rounded-2xl border border-[#E2EAEC] bg-[#F9FCFC] p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0D9B78]">{letter}</p>
                <p className="mt-1 text-xs font-bold leading-5 text-[#526B77]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            ["Where it matters", "Use the area converter for property listings, land registry documents, municipal approvals, circle rates, and investment planning across different Indian regions.", MapPinned],
            ["How to use", "Select the unit you have and the unit you want to convert to, enter the value, and instantly get the converted result. Swap between units easily as needed.", Clipboard],
            ["Accuracy & Standards", "Conversions use standard conversion factors. Regional units such as Bigha can vary by state, so verify the local standard when precision is required for a transaction.", ShieldCheck],
          ].map(([title, text, Icon]) => (
            <div key={title} className="rounded-[22px] border border-[#DDE7EA] bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#0D9B78]"><Icon size={18} /></span>
              <h3 className="mt-4 text-lg font-black">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#71858D]">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[26px] bg-gradient-to-r from-[#15394C] to-[#087C6B] p-6 text-white shadow-[0_20px_50px_rgba(16,46,70,0.12)] sm:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6DE8BE]">Understanding the calculation</p>
          <h2 className="mt-2 text-2xl font-black">How Area Conversion Works</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/75">
            Choose the unit you want to convert from, choose the target unit, enter the area and the converter calculates the result using the relevant conversion factor. You can swap the units with one click or copy the result for quick sharing.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5"><p className="text-[10px] font-black uppercase tracking-wider text-[#6DE8BE]">Formula</p><p className="mt-2 text-lg font-black">Value in target unit = Value in source unit × Conversion Factor</p></div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5"><p className="text-[10px] font-black uppercase tracking-wider text-[#6DE8BE]">Example</p><p className="mt-2 text-sm leading-6 text-white/75">10 Square Meters × 10.7639 = 107.639 Square Feet.</p></div>
          </div>
        </section>

        <section className="mt-10">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D9B78]">Know your units</p>
          <h2 className="mt-1 text-2xl font-black">Major Area Units Explained</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {majorUnits.map(([name, desc, conversion, use]) => (
              <article key={name} className="rounded-[20px] border border-[#DDE7EA] bg-white p-5 shadow-sm">
                <h3 className="text-base font-black text-[#274255]">{name}</h3>
                <p className="mt-2 text-xs leading-5 text-[#71858D]">{desc}</p>
                <p className="mt-3 rounded-xl bg-[#F1FAF7] px-3 py-2 text-xs font-black text-[#0D8D70]">{conversion}</p>
                <p className="mt-2 text-[11px] leading-5 text-[#71858D]">{use}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[26px] border border-[#DDE7EA] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#0D9B78]"><Info size={18} /></span><div><p className="text-[10px] font-black uppercase tracking-wider text-[#0D9B78]">Quick reference</p><h2 className="text-2xl font-black">Conversion Reference</h2></div></div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-xs">
              <thead><tr className="border-b border-[#DDE7EA] text-[10px] uppercase tracking-wider text-[#71858D]"><th className="px-3 py-3">From</th><th className="px-3 py-3">To</th><th className="px-3 py-3">Factor</th><th className="px-3 py-3">Region</th><th className="px-3 py-3">Usage</th></tr></thead>
              <tbody>
                {[
                  ["Square Meter", "Square Feet", "10.7639", "Pan-India", "Property listings / documentation"],
                  ["Hectare", "Acre", "2.47105", "Pan-India", "Agricultural land / survey documents"],
                  ["Cent", "Square Feet", "435.6", "Southern India", "Residential plot measurements"],
                  ["Square Feet", "Cent", "0.00229568", "Southern India", "Real estate calculations"],
                  ["Hectare", "Bigha", "3.023", "Northern/central India", "Agricultural land conversions"],
                  ["Square Feet", "Square Yard", "0.111111", "Pan-India", "Property listings"],
                  ["Square Yard", "Square Feet", "9", "Pan-India", "Property sales and land documents"],
                  ["Square Feet", "Acre", "0.000022957", "Pan-India", "Real estate and agriculture"],
                  ["Square Meter", "Square Yard", "1.19599", "Pan-India", "Land size comparisons"],
                  ["Square Yard", "Square Meter", "0.836127", "Pan-India", "Property measurement"],
                ].map((row) => <tr key={`${row[0]}-${row[1]}`} className="border-b border-[#EDF2F3]"><td className="px-3 py-3 font-bold text-[#274255]">{row[0]}</td><td className="px-3 py-3">{row[1]}</td><td className="px-3 py-3 font-black text-[#0D8D70]">{row[2]}</td><td className="px-3 py-3">{row[3]}</td><td className="px-3 py-3 text-[#71858D]">{row[4]}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-[26px] border border-[#DDE7EA] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#0D9B78]"><HelpCircle size={18} /></span><div><p className="text-[10px] font-black uppercase tracking-wider text-[#0D9B78]">Need clarity?</p><h2 className="text-2xl font-black">Frequently Asked Questions</h2></div></div>
          <div className="mt-5 divide-y divide-[#E7EEEE] rounded-2xl border border-[#E2EAEC]">
            {faqs.map(([question, answer]) => <details key={question} className="group p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-[#274255]"><span>{question}</span><ChevronDown size={16} className="shrink-0 text-[#0D9B78] transition group-open:rotate-180" /></summary><p className="mt-3 max-w-4xl text-xs leading-6 text-[#71858D]">{answer}</p></details>)}
          </div>
        </section>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#DDE7EA] bg-[#F9FCFC] p-4 text-[10px] leading-5 text-[#71858D]"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#0D9B78]" /><span>Regional land units can differ by state and locality. Treat Bigha and other regional units as references and verify the applicable local standard before a legal or financial transaction.</span></div>
      </main>
    </div>
  );
}

function UnitSelect({ label, value, onChange }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[11px] font-extrabold text-[#365769]">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full min-w-0 appearance-none rounded-xl border border-[#D8E7E7] bg-[#F8FBFB] pl-3 pr-8 text-[11px] font-bold text-[#15364A] outline-none transition focus:border-[#0BA381] focus:ring-4 focus:ring-[#0BA381]/10 sm:text-xs"
        >
          {units.map(([key, name]) => <option key={key} value={key}>{name}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#66858B]" />
      </span>
    </label>
  );
}
