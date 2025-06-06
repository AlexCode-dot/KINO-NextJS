import bcrypt from 'bcrypt'

export default async function hashPassword(password) {
  const salt = await bcrypt.genSalt(15)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}
