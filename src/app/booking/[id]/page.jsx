'use client'

import { useState, useEffect } from 'react'
import BookingMovieInfo from '../../../components/BookingMovieInfo'
import TicketDeliveryInfo from '../../../components/TicketDeliveryInfo'

export default async function bookingPageId({ params }) {
  return (
    <div className="booking__pageContainer">
      <h1>Biljettbokning</h1>
      <BookingMovieInfo />
      <TicketDeliveryInfo />
    </div>
  )
}
