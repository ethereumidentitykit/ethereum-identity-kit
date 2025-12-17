import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useSiwe } from '../../../hooks'
import { useTranslation } from '../../../context/TranslationContext'
import { EthereumIcon } from '../../icons'
import { SignInButtonProps } from './SignInWithEthereum.types'
import UserProfile from './components/UserProfile'
import './SignInButton.css'

/**
 * Component to  allow signing in with Ethereum (SIWE) - https://login.xyz/
 *
 * @param message - The message to display to the user (optional)
 *
 * @param verifySignature - The function to verify the signature on your backend (required)
 *
 * @param getNonce - The function to get the nonce from your backend (required)
 *
 * @param onSignInSuccess - The function to call when the user signs in successfully (optional)
 *
 * @param onSignInError - The function to call when the user signs in fails (optional)
 *
 * @param onDisconnectedClick - The function to call when the user is not connected (optional)
 *
 * @param darkMode - Whether the profile is in dark mode (optional)
 *
 * @param expirationTime - The expiration time of the nonce (optional) default is 5 minutes
 *
 * @param autoSignInAfterConnection - Whether to automatically sign in after wallet connection (optional) default is false
 *
 * @returns SignInWithEthereum Button component
 */
const SignInWithEthereum = ({
  verifySignature,
  onSignInSuccess,
  onSignInError,
  message,
  getNonce,
  onDisconnectedClick,
  darkMode,
  expirationTime,
  autoSignInAfterConnection = false,
  onSignedInClick,
  isSignedIn,
  isDropdown,
  isDropdownOpen,
}: SignInButtonProps) => {
  const [signInAfterConnection, setSignInAfterConnection] = useState(false)
  const [hasClicked, setHasClicked] = useState(false)

  const { t } = useTranslation()
  const { handleSignIn, isSigningMessage, connectedAddress } = useSiwe({
    verifySignature,
    onSignInSuccess,
    onSignInError,
    message,
    getNonce,
    expirationTime,
  })

  useEffect(() => {
    if (connectedAddress && signInAfterConnection && hasClicked) {
      setSignInAfterConnection(false)
      setTimeout(handleSignIn, 750)
    }
  }, [connectedAddress, handleSignIn])

  return (
    <button
      className={clsx(
        'sign-in-button',
        darkMode && 'dark',
        isSignedIn && connectedAddress && 'sign-in-button-signed-in'
      )}
      onClick={() => {
        if (isSignedIn) {
          onSignedInClick?.()
        } else {
          if (connectedAddress) {
            handleSignIn()
          } else {
            if (autoSignInAfterConnection) {
              setSignInAfterConnection(true)
            }
            setHasClicked(true)
            onDisconnectedClick?.(handleSignIn)
          }
        }
      }}
      disabled={isSigningMessage}
      style={{ marginRight: '10px' }}
    >
      {isSignedIn && connectedAddress ? (
        <UserProfile address={connectedAddress} isDropdown={isDropdown} isDropdownOpen={isDropdownOpen} />
      ) : (
        <div className="sign-in-button-content">
          <EthereumIcon className="sign-in-ethereum-icon" height={20} width={20} />
          <p className="sign-in-button-text">{isSigningMessage ? t('singingIn') : t('signIn')}</p>
        </div>
      )}
    </button>
  )
}

export default SignInWithEthereum
