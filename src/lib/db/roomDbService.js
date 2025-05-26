import connectDB from '@/lib/db/connectDB'
import Room from '@/lib/db/models/Room'
import Screening from '@/lib/db/models/Screening'

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
  await connectDB()

  const deletedRoom = await Room.findByIdAndDelete(id)
  if (!deletedRoom) {
    throw new Error('Salongen kunde inte hittas')
  }

  await Screening.deleteMany({ room: id })
  return deletedRoom
}
