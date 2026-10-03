'use client';

import {useEffect, useState} from 'react';

const fallbackImage = '/way2paisa-mark.jpg';

export default function ListingImage({src, alt, projectId, ...props}) {
  const [failed, setFailed] = useState(!src);
  const [useDirectSource, setUseDirectSource] = useState(false);
  const displaySrc = projectId && src && !useDirectSource
    ? `/api/project-image?project=${encodeURIComponent(projectId)}`
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
