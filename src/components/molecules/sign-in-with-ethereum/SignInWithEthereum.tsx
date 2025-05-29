import clsx from 'clsx'
import { useSiwe } from '../../../hooks'
import { EthereumIcon } from '../../icons'
import { SignInWithEthereumProps } from './SignInWithEthereum.types'
import './SignInWithEthereum.css'

const SignInWithEthereum = ({
  verifySignature,
  onSignInSuccess,
  onSignInError,
  statement,
  getNonce,
  darkMode,
  expirationTime,
}: SignInWithEthereumProps) => {
  const { handleSignIn, isSigningMessage } = useSiwe({
    verifySignature,
    onSignInSuccess,
    onSignInError,
    statement,
    getNonce,
    expirationTime,
  })

  return (
    <button
      className={clsx(darkMode && 'dark', 'sign-in-with-ethereum-button')}
      onClick={handleSignIn}
      disabled={isSigningMessage}
      style={{ marginRight: '10px' }}
    >
      <EthereumIcon className="sign-in-with-ethereum-icon" />
      <p className="sign-in-with-ethereum-text">{isSigningMessage ? 'Signing Message...' : 'Sign-In with Ethereum'}</p>
    </button>
  )
}

export default SignInWithEthereum
