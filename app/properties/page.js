import PropertiesClient from '../components/PropertiesClient';
import { loadPublicProjects } from '../lib/public-projects';

export const metadata = {
  title: 'New & Upcoming Projects in Mumbai, MMR & Dubai | Way2Paisa',
  description: 'Browse verified new and upcoming residential, commercial, villa and plot projects in Mumbai, the Mumbai Metropolitan Region and Dubai. Compare configurations and prices, and enquire with Way2Paisa.',
  alternates: { canonical: '/properties' },
  openGraph: {
    title: 'Mumbai, MMR & Dubai Properties | Way2Paisa',
    description: 'Explore curated developer projects with current indicative pricing, configurations and site-visit enquiries.',
    url: 'https://www.way2paisa.in/properties',
    type: 'website',
    siteName: 'Way2Paisa FinPro Services',
    images: [{ url: '/opengraph-image', alt: 'Way2Paisa real estate projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New & Upcoming Properties | Way2Paisa',
    description: 'Explore residential and commercial projects in Mumbai, MMR and Dubai.',
  },
};

export const revalidate = 300;

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;
  const allowed = ['q', 'zone', 'dubaiZone', 'location', 'developer', 'bhk', 'configuration', 'budget', 'market', 'category'];
  const initialFilters = Object.fromEntries(allowed.map(key => [key, typeof params?.[key] === 'string' ? params[key] : '']));
  const initialData = await loadPublicProjects();
  return <PropertiesClient initialData={initialData} initialFilters={initialFilters} />;
}
