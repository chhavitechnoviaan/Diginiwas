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
    <div className="min-h-screen bg-[#F5F9FA] text-[#102E46]">
      <section className="bg-[#274255] px-4 pb-12 pt-8 text-white sm:px-8 sm:pb-16 lg:px-14">
        <div className="mx-auto max-w-[1280px] rounded-[30px] bg-[#081522] px-5 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_480px] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#33CC99]">DigiNiwas Tools</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Area Converter</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#AFC2CC] sm:text-base">
                Quickly convert property area units used across India. Get accurate, reliable conversions for real estate, investments, and property documents.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  ["Property listings", FileText],
                  ["Land records", MapPinned],
                  ["Investment planning", Sparkles],
                ].map(([label, Icon]) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-[#294554] bg-[#102333] px-3 py-2 text-[10px] font-bold text-[#B8C9D0]">
                    <Icon size={13} className="text-[#33CC99]" /> {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#274354] bg-[#102333] p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173A45] text-[#33CC99]"><Calculator size={19} /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8199A5]">India · General</p>
                  <p className="text-sm font-black text-white">Convert Area</p>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-[10px] font-black uppercase tracking-wider text-[#91A9B4]">Value</label>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="number"
                  min="0"
                  className="mt-2 h-12 w-full rounded-xl border border-[#315161] bg-[#0B1C29] px-4 text-base font-bold text-white outline-none placeholder:text-[#637B87] focus:border-[#33CC99]"
                  placeholder="Enter area"
                />
              </div>

              <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                <UnitSelect label="From" value={from} onChange={setFrom} dark />
                <button type="button" onClick={swap} className="mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#173A45] text-[#33CC99] transition hover:bg-[#20505A]" aria-label="Swap units">
                  <ArrowLeftRight size={15} />
                </button>
                <UnitSelect label="To" value={to} onChange={setTo} dark />
              </div>

              <div className="mt-4 rounded-2xl border border-[#235A5A] bg-[#0B1C29] p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#6FE2C0]">Converted Result</p>
                <p className="mt-1 text-2xl font-black text-white">{format(result)} {toName}</p>
                <p className="mt-1 text-[10px] text-[#8199A5]">{format(Number(value) || 0)} {fromName} converted to {toName}</p>
                <button type="button" onClick={copyResult} className="mt-3 inline-flex items-center gap-2 text-[10px] font-black text-[#33CC99]">
                  {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                  {copied ? "Result copied" : "Copy Result"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:px-10">
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

        <section className="mt-10 rounded-[26px] bg-[#274255] p-6 text-white shadow-[0_20px_50px_rgba(16,46,70,0.12)] sm:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#33CC99]">Understanding the calculation</p>
          <h2 className="mt-2 text-2xl font-black">How Area Conversion Works</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#B9C9D0]">
            Choose the unit you want to convert from, choose the target unit, enter the area and the converter calculates the result using the relevant conversion factor. You can swap the units with one click or copy the result for quick sharing.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#38586A] bg-[#081522] p-5"><p className="text-[10px] font-black uppercase tracking-wider text-[#33CC99]">Formula</p><p className="mt-2 text-lg font-black">Value in target unit = Value in source unit × Conversion Factor</p></div>
            <div className="rounded-2xl border border-[#38586A] bg-[#081522] p-5"><p className="text-[10px] font-black uppercase tracking-wider text-[#33CC99]">Example</p><p className="mt-2 text-sm leading-6 text-[#B9C9D0]">10 Square Meters × 10.7639 = 107.639 Square Feet.</p></div>
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

function UnitSelect({ label, value, onChange, dark = false }) {
  return (
    <label className="block">
      <span className={`mb-1 block text-[9px] font-black uppercase tracking-wider ${dark ? "text-[#8199A5]" : "text-[#71858D]"}`}>{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-10 w-full appearance-none rounded-xl border px-3 pr-8 text-[11px] font-bold outline-none ${dark ? "border-[#315161] bg-[#0B1C29] text-white focus:border-[#33CC99]" : "border-[#D7E5E7] bg-white text-[#274255] focus:border-[#33CC99]"}`}
        >
          {units.map(([key, name]) => <option key={key} value={key}>{name}</option>)}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78909C]" />
      </span>
    </label>
  );
}
