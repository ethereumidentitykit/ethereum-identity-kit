import React from 'react'
import { clsx } from 'clsx'
import { useTranslation } from '../../../context'
import {
  ProfileIdentityProvider,
  useProfileIdentityContext,
  type ProfileIdentityContextValue,
} from '../../profile-identity/ProfileIdentityContext'
import type { FullWidthProfileProps } from './FullWidthProfile.types'
import Loading from './components/loading'

export type FullWidthProfileContextValue = ProfileIdentityContextValue

export const useFullWidthProfileContext = useProfileIdentityContext

export type FullWidthProfileRootProps = FullWidthProfileProps & {
  children: React.ReactNode
}

export const FullWidthProfileRoot: React.FC<FullWidthProfileRootProps> = ({
  alignProfileContent = 'center',
  children,
  ...props
}) => (
  <ProfileIdentityProvider surface="fullWidth" alignProfileContent={alignProfileContent} {...props}>
    {children}
  </ProfileIdentityProvider>
)

FullWidthProfileRoot.displayName = 'FullWidthProfile.Root'

export const FullWidthProfileLoading: React.FC = () => {
  const { darkMode, style } = useProfileIdentityContext()
  return <Loading darkMode={darkMode} style={style} />
}

FullWidthProfileLoading.displayName = 'FullWidthProfile.Loading'

export const FullWidthProfileError: React.FC = () => {
  const { darkMode } = useProfileIdentityContext()
  const { t } = useTranslation()

  return (
    <div className={clsx('user-profile-error-container', darkMode && 'dark')}>
      <p className="user-profile-error-text">{t('profile.noUser')}</p>
    </div>
  )
}

FullWidthProfileError.displayName = 'FullWidthProfile.Error'
