import Movie from '@/lib/db/models/Movie'
import { fetchMovieFromOmdb } from '@/lib/services/fetchOmdb'

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
