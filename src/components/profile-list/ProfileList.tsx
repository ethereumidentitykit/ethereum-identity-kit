import clsx from 'clsx'
import React from 'react'
import { ProfileListProps } from './ProfileList.types'
import ProfileListRow from '../profile-list-row/ProfileListRow'
import './ProfileList.css'

const ProfileList: React.FC<ProfileListProps> = ({ profiles, darkMode, connectedAddress }) => {
  return (
    <div className={clsx('profile-list-container', darkMode && 'dark')}>
      {profiles.map((profile) => (
        <ProfileListRow key={profile.address} profile={profile} connectedAddress={connectedAddress} />
      ))}
    </div>
  )
}

export default ProfileList
