import { NextResponse } from 'next/server'
import { getAllBookings } from '@/lib/db/bookingDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function GET() {
  if (requireAdminAccess()) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }

  try {
    const bookings = await getAllBookings()
    return NextResponse.json(bookings)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
