import crypto from "crypto";
import { UserSessionPayload } from "./roles";

export const AUTH_COOKIE_NAME = "s2s_session_token";
const DEFAULT_SECRET = "script2scale_super_secret_auth_key_2026_jwt_signing";

export interface SessionTokenPayload extends UserSessionPayload {
  exp: number; // Expiration timestamp in seconds
  iat: number; // Issued at timestamp in seconds
}

/**
 * Encodes & signs a session payload using HMAC-SHA256
 */
export function createSessionToken(
  payload: UserSessionPayload,
  expiresInSeconds: number = 7 * 24 * 60 * 60, // 7 days default
  secret: string = process.env.AUTH_SECRET || DEFAULT_SECRET
): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;

  const fullPayload: SessionTokenPayload = {
    ...payload,
    iat,
    exp
  };

  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verifies & decodes an HMAC-SHA256 signed session token
 */
export function verifySessionToken(
  token: string,
  secret: string = process.env.AUTH_SECRET || DEFAULT_SECRET
): UserSessionPayload | null {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload = JSON.parse(payloadJson) as SessionTokenPayload;

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowSeconds) {
      return null; // Expired token
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      clientId: payload.clientId
    };
  } catch {
    return null;
  }
}
