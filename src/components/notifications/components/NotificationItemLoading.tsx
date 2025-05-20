import React from 'react'
import './NotificationItemLoading.css'

const NotificationItemLoading: React.FC = () => {
  return (
    <div className='notification-item-loading'>
      <div className='notification-item-loading-header'>
        <div className='notification-item-loading-avatar' />
        <div className='notification-item-loading-content'>
          <div className='notification-item-loading-title' />
          <div className='notification-item-loading-description' />
        </div>
      </div>
    </div>
  )
}

export default NotificationItemLoading 