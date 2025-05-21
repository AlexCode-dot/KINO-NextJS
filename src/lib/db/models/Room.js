import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rows: [
    {
      rowNumber: { type: Number, required: true },
      seats: { type: Number, required: true },
    },
  ],
  wheelchairSeats: [
    {
      row: { type: Number, required: true },
      seat: { type: Number, required: true },
    },
  ],
})

export default mongoose.models.Room || mongoose.model('Room', roomSchema)
