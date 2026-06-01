import React from 'react'
import { ProfileTooltipCardRoot } from './ProfileTooltipCardContext'
import {
  ProfileTooltipHeader,
  ProfileTooltipBody,
  ProfileTooltipAvatarRow,
  ProfileTooltipAvatar,
  ProfileTooltipFollowButton,
  ProfileTooltipName,
  ProfileTooltipStats,
  ProfileTooltipStatus,
  ProfileTooltipBio,
  ProfileTooltipSocials,
  ProfileTooltipGrails,
} from './slots'
import type { ProfileTooltipProps } from './ProfileTooltip.types'

const ProfileTooltipCardBase: React.FC<ProfileTooltipProps> = ({ includeGrails, ...props }) => (
  <ProfileTooltipCardRoot includeGrails={includeGrails} {...props}>
    <ProfileTooltipHeader />
    <ProfileTooltipBody>
      <ProfileTooltipAvatarRow />
      <ProfileTooltipName />
      <ProfileTooltipStats />
      <ProfileTooltipStatus />
      <ProfileTooltipBio />
      <ProfileTooltipSocials />
      {includeGrails ? <ProfileTooltipGrails /> : null}
    </ProfileTooltipBody>
  </ProfileTooltipCardRoot>
)

const ProfileTooltipCard = Object.assign(ProfileTooltipCardBase, {
  Root: ProfileTooltipCardRoot,
  Header: ProfileTooltipHeader,
  Body: ProfileTooltipBody,
  AvatarRow: ProfileTooltipAvatarRow,
  Avatar: ProfileTooltipAvatar,
  FollowButton: ProfileTooltipFollowButton,
  Name: ProfileTooltipName,
  Stats: ProfileTooltipStats,
  Status: ProfileTooltipStatus,
  Bio: ProfileTooltipBio,
  Socials: ProfileTooltipSocials,
  Grails: ProfileTooltipGrails,
})

export default ProfileTooltipCard

export {
  ProfileTooltipCardRoot,
  ProfileTooltipHeader,
  ProfileTooltipBody,
  ProfileTooltipAvatarRow,
  ProfileTooltipAvatar,
  ProfileTooltipFollowButton,
  ProfileTooltipName,
  ProfileTooltipStats,
  ProfileTooltipStatus,
  ProfileTooltipBio,
  ProfileTooltipSocials,
  ProfileTooltipGrails,
}
