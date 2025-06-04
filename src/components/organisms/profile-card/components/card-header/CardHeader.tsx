import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { ProfileListType } from '../../../../../types'
import LoadingCell from '../../../../atoms/loading-cell/LoadingCell'
import { formatNumber } from '../../../../../utils'
import Refresh from '../../../../icons/ui/Refresh'
import './CardHeader.css'
import { useTranslation } from '../../../../../context'

interface CardHeaderProps {
  refetchData: () => void
  list?: ProfileListType
  name?: string
  primaryList?: ProfileListType
  detailsLoading: boolean
  nameMenu?: React.ReactNode
  openListSettings?: () => void
}

const CardHeader: React.FC<CardHeaderProps> = ({
  refetchData,
  list,
  primaryList,
  detailsLoading,
  nameMenu,
  openListSettings,
}) => {
  const [notConfirmedTooltipOpen, setNotConfirmedTooltipOpen] = useState(false)
  const isPrimaryListProfile = useMemo(() => list === undefined || `${primaryList}` === `${list}`, [list, primaryList])
  const { t } = useTranslation()

  useEffect(() => {
    const closeTooltip = (event: MouseEvent) => {
      if (
        event.target !== document.querySelector('.header-not-confirmed') &&
        event.target !== document.querySelector('.header-not-confirmed-title')
      ) {
        setNotConfirmedTooltipOpen(false)
      }
    }

    window.addEventListener('click', closeTooltip)

    return () => {
      window.removeEventListener('click', closeTooltip)
    }
  }, [])

  return (
    <div className="header">
      {detailsLoading ? (
        <LoadingCell height="28px" width="65px" radius="4px" style={{ marginLeft: '10px' }} />
      ) : list || primaryList ? (
        <div className="header-left">
          <div
            className={clsx('header-left-list-number', openListSettings && 'list-clickable')}
            onClick={() => openListSettings?.()}
          >
            #{formatNumber(Number(list || primaryList))}
          </div>
          {!(detailsLoading || isPrimaryListProfile) && (
            <div className="header-not-confirmed" onClick={() => setNotConfirmedTooltipOpen(!notConfirmedTooltipOpen)}>
              <div className="header-not-confirmed-title">{t('profile.notConfirmedByUser')}</div>
              <div
                className={clsx(
                  'header-not-confirmed-description',
                  notConfirmedTooltipOpen && 'header-not-confirmed-decription-open'
                )}
              >
                {t('profile.notConfirmedByUserDescription')}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div />
      )}
      <div className="header-right">
        <div className="header-refresh" onClick={refetchData}>
          <Refresh height={16} width={16} />
        </div>
        {nameMenu}
      </div>
    </div>
  )
}

export default CardHeader
