import './globals.css';
import './upgrade.css';
import './media-watermark.css';
import QuickContact from './components/QuickContact';

export const metadata = {
  metadataBase: new URL('https://www.way2paisa.in'),
  title: 'Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory',
  description: 'Way2Paisa FinPro Services offers curated new residential projects and expert real estate and finance advisory across Mumbai, MMR and Dubai.',
  keywords: ['Way2Paisa FinPro Services', 'Way2Paisa', 'Mumbai real estate advisory', 'home loans', 'new projects Mumbai'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Way2Paisa FinPro Services',
    description: 'Premium real estate and finance advisory across Mumbai, MMR and Dubai.',
    url: 'https://www.way2paisa.in',
    siteName: 'Way2Paisa FinPro Services',
    type: 'website',
  },
  robots: { index: true, follow: true },
  verification: {
    google: '1NXPGzMhg35Vq4JumJDxQp6yc9AcTlMbo13tp2NIbGo',
  },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}<QuickContact/></body></html>;
}
