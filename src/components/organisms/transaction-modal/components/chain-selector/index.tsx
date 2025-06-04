import clsx from 'clsx'
import { base } from 'viem/chains'
import { encodePacked } from 'viem'
import { useState, useEffect, useCallback } from 'react'
import { useTransactions, useTranslation } from '../../../../../context'
import { Arrow, Check } from '../../../../icons'
import { ListRecordContracts } from '../../../../../constants/contracts'
import { EFPActionIds } from '../../../../../constants/transactions'
import { Chain, ChainIcons, chains } from '../../../../../constants/chains'
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
  const { t } = useTranslation()

  useEffect(() => {
    if (pendingTxs.some((tx) => tx.id === EFPActionIds.UpdateEFPList)) {
      if (selectedChainId) setIsOpen(false)
      else setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [selectedChainId, pendingTxs])

  const onConfirm = useCallback(() => {
    if (!currSelectedChain || !nonce) return

    setIsOpen(false)
    setSelectedChainId(currSelectedChain?.id)

    const newPendingTxs = [...pendingTxs].map((tx) => ({
      ...tx,
      address: tx.id === EFPActionIds.UpdateEFPList ? ListRecordContracts[currSelectedChain.id] : tx.address,
      chainId: tx.id === EFPActionIds.UpdateEFPList ? currSelectedChain.id : tx.chainId,
    }))

    const mintTxIndex = newPendingTxs.findIndex((tx) => tx.id === EFPActionIds.CreateEFPList)
    const mintTx = newPendingTxs[mintTxIndex]
    newPendingTxs[mintTxIndex] = {
      ...mintTx,
      args: [
        encodePacked(
          ['uint8', 'uint8', 'uint256', 'address', 'uint'],
          [1, 1, BigInt(currSelectedChain.id), ListRecordContracts[currSelectedChain.id], nonce]
        ),
      ],
    }

    setPendingTxs(newPendingTxs)
  }, [currSelectedChain, nonce, pendingTxs])

  return (
    <div className="chain-selector-container" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div
        className="transaction-modal-arrow-back"
        onClick={() => (batchTransactions ? setChangesOpen(true) : resetTransactions())}
      >
        <Arrow height={18} width={18} />
      </div>
      <div className="chain-selector-content-container">
        <div className="chain-selector-title-container">
          <p className="chain-selector-title">{t('transaction.selectChain')}</p>
          <p className="chain-selector-subtitle">{t('transaction.selectChainDescription')}</p>
          <p className="chain-selector-subtitle">{t('transaction.selectChainLater')}</p>
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
      <button className="transaction-modal-confirm-button" onClick={onConfirm}>
        {t('confirm')}
      </button>
    </div>
  )
}

export default ChainSelector
