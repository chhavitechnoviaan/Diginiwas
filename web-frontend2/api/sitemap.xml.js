export default async function handler(req, res) {
  const base = (process.env.BACKEND_URL || "https://diginiwas.com/digi").replace(/\/$/, "");
  try {
    const response = await fetch(`${base}/seo/sitemap.xml`, { headers: { accept: "application/xml" } });
    const body = await response.text();
    res.status(response.status).setHeader("Content-Type", "application/xml; charset=utf-8").send(body);
  } catch (error) {
    res.status(502).setHeader("Content-Type", "application/xml; charset=utf-8").send('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
}
