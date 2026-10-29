import PropertiesClient from '../components/PropertiesClient';
import { loadPublicProjects } from '../lib/public-projects';

export const revalidate = 300;

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;
  const allowed = ['q', 'zone', 'dubaiZone', 'location', 'developer', 'bhk', 'configuration', 'budget', 'market', 'category'];
  const initialFilters = Object.fromEntries(allowed.map(key => [key, typeof params?.[key] === 'string' ? params[key] : '']));
  const initialData = await loadPublicProjects();
  return <PropertiesClient initialData={initialData} initialFilters={initialFilters} />;
}
