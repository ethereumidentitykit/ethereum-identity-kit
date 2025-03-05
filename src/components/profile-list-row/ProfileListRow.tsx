import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProfileListRowProps } from './ProfileListRow.types'
import Avatar from '../avatar/Avatar'
import FollowButton from '../follow-button/FollowButton'
import LoadingCell from '../loading-cell/LoadingCell'
import { fetchProfileAccount } from '../../utils/api/fetch-profile-account'
import Tags from '../transaction-modal/components/cart/tags'
import { truncateAddress } from '../../utils'
import './ProfileListRow.css'

const ProfileListRow: React.FC<ProfileListRowProps> = ({
  profile,
  connectedAddress,
  selectedList,
  showTags,
  canEditTags,
  tags,
}) => {
  const { data: account, isLoading: isAccountLoading } = useQuery({
    queryKey: ['profile-account', profile.address],
    queryFn: async () => await fetchProfileAccount(profile.address),
  })

  return (
    <div className="profile-list-row">
      <div className="profile-list-row-details">
        {isAccountLoading ? (
          <LoadingCell style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
        ) : (
          <Avatar
            address={profile.address}
            name={account?.ens?.name}
            style={{ width: '45px', height: '45px', borderRadius: '50%' }}
          />
        )}
        {isAccountLoading ? (
          <LoadingCell style={{ width: '128px', height: '32px', borderRadius: '8px' }} />
        ) : (
          <div className="profile-list-row-name-container">
            <p className="profile-list-row-name">{account?.ens?.name || truncateAddress(profile.address)}</p>
            {showTags && <Tags address={profile.address} canEditTags={canEditTags} existingTags={tags} />}
          </div>
        )}
      </div>
      <FollowButton lookupAddress={profile.address} connectedAddress={connectedAddress} selectedList={selectedList} />
    </div>
  )
}

export default ProfileListRow
