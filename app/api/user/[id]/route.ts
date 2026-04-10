const MOCKAPI_BASE = process.env.NEXT_PUBLIC_MOCKAPI_URL || '';
const USER_RESOURCE = 'User';

function getMockApiItemUrl(id: string): string {
  if (!MOCKAPI_BASE) {
    throw new Error('NEXT_PUBLIC_MOCKAPI_URL が設定されていません');
  }
  return `${MOCKAPI_BASE.replace(/\/$/, '')}/${USER_RESOURCE}/${id}`;
}

async function forward(
  method: 'PATCH' | 'PUT' | 'DELETE',
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const url = getMockApiItemUrl(id);
  const body = method === 'DELETE' ? '' : await request.text();
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body || undefined,
    });
    const text = await res.text();
    if (!res.ok) return new Response(text || res.statusText, { status: res.status });
    // mockapi は DELETE で空を返すことがある
    return new Response(text, { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error(`USER ${method} proxy error:`, err);
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  return forward('PATCH', request, context);
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return forward('PUT', request, context);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  return forward('DELETE', request, context);
}

