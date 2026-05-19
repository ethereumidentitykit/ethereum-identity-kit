// Mock implementations for Wagmi hooks and utilities

export const mockUseAccount = jest.fn(() => ({
  address: '0x1234567890123456789012345678901234567890',
  isConnected: true,
  isConnecting: false,
  isDisconnected: false,
}))

export const mockUseConnect = jest.fn(() => ({
  connect: jest.fn(),
  connectors: [],
  isLoading: false,
  pendingConnector: null,
}))

export const mockUseDisconnect = jest.fn(() => ({
  disconnect: jest.fn(),
}))

export const mockUseSignMessage = jest.fn(() => ({
  signMessage: jest.fn(),
  isLoading: false,
  isSuccess: false,
  isError: false,
}))

export const mockUseWriteContract = jest.fn(() => ({
  writeContract: jest.fn(),
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
}))

export const mockUseWaitForTransactionReceipt = jest.fn(() => ({
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
}))

export const mockUseChainId = jest.fn(() => 1)

export const mockUseSwitchChain = jest.fn(() => ({
  switchChain: jest.fn(),
  isLoading: false,
  isSuccess: false,
  isError: false,
}))

// Setup Wagmi mocks
export const setupWagmiMocks = () => {
  jest.mock('wagmi', () => ({
    useAccount: mockUseAccount,
    useConnect: mockUseConnect,
    useDisconnect: mockUseDisconnect,
    useSignMessage: mockUseSignMessage,
    useWriteContract: mockUseWriteContract,
    useWaitForTransactionReceipt: mockUseWaitForTransactionReceipt,
    useChainId: mockUseChainId,
    useSwitchChain: mockUseSwitchChain,
  }))

  jest.mock('viem', () => ({
    isAddress: jest.fn((address: string) => /^0x[0-9a-fA-F]{40}$/.test(address)),
    getAddress: jest.fn((address: string) => address.toLowerCase()),
  }))
}
