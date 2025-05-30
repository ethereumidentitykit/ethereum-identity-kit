import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ens_beautify } from '@adraffy/ens-normalize'
import { fetchAccount } from '../../../../../utils/api/fetch-account'
import LoadingCell from '../../../../atoms/loading-cell/LoadingCell'
import Avatar from '../../../../molecules/avatar/Avatar'
import { DEFAULT_FALLBACK_AVATAR } from '../../../../../constants'
import { truncateAddress } from '../../../../../utils/address'
import { Address } from '../../../../../types'

interface ActionAccountProps {
  address: Address
  height?: string
  width?: string
  showName?: boolean
}

const ActionAccount: React.FC<ActionAccountProps> = ({ address, showName, height = '24px', width = '24px' }) => {
  const { data: account, isLoading } = useQuery({
    queryKey: ['account', address],
    queryFn: () => fetchAccount(address),
  })

  return (
    <div className="transaction-modal-action-account">
      {isLoading ? (
        <>
          <LoadingCell height={height} width={width} radius="50%" />
          {showName && <LoadingCell height="18px" width="70px" radius="4px" />}
        </>
      ) : (
        <>
          <Avatar
            address={address}
            src={account?.ens.avatar}
            name={account?.ens.name}
            fallback={DEFAULT_FALLBACK_AVATAR}
            style={{ height, width }}
          />
          {showName && <p>{account?.ens.name ? ens_beautify(account.ens.name) : truncateAddress(address)}</p>}
        </>
      )}
    </div>
  )
}

export default ActionAccount
