'use client'

import { useState } from 'react'
import AdminRoomModal from './AdminRoomModal'

export default function AdminRoomList({ rooms, onDeleteRoom, loading }) {
  const [selectedRoom, setSelectedRoom] = useState(null)

  if (loading) {
    return <p className="admin-page__loading">Laddar salonger...</p>
  }

  if (rooms.length === 0) {
    return <p className="admin-page__empty">Inga salonger tillgängliga</p>
  }

  return (
    <div className="admin-room__list">
      <ul>
        {rooms.map((room) => (
          <li key={room._id} className="admin-room__item">
            <button className="admin-room__name" onClick={() => setSelectedRoom(room)}>
              {room.name}
            </button>
            <button className="admin-room__delete" onClick={() => onDeleteRoom(room._id, room.name)}>
              Ta bort
            </button>
          </li>
        ))}
      </ul>
      {selectedRoom && <AdminRoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
    </div>
  )
}
