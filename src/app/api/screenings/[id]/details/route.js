import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connectDB'
import { getScreeningWithDetails } from '@/lib/db/screeningDbService'

export async function GET(req, context) {
  const { id } = await context.params

  try {
    await connectDB()
    const screening = await getScreeningWithDetails(id)

    if (!screening) {
      return NextResponse.json({ error: 'Visning hittades inte' }, { status: 404 })
    }

    return NextResponse.json({ screening })
  } catch (err) {
    console.error('❌ API error in /screenings/[id]/details:', err)
    return NextResponse.json({ error: 'Något gick fel' }, { status: 500 })
  }
}
