import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import Avatar from '../../../molecules/avatar/Avatar'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import { DEFAULT_FALLBACK_AVATAR } from '../../../../constants'
import type { ProfileTooltipSlotProps } from './slot.types'

export type ProfileTooltipAvatarSlotData = {
  addressOrName: ReturnType<typeof useProfileIdentityContext>['addressOrName']
  src?: string
  name?: string
  isLoading: boolean
  onClick?: () => void
}

export const ProfileTooltipAvatar: React.FC<ProfileTooltipSlotProps<ProfileTooltipAvatarSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { addressOrName, ens, isDetailsLoading, onProfileClick } = useProfileIdentityContext()

  const slotData: ProfileTooltipAvatarSlotData = {
    addressOrName,
    src: ens?.avatar,
    name: ens?.name,
    isLoading: isDetailsLoading,
    onClick: () => onProfileClick?.(addressOrName),
  }

  const defaultNode = slotData.isLoading ? (
    <LoadingCell height="75px" width="75px" radius="50%" />
  ) : (
    <Avatar
      address={addressOrName}
      src={slotData.src}
      name={slotData.name}
      fallback={DEFAULT_FALLBACK_AVATAR}
      style={{ width: '75px', height: '75px', ...style }}
      onClick={slotData.onClick}
      className={className}
    />
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild && !slotData.isLoading) {
    const childElement = React.isValidElement(children) ? (
      children
    ) : (
      <Avatar address={addressOrName} src={slotData.src} name={slotData.name} fallback={DEFAULT_FALLBACK_AVATAR} />
    )

    return (
      <Slottable
        asChild
        slotProps={{
          className,
          style: { width: '75px', height: '75px', ...style },
          onClick: slotData.onClick,
        }}
      >
        {childElement}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileTooltipAvatar.displayName = 'ProfileTooltipCard.Avatar'
