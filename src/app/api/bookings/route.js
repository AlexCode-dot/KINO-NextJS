import connectDB from '@/lib/db/connectDB'
import { NextResponse } from 'next/server'
import { createBooking } from '@/lib/db/bookingDbService'
import { NextResponse } from 'next/server'
import { getAllBookings } from '@/lib/db/bookingDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function POST(request) {
  try {
    await connectDB()

    const data = await request.json()
    const savedBooking = await createBooking(data)

    return NextResponse.json(savedBooking, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'failed to create booking' }, { status: 500 })
  }
}

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
