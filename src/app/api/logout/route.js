import { cookies } from 'next/headers'

export async function POST() {
  cookies().set('Username', '')
  return new Response(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
