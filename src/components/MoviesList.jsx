'use client' //Makes this file a client component i Next.js
import { useState, useEffect } from 'react'
import Link from 'next/link' //Next.js <Link> for intern navigation

//Using the same array as MovieCard.jsx, but only the first movie renders in page.jsx until I figure out what the correct endpoints are
const mockData = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix Revolution',
    Year: '1999',
    imdbID: 'tt0133093',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'Breaking Bad',
    Year: '2008–2013',
    imdbID: 'tt0903747',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
  },
  {
    Title: 'The Godfather',
    Year: '1972',
    imdbID: 'tt0068646',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg',
  },
]

export default function MoviesList() {
  //Default export react component
  const [data, setData] = useState([]) //State: List of movies initially empty
  const [loading, setLoading] = useState(true) //State: Loads

  useEffect(() => {
    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) return <div>Loading...</div> //Show loading before data appears

  return (
    <ul className="moviecard__list">
      {data.map((item) => (
        <li key={item.imdbID}>
          <Link href={`/movies/${item.imdbID}`} className="moviecard__container">
            {item.Poster && <img src={item.Poster} alt={`${item.Title} poster`} className="moviecard__poster" />}
            <p>{item.Title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
