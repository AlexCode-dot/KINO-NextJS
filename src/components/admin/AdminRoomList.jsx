'use client'

import { useState } from 'react'
import AdminRoomModal from './AdminRoomModal'

export default function AdminRoomList({ rooms, onDeleteRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(null)

  return (
    <div className="admin-room__list">
      <h3 className="admin-room__list-title">Alla salonger</h3>
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
