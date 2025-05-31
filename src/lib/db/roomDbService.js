import connectDB from '@/lib/db/connectDB'
import Room from '@/lib/db/models/Room'
import Screening from '@/lib/db/models/Screening'
import { deleteBookingsByScreeningId } from '@/lib/db/bookingDbService'

export async function getAllRooms() {
  await connectDB()
  return Room.find().lean()
}

export async function getRoomById(id) {
  return await Room.findById(id)
}

export async function createRoom({ name, rows, wheelchairSeats }) {
  await connectDB()

  const existingRoom = await Room.findOne({ name })
  if (existingRoom) {
    throw new Error('En salong med detta namn finns redan, testa ett nytt namn!')
  }

  const newRoom = await Room.create({ name, rows, wheelchairSeats })
  return newRoom
}

export async function deleteRoomAndScreenings(id) {
  const deletedRoom = await Room.findByIdAndDelete(id)
  if (!deletedRoom) {
    throw new Error('Salongen kunde inte hittas')
  }

  const screenings = await Screening.find({ room: id }).select('_id')

  for (const screening of screenings) {
    await deleteBookingsByScreeningId(screening._id)
  }

  await Screening.deleteMany({ room: id })

  return deletedRoom
}
