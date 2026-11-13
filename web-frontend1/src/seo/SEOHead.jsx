// import { useEffect } from "react";

// const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.diginiwas.com").replace(/\/$/, "");
// const API_ORIGIN = (import.meta.env.VITE_API_URL || "https://diginiwas.com/digi").replace(/\/$/, "");
// const API_URL = /\/api\/v1$/i.test(API_ORIGIN) ? API_ORIGIN : /\/api$/i.test(API_ORIGIN) ? `${API_ORIGIN}/v1` : `${API_ORIGIN}/api/v1`;

// const upsertMeta = (selector, attributes, content) => {
//   if (!content) return;
//   let node = document.head.querySelector(selector);
//   if (!node) {
//     node = document.createElement("meta");
//     Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
//     document.head.appendChild(node);
//   }
//   node.setAttribute("content", content);
// };

// const upsertLink = (rel, href) => {
//   let node = document.head.querySelector(`link[rel="${rel}"]`);
//   if (!node) {
//     node = document.createElement("link");
//     node.setAttribute("rel", rel);
//     document.head.appendChild(node);
//   }
//   node.setAttribute("href", href);
// };

// const removeSchema = () => document.head.querySelectorAll('script[data-diginiwas-schema="true"]').forEach((node) => node.remove());

// export default function SEOHead({ title, description, canonical, robots = "index,follow", image, schema, type = "website" }) {
//   useEffect(() => {
//     let cancelled = false;
//     const path = `${window.location.pathname}${window.location.search ? window.location.search : ""}`;
//     const noindexPrefixes = ["/admin", "/dashboard", "/login", "/register", "/settings", "/favorites", "/my-properties", "/my-leads", "/add-property", "/property-management", "/explore-property", "/search"];
//     const isApplicationPath = noindexPrefixes.some((prefix) => window.location.pathname === prefix || window.location.pathname.startsWith(`${prefix}/`));
//     const fallbackTitle = title || "DigiNiwas | Buy, Rent & Discover Properties";
//     const fallbackDescription = description || "Discover verified properties for sale and rent with DigiNiwas.";
//     const fallbackCanonical = canonical || `${SITE_URL}${window.location.pathname}`;

//     const apply = (data = {}) => {
//       if (cancelled) return;
//       const nextTitle = data.title || fallbackTitle;
//       const nextDescription = data.description || fallbackDescription;
//       const nextCanonical = data.canonical || fallbackCanonical;
//       document.title = nextTitle;
//       upsertMeta('meta[name="description"]', { name: "description" }, nextDescription);
//       upsertMeta('meta[name="robots"]', { name: "robots" }, data.robots || robots);
//       upsertMeta('meta[property="og:title"]', { property: "og:title" }, data.ogTitle || nextTitle);
//       upsertMeta('meta[property="og:description"]', { property: "og:description" }, data.ogDescription || nextDescription);
//       upsertMeta('meta[property="og:type"]', { property: "og:type" }, data.type || type);
//       upsertMeta('meta[property="og:url"]', { property: "og:url" }, nextCanonical);
//       upsertMeta('meta[property="og:image"]', { property: "og:image" }, data.image || image || `${SITE_URL}/logo.png`);
//       upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
//       upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, nextTitle);
//       upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, nextDescription);
//       upsertLink("canonical", nextCanonical);
//       removeSchema();
//       const schemaData = data.schema || schema;
//       if (schemaData) {
//         const script = document.createElement("script");
//         script.type = "application/ld+json";
//         script.dataset.diginiwasSchema = "true";
//         script.textContent = JSON.stringify(schemaData);
//         document.head.appendChild(script);
//       }
//     };

//     if (isApplicationPath) {
//       apply({ robots: "noindex,follow", title: fallbackTitle, description: fallbackDescription, canonical: fallbackCanonical });
//       return () => { cancelled = true; };
//     }
//     apply();
//     const controller = new AbortController();
//     fetch(`${API_URL}/seo/redirect/resolve?path=${encodeURIComponent(window.location.pathname)}`, { signal: controller.signal })
//       .then((response) => response.ok ? response.json() : null)
//       .then((redirectPayload) => {
//         if (cancelled) return null;
//         const destination = redirectPayload?.redirect?.destination;
//         if (destination) {
//           const nextUrl = /^https?:\/\//i.test(destination) ? destination : `${window.location.origin}${destination.startsWith("/") ? destination : `/${destination}`}`;
//           window.location.replace(nextUrl);
//           return null;
//         }
//         return fetch(`${API_URL}/seo/resolve?path=${encodeURIComponent(path)}`, { signal: controller.signal })
//           .then((response) => response.ok ? response.json() : null)
//           .then((payload) => payload?.page && apply(payload.page));
//       })
//       .catch(() => {});
//     return () => { cancelled = true; controller.abort(); };
//   }, [title, description, canonical, robots, image, schema, type]);

