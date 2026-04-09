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

/** PATCH /User/:id のボディ（id は URL で指定） */
export type UserUpdateInput = Partial<Omit<User, 'id'>>;

/** POST /User — mockapi はリソースに応じて id を必須にすることがある */
export type UserCreateInput = Omit<User, 'id'> & { id: string };

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

function getUserCollectionUrl(): string {
  if (typeof window !== 'undefined') {
    return '/api/user';
  }
  return getUserEndpoint();
}

function getUserItemUrl(id: string): string {
  if (typeof window !== 'undefined') {
    return `/api/user/${id}`;
  }
  return `${getUserEndpoint()}/${id}`;
}

export async function fetchUserList(): Promise<User[]> {
  const url = getUserCollectionUrl();
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ユーザーの取得に失敗しました: ${res.status} ${text}`);
  }
  return res.json();
}

export async function deleteUser(id: string): Promise<void> {
  const url = getUserItemUrl(id);
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`削除に失敗しました: ${res.status} ${text}`);
  }
}

export async function createUser(input: UserCreateInput): Promise<User> {
  const url = getUserCollectionUrl();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`登録に失敗しました: ${res.status} ${text}`);
  }
  return res.json();
}

export async function updateUser(id: string, input: UserUpdateInput): Promise<User> {
  const url = getUserItemUrl(id);
  // mockapi.io はプロジェクト設定/挙動により PATCH が反映されないことがあるため、
  // PATCH が失敗した場合は PUT を試す（どちらも同じ input を送る）。
  const body = JSON.stringify(input);
  const headers = { 'Content-Type': 'application/json' } as const;

  const patchRes = await fetch(url, { method: 'PATCH', headers, body });
  if (patchRes.ok) return patchRes.json();

  const putRes = await fetch(url, { method: 'PUT', headers, body });
  if (!putRes.ok) {
    const text = await putRes.text();
    throw new Error(`更新に失敗しました: ${putRes.status} ${text}`);
  }
  return putRes.json();
}
export const getJSTDateString = (): string => {
  return new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });
};
