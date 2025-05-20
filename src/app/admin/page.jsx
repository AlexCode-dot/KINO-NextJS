'use client'

import { useState } from 'react'
import AdminScreeningForm from '@/components/admin/AdminScreeningForm'
import AdminMovieForm from '@/components/admin/AdminMovieForm'
import AdminList from '@/components/admin/AdminList'
import ErrorMessage from '@/components/ErrorMessage'
import ConfirmModal from '@/components/ConfirmModal'
import SuccessModal from '@/components/SuccessModal'
import { useAdminData } from '@/hooks/useAdminData'
import AdminTabNav from '@/components/admin/AdminTabNav'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('list')

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
  } = useAdminData()

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
              />
              <ErrorMessage message={deleteError} onClose={() => setDeleteError(null)} />
            </section>
          </>
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
      </div>

      {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}

      {modal && (
        <ConfirmModal
          message={
            modal.type === 'movie'
              ? `Vill du ta bort filmen "${modal.label}" och alla tillhörande visningar??`
              : modal.type === 'screening'
                ? `Vill du ta bort visningen: "${modal.label}"?`
                : `Vill du ta bort salongen "${modal.label}" och alla tillhörande visningar?`
          }
          onConfirm={performDelete}
          onCancel={closeModal}
        />
      )}
    </main>
  )
}
