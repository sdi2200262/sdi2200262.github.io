import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: process.env.SITE_URL || 'https://sdi2200262.github.io',
  base: process.env.BASE_PATH || '/',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  markdown: { shikiConfig: { themes: { light: 'gruvbox-light-soft', dark: 'gruvbox-dark-hard' } } },
});
