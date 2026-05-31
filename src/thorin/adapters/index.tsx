import React from 'react'
import { Avatar, Button, Card, Modal, Skeleton, Tag, Typography } from '@ensdomains/thorin'
import { useFollowerState } from '../../hooks'
import type { AvatarProps } from '../../components/molecules/avatar/Avatar.types'
import type { LoadingCellProps } from '../../components/atoms/loading-cell/LoadingCell.types'
import type { FollowerTagProps } from '../../components/molecules/follower-tag/FollowerTag.types'
import type {
  EIKButtonProps,
  EIKCardProps,
  EIKModalProps,
  EIKTypographyProps,
} from '../../context/componentRegistry.types'

export const ThorinAvatar: React.FC<AvatarProps> = ({ src, name, address, onClick, style, className, ...props }) => (
  <Avatar
    label={name || address || 'Profile avatar'}
    src={src || undefined}
    onClick={onClick}
    style={style}
    className={className}
    shape="circle"
    {...props}
  />
)

export const ThorinButton = React.forwardRef<HTMLButtonElement, EIKButtonProps>(
  ({ children, className, ...props }, ref) => (
    <Button
      ref={ref}
      className={className}
      colorStyle="accentPrimary"
      shape="rounded"
      {...(props as React.ComponentProps<typeof Button>)}
    >
      {children}
    </Button>
  )
)

ThorinButton.displayName = 'ThorinButton'

export const ThorinSkeleton: React.FC<LoadingCellProps> = ({
  height = '100%',
  width = '100%',
  radius = '4px',
  style,
  ...props
}) => (
  <Skeleton loading style={{ height, width, borderRadius: radius, display: 'block', ...style }} {...props}>
    <span style={{ display: 'block', height, width }} />
  </Skeleton>
)

export const ThorinTag: React.FC<FollowerTagProps> = ({
  lookupAddressOrName,
  connectedAddress,
  list,
  showLoading,
  className,
  ...props
}) => {
  const { followerTag, isFollowerStateLoading } = useFollowerState({
    lookupAddressOrName,
    connectedAddress,
    list,
  })

  if (isFollowerStateLoading) {
    return showLoading ? <ThorinSkeleton height="22px" width="70px" radius="8px" /> : null
  }

  return (
    <Tag className={className} colorStyle="greySecondary" size="small" {...props}>
      {followerTag.text}
    </Tag>
  )
}

export const ThorinCard: React.FC<EIKCardProps> = ({ children, className, ...props }) => (
  <Card className={className} {...props}>
    {children}
  </Card>
)

export const ThorinTypography: React.FC<EIKTypographyProps> = ({ as: asProp = 'p', children, className, ...props }) => (
  <Typography asProp={asProp} className={className} {...(props as React.ComponentProps<typeof Typography>)}>
    {children}
  </Typography>
)

export const ThorinModal: React.FC<EIKModalProps> = ({
  overlayClassName,
  containerClassName,
  onOverlayClick,
  overlayStyle,
  containerStyle,
  overlayChildren,
  children,
  ...props
}) => (
  <>
    {overlayChildren}
    <Modal open onDismiss={onOverlayClick} className={overlayClassName} style={overlayStyle}>
      <Card className={containerClassName} style={containerStyle} {...props}>
        {children}
      </Card>
    </Modal>
  </>
)
