/**
 * Mocks
 */
import WS from 'jest-websocket-mock'
import { TextEncoder, TextDecoder } from "util";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextDecoder = TextDecoder;

/**
 * Real imports
 */
import { GatewaySession } from '../GatewaySession'
import { Autocomplete, AutocompleteField } from '../Autocomplete'
import { GatewayRequest, GatewayResponse, Item, ItemRequest, Metadata, RequestMethod } from '../__generated__/'
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

    it('should initially be empty', () => {
      expect(ac.results.length).toEqual(0)
      expect(ac.prompt).toEqual('')
      expect(ac.suggestions.length).toEqual(0)
    })

    describe('#prompt()', () => {
      it('executes a request when the prompt changes', async () => {
        ac.prompt = 'per'

        expect(async () => await server.nextMessage).not.toThrowError()
      })

      it('handles prompt changes', async () => {
        ac.prompt = 'per'

        // Send just the new request
        let msg = await server.nextMessage

        expect(msg).not.toBeUndefined()
        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          expect(req.requestType.case).toBe('newRequest')
          if (req.requestType.case == 'newRequest') {
            expect(req.requestType.value.type).toEqual('overmind-type')
            expect(req.requestType.value.query).toEqual(ac.prompt)
            expect(req.requestType.value.scope).toEqual('global')
          }
          
        } else {
          // Is there a better way to fail here?
          expect(false).toBeTruthy()
        }
        ac.prompt = 'pers'

        // The cancellation
        msg = await server.nextMessage
        expect(msg).not.toBeUndefined()

        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          expect(req.requestType.case).toBe('cancelRequest')
          if (req.requestType.case == 'cancelRequest') {
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

          expect(req.requestType.case).toBe('newRequest')
          if (req.requestType.case == 'newRequest') {
            expect(req.requestType.value.type).toEqual('overmind-type')
            expect(req.requestType.value.query).toEqual(ac.prompt)
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
        ac.prompt = 'per'

        // Send just the new request
        const msg = await server.nextMessage

        expect(msg).not.toBeUndefined()
        if (msg instanceof Uint8Array) {
          const req = GatewayRequest.fromBinary(msg)

          let u: Uint8Array = new Uint8Array();
        
          expect(req.requestType.case).toBe('newRequest')
          if (req.requestType.case == 'newRequest') {
            expect(req.requestType.value.type).toEqual('overmind-type')
            expect(req.requestType.value.query).toEqual(ac.prompt)
            expect(req.requestType.value.scope).toEqual('global')
            u = req.requestType.value.UUID
          }

          const s = new Struct();

          s.fromJson({
            foo: 'bar'
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
                  sourceRequest: new ItemRequest({
                    scope: 'global',
                    linkDepth: 0,
                    method: RequestMethod.GET,
                    query: ac.prompt,
                    type: 'overmind-type',
                    UUID: u,
                  })
                })                
              })
            }
          })

          const respBin = resp.toBinary()

          server.send(respBin.buffer)

          // Wait 200ms
          await new Promise((r) => setTimeout(r, 100))

          expect(ac.suggestions.length).toBe(1)
        } else {
          // Is there a better way to fail here?
          expect(false).toBeTruthy()
        }
      })
    })
  })
})
