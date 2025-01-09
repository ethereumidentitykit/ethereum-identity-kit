import clsx from 'clsx'
import { useCoolMode } from '../../hooks/useCoolMode'
import { useFollowButton } from '../../hooks/useFollowButton'
import FollowIcon from '../icons/ui/FollowIcon'
import LoadingCell from '../loading-cell/LoadingCell'
import { FOLLOW_BUTTON_COOL_EMOJI, FOLLOW_BUTTON_STYLES } from '../../constants/follow-button'
import type { FollowButtonProps } from './FollowButton.types'
import './FollowButton.css'

/**
 * Follower State Tag - displays the relation of address to connectedAddress/list
 *
 * @param address - the address of the follower
 *
 * @param connectedAddress - the address of the currently connected user
 *
 * @param list - the list of the user (selected list in EFP app)
 *
 * @param className - the class name to apply to the follower tag
 *
 * @param showLoading - whether to show the loading cell
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
