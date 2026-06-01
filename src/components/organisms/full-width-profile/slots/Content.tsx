import React from 'react'
import { FullWidthProfileAvatar } from './Avatar'
import { FullWidthProfileDetails } from './Details'

export const FullWidthProfileContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="user-profile-content">
    {children ?? (
      <>
        <FullWidthProfileAvatar />
        <FullWidthProfileDetails />
      </>
    )}
  </div>
)

FullWidthProfileContent.displayName = 'FullWidthProfile.Content'
