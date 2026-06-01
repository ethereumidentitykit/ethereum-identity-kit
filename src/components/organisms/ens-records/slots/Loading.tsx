import React from 'react'
import { useENSRecordsContext } from '../ENSRecordsContext'
type ENSRecordsLoadingProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const ENSRecordsLoading: React.FC<ENSRecordsLoadingProps> = ({ children, className, style }) => {
  const { isMetadataLoading } = useENSRecordsContext()

  if (!isMetadataLoading) {
    return null
  }

  if (children) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <div className={className} style={style}>
      <div className="ens-records-loading">Loading...</div>
    </div>
  )
}

ENSRecordsLoading.displayName = 'ENSRecords.Loading'
