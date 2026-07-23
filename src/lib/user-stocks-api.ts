import { apiFetch } from "@/lib/api";
import { clearAuth, getToken } from "@/lib/auth";

export const PAGE_LIMIT = 40;

export type UserStock = {
  symbol: string;
  name: string;
  url: string;
  type?: "stock" | "index";
};

export type CatalogStock = {
  _id: string;
  symbol: string;
  name: string;
  url: string;
  type: "stock" | "index";
  isActive?: boolean;
};

export type PaginatedStocks<T> = {
  success: boolean;
  stocks: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  userId?: string;
};

async function authed<T>(path: string, options: RequestInit = {}) {
  const token = getToken();
  if (!token) throw new Error("Not logged in");
  try {
    return await apiFetch<T>(path, { ...options, token });
  } catch (err) {
    if ((err as { status?: number }).status === 401) clearAuth();
    throw err;
  }
}

export function fetchCatalog(params?: {
  q?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.type) qs.set("type", params.type);
  qs.set("page", String(params?.page ?? 1));
  qs.set("limit", String(params?.limit ?? PAGE_LIMIT));
  return authed<PaginatedStocks<CatalogStock>>(`/api/user/catalog?${qs}`);
}

export function fetchMyStocks(params?: { page?: number; limit?: number }) {
  const qs = new URLSearchParams();
  qs.set("page", String(params?.page ?? 1));
  // Sidebar needs full watchlist — default higher; list UIs pass 40
  qs.set("limit", String(params?.limit ?? 200));
  return authed<PaginatedStocks<UserStock>>(`/api/user/stocks?${qs}`);
}

export function saveMyStocks(stocks: UserStock[]) {
  return authed<{ success: boolean; stocks: UserStock[]; msg: string }>("/api/user/stocks", {
    method: "POST",
    body: JSON.stringify({ stocks }),
  });
}
