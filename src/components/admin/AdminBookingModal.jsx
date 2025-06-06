'use client'

import SeatMap from '@/components/booking/SeatMap'
import ErrorMessage from '@/components/ErrorMessage'

export default function AdminBookingModal({
  booking,
  isEditing,
  toggleEditMode,
  setSelectedBooking,
  onSave,
  onClose,
  errorMessage,
  setErrorMessage,
}) {
  return (
    <div className="admin-room__modal-backdrop">
      <div className="admin-room__modal">
        <button onClick={onClose} className="admin-room__modal-close">
          ×
        </button>

        <h3 className="admin-room__movie-modal-title">{booking.movieTitle}</h3>
        <h3 className="admin-room__main-modal-title">Salong {booking.room.name}</h3>

        <div className="admin-room__modal-selected-seats">
          Bokade platser för: {booking.name}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(
              booking.seats.reduce((acc, seat) => {
                const row = seat.row
                const seatNum = seat.seat
                if (!acc[row]) acc[row] = []
                acc[row].push(seatNum)
                return acc
              }, {})
            ).map(([row, seatNumbers]) => (
              <div key={row}>
                Rad {row}: Plats {seatNumbers.sort((a, b) => a - b).join(', ')}
              </div>
            ))}
          </ul>
        </div>

        <button onClick={toggleEditMode} className="admin-bookings__edit">
          {isEditing ? 'Avbryt redigering' : 'Redigera platser'}
        </button>

        {isEditing && (
          <button onClick={onSave} className="admin-bookings__save">
            Spara ändringar
          </button>
        )}

        {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

        <SeatMap
          screening={booking}
          selectedSeats={booking.seats}
          onSelect={
            isEditing
              ? (newSelectedSeats) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    seats: newSelectedSeats,
                  }))
              : () => setErrorMessage('Du måste klicka på "Redigera platser" innan du kan göra ändringar.')
          }
        />
      </div>
    </div>
  )
}
