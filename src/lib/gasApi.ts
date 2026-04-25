import { useAuthStore } from '@/stores';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface GasSuccessResponse<T = Record<string, never>> {
  success: true;
  data?: T;
  message?: string;
  token?: string;
}

interface GasErrorResponse {
  success: false;
  message: string;
  status?: number;
}

type GasResponse<T = Record<string, never>> = GasSuccessResponse<T> | GasErrorResponse;

interface GasPostBodyBase {
  token?: string;
}

interface LoginPayload extends GasPostBodyBase {
  action: 'LOGIN';
  payload: { email: string; password: string };
}

interface CreatePayload extends GasPostBodyBase {
  action: 'CREATE';
  sheet: string;
  payload: { data: unknown[] };
}

interface UpdatePayload extends GasPostBodyBase {
  action: 'UPDATE';
  sheet: string;
  payload: { rowIndex: number; data: unknown[] };
}

interface DeletePayload extends GasPostBodyBase {
  action: 'DELETE';
  sheet: string;
  payload: { rowIndex: number };
}

type GasPostBody = LoginPayload | CreatePayload | UpdatePayload | DeletePayload;


export async function gasGet<T>(params: Record<string, string>): Promise<T[]> {
  const url = new URL(BASE_URL);

  const token = useAuthStore.getState().token;
  if (token) {
    url.searchParams.set('token', token);
  }

  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  const json: GasResponse<T[]> = await res.json();

  if (!json.success) {
    const errorRes = json as GasErrorResponse;
    if (errorRes.status === 401 || errorRes.message === "Unauthorized") {
      useAuthStore.getState().logout();
    }
    throw new Error(errorRes.message);
  }

  return json.data ?? [];
}

export async function gasPost<T = Record<string, never>>(body: GasPostBody): Promise<GasSuccessResponse<T>> {
  const token = useAuthStore.getState().token;
  const payloadWithToken = token ? { ...body, token } : body;

  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(payloadWithToken),
  });

  const json: GasResponse<T> = await res.json();

  if (!json.success) {
    const errorRes = json as GasErrorResponse;
    if (errorRes.status === 401 || errorRes.message === "Unauthorized") {
      useAuthStore.getState().logout();
    }
    throw new Error(errorRes.message);
  }

  return json;
}

export async function gasCreate(sheet: string, data: unknown[]) {
  return gasPost({ action: 'CREATE', sheet, payload: { data } });
}

export async function gasLogin(email: string, password: string) {
  const res = await gasPost({ action: 'LOGIN', payload: { email, password } });
  return { token: res.token! };
}

export async function gasUpdate(sheet: string, rowIndex: number, data: unknown[]) {
  return gasPost({ action: 'UPDATE', sheet, payload: { rowIndex, data } });
}

export async function gasDelete(sheet: string, rowIndex: number) {
  return gasPost({ action: 'DELETE', sheet, payload: { rowIndex } });
}
