export default function robots() {
  return {
    rules: {
      userAgent: '*',
      // Project gallery and hero images use this read-only image route.
      // Keep other APIs and the admin panel excluded from crawling.
      allow: ['/', '/api/project-image'],
      disallow: ['/admin', '/api/'],
    },
    sitemap: 'https://www.way2paisa.in/sitemap.xml',
    host: 'https://www.way2paisa.in',
  };
}
