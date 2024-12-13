import React from 'react'
import LoadingCell from '../../loading-cell/LoadingCell'
import { DEFAULT_FALLBACK_HEADER } from '../../../constants'
import ImageWithFallback from '../../ImageWithFallback/ImageWithFallback'

interface HeaderImageProps {
  src?: string
  isLoaded: boolean
  style?: React.CSSProperties
}

/**
 * HeaderImage component - displays a header image of a profile
 * @param src - the source of the header image
 * @param isLoaded - whether the header image is loaded
 * @param style - the style of the header image
 * @returns HeaderImage component
 */
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
        ...style,
      }}
    >
      {isLoaded ? (
        <LoadingCell
          height="100%"
          width="100%"
          style={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        />
      ) : (
        <ImageWithFallback
          src={src}
          fallback={DEFAULT_FALLBACK_HEADER}
          alt="header"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        />
      )}
    </div>
  )
}

export default HeaderImage
