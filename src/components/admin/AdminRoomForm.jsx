'use client'

import { useState } from 'react'

export default function AdminRoomForm({ onSubmitRoom }) {
  const [name, setName] = useState('')
  const [rows, setRows] = useState([{ rowNumber: 1, seats: 5 }])
  const [wheelchairSeats, setWheelchairSeats] = useState([])

  const handleAddRow = () => {
    setRows([...rows, { rowNumber: rows.length + 1, seats: 5 }])
  }

  const handleSeatChange = (rowIndex, newValue) => {
    const parsedValue = parseInt(newValue, 10)
    if (isNaN(parsedValue) || parsedValue <= 0) return

    const updatedRows = [...rows]
    updatedRows[rowIndex].seats = parsedValue
    setRows(updatedRows)
  }

  const handleRemoveRow = (rowIndex) => {
    if (rows.length <= 1) return

    const updatedRows = [...rows]
    updatedRows.splice(rowIndex, 1)

    const renumberedRows = updatedRows.map((rowData, index) => ({
      ...rowData,
      rowNumber: index + 1,
    }))
    setRows(renumberedRows)

    setWheelchairSeats(wheelchairSeats.filter((seatInfo) => seatInfo.row !== rowIndex + 1))
  }

  const toggleWheelchairSeat = (row, seat) => {
    const seatExists = wheelchairSeats.find((seatInfo) => seatInfo.row === row && seatInfo.seat === seat)

    if (seatExists) {
      setWheelchairSeats(wheelchairSeats.filter((seatInfo) => !(seatInfo.row === row && seatInfo.seat === seat)))
    } else {
      setWheelchairSeats([...wheelchairSeats, { row, seat }])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmitRoom({ name, rows, wheelchairSeats })

    setName('')
    setRows([{ rowNumber: 1, seats: 5 }])
    setWheelchairSeats([])
  }

  return (
    <form onSubmit={handleSubmit} className="admin-page__form">
      <h2 className="admin-page__section-title">Skapa salong</h2>

      <input
        className="admin-page__input"
        placeholder="Room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="admin-page__screen">Duken är här</div>

      <div className="admin-page__seat-map--grid">
        <div className="admin-page__seat-map-labels">
          {rows.map((rowData) => (
            <div key={rowData.rowNumber} className="admin-page__seat-label-row">
              <span className="admin-page__seat-label">Rad {rowData.rowNumber}:</span>
            </div>
          ))}
        </div>

        <div className="admin-page__seat-map-scroll">
          {rows.map((rowData) => (
            <div key={rowData.rowNumber} className="admin-page__seat-buttons">
              {Array.from({ length: rowData.seats }).map((_, seatIndex) => {
                const seatNumber = seatIndex + 1
                const isWheelchairSeat = wheelchairSeats.some(
                  (seatInfo) => seatInfo.row === rowData.rowNumber && seatInfo.seat === seatNumber
                )

                return (
                  <button
                    type="button"
                    key={seatNumber}
                    onClick={() => toggleWheelchairSeat(rowData.rowNumber, seatNumber)}
                    className={`admin-page__seat ${isWheelchairSeat ? 'wheelchair' : ''}`}
                    title={`Rad ${rowData.rowNumber}, Säte ${seatNumber}`}
                  >
                    <span>{seatNumber}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="admin-page__seat-map-controls">
          {rows.map((rowData, rowIndex) => (
            <div key={rowData.rowNumber} className="admin-page__seat-controls">
              <button
                type="button"
                onClick={() => handleSeatChange(rowIndex, rowData.seats - 1)}
                className="admin-page__counter-btn"
                disabled={rowData.seats <= 1}
              >
                −
              </button>
              <input
                type="number"
                value={rowData.seats}
                min="1"
                onChange={(e) => handleSeatChange(rowIndex, e.target.value)}
                className="admin-page__seat-count"
              />
              <button
                type="button"
                onClick={() => handleSeatChange(rowIndex, rowData.seats + 1)}
                className="admin-page__counter-btn"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleRemoveRow(rowIndex)}
                className="admin-page__remove-btn"
                disabled={rows.length <= 1}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-room__add-row-container">
        <button type="button" onClick={handleAddRow} className="admin-room__add-row-button">
          Lägg till stolsrad
        </button>
      </div>

      <p className="admin-page__total">Totalt antal säten: {rows.reduce((sum, rowData) => sum + rowData.seats, 0)}</p>
      <p className="admin-page__instruction">Klicka på säten för att markera rullstolsplatser</p>

      <button type="submit" className="admin-page__button">
        Spara salong
      </button>
    </form>
  )
}
