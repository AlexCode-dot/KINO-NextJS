'use client'
import { useState, useEffect } from 'react'
import AdminRoomForm from '@/components/admin/AdminRoomForm'
import AdminScreeningForm from '@/components/admin/AdminScreeningForm'
import AdminMovieForm from '@/components/admin/AdminMovieForm'
import AdminList from '@/components/admin/AdminList'
import ErrorMessage from '@/components/ErrorMessage'
import ConfirmModal from '@/components/ConfirmModal'
import SuccessModal from '@/components/SuccessModal'
import { useAdminData } from '@/hooks/useAdminData'
import AdminTabNav from '@/components/admin/AdminTabNav'
import AdminRoomList from '@/components/admin/AdminRoomList'
import AdminBookingPanel from '@/components/admin/AdminBookingPanel'
import AdminCreateUser from '@/components/admin/AdminCreateUser'
import { jwtDecode } from 'jwt-decode'

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [checked, setChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('list')

  useEffect(() => {
    const cookies = document.cookie.split(';').map((c) => c.trim())
    const jwtCookie = cookies.find((c) => c.startsWith('JWT='))
    if (jwtCookie) {
      const token = jwtCookie.split('=')[1]
      try {
        const decoded = jwtDecode(token)
        setIsAdmin(decoded.admin)
      } catch (e) {
        setIsAdmin(false)
      }
    } else {
      setIsAdmin(false)
    }
    setChecked(true)
  }, [])

  const {
    movies,
    screenings,
    rooms,
    confirmDeleteMovie,
    confirmDeleteScreening,
    modal,
    closeModal,
    performDelete,
    handleAddScreening,
    handleAddMovie,
    movieError,
    setMovieError,
    screeningError,
    setScreeningError,
    deleteError,
    setDeleteError,
    successMessage,
    setSuccessMessage,
    handleAddRoom,
    roomError,
    setRoomError,
    confirmDeleteRoom,
    loading,
  } = useAdminData()

  if (!checked) {
    return <div>Laddar...</div>
  }

  if (!isAdmin) {
    return <h1>Du är inte admin!</h1>
  }

  return (
    <main className="admin-page">
      <div className="admin-page__container">
        <h1 className="admin-page__title">Adminpanel</h1>

        <AdminTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'list' && (
          <>
            <section className="admin-page__section">
              <h2 className="admin-page__section-title">Alla filmer</h2>
              <AdminList
                movies={movies}
                screenings={screenings}
                onDeleteMovie={confirmDeleteMovie}
                onDeleteScreening={confirmDeleteScreening}
                loading={loading}
              />
              <ErrorMessage message={deleteError} onClose={() => setDeleteError(null)} />
            </section>

            <section className="admin-page__section">
              <h3 className="admin-room__list-title">Alla salonger</h3>
              <AdminRoomList rooms={rooms} onDeleteRoom={confirmDeleteRoom} loading={loading} />
              <ErrorMessage message={roomError} onClose={() => setRoomError(null)} />
            </section>
          </>
        )}

        {activeTab === 'bookings' && (
          <section className="admin-page__section">
            <AdminBookingPanel />
          </section>
        )}

        {activeTab === 'import' && (
          <>
            <AdminMovieForm onSubmitMovie={handleAddMovie} movieError={movieError} setMovieError={setMovieError} />
            <section className="admin-page__section">
              <h2 className="admin-page__section-title">Alla filmer</h2>
              <AdminList
                movies={movies}
                screenings={screenings}
                onDeleteMovie={confirmDeleteMovie}
                onDeleteScreening={confirmDeleteScreening}
              />
              <ErrorMessage message={deleteError} onClose={() => setDeleteError(null)} />
            </section>
          </>
        )}

        {activeTab === 'screening' && (
          <>
            <AdminScreeningForm
              onSubmitScreening={handleAddScreening}
              movies={movies}
              rooms={rooms}
              screeningError={screeningError}
              setScreeningError={setScreeningError}
            />
            <section className="admin-page__section">
              <h2 className="admin-page__section-title">Alla filmer</h2>
              <AdminList
                movies={movies}
                screenings={screenings}
                onDeleteMovie={confirmDeleteMovie}
                onDeleteScreening={confirmDeleteScreening}
              />
              <ErrorMessage message={deleteError} onClose={() => setDeleteError(null)} />
            </section>
          </>
        )}

        {activeTab === 'room' && (
          <>
            <section className="admin-page__section">
              <AdminRoomForm onSubmitRoom={handleAddRoom} />
            </section>

            <section className="admin-page__section">
              <h3 className="admin-room__list-title">Alla salonger</h3>
              <AdminRoomList rooms={rooms} onDeleteRoom={confirmDeleteRoom} />
              <ErrorMessage message={roomError} onClose={() => setRoomError(null)} />
            </section>
          </>
        )}
        {activeTab === 'user1' && (
          <>
            <section className="admin-page__section">
              <AdminCreateUser />
            </section>
          </>
        )}
      </div>

      {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}

      {modal && (
        <ConfirmModal
          message={
            modal.type === 'movie'
              ? `Vill du ta bort filmen "${modal.label}" samt alla tillhörande visningar och bokningar? Detta går inte att ångra.`
              : modal.type === 'screening'
                ? `Vill du ta bort visningen: "${modal.label}" samt alla tillhörande bokningar? Detta går inte att ångra.`
                : `Vill du ta bort salongen "${modal.label}" samt tillhörande visningar och bokningar? Detta går inte att ångra.`
          }
          onConfirm={performDelete}
          onCancel={closeModal}
        />
      )}
    </main>
  )
}
