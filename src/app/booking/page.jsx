'use client'

import { useState, useEffect } from 'react'
import BookingMovieInfo from '../../components/BookingMovieInfo'

export default function bookingPage() {
  const [movieData, setMovieData] = useState('')

  return (
    <>
      <h1>Biljettbokning</h1>
      <BookingMovieInfo />
    </>
  )
}
