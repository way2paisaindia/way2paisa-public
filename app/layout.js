import './globals.css';
import './upgrade.css';
import './media-watermark.css';
import './emi.css';
import QuickContact from './components/QuickContact';
import AnalyticsTracker from './components/AnalyticsTracker';

export const metadata = {
  metadataBase: new URL('https://www.way2paisa.in'),
  title: 'Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory',
  description: 'Way2Paisa FinPro Services offers curated new residential projects and expert real estate and finance advisory across Mumbai, MMR and Dubai.',
  keywords: ['Way2Paisa FinPro Services', 'Way2Paisa', 'Mumbai real estate advisory', 'home loans', 'new projects Mumbai'],
  alternates: { canonical: '/' },
  // The current brand mark is a square 100x100 JPEG supported by Google Search.
  // Keep the URL stable so browser tabs and Google can discover the same icon.
  icons: {
    icon: [{ url: '/way2paisa-mark.jpg', type: 'image/jpeg', sizes: '100x100' }],
    shortcut: '/way2paisa-mark.jpg',
  },
  openGraph: {
    title: 'Way2Paisa FinPro Services',
    description: 'Premium real estate and finance advisory across Mumbai, MMR and Dubai.',
    url: 'https://www.way2paisa.in',
    siteName: 'Way2Paisa FinPro Services',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Way2Paisa FinPro Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory',
    description: 'Curated residences and professional finance advisory across Mumbai, MMR and Dubai.',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  verification: {
    google: '1NXPGzMhg35Vq4JumJDxQp6yc9AcTlMbo13tp2NIbGo',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Way2Paisa FinPro Services',
  url: 'https://www.way2paisa.in',
  logo: 'https://www.way2paisa.in/way2paisa-logo.png',
  email: 'way2paisaindia@gmail.com',
  telephone: '+91 88503 73012',
  sameAs: [
    'https://www.instagram.com/way2paisa_/',
    'https://www.facebook.com/share/18Won2YfMQ/',
    'https://www.linkedin.com/company/way2paisa-finpro-services/',
    'https://x.com/way2paisa_',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Way2Paisa FinPro Services',
  url: 'https://www.way2paisa.in',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationJsonLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteJsonLd)}}/>
    {children}<QuickContact/><AnalyticsTracker/>
  </body></html>;
}
