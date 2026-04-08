import { SignJWT, jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET)

// ── Create session (login) ────────────────────────────────
export async function createSession(user: { id: string; name: string; email: string }, response: NextResponse) {
  const token = await new SignJWT({ sub: user.id, name: user.name, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret())

  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // false en dev pour éviter les problèmes
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
}

// ── Get session (protected pages) ────────────────────────
export async function getSession(): Promise<{ id: string; name: string; email: string } | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return null

    const { payload } = await jwtVerify(token, secret())

    if (!payload.sub || !payload.name || !payload.email) return null

    return {
      id: payload.sub as string,
      name: payload.name as string,
      email: payload.email as string
    }
  } catch (err) {
    console.error("🔥 getSession Error:", err)
    return null
  }
}