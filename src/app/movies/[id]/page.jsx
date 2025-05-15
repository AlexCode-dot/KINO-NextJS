//Server component that reads params.id, finds correct movie and renders MovieDetailCard.
import MovieDetailCard from '@/components/MovieDetailCard'
import { notFound } from 'next/navigation' //Next.js offered notFound message 404 in case of error

//Mocked data down below, change to fetch calls later on!
const mockData = [
  {
    Title: 'Inception',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    imdbID: 'tt1375666',
    Plot: 'plot-text',
    imdbRating: '8.8',
  },
  {
    Title: 'The Matrix Revolution',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    imdbID: 'tt0133093',
    Plot: 'plot-text',
    imdbRating: '8.8',
  },
  {
    Title: 'Breaking Bad',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
    imdbID: 'tt0903747',
    Plot: 'plot-text',
    imdbRating: '8.8',
  },
  {
    Title: 'The Godfather',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg',
    imdbID: 'tt0068646',
    Plot: 'plot-text',
    imdbRating: '8.8',
  },
]

export default function MovieDetailPage({ params }) {
  const movie = mockData.find((m) => m.imdbID === params.id)
  if (!movie) return notFound()

  const screenings = [
    { room: 'Stora salongen', date: '2025-05-14', times: ['12:00', '15:00', '18:00', '21:00'] },
    { room: 'Stora salongen', date: '2025-05-15', times: ['13:00', '16:00', '19:00', '22:00'] },
    { room: 'Stora salongen', date: '2025-05-16', times: ['13:00', '16:00', '19:00', '22:00'] },
    { room: 'Stora salongen', date: '2025-05-17', times: ['13:00', '16:00', '19:00', '22:00'] },
  ]

  return (
    <MovieDetailCard
      title={movie.Title}
      posterUrl={movie.Poster}
      rating={parseFloat(movie.imdbRating)}
      description={movie.Plot}
      screenings={screenings}
    />
  )
}
