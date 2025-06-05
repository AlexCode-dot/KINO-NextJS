import connectDB from '@/lib/db/connectDB'
import { findUserByUsername } from '@/lib/db/userDbService'
import { NextResponse } from 'next/server'
import jsonwebtoken from 'jsonwebtoken'

export async function POST(request) {
  const payload = await request.json()

  // Log the payload for debugging
  console.log(`${payload.Username} and ${payload.Password} received in the login API`)
  console.log(`Login attempt with username: ${payload.Username} and password: ${payload.Password}`)

  await connectDB()
  let login = await findUserByUsername(payload.Username)

  console.log(`${login.Username} found in the database`)
  console.log(`Is ${payload.Username} an admin? ${login.Admin}`)

  if (login.Username === payload.Username && login.Password === payload.Password) {
    console.log(`User ${payload.Username} found in the database`)
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })

    const jwtToken = jsonwebtoken.sign({ username: payload.Username, admin: login.Admin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    response.cookies.set('JWT', jwtToken, { httpOnly: false })
    return response
  } else {
    console.log(`Login failed for username: ${payload.Username}`)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
