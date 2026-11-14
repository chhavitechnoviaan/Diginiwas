import React, { useState } from "react";
import { ArrowRight, KeyRound } from "lucide-react";
import AppDownloadModal from "../../components/common/AppDownloadModal";

export default function HomeSellPropertyCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-[#274255] px-4 pb-12 pt-0 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative overflow-hidden rounded-[30px] border border-[#315163] bg-[#081522] px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.20)] sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#33CC99]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-20 h-56 w-56 rounded-full bg-[#33CC99]/8 blur-3xl" />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#28515A] bg-[#122D3C] text-[#33CC99] sm:flex">
                  <KeyRound size={34} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#33CC99]">
                    List Your Property
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Have a property to sell?
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#AFC2CC] sm:text-base">
                    List your property and connect with genuine buyers and clients faster through DigiNiwas.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0D9B78] px-6 py-3.5 text-xs font-black text-white shadow-[0_10px_25px_rgba(13,155,120,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0B896B]"
              >
                List Your Property
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {open && (
        <AppDownloadModal
          role="seller"
          onClose={() => setOpen(false)}
          onBack={() => setOpen(false)}
        />
      )}
    </>
  );
}
