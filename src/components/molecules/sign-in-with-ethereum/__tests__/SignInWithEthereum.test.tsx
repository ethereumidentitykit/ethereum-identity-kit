import React from 'react'
import { render, screen, fireEvent } from '../../../../__tests__/utils/test-utils'
import SignInWithEthereum from '../SignInWithEthereum'

// Mock the hooks
jest.mock('../../../../hooks', () => ({
  useSiwe: jest.fn(),
}))

jest.mock('../../../../context/TranslationContext', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => {
      const translations = {
        signInWithEthereum: 'Sign in with Ethereum',
        signingMessage: 'Signing message...',
      }
      return translations[key as keyof typeof translations] || key
    },
  })),
}))

const { useSiwe } = require('../../../../hooks')

describe('SignInWithEthereum', () => {
  const mockVerifySignature = jest.fn()
  const mockGetNonce = jest.fn()
  const mockOnSignInSuccess = jest.fn()
  const mockOnSignInError = jest.fn()
  const mockOnDisconnectedClick = jest.fn()

  const defaultProps = {
    verifySignature: mockVerifySignature,
    getNonce: mockGetNonce,
  }

  beforeEach(() => {
    jest.clearAllMocks()

    useSiwe.mockReturnValue({
      handleSignIn: jest.fn(),
      isSigningMessage: false,
      connectedAddress: '0x1234567890123456789012345678901234567890',
    })
  })

  it('renders sign in button', () => {
    render(<SignInWithEthereum {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(screen.getByText('Sign in with Ethereum')).toBeInTheDocument()
  })

  it('shows Ethereum icon', () => {
    render(<SignInWithEthereum {...defaultProps} />)

    const icon = document.querySelector('.sign-in-with-ethereum-icon')
    expect(icon).toBeInTheDocument()
  })

  it('applies dark mode class when enabled', () => {
    render(<SignInWithEthereum {...defaultProps} darkMode={true} />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('sign-in-with-ethereum-button')
    expect(button).toHaveClass('dark')
  })

  it('shows signing message when signing', () => {
    useSiwe.mockReturnValue({
      handleSignIn: jest.fn(),
      isSigningMessage: true,
      connectedAddress: '0x1234567890123456789012345678901234567890',
    })

    render(<SignInWithEthereum {...defaultProps} />)

    expect(screen.getByText('Signing message...')).toBeInTheDocument()
  })

  it('disables button when signing message', () => {
    useSiwe.mockReturnValue({
      handleSignIn: jest.fn(),
      isSigningMessage: true,
      connectedAddress: '0x1234567890123456789012345678901234567890',
    })

    render(<SignInWithEthereum {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('calls handleSignIn when connected and clicked', () => {
    const mockHandleSignIn = jest.fn()

    useSiwe.mockReturnValue({
      handleSignIn: mockHandleSignIn,
      isSigningMessage: false,
      connectedAddress: '0x1234567890123456789012345678901234567890',
    })

    render(<SignInWithEthereum {...defaultProps} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockHandleSignIn).toHaveBeenCalledTimes(1)
  })

  it('calls onDisconnectedClick when not connected and clicked', () => {
    useSiwe.mockReturnValue({
      handleSignIn: jest.fn(),
      isSigningMessage: false,
      connectedAddress: null,
    })

    render(<SignInWithEthereum {...defaultProps} onDisconnectedClick={mockOnDisconnectedClick} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockOnDisconnectedClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onDisconnectedClick when not provided and not connected', () => {
    useSiwe.mockReturnValue({
      handleSignIn: jest.fn(),
      isSigningMessage: false,
      connectedAddress: null,
    })

    render(<SignInWithEthereum {...defaultProps} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Should not throw error
    expect(button).toBeInTheDocument()
  })

  it('passes correct parameters to useSiwe hook', () => {
    const customMessage = 'Custom sign in message'
    const customExpirationTime = 10 * 60 * 1000 // 10 minutes

    render(
      <SignInWithEthereum
        {...defaultProps}
        message={customMessage}
        onSignInSuccess={mockOnSignInSuccess}
        onSignInError={mockOnSignInError}
        expirationTime={customExpirationTime}
      />
    )

    expect(useSiwe).toHaveBeenCalledWith({
      verifySignature: mockVerifySignature,
      onSignInSuccess: mockOnSignInSuccess,
      onSignInError: mockOnSignInError,
      message: customMessage,
      getNonce: mockGetNonce,
      expirationTime: customExpirationTime,
    })
  })

  it('has correct CSS classes', () => {
    render(<SignInWithEthereum {...defaultProps} />)

    const button = screen.getByRole('button')
    const text = document.querySelector('.sign-in-with-ethereum-text')

    expect(button).toHaveClass('sign-in-with-ethereum-button')
    expect(text).toBeInTheDocument()
  })

  it('applies inline styles', () => {
    render(<SignInWithEthereum {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ marginRight: '10px' })
  })
})
