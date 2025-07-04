import User from './models/User'
import connectDB from './connectDB'
import hashPassword from '@/lib/utils/hashPassword'

// Work in progress: testing.
export async function getAllUsers() {
  await connectDB()
  console.log('Fetching all users from the database...')
  return await User.find().select('Username Admin')
}

// Work in progress: testing.
export async function findUserByUsername(username) {
  await connectDB()

  const findUser = await User.findOne({ Username: username }).select('Username Password Admin')
  console.log(`User found: ${findUser ? findUser.Username : 'No user found'}`)
  if (!findUser) {
    console.log(`User with username ${username} not found.`)
    throw new Error('Användaren kunde inte hittas.')
  }
  return findUser
}

// Creates a new user.
// Password is in plain text, work in progress to hash it.
export async function createUser(username, password) {
  hashPassword(password)
  await connectDB()

  const existingUser = await User.findOne({ Username: username })
  if (username && existingUser) {
    console.log(`User with username ${username} already exists.`)
    throw new Error('Användarnamnet finns redan, vänligen välj ett annat.')
  }

  const newUser = await User.create({ Username: username, Password: password, Admin: false })
  return newUser
}

// Work in progress: testing.
export async function deleteUserByUsername(username) {
  await connectDB()
  console.log(`Attempting to delete user with username: ${username}`)
  return await User.findOneAndDelete({ Username: username })
}

// Work in progress: testing.
export async function updateUserPassword(username, newPassword) {
  await connectDB()
  newPassword = await hashPassword(newPassword)
  return await User.findOneAndUpdate({ Username: username }, { Password: newPassword }, { new: true })
}

// Work in progress: testing.
export async function userExists(username) {
  await connectDB()
  const user = await User.findOne({ Username: username })
  return !!user
}

export async function toggleAdmin(username) {
  await connectDB()
  const user = await User.findOne({ Username: username })
  if (!user) {
    throw new Error(`User with username ${username} not found.`)
  }
  console.log(`Toggling admin status for user: ${username}. Current admin status: ${user.Admin}`)
  user.Admin = !user.Admin
  await user.save()
  return user
}
