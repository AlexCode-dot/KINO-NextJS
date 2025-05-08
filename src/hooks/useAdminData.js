import { useEffect, useState } from 'react'
import { fetchMovies, addMovie } from '@/lib/services/movieApiService'
import { fetchScreenings, addScreening } from '@/lib/services/screeningApiService'
import { deleteMovie, deleteScreening } from '@/lib/services/adminApiService'

export function useAdminData() {
  const [movies, setMovies] = useState([])
  const [screenings, setScreenings] = useState([])
  const [modal, setModal] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMovies()
    loadScreenings()
  }, [])

  const loadMovies = async () => {
    try {
      const data = await fetchMovies()
      setMovies(data)
    } catch {
      setError('Kunde inte ladda filmer.')
    }
  }

  const loadScreenings = async () => {
    try {
      const data = await fetchScreenings()
      setScreenings(data)
    } catch {
      setError('Kunde inte ladda visningar.')
    }
  }

  const confirmDeleteMovie = (id, title) => setModal({ type: 'movie', id, label: title })
  const confirmDeleteScreening = (id, info) => setModal({ type: 'screening', id, label: info })
  const closeModal = () => setModal(null)

  const handleAddScreening = async (formData) => {
    try {
      setError(null)
      const newScreening = await addScreening(formData)
      setScreenings((prev) => [...prev, newScreening])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddMovie = async (formData) => {
    try {
      setError(null)
      const newMovie = await addMovie(formData)
      setMovies((prev) => [...prev, newMovie])
    } catch (err) {
      setError(err.message)
    }
  }

  const performDelete = async () => {
    if (!modal) return
    const { type, id, label } = modal

    try {
      if (type === 'movie') {
        await deleteMovie(id)
        setMovies((movie) => movie.filter((movie) => movie._id !== id))
        setScreenings((screening) => screening.filter((screening) => screening.movie !== id))
      } else {
        await deleteScreening(id)
        setScreenings((screening) => screening.filter((screening) => screening._id !== id))
      }
    } catch (err) {
      const labelText = type === 'movie' ? 'filmen' : 'visningen'
      setError(`Kunde inte ta bort ${labelText} "${label}" – försök igen senare.`)
    } finally {
      closeModal()
    }
  }

  return {
    movies,
    screenings,
    confirmDeleteMovie,
    confirmDeleteScreening,
    modal,
    closeModal,
    performDelete,
    error,
    setError,
    handleAddScreening,
    handleAddMovie,
  }
}
