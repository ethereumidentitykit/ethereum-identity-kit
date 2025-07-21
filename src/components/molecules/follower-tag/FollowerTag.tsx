import clsx from 'clsx'
import { useFollowerState } from '../../../hooks'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import type { FollowerTagProps } from './FollowerTag.types'
import './FollowerTag.css'

/**
 * Follower State Tag - displays the relation of address to connectedAddress/list
 *
 * @param address - the address of the follower
 *
 * @param connectedAddress - the address of the currently connected user
 *
 * @param list - the list of the user (selected list in EFP app)
 *
 * @param className - the class name to apply to the follower tag
 *
 * @param showLoading - whether to show the loading cell
 *
 * @param props - HTML div element props
 *
 * @returns FollowerTag component
 */
const FollowerTag: React.FC<FollowerTagProps> = ({
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

export default FollowerTag
