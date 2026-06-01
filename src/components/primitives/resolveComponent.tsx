import { useAppearanceOptional } from '../../context/AppearanceContext'
import type { ComponentRegistryKey, ComponentRegistryMap } from '../../context/componentRegistry.types'

export function useResolvedComponent<K extends ComponentRegistryKey>(
  key: K,
  fallback: ComponentRegistryMap[K]
): ComponentRegistryMap[K] {
  const { registry } = useAppearanceOptional()
  return (registry[key] as ComponentRegistryMap[K] | undefined) ?? fallback
}
