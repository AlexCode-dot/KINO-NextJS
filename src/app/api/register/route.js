import { NextResponse } from 'next/server'
import { createUser } from '@/lib/db/userDbService'
import bcrypt from 'bcrypt'

export async function POST(request) {
  const payload = await request.json()

  // Hash the password before storing it
  console.log(`Registering user with username: ${payload.Username}`)
  const salt = await bcrypt.genSalt(15)
  const hash = await bcrypt.hash(payload.Password, salt)
  const hashedPassword = hash

  // Create a new user in the database
  try {
    const newUser = await createUser(payload.Username, hashedPassword)
    console.log(`User created successfully: ${newUser.Username}`)
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (error) {
    console.error(`Error creating user: ${error.message}`)
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 })
  }
}
