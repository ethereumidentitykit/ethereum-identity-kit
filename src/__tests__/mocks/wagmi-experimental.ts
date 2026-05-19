// Mock wagmi/experimental for testing
export const useWriteContracts = jest.fn(() => ({
  writeContracts: jest.fn(),
  data: undefined,
  error: null,
  isLoading: false,
  isPending: false,
  isSuccess: false,
  isError: false,
  reset: jest.fn(),
}))

export const useCapabilities = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useCallsStatus = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useSendCalls = jest.fn(() => ({
  sendCalls: jest.fn(),
  data: undefined,
  error: null,
  isLoading: false,
  isPending: false,
  isSuccess: false,
  isError: false,
  reset: jest.fn(),
}))

export const useShowCallsStatus = jest.fn(() => ({
  showCallsStatus: jest.fn(),
  data: undefined,
  error: null,
  isLoading: false,
}))

export const useWatchPendingTransactions = jest.fn(() => ({
  data: undefined,
  error: null,
  isLoading: false,
}))
