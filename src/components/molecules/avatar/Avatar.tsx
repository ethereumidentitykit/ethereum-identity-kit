import React from 'react'
import { isLinkValid } from '../../../utils'
import ImageWithFallback from '../../atoms/image-with-fallback/ImageWithFallback'
import { DEFAULT_FALLBACK_AVATAR } from '../../../constants'
import { useResolvedComponent } from '../../primitives/resolveComponent'
import type { AvatarProps } from './Avatar.types'
import './Avatar.css'

export const AvatarBase: React.FC<AvatarProps> = ({
  address,
  src,
  name,
  fallback = DEFAULT_FALLBACK_AVATAR,
  style,
  onClick,
  ...props
}) => {
  const imageSrc = src && isLinkValid(src) ? src : `https://metadata.ens.domains/mainnet/avatar/${name}`

  return (
    <div
      className="avatar-container"
      style={style}
      onClick={onClick}
      enable-hover={onClick ? 'true' : 'false'}
      {...props}
    >
      <ImageWithFallback src={imageSrc} fallback={fallback} alt={name || address || ''} />
    </div>
  )
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const ResolvedAvatar = useResolvedComponent('Avatar', AvatarBase)
  return <ResolvedAvatar {...props} />
}

export default Avatar
