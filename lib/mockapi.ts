
const BASE_URL = process.env.NEXT_PUBLIC_MOCKAPI_URL || '';
const VPC_RESOURCE = 'vpcs';

export interface VpcItem {
  id: string;
  stackName: string;
  status: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VpcCreateInput {
  stackName: string;
  status: string;
  description: string;
}

function getVpcEndpoint(): string {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_MOCKAPI_URL が設定されていません。.env.local に設定してください。');
  }
  return `${BASE_URL.replace(/\/$/, '')}/${VPC_RESOURCE}`;
}

export async function createVpc(input: VpcCreateInput): Promise<VpcItem> {
  const url = getVpcEndpoint();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      stackName: input.stackName,
      status: input.status,
      description: input.description ?? '',
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`登録に失敗しました: ${res.status} ${text}`);
  }
  return res.json();
}

export async function fetchVpcList(): Promise<VpcItem[]> {
  const url = getVpcEndpoint();
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`一覧の取得に失敗しました: ${res.status} ${text}`);
  }
  return res.json();
}
