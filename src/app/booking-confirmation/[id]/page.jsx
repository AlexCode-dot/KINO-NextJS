'use client'
import { use, useState, useEffect } from 'react'
import QrCodeGenerator from '@/components/booking-confirmation/QrCodeGenerator'
import ConfirmationDetails from '@/components/booking-confirmation/ConfirmationDetails'

export default function BookingConfirmationPageId({ params }) {
  const unwrappedParams = use(params)

  function handleDownloadPdf() {
    const element = document.querySelector('.booking-confirmation__ticket-wrapper')
    if (!element) return

    import('html2pdf.js').then((html2pdf) => {
      html2pdf.default().from(element).save('bokning.pdf')
    })
  }

  const [booking, setBooking] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const bookingRes = await fetch(`/api/bookings/${unwrappedParams.id}`)
        const bookingData = await bookingRes.json()

        setBooking(bookingData)
      } catch (error) {
        console.error('Error fetching data from API:', error)
      }
    }

    fetchData()
  }, [unwrappedParams.id])

  if (!booking) return <h1>Laddar sidan...</h1>

  return (
    <>
      <h1 className="booking-confirmation__title">Bokning genomförd!</h1>
      <a>Biljetten har skickats till din e-post adress.</a>
      <a>Nedan kan du välja om du vill skriva ut eller ladda ner biljetten</a>
      <div className="booking-confirmation__ticket-wrapper">
        <h1>Biljett</h1>
        <div className="booking-confirmation__ticket">
          <QrCodeGenerator id={unwrappedParams.id} />
          <ConfirmationDetails booking={booking} />
        </div>
      </div>
      <div className="booking-confirmation__actions">
        <button className="actions-print" onClick={() => window.print()}>
          Skriv ut
        </button>
        <button className="actions-download" onClick={handleDownloadPdf}>
          Ladda ner
        </button>
      </div>
    </>
  )
}
