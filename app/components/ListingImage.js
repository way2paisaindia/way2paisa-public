'use client';

import {useCallback, useEffect, useRef, useState} from 'react';

// The legacy Emaar /uploads sources attached to the current projects have
// been verified as HTTP 404 (277 unique gallery URLs and 71 hero URLs,
// 3 Nov 2026). Preserve the recorded sources but do not request broken images
// on public pages. Fresh, independently verified replacement hosts are allowed.
// Also skip the previously confirmed unavailable Godrej Bliss CDN images.
function isKnownUnavailableProjectSource(url) {
  const src=String(url || '');
  return /^https:\/\/uae-cms\.emaar\.com\/uploads\//i.test(src)
    || (/^https:\/\/www\.emaar\.com\/_next\/image\?/i.test(src) && /uae-cms\.emaar\.com/i.test(src))
    || /^https:\/\/newwayint\.com\/image\/cache\/catalog\/projects-chini\/serro-emaar\/serro-emaar-02-750x563\.webp(?:\?.*)?$/i.test(src)
    || /^https:\/\/gplwebsitecdnblob\.blob\.core\.windows\.net\/godrej-cdn\/Images\/Godrej-Bliss-Mumbai-Gallery0[1-4]-1332X750/i.test(src);
}
export default function ListingImage({src, alt, projectId, mediaId, fallbackSources = [], ...props}) {
  const imageRef = useRef(null);
  const handledFailureSource = useRef(null);
  const originalUrl = String(src || '').toLowerCase();
  const unavailableOriginal = isKnownUnavailableProjectSource(src);
  const useOriginalEmaarImage = originalUrl.startsWith('https://uae-cms.emaar.com/');
  const useOriginalMahindraImage = originalUrl.startsWith('https://cms.mahindralifespaces.com/web/sites/default/files/')
    && !originalUrl.includes('/styles/');
  const alternatives = Array.isArray(fallbackSources)
    ? [...new Set(fallbackSources.filter(url => typeof url === 'string' && url.startsWith('https://') && url !== src && !isKnownUnavailableProjectSource(url)))].slice(0, 3)
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
    handledFailureSource.current = null;
    setFailed(!src || (unavailableOriginal && !alternatives.length));
    setUseDirectSource(false);
    setAlternateIndex(initialAlternative);
  }, [src]);

  const handleImageFailure = useCallback(() => {
    // Browser image requests can fail before React has hydrated and attached
    // its onError handler. Also guard against the native error event and the
    // post-hydration check handling the same failed URL twice.
    if (handledFailureSource.current === displaySrc) return;
    handledFailureSource.current = displaySrc;
    if (shouldProxy) {
      setUseDirectSource(true);
    } else if (alternateIndex + 1 < alternatives.length) {
      setAlternateIndex(current => current + 1);
    } else {
      setFailed(true);
    }
  }, [displaySrc, shouldProxy, alternateIndex, alternatives.length]);

  useEffect(() => {
    const image = imageRef.current;
    // OnError may already have fired before hydration; native complete=true
    // and naturalWidth=0 is the definitive broken-image state.
    if (image?.complete && image.naturalWidth === 0) handleImageFailure();
  }, [displaySrc, handleImageFailure]);

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
      ref={imageRef}
      src={displaySrc}
      alt={alt}
      onError={handleImageFailure}
    />
  );
}
