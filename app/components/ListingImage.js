'use client';

import {useEffect, useState} from 'react';

const fallbackImage = '/way2paisa-mark.jpg';

export default function ListingImage({src, alt, projectId, mediaId, ...props}) {
  const [failed, setFailed] = useState(!src);
  const [useDirectSource, setUseDirectSource] = useState(false);
  // Emaar CMS images cannot currently be fetched by the server-side image
  // proxy. Publish their verified original URL directly in HTML so the
  // browser and Googlebot can request the developer's image themselves.
  const originalUrl = String(src || '').toLowerCase();
  const useOriginalEmaarImage = originalUrl.startsWith('https://uae-cms.emaar.com/');
  // Unstyled full-resolution Mahindra assets are safer to expose directly:
  // an earlier styled thumbnail returned a 1-pixel placeholder that the
  // image proxy/CDN could cache as a successful JPEG.
  const useOriginalMahindraImage = originalUrl.startsWith('https://cms.mahindralifespaces.com/web/sites/default/files/')
    && !originalUrl.includes('/styles/');
  const displaySrc = projectId && src && !useDirectSource && !useOriginalEmaarImage && !useOriginalMahindraImage
    ? `/api/project-image?project=${encodeURIComponent(projectId)}${mediaId ? `&media=${encodeURIComponent(mediaId)}` : ''}`
    : src;

  useEffect(() => {
    setFailed(!src);
    setUseDirectSource(false);
  }, [src]);

  return (
    <img
      {...props}
      src={failed ? fallbackImage : displaySrc}
      alt={failed ? 'Way2Paisa verified property' : alt}
      onError={() => {
        // Retry the original source only when the failed URL was the
        // project-image proxy. For direct Emaar/Mahindra images the next
        // URL would be identical, leaving a broken image indefinitely.
        if (!failed && projectId && !useDirectSource
          && !useOriginalEmaarImage && !useOriginalMahindraImage) {
          setUseDirectSource(true);
          return;
        }
        if (!failed) setFailed(true);
      }}
    />
  );
}
