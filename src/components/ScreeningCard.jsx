'use client'

import { useState, useEffect } from 'react'

const mockScreeningData = [
  {
    Title: 'The Muppets',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt1204342',
  },
  {
    Title: 'Fire Walk With Me',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt0105665',
  },
  {
    Title: 'Min granne Totoro',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '21:00:00',
    imdbID: 'tt0096283',
  },
  {
    Title: 'Forrest Gump',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt0109830',
  },
  {
    Title: 'Encanto',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt2953050',
  },
  {
    Title: 'Min granne Totoro',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt0096283',
  },
  {
    Title: 'Min granne Totoro',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '19:00:00',
    imdbID: 'tt0096283',
  },
  {
    Title: 'Training Day',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt0139654',
  },
  {
    Title: 'Forrest Gump',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt0109830',
  },
  {
    Title: 'Encanto',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '21:00:00',
    imdbID: 'tt2953050',
  },
  {
    Title: 'The Shawshank Redemption',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt0111161',
  },
  {
    Title: 'Forrest Gump',
    Room: 'Stora salongen',
    Date: '2025-10-14',
    Time: '21:00:00',
    imdbID: 'tt0109830',
  },
  {
    Title: 'Isle of Dogs',
    Room: 'Stora salongen',
    Date: '2025-10-14',
    Time: '12:00:00',
    imdbID: 'tt5104604',
  },
  {
    Title: 'The Muppets',
    Room: 'Stora salongen',
    Date: '2025-10-14',
    Time: '19:00:00',
    imdbID: 'tt1204342',
  },
]

export default function ScreeningCards() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  //Mock API-delay
  useEffect(() => {
    setTimeout(() => {
      setData(mockScreeningData)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const today = new Date('2025-05-10')
  const fiveDaysFromNow = new Date(today)
  fiveDaysFromNow.setDate(today.getDate() + 5)

  const filteredScreenings = data
    .filter((item) => {
      const screeningDate = new Date(item.Date)
      return screeningDate >= today && screeningDate <= fiveDaysFromNow
    })
    .sort((a, b) => new Date(a.Date) - new Date(b.Date))
    .slice(0, 10)

  return (
    <div>
      <ul className="screeningcard__list">
        {filteredScreenings.map((item, index) => (
          <li key={item.imdbID}>
            <div className="screeningcard__container">
              <p>{item.Title}</p>
              <p>{item.Room}</p>
              <p>{item.Time}</p>
              <p>{item.Date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
