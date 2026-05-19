// Jest environment setup for Node.js polyfills
const { TextEncoder, TextDecoder } = require('util')

// Polyfill TextEncoder/TextDecoder globally
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock crypto for viem
const crypto = require('crypto')
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
    subtle: {
      digest: () => Promise.resolve(new ArrayBuffer(32)),
    },
  },
})
