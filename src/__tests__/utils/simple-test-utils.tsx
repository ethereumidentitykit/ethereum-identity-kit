import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Simple mock translation context without external dependencies
const MockTranslationProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="mock-translation-provider">{children}</div>
}

// Simple custom render function
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <MockTranslationProvider>{children}</MockTranslationProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock utilities
export const mockAddress = '0x1234567890123456789012345678901234567890'
export const mockEnsName = 'test.eth'
export const mockAvatar = 'https://example.com/avatar.png'
