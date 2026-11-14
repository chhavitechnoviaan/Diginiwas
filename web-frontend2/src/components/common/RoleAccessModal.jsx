import React from "react";
import { ArrowRight, Building2, UserRound, UsersRound, X } from "lucide-react";

const roles = [
  {
    id: "buyer",
    title: "Buyer",
    description: "Find properties, save favourites and connect with trusted partners.",
    icon: UserRound,
  },
  {
    id: "partner",
    title: "Partner",
    description: "Manage leads, listings and your DigiNiwas partner journey.",
    icon: UsersRound,
  },
  {
    id: "seller",
    title: "Seller",
    description: "List your property and reach verified buyers digitally.",
    icon: Building2,
  },
];

export default function RoleAccessModal({ onClose, onSelect }) {
  return (
    <div className="fixed inset-0 z-[10030] flex items-center justify-center bg-[#061520]/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/15 bg-[#193247] shadow-2xl">
        <div className="absolute -right-28 -top-28 h-60 w-60 rounded-full bg-[#33cc99]/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-[#33cc99]/10 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="relative px-5 pb-7 pt-8 sm:px-9 sm:pb-9 sm:pt-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#33cc99]/15 text-[#33cc99] ring-1 ring-[#33cc99]/20">
            <UsersRound size={27} />
          </div>
          <p className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#33cc99]">
            Continue to DigiNiwas
          </p>
          <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who are you?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-6 text-white/60">
            Choose how you want to continue. Buyers can log in or create an account; partners and sellers can continue to the mobile app.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {roles.map(({ id, title, description, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-[#33cc99]/50 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#33cc99]/10 text-[#33cc99] ring-1 ring-[#33cc99]/20 transition group-hover:bg-[#33cc99]/15">
                    <Icon size={23} />
                  </div>
                  <ArrowRight size={18} className="mt-1 text-white/35 transition group-hover:translate-x-1 group-hover:text-[#33cc99]" />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/55">{description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
