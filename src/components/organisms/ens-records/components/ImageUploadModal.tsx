'use client'

import React, { useState, useCallback, useRef } from 'react'
import clsx from 'clsx'
import { useAccount, useSignTypedData } from 'wagmi'
import TabSelector from '../../../atoms/tab-selector/TabSelector'
import { isLinkValid } from '../../../../utils'
import { Trash } from '../../../icons'
import Input from '../../../atoms/input/Input'
import '../ENSRecords.css'

interface ImageUploadModalProps {
  name: string
  imageType: 'avatar' | 'header'
  currentValue?: string
  onSave: (url: string) => void
  onClose: () => void
  onImageUpload?: (dataURL: string, type: 'avatar' | 'header') => Promise<string> // returns URL of the uploaded image
  darkMode?: boolean
}

type UploadMode = 'file' | 'url'
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  name,
  imageType,
  currentValue,
  onSave,
  onClose,
  onImageUpload,
  darkMode,
}) => {
  const { address } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()

  const hasExistingUrl = currentValue && currentValue.startsWith('http')
  const [mode, setMode] = useState<UploadMode>(hasExistingUrl || !onImageUpload ? 'url' : 'file')
  const [dataURL, setDataURL] = useState<string | null>(null)
  const [manualUrl, setManualUrl] = useState(hasExistingUrl ? currentValue : '')
  const [previewUrl, setPreviewUrl] = useState<string | null>(hasExistingUrl ? currentValue : null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setDataURL(result)
      setPreviewUrl(result)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleManualUrlChange = useCallback((value: string) => {
    setManualUrl(value)
    if (value) setPreviewUrl(value)
    else setPreviewUrl(null)
  }, [])

  const dataURLToBytes = useCallback((dataUrl: string): Uint8Array => {
    const base64 = dataUrl.split(',')[1]
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }, [])

  const handleUploadAndSave = useCallback(async () => {
    if (!address) return

    if (mode === 'url') {
      if (manualUrl) {
        onSave(manualUrl)
      }
      return
    }

    if (!dataURL || !onImageUpload) return

    try {
      setUploadStatus('uploading')
      const url = await onImageUpload(dataURL, imageType)
      onSave(url)
      setUploadStatus('success')
    } catch (err: unknown) {
      setUploadStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Upload failed')
    }

    // setUploadStatus('uploading')
    // setErrorMessage(null)

    // try {
    //   const urlHash = bytesToHex(sha256(dataURLToBytes(dataURL)))
    //   const expiry = `${Date.now() + 1000 * 60 * 60 * 24 * 7}` // 7 days

    //   const sig = await signTypedDataAsync({
    //     primaryType: 'Upload',
    //     domain: { name: 'Ethereum Name Service', version: '1' },
    //     types: {
    //       Upload: [
    //         { name: 'upload', type: 'string' },
    //         { name: 'expiry', type: 'string' },
    //         { name: 'name', type: 'string' },
    //         { name: 'hash', type: 'string' },
    //       ],
    //     },
    //     message: {
    //       upload: imageType,
    //       expiry,
    //       name,
    //       hash: urlHash,
    //     },
    //   })

    //   const response = await fetch(`https://euc.li/${name}${imageType === 'header' ? '/h' : ''}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       expiry,
    //       dataURL,
    //       sig,
    //       unverifiedAddress: address,
    //     }),
    //   })

    //   if (!response.ok) {
    //     if (response.status === 413) {
    //       setErrorMessage('File size is too large (max 500KB)')
    //     }
    //     if (response.status === 415) {
    //       setErrorMessage('Unsupported file type. Use JPG/JPEG.')
    //     }
    //     throw new Error(`Upload failed: ${response.statusText}`)
    //   }

    //   const result = await response.json()
    //   const url = result.url || `https://euc.li/${name}${imageType === 'header' ? '/h' : ''}`

    //   setUploadStatus('success')
    //   onSave(url)
    // } catch (err: unknown) {
    //   setUploadStatus('error')
    //   setErrorMessage(err instanceof Error ? err.message : 'Upload failed')
    // }
  }, [address, mode, manualUrl, dataURL, signTypedDataAsync, imageType, name, onSave, dataURLToBytes])

  return (
    <div
      className={clsx('ens-records-root ens-img-overlay', darkMode && 'dark')}
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div className="ens-img-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="ens-img-title">{imageType} Image</h2>

        {!!onImageUpload && <TabSelector
          tabs={[
            { label: 'Upload File', value: 'file' },
            { label: 'Enter URL', value: 'url' },
          ]}
          selectedTab={mode}
          setSelectedTab={(tab) => setMode(tab as 'file' | 'url')}
        />}

        {mode === 'file' ? (
          <>
            {/* Drop zone */}
            <div
              className={clsx('ens-img-dropzone', isDragging && 'dragging')}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="ens-img-preview" />
              ) : (
                <>
                  <p className="ens-img-dropzone-title">Drag & drop an image here</p>
                  <p className="ens-img-dropzone-hint">or click to select a file</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="ens-img-file-input"
              onChange={handleFileSelect}
            />
          </>
        ) : (
          <>
            <div className="ens-img-url-row">
              <Input
                label="URL"
                value={manualUrl}
                onChange={(e) => handleManualUrlChange(e.target.value)}
                placeholder="https://example.com/image.png"
              />
              {manualUrl && (
                <button
                  className="ens-img-delete-btn"
                  onClick={() => {
                    setManualUrl('')
                    setPreviewUrl(null)
                    onSave('')
                  }}
                >
                  <Trash height={20} width={20} />
                </button>
              )}
            </div>
            {previewUrl && isLinkValid(previewUrl) && URL.canParse(previewUrl) && (
              <div className="ens-img-preview-wrap">
                <img src={previewUrl} alt="Preview" className="ens-img-preview" />
              </div>
            )}
          </>
        )}

        {errorMessage && <p className="ens-img-error">{errorMessage}</p>}

        <div className="ens-img-actions">
          <button
            className="ens-modal-btn ens-modal-btn--primary"
            onClick={handleUploadAndSave}
            disabled={uploadStatus === 'uploading' || (mode === 'file' && !dataURL) || (mode === 'url' && !manualUrl)}
          >
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Save'}
          </button>
          <button className="ens-modal-btn ens-modal-btn--neutral" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageUploadModal
