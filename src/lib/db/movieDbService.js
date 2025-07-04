import Movie from '@/lib/db/models/Movie'
import Screening from '@/lib/db/models/Screening'
import { fetchMovieFromOmdb } from '@/lib/services/fetchOmdb'
import connectDB from './connectDB'
import { deleteBookingsByScreeningId } from '@/lib/db/bookingDbService'

export async function getAllMovies() {
  await connectDB()
  return await Movie.find().select('title year genre posterUrl runtime').lean()
}

export async function getTopRatedMovies() {
  return await Movie.find().select('title posterUrl imdbRating').sort({ imdbRating: -1 }).limit(4).lean()
}

export async function findMovieByTitle(title) {
  return await Movie.findOne({ title: new RegExp(`^${title}$`, 'i') })
}

export async function deleteMovieAndScreenings(id) {
  const deletedMovie = await Movie.findByIdAndDelete(id)

  const screenings = await Screening.find({ movie: id }).select('_id')

  for (const screening of screenings) {
    await deleteBookingsByScreeningId(screening._id)
  }

  await Screening.deleteMany({ movie: id })

  return deletedMovie
}

export async function findMovieById(id) {
  await connectDB()
  return await Movie.findById(id).lean()
}

export async function createMovieFromOmdbTitle(title) {
  if (!title) throw new Error('Title is required')

  const data = await fetchMovieFromOmdb(title)

  const movie = new Movie({
    title: data.Title,
    year: data.Year,
    genre: data.Genre,
    director: data.Director,
    plot: data.Plot,
    runtime: data.Runtime,
    imdbRating: data.imdbRating,
    posterUrl: data.Poster,
    source: 'omdb',
    createdBy: 'admin',
  })

  return await movie.save()
}

//MongoDB searches all titles that contains the query, no matter if upper or lower case
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function findMoviesByTitle(query) {
  await connectDB()
  const safeQuery = escapeRegex(query)
  return await Movie.find({
    title: { $regex: safeQuery, $options: 'i' },
  }).lean() //Lean improves performance, returns JS objects instead of mongoose documents.
}
