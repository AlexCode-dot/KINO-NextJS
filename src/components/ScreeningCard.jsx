'use client'

import { useState, useEffect } from 'react'

export default function ScreeningCards() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchUpcomingScreenings() {
      try {
        const res = await fetch('/api/screenings/upcoming', {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Kunde inte hämta de kommande filmvisningarna')
        const screenings = await res.json()
        setData(screenings)
      } catch (error) {
        console.error('Fel vid hämtning av kommande filmvisningar')
        setData([])
      }
    }
    fetchUpcomingScreenings()
  }, [])

  return (
    <div className="screeningcard__outerdiv">
      <ul className="screeningcard__list">
        {data.map((item) => (
          <li key={item._id}>
            <a href={`/booking/${item._id}`}>
              <div className="screeningcard__container">
                <p>{item.movie?.title}</p>
                <p>{`Salong ${item.room.name}`}</p>
                <p>{new Date(item.date).toLocaleDateString('sv-SE')}</p>
                <p>{new Date(item.date).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
