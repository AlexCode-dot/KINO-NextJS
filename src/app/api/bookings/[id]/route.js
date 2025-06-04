import connectDB from '@/lib/db/connectDB'
import { NextResponse } from 'next/server'
import { getBookingById } from '@/lib/db/bookingDbService'

export async function GET(req, { params }) {
  const { id } = await params
  await connectDB()
  const booking = await getBookingById(id)
  return NextResponse.json(booking)
}
