import React from 'react'

export type InputProps = {
  darkMode?: boolean
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>
