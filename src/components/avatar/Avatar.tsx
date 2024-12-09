import React from 'react'
import type { AvatarProps } from './Avatar.types'
import { DEFAULT_FALLBACK_AVATAR } from '../../constants'
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback'
import './Avatar.css'

const Avatar: React.FC<AvatarProps> = ({ address, src, name, fallback = DEFAULT_FALLBACK_AVATAR, style }) => {
  const imageSrc = src || `https://metadata.ens.domains/mainnet/avatar/${name}`

  return (
    <div
      className='avatar-container'
      style={style}
    >
      <ImageWithFallback
        src={imageSrc}
        fallback={fallback}
        alt={name || address}
      />
    </div>
  )
}

export default Avatar
