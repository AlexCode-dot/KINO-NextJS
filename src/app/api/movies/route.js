import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import Movie from '@/lib/db/models/Movie'
import { createMovieFromOmdbTitle } from '@/lib/db/movieDbService'

export async function GET() {
  await connectDB()
  const movies = await Movie.find().select('title year genre posterUrl runtime').lean()
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

    const existing = await Movie.findOne({ title: new RegExp(`^${title}$`, 'i') })
    if (existing) {
      return NextResponse.json({ error: 'Filmen finns redan.' }, { status: 400 })
    }

    const newMovie = await createMovieFromOmdbTitle(title)
    return NextResponse.json(newMovie, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
