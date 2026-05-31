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

const AppearanceContext = createContext<AppearanceContextValue | undefined>(undefined)

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

  const mergedClassName = clsx(value.appearanceClassName, className)

  if (React.isValidElement(children) && React.Children.count(children) === 1) {
    const child = children as React.ReactElement<{ className?: string }>

    return (
      <AppearanceContext.Provider value={value}>
        {React.cloneElement(child, {
          className: clsx(mergedClassName, child.props.className),
        })}
      </AppearanceContext.Provider>
    )
  }

  return (
    <AppearanceContext.Provider value={value}>
      <div className={mergedClassName}>{children}</div>
    </AppearanceContext.Provider>
  )
}

/** Requires an {@link AppearanceProvider} ancestor; throws if used outside one. */
export const useAppearance = () => {
  const context = useContext(AppearanceContext)
  if (!context) {
    throw new Error('useAppearance must be used within an AppearanceProvider')
  }
  return context
}

/** Safe to call outside an {@link AppearanceProvider}; returns default appearance values. */
export const useAppearanceOptional = () => useContext(AppearanceContext) ?? defaultAppearanceValue
