import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { comparePassword } from '@/lib/crypto'
import { createSession } from '@/lib/session'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email or password format' },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    // 🔍 LOGS TEMPORAIRES
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, name: true },
    })

    console.log('1. user found:', !!user)
    console.log('2. hash in db:', user?.password)
    console.log('3. password received:', password)
    console.log('4. valid:', user && await comparePassword(password, user.password))

    const valid = user && await comparePassword(password, user.password)

    if (!valid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    const response = NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    )

    await createSession({ id: user.id, name: user.name, email: user.email }, response)

    return response

  } catch (err) {
    console.error('[login]', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}