import mongoose from 'mongoose'
import MovieDetailCard from '@/components/MovieDetailCard'
import { findMovieById } from '@/lib/db/movieDbService'
import { getActiveScreeningsWithMovieInfo } from '@/lib/db/screeningDbService'
import { notFound } from 'next/navigation'
import { translatePlot } from '@/lib/services/translateApiService'

export default async function MovieDetailPage({ params }) {
  const { id: movieId } = await params

  //Control id ID is valid before searching in the database
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return notFound()
  }

  const movie = await findMovieById(movieId)

  //Fallback is next.js own 404
  if (!movie) {
    return notFound()
  }

  let translatedPlot = movie.plot
    ? await translatePlot(movie.plot).catch(() => 'Översättning misslyckades.')
    : 'Ursäkta, ingen filmbeskrivning finns tillgänglig just nu.'

  //filter screenings for only one specific movie and group them by date
  const allScreenings = await getActiveScreeningsWithMovieInfo()
  const screenings = allScreenings
    .filter((s) => s.movie._id.toString() === movieId)
    .reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString('sv-SE')
      const time = new Date(curr.date).toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
      })

      const existing = acc.find((e) => e.date === date && e.room === curr.room.name)

      if (existing) {
        existing.times.push({ time, id: curr._id.toString() })
      } else {
        acc.push({
          date,
          room: curr.room.name,
          times: [{ time, id: curr._id.toString() }],
        })
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
      translatedDescription={translatedPlot}
      screenings={screenings}
    />
  )
}
