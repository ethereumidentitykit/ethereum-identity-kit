# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ethereum Identity Kit is a React component library that provides the Ethereum identity stack for dapps. It includes components for profiles, following/followers, identity management, and social features built on top of the Ethereum Follow Protocol (EFP).

## Development Commands

- **Build**: `npm run rollup` - Builds the library using Rollup
- **Test**: `npm test` - Runs Jest tests
- **Lint**: `npm run lint` - Runs ESLint
- **Format**: `npm run format` - Formats code with Prettier
- **Type Check**: `npm run typecheck` - Runs TypeScript compiler without emitting
- **Full Check**: `npm run checks` - Runs format, typecheck, lint, and build in sequence
- **Storybook**: `npm run storybook` - Starts Storybook dev server on port 6006
- **Build Storybook**: `npm run build-storybook` - Builds static Storybook

## Architecture

### Component Structure

Components follow atomic design principles organized in:

- `atoms/` - Basic building blocks (Avatar, LoadingCell, ImageWithFallback)
- `molecules/` - Simple combinations (ProfileStats, FollowerTag, ProfileSocials)
- `organisms/` - Complex components (ProfileCard, FollowButton, TransactionModal)

### Key Architectural Patterns

1. **Peer Dependencies**: The library requires React 18+, Wagmi 2+, TanStack Query 5+, and Viem 2+
2. **Context Providers**: Uses TransactionProvider and TranslationProvider for global state
3. **Hooks Architecture**: Custom hooks handle API calls, state management, and blockchain interactions
4. **Type Safety**: Comprehensive TypeScript coverage with exported types for all components and utilities
5. **CSS Modules**: Component-specific CSS files with consistent naming conventions

### Build System

- **Rollup**: Builds both CJS and ESM bundles with separate type definitions
- **Exports**: Main library, CSS styles, and utils are separately exportable
- **PostCSS**: CSS processing with extraction and minification

### API Integration

- EFP API base URL: `https://data.ethfollow.xyz/api/v1`
- Utility functions in `src/utils/api/` handle all external API calls
- Blockchain interactions through Wagmi/Viem integration

### Translation System

- JSON-based translations in `src/translations/`
- TranslationProvider context for i18n support
- Default language: English with Spanish and French translations

### Testing

- **Jest Setup**: Configured with jsdom environment, ESM support, and comprehensive coverage reporting
- **Test Structure**: Comprehensive test suite with **67 passing tests** following atomic design principles:
  - `atoms/`: Basic component tests (ImageWithFallback, LoadingCell, UI Icons) - 95%+ coverage
  - `molecules/`: Business logic component tests (Avatar, ProfileStats, FollowerTag, ProfileSocials, SignInWithEthereum, EFPPoaps, FollowersYouKnow, ProfileList, ProfileListRow, VirtualList) - 85%+ coverage
  - `organisms/`: Complex component integration tests (ProfileCard, FollowButton, Notifications, Recommended, FollowersAndFollowing, FullWidthProfile, TransactionModal) - 75%+ coverage
- **Test Infrastructure**: Multiple provider setups for different component complexity levels
  - `simple-test-utils.tsx`: Basic components without complex dependencies
  - `simple-wagmi-provider.tsx`: Components requiring provider context
  - `enhanced-mocks.ts`: Comprehensive mocks for Web3 integrations
- **Mock Strategy**: Complete mocking of Wagmi hooks, React Query, translation system, and DOM APIs
- **Web3 Testing**: Specialized patterns for wallet connections, blockchain interactions, and transaction flows
- **Coverage**: Component rendering, prop handling, user interactions, error states, loading states, and accessibility
- **Commands**:
  - `npm test` - Run all tests (67 passing tests)
  - `npm test -- --testPathPattern="simple.*test"` - Run isolated component tests
  - `npm test -- --testPathPattern="icons.*test"` - Run icon component tests
  - `npm test -- --coverage` - Run tests with coverage reporting
- **Documentation**: See `TEST_COVERAGE_SUMMARY.md` for detailed test coverage analysis
- **Storybook**: Available for component documentation and visual testing
