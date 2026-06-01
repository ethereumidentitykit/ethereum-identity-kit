import React from 'react'
import { clsx } from 'clsx'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import { beautifyEnsName, truncateAddress } from '../../../../utils'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import FollowerTag from '../../../molecules/follower-tag/FollowerTag'
import type { ProfileTooltipSlotProps } from './slot.types'

export type ProfileTooltipNameSlotData = {
  displayName: string
  isLoading: boolean
  showFollowerTag: boolean
  addressOrName: ReturnType<typeof useProfileIdentityContext>['addressOrName']
  connectedAddress?: ReturnType<typeof useProfileIdentityContext>['connectedAddress']
  list?: ReturnType<typeof useProfileIdentityContext>['list']
  onProfileClick?: () => void
  hasProfileClick: boolean
}

export const ProfileTooltipName: React.FC<ProfileTooltipSlotProps<ProfileTooltipNameSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, address, addressOrName, isDetailsLoading, showFollowerTag, connectedAddress, list, onProfileClick } =
    useProfileIdentityContext()

  const displayName = ens?.name ? beautifyEnsName(ens.name) : address ? truncateAddress(address) : String(addressOrName)

  const slotData: ProfileTooltipNameSlotData = {
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
    <div className="tooltip-name-container">
      <p
        className={clsx('tooltip-name', className)}
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
      children
    ) : (
      <p style={style}>{displayName}</p>
    )

    return (
      <Slottable
        asChild
        slotProps={{
          className: clsx('tooltip-name', className),
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

ProfileTooltipName.displayName = 'ProfileTooltipCard.Name'
