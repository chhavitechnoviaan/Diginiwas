import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  Bookmark,
  Bot,
  Building2,
  ChevronDown,
  CircleDollarSign,
  Filter,
  Gavel,
  Home,
  Landmark,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  getPublicBlogPage,
} from "../services/blogService";

/* =========================================================
   DEMO / FALLBACK DATA

   Backend fail hone ya section missing hone par
   ye data automatically use hoga.
========================================================= */

const DEMO_HERO = {
  eyebrow: "DigiNiwas Blog",
  headingLine1: "Insights that move",
  headingLine2: "you forward.",

  description:
    "Expert perspectives, market trends and AI-powered insights to help you make smarter property decisions.",

  buttonText: "Ask Niwas AI About Anything",
  buttonLink: "/niwas-ai",

  image:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=90",

  marketTag: "Market Trends",
  aiTag: "AI Insights",
  buyerTag: "Buyer Guides",
  investmentTag: "Investment Ideas",
};

const DEMO_CATEGORIES = [
  "All Articles",
  "Niwas AI",
  "Market Trends",
  "Buying Guide",
  "Renting Guide",
  "Investment",
  "Home Loans",
  "Interior & Living",
  "Legal & Finance",
];

const DEMO_ARTICLES = [
  {
    _id: "demo-1",
    slug: "home-buying-checklist",
    title:
      "Home Buying Checklist: Everything You Must Know",
    excerpt:
      "A complete step-by-step checklist to help your dream home journey feel confident and informed.",
    category: "Buying Guide",
    readTime: "6 min read",
    author: "DigiNiwas Team",
    publishDate: "2026-09-05T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-2",
    slug: "inside-niwas-ai-how-we-understand-you-better",
    title:
      "Inside Niwas AI: How We Understand You Better",
    excerpt:
      "The technology, data and intelligence behind smarter property recommendations.",
    category: "Niwas AI",
    readTime: "4 min read",
    author: "Niwas AI",
    publishDate: "2026-09-03T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-3",
    slug: "why-real-estate-is-still-the-smartest-long-term-bet",
    title:
      "Why Real Estate is Still the Smartest Long-Term Bet",
    excerpt:
      "Understanding inflation, wealth creation and the power of real assets.",
    category: "Investment",
    readTime: "6 min read",
    author: "DigiNiwas Research",
    publishDate: "2026-08-29T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-4",
    slug: "top-micro-markets-with-highest-growth-potential",
    title:
      "Top Micro-Markets with Highest Growth Potential",
    excerpt:
      "Locations that are seeing strong demand, infrastructure and lifestyle growth.",
    category: "Market Trends",
    readTime: "5 min read",
    author: "Market Desk",
    publishDate: "2026-08-25T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-5",
    slug: "renting-in-india-tips-for-tenants-and-landlords",
    title:
      "Renting in India: Tips for Tenants & Landlords",
    excerpt:
      "Practical tips, legal must-knows and best practices for a hassle-free renting experience.",
    category: "Renting Guide",
    readTime: "6 min read",
    author: "DigiNiwas Team",
    publishDate: "2026-08-21T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-6",
    slug: "home-loan-101-beginners-complete-guide",
    title:
      "Home Loan 101: A Beginner's Complete Guide",
    excerpt:
      "Everything you need to know about home loans, eligibility, EMIs and more.",
    category: "Home Loans",
    readTime: "5 min read",
    author: "Finance Desk",
    publishDate: "2026-08-18T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-7",
    slug: "modern-interior-ideas-for-new-homeowners",
    title:
      "Modern Interior Ideas for New Homeowners",
    excerpt:
      "Smart design ideas to make your new home modern, functional and beautiful.",
    category: "Interior & Living",
    readTime: "5 min read",
    author: "DigiNiwas Living",
    publishDate: "2026-08-15T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-8",
    slug: "rera-explained-what-every-buyer-should-know",
    title:
      "RERA Explained: What Every Buyer Should Know",
    excerpt:
      "A simple guide to RERA regulations, buyer protection and developer compliance.",
    category: "Legal & Finance",
    readTime: "7 min read",
    author: "Legal Desk",
    publishDate: "2026-08-12T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },

  {
    _id: "demo-9",
    slug: "how-ai-can-find-better-properties-for-you",
    title:
      "How AI Can Find Better Properties for You",
    excerpt:
      "Explore how intelligent search can reduce property discovery time and improve matches.",
    category: "Niwas AI",
    readTime: "4 min read",
    author: "Niwas AI",
    publishDate: "2026-08-08T00:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=85",
    published: true,
  },
];

const DEMO_FEATURED = {
  badge: "Featured",
  category: "Market Trends",
  readTime: "5 min read",

  title:
    "Where is India's Real Estate Market Headed?",

  description:
    "A deep dive into demand patterns, emerging micro-markets and what Niwas AI is seeing ahead.",

  buttonText: "Read More",
  buttonLink: "/blog/where-is-indias-real-estate-market-headed",

  image:
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1600&q=90",

  showAITake: true,

  aiHeading: "Niwas AI Take",

  aiDescription:
    "Demand is shifting towards well-connected, lifestyle-rich micro-markets with strong infrastructure momentum.",

  aiButtonText: "Ask Niwas AI",
};

const DEMO_AI = {
  heading: "Ask Niwas AI",

  title: "Your AI property companion",

  description:
    "Get instant answers, insights and recommendations.",

  buttonText: "Ask Anything",

  buttonLink: "/niwas-ai",

  questions: [
    "Which are the fastest-growing micro-markets right now?",
    "What affects property prices the most?",
    "How can I check if a property is a good investment?",
  ],
};

const DEMO_TRENDING = [
  {
    _id: "trend-1",

    title:
      "What Makes a Location Truly Valuable?",

    category: "Market Trends",

    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
  },

  {
    _id: "trend-2",

    title:
      "Beyond Price: The Real Signs Behind Property Value",

    category: "Buying Guide",

    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80",
  },

  {
    _id: "trend-3",

    title:
      "How Niwas AI Predicts Property Prices",

    category: "Niwas AI",

    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
  },

  {
    _id: "trend-4",

    title:
      "Checklist for First-Time Property Investors",

    category: "Investment",

    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80",
  },

  {
    _id: "trend-5",

    title:
      "Emerging Areas Expected to Grow",

    category: "Market Trends",

    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=300&q=80",
  },
];

const DEMO_NEWSLETTER = {
  headingLine1: "Smarter property insights,",
  headingLine2: "straight to your inbox.",

  description:
    "Get curated real estate insights, guides and market intelligence every week.",

  placeholder: "Enter your email",

  buttonText: "Subscribe",

  successMessage:
    "You're subscribed successfully.",

  enabled: true,
};

/* =========================================================
   IMAGE HELPER

   Backend:
   image: { url, publicId }

   Demo:
   image: "https://..."
========================================================= */

const getImageUrl = (image, fallback = "") => {
  if (!image) {
    return fallback;
  }

  if (typeof image === "string") {
    return image;
  }

  if (typeof image === "object") {
    return image.url || fallback;
  }

  return fallback;
};

/* =========================================================
   DATE FORMATTER
========================================================= */

const formatArticleDate = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date);
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   CATEGORY ICONS
========================================================= */

