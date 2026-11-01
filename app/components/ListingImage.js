'use client';

import {useEffect, useState} from 'react';

const fallbackImage = '/way2paisa-mark.jpg';

export default function ListingImage({src, alt, projectId, mediaId, ...props}) {
  const [failed, setFailed] = useState(!src);
  const [useDirectSource, setUseDirectSource] = useState(false);
  // Emaar CMS images cannot currently be fetched by the server-side image
  // proxy. Publish their verified original URL directly in HTML so the
  // browser and Googlebot can request the developer's image themselves.
  const useOriginalEmaarImage = String(src || '').toLowerCase().startsWith('https://uae-cms.emaar.com/');
  const displaySrc = projectId && src && !useDirectSource && !useOriginalEmaarImage
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
        if (!failed && projectId && !useDirectSource) {
          setUseDirectSource(true);
          return;
        }
        if (!failed) setFailed(true);
      }}
    />
  );
}
