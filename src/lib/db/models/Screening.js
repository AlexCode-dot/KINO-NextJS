import mongoose from 'mongoose'

const bookedSeatSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  seat: { type: Number, required: true },
})

const ScreeningSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  date: { type: Date, required: true },
  endTime: { type: Date, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active',
  },
  bookedSeats: [bookedSeatSchema],
})

ScreeningSchema.index({ date: 1, room: 1 }, { unique: true })

export default mongoose.models.Screening || mongoose.model('Screening', ScreeningSchema)
