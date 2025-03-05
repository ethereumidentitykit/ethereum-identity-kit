import clsx from 'clsx'
import { useCoolMode, useFollowButton } from '../../hooks'
import { FollowIcon } from '../icons'
import LoadingCell from '../loading-cell/LoadingCell'
import { FOLLOW_BUTTON_COOL_EMOJI, FOLLOW_BUTTON_STYLES } from '../../constants/follow-button'
import type { FollowButtonProps } from './FollowButton.types'
import './FollowButton.css'
import { useRef } from 'react'

/**
 * Follower State Tag - displays the relation of address to connectedAddress/list
 *
 * @param lookupAddress - the address of the follower
 *
 * @param connectedAddress - the address of the currently connected user
 *
 * @param disabled - whether the button is disabled
 *
 * @param className - the additional class name to apply to the follower tag
 *
 * @param customLoader - the custom loader to use instead of the default one
 *
 * @param props - HTML div element props
 *
 * @returns FollowerTag component
 */
const FollowButton: React.FC<FollowButtonProps> = ({
  lookupAddress,
  connectedAddress,
  selectedList,
  disabled,
  onDisconnectedClick,
  sounds,
  className,
  customLoader,
  ...props
}) => {
  const { buttonText, buttonState, handleAction, isLoading, pendingState, disableHover, setDisableHover } =
    useFollowButton({
      lookupAddress,
      connectedAddress,
      selectedList,
    })

  const buttonRef = useCoolMode(FOLLOW_BUTTON_COOL_EMOJI[buttonState], isLoading, disabled)

  const soundRef = useRef<HTMLAudioElement>(null)
  const playSound = sounds ? sounds[buttonState] : undefined

  const onClick = () => {
    if (connectedAddress) {
      handleAction()

      if (playSound && soundRef.current) {
        soundRef.current.volume = 0.3
        soundRef.current.currentTime = 0
        soundRef.current.play()
      }
    } else {
      onDisconnectedClick?.()
    }
  }

  return isLoading ? (
    customLoader || <LoadingCell height="39px" width="110px" radius="4px" />
  ) : (
    <button
      ref={buttonRef}
      className={clsx(
        'follow-button',
        FOLLOW_BUTTON_STYLES[buttonState],
        pendingState && 'pending',
        disableHover && 'disable-hover',
        className
      )}
      onClick={onClick}
      onMouseLeave={() => setDisableHover(false)}
      disabled={disabled}
      {...props}
    >
      <audio src={playSound} ref={soundRef} />
      <FollowIcon
        height={20}
        width={14}
        color={buttonText === 'Muted' || buttonText === 'Blocked' ? '#ef4444' : '#333333'}
      />
      <p>{buttonText}</p>
    </button>
  )
}

export default FollowButton
