import { WS } from 'jest-websocket-mock'

/**
 * Real imports
 */
import {
  NewItemEvent,
  NewEdgeEvent,
  QueryErrorEvent,
  StatusEvent,
  SocketErrorEvent,
  ErrorEvent,
  CloseEvent,
  DeleteItemEvent,
  DeleteEdgeEvent,
  UpdateItemEvent,
} from '../events'
import { GatewaySession } from '../gateway-session'
import { GatewayResponse, StoreBookmark, StoreSnapshot } from '../protobuf'
import * as data from './sampledata.helper'

// create a WS instance
const TestServerAddress = 'ws://localhost:31274'

describe('GatewaySession', () => {
  describe('with a running server', () => {
    const server = new WS(TestServerAddress, {
      jsonProtocol: false,
    })

    afterAll(() => {
      server.close()
    })

    describe('connecting', () => {
      const gs = new GatewaySession(TestServerAddress)

      beforeAll(async () => {
        await gs.ready
      })

      afterAll(() => {
        gs.close()
      })

      it('connects successfully', () => {
        expect(gs.state()).toBe(WebSocket.OPEN)
      })

      it('sends requests', async () => {
        gs.sendRequest(data.gatewayRequest.itemRequest)

        expect(await server.nextMessage).toEqual(
          data.gatewayRequest.itemRequest.toBinary()
        )
      })
    })

    describe('Processing inbound messages', () => {
      const gs = new GatewaySession(TestServerAddress)

      beforeAll(async () => {
        await gs.ready
      })

      afterAll(() => {
        gs.close()
      })

      describe('Error', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'error',
                value: 'some error',
              },
            })

            // Register the callbacks
            gs.addEventListener(
              ErrorEvent,
              (event) => {
                expect(event.detail).toEqual('some error')
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
      })
      describe('NewItem', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'newItem',
                value: data.item.dylan,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              NewItemEvent,
              (event) => {
                expect(event.detail.type).toEqual(data.item.dylan.type)
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
      })
      describe('NewEdge', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'newEdge',
                value: data.edge.basic,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              NewEdgeEvent,
              (event) => {
                expect(event.detail.from).toEqual(data.edge.basic.from)
                expect(event.detail.to).toEqual(data.edge.basic.to)
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
      })
      describe('QueryError', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'queryError',
                value: data.error.NOSCOPE,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              QueryErrorEvent,
              (event) => {
                expect(event.detail.scope).toEqual(data.error.NOSCOPE.scope)
                expect(event.detail.errorType).toEqual(
                  data.error.NOSCOPE.errorType
                )
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
      })
      describe('DeleteItem', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'deleteItem',
                value: data.reference,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              DeleteItemEvent,
              (event) => {
                expect(event.detail.scope).toEqual(data.reference.scope)
                expect(event.detail.uniqueAttributeValue).toEqual(
                  data.reference.uniqueAttributeValue
                )
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
      })
      describe('DeleteEdge', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'deleteEdge',
                value: data.edge.basic,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              DeleteEdgeEvent,
              (event) => {
                expect(event.detail.from?.toString()).toEqual(
                  data.edge.basic.from?.toString()
                )
                expect(event.detail.to?.toString()).toEqual(
                  data.edge.basic.to?.toString()
                )
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
      })
      describe('UpdateItem', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'updateItem',
                value: data.item.dylan,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              UpdateItemEvent,
              (event) => {
                expect(event.detail.scope).toEqual(data.item.dylan.scope)
                expect(event.detail.getType()).toEqual(
                  data.item.dylan.getType()
                )
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
      })
      describe('Status', () => {
        it('should call the callback', () =>
          new Promise((resolve) => {
            const response = new GatewayResponse({
              responseType: {
                case: 'status',
                value: data.gatewayStatus.working,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              StatusEvent,
              (event) => {
                expect(event.detail.postProcessingComplete).toEqual(
                  data.gatewayStatus.working.postProcessingComplete
                )
                expect(event.detail.summary?.toJsonString()).toEqual(
                  data.gatewayStatus.working.summary?.toJsonString()
                )
                resolve(undefined)
              },
              { once: true }
            )

            server.send(response.toBinary().buffer)
          }))
        it('should update the status', () =>
          new Promise((resolve) => {
            const working = new GatewayResponse({
              responseType: {
                case: 'status',
                value: data.gatewayStatus.working,
              },
            })
            const doneResponse = new GatewayResponse({
              responseType: {
                case: 'status',
                value: data.gatewayStatus.done,
              },
            })

            // Register the callbacks
            gs.addEventListener(
              StatusEvent,
              () => {
                expect(gs.status?.postProcessingComplete).toEqual(
                  data.gatewayStatus.working.postProcessingComplete
                )
                expect(gs.status?.summary?.toJsonString()).toEqual(
                  data.gatewayStatus.working.summary?.toJsonString()
                )

                // Add the second test
                gs.addEventListener(
                  StatusEvent,
                  () => {
                    expect(gs.status?.postProcessingComplete).toEqual(
                      data.gatewayStatus.done.postProcessingComplete
                    )
                    expect(gs.status?.summary?.toJsonString()).toEqual(
                      data.gatewayStatus.done.summary?.toJsonString()
                    )
                    resolve(undefined)
                  },
                  { once: true }
                )

                server.send(doneResponse.toBinary().buffer)
              },
              { once: true }
            )

            server.send(working.toBinary().buffer)
          }))
      })
    })
    describe('Handling async methods', () => {
      const gs = new GatewaySession(TestServerAddress)

      beforeAll(async () => {
        await gs.ready
      })

      afterAll(() => {
        gs.close()
      })

      describe('storeBookmark', () => {
        it('should store a new bookmark', () =>
          new Promise((resolve) => {
            const data = {
              name: 'new bookmark',
              description: 'new description',
            }
            const bookmark = new StoreBookmark(data)
            const response = new GatewayResponse({
              responseType: {
                case: 'bookmarkStoreResult',
                value: {
                  bookmark: {
                    properties: {
                      ...data,
                    },
                  },
                  success: true,
                },
              },
            })

            gs.storeBookmark(bookmark).then((result) => {
              expect(result.success).toBe(true)
              expect(result?.bookmark?.properties?.name).toBe(data.name)
              expect(result?.bookmark?.properties?.description).toBe(
                data.description
              )
              resolve(undefined)
            })

            server.send(response.toBinary().buffer)
          }))
      })
      describe('storeSnapshot', () => {
        it('should store a new snapshot', () =>
          new Promise((resolve) => {
            const data = {
              name: 'new snapshot',
              description: 'new description',
            }
            const snapshot = new StoreSnapshot(data)
            const response = new GatewayResponse({
              responseType: {
                case: 'snapshotStoreResult',
                value: {
                  snapshot: {
                    properties: {
                      ...data,
                    },
                  },
                  success: true,
                },
              },
            })

            gs.storeSnapshot(snapshot).then((result) => {
              expect(result.success).toBe(true)
              expect(result?.snapshot?.properties?.name).toBe(data.name)
              expect(result?.snapshot?.properties?.description).toBe(
                data.description
              )
              resolve(undefined)
            })

            server.send(response.toBinary().buffer)
          }))
      })
    })
  })

  describe('handling disconnection', () => {
    let gs: GatewaySession
    let server: WS

    beforeEach(async () => {
      server = new WS(TestServerAddress, {
        jsonProtocol: false,
      })
      gs = new GatewaySession(TestServerAddress)
      await gs.ready
    })

    it('should trigger an event', async () => {
      expect(gs.state()).toBe(WebSocket.OPEN)

      const close = new Promise<CloseEvent>((resolve) => {
        gs.addEventListener(CloseEvent, (event) => {
          resolve(event.detail)
        })
      })

      const error = new Promise<void>((resolve) => {
        gs.addEventListener(SocketErrorEvent, () => {
          resolve()
        })
      })

      server.error()

      const ce = await close

      expect(ce).toHaveProperty('reason')
      expect(ce).toHaveProperty('code')
      expect(ce).toHaveProperty('wasClean')

      await error
    })

    it('should pass through error codes on bad close', async () => {
      expect(gs.state()).toBe(WebSocket.OPEN)

      const close = new Promise<CloseEvent>((resolve) => {
        gs.addEventListener(CloseEvent, (event) => {
          resolve(event.detail)
        })
      })

      server.error({
        code: 1011,
        reason: 'Internal Error',
        wasClean: false,
      })

      const ce = await close

      expect(ce).toHaveProperty('reason')
      expect(ce).toHaveProperty('code')
      expect(ce).toHaveProperty('wasClean')
      expect(ce.code).toBe(1011)
      expect(ce.reason).toBe('Internal Error')
      expect(ce.wasClean).toBe(false)
    })

    it('should pass through error codes on clean close', async () => {
      expect(gs.state()).toBe(WebSocket.OPEN)

      const close = new Promise<CloseEvent>((resolve) => {
        gs.addEventListener(CloseEvent, (event) => {
          resolve(event.detail)
        })
      })

      server.close()

      const ce = await close

      expect(ce).toHaveProperty('reason')
      expect(ce).toHaveProperty('code')
      expect(ce).toHaveProperty('wasClean')
      expect(ce.code).toBe(1000)
      expect(ce.reason).toBe('')
      expect(ce.wasClean).toBe(true)
    })
  })
})
