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
