import { useAccount } from 'wagmi'
import React, { LegacyRef } from 'react'

import { useOutsideClick, useNotifications } from '../../hooks'
import Bell from '../icons/ui/Bell'
import NotificationItemLoading from './components/NotificationItemLoading'
import NotificationItem, { NotificationItemAction } from './components/NotificationItem'
import { NotificationItemType } from '../../types'
import type { NotificationsProps } from './Notifications.types'
import './Notifications.css'

const Notifications: React.FC<NotificationsProps> = ({ addressOrName, onClose }) => {
  const { address: userAddress } = useAccount()
  const { notifications, isLoading, isOpen, setIsOpen, newNotifications } = useNotifications(addressOrName)
  const clickAwayRef = useOutsideClick(() => {
    setIsOpen(false)
    onClose?.()
  })

  if (!userAddress) return null

  return (
    <div className='notifications-container' ref={clickAwayRef as LegacyRef<HTMLDivElement>}>
      <div className='notifications-bell' onClick={() => setIsOpen(!isOpen)}>
        <Bell className={isOpen ? 'notifications-bell-selected' : ''} />
        {newNotifications > 0 && (
          <span className='notifications-badge'>
            {newNotifications}
          </span>
        )}
        <div className='notifications-tooltip'>
          <p className='notifications-tooltip-text'>
            Notifications
          </p>
        </div>
      </div>
      <div className={`notifications-dropdown ${isOpen ? 'visible' : ''}`}>
        <div className='notifications-dropdown-content'>
          {notifications?.map((item, index) =>
            Object.entries(item.notifications).map(([key, value]) => {
              if (!value) return null

              if (key === 'tag' || key === 'untag') {
                const notificationsToDisplay = Object.values(
                  value.reduce(
                    (acc, notification) => {
                      acc[notification.tag] = [...(acc[notification.tag] || []), notification]
                      return acc
                    },
                    {} as Record<string, NotificationItemType[]>
                  )
                )

                return notificationsToDisplay.map((notification, i) => (
                  <NotificationItem
                    key={`${index}-${i}-${key}`}
                    isNew={item.isNew}
                    notifications={notification}
                    action={key as NotificationItemAction}
                    onClose={() => {
                      setIsOpen(false)
                      onClose?.()
                    }}
                  />
                ))
              }

              return (
                <NotificationItem
                  key={`${index}-${key}`}
                  isNew={item.isNew}
                  notifications={value}
                  action={key as NotificationItemAction}
                  onClose={() => {
                    setIsOpen(false)
                    onClose?.()
                  }}
                />
              )
            })
          )}
          {isLoading && new Array(5).fill(null).map((_, index) => <NotificationItemLoading key={index} />)}
          {!isLoading && notifications?.flatMap((item) => Object.values(item.notifications).flat()).length === 0 && (
            <div className='notifications-empty'>
              <p className='notifications-empty-text'>No notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications 