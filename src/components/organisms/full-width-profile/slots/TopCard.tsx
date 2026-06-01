import React from 'react'
import ProfileCard from '../../profile-card/ProfileCard'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'

export const FullWidthProfileTopCard: React.FC = () => {
  const ctx = useProfileIdentityContext()

  return (
    <div className="user-profile-card-container">
      <ProfileCard
        addressOrName={ctx.addressOrName}
        list={ctx.list}
        connectedAddress={ctx.connectedAddress}
        darkMode={ctx.darkMode}
        showFollowButton={ctx.showFollowButton}
        showFollowerState={ctx.showFollowerState}
        onProfileClick={ctx.onProfileClick}
        onStatClick={ctx.onStatClick}
        showEmptySocials={ctx.showEmptySocials}
        extraOptions={{
          prefetched: ctx.prefetched,
          customFollowButton: ctx.customFollowButton,
          nameMenu: ctx.nameMenu,
          openListSettings: ctx.openListSettings,
          onEditProfileClick: ctx.onEditProfileClick,
          onBioLinkClick: ctx.onBioLinkClick,
          hideSocials: ctx.hideSocials,
          hideEFPPoaps: ctx.hideEFPPoaps,
          customPoaps: ctx.customPoaps,
          role: ctx.role,
        }}
        showPoaps={ctx.showPoaps}
        selectedList={ctx.selectedList}
        style={{
          width: '100%',
          borderRadius: '0px',
          ...ctx.style,
        }}
      />
    </div>
  )
}

FullWidthProfileTopCard.displayName = 'FullWidthProfile.TopCard'
