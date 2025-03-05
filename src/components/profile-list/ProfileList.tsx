import clsx from 'clsx'
import React from 'react'
import ProfileListRow from '../profile-list-row/ProfileListRow'
import ProfileListLoadingRow from '../profile-list-row/ProfileListLoadingRow'
import { ProfileListProps } from './ProfileList.types'
import './ProfileList.css'

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  darkMode,
  connectedAddress,
  selectedList,
  isLoading,
  loadingRows,
  showTags,
}) => {
  return (
    <div className={clsx('profile-list-container', darkMode && 'dark')}>
      {profiles.map((profile) => (
        <ProfileListRow
          key={profile.address}
          profile={profile}
          connectedAddress={connectedAddress}
          selectedList={selectedList}
          showTags={showTags}
        />
      ))}
      {isLoading &&
        Array(loadingRows)
          .fill(null)
          .map((_, index) => <ProfileListLoadingRow key={index} />)}
    </div>
  )
}

export default ProfileList
