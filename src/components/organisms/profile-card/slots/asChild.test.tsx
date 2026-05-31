import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProfileCardName } from './Name'
import { ProfileCardAvatar } from './Avatar'

const onProfileClick = jest.fn()

jest.mock('../ProfileCardContext', () => ({
  useProfileCardContext: jest.fn(),
}))

jest.mock('../../../../utils', () => ({
  beautifyEnsName: jest.fn((name: string) => name),
  truncateAddress: jest.fn((address: string) => address),
}))

jest.mock('../../../../constants', () => ({
  DEFAULT_FALLBACK_AVATAR: 'fallback.png',
}))

jest.mock('../../../atoms/loading-cell/LoadingCell', () => ({
  __esModule: true,
  default: function MockLoadingCell() {
    return <div data-testid="loading-cell" />
  },
}))

jest.mock('../../../molecules/follower-tag/FollowerTag', () => ({
  __esModule: true,
  default: function MockFollowerTag() {
    return null
  },
}))

jest.mock('../../../molecules/avatar/Avatar', () => ({
  __esModule: true,
  default: function MockAvatar(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div data-testid="avatar" {...props} />
  },
}))

jest.mock('../../../primitives/resolveComponent', () => ({
  useResolvedComponent: (_key: string, fallback: React.ComponentType) => fallback,
}))

jest.mock('../../../primitives/default', () => ({
  DefaultTypography: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { as?: string }) => (
    <p {...props}>{children}</p>
  ),
}))

import { useProfileCardContext } from '../ProfileCardContext'

const baseContext = {
  ens: { name: 'vitalik.eth', avatar: 'avatar.png' },
  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  addressOrName: 'vitalik.eth',
  isDetailsLoading: false,
  showFollowerTag: false,
  connectedAddress: undefined,
  list: undefined,
  onProfileClick,
}

describe('ProfileCard asChild slot fallbacks', () => {
  beforeEach(() => {
    onProfileClick.mockClear()
    ;(useProfileCardContext as jest.Mock).mockReturnValue(baseContext)
  })

  it('fires onProfileClick once when Name uses asChild without a custom element', () => {
    render(<ProfileCardName asChild />)

    const name = screen.getByText('vitalik.eth')
    expect(name).toHaveClass('profile-name')
    expect(name.className).toBe('profile-name')

    fireEvent.click(name)
    expect(onProfileClick).toHaveBeenCalledTimes(1)
    expect(onProfileClick).toHaveBeenCalledWith('vitalik.eth')
  })

  it('fires onProfileClick once when Avatar uses asChild without a custom element', () => {
    render(<ProfileCardAvatar asChild />)

    const avatar = screen.getByTestId('avatar')
    fireEvent.click(avatar)
    expect(onProfileClick).toHaveBeenCalledTimes(1)
    expect(onProfileClick).toHaveBeenCalledWith('vitalik.eth')
  })
})
