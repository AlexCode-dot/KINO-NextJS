export default function ConfirmationDetails({ booking }) {
  const date = new Date(booking.screeningTime)
  const formatedDate = date.toLocaleString('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const formatedTime = date.toLocaleString('sv-Se', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <>
      <div className="confirmationDetails__booking-info">
        <span>
          <strong>Namn:</strong> {booking.name}
        </span>
        <span>
          <strong>Film:</strong> {booking.movieTitle}
        </span>
        <span>
          <strong>Kostnad:</strong> {booking.seats.length * 149} kr
        </span>
        <span>
          <strong>Datum:</strong> {formatedDate}
        </span>
        <span>
          <strong>Tid:</strong> kl:{formatedTime}
        </span>
        <span>
          <strong>Salong:</strong> {booking.roomName}
        </span>
      </div>
      <div className="confirmationDetails__seat-info">
        <div className="confirmationDetails__seat-info">
          {booking.seats &&
            Object.entries(
              booking.seats.reduce((grouped, seat) => {
                const { row, seat: seatNumber } = seat
                if (!grouped[row]) {
                  grouped[row] = []
                }
                grouped[row].push(seatNumber)
                return grouped
              }, {})
            ).map(([row, seatNumbers]) => (
              <div key={row} className="confirmationDetails__seats">
                <p>
                  <strong>Rad:</strong> {row}
                </p>
                <p>
                  <strong>Plats:</strong> {seatNumbers.join(', ')}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
