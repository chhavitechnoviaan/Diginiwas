// import React, { useState } from "react";
// import { ChevronDown, HelpCircle } from "lucide-react";

// export default function FAQSection({
//   title = "Frequently Asked Questions",
//   subtitle = "Quick answers to common questions.",
//   groups = [],
//   dark = false,
// }) {
//   const [openKey, setOpenKey] = useState(null);

//   return (
//     <section className={dark ? "bg-[#06131d] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-20" : "bg-[#F6F8F7] px-4 py-16 text-[#102E46] sm:px-6 lg:px-10 lg:py-20"}>
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-10 max-w-3xl">
//           <span className={dark
//             ? "inline-flex items-center gap-2 rounded-full border border-[#33cc99]/20 bg-[#33cc99]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#5be2b7]"
//             : "inline-flex items-center gap-2 rounded-full border border-[#33cc99]/25 bg-[#33cc99]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B8B74]"
//           }>
//             <HelpCircle size={13} />
//             FAQ
//           </span>
//           <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
//             {title}
//           </h2>
//           <p className={dark ? "mt-3 text-sm leading-6 text-white/55 sm:text-base" : "mt-3 text-sm leading-6 text-[#71858F] sm:text-base"}>
//             {subtitle}
//           </p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-2">
//           {groups.map((group) => (
//             <div key={group.title} className={dark ? "rounded-[24px] border border-white/10 bg-white/[0.04] p-5 sm:p-6" : "rounded-[24px] border border-[#DCE8EA] bg-white p-5 shadow-sm sm:p-6"}>
//               <h3 className={dark ? "mb-4 text-lg font-black text-white" : "mb-4 text-lg font-black text-[#102E46]"}>
//                 {group.title}
//               </h3>

//               <div className="space-y-3">
//                 {(group.items || []).map((item, index) => {
//                   const key = `${group.title}-${index}`;
//                   const open = openKey === key;

//                   return (
//                     <div key={key} className={dark ? "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]" : "overflow-hidden rounded-2xl border border-[#E4ECEE] bg-[#FBFDFC]"}>
//                       <button
//                         type="button"
//                         onClick={() => setOpenKey(open ? null : key)}
//                         className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
//                         aria-expanded={open}
//                       >
//                         <span className={dark ? "text-sm font-black text-white/90" : "text-sm font-black text-[#274255]"}>
//                           {item.question}
//                         </span>
//                         <ChevronDown
//                           size={17}
//                           className={`shrink-0 transition-transform ${open ? "rotate-180" : ""} ${dark ? "text-[#33cc99]" : "text-[#0B8B74]"}`}
//                         />
//                       </button>

