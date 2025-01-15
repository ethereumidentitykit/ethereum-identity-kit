import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTransactions } from '../../../../context'
import { getPendingTxAddressesAndTags } from '../../../../utils/transactions'
import { Cross } from '../../../icons'
import ProfileList from '../../../profile-list/ProfileList'
import './ChangesList.css'
import { useAccount } from 'wagmi'

const ChangesList = ({
  openChanges,
  setOpenChanges,
}: {
  openChanges: boolean
  setOpenChanges: Dispatch<SetStateAction<boolean>>
}) => {
  const { pendingTxs, setTxModalOpen } = useTransactions()

  const { address: connectedAddress } = useAccount()
  const profiles = useMemo(() => getPendingTxAddressesAndTags(pendingTxs), [pendingTxs])

  return (
    <div
      className="changes-list-container"
      style={{ display: openChanges ? 'flex' : 'none', flexDirection: 'column', gap: '16px' }}
    >
      <div className="transaction-modal-close-button" onClick={() => setTxModalOpen(false)}>
        <Cross height={16} width={16} />
      </div>
      <div className="changes-list-profile-content">
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', paddingTop: '6px', marginTop: '0px' }}>
            Cart
          </h3>
          <ProfileList profiles={profiles} connectedAddress={connectedAddress} />
        </div>
      </div>
      <div className="transaction-modal-buttons-container">
        <button className="transaction-modal-cancel-button" onClick={() => setTxModalOpen(false)}>
          Close
        </button>
        <button
          className="transaction-modal-confirm-button"
          onClick={(e) => {
            e.stopPropagation()
            setOpenChanges(false)
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ChangesList
