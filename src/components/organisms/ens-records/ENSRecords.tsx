import { useQuery } from '@tanstack/react-query'
import { ENSRecordsProps } from './ENSRecords.types'
import { fetchNameMetadata, formatNameMetadata } from '../../../utils'
import RecordsContainer from './components/RecordsContainer'

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
    <div>
      {isMetadataLoading ? (
        <div>Loading...</div>
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
        <div>No metadata found</div>
      )}
    </div>
  )
}

export default ENSRecords
