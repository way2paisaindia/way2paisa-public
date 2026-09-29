'use client';

import {useEffect, useState} from 'react';

const fallbackImage = '/way2paisa-mark.jpg';

export default function ListingImage({src, alt, ...props}) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  return (
    <img
      {...props}
      src={failed ? fallbackImage : src}
      alt={failed ? 'Way2Paisa verified property' : alt}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}
