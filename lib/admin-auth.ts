import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "ldv_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "insecure-dev-secret";
}

export function createSessionToken() {
  return createHmac("sha256", getSecret()).update("admin-session").digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  return safeEqual(token, createSessionToken());
}

export function checkPasscode(passcode: string) {
  const expected = process.env.ADMIN_PASSCODE ?? "";
  if (!expected) return false;
  return safeEqual(passcode, expected);
}
