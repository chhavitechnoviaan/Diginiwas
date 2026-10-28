import axios from "../../api/axios";
import { useEffect, useState } from "react";
// import { FiArrowRight, FiPlay, FiStar, FiQuote } from "react-icons/fi";
import { FiArrowRight, FiPlay, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import ComingSoonVideo from "../../components/common/ComingSoonVideo";

const fallbackTestimonials = [
  {
    review:
      "DigiNiwas made property discovery feel simple, transparent and genuinely digital. The experience was smooth from search to enquiry.",
    name: "Vikram Singhania",
    designation: "Property Investor",
    image: {
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    },
  },
  {
    review:
      "The verified listings and clear property information helped us shortlist options much faster than traditional property searches.",
    name: "Ananya Sharma",
    designation: "Home Buyer",
    image: {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
  },
  {
    review:
      "The digital-first approach gave me confidence while comparing properties remotely. Niwas AI was especially useful for narrowing down choices.",
    name: "Rahul Mehta",
    designation: "Global Investor",
    image: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
  },
];

const imageUrl = (item) => {
  const value = item?.image;
  if (typeof value === "string") return value;
  return value?.url || value?.secure_url || "";
};

export default function ClientSays() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await axios.get("/cms/testimonials");
        const payload = res?.data?.data || res?.data || {};
        const rows = payload?.testimonials || payload?.items || payload;
        if (active && Array.isArray(rows) && rows.length) setTestimonials(rows);
      } catch (error) {
        console.warn("Testimonials CMS unavailable; using defaults.", error);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#06131d] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(51,204,153,0.13),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(19,70,105,0.35),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#33cc99]/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#33cc99]/20 bg-[#33cc99]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#5be2b7]">
              <FiStar /> Trusted by our community
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Real experiences from people using DigiNiwas to discover, compare
              and move closer to their next property.
            </p>
          </div>
          {/* <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-right sm:block">
            <div className="text-2xl font-black text-[#33cc99]">DigiNiwas</div>
            <div className="text-xs text-white/45">
              Built around trust & technology
            </div>
          </div> */}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((item, index) => (
            <motion.article
              key={`${item?.name || "client"}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0a202d] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition-shadow hover:border-[#33cc99]/35 hover:shadow-[0_25px_70px_rgba(0,0,0,0.3)] sm:p-7"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#33cc99]/10 blur-2xl transition group-hover:bg-[#33cc99]/20" />
              <div className="relative flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#33cc99]/10 text-[#33cc99]">
                  {/* <FiQuote size={21} /> */}
                  <span
                    aria-hidden="true"
                    className="text-2xl font-black leading-none"
                  >
                    “
                  </span>
                </div>
                <div className="flex gap-1 text-[#33cc99]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>

              <p className="relative mt-7 min-h-[125px] text-[15px] leading-7 text-white/72">
                “
                {item?.review ||
                  item?.description ||
                  "A great DigiNiwas experience."}
                ”
              </p>

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={
                      imageUrl(item) ||
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=70"
                    }
                    alt={item?.name || "Client"}
                    className="h-11 w-11 rounded-full border border-[#33cc99]/30 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=70";
                    }}
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black text-white">
                      {item?.name || "DigiNiwas Client"}
                    </div>
                    <div className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#33cc99]">
                      {item?.designation || item?.role || "Client"}
                    </div>
                  </div>
                </div>

                {/* <button
                  type="button"
                  onClick={() => {
                    setSelectedVideo(item?.videoLink || "");
                    setShowVideo(true);
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#33cc99]/30 bg-[#33cc99]/10 text-[#33cc99] transition hover:bg-[#33cc99] hover:text-[#062018]"
                  aria-label="Watch client story"
                >
                  <FiPlay size={15} fill="currentColor" />
                </button> */}
              </div>
            </motion.article>
          ))}
        </div>

        {/* <div className="mt-7 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-white/55">
            <span className="h-2 w-2 rounded-full bg-[#33cc99]" />
            Your next property journey starts with DigiNiwas
            <FiArrowRight className="text-[#33cc99]" />
          </div>
        </div> */}
      </div>

      {/* {showVideo && (
        <ComingSoonVideo setShowComingSoon={setShowVideo} video={selectedVideo || import.meta.env.VITE_NIWAS_AI} />
      )} */}
    </section>
  );
}
