import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getAllMovies, createMovieFromOmdbTitle, findMovieByTitle, getTopRatedMovies } from '@/lib/db/movieDbService'

export async function GET(req) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const movies = type === 'top-rated' ? await getTopRatedMovies() : await getAllMovies()
  return NextResponse.json(movies)
}

export async function POST(req) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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
