import React from 'react'
import type { Preview } from '@storybook/react'
import { TranslationProvider } from '../src/context/TranslationContext'
import '../src/styles/colors.css'

import enTranslations from '../public/translations/en.json'
import esTranslations from '../public/translations/es.json'
import frTranslations from '../public/translations/fr.json'

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
