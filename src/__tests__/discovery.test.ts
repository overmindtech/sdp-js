/**
 * Mocks
 */
import WS from 'jest-websocket-mock'
import { TextEncoder, TextDecoder } from 'util'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).TextEncoder = TextEncoder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).TextDecoder = TextDecoder

/**
 * Real imports
 */
import { GatewaySession } from '../GatewaySession'
import {
  GatewayRequest,
  GatewayResponse,
  Item,
  Query,
  Metadata,
  QueryMethod,
} from '../__generated__/'
import { newItemAttributes, newTimestamp } from '../Util'
import { SourceDiscovery } from '../SourceDiscovery'

const TestServerAddress = 'ws://localhost:31035'

describe('SourceDiscovery', () => {
  describe('with a connection', () => {
    let server: WS
    let session: GatewaySession
    let disco: SourceDiscovery

    beforeEach(async () => {
      server = new WS(TestServerAddress, {
        jsonProtocol: false,
      })
      session = new GatewaySession(TestServerAddress)

      await session.ready

      disco = new SourceDiscovery(session)
    })

    afterEach(() => {
      session.close()
      server.close()
    })

    describe('#discoverTypes()', () => {
      it('works like a hot damn', async () => {
        disco.discoverTypes()

        // Send just the new request
        const msg = await server.nextMessage

        expect(msg).not.toBeUndefined()
        expect(msg).toBeInstanceOf(Uint8Array)
        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          expect(req.requestType.case).toBe('query')
          if (req.requestType.case === 'query') {
            expect(req.requestType.value.type).toEqual('overmind-type')
            expect(req.requestType.value.scope).toEqual('global')
            expect(req.requestType.value.method).toEqual(QueryMethod.LIST)

            // Send a response
            const resp: GatewayResponse = new GatewayResponse({
              responseType: {
                case: 'newItem',
                value: new Item({
                  type: 'overmind-type',
                  uniqueAttribute: 'name',
                  scope: 'global',
                  attributes: newItemAttributes({
                    name: 'person',
                  }),
                  metadata: new Metadata({
                    sourceName: 'overmind-type-metasource',
                    timestamp: newTimestamp(new Date()),
                    sourceQuery: new Query({
                      scope: 'global',
                      linkDepth: 0,
                      method: QueryMethod.GET,
                      query: 'per',
                      type: 'overmind-type',
                      UUID: req.requestType.value,
                    }),
                  }),
                }),
              },
            })

            const respBin = resp.toBinary()

            // Create a promise to wait for the new suggestions
            const newSuggestions = new Promise((resolve) => {
              disco.addEventListener('new-type', (event) => {
                resolve(event.detail)
              })
            })

            server.send(respBin.buffer)

            const suggestions = await newSuggestions

            expect(suggestions).toEqual(['person'])
          }
        }
      })
    })

    describe('#discoverScopes()', () => {
      it('works like a hot damn', async () => {
        disco.discoverScopes()

        // Send just the new request
        const msg = await server.nextMessage

        expect(msg).not.toBeUndefined()
        expect(msg).toBeInstanceOf(Uint8Array)
        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          expect(req.requestType.case).toBe('query')
          if (req.requestType.case === 'query') {
            expect(req.requestType.value.type).toEqual('overmind-scope')
            expect(req.requestType.value.scope).toEqual('global')
            expect(req.requestType.value.method).toEqual(QueryMethod.LIST)

            // Send a response
            const resp: GatewayResponse = new GatewayResponse({
              responseType: {
                case: 'newItem',
                value: new Item({
                  type: 'overmind-scope',
                  uniqueAttribute: 'name',
                  scope: 'global',
                  attributes: newItemAttributes({
                    name: 'person',
                  }),
                  metadata: new Metadata({
                    sourceName: 'overmind-scope-metasource',
                    timestamp: newTimestamp(new Date()),
                    sourceQuery: new Query({
                      scope: 'global',
                      linkDepth: 0,
                      method: QueryMethod.GET,
                      query: 'per',
                      type: 'overmind-type',
                      UUID: req.requestType.value,
                    }),
                  }),
                }),
              },
            })

            const respBin = resp.toBinary()

            // Create a promise to wait for the new suggestions
            const newSuggestions = new Promise((resolve) => {
              disco.addEventListener('new-scope', (event) => {
                resolve(event.detail)
              })
            })

            server.send(respBin.buffer)

            const suggestions = await newSuggestions

            expect(suggestions).toEqual(['person'])
          }
        }
      })
    })
  })
})
