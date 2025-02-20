import { useRecommended } from '../../../../hooks/useRecommended'
import { Address } from '../../../../types'
import ProfileList from '../../../profile-list/ProfileList'

const Recommended = ({ connectedAddress }: { connectedAddress: Address }) => {
  const { recommended } = useRecommended(connectedAddress)

  return (
    <div className="recommended-container">
      <ProfileList profiles={recommended} connectedAddress={connectedAddress} />
    </div>
  )
}

export default Recommended
