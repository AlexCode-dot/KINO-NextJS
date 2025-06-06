import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 })

    response.cookies.set('JWT', '', {
      path: '/',
      expires: new Date(0),
    })

    response.cookies.set('token', '', {
      path: '/',
      expires: new Date(0),
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
