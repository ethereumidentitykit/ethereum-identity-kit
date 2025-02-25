import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAccount } from '../../../../utils/api/fetch-account'
import LoadingCell from '../../../loading-cell/LoadingCell'
import Avatar from '../../../avatar/Avatar'
import { DEFAULT_FALLBACK_AVATAR } from '../../../../constants'
import { truncateAddress } from '../../../../utils'
import { Address } from '../../../../types/address'

interface ListAccountProps {
  address: Address
  height?: string
  width?: string
}

const ListAccount: React.FC<ListAccountProps> = ({ address, height = '24px', width = '24px' }) => {
  const { data: account, isLoading } = useQuery({
    queryKey: ['account', address],
    queryFn: () => fetchAccount(address),
  })

  return (
    <div className="list-account-container">
      {isLoading ? (
        <>
          <LoadingCell height={height} width={width} radius="50%" />
          <LoadingCell height="14px" width="50px" />
        </>
      ) : (
        <>
          <Avatar
            address={address}
            src={account?.ens?.avatar}
            name={account?.ens?.name}
            fallback={DEFAULT_FALLBACK_AVATAR}
            style={{ height, width }}
          />
          <p className="list-account-name">{account?.ens?.name || truncateAddress(address)}</p>
        </>
      )}
    </div>
  )
}

export default ListAccount
