import clsx from 'clsx'
import React, { LegacyRef } from 'react'
import { useOutsideClick, useNotifications } from '../../../hooks'
import { useTranslation } from '../../../context/TranslationContext'
import Bell from '../../icons/ui/Bell'
import NotificationItemLoading from './components/loading-item'
import NotificationItem, { NotificationItemAction } from './components/notification-item'
import { NotificationItemType } from '../../../types'
import type { NotificationsProps } from './Notifications.types'
import { NOTIFICATION_CENTER_VERTICAL } from '../../../constants'
import './Notifications.css'

/**
 * Notifications component
 *
 * @param addressOrName - the address or name of the user to display notifications for
 *
 * @param position - the position of the notifications bell
 *
 * @param align - the alignment of the notifications bell
 *
 * @param darkMode - whether the dark mode is enabled
 *
 * @param onProfileClick - the function to call when a profile is clicked
 *
 */
const Notifications: React.FC<NotificationsProps> = ({
  addressOrName,
  position = 'top',
  align = 'right',
  darkMode = false,
  onProfileClick,
}) => {
  const { t } = useTranslation()
  const { notifications, isLoading, isOpen, setIsOpen, newNotifications } = useNotifications(addressOrName)
  const clickAwayRef = useOutsideClick(() => {
    setIsOpen(false)
  })

  const alignTooltip = position === 'right' || position === 'left' ? '' : align

  const isDropdownPositionHorizontal = position === 'right' || position === 'left'
  const alignDropdown =
    isDropdownPositionHorizontal && NOTIFICATION_CENTER_VERTICAL.includes(align)
      ? 'bottom'
      : align === 'center' && NOTIFICATION_CENTER_VERTICAL.includes(position)
        ? 'center-vertical'
        : align

  if (!addressOrName) return null

  return (
    <div
      className={clsx('notifications-container', darkMode && 'dark')}
      ref={clickAwayRef as LegacyRef<HTMLDivElement>}
    >
      <div className="notifications-bell" onClick={() => setIsOpen(!isOpen)}>
        <div className={clsx('notifications-bell-icon', isOpen && 'notifications-bell-selected')}>
          <Bell width={36} height={36} />
          {newNotifications > 0 && <span className="notifications-badge">{newNotifications}</span>}
        </div>
        <div className="notifications-tooltip" data-position={position} data-align={alignTooltip}>
          <p className="notifications-tooltip-text">{t('notifications.title')}</p>
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
                    onProfileClick={onProfileClick}
                    onClose={() => {
                      setIsOpen(false)
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
                  onProfileClick={onProfileClick}
                  onClose={() => {
                    setIsOpen(false)
                  }}
                />
              )
            })
          )}
          {isLoading && new Array(5).fill(null).map((_, index) => <NotificationItemLoading key={index} />)}
          {!isLoading && notifications?.flatMap((item) => Object.values(item.notifications).flat()).length === 0 && (
            <div className="notifications-empty">
              <p className="notifications-empty-text">{t('notifications.noNotifications')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
