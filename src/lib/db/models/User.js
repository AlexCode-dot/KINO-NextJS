import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
})

export default mongoose.models.User || mongoose.model('User', userSchema)
