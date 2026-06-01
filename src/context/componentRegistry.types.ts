import React from 'react'
import type { AvatarProps } from '../components/molecules/avatar/Avatar.types'
import type { LoadingCellProps } from '../components/atoms/loading-cell/LoadingCell.types'
import type { FollowerTagProps } from '../components/molecules/follower-tag/FollowerTag.types'

export type AppearancePreset = 'default' | 'thorin'

export type ComponentRegistryKey = 'Avatar' | 'Button' | 'Skeleton' | 'Tag' | 'Card' | 'Modal' | 'Typography'

export type EIKButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type EIKCardProps = React.HTMLAttributes<HTMLDivElement>

export type EIKModalProps = {
  overlayClassName?: string
  containerClassName?: string
  onOverlayClick?: () => void
  overlayStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
  overlayChildren?: React.ReactNode
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export type EIKTypographyProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'div'
}

export type ComponentRegistryMap = {
  Avatar: React.ComponentType<AvatarProps>
  Button: React.ComponentType<EIKButtonProps>
  Skeleton: React.ComponentType<LoadingCellProps>
  Tag: React.ComponentType<FollowerTagProps>
  Card: React.ComponentType<EIKCardProps>
  Modal: React.ComponentType<EIKModalProps>
  Typography: React.ComponentType<EIKTypographyProps>
}

export type ComponentRegistryOverrides = Partial<ComponentRegistryMap>
