import React, { useState } from 'react'
import type { AvatarProps } from './Avatar.types'
import './Avatar.css'
const Avatar: React.FC<AvatarProps> = ({ address, src, name, fallback, style }) => {
  const [error, setError] = useState<string | null>(null)
  return (
    <div 
    className='avatar-container'
      style={style}
    >
      <img className='avatar-image' src={error || !src ? fallback : src} alt={name || address}
            data-loaded='false'
            onLoad={event => {
              event.currentTarget.setAttribute('data-loaded', 'true')
            }}
            onError={event => {
              setError('invalid image')
              event.currentTarget.setAttribute('data-loaded', 'true')
            }}
      />
    </div>
  )
}

export default Avatar
