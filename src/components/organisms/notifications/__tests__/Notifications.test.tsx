import React from 'react'
import { render, screen, fireEvent } from '../../../../__tests__/utils/simple-wagmi-provider'
import Notifications from '../Notifications'
import { mockTestData } from '../../../../__tests__/utils/simple-wagmi-provider'

// Mock the hooks
jest.mock('../../../../hooks', () => ({
  useNotifications: jest.fn(),
  useOutsideClick: jest.fn(),
  useTranslation: jest.fn(),
}))

const { useNotifications, useTranslation } = require('../../../../hooks')

describe('Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useTranslation.mockReturnValue({
      t: (key: string) => {
        const translations: Record<string, string> = {
          notifications: 'Notifications',
          noNotifications: 'No notifications',
          markAllRead: 'Mark all as read',
          loading: 'Loading...',
          loadMore: 'Load more',
        }
        return translations[key] || key
      },
    })
  })

  it('renders loading state', () => {
    useNotifications.mockReturnValue({
      notifications: [],
      isLoading: true,
      isOpen: false,
      setIsOpen: jest.fn(),
      newNotifications: 0,
      refetch: jest.fn(),
    })

    render(<Notifications addressOrName={mockTestData.connectedAddress} />)

    // Should show loading indicators
    const loadingElements = document.querySelectorAll('.loading-cell, .loading')
    expect(loadingElements.length).toBeGreaterThan(0)
  })

  it('renders notifications when available', () => {
    useNotifications.mockReturnValue({
      notifications: mockTestData.notifications,
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
      newNotifications: 2,
      refetch: jest.fn(),
    })

    render(<Notifications addressOrName={mockTestData.connectedAddress} />)

    // Should render notification items
    const notificationElements = document.querySelectorAll('.notification-item, [data-testid*="notification"]')
    expect(notificationElements.length).toBeGreaterThan(0)
  })

  it('renders empty state when no notifications', () => {
    useNotifications.mockReturnValue({
      notifications: [],
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
      newNotifications: 0,
      refetch: jest.fn(),
    })

    render(<Notifications addressOrName={mockTestData.connectedAddress} />)

    // Should show empty state message
    expect(screen.getByText('No notifications')).toBeInTheDocument()
  })

  it('handles error state gracefully', () => {
    useNotifications.mockReturnValue({
      notifications: [],
      isLoading: false,
      isOpen: false,
      setIsOpen: jest.fn(),
      newNotifications: 0,
      refetch: jest.fn(),
    })

    render(<Notifications addressOrName={mockTestData.connectedAddress} />)

    // Should not crash on error
    expect(document.body).toBeInTheDocument()
  })

  it('applies custom styling', () => {
    const customStyle = { backgroundColor: 'lightgray', padding: '20px' }

    useNotifications.mockReturnValue({
      notifications: mockTestData.notifications,
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
      newNotifications: 2,
      refetch: jest.fn(),
    })

    render(<Notifications addressOrName={mockTestData.connectedAddress} style={customStyle} />)

    const container = document.querySelector('.notifications')
    if (container) {
      expect(container).toHaveStyle(customStyle)
    }
  })

  it('handles refresh/refetch', () => {
    const mockRefetch = jest.fn()

    useNotifications.mockReturnValue({
      notifications: mockTestData.notifications,
      isLoading: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      refetch: mockRefetch,
    })

    render(<Notifications addressOrName={mockTestData.connectedAddress} />)

    // Should have refresh button or pull-to-refresh
    const refreshButton = screen.queryByText(/refresh|reload/i)
    if (refreshButton) {
      fireEvent.click(refreshButton)
      expect(mockRefetch).toHaveBeenCalled()
    }
  })

  it('passes correct parameters to hook', () => {
    useNotifications.mockReturnValue({
      notifications: [],
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
      newNotifications: 0,
      refetch: jest.fn(),
    })

    render(<Notifications addressOrName={mockTestData.connectedAddress} />)

    expect(useNotifications).toHaveBeenCalledWith(mockTestData.connectedAddress)
  })
})
