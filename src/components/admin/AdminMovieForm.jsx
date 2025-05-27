'use client'

import { useRef } from 'react'
import ErrorMessage from '@/components/ErrorMessage'

export default function AdminMovieForm({ onSubmitMovie, movieError, setMovieError }) {
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    await onSubmitMovie(formData)
    formRef.current.reset()
  }

  return (
    <section className="admin-page__section">
      <h2 className="admin-page__section-title">Importera film</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="admin-page__form">
        <input name="title" placeholder="Filmtitel" required className="admin-page__input" />
        <button type="submit" className="admin-page__button">
          Importera
        </button>
      </form>
      <ErrorMessage message={movieError} onClose={() => setMovieError(null)} />
    </section>
  )
}
