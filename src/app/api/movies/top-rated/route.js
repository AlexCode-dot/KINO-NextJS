import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getTopRatedMovies } from '@/lib/db/movieDbService'

export async function GET() {
  await connectDB()
  const movies = await getTopRatedMovies()
  return NextResponse.json(movies)
}
