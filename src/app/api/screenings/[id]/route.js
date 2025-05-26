import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { deleteScreeningById, getScreeningById } from '@/lib/db/screeningDbService'

export async function DELETE(req, context) {
  const { id } = await context.params

  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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
  const { id } = params
  await connectDB()
  const screening = await getScreeningById(id)
  return NextResponse.json(screening)
}
