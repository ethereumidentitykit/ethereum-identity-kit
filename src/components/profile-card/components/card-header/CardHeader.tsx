import clsx from 'clsx'
import Ens from '../../../icons/Ens'
import Refresh from '../../../icons/Refresh'
import React, { useEffect, useMemo, useState } from 'react'
import { ProfileListType } from '../../../../types/profile'
import LoadingCell from '../../../loading-cell/LoadingCell'
import { formatNumber } from '../../../../utils/formatters'
import './CardHeader.css'

interface CardHeaderProps {
  refetchData: () => void
  isConnectedUserCard: boolean
  list?: ProfileListType
  name?: string
  primaryList?: ProfileListType
  detailsLoading: boolean
}

const CardHeader: React.FC<CardHeaderProps> = ({
  name,
  refetchData,
  isConnectedUserCard,
  list,
  primaryList,
  detailsLoading,
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
        <LoadingCell height="24px" width="65px" radius="25px" style={{ marginLeft: '10px' }} />
      ) : list || primaryList ? (
        <div className="header-left">List #{formatNumber(Number(list || primaryList))}</div>
      ) : (
        <div />
      )}
      <div className="header-right">
        {!detailsLoading && isPrimaryListProfile && isConnectedUserCard && (
          <a
            href={`https://app.ens.domains/${name}`}
            className="header-edit-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Ens height={22} width={22} />
            <p>Edit Profile</p>
          </a>
        )}
        {!(detailsLoading || isPrimaryListProfile) && (
          <div className="header-not-confirmed" onClick={() => setNotConfirmedTooltipOpen(!notConfirmedTooltipOpen)}>
            <div className="header-not-confirmed-title">Not confirmed by user</div>
            <div
              className={clsx(
                'header-not-confirmed-description',
                notConfirmedTooltipOpen && 'header-not-confirmed-decription-open'
              )}
            >
              This list is not confirmed to be owned by the displayed user. A user must set a list as their Primary List
              to confirm it as their list.
            </div>
          </div>
        )}
        <div className="header-refresh" onClick={refetchData}>
          <Refresh height={16} width={16} />
        </div>
      </div>
    </div>
  )
}

export default CardHeader
