# DigiNiwas SEO implementation

This update adds the technical SEO foundation without replacing the existing property/search APIs.

## Frontend
- Dynamic canonical/title/meta/OG/Twitter tags in `src/seo/SEOHead.jsx`.
- JSON-LD schema injection.
- Nested SEO route support through the existing Explore Properties template.
- Application/search/admin paths receive `noindex,follow`.
- `public/robots.txt` added.
- Vercel sitemap proxy at `api/sitemap.xml.js`.

## Backend
- `models/SeoUrlRegistry.js` for central URL/indexability state.
- `models/SeoRedirect.js` for 301/308 redirects managed by admin APIs.
- `controllers/seoController.js` for metadata resolution, sitemap, robots, URL registry and redirects.
- `routes/seoRoutes.js` mounted at `/seo` and `/api/seo` + `/api/v1/seo`.
- `/sitemap.xml` and `/robots.txt` are available from the backend root.

## Environment
Frontend already uses `VITE_API_URL`. Optional:
- `VITE_SITE_URL=https://www.diginiwas.com`
- Vercel `BACKEND_URL=https://diginiwas.com/digi`
Backend optional:
- `SITE_URL=https://www.diginiwas.com`

## Important deployment note
The current app is still a Vite/React SPA. This implementation provides dynamic metadata after hydration and a crawlable URL/sitemap architecture. For maximum SEO performance on high-value city/locality/property pages, the next architectural step is SSR/prerendering (for example, moving public SEO templates to Next.js or adding a dedicated prerender layer).
