import bcrypt from 'bcryptjs'
import { randomBytes, createHmac } from 'crypto'

const SALT_ROUNDS = 12 // ~300ms on a modern CPU — slow enough to deter brute force

// ── Password hashing ──────────────────────────────────────

/**
 * Hash a plain-text password before storing it in the DB.
 * Never store plain-text passwords.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Compare a plain-text password against a stored hash.
 * Uses bcrypt's timing-safe comparison internally.
 */
export async function comparePassword(
  password:     string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash)
}

// ── Secure token generation ───────────────────────────────

/**
 * Generate a cryptographically secure random token.
 * Used for password reset links, email verification, API keys, etc.
 *
 * @param bytes - length of randomness (default 32 → 64 hex chars)
 */
export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString('hex')
}

/**
 * Hash a raw token before storing it in the DB.
 * Store only the hash — compare incoming tokens the same way.
 * This way a DB leak doesn't expose valid reset links.
 */
export function hashToken(token: string): string {
  return createHmac('sha256', process.env.TOKEN_SECRET!)
    .update(token)
    .digest('hex')
}

// ── Timing-safe string comparison ────────────────────────

/**
 * Compare two strings without leaking timing information.
 * Use this when comparing tokens/secrets manually (e.g. webhook signatures).
 * Regular === comparisons short-circuit on the first mismatch,
 * which can be exploited to guess secrets byte by byte.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)

  // Buffers must be the same length for timingSafeEqual
  if (bufA.length !== bufB.length) return false

  return require('crypto').timingSafeEqual(bufA, bufB)
}