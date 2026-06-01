# Ethereum Identity Kit — review context

## What this repo is

Published npm package **`ethereum-identity-kit`**: React components for ENS profiles, EFP follow state, social graphs, SIWE, and wallet-aware UI. Docs: [ethidentitykit.com/docs](https://ethidentitykit.com/docs). Storybook playground mirrors component docs.

## Public entry points (do not break without calling it out)

| Import path | Source | Purpose |
| --- | --- | --- |
| `ethereum-identity-kit` | `src/index.ts` | Main components, hooks, utils, context, types |
| `ethereum-identity-kit/elements` | `src/elements/index.ts` | ProfileCard composable slots + primitives |
| `ethereum-identity-kit/thorin` | `src/thorin/index.ts` | Opt-in Thorin provider + re-exported components |
| `ethereum-identity-kit/css` | built `dist/esm/index.css` | Default EIK styles |
| `ethereum-identity-kit/css/thorin` | `dist/esm/themes/thorin.css` | Thorin token overrides |
| `ethereum-identity-kit/utils` | `src/utils/index.ts` | Standalone utilities |

`package.json` `exports` is the contract — any change there is user-facing.

## Architecture notes

- **Providers**: Apps wrap with `WagmiProvider`, `QueryClientProvider`, and `TransactionProvider` for follow/on-chain flows.
- **Appearance**: `AppearanceProvider` / `useAppearance` / `useAppearanceOptional`. Default wraps children in a `<div>` with appearance classes; `asChild` merges onto a single host element only.
- **ProfileCard**: Default `<ProfileCard />` props API unchanged for consumers; advanced layout uses `ProfileCard.Root` + slots from `/elements`.
- **Thorin**: Optional. `EthereumIdentityKitThorinProvider` sets Thorin theme + `eik-appearance-thorin` (and `dark` class when `theme="dark"`). Thorin 0.6.x peers React 17 — repo uses `npm run install:deps` (`legacy-peer-deps`) for dev/CI.
- **i18n**: `TranslationProvider` + keys in `src/types/translations.ts` and `src/translations/*.json`.
- **Build**: `npm run rollup` produces `dist/`; subpath bundles must not duplicate `AppearanceContext` (externalized to main package).

## Breaking-change checklist (always mention in review if applicable)

When a PR touches public API, explicitly state in the review summary:

1. **Exports** — removed/renamed export from `src/index.ts`, `src/elements/index.ts`, or `src/thorin/index.ts`?
2. **Props** — removed/renamed/required props on exported components?
3. **Types** — removed or narrowed exported types from `src/types/` or component `*.types.ts`?
4. **Translation keys** — renamed keys in `TranslationKey` union or locale files?
5. **CSS variables** — renamed `--ethereum-identity-kit-*` tokens?
6. **Peers** — stricter or new required peer dependencies?
7. **Semver** — should this be a **major** bump (current version in `package.json`)?

Internal refactors that do not cross the export boundary are not breaking.

## Conventions

- Match existing patterns: hooks for data, context for cross-cutting state, `clsx` for class names.
- Slot primitives: `src/components/primitives/Slot.tsx` — compose `child.ref` (React 18) with slot refs.
- Storybook 9: MDX blocks import from `@storybook/addon-docs/blocks`, not `@storybook/blocks`.
- Prefer minimal diffs; avoid unrelated refactors in component PRs.

## Out of scope for API reviews

- `dist/`, `storybook-static/`, lockfile-only changes (unless they affect published `files` field)
- Pure Storybook/docs changes with no `src/` export changes
