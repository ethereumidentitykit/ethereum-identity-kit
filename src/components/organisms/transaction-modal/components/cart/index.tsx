import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { useEffect, useState, useMemo, useRef } from 'react'
import { useTransactions } from '../../../../../context'
import { useTranslation } from '../../../../../context/TranslationContext'
import { useWindowSize } from '../../../../../hooks/common/useWindowSize'
import { getPendingTxAddressesAndTags } from '../../../../../utils/transactions'
import ManualAdd from '../manual-add'
import { Cross } from '../../../../icons'
import Trash from '../../../../icons/ui/Trash'
import ShortArrow from '../../../../icons/ui/ShortArrow'
import Recommended from '../../../recommended/Recommended'
import ProfileList from '../../../../molecules/profile-list/ProfileList'
import { Address } from '../../../../../types'
import { ProfileItemType } from '../../../../molecules/profile-list/ProfileList.types'
import './Cart.css'

interface CartProps {
  setClearCartModalOpen: (open: boolean) => void
  onProfileClick?: (address: Address) => void
  showRecommendations?: boolean
}

const Cart = ({ setClearCartModalOpen, onProfileClick, showRecommendations = true }: CartProps) => {
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const { address: connectedAddress } = useAccount()
  const { pendingTxs, setTxModalOpen, changesOpen, setChangesOpen, selectedList } = useTransactions()

  const pendingChanges = getPendingTxAddressesAndTags(pendingTxs)
  const profiles = useMemo(() => {
    if (!pendingChanges || pendingChanges.length === 0) return []

    const pendingChangesProfiles = new Map<Address, ProfileItemType>()

    pendingChanges.forEach(({ address }) => {
      if (pendingChangesProfiles.has(address)) {
        pendingChangesProfiles.get(address)
      } else {
        pendingChangesProfiles.set(address, { address, tags: [] })
      }
    })

    return Array.from(pendingChangesProfiles.values())
  }, [pendingChanges, connectedAddress])

  const cartChangesListRef = useRef<HTMLDivElement>(null)
  const [showBackToTopButton, setShowBackToTopButton] = useState(false)
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      const scrollY = target.scrollTop

      setShowBackToTopButton(scrollY > 50)
    }

    const abortController = new AbortController()
    const changesList = cartChangesListRef.current
    const cartContainer = document.querySelector('.cart-container-inner')

    if (changesList) {
      changesList.addEventListener('scroll', handleScroll, { signal: abortController.signal })
    }
    if (cartContainer) {
      cartContainer.addEventListener('scroll', handleScroll, { signal: abortController.signal })
    }

    return () => abortController.abort()
  }, [cartChangesListRef])

  return (
    <div
      className={clsx('cart-container', !showRecommendations && 'cart-container-no-recommendations')}
      style={{ display: changesOpen ? 'flex' : 'none', flexDirection: 'column', gap: '16px' }}
    >
      <div className="cart-container-inner">
        <div className="transaction-modal-close-button" onClick={() => setTxModalOpen(false)}>
          <Cross height={16} width={16} />
        </div>
        <h3 className="cart-title">{t('cart.title')}</h3>
        <div className="cart-content">
          <div className="cart-changes-list">
            <div className="cart-changes-list-header">
              <div className="cart-changes-list-title">
                {t('cart.changes')} <span className="cart-changes-list-title-count">{pendingChanges.length}</span>
              </div>
              {pendingTxs.length > 0 && (
                <button className="cart-changes-list-header-button" onClick={() => setClearCartModalOpen(true)}>
                  <p>{t('cart.clearCart')}</p>
                  <Trash height={16} width={14} />
                </button>
              )}
            </div>
            {profiles.length > 0 ? (
              <ProfileList
                ref={cartChangesListRef}
                profiles={profiles}
                connectedAddress={connectedAddress}
                selectedList={selectedList}
                showTags={true}
                canEditTags={true}
                onProfileClick={onProfileClick}
                listHeight={width && width < 1024 ? '80vh' : 'calc(80vh - 240px)'}
                useVirtualList={true}
                showHeaderImage={true}
                rowHeight={70}
              />
            ) : (
              <div className="cart-changes-list-empty">{t('cart.noItems')}</div>
            )}
          </div>
          {showRecommendations && (
            <div className="cart-recommended-container">
              <ManualAdd />
              {connectedAddress && (
                <Recommended
                  title={t('recommended.title', 'Recommended')}
                  selectedList={selectedList}
                  connectedAddress={connectedAddress}
                  onProfileClick={onProfileClick}
                  useVirtualList={Boolean(width && width > 1024)}
                  listHeight="calc(80vh - 200px)"
                  className="cart-recommended-list"
                  showHeaderImage={true}
                  rowHeight={70}
                />
              )}
            </div>
          )}
        </div>
        <div className="cart-modal-buttons-container">
          <div className="cart-modal-buttons-container-top">
            <div className="cart-modal-buttons-container-top-info">
              <p>
                {pendingChanges.length} {profiles.length === 1 ? t('cart.action') : t('cart.actions')}
              </p>
              <p>
                {pendingTxs.length} {pendingTxs.length === 1 ? t('cart.transaction') : t('cart.transactions')}
              </p>
            </div>
            <button
              className="cart-modal-to-top-button"
              style={{
                opacity: showBackToTopButton ? 1 : 0,
                pointerEvents: showBackToTopButton ? 'auto' : 'none',
              }}
              onClick={() => {
                const changesList = cartChangesListRef.current
                const cartContainer = document.querySelector('.cart-container-inner')
                if (changesList) {
                  changesList.scrollTo({ top: 0, behavior: 'smooth' })
                }
                if (cartContainer) {
                  cartContainer.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              <p>{t('backToTop')}</p>
              <ShortArrow height={16} width={16} className="cart-modal-top-button-arrow" />
            </button>
          </div>
          <button
            className="transaction-modal-confirm-button"
            disabled={pendingTxs.length === 0}
            onClick={(e) => {
              e.stopPropagation()
              setChangesOpen(false)
            }}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
