import LoadingCell from '../loading-cell/LoadingCell'
import './ProfileListRow.css'

const ProfileListLoadingRow = () => {
  return (
    <div className="profile-list-row">
      <div className="profile-list-row-details">
        <LoadingCell style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
        <LoadingCell style={{ width: '128px', height: '32px', borderRadius: '8px' }} />
      </div>
      <LoadingCell style={{ width: '110px', height: '39px', borderRadius: '4px' }} />
    </div>
  )
}

export default ProfileListLoadingRow
