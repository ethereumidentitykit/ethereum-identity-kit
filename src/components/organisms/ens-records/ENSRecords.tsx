import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { ENSRecordsProps } from './ENSRecords.types'
import { fetchNameMetadata, formatNameMetadata } from '../../../utils'
import RecordsContainer from './components/RecordsContainer'
import './ENSRecords.css'

const ENSRecords: React.FC<ENSRecordsProps> = ({ name, defaultTab, darkMode, onClose, onImageUpload }) => {
  const { data: metadata, isLoading: isMetadataLoading } = useQuery({
    queryKey: ['metadata', name],
    queryFn: async () => {
      const metadata = await fetchNameMetadata(name)
      const formattedMetadata = formatNameMetadata(metadata)
      return formattedMetadata
    },
    enabled: !!name,
  })

  const metadataRecords = metadata?.reduce(
    (acc, row) => {
      acc[row.label] = row.value
      return acc
    },
    {} as Record<string, string>
  )

  return (
    <div className={clsx('ens-records-root', darkMode && 'dark')}>
      {isMetadataLoading ? (
        <div className="ens-records-loading">Loading...</div>
      ) : metadataRecords ? (
        <RecordsContainer
          name={name}
          metadata={metadataRecords}
          defaultTab={defaultTab}
          darkMode={darkMode}
          onClose={onClose}
          onImageUpload={onImageUpload}
        />
      ) : (
        <div className="ens-records-empty">No metadata found</div>
      )}
    </div>
  )
}

export default ENSRecords
