const FALLBACK = { INR: 22.65, USD: 0.2723, EUR: 0.232, GBP: 0.201, CAD: 0.370, AUD: 0.407, SGD: 0.348 };

export async function GET() {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=AED', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('FX provider unavailable');
    const data = await res.json();
    const rates = { AED: 1, ...data.rates };
    return Response.json({ base: 'AED', rates, date: data.date, source: 'Frankfurter', live: true }, { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
  } catch {
    return Response.json({ base: 'AED', rates: { AED: 1, ...FALLBACK }, date: null, source: 'Fallback', live: false }, { headers: { 'Cache-Control': 'public, s-maxage=300' } });
  }
}
