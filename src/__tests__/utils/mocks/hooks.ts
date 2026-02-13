// Mock implementations for custom hooks used throughout the application

export const mockUseProfileStats = jest.fn(() => ({
  followers: 100,
  following: 50,
  statsLoading: false,
}))

export const mockUseProfileDetails = jest.fn(() => ({
  profile: {
    address: '0x1234567890123456789012345678901234567890',
    name: 'test.eth',
    avatar: 'https://example.com/avatar.png',
    bio: 'This is a test bio',
    records: {},
  },
  isLoading: false,
  error: null,
}))

export const mockUseFollowerState = jest.fn(() => ({
  followerState: null,
  isLoading: false,
  refetch: jest.fn(),
}))

export const mockUseFollowButton = jest.fn(() => ({
  followState: 'not-following',
  isLoading: false,
  handleFollow: jest.fn(),
  handleUnfollow: jest.fn(),
}))

export const mockUseTranslation = jest.fn(() => ({
  t: (key: string) => key,
  activeLanguage: 'en',
  availableLanguages: ['en'],
  setLanguage: jest.fn(),
}))

export const mockUseTransactions = jest.fn(() => ({
  transactions: [],
  addTransaction: jest.fn(),
  updateTransaction: jest.fn(),
  removeTransaction: jest.fn(),
  clearTransactions: jest.fn(),
}))

export const mockUseFollowersYouKnow = jest.fn(() => ({
  followersYouKnow: [],
  isLoading: false,
  error: null,
}))

export const mockUseEFPPoaps = jest.fn(() => ({
  poaps: [],
  isLoading: false,
  error: null,
}))

export const mockUseNotifications = jest.fn(() => ({
  notifications: [],
  isLoading: false,
  error: null,
  hasNextPage: false,
  fetchNextPage: jest.fn(),
}))

// Setup mock implementations
export const setupHookMocks = () => {
  // Mock the hooks module
  jest.mock('../../../hooks', () => ({
    useProfileStats: mockUseProfileStats,
    useProfileDetails: mockUseProfileDetails,
    useFollowerState: mockUseFollowerState,
    useFollowButton: mockUseFollowButton,
    useFollowersYouKnow: mockUseFollowersYouKnow,
    useEFPPoaps: mockUseEFPPoaps,
    useNotifications: mockUseNotifications,
  }))

  jest.mock('../../../context/TranslationContext', () => ({
    useTranslation: mockUseTranslation,
  }))

  jest.mock('../../../context/transactionContext', () => ({
    useTransactions: mockUseTransactions,
  }))
}
