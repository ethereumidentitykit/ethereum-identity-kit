import clsx from 'clsx'
import { useRef } from 'react'
import { useCoolMode, useFollowButton } from '../../hooks'
import { FollowIcon } from '../icons'
import LoadingCell from '../loading-cell/LoadingCell'
import { FOLLOW_BUTTON_COOL_EMOJI, FOLLOW_BUTTON_STYLES } from '../../constants/follow-button'
import type { FollowButtonProps } from './FollowButton.types'
import './FollowButton.css'

/**
 * Follow Button - displays current state of the relation between lookupAddress and connectedAddress
 * and allows the user to perform actions towards the lookupAddress
 *
 * @param lookupAddress - the address of the follower
 *
 * @param connectedAddress (optional) - the address of the currently connected user
 *
 * @param disabled (optional) - whether the button is disabled
 *
 * @param onDisconnectedClick (optional) - the function to call when the button is clicked and the user is not connected
 *
 * @param sounds (optional) - the sounds to play when the button is clicked
 *
 * @param customClassNames (optional) - the custom class names to apply to the button depending on the state of the button
 *
 * @param className (optional) - the additional class name to apply to the follower tag
 *
 * @param customLoader (optional) - the custom loader to use instead of the default one
 *
 * @param props - HTML button element props
 *
 * @returns FollowButton component
 */
const FollowButton: React.FC<FollowButtonProps> = ({
  lookupAddress,
  connectedAddress,
  selectedList,
  disabled,
  onDisconnectedClick,
  sounds,
  initialState,
  className,
  customClassNames,
  customLoader,
  ...props
}) => {
  const { buttonText, buttonState, handleAction, isLoading, pendingState, disableHover, setDisableHover } =
    useFollowButton({
      lookupAddress,
      connectedAddress,
      selectedList,
      initialState,
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
        (customClassNames || FOLLOW_BUTTON_STYLES)[buttonState],
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
      <FollowIcon height={20} width={14} color={'currentColor'} />
      <p>{buttonText}</p>
    </button>
  )
}

export default FollowButton
