import { useEffect, useState, useCallback, useRef, RefObject } from 'react'

export type TooltipPlacement = 'auto' | 'top' | 'bottom'

export type FlipBehavior = 'flip' | 'shift' | 'hide'
export type Boundary = 'viewport' | 'scrollParent' | HTMLElement

interface CollisionData {
  top: number
  right: number
  bottom: number
  left: number
  visible: boolean
}

interface Position {
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
}

interface UseTooltipPositionOptions {
  verticalPlacement?: TooltipPlacement
  horizontalPlacement?: 'left' | 'right'
  offset?: number
  boundary?: Boundary
  flipBehavior?: FlipBehavior
  arrowPadding?: number
}

interface UseTooltipPositionReturn {
  position: Position
  actualPlacement: TooltipPlacement
  arrowPosition: Position
  updatePosition: () => void
  isColliding: boolean
}

const PLACEMENT_OPPOSITES: Record<string, string> = {
  top: 'bottom',
  bottom: 'top',
}

export const useTooltipPosition = (
  triggerRef: RefObject<HTMLElement>,
  tooltipRef: RefObject<HTMLElement>,
  options: UseTooltipPositionOptions = {}
): UseTooltipPositionReturn => {
  const {
    verticalPlacement = 'auto',
    horizontalPlacement = 'left',
    offset = 8,
    boundary = 'viewport',
    flipBehavior = 'flip',
    arrowPadding = 8,
  } = options

  const [position, setPosition] = useState<Position>({})
  const [actualPlacement, setActualPlacement] = useState<TooltipPlacement>(
    verticalPlacement === 'auto' ? 'top' : verticalPlacement
  )
  const [arrowPosition, setArrowPosition] = useState<Position>({})
  const [isColliding, setIsColliding] = useState(false)

  const cachedPositionRef = useRef<{ trigger: DOMRect; tooltip: DOMRect } | null>(null)
  const rafIdRef = useRef<number | null>(null)

  const getBoundaryElement = useCallback((): Element => {
    if (boundary === 'viewport') {
      return document.documentElement
    } else if (boundary === 'scrollParent') {
      let parent = triggerRef.current?.parentElement
      while (parent) {
        const { overflow, overflowX, overflowY } = getComputedStyle(parent)
        if (/(auto|scroll|overlay)/.test(overflow + overflowX + overflowY)) {
          return parent
        }
        parent = parent.parentElement
      }
      return document.documentElement
    } else if (boundary instanceof HTMLElement) {
      return boundary
    }
    return document.documentElement
  }, [boundary, triggerRef])

  const getAvailableSpace = useCallback((triggerRect: DOMRect, boundaryRect: DOMRect): Record<string, number> => {
    return {
      top: triggerRect.top - boundaryRect.top,
      bottom: boundaryRect.bottom - triggerRect.bottom,
      left: triggerRect.left - boundaryRect.left,
      right: boundaryRect.right - triggerRect.right,
    }
  }, [])

  const detectCollisions = useCallback((rect: DOMRect, boundaryRect: DOMRect): CollisionData => {
    return {
      top: rect.top - boundaryRect.top,
      right: boundaryRect.right - rect.right,
      bottom: boundaryRect.bottom - rect.bottom,
      left: rect.left - boundaryRect.left,
      visible:
        rect.top >= boundaryRect.top &&
        rect.right <= boundaryRect.right &&
        rect.bottom <= boundaryRect.bottom &&
        rect.left >= boundaryRect.left,
    }
  }, [])

  const calculatePositionForPlacement = useCallback(
    (placement: TooltipPlacement, triggerRect: DOMRect, tooltipRect: DOMRect, offset: number): Position => {
      const position: Position = {}

      // Calculate main axis position
      switch (placement) {
        case 'top':
          position.bottom = `calc(100% + ${offset}px)`
          break
        case 'bottom':
          position.top = `calc(100% + ${offset}px)`
          break
      }

      // Always align to the left side of the trigger
      if (horizontalPlacement === 'left') {
        position.left = 0
      } else {
        position.right = 0
      }

      return position
    },
    []
  )

  const calculateArrowPosition = useCallback(
    (placement: TooltipPlacement, triggerRect: DOMRect): Position => {
      const arrowPos: Position = {}

      // Position arrow on the opposite side of tooltip
      switch (placement) {
        case 'top':
          arrowPos.bottom = '-4px'
          break
        case 'bottom':
          arrowPos.top = '-4px'
          break
      }

      // Position arrow relative to trigger width, with padding from edge
      if (horizontalPlacement === 'left') {
        arrowPos.left = `${Math.min(triggerRect.width / 2, arrowPadding + 8)}px`
      } else {
        arrowPos.right = `${Math.min(triggerRect.width / 2, arrowPadding + 8)}px`
      }

      return arrowPos
    },
    [arrowPadding]
  )

  const findBestPlacement = useCallback(
    (triggerRect: DOMRect, tooltipRect: DOMRect, boundaryRect: DOMRect): TooltipPlacement => {
      const space = getAvailableSpace(triggerRect, boundaryRect)

      // Always prefer top if it fits, otherwise use bottom
      if (space.top >= tooltipRect.height + offset) {
        return 'top'
      } else if (space.bottom >= tooltipRect.height + offset) {
        return 'bottom'
      }

      // If neither top nor bottom fit well, choose the one with more space
      return space.top >= space.bottom ? 'top' : 'bottom'
    },
    [getAvailableSpace, offset]
  )

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    // Cancel any pending animation frame
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (!triggerRef.current || !tooltipRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const boundaryElement = getBoundaryElement()
      const boundaryRect = boundaryElement.getBoundingClientRect()

      // Determine placement
      let finalPlacement =
        verticalPlacement === 'auto' ? findBestPlacement(triggerRect, tooltipRect, boundaryRect) : verticalPlacement

      // Calculate initial position
      let calculatedPosition = calculatePositionForPlacement(finalPlacement, triggerRect, tooltipRect, offset)

      // Check for collisions
      const testRect = {
        ...tooltipRect,
        top: triggerRect.top + (calculatedPosition.top ? parseFloat(calculatedPosition.top.toString()) : 0),
        left: triggerRect.left + (calculatedPosition.left ? parseFloat(calculatedPosition.left.toString()) : 0),
        right: triggerRect.right + (calculatedPosition.right ? parseFloat(calculatedPosition.right.toString()) : 0),
        bottom: triggerRect.bottom + (calculatedPosition.bottom ? parseFloat(calculatedPosition.bottom.toString()) : 0),
      }

      const collision = detectCollisions(testRect, boundaryRect)
      setIsColliding(!collision.visible)

      // Apply flip behavior if needed
      if (!collision.visible && flipBehavior === 'flip' && verticalPlacement !== 'auto') {
        const oppositePlacement = PLACEMENT_OPPOSITES[finalPlacement] as TooltipPlacement
        if (oppositePlacement) {
          const oppositePosition = calculatePositionForPlacement(oppositePlacement, triggerRect, tooltipRect, offset)

          // Test if opposite placement is better
          const oppositeTestRect = {
            ...tooltipRect,
            top: triggerRect.top + (oppositePosition.top ? parseFloat(oppositePosition.top.toString()) : 0),
            left: triggerRect.left + (oppositePosition.left ? parseFloat(oppositePosition.left.toString()) : 0),
          }

          const oppositeCollision = detectCollisions(oppositeTestRect, boundaryRect)
          if (
            oppositeCollision.visible ||
            Math.abs(oppositeCollision.top) +
              Math.abs(oppositeCollision.bottom) +
              Math.abs(oppositeCollision.left) +
              Math.abs(oppositeCollision.right) >
              Math.abs(collision.top) +
                Math.abs(collision.bottom) +
                Math.abs(collision.left) +
                Math.abs(collision.right)
          ) {
            finalPlacement = oppositePlacement
            calculatedPosition = oppositePosition
          }
        }
      }

      // Calculate arrow position
      const arrowPos = calculateArrowPosition(finalPlacement, triggerRect)

      // Cache the position
      cachedPositionRef.current = { trigger: triggerRect, tooltip: tooltipRect }

      // Update state
      setPosition(calculatedPosition)
      setActualPlacement(finalPlacement)
      setArrowPosition(arrowPos)
    })
  }, [
    triggerRef,
    tooltipRef,
    verticalPlacement,
    offset,
    flipBehavior,
    getBoundaryElement,
    findBestPlacement,
    calculatePositionForPlacement,
    detectCollisions,
    calculateArrowPosition,
  ])

  // Update position when refs change
  useEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      updatePosition()
    }
  }, [triggerRef.current, tooltipRef.current, updatePosition])

  // Set up resize observer for dynamic content
  useEffect(() => {
    if (!tooltipRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      updatePosition()
    })

    resizeObserver.observe(tooltipRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [tooltipRef, updatePosition])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return {
    position,
    actualPlacement,
    arrowPosition,
    updatePosition,
    isColliding,
  }
}
