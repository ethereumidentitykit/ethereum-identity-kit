import React from 'react'
import { clsx } from 'clsx'
import { useTranslation } from '../../../../context'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import { useResolvedComponent } from '../../../primitives/resolveComponent'
import { DefaultButton } from '../../../primitives/default'
import { beautifyEnsName, truncateAddress } from '../../../../utils'
import { ENS } from '../../../icons'
import FollowerTag from '../../../molecules/follower-tag/FollowerTag'
import FollowButton from '../../follow-button/FollowButton'

export const FullWidthProfileName: React.FC = () => {
  const { t } = useTranslation()
  const Button = useResolvedComponent('Button', DefaultButton) as typeof DefaultButton
  const {
    ens,
    address,
    isConnectedUserCard,
    customFollowButton,
    showFollowButton,
    showFollowerTag,
    connectedAddress,
    selectedList,
    onProfileClick,
    onEditProfileClick,
  } = useProfileIdentityContext()

  if (!address) {
    return null
  }

  return (
    <div className="user-profile-name-container">
      <p
        className={clsx(
          'user-profile-name',
          isConnectedUserCard || (!!customFollowButton && 'user-profile-name-connected')
        )}
        onClick={() => onProfileClick?.(address)}
      >
        {ens?.name ? beautifyEnsName(ens?.name) : truncateAddress(address)}
      </p>
      {isConnectedUserCard ? (
        <a
          href={`https://app.ens.domains/${ens?.name || address}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (onEditProfileClick) {
              e.preventDefault()
              onEditProfileClick()
            }
          }}
        >
          <Button className="user-profile-edit-profile-button">
            <ENS height={20} width={20} />
            <p>{t('profile.editProfile')}</p>
          </Button>
        </a>
      ) : showFollowButton ? (
        customFollowButton || <FollowButton lookupAddress={address} connectedAddress={connectedAddress} />
      ) : null}
      {showFollowerTag && connectedAddress && (
        <FollowerTag connectedAddress={connectedAddress} lookupAddressOrName={address} list={selectedList} />
      )}
    </div>
  )
}

FullWidthProfileName.displayName = 'FullWidthProfile.Name'
