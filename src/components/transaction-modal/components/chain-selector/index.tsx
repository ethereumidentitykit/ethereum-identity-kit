import { encodePacked } from 'viem'
import { useState, useEffect } from 'react'
import { ListRecordContracts } from '../../../../constants/contracts'
import { Chain, ChainIcons, chains } from '../../../../constants/chains'
import { EFPActionType, useTransactions } from '../../../../context/transactionContext'
import './ChainSelector.css'
import clsx from 'clsx'
import Check from '../../../icons/ui/Check'
import { base } from 'viem/chains'

const ChainSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currSelectedChain, setCurrSelectedChain] = useState<Chain | undefined>(base)
  const { setSelectedChainId, selectedChainId, pendingTxs, setPendingTxs, setTxModalOpen, nonce } = useTransactions()

  useEffect(() => {
    if (selectedChainId) setIsOpen(false)
    else setIsOpen(true)
  }, [selectedChainId])

  return (
    <div className="chain-selector-container" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="chain-selector-title-container">
        <p className="chain-selector-title">Select Chain</p>
        <button className="chain-selector-close-button" onClick={() => setIsOpen(false)}>
          X
        </button>
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
              {currSelectedChain?.id === chain.id && <Check height={20} width={20} color="green" />}
            </button>
          )
        })}
      </div>
      <div className="chain-selector-buttons-container">
        <button className="cancel-button" onClick={() => setTxModalOpen(false)}>
          Cancel
        </button>
        <button
          className="confirm-button"
          onClick={() => {
            if (!currSelectedChain || !nonce) return

            setIsOpen(false)
            setCurrSelectedChain(undefined)
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
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ChainSelector
