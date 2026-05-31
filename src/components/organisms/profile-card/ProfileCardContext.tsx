import React, { createContext, useContext, useMemo } from 'react'
import { clsx } from 'clsx'
import { useProfileDetails, useProfileStats } from '../../../hooks'
import { useAppearanceOptional } from '../../../context/AppearanceContext'
import { useResolvedComponent } from '../../primitives/resolveComponent'
import { DefaultCard } from '../../primitives/default'
import { defaultOnStatClick } from '../../../utils/profile'
import { ProfileCardProps } from './ProfileCard.types'
import { ProfileExtraOptions } from '../full-width-profile/FullWidthProfile.types'

export type ProfileCardContextValue = {
  addressOrName: ProfileCardProps['addressOrName']
  list?: ProfileCardProps['list']
  connectedAddress?: ProfileCardProps['connectedAddress']
  selectedList?: ProfileCardProps['selectedList']
  darkMode?: boolean
  showFollowerState?: boolean
  showPoaps?: boolean
  showFollowButton?: boolean
  showEmptySocials?: boolean
  hasCommonFollowersModal?: boolean
  onProfileClick?: ProfileCardProps['onProfileClick']
  onStatClick: NonNullable<ProfileCardProps['onStatClick']>
  customFollowButton?: React.ReactNode
  nameMenu?: React.ReactNode
  openListSettings?: () => void
  onEditProfileClick?: () => void
  onBioLinkClick?: ProfileExtraOptions['onBioLinkClick']
  hideSocials?: ProfileExtraOptions['hideSocials']
  hideEFPPoaps?: ProfileExtraOptions['hideEFPPoaps']
  customPoaps?: ProfileExtraOptions['customPoaps']
  ens: ReturnType<typeof useProfileDetails>['ens']
  address?: ReturnType<typeof useProfileDetails>['address']
  primaryList?: ReturnType<typeof useProfileDetails>['primaryList']
  isDetailsLoading: boolean
  isStatsLoading: boolean
  followers?: number
  following?: number
  isConnectedUserCard: boolean
  showFollowerTag: boolean
  refreshProfileDetails: () => void
  refreshProfileStats: () => void
  style?: React.CSSProperties
}

const ProfileCardContext = createContext<ProfileCardContextValue | null>(null)

export const useProfileCardContext = () => {
  const context = useContext(ProfileCardContext)

  if (!context) {
    throw new Error('ProfileCard slot components must be used within ProfileCard.Root')
  }

  return context
}

export type ProfileCardRootProps = ProfileCardProps

export const ProfileCardRoot: React.FC<ProfileCardRootProps> = ({
  addressOrName,
  list,
  connectedAddress,
  darkMode,
  showFollowerState,
  showPoaps,
  showEmptySocials,
  showFollowButton,
  onProfileClick,
  onStatClick = defaultOnStatClick,
  extraOptions,
  className,
  style,
  selectedList,
  hasCommonFollowersModal = true,
  children,
  ...props
}) => {
  const { prefetched, customFollowButton, nameMenu, openListSettings, onEditProfileClick, onBioLinkClick } =
    extraOptions || {}

  const { profile, stats } = prefetched || {}

  const { ens, address, primaryList, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    list,
    prefetchedData: profile?.data,
    refetchPrefetchedData: profile?.refetch,
  })
  const isDetailsLoading = profile?.isLoading ?? detailsLoading

  const {
    followers,
    following,
    statsLoading: fetchedStatsLoading,
    refreshProfileStats,
  } = useProfileStats({
    addressOrName,
    list,
    prefetchedData: stats?.data,
    refetchPrefetchedData: stats?.refetch,
  })
  const isStatsLoading = stats?.isLoading ?? fetchedStatsLoading

  const isConnectedUserCard = Boolean(
    connectedAddress && address && address.toLowerCase() === connectedAddress.toLowerCase()
  )
  const showFollowerTag = Boolean(showFollowerState && connectedAddress && address && !isConnectedUserCard)
  const { appearanceClassName } = useAppearanceOptional()
  const Card = useResolvedComponent('Card', DefaultCard)

  const contextValue = useMemo<ProfileCardContextValue>(
    () => ({
      addressOrName,
      list,
      connectedAddress,
      selectedList,
      darkMode,
      showFollowerState,
      showPoaps,
      showFollowButton,
      showEmptySocials,
      hasCommonFollowersModal,
      onProfileClick,
      onStatClick,
      customFollowButton,
      nameMenu,
      openListSettings,
      onEditProfileClick,
      onBioLinkClick,
      hideSocials: extraOptions?.hideSocials,
      hideEFPPoaps: extraOptions?.hideEFPPoaps,
      customPoaps: extraOptions?.customPoaps,
      ens,
      address,
      primaryList,
      isDetailsLoading,
      isStatsLoading,
      followers,
      following,
      isConnectedUserCard,
      showFollowerTag,
      refreshProfileDetails,
      refreshProfileStats,
      style,
    }),
    [
      addressOrName,
      list,
      connectedAddress,
      selectedList,
      darkMode,
      showFollowerState,
      showPoaps,
      showFollowButton,
      showEmptySocials,
      hasCommonFollowersModal,
      onProfileClick,
      onStatClick,
      customFollowButton,
      nameMenu,
      openListSettings,
      onEditProfileClick,
      onBioLinkClick,
      extraOptions?.hideSocials,
      extraOptions?.hideEFPPoaps,
      extraOptions?.customPoaps,
      ens,
      address,
      primaryList,
      isDetailsLoading,
      isStatsLoading,
      followers,
      following,
      isConnectedUserCard,
      showFollowerTag,
      refreshProfileDetails,
      refreshProfileStats,
      style,
    ]
  )

  return (
    <ProfileCardContext.Provider value={contextValue}>
      <Card
        className={clsx('profile-card', appearanceClassName, darkMode && 'dark dark-profile-card', className)}
        data-testid="profile-card"
        style={{ fontFamily: 'Inter, sans-serif', ...style }}
        {...props}
      >
        {children}
      </Card>
    </ProfileCardContext.Provider>
  )
}

ProfileCardRoot.displayName = 'ProfileCard.Root'
