import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import CardHeader from '../components/card-header/CardHeader'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardCardHeaderSlotData = {
  openListSettings?: () => void
  name?: string
  refetchData: () => void
  list?: ReturnType<typeof useProfileCardContext>['list']
  primaryList?: ReturnType<typeof useProfileCardContext>['primaryList']
  detailsLoading: boolean
  nameMenu?: React.ReactNode
}

export const ProfileCardCardHeader: React.FC<ProfileCardSlotProps<ProfileCardCardHeaderSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const {
    openListSettings,
    ens,
    refreshProfileDetails,
    refreshProfileStats,
    list,
    primaryList,
    isDetailsLoading,
    nameMenu,
  } = useProfileCardContext()

  const slotData: ProfileCardCardHeaderSlotData = {
    openListSettings,
    name: ens?.name,
    refetchData: () => {
      refreshProfileDetails()
      refreshProfileStats()
    },
    list,
    primaryList,
    detailsLoading: isDetailsLoading,
    nameMenu,
  }

  const defaultNode = (
    <CardHeader
      openListSettings={slotData.openListSettings}
      name={slotData.name}
      refetchData={slotData.refetchData}
      list={slotData.list}
      primaryList={slotData.primaryList}
      detailsLoading={slotData.detailsLoading}
      nameMenu={slotData.nameMenu}
    />
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className, style }}>
        {content}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileCardCardHeader.displayName = 'ProfileCard.CardHeader'
