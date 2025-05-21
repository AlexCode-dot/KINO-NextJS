import { getAllMovies } from '@/lib/db/movieDbService'

export default async function DebugPage() {
  const movies = await getAllMovies()

  return (
    <div>
      <h1>Filmer (Debug i väntan på klickbara filmer)</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <p>{movie.title}</p>
            <p>{movie._id}</p>
            <a href={`/movies/${movie._id}`}>Gå till detail page</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
