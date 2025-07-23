import clsx from 'clsx'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import './ProfileListRow.css'

const ProfileListLoadingRow = ({
  showHeaderImage,
  rowHeight = 80,
}: {
  showHeaderImage?: boolean
  rowHeight?: number
}) => {
  return (
    <div className={clsx('profile-list-row', showHeaderImage && 'has-header-image')} style={{ height: rowHeight }}>
      <div className="profile-list-row-details">
        <LoadingCell style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
        <LoadingCell style={{ width: '128px', height: '32px', borderRadius: '8px' }} />
      </div>
      <LoadingCell style={{ width: '110px', height: '39px', borderRadius: '4px' }} />
    </div>
  )
}

export default ProfileListLoadingRow
