import { formatEther, http } from 'viem'
import { createPublicClient } from 'viem'
import { publicActionsL2 } from 'viem/op-stack'
import { useEffect, useMemo, useState } from 'react'
import { base, mainnet, optimism } from 'viem/chains'
import { useBalance, useGasPrice, useWalletClient } from 'wagmi'
import { useTransactions } from '../../../../context'
import { Arrow } from '../../../icons'
import Actions from '../actions'
import ListSettings from '../list-settings'
import LoadingCell from '../../../loading-cell/LoadingCell'
import { ChainIcons, chains } from '../../../../constants/chains'
import { EFPActionIds } from '../../../../constants/transactions'
import { EFPActionType, TransactionType } from '../../../../types/transactions'
import './Summary.css'

export default function Summary() {
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
  } = useTransactions()

  const { data: gasPrice } = useGasPrice({
    chainId: mainnet.id,
  })
  const { data: walletClient } = useWalletClient()
  const { data: balanceMainnet } = useBalance({
    address: walletClient?.account.address,
    chainId: mainnet.id,
  })
  const { data: balanceBase } = useBalance({
    address: walletClient?.account.address,
    chainId: base.id,
  })
  const { data: balanceOptimism } = useBalance({
    address: walletClient?.account.address,
    chainId: optimism.id,
  })
  const [gasIsLoading, setGasIsLoading] = useState(false)
  const [insufficientGas, setInsufficientGas] = useState<Record<string, boolean>>({
    [mainnet.name]: false,
    [base.name]: false,
    [optimism.name]: false,
  })

  const estimateGas = async () => {
    if (!balanceMainnet || !balanceBase || !balanceOptimism) return

    const gasErrors: Record<string, boolean> = {
      [mainnet.id]: false,
      [base.id]: false,
      [optimism.id]: false,
    }

    const totalGas: Record<number, number> = {
      [mainnet.id]: 0,
      [base.id]: 0,
      [optimism.id]: 0,
    }

    await Promise.all(
      pendingTxs.map(async (tx) => {
        if (!tx.chainId || !walletClient) return

        try {
          if (tx.chainId === mainnet.id) {
            const publicClient = createPublicClient({
              chain: mainnet,
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error.message.slice(0, 100))
          if (
            error.message.includes('insufficient funds for transfer') ||
            error.message.includes('gas required exceeds allowance')
          ) {
            gasErrors[tx.chainId] = true
          }
        }
      })
    )

    // console.log(gasErrors, totalGas, Number(formatEther(balanceBase.value)), Number(formatEther(balanceMainnet.value)), Number(formatEther(balanceOptimism.value)))

    setInsufficientGas({
      [mainnet.name]:
        gasErrors[mainnet.id] ||
        (totalGas[mainnet.id] > Number(formatEther(balanceMainnet.value)) &&
          pendingTxs.some((tx) => tx.chainId === mainnet.id)),
      [base.name]:
        gasErrors[base.id] ||
        (totalGas[base.id] > Number(formatEther(balanceBase.value)) && pendingTxs.some((tx) => tx.chainId === base.id)),
      [optimism.name]:
        gasErrors[optimism.id] ||
        (totalGas[optimism.id] > Number(formatEther(balanceOptimism.value)) &&
          pendingTxs.some((tx) => tx.chainId === optimism.id)),
    })

    setGasIsLoading(false)
  }

  useEffect(() => {
    setGasIsLoading(true)
    estimateGas()
  }, [pendingTxs, gasPrice, balanceMainnet, balanceBase, balanceOptimism])

  const onSummaryClose = () => {
    const mintTxIndex = pendingTxs.findIndex((tx) => tx.id === EFPActionIds.CreateEFPList)
    if (mintTxIndex >= 0) return setSelectedChainId(undefined)
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
      <p className="summary-title">Summary</p>
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
                  {txs?.length} {txs?.length === 1 ? 'txn' : 'txns'} on
                </p>
                <ChainIcon height={18} width={18} />
                <p className="summary-item-chain-name">{chainName}</p>
              </div>
              {displayedChanges(id, txs)}
            </div>
          )
        })}
        {gasIsLoading ? (
          <LoadingCell height={'40px'} width={'100%'} />
        ) : Object.values(insufficientGas).includes(true) ? (
          <button className="transaction-modal-confirm-button" disabled={true} onClick={() => setCurrentTxIndex(0)}>
            Insufficient ETH on{' '}
            {Object.entries(insufficientGas)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, value]) => value)
              .map(([key]) => key)
              .join(', ')}
          </button>
        ) : (
          <button className="transaction-modal-confirm-button" onClick={() => setCurrentTxIndex(0)}>
            Confirm
          </button>
        )}
      </div>
    </div>
  )
}
