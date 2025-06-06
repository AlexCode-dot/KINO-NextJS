import { NextResponse } from 'next/server'
import { toggleAdmin } from '@/lib/db/userDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function POST(request) {
  const isAdmin = await requireAdminAccess()

  if (!isAdmin) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }
  const { username } = await request.json()
  try {
    const user = await toggleAdmin(username)
    return NextResponse.json({ success: true, user })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
