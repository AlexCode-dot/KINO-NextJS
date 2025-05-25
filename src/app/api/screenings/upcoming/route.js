import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getUpcomingScreenings } from '@/lib/db/screeningDbService'

export async function GET() {
  await connectDB()
  const screenings = await getUpcomingScreenings()
  return NextResponse.json(screenings)
}
