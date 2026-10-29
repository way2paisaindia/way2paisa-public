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

export function trackSavedLead(leadType) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { lead_type: tidy(leadType || 'advisory') });
  }
}
