'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {isKnownUnavailableProjectImage as isKnownUnavailableProjectSource} from '../lib/unavailable-project-media';

export default function ListingImage({src, alt, projectId, mediaId, fallbackSources = [], imageVariant = 'full', ...props}) {
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
  // A confirmed-dead original may still have a working, same-project gallery
  // photograph available through the server relay. Try that once, but never
  // request the known-dead original directly in the visitor's browser.
  const canUseProjectRelay = Boolean(projectId && !useOriginalEmaarImage && !useOriginalMahindraImage);
  const initialFailed = !src || (unavailableOriginal && !canUseProjectRelay && !alternatives.length);
  const [failed, setFailed] = useState(initialFailed);
  const [useDirectSource, setUseDirectSource] = useState(false);
  const [alternateIndex, setAlternateIndex] = useState(initialAlternative);
  const selectedSource = alternateIndex >= 0 ? alternatives[alternateIndex] : src;
  const shouldProxy = projectId && src && !useDirectSource && alternateIndex < 0
    && !useOriginalEmaarImage && !useOriginalMahindraImage;
  const displaySrc = shouldProxy
    ? `/api/project-image?project=${encodeURIComponent(projectId)}${mediaId ? `&media=${encodeURIComponent(mediaId)}` : ''}${imageVariant === 'preview' ? '&variant=preview' : ''}`
    : selectedSource;

  useEffect(() => {
    handledFailureSource.current = null;
    setFailed(initialFailed);
    setUseDirectSource(false);
    setAlternateIndex(initialAlternative);
  }, [src]);

  const handleImageFailure = useCallback(() => {
    // Browser image requests can fail before React has hydrated and attached
    // its onError handler. Also guard against the native error event and the
    // post-hydration check handling the same failed URL twice.
    if (handledFailureSource.current === displaySrc) return;
    handledFailureSource.current = displaySrc;
    if (shouldProxy && !unavailableOriginal) {
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
