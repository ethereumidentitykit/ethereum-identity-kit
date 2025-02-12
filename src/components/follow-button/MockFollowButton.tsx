import { useState } from 'react'
import './FollowButton.css'

type FollowingState =
  | 'Block'
  | 'Blocked'
  | 'Follow'
  | 'Pending Following'
  | 'Following'
  | 'Unfollow'
  | 'Mute'
  | 'Muted'
  | 'Pending Block'
  | 'Pending Mute'
  | 'Unblock'
  | 'Unmute'

const FOLLOW_BUTTON_STYLES: Record<FollowingState, string> = {
  Follow: 'follow-button-follow',
  Following: 'follow-button-following',
  Block: 'follow-button-block',
  Blocked: 'follow-button-blocked',
  Mute: 'follow-button-mute',
  Muted: 'follow-button-muted',
  'Pending Following': 'follow-button-pending',
  Unfollow: 'follow-button-unfollow',
  'Pending Block': 'follow-button-pending',
  'Pending Mute': 'follow-button-pending',
  Unblock: 'follow-button-unblock',
  Unmute: 'follow-button-unmute',
}

const FollowIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 32, color = '#333333' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 9.21289L5.35156 0.306641L10.6641 9.21289L5.35156 12.4551L0 9.21289Z" fill={color} />
      <path d="M5.35156 13.4316L0 10.1895L5.35156 17.7285L10.6641 10.1895L5.35156 13.4316Z" fill={color} />
      <path
        d="M12.1875 14.291H10.6641V16.5566H8.55469V17.9629H10.6641V20.3066H12.1875V17.9629H14.2578V16.5566H12.1875V14.291Z"
        fill={color}
      />
    </svg>
  )
}

export type MockFollowButtonProps = {
  lookupAddress: `0x${string}`
  connectedAddress?: `0x${string}`
  mockButtonState: FollowingState
  onDisconnectedClick?: () => void
  disabled?: boolean
  customLoader?: React.ReactNode
} & React.HTMLAttributes<HTMLButtonElement>

/* 
 * lookupAddress and connectedAddress will for now be logged to the console
 * since they are necessary for the real component to work
 * This will require less changes after the real component is implemented
 */
const MockFollowButton: React.FC<MockFollowButtonProps> = ({
  lookupAddress,
  connectedAddress,
  mockButtonState,
  disabled,
  onDisconnectedClick,
  className,
  ...props
}) => {
  const [buttonState, setButtonState] = useState<FollowingState>(mockButtonState)
  // This will log the state between the connectedAddress and the lookupAddress (remove if not needed)
  console.log('follow button', connectedAddress, buttonState, lookupAddress)

  const handleAction = () => {
    if (buttonState === 'Follow') {
      setButtonState('Following')
    } else if (buttonState === 'Following') {
      setButtonState('Unfollow')
    } else if (buttonState === 'Unfollow') {
      setButtonState('Follow')
    } else if (buttonState === 'Block') {
      setButtonState('Blocked')
    } else if (buttonState === 'Blocked') {
      setButtonState('Unblock')
    } else if (buttonState === 'Unblock') {
      setButtonState('Block')
    } else if (buttonState === 'Mute') {
      setButtonState('Muted')
    } else if (buttonState === 'Muted') {
      setButtonState('Unmute')
    } else if (buttonState === 'Unmute') {
      setButtonState('Mute')
    }
  }

  return (
    <button
      className={`follow-button ${FOLLOW_BUTTON_STYLES[buttonState]} ${className}`}
      onClick={() => (connectedAddress ? handleAction() : onDisconnectedClick?.())}
      disabled={disabled}
      {...props}
    >
      <FollowIcon
        height={20}
        width={14}
        color={buttonState === 'Muted' || buttonState === 'Blocked' ? '#ef4444' : '#333333'}
      />
      <p>{buttonState}</p>
    </button>
  )
}

export default MockFollowButton
