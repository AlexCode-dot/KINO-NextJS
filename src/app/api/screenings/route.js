import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { createScreening, getAllScreeningsWithMovieInfo } from '@/lib/db/screeningDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function GET() {
  await connectDB()
  const screenings = await getAllScreeningsWithMovieInfo()
  return NextResponse.json(screenings)
}

export async function POST(req) {
  const isAdmin = await requireAdminAccess()

  if (!isAdmin) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }

  try {
    const formData = await req.formData()
    const movieId = formData.get('movieId')
    const date = formData.get('date')
    const room = formData.get('room')

    if (!movieId || !date || !room) {
      return NextResponse.json({ error: 'Du måste fylla i alla fält' }, { status: 400 })
    }

    const screening = await createScreening({ movieId, date, room })
    return NextResponse.json(screening, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.status || 500 })
  }
}
