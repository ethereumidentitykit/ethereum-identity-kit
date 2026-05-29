export type ENSRecordsProps = {
  name: string
  defaultTab: 'records' | 'roles'
  darkMode?: boolean
  onClose: () => void
  onImageUpload?: (dataURL: string, type: 'avatar' | 'header') => Promise<string> // returns URL of the uploaded image
}
