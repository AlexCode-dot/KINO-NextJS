export async function fetchBookings() {
  const res = await fetch('/api/bookings', { method: 'GET', credentials: 'include' })
  if (!res.ok) throw new Error('Kunde inte hämta bokningar.')
  return await res.json()
}

export async function deleteBookingById(id) {
  const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE', credentials: 'include' })
  return { success: res.ok }
}

export async function updateBookingSeats(id, seats) {
  const res = await fetch(`/api/bookings/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seats }),
  })
  if (!res.ok) throw new Error('Kunde inte uppdatera bokningen.')
  return await res.json()
}
