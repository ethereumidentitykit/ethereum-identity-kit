import React from 'react'
import { DEFAULT_FALLBACK_AVATAR } from '../../constants'
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback'
import './Avatar.css'
import type { AvatarProps } from './Avatar.types'

/**
 * Avatar component - displays an avatar image of a profile
 * @param address - the address of the avatar
 * @param src - the source of the avatar image
 * @param name - the ENS name of the avatar
 * @param fallback - the fallback avatar image
 * @param style - the style of the avatar
 * @returns Avatar component
 */
const Avatar: React.FC<AvatarProps> = ({ address, src, name, fallback = DEFAULT_FALLBACK_AVATAR, style }) => {
  const imageSrc = src || `https://metadata.ens.domains/mainnet/avatar/${name}`

  return (
    <div className="avatar-container" style={style}>
      <ImageWithFallback src={imageSrc} fallback={fallback} alt={name || address || ''} />
    </div>
  )
}

export default Avatar
