import connectDB from '@/lib/db/connectDB'
import { findUserByUsername } from '@/lib/db/userDbService'
import { NextResponse } from 'next/server'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function POST(request) {
  const payload = await request.json()
  const { Username, Password } = payload

  await connectDB()
  const user = await findUserByUsername(Username)

  if (!user || user.Username !== Username) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const isMatch = await bcrypt.compare(Password, user.Password)
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const jwtToken = jsonwebtoken.sign({ username: user.Username, admin: user.Admin }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })

  response.cookies.set('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  })

  response.cookies.set('JWT', jwtToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  })

  return response
}
