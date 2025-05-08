import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import Screening from '@/lib/db/models/Screening'
import Movie from '@/lib/db/models/Movie'

export async function GET() {
  await connectDB()
  const screenings = await Screening.find().populate('movie', 'title runtime').lean()

  return NextResponse.json(screenings)
}

export async function POST(req) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const formData = await req.formData()
    const movieId = formData.get('movieId')
    const date = formData.get('date')
    const room = formData.get('room')

    if (!movieId || !date || !room) {
      return NextResponse.json({ error: 'Du måste fylla i alla fält' }, { status: 400 })
    }

    await connectDB()

    const movie = await Movie.findById(movieId)
    if (!movie) {
      return NextResponse.json({ error: 'Filmen kunde inte hittas.' }, { status: 404 })
    }

    const runtimeMinutes = parseInt(movie.runtime)
    if (isNaN(runtimeMinutes)) {
      return NextResponse.json({ error: 'Ogiltig filmlängd.' }, { status: 400 })
    }

    const startDate = new Date(date)
    const endDate = new Date(startDate.getTime() + runtimeMinutes * 60000)

    const conflict = await Screening.findOne({
      room,
      $or: [
        {
          date: { $lt: endDate },
          endTime: { $gt: startDate },
        },
      ],
    })

    if (conflict) {
      return NextResponse.json(
        { error: 'Den valda tiden överlappar med en befintlig visning i denna salong.' },
        { status: 400 }
      )
    }

    const screening = new Screening({
      movie: movieId,
      date: startDate,
      endTime: endDate,
      room,
    })

    await screening.save()

    return NextResponse.json(screening, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