//   return null;
// }

import { useEffect } from "react";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.diginiwas.com").replace(/\/$/, "");
const API_ORIGIN = (import.meta.env.VITE_API_URL || "https://diginiwas.com/digi").trim().replace(/[\",\s]+$/, "").replace(/\/$/, "");
const API_URL = /\/api\/v1$/i.test(API_ORIGIN) ? API_ORIGIN : /\/api$/i.test(API_ORIGIN) ? `${API_ORIGIN}/v1` : `${API_ORIGIN}/api/v1`;

const upsertMeta = (selector, attributes, content) => {
  if (!content) return;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
};

const removeSchema = () => document.head.querySelectorAll('script[data-diginiwas-schema="true"]').forEach((node) => node.remove());

export default function SEOHead({ title, description, canonical, robots = "index,follow", image, schema, type = "website" }) {
  useEffect(() => {
    let cancelled = false;
    const path = `${window.location.pathname}${window.location.search ? window.location.search : ""}`;
    const noindexPrefixes = ["/admin", "/dashboard", "/login", "/register", "/settings", "/favorites", "/my-properties", "/my-leads", "/add-property", "/property-management", "/explore-property", "/search"];
    const isApplicationPath = noindexPrefixes.some((prefix) => window.location.pathname === prefix || window.location.pathname.startsWith(`${prefix}/`));
    const fallbackTitle = title || "DigiNiwas | Buy, Rent & Discover Properties";

    const fallbackDescription = description || "Discover verified properties for sale and rent with DigiNiwas.";
    const fallbackCanonical = canonical || `${SITE_URL}${window.location.pathname}`;

    const apply = (data = {}) => {
      if (cancelled) return;
      const nextTitle = data.title || fallbackTitle;
      const nextDescription = data.description || fallbackDescription;
      const nextCanonical = data.canonical || fallbackCanonical;
      document.title = nextTitle;
      upsertMeta('meta[name="description"]', { name: "description" }, nextDescription);
      upsertMeta('meta[name="robots"]', { name: "robots" }, data.robots || robots);
      upsertMeta('meta[property="og:title"]', { property: "og:title" }, data.ogTitle || nextTitle);
      upsertMeta('meta[property="og:description"]', { property: "og:description" }, data.ogDescription || nextDescription);
      upsertMeta('meta[property="og:type"]', { property: "og:type" }, data.type || type);
      upsertMeta('meta[property="og:url"]', { property: "og:url" }, nextCanonical);
      upsertMeta('meta[property="og:image"]', { property: "og:image" }, data.image || image || `${SITE_URL}/logo.png`);
      upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
      upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, nextTitle);
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, nextDescription);
      upsertLink("canonical", nextCanonical);
      removeSchema();
      const schemaData = data.schema || schema;
      if (schemaData) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.diginiwasSchema = "true";
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
      }
    };

    if (isApplicationPath) {
      apply({ robots: "noindex,follow", title: fallbackTitle, description: fallbackDescription, canonical: fallbackCanonical });
      return () => { cancelled = true; };
    }
    apply();
    const controller = new AbortController();
    fetch(`${API_URL}/seo/redirect/resolve?path=${encodeURIComponent(window.location.pathname)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((redirectPayload) => {
        if (cancelled) return null;
        const destination = redirectPayload?.redirect?.destination;
        if (destination) {
          const nextUrl = /^https?:\/\//i.test(destination) ? destination : `${window.location.origin}${destination.startsWith("/") ? destination : `/${destination}`}`;
          window.location.replace(nextUrl);
          return null;
        }
        return fetch(`${API_URL}/seo/resolve?path=${encodeURIComponent(path)}`, { signal: controller.signal })
          .then((response) => response.ok ? response.json() : null)
          // .then((payload) => payload?.page && apply(payload.page));
          .then((payload) => {
  const seoData = payload?.page || payload?.data?.page || payload?.data;

  if (seoData) {
    apply({
      ...seoData,
      title: seoData.defaultTitle || seoData.title || fallbackTitle,
      description:
        seoData.defaultDescription ||
        seoData.description ||
        fallbackDescription,
    });
  }
});
      })
      .catch(() => {});
    return () => { cancelled = true; controller.abort(); };
  }, [title, description, canonical, robots, image, schema, type]);

  return null;
}
