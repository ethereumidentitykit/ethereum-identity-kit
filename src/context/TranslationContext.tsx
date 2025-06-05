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

/**
 * TranslationProvider component
 *
 * @param children - The child components to render
 * @param translateFn - Custom translarion function if you want to use your own (optional)
 * @param translations - The translations to use - in object format
 * @param activeLanguage - The active language to use
 * @param fallbackLanguage - The fallback language to use
 *
 * @returns The TranslationProvider component
 */
export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  translateFn,
  translations,
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

    return merged
  }, [translations])

  const availableLanguages = useMemo(() => {
    return Object.keys(allTranslations)
  }, [allTranslations])

  const t = useMemo<TranslationFunction>(() => {
    // If custom translateFn is provided, use it (backward compatibility)
    if (translateFn) {
      return translateFn
    }

    return (key: TranslationKey, fallback?: string) => {
      const currentLangTranslation = allTranslations[currentLanguage]?.[key]
      if (currentLangTranslation) {
        return currentLangTranslation
      }

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
    // Provide default (english) translation function if there is no provider
    return {
      t: defaultTranslateFn,
      activeLanguage: 'en',
      availableLanguages: ['en'],
      setLanguage: () => {},
    }
  }

  return context
}
