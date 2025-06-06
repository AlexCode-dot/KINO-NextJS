export async function fetchMovies() {
  const res = await fetch('/api/movies')
  if (!res.ok) throw new Error('Kunde inte hämta filmer.')
  return res.json()
}

export async function addMovie(formData) {
  const res = await fetch('/api/movies', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  let data
  try {
    data = await res.json()
  } catch {
    throw new Error('Servern svarade inte med giltig JSON.')
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Något gick fel vid skapandet av filmen.')
  }

  return data
}

export async function deleteMovie(id) {
  const res = await fetch(`/api/movies/${id}`, { method: 'DELETE', credentials: 'include' })
  if (!res.ok) throw new Error('Kunde inte ta bort filmen.')
}
