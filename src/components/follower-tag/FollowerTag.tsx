import clsx from 'clsx'
import { useFollowerState } from '../../hooks/useFollowerState'
import './FollowerTag.css'
import type { FollowerTagProps } from './FollowerTag.types'

/**
 * Follower State Tag - displays the relation of address to connectedAddress/list
 * @param address - the address of the follower
 * @param connectedAddress - the address of the currently connected user
 * @param list - the list of the user (selected list in EFP app)
 * @param className - the class name to apply to the follower tag
 * @returns FollowerTag component
 */
const FollowerTag: React.FC<FollowerTagProps> = ({
  address,
  connectedAddress,
  list,
  className,
  ...props
}) => {
  const { followerTag, isFollowerStateLoading } = useFollowerState({
    address,
    connectedAddress,
    list
  })

  return isFollowerStateLoading ?
    null
    // <LoadingCell height='22px' width='60px' radius='10px' />
    : (
      <div {...props} className={clsx('follower-tag', followerTag.className, className)}>
        {followerTag.text}
      </div>
    )
}

export default FollowerTag
