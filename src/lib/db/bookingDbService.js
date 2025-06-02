import Booking from '@/lib/db/models/Booking'
import connectDB from '@/lib/db/connectDB'
import Screening from '@/lib/db/models/Screening'

export async function deleteBookingsByScreeningId(screeningId) {
  return await Booking.deleteMany({ screening: screeningId })
}

export async function getAllBookings() {
  await connectDB()
  return await Booking.find().sort({ bookedAt: -1 }).lean()
}

export async function deleteBookingById(id) {
  await connectDB()

  const booking = await Booking.findById(id)
  if (!booking) throw new Error('Booking not found')

  await Screening.updateOne(
    { _id: booking.screening },
    {
      $pull: {
        bookedSeats: {
          $or: booking.seats.map((s) => ({ row: s.row, seat: s.seat })),
        },
      },
    }
  )

  await Booking.findByIdAndDelete(id)
}

export async function updateBookingSeats(id, seats) {
  await connectDB()

  const booking = await Booking.findById(id)
  if (!booking) throw new Error('Booking not found')

  const screening = await Screening.findById(booking.screening)
  if (!screening) throw new Error('Screening not found')

  screening.bookedSeats = screening.bookedSeats.filter(
    (s) => !booking.seats.some((bs) => bs.row === s.row && bs.seat === s.seat)
  )

  screening.bookedSeats.push(...seats.map((s) => ({ ...s, _id: booking._id })))
  await screening.save()

  booking.seats = seats
  await booking.save()

  return booking.toObject()
}
