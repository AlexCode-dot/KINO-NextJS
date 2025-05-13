'use client'

export default function SuccessModal({ message, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button onClick={onClose} className="modal__button modal__button--confirm-green">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
