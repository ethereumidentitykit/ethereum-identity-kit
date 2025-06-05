import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import ShortArrow from '../../../../icons/ui/ShortArrow'
import './Bio.css'
import { useTranslation } from '../../../../../context'

interface BioProps {
  description?: string
  fontSize?: number
  maxLines?: number
  className?: string
}

const Bio: React.FC<BioProps> = ({ description, maxLines = 7, className, fontSize = 14 }) => {
  const [viewMore, setViewMore] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const { t } = useTranslation()
  const bioTextRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (description && bioTextRef.current && bioTextRef.current.clientHeight > maxLines * (fontSize * 1.15)) {
      setViewMore(true)
    }
  }, [description, maxLines, fontSize, bioTextRef])

  return (
    <div className={clsx('profile-bio-text-container', className)}>
      <p
        ref={bioTextRef}
        className={clsx('profile-bio-text', { 'profile-bio-text-expanded': isExpanded })}
        style={{ lineClamp: maxLines, WebkitLineClamp: maxLines, fontSize: `${fontSize}px` }}
      >
        {description ? (
          description.split(' ').map((word) =>
            word.includes('@') && word.includes('.') ? (
              <a key={word} href={`https://efp.app/${word.replace('@', '')}`} className="profile-bio-link">
                {word}{' '}
              </a>
            ) : (
              `${word} `
            )
          )
        ) : (
          <i>{t('profile.noBio')}</i>
        )}
      </p>
      {viewMore && (
        <button className="profile-bio-expand-button" onClick={() => setIsExpanded(!isExpanded)}>
          <p>{isExpanded ? t('profile.showLess') : t('profile.showMore')}</p>{' '}
          <div style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            <ShortArrow height="16px" width="16px" />
          </div>
        </button>
      )}
    </div>
  )
}

export default Bio
