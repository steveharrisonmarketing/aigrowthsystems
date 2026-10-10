import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aigrowthsystems.co.uk',
  // Hidden pages from earlier versions of the brief. They were never built;
  // their addresses send visitors to the AI Business Setup page.
  // /programmes/[slug] is added with the Cloudflare redirects file in Phase 5.
  redirects: {
    '/ai-integration': '/ai-business-setup',
    '/programmes': '/ai-business-setup',
    '/full-assessment': '/ai-business-setup',
    '/full-assessment/booked': '/ai-business-setup',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
