import React from 'react'
import './NotificationItemLoading.css'
import LoadingCell from '../../loading-cell/LoadingCell'

const NotificationItemLoading: React.FC = () => {
  return (
    <div className="notification-item-loading">
      <div className="notification-item-loading-header">
        <LoadingCell height="40px" width="40px" radius="50%" />
        <div className="notification-item-loading-content">
          <LoadingCell height="32px" width="32px" radius="40px" />
          <LoadingCell height="16px" width="200px" radius="4px" />
        </div>
      </div>
    </div>
  )
}

export default NotificationItemLoading
