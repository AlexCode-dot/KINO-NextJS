import { NextResponse } from 'next/server'
import { updateBookingSeats, deleteBookingById } from '@/lib/db/bookingDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function PATCH(req, context) {
  if (requireAdminAccess()) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }
  try {
    const { id } = await context.params
    const { seats } = await req.json()
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
    return NextResponse.json({ message: 'Booking deleted' })
  } catch (err) {
    console.error('❌ DELETE /api/bookings/:id failed:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
