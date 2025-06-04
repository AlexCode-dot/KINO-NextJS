import { NextResponse } from 'next/server'
import { toggleAdmin } from '@/lib/db/userDbService'

export async function POST(request) {
  const { username } = await request.json()
  try {
    const user = await toggleAdmin(username)
    return NextResponse.json({ success: true, user })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
