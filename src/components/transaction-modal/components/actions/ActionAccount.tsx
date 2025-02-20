import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAccount } from '../../../../utils/api/fetch-account'
import LoadingCell from '../../../loading-cell/LoadingCell'
import { Avatar, DEFAULT_FALLBACK_AVATAR } from '../../../..'

interface ActionAccountProps {
  address: string
  height?: string
  width?: string
}

const ActionAccount: React.FC<ActionAccountProps> = ({ address, height = '24px', width = '24px' }) => {
  const { data: account, isLoading } = useQuery({
    queryKey: ['account', address],
    queryFn: () => fetchAccount(address),
  })

  return isLoading ? (
    <LoadingCell height={height} width={width} radius='50%' />
  ) : (
    <Avatar address={address} src={account?.ens.avatar} name={account?.ens.name} fallback={DEFAULT_FALLBACK_AVATAR} style={{ height, width }} />
  )
}

export default ActionAccount