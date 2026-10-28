import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, UserRound, Link2, List, Mail } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogArticleBySlug, getPublicBlogPage } from "../services/blogService";
import { FaFacebookF } from "react-icons/fa";
const getImage = (image) =>
  typeof image === "string" ? image : image?.url || "";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
};

/*
 * Local article content is deliberately kept as a fallback.
 * Published CMS content always takes priority. If the API/database
 * is unavailable, these records keep the demo Read More flow usable.
 */
const DEFAULT_ARTICLES = [
  {
    _id: "default-1",
    slug: "home-buying-checklist",
    title: "Home Buying Checklist: Everything You Must Know",
    excerpt: "A complete step-by-step checklist to help your dream home journey feel confident and informed.",
    category: "Buying Guide",
    readTime: "6 min read",
    author: "DigiNiwas Team",
    publishDate: "2026-09-05T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90",
    content: `Buying a home is one of the most important financial decisions you will make. A clear plan helps you compare properties, control costs and move forward with confidence.

## 1. Set your budget
Start by calculating your savings, monthly income, existing commitments and the amount you can comfortably pay as an EMI. Keep a separate reserve for emergencies, registration, interiors and moving expenses.

## 2. Choose the right location
Compare commute times, public transport, schools, hospitals, daily conveniences and planned infrastructure. Visit the locality at different times of day to understand traffic, noise and neighbourhood activity.

## 3. Check the property documents
- Verify the seller's ownership and title documents.
- Check applicable RERA registration and project approvals.
- Review the sanctioned plan, completion or occupancy certificate where applicable.
- Ask a qualified legal professional to review documents before paying a large amount.

## 4. Inspect the home
Inspect construction quality, ventilation, water supply, electrical fittings, seepage, common areas, parking and building maintenance. For an under-construction home, review the agreement, payment schedule and expected possession date.

## 5. Plan the complete cost
Consider the base price, stamp duty, registration charges, loan processing fees, maintenance deposits, interiors and recurring society charges. Do not make your decision using the advertised price alone.

## Before you make the final decision
Compare at least a few suitable properties, document all promises in writing and avoid rushing because of sales pressure. A careful checklist makes the home-buying process more transparent and manageable.`,
  },
  {
    _id: "default-2",
    slug: "inside-niwas-ai-how-we-understand-you-better",
    title: "Inside Niwas AI: How We Understand You Better",
    excerpt: "The technology, data and intelligence behind smarter property recommendations.",
    category: "Niwas AI",
    readTime: "4 min read",
    author: "Niwas AI",
    publishDate: "2026-09-03T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=90",
    content: `Finding a suitable property involves more than matching a city and a price. People balance location, budget, property type, lifestyle and future plans.

## Understanding your requirements
Useful recommendations start with clear preferences: buying or renting, preferred localities, budget range, property size and essential amenities. The more specific the requirements, the easier it becomes to narrow the options.

## Turning preferences into useful filters
Property information can be organised around location, price, configuration and features. These filters help people compare relevant listings instead of reviewing every available property.

## Keep context in mind
A property that works for one person may not work for another. Commute, family needs, accessibility, nearby services and long-term plans all affect whether a home is a good match.

## Use AI as an assistant
AI can help organise questions and surface relevant options, but important facts should still be verified. Always check listing details, visit the property where possible and confirm legal or financial information with qualified professionals.

The goal is to make property discovery clearer and more useful, while keeping the final decision in your hands.`,
  },
  {
    _id: "default-3",
    slug: "why-real-estate-is-still-the-smartest-long-term-bet",
    title: "Why Real Estate is Still the Smartest Long-Term Bet",
    excerpt: "Understanding inflation, wealth creation and the power of real assets.",
    category: "Investment",
    readTime: "6 min read",
    author: "DigiNiwas Research",
    publishDate: "2026-08-29T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",
    content: `Real estate can play a role in a long-term financial plan, but it is not a guaranteed path to profit. Results depend on purchase price, location, financing, maintenance and market conditions.

## Potential sources of value
Property owners may benefit from rental income, long-term price appreciation or the utility of using the property themselves. These benefits differ by asset type and location.

## Research the micro-market
- Look at actual transactions where reliable data is available.
- Compare rental demand and vacancy levels.
- Assess connectivity, infrastructure and nearby employment centres.
- Check supply of similar homes and upcoming projects.
- Review maintenance costs and the property's resale potential.

## Calculate the full return
Include taxes, repairs, society charges, loan interest, vacancy periods, brokerage and transaction costs. Rental yield and capital appreciation should be considered separately rather than assuming both will rise.

## Understand the risks
Property is relatively illiquid, prices can stagnate or fall, and legal or construction issues can affect value. Borrowing increases both potential returns and financial risk.

## Make a disciplined decision
Compare property with other investments, maintain an emergency reserve and seek independent financial and legal advice when needed. A researched purchase is more defensible than a decision based only on a market trend or sales pitch.`,
  },
  {
    _id: "default-4",
    slug: "top-micro-markets-with-highest-growth-potential",
    title: "Top Micro-Markets with Highest Growth Potential",
    excerpt: "Locations that are seeing strong demand, infrastructure and lifestyle growth.",
    category: "Market Trends",
    readTime: "5 min read",
    author: "Market Desk",
    publishDate: "2026-08-25T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=90",
    content: `A micro-market is a smaller property area whose demand, pricing and lifestyle characteristics can differ from the wider city. Identifying a promising location requires more than looking at a single price trend.

## What to evaluate
### Connectivity
Check existing roads, public transport, travel time to employment hubs and the status of announced infrastructure projects.

### Employment and everyday amenities
Areas near stable employment centres, schools, healthcare, shopping and recreation may attract a broader set of residents.

### Supply and affordability
Compare new launches, unsold inventory, resale listings and rental demand. Fast construction alone does not guarantee future price growth.

### Liveability
Visit the area and assess water, drainage, roads, safety, noise and the quality of surrounding development.

## Build your own shortlist
Choose locations that match your budget and holding period. Verify current data from reliable sources, compare recent transactions and avoid relying solely on speculative claims about future infrastructure.

A strong micro-market is one where fundamentals support your intended use, not simply one that is receiving attention.`,
  },
  {
    _id: "default-5",
    slug: "renting-in-india-tips-for-tenants-and-landlords",
    title: "Renting in India: Tips for Tenants & Landlords",
    excerpt: "Practical tips, legal must-knows and best practices for a hassle-free renting experience.",
    category: "Renting Guide",
    readTime: "6 min read",
    author: "DigiNiwas Team",
    publishDate: "2026-08-21T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90",
    content: `A clear rental agreement and good communication help both tenants and landlords avoid confusion. Local rules and requirements vary, so check the regulations that apply to your location.

## Before moving in
- Inspect the property and record existing damage.
- Confirm rent, deposit, maintenance charges and payment dates.
- Clarify who pays utility bills and handles repairs.
- Read the notice period, renewal and early-termination terms.
- Keep a signed copy of the agreement and payment receipts.

## For tenants
Document the condition of the home with dated photographs. Report repair issues promptly and use traceable payment methods. Do not assume verbal promises replace written terms.

## For landlords
Provide accurate property details, explain society rules and document handover of keys, appliances and meter readings. Handle tenant information responsibly and communicate repair timelines clearly.

## At move-out
Follow the notice requirements, agree on an inspection and record the return of keys. Any deductions from a deposit should be explained with reference to the agreement and applicable law.

A transparent process creates a better rental experience for everyone involved.`,
  },
  {
    _id: "default-6",
    slug: "home-loan-101-beginners-complete-guide",
    title: "Home Loan 101: A Beginner's Complete Guide",
    excerpt: "Everything you need to know about home loans, eligibility, EMIs and more.",
    category: "Home Loans",
    readTime: "5 min read",
    author: "Finance Desk",
    publishDate: "2026-08-18T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
    content: `A home loan can help spread the cost of a purchase over time, but the EMI is only one part of the overall financial commitment.

## Understand eligibility
Lenders may assess income, employment, existing debts, credit history, age and the property itself. Eligibility estimates are indicative; the lender makes the final decision.

## Compare loan offers
Review the interest rate, whether it is fixed or floating, processing fees, insurance requirements, prepayment terms and total repayment cost. Compare the annual cost rather than choosing only by the starting EMI.

## Plan your down payment
Keep funds available for the down payment and other transaction expenses. Avoid exhausting all savings because home ownership also brings maintenance and unexpected costs.

## Understand your EMI
The EMI depends on principal, interest rate and tenure. A longer tenure can lower the monthly payment but may increase total interest paid over the life of the loan.

## Before signing
Read the sanction letter and loan agreement carefully, verify the property's documents and ask the lender to explain any unclear charges. Consider independent financial advice if you are unsure whether the repayment fits your budget.`,
  },
  {
    _id: "default-7",
    slug: "modern-interior-ideas-for-new-homeowners",
    title: "Modern Interior Ideas for New Homeowners",
    excerpt: "Smart design ideas to make your new home modern, functional and beautiful.",
    category: "Interior & Living",
    readTime: "5 min read",
    author: "DigiNiwas Living",
    publishDate: "2026-08-15T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90",
    content: `A comfortable home is not necessarily the one with the most furniture. Thoughtful planning, good lighting and storage can make a space feel more useful and welcoming.

## Start with how you live
Identify the activities each room needs to support before buying furniture. Measure walls, doorways and circulation areas to make sure furniture fits without blocking movement.

## Prioritise light and colour
Use natural light where possible and layer ambient, task and accent lighting. A simple base palette can be refreshed with textiles, art and plants.

## Make storage work harder
- Use vertical shelving where safe and practical.
- Choose furniture with built-in storage when it suits the room.
- Keep frequently used items easy to reach.
- Avoid filling every available corner.

## Spend where it matters
Prioritise durable items that are expensive or difficult to replace, such as mattresses, essential fittings and high-use furniture. Decor can be added gradually.

## Keep flexibility
Leave room for changing routines, guests and future needs. A home that is easy to maintain often works better over time than one designed only for photographs.`,
  },
  {
    _id: "default-8",
    slug: "rera-explained-what-every-buyer-should-know",
    title: "RERA Explained: What Every Buyer Should Know",
    excerpt: "A simple guide to RERA regulations, buyer protection and developer compliance.",
    category: "Legal & Finance",
    readTime: "7 min read",
    author: "Legal Desk",
    publishDate: "2026-08-12T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=90",
    content: `India's Real Estate (Regulation and Development) Act, 2016 established a framework intended to improve transparency and accountability in covered real estate projects. State and union territory authorities administer the rules applicable in their jurisdictions.

## Check project registration
Where registration is required, verify the project details on the relevant state RERA authority's official website. Compare the registered promoter, approvals, completion timeline and disclosures with the information provided to you.

## Read the agreement carefully
Review carpet area, payment schedule, possession date, cancellation provisions, delay clauses and any additional charges. Ask for written clarification when a term is unclear.

## Keep records
Save advertisements, booking forms, receipts, emails, the agreement and any written commitments. Accurate records can help if a dispute arises.

## Understand that rules can vary
Specific procedures, exemptions and remedies depend on the facts and the applicable state rules. Do not treat a general article as legal advice for an individual purchase.

## Before paying
Verify the project's current status, consult an independent property lawyer when needed and make sure the written documents match what has been promised.`,
  },
  {
    _id: "default-9",
    slug: "how-ai-can-find-better-properties-for-you",
    title: "How AI Can Find Better Properties for You",
    excerpt: "Explore how intelligent search can reduce property discovery time and improve matches.",
    category: "Niwas AI",
    readTime: "4 min read",
    author: "Niwas AI",
    publishDate: "2026-08-08T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=90",
    content: `Property searches can become overwhelming when listings use inconsistent descriptions or when a buyer has several competing priorities. AI-supported discovery can help organise those requirements.

## Start with useful preferences
Provide your target locations, budget, property type, bedroom count, preferred amenities and must-have requirements. Separate essential needs from features that are simply nice to have.

## Compare more than the headline price
Consider travel time, property condition, maintenance costs, nearby services, documentation and suitability for your intended use.

## Verify every listing
AI recommendations can be incomplete or based on information that has changed. Confirm availability, pricing, area measurements and ownership details directly with the responsible party.

## Use recommendations as a shortlist
A useful tool helps you focus attention on plausible options. It does not replace site visits, legal checks, financial planning or your own judgement.

The best property search is one that saves time while making it easier to ask better questions and verify the details that matter.`,
  },
  {
    _id: "default-featured",
    slug: "where-is-indias-real-estate-market-headed",
    title: "Where is India's Real Estate Market Headed?",
    excerpt: "A deep dive into demand patterns, emerging micro-markets and what Niwas AI is seeing ahead.",
    category: "Market Trends",
    readTime: "5 min read",
    author: "DigiNiwas Research",
    publishDate: "2026-09-10T00:00:00.000Z",
    image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1400&q=90",
    content: `India's property markets are shaped by local employment, connectivity, household formation, affordability and the pace of new supply. Different cities and neighbourhoods can move in different directions at the same time.

## Demand is increasingly local
Buyers and renters compare commute times, access to services, neighbourhood quality and the total cost of living. Well-connected locations may appeal to more people, but affordability remains important.

## Infrastructure needs verification
Transport links and public projects can influence expectations. Check official project timelines and distinguish completed infrastructure from proposals or announcements.

## Affordability matters
Higher property prices and borrowing costs can affect how much buyers can spend. Compare prices with local incomes and rental values rather than assuming prices will rise everywhere.

## What buyers should watch
- Actual transaction trends, not only asking prices.
- Rental demand and vacancy levels.
- New supply and unsold inventory.
- Project approvals, delivery history and construction progress.
- Total ownership cost and resale options.

## A measured outlook
Real estate is a long-term, location-specific decision. Research the particular property, verify claims and consider your financial position before committing. No market forecast can guarantee future returns.`,
  },
];

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const makeBlocks = (content = "") => {
  const lines = String(content).replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let listType = "";

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: listType, items: listItems });
      listItems = [];
      listType = "";
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2].trim(),
      });
      continue;
    }

    const bullet = line.match(/^[-*•]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (listType && listType !== "unordered") flushList();
      listType = "unordered";
      listItems.push(bullet[1]);
      continue;
    }

    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    if (numbered) {
      flushParagraph();
      if (listType && listType !== "ordered") flushList();
      listType = "ordered";
      listItems.push(numbered[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
};

const slugHeading = (text) => slugify(text) || "article-section";

const contentBlocksToRenderBlocks = (contentBlocks = []) => {
  const blocks = [];

  contentBlocks.forEach((block) => {
    const type = block?.type;
    const text = String(block?.text || "").trim();

    if (type === "heading") {
      if (text) blocks.push({ type: "heading", level: 2, text });
      return;
    }

    if (type === "subheading") {
      if (text) blocks.push({ type: "heading", level: 3, text });
      return;
    }

    if (type === "content") {
      if (text) blocks.push({ type: "paragraph", text });
      return;
    }

    if (type === "points") {
      const points = Array.isArray(block.points) ? block.points : [];
      const items = points
        .map((point) => ({
          text: String(point?.text || "").trim(),
          subPoints: Array.isArray(point?.subPoints)
            ? point.subPoints.map((sub) => String(sub || "").trim()).filter(Boolean)
            : [],
        }))
        .filter((point) => point.text || point.subPoints.length);

      if (items.length) {
        blocks.push({ type: "points", items });
      }
    }
  });

  return blocks;
};

export default function BlogArticle() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultArticle = useMemo(
    () => DEFAULT_ARTICLES.find((item) => item.slug === slug) || null,
    [slug]
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setArticle(null);

      try {
        const [articleResponse, blogResponse] = await Promise.all([
          getBlogArticleBySlug(slug),
          getPublicBlogPage(),
        ]);

        if (!mounted) return;

        const publicArticles = Array.isArray(blogResponse?.data?.articles)
          ? blogResponse.data.articles
          : [];
        const fromPublicList = publicArticles.find((item) => item.slug === slug);
        const apiArticle =
          (articleResponse?.success && articleResponse.data) ||
          fromPublicList ||
          null;

        // Database article wins. Local article fills missing content/fields.
        const fallback = defaultArticle;
        const resolvedArticle = apiArticle
          ? {
              ...(fallback || {}),
              ...apiArticle,
              content:
                String(apiArticle.content || "").trim() ||
                fallback?.content ||
                apiArticle.excerpt ||
                "",
              image:
                getImage(apiArticle.image)
                  ? apiArticle.image
                  : fallback?.image || apiArticle.image,
              excerpt: apiArticle.excerpt || fallback?.excerpt || "",
              category: apiArticle.category || fallback?.category || "Property Insights",
              readTime: apiArticle.readTime || fallback?.readTime || "5 min read",
              author: apiArticle.author || fallback?.author || "DigiNiwas Team",
            }
          : fallback;

        setArticle(resolvedArticle);

        if (blogResponse?.success) {
          setRelated(
            publicArticles
              .filter((item) => item.slug && item.slug !== slug)
              .sort(
                (a, b) =>
                  new Date(b.publishDate || 0) -
                  new Date(a.publishDate || 0)
              )
              .slice(0, 3)
          );
        } else {
          setRelated(
            DEFAULT_ARTICLES.filter((item) => item.slug !== slug).slice(0, 3)
          );
        }

        if (resolvedArticle) {
          document.title =
            resolvedArticle.seoTitle ||
            `${resolvedArticle.title} | DigiNiwas Blog`;

          const description =
            resolvedArticle.seoDescription ||
            resolvedArticle.excerpt ||
            resolvedArticle.title;
          let meta = document.querySelector('meta[name="description"]');
          if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
          }
          meta.content = description.slice(0, 160);
        }
      } catch (error) {
        console.error("BLOG ARTICLE LOAD ERROR:", error);
        if (mounted) {
          setArticle(defaultArticle);
          setRelated(
            DEFAULT_ARTICLES.filter((item) => item.slug !== slug).slice(0, 3)
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [slug, defaultArticle]);

  const blocks = useMemo(() => {
    if (
      Array.isArray(article?.contentBlocks) &&
      article.contentBlocks.length
    ) {
      return contentBlocksToRenderBlocks(article.contentBlocks);
    }

    return makeBlocks(
      article?.content || article?.excerpt || ""
    );
  }, [article]);
  const headings = blocks.filter((block) => block.type === "heading");

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[minmax(0,780px)_260px]">
          <div className="animate-pulse">
            <div className="h-3 w-2/3 rounded bg-gray-200" />
            <div className="mt-7 h-14 w-11/12 rounded bg-gray-200" />
            <div className="mt-6 h-[280px] rounded bg-gray-100 sm:h-[420px]" />
            <div className="mt-6 space-y-3">
              <div className="h-4 rounded bg-gray-100" />
              <div className="h-4 rounded bg-gray-100" />
              <div className="h-4 w-4/5 rounded bg-gray-100" />
            </div>
          </div>
          <div className="hidden animate-pulse lg:block">
            <div className="h-16 rounded bg-gray-100" />
            <div className="mt-8 h-32 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[65vh] bg-white px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-[#17251F]">Article not found</h1>
        <p className="mt-3 text-sm text-gray-500">
          This article may have been unpublished or moved.
        </p>
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#003c2f] px-5 py-3 text-sm font-bold text-white"
        >
          <ArrowLeft size={15} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <main className="mx-auto grid max-w-[1120px] gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,780px)_260px] lg:gap-14 lg:py-8">
        <article className="min-w-0">
          <div className="mb-5 text-[11px] tracking-[0.08em] text-[#6f7880]">
            <button type="button" onClick={() => navigate("/blogs")} className="hover:text-[#6335d7]">
              Home
            </button>
            <span className="mx-1.5">»</span>
            <button type="button" onClick={() => navigate("/blogs")} className="hover:text-[#6335d7]">
              {article.category || "Blog"}
            </button>
            <span className="mx-1.5">»</span>
            <span>{article.title}</span>
          </div>

          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#777f87]">
            <span>By {article.author || "DigiNiwas Team"}</span>
            {formatDate(article.publishDate) && (
              <>
                <span className="mx-2">|</span>
                <span>{formatDate(article.publishDate)}</span>
              </>
            )}
          </div>

          <h1 className="max-w-[780px] text-[30px] font-bold leading-[1.15] tracking-[-0.035em] text-black sm:text-[38px] lg:text-[42px]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-4 max-w-[740px] text-[15px] leading-7 text-[#50565b]">
              {article.excerpt}
            </p>
          )}

          {getImage(article.image) && (
            <figure className="mt-6">
              <img
                src={getImage(article.image)}
                alt={article.title}
                className="max-h-[520px] w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              {article.imageCaption && (
                <figcaption className="mt-2 text-xs leading-5 text-gray-500">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="mt-5 flex items-center gap-2 border-b border-[#e7e7e7] pb-5">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on Facebook"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#0866ff] text-white"
            >
              {/* <Facebook size={17} /> */}
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${shareUrl}`)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on WhatsApp"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#20bd5a] text-white"
            >
              <span className="text-sm font-black">w</span>
            </a>
            <button
              type="button"
              onClick={() => {
                if (navigator?.clipboard?.writeText) {
                  navigator.clipboard.writeText(shareUrl).catch(() => {});
                }
              }}
              aria-label="Copy article link"
              className="grid h-8 w-8 place-items-center rounded-full bg-black text-white"
            >
              <Link2 size={16} />
            </button>
            <a
              href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
              aria-label="Share by email"
              className="grid h-8 w-8 place-items-center rounded-full border border-gray-200 text-gray-700"
            >
              <Mail size={15} />
            </a>
          </div>

          <div className="article-body mt-6 space-y-5 text-[14px] leading-[1.85] text-[#42484d] sm:text-[15px]">
            {blocks.map((block, index) => {
              if (block.type === "heading") {
                const HeadingTag = block.level === 1 ? "h2" : block.level === 2 ? "h2" : "h3";
                return (
                  <HeadingTag
                    id={slugHeading(block.text)}
                    key={`${block.type}-${index}`}
                    className={`scroll-mt-24 font-bold leading-snug text-[#171717] ${
                      block.level === 1
                        ? "text-2xl"
                        : block.level === 2
                        ? "pt-2 text-xl"
                        : "pt-1 text-lg"
                    }`}
                  >
                    {block.text}
                  </HeadingTag>
                );
              }

              if (
                block.type === "unordered" ||
                block.type === "ordered" ||
                block.type === "points"
              ) {
                const isPoints = block.type === "points";
                const ListTag =
                  block.type === "ordered" ? "ol" : "ul";

                return (
                  <ListTag
                    key={`${block.type}-${index}`}
                    className={`space-y-2 pl-6 ${
                      block.type === "ordered" || isPoints
                        ? "list-decimal"
                        : "list-disc"
                    }`}
                  >
                    {block.items.map((item, itemIndex) => {
                      if (typeof item === "string") {
                        return (
                          <li key={`${item}-${itemIndex}`}>
                            {item}
                          </li>
                        );
                      }

                      return (
                        <li key={`${item.text}-${itemIndex}`}>
                          {item.text}
                          {item.subPoints?.length > 0 && (
                            <ul className="mt-2 space-y-1 pl-5 list-disc">
                              {item.subPoints.map(
                                (subPoint, subIndex) => (
                                  <li key={`${subPoint}-${subIndex}`}>
                                    {subPoint}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ListTag>
                );
              }

              return (
                <p key={`${block.type}-${index}`} className="whitespace-pre-line">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-10 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={() => navigate("/blogs")}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#6037cf]"
            >
              <ArrowLeft size={15} /> Back to all articles
            </button>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="bg-black px-4 py-4 text-[13px] font-bold leading-5 text-white">
            For any feedback, write to us at
            <a className="block underline" href="mailto:editor@diginiwas.com">
              editor@diginiwas.com
            </a>
          </div>

          {headings.length > 0 && (
            <nav className="mt-7 border-b border-gray-100 pb-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#242424]">
                <List size={15} /> In this article
              </div>
              <ol className="list-decimal space-y-2 pl-5 text-[12px] leading-5 text-[#6534d8]">
                {headings.map((heading, index) => (
                  <li key={`${heading.text}-${index}`}>
                    <a className="hover:underline" href={`#${slugHeading(heading.text)}`}>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {related.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-4 text-sm font-extrabold text-[#222]">Related articles</h2>
              <div className="space-y-4">
                {related.map((item) => (
                  <button
                    key={item._id || item.slug}
                    type="button"
                    onClick={() => navigate(`/blog/${item.slug}`)}
                    className="group flex w-full gap-3 text-left"
                  >
                    {getImage(item.image) && (
                      <img
                        src={getImage(item.image)}
                        alt=""
                        className="h-16 w-20 shrink-0 object-cover"
                      />
                    )}
                    <span className="text-xs font-semibold leading-5 text-[#333] group-hover:text-[#6037cf]">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </aside>

        {related.length > 0 && (
          <section className="lg:col-span-2 lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black">Related Articles</h2>
              <button type="button" onClick={() => navigate("/blogs")} className="inline-flex items-center gap-1 text-xs font-bold text-[#6037cf]">
                All articles <ArrowRight size={13} />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <button
                  key={item._id || item.slug}
                  type="button"
                  onClick={() => navigate(`/blog/${item.slug}`)}
                  className="flex gap-3 rounded-xl border border-gray-200 p-3 text-left"
                >
                  {getImage(item.image) && (
                    <img src={getImage(item.image)} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
                  )}
                  <span className="text-sm font-bold">{item.title}</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
