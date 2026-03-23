const BASE_URL = process.env.NEXT_PUBLIC_MOCKAPI_URL || '';
const VPC_RESOURCE = 'quotes';

const USER_RESOURCE = 'User';

export interface User {
  id: string;
  last_name?: string;
  first_name?: string;
  last_name_okurikana?: string;
  first_name_okurikana?: string;
  position?: string;
  department?: string;
  affiliation?: string;
  joining_date?: string;
  sex?: string;
  password?: string;
  email?: string;
  telephone_number?: string;
}

export interface VpcItem {
  id: string;
  stackName: string;
  status: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface VpcCreateInput {
  stackName: string;
  status: string;
  description: string;
}

export interface VpcUpdateInput {
  stackName?: string;
  status?: string;
  description?: string;
}

export const VPC_STATUS_OPTIONS = [
  { value: '', label: '選択してください' },
  { value: 'CREATE_COMPLETE', label: 'CREATE_COMPLETE' },
  { value: 'CREATE_FAILED', label: 'CREATE_FAILED' },
];

function getVpcPatchUrl(id: string): string {
  if (typeof window !== 'undefined') {
    return `/api/vpc/${id}`;
  }
  return `${getVpcEndpoint()}/${id}`;
}

export async function updateVpc(id: string, input: VpcUpdateInput): Promise<VpcItem> {
  const url = getVpcPatchUrl(id);
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...input,
      updatedAt: getJSTDateString(),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`更新に失敗しました: ${res.status} ${text}`);
  }
  return res.json();
}

export async function deleteVpc(id: string): Promise<VpcItem> {
  const url = getVpcPatchUrl(id);
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deletedAt: getJSTDateString(),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`削除に失敗しました: ${res.status} ${text}`);
  }
  return res.json();
}

function getVpcEndpoint(): string {
  if (!BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_MOCKAPI_URL が設定されていません。.env.local に設定してください。',
    );
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
      createdAt: getJSTDateString(),
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

function getUserEndpoint(): string {
  if (!BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_MOCKAPI_URL が設定されていません。.env.local に設定してください。',
    );
  }
  return `${BASE_URL.replace(/\/$/, '')}/${USER_RESOURCE}`;
}

export async function fetchUserList(): Promise<User[]> {
  const url = getUserEndpoint();
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ユーザーの取得に失敗しました: ${res.status} ${text}`);
  }
  return res.json();
}

export async function deleteUser(id: string): Promise<void> {
  const url = `${getUserEndpoint()}/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`削除に失敗しました: ${res.status} ${text}`);
  }
}

export const getJSTDateString = (): string => {
  return new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });
};
