import mongoose from 'mongoose'

const ScreeningSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  date: { type: Date, required: true },
  endTime: { type: Date, required: true },
  room: { type: String, required: true },
})

ScreeningSchema.index({ date: 1, room: 1 }, { unique: true })

export default mongoose.models.Screening || mongoose.model('Screening', ScreeningSchema)
