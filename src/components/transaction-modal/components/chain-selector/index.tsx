import clsx from 'clsx'
import { base } from 'viem/chains'
import { encodePacked } from 'viem'
import { useState, useEffect, useCallback } from 'react'
import { useTransactions } from '../../../../context'
import { Check } from '../../../icons'
import { ListRecordContracts } from '../../../../constants/contracts'
import { Chain, ChainIcons, chains } from '../../../../constants/chains'
import { EFPActionType } from '../../../../types'
import './ChainSelector.css'

const ChainSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currSelectedChain, setCurrSelectedChain] = useState<Chain | undefined>(base)

  const {
    setSelectedChainId,
    selectedChainId,
    pendingTxs,
    setPendingTxs,
    nonce,
    batchTransactions,
    resetTransactions,
    setChangesOpen,
  } = useTransactions()

  useEffect(() => {
    if (selectedChainId) setIsOpen(false)
    else setIsOpen(true)
  }, [selectedChainId])

  const onConfirm = useCallback(() => {
    if (!currSelectedChain || !nonce) return

    setIsOpen(false)
    setSelectedChainId(currSelectedChain?.id)

    const newPendingTxs = pendingTxs.map((tx) => ({
      ...tx,
      address: tx.id === EFPActionType.UpdateEFPList ? ListRecordContracts[currSelectedChain.id] : tx.address,
      chainId: tx.id === EFPActionType.UpdateEFPList ? currSelectedChain.id : tx.chainId,
      args:
        tx.id === EFPActionType.CreateEFPList
          ? [
            encodePacked(
              ['uint8', 'uint8', 'uint256', 'address', 'uint'],
              [1, 1, BigInt(currSelectedChain.id), ListRecordContracts[currSelectedChain.id], nonce]
            ),
          ]
          : tx.args,
    }))

    setPendingTxs(newPendingTxs)
  }, [currSelectedChain, nonce])

  return (
    <div className="chain-selector-container" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="chain-selector-content-container">
        <div className="chain-selector-title-container">
          <p className="chain-selector-title">Select Chain</p>
          <p className="chain-selector-subtitle">Select the chain you want to perform the action on.</p>
          <p className="chain-selector-subtitle">You can always change this later</p>
        </div>
        <div className="chain-selector-options-container">
          {chains.map((chain) => {
            const Icon = ChainIcons[chain.id]

            return (
              <button
                className={clsx('chain-selector-option', {
                  'chain-selector-option-selected': currSelectedChain?.id === chain.id,
                })}
                key={chain.id}
                onClick={() => setCurrSelectedChain(chain)}
              >
                <div className="chain-selector-option-title-container">
                  <Icon height={24} width={24} />
                  <p>{chain.name}</p>
                </div>
                {currSelectedChain?.id === chain.id && (
                  <div className="chain-selector-option-check">
                    <Check height={20} width={20} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
      <div className="transaction-modal-buttons-container">
        <button
          className="transaction-modal-cancel-button"
          onClick={() => (batchTransactions ? setChangesOpen(true) : resetTransactions())}
        >
          {batchTransactions ? 'Back' : 'Cancel'}
        </button>
        <button className="transaction-modal-confirm-button" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ChainSelector
