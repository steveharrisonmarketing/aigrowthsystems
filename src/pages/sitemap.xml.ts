// The pages search engines should know about. Add a page to site.sitemapPages when it is real.
import { site } from '../config/site';

export const GET = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      site.sitemapPages.map((path) => `  <url><loc>${site.url}${path}</loc></url>`).join('\n') +
      `\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
