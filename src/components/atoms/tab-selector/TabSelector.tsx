import React from 'react'
import clsx from 'clsx'
import { TabSelectorProps } from './TabSelector.types'
import './TabSelector.css'

/**
 * TabSelector component - a segmented control for switching between tabs
 *
 * @param tabs - array of tabs to display, each with a label and value
 *
 * @param selectedTab - the value of the currently selected tab
 *
 * @param setSelectedTab - callback fired with the value of the newly selected tab
 *
 * @param darkMode - render the selector in dark mode (optional)
 *
 * @param className - additional CSS class applied to the container (optional)
 *
 * @param props - native HTML div element props
 *
 * @returns TabSelector component
 */
const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  selectedTab,
  setSelectedTab,
  darkMode,
  className,
  ...props
}) => {
  return (
    <div role="tablist" className={clsx('tab-selector', darkMode && 'dark', className)} {...props}>
      {tabs.map((tab) => {
        const isSelected = tab.value === selectedTab
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={clsx('tab-selector-tab', isSelected && 'selected')}
            onClick={() => setSelectedTab(tab.value)}
            style={{ width: `${100 / tabs.length}%` }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default TabSelector
