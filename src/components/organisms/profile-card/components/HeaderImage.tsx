import React from 'react'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import { DEFAULT_FALLBACK_HEADER } from '../../../../constants'
import ImageWithFallback from '../../../atoms/image-with-fallback/ImageWithFallback'

interface HeaderImageProps {
  src?: string
  isLoading: boolean
  style?: React.CSSProperties
}

/**
 * HeaderImage component - displays a header image of a profile
 * @param src - the source of the header image
 * @param isLoading - whether the header image is loading
 * @param style - the style of the header image
 * @returns HeaderImage component
 */
const HeaderImage: React.FC<HeaderImageProps> = ({ src, isLoading, style }) => {
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
      {isLoading ? (
        <LoadingCell
          height="100%"
          width="100%"
          style={{
            borderTopLeftRadius: style?.borderTopLeftRadius || '4px',
            borderTopRightRadius: style?.borderTopRightRadius || '4px',
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
            borderTopLeftRadius: style?.borderTopLeftRadius || '4px',
            borderTopRightRadius: style?.borderTopRightRadius || '4px',
          }}
        />
      )}
    </div>
  )
}

export default HeaderImage
