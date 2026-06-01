import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import Bio from '../components/bio'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardBioSlotData = {
  description?: string
  isLoading: boolean
  onBioLinkClick?: (link: string) => void
}

export const ProfileCardBio: React.FC<ProfileCardSlotProps<ProfileCardBioSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, isDetailsLoading, onBioLinkClick } = useProfileCardContext()

  const slotData: ProfileCardBioSlotData = {
    description: ens?.records?.description,
    isLoading: isDetailsLoading,
    onBioLinkClick,
  }

  const defaultNode = isDetailsLoading ? (
    <div className="profile-bio-loading">
      <LoadingCell height="18px" width="210px" />
      <LoadingCell height="18px" width="140px" />
    </div>
  ) : (
    <Bio description={slotData.description} onBioLinkClick={slotData.onBioLinkClick} />
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild && !isDetailsLoading) {
    return (
      <Slottable asChild slotProps={{ className, style }}>
        {content}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileCardBio.displayName = 'ProfileCard.Bio'
