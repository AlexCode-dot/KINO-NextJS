'use client'

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <div className="modal__actions">
          <button onClick={onConfirm} className="modal__button modal__button--confirm">
            Ja
          </button>
          <button onClick={onCancel} className="modal__button modal__button--cancel">
            Nej
          </button>
        </div>
      </div>
    </div>
  )
}
