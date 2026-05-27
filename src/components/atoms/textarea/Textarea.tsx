import React, { useId } from 'react'
import clsx from 'clsx'
import { TextareaProps } from './Textarea.types'
import './Textarea.css'

/**
 * Textarea component - a styled multi-line text input
 *
 * @param label - optional label displayed above the textarea (optional)
 *
 * @param darkMode - render the textarea in dark mode (optional)
 *
 * @param className - additional CSS class applied to the textarea element (optional)
 *
 * @param props - native HTML textarea element props
 *
 * @returns Textarea component
 */
const Textarea: React.FC<TextareaProps> = ({ darkMode, label, id, className, ...props }) => {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className={clsx('textarea-container', darkMode && 'dark')}>
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
        </label>
      )}
      <textarea id={textareaId} className={clsx('textarea-field', className)} {...props} />
    </div>
  )
}

export default Textarea
