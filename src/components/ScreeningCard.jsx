'use client'

import { useState, useEffect } from 'react'

const mockScreeningData = [
  {
    id: 384,
    Title: 'The Muppets',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt1204342',
  },
  {
    id: 385,
    Title: 'Fire Walk With Me',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt0105665',
  },
  {
    id: 386,
    Title: 'Min granne Totoro',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '21:00:00',
    imdbID: 'tt0096283',
  },
  {
    id: 387,
    Title: 'Forrest Gump',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt0109830',
  },
  {
    id: 389,
    Title: 'Encanto',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt2953050',
  },
  {
    id: 392,
    Title: 'Training Day',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt0139654',
  },
  {
    id: 395,
    Title: 'The Shawshank Redemption',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt0111161',
  },
  {
    id: 397,
    Title: 'Isle of Dogs',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt5104604',
  },
  {
    id: 388,
    Title: 'Forrest Gump',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '19:00:00',
    imdbID: 'tt0109830',
  },
  {
    id: 401,
    Title: 'The Shawshank Redemption',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '21:00:00',
    imdbID: 'tt0111161',
  },
  {
    id: 399,
    Title: 'Isle of Dogs',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt5104604',
  },
  {
    id: 398,
    Title: 'The Muppets',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '19:00:00',
    imdbID: 'tt1204342',
  },
  {
    id: 390,
    Title: 'Min granne Totoro',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '17:00:00',
    imdbID: 'tt0096283',
  },
  {
    id: 404,
    Title: 'Encanto',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '21:00:00',
    imdbID: 'tt2953050',
  },
  {
    id: 408,
    Title: 'Forrest Gump',
    Room: 'Stora salongen',
    Date: '2025-05-14',
    Time: '12:00:00',
    imdbID: 'tt0109830',
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
    <div className="screeningcard__outerdiv">
      <ul className="screeningcard__list">
        {filteredScreenings.map((item, index) => (
          <li key={item.id}>
            <div className="screeningcard__container">
              <p>{item.Title}</p>
              <p>{item.Room}</p>
              <p>{item.Date}</p>
              <p>{item.Time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
