import clsx from 'clsx'
import { useFollowerState } from '../../hooks/useFollowerState'
import type { FollowerTagProps } from './FollowerTag.types'
import './FollowerTag.css'

/**
 * Follower State Tag - displays the relation of address to connectedAddress/list
 * @param address - the address of the follower
 * @param connectedAddress - the address of the currently connected user
 * @param list - the list of the user (selected list in EFP app)
 * @param className - the class name to apply to the follower tag
 * @returns FollowerTag component
 */
const FollowerTag: React.FC<FollowerTagProps> = ({
  addressOrName,
  connectedAddress,
  list,
  className,
  ...props
}) => {
  const { followerTag, isFollowerStateLoading } = useFollowerState({
    addressOrName,
    connectedAddress,
    list
  })

  return isFollowerStateLoading ?
    null
    // <LoadingCell height='22px' width='70px' radius='10px' />
    : (
      <div {...props} className={clsx('follower-tag', followerTag.className, className)}>
        {followerTag.text}
      </div>
    )
}

export default FollowerTag