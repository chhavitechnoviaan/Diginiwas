import React from "react";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      <section className="bg-gradient-to-r from-[#0F2E46] via-[#17435f] to-[#0F2E46] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="px-4 py-2 rounded-full bg-[#33cc99]/20 text-[#33cc99] font-semibold">
            DigiNiwas Cookie Policy
          </span>
          <h1 className="mt-6 text-5xl font-bold">Cookies Policy</h1>
          <p className="mt-6 max-w-3xl text-white/80 leading-8">
            This Cookies Policy explains how DigiNiwas uses cookies to improve
            your property search and Niwas AI experience.
          </p>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8">
        {[
          "What Are Cookies?",
          "Why We Use Cookies",
          "Types of Cookies",
          "Property Experience",
          "Niwas AI Cookies",
          "Third-Party Cookies",
          "Managing Cookies",
          "Updates",
          "Contact Us",
        ].map((t) => (
          <div key={t} className="bg-white rounded-3xl shadow-sm border p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#33cc99]/15 flex items-center justify-center text-2xl"></div>
            <h2 className="mt-6 text-2xl font-bold text-[#0F2E46]">{t}</h2>
            <p className="mt-4 text-gray-600 leading-8">
              This section explains {t.toLowerCase()} for DigiNiwas users
              buying, selling, renting and leasing properties.
            </p>
          </div>
        ))}
      </main>
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-[#0F2E46] rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold">Your Privacy, Your Choice</h2>
          <p className="mt-4 text-white/80">
            You can manage cookies from your browser settings at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
