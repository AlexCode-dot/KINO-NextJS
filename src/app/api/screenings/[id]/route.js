import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { deleteScreeningById, getScreeningById, updateBookedSeats } from '@/lib/db/screeningDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function DELETE(req, context) {
  const { id } = await context.params

  const isAdmin = await requireAdminAccess()

  if (!isAdmin) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }

  try {
    await connectDB()
    const deletedScreening = await deleteScreeningById(id)
    return NextResponse.json({ success: true, deletedScreening })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req, { params }) {
  const { id } = await params
  await connectDB()
  const screening = await getScreeningById(id)
  return NextResponse.json(screening)
}

export async function PATCH(req, { params }) {
  const { id } = await params
  const { bookedSeats } = await req.json()

  try {
    await connectDB()

    const updated = await updateBookedSeats(id, bookedSeats)

    if (!updated) {
      return NextResponse.json({ error: 'Update to booked seats failed' }, { status: 404 })
    }
    return NextResponse.json({ success: 'Updated booked seats' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
