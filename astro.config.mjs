import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://aigrowthsystems.co.uk',
  devToolbar: { enabled: false },
  // One address form everywhere: no trailing slash. Pages are built as about.html (not about/index.html),
  // which Cloudflare serves at /about without a redirect, matching every internal link, canonical and the sitemap.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Hidden pages from earlier versions of the brief. They were never built;
  // their addresses send visitors to the AI Business Setup page.
  redirects: {
    '/ai-integration': '/ai-business-setup',
    '/programmes': '/ai-business-setup',
    '/full-assessment': '/ai-business-setup',
    '/full-assessment/booked': '/ai-business-setup',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  // Pages are built as plain HTML. Only the audit endpoints in src/pages/api run on the server.
  // 'compile' prepares images at build time, so no paid Cloudflare image service is needed.
  adapter: cloudflare({ imageService: 'compile' }),
});
