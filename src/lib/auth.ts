const TOKEN_KEY = "mp_token";
const ACTIVATION_KEY = "mp_activationId";
const ROLE_KEY = "mp_role";
const NAME_KEY = "mp_name";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ROLE_KEY);
}

export function getUserName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(NAME_KEY);
}

export function setAuth(
  token: string,
  opts?: { activationId?: string; role?: string; name?: string },
) {
  localStorage.setItem(TOKEN_KEY, token);
  if (opts?.activationId) localStorage.setItem(ACTIVATION_KEY, opts.activationId);
  if (opts?.role) localStorage.setItem(ROLE_KEY, opts.role);
  if (opts?.name) localStorage.setItem(NAME_KEY, opts.name);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ACTIVATION_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
}

export function getActivationId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVATION_KEY);
}

export function isLoggedIn(): boolean {
  return Boolean(getToken());
}

export function isAdmin(): boolean {
  const role = getRole();
  return role === "admin" || role === "superadmin";
}

export function isSuperAdmin(): boolean {
  return getRole() === "superadmin";
}
