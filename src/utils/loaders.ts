import { LanguageCode, TranslationsMap } from '../types'

export const loadTranslationsFromJSON = async (filePaths: Record<LanguageCode, string>): Promise<TranslationsMap> => {
  const translations: TranslationsMap = {}

  for (const [language, filePath] of Object.entries(filePaths)) {
    try {
      const response = await fetch(filePath)
      if (response.ok) {
        const data = await response.json()
        translations[language] = data
      } else {
        console.warn(`Failed to load translation file for ${language}: ${filePath}`)
      }
    } catch (error) {
      console.warn(`Error loading translation file for ${language}: ${filePath}`, error)
    }
  }

  return translations
}
