import React from 'react'
import clsx from 'clsx'
import { Cross, FollowIcon, Mute, Tag } from '../../../../icons'
import { Address, NotificationItemType } from '../../../../../types'
import { useTranslation } from '../../../../../context/TranslationContext'
import Avatar from '../../../../molecules/avatar/Avatar'
import './index.css'
import ProfileTooltip from '../../../profile-tooltip/ProfileTooltip'
import { beautifyEnsName, truncateAddress } from '../../../../../utils'
import { formatTimeDiff } from '../../../../../utils/formatters'

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
  const { t } = useTranslation()

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
    follow: t('notifications.follow'),
    unfollow: t('notifications.unfollow'),
    tag: t('notifications.tag'),
    untag: t('notifications.untag'),
    block: t('notifications.block'),
    unblock: t('notifications.unblock'),
    mute: t('notifications.mute'),
    unmute: t('notifications.unmute'),
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
              <ProfileTooltip
                key={`avatar-${profile.address}-${index}`}
                addressOrName={profile.address}
                onProfileClick={() => {
                  onProfileClick?.(profile.address)
                  onClose()
                }}
                showDelay={500}
                hideDelay={0}
                showBio={true}
                showSocials={true}
                showStatus={true}
                verticalPlacement="auto"
                horizontalPlacement="left"
                boundary="scrollParent"
                verticalOffset={4}
                horizontalOffset={-(index * 16 + 4)}
                showArrow={true}
                keepTooltipOnHover={false}
              >
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
              </ProfileTooltip>
            ))}
          </div>
          <div
            className="notification-item-description"
            style={{
              marginLeft: `${Math.min(0, (displayedAvatars.length - 1) * -16)}px`,
            }}
          >
            {displayedNames?.map((profile, index) => (
              <span key={`name-${profile.address}-${index}`}>
                <ProfileTooltip addressOrName={profile.address} inline={true}>
                  <span
                    onClick={() => {
                      onProfileClick?.(profile.address)
                      onClose()
                    }}
                    className="notification-item-description-name"
                  >
                    {profile.name ? beautifyEnsName(profile.name) : truncateAddress(profile.address)}
                  </span>
                </ProfileTooltip>
                {`${groupedNotifications.length === 2 ? (index === 0 ? ' and ' : ' ') : groupedNotifications.length === 1 ? ' ' : ', '}`}
              </span>
            ))}
            {groupedNotifications.length > 2 &&
              `${t('and')} ${groupedNotifications.length - 2} ${groupedNotifications.length - 2 > 1 ? t('others') : t('other')} `}
            {actionText}
            {(action === 'tag' || action === 'untag') && (
              <span className="text-text-neutral">{` ${groupedNotifications[0]?.tag}`}</span>
            )}
          </div>
        </div>
      </div>
      <p className="notification-item-time">{formatTimeDiff(timeDiff)}</p>
    </div>
  )
}

export default NotificationItem
