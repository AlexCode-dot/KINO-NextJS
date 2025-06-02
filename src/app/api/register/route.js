import { NextResponse } from 'next/server'
import { createUser } from '@/lib/db/userDbService'

export async function POST(request) {
  const payload = await request.json()

  // Log the payload for debugging
  console.log(`Registering user with username: ${payload.Username}`)

  // Create a new user in the database
  try {
    const newUser = await createUser(payload.Username, payload.Password)
    console.log(`User created successfully: ${newUser.Username}`)
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (error) {
    console.error(`Error creating user: ${error.message}`)
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 })
  }
}
