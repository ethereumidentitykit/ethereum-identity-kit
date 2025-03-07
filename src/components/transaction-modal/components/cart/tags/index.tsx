import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useTransactions } from '../../../../../context'
import { useFollowButton } from '../../../../../hooks'
import { useOutsideClick } from '../../../../../hooks/useOutsideClick'
import { listOpAddTag, listOpRemoveTag } from '../../../../../utils/list-ops'
import {
  extractAddressAndTag,
  formatListOpsTransaction,
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
  const { addListOpsTransaction, removeListOpsTransaction, pendingTxs, selectedList, nonce, selectedChainId } =
    useTransactions()

  const { address: connectedAddress } = useAccount()
  const { buttonState } = useFollowButton({ lookupAddress: address, connectedAddress, selectedList })

  const [tags, setTags] = useState<string[]>(existingTags ? [...existingTags] : [])
  const [tagDropdownInput, setTagDropdownInput] = useState('')
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [recentTags, setRecentTags] = useState<string[]>(DEFAULT_RECENT_TAGS)

  const outsideClickRef = useOutsideClick(() => setTagDropdownOpen(false))

  useEffect(() => {
    const tagsFromCart = getPendingTxAddressesAndTags(pendingTxs).filter((tag) => tag.tag !== '')
    setRecentTags([
      ...tagsFromCart
        .filter((tag) => !DEFAULT_RECENT_TAGS.includes(tag.tag))
        .slice(0, 5)
        .map((tag) => tag.tag),
      ...recentTags.slice(tagsFromCart.filter((tag) => !DEFAULT_RECENT_TAGS.includes(tag.tag)).length),
    ])
    const filteredTagsFromCart = tagsFromCart.filter((tag) => tag.address === address)
    setTags(filteredTagsFromCart.map((tag) => tag.tag))
  }, [pendingTxs, address])

  const handleAddTag = (tag: string) => {
    if (tags.includes(tag) || !connectedAddress || !canEditTags) return

    const listOp = listOpAddTag(address, tag)
    const tx = formatListOpsTransaction({
      nonce,
      chainId: selectedChainId,
      connectedAddress,
      listOps: [listOp],
    })

    addListOpsTransaction(tx)
  }

  const handleRemoveTag = (tag: string) => {
    if (!tags.includes(tag) || !connectedAddress || !canEditTags) return

    const listOp = listOpRemoveTag(address, tag)
    if (existingTags?.includes(tag)) {
      addListOpsTransaction(
        formatListOpsTransaction({
          nonce,
          chainId: selectedChainId,
          connectedAddress,
          listOps: [listOp],
        })
      )
    } else {
      removeListOpsTransaction([listOp.data])
    }
  }

  if (buttonState === 'Pending Block' || buttonState === 'Pending Mute' || buttonState === 'Unfollow') return null

  return (
    <div className="cart-tags-container" ref={outsideClickRef as React.RefObject<HTMLDivElement>}>
      {canEditTags && (
        <button className="cart-tags-button" onClick={() => setTagDropdownOpen(!tagDropdownOpen)}>
          <Plus height={13} width={13} />
        </button>
      )}
      {tags.map((tag) => {
        const isBeingRemoved = pendingTxs
          .filter((tx) => tx.id === EFPActionIds.UpdateEFPList)
          .flatMap((tx) => getListOpsFromTransaction(tx))
          .some((op) => extractAddressAndTag(op.data).tag === tag && op.opcode === 3)

        return (
          <button
            className={clsx('cart-tags-tag', isBeingRemoved && 'cart-tags-tag-being-removed')}
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
              placeholder="Add tag"
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
              <Plus height={12} width={12} />
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
