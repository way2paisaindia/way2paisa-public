import assert from 'node:assert/strict';
import {officialEmaarImageFallback} from '../app/lib/official-emaar-image-fallback.mjs';

const original='https://uae-cms.emaar.com/uploads/427131_hero_slide_0_3f9e04f173.jpg';
const fallback=officialEmaarImageFallback(original);
const proxied=new URL(fallback);
assert.equal(proxied.origin, 'https://www.emaar.com');
assert.equal(proxied.pathname, '/_next/image');
assert.equal(proxied.searchParams.get('url'), original);
assert.equal(proxied.searchParams.get('w'), '1200');
assert.equal(proxied.searchParams.get('q'), '75');
for(const invalid of [
  null, '', 'not-a-url', 'http://uae-cms.emaar.com/uploads/photo.jpg',
  'https://bad-emaar.com/uploads/image.jpg',
  'https://uae-cms.emaar.com/redirect?to=https://example.com',
  'https://uae-cms.emaar.com/uploads/document.pdf',
  'https://uae-cms.emaar.com.evil.test/uploads/photo.jpg',
  'https://www.emaar.com/en/properties/albero'
]) assert.equal(officialEmaarImageFallback(invalid), null);
assert.match(officialEmaarImageFallback('https://uae-cms.emaar.com/uploads/hero.webp'), /^https:\/\/www\.emaar\.com\/_next\/image\?/);
console.log('Emaar first-party image fallback: passed source, format, and redirect guards');
