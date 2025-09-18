import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useWriteContracts, useCapabilities } from 'wagmi/experimental'
import { useWalletClient, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { useChain } from './useChain'
import { useTransactions } from '../context'
import { EFP_API_URL } from '../constants'
import { EFPActionIds } from '../constants/transactions'
import { ChainIcons, chains } from '../constants/chains'
import { SubmitButtonText, TransactionType } from '../types'
import { useETHPrice } from './useETHPrice'

export const useTransactionItem = (id: number, transaction: TransactionType) => {
  const {
    lists,
    pendingTxs,
    setPendingTxs,
    currentTxIndex,
    paymasterService,
    setCurrentTxIndex,
    resetTransactions,
    goToNextTransaction,
    refetchAssociatedQueries,
  } = useTransactions()

  const {
    writeContractsAsync,
    isPending: writePending,
    isSuccess: writeSuccess,
    isError: writeError,
  } = useWriteContracts()
  const {
    isPending: receiptPending,
    isSuccess: receiptSuccess,
    isError: receiptError,
  } = useWaitForTransactionReceipt({
    hash: transaction.hash,
    chainId: transaction.chainId,
  })

  const { address: userAddress } = useAccount()
  const { data: walletClient } = useWalletClient()

  // Check for paymaster capabilities with `useCapabilities`
  const { data: availableCapabilities } = useCapabilities({
    account: walletClient?.account,
  })
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !walletClient?.account || !transaction.chainId || !paymasterService) return {}
    const capabilitiesForChain = availableCapabilities[transaction.chainId]
    if (capabilitiesForChain['paymasterService'] && capabilitiesForChain['paymasterService'].supported) {
      return {
        paymasterService: {
          url: paymasterService,
        },
      }
    }
    return {}
  }, [availableCapabilities, transaction.chainId, paymasterService])

  const usesPaymaster = useMemo(
    () => Boolean(paymasterService && capabilities?.paymasterService?.url),
    [paymasterService, capabilities]
  )

  const { currentChainId, checkChain } = useChain()
  const isCorrectChain = useMemo(() => currentChainId === transaction.chainId, [currentChainId, transaction.chainId])
  const ChainIcon = transaction.chainId ? ChainIcons[transaction.chainId as keyof typeof ChainIcons] : null

  // Whether the transaction is active (displayed in the transaction modal)
  const isActive = useMemo(() => {
    return typeof currentTxIndex === 'number' && currentTxIndex === id
  }, [currentTxIndex, id])

  const estimatedGas = '0.00'

  // const estimateGas = async () => {
  //   if (!transaction.chainId || !walletClient) return
  //   if (usesPaymaster) return

  //   try {
  //     // Estimate the Ethereum Mainnet gas
  //     if (transaction.chainId === sepolia.id) {
  //       const publicClient = createPublicClient({
  //         chain: sepolia,
  //         transport: http(),
  //       })

  //       const gas = await publicClient.estimateContractGas({
  //         account: walletClient.account,
  //         address: transaction.address,
  //         abi: transaction.abi,
  //         functionName: transaction.functionName,
  //         args: transaction.args,
  //       })

  //       const formattedGas = Number(formatEther(gas * BigInt(gasPrice || 0))).toLocaleString(undefined, {
  //         maximumFractionDigits: 8,
  //         minimumFractionDigits: 2,
  //       })

  //       setEstimatedGas(formattedGas)
  //       return
  //     }

  //     // Estimate the gas for the transaction on any L2 chain
  //     const publicClient = createPublicClient({
  //       chain: chains.find((chain) => chain.id === transaction.chainId),
  //       transport: http(),
  //     }).extend(publicActionsL2())

  //     const gas = await publicClient.estimateContractTotalFee({
  //       account: walletClient.account,
  //       address: transaction.address,
  //       abi: transaction.abi,
  //       functionName: transaction.functionName,
  //       args: transaction.args,
  //     })

  //     const formattedGas = Number(formatEther(gas)).toLocaleString(undefined, {
  //       maximumFractionDigits: 8,
  //       minimumFractionDigits: 2,
  //     })

  //     setEstimatedGas(formattedGas)
  //   } catch (err) {
  //     console.error("Couldn't estimate gas for transaction", transaction.id, (err as Error).message.slice(0, 172))
  //   }
  // }

  // useEffect(() => {
  //   estimateGas()
  // }, [transaction.chainId, walletClient, gasPrice])

  const { price: ethPrice } = useETHPrice()

  const { mutate: initiateTransaction } = useMutation({
    mutationFn: async () => {
      if (!transaction.chainId) return

      const hash = usesPaymaster
        ? await writeContractsAsync({
            account: walletClient?.account,
            contracts: [
              {
                address: transaction.address,
                abi: transaction.abi,
                functionName: transaction.functionName,
                args: transaction.args,
              },
            ],
            capabilities,
          }).then((hash) => {
            // Older versions of wagmi are returning a string
            if (typeof hash === 'string') return (hash as string).slice(0, 66) as `0x${string}`
            // Newer versions of wagmi are returning an object where hash is in the id property
            return hash.id?.slice(0, 66) as `0x${string}`
          })
        : await walletClient?.writeContract({
            address: transaction.address,
            abi: transaction.abi,
            functionName: transaction.functionName,
            args: transaction.args,
          })

      if (!hash) {
        throw new Error('Failed to initiate transaction')
      }

      return hash
    },
    onSuccess: (hash) => {
      setPendingTxs((pendingTxs) => {
        const newPendingTxs = [...pendingTxs]
        newPendingTxs[id] = { ...newPendingTxs[id], hash }
        return newPendingTxs
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleClick = () => {
    if (transaction.hash && isSuccess) {
      goToNextTransaction()
    } else {
      if (!isCorrectChain) {
        checkChain({ chainId: transaction.chainId })
      } else {
        initiateTransaction()
      }
    }
  }

  const handleCancel = () => {
    resetTransactions()
  }

  const isPending = usesPaymaster ? writePending : receiptPending
  const isSuccess = usesPaymaster ? writeSuccess : receiptSuccess
  const isError = usesPaymaster ? writeError : receiptError

  // Delay last transaction due to indexing
  const [lastTransactionSuccessful, setLastTransactionSuccessful] = useState(false)
  const isLastTransaction = useMemo(() => id === pendingTxs.length - 1, [id, pendingTxs])
  useEffect(() => {
    // Only add delay to last transaction if it's an EFP action
    const actionIds = Object.values(EFPActionIds)
    if (!actionIds.includes(transaction.id)) return setLastTransactionSuccessful(true)

    if (isLastTransaction && isSuccess) {
      const timeout = setTimeout(
        () => {
          setLastTransactionSuccessful(true)
          refetchAssociatedQueries()
        },
        usesPaymaster ? 10000 : 6000
      )
      return () => clearTimeout(timeout)
    }
  }, [isLastTransaction, isSuccess])

  const transactionDetails = useMemo(() => {
    return {
      hash: transaction.hash,
      chain: {
        id: transaction.chainId,
        name: chains.find((chain) => chain.id === transaction.chainId)?.name as string,
        icon: ChainIcon,
      },
      gasEth: usesPaymaster ? 'Sponsored' : `${estimatedGas || '0.00'} ETH`,
      gasUsd: estimatedGas
        ? Number(estimatedGas) * (ethPrice || 0) < 0.01
          ? '< $0.01'
          : `$${(Number(estimatedGas) * (ethPrice || 0)).toLocaleString(undefined, {
              currency: 'USD',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}`
        : '$0.00',
    }
  }, [transaction, ChainIcon, estimatedGas, lists, usesPaymaster])

  const submitButtonText: SubmitButtonText = transaction.hash
    ? isPending
      ? 'pending'
      : isError
        ? 'reInitiate'
        : isLastTransaction
          ? lastTransactionSuccessful
            ? 'finish'
            : 'indexing'
          : 'next'
    : isCorrectChain
      ? 'initiate'
      : 'switchChain'

  // Users can claim a POAP after minting a new list
  const [claimPOAP, setClaimPOAP] = useState(false)
  const [poapLink, setPoapLink] = useState('')

  const fetchPoapLink = async () => {
    try {
      const response = await fetch(`${EFP_API_URL}/users/${userAddress}/poap`)
      const data = await response.json()
      setPoapLink(data.link)
    } catch (error) {
      console.error(error)
      setPoapLink('')
      setClaimPOAP(false)
    }
  }

  useEffect(() => {
    if (!lists?.primary_list && transaction.id === EFPActionIds.CreateEFPList && transaction.hash) {
      if (isSuccess) setClaimPOAP(true)
      if (!poapLink) fetchPoapLink()
    }
  }, [transaction.hash, isSuccess])

  return {
    isActive,
    poapLink,
    claimPOAP,
    setClaimPOAP,
    handleClick,
    handleCancel,
    submitButtonText,
    transactionDetails,
    currentTxIndex,
    setCurrentTxIndex,
    usesPaymaster,
  }
}
