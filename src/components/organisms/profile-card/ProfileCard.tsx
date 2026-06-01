import React from 'react'
import { ProfileCardProps } from './ProfileCard.types'
import { ProfileCardRoot } from './ProfileCardContext'
import {
  ProfileCardHeader,
  ProfileCardCardHeader,
  ProfileCardBody,
  ProfileCardAvatarRow,
  ProfileCardAvatar,
  ProfileCardConnectButton,
  ProfileCardName,
  ProfileCardStats,
  ProfileCardStatus,
  ProfileCardBioContainer,
  ProfileCardBio,
  ProfileCardSocials,
  ProfileCardFollowersYouKnow,
  ProfileCardPoaps,
} from './slots'
import './ProfileCard.css'

/**
 * Profile Card for an Ethereum Profile. Includes ENS and EFP profile data to be displayed in any Web3 app.
 *
 * @param addressOrName - Ethereum Address or ENS name to fetch profile data for (required)
 *
 * @param list - Search profile data by list number - will override addressOrName if provided (used in EFP app) (optional)
 *
 * @param connectedAddress - Address of the user connected to the app (optional)
 *
 * @param darkMode - (optional)
 *
 * @param showFollowerState - shows follower state tag (follows you, blocks you, mutes you) (optional)
 *
 * @param showPoaps - shows EFP POAPs on the profile card (optional)
 *
 * @param onStatClick - action to be performed when a stat is clicked - default goes to EFP profile with selected stat (optional)
 *
 * @param options - see ProfileCardOption type for all options (optional)
 *
 * @param className - string (optional)
 *
 * @param style - CSS Properties (optional)
 *
 * @param props - HTML div element props (optional)
 *
 * @param hasCommonFollowersModal - Whether to show the common followers modal (optional)
 *
 * @returns ProfileCard component
 */
const ProfileCardBase: React.FC<ProfileCardProps> = (props) => (
  <ProfileCardRoot {...props}>
    <ProfileCardHeader />
    <ProfileCardCardHeader />
    <ProfileCardBody>
      <ProfileCardAvatarRow />
      <ProfileCardName />
      <ProfileCardStats />
      <ProfileCardStatus />
      <ProfileCardBioContainer>
        <ProfileCardBio />
        <ProfileCardSocials />
      </ProfileCardBioContainer>
    </ProfileCardBody>
    <ProfileCardFollowersYouKnow />
    <ProfileCardPoaps />
  </ProfileCardRoot>
)

const ProfileCard = Object.assign(ProfileCardBase, {
  Root: ProfileCardRoot,
  Header: ProfileCardHeader,
  CardHeader: ProfileCardCardHeader,
  Body: ProfileCardBody,
  AvatarRow: ProfileCardAvatarRow,
  Avatar: ProfileCardAvatar,
  ConnectButton: ProfileCardConnectButton,
  Name: ProfileCardName,
  Stats: ProfileCardStats,
  Status: ProfileCardStatus,
  BioContainer: ProfileCardBioContainer,
  Bio: ProfileCardBio,
  Socials: ProfileCardSocials,
  FollowersYouKnow: ProfileCardFollowersYouKnow,
  Poaps: ProfileCardPoaps,
})

export default ProfileCard

export {
  ProfileCardRoot,
  ProfileCardHeader,
  ProfileCardCardHeader,
  ProfileCardBody,
  ProfileCardAvatarRow,
  ProfileCardAvatar,
  ProfileCardConnectButton,
  ProfileCardName,
  ProfileCardStats,
  ProfileCardStatus,
  ProfileCardBioContainer,
  ProfileCardBio,
  ProfileCardSocials,
  ProfileCardFollowersYouKnow,
  ProfileCardPoaps,
}
