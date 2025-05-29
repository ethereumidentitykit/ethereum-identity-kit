import React from 'react'
import { isLinkValid } from '../../../utils'
import ImageWithFallback from '../../atoms/image-with-fallback/ImageWithFallback'
import { DEFAULT_FALLBACK_AVATAR } from '../../../constants'
import type { AvatarProps } from './Avatar.types'
import './Avatar.css'

/**
 * Avatar component - displays an avatar image of a profile
 *
 * @param address - the address for the profile of the avatar
 *
 * @param src - the source of the avatar image
 *
 * @param name - the ENS name of the avatar
 *
 * @param fallback - the fallback avatar image
 *
 * @param style - the style of the avatar
 *
 * @param onClick - the function to be called when the avatar is clicked
 *
 * @param props - HTML div element props
 *
 * @returns Avatar component
 */
const Avatar: React.FC<AvatarProps> = ({
  address,
  src,
  name,
  fallback = DEFAULT_FALLBACK_AVATAR,
  style,
  onClick,
  ...props
}) => {
  // if there is no src or src is an ipfs hash, use ENS metadata service
  const imageSrc = src && isLinkValid(src) ? src : `https://metadata.ens.domains/mainnet/avatar/${name}`

  return (
    <div
      className="avatar-container"
      style={style}
      onClick={onClick}
      enable-hover={!!onClick ? 'true' : 'false'}
      {...props}
    >
      <ImageWithFallback src={imageSrc} fallback={fallback} alt={name || address || ''} />
    </div>
  )
}

export default Avatar
