'use client'

import { useAdminBookings } from '@/hooks/useAdminBookings'
import AdminBookingFilters from './AdminBookingFilters'
import AdminBookingList from './AdminBookingList'
import AdminBookingModal from './AdminBookingModal'
import ConfirmModal from '@/components/ConfirmModal'
import SuccessModal from '@/components/SuccessModal'
import ErrorMessage from '@/components/ErrorMessage'

export default function AdminBookingPanel() {
  const {
    filtered,
    selectedBooking,
    isEditing,
    modal,
    successMessage,
    errorMessage,
    filters,
    setFilters,
    movieOptions,
    roomOptions,
    resetFilters,
    confirmDeleteBooking,
    setModal,
    setSuccessMessage,
    setErrorMessage,
    showSeatMap,
    setSelectedBooking,
    toggleEditMode,
    handleSaveBooking,
    setIsEditing,
  } = useAdminBookings()

  return (
    <div className="admin-bookings">
      <h2 className="admin-page__section-title">Alla bokningar</h2>

      <AdminBookingFilters
        filters={filters}
        setFilters={setFilters}
        movieOptions={movieOptions}
        roomOptions={roomOptions}
        resetFilters={resetFilters}
      />

      {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />}

      <AdminBookingList bookings={filtered} onShow={showSeatMap} onDelete={confirmDeleteBooking} />

      {selectedBooking && (
        <AdminBookingModal
          booking={selectedBooking}
          isEditing={isEditing}
          toggleEditMode={toggleEditMode}
          setSelectedBooking={setSelectedBooking}
          onSave={handleSaveBooking}
          onClose={() => {
            setSelectedBooking(null)
            setIsEditing(false)
          }}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

      {modal && <ConfirmModal message={modal.message} onConfirm={modal.onConfirm} onCancel={() => setModal(null)} />}

      {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}
    </div>
  )
}
