import React from 'react'

export type TextareaProps = {
  darkMode?: boolean
  label?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>
