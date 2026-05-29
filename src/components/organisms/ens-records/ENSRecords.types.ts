export type ENSRecordsProps = {
  name: string
  defaultTab: 'records' | 'roles'
  darkMode?: boolean
  style?: React.CSSProperties
  onClose?: () => void // when provided, a Close button is shown — pass this when using the component as a modal
  onImageUpload?: (dataURL: string, type: 'avatar' | 'header') => Promise<string> // returns URL of the uploaded image
  onSuccess?: () => void // when provided, a Success callback is called when the records are saved successfully
  onError?: (error: Error) => void // when provided, an Error callback is called when the records are not saved successfully
}
