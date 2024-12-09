import React, { useState } from 'react'
import type { ImageWithFallbackProps } from './ImageWithFallback.types.ts'
import './ImageWithFallback.css'

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallback, alt, style }) => {
  const [error, setError] = useState<string | null>(null)
  const imageSrc = error ? fallback : src || fallback

  return (
    <img
      className='image-with-fallback'
      src={imageSrc}
      alt={alt}
      style={style}
      image-loaded='false'
      onLoad={event => {
        event.currentTarget.setAttribute('image-loaded', 'true')
      }}
      onError={event => {
        setError('invalid image')
        event.currentTarget.setAttribute('image-loaded', 'true')
      }}
    />
  )
}

export default ImageWithFallback
