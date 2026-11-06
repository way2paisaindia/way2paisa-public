'use client';

// Marketing attribution persists only for the current browser session.
// Never include names, email addresses or phone numbers in GA4 events.
const KEY = 'way2paisa_attribution_v1';
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const tidy = value => String(value || '').replace(/[^a-zA-Z0-9 _.-]/g, '').slice(0, 100).trim();

export function getLeadAttribution() {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const tags = Object.fromEntries(KEYS.map(key => [key, tidy(params.get(key))]).filter(([,value]) => value));
    const hasTags = Object.keys(tags).length > 0;
    const existing = JSON.parse(window.sessionStorage.getItem(KEY) || 'null');
    if (hasTags || !existing) {
      const next = {
        ...tags,
        landing_path: window.location.pathname.slice(0, 200),
        referrer_host: (() => { try { return document.referrer ? new URL(document.referrer).hostname.slice(0, 100) : ''; } catch { return ''; } })()
      };
      window.sessionStorage.setItem(KEY, JSON.stringify(next));
      return next;
    }
    return existing;
  } catch {
    return { landing_path: window.location.pathname.slice(0, 200) };
  }
}

// Only accept non-personal, predeclared buyer-guide identifiers. Never pass
// enquiry text, contact details or full URLs to analytics.
const LEAD_TOPICS = new Set([
  'mumbai_luxury_homes',
  'mumbai_commercial_offices',
  'dubai_property_investment',
  'mmr_villas_plots'
]);

export function trackSavedLead(leadType, {leadTopic} = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const fields = { lead_type: tidy(leadType || 'advisory') };
    if (LEAD_TOPICS.has(leadTopic)) fields.lead_topic = leadTopic;
    window.gtag('event', 'generate_lead', fields);
  }
}
