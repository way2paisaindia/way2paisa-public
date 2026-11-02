'use client';

import {useEffect, useState} from 'react';

// Preserve valid project photography. The legacy Emaar CMS upload URLs return
// HTTP 404 in production. Avoid repeated network requests for those known-bad
// links until verified replacements have been added to the project record.
function isUnavailableEmaarCmsSource(url) {
  return /^https:\/\/uae-cms\.emaar\.com\/uploads\//i.test(String(url || ''));
}
export default function ListingImage({src, alt, projectId, mediaId, fallbackSources = [], ...props}) {
  const originalUrl = String(src || '').toLowerCase();
  const unavailableOriginal = isUnavailableEmaarCmsSource(src);
  const useOriginalEmaarImage = originalUrl.startsWith('https://uae-cms.emaar.com/');
  const useOriginalMahindraImage = originalUrl.startsWith('https://cms.mahindralifespaces.com/web/sites/default/files/')
    && !originalUrl.includes('/styles/');
  const alternatives = Array.isArray(fallbackSources)
    ? [...new Set(fallbackSources.filter(url => typeof url === 'string' && url.startsWith('https://') && url !== src && !isUnavailableEmaarCmsSource(url)))].slice(0, 3)
    : [];
  const initialAlternative = unavailableOriginal && alternatives.length ? 0 : -1;
  const [failed, setFailed] = useState(!src || (unavailableOriginal && !alternatives.length));
  const [useDirectSource, setUseDirectSource] = useState(false);
  const [alternateIndex, setAlternateIndex] = useState(initialAlternative);
  const selectedSource = alternateIndex >= 0 ? alternatives[alternateIndex] : src;
  const shouldProxy = projectId && src && !useDirectSource && alternateIndex < 0
    && !useOriginalEmaarImage && !useOriginalMahindraImage;
  const displaySrc = shouldProxy
    ? `/api/project-image?project=${encodeURIComponent(projectId)}${mediaId ? `&media=${encodeURIComponent(mediaId)}` : ''}`
    : selectedSource;

  useEffect(() => {
    setFailed(!src || (unavailableOriginal && !alternatives.length));
    setUseDirectSource(false);
    setAlternateIndex(initialAlternative);
  }, [src]);

  if (failed) {
    // A logo or an unrelated stock photograph would misrepresent this
    // property. State plainly that its verified photograph is unavailable.
    return (
      <span
        role="img"
        aria-label={`Project photograph temporarily unavailable${alt ? ` for ${alt}` : ''}`}
        style={{
          width: '100%', height: '100%', minHeight: '100%', display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '6px', textAlign: 'center', padding: '20px', boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #062c59, #0b5186)',
          color: '#ffffff', fontSize: '13px', letterSpacing: '.02em',
        }}
      >
        <strong>Project photograph</strong>
        <span style={{opacity: .8, fontSize: '11px'}}>Temporarily unavailable</span>
      </span>
    );
  }

  return (
    <img
      {...props}
      src={displaySrc}
      alt={alt}
      onError={() => {
        // Try the developer's own URL when the relay cannot fetch it.
        if (shouldProxy) {
          setUseDirectSource(true);
          return;
        }
        // For a hero only, try other verified photographs of this
        // *same* project before the transparent unavailable state.
        if (alternateIndex + 1 < alternatives.length) {
          setAlternateIndex(current => current + 1);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
