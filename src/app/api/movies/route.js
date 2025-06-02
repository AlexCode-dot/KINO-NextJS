import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getAllMovies, createMovieFromOmdbTitle, findMovieByTitle, findMoviesByTitle } from '@/lib/db/movieDbService'

export async function GET(req) {
  await connectDB()

  //Backend search logic
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  try {
    if (query) {
      const result = await findMoviesByTitle(query)
      return NextResponse.json(result)
    }

    const movies = await getAllMovies()
    return NextResponse.json(movies)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
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
