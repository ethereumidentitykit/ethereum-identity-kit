import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import Bio from '../../profile-card/components/bio'
import type { ProfileTooltipSlotProps } from './slot.types'

export type ProfileTooltipBioSlotData = {
  description?: string
  isLoading: boolean
  onBioLinkClick?: (link: string) => void
}

export const ProfileTooltipBio: React.FC<ProfileTooltipSlotProps<ProfileTooltipBioSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, isDetailsLoading, onBioLinkClick, showBio } = useProfileIdentityContext()

  if (!showBio) {
    return null
  }

  const slotData: ProfileTooltipBioSlotData = {
    description: ens?.records?.description,
    isLoading: isDetailsLoading,
    onBioLinkClick,
  }

  const defaultNode = isDetailsLoading ? (
    <div className="bio-loading">
      <LoadingCell height="18px" width="210px" />
      <LoadingCell height="18px" width="140px" />
    </div>
  ) : (
    <Bio description={slotData.description} maxLines={2} showMore={false} onBioLinkClick={slotData.onBioLinkClick} />
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild && !isDetailsLoading) {
    return (
      <Slottable asChild slotProps={{ className, style }}>
        {content}
      </Slottable>
    )
  }

  return <div className="tooltip-bio">{content}</div>
}

ProfileTooltipBio.displayName = 'ProfileTooltipCard.Bio'
