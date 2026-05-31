import React from 'react'
import { clsx } from 'clsx'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import { beautifyEnsName, truncateAddress } from '../../../../utils'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import FollowerTag from '../../../molecules/follower-tag/FollowerTag'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardNameSlotData = {
  displayName: string
  isLoading: boolean
  showFollowerTag: boolean
  addressOrName: ReturnType<typeof useProfileCardContext>['addressOrName']
  connectedAddress?: ReturnType<typeof useProfileCardContext>['connectedAddress']
  list?: ReturnType<typeof useProfileCardContext>['list']
  onProfileClick?: () => void
  hasProfileClick: boolean
}

export const ProfileCardName: React.FC<ProfileCardSlotProps<ProfileCardNameSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, address, addressOrName, isDetailsLoading, showFollowerTag, connectedAddress, list, onProfileClick } =
    useProfileCardContext()

  const displayName = ens?.name ? beautifyEnsName(ens.name) : address ? truncateAddress(address) : String(addressOrName)

  const slotData: ProfileCardNameSlotData = {
    displayName,
    isLoading: isDetailsLoading,
    showFollowerTag,
    addressOrName,
    connectedAddress,
    list,
    onProfileClick: () => onProfileClick?.(addressOrName),
    hasProfileClick: Boolean(onProfileClick),
  }

  const defaultNode = isDetailsLoading ? (
    <LoadingCell height="26px" width="160px" />
  ) : (
    <div className="profile-name-container">
      <p
        className={clsx('profile-name', className)}
        style={style}
        enable-hover={onProfileClick ? 'true' : 'false'}
        onClick={slotData.onProfileClick}
      >
        {displayName}
      </p>
      {showFollowerTag && connectedAddress && (
        <FollowerTag lookupAddressOrName={addressOrName} connectedAddress={connectedAddress} list={list} />
      )}
    </div>
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild && !isDetailsLoading) {
    const childElement = React.isValidElement(children) ? (
      React.cloneElement(children as React.ReactElement, {}, displayName)
    ) : (
      <p className={clsx('profile-name', className)} style={style} onClick={slotData.onProfileClick}>
        {displayName}
      </p>
    )

    return (
      <Slottable
        asChild
        slotProps={{
          className: clsx('profile-name', className),
          style,
          onClick: slotData.onProfileClick,
        }}
      >
        {childElement}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileCardName.displayName = 'ProfileCard.Name'
