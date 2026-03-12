// Enhanced mock implementations for complex components

// Mock Wagmi hooks
export const mockWagmiHooks = {
  useAccount: jest.fn(() => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true,
    isConnecting: false,
    isDisconnected: false,
    chain: { id: 1, name: 'Ethereum' },
  })),

  useConnect: jest.fn(() => ({
    connect: jest.fn(),
    connectors: [],
    isLoading: false,
    pendingConnector: null,
  })),

  useDisconnect: jest.fn(() => ({
    disconnect: jest.fn(),
  })),

  useSignMessage: jest.fn(() => ({
    signMessage: jest.fn(),
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: '0xsignature',
  })),

  useWriteContract: jest.fn(() => ({
    writeContract: jest.fn(),
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: '0xtxhash',
  })),

  useWaitForTransactionReceipt: jest.fn(() => ({
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
  })),

  useChainId: jest.fn(() => 1),

  useSwitchChain: jest.fn(() => ({
    switchChain: jest.fn(),
    isLoading: false,
    isSuccess: false,
    isError: false,
  })),
}

// Mock custom hooks with comprehensive return values
export const mockCustomHooks = {
  useProfileDetails: jest.fn(() => ({
    profile: {
      address: '0x1234567890123456789012345678901234567890',
      name: 'test.eth',
      avatar: 'https://example.com/avatar.png',
      bio: 'This is a test bio',
      records: {
        'com.twitter': 'testuser',
        'com.github': 'testuser',
        url: 'https://example.com',
      },
    },
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  })),

  useProfileStats: jest.fn(() => ({
    followers: 100,
    following: 50,
    statsLoading: false,
    refetch: jest.fn(),
  })),

  useFollowerState: jest.fn(() => ({
    followerTag: {
      text: 'Follows you',
      className: 'follows-you',
    },
    isFollowerStateLoading: false,
    refetch: jest.fn(),
  })),

  useFollowButton: jest.fn(() => ({
    buttonText: 'Follow',
    buttonState: 'not-following',
    handleAction: jest.fn(),
    isLoading: false,
    pendingState: null,
    disableHover: false,
    setDisableHover: jest.fn(),
  })),

  useFollowersYouKnow: jest.fn(() => ({
    followersYouKnow: [
      {
        address: '0x1111111111111111111111111111111111111111',
        name: 'friend1.eth',
        avatar: 'https://example.com/friend1.png',
      },
      {
        address: '0x2222222222222222222222222222222222222222',
        name: 'friend2.eth',
        avatar: 'https://example.com/friend2.png',
      },
    ],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  })),

  useEFPPoaps: jest.fn(() => ({
    poaps: [
      {
        id: '1',
        name: 'EFP Early Adopter',
        image: 'https://example.com/poap1.png',
        description: 'Early adopter of EFP protocol',
      },
      {
        id: '2',
        name: 'EFP Contributor',
        image: 'https://example.com/poap2.png',
        description: 'Contributed to EFP development',
      },
    ],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  })),

  useNotifications: jest.fn(() => ({
    notifications: [
      {
        id: '1',
        type: 'follow',
        from: '0x1111111111111111111111111111111111111111',
        timestamp: Date.now(),
        read: false,
      },
      {
        id: '2',
        type: 'unfollow',
        from: '0x2222222222222222222222222222222222222222',
        timestamp: Date.now() - 3600000,
        read: true,
      },
    ],
    isLoading: false,
    error: null,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
  })),

  useRecommended: jest.fn(() => ({
    recommended: [
      {
        address: '0x3333333333333333333333333333333333333333',
        name: 'recommended1.eth',
        avatar: 'https://example.com/rec1.png',
        followers: 500,
      },
      {
        address: '0x4444444444444444444444444444444444444444',
        name: 'recommended2.eth',
        avatar: 'https://example.com/rec2.png',
        followers: 750,
      },
    ],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  })),

  useFollowersAndFollowing: jest.fn(() => ({
    followers: [
      {
        address: '0x5555555555555555555555555555555555555555',
        name: 'follower1.eth',
        avatar: 'https://example.com/follower1.png',
        tags: ['friend'],
      },
    ],
    following: [
      {
        address: '0x6666666666666666666666666666666666666666',
        name: 'following1.eth',
        avatar: 'https://example.com/following1.png',
        tags: ['dev'],
      },
    ],
    followersLoading: false,
    followingLoading: false,
    hasNextPageFollowers: false,
    hasNextPageFollowing: false,
    fetchNextPageFollowers: jest.fn(),
    fetchNextPageFollowing: jest.fn(),
  })),

  useTransactions: jest.fn(() => ({
    transactions: [],
    addTransaction: jest.fn(),
    updateTransaction: jest.fn(),
    removeTransaction: jest.fn(),
    clearTransactions: jest.fn(),
    pendingTransactions: [],
  })),

  useTranslation: jest.fn(() => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        following: 'Following',
        followers: 'Followers',
        follow: 'Follow',
        unfollow: 'Unfollow',
        block: 'Block',
        unblock: 'Unblock',
        mute: 'Mute',
        unmute: 'Unmute',
        loading: 'Loading...',
        error: 'Error',
        signInWithEthereum: 'Sign in with Ethereum',
        signingMessage: 'Signing message...',
      }
      return translations[key] || key
    },
    activeLanguage: 'en',
    availableLanguages: ['en', 'es', 'fr'],
    setLanguage: jest.fn(),
  })),

  useSiwe: jest.fn(() => ({
    handleSignIn: jest.fn(),
    isSigningMessage: false,
    connectedAddress: '0x1234567890123456789012345678901234567890',
  })),

  useCoolMode: jest.fn(() => ({
    ref: { current: null },
  })),
}

// Mock utility functions
export const mockUtils = {
  formatNumber: jest.fn((num) => num?.toString() || '0'),
  formatTimeDiff: jest.fn((timestamp) => `${new Date(timestamp).getHours() - new Date().getHours()}h ago`),
  truncateAddress: jest.fn((address) => (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '')),
  isAddress: jest.fn((address) => /^0x[0-9a-fA-F]{40}$/.test(address)),
  isLinkValid: jest.fn((link) => {
    if (!link) return false
    return link.includes('https://') || link.includes('http://')
  }),
  defaultOnStatClick: jest.fn(),
}

// Setup all mocks function
export const setupAllMocks = () => {
  // Mock Wagmi
  jest.mock('wagmi', () => mockWagmiHooks)

  // Mock viem
  jest.mock('viem', () => ({
    isAddress: mockUtils.isAddress,
    getAddress: jest.fn((address: string) => address.toLowerCase()),
  }))

  // Mock custom hooks
  jest.mock('../../../hooks', () => mockCustomHooks)

  // Mock context
  jest.mock('../../../context/TranslationContext', () => ({
    useTranslation: mockCustomHooks.useTranslation,
  }))

  jest.mock('../../../context/transactionContext', () => ({
    useTransactions: mockCustomHooks.useTransactions,
  }))

  // Mock utilities
  jest.mock('../../../utils', () => mockUtils)
  jest.mock('../../../utils/profile', () => ({
    defaultOnStatClick: mockUtils.defaultOnStatClick,
  }))
}

// Reset all mocks function
export const resetAllMocks = () => {
  Object.values(mockWagmiHooks).forEach((mock) => mock.mockClear())
  Object.values(mockCustomHooks).forEach((mock) => mock.mockClear())
  Object.values(mockUtils).forEach((mock) => mock.mockClear())
}
