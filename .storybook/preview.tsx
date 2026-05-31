import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { TranslationProvider } from '../src/context/TranslationContext'
import '../src/styles/colors.css'

import enTranslations from '../src/translations/en.json'
import esTranslations from '../src/translations/es.json'
import frTranslations from '../src/translations/fr.json'

const translations = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    github: {
      repository: 'ethereumidentitykit/ethereum-identity-kit',
      branch: 'main',
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          ['Introduction'],
          'Getting Started',
          ['Installation'],
          'Guides',
          ['Thorin Appearance'],
          'Organisms',
          'Molecules',
          'Atoms',
        ],
      },
    },
  },
  globalTypes: {
    language: {
      description: 'Language for component translations',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: '🇺🇸 English' },
          { value: 'es', title: '🇪🇸 Español' },
          { value: 'fr', title: '🇫🇷 Français' },
        ],
        dynamicTitle: true,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const language = context.globals.language || 'en'

      return (
        <TranslationProvider translations={translations} activeLanguage={language} fallbackLanguage="en">
          <Story />
        </TranslationProvider>
      )
    },
  ],
}

export default preview
