import React from "react";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { X, ArrowLeft, Smartphone } from "lucide-react";

export default function AppDownloadModal({ onClose, role, onBack }) {
  const roleLabel = role === "seller" ? "Seller" : role === "buyer" ? "Buyer" : "Partner";
  const playStoreUrl = import.meta.env.VITE_PLAY_STORE_URL || "";
  const appStoreUrl = import.meta.env.VITE_APP_STORE_URL || "";

  const openStore = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-[10050] flex items-center justify-center bg-[#061520]/75 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/15 bg-[#193247] shadow-2xl">
        <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[#33cc99]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-[#33cc99]/10 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="relative px-6 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-9">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-[#33cc99]"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#33cc99]/15 text-[#33cc99] ring-1 ring-[#33cc99]/25">
            <Smartphone size={28} />
          </div>

          <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-[#33cc99]">
            {roleLabel} App
          </p>
          <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-white sm:text-4xl">
            Everything you need, in the app.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-white/60">
            Continue your {roleLabel.toLowerCase()} journey from the DigiNiwas
            mobile app. Android and iOS apps are coming soon.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openStore(playStoreUrl)}
              className="group flex w-full max-w-[250px] items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left transition hover:-translate-y-1 hover:border-[#33cc99] hover:bg-white/15"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#33cc99] shadow-lg">
                <IoLogoGooglePlaystore className="text-3xl text-[#193247]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Get it on
                </p>
                <p className="text-lg font-black text-white group-hover:text-[#33cc99]">
                  Google Play
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => openStore(appStoreUrl)}
              className="group flex w-full max-w-[250px] items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left transition hover:-translate-y-1 hover:border-[#33cc99] hover:bg-white/15"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-lg">
                <FaApple className="text-3xl text-black" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Download on the
                </p>
                <p className="text-lg font-black text-white group-hover:text-[#33cc99]">
                  App Store
                </p>
              </div>
            </button>
          </div>

          <div className="mx-auto mt-7 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-3">
            <div className="flex -space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#33cc99] ring-2 ring-[#193247]">
                <IoLogoGooglePlaystore className="text-[#193247]" />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-2 ring-[#193247]">
                <FaApple className="text-black" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Mobile App Coming Soon</p>
              <p className="text-xs text-white/50">Android & iOS</p>
            </div>
            <span className="ml-2 h-2.5 w-2.5 rounded-full bg-[#33cc99] shadow-[0_0_0_5px_rgba(51,204,153,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
