import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { ProfileListType } from '../../../../types/profile'
import LoadingCell from '../../../loading-cell/LoadingCell'
import { formatNumber } from '../../../../utils/formatters'
import Refresh from '../../../icons/ui/Refresh'
import './CardHeader.css'

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
          <div className="header-left-list-number" onClick={() => openListSettings?.()}>
            #{formatNumber(Number(list || primaryList))}
          </div>
          {!(detailsLoading || isPrimaryListProfile) && (
            <div className="header-not-confirmed" onClick={() => setNotConfirmedTooltipOpen(!notConfirmedTooltipOpen)}>
              <div className="header-not-confirmed-title">Not confirmed by user</div>
              <div
                className={clsx(
                  'header-not-confirmed-description',
                  notConfirmedTooltipOpen && 'header-not-confirmed-decription-open'
                )}
              >
                This list is not confirmed to be owned by the displayed user. A user must set a list as their Primary
                List to confirm it as their list.
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
