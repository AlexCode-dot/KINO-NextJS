import Booking from '@/lib/db/models/Booking'

export async function deleteBookingsByScreeningId(screeningId) {
  return await Booking.deleteMany({ screening: screeningId })
}

export async function createBooking({ screening, movieTitle, roomName, screeningTime, seats, name }) {
  const newBooking = new Booking({
    screening,
    movieTitle,
    roomName,
    screeningTime,
    seats,
    name,
  })

  return await newBooking.save()
}

export async function getBookingById(id) {
  return await Booking.findById(id)
}
