// The pages search engines should know about. Add a page to site.sitemapPages when it is real.
// The blog and its published posts are added automatically.
import { getCollection } from 'astro:content';
import { site } from '../config/site';

export const GET = async () => {
  const now = new Date();
  const posts = await getCollection('posts', ({ data }) => data.status === 'published' && data.publishDate <= now);
  const paths = [...site.sitemapPages, ...(posts.length ? ['/blog'] : []), ...posts.map((p) => `/blog/${p.id}`)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      paths.map((path) => `  <url><loc>${site.url}${path}</loc></url>`).join('\n') +
      `\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
