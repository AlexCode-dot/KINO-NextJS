import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Admin: { type: Boolean, default: false },
})

export default mongoose.models.User || mongoose.model('User', userSchema)
