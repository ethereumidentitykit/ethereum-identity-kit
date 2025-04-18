import clsx from 'clsx'
import React from 'react'
import ProfileListRow from '../profile-list-row/ProfileListRow'
import ProfileListLoadingRow from '../profile-list-row/ProfileListLoadingRow'
import { ProfileListProps } from './ProfileList.types'
import './ProfileList.css'
import VirtualList from '../virtual-list/VirtualList'

/**
 * ProfileList component - displays a list of profiles
 *
 * @param profiles - the profiles to display
 *
 * @param darkMode - whether the component is in dark mode
 *
 * @param connectedAddress - the address of the connected user
 *
 * @param selectedList - the list to display
 *
 * @param isLoading - whether the component is loading
 *
 * @param loadingRows - the number of loading rows to display
 *
 * @param tags - the tags to display
 *
 * @param showTags - whether to show the tags
 *
 * @param canEditTags - whether to allow editing of the tags
 *
 * @param initialFollowState - the initial follow state for FollowButton
 *
 * @param onProfileClick - the function to call when the name/address or avatar is clicked
 */
const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  darkMode,
  connectedAddress,
  selectedList,
  isLoading,
  loadingRows,
  tags,
  showTags,
  canEditTags,
  initialFollowState,
  onProfileClick,
  showHeaderImage = false,
  rowHeight = 54,
  visibleCount = 20,
  overscanCount = 10,
  listHeight,
}) => {
  return (
    <VirtualList
      containerClassName={clsx('profile-list-container', showHeaderImage && 'has-header-image', darkMode && 'dark')}
      items={isLoading ? [...profiles, ...Array(loadingRows).fill(null)] : profiles}
      visibleCount={visibleCount}
      rowHeight={rowHeight}
      overscanCount={overscanCount}
      listHeight={listHeight}
      gap={showHeaderImage ? 0 : 16}
      renderItem={(profile) =>
        profile ? (
          <ProfileListRow
            key={profile.address}
            profile={profile}
            connectedAddress={connectedAddress}
            selectedList={selectedList}
            tags={tags}
            showTags={showTags}
            showHeaderImage={showHeaderImage}
            canEditTags={canEditTags}
            initialFollowState={initialFollowState}
            onProfileClick={onProfileClick}
          />
        ) : (
          <ProfileListLoadingRow />
        )
      }
    />
    // <div className={clsx('profile-list-container', darkMode && 'dark')}>
    //   {profiles.map((profile) => (
    // <ProfileListRow
    //   key={profile.address}
    //   profile={profile}
    //   connectedAddress={connectedAddress}
    //   selectedList={selectedList}
    //   tags={tags}
    //   showTags={showTags}
    //   canEditTags={canEditTags}
    //   initialFollowState={initialFollowState}
    //   onProfileClick={onProfileClick}
    // />
    //   ))}
    // {isLoading &&
    //   Array(loadingRows)
    //     .fill(null)
    //     .map((_, index) => <ProfileListLoadingRow key={index} />)}
    // </div>
  )
}

export default ProfileList
