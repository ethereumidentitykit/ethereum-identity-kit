import clsx from 'clsx'
import React, { LegacyRef, useState } from 'react'
import { useOutsideClick, useNotifications } from '../../../hooks'
import { useTranslation } from '../../../context/TranslationContext'
import Bell from '../../icons/ui/Bell'
import NotificationItemLoading from './components/loading-item'
import NotificationItem, { NotificationItemAction } from './components/notification-item'
import { NotificationItemType } from '../../../types'
import type { NotificationsProps } from './Notifications.types'
import { NOTIFICATION_CENTER_VERTICAL } from '../../../constants'
import { ShortArrow } from '../../icons'
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
  const [page, setPage] = useState(1)
  const { t } = useTranslation()
  const { notifications, isLoading, isOpen, setIsOpen, newNotifications } = useNotifications(addressOrName)
  const clickAwayRef = useOutsideClick(() => {
    setIsOpen(false)
  })

  const allPages = Math.ceil(
    (notifications?.flatMap((item) => Object.values(item.notifications).filter((value) => !!value && value.length > 0))
      .length || 0) / 6
  )
  const displayedNotifications = notifications
    ?.flatMap((item) => Object.entries(item.notifications).filter(([, value]) => !!value && value.length > 0))
    .slice((page - 1) * 6, page * 6)

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
          {displayedNotifications?.map(([key, value], index) => {
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
                  isNew={false}
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
                isNew={false}
                notifications={value}
                action={key as NotificationItemAction}
                onProfileClick={onProfileClick}
                onClose={() => {
                  setIsOpen(false)
                }}
              />
            )
          })}
          {isLoading && !allPages && new Array(5).fill(null).map((_, index) => <NotificationItemLoading key={index} />)}
          {!isLoading && allPages === 0 && (
            <div className="notifications-empty">
              <p className="notifications-empty-text">{t('notifications.empty')}</p>
            </div>
          )}
          {allPages > 1 && (
            <div className="notifications-page-selector">
              <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                <ShortArrow style={{ transform: 'rotate(-90deg)', height: 16, width: 16 }} />
                <p>Previous</p>
              </button>
              <p>
                {page} / {allPages}
              </p>
              <button onClick={() => setPage(page + 1)} disabled={page === allPages}>
                <p>Next</p>
                <ShortArrow style={{ transform: 'rotate(90deg)', height: 16, width: 16 }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
