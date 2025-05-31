import { NextResponse } from 'next/server'
import { translateText } from '@/lib/services/translateApiService'

export async function POST(request) {
  try {
    const { text } = await request.json()
    const translatedText = await translateText(text)
    return NextResponse.json({ translatedText })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
