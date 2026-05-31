import React from 'react'
import { clsx } from 'clsx'
import { Avatar, Button, Card, Components, Modal, Skeleton, Tag, Typography } from '@ensdomains/thorin'

const ThorinBackdropSurface = Components.BackdropSurface
import { useFollowerState } from '../../hooks'
import { isLinkValid } from '../../utils'
import type { AvatarProps } from '../../components/molecules/avatar/Avatar.types'
import type { LoadingCellProps } from '../../components/atoms/loading-cell/LoadingCell.types'
import type { FollowerTagProps } from '../../components/molecules/follower-tag/FollowerTag.types'
import type {
  EIKButtonProps,
  EIKCardProps,
  EIKModalProps,
  EIKTypographyProps,
} from '../../context/componentRegistry.types'

export const ThorinAvatar: React.FC<AvatarProps> = ({
  address,
  src,
  name,
  fallback,
  onClick,
  style,
  className,
  ...props
}) => {
  const imageSrc =
    src && isLinkValid(src) ? src : name ? `https://metadata.ens.domains/mainnet/avatar/${name}` : undefined

  const { width = '100px', height = width, ...restStyle } = style || {}

  return (
    <div
      className={clsx('avatar-container', className)}
      style={{ width, height, flexShrink: 0, ...restStyle }}
      onClick={onClick}
      enable-hover={onClick ? 'true' : 'false'}
      {...props}
    >
      <Avatar
        label={name || address || 'Profile avatar'}
        src={imageSrc}
        shape="circle"
        placeholder={fallback ? `url("${fallback}")` : undefined}
      />
    </div>
  )
}

export const ThorinButton = React.forwardRef<HTMLButtonElement, EIKButtonProps>(
  ({ children, className, style, ...props }, ref) => (
    <Button
      ref={ref}
      className={className}
      colorStyle="accentPrimary"
      shape="rounded"
      size="small"
      style={{ width: 'auto', maxWidth: '100%', ...style }}
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
  <div className={className} {...props}>
    {children}
  </div>
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
}) => {
  const backdropSurface = React.useMemo(() => {
    const Surface = React.forwardRef<
      HTMLDivElement,
      React.ComponentProps<typeof ThorinBackdropSurface>
    >(({ $state, $empty, className, style, ...surfaceProps }, ref) => (
      <ThorinBackdropSurface
        ref={ref}
        $state={$state}
        $empty={$empty}
        className={clsx(overlayClassName, className)}
        style={{ ...overlayStyle, ...style }}
        {...surfaceProps}
      >
        {overlayChildren}
      </ThorinBackdropSurface>
    ))
    Surface.displayName = 'ThorinModalBackdrop'
    return Surface
  }, [overlayClassName, overlayStyle, overlayChildren])

  return (
    <Modal open backdropSurface={backdropSurface} onDismiss={onOverlayClick}>
      <Card className={containerClassName} style={containerStyle} {...props}>
        {children}
      </Card>
    </Modal>
  )
}
