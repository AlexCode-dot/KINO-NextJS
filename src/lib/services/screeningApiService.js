export async function fetchScreenings() {
  const res = await fetch('/api/screenings')
  if (!res.ok) throw new Error('Kunde inte hämta visningar.')
  return res.json()
}

export async function addScreening(formData) {
  const res = await fetch('/api/screenings', {
    method: 'POST',
    body: formData,
  })

  let data
  try {
    data = await res.json()
  } catch (err) {
    throw new Error('Servern svarade inte med giltig JSON.')
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Något gick fel vid skapandet av visningen.')
  }

  return data
}

export async function deleteScreening(id) {
  const res = await fetch(`/api/screenings/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Kunde inte ta bort visningen.')
}

export async function fetchScreeningDetails(id) {
  const res = await fetch(`/api/screenings/${id}/details`)
  if (!res.ok) throw new Error('Kunde inte hämta screening info.')
  return res.json()
}
