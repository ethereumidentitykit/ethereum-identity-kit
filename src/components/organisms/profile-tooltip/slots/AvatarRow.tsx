import React from 'react'
import { ProfileTooltipAvatar } from './Avatar'
import { ProfileTooltipFollowButton } from './FollowButton'

export const ProfileTooltipAvatarRow: React.FC = () => (
  <div className="tooltip-avatar-container">
    <ProfileTooltipAvatar />
    <ProfileTooltipFollowButton />
  </div>
)

ProfileTooltipAvatarRow.displayName = 'ProfileTooltipCard.AvatarRow'
