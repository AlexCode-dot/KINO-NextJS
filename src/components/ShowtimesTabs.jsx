'use client' //Client component to show and change date/time

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ShowtimesTabs.module.scss'

export default function ShowtimesTabs({ screenings }) {
  const [activeDate, setActiveDate] = useState(screenings[0]?.date)

  return (
    <div className={styles.tabs}>
      {/*Date-btns*/}
      <ul className={styles.tabList}>
        {screenings.map(({ date }) => (
          <li key={date}>
            <button className={activeDate === date ? styles.active : ''} onClick={() => setActiveDate(date)}>
              {date}
            </button>
          </li>
        ))}
      </ul>

      {/*Room & time for chosen date*/}
      <div className={styles.roomList}>
        {screenings
          .filter((s) => s.date === activeDate)
          .map(({ room, times }) => (
            <div key={room} className={styles.roomCard}>
              <div className={styles.roomName}>Salong {room}</div>
              <div className={styles.times}>
                {times.map((time) => (
                  <button key={time} className={styles.timeButton}>
                    {time}
                  </button>
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
      room: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      times: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
}
