import React, { useId } from 'react'
import clsx from 'clsx'
import { InputProps } from './Input.types'
import './Input.css'

/**
 * Input component - a styled single-line text input
 *
 * @param label - optional label displayed above the input (optional)
 *
 * @param darkMode - render the input in dark mode (optional)
 *
 * @param className - additional CSS class applied to the input element (optional)
 *
 * @param props - native HTML input element props
 *
 * @returns Input component
 */
const Input: React.FC<InputProps> = ({ darkMode, label, id, className, ...props }) => {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={clsx('input-container', darkMode && 'dark')}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input id={inputId} className={clsx('input-field', className)} {...props} />
    </div>
  )
}

export default Input
