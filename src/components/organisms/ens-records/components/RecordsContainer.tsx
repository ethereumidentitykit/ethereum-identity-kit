'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import ImageUploadModal from './ImageUploadModal'
import { ADDRESS_LABELS, DEFAULT_FALLBACK_AVATAR, DEFAULT_FALLBACK_HEADER, SOCIAL_RECORDS } from '../../../../constants'
import { ENS_METADATA_URL } from '../../../../constants'
import Input from '../../../atoms/input/Input'
import Textarea from '../../../atoms/textarea/Textarea'
import { useEditRecords } from '../../../../hooks/useEditRecords'
import { Check, Cross, Pencil } from '../../../icons'
import { useOutsideClick } from '../../../../hooks'
import Plus from '../../../icons/ui/Plus'
import TabSelector from '../../../atoms/tab-selector/TabSelector'
import ResolvedInput from '../../../molecules/resolved-input/ResolvedInput'
import '../ENSRecords.css'
import { ENSRecordsProps } from '../ENSRecords.types'

interface RecordsContainerProps extends ENSRecordsProps {
  metadata: Record<string, string> | null
}

const RecordsContainer: React.FC<RecordsContainerProps> = ({
  name,
  metadata,
  defaultTab,
  darkMode,
  onClose,
  onImageUpload,
  onSuccess,
  onError,
}) => {
  const {
    records,
    setRecord,
    addressRecords,
    setAddressRecord,
    visibleAddressRecords,
    addVisibleAddressRecord,
    hiddenAddressRecords,
    customRecords,
    setCustomRecord,
    addCustomRecord,
    removeCustomRecord,
    visibleCustomRecordKeys,
    roleOwner,
    setRoleOwner,
    roleManager,
    setRoleManager,
    roleEthRecord,
    setRoleEthRecord,
    isRoleResolving,
    step,
    imageUploadTarget,
    setImageUploadTarget,
    hasChanges,
    saveRecords,
    resetToEditing,
    refetchAndEdit,
    errorMessage,
    txHash,
    isManager,
    isOwner,
  } = useEditRecords(name, metadata, onSuccess, onError)

  const [activeTab, setActiveTab] = useState<'records' | 'roles'>(defaultTab || 'records')
  const [addRecordOpen, setAddRecordOpen] = useState(false)
  const [customKeyInput, setCustomKeyInput] = useState('')
  const [isAddingCustomKey, setIsAddingCustomKey] = useState(false)
  const clickAwayRecordRef = useOutsideClick(() => {
    setAddRecordOpen(false)
    setIsAddingCustomKey(false)
    setCustomKeyInput('')
  })

  const avatarUrl = records.avatar
    ? records.avatar.startsWith('http')
      ? records.avatar
      : `${ENS_METADATA_URL}/mainnet/avatar/${name}`
    : DEFAULT_FALLBACK_AVATAR
  const headerUrl = records.header
    ? records.header.startsWith('http')
      ? records.header
      : `${ENS_METADATA_URL}/mainnet/header/${name}`
    : DEFAULT_FALLBACK_HEADER

  const handleImageSave = (url: string) => {
    if (imageUploadTarget) {
      setRecord(imageUploadTarget, url)
      setImageUploadTarget(null)
    }
  }

  const handleClose = () => {
    onClose?.()
  }

  const iconSize = {
    height: 16,
    width: 16,
  }

  return (
    <>
      <div
        className={clsx('ens-records-root', darkMode && 'dark')}
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
      >
        <div className="ens-records-modal" onClick={(e) => e.stopPropagation()}>
          {/* Confirming / Processing state */}
          {(step === 'confirming' || step === 'processing') && (
            <div className="ens-records-confirming">
              <h2 className="ens-records-status-title">Saving Changes</h2>
              <div className="ens-records-spinner"></div>
              <div className="ens-records-status-detail">
                <p className="ens-records-status-text">
                  {step === 'confirming' ? 'Confirm in Wallet' : 'Processing Transaction'}
                </p>
                {txHash && (
                  <a
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ens-records-link"
                  >
                    View on Etherscan
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Success state */}
          {step === 'success' && (
            <div className="ens-records-success">
              <h2 className="ens-records-status-title">Saving Changes</h2>
              <div className="ens-records-success-icon">
                <Check className="ens-records-success-check" />
              </div>
              <div className="ens-records-success-detail">
                <p className="ens-records-success-text">Changes Saved Successfully!</p>
                {txHash && (
                  <a
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ens-records-link"
                  >
                    View on Etherscan
                  </a>
                )}
                <button className="ens-modal-btn ens-modal-btn--primary" onClick={refetchAndEdit}>
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Error state */}
          {step === 'error' && (
            <div className="ens-records-error">
              <div className="ens-records-error-box">
                <h2 className="ens-records-error-title">Transaction Failed</h2>
                <p className="ens-records-error-message">{errorMessage || 'An unknown error occurred'}</p>
              </div>
              <div className="ens-records-error-actions">
                <b onClick={resetToEditing} className="ens-modal-btn ens-modal-btn--primary">
                  Try Again
                </b>
                {onClose && (
                  <button onClick={handleClose} className="ens-modal-btn ens-modal-btn--neutral">
                    Close
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Editing state — form content */}
          {step === 'editing' && (
            <>
              <div className="ens-records-editing">
                {/* Header Image + Avatar */}
                <div className="ens-records-media">
                  {/* Header image */}
                  <div className="ens-records-header">
                    <img src={headerUrl} alt="Header" className="ens-records-header-img" />
                    <button
                      className="ens-records-header-edit"
                      onClick={() => setImageUploadTarget('header')}
                      disabled={!isManager}
                    >
                      {records.header ? <Pencil {...iconSize} /> : <Plus {...iconSize} />}
                    </button>
                  </div>

                  {/* Avatar overlapping header */}
                  <div className="ens-records-avatar-wrap">
                    <div className="ens-records-avatar">
                      <img src={avatarUrl} alt="Avatar" width={80} height={80} className="ens-records-avatar-img" />
                      <button
                        className="ens-records-avatar-edit"
                        onClick={() => setImageUploadTarget('avatar')}
                        disabled={!isManager}
                      >
                        {records.avatar ? <Pencil {...iconSize} color="white" /> : <Plus {...iconSize} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="ens-records-tabs">
                  <TabSelector
                    tabs={[
                      { label: 'Records', value: 'records' },
                      { label: 'Roles', value: 'roles' },
                    ]}
                    selectedTab={activeTab}
                    setSelectedTab={(tab) => setActiveTab(tab as 'records' | 'roles')}
                  />
                </div>

                {/* Records tab */}
                {activeTab === 'records' && (
                  <>
                    {/* Text records */}
                    <div className="ens-records-section">
                      <div className="ens-records-field">
                        <ResolvedInput
                          label="Ethereum"
                          value={roleEthRecord}
                          onChange={(value) => {
                            if (value.includes(' ')) return
                            setRoleEthRecord(value)
                          }}
                          placeholder="0x... or name.eth"
                          disabled={!isManager}
                        />
                      </div>
                      <Textarea
                        label="Short Bio"
                        value={records.description || ''}
                        onChange={(e) => setRecord('description', e.target.value)}
                        placeholder="Tell us about yourself..."
                        disabled={!isManager}
                      />
                      <Input
                        label="Status"
                        value={records.status || ''}
                        onChange={(e) => setRecord('status', e.target.value)}
                        placeholder="What are you up to?"
                        disabled={!isManager}
                      />
                      <Input
                        label="Location"
                        value={records.location || ''}
                        onChange={(e) => setRecord('location', e.target.value)}
                        placeholder="Where are you based?"
                        disabled={!isManager}
                      />
                      <Input
                        label="Website"
                        value={records.url || ''}
                        onChange={(e) => setRecord('url', e.target.value)}
                        placeholder="https://yoursite.com"
                        disabled={!isManager}
                      />
                      <Input
                        label="Email"
                        value={records.email || ''}
                        onChange={(e) => setRecord('email', e.target.value)}
                        placeholder="you@example.com"
                        disabled={!isManager}
                      />
                    </div>

                    {/* Social records - 2x2 grid */}
                    <div className="ens-records-social-grid">
                      {SOCIAL_RECORDS.map((social) => {
                        const theme = darkMode ? 'dark' : 'light'
                        const Icon = social.icon[theme]

                        return (
                          <div key={social.key} className="ens-records-social-item">
                            <div className="ens-records-social-icon">
                              <Icon height={32} width={32} />
                            </div>
                            <input
                              type="text"
                              value={records[social.key] || ''}
                              onChange={(e) => setRecord(social.key, e.target.value)}
                              className="ens-records-social-input"
                              placeholder={social.placeholder}
                              disabled={!isManager}
                            />
                          </div>
                        )
                      })}
                    </div>

                    {/* Address records */}
                    {visibleAddressRecords.size > 0 && (
                      <div className="ens-records-section">
                        <h3 className="ens-records-section-title">Address Records</h3>
                        {Array.from(visibleAddressRecords).map((key) => (
                          <Input
                            key={key}
                            label={ADDRESS_LABELS[key] || key.toUpperCase()}
                            value={addressRecords[key] || ''}
                            onChange={(e) => setAddressRecord(key, e.target.value)}
                            placeholder={`${ADDRESS_LABELS[key] || key.toUpperCase()} address`}
                            disabled={!isManager}
                          />
                        ))}
                      </div>
                    )}

                    {/* Custom records */}
                    {visibleCustomRecordKeys.length > 0 && (
                      <div className="ens-records-section">
                        {visibleCustomRecordKeys.map((key) => (
                          <div key={key} className="ens-records-custom-row">
                            <Input
                              label={key}
                              value={customRecords[key] || ''}
                              onChange={(e) => setCustomRecord(key, e.target.value)}
                              placeholder={`Value for ${key}`}
                              disabled={!isManager}
                            />
                            <button
                              className="ens-records-remove-btn"
                              onClick={() => removeCustomRecord(key)}
                              disabled={!isManager}
                            >
                              <Cross {...iconSize} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Record button */}
                    <div className="ens-records-add-wrap" ref={clickAwayRecordRef as React.RefObject<HTMLDivElement>}>
                      <button
                        className="ens-records-add-btn"
                        onClick={() => setAddRecordOpen(!addRecordOpen)}
                        disabled={!isManager}
                      >
                        <Plus {...iconSize} />
                        Add Record
                      </button>

                      {addRecordOpen && (
                        <div className="ens-records-dropdown">
                          {hiddenAddressRecords.map((key) => (
                            <button
                              key={key}
                              className="ens-records-dropdown-item"
                              onClick={() => {
                                addVisibleAddressRecord(key)
                                setAddRecordOpen(false)
                              }}
                            >
                              {ADDRESS_LABELS[key] || key.toUpperCase()}
                            </button>
                          ))}
                          {isAddingCustomKey ? (
                            <div className="ens-records-custom-key-row">
                              <input
                                type="text"
                                value={customKeyInput}
                                onChange={(e) => setCustomKeyInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && customKeyInput.trim()) {
                                    addCustomRecord(customKeyInput.trim())
                                    setCustomKeyInput('')
                                    setIsAddingCustomKey(false)
                                    setAddRecordOpen(false)
                                  }
                                }}
                                className="ens-records-custom-key-input"
                                placeholder="Record key..."
                                autoFocus
                              />
                              <button
                                className="ens-records-custom-key-add"
                                disabled={!customKeyInput.trim()}
                                onClick={() => {
                                  if (customKeyInput.trim()) {
                                    addCustomRecord(customKeyInput.trim())
                                    setCustomKeyInput('')
                                    setIsAddingCustomKey(false)
                                    setAddRecordOpen(false)
                                  }
                                }}
                              >
                                Add
                              </button>
                            </div>
                          ) : (
                            <button className="ens-records-dropdown-item" onClick={() => setIsAddingCustomKey(true)}>
                              Custom Record
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Roles tab */}
                {activeTab === 'roles' && (
                  <div className="ens-records-section">
                    <div className="ens-records-field">
                      <ResolvedInput
                        label="Owner"
                        value={roleOwner}
                        onChange={(value) => {
                          if (value.includes(' ')) return
                          setRoleOwner(value)
                        }}
                        placeholder="0x... or name.eth"
                        disabled={!isOwner}
                      />
                    </div>
                    <div className="ens-records-field">
                      <ResolvedInput
                        label="Manager"
                        value={roleManager}
                        onChange={(value) => {
                          if (value.includes(' ')) return
                          setRoleManager(value)
                        }}
                        placeholder="0x... or name.eth"
                        disabled={!isManager && !isOwner}
                      />
                    </div>
                    <div className="ens-records-field">
                      <ResolvedInput
                        label="Ethereum"
                        value={roleEthRecord}
                        onChange={(value) => {
                          if (value.includes(' ')) return
                          setRoleEthRecord(value)
                        }}
                        placeholder="0x... or name.eth"
                        disabled={!isManager}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="ens-records-footer">
                {activeTab === 'records' && !isManager && isOwner && (
                  <div className="ens-records-warning">
                    <p className="ens-records-warning-text">
                      You are not the <b>Manager</b> of this name. To edit records, set your current address as the{' '}
                      <b>Manager</b>.
                    </p>
                    <button
                      className="ens-records-set-role-btn"
                      onClick={() => {
                        setActiveTab('roles')
                        // if (userAddress) setRoleManager(userAddress)
                      }}
                    >
                      Set Role
                    </button>
                  </div>
                )}
                <button
                  className="ens-modal-btn ens-modal-btn--primary"
                  onClick={saveRecords}
                  disabled={!hasChanges || isRoleResolving}
                >
                  Save
                </button>
                {onClose && (
                  <button className="ens-modal-btn ens-modal-btn--neutral" onClick={handleClose}>
                    Close
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image upload nested modal */}
      {imageUploadTarget && (
        <ImageUploadModal
          name={name}
          imageType={imageUploadTarget}
          currentValue={records[imageUploadTarget] || ''}
          onSave={handleImageSave}
          onClose={() => setImageUploadTarget(null)}
          onImageUpload={onImageUpload}
          darkMode={darkMode}
        />
      )}
    </>
  )
}

export default RecordsContainer
