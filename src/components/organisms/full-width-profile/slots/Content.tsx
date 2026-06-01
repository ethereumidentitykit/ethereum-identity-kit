import React from 'react'
import { FullWidthProfileAvatar } from './Avatar'
import { FullWidthProfileDetails } from './Details'

export const FullWidthProfileContent: React.FC = () => (
  <div className="user-profile-content">
    <FullWidthProfileAvatar />
    <FullWidthProfileDetails />
  </div>
)

FullWidthProfileContent.displayName = 'FullWidthProfile.Content'
