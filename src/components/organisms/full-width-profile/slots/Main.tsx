import React from 'react'
import { clsx } from 'clsx'
import { useAppearanceOptional } from '../../../../context/AppearanceContext'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import { FullWidthProfileError, FullWidthProfileLoading } from '../FullWidthProfileContext'
import { FullWidthProfilePanel } from './Panel'

export const FullWidthProfileMain: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { address, isDetailsLoading, alignProfileContent, darkMode } = useProfileIdentityContext()
  const { appearanceClassName } = useAppearanceOptional()

  return (
    <div className={clsx('full-width-profile-container', appearanceClassName)}>
      {isDetailsLoading ? (
        <FullWidthProfileLoading />
      ) : address ? (
        <div
          className={clsx('user-profile-container', darkMode && 'dark')}
          style={{ alignItems: alignProfileContent }}
        >
          {children ?? <FullWidthProfilePanel />}
        </div>
      ) : (
        <FullWidthProfileError />
      )}
    </div>
  )
}

FullWidthProfileMain.displayName = 'FullWidthProfile.Main'
