export const efpListMinterAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_registryAddress', internalType: 'address', type: 'address' },
      {
        name: '_accountMetadataAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: '_listRecordsL1', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'accountMetadata',
    outputs: [
      {
        name: '',
        internalType: 'contract IEFPAccountMetadata',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'claimant', internalType: 'address', type: 'address' },
    ],
    name: 'claimReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }],
    name: 'easyMint',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'easyMintTo',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'listRecordsL1',
    outputs: [{ name: '', internalType: 'contract IEFPListRecords', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }],
    name: 'mintNoMeta',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }],
    name: 'mintPrimaryListNoMeta',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mintToNoMeta',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registry',
    outputs: [
      {
        name: '',
        internalType: 'contract IEFPListRegistry_ERC721',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
    ],
    name: 'setReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
] as const
