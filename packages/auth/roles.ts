export type UserRole = "OWNER" | "CLIENT";

export interface UserSessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  clientId?: string | null;
}

export function isOwner(session: UserSessionPayload | null | undefined): boolean {
  return session?.role === "OWNER";
}

export function isClient(session: UserSessionPayload | null | undefined): boolean {
  return session?.role === "CLIENT";
}

export function canAccessClientData(
  session: UserSessionPayload | null | undefined,
  targetClientId: string
): boolean {
  if (!session) return false;
  if (isOwner(session)) return true;
  return session.clientId === targetClientId;
}
