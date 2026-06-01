import React from 'react'
export type ENSRecordsShellProps = {
  open?: boolean
  onBackdropClick?: () => void
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const ENSRecordsShell: React.FC<ENSRecordsShellProps> = ({
  open = true,
  onBackdropClick,
  className,
  style,
  children,
}) => {
  if (!open) {
    return null
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100dvh',
        padding: '20px',
        paddingBottom: 0,
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        overflow: 'scroll',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        ...style,
      }}
      onClick={onBackdropClick}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

ENSRecordsShell.displayName = 'ENSRecords.Shell'
