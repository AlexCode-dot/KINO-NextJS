import { useEffect, useState } from 'react'
import { fetchMovies, addMovie } from '@/lib/services/movieApiService'
import { fetchScreenings, addScreening } from '@/lib/services/screeningApiService'
import { deleteMovie, deleteScreening } from '@/lib/services/adminApiService'

export function useAdminData() {
  const [movies, setMovies] = useState([])
  const [screenings, setScreenings] = useState([])
  const [modal, setModal] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [movieError, setMovieError] = useState(null)
  const [screeningError, setScreeningError] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    loadMovies()
    loadScreenings()
  }, [])

  const loadMovies = async () => {
    try {
      const data = await fetchMovies()
      setMovies(data)
      setMovieError(null)
    } catch {
      setMovieError('Kunde inte ladda filmer.')
    }
  }

  const loadScreenings = async () => {
    try {
      const data = await fetchScreenings()
      setScreenings(data)
      setScreeningError(null)
    } catch {
      setScreeningError('Kunde inte ladda visningar.')
    }
  }

  const confirmDeleteMovie = (id, title) => setModal({ type: 'movie', id, label: title })
  const confirmDeleteScreening = (id, info) => setModal({ type: 'screening', id, label: info })
  const closeModal = () => setModal(null)

  const handleAddScreening = async (formData) => {
    try {
      setScreeningError(null)
      const newScreening = await addScreening(formData)
      setScreenings((prev) => [...prev, newScreening])
      const matchedMovie = movies.find((movie) => movie._id === newScreening.movie)
      setSuccessMessage(`Visning för "${matchedMovie.title}"har lagts till!`)
    } catch (err) {
      setScreeningError(err.message)
    }
  }

  const handleAddMovie = async (formData) => {
    try {
      setMovieError(null)
      const newMovie = await addMovie(formData)
      setMovies((prev) => [...prev, newMovie])
      setSuccessMessage(`Filmen "${newMovie.title}" har lagts till!`)
    } catch (err) {
      setMovieError(err.message)
    }
  }

  const performDelete = async () => {
    if (!modal) return
    const { type, id, label } = modal

    try {
      if (type === 'movie') {
        await deleteMovie(id)
        setMovies((prev) => prev.filter((movie) => movie._id !== id))
        setScreenings((prev) => prev.filter((screening) => screening.movie !== id))
      } else {
        await deleteScreening(id)
        setScreenings((prev) => prev.filter((screening) => screening._id !== id))
      }
      setDeleteError(null)
    } catch (err) {
      const labelText = type === 'movie' ? 'filmen' : 'visningen'
      setDeleteError(`Kunde inte ta bort ${labelText} "${label}" – försök igen senare.`)
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
    handleAddScreening,
    handleAddMovie,
    movieError,
    setMovieError,
    screeningError,
    setScreeningError,
    deleteError,
    setDeleteError,
    successMessage,
    setSuccessMessage,
  }
}
