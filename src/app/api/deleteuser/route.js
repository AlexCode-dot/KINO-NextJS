import { deleteUserByUsername } from '@/lib/db/userDbService'

export async function POST(request) {
  const { username } = await request.json()

  if (!username) {
    return new Response('Username is required', { status: 400 })
  }

  try {
    await deleteUserByUsername(username)
    return new Response(`User ${username} deleted successfully`, { status: 200 })
  } catch (error) {
    console.error('Error deleting user:', error)
    return new Response('Failed to delete user', { status: 500 })
  }
}
