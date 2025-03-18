import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTransactions } from '../../../../context'
import { fetchAccount } from '../../../../utils/api/fetch-account'
import { fetchFollowState, getPendingTxAddresses, isAddress } from '../../../../utils'
import { Address } from '../../../../types'
import './ManualAdd.css'
import { listOpAddListRecord } from '../../../../utils/list-ops'

const ManualAdd = () => {
  const [search, setSearch] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address: connectedAddress } = useAccount()
  const { addListOpsTransaction, selectedList, lists, pendingTxs } = useTransactions()

  const handleAdd = async () => {
    if (!connectedAddress) return

    setIsAdding(true)

    const namesToSearch = search.replaceAll(' ', ',').split(',')
    const pendingListOpAddresses = getPendingTxAddresses(pendingTxs)

    const listOps = []
    for (const name of namesToSearch) {
      if (isAddress(name)) {
        const address = name as Address

        if (pendingListOpAddresses.includes(address)) {
          setError('Already in cart')
          continue
        }

        const followState = await fetchFollowState({
          lookupAddressOrName: address,
          connectedAddress,
          list: selectedList === 'new list' ? undefined : selectedList || lists?.primary_list,
          type: 'following',
        })

        if (followState?.state.follow) {
          setError('Already following')
          continue
        }

        listOps.push(listOpAddListRecord(address))
      } else {
        const account = await fetchAccount(name)

        if (account?.address) {
          if (pendingListOpAddresses.includes(account.address)) {
            setError('Already in cart')
            continue
          }

          const followState = await fetchFollowState({
            lookupAddressOrName: account.address,
            connectedAddress,
            list: selectedList === 'new list' ? undefined : selectedList || lists?.primary_list,
            type: 'following',
          })

          if (followState?.state.follow) {
            setError('Already following')
            continue
          }

          listOps.push(listOpAddListRecord(account.address))
        } else {
          setError('Account not found')
        }
      }
    }

    addListOpsTransaction(listOps)
    setSearch('')
    setIsAdding(false)
  }

  return (
    <div className="manual-add-outer-container">
      {error && <div className="manual-add-error">{error}</div>}
      <div className="manual-add-container">
        <input
          type="text"
          placeholder="ENS name or Address"
          className="manual-add-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setError(null)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd()
            }
          }}
        />
        <button className="manual-add-button" onClick={handleAdd}>
          {isAdding ? <div className="manual-add-loader" /> : 'Add'}
        </button>
      </div>
    </div>
  )
}

export default ManualAdd
