'use client'

import { useRef } from 'react'
import ErrorMessage from '@/components/ErrorMessage'

export default function AdminScreeningForm({ onSubmitScreening, movies, screeningError, setScreeningError }) {
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    await onSubmitScreening(formData)
    formRef.current.reset()
  }

  return (
    <>
      <section className="admin-page__section">
        <h2 className="admin-page__section-title">Lägg till visning</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="admin-page__form">
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
