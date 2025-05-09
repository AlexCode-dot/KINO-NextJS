'use client'

export default function ErrorMessage({ message, onClose }) {
  if (!message) return null

  return (
    <div className="admin-page__error">
      {message}
      <button onClick={onClose} className="admin-page__error-close">
        ✖
      </button>
    </div>
  )
}
