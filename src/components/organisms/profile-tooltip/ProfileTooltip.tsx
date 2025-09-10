import React, { useRef, useState, useEffect, useCallback } from 'react'
import { clsx } from 'clsx'
import ProfileCard from './ProfileTooltipCard'
import { useTooltipPosition } from '../../../hooks'
import { ProfileTooltipWrapperProps } from './ProfileTooltip.types'
import './ProfileTooltip.css'

/**
 * ProfileTooltip component
 *
 * @param children - elements that tooltip is wrapping (React.ReactElement)
 * @param verticalPlacement - where to position the tooltip by default (TooltipPlacement)
 * @param horizontalPlacement - where to align the tooltip (left | right)
 * @param offset - number
 * @param showArrow - show arrow that points to the wrapped element (boolean)
 * @param showDelay - wait before showing the tooltip (number)
 * @param hideDelay - wait before hiding the tooltip (number)
 * @param flipBehavior - flip the tooltip to the opposite side if no space is available (FlipBehavior)
 * @param boundary - boundary of the tooltip (Boundary)
 * @param keepTooltipOnHover - keep the tooltip open when hovering over it (boolean)
 * @param profileCardProps - props for the ProfileTooltipCard component (ProfileTooltipProps)
 *
 * @returns ProfileTooltip component
 */
const ProfileTooltip: React.FC<ProfileTooltipWrapperProps> = ({
  children,
  verticalPlacement = 'auto',
  horizontalPlacement = 'left',
  verticalOffset = 8,
  horizontalOffset = 0,
  showArrow = false,
  showDelay = 100,
  hideDelay = 100,
  flipBehavior = 'flip',
  boundary = 'viewport',
  keepTooltipOnHover = true,
  ...profileCardProps
}) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const { position, actualPlacement, arrowPosition, updatePosition } = useTooltipPosition(triggerRef, tooltipRef, {
    verticalPlacement,
    horizontalPlacement,
    verticalOffset,
    horizontalOffset,
    flipBehavior,
    boundary,
  })

  // TODO: Add outside click handling if needed

  const showTooltip = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }

    if (!isVisible) {
      showTimeoutRef.current = setTimeout(() => {
        setIsMounted(true)
        // Use requestAnimationFrame to ensure DOM is ready before showing
        requestAnimationFrame(() => {
          setIsVisible(true)
          updatePosition()
        })
      }, showDelay)
    }
  }, [isVisible, showDelay, updatePosition])

  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current)
      showTimeoutRef.current = null
    }

    if (isVisible) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
        // Wait for animation to complete before unmounting
        setTimeout(() => setIsMounted(false), 200)
      }, hideDelay)
    }
  }, [isVisible, hideDelay])

  const handleMouseEnter = () => {
    showTooltip()
  }

  const handleMouseLeave = () => {
    hideTooltip()
  }

  // Update position on scroll or resize
  useEffect(() => {
    if (!isVisible) return

    const handleUpdate = () => {
      updatePosition()
    }

    // Throttle updates for better performance
    let ticking = false
    const throttledUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleUpdate()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledUpdate, true)
    window.addEventListener('resize', throttledUpdate)

    return () => {
      window.removeEventListener('scroll', throttledUpdate, true)
      window.removeEventListener('resize', throttledUpdate)
    }
  }, [isVisible, updatePosition])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  return (
    <div
      className="tooltip-wrapper"
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={keepTooltipOnHover ? handleMouseEnter : undefined}
      onMouseLeave={keepTooltipOnHover ? handleMouseLeave : undefined}
    >
      <div
        ref={triggerRef}
        onMouseEnter={keepTooltipOnHover ? undefined : handleMouseEnter}
        onMouseLeave={keepTooltipOnHover ? undefined : handleMouseLeave}
        className="tooltip-child"
      >
        {children}
      </div>
      {isMounted && (
        <div
          ref={tooltipRef}
          className={clsx(
            'profile-tooltip-content',
            `profile-tooltip--${actualPlacement}`,
            isVisible && 'profile-tooltip--visible'
          )}
          style={{
            position: 'absolute',
            ...position,
            pointerEvents: isVisible ? 'auto' : 'none',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <ProfileCard {...profileCardProps} />
          {showArrow && (
            <div
              className={clsx('profile-tooltip-arrow', `profile-tooltip-arrow--${actualPlacement}`)}
              style={arrowPosition}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ProfileTooltip
