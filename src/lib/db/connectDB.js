import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let connected = false

export default async function connectDB() {
  if (connected || mongoose.connection.readyState >= 1) return

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kino'

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    connected = true
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    throw err
  }
}
