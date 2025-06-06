export async function addRoom(roomData) {
  const res = await fetch('/api/rooms', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
  })

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error || 'Kunde inte skapa salong')
  }

  return await res.json()
}

export async function fetchRooms() {
  const res = await fetch('/api/rooms')
  if (!res.ok) throw new Error('Kunde inte ladda salonger')
  return await res.json()
}

export async function deleteRoom(id) {
  const res = await fetch(`/api/rooms/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error || 'Kunde inte ta bort salongen')
  }

  return await res.json()
}
