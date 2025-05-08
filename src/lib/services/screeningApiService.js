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
