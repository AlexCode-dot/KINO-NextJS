export default function BookingMovieInfo() {
  const mockData = {
    Title: 'Teenage Mutant Ninja Turtles',
    Year: '1990',
    Rated: 'PG',
    Released: '30 Mar 1990',
    Runtime: '93 min',
    Genre: 'Action, Adventure, Comedy',
    Director: 'Steve Barron',
    Writer: 'Kevin Eastman, Peter Laird, Bobby Herbeck',
    Actors: 'Judith Hoag, Elias Koteas, Josh Pais',
    Plot: 'Four teenage mutant ninja turtles emerge from the shadows to protect New York City from a gang of criminal ninjas.',
    Language: 'English, French',
    Country: 'Hong Kong, United States',
    Awards: '3 wins & 3 nominations total',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzg3NTQ4NDk5NV5BMl5BanBnXkFtZTgwNzMzNDg4NjE@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '6.8/10' },
      { Source: 'Rotten Tomatoes', Value: '43%' },
      { Source: 'Metacritic', Value: '51/100' },
    ],
    imdbID: 'tt0100758',
  }

  return (
    <div className="booking__movieInfoWrapper">
      <div className="movieInfoWrapper__posterWrapper">
        <img src={mockData.Poster}></img>
      </div>
      <div className="movieInfoWrapper__movieInfo">
        <a>
          <strong>Titel:</strong> {mockData.Title}
        </a>
        <a>
          <strong>Genre:</strong> {mockData.Genre}
        </a>
        <a>
          <strong>Längd:</strong> {mockData.Runtime}
        </a>
        <a>
          <strong>IMDB betyg:</strong> {mockData.Ratings[0].Value}
        </a>
        <p>
          <strong>Handling:</strong> {mockData.Plot}
        </p>
      </div>
    </div>
  )
}
