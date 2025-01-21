import { useMemo } from "react"
import { useAccount } from "wagmi"
import { useTransactions } from "../../../../context"
import { getPendingTxAddressesAndTags } from "../../../../utils/transactions"
import { Cross } from "../../../icons"
import ProfileList from "../../../profile-list/ProfileList"
import './Cart.css'

const Cart = () => {
  const { pendingTxs, setTxModalOpen, changesOpen, setChangesOpen } = useTransactions()
  const { address: connectedAddress } = useAccount()
  const profiles = useMemo(() => getPendingTxAddressesAndTags(pendingTxs), [pendingTxs])

  return (
    <div
      className="cart-container"
      style={{ display: changesOpen ? 'flex' : 'none', flexDirection: 'column', gap: '16px' }}
    >
      <div className="transaction-modal-close-button" onClick={() => setTxModalOpen(false)}>
        <Cross height={16} width={16} />
      </div>
      <div className="cart-content">
        <div>
          <h3 className="cart-title">Cart</h3>
          <div className="cart-changes-list"><ProfileList profiles={profiles} connectedAddress={connectedAddress} /></div>
          {/* <ManualAdd /> */}

        </div>
      </div>
      <div className="transaction-modal-buttons-container">
        <button className="transaction-modal-cancel-button" onClick={() => setTxModalOpen(false)}>
          Close
        </button>
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
