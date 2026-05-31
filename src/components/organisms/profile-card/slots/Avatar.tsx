import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import Avatar from '../../../molecules/avatar/Avatar'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import { DEFAULT_FALLBACK_AVATAR } from '../../../../constants'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardAvatarSlotData = {
  addressOrName: ReturnType<typeof useProfileCardContext>['addressOrName']
  src?: string
  name?: string
  isLoading: boolean
  onClick?: () => void
}

export const ProfileCardAvatar: React.FC<ProfileCardSlotProps<ProfileCardAvatarSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { addressOrName, ens, isDetailsLoading, onProfileClick } = useProfileCardContext()

  const slotData: ProfileCardAvatarSlotData = {
    addressOrName,
    src: ens?.avatar,
    name: ens?.name,
    isLoading: isDetailsLoading,
    onClick: () => onProfileClick?.(addressOrName),
  }

  const defaultNode = slotData.isLoading ? (
    <LoadingCell height="100px" width="100px" radius="50%" />
  ) : (
    <Avatar
      address={addressOrName}
      src={slotData.src}
      name={slotData.name}
      fallback={DEFAULT_FALLBACK_AVATAR}
      style={{ width: '100px', height: '100px', ...style }}
      onClick={slotData.onClick}
      className={className}
    />
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild && !slotData.isLoading) {
    const childElement = React.isValidElement(children) ? (
      children
    ) : (
      <Avatar
        address={addressOrName}
        src={slotData.src}
        name={slotData.name}
        fallback={DEFAULT_FALLBACK_AVATAR}
      />
    )

    return (
      <Slottable
        asChild
        slotProps={{
          className,
          style: { width: '100px', height: '100px', ...style },
          onClick: slotData.onClick,
        }}
      >
        {childElement}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileCardAvatar.displayName = 'ProfileCard.Avatar'
