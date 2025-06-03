'use client'

import { use, useState, useEffect } from 'react'
import BookingMovieInfo from '../../../components/BookingMovieInfo'
import TicketDeliveryInfo from '../../../components/TicketDeliveryInfo'
import SeatMap from '../../../components/booking/SeatMap'
import BookingBookBtn from '../../../components/BookingBookBtn'

export default function bookingPageId({ params }) {
  const unwrappedParams = use(params)
  const [screening, setScreening] = useState(null)
  const [movie, setMovie] = useState(null)
  const [nrOfTickets, setNrOfTickets] = useState(0)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [emailCorrectFormat, setEmailCorrectFormat] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const screeningRes = await fetch(`../api/screenings/${unwrappedParams.id}`)
        const screeningData = await screeningRes.json()

        const roomRes = await fetch(`../api/rooms/${screeningData.room}`)
        const roomData = await roomRes.json()

        screeningData.room = roomData

        setScreening(screeningData)

        const movieRes = await fetch(`../api/movies/${screeningData.movie}`)
        const movieData = await movieRes.json()
        setMovie(movieData)
      } catch (error) {
        console.error('Error fetching data from API:', error)
      }
    }

    fetchData()
  }, [unwrappedParams.id])

  if (!screening || !movie) return <h1>Laddar sidan...</h1>

  return (
    <div className="booking__pageContainer">
      <h1>Biljettbokning</h1>
      <BookingMovieInfo movie={movie} screening={screening} />
      <TicketDeliveryInfo
        nrOfTickets={nrOfTickets}
        setNrOfTickets={setNrOfTickets}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerEmail={customerEmail}
        setCustomerEmail={setCustomerEmail}
        emailCorrectFormat={emailCorrectFormat}
        setEmailCorrectFormat={setEmailCorrectFormat}
      />
      <SeatMap
        screening={screening}
        selectedSeats={selectedSeats}
        onSelect={setSelectedSeats}
        nrOfTickets={nrOfTickets}
      />
      <BookingBookBtn
        movie={movie}
        screening={screening}
        customerName={customerName}
        customerEmail={customerEmail}
        selectedSeats={selectedSeats}
        emailCorrectFormat={emailCorrectFormat}
      />
    </div>
  )
}
