import clsx from 'clsx'
import { useFollowerState } from '../../../hooks'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import { useResolvedComponent } from '../../primitives/resolveComponent'
import type { FollowerTagProps } from './FollowerTag.types'
import './FollowerTag.css'

export const FollowerTagBase: React.FC<FollowerTagProps> = ({
  lookupAddressOrName,
  connectedAddress,
  list,
  showLoading,
  className,
  ...props
}) => {
  const { followerTag, isFollowerStateLoading } = useFollowerState({
    lookupAddressOrName,
    connectedAddress,
    list,
  })

  return isFollowerStateLoading ? (
    showLoading ? (
      <LoadingCell height="22px" width="70px" radius="4px" />
    ) : null
  ) : (
    <div {...props} className={clsx('follower-tag', followerTag.className, className)}>
      {followerTag.text}
    </div>
  )
}

const FollowerTag: React.FC<FollowerTagProps> = (props) => {
  const ResolvedTag = useResolvedComponent('Tag', FollowerTagBase)
  return <ResolvedTag {...props} />
}

export default FollowerTag
