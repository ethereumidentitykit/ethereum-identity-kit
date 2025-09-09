import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useTransactions } from '../../../../../context'
import { useFollowButton } from '../../../../../hooks'
import { useOutsideClick } from '../../../../../hooks/common/useOutsideClick'
import { listOpAddTag, listOpRemoveTag } from '../../../../../utils/list-ops'
import {
  extractAddressAndTag,
  getListOpsFromTransaction,
  getPendingTxAddressesAndTags,
} from '../../../../../utils/transactions'
import Plus from '../../../../icons/ui/Plus'
import { DEFAULT_RECENT_TAGS, EFPActionIds } from '../../../../../constants'
import { Address } from '../../../../../types'
import './Tags.css'

interface TagsProps {
  address: Address
  existingTags?: string[]
  canEditTags?: boolean
}

const Tags: React.FC<TagsProps> = ({ address, existingTags, canEditTags }) => {
  const { addListOpsTransaction, removeListOpsTransaction, pendingTxs, selectedList } = useTransactions()

  const { address: connectedAddress } = useAccount()
  const { buttonState } = useFollowButton({ lookupAddress: address, connectedAddress, selectedList })

  const [tags, setTags] = useState<string[]>(existingTags || [])
  const [tagDropdownInput, setTagDropdownInput] = useState('')
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [recentTags, setRecentTags] = useState<string[]>(DEFAULT_RECENT_TAGS)

  const outsideClickRef = useOutsideClick(() => setTagDropdownOpen(false))

  useEffect(() => {
    const tagsFromCart = canEditTags ? getPendingTxAddressesAndTags(pendingTxs).filter((tag) => tag.tag !== '') : []
    setRecentTags([
      ...tagsFromCart
        .filter((tag) => !DEFAULT_RECENT_TAGS.includes(tag.tag))
        .slice(0, 5)
        .map((tag) => tag.tag),
      ...recentTags.slice(tagsFromCart.filter((tag) => !DEFAULT_RECENT_TAGS.includes(tag.tag)).length),
    ])

    const filteredTagsFromCart = tagsFromCart
      .filter((tag) => tag.address === address && !tags.includes(tag.tag))
      .map((tag) => tag.tag)
    setTags([...tags, ...filteredTagsFromCart])
  }, [pendingTxs, address])

  const handleAddTag = (tag: string) => {
    if (tags.includes(tag) || !connectedAddress || !canEditTags) return

    const listOp = listOpAddTag(address, tag)
    addListOpsTransaction([listOp])
  }

  const handleRemoveTag = (tag: string) => {
    if (!tags.includes(tag) || !connectedAddress || !canEditTags) return

    const listOp = listOpRemoveTag(address, tag)
    const isInCart = getPendingTxAddressesAndTags(pendingTxs).some((t) => t.address === address && t.tag === tag)
    if (isInCart) {
      removeListOpsTransaction([listOp.data])
      if (!existingTags?.includes(tag)) setTags(tags.filter((t) => t !== tag))
    } else if (existingTags?.includes(tag)) {
      addListOpsTransaction([listOp])
    }
  }

  if ((buttonState === 'Pending Block' || buttonState === 'Pending Mute' || buttonState === 'Unfollow') && canEditTags) return null

  return (
    <div className="cart-tags-container" ref={outsideClickRef as React.RefObject<HTMLDivElement>}>
      {canEditTags && (
        <button className="cart-tags-button" onClick={() => setTagDropdownOpen(!tagDropdownOpen)}>
          <Plus height={14} width={14} />
        </button>
      )}
      {tags.map((tag) => {
        const isInCart = canEditTags && getPendingTxAddressesAndTags(pendingTxs).some((t) => t.address === address && t.tag === tag)
        const isBeingRemoved = canEditTags && pendingTxs
          .filter((tx) => tx.id === EFPActionIds.UpdateEFPList)
          .flatMap((tx) => getListOpsFromTransaction(tx))
          .some((op) => {
            const { address: opAddress, tag: opTag } = extractAddressAndTag(op.data)
            return opAddress === address && opTag === tag && op.opcode === 4
          })

        return (
          <button
            className={clsx(
              'cart-tags-tag',
              isInCart && 'cart-tags-tag-in-cart',
              isBeingRemoved && 'cart-tags-tag-being-removed'
            )}
            key={tag}
            onClick={() => {
              handleRemoveTag(tag)
            }}
          >
            {tag}
          </button>
        )
      })}
      {canEditTags && tagDropdownOpen && (
        <div className="cart-tags-dropdown">
          <div className="cart-tags-dropdown-input-container">
            <input
              value={tagDropdownInput}
              placeholder="custom tag"
              onChange={(e) => setTagDropdownInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTag(tagDropdownInput)
                  setTagDropdownInput('')
                  setTagDropdownOpen(false)
                }
              }}
            />
            <button className="cart-tags-input-button" onClick={() => handleAddTag(tagDropdownInput)}>
              <Plus height={20} width={20} />
            </button>
          </div>
          <div className="cart-tags-dropdown-tags-container">
            {recentTags.map((tag) => (
              <button key={tag} onClick={() => handleAddTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tags
