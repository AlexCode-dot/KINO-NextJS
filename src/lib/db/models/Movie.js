import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  year: String,
  genre: String,
  director: String,
  plot: String,
  runtime: String,
  imdbRating: String,
  posterUrl: String,
  source: String,
  createdBy: String,
})

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema)