//                       {open && (
//                         <div className={dark ? "border-t border-white/10 px-4 pb-4 pt-3 text-xs leading-6 text-white/60" : "border-t border-[#E4ECEE] px-4 pb-4 pt-3 text-xs leading-6 text-[#687F89]"}>
//                           {item.answer}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "",
  groups = [],
  dark = false,
  className = "",
}) {
  // ------------------------------------------------------------
  // Normalize groups
  // ------------------------------------------------------------
  const normalizedGroups = useMemo(() => {
    return (Array.isArray(groups) ? groups : [])
      .filter(Boolean)
      .map((group, index) => ({
        id:
          group.id ||
          group.key ||
          group.title?.toLowerCase().replace(/\s+/g, "-") ||
          `faq-group-${index}`,
        title: group.title || `FAQ ${index + 1}`,
        items: Array.isArray(group.items) ? group.items : [],
      }))
      .filter((group) => group.items.length > 0);
  }, [groups]);

  // ------------------------------------------------------------
  // Active tab
  // ------------------------------------------------------------
  const [activeGroupId, setActiveGroupId] = useState(
    normalizedGroups[0]?.id || ""
  );

  // ------------------------------------------------------------
  // Open question
  // ------------------------------------------------------------
  const [openIndex, setOpenIndex] = useState(null);

  // If groups change dynamically, select first available group
  useEffect(() => {
    if (!normalizedGroups.length) {
      setActiveGroupId("");
      setOpenIndex(null);
      return;
    }

    const exists = normalizedGroups.some(
      (group) => group.id === activeGroupId
    );

    if (!exists) {
      setActiveGroupId(normalizedGroups[0].id);
      setOpenIndex(null);
    }
  }, [normalizedGroups, activeGroupId]);

  // ------------------------------------------------------------
  // Current group
  // ------------------------------------------------------------
  const activeGroup =
    normalizedGroups.find((group) => group.id === activeGroupId) ||
    normalizedGroups[0];

  const activeItems = activeGroup?.items || [];

  // ------------------------------------------------------------
  // Change tab
  // ------------------------------------------------------------
  const handleTabChange = (groupId) => {
    setActiveGroupId(groupId);
    setOpenIndex(null);
  };

  // ------------------------------------------------------------
  // Toggle question
  // ------------------------------------------------------------
  const handleQuestionClick = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  if (!normalizedGroups.length) {
    return null;
  }

  return (
    <section
      className={`w-full ${
        dark ? "bg-[#0F344A] text-white" : "bg-[#F7FAFB] text-[#102E46]"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        {/* ======================================================
            HEADER
        ====================================================== */}
        <div className="mb-7">
          <p
            className={`mb-2 text-[10px] font-black uppercase tracking-[0.22em] ${
              dark ? "text-[#36D49D]" : "text-[#13A77B]"
            }`}
          >
            FAQS
          </p>

          <h2
            className={`text-3xl font-black tracking-tight sm:text-4xl ${
              dark ? "text-white" : "text-[#102E46]"
            }`}
          >
            {title}
          </h2>

          {subtitle ? (
            <p
              className={`mt-2 max-w-2xl text-sm leading-6 sm:text-base ${
                dark ? "text-white/65" : "text-[#70838D]"
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* ======================================================
            CATEGORY TABS
        ====================================================== */}
        <div
          className={`mb-6 overflow-x-auto rounded-2xl border p-1.5 ${
            dark
              ? "border-white/10 bg-white/[0.06]"
              : "border-[#DCE7EA] bg-white"
          }`}
        >
          <div className="flex min-w-max gap-1.5">
            {normalizedGroups.map((group) => {
              const isActive = group.id === activeGroupId;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleTabChange(group.id)}
                  className={`group flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:px-5 ${
                    isActive
                      ? dark
                        ? "bg-[#36D49D] text-[#073C30] shadow-md"
                        : "bg-[#102E46] text-white shadow-md"
                      : dark
                        ? "text-white/65 hover:bg-white/10 hover:text-white"
                        : "text-[#647A85] hover:bg-[#F1F6F7] hover:text-[#102E46]"
                  }`}
                >
                  <span>{group.title}</span>

                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black ${
                      isActive
                        ? dark
                          ? "bg-[#073C30]/10 text-[#073C30]"
                          : "bg-white/15 text-white"
                        : dark
                          ? "bg-white/10 text-white/60"
                          : "bg-[#EDF3F4] text-[#71858F]"
                    }`}
                  >
                    {group.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================
            ACTIVE TAB TITLE
        ====================================================== */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3
              className={`text-lg font-black sm:text-xl ${
                dark ? "text-white" : "text-[#102E46]"
              }`}
            >
              {activeGroup?.title}
            </h3>

            <p
              className={`mt-0.5 text-xs ${
                dark ? "text-white/50" : "text-[#81939B]"
              }`}
            >
              {activeItems.length}{" "}
              {activeItems.length === 1 ? "question" : "questions"}
            </p>
          </div>
        </div>

        {/* ======================================================
            QUESTIONS
        ====================================================== */}
        <div
          className={`overflow-hidden rounded-[22px] border ${
            dark
              ? "border-white/10 bg-white/[0.04]"
              : "border-[#D9E5E8] bg-white"
          }`}
        >
          {activeItems.map((item, index) => {
            const isOpen = openIndex === index;

            const question =
              item?.question ||
              item?.q ||
              item?.title ||
              `Question ${index + 1}`;

            const answer =
              item?.answer ||
              item?.a ||
              item?.content ||
              "Answer information is currently unavailable.";

            return (
              <div
                key={`${activeGroup?.id}-${index}`}
                className={`border-b last:border-b-0 ${
                  dark ? "border-white/10" : "border-[#E3EBED]"
                }`}
              >
                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => handleQuestionClick(index)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-all duration-200 sm:px-6 sm:py-6 ${
                    isOpen
                      ? dark
                        ? "bg-white/[0.05]"
                        : "bg-[#F8FBFB]"
                      : dark
                        ? "hover:bg-white/[0.035]"
                        : "hover:bg-[#FBFCFC]"
                  }`}
                >
                  <span
                    className={`pr-4 text-sm font-black leading-6 sm:text-[15px] ${
                      dark ? "text-white" : "text-[#102E46]"
                    }`}
                  >
                    {question}
                  </span>

                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                      isOpen
                        ? dark
                          ? "bg-[#36D49D] text-[#073C30]"
                          : "bg-[#102E46] text-white"
                        : dark
                          ? "bg-white/10 text-white/60"
                          : "bg-[#F1F5F6] text-[#71858F]"
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp size={15} strokeWidth={2.5} />
                    ) : (
                      <ChevronDown size={15} strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-5 pb-6 pr-12 text-sm leading-7 sm:px-6 sm:pb-6 sm:pr-16 ${
                        dark ? "text-white/65" : "text-[#657B85]"
                      }`}
                    >
                      {typeof answer === "string" ? (
                        <p className="whitespace-pre-line">{answer}</p>
                      ) : (
                        answer
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================
            BOTTOM NOTE
        ====================================================== */}
        <p
          className={`mt-4 text-xs ${
            dark ? "text-white/40" : "text-[#8A9AA1]"
          }`}
        >
          Can't find what you're looking for? Contact DigiNiwas Support.
        </p>
      </div>
    </section>
  );
}
