'use client'

import { useState, useEffect } from 'react'

// Mimicking OMDB API response
const mockData = [
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
]

export default function MovieCard() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  //Mock API-delay
  useEffect(() => {
    setTimeout(() => {
      setData(mockData)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <ul className="moviecard__list">
        {data.map((item, index) => (
          <li key={item.imdbID}>
            <div className="moviecard__container">
              <div>
                {item.Poster && <img src={item.Poster} alt={`${item.Title} poster`} className="moviecard__poster" />}
              </div>
              <p>{item.Title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
