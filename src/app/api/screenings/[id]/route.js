import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import Screening from '@/lib/db/models/Screening'

export async function DELETE(req, context) {
  const { id } = await context.params

  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    await connectDB()
    const deletedScreening = await Screening.findByIdAndDelete(id)
    return NextResponse.json({ success: true, deletedScreening })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
