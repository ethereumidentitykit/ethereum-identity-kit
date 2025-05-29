import clsx from 'clsx'
import { forwardRef } from 'react'
import ProfileListRow from '../../molecules/profile-list-row/ProfileListRow'
import ProfileListLoadingRow from '../../molecules/profile-list-row/ProfileListLoadingRow'
import { ProfileItemType, ProfileListProps } from './ProfileList.types'
import VirtualList from '../../molecules/virtual-list/VirtualList'
import './ProfileList.css'

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
 *
 * @param showHeaderImage - whether to show the header image
 *
 * @param rowHeight - the height of each row
 *
 * @param visibleCount - the number of visible rows
 *
 * @param overscanCount - the number of rows to overscan
 *
 * @param listHeight - the height of the list
 *
 * @param showFollowsYouBadges - whether to show the follows you badges
 */
const ProfileList = forwardRef<HTMLDivElement, ProfileListProps>(
  (
    {
      profiles,
      darkMode,
      connectedAddress,
      selectedList,
      isLoading,
      loadingRows,
      showTags,
      canEditTags,
      initialFollowState,
      onProfileClick,
      showHeaderImage = false,
      rowHeight = 54,
      visibleCount = 20,
      overscanCount = 10,
      listHeight,
      showFollowsYouBadges = false,
      loadMoreElement,
      useVirtualList = false,
    },
    ref
  ) => {
    const items: (ProfileItemType | null)[] = isLoading
      ? [...profiles, ...Array(loadingRows).fill(null)]
      : loadMoreElement
        ? [...profiles, null]
        : [...profiles]

    return useVirtualList ? (
      <VirtualList<ProfileItemType | null>
        ref={ref}
        containerClassName={clsx('profile-list-container', showHeaderImage && 'has-header-image', darkMode && 'dark')}
        items={items}
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
              tags={profile.tags}
              showTags={showTags}
              showHeaderImage={showHeaderImage}
              canEditTags={canEditTags}
              initialFollowState={initialFollowState}
              onProfileClick={onProfileClick}
              showFollowsYouBadges={showFollowsYouBadges}
            />
          ) : isLoading ? (
            <ProfileListLoadingRow />
          ) : (
            loadMoreElement
          )
        }
      />
    ) : (
      <div
        ref={ref}
        className={clsx('profile-list-container', showHeaderImage && 'has-header-image', darkMode && 'dark')}
      >
        {items.map((profile) =>
          profile ? (
            <ProfileListRow
              key={profile.address}
              profile={profile}
              connectedAddress={connectedAddress}
              selectedList={selectedList}
              tags={profile.tags}
              showTags={showTags}
              showHeaderImage={showHeaderImage}
              canEditTags={canEditTags}
              initialFollowState={initialFollowState}
              onProfileClick={onProfileClick}
              showFollowsYouBadges={showFollowsYouBadges}
            />
          ) : isLoading ? (
            Array({ length: loadingRows }).map((_, index) => (
              <ProfileListLoadingRow key={index} showHeaderImage={showHeaderImage} />
            ))
          ) : (
            loadMoreElement
          )
        )}
      </div>
    )
  }
)

ProfileList.displayName = 'ProfileList'

export default ProfileList
