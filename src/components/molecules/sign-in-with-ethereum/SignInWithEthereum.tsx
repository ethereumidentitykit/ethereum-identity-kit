import clsx from 'clsx'
import { useSiwe } from '../../../hooks'
import { useTranslation } from '../../../context/TranslationContext'
import { EthereumIcon } from '../../icons'
import { SignInWithEthereumProps } from './SignInWithEthereum.types'
import './SignInWithEthereum.css'

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
}: SignInWithEthereumProps) => {
  const { t } = useTranslation()
  const { handleSignIn, isSigningMessage, connectedAddress } = useSiwe({
    verifySignature,
    onSignInSuccess,
    onSignInError,
    message,
    getNonce,
    expirationTime,
  })

  return (
    <button
      className={clsx('sign-in-with-ethereum-button', darkMode && 'dark')}
      onClick={connectedAddress ? handleSignIn : () => onDisconnectedClick?.()}
      disabled={isSigningMessage}
      style={{ marginRight: '10px' }}
    >
      <EthereumIcon className="sign-in-with-ethereum-icon" />
      <p className="sign-in-with-ethereum-text">{isSigningMessage ? t('signingMessage') : t('signInWithEthereum')}</p>
    </button>
  )
}

export default SignInWithEthereum
