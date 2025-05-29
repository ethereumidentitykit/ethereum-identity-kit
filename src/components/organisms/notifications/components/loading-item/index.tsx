import React from 'react'
import LoadingCell from '../../../../atoms/loading-cell/LoadingCell'
import './index.css'

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
