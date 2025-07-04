'use-client'
import { useRouter } from 'next/navigation'

export default function BookingBookBtn({
  movie,
  screening,
  customerName,
  nrOfTickets,
  selectedSeats,
  emailCorrectFormat,
  setBookingInvalidClass,
}) {
  const router = useRouter()

  async function handleBooking() {
    const bookingData = {
      screening: screening._id,
      movieTitle: movie.title,
      roomName: screening.room.name,
      screeningTime: screening.date,
      seats: selectedSeats,
      name: customerName,
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Något gick fel vid bokningen')
      }
      const result = await response.json()
      console.log('Booking successfull', result)
      router.push(`/booking-confirmation/${result._id}`)
    } catch (error) {
      console.error('Error', error)
    }
  }

  async function updateBookedSeats() {
    try {
      const res = await fetch(`/api/screenings/${screening._id}`, {
        method: 'PATCH',
        headers: { 'Conten-Type': 'application/json' },
        body: JSON.stringify({
          bookedSeats: selectedSeats,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to update booked seats')
      }
      const result = await res.json()
    } catch (err) {
      throw err
    }
  }

  return (
    <>
      <button
        className="booking__bookBtn"
        disabled={!emailCorrectFormat}
        onClick={() => {
          if (selectedSeats.length < nrOfTickets) {
            setBookingInvalidClass('booking_invalid active')
            return
          } else {
            updateBookedSeats()
            handleBooking()
          }
        }}
      >
        Boka
      </button>
    </>
  )
}
