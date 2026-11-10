// First-party Emaar image delivery only. This is a fallback for project-specific
// CMS assets already stored against a published Way2Paisa listing; never accept
// a caller-supplied URL and never route arbitrary remote websites through Emaar.
export function officialEmaarImageFallback(value) {
  try {
    const source = new URL(String(value ?? ''));
    if (source.protocol !== 'https:' || source.hostname !== 'uae-cms.emaar.com'
      || !source.pathname.startsWith('/uploads/')
      || !/\.(?:jpe?g|png|webp)$/i.test(source.pathname)) return null;
    const image = new URL('https://www.emaar.com/_next/image');
    image.searchParams.set('url', source.href);
    // The first-party Emaar website uses 1200px / q75 for project galleries.
    image.searchParams.set('w', '1200');
    image.searchParams.set('q', '75');
    return image.toString();
  } catch {
    return null;
  }
}
