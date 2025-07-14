import { useReadContract } from 'wagmi'
import { UseETHPriceReturn } from '../types/hooks'

// Chainlink ETH/USD price feed contract
const ETH_USD_FEED = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'

const PRICE_FEED_ABI = [
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { name: 'roundId', type: 'uint80' },
      { name: 'price', type: 'int256' },
      { name: 'startedAt', type: 'uint256' },
      { name: 'updatedAt', type: 'uint256' },
      { name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export function useETHPrice(): UseETHPriceReturn {
  const { data, isError, isLoading } = useReadContract({
    address: ETH_USD_FEED,
    abi: PRICE_FEED_ABI,
    functionName: 'latestRoundData',
  })

  // Format the price (Chainlink uses 8 decimals)
  const formattedPrice = data ? Number(data[1]) / 1e8 : null

  return {
    price: formattedPrice,
    isLoading,
    isError,
    rawData: data,
  }
}
