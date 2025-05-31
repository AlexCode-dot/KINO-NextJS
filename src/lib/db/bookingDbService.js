import Booking from '@/lib/db/models/Booking'

export async function deleteBookingsByScreeningId(screeningId) {
  return await Booking.deleteMany({ screening: screeningId })
}
