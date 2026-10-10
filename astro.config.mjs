import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://aigrowthsystems.co.uk',
  devToolbar: { enabled: false },
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
