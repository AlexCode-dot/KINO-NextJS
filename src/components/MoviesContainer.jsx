'use client'

import { useState, useEffect } from 'react'
import SearchField from './SearchField'
import Link from 'next/link'

export default function MoviesContainer() {
  const [movies, setMovies] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/movies')
        const data = await res.json()
        setMovies(data)
      } catch (error) {
        console.error('Kunde inte hämta filmer:', error)
      }
    }

    fetchMovies()
  }, [])

  const loadMoreMovies = () => {
    setVisibleCount((prevCount) => prevCount + 8)
  }

  const visibleMovies = movies.slice(0, visibleCount)

  return (
    <>
      <SearchField />
      <div>
        <ul className="moviecard__list">
          {visibleMovies.map((movie) => (
            <li key={movie._id}>
              <Link key={movie._id} href={'/movies/[id]'}>
                <div className="moviecard__container">
                  <div>
                    {movie.posterUrl && (
                      <img src={movie.posterUrl} alt={`${movie.title} poster`} className="moviecard__poster" />
                    )}
                  </div>
                  <p>{movie.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {visibleCount < movies.length && (
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
