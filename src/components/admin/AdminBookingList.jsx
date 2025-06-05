'use client'

import { formatDateTime } from '@/lib/utils/formatDateTime'

export default function AdminBookingList({ bookings, onShow, onDelete, loading }) {
  if (loading) {
    return <p className="admin-page__loading">Laddar bokningar...</p>
  }

  if (bookings.length === 0) {
    return <p className="admin-bookings__no-results">Inga bokningar hittades.</p>
  }

  return (
    <ul className="admin-bookings__list">
      {bookings.map((booking) => (
        <li key={booking._id} className="admin-bookings__item">
          <strong>{booking.name || 'Okänd användare'}</strong> – {booking.movieTitle} (
          {formatDateTime(booking.screeningTime)})
          <div className="admin-bookings__created">Bokning skapades: {formatDateTime(booking.bookedAt)}</div>
          <div className="admin-bookings__buttons">
            <button onClick={() => onShow(booking)} className="admin-bookings__show-seats">
              Visa platser
            </button>
            <button onClick={() => onDelete(booking)} className="admin-bookings__delete">
              Ta bort
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
