import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useTransactions } from '../../../../context'
import { getPendingTxAddressesAndTags } from '../../../../utils/transactions'
import ManualAdd from '../manual-add'
import { Cross } from '../../../icons'
import Recommended from '../recommended'
import Trash from '../../../icons/ui/Trash'
import { Address } from '../../../../types'
import ProfileList from '../../../profile-list/ProfileList'
import { ProfileItemType } from '../../../profile-list/ProfileList.types'
import './Cart.css'
import { EFPActionIds } from '../../../../constants/transactions'
import ShortArrow from '../../../icons/ui/ShortArrow'

interface CartProps {
  setClearCartModalOpen: (open: boolean) => void
}

const Cart = ({ setClearCartModalOpen }: CartProps) => {
  const { pendingTxs, setTxModalOpen, changesOpen, setChangesOpen } = useTransactions()
  const { address: connectedAddress } = useAccount()

  const profiles = useMemo(() => {
    const pendingChanges = getPendingTxAddressesAndTags(pendingTxs)

    const pendingChangesProfiles = new Map<Address, ProfileItemType>()

    pendingChanges.forEach(({ address, tag }) => {
      if (pendingChangesProfiles.has(address)) {
        pendingChangesProfiles.get(address)?.tags.push(tag)
      } else {
        pendingChangesProfiles.set(address, { address, tags: [tag] })
      }
    })

    return Array.from(pendingChangesProfiles.values())
  }, [pendingTxs, connectedAddress])

  return (
    <div
      className="cart-container"
      style={{ display: changesOpen ? 'flex' : 'none', flexDirection: 'column', gap: '16px' }}
    >
      <div className="cart-container-inner">
        <div className="transaction-modal-close-button" onClick={() => setTxModalOpen(false)}>
          <Cross height={16} width={16} />
        </div>
        <h3 className="cart-title">Cart</h3>
        <div className="cart-content">
          <div className="cart-changes-list">
            <div className="cart-changes-list-header">
              <div className="cart-changes-list-title">
                Changes <span className="cart-changes-list-title-count">{profiles.length}</span>
              </div>
              <button className="cart-changes-list-header-button" onClick={() => setClearCartModalOpen(true)}>
                <p>Clear Cart</p>
                <Trash height={16} width={14} />
              </button>
            </div>
            {profiles.length > 0 ? (
              <ProfileList profiles={profiles} connectedAddress={connectedAddress} />
            ) : (
              <div className="cart-changes-list-empty">No items in cart</div>
            )}
          </div>
          <div className="cart-recommended-container">
            <ManualAdd />
            {connectedAddress && <Recommended connectedAddress={connectedAddress} />}
          </div>
        </div>
        <div className="cart-modal-buttons-container">
          <div className="cart-modal-buttons-container-top">
            <div className="cart-modal-buttons-container-top-info">
              <p>{profiles.length} Actions</p>
              <p>{pendingTxs.filter((tx) => tx.id === EFPActionIds.UpdateEFPList).length} Transactions</p>
            </div>
            <button
              className="cart-modal-to-top-button"
              onClick={() => {
                const changesList = document.querySelector('.cart-changes-list')
                if (changesList) {
                  changesList.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              <p>Back to top</p>
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
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
