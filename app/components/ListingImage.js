'use client';

import {useEffect, useState} from 'react';

const fallbackImage = '/way2paisa-mark.jpg';

export default function ListingImage({src, alt, projectId, ...props}) {
  const [failed, setFailed] = useState(!src);
  const displaySrc = projectId && src
    ? `/api/project-image?project=${encodeURIComponent(projectId)}`
    : src;

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  return (
    <img
      {...props}
      src={failed ? fallbackImage : displaySrc}
      alt={failed ? 'Way2Paisa verified property' : alt}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}
