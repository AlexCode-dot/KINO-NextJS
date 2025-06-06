import connectDB from '@/lib/db/connectDB'
import { NextResponse } from 'next/server'
import { getBookingById } from '@/lib/db/bookingDbService'
import { updateBookingSeats, deleteBookingById } from '@/lib/db/bookingDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function GET(req, { params }) {
  const { id } = await params
  await connectDB()
  const booking = await getBookingById(id)
  return NextResponse.json(booking)
}

export async function PATCH(req, context) {
  if (requireAdminAccess()) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }
  try {
    const { id } = await context.params
    const { seats } = await req.json()

    if (!Array.isArray(seats) || seats.length === 0) {
      return NextResponse.json({ error: 'Du måste skicka minst en plats.' }, { status: 400 })
    }

    const isValidSeat = (s) => typeof s.row === 'number' && typeof s.seat === 'number'
    if (!seats.every(isValidSeat)) {
      return NextResponse.json(
        { error: 'Ogiltiga platser – varje plats måste ha rad och platsnummer.' },
        { status: 400 }
      )
    }

    const updated = await updateBookingSeats(id, seats)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('❌ PATCH /api/bookings/:id failed:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, context) {
  if (requireAdminAccess()) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }

  try {
    const { id } = await context.params
    await deleteBookingById(id)
    return NextResponse.json({ message: 'Bokningen har tagits bort' })
  } catch (err) {
    console.error('❌ DELETE /api/bookings/:id failed:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
