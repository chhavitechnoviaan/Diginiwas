import React, { useEffect, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPublicBlogPage } from "../../services/blogService";

const getImage = (image) => typeof image === "string" ? image : image?.url || "";

const date = (value) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

export default function HomeNewsArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let mounted = true;
    getPublicBlogPage().then((response) => {
      if (!mounted || !response.success) return;
      const list = Array.isArray(response.data?.articles) ? response.data.articles : [];
      setArticles(
        [...list]
          .filter((item) => item.published !== false)
          .sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0))
          .slice(0, 3)
      );
    });
    return () => { mounted = false; };
  }, []);

  if (!articles.length) return null;

  return (
    <section className="bg-white px-4 py-12 text-[#102E46] sm:px-8 sm:py-16 lg:px-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D9B78]">
              DigiNiwas Journal
            </p>
            <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              News and Articles
            </h2>
            <p className="mt-2 text-sm text-[#70838B]">
              Read what's happening in Real Estate.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="hidden items-center gap-1 rounded-lg border border-[#0D9B78] px-4 py-2 text-xs font-black text-[#0D8A70] transition hover:bg-[#EAF8F4] sm:inline-flex"
          >
            See all news and articles
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article._id}
              className="group overflow-hidden rounded-[18px] border border-[#DDE7EA] bg-white shadow-[0_10px_28px_rgba(16,46,70,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(16,46,70,0.09)]"
            >
              <button
                type="button"
                onClick={() => article.slug && navigate(`/blog/${article.slug}`)}
                className="block w-full text-left"
              >
                <div className="h-48 overflow-hidden bg-[#EAF0F2]">
                  {getImage(article.image) ? (
                    <img
                      src={getImage(article.image)}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-[#71838A]">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays size={10} /> {date(article.publishDate)}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-base font-black leading-6 text-[#274255]">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#73858D]">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[#0D8A70]">
                    Read Article <ArrowRight size={13} />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="mt-5 inline-flex items-center gap-1 rounded-lg border border-[#0D9B78] px-4 py-2 text-xs font-black text-[#0D8A70] sm:hidden"
        >
          See all articles <ArrowRight size={13} />
        </button>
      </div>
    </section>
  );
}
