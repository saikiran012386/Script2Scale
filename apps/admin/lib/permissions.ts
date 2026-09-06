import { UserSessionPayload, isOwner } from "@script2scale/auth";

export function assertOwnerPermission(session: UserSessionPayload | null | undefined): void {
  if (!session || !isOwner(session)) {
    throw new Error("Forbidden: Owner permission required for admin action.");
  }
}
