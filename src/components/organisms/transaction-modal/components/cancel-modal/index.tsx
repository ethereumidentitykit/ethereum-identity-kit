import React from 'react'
import { Arrow } from '../../../../icons'
import './CancelModal.css'

export interface CancelModalProps {
  title: string
  description: string
  confirmButtonText: string
  onCancel: () => void
  onConfirm: () => void
}

const CancelModal: React.FC<CancelModalProps> = ({ onCancel, title, description, confirmButtonText, onConfirm }) => {
  return (
    <div
      className="cancel-modal-backdrop"
      onClick={(e) => {
        e.stopPropagation()
        onCancel()
      }}
    >
      <div className="cancel-modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="cancel-modal-title">{title}</h3>
        <p className="cancel-modal-description">{description}</p>
        <div className="cancel-modal-footer">
          <button className="cancel-modal-cancel-button" onClick={onCancel}>
            <Arrow height={14} width={14} />
            <p>Go Back</p>
          </button>
          <button className="cancel-modal-confirm-button" onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelModal
