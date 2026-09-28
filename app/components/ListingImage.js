'use client';

import {useEffect, useRef, useState} from 'react';

const fallbackImage = '/way2paisa-mark.jpg';

export default function ListingImage({src, alt, ...props}) {
  const imageRef = useRef(null);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
    const checkLoadedImage = () => {
      if (imageRef.current?.naturalWidth === 0) {
        setFailed(true);
      }
    };
    const timeout = window.setTimeout(checkLoadedImage, 5000);
    return () => window.clearTimeout(timeout);
  }, [src]);

  return (
    <img
      {...props}
      ref={imageRef}
      src={failed ? fallbackImage : src}
      alt={failed ? 'Way2Paisa verified property' : alt}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}
