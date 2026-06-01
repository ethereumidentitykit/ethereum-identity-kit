import React from 'react'
import { useENSRecordsContext } from '../ENSRecordsContext'
import RecordsContainer from '../components/RecordsContainer'
export const ENSRecordsContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const ctx = useENSRecordsContext()

  if (ctx.isMetadataLoading || !ctx.metadataRecords) {
    return null
  }

  if (children) {
    return <>{children}</>
  }

  return <RecordsContainer metadata={ctx.metadataRecords} />
}

ENSRecordsContent.displayName = 'ENSRecords.Content'
