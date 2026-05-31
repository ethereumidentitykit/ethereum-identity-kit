import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useResolvedComponent } from '../components/primitives/resolveComponent'
import { DefaultButton } from '../components/primitives/default'
import { AppearanceProvider } from '../context/AppearanceContext'
import type { EIKButtonProps } from '../context/componentRegistry.types'

const ProbeButton: React.FC<EIKButtonProps> = (props) => {
  const Button = useResolvedComponent('Button', DefaultButton)
  return <Button {...props} />
}

describe('Appearance registry', () => {
  it('uses default button implementation without appearance provider', () => {
    render(<ProbeButton data-testid="probe-button">Follow</ProbeButton>)
    expect(screen.getByTestId('probe-button').tagName).toBe('BUTTON')
  })

  it('swaps button implementation when registry override is provided', () => {
    const CustomButton = ({ children }: EIKButtonProps) => (
      <div data-testid="custom-button">{children}</div>
    )

    render(
      <AppearanceProvider preset="thorin" registry={{ Button: CustomButton }}>
        <ProbeButton>Follow</ProbeButton>
      </AppearanceProvider>
    )

    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
