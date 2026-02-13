// Mock wagmi for testing
export const http = jest.fn(() => ({
  key: 'http',
  name: 'HTTP',
  request: jest.fn(),
  retryCount: 3,
  retryDelay: 150,
  timeout: 10000,
  type: 'http',
}))

export const createConfig = jest.fn(() => ({
  chains: [],
  connectors: [],
  storage: null,
  transports: {},
}))

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => children

export const WagmiContext = {
  Provider: WagmiProvider,
  Consumer: jest.fn(),
}

export const useAccount = jest.fn(() => ({
  address: undefined,
  isConnected: false,
  connector: undefined,
  chain: undefined,
}))

export const useConnect = jest.fn(() => ({
  connect: jest.fn(),
  connectors: [],
  error: null,
  isLoading: false,
  pendingConnector: null,
}))

export const useDisconnect = jest.fn(() => ({
  disconnect: jest.fn(),
}))

export const useSignMessage = jest.fn(() => ({
  signMessage: jest.fn(),
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useBalance = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useEnsName = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useEnsAvatar = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useEnsAddress = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

export const usePublicClient = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useWalletClient = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

// Re-export chains from our mock
export * from './chains'
