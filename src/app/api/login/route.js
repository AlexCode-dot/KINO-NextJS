import { NextResponse } from 'next/server'

export async function POST(request) {
  const payload = await request.json()

  // Log the payload for debugging
  console.log(`${payload.Username} and ${payload.Password} received in the login API`)
  console.log(`Login attempt with username: ${payload.Username} and password: ${payload.Password}`)

  // Verify if username and password match login info
  if (payload.Username === 'admin' && payload.Password === 'password') {
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
    response.cookies.set('Username', payload.Username, {})
    return response
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
