/**
 * Regenerates src/styles/themes/thorin.css from @ensdomains/thorin theme tokens.
 * Run: npx ts-node scripts/generate-thorin-tokens.ts
 * Requires @ensdomains/thorin as a devDependency.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

try {
  const { lightTheme, darkTheme } = require('@ensdomains/thorin')

  const pick = (theme: Record<string, unknown>, key: string, fallback: string) => {
    const value = theme[key]
    return typeof value === 'string' ? value : fallback
  }

  const css = `/* Auto-generated from @ensdomains/thorin — run scripts/generate-thorin-tokens.ts */

.eik-appearance-thorin {
  --ethereum-identity-kit-text-primary: ${pick(lightTheme.colors, 'textPrimary', '#041133')};
  --ethereum-identity-kit-text-neutral: ${pick(lightTheme.colors, 'textSecondary', '#667085')};
  --ethereum-identity-kit-primary: ${pick(lightTheme.colors, 'accentPrimary', '#5298ff')};
  --ethereum-identity-kit-background: ${pick(lightTheme.colors, 'backgroundPrimary', '#ffffff')};
  --ethereum-identity-kit-link: ${pick(lightTheme.colors, 'accentPrimary', '#5298ff')};
  font-family: 'Satoshi', 'Inter', sans-serif;
}

.eik-appearance-thorin.dark,
.eik-appearance-thorin .dark {
  --ethereum-identity-kit-text-primary: ${pick(darkTheme.colors, 'textPrimary', '#f9fafb')};
  --ethereum-identity-kit-text-primary-dark: ${pick(darkTheme.colors, 'textPrimary', '#f9fafb')};
  --ethereum-identity-kit-text-neutral: ${pick(darkTheme.colors, 'textSecondary', '#98a2b3')};
  --ethereum-identity-kit-text-neutral-dark: ${pick(darkTheme.colors, 'textSecondary', '#98a2b3')};
  --ethereum-identity-kit-primary: ${pick(darkTheme.colors, 'accentPrimary', '#5298ff')};
  --ethereum-identity-kit-background: ${pick(darkTheme.colors, 'backgroundPrimary', '#101828')};
  --ethereum-identity-kit-background-dark: ${pick(darkTheme.colors, 'backgroundPrimary', '#101828')};
  --ethereum-identity-kit-link: ${pick(darkTheme.colors, 'accentPrimary', '#7ab2ff')};
  --ethereum-identity-kit-link-dark: ${pick(darkTheme.colors, 'accentPrimary', '#7ab2ff')};
}
`

  const outPath = path.join(__dirname, '../src/styles/themes/thorin.generated.css')
  fs.writeFileSync(outPath, css)
  console.log(`Wrote ${outPath}`)
} catch (error) {
  console.error('Failed to generate Thorin tokens. Install @ensdomains/thorin first.')
  console.error(error)
  process.exit(1)
}
