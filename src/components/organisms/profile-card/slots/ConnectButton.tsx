import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useResolvedComponent } from '../../../primitives/resolveComponent'
import { DefaultButton } from '../../../primitives/default'
import { useProfileCardContext } from '../ProfileCardContext'
import { useTranslation } from '../../../../context/TranslationContext'
import { ENS } from '../../../icons'
import FollowButton from '../../follow-button/FollowButton'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardConnectButtonSlotData = {
  isConnectedUserCard: boolean
  showFollowButton?: boolean
  ensName?: string
  address?: ReturnType<typeof useProfileCardContext>['address']
  connectedAddress?: ReturnType<typeof useProfileCardContext>['connectedAddress']
  customFollowButton?: React.ReactNode
  onEditProfileClick?: () => void
}

export const ProfileCardConnectButton: React.FC<ProfileCardSlotProps<ProfileCardConnectButtonSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const {
    isConnectedUserCard,
    showFollowButton,
    ens,
    address,
    connectedAddress,
    customFollowButton,
    onEditProfileClick,
  } = useProfileCardContext()
  const { t } = useTranslation()
  const Button = useResolvedComponent('Button', DefaultButton) as typeof DefaultButton

  const slotData: ProfileCardConnectButtonSlotData = {
    isConnectedUserCard,
    showFollowButton,
    ensName: ens?.name,
    address,
    connectedAddress,
    customFollowButton,
    onEditProfileClick,
  }

  let defaultNode: React.ReactNode = null

  if (isConnectedUserCard) {
    defaultNode = (
      <a
        href={`https://app.ens.domains/${ens?.name}`}
        target="_blank"
        rel="noreferrer"
        className="user-profile-edit-profile-button-container"
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
    )
  } else if (showFollowButton) {
    defaultNode =
      customFollowButton || (address && <FollowButton lookupAddress={address} connectedAddress={connectedAddress} />)
  }

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (!content) {
    return null
  }

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className, style }}>
        {content}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileCardConnectButton.displayName = 'ProfileCard.ConnectButton'
