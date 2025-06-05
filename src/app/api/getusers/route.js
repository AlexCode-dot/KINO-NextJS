import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getAllUsers } from '@/lib/db/userDbService'
import { jwtDecode } from 'jwt-decode'
export async function GET(request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = cookieHeader.split(';').map((c) => c.trim())
  const jwtCookie = cookies.find((c) => c.startsWith('JWT='))
  if (!jwtCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = jwtCookie.split('=')[1]
  try {
    const decoded = jwtDecode(token)
    if (!decoded.admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
  try {
    await connectDB()
    const users = await getAllUsers()
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
