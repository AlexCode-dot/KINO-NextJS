'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from '../styles/ShowtimesTabs.module.scss'

export default function ShowtimesTabs({ screenings }) {
  const dates = [...new Set(screenings.map((s) => s.date))]
  const [activeDate, setActiveDate] = useState(dates[0])

  return (
    <div className={styles.tabs}>
      {/* Date buttons */}
      <ul className={styles.tabList}>
        {dates.map((date) => (
          <li key={date}>
            <button className={activeDate === date ? styles.active : ''} onClick={() => setActiveDate(date)}>
              {date}
            </button>
          </li>
        ))}
      </ul>

      {/* Room sections for selected date */}
      <div className={styles.roomList}>
        {screenings
          .filter((s) => s.date === activeDate)
          .map(({ room, times }) => (
            <div key={room + activeDate} className={styles.roomCard}>
              <div className={styles.roomName}>{room}</div>
              <div className={styles.times}>
                {times.map(({ time, id }) => (
                  <Link key={id} href={`/booking/${id}`}>
                    <button className={styles.timeButton}>{time}</button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

ShowtimesTabs.propTypes = {
  screenings: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      times: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
}
