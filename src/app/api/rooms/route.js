import { NextResponse } from 'next/server'
import { getAllRooms, createRoom } from '@/lib/db/roomDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function GET() {
  try {
    const rooms = await getAllRooms()
    return NextResponse.json(rooms)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  const isAdmin = await requireAdminAccess()

  if (!isAdmin) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
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
