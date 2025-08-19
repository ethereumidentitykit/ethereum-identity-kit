import React from 'react'
import { render, screen, fireEvent } from '../../../../__tests__/utils/test-utils'
import ProfileStats from '../ProfileStats'

// Mock the hooks and utilities
jest.mock('../../../../hooks', () => ({
  useProfileStats: jest.fn(() => ({
    followers: 100,
    following: 50,
    statsLoading: false,
  })),
}))

jest.mock('../../../../context/TranslationContext', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => (key === 'following' ? 'Following' : 'Followers'),
  })),
}))

jest.mock('../../../../utils', () => ({
  formatNumber: jest.fn((num) => num?.toString() || '0'),
}))

jest.mock('../../../../utils/profile', () => ({
  defaultOnStatClick: jest.fn(),
}))

const { useProfileStats } = require('../../../../hooks')
const { formatNumber } = require('../../../../utils')
const { defaultOnStatClick } = require('../../../../utils/profile')

describe('ProfileStats', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890'
  const mockName = 'test.eth'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with address', () => {
    render(<ProfileStats addressOrName={mockAddress} />)

    expect(screen.getByText('Following')).toBeInTheDocument()
    expect(screen.getByText('Followers')).toBeInTheDocument()
  })

  it('renders with ENS name', () => {
    render(<ProfileStats addressOrName={mockName} />)

    expect(screen.getByText('Following')).toBeInTheDocument()
    expect(screen.getByText('Followers')).toBeInTheDocument()
  })

  it('displays formatted stat values', () => {
    render(<ProfileStats addressOrName={mockAddress} />)

    expect(screen.getByText('50')).toBeInTheDocument() // following
    expect(screen.getByText('100')).toBeInTheDocument() // followers
    expect(formatNumber).toHaveBeenCalledWith(50)
    expect(formatNumber).toHaveBeenCalledWith(100)
  })

  it('shows loading cells when stats are loading', () => {
    useProfileStats.mockReturnValue({
      followers: 0,
      following: 0,
      statsLoading: true,
    })

    render(<ProfileStats addressOrName={mockAddress} />)

    const loadingCells = document.querySelectorAll('.loading-cell')
    expect(loadingCells).toHaveLength(2)
  })

  it('shows loading cells when prefetched stats are loading', () => {
    render(<ProfileStats addressOrName={mockAddress} isPrefetchedStatsLoading={true} />)

    const loadingCells = document.querySelectorAll('.loading-cell')
    expect(loadingCells).toHaveLength(2)
  })

  it('applies custom gap', () => {
    render(<ProfileStats addressOrName={mockAddress} gap="20px" />)

    const container = document.querySelector('.profile-stats-container')
    expect(container).toHaveStyle({ gap: '20px' })
  })

  it('applies custom container direction', () => {
    render(<ProfileStats addressOrName={mockAddress} containerDirection="column" />)

    const container = document.querySelector('.profile-stats-container')
    expect(container).toHaveStyle({ flexDirection: 'column' })
  })

  it('applies custom stats direction', () => {
    render(<ProfileStats addressOrName={mockAddress} statsDirection="row" />)

    const statItems = document.querySelectorAll('.profile-stats-item')
    statItems.forEach((item) => {
      expect(item).toHaveStyle({ flexDirection: 'row' })
    })
  })

  it('applies font size classes', () => {
    render(<ProfileStats addressOrName={mockAddress} fontSize="lg" />)

    const statItems = document.querySelectorAll('.profile-stats-item')
    statItems.forEach((item) => {
      expect(item).toHaveClass('profile-stats-item-lg')
    })
  })

  it('handles click events with default handler', () => {
    render(<ProfileStats addressOrName={mockAddress} />)

    const followingItem = screen.getByText('Following').closest('.profile-stats-item')
    fireEvent.click(followingItem!)

    expect(defaultOnStatClick).toHaveBeenCalledWith({
      addressOrName: mockAddress,
      stat: 'following',
    })
  })

  it('handles click events with custom handler', () => {
    const customHandler = jest.fn()
    render(<ProfileStats addressOrName={mockAddress} onStatClick={customHandler} />)

    const followersItem = screen.getByText('Followers').closest('.profile-stats-item')
    fireEvent.click(followersItem!)

    expect(customHandler).toHaveBeenCalledWith({
      addressOrName: mockAddress,
      stat: 'followers',
    })
  })

  it('sets enable-hover attribute when onStatClick provided', () => {
    const customHandler = jest.fn()
    render(<ProfileStats addressOrName={mockAddress} onStatClick={customHandler} />)

    const statItems = document.querySelectorAll('.profile-stats-item')
    statItems.forEach((item) => {
      expect(item).toHaveAttribute('enable-hover', 'true')
    })
  })

  it('displays zero when stats are null/undefined', () => {
    useProfileStats.mockReturnValue({
      followers: null,
      following: undefined,
      statsLoading: false,
    })

    render(<ProfileStats addressOrName={mockAddress} />)

    expect(screen.getAllByText('0')).toHaveLength(2)
  })

  it('uses prefetched stats when provided', () => {
    const prefetchedStats = {
      followers_count: 200,
      following_count: 150,
    }

    render(<ProfileStats addressOrName={mockAddress} prefetchedStats={prefetchedStats} />)

    expect(useProfileStats).toHaveBeenCalledWith({
      addressOrName: mockAddress,
      list: undefined,
      prefetchedData: prefetchedStats,
    })
  })

  it('passes list parameter to hook when provided', () => {
    const mockList = { listNumber: 1 }
    render(<ProfileStats addressOrName={mockAddress} list={mockList} />)

    expect(useProfileStats).toHaveBeenCalledWith({
      addressOrName: mockAddress,
      list: mockList,
      prefetchedData: undefined,
    })
  })
})
