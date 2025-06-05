import connectDB from '@/lib/db/connectDB'
import { findUserByUsername } from '@/lib/db/userDbService'
import { NextResponse } from 'next/server'
import jsonwebtoken from 'jsonwebtoken'
import hashPassword from '@/lib/utils/hashPassword'
import bcrypt from 'bcrypt'

export async function POST(request) {
  const payload = await request.json()

  // Log the payload for debugging
  console.log(`${payload.Username} and ${payload.Password} received in the login API`)
  console.log(`Login attempt with username: ${payload.Username} and password: ${payload.Password}`)

  await connectDB()
  let login = await findUserByUsername(payload.Username)

  const secretpassword = await hashPassword(payload.Password)

  if (login.Username == payload.Username) {
    console.log(`User ${payload.Username} found in the database`)
    const isMatch = await bcrypt.compare(payload.Password, login.Password)
    console.log(`Password match for user ${payload.Username}: ${isMatch}`)
    if (isMatch) {
      const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
      const jwtToken = jsonwebtoken.sign({ username: payload.Username, admin: login.Admin }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      response.cookies.set('JWT', jwtToken, { httpOnly: false })
      return response
    } else login.Password !== secretpassword
    {
      console.log(`Password incorrect for user: ${payload.Username}`)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
  }
}
