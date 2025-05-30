import { useAccount, useSignMessage } from 'wagmi'
import { useChain } from './useChain'
import { createSiweMessageString } from '../utils'
import { SignInWithEthereumProps } from '../components/molecules/sign-in-with-ethereum/SignInWithEthereum.types'

export const useSiwe = ({
  verifySignature,
  onSignInSuccess,
  onSignInError,
  message,
  getNonce,
  expirationTime,
}: SignInWithEthereumProps) => {
  const { address: connectedAddress } = useAccount()
  const { currentChainId } = useChain()
  const { signMessageAsync, isPending: isSigningMessage } = useSignMessage()

  const handleSignIn = async () => {
    if (!connectedAddress || !currentChainId) throw new Error('No connected address or current chain id')

    try {
      const nonce = await getNonce()
      const messageParams = {
        domain: window.location.host,
        address: connectedAddress,
        statement: message,
        uri: window.location.origin,
        version: '1',
        chainId: currentChainId,
        nonce,
        issuedAt: new Date().toISOString().slice(0, 19) + 'Z',
        expirationTime: expirationTime
          ? new Date(Date.now() + expirationTime).toISOString().slice(0, 19) + 'Z'
          : undefined,
      }

      const messageToSign = createSiweMessageString(messageParams)
      const signature = await signMessageAsync({ message: messageToSign })

      if (verifySignature) {
        // verifyFunction should handle its own try/catch for the backend call
        await verifySignature(messageToSign, nonce, signature)
      } else {
        console.warn('No verifyFunction provided to SignInWithEthereumButton. Signature obtained but not verified.')
      }

      if (onSignInSuccess) {
        onSignInSuccess({ address: connectedAddress, message: messageToSign, signature })
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error signing in:', err)
      let specificError = 'Sign-in process failed.'

      if (err.message) {
        if (
          err.message.includes('User rejected the request') ||
          (err.cause && err.cause.message && err.cause.message.includes('User rejected the request'))
        ) {
          specificError = 'Message signature request was denied.'
        } else {
          specificError = err.message
        }
      } else if (typeof err === 'string') {
        specificError = err
      }

      if (onSignInError) {
        onSignInError(new Error(specificError))
      }
    }
  }

  return {
    handleSignIn,
    isSigningMessage,
    connectedAddress,
  }
}
