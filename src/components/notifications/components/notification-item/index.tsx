import React from 'react'
import clsx from 'clsx'
import { formatTimeDiff, truncateAddress } from '../../../../utils'
import { Cross, FollowIcon, Mute, Tag } from '../../../icons'
import { Address, NotificationItemType } from '../../../../types'
import Avatar from '../../../avatar/Avatar'
import './index.css'

export type NotificationItemAction = 'follow' | 'unfollow' | 'tag' | 'untag' | 'block' | 'unblock' | 'mute' | 'unmute'

interface NotificationItemProps {
  action: NotificationItemAction
  notifications: NotificationItemType[]
  isNew: boolean
  onClose: () => void
  onProfileClick?: (address: Address) => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notifications,
  action,
  isNew,
  onClose,
  onProfileClick,
}) => {
  if (!notifications[0]) return null

  const timeDiff = (new Date().getTime() - new Date(notifications[0].updated_at).getTime()) / 1000

  const Icon = {
    follow: FollowIcon,
    unfollow: FollowIcon,
    tag: Tag,
    untag: Tag,
    block: Cross,
    unblock: Cross,
    mute: Mute,
    unmute: Mute,
  }[action]

  const actionText = {
    follow: 'followed you',
    unfollow: 'unfollowed you',
    tag: 'tagged you with',
    untag: 'untagged you with',
    block: 'blocked you',
    unblock: 'unblocked you',
    mute: 'muted you',
    unmute: 'unmuted you',
  }[action]

  // groups the notifications by address
  const groupedNotifications = Object.values(
    notifications.reduce(
      (acc, notification) => {
        acc[notification.address] = [...(acc[notification.address] || [notification])]
        return acc
      },
      {} as Record<string, NotificationItemType[]>
    )
  )
    .flat()
    .sort((a, b) =>
      // sort by avatar                                         // sort by name
      a.avatar && b.avatar ? 1 : a.avatar ? -1 : b.avatar ? 1 : a.name && b.name ? 1 : a.name ? -1 : b.name ? 1 : -1
    )

  const displayedAvatars = groupedNotifications.slice(0, 3)
  const displayedNames = groupedNotifications.slice(0, 2)

  return (
    <div className={clsx('notification-item', `notifications-${action}`, isNew && 'new')}>
      <div className="notification-item-content">
        <div
          className="notification-item-icon"
          style={{
            paddingLeft: action === 'follow' || action === 'unfollow' ? '3px' : '0px',
          }}
        >
          <Icon height={20} width={20} />
        </div>
        <div className="notification">
          <div className="notification-item-avatars">
            {displayedAvatars.map((profile, index) => (
              <Avatar
                key={`avatar-${profile.address}-${index}`}
                src={profile.avatar}
                name={profile.name || profile.address}
                style={{
                  width: '32px',
                  height: '32px',
                  transform: `translateX(-${index * 16}px)`,
                }}
                onClick={
                  onProfileClick
                    ? () => {
                        onProfileClick?.(profile.address)
                        onClose()
                      }
                    : undefined
                }
              />
            ))}
          </div>
          <div
            className="notification-item-description"
            style={{
              // transform: `translateX(${Math.min(0, (displayedAvatars.length - 1) * -16)}px)`,
              marginLeft: `${Math.min(0, (displayedAvatars.length - 1) * -16)}px`,
            }}
          >
            {displayedNames?.map((profile, index) => (
              <span key={`name-${profile.address}-${index}`}>
                <span
                  onClick={() => {
                    onProfileClick?.(profile.address)
                    onClose()
                  }}
                  className="cursor-pointer transition-all hover:underline hover:opacity-80"
                >
                  {`${profile.name || truncateAddress(profile.address)}`}
                </span>
                {`${groupedNotifications.length === 2 ? (index === 0 ? ' and ' : ' ') : groupedNotifications.length === 1 ? ' ' : ', '}`}
              </span>
            ))}
            {groupedNotifications.length > 2 &&
              `and ${groupedNotifications.length - 2} ${groupedNotifications.length - 2 > 1 ? 'others' : 'other'} `}
            {actionText}
            {(action === 'tag' || action === 'untag') && (
              <span className="text-text-neutral">{` ${groupedNotifications[0]?.tag}`}</span>
            )}
          </div>
        </div>
      </div>
      <p className="notification-item-time">{formatTimeDiff(timeDiff)}</p>
      {/* {isNew && <span className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 rounded-full" />} */}
    </div>
  )
}

export default NotificationItem
