import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import MoreOptions from '../components/more-options'

export const FullWidthProfileMoreOptions: React.FC = () => {
  const {
    list,
    primaryList,
    nameMenu,
    openListSettings,
    refreshProfileDetails,
    prefetched,
  } = useProfileIdentityContext()

  return (
    <MoreOptions
      profileList={list ?? Number(primaryList)}
      primaryList={primaryList}
      nameMenu={nameMenu}
      openListSettingsModal={openListSettings}
      refetchData={() => {
        refreshProfileDetails()
        prefetched?.stats?.refetch?.()
      }}
    />
  )
}

FullWidthProfileMoreOptions.displayName = 'FullWidthProfile.MoreOptions'
