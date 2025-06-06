import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { deleteRoomAndScreenings, getRoomById } from '@/lib/db/roomDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function DELETE(req, context) {
  const { id } = await context.params

  const isAdmin = await requireAdminAccess()

  if (!isAdmin) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }

  try {
    await deleteRoomAndScreenings(id)
    return NextResponse.json({ message: 'Salongen och tillhörande visningar raderades' })
  } catch (err) {
    const status = err.message.includes('kunde inte hittas') ? 404 : 500
    return NextResponse.json({ error: err.message }, { status })
  }
}

export async function GET(req, { params }) {
  const { id } = await params
  await connectDB()
  const room = await getRoomById(id)
  return NextResponse.json(room)
}
