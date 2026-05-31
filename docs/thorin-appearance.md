> Keep in sync with `src/docs/ThorinAppearance.mdx`.

# Thorin appearance (opt-in)

Ethereum Identity Kit defaults to its own styling. To adopt an ENS-like look with [Thorin](https://thorin.ens.domains/), opt in explicitly.

## CSS-only preset (no Thorin npm install)

```tsx
import 'ethereum-identity-kit/css'
import 'ethereum-identity-kit/css/thorin'

<div className="eik-appearance-thorin">
  <ProfileCard addressOrName="vitalik.eth" />
</div>
```

Add `dark` on the wrapper or child components for dark mode tokens.

## Full Thorin integration

Install peer dependencies:

```bash
npm install @ensdomains/thorin styled-components react-transition-state
```

Wrap your app:

```tsx
import { ProfileCard } from 'ethereum-identity-kit'
import { EthereumIdentityKitThorinProvider } from 'ethereum-identity-kit/thorin'
import 'ethereum-identity-kit/css'
import 'ethereum-identity-kit/css/thorin'

<EthereumIdentityKitThorinProvider theme="light">
  <ProfileCard addressOrName="vitalik.eth" showFollowButton />
</EthereumIdentityKitThorinProvider>
```

Thorin recommends adding **Satoshi** to your font stack for the closest match to ENS apps.

## Notes

- Default `<ProfileCard />` usage is unchanged when no Thorin provider/CSS is used.
- If your app already mounts `ThemeProvider` + `ThorinGlobalStyles`, pass `skipGlobalStyles` to `EthereumIdentityKitThorinProvider`.
- Regenerate CSS token mappings after Thorin upgrades: `npm run generate-thorin-tokens`
