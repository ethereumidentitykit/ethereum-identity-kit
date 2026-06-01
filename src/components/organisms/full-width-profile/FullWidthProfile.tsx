import React from 'react'
import { FullWidthProfileRoot, FullWidthProfileLoading, FullWidthProfileError } from './FullWidthProfileContext'
import {
  FullWidthProfileTopCard,
  FullWidthProfileMain,
  FullWidthProfilePanel,
  FullWidthProfileHeaderBackground,
  FullWidthProfileHeaderBackgroundWide,
  FullWidthProfileRole,
  FullWidthProfileMoreOptions,
  FullWidthProfileStatusSection,
  FullWidthProfileContent,
  FullWidthProfileAvatar,
  FullWidthProfileDetails,
  FullWidthProfileName,
  FullWidthProfileStats,
  FullWidthProfileStatusMobile,
  FullWidthProfileBio,
  FullWidthProfileSocials,
  FullWidthProfileCommonFollowers,
} from './slots'
import type { FullWidthProfileProps } from './FullWidthProfile.types'
import './FullWidthProfile.css'

const FullWidthProfileBase: React.FC<FullWidthProfileProps> = (props) => (
  <FullWidthProfileRoot {...props}>
    <FullWidthProfileTopCard />
    <FullWidthProfileMain />
  </FullWidthProfileRoot>
)

const FullWidthProfile = Object.assign(FullWidthProfileBase, {
  Root: FullWidthProfileRoot,
  TopCard: FullWidthProfileTopCard,
  Main: FullWidthProfileMain,
  Panel: FullWidthProfilePanel,
  Loading: FullWidthProfileLoading,
  Error: FullWidthProfileError,
  HeaderBackground: FullWidthProfileHeaderBackground,
  HeaderBackgroundWide: FullWidthProfileHeaderBackgroundWide,
  Role: FullWidthProfileRole,
  MoreOptions: FullWidthProfileMoreOptions,
  StatusSection: FullWidthProfileStatusSection,
  Content: FullWidthProfileContent,
  Avatar: FullWidthProfileAvatar,
  Details: FullWidthProfileDetails,
  Name: FullWidthProfileName,
  Stats: FullWidthProfileStats,
  StatusMobile: FullWidthProfileStatusMobile,
  Bio: FullWidthProfileBio,
  Socials: FullWidthProfileSocials,
  CommonFollowers: FullWidthProfileCommonFollowers,
})

export default FullWidthProfile

export {
  FullWidthProfileRoot,
  FullWidthProfileTopCard,
  FullWidthProfileMain,
  FullWidthProfilePanel,
  FullWidthProfileLoading,
  FullWidthProfileError,
  FullWidthProfileHeaderBackground,
  FullWidthProfileHeaderBackgroundWide,
  FullWidthProfileRole,
  FullWidthProfileMoreOptions,
  FullWidthProfileStatusSection,
  FullWidthProfileContent,
  FullWidthProfileAvatar,
  FullWidthProfileDetails,
  FullWidthProfileName,
  FullWidthProfileStats,
  FullWidthProfileStatusMobile,
  FullWidthProfileBio,
  FullWidthProfileSocials,
  FullWidthProfileCommonFollowers,
}
