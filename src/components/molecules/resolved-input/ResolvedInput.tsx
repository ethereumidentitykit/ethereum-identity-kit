import { useId } from 'react'
import { useQuery } from '@tanstack/react-query'
import { isAddress } from 'viem'
import { ResolvedInputProps } from './ResolvedInput.types'
import { fetchAccount } from '../../../utils'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import Avatar from '../avatar/Avatar'
import './ResolvedInput.css'
import Input from '../../atoms/input/Input'

const ResolvedInput: React.FC<ResolvedInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  className,
  disabled,
  darkMode,
}) => {
  const inputId = useId()
  const accountLookupTarget = isAddress(value) ? value : value?.endsWith('.eth') && value?.length > 7 ? value : null

  const {
    data: resolvedAccount,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['profile', accountLookupTarget],
    queryFn: async () => {
      if (!accountLookupTarget) return null

      const profile = await fetchAccount(accountLookupTarget)
      return profile
    },
    enabled: !!accountLookupTarget,
  })

  const resolvedProfile = resolvedAccount?.ens || { name: null, avatar: null }
  const displayedValue =
    accountLookupTarget && isAddress(accountLookupTarget) ? resolvedProfile?.name : resolvedProfile?.name

  return (
    <div className={`resolved-input-container ${darkMode ? 'dark' : 'light'} ${className}`}>
      <Input
        id={inputId}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="resolved-input-input"
      />
      {accountLookupTarget && (
        <div className="resolved-input-content">
          {isProfileLoading ? (
            <>
              <LoadingCell height="24px" width="24px" radius="4px" />
              <LoadingCell height="20px" width="100%" radius="4px" />
            </>
          ) : (
            <>
              <Avatar
                name={resolvedProfile?.name || value}
                style={{ height: '26px', width: '26px' }}
                src={resolvedProfile?.avatar}
              />
              <p className={`resolved-input-value ${profileError ? 'resolved-input-value-error' : ''}`}>
                {profileError ? 'Error resolving profile' : displayedValue}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ResolvedInput
