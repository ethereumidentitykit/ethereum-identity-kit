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

function getChildTypeLabel(type: React.ReactElement['type']): string {
  if (type === React.Fragment) {
    return 'React.Fragment'
  }
  if (typeof type === 'string') {
    return type
  }
  if (typeof type === 'function') {
    const componentType = type as { displayName?: string; name?: string }
    return componentType.displayName || componentType.name || 'Component'
  }
  return String(type)
}

export type AppearanceProviderProps = {
  preset?: AppearancePreset
  registry?: ComponentRegistryOverrides
  className?: string
  /** Merge appearance classes onto a single host DOM child instead of wrapping in a div. */
  asChild?: boolean
  children: React.ReactNode
}

export const AppearanceProvider: React.FC<AppearanceProviderProps> = ({
  preset = 'default',
  registry = {},
  className,
  asChild = false,
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

  let content: React.ReactNode = <div className={mergedClassName}>{children}</div>

  if (asChild && React.isValidElement(children) && React.Children.count(children) === 1) {
    const child = children as React.ReactElement<{ className?: string }>
    const isFragment = child.type === React.Fragment
    const isHostElement = typeof child.type === 'string'

    if (!isFragment && isHostElement) {
      content = React.cloneElement(child, {
        className: clsx(mergedClassName, child.props.className),
      })
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[AppearanceProvider] asChild was set but cannot merge className onto "${getChildTypeLabel(child.type)}". ` +
          `Appearance classes (${mergedClassName}) will be applied via a wrapper <div> instead.`
      )
    }
  }

  return <AppearanceContext.Provider value={value}>{content}</AppearanceContext.Provider>
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
