export async function fetchMovieFromOmdb(title) {
  const apiKey = process.env.OMDB_API_KEY
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch from OMDb')

  const data = await res.json()
  if (data.Response === 'False') throw new Error(data.Error || 'Movie not found')

  return data
}
