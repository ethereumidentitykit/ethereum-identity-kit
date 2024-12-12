import React, { useState } from 'react'
import './ImageWithFallback.css'
import type { ImageWithFallbackProps } from './ImageWithFallback.types.ts'

/**
 * ImageWithFallback component - displays an image with a fallback
 * @param src - the source of the image
 * @param fallback - the fallback image
 * @param alt - the alt text of the image
 * @param style - the style of the image
 * @returns ImageWithFallback component
 */
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
