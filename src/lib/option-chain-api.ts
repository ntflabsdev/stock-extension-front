import { apiFetch } from "@/lib/api";
import { clearAuth, getToken, setAuth } from "@/lib/auth";

export const PAGE_LIMIT = 40;

export type LoginResponse = {
  token: string;
  activationId?: string;
  role?: string;
  name?: string;
  email?: string;
  approvalStatus?: string;
};

export type OptionChainRow = {
  _id?: string;
  symbol: string;
  expiry: string;
  strikePrice: number;
  time?: string;
  callLTP?: number;
  callVWAP?: number;
  putLTP?: number;
  putVWAP?: number;
  callOI?: number;
  putOI?: number;
  callOIChg?: number;
  putOIChg?: number;
  peCeOI?: number;
  peCeOIChg?: number;
  scrapedAt?: string;
};

export type OptionChainResponse = {
  success: boolean;
  symbol: string;
  expiry: string | null;
  scrapedAt: string | null;
  count: number;
  rows: OptionChainRow[];
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  summary?: { callOI: number; putOI: number; pcr: number };
};

export type OptionChainMeta = {
  success: boolean;
  pairs: Array<{
    symbol: string;
    expiry: string;
    scrapedAt: string;
    count: number;
  }>;
};

export async function login(email: string, password: string) {
  const data = await apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAuth(data.token, {
    activationId: data.activationId,
    role: data.role,
    name: data.name,
  });
  return data;
}

export async function fetchOptionChain(
  symbol?: string,
  expiry?: string,
  page = 1,
  limit = PAGE_LIMIT,
) {
  const token = getToken();
  if (!token) throw new Error("Not logged in");

  const params = new URLSearchParams();
  if (symbol) params.set("symbol", symbol);
  if (expiry) params.set("expiry", expiry);
  params.set("page", String(page));
  params.set("limit", String(limit));

  try {
    return await apiFetch<OptionChainResponse>(`/api/user/optionchain?${params}`, { token });
  } catch (err) {
    if ((err as { status?: number }).status === 401) clearAuth();
    throw err;
  }
}

export async function fetchOptionChainMeta() {
  const token = getToken();
  if (!token) throw new Error("Not logged in");

  try {
    return await apiFetch<OptionChainMeta>("/api/user/optionchain/meta", { token });
  } catch (err) {
    if ((err as { status?: number }).status === 401) clearAuth();
    throw err;
  }
}
