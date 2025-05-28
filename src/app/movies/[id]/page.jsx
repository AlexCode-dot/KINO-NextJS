import mongoose from 'mongoose'
import MovieDetailCard from '@/components/MovieDetailCard'
import { findMovieById } from '@/lib/db/movieDbService'
import { getAllScreeningsWithMovieInfo } from '@/lib/db/screeningDbService'
import { notFound } from 'next/navigation'

export default async function MovieDetailPage({ params }) {
  const movieId = params.id

  //Control id ID is valid before searching in the database
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return notFound()
  }

  const movie = await findMovieById(movieId)

  //Fallback is next.js own 404
  if (!movie) {
    return notFound()
  }

  //filter screenings for only one specific movie and group them by date
  const allScreenings = await getAllScreeningsWithMovieInfo()
  const screenings = allScreenings
    .filter((s) => s.movie._id.toString() === movieId)
    .reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString('sv-SE')
      const time = new Date(curr.date).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
      const existing = acc.find((e) => e.date === date)
      if (existing) {
        existing.times.push(time)
      } else {
        acc.push({ room: curr.room.name, date, times: [time] })
      }
      return acc
    }, [])

  //Send data to MovieDetailCard-component
  return (
    <MovieDetailCard
      title={movie.title}
      posterUrl={movie.posterUrl}
      rating={parseFloat(movie.imdbRating) || 0}
      description={movie.plot || 'Ursäkta, Ingen filmbeskrivning finns tillgänglig just nu.'}
      screenings={screenings}
    />
  )
}
