import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json()
    console.log("🚀 ~ POST ~ req.json():", name, email, phone, password)

    // Basic presence check
    if (!name || !email || !phone || !password) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await db.user.findUnique({
      where: { email },
    })

    if (existing) {
      return Response.json(
        { error: 'Email already in use' },
        { status: 400 }
      )
    }

    // Hash password
    const HashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: { name, email, phone, password: HashedPassword },
      select: { id: true, email: true }, // never return passwordHash
    })

    return Response.json(
      { message: 'Account created!', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('[register]', error)
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}