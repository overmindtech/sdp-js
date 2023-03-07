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
import { Autocomplete, AutocompleteField } from '../Autocomplete'
import {
  GatewayRequest,
  GatewayResponse,
  Item,
  Query,
  Metadata,
  RequestMethod,
} from '../__generated__/'
import { newItemAttributes, newTimestamp } from '../Util'
import { Struct } from '@bufbuild/protobuf'

const TestServerAddress = 'ws://localhost:31035'

describe('Autocomplete', () => {
  describe('with a connection', () => {
    let server: WS
    let session: GatewaySession
    let ac: Autocomplete

    beforeEach(async () => {
      server = new WS(TestServerAddress, {
        jsonProtocol: false,
      })
      session = new GatewaySession(TestServerAddress)

      await session.ready

      ac = new Autocomplete(session, AutocompleteField.TYPE)
    })

    afterEach(() => {
      session.close()
      server.close()
    })

    describe('#prompt()', () => {
      it('executes a request when the prompt changes', async () => {
        ac.setPrompt('per')

        expect(async () => await server.nextMessage).not.toThrowError()
      })

      it('handles prompt changes', async () => {
        ac.setPrompt('per')

        // Send just the new request
        let msg = await server.nextMessage

        expect(msg).not.toBeUndefined()
        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          expect(req.requestType.case).toBe('query')
          if (req.requestType.case == 'query') {
            expect(req.requestType.value.type).toEqual('overmind-type')
            expect(req.requestType.value.query).toEqual('per')
            expect(req.requestType.value.scope).toEqual('global')
          }
        } else {
          // Is there a better way to fail here?
          expect(false).toBeTruthy()
        }
        ac.setPrompt('pers')

        // The cancellation
        msg = await server.nextMessage
        expect(msg).not.toBeUndefined()

        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          expect(req.requestType.case).toBe('cancelQuery')
          if (req.requestType.case == 'cancelQuery') {
            expect(req.requestType.value.UUID.length).not.toEqual(0)
          }
        } else {
          // Is there a better way to fail here?
          expect(false).toBeTruthy()
        }

        // The new request
        msg = await server.nextMessage
        expect(msg).not.toBeUndefined()
        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          expect(req.requestType.case).toBe('query')
          if (req.requestType.case == 'query') {
            expect(req.requestType.value.type).toEqual('overmind-type')
            expect(req.requestType.value.query).toEqual('pers')
            expect(req.requestType.value.scope).toEqual('global')
          }
        } else {
          // Is there a better way to fail here?
          expect(false).toBeTruthy()
        }
      })
    })

    describe('#prompt()', () => {
      it('should populate suggestions', async () => {
        ac.setPrompt('per')

        const waitForSuggestions = new Promise<number>((resolve) => {
          ac.addEventListener('new-suggestions', (event) => {
            resolve(event.detail.length)
          })
        })

        // Send just the new request
        const msg = await server.nextMessage

        expect(msg).not.toBeUndefined()
        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          let u: Uint8Array = new Uint8Array()

          expect(req.requestType.case).toBe('query')
          if (req.requestType.case == 'query') {
            expect(req.requestType.value.type).toEqual('overmind-type')
            expect(req.requestType.value.query).toEqual('per')
            expect(req.requestType.value.scope).toEqual('global')
            u = req.requestType.value.UUID
          }

          const s = new Struct()

          s.fromJson({
            foo: 'bar',
          })

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
                    method: RequestMethod.GET,
                    query: 'per',
                    type: 'overmind-type',
                    UUID: u,
                  }),
                }),
              }),
            },
          })

          const respBin = resp.toBinary()

          server.send(respBin.buffer)

          const numSuggestions = await waitForSuggestions

          expect(numSuggestions).toBe(1)

          // Set the prompt to something else
          ac.setPrompt('do')

          // Wait for the cancel
          await server.nextMessage
        
          // Wait for the request to be started
          const msgTwo = await server.nextMessage

          expect(msgTwo).not.toBeUndefined()
          if (msgTwo instanceof Uint8Array) {
            const reqTwo = GatewayRequest.fromBinary(msgTwo)

            expect(reqTwo.requestType.case).toEqual('query')

            if (reqTwo.requestType.case === 'query') {
              // Send another response
              const respTwo: GatewayResponse = new GatewayResponse({
                responseType: {
                  case: 'newItem',
                  value: new Item({
                    type: 'overmind-type',
                    uniqueAttribute: 'name',
                    scope: 'global',
                    attributes: newItemAttributes({
                      name: 'dog',
                    }),
                    metadata: new Metadata({
                      sourceName: 'overmind-type-metasource',
                      timestamp: newTimestamp(new Date()),
                      sourceQuery: new Query({
                        scope: 'global',
                        linkDepth: 0,
                        method: RequestMethod.GET,
                        query: 'do',
                        type: 'overmind-type',
                        UUID: reqTwo.requestType.value.UUID,
                      }),
                    }),
                  }),
                },
              })

              const newSuggestions = new Promise<string[]>((resolve) => {
                ac.addEventListener('new-suggestions', (event) => {
                  resolve(event.detail)
                })
              })

              const respBinTwo = respTwo.toBinary()

              server.send(respBinTwo.buffer)
    
              const newS = await newSuggestions

              expect(newS).toEqual(['dog'])

              // At this point if we set the query back, the gateway won't give
              // us any new items because we already have them. This is where
              // the history comes in, it should look up the previous set of
              // suggestions and add them
              const finalSuggestions = new Promise<string[]>((resolve) => {
                ac.addEventListener('new-suggestions', (event) => {
                  resolve(event.detail)
                })
              })

              ac.setPrompt('per')

              expect(await finalSuggestions).toEqual(['person'])
            }
            
          } else {
            expect('message was not uint8').toBe(false)
          }
          
        } else {
          // Is there a better way to fail here?
          expect(false).toBeTruthy()
        }
      })
    })
  })
})
