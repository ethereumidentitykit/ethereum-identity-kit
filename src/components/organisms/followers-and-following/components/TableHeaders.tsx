import clsx from 'clsx'
import { Dispatch, LegacyRef, SetStateAction, useState } from 'react'
import { useOutsideClick } from '../../../../hooks'
import { useTranslation } from '../../../../context'
import { formatNumber } from '../../../../utils'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import { Check, Cross, MagnifyingGlass, ShortArrow, Tag } from '../../../icons'
import { QUERY_BLOCK_TAGS, SORT_OPTIONS } from '../../../../constants'
import { FollowSortType, ProfileTabType, TagCountType } from '../../../../types'
import './TableHeaders.css'

interface TableHeaderProps {
  title: ProfileTabType
  search: string
  showTags: boolean
  setShowTags: (input: boolean) => void
  setSearch: (input: string) => void
  allTags?: TagCountType[]
  tagsLoading?: boolean
  selectedTags?: string[]
  sort: FollowSortType
  setSort: (option: FollowSortType) => void
  toggleSelectedTags: (title: ProfileTabType, tag: string) => void
  showBlocked?: boolean
  showOnlyBlocked?: boolean
  setActiveTab?: Dispatch<SetStateAction<ProfileTabType>>
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  showTags,
  setShowTags,
  search,
  setSearch,
  allTags,
  tagsLoading,
  selectedTags,
  toggleSelectedTags,
  sort,
  setSort,
  showBlocked,
  showOnlyBlocked,
  setActiveTab,
}) => {
  const { t } = useTranslation()
  const [showSort, setShowSort] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const clickAwaySortRef = useOutsideClick(() => {
    setShowSort(false)
  })
  const clickAwaySearchRef = useOutsideClick(() => {
    setShowSearch(false)
  })

  const displayedTags = showOnlyBlocked
    ? QUERY_BLOCK_TAGS.map((tag) => ({ tag, count: allTags?.find((t) => t.tag === tag)?.count || 0 }))
    : showBlocked
      ? allTags
      : allTags?.filter((tag) => !QUERY_BLOCK_TAGS.includes(tag.tag))
  const tagsEmpty = !tagsLoading && (!displayedTags || displayedTags.length === 0)

  return (
    <div className="table-header">
      <div className="header-content">
        <div className="header-main">
          <div className="tab-switcher">
            <div className={clsx('tab-indicator', title === 'following' ? 'following' : 'followers', showOnlyBlocked && 'tab-indicator-wide')} />
            <p
              className={clsx('tab-button', title === 'following' ? '' : 'inactive', showOnlyBlocked && 'tab-button-wide')}
              onClick={() => setActiveTab?.('following')}
            >
              {t(showOnlyBlocked ? 'blocking.title' : 'following.title')}
            </p>
            <p
              className={clsx('tab-button', title === 'followers' ? '' : 'inactive', showOnlyBlocked && 'tab-button-wide')}
              onClick={() => setActiveTab?.('followers')}
            >
              {t(showOnlyBlocked ? 'blocked.title' : 'followers.title')}
            </p>
          </div>
          <div className="actions-container">
            <div ref={clickAwaySearchRef as LegacyRef<HTMLDivElement>} className="search-container">
              <div className="search-trigger" onClick={() => setShowSearch(!showSearch)}>
                <MagnifyingGlass className="search-icon" />
                {search && !showSearch && <p className="search-text">{search}</p>}
                {search && !showSearch && (
                  <Cross
                    onClick={(e: React.MouseEvent<SVGElement>) => {
                      e.stopPropagation()
                      setSearch('')
                      setShowSearch(false)
                    }}
                    className="search-clear"
                  />
                )}
              </div>
              {showSearch && (
                <input
                  type="text"
                  spellCheck={false}
                  autoFocus={true}
                  autoComplete="off"
                  placeholder={t('search placeholder')}
                  onChange={(e) => {
                    setSearch(e.target.value.toLowerCase().trim())
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                      e.preventDefault()
                      setShowSearch(false)
                    }
                  }}
                  value={search}
                  className="search-input"
                />
              )}
            </div>
            <div className="actions-right">
              <div onClick={() => setShowTags(!showTags)} className="tag-toggle">
                <Tag className="tag-icon" />
                <ShortArrow className={clsx('arrow-icon', showTags ? 'rotated' : '')} />
              </div>
              <div
                ref={clickAwaySortRef as LegacyRef<HTMLDivElement>}
                onClick={() => setShowSort(!showSort)}
                className="sort-container"
              >
                <div className="sort-trigger">
                  <p className="sort-text">{t(sort)}</p>
                  <ShortArrow className={clsx('arrow-icon', showSort ? 'rotated' : '')} />
                </div>
                {showSort && (
                  <div className="sort-dropdown">
                    {SORT_OPTIONS.map((option) => (
                      <div className="sort-option" key={option} onClick={() => setSort(option)}>
                        {sort === option && <Check className="check-icon" />}
                        <p>{t(option)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTags && (
        <>
          {tagsEmpty && <p className="no-tags">{t('no tags')}</p>}
          <div className="tags-container">
            {tagsLoading
              ? new Array(4).fill(1).map((_, i) => <LoadingCell key={i} className="h-7 w-20 rounded-sm md:h-9" />)
              : displayedTags?.map((tag, i) => (
                <button
                  key={tag.tag + i}
                  className={clsx('tag-button', selectedTags?.includes(tag.tag) ? 'selected' : '')}
                  name={tag.tag.toLowerCase()}
                  onClick={() => toggleSelectedTags(title, tag.tag)}
                >
                  <p className="tag-name">{tag.tag}</p>
                  <p className="tag-count">{formatNumber(tag.count)}</p>
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TableHeader
