import React from 'react'

export type Tab = {
  label: string
  value: string
}

export type TabSelectorProps = {
  tabs: Tab[]
  selectedTab: string
  setSelectedTab: (value: string) => void
  darkMode?: boolean
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
