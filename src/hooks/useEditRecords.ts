import { useState, useCallback, useMemo, useEffect } from 'react'
import { namehash, labelhash, hexToBigInt, encodeFunctionData, toHex, isAddress } from 'viem'
import { mainnet } from 'viem/chains'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import * as abi from '../constants/abi'
import { ENSContracts } from '../constants/contracts'
import { resolveEnsAddress } from '../utils/ens'
import { fetchNameRoles } from '../utils'
import { TEXT_RECORD_KEYS, ADDRESS_RECORD_KEYS, COIN_TYPES } from '../constants'

export type EditStep = 'editing' | 'confirming' | 'processing' | 'success' | 'error'

export function useEditRecords(name: string | null, metadata: Record<string, string> | null) {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const walletClient = useWalletClient()
  const queryClient = useQueryClient()

  const { data: roles } = useQuery({
    queryKey: ['name', 'roles', name],
    queryFn: async () => {
      if (!name) return null
      const roles = await fetchNameRoles(name)
      return roles
    },
    enabled: !!name,
  })
  const ownerAddress = useMemo(() => roles?.owner, [roles])
  const managerAddress = useMemo(() => roles?.manager, [roles])
  const resolverAddress = useMemo(() => roles?.resolver, [roles])
  const ethAddress = useMemo(() => roles?.ethAddress, [roles])

  // Roles state
  const [roleOwner, setRoleOwnerState] = useState(ownerAddress || '')
  const [roleManager, setRoleManagerState] = useState(managerAddress || '')
  const [roleEthRecord, setRoleEthRecordState] = useState(ethAddress || '')

  useEffect(() => {
    if (!roles) return
    setRoleOwnerState(roles.owner)
    setRoleManagerState(roles.manager)
    setRoleEthRecordState(roles.ethAddress)
  }, [roles])

  // Text records state
  const [records, setRecords] = useState<Record<string, string>>({})
  const [initialRecords, setInitialRecords] = useState<Record<string, string>>({})

  // Address records state (non-ETH only — ETH is in roles)
  const [addressRecords, setAddressRecords] = useState<Record<string, string>>({ btc: '', sol: '', doge: '' })
  const [initialAddressRecords, setInitialAddressRecords] = useState<Record<string, string>>({
    btc: '',
    sol: '',
    doge: '',
  })
  const [visibleAddressRecords, setVisibleAddressRecords] = useState<Set<string>>(new Set())

  // Custom records state (any metadata key not in TEXT_RECORD_KEYS or ADDRESS_RECORD_KEYS)
  const [customRecords, setCustomRecords] = useState<Record<string, string>>({})
  const [initialCustomRecords, setInitialCustomRecords] = useState<Record<string, string>>({})
  const [visibleCustomRecords, setVisibleCustomRecords] = useState<Set<string>>(new Set())

  // Resolved ENS addresses for role fields
  const [resolvedRoleOwner, setResolvedRoleOwner] = useState<string | null>(null)
  const [resolvedRoleManager, setResolvedRoleManager] = useState<string | null>(null)
  const [resolvedRoleEthRecord, setResolvedRoleEthRecord] = useState<string | null>(null)
  const [roleOwnerResolving, setRoleOwnerResolving] = useState(false)
  const [roleManagerResolving, setRoleManagerResolving] = useState(false)
  const [roleEthRecordResolving, setRoleEthRecordResolving] = useState(false)

  // UI state
  const [step, setStep] = useState<EditStep>('editing')
  const [imageUploadTarget, setImageUploadTarget] = useState<'avatar' | 'header' | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  // Initialize state from metadata
  useEffect(() => {
    if (!metadata) return

    const textRecs: Record<string, string> = {}
    for (const key of TEXT_RECORD_KEYS) {
      textRecs[key] = metadata[key] || ''
    }
    setRecords(textRecs)
    setInitialRecords(textRecs)

    const addrRecs: Record<string, string> = { btc: '', sol: '', doge: '' }
    const visible = new Set<string>()
    for (const key of ADDRESS_RECORD_KEYS) {
      const value = metadata[key] || ''
      addrRecs[key] = value
      if (value) visible.add(key)
    }
    setAddressRecords(addrRecs)
    setInitialAddressRecords(addrRecs)
    setVisibleAddressRecords(visible)

    // ETH record for Roles tab (metadata key is 'Ethereum' from chains, or 'eth')
    const ethValue = metadata['Ethereum'] || metadata['ethereum'] || metadata['eth'] || ''
    setRoleEthRecordState(ethValue)
    // Custom records: any key not in predefined sets
    const knownKeys = new Set<string>([
      ...TEXT_RECORD_KEYS,
      ...ADDRESS_RECORD_KEYS,
      'eth',
      'Ethereum',
      'ethereum',
      'resolverAddress',
    ])
    const customRecs: Record<string, string> = {}
    const visibleCustom = new Set<string>()
    for (const [key, value] of Object.entries(metadata)) {
      if (!knownKeys.has(key) && typeof value === 'string') {
        customRecs[key] = value
        visibleCustom.add(key)
      }
    }
    setCustomRecords(customRecs)
    setInitialCustomRecords(customRecs)
    setVisibleCustomRecords(visibleCustom)
  }, [metadata])

  // Resolve ENS names for role fields (debounced)
  useEffect(() => {
    if (!roleOwner) {
      setResolvedRoleOwner(null)
      setRoleOwnerResolving(false)
      return
    }
    if (isAddress(roleOwner)) {
      setResolvedRoleOwner(roleOwner)
      setRoleOwnerResolving(false)
      return
    }
    if (roleOwner.includes('.')) {
      setRoleOwnerResolving(true)
      const timeout = setTimeout(async () => {
        const resolved = await resolveEnsAddress(roleOwner)
        setResolvedRoleOwner(resolved || null)
        setRoleOwnerResolving(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
    setResolvedRoleOwner(null)
    setRoleOwnerResolving(false)
  }, [roleOwner])

  useEffect(() => {
    if (!roleManager) {
      setResolvedRoleManager(null)
      setRoleManagerResolving(false)
      return
    }
    if (isAddress(roleManager)) {
      setResolvedRoleManager(roleManager)
      setRoleManagerResolving(false)
      return
    }
    if (roleManager.includes('.')) {
      setRoleManagerResolving(true)
      const timeout = setTimeout(async () => {
        const resolved = await resolveEnsAddress(roleManager)
        setResolvedRoleManager(resolved || null)
        setRoleManagerResolving(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
    setResolvedRoleManager(null)
    setRoleManagerResolving(false)
  }, [roleManager])

  useEffect(() => {
    if (!roleEthRecord) {
      setResolvedRoleEthRecord(null)
      setRoleEthRecordResolving(false)
      return
    }
    if (isAddress(roleEthRecord)) {
      setResolvedRoleEthRecord(roleEthRecord)
      setRoleEthRecordResolving(false)
      return
    }
    if (roleEthRecord.includes('.')) {
      setRoleEthRecordResolving(true)
      const timeout = setTimeout(async () => {
        const resolved = await resolveEnsAddress(roleEthRecord)
        setResolvedRoleEthRecord(resolved || null)
        setRoleEthRecordResolving(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
    setResolvedRoleEthRecord(null)
    setRoleEthRecordResolving(false)
  }, [roleEthRecord])

  const isRoleResolving = roleOwnerResolving || roleManagerResolving || roleEthRecordResolving

  // Permission checks (based on on-chain values, not edited values)
  const isManager = useMemo(() => {
    if (!address || !managerAddress) return false
    return address.toLowerCase() === managerAddress.toLowerCase()
  }, [address, managerAddress])

  const isOwner = useMemo(() => {
    if (!address || !ownerAddress) return false
    return address.toLowerCase() === ownerAddress.toLowerCase()
  }, [address, ownerAddress])

  // Track dirty state
  const hasChanges = useMemo(() => {
    for (const key of TEXT_RECORD_KEYS) {
      if ((records[key] || '') !== (initialRecords[key] || '')) return true
    }
    for (const key of ADDRESS_RECORD_KEYS) {
      if ((addressRecords[key] || '') !== (initialAddressRecords[key] || '')) return true
    }
    const allCustomKeys = new Set([...Object.keys(customRecords), ...Object.keys(initialCustomRecords)])
    for (const key of Array.from(allCustomKeys)) {
      if ((customRecords[key] ?? '') !== (initialCustomRecords[key] ?? '')) return true
    }
    // Check role changes
    if (roleEthRecord !== ethAddress) return true
    if (roleManager.toLowerCase() !== managerAddress?.toLowerCase()) return true
    if (roleOwner.toLowerCase() !== ownerAddress?.toLowerCase()) return true
    return false
  }, [
    records,
    initialRecords,
    addressRecords,
    initialAddressRecords,
    customRecords,
    initialCustomRecords,
    roleEthRecord,
    ethAddress,
    roleManager,
    managerAddress,
    roleOwner,
    ownerAddress,
  ])

  // Update text record
  const setRecord = useCallback((key: string, value: string) => {
    setRecords((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Update address record
  const setAddressRecord = useCallback((key: string, value: string) => {
    setAddressRecords((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Add an address record to visible set
  const addVisibleAddressRecord = useCallback((key: string) => {
    setVisibleAddressRecords((prev) => new Set([...Array.from(prev), key]))
  }, [])

  // Hidden address record keys (available to add)
  const hiddenAddressRecords = useMemo(() => {
    return ADDRESS_RECORD_KEYS.filter((key) => !visibleAddressRecords.has(key))
  }, [visibleAddressRecords])

  // Custom record functions
  const setCustomRecord = useCallback((key: string, value: string) => {
    setCustomRecords((prev) => ({ ...prev, [key]: value }))
  }, [])

  const addCustomRecord = useCallback((key: string) => {
    setCustomRecords((prev) => ({ ...prev, [key]: '' }))
    setVisibleCustomRecords((prev) => new Set([...Array.from(prev), key]))
  }, [])

  const removeCustomRecord = useCallback((key: string) => {
    setVisibleCustomRecords((prev) => {
      const next = new Set(prev)
      next.delete(key)
      return next
    })
    setCustomRecords((prev) => ({ ...prev, [key]: '' }))
  }, [])

  // Visible custom record keys (ordered)
  const visibleCustomRecordKeys = useMemo(() => {
    return Array.from(visibleCustomRecords)
  }, [visibleCustomRecords])

  // Role setters
  const setRoleOwner = useCallback((value: string) => setRoleOwnerState(value), [])
  const setRoleManager = useCallback((value: string) => setRoleManagerState(value), [])
  const setRoleEthRecord = useCallback((value: string) => setRoleEthRecordState(value), [])

  // Save all changed records and roles
  const saveRecords = useCallback(async () => {
    if (!name || !resolverAddress || !publicClient) return

    setStep('confirming')
    setErrorMessage(null)
    setTxHash(null)

    // Helper: resolve an input value to an effective address
    const resolveRole = (value: string, resolved: string | null): `0x${string}` | null => {
      if (isAddress(value)) return value as `0x${string}`
      if (resolved && isAddress(resolved)) return resolved as `0x${string}`
      return null
    }

    try {
      const node = namehash(name)

      // --- Step 1: Resolver multicall (text records + address records + custom records + ETH record) ---
      const calls: `0x${string}`[] = []

      // Encode changed text records
      for (const key of TEXT_RECORD_KEYS) {
        const current = records[key] || ''
        const initial = initialRecords[key] || ''
        if (current !== initial) {
          calls.push(
            encodeFunctionData({
              abi: abi.PublicResolverAbi,
              functionName: 'setText',
              args: [node, key, current],
            })
          )
        }
      }

      // Encode changed address records (BTC etc, not ETH)
      for (const key of ADDRESS_RECORD_KEYS) {
        const current = addressRecords[key] || ''
        const initial = initialAddressRecords[key] || ''
        if (current !== initial) {
          const coinType = BigInt(COIN_TYPES[key])
          const addressBytes = current
            ? (toHex(new TextEncoder().encode(current)) as `0x${string}`)
            : ('0x' as `0x${string}`)
          calls.push(
            encodeFunctionData({
              abi: abi.PublicResolverAbi,
              functionName: 'setAddr',
              args: [node, coinType, addressBytes],
            })
          )
        }
      }

      // Encode changed custom records
      const allCustomKeys = new Set([...Object.keys(customRecords), ...Object.keys(initialCustomRecords)])
      for (const key of Array.from(allCustomKeys)) {
        const current = customRecords[key] ?? ''
        const initial = initialCustomRecords[key] ?? ''
        if (current !== initial) {
          calls.push(
            encodeFunctionData({
              abi: abi.PublicResolverAbi,
              functionName: 'setText',
              args: [node, key, current],
            })
          )
        }
      }

      // Encode ETH record change from Roles tab
      if (roleEthRecord !== ethAddress) {
        const effectiveEthAddr =
          resolveRole(roleEthRecord, resolvedRoleEthRecord) ||
          ('0x0000000000000000000000000000000000000000' as `0x${string}`)
        calls.push(
          encodeFunctionData({
            abi: abi.PublicResolverAbi,
            functionName: 'setAddr',
            args: [node, effectiveEthAddr],
          })
        )
      }

      // Submit multicall if there are resolver changes
      if (calls.length > 0) {
        const hash = await walletClient.data?.writeContract?.({
          address: ENSContracts.PublicResolver,
          abi: abi.PublicResolverAbi,
          functionName: 'multicall',
          args: [calls],
          chain: mainnet,
        })

        if (!hash) {
          throw new Error('Failed to write contract')
        }

        setTxHash(hash)
        setStep('processing')
        await publicClient.waitForTransactionReceipt({ hash })
      }

      // --- Step 2: Manager change (setOwner on Registry, or reclaim on BaseRegistrar) ---
      const managerChanged = roleManager.toLowerCase() !== managerAddress?.toLowerCase()
      if (managerChanged && roleManager) {
        const effectiveManager = resolveRole(roleManager, resolvedRoleManager)
        if (!effectiveManager) {
          throw new Error(`Could not resolve "${roleManager}" to an address`)
        }

        setStep('confirming')
        const label = name.endsWith('.eth') ? name.slice(0, -4) : name.split('.')[0]
        const tokenId = hexToBigInt(labelhash(label))

        let hash: `0x${string}` | undefined
        if (isManager) {
          // Current manager can use setOwner on the Registry
          hash = await walletClient.data?.writeContract?.({
            address: ENSContracts.Registry as `0x${string}`,
            abi: abi.RegistryAbi,
            functionName: 'setOwner',
            args: [node, effectiveManager],
            chain: mainnet,
          })
        } else {
          // NFT owner can use reclaim on the BaseRegistrar
          hash = await walletClient.data?.writeContract?.({
            address: ENSContracts.BaseRegistrar as `0x${string}`,
            abi: abi.BaseRegistrarAbi,
            functionName: 'reclaim',
            args: [tokenId, effectiveManager],
            chain: mainnet,
          })
        }

        if (!hash) {
          throw new Error('Failed to write contract')
        }

        setTxHash(hash)
        setStep('processing')
        await publicClient.waitForTransactionReceipt({ hash })
      }

      // --- Step 3: Owner transfer (safeTransferFrom on BaseRegistrar) ---
      const ownerChanged = roleOwner.toLowerCase() !== ownerAddress?.toLowerCase()
      if (ownerChanged && roleOwner && ownerAddress) {
        const effectiveOwner = resolveRole(roleOwner, resolvedRoleOwner)
        if (!effectiveOwner) {
          throw new Error(`Could not resolve "${roleOwner}" to an address`)
        }

        setStep('confirming')
        const label = name.endsWith('.eth') ? name.slice(0, -4) : name.split('.')[0]
        const tokenId = hexToBigInt(labelhash(label))

        const hash = await walletClient.data?.writeContract?.({
          address: ENSContracts.BaseRegistrar as `0x${string}`,
          abi: abi.BaseRegistrarAbi,
          functionName: 'safeTransferFrom',
          args: [ownerAddress, effectiveOwner, tokenId],
          chain: mainnet,
        })

        if (!hash) {
          throw new Error('Failed to write contract')
        }

        setTxHash(hash)
        setStep('processing')
        await publicClient.waitForTransactionReceipt({ hash })
      }

      // Invalidate caches
      queryClient.invalidateQueries({ queryKey: ['name', 'metadata', name] })
      queryClient.invalidateQueries({ queryKey: ['name', 'details', name] })
      queryClient.invalidateQueries({ queryKey: ['name', 'roles', name] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['profileMetadata', name] })

      setStep('success')
    } catch (err: unknown) {
      setStep('error')
      setErrorMessage(err instanceof Error ? err.message : 'Transaction failed')
    }
  }, [
    name,
    walletClient,
    resolverAddress,
    publicClient,
    records,
    initialRecords,
    addressRecords,
    initialAddressRecords,
    customRecords,
    initialCustomRecords,
    roleEthRecord,
    ethAddress,
    roleManager,
    managerAddress,
    roleOwner,
    ownerAddress,
    isManager,
    resolvedRoleOwner,
    resolvedRoleManager,
    resolvedRoleEthRecord,
    queryClient,
  ])

  // Reset to editing state (for "Try Again") — keeps current record values
  const resetToEditing = useCallback(() => {
    setStep('editing')
    setErrorMessage(null)
    setTxHash(null)
  }, [])

  return {
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
    resolvedRoleOwner,
    roleOwnerResolving,
    roleManager,
    setRoleManager,
    resolvedRoleManager,
    roleManagerResolving,
    roleEthRecord,
    setRoleEthRecord,
    resolvedRoleEthRecord,
    roleEthRecordResolving,
    isRoleResolving,
    step,
    setStep,
    imageUploadTarget,
    setImageUploadTarget,
    hasChanges,
    saveRecords,
    resetToEditing,
    errorMessage,
    txHash,
    resolverAddress,
    address,
    isManager,
    isOwner,
  }
}
