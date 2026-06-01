import React, { useMemo } from 'react'
import { clsx } from 'clsx'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme, darkTheme } from '@ensdomains/thorin'
import { AppearanceProvider } from '../context/AppearanceContext'
import type { ComponentRegistryOverrides } from '../context/componentRegistry.types'
import {
  ThorinAvatar,
  ThorinButton,
  ThorinCard,
  ThorinModal,
  ThorinSkeleton,
  ThorinTag,
  ThorinTypography,
} from './adapters'
import './adapters/overrides.css'

export const createThorinRegistry = (): ComponentRegistryOverrides => ({
  Avatar: ThorinAvatar,
  Button: ThorinButton,
  Skeleton: ThorinSkeleton,
  Tag: ThorinTag,
  Card: ThorinCard,
  Modal: ThorinModal,
  Typography: ThorinTypography,
})

export type EthereumIdentityKitThorinProviderProps = {
  theme?: 'light' | 'dark'
  skipGlobalStyles?: boolean
  className?: string
  children: React.ReactNode
}

export const EthereumIdentityKitThorinProvider: React.FC<EthereumIdentityKitThorinProviderProps> = ({
  theme = 'light',
  skipGlobalStyles = false,
  className,
  children,
}) => {
  const registry = useMemo(() => createThorinRegistry(), [])
  const thorinTheme = theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={thorinTheme}>
      {!skipGlobalStyles && <ThorinGlobalStyles />}
      <AppearanceProvider
        preset="thorin"
        registry={registry}
        className={clsx(className, theme === 'dark' && 'dark')}
      >
        {children}
      </AppearanceProvider>
    </ThemeProvider>
  )
}
