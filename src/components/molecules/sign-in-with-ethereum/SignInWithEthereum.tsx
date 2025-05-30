import clsx from 'clsx'
import { useSiwe } from '../../../hooks'
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
  darkMode,
  expirationTime,
}: SignInWithEthereumProps) => {
  const { handleSignIn, isSigningMessage } = useSiwe({
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
      onClick={handleSignIn}
      disabled={isSigningMessage}
      style={{ marginRight: '10px' }}
    >
      <EthereumIcon className="sign-in-with-ethereum-icon" />
      <p className="sign-in-with-ethereum-text">{isSigningMessage ? 'Signing Message...' : 'Sign in with Ethereum'}</p>
    </button>
  )
}

export default SignInWithEthereum
