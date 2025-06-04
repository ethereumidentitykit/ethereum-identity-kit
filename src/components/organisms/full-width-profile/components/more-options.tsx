import React, { LegacyRef, useState } from 'react'
import { useOutsideClick } from '../../../../hooks'
import { formatNumber } from '../../../../utils'
import { Refresh } from '../../../icons'
import { ProfileListType } from '../../../../types'
import { useTranslation } from '../../../../context'

interface MoreOptionsProps {
  profileList?: ProfileListType
  primaryList?: ProfileListType
  refetchData?: () => void
  nameMenu?: React.ReactNode
  openListSettingsModal?: () => void
}

const MoreOptions: React.FC<MoreOptionsProps> = ({
  profileList,
  primaryList,
  nameMenu,
  openListSettingsModal,
  refetchData,
}) => {
  const [cardTooltipOpen, setCardTooltipOpen] = useState(false)
  const clickAwayCardTooltip = useOutsideClick(() => {
    setCardTooltipOpen(false)
  })
  const { t } = useTranslation()

  return (
    <div className="more-options">
      {!!profileList && profileList !== Number(primaryList) && (
        <div ref={clickAwayCardTooltip as LegacyRef<HTMLDivElement>} className="more-options-not-confirmed-container">
          <p onClick={() => setCardTooltipOpen(!cardTooltipOpen)} className="more-options-not-confirmed-text">
            {t('profile.notConfirmedByUser')}
          </p>
          <div
            className="more-options-not-confirmed-tooltip"
            style={{
              display: cardTooltipOpen ? 'block' : 'none',
            }}
          >
            {t('profile.notConfirmedByUserDescription')}
          </div>
        </div>
      )}
      {!!profileList && (
        <p
          className="more-options-list-number"
          onClick={() => openListSettingsModal?.()}
          style={{
            pointerEvents: openListSettingsModal ? 'auto' : 'none',
          }}
        >
          #{formatNumber(Number(profileList))}
        </p>
      )}
      {refetchData && (
        <button onClick={refetchData} className="more-options-refresh-button">
          <Refresh height={18} width={18} />
        </button>
      )}
      {nameMenu}
    </div>
  )
}

export default MoreOptions
