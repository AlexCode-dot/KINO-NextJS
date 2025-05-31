import React from 'react'

export default function SeatMap({ screening, selectedSeats, onSelect, nrOfTickets }) {
  const isSeatBooked = (rowNumber, seatNumber) =>
    screening.bookedSeats.some((seat) => seat.row === rowNumber && seat.seat === seatNumber)

  const isSeatWheelchair = (rowNumber, seatNumber) =>
    screening.room.wheelchairSeats.some((seat) => seat.row === rowNumber && seat.seat === seatNumber)

  const toggleSeatSelection = (rowNumber, seatNumber) => {
    if (isSeatBooked(rowNumber, seatNumber)) return

    const isAlreadySelected = selectedSeats.some((seat) => seat.row === rowNumber && seat.seat === seatNumber)

    if (isAlreadySelected) {
      const updatedSelection = selectedSeats.filter((seat) => !(seat.row === rowNumber && seat.seat === seatNumber))
      onSelect?.(updatedSelection)
      return
    }

    if (selectedSeats.length < nrOfTickets) {
      const updatedSelection = [...selectedSeats, { row: rowNumber, seat: seatNumber }]
      onSelect?.(updatedSelection)
    }
  }

  const groupedSeats = Object.entries(
    selectedSeats.reduce((acc, seat) => {
      acc[seat.row] = acc[seat.row] || []
      acc[seat.row].push(seat.seat)
      return acc
    }, {})
  ).sort(([a], [b]) => Number(a) - Number(b))

  return (
    <div className="seat-map-container">
      <h3 className="seat-map-container__title">Välj sittplatser</h3>

      <div className="seat-map">
        <div className="seat-map__screen-text">DUK</div>
        <div className="seat-map__screen-line" />

        {screening.room.rows.map((row) => (
          <div className="seat-map__row" key={row.rowNumber}>
            {Array.from({ length: row.seats }, (_, i) => {
              const seatNumber = i + 1
              const booked = isSeatBooked(row.rowNumber, seatNumber)
              const selected = selectedSeats.some((seat) => seat.row === row.rowNumber && seat.seat === seatNumber)
              const wheelchair = isSeatWheelchair(row.rowNumber, seatNumber)

              return (
                <button
                  key={`${row.rowNumber}-${seatNumber}`}
                  className={`seat-map__seat 
                    ${booked ? 'seat--booked' : ''}
                    ${selected ? 'seat--selected' : ''}
                    ${wheelchair ? 'seat--wheelchair' : ''}`}
                  disabled={booked}
                  onClick={() => toggleSeatSelection(row.rowNumber, seatNumber)}
                  title={`Rad ${row.rowNumber}, Plats ${seatNumber}`}
                >
                  {booked ? '✕' : ''}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="seat-map-container__footer">
        <div className="seat-map-container__footer-title">Valda platser:</div>
        <div className="seat-map-container__footer-list">
          {groupedSeats.length === 0 ? (
            <div>Inga platser valda</div>
          ) : (
            groupedSeats.map(([row, seats]) => (
              <div key={row}>
                Rad {row}: Plats {seats.sort((a, b) => a - b).join(', ')}
              </div>
            ))
          )}
        </div>

        {selectedSeats.length > 0 && (
          <button className="seat-map-container__clear-button" onClick={() => onSelect([])}>
            Rensa val
          </button>
        )}
      </div>
    </div>
  )
}
