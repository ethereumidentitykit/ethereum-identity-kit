import React from 'react'
import { clsx } from 'clsx'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import { FullWidthProfileHeaderBackground } from './HeaderBackground'
import { FullWidthProfileRole } from './Role'
import { FullWidthProfileMoreOptions } from './MoreOptions'
import { FullWidthProfileStatusSection } from './StatusSection'
import { FullWidthProfileContent } from './Content'
import { FullWidthProfileHeaderBackgroundWide } from './HeaderBackgroundWide'

export type FullWidthProfilePanelProps = {
  id?: string
  children?: React.ReactNode
}

export const FullWidthProfilePanel: React.FC<FullWidthProfilePanelProps> = ({ id, children }) => {
  const { className, style } = useProfileIdentityContext()

  return (
    <>
      <div id={id} className={clsx('user-profile', className)} style={style}>
        {children ?? (
          <>
            <FullWidthProfileHeaderBackground />
            <FullWidthProfileRole />
            <FullWidthProfileMoreOptions />
            <FullWidthProfileStatusSection />
            <FullWidthProfileContent />
          </>
        )}
      </div>
      {!children && <FullWidthProfileHeaderBackgroundWide />}
    </>
  )
}

FullWidthProfilePanel.displayName = 'FullWidthProfile.Panel'
