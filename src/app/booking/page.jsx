'use client'

import { useState, useEffect } from 'react'
import BookingMovieInfo from '../../components/BookingMovieInfo'
import TicketDeliveryInfo from '../../components/TicketDeliveryInfo'

export default function bookingPage() {
  const [movieData, setMovieData] = useState('')

  return (
    <div className="booking__pageContainer">
      <h1>Biljettbokning</h1>
      <BookingMovieInfo />
      <TicketDeliveryInfo />
    </div>
  )
}
