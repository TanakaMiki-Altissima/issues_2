const MOCKAPI_BASE = process.env.NEXT_PUBLIC_MOCKAPI_URL || '';
const USER_RESOURCE = 'User';

function getMockApiCollectionUrl(): string {
  if (!MOCKAPI_BASE) {
    throw new Error('NEXT_PUBLIC_MOCKAPI_URL が設定されていません');
  }
  return `${MOCKAPI_BASE.replace(/\/$/, '')}/${USER_RESOURCE}`;
}

export async function GET() {
  const url = getMockApiCollectionUrl();
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const text = await res.text();
    if (!res.ok) return new Response(text || res.statusText, { status: res.status });
    return new Response(text, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('USER GET proxy error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  const url = getMockApiCollectionUrl();
  const body = await request.text();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body || undefined,
    });
    const text = await res.text();
    if (!res.ok) return new Response(text || res.statusText, { status: res.status });
    return new Response(text, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('USER POST proxy error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

