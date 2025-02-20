import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useTransactions } from '../../../../context'
import { getPendingTxAddressesAndTags } from '../../../../utils/transactions'
import ManualAdd from '../manual-add'
import { Cross } from '../../../icons'
import ProfileList from '../../../profile-list/ProfileList'
import { Address } from '../../../../types'
import { ProfileItemType } from '../../../profile-list/ProfileList.types'
import './Cart.css'

const Cart = () => {
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
      <div className="transaction-modal-close-button" onClick={() => setTxModalOpen(false)}>
        <Cross height={16} width={16} />
      </div>
      <div className="cart-content">
        <h3 className="cart-title">Cart</h3>
        <div className="cart-changes-list">
          <ProfileList profiles={profiles} connectedAddress={connectedAddress} />
        </div>
        <ManualAdd />
      </div>
      <div className="cart-modal-buttons-container">
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
  )
}

export default Cart
