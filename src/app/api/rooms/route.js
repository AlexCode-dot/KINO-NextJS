import { NextResponse } from 'next/server'
import { getAllRooms, createRoom } from '@/lib/db/roomDbService'

export async function GET() {
  try {
    const rooms = await getAllRooms()
    return NextResponse.json(rooms)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { name, rows, wheelchairSeats } = body

    if (!name || !Array.isArray(rows)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const newRoom = await createRoom({ name, rows, wheelchairSeats })
    return NextResponse.json(newRoom, { status: 201 })
  } catch (err) {
    const status = err.message.includes('finns redan') ? 400 : 500
    return NextResponse.json({ error: err.message }, { status })
  }
}
