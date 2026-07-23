import { apiFetch } from "@/lib/api";
import { clearAuth, getToken } from "@/lib/auth";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superadmin";
  approvalStatus: "pending" | "approved" | "rejected";
  activationId?: string;
  isActive?: boolean;
  deviceId?: string | null;
  createdAt?: string;
};

export type CatalogStock = {
  _id: string;
  symbol: string;
  name: string;
  url: string;
  type: "stock" | "index";
  expiry?: string;
  notes?: string;
  isActive: boolean;
};

export type AdminStats = {
  totalUsers: number;
  pendingUsers: number;
  approvedUsers: number;
  rejectedUsers: number;
  totalStocks: number;
  activeStocks: number;
  optionChainCount: number;
};

async function adminFetch<T>(path: string, options: RequestInit = {}) {
  const token = getToken();
  if (!token) throw new Error("Not logged in");
  try {
    return await apiFetch<T>(path, { ...options, token });
  } catch (err) {
    if ((err as { status?: number }).status === 401) clearAuth();
    throw err;
  }
}

export function fetchAdminStats() {
  return adminFetch<{ success: boolean; stats: AdminStats }>("/api/admin/stats");
}

export function fetchAdminUsers(params?: { status?: string; q?: string }) {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.q) qs.set("q", params.q);
  const q = qs.toString();
  return adminFetch<{ success: boolean; users: AdminUser[] }>(
    `/api/admin/users${q ? `?${q}` : ""}`,
  );
}

export function createAdminUser(body: Record<string, unknown>) {
  return adminFetch<{ success: boolean; user: AdminUser }>("/api/admin/users", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateAdminUser(id: string, body: Record<string, unknown>) {
  return adminFetch<{ success: boolean; user: AdminUser }>(`/api/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function approveUser(id: string) {
  return adminFetch<{ success: boolean; user: AdminUser }>(`/api/admin/users/${id}/approve`, {
    method: "POST",
  });
}

export function rejectUser(id: string) {
  return adminFetch<{ success: boolean; user: AdminUser }>(`/api/admin/users/${id}/reject`, {
    method: "POST",
  });
}

export function resetUserDevice(id: string) {
  return adminFetch<{ success: boolean; user: AdminUser }>(
    `/api/admin/users/${id}/reset-device`,
    { method: "POST" },
  );
}

export function deleteAdminUser(id: string) {
  return adminFetch<{ success: boolean; msg: string }>(`/api/admin/users/${id}`, {
    method: "DELETE",
  });
}

export function assignUserStocks(
  id: string,
  stocks: Array<{ symbol: string; name: string; url: string; type?: string }>,
) {
  return adminFetch<{ success: boolean; stocks: unknown[] }>(`/api/admin/users/${id}/stocks`, {
    method: "PUT",
    body: JSON.stringify({ stocks }),
  });
}

export function fetchUserDetail(id: string) {
  return adminFetch<{ success: boolean; user: AdminUser; stocks: CatalogStock[] }>(
    `/api/admin/users/${id}`,
  );
}

export function fetchCatalogStocks(params?: { q?: string; type?: string }) {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.type) qs.set("type", params.type);
  const q = qs.toString();
  return adminFetch<{ success: boolean; stocks: CatalogStock[] }>(
    `/api/admin/stocks${q ? `?${q}` : ""}`,
  );
}

export function createCatalogStock(body: Record<string, unknown>) {
  return adminFetch<{ success: boolean; stock: CatalogStock }>("/api/admin/stocks", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateCatalogStock(id: string, body: Record<string, unknown>) {
  return adminFetch<{ success: boolean; stock: CatalogStock }>(`/api/admin/stocks/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteCatalogStock(id: string) {
  return adminFetch<{ success: boolean; msg: string }>(`/api/admin/stocks/${id}`, {
    method: "DELETE",
  });
}
