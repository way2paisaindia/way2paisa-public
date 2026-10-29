'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { getLeadAttribution } from '../lib/lead-attribution';

const configuredId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '';
const gaId = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : '';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    getLeadAttribution();
    const onClick = event => {
      const link = event.target?.closest?.('a[href]');
      if (!link || typeof window.gtag !== 'function') return;
      const href = link.getAttribute('href') || '';
      const pageSection = pathname?.startsWith('/projects/') ? 'project'
        : pathname?.startsWith('/finance') ? 'finance' : 'general';
      if (/^tel:/i.test(href)) {
        window.gtag('event', 'click_call', { page_section: pageSection });
      } else if (/^https?:\/\/(?:wa\.me|api\.whatsapp\.com|www\.wa\.me)\//i.test(href)) {
        window.gtag('event', 'click_whatsapp', { page_section: pageSection });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  // No placeholder IDs or duplicate Google tags: remains dormant until
  // a real G- measurement ID is configured for the appropriate Vercel environment.
  if (!gaId || pathname?.startsWith('/admin')) return null;
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
    <Script id="way2paisa-ga4" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function(){dataLayer.push(arguments)};
        gtag('js', new Date());
        gtag('config', '${gaId}');`}
    </Script>
  </>;
}
