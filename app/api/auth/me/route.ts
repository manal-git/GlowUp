import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'

export async function GET() {
    const session = await getSession()
    if (!session) return NextResponse.json(null)

    const user = await db.user.findUnique({
        where: { id: session.userId },
        select: { id: true, name: true, email: true },
    })

    return NextResponse.json(user)
}