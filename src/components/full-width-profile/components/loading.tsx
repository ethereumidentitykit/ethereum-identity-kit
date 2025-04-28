import clsx from 'clsx'
import LoadingCell from '../../loading-cell/LoadingCell'
import '../FullWidthProfile.css'

const Loading = ({ darkMode, style }: { darkMode?: boolean; style?: React.CSSProperties }) => {
  return (
    <div className={clsx('user-profile-container', darkMode && 'dark')} style={{ position: 'relative', ...style }}>
      <LoadingCell
        height="100%"
        width="100%"
        radius="0px"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <div
        style={{
          width: 'fit-content',
          height: 'fit-content',
          display: 'flex',
          position: 'absolute',
          top: '24px',
          right: '32px',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'transparent',
        }}
      >
        <LoadingCell height="28px" width="56px" radius="4px" />
        <LoadingCell height="28px" width="28px" radius="4px" />
        <LoadingCell height="28px" width="28px" radius="4px" />
      </div>
      <div
        className="user-profile-status-container"
        style={{
          bottom: `${(typeof style?.paddingBottom === 'string' ? Number(style.paddingBottom.slice(0, -2)) : Number(style?.paddingBottom || 0)) + 24}px`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <LoadingCell height="72px" width="72px" radius="50%" />
        <LoadingCell height="72px" width="72px" radius="50%" />
      </div>
      <div className="user-profile-content" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <LoadingCell height="100px" width="100px" radius="50%" className="user-profile-avatar-container" />
        <div className="user-profile-details">
          <LoadingCell height="40px" width="320px" className="h-10 w-80 rounded-sm 2xl:h-12 2xl:w-96" />
          <div className="user-profile-stats-container">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <LoadingCell height="26px" width="56px" radius="4px" />
              <p className="profile-stats-label">Following</p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <LoadingCell height="26px" width="56px" radius="4px" />
              <p className="profile-stats-label">Followers</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <LoadingCell height="20px" width="60%" radius="4px" />
            <LoadingCell height="20px" width="40%" radius="4px" />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {new Array(5).fill(0).map((_, index) => (
              <LoadingCell key={index} height="32px" width="32px" radius="50%" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
