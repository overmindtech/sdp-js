import { TextDecoder, TextEncoder } from 'node:util'
globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder
globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder
