import HomeClient from './components/HomeClient';
import { loadPublicProjects } from './lib/public-projects';

// Refresh published inventory without requiring a code redeployment.
export const revalidate = 300;

export default async function HomePage() {
  const initialData = await loadPublicProjects();
  return <HomeClient initialData={initialData} />;
}
