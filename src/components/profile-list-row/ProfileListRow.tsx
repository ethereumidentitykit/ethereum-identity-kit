import clsx from 'clsx'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ens_beautify } from '@adraffy/ens-normalize'
import { ProfileListRowProps } from './ProfileListRow.types'
import Avatar from '../avatar/Avatar'
import FollowButton from '../follow-button/FollowButton'
import LoadingCell from '../loading-cell/LoadingCell'
import { fetchProfileAccount } from '../../utils/api/fetch-profile-account'
import Tags from '../transaction-modal/components/cart/tags'
import { truncateAddress } from '../../utils'
import './ProfileListRow.css'

/**
 * ProfileListRow component - displays a row of a profile in a list
 *
 * @param profile - the profile to display
 *
 * @param connectedAddress - the address of the connected user
 *
 * @param selectedList - the list to display
 *
 * @param showTags - whether to show the tags
 *
 * @param canEditTags - whether to allow editing of the tags
 *
 * @param tags - the tags to display
 *
 * @param initialFollowState - the initial follow state for FollowButton
 *
 * @param onProfileClick - the function to call when the name/address or avatar is clicked
 */
const ProfileListRow: React.FC<ProfileListRowProps> = ({
  profile,
  connectedAddress,
  selectedList,
  showTags,
  canEditTags,
  tags,
  initialFollowState,
  onProfileClick,
  showHeaderImage = false,
}) => {
  const { data: account, isLoading: isAccountLoading } = useQuery({
    queryKey: ['profile-account', profile.address],
    queryFn: async () => (profile.ens ? profile : await fetchProfileAccount(profile.address)),
  })

  const headerImage = account?.ens?.header

  return (
    <div className={clsx('profile-list-row', showHeaderImage && 'has-header-image')}>
      {showHeaderImage && headerImage && (
        <img src={headerImage} alt="header" className="profile-list-row-header-image" />
      )}
      <div className="profile-list-row-details">
        {isAccountLoading ? (
          <LoadingCell style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
        ) : (
          <Avatar
            address={profile.address}
            name={account?.ens?.name}
            style={{ width: '45px', height: '45px', borderRadius: '50%', zIndex: 1 }}
            onClick={onProfileClick ? () => onProfileClick(profile.address) : undefined}
          />
        )}
        {isAccountLoading ? (
          <LoadingCell style={{ width: '128px', height: '32px', borderRadius: '8px' }} />
        ) : (
          <div className="profile-list-row-name-container">
            <p
              className={clsx('profile-list-row-name', onProfileClick && 'clickable')}
              onClick={() => onProfileClick?.(profile.address)}
            >
              {account?.ens?.name ? ens_beautify(account?.ens?.name) : truncateAddress(profile.address)}
            </p>
            {showTags && <Tags address={profile.address} canEditTags={canEditTags} existingTags={tags} />}
          </div>
        )}
      </div>
      <FollowButton
        lookupAddress={profile.address}
        connectedAddress={connectedAddress}
        selectedList={selectedList}
        initialState={initialFollowState}
      />
    </div>
  )
}

export default ProfileListRow
