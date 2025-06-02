'use client'

import { useState, useEffect } from 'react'

//Updating the SearchField to handle a backend search logic
export default function SearchField() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    if (query.trim() === '') return
    try {
      const res = await fetch(`/api/movies?q=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error('Något gick fel vid sökning')
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error('Sökfel:', error)
      setResults([])
    }
  }

  //Debounce for UX improvements
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <>
      <div className="searchfield-container">
        <h2>Sök efter film:</h2>
        <input
          type="text"
          placeholder="skriv här..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Sök efter film"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        ></input>
        <button className="search-button" onClick={handleSearch}>
          Sök
        </button>

        <div className="moviecard__list-search">
          {results.length === 0 && query !== '' && (
            <p>
              Inga resultat hittades för <strong>"{query}"</strong>
            </p>
          )}

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
