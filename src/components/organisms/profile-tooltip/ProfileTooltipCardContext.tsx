import React from 'react'
import { clsx } from 'clsx'
import { useAppearanceOptional } from '../../../context/AppearanceContext'
import { useResolvedComponent } from '../../primitives/resolveComponent'
import { DefaultCard } from '../../primitives/default'
import {
  ProfileIdentityProvider,
  useProfileIdentityContext,
  type ProfileIdentityContextValue,
} from '../../profile-identity/ProfileIdentityContext'
import type { ProfileTooltipProps } from './ProfileTooltip.types'

export type ProfileTooltipCardContextValue = ProfileIdentityContextValue

export const useProfileTooltipCardContext = useProfileIdentityContext

export type ProfileTooltipCardRootProps = ProfileTooltipProps

export const ProfileTooltipCardRoot: React.FC<ProfileTooltipCardRootProps> = ({
  className,
  style,
  darkMode,
  showBio = true,
  showSocials,
  showStatus,
  includeGrails,
  children,
  onProfileClick = (addressOrName) => {
    window.open(`https://efp.app/${addressOrName}`, '_blank', 'noopener,noreferrer')
  },
  ...props
}) => {
  const { appearanceClassName } = useAppearanceOptional()
  const Card = useResolvedComponent('Card', DefaultCard)

  return (
    <ProfileIdentityProvider
      surface="tooltip"
      style={style}
      className={className}
      darkMode={darkMode}
      showBio={showBio}
      showSocials={showSocials}
      showStatus={showStatus}
      includeGrails={includeGrails}
      onProfileClick={onProfileClick}
      {...props}
    >
      <Card
        className={clsx('tooltip-card', appearanceClassName, darkMode && 'dark dark-tooltip-card', className)}
        data-testid="tooltip-card"
        style={{ fontFamily: 'Inter, sans-serif', ...style }}
      >
        {children}
      </Card>
    </ProfileIdentityProvider>
  )
}

ProfileTooltipCardRoot.displayName = 'ProfileTooltipCard.Root'
