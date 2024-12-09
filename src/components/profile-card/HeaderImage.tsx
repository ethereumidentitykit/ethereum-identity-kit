import React from 'react'
import LoadingCell from '../loading-cell'
import { DEFAULT_FALLBACK_HEADER } from '../../constants'
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback'

interface HeaderImageProps {
  src?: string
  isLoaded: boolean
  style?: React.CSSProperties
}

const HeaderImage: React.FC<HeaderImageProps> = ({ src, isLoaded, style }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '110px',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        ...style
      }}
    >
      {isLoaded ? (
        <LoadingCell height='100%' width='100%' radius='0px' />
      ) : (
        <ImageWithFallback
          src={src}
          fallback={DEFAULT_FALLBACK_HEADER}
          alt='header'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
    </div>
  )
}

export default HeaderImage
