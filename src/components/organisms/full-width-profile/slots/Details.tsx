import React from 'react'
import { FullWidthProfileName } from './Name'
import { FullWidthProfileStats } from './Stats'
import { FullWidthProfileStatusMobile } from './StatusMobile'
import { FullWidthProfileBio } from './Bio'
import { FullWidthProfileSocials } from './Socials'
import { FullWidthProfileCommonFollowers } from './CommonFollowers'

export const FullWidthProfileDetails: React.FC = () => (
  <div className="user-profile-details">
    <FullWidthProfileName />
    <FullWidthProfileStats />
    <FullWidthProfileStatusMobile />
    <FullWidthProfileBio />
    <FullWidthProfileSocials />
    <div className="user-profile-mobile-common-followers-container">
      <FullWidthProfileCommonFollowers variant="mobile" />
    </div>
  </div>
)

FullWidthProfileDetails.displayName = 'FullWidthProfile.Details'
