import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const session = await getSession()

    if (!session || !session.id) {
      return NextResponse.json(
        { error: 'Non autorisé. Veuillez vous connecter.' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { prestationId, date } = body

    if (!prestationId || !date) {
      return NextResponse.json(
        { error: 'La prestation et la date sont requises.' },
        { status: 400 }
      )
    }

    const reservation = await db.reservation.create({
      data: {
        date: new Date(date),
        userId: session.id,
        prestationId: prestationId,
      },
    })

    return NextResponse.json(
      { message: 'Réservation confirmée avec succès.', reservation },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Erreur lors de la réservation:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la réservation.' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        prestation: true,
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json(reservations)
  } catch (error: any) {
    console.error('Erreur lors de la récupération des réservations:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des réservations.' },
      { status: 500 }
    )
  }
}
