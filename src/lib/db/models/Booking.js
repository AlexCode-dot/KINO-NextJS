import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  screening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screening',
    required: true,
  },
  movieTitle: String,
  roomName: String,
  screeningTime: Date,

  seats: [
    {
      row: Number,
      seat: Number,
    },
  ],
  name: {
    type: String,
    required: true,
    trim: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema)
