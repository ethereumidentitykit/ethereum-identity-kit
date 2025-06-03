import React, { createContext, useContext, ReactNode, useMemo } from 'react'
import {
  TranslationFunction,
  TranslationKey,
  TranslationConfig,
  TranslationsMap,
  LanguageCode,
  defaultTranslations,
} from '../types/translations'

interface TranslationContextType {
  t: TranslationFunction
  activeLanguage: LanguageCode
  availableLanguages: LanguageCode[]
  setLanguage: (language: LanguageCode) => void
}

const TranslationContext = createContext<TranslationContextType | null>(null)

interface TranslationProviderProps extends TranslationConfig {
  children: ReactNode
}

const defaultTranslateFn: TranslationFunction = (key: TranslationKey, fallback?: string) => {
  return defaultTranslations[key] || fallback || key
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  translateFn,
  translations,
  translationsFromJSON,
  activeLanguage = 'en',
  fallbackLanguage = 'en',
}) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(activeLanguage)

  // Merge all translations sources
  const allTranslations = useMemo<TranslationsMap>(() => {
    const merged: TranslationsMap = {}

    // Add default English translations
    merged.en = defaultTranslations

    // Merge provided translations
    if (translations) {
      Object.keys(translations).forEach((lang) => {
        merged[lang] = { ...merged[lang], ...translations[lang] }
      })
    }

    // Merge JSON translations
    if (translationsFromJSON) {
      Object.keys(translationsFromJSON).forEach((lang) => {
        merged[lang] = { ...merged[lang], ...translationsFromJSON[lang] }
      })
    }

    return merged
  }, [translations, translationsFromJSON])

  // Get available languages
  const availableLanguages = useMemo(() => {
    return Object.keys(allTranslations)
  }, [allTranslations])

  // Create translation function
  const t = useMemo<TranslationFunction>(() => {
    // If custom translateFn is provided, use it (backward compatibility)
    if (translateFn) {
      return translateFn
    }

    return (key: TranslationKey, fallback?: string) => {
      // Try current language first
      const currentLangTranslation = allTranslations[currentLanguage]?.[key]
      if (currentLangTranslation) {
        return currentLangTranslation
      }

      // Try fallback language
      if (currentLanguage !== fallbackLanguage) {
        const fallbackTranslation = allTranslations[fallbackLanguage]?.[key]
        if (fallbackTranslation) {
          return fallbackTranslation
        }
      }

      // Use provided fallback or default translation or key itself
      return fallback || defaultTranslations[key] || key
    }
  }, [translateFn, allTranslations, currentLanguage, fallbackLanguage])

  const setLanguage = (language: LanguageCode) => {
    if (availableLanguages.includes(language)) {
      setCurrentLanguage(language)
    } else {
      console.warn(`Language '${language}' is not available. Available languages: ${availableLanguages.join(', ')}`)
    }
  }

  // Update current language when activeLanguage prop changes
  React.useEffect(() => {
    setCurrentLanguage(activeLanguage)
  }, [activeLanguage])

  return (
    <TranslationContext.Provider
      value={{
        t,
        activeLanguage: currentLanguage,
        availableLanguages,
        setLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext)

  if (!context) {
    // Provide default translation function if no provider exists
    return {
      t: defaultTranslateFn,
      activeLanguage: 'en',
      availableLanguages: ['en'],
      setLanguage: () => {},
    }
  }

  return context
}
