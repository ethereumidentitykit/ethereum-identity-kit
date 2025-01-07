import { useTransactions } from '../context/transactionContext'

export const useTransactionModal = () => {
  const { setTxModalOpen } = useTransactions()

  // const listRegistryContract = getContract({
  //   address: coreEfpContracts.EFPListRegistry,
  //   abi: efpListRegistryAbi,
  //   client: createPublicClient({
  //     chain: DEFAULT_CHAIN,
  //     transport: http(),
  //   }),
  // })

  return {
    setTxModalOpen,
  }
}
