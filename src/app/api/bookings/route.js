import connectDB from '@/lib/db/connectDB'
import { NextResponse } from 'next/server'
import { createBooking } from '@/lib/db/bookingDbService'

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
