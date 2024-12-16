import React from 'react'
import { DEFAULT_FALLBACK_AVATAR } from '../../constants'
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback'
import './Avatar.css'
import type { AvatarProps } from './Avatar.types'

/**
 * Avatar component - displays an avatar image of a profile <br />
 * @param address - the address for the profile of the avatar <br />
 * @param src - the source of the avatar image <br />
 * @param name - the ENS name of the avatar <br />
 * @param fallback - the fallback avatar image <br />
 * @param style - the style of the avatar <br />
 * @param props - <div> element props <br />
 * @returns Avatar component
 */
const Avatar: React.FC<AvatarProps> = ({ address, src, name, fallback = DEFAULT_FALLBACK_AVATAR, style, ...props }) => {
  const imageSrc = src || `https://metadata.ens.domains/mainnet/avatar/${name}`

  return (
    <div className="avatar-container" style={style} {...props}>
      <ImageWithFallback src={imageSrc} fallback={fallback} alt={name || address || ''} />
    </div>
  )
}

export default Avatar
