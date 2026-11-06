'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { getLeadAttribution } from '../lib/lead-attribution';

const configuredId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '';
const gaId = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : '';

const BUYER_GUIDE_TOPICS = {
  '/solutions/mumbai-luxury-homes': 'mumbai_luxury_homes',
  '/solutions/mumbai-commercial-property': 'mumbai_commercial_offices',
  '/solutions/dubai-property-investment': 'dubai_property_investment',
  '/explore/villas-and-plots-mmr': 'mmr_villas_plots'
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    getLeadAttribution();
    const onClick = event => {
      const link = event.target?.closest?.('a[href]');
      if (!link || typeof window.gtag !== 'function') return;
      const href = link.getAttribute('href') || '';
      const leadTopic = BUYER_GUIDE_TOPICS[pathname] || '';
      const pageSection = pathname?.startsWith('/projects/') ? 'project'
        : pathname?.startsWith('/finance') ? 'finance'
        : leadTopic ? 'buyer_guide' : 'general';
      // A CTA click measures expressed interest; a separate generate_lead
      // event is emitted ONLY after the CRM has saved a genuine enquiry.
      if (leadTopic && href === '#consultation') {
        window.gtag('event', 'select_advisory_cta', { lead_topic: leadTopic });
      }
      // Project detail to buyer-guide navigation: measure useful engagement
      // with fixed categories only, without sending visitor or project data.
      const guideTopic = pathname?.startsWith('/projects/') ? BUYER_GUIDE_TOPICS[href] : '';
      if (guideTopic) {
        window.gtag('event', 'select_buyer_guide', { lead_topic: guideTopic, page_section: 'project' });
      }
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
