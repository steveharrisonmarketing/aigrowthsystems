// While the site is in review (showDraftNotes) search engines are asked to stay out.
import { site } from '../config/site';

export const GET = () =>
  new Response(
    site.showDraftNotes
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
