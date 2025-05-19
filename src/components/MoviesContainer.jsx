'use client'

import { useState } from 'react'
import SearchField from './SearchField'

export const mockData = [
  {
    Title: 'Batman Begins',
    Year: '2005',
    imdbID: 'tt0372784',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix Revolution',
    Year: '1999',
    imdbID: 'tt0133093',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'Breaking Bad',
    Year: '2008–2013',
    imdbID: 'tt0903747',
    Type: 'series',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
  },
  {
    Title: 'The Godfather',
    Year: '1972',
    imdbID: 'tt0068646',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Terminator 2: Judgment Day',
    Year: '1991',
    imdbID: 'tt0103064',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNGMyMGNkMDUtMjc2Ni00NWFlLTgyODEtZTY2MzBiZTg0OWZiXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Titanic',
    Year: '1997',
    imdbID: 'tt0120338',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Blade Runner',
    Year: '1982',
    imdbID: 'tt0083658',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Saving Private Ryan',
    Year: '1998',
    imdbID: 'tt0120815',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZGZhZGQ1ZWUtZTZjYS00MDJhLWFkYjctN2ZlYjE5NWYwZDM2XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Watchmen',
    Year: '2009',
    imdbID: 'tt0409459',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYmJiNTUwYWUtZDllNi00ODdjLWFmNTEtOTVlNmYxYTZhNzYzXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Toy Story',
    Year: '1995',
    imdbID: 'tt0114709',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZTA3OWVjOWItNjE1NS00NzZiLWE1MjgtZDZhMWI1ZTlkNzYwXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Joker',
    Year: '2019',
    imdbID: 'tt76456',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzY3OWQ5NDktNWQ2OC00ZjdlLThkMmItMDhhNDk3NTFiZGU4XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Batman Begins',
    Year: '2005',
    imdbID: 'tt03784',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt137666',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix Revolution',
    Year: '1999',
    imdbID: 'tt013093',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'Breaking Bad',
    Year: '2008–2013',
    imdbID: 'tt090377',
    Type: 'series',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
  },
  {
    Title: 'The Godfather',
    Year: '1972',
    imdbID: 'tt006866',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Terminator 2: Judgment Day',
    Year: '1991',
    imdbID: 'tt010306',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNGMyMGNkMDUtMjc2Ni00NWFlLTgyODEtZTY2MzBiZTg0OWZiXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Titanic',
    Year: '1997',
    imdbID: 'tt01203',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Blade Runner',
    Year: '1982',
    imdbID: 'tt00836',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Saving Private Ryan',
    Year: '1998',
    imdbID: 'tt01208',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZGZhZGQ1ZWUtZTZjYS00MDJhLWFkYjctN2ZlYjE5NWYwZDM2XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Watchmen',
    Year: '2009',
    imdbID: 'tt04094',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYmJiNTUwYWUtZDllNi00ODdjLWFmNTEtOTVlNmYxYTZhNzYzXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Toy Story',
    Year: '1995',
    imdbID: 'tt01147',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZTA3OWVjOWItNjE1NS00NzZiLWE1MjgtZDZhMWI1ZTlkNzYwXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Joker',
    Year: '2019',
    imdbID: 'tt72864',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzY3OWQ5NDktNWQ2OC00ZjdlLThkMmItMDhhNDk3NTFiZGU4XkEyXkFqcGc@._V1_SX300.jpg',
  },
]

export default function MoviesContainer() {
  const [visibleCount, setVisibleCount] = useState(8)

  const loadMoreMovies = () => {
    setVisibleCount((prevCount) => prevCount + 8)
  }

  const visibleMovies = mockData.slice(0, visibleCount)

  return (
    <>
      <SearchField />
      <div>
        <ul className="moviecard__list">
          {visibleMovies.map((movie) => (
            <li key={movie.imdbID}>
              <a href="#">
                <div className="moviecard__container">
                  <div>
                    {movie.Poster && (
                      <img src={movie.Poster} alt={`${movie.Title} poster`} className="moviecard__poster" />
                    )}
                  </div>
                  <p>{movie.Title}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {visibleCount < mockData.length && (
          <div className="button-div">
            <button onClick={loadMoreMovies} className="load-more-button">
              Ladda fler filmer...
            </button>
          </div>
        )}
      </div>
    </>
  )
}
