import { useEffect, useState } from 'react'
import { fetchBookings, deleteBookingById, updateBookingSeats } from '@/lib/services/bookingApiService'
import { fetchScreeningDetails } from '@/lib/services/screeningApiService'

export function useAdminBookings() {
  const [bookings, setBookings] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [modal, setModal] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    search: '',
    bookingDate: '',
    screeningDate: '',
    selectedMovie: '',
    selectedRoom: '',
  })

  const [movieOptions, setMovieOptions] = useState([])
  const [roomOptions, setRoomOptions] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBookings()
        setBookings(data)
        setFiltered(data)
        setMovieOptions([...new Set(data.map((b) => b.movieTitle))].sort())
        setRoomOptions([...new Set(data.map((b) => b.roomName))].sort())
      } catch (err) {
        setErrorMessage('Kunde inte hämta bokningar. Kontrollera servern eller din internetanslutning.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    const query = filters.search.toLowerCase()
    const formatDate = (str) => new Date(str).toLocaleDateString('sv-SE')

    setFiltered(
      bookings.filter((booking) => {
        const nameMatch = booking.name?.toLowerCase().includes(query)
        const titleMatch = booking.movieTitle?.toLowerCase().includes(query)

        const bookingMatch = !filters.bookingDate || formatDate(booking.bookedAt) === filters.bookingDate
        const screeningMatch = !filters.screeningDate || formatDate(booking.screeningTime) === filters.screeningDate
        const movieMatch = !filters.selectedMovie || booking.movieTitle === filters.selectedMovie
        const roomMatch = !filters.selectedRoom || booking.roomName === filters.selectedRoom

        return (nameMatch || titleMatch) && bookingMatch && screeningMatch && movieMatch && roomMatch
      })
    )
  }, [filters, bookings])

  const resetFilters = () => {
    setFilters({
      search: '',
      bookingDate: '',
      screeningDate: '',
      selectedMovie: '',
      selectedRoom: '',
    })
  }

  const confirmDeleteBooking = (booking) => {
    setModal({
      message: `Vill du ta bort bokningen för ${booking.name}?`,
      onConfirm: async () => {
        await deleteBookingById(booking._id)
        setBookings((prev) => prev.filter((booking) => booking._id !== booking._id))
        setSuccessMessage('Bokningen har tagits bort!')
        setModal(null)
      },
    })
  }

  const showSeatMap = async (booking) => {
    const data = await fetchScreeningDetails(booking.screening)
    const screening = data.screening

    if (!screening || !screening.room) {
      setErrorMessage('Kunde inte hämta information om visningen.')
      return
    }

    if (!screening?.room) return
    setSelectedBooking({
      ...booking,
      room: screening.room,
      bookedSeats: screening.bookedSeats,
    })
  }

  const toggleEditMode = () => {
    setIsEditing((prev) => {
      if (prev) {
        setSelectedBooking((prevBooking) => ({
          ...prevBooking,
          seats: prevBooking.bookedSeats.filter((seat) => String(seat._id) === String(prevBooking._id)),
        }))
      }
      return !prev
    })
    setErrorMessage('')
  }

  const handleSaveBooking = async () => {
    if (!selectedBooking || selectedBooking.seats.length === 0) {
      setErrorMessage('Du måste välja minst en plats.')
      return
    }
    try {
      const updated = await updateBookingSeats(selectedBooking._id, selectedBooking.seats)

      const data = await fetchScreeningDetails(updated.screening)
      const screening = data.screening

      setSelectedBooking({
        ...updated,
        room: screening.room,
        bookedSeats: screening.bookedSeats,
      })

      setBookings((prev) => prev.map((booking) => (booking._id === updated._id ? updated : booking)))
      setIsEditing(false)
      setErrorMessage('')
      setSuccessMessage('Bokningen har uppdaterats!')
    } catch (err) {
      console.error(err)
      setErrorMessage('Kunde inte spara bokningen. Försök igen.')
    }
  }

  return {
    filtered,
    selectedBooking,
    isEditing,
    modal,
    successMessage,
    errorMessage,
    filters,
    setFilters,
    movieOptions,
    roomOptions,
    resetFilters,
    confirmDeleteBooking,
    setModal,
    setSuccessMessage,
    setErrorMessage,
    showSeatMap,
    setSelectedBooking,
    toggleEditMode,
    handleSaveBooking,
    setIsEditing,
    loading,
  }
}
