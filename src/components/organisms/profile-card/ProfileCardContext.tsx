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
import { ProfileCardProps } from './ProfileCard.types'

export type ProfileCardContextValue = ProfileIdentityContextValue

export const useProfileCardContext = useProfileIdentityContext

export type ProfileCardRootProps = ProfileCardProps

export const ProfileCardRoot: React.FC<ProfileCardRootProps> = ({
  className,
  style,
  darkMode,
  children,
  ...props
}) => {
  const { appearanceClassName } = useAppearanceOptional()
  const Card = useResolvedComponent('Card', DefaultCard)

  return (
    <ProfileIdentityProvider surface="card" style={style} className={className} darkMode={darkMode} {...props}>
      <Card
        className={clsx('profile-card', appearanceClassName, darkMode && 'dark dark-profile-card', className)}
        data-testid="profile-card"
        style={{ fontFamily: 'Inter, sans-serif', ...style }}
      >
        {children}
      </Card>
    </ProfileIdentityProvider>
  )
}

ProfileCardRoot.displayName = 'ProfileCard.Root'

export { ProfileIdentityProvider }
