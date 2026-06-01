import React from 'react'
import { useENSRecordsContext } from '../ENSRecordsContext'
type ENSRecordsEmptyProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const ENSRecordsEmpty: React.FC<ENSRecordsEmptyProps> = ({ children, className, style }) => {
  const { isMetadataLoading, metadataRecords } = useENSRecordsContext()

  if (isMetadataLoading || metadataRecords) {
    return null
  }

  if (children) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <div className={className} style={style}>
      <div className="ens-records-empty">No metadata found</div>
    </div>
  )
}

ENSRecordsEmpty.displayName = 'ENSRecords.Empty'
