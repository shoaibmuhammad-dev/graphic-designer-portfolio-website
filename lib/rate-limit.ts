/**
 * Minimal in-memory rate limiter (per server instance).
 * Good enough for a portfolio; for multi-instance production swap for Upstash Ratelimit.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string) {
  const now = Date.now()

  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.reset < now) hits.delete(k)
  }

  const entry = hits.get(key)
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS })
    return { ok: true, retryAfter: 0 }
  }
  entry.count += 1
  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) }
  }
  return { ok: true, retryAfter: 0 }
}
