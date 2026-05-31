import React, { createContext, useContext, useMemo } from 'react'
import { clsx } from 'clsx'
import type { AppearancePreset, ComponentRegistryOverrides } from './componentRegistry.types'

export type AppearanceContextValue = {
  preset: AppearancePreset
  appearanceClassName: string
  registry: ComponentRegistryOverrides
}

const defaultAppearanceValue: AppearanceContextValue = {
  preset: 'default',
  appearanceClassName: 'eik-appearance-default',
  registry: {},
}

const AppearanceContext = createContext<AppearanceContextValue>(defaultAppearanceValue)

export type AppearanceProviderProps = {
  preset?: AppearancePreset
  registry?: ComponentRegistryOverrides
  className?: string
  children: React.ReactNode
}

export const AppearanceProvider: React.FC<AppearanceProviderProps> = ({
  preset = 'default',
  registry = {},
  className,
  children,
}) => {
  const value = useMemo<AppearanceContextValue>(
    () => ({
      preset,
      appearanceClassName: preset === 'thorin' ? 'eik-appearance-thorin' : 'eik-appearance-default',
      registry,
    }),
    [preset, registry]
  )

  return (
    <AppearanceContext.Provider value={value}>
      <div className={clsx(value.appearanceClassName, className)}>{children}</div>
    </AppearanceContext.Provider>
  )
}

export const useAppearance = () => useContext(AppearanceContext)

export const useAppearanceOptional = () => useContext(AppearanceContext)
