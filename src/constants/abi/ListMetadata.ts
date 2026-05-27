export const listMetadataAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'claimListManager',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' },
    ],
    name: 'claimListManagerForAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListUser',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' },
    ],
    name: 'getMetadataValue',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'keys', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'getMetadataValues',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' },
    ],
    name: 'setListManager',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'setListUser',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setMetadataValue',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      {
        name: 'records',
        internalType: 'struct IEFPListMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'setMetadataValues',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'UpdateListMetadata',
  },
  {
    type: 'error',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' },
    ],
    name: 'NonceAlreadyClaimed',
  },
] as const
