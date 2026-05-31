/**
 * Regenerates src/styles/themes/thorin.css from @ensdomains/thorin theme tokens.
 * Run: npm run generate-thorin-tokens
 * Requires @ensdomains/thorin as a devDependency.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

const layoutOverrides = `
.eik-appearance-thorin .profile-card,
.eik-appearance-thorin.profile-card {
  border-radius: 16px;
  border: 1px solid var(--ethereum-identity-kit-neutral-light-hover);
}

.eik-appearance-thorin .follow-button {
  border-radius: 12px;
}

.eik-appearance-thorin .transaction-modal-container {
  border-radius: 16px;
}
`

try {
  const { lightTheme, darkTheme } = require('@ensdomains/thorin')

  const pick = (theme: { colors?: Record<string, unknown> }, key: string, fallback: string) => {
    const value = theme.colors?.[key]
    return typeof value === 'string' ? value : fallback
  }

  const css = `/* Auto-generated from @ensdomains/thorin — run npm run generate-thorin-tokens */

.eik-appearance-thorin {
  --ethereum-identity-kit-text-primary: ${pick(lightTheme, 'textPrimary', '#041133')};
  --ethereum-identity-kit-text-neutral: ${pick(lightTheme, 'textSecondary', '#667085')};
  --ethereum-identity-kit-text-light: #ffffff;

  --ethereum-identity-kit-primary: ${pick(lightTheme, 'accentPrimary', '#5298ff')};
  --ethereum-identity-kit-primary-hover: #3d84eb;

  --ethereum-identity-kit-link: ${pick(lightTheme, 'accentPrimary', '#5298ff')};
  --ethereum-identity-kit-link-selected: #3d84eb;
  --ethereum-identity-kit-link-hover: #2563c7;

  --ethereum-identity-kit-neutral: #ffffff;
  --ethereum-identity-kit-neutral-hover: #f2f4f7;
  --ethereum-identity-kit-neutral-light: #f9fafb;
  --ethereum-identity-kit-neutral-light-hover: #f2f4f7;

  --ethereum-identity-kit-background: ${pick(lightTheme, 'backgroundPrimary', '#ffffff')};
  --ethereum-identity-kit-background-overlay: rgba(4, 17, 51, 0.45);

  --ethereum-identity-kit-deletion: #f97066;
  --ethereum-identity-kit-restriction: #f04438;
  --ethereum-identity-kit-restriction-hover: #f0443826;
  --ethereum-identity-kit-success: #12b76a;
  --ethereum-identity-kit-indexing-bar: #12b76a;

  --ethereum-identity-kit-shadow-small: 0 1px 2px rgba(16, 24, 40, 0.06);
  --ethereum-identity-kit-shadow-medium: 0 4px 8px rgba(16, 24, 40, 0.08);
  --ethereum-identity-kit-shadow-large: 0 12px 24px rgba(16, 24, 40, 0.12);

  --ethereum-identity-kit-social-twitter: #5298ff;
  --ethereum-identity-kit-social-github: #344054;
  --ethereum-identity-kit-social-discord: #5865f2;

  --ethereum-identity-kit-sign-in-button: #5298ff;
  --ethereum-identity-kit-sign-in-button-hover: #3d84eb;

  font-family: 'Satoshi', 'Inter', sans-serif;
}

.eik-appearance-thorin.dark,
.eik-appearance-thorin .dark {
  --ethereum-identity-kit-text-primary: ${pick(darkTheme, 'textPrimary', '#f9fafb')};
  --ethereum-identity-kit-text-primary-dark: ${pick(darkTheme, 'textPrimary', '#f9fafb')};
  --ethereum-identity-kit-text-neutral: ${pick(darkTheme, 'textSecondary', '#98a2b3')};
  --ethereum-identity-kit-text-neutral-dark: ${pick(darkTheme, 'textSecondary', '#98a2b3')};

  --ethereum-identity-kit-primary: ${pick(darkTheme, 'accentPrimary', '#5298ff')};
  --ethereum-identity-kit-primary-hover: #7ab2ff;

  --ethereum-identity-kit-link: ${pick(darkTheme, 'accentPrimary', '#7ab2ff')};
  --ethereum-identity-kit-link-dark: ${pick(darkTheme, 'accentPrimary', '#7ab2ff')};
  --ethereum-identity-kit-link-selected: #5298ff;
  --ethereum-identity-kit-link-selected-dark: #5298ff;
  --ethereum-identity-kit-link-hover: #9cc5ff;
  --ethereum-identity-kit-link-hover-dark: #9cc5ff;

  --ethereum-identity-kit-neutral: #1d2939;
  --ethereum-identity-kit-neutral-dark: #1d2939;
  --ethereum-identity-kit-neutral-hover: #344054;
  --ethereum-identity-kit-neutral-hover-dark: #344054;
  --ethereum-identity-kit-neutral-light: #101828;
  --ethereum-identity-kit-neutral-light-dark: #344054;

  --ethereum-identity-kit-background: ${pick(darkTheme, 'backgroundPrimary', '#101828')};
  --ethereum-identity-kit-background-dark: ${pick(darkTheme, 'backgroundPrimary', '#101828')};
  --ethereum-identity-kit-background-overlay: rgba(0, 0, 0, 0.65);
  --ethereum-identity-kit-background-overlay-dark: rgba(0, 0, 0, 0.65);

  --ethereum-identity-kit-shadow-small: 0 1px 2px rgba(0, 0, 0, 0.35);
  --ethereum-identity-kit-shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.35);
  --ethereum-identity-kit-shadow-large: 0 12px 24px rgba(0, 0, 0, 0.45);

  --ethereum-identity-kit-social-twitter: #7ab2ff;
  --ethereum-identity-kit-social-twitter-dark: #7ab2ff;
  --ethereum-identity-kit-social-github: #d0d5dd;
  --ethereum-identity-kit-social-github-dark: #d0d5dd;
  --ethereum-identity-kit-social-discord: #949cf7;
  --ethereum-identity-kit-social-discord-dark: #949cf7;

  --ethereum-identity-kit-sign-in-button: #5298ff;
  --ethereum-identity-kit-sign-in-button-dark: #5298ff;
  --ethereum-identity-kit-sign-in-button-hover: #7ab2ff;
  --ethereum-identity-kit-sign-in-button-hover-dark: #7ab2ff;
}
${layoutOverrides}`

  const outPath = path.join(__dirname, '../src/styles/themes/thorin.css')
  fs.writeFileSync(outPath, css)
  console.log(`Wrote ${outPath}`)
} catch (error) {
  console.error('Failed to generate Thorin tokens. Install @ensdomains/thorin first.')
  console.error(error)
  process.exit(1)
}
