'use client'

import { useRef } from 'react'
import ErrorMessage from '@/components/ErrorMessage'

export default function AdminForm({
  onSubmitMovie,
  onSubmitScreening,
  movies,
  movieError,
  setMovieError,
  screeningError,
  setScreeningError,
}) {
  const movieFormRef = useRef(null)
  const screeningFormRef = useRef(null)

  const handleSubmitMovie = async (e) => {
    e.preventDefault()
    const formData = new FormData(movieFormRef.current)
    await onSubmitMovie(formData)
    movieFormRef.current.reset()
  }

  const handleSubmitScreening = async (e) => {
    e.preventDefault()
    const formData = new FormData(screeningFormRef.current)
    await onSubmitScreening(formData)
    screeningFormRef.current.reset()
  }

  return (
    <>
      <section className="admin-page__section">
        <h2 className="admin-page__section-title">Importera film</h2>
        <form ref={movieFormRef} onSubmit={handleSubmitMovie} className="admin-page__form">
          <input name="title" placeholder="Filmtitel" required className="admin-page__input" />
          <button type="submit" className="admin-page__button">
            Importera
          </button>
        </form>
        <ErrorMessage message={movieError} onClose={() => setMovieError(null)} />
      </section>

      <section className="admin-page__section">
        <h2 className="admin-page__section-title">Lägg till visning</h2>
        <form ref={screeningFormRef} onSubmit={handleSubmitScreening} className="admin-page__form">
          <select name="movieId" required className="admin-page__input">
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
          <input type="datetime-local" name="date" required className="admin-page__input" />
          <input name="room" placeholder="Salong" required className="admin-page__input" />
          <button type="submit" className="admin-page__button">
            Lägg till
          </button>
        </form>
        <ErrorMessage message={screeningError} onClose={() => setScreeningError(null)} />
      </section>
    </>
  )
}
