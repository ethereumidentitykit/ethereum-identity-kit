import { formatEther, http } from 'viem'
import { createPublicClient } from 'viem'
import { publicActionsL2 } from 'viem/op-stack'
import { useCapabilities } from 'wagmi/experimental'
import { useEffect, useMemo, useState } from 'react'
import { baseSepolia, optimismSepolia, sepolia } from 'viem/chains'
import { useBalance, useGasPrice, useWalletClient } from 'wagmi'
import { useTransactions } from '../../../../../context'
import { useTranslation } from '../../../../../context/TranslationContext'
import { Arrow } from '../../../../icons'
import Actions from '../actions'
import ListSettings from '../list-settings'
import LoadingCell from '../../../../atoms/loading-cell/LoadingCell'
import { ChainIcons, chains } from '../../../../../constants/chains'
import { EFPActionIds } from '../../../../../constants/transactions'
import { EFPActionType, TransactionType } from '../../../../../types/transactions'
import './Summary.css'

export default function Summary() {
  const { t } = useTranslation()
  const {
    pendingTxs,
    selectedChainId,
    setCurrentTxIndex,
    batchTransactions,
    setSelectedChainId,
    setChangesOpen,
    setTxModalOpen,
    currentTxIndex,
    resetTransactions,
    paymasterService,
    defaultChainId,
  } = useTransactions()

  const { data: gasPrice } = useGasPrice({
    chainId: sepolia.id,
  })
  const { data: walletClient } = useWalletClient()
  const { data: availableCapabilities } = useCapabilities({
    account: walletClient?.account,
  })
  const { data: balanceMainnet } = useBalance({
    address: walletClient?.account.address,
    chainId: sepolia.id,
  })
  const { data: balanceBase } = useBalance({
    address: walletClient?.account.address,
    chainId: baseSepolia.id,
  })
  const { data: balanceOptimism } = useBalance({
    address: walletClient?.account.address,
    chainId: optimismSepolia.id,
  })
  const [gasIsLoading, setGasIsLoading] = useState(false)
  const [insufficientGas, setInsufficientGas] = useState<Record<string, boolean>>({
    [sepolia.name]: false,
    [baseSepolia.name]: false,
    [optimismSepolia.name]: false,
  })

  const estimateGas = async () => {
    if (!balanceMainnet || !balanceBase || !balanceOptimism) {
      setGasIsLoading(false)
      return
    }

    const gasErrors: Record<string, boolean> = {
      [sepolia.id]: false,
      [baseSepolia.id]: false,
      [optimismSepolia.id]: false,
    }

    const totalGas: Record<number, number> = {
      [sepolia.id]: 0,
      [baseSepolia.id]: 0,
      [optimismSepolia.id]: 0,
    }

    await Promise.all(
      pendingTxs.map(async (tx) => {
        if (!tx.chainId || !walletClient) return

        if (paymasterService && availableCapabilities) {
          const capabilitiesForChain = availableCapabilities[tx.chainId]
          if (capabilitiesForChain['paymasterService'] && capabilitiesForChain['paymasterService'].supported) {
            return
          }
        }

        try {
          if (tx.chainId === sepolia.id) {
            const publicClient = createPublicClient({
              chain: sepolia,
              transport: http(),
            })

            const gas = await publicClient.estimateContractGas({
              account: walletClient.account,
              address: tx.address,
              abi: tx.abi,
              functionName: tx.functionName,
              args: tx.args,
            })

            totalGas[tx.chainId] += Number(formatEther(gas * BigInt(gasPrice || 0)))
            return
          }

          const publicClient = createPublicClient({
            chain: chains.find((chain) => chain.id === tx.chainId),
            transport: http(),
          }).extend(publicActionsL2())

          const gas = await publicClient.estimateContractTotalFee({
            account: walletClient.account,
            address: tx.address,
            abi: tx.abi,
            functionName: tx.functionName,
            args: tx.args,
          })

          totalGas[tx.chainId] += Number(formatEther(gas))
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          if (
            errorMessage.includes('insufficient funds for transfer') ||
            errorMessage.includes('gas required exceeds allowance')
          ) {
            gasErrors[tx.chainId] = true
          }
        }
      })
    )

    // console.log(gasErrors, totalGas, Number(formatEther(balanceBase.value)), Number(formatEther(balanceMainnet.value)), Number(formatEther(balanceOptimism.value)))

    setInsufficientGas({
      [sepolia.name]:
        gasErrors[sepolia.id] ||
        (totalGas[sepolia.id] > Number(formatEther(balanceMainnet.value)) &&
          pendingTxs.some((tx) => tx.chainId === sepolia.id)),
      [baseSepolia.name]:
        gasErrors[baseSepolia.id] ||
        (totalGas[baseSepolia.id] > Number(formatEther(balanceBase.value)) && pendingTxs.some((tx) => tx.chainId === baseSepolia.id)),
      [optimismSepolia.name]:
        gasErrors[optimismSepolia.id] ||
        (totalGas[optimismSepolia.id] > Number(formatEther(balanceOptimism.value)) &&
          pendingTxs.some((tx) => tx.chainId === optimismSepolia.id)),
    })

    setGasIsLoading(false)
  }

  useEffect(() => {
    setGasIsLoading(true)
    estimateGas()
  }, [pendingTxs, gasPrice, balanceMainnet, balanceBase, balanceOptimism, paymasterService, availableCapabilities])

  const onSummaryClose = () => {
    const mintTxIndex = pendingTxs.findIndex((tx) => tx.id === EFPActionIds.CreateEFPList)
    if (mintTxIndex >= 0 && !defaultChainId) return setSelectedChainId(undefined)
    if (batchTransactions) return setChangesOpen(true)
    else {
      setTxModalOpen(false)
      resetTransactions()
    }
  }

  const groupedTransactions = useMemo(() => Object.groupBy(pendingTxs, (tx) => tx.id), [pendingTxs])

  const displayedChanges = (id: EFPActionType | string, txs: TransactionType[]) => {
    switch (id) {
      case EFPActionIds.UpdateEFPList:
        return <Actions transactions={txs} />
      case EFPActionIds.SetEFPListSettings:
        return <ListSettings txs={txs} />
      // case EFPActionIds.UpdateENSProfile:
      //   return <UpdateENSProfile txs={txs} />
      default:
        return txs?.map((tx) => (
          <div key={tx.id} className="summary-item-transaction-container">
            <p className="summary-item-transaction-title">{tx.title}</p>
            <p className="summary-item-transaction-description">{tx.description}</p>
          </div>
        ))
    }
  }

  const isSummaryVisible =
    currentTxIndex === undefined &&
    (pendingTxs.some((tx) => tx.id === EFPActionIds.UpdateEFPList) ? selectedChainId : true)

  return (
    <div className="summary-container">
      <div className="transaction-modal-arrow-back" onClick={onSummaryClose}>
        <Arrow height={18} width={18} />
      </div>
      <p className="summary-title">{t('summary.title')}</p>
      <div className="summary-items-container" style={{ display: isSummaryVisible ? 'flex' : 'none' }}>
        {Object.entries(groupedTransactions).map(([id, txs]) => {
          if (!txs) return null
          const Chain = chains.find((chain) => chain.id === txs?.[0]?.chainId)
          if (!Chain) return null
          const chainName = Chain.name
          const ChainIcon = ChainIcons[Chain.id]

          return (
            <div key={id} className="summary-item-container">
              <div className="summary-item-chain-container">
                <p>
                  {txs?.length} {txs?.length === 1 ? t('summary.txn') : t('summary.txns')} {t('summary.on')}
                </p>
                <ChainIcon height={18} width={18} />
                <p className="summary-item-chain-name">{chainName}</p>
                {id === EFPActionIds.UpdateEFPList &&
                  defaultChainId &&
                  pendingTxs.some((tx) => tx.id === EFPActionIds.CreateEFPList) && (
                    <p className="summary-item-change-chain" onClick={() => setSelectedChainId(undefined)}>
                      {t('summary.changeChain')}
                    </p>
                  )}
              </div>
              {displayedChanges(id, txs)}
            </div>
          )
        })}
        {gasIsLoading ? (
          <LoadingCell height={'40px'} width={'100%'} />
        ) : Object.values(insufficientGas).includes(true) ? (
          <button className="transaction-modal-confirm-button" disabled={true} onClick={() => setCurrentTxIndex(0)}>
            {t('summary.insufficientEth')}{' '}
            {Object.entries(insufficientGas)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, value]) => value)
              .map(([key]) => key)
              .join(', ')}
          </button>
        ) : (
          <button className="transaction-modal-confirm-button" onClick={() => setCurrentTxIndex(0)}>
            {t('confirm')}
          </button>
        )}
      </div>
    </div>
  )
}
