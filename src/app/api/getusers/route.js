import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getAllUsers } from '@/lib/db/userDbService'

export async function GET(request) {
  if (!request.cookies.get('Admin') || request.cookies.get('Admin').value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
