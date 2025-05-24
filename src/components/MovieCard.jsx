'use client'

import { useState, useEffect } from 'react'

export default function MovieCard() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const res = await fetch('/api/movies/top-rated', {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Kunde inte hämta de högst rankade filmerna')
        const movies = await res.json()
        setData(movies)
      } catch (error) {
        console.error('Fel vid hämtning av filmer:', error)
        setData([])
      }
    }
    fetchTopRatedMovies()
  }, [])

  return (
    <div>
      {data.length === 0 && <p>Inga filmer hittades</p>}
      <ul className="moviecard__list">
        {data.map((item, index) => (
          <li key={item._id}>
            <div className="moviecard__container">
              <div>
                {item.posterUrl && (
                  <img src={item.posterUrl} alt={`${item.title} poster`} className="moviecard__poster" />
                )}
              </div>
              <p>{item.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
