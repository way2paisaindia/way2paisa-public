// Redirect only verified duplicate project URLs to their published master pages.
// Keep incomplete or unverified projects unpublished; do not redirect them to unrelated listings.
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    const srishtiNamaahWings = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(wing => ({
      source: `/projects/kalpataru-srishti-namaah-wing-${wing}-mira-road`,
      destination: '/projects/srishti-namaah-kalpataru-mira-road',
      permanent: true,
    }));
    return [
      // Legacy browser/Googlebot favicon requests now resolve to the existing
      // square 100x100 Way2Paisa brand mark (supported JPEG favicon format).
      {
        source: '/favicon.ico',
        destination: '/way2paisa-mark.jpg',
        permanent: true,
      },
      ...srishtiNamaahWings,
      {
        source: '/projects/rustomjee-belle-vue-kasara-hills',
        destination: '/projects/rustomjee-belle-vue-kasara',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
