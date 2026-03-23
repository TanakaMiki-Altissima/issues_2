const MOCKAPI_BASE = process.env.NEXT_PUBLIC_MOCKAPI_URL || '';
const VPC_RESOURCE = 'quotes';

function getMockApiUrl(id: string): string {
  if (!MOCKAPI_BASE) {
    throw new Error('NEXT_PUBLIC_MOCKAPI_URL が設定されていません');
  }
  return `${MOCKAPI_BASE.replace(/\/$/, '')}/${VPC_RESOURCE}/${id}`;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.text();
  const url = getMockApiUrl(id);
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: body || undefined,
    });
    const text = await res.text();
    if (!res.ok) {
      return new Response(text || res.statusText, { status: res.status });
    }
    return new Response(text, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('VPC PATCH proxy error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
