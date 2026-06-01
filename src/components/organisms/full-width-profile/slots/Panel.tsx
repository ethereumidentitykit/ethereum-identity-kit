import React from 'react'
import { clsx } from 'clsx'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import { FullWidthProfileHeaderBackground } from './HeaderBackground'
import { FullWidthProfileRole } from './Role'
import { FullWidthProfileMoreOptions } from './MoreOptions'
import { FullWidthProfileStatusSection } from './StatusSection'
import { FullWidthProfileContent } from './Content'
import { FullWidthProfileHeaderBackgroundWide } from './HeaderBackgroundWide'

export const FullWidthProfilePanel: React.FC = () => {
  const { className, style } = useProfileIdentityContext()

  return (
    <>
      <div id="user-profile" className={clsx('user-profile', className)} style={style}>
        <FullWidthProfileHeaderBackground />
        <FullWidthProfileRole />
        <FullWidthProfileMoreOptions />
        <FullWidthProfileStatusSection />
        <FullWidthProfileContent />
      </div>
      <FullWidthProfileHeaderBackgroundWide />
    </>
  )
}

FullWidthProfilePanel.displayName = 'FullWidthProfile.Panel'
