import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import ShowtimesTabs from './ShowtimesTabs'
import styles from '../styles/MovieDetailCard.module.scss'

//Mocked data, replace with review props
const mockReviews = [
  { id: 1, name: 'Alice', avatar: '/avatars/avatar.jpg', text: 'Kanonbra film, asfet hemsida för bokning' },
  {
    id: 2,
    name: 'Bengt',
    avatar: '/avatars/man.jpg',
    text: 'Frugan min, Gunilla ville titt på Dikapprio.... jo det va väl OK film',
  },
  { id: 3, name: 'Izza', avatar: '/avatars/cry.jpg', text: 'Filmen var bra, men renarna åt upp mina popcorn' },
  { id: 4, name: 'Sven', avatar: '/avatars/ren.jpg', text: 'Filmen sög, men snacksen var goda' },
]

export default function MovieDetailCard({ title, posterUrl, rating, description, screenings, reviews = mockReviews }) {
  return (
    <section className={styles.movieDetailCard}>
      {/*Tillb-btn*/}
      <header className={styles.header}>
        <Link href="/movies" className={styles.backBtn}>
          ← Tillbaka
        </Link>
      </header>

      {/*Headsection*/}
      <div className={styles.main}>
        <div className={styles.posterWrapper}>
          <img src={posterUrl} alt={`Poster för ${title}`} className={styles.poster} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.rating}>⭐ {rating.toFixed(1)} / 10</p>
          <p className={styles.description}>{description}</p>

          {/*Booking tickets*/}
          <div className={styles.booking}>
            <div className={styles['booking-header']}>Boka biljetter</div>
            <ShowtimesTabs screenings={screenings} />
          </div>
        </div>
      </div>

      {/*Reviews section*/}
      <div className={styles.reviews}>
        <h2>Recensioner</h2>
        <div className={styles.reviewList}>
          {reviews.map((r) => (
            <div key={r.id} className={styles.reviewCard}>
              <img src={r.avatar} alt={`Avatar för ${r.name}`} className={styles.avatar} />
              <p className={styles.reviewName}>{r.name}</p>

              <div className={styles.stars}>
                {
                  <div className={styles.stars}>
                    {'★'.repeat(4)}
                    {'☆'.repeat(5 - 4)}
                  </div>
                }
              </div>
              <p className={styles.text}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

MovieDetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  screenings: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      times: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      avatar: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}
