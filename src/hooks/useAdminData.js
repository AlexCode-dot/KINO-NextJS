import { useEffect, useState } from 'react'
import { fetchMovies, addMovie } from '@/lib/services/movieApiService'
import { fetchScreenings, addScreening } from '@/lib/services/screeningApiService'
import { deleteMovie, deleteScreening } from '@/lib/services/adminApiService'
import { fetchRooms, addRoom, deleteRoom } from '@/lib/services/roomApiService'

export function useAdminData() {
  const [movies, setMovies] = useState([])
  const [screenings, setScreenings] = useState([])
  const [modal, setModal] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [movieError, setMovieError] = useState(null)
  const [screeningError, setScreeningError] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [rooms, setRooms] = useState([])
  const [roomError, setRoomError] = useState(null)

  useEffect(() => {
    loadMovies()
    loadScreenings()
    loadRooms()
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

  const loadRooms = async () => {
    try {
      const data = await fetchRooms()
      setRooms(data)
    } catch {
      setRoomError('Kunde inte ladda salonger.')
    }
  }

  const confirmDeleteMovie = (id, title) => setModal({ type: 'movie', id, label: title })
  const confirmDeleteScreening = (id, info) => setModal({ type: 'screening', id, label: info })
  const confirmDeleteRoom = (id, name) => setModal({ type: 'room', id, label: name })
  const closeModal = () => setModal(null)

  const handleAddScreening = async (formData) => {
    try {
      setScreeningError(null)
      const newScreening = await addScreening(formData)
      setScreenings((prev) => [...prev, newScreening])
      const matchedMovie = movies.find(
        (movie) => String(movie._id) === String(newScreening.movie._id || newScreening.movie)
      )
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

  const handleAddRoom = async (roomData) => {
    try {
      setRoomError(null)
      const newRoom = await addRoom(roomData)
      setSuccessMessage(`Salongen "${newRoom.name}" har skapats!`)
      await loadRooms()
    } catch (err) {
      setRoomError(err.message)
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
      } else if (type === 'screening') {
        await deleteScreening(id)
        setScreenings((prev) => prev.filter((screening) => screening._id !== id))
      } else if (type === 'room') {
        await deleteRoom(id)
        setRooms((prev) => prev.filter((room) => room._id !== id))
        setScreenings((prev) => prev.filter((screening) => screening.room._id !== id && screening.room !== id))
      }

      setDeleteError(null)
    } catch (err) {
      const labelText = type === 'movie' ? 'filmen' : type === 'screening' ? 'visningen' : 'salongen'
      setDeleteError(`Kunde inte ta bort ${labelText} "${label}" – försök igen senare.`)
    } finally {
      closeModal()
    }
  }

  return {
    movies,
    screenings,
    rooms,
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
    handleAddRoom,
    roomError,
    setRoomError,
    confirmDeleteRoom,
  }
}
