/**
 * @jest-environment jsdom
 */

import WS from 'jest-websocket-mock'
import { GatewaySession, newGatewayResponse } from '../../'
import {
  NewItemEvent,
  NewEdgeEvent,
  NewItemRequestErrorEvent,
  StatusEvent,
  SocketErrorEvent,
  ErrorEvent,
  CloseEvent,
} from '../Events'
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

      it('connects successfully', async () => {
        expect(gs.state()).toBe(WebSocket.OPEN)
      })

      it('sends requests', async () => {
        gs.sendRequest(data.gatewayRequest.itemRequest)

        expect(await server.nextMessage).toEqual(
          data.gatewayRequest.itemRequest.serializeBinary()
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
        it('should call the callback', (done) => {
          const response = newGatewayResponse('some error')

          // Register the callbacks
          gs.addEventListener(
            ErrorEvent,
            (event) => {
              expect(event.detail).toEqual('some error')
              done()
            },
            { once: true }
          )

          server.send(response.serializeBinary().buffer)
        })
      })
      describe('NewItem', () => {
        it('should call the callback', (done) => {
          const response = newGatewayResponse(data.itemData.dylan)

          // Register the callbacks
          gs.addEventListener(
            NewItemEvent,
            (event) => {
              expect(event.detail.getType()).toEqual(data.item.dylan.getType())
              done()
            },
            { once: true }
          )

          server.send(response.serializeBinary().buffer)
        })
      })
      describe('NewEdge', () => {
        it('should call the callback', (done) => {
          const response = newGatewayResponse(data.edgeData.basic)

          // Register the callbacks
          gs.addEventListener(
            NewEdgeEvent,
            (event) => {
              expect(event.detail.getFrom()).toEqual(data.edge.basic.getFrom())
              expect(event.detail.getTo()).toEqual(data.edge.basic.getTo())
              done()
            },
            { once: true }
          )

          server.send(response.serializeBinary().buffer)
        })
      })
      describe('NewItemRequestError', () => {
        it('should call the callback', (done) => {
          const response = newGatewayResponse(data.errorData.NOSCOPE)

          // Register the callbacks
          gs.addEventListener(
            NewItemRequestErrorEvent,
            (event) => {
              expect(event.detail.getScope()).toEqual(
                data.error.NOSCOPE.getScope()
              )
              expect(event.detail.getErrortype()).toEqual(
                data.error.NOSCOPE.getErrortype()
              )
              done()
            },
            { once: true }
          )

          server.send(response.serializeBinary().buffer)
        })
      })
      describe('Status', () => {
        it('should call the callback', (done) => {
          const response = newGatewayResponse(data.gatewayStatusData.working)

          // Register the callbacks
          gs.addEventListener(
            StatusEvent,
            (event) => {
              expect(event.detail.getPostprocessingcomplete()).toEqual(
                data.gatewayStatus.working.getPostprocessingcomplete()
              )
              expect(event.detail.getSummary()?.toObject()).toEqual(
                data.gatewayStatus.working.getSummary()?.toObject()
              )
              done()
            },
            { once: true }
          )

          server.send(response.serializeBinary().buffer)
        })

        it('should update the status', (done) => {
          const working = newGatewayResponse(data.gatewayStatusData.working)
          const doneResponse = newGatewayResponse(data.gatewayStatusData.done)

          // Register the callbacks
          gs.addEventListener(
            StatusEvent,
            () => {
              expect(gs.status?.postprocessingcomplete).toEqual(
                data.gatewayStatus.working.getPostprocessingcomplete()
              )
              expect(gs.status?.summary).toEqual(
                data.gatewayStatus.working.getSummary()?.toObject()
              )

              // Add the second test
              gs.addEventListener(
                StatusEvent,
                () => {
                  expect(gs.status?.postprocessingcomplete).toEqual(
                    data.gatewayStatus.done.getPostprocessingcomplete()
                  )
                  expect(gs.status?.summary).toEqual(
                    data.gatewayStatus.done.getSummary()?.toObject()
                  )
                  done()
                },
                { once: true }
              )

              server.send(doneResponse.serializeBinary().buffer)
            },
            { once: true }
          )

          server.send(working.serializeBinary().buffer)
        })
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
