// Non-destructive verification of Emaar project-image delivery.
// Usage: node scripts/check-emaar-image-delivery.mjs
// This checks actual HTTP image bytes; it never writes to a website, database,
// hosting account, or third-party origin.
import {officialEmaarImageFallback} from '../app/lib/official-emaar-image-fallback.mjs';

const site = process.env.WAY2PAISA_SITE_ORIGIN || 'https://www.way2paisa.in';
const examples = [
  {
    name: 'Golf Trails',
    page: '/projects/emaar-golf-trails',
    hero: 'https://uae-cms.emaar.com/uploads/HERO_1620_X832_2_d200e4e4ec.jpg'
  },
  {
    name: 'Emaar Valo',
    page: '/projects/emaar-valo-dubai-creek-harbour',
    hero: 'https://uae-cms.emaar.com/uploads/383232_hero_slide_0_3d3805c08b.jpg'
  },
  {
    name: 'Emaar Silva',
    page: '/projects/emaar-silva-dubai-creek-harbour',
    hero: 'https://uae-cms.emaar.com/uploads/417761_hero_slide_0_3aa54fa3cb.jpg'
  },
];

const imageSignature = bytes => {
  const b = bytes;
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpeg';
  if (b.length >= 8 && b.slice(0, 8).every((v, i) => v === [137,80,78,71,13,10,26,10][i])) return 'png';
  if (b.length >= 12 && String.fromCharCode(...b.slice(0,4)) === 'RIFF' && String.fromCharCode(...b.slice(8,12)) === 'WEBP') return 'webp';
  if (b.length >= 12 && String.fromCharCode(...b.slice(4,8)) === 'ftyp' && ['avif','avis'].includes(String.fromCharCode(...b.slice(8,12)))) return 'avif';
  return null;
};

async function check(url, expectImage, name) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { Accept: expectImage ? 'image/avif,image/webp,image/png,image/jpeg,image/*' : 'text/html' }
    });
    const reader = res.body?.getReader();
    let bytes = new Uint8Array();
    if (reader) {
      const item = await reader.read();
      bytes = item.value || bytes;
      await reader.cancel().catch(() => {});
    }
    const type = res.headers.get('content-type') || 'unknown';
    const signature = imageSignature(bytes);
    const ok = res.ok && (expectImage
      ? type.startsWith('image/') && Boolean(signature)
      : type.includes('text/html'));
    console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: HTTP ${res.status}, ${type}, signature=${signature || 'none'}`);
    return ok;
  } catch (error) {
    console.log(`UNVERIFIED ${name}: ${error?.name || 'network-error'} (${String(error?.message || '').slice(0, 120)})`);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

let pass = 0;
let total = 0;
for (const example of examples) {
  console.log(`\n${example.name}`);
  for (const [name, url, expectImage] of [
    ['Way2Paisa project page', new URL(example.page, site).toString(), false],
    ['Emaar CMS original', example.hero, true],
    ['Emaar first-party optimized', officialEmaarImageFallback(example.hero), true]
  ]) {
    total++;
    if (url && await check(url, expectImage, name)) pass++;
  }
}
console.log(`\nVerified requests: ${pass}/${total} passed.`);
if (pass !== total) process.exitCode = 1;
