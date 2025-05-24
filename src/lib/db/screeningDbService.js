import Screening from '@/lib/db/models/Screening'
import Movie from '@/lib/db/models/Movie'

export async function getAllScreeningsWithMovieInfo() {
  await markExpiredScreenings()

  return await Screening.find().populate('movie', 'title runtime').lean()
}

export async function getUpcomingScreenings() {
  return await Screening.find().populate('movie', 'title date room').lean()
}

export async function deleteScreeningById(id) {
  return await Screening.findByIdAndDelete(id)
}

export async function markExpiredScreenings() {
  await Screening.updateMany({ endTime: { $lt: new Date() }, status: 'active' }, { $set: { status: 'expired' } })
}

export async function createScreening({ movieId, date, room }) {
  const movie = await Movie.findById(movieId)
  if (!movie) throw new Error('Filmen kunde inte hittas.')

  const runtimeMinutes = parseInt(movie.runtime)
  if (isNaN(runtimeMinutes)) throw new Error('Ogiltig filmlängd.')

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
    const error = new Error('Den valda tiden överlappar med en befintlig visning i denna salong.')
    error.status = 400
    throw error
  }

  const screening = new Screening({
    movie: movieId,
    date: startDate,
    endTime: endDate,
    room,
  })

  await screening.save()
  return screening
}
