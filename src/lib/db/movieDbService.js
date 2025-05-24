import Movie from '@/lib/db/models/Movie'
import Screening from '@/lib/db/models/Screening'
import { fetchMovieFromOmdb } from '@/lib/services/fetchOmdb'

export async function getAllMovies() {
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
  await Screening.deleteMany({ movie: id })
  return deletedMovie
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
