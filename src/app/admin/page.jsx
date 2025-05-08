'use client'

import { useAdminData } from '@/hooks/useAdminData'
import AdminList from '@/components/admin/AdminList'
import ConfirmModal from '@/components/admin/ConfirmModal'
import AdminForm from '@/components/admin/AdminForm'

export default function AdminPage() {
  const {
    movies,
    screenings,
    confirmDeleteMovie,
    confirmDeleteScreening,
    modal,
    closeModal,
    performDelete,
    error,
    setError,
    handleAddScreening,
    handleAddMovie,
  } = useAdminData()

  const onSubmitMovie = async (formData) => {
    await handleAddMovie(formData)
  }

  const onSubmitScreening = async (formData) => {
    await handleAddScreening(formData)
  }

  if (process.env.NODE_ENV !== 'development') {
    return <p className="admin-page__locked">🔒 Endast tillgänglig i utvecklingsläge.</p>
  }

  return (
    <main className="admin-page">
      <div className="admin-page__container">
        <h1 className="admin-page__title">Adminpanel</h1>

        <AdminForm onSubmitMovie={onSubmitMovie} onSubmitScreening={onSubmitScreening} movies={movies} />

        <section className="admin-page__section">
          <h2 className="admin-page__section-title">Alla filmer</h2>
          <AdminList
            movies={movies}
            screenings={screenings}
            onDeleteMovie={confirmDeleteMovie}
            onDeleteScreening={confirmDeleteScreening}
          />
          {error && (
            <div className="admin-page__error">
              {error}
              <button onClick={() => setError(null)} className="admin-page__error-close">
                ✖
              </button>
            </div>
          )}
        </section>
      </div>

      {modal && (
        <ConfirmModal
          message={`Vill du ta bort ${modal.type === 'movie' ? 'filmen' : 'visningen'}: ${modal.label}?`}
          onConfirm={performDelete}
          onCancel={closeModal}
        />
      )}
    </main>
  )
}
