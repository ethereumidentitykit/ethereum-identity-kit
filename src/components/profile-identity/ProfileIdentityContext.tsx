import React, { createContext, useContext, useMemo } from 'react'
import { useProfileDetails, useProfileStats } from '../../hooks'
import { defaultOnStatClick } from '../../utils/profile'
import type { ProfileCardProps } from '../organisms/profile-card/ProfileCard.types'
import type { ProfileExtraOptions } from '../organisms/full-width-profile/FullWidthProfile.types'
import type { ProfileSurface } from './slot-catalog'

export type ProfileIdentityContextValue = {
  surface: ProfileSurface
  addressOrName: ProfileCardProps['addressOrName']
  list?: ProfileCardProps['list']
  connectedAddress?: ProfileCardProps['connectedAddress']
  selectedList?: ProfileCardProps['selectedList']
  darkMode?: boolean
  showFollowerState?: boolean
  showPoaps?: boolean
  showFollowButton?: boolean
  showEmptySocials?: boolean
  showBio?: boolean
  showSocials?: boolean
  showStatus?: boolean
  includeGrails?: boolean
  hasCommonFollowersModal?: boolean
  alignProfileContent?: 'center' | 'start' | 'end'
  role?: string
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
  prefetched?: ProfileExtraOptions['prefetched']
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
  className?: string
}

const ProfileIdentityContext = createContext<ProfileIdentityContextValue | null>(null)

export const useProfileIdentityContext = () => {
  const context = useContext(ProfileIdentityContext)

  if (!context) {
    throw new Error('Profile identity slot components must be used within a profile organism Root')
  }

  return context
}

export type ProfileIdentityProviderProps = ProfileCardProps & {
  surface: ProfileSurface
  children: React.ReactNode
  showBio?: boolean
  showSocials?: boolean
  showStatus?: boolean
  includeGrails?: boolean
  alignProfileContent?: 'center' | 'start' | 'end'
}

export const ProfileIdentityProvider: React.FC<ProfileIdentityProviderProps> = ({
  surface,
  addressOrName,
  list,
  connectedAddress,
  darkMode,
  showFollowerState,
  showPoaps,
  showEmptySocials,
  showFollowButton,
  showBio = true,
  showSocials,
  showStatus,
  includeGrails,
  onProfileClick,
  onStatClick = defaultOnStatClick,
  extraOptions,
  selectedList,
  hasCommonFollowersModal = true,
  alignProfileContent = 'center',
  className,
  style,
  children,
}) => {
  const {
    prefetched,
    customFollowButton,
    nameMenu,
    openListSettings,
    onEditProfileClick,
    onBioLinkClick,
    role,
  } = extraOptions || {}

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

  const contextValue = useMemo<ProfileIdentityContextValue>(
    () => ({
      surface,
      addressOrName,
      list,
      connectedAddress,
      selectedList,
      darkMode,
      showFollowerState,
      showPoaps,
      showFollowButton,
      showEmptySocials,
      showBio,
      showSocials,
      showStatus,
      includeGrails,
      hasCommonFollowersModal,
      alignProfileContent,
      role,
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
      prefetched,
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
      className,
    }),
    [
      surface,
      addressOrName,
      list,
      connectedAddress,
      selectedList,
      darkMode,
      showFollowerState,
      showPoaps,
      showFollowButton,
      showEmptySocials,
      showBio,
      showSocials,
      showStatus,
      includeGrails,
      hasCommonFollowersModal,
      alignProfileContent,
      role,
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
      prefetched,
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
      className,
    ]
  )

  return <ProfileIdentityContext.Provider value={contextValue}>{children}</ProfileIdentityContext.Provider>
}

ProfileIdentityProvider.displayName = 'ProfileIdentity.Provider'