const categoryIcons = {
  "Market Trends": TrendingUp,
  "Buying Guide": Home,
  "Renting Guide": Building2,
  Investment: CircleDollarSign,
  "Home Loans": Landmark,
  "Interior & Living": Sparkles,
  "Legal & Finance": Gavel,
  "Niwas AI": Bot,
};

/* =========================================================
   MAIN BLOG
========================================================= */

export default function Blog() {
  const [blogData, setBlogData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [usingFallback, setUsingFallback] =
    useState(false);

  const [activeCategory, setActiveCategory] =
    useState("All Articles");

  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [savedArticles, setSavedArticles] =
    useState([]);

  const [sortBy, setSortBy] =
    useState("newest");

  /* =====================================================
     FETCH BLOG
  ===================================================== */

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);

      try {
        const response =
          await getPublicBlogPage();

        if (
          response.success &&
          response.data
        ) {
          setBlogData(response.data);
          setUsingFallback(false);
        } else {
          setBlogData(null);
          setUsingFallback(true);
        }
      } catch (error) {
        console.error(
          "BLOG LOAD ERROR:",
          error
        );

        setBlogData(null);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, []);

  /* =====================================================
     SECTION WISE FALLBACK

     Backend me sirf ek section missing hua to
     pura page demo nahi hoga.
     Sirf missing section fallback use karega.
  ===================================================== */

  const hero = {
    ...DEMO_HERO,
    ...(blogData?.hero || {}),
  };

  // These CMS-driven sections must reflect actual database content.
  // Do not inject demo articles when the backend returns an empty array.
  const featuredArticle =
    blogData?.featuredArticle || null;

  const niwasAI = {
    ...DEMO_AI,
    ...(blogData?.niwasAI || {}),
  };

  const newsletter = {
    ...DEMO_NEWSLETTER,
    ...(blogData?.newsletter || {}),
  };

  const categories =
    Array.isArray(blogData?.categories)
      ? blogData.categories
      : DEMO_CATEGORIES;

  const articles =
    Array.isArray(blogData?.articles)
      ? blogData.articles
      : [];

  const trendingArticles =
    Array.isArray(blogData?.trendingArticles)
      ? blogData.trendingArticles
      : [];

  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter(
      (article) => {
        const categoryMatch =
          activeCategory === "All Articles" ||
          article.category === activeCategory;

        const query = search
          .trim()
          .toLowerCase();

        const searchMatch =
          !query ||
          article.title
            ?.toLowerCase()
            .includes(query) ||
          article.category
            ?.toLowerCase()
            .includes(query) ||
          article.excerpt
            ?.toLowerCase()
            .includes(query) ||
          article.author
            ?.toLowerCase()
            .includes(query);

        return categoryMatch && searchMatch;
      }
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "oldest") {
        return (
          new Date(a.publishDate || 0) -
          new Date(b.publishDate || 0)
        );
      }

      if (sortBy === "popular") {
        return (
          Number(b.views || 0) -
          Number(a.views || 0)
        );
      }

      return (
        new Date(b.publishDate || 0) -
        new Date(a.publishDate || 0)
      );
    });
  }, [
    articles,
    activeCategory,
    search,
    sortBy,
  ]);

  const toggleBookmark = (id) => {
    setSavedArticles((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  };

  const goToLink = (link) => {
    if (!link) {
      return;
    }

    window.location.href = link;
  };

  /* =====================================================
     LOADING

     Main layout disappear nahi hoga.
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfcfa]">
        <div className="mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 rounded bg-gray-200" />

            <div className="mt-7 h-16 max-w-[520px] rounded-2xl bg-gray-200" />

            <div className="mt-4 h-5 max-w-[630px] rounded bg-gray-100" />

            <div className="mt-10 h-[420px] rounded-[24px] bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfcfa] text-[#10251d]">
      <main>
        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative overflow-hidden border-b border-[#e5ece8]">
          <div className="absolute right-[-100px] top-[-100px] h-[430px] w-[430px] rounded-full bg-[#e7f2ed] blur-2xl" />

          <div className="absolute left-[40%] top-0 h-72 w-72 rounded-full bg-[#f4eee0]/60 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1450px] gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#49645a]">
                <span>
                  {hero.eyebrow}
                </span>

                <ChevronDown size={13} />
              </div>

              <h1 className="max-w-[600px] text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#10251d] sm:text-5xl lg:text-[67px]">
                {hero.headingLine1}

                <br />

                {hero.headingLine2}
              </h1>

              <p className="mt-6 max-w-[590px] text-sm leading-7 text-[#617069] sm:text-base">
                {hero.description}
              </p>

              {hero.buttonText && (
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() =>
                      goToLink(
                        hero.buttonLink ||
                          "/niwas-ai"
                      )
                    }
                    className="group flex items-center gap-2 rounded-lg bg-[#003d2f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#075340]"
                  >
                    {hero.buttonText}

                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </div>
              )}
            </div>

            <div className="relative min-h-[380px] lg:min-h-[460px]">
              <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eaf3ef]" />

              <img
                src={getImageUrl(
                  hero.image,
                  DEMO_HERO.image
                )}
                alt="DigiNiwas Blog"
                className="absolute bottom-0 right-0 h-[85%] w-[72%] rounded-[35%_0_0_0] object-cover object-center mix-blend-multiply lg:w-[75%]"
              />

              <HeroTag
                icon={TrendingUp}
                text={hero.marketTag}
                className="right-[30%] top-0"
              />

              <HeroTag
                icon={Bot}
                text={hero.aiTag}
                className="left-0 top-[25%]"
              />

              <HeroTag
                icon={Home}
                text={hero.buyerTag}
                className="left-4 top-[48%]"
              />

              <HeroTag
                icon={CircleDollarSign}
                text={hero.investmentTag}
                className="right-1 top-[38%]"
              />
            </div>
          </div>
        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="sticky top-0 z-40 border-b border-gray-200 bg-[#fbfcfa]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1450px] px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-bold transition ${
                      activeCategory ===
                      category
                        ? "border-[#003c2f] bg-[#003c2f] text-white"
                        : "border-[#dce5e0] bg-white text-[#53635c] hover:border-[#003c2f] hover:text-[#003c2f]"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  setShowFilters(
                    !showFilters
                  )
                }
                className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-[#dce5e0] bg-white px-4 py-2 text-[11px] font-bold"
              >
                <Filter size={13} />

                Filters
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e0e8e3] bg-white p-4 shadow-sm">
                <div className="relative min-w-[240px] flex-1">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search articles..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#0d5947] focus:bg-white"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-semibold outline-none"
                >
                  <option value="newest">
                    Newest First
                  </option>

                  <option value="popular">
                    Most Popular
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>
                </select>
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            FEATURED + AI
        ================================================= */}

        <section className="mx-auto max-w-[1450px] px-4 py-7 sm:px-6 lg:px-8">
          <div
            className={`grid gap-5 ${
              featuredArticle
                ? "xl:grid-cols-[minmax(0,1fr)_360px]"
                : "xl:grid-cols-[minmax(0,1fr)]"
            }`}
          >
            {featuredArticle && (
              <FeaturedArticle data={featuredArticle} />
            )}

            <NiwasAICard data={niwasAI} />
          </div>
        </section>

        {/* =================================================
            LATEST ARTICLES
        ================================================= */}

        <section className="mx-auto max-w-[1450px] px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                    Latest Articles
                  </h2>

                  {activeCategory !==
                    "All Articles" && (
                    <p className="mt-1 text-xs text-gray-500">
                      Showing articles
                      from{" "}
                      {
                        activeCategory
                      }
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory(
                      "All Articles"
                    );

                    setSearch("");
                  }}
                  className="group flex items-center gap-1 text-xs font-bold text-[#244b3f]"
                >
                  View all articles

                  <ArrowRight
                    size={13}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </div>

              {filteredArticles.length >
              0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map(
                    (article) => {
                      const id =
                        article._id ||
                        article.id;

                      return (
                        <ArticleCard
                          key={id}
                          article={
                            article
                          }
                          saved={savedArticles.includes(
                            id
                          )}
                          onSave={() =>
                            toggleBookmark(
                              id
                            )
                          }
                        />
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
                  <Search
                    size={34}
                    className="mb-3 text-gray-300"
                  />

                  <h3 className="font-black">
                    No articles found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Try another category
                    or search keyword.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(
                        "All Articles"
                      );

                      setSearch("");
                    }}
                    className="mt-5 rounded-lg bg-[#003c2f] px-4 py-2 text-xs font-bold text-white"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            <aside className="space-y-5">
              {trendingArticles.length > 0 && (
                <TrendingSection
                  articles={trendingArticles}
                />
              )}

              <BrowseCategory
                categories={categories}
                activeCategory={
                  activeCategory
                }
                setActiveCategory={
                  setActiveCategory
                }
              />

              {newsletter.enabled !==
                false && (
                <NewsletterCard
                  data={newsletter}
                />
              )}

              {usingFallback && (
                <p className="hidden text-[9px] text-gray-400">
                  Demo blog data active.
                </p>
              )}
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   HERO TAG
========================================================= */

function HeroTag({
  icon: Icon,
  text,
  className,
}) {
  if (!text) {
    return null;
  }

  return (
    <div
      className={`absolute z-10 hidden items-center gap-2 rounded-lg border border-white/80 bg-white/90 px-3 py-2 shadow-[0_10px_30px_rgba(25,58,47,0.08)] backdrop-blur-md sm:flex ${className}`}
    >
      <div className="grid h-7 w-7 place-items-center rounded-md bg-[#eef6f2]">
        <Icon
          size={14}
          className="text-[#174d3f]"
        />
      </div>

      <span className="text-[10px] font-black text-[#30483f]">
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   FEATURED ARTICLE
========================================================= */

function FeaturedArticle({ data }) {
  return (
    <article className="group relative min-h-[390px] overflow-hidden rounded-[18px] bg-[#123a31] shadow-sm sm:min-h-[460px]">
      <img
        src={getImageUrl(
          data.image,
          DEMO_FEATURED.image
        )}
        alt={data.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#05271f]/95 via-[#062a22]/30 to-transparent" />

      {data.badge && (
        <div className="absolute left-5 top-5">
          <span className="rounded-md bg-[#d9f4d8] px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#205137]">
            {data.badge}
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">
          {data.category}

          {data.readTime && (
            <>
              {" "}
              · {data.readTime}
            </>
          )}
        </p>

        <h2 className="max-w-[600px] text-2xl font-black leading-tight tracking-[-0.02em] text-white sm:text-3xl lg:text-[38px]">
          {data.title}
        </h2>

        <p className="mt-4 max-w-[560px] text-xs leading-6 text-white/75 sm:text-sm">
          {data.description}
        </p>

        {data.buttonText && (
          <button
            type="button"
            onClick={() => {
              const slug = String(data.title || "")
                .toLowerCase()
                .trim()
                .replace(/['"]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
              const destination =
                data.buttonLink || (slug ? `/blog/${slug}` : "");

              if (destination) {
                window.location.href = destination;
              }
            }}
            className="group/button mt-5 flex items-center gap-2 text-xs font-black text-white"
          >
            {data.buttonText}

            <ArrowRight
              size={14}
              className="transition group-hover/button:translate-x-1"
            />
          </button>
        )}
      </div>

      {data.showAITake !== false && (
        <div className="absolute bottom-7 right-7 hidden w-[245px] rounded-xl bg-[#f5f2e7]/95 p-5 shadow-xl backdrop-blur-md md:block">
          <div className="flex items-center gap-2">
            <Sparkles size={15} />

            <p className="text-[10px] font-black">
              {data.aiHeading}
            </p>
          </div>

          <p className="mt-3 text-[11px] leading-5 text-[#52635b]">
            {data.aiDescription}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] font-black">
              {data.aiButtonText}
            </span>

            <button
              type="button"
              onClick={() => {
                if (
                  data.aiButtonLink
                ) {
                  window.location.href =
                    data.aiButtonLink;
                }
              }}
              className="grid h-8 w-8 place-items-center rounded-full bg-[#003c2f] text-white"
            >
              <ArrowRight
                size={13}
              />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

/* =========================================================
   NIWAS AI
========================================================= */

function NiwasAICard({ data }) {
  const questions =
    Array.isArray(data.questions) &&
    data.questions.length
      ? data.questions
      : DEMO_AI.questions;

  return (
    <div className="rounded-[18px] border border-[#e1e8e4] bg-white p-5 shadow-[0_8px_35px_rgba(20,55,45,0.05)]">
      <div className="flex items-center gap-2">
        <Sparkles
          size={17}
          className="text-[#174d3f]"
        />

        <h3 className="text-sm font-black">
          {data.heading}
        </h3>
      </div>

      <div className="flex flex-col items-center py-6 text-center">
        <div className="relative mb-4 grid h-[76px] w-[76px] place-items-center rounded-full bg-[#e8f5f0]">
          <div className="absolute h-[58px] w-[58px] rounded-full border-2 border-[#a4cfc1]" />

          <div className="relative grid h-[48px] w-[48px] place-items-center rounded-[17px] bg-[#112922] shadow-lg">
            <div className="absolute left-[10px] h-2 w-2 rounded-full bg-[#7fffd4]" />

            <div className="absolute right-[10px] h-2 w-2 rounded-full bg-[#7fffd4]" />

            <div className="absolute -right-[8px] h-5 w-2 rounded-r-full bg-[#1d5948]" />
          </div>
        </div>

        <h4 className="text-xs font-black">
          {data.title}
        </h4>

        <p className="mt-1 max-w-[220px] text-[10px] leading-5 text-gray-500">
          {data.description}
        </p>
      </div>

      <div className="space-y-2">
        {questions.map(
          (question, index) => (
            <button
              type="button"
              key={`${question}-${index}`}
              onClick={() => {
                if (
                  data.buttonLink
                ) {
                  window.location.href =
                    data.buttonLink;
                }
              }}
              className="group flex w-full items-center justify-between gap-3 rounded-lg border border-[#e4ebe7] bg-white px-3 py-3 text-left text-[10px] font-semibold leading-4 transition hover:border-[#aac9be] hover:bg-[#f8fbfa]"
            >
              <span>
                {question}
              </span>

              <ArrowRight
                size={13}
                className="shrink-0 transition group-hover:translate-x-1"
              />
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          if (data.buttonLink) {
            window.location.href =
              data.buttonLink;
          }
        }}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#003c2f] text-xs font-black text-white transition hover:bg-[#07513f]"
      >
        {data.buttonText}

        <Sparkles size={14} />
      </button>
    </div>
  );
}

/* =========================================================
   ARTICLE CARD
========================================================= */

function ArticleCard({
  article,
  saved,
  onSave,
}) {
  return (
    <article className="group overflow-hidden rounded-[16px] border border-[#e1e8e4] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(22,52,42,0.10)]">
      <div className="relative aspect-[1.55/1] overflow-hidden">
        <img
          src={getImageUrl(
            article.image
          )}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />

        <button
          type="button"
          onClick={onSave}
          className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full backdrop-blur-md transition ${
            saved
              ? "bg-[#003c2f] text-white"
              : "bg-white/90 text-[#153f33] hover:bg-white"
          }`}
        >
          <Bookmark
            size={13}
            fill={
              saved
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.11em] text-[#6d7b75]">
          <span>
            {article.category}
          </span>

          <span className="h-1 w-1 rounded-full bg-gray-300" />

          <span>
            {article.readTime}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[44px] text-[15px] font-black leading-[1.45] tracking-[-0.01em] text-[#172b24]">
          {article.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[38px] text-[10px] leading-[18px] text-[#6b7973]">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={() => {
              const slug =
                article.slug ||
                String(article.title || "")
                  .toLowerCase()
                  .trim()
                  .replace(/['"]/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");

              if (slug) {
                window.location.href = `/blog/${slug}`;
              }
            }}
            className="group/read flex items-center gap-1 text-[10px] font-black"
          >
            Read More

            <ArrowRight
              size={12}
              className="transition group-hover/read:translate-x-1"
            />
          </button>

          <span className="text-[8px] font-medium text-gray-400">
            {formatArticleDate(
              article.publishDate ||
                article.date
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   TRENDING
========================================================= */

function TrendingSection({
  articles,
}) {
  return (
    <div className="rounded-[16px] border border-[#e1e8e4] bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp size={16} />

        <h3 className="text-sm font-black">
          Trending Now
        </h3>
      </div>

      <div className="space-y-4">
        {articles.map(
          (article, index) => (
            <article
              key={
                article._id ||
                article.id ||
                index
              }
              onClick={() => {
                if (
                  article.link
                ) {
                  window.location.href =
                    article.link;
                }
              }}
              className="group flex cursor-pointer gap-3"
            >
              <div className="relative h-[58px] w-[76px] shrink-0 overflow-hidden rounded-lg">
                <img
                  src={getImageUrl(
                    article.image
                  )}
                  alt={
                    article.title
                  }
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="absolute left-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-white text-[7px] font-black">
                  {index + 1}
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-[8px] font-bold uppercase tracking-wide text-[#73817b]">
                  {
                    article.category
                  }
                </p>

                <h4 className="mt-1 line-clamp-2 text-[10px] font-black leading-[15px] text-[#263c34] transition group-hover:text-[#006047]">
                  {
                    article.title
                  }
                </h4>
              </div>
            </article>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   BROWSE CATEGORY
========================================================= */

function BrowseCategory({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const availableCategories =
    categories.filter(
      (category) =>
        category !== "All Articles"
    );

  return (
    <div className="rounded-[16px] border border-[#e1e8e4] bg-white p-5">
      <h3 className="mb-4 text-sm font-black">
        Browse by Category
      </h3>

      <div className="space-y-1">
        {availableCategories.map(
          (category) => {
            const Icon =
              categoryIcons[
                category
              ] || Home;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                className={`group flex w-full items-center justify-between rounded-lg px-2 py-2.5 transition ${
                  activeCategory ===
                  category
                    ? "bg-[#edf6f2] text-[#003c2f]"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    size={14}
                    className={
                      activeCategory ===
                      category
                        ? "text-[#003c2f]"
                        : "text-[#64736d]"
                    }
                  />

                  <span className="text-[10px] font-bold">
                    {
                      category
                    }
                  </span>
                </span>

                <ArrowRight
                  size={12}
                  className="text-gray-400 transition group-hover:translate-x-1"
                />
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}

/* =========================================================
   NEWSLETTER
========================================================= */

function NewsletterCard({ data }) {
  const [email, setEmail] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    /*
      Newsletter subscription backend API
      future me yahan integrate kar sakte ho.
    */

    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="overflow-hidden rounded-[16px] bg-[#073d31] p-5 text-white">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
        <Sparkles size={18} />
      </div>

      <h3 className="mt-4 text-lg font-black">
        {data.headingLine1}

        <br />

        {data.headingLine2}
      </h3>

      <p className="mt-3 text-[10px] leading-5 text-white/65">
        {data.description}
      </p>

      {submitted ? (
        <div className="mt-5 rounded-xl bg-white/10 px-4 py-4 text-xs font-bold">
          ✓{" "}
          {
            data.successMessage
          }
        </div>
      ) : (
        <form
          onSubmit={
            handleSubmit
          }
          className="mt-5"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder={
              data.placeholder
            }
            className="h-11 w-full rounded-lg border border-white/15 bg-white/10 px-4 text-xs text-white outline-none placeholder:text-white/50 focus:border-white/40"
          />

          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-lg bg-white text-xs font-black text-[#073d31] transition hover:bg-[#eff6f3]"
          >
            {data.buttonText}
          </button>
        </form>
      )}
    </div>
  );
}