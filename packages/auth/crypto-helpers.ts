import crypto from "crypto";

export interface HashedPassword {
  hash: string;
  salt: string;
}

/**
 * Hashes a plain password using PBKDF2 with a random 16-byte salt
 */
export function hashPassword(password: string): HashedPassword {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { hash, salt };
}

/**
 * Verifies a plain password against a stored PBKDF2 hash & salt
 */
export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  try {
    const hash = crypto.pbkdf2Sync(password, storedSalt, 100000, 64, "sha512").toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(storedHash, "hex"));
  } catch {
    return false;
  }
}

/**
 * Generates a random 32-byte hex token for invitations or password resets
 */
export function generateRandomToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
