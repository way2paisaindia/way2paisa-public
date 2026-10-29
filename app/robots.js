export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: 'https://www.way2paisa.in/sitemap.xml',
    host: 'https://www.way2paisa.in',
  };
}
