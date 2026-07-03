import "./ConfirmationModal.css";

export default function ConfirmationModal({
  open,
  title,
  message,
  email,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>{title}</h2>

        <p>{message}</p>

        {email && (
          <div className="modal-email">
            {email}
          </div>
        )}

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}