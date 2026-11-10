// One-shot Emaar image delivery check. Does not use API keys or modify any data.
// Run from the SAME environment hosting the Way2Paisa Next.js server.
import { officialEmaarImageFallback } from '../app/lib/official-emaar-image-fallback.mjs';

const samples = [
  { project: 'Golf Trails', original: 'https://uae-cms.emaar.com/uploads/HERO_1620_X832_2_d200e4e4ec.jpg' },
  { project: 'Creek Bay', original: 'https://uae-cms.emaar.com/uploads/427131_hero_slide_0_3f9e04f173.jpg' },
  { project: 'Silva', original: 'https://uae-cms.emaar.com/uploads/417761_hero_slide_0_3aa54fa3cb.jpg' },
];
function hasImageSignature(bytes) {
  const x = [...bytes];
  return (x.length >= 3 && x[0] === 255 && x[1] === 216 && x[2] === 255)
    || (x.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => x[i] === v))
    || (x.length >= 12
      && String.fromCharCode(...x.slice(0, 4)) === 'RIFF'
      && String.fromCharCode(...x.slice(8, 12)) === 'WEBP')
    || (x.length >= 12
      && String.fromCharCode(...x.slice(4, 8)) === 'ftyp'
      && ['avif', 'avis'].includes(String.fromCharCode(...x.slice(8, 12))));
}
async function probe(label, url) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
        Range: 'bytes=0-4095',
        'User-Agent': 'Mozilla/5.0 (compatible; Way2PaisaImageDiagnostics/1.0)',
      },
      redirect: 'follow',
      cache: 'no-store',
    });
    const contentType = response.headers.get('content-type') || 'unknown';
    const reader = response.body?.getReader();
    const bytes = reader ? (await reader.read()).value || new Uint8Array() : new Uint8Array();
    if (reader) await reader.cancel().catch(() => {});
    const imageBytes = hasImageSignature(bytes);
    const ok = response.ok && imageBytes;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: HTTP ${response.status}, ${contentType}, imageSignature=${imageBytes}`);
    return ok;
  } catch (error) {
    console.log(`FAIL ${label}: ${error?.cause?.code || error?.name || 'request-failed'} (${error?.message || ''})`);
    return false;
  }
}
const results = [];
for (const sample of samples) {
  results.push(await probe(`${sample.project} direct CMS`, sample.original));
  results.push(await probe(`${sample.project} Emaar first-party optimizer`, officialEmaarImageFallback(sample.original)));
}
console.log(`Succeeded ${results.filter(Boolean).length}/${results.length}; no project data or image files changed.`);
process.exitCode = results.some(Boolean) ? 0 : 1;
