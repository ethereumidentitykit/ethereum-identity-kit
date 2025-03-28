import { useCallback, useEffect, useState } from 'react'
import { useChainId, useChains, useSwitchChain, useWalletClient } from 'wagmi'

/**
 * useChain hook - keeps track of the current chain id and switching between chains
 *
 * @returns the current chain id and a function to switch chains
 */
export const useChain = () => {
  const { switchChain } = useSwitchChain()
  const initialCurrentChainId = useChainId()
  const { data: walletClient } = useWalletClient()

  const [currentChainId, setCurrentChainId] = useState(initialCurrentChainId)
  const getCurrentChain = useCallback(async () => {
    if (!walletClient) return

    const chainId = await walletClient.getChainId()
    setCurrentChainId(chainId)
  }, [walletClient])

  useEffect(() => {
    getCurrentChain()
  }, [walletClient])

  // check the current chain id and switch if it's not the correct chain
  const checkChain = useCallback(
    async ({ chainId, onSuccess, onError }: { chainId?: number; onSuccess?: () => void; onError?: () => void }) => {
      if (!chainId) return false
      if (currentChainId === chainId) return true

      await new Promise((resolve) => switchChain({ chainId }, { onSuccess, onError, onSettled: resolve }))
      return false
    },
    [currentChainId, switchChain]
  )

  // All supported chains
  const chains = useChains()
  const getChain = (chainId: number | undefined) => chains.find((chain) => chain.id === chainId)

  return {
    getChain,
    checkChain,
    currentChainId,
    setCurrentChainId,
  }
}
