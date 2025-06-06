import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function requireAdminAccess() {
  const JWT_SECRET = process.env.JWT_SECRET
  const token = cookies().get('token')?.value

  if (!token || !JWT_SECRET) return false

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded.admin === true
  } catch {
    return false
  }
}
