import Avatar from './avatar/Avatar'
import FollowerTag from './follower-tag/FollowerTag'
import ProfileCard from './profile-card/ProfileCard'
import LoadingCell from './loading-cell/LoadingCell'
import FollowButton from './follow-button/FollowButton'
import ProfileStats from './profile-stats/ProfileStats'
import ProfileSocials from './profile-socials/ProfileSocials'
import HeaderImage from './profile-card/components/HeaderImage'
import TransactionModal from './transaction-modal/TransactionModal'
import ImageWithFallback from './image-with-fallback/ImageWithFallback'
export {
  ProfileCard,
  ProfileSocials,
  ProfileStats,
  Avatar,
  LoadingCell,
  HeaderImage,
  ImageWithFallback,
  FollowerTag,
  TransactionModal,
  FollowButton,
}

import { ProfileCardProps } from './profile-card/ProfileCard.types'
import { ProfileSocialsProps } from './profile-socials/ProfileSocials.types'
import { ProfileStatsProps } from './profile-stats/ProfileStats.types'
import { AvatarProps } from './avatar/Avatar.types'
import { FollowerTagProps } from './follower-tag/FollowerTag.types'
import { LoadingCellProps } from './loading-cell/LoadingCell.types'
import { ImageWithFallbackProps } from './image-with-fallback/ImageWithFallback.types'
import { FollowButtonProps } from './follow-button/FollowButton.types'
import { TransactionModalProps } from './transaction-modal/TransactionModal.types'
export type {
  ProfileCardProps,
  ProfileSocialsProps,
  ProfileStatsProps,
  AvatarProps,
  FollowerTagProps,
  LoadingCellProps,
  ImageWithFallbackProps,
  FollowButtonProps,
  TransactionModalProps,
}

export * from './icons'
