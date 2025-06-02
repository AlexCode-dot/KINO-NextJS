export default function BookingMovieInfo({ movie, screening }) {
  if (!movie || typeof movie !== 'object') {
    return <div className="booking__movieInfoWrapper">Filminformation saknas</div>
  }
  const date = new Date(screening.date)
  const formatedDate = date.toLocaleString('sv-SE', {
    day: 'numeric',
    month: 'short',
  })
  const formatedTime = date.toLocaleString('sv-Se', {
    hour: '2-digit',
    minute: '2-digit',
  })
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
        <p>
          <strong>Tid för visning:</strong> {formatedDate} kl: {formatedTime}
        </p>
      </div>
    </div>
  )
}
