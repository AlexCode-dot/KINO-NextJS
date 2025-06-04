import { updateUserPassword } from '@/lib/db/userDbService'
import { NextResponse } from 'next/server'
export async function POST(request) {
  console.log(request.Username)
  const payload = await request.json()

  console.log(`Received request to update password for user: ${payload.Username}`)

  try {
    const updatedUser = await updateUserPassword(payload.Username, payload.Password)

    console.log(`Password updated successfully for user: ${updatedUser.Username}`)
    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 })
  } catch (error) {
    console.error(`Error updating password for user ${username}:`, error)
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
  }
}
