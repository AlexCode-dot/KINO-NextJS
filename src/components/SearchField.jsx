'use client'

import { useState } from 'react'

//Updating the SearchField to handle a backend search logic
export default function SearchField() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    if (!query) return
    try {
      const res = await fetch(`/api/movies?q=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error('Något gick fel vid sökning')
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error('Sökfel:', error)
    }
  }

  return (
    <>
      <div className="searchfield-container">
        <h2>Sök efter film:</h2>
        <input type="text" placeholder="skriv här..." value={query} onChange={(e) => setQuery(e.target.value)}></input>
        <button className="search-button" onClick={handleSearch}>
          Sök
        </button>
        <div className="moviecard__list-search">
          {results.map((movie) => (
            <a key={movie._id} href={`/movies/${movie._id}`}>
              <div className="moviecard__container-search">
                {movie.posterUrl && (
                  <img src={movie.posterUrl} alt={`${movie.title} poster`} className="moviecard__poster-search" />
                )}
                <p className="moviecard__title-search">{movie.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
