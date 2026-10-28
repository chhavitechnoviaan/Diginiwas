import React from "react";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function LegalPage({
  eyebrow = "DigiNiwas Legal",
  title,
  description,
  effectiveDate = "[DD Month YYYY]",
  sections = [],
  footerLinks = [],
}) {
  return (
    <div className="min-h-screen bg-[#F6F8F7] text-[#274255]">
      <section className="relative overflow-hidden bg-[#0F2E46] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#33cc99]/10 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-[#33cc99]/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#33cc99]/25 bg-[#33cc99]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#62e7bf]">
            <ShieldCheck size={13} />
            {eyebrow}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            {description}
          </p>
          <p className="mt-5 text-xs font-bold text-[#62e7bf]">
            Effective date: {effectiveDate}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="space-y-5">
          {sections.map((section, index) => (
            <article key={`${section.title}-${index}`} className="rounded-[24px] border border-[#DCE8EA] bg-white p-6 shadow-[0_12px_35px_rgba(16,46,70,.05)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F4] text-[#0B8B74]">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-black tracking-tight text-[#102E46] sm:text-2xl">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-[#627983]">
                    {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                    {section.bullets?.length ? (
                      <ul className="ml-5 list-disc space-y-2">
                        {section.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    ) : null}
                    {section.rows?.length ? (
                      <div className="overflow-x-auto rounded-2xl border border-[#DCE8EA]">
                        <table className="min-w-full text-left text-sm">
                          <thead className="bg-[#F2F7F6] text-[#274255]">
                            <tr>
                              {section.headers.map((h) => <th key={h} className="px-4 py-3 font-black">{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {section.rows.map((row, ri) => (
                              <tr key={ri} className="border-t border-[#E7EFF0] align-top">
                                {row.map((cell, ci) => <td key={ci} className="px-4 py-3 text-[#627983]">{cell}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {footerLinks.length ? (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {footerLinks.map((link) => (
              <Link key={link.path} to={link.path} className="group flex items-center justify-between rounded-2xl border border-[#DCE8EA] bg-white px-5 py-4 text-sm font-black text-[#274255] shadow-sm transition hover:border-[#33cc99]">
                {link.label}
                <ArrowRight size={16} className="text-[#0B8B74] transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        ) : null}

        {/* <p className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-900">
          This website copy is based on the DigiNiwas legal master draft. The source document states that bracketed placeholders must be replaced and that final legal wording should be reviewed by qualified Indian counsel before public launch.
        </p> */}
      </main>
    </div>
  );
}
