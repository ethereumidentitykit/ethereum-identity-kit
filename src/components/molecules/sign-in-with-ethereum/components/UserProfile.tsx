import { fetchAccount } from '../../../../utils/api/fetch-account'
import { ShortArrow } from '../../../icons'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import Avatar from '../../avatar/Avatar'
import HeaderImage from '../../../organisms/profile-card/components/HeaderImage'
import { useQuery } from '@tanstack/react-query'
import { Address } from '../../../../types'
import { beautifyEnsName } from '../../../../utils/ens'
import { truncateAddress } from '../../../../utils'

export const UserProfile = ({
  address,
  isDropdown,
  isDropdownOpen,
}: {
  address: Address
  isDropdown?: boolean
  isDropdownOpen?: boolean
}) => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', address],
    queryFn: async () => {
      const profile = await fetchAccount(address)
      return profile
    },
  })

  return (
    <div key={profile?.ens?.name || address} className="signed-in-user-profile">
      <HeaderImage
        src={profile?.ens?.records?.header}
        name={profile?.ens?.name}
        isLoading={isLoading}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
      />
      <div className="signed-in-user-profile-content">
        {isLoading ? (
          <LoadingCell height={36} width={36} radius="4px" />
        ) : (
          <Avatar src={profile?.ens?.avatar} style={{ width: 36, height: 36, borderRadius: '4px' }} />
        )}
        {isLoading ? (
          <LoadingCell height={20} width={100} radius="4px" />
        ) : (
          <p className="signed-in-user-profile-name">
            {profile?.ens?.name ? beautifyEnsName(profile?.ens?.name) : truncateAddress(address)}
          </p>
        )}
        {isDropdown && (
          <ShortArrow
            height={20}
            width={20}
            style={{ transform: isDropdownOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
          />
        )}
      </div>
    </div>
  )
}

export default UserProfile
