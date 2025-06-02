import User from './models/User'
import connectDB from './connectDB'

// Work in progress: testing.
export async function getAllUsers() {
  await connectDB()
  return await User.find().select('Username')
}

// Work in progress: testing.
export async function findUserByUsername(username) {
  console.log(`Finding user with username: ${username}`)
  await connectDB()

  // Work in progress: testing.
  const findUser = await User.findOne({ Username: username })
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
  console.log(`Creating user with username: ${username} and password: ${password}`)

  await connectDB()

  const existingUser = await User.findOne({ Username: username })
  if (username && existingUser) {
    console.log(`User with username ${username} already exists.`)
    throw new Error('Användarnamnet finns redan, vänligen välj ett annat.')
  }

  const newUser = await User.create({ Username: username, Password: password })
  console.log(`User created successfully: ${newUser.Username}`)
  return newUser
}

// Work in progress: testing.
export async function deleteUserByUsername(username) {
  await connectDB()
  return await User.findOneAndDelete({ Username: username })
}

// Work in progress: testing.
export async function updateUserPassword(username, newPassword) {
  await connectDB()
  return await User.findOneAndUpdate({ Username: username }, { Password: newPassword }, { new: true })
}

// Work in progress: testing.
export async function userExists(username) {
  await connectDB()
  const user = await User.findOne({ Username: username })
  return !!user
}
