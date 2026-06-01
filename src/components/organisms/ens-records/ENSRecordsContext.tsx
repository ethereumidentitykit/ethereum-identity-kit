import React, { createContext, useContext, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppearanceOptional } from '../../../context/AppearanceContext'
import { fetchNameMetadata, formatNameMetadata } from '../../../utils'
import type { ENSRecordsProps } from './ENSRecords.types'

export type ENSRecordsContextValue = ENSRecordsProps & {
  metadataRecords: Record<string, string> | null
  isMetadataLoading: boolean
  appearanceClassName?: string
}

const ENSRecordsContext = createContext<ENSRecordsContextValue | null>(null)

export const useENSRecordsContext = () => {
  const context = useContext(ENSRecordsContext)

  if (!context) {
    throw new Error('ENSRecords slot components must be used within ENSRecords.Root')
  }

  return context
}

export type ENSRecordsRootProps = ENSRecordsProps & {
  children: React.ReactNode
}

export const ENSRecordsRoot: React.FC<ENSRecordsRootProps> = ({
  name,
  defaultTab,
  darkMode,
  style,
  onClose,
  onImageUpload,
  onSuccess,
  onError,
  children,
}) => {
  const { appearanceClassName } = useAppearanceOptional()

  const { data: metadata, isLoading: isMetadataLoading } = useQuery({
    queryKey: ['metadata', name],
    queryFn: async () => {
      const raw = await fetchNameMetadata(name)
      return formatNameMetadata(raw)
    },
    enabled: Boolean(name),
  })

  const metadataRecords = useMemo(
    () =>
      metadata?.reduce(
        (acc, row) => {
          acc[row.label] = row.value
          return acc
        },
        {} as Record<string, string>
      ) ?? null,
    [metadata]
  )

  const contextValue = useMemo<ENSRecordsContextValue>(
    () => ({
      name,
      defaultTab,
      darkMode,
      style,
      onClose,
      onImageUpload,
      onSuccess,
      onError,
      metadataRecords,
      isMetadataLoading,
      appearanceClassName,
    }),
    [
      name,
      defaultTab,
      darkMode,
      style,
      onClose,
      onImageUpload,
      onSuccess,
      onError,
      metadataRecords,
      isMetadataLoading,
      appearanceClassName,
    ]
  )

  return <ENSRecordsContext.Provider value={contextValue}>{children}</ENSRecordsContext.Provider>
}

ENSRecordsRoot.displayName = 'ENSRecords.Root'
