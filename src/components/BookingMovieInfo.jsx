export default function BookingMovieInfo({ movie }) {
  if (!movie || typeof movie !== 'object') {
    return <div className="booking__movieInfoWrapper">Filminformation saknas</div>
  }
  return (
    <div className="booking__movieInfoWrapper">
      <div className="movieInfoWrapper__posterWrapper">
        <img src={movie.posterUrl}></img>
      </div>
      <div className="movieInfoWrapper__movieInfo">
        <a>
          <strong>Titel:</strong> {movie.title}
        </a>
        <a>
          <strong>Genre:</strong> {movie.genre}
        </a>
        <a>
          <strong>År:</strong> {movie.year}
        </a>
        <a>
          <strong>Längd:</strong> {movie.runtime}
        </a>
        <a>
          <strong>IMDB betyg:</strong> {movie.imdbRating}
        </a>
        <p>
          <strong>Handling:</strong> {movie.plot}
        </p>
      </div>
    </div>
  )
}
