import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from '../../../context'
import { useCoolMode, useFollowButton } from '../../../hooks'
import { FollowIcon } from '../../icons'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import { FOLLOW_BUTTON_COOL_EMOJI, FOLLOW_BUTTON_STYLES } from '../../../constants/follow-button'
import type { FollowButtonProps } from './FollowButton.types'
import { TranslationKey } from '../../../types'
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
  customOnClick,
  onDisconnectedClick,
  sounds,
  initialState,
  className,
  customClassNames,
  customLoader,
  showBlockBack,
  showMuteBack,
  ...props
}) => {
  const { t } = useTranslation()
  const {
    buttonText,
    buttonState,
    handleAction,
    isLoading,
    pendingState,
    disableHover,
    setDisableHover,
    isDisabled,
    error,
    clearError,
    ariaLabel,
    ariaPressed,
  } = useFollowButton({
    lookupAddress,
    connectedAddress,
    selectedList,
    initialState,
    showBlockBack,
    showMuteBack,
  })

  const buttonRef = useCoolMode(FOLLOW_BUTTON_COOL_EMOJI[buttonState], isLoading, disabled)

  const soundRef = useRef<HTMLAudioElement>(null)
  const playSound = sounds ? sounds[buttonState] : undefined

  const onClick = () => {
    // Clear any existing errors when user tries again
    if (error) {
      clearError()
    }

    if (connectedAddress) {
      setDisableHover(true)

      if (customOnClick) {
        customOnClick(buttonState)
      } else {
        handleAction()
      }

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
        error && 'error',
        (buttonText === 'Block Back' || buttonText === 'Mute Back') && 'block-back',
        className
      )}
      onClick={onClick}
      onMouseLeave={() => setDisableHover(false)}
      disabled={disabled || isDisabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      title={error ? error.message : undefined}
      {...props}
    >
      <audio src={playSound} ref={soundRef} />
      <FollowIcon height={20} width={14} color={'currentColor'} />
      <p>{t(buttonText.toLowerCase() as TranslationKey)}</p>
    </button>
  )
}

export default FollowButton
