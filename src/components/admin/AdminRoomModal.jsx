'use client'

export default function AdminRoomModal({ room, onClose }) {
  return (
    <div className="admin-room__modal-backdrop">
      <div className="admin-room__modal">
        <button className="admin-room__modal-close" onClick={onClose}>
          ✕
        </button>
        <h3 className="admin-room__modal-title">Salong {room.name}</h3>
        <div className="admin-room__modal-screen">Duken är här</div>
        {room.rows.map((row) => (
          <div key={row.rowNumber} className="admin-room__seat-preview-row">
            {Array.from({ length: row.seats }, (_, seatIndex) => {
              const seatNumber = seatIndex + 1
              const isWheelchairSeat = room.wheelchairSeats?.some(
                (wheelchairSeat) => wheelchairSeat.row === row.rowNumber && wheelchairSeat.seat === seatNumber
              )
              return (
                <span
                  key={seatNumber}
                  className={`admin-room__seat-preview${
                    isWheelchairSeat ? ' admin-room__seat-preview--wheelchair' : ''
                  }`}
                >
                  {isWheelchairSeat ? '♿' : seatNumber}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
