import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getAllMovies, createMovieFromOmdbTitle, findMovieByTitle } from '@/lib/db/movieDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function GET() {
  await connectDB()
  const movies = await getAllMovies()
  return NextResponse.json(movies)
}

export async function POST(req) {
  if (requireAdminAccess()) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }

  try {
    const formData = await req.formData()
    const title = formData.get('title')

    if (!title) {
      return NextResponse.json({ error: 'Titel behövs!' }, { status: 400 })
    }

    await connectDB()

    const existing = await findMovieByTitle(title)
    if (existing) {
      return NextResponse.json({ error: 'Filmen finns redan.' }, { status: 400 })
    }

    const newMovie = await createMovieFromOmdbTitle(title)
    return NextResponse.json(newMovie, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
