import { useAccount } from 'wagmi'
import React, { LegacyRef } from 'react'

import { useOutsideClick, useNotifications } from '../../hooks'
import Bell from '../icons/ui/Bell'
import { NotificationItemType } from '../../types'
import NotificationItemLoading from './components/NotificationItemLoading'
import NotificationItem, { NotificationItemAction } from './components/NotificationItem'
import type { NotificationsProps } from './Notifications.types'
import './Notifications.css'
import clsx from 'clsx'

const centerVertical = ['left', 'right']

const Notifications: React.FC<NotificationsProps> = ({ addressOrName, position = 'top', align = 'right', onClose }) => {
  const { address: userAddress } = useAccount()
  const { notifications, isLoading, isOpen, setIsOpen, newNotifications } = useNotifications(addressOrName)
  const clickAwayRef = useOutsideClick(() => {
    setIsOpen(false)
    onClose?.()
  })

  const alignTooltip = position === 'right' || position === 'left' ? '' : align

  const isDropdownPositionHorizontal = position === 'right' || position === 'left'
  const alignDropdown =
    isDropdownPositionHorizontal && centerVertical.includes(align)
      ? 'bottom'
      : align === 'center' && centerVertical.includes(position)
        ? 'center-vertical'
        : align

  if (!userAddress) return null

  return (
    <div className="notifications-container" ref={clickAwayRef as LegacyRef<HTMLDivElement>}>
      <div className="notifications-bell" onClick={() => setIsOpen(!isOpen)}>
        <div className={clsx('notifications-bell-icon', isOpen && 'notifications-bell-selected')}>
          <Bell width={36} height={36} />
        </div>
        {newNotifications > 0 && <span className="notifications-badge">{newNotifications}</span>}
        <div className="notifications-tooltip" data-position={position} data-align={alignTooltip}>
          <p className="notifications-tooltip-text">Notifications</p>
        </div>
      </div>
      <div
        className={`notifications-dropdown ${isOpen ? 'visible' : ''}`}
        data-position={position}
        data-align={alignDropdown}
      >
        <div className="notifications-dropdown-content">
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
            <div className="notifications-empty">
              <p className="notifications-empty-text">No notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
