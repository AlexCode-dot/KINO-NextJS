import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { deleteMovieAndScreenings, findMovieById } from '@/lib/db/movieDbService'
import { requireAdminAccess } from '@/lib/auth/requireAdminAccess'

export async function DELETE(req, context) {
  const { id } = await context.params

  if (requireAdminAccess()) {
    return NextResponse.json({ error: 'Endast tillgängligt för administratörer' }, { status: 403 })
  }

  try {
    await connectDB()
    const deletedMovie = await deleteMovieAndScreenings(id)
    return NextResponse.json({ success: true, deletedMovie })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req, { params }) {
  const { id } = await params
  await connectDB()
  const movie = await findMovieById(id)
  return NextResponse.json(movie)
}
