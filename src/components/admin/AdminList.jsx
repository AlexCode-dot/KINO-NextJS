'use client'

import { useAdminList } from '@/hooks/useAdminList'
import { formatTime, formatDate, formatDateTime } from '@/lib/utils/formatDateTime'

export default function AdminList({ movies, screenings, onDeleteMovie, onDeleteScreening }) {
  const { isExpanded, toggle } = useAdminList()

  return (
    <ul className="admin-list">
      {movies.map((movie) => {
        const expanded = isExpanded(movie._id)
        const screeningsForMovie = screenings.filter(
          (screening) => String(screening.movie?._id || screening.movie) === String(movie._id)
        )

        return (
          <li key={movie._id} className="admin-list__movie">
            <div className="admin-list__movie-header">
              <button onClick={() => toggle(movie._id)} className="admin-list__toggle">
                {expanded ? '▼' : '▶'}
              </button>
              <strong className="admin-list__movie-title">{movie.title}</strong>
              <button onClick={() => onDeleteMovie(movie._id, movie.title)} className="admin-list__delete-button">
                Ta bort
              </button>
            </div>

            {expanded && (
              <ul className="admin-list__screenings">
                {screeningsForMovie.length > 0 ? (
                  screeningsForMovie.map((screening) => (
                    <li key={screening._id} className="admin-list__screening">
                      <span className="admin-list__screening-info">
                        {formatTime(screening.date)} – {formatTime(screening.endTime)} ({formatDate(screening.date)})
                        (Salong {screening.room})
                      </span>
                      <button
                        onClick={() =>
                          onDeleteScreening(screening._id, `${formatDateTime(screening.date)} – ${screening.room}`)
                        }
                        className="admin-list__delete-screening"
                      >
                        Ta bort
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="admin-list__screening-empty">Inga visningar</li>
                )}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
