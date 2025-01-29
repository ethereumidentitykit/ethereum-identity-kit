import { useCommonFollowers } from '../../hooks/useCommonFollowers'
import { formatCommonFollowersText } from '../../utils/formatters'
import Avatar from '../avatar/Avatar'
import LoadingCell from '../loading-cell/LoadingCell'
import { CommonFollowersProps } from './CommonFollowers.types'
import './CommonFollowers.css'

const CommonFollowers: React.FC<CommonFollowersProps> = ({ connectedAddress, lookupAddressOrName }) => {
  const { displayedAvatars, displayedNames, resultLength, isLoading } = useCommonFollowers(
    connectedAddress,
    lookupAddressOrName
  )

  return (
    <div className="common-followers-container">
      <div className="common-followers-avatars-container">
        {isLoading
          ? new Array(3)
              .fill(null)
              .map((_, index) => (
                <LoadingCell
                  key={index}
                  height="32px"
                  width="32px"
                  style={{ borderRadius: '50%', transform: `translateX(-${index * 16}px)` }}
                />
              ))
          : displayedAvatars?.map(({ avatar, address }, index) => (
              <Avatar
                key={address}
                src={avatar}
                address={address}
                style={{ width: '32px', height: '32px', transform: `translateX(-${index * 16}px)` }}
              />
            ))}
      </div>
      {isLoading ? (
        <LoadingCell height="32px" width="100%" style={{ transform: 'translateX(-32px)' }} />
      ) : (
        <p className="common-followers-text-container">
          {displayedNames && formatCommonFollowersText(displayedNames, resultLength)}
        </p>
      )}
    </div>
  )
}

export default CommonFollowers
