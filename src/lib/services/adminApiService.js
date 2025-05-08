export async function deleteMovie(id) {
  const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Kunde inte ta bort filmen.')
}

export async function deleteScreening(id) {
  const res = await fetch(`/api/screenings/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Kunde inte ta bort visningen.')
}
