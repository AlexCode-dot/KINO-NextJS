import { NextResponse } from 'next/server'
import { deleteRoomAndScreenings } from '@/lib/db/roomDbService'

export async function DELETE(req, context) {
  const { id } = await context.params

  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    await deleteRoomAndScreenings(id)
    return NextResponse.json({ message: 'Salongen och tillhörande visningar raderades' })
  } catch (err) {
    const status = err.message.includes('kunde inte hittas') ? 404 : 500
    return NextResponse.json({ error: err.message }, { status })
  }
}
