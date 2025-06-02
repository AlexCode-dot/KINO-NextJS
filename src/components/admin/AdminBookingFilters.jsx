'use client'

export default function AdminBookingFilters({ filters, setFilters, movieOptions, roomOptions, resetFilters }) {
  return (
    <div className="admin-bookings__topbar">
      <div className="admin-bookings__search-wrapper">
        <input
          type="text"
          placeholder="Sök efter användare eller film..."
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>

      <div className="admin-bookings__filters-row">
        <div className="admin-bookings__filter-group">
          <label>Bokningsdatum</label>
          <input
            type="date"
            value={filters.bookingDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, bookingDate: e.target.value }))}
          />
        </div>

        <div className="admin-bookings__filter-group">
          <label>Visningsdatum</label>
          <input
            type="date"
            value={filters.screeningDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, screeningDate: e.target.value }))}
          />
        </div>

        <div className="admin-bookings__filter-group">
          <label>Film</label>
          <select
            value={filters.selectedMovie}
            onChange={(e) => setFilters((prev) => ({ ...prev, selectedMovie: e.target.value }))}
          >
            <option value="">Alla filmer</option>
            {movieOptions.map((title) => (
              <option key={title}>{title}</option>
            ))}
          </select>
        </div>

        <div className="admin-bookings__filter-group">
          <label>Salong</label>
          <select
            value={filters.selectedRoom}
            onChange={(e) => setFilters((prev) => ({ ...prev, selectedRoom: e.target.value }))}
          >
            <option value="">Alla salonger</option>
            {roomOptions.map((room) => (
              <option key={room}>{room}</option>
            ))}
          </select>
        </div>

        <button className="admin-bookings__clear" onClick={resetFilters}>
          Rensa filter
        </button>
      </div>
    </div>
  )
}
