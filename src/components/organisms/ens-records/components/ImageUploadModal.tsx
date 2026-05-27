'use client'

import React, { useState, useCallback, useRef } from 'react'
import { useAccount, useSignTypedData } from 'wagmi'
import TabSelector from '../../../atoms/tab-selector/TabSelector'
import { isLinkValid } from '../../../../utils'
import { Trash } from '../../../icons'
import Input from '../../../atoms/input/Input'

interface ImageUploadModalProps {
  name: string
  imageType: 'avatar' | 'header'
  currentValue?: string
  onSave: (url: string) => void
  onClose: () => void
  onImageUpload: (dataURL: string, type: 'avatar' | 'header') => Promise<string> // returns URL of the uploaded image
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
}) => {
  const { address } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()

  const hasExistingUrl = currentValue && currentValue.startsWith('http')
  const [mode, setMode] = useState<UploadMode>(hasExistingUrl ? 'url' : 'file')
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

    if (!dataURL) return

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
      className="fixed top-0 right-0 bottom-0 left-0 z-[110] flex h-[100dvh] w-screen items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div
        className="bg-background border-tertiary p-lg relative flex max-h-[calc(100dvh-56px)] w-full max-w-md flex-col gap-4 rounded-md border-2 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-sedan-sc text-foreground text-2xl capitalize">{imageType} Image</h2>

        <TabSelector
          tabs={[
            { label: 'Upload File', value: 'file' },
            { label: 'Enter URL', value: 'url' },
          ]}
          selectedTab={mode}
          setSelectedTab={(tab) => setMode(tab as 'file' | 'url')}
        />

        {mode === 'file' ? (
          <>
            {/* Drop zone */}
            <div
              className={`border-tertiary flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'hover:border-white/70'}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="" />
              ) : (
                <>
                  <p className="text-neutral text-lg">Drag & drop an image here</p>
                  <p className="text-neutral text-md">or click to select a file</p>
                </>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
          </>
        ) : (
          <>
            <div className="flex flex-row gap-2">
              <Input
                label="URL"
                value={manualUrl}
                onChange={(e) => handleManualUrlChange(e.target.value)}
                placeholder="https://example.com/image.png"
              />
              {manualUrl && (
                <button
                  className="group flex h-[50px] w-[50px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md border border-red-500 transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => {
                    setManualUrl('')
                    setPreviewUrl(null)
                    onSave('')
                  }}
                >
                  <Trash />
                </button>
              )}
            </div>
            {previewUrl && isLinkValid(previewUrl) && URL.canParse(previewUrl) && (
              <div className="flex justify-center">
                <img src={previewUrl} alt="Preview" className="" />
              </div>
            )}
          </>
        )}

        {errorMessage && <p className="text-md font-medium text-red-400">{errorMessage}</p>}

        <div className="flex flex-col gap-2">
          <button
            className="w-full"
            onClick={handleUploadAndSave}
            disabled={uploadStatus === 'uploading' || (mode === 'file' && !dataURL) || (mode === 'url' && !manualUrl)}
          >
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Save'}
          </button>
          <button className="w-full" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageUploadModal
