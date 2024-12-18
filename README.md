<p align="center">
  <a href="https://ethid.org" target="_blank" rel="noopener noreferrer">
    <img width="275" src="https://ethid.org/logo.png" alt="EFP logo" />
  </a>
</p>

<p align="center">
  <a href="https://pr.new/ethereumfollowprotocol/app"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow" /></a>
  <a href="https://discord.com/invite/ZUyG3mSXFD"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat" /></a>
  <a href="https://x.com/ethidkit"><img src="https://img.shields.io/twitter/follow/ethidkit?label=%40ethidkit&style=social&link=https%3A%2F%2Fx.com%2Fethidkit" alt="x account" /></a>
  <a href="https://github.com/ethereumidentitykit/identity-kit"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier" /></a>
  <a href="https://docs.ethid.org"><img src="https://img.shields.io/badge/docs-ethid.org-blue?style=flat-square" alt="docs" /></a>
</p>

<h1 align="center" style="font-size: 2.75rem; font-weight: 900;">Ethereum Identity Kit</h1>
<p align="center" style="font-size: 1.25rem; font-weight: 500;">Complete your dapp with the Ethereum identity stack.</p>

Ethereum Ideintity Kit allows you to easily implement Ethereum identity stack into your application.

<p align="center" style="font-size: 1.25rem; font-weight: 600;">How to get started with Ethereum Identity Kit:</p>

### Install

Install the library using your package manager.

```sh npm2yarn
npm install ethereum-identity-kit @tanstack/react-query
```

### Setup Query Client

Library uses [Tanstack Query](https://tanstack.com/query) for data fetching, so you need to setup a query client and provider.

```tsx copy
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
```

### Apply Styles

Add the following to your `layout.tsx` or `_app.tsx` file:

```tsx copy
import 'ethereum-identity-kit/css'
```

### You're all set!

Library is typed with TypeScript, which allows for autocompletion and type safety.

```tsx copy
import { ProfileCard } from 'ethereum-identity-kit'

export default function Home() {
  return <ProfileCard addressOrName="brantly.eth" />
  // or 0x983110309620d911731ac0932219af06091b6744
}
```

Documentation is available at [ethid.org](https://ethid.org).
