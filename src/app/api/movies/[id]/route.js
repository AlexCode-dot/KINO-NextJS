import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { deleteMovieAndScreenings } from '@/lib/db/movieDbService'

export async function DELETE(req, context) {
  const { id } = await context.params

  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    await connectDB()
    const deletedMovie = await deleteMovieAndScreenings(id)
    return NextResponse.json({ success: true, deletedMovie })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
