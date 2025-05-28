import Screening from '@/lib/db/models/Screening'
import Movie from '@/lib/db/models/Movie'
import _Room from '@/lib/db/models/Room'

export async function getAllScreeningsWithMovieInfo() {
  await markExpiredScreenings()

  return await Screening.find().populate('movie', 'title runtime').populate('room', 'name').lean()
}

export async function getUpcomingScreenings() {
  const today = new Date()
  const fiveDaysFromNow = new Date(today)
  fiveDaysFromNow.setDate(today.getDate() + 5)

  return await Screening.find({
    date: { $gte: today, $lte: fiveDaysFromNow },
  })
    .populate('movie', 'title')
    .populate('room', 'name')
    .sort({ date: 1 })
    .limit(10)
    .lean()
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

  return await Screening.findById(screening._id).populate('room', 'name').populate('movie', 'title runtime')
}
