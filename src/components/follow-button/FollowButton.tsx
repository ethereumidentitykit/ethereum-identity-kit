import clsx from 'clsx'
import { useCoolMode, useFollowButton } from '../../hooks'
import FollowIcon from '../icons/ui/FollowIcon'
import LoadingCell from '../loading-cell/LoadingCell'
import { FOLLOW_BUTTON_COOL_EMOJI, FOLLOW_BUTTON_STYLES } from '../../constants'
import type { FollowButtonProps } from './FollowButton.types'
import './FollowButton.css'

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
  disabled,
  className,
  customLoader,
  ...props
}) => {
  const { buttonText, buttonState, handleAction, isLoading } = useFollowButton({
    lookupAddress,
    connectedAddress,
  })

  const buttonRef = useCoolMode(FOLLOW_BUTTON_COOL_EMOJI[buttonState], isLoading, disabled)

  return isLoading ? (
    customLoader || <LoadingCell height="39px" width="110px" radius="10px" />
  ) : (
    <button
      ref={buttonRef}
      className={clsx('follow-button', FOLLOW_BUTTON_STYLES[buttonState], className)}
      onClick={handleAction}
      disabled={disabled}
      {...props}
    >
      <FollowIcon
        height={20}
        width={14}
        color={buttonState === 'Muted' || buttonState === 'Blocked' ? '#ef4444' : '#333333'}
      />
      <p>{buttonText}</p>
    </button>
  )
}

export default FollowButton
