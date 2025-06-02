import { cookies } from 'next/headers'

export async function POST() {
  const storeCookie = await cookies()
  storeCookie.set('Username', '')
  return new Response(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
