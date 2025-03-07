import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import ShortArrow from '../../../icons/ui/ShortArrow'
import './Bio.css'

interface BioProps {
  description?: string
  fontSize?: number
  maxLines?: number
  className?: string
}

const Bio: React.FC<BioProps> = ({ description, maxLines = 7, className, fontSize = 14 }) => {
  const [viewMore, setViewMore] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const bioTextEl = document.querySelector('.profile-bio-text')
    if (description && bioTextEl && bioTextEl.clientHeight > maxLines * Math.floor(fontSize * 1.2)) {
      setViewMore(true)
    }
  }, [description])

  return (
    <div className={clsx('profile-bio-text-container', className)}>
      <p
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
          <i>No bio set</i>
        )}
      </p>
      {viewMore && (
        <button className="profile-bio-expand-button" onClick={() => setIsExpanded(!isExpanded)}>
          <p>{isExpanded ? 'Show less' : 'Show more'}</p>{' '}
          <div style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            <ShortArrow height="16px" width="16px" />
          </div>
        </button>
      )}
    </div>
  )
}

export default Bio
