/**
 * @jest-environment node
 */
// setting jest environment to 'node' because crypto.subtle can only be run in a secure context (https) and jsdom is unable to provide that

import { Struct } from 'google-protobuf/google/protobuf/struct_pb'
import { v4 as uuidv4, parse as uuidparse } from 'uuid'
import {
  CancelItemRequestData,
  gatewayRequestStatusDone,
  getAttributeValue,
  getHash,
  getReference,
  getUniqueattributevalue,
  ItemData,
  ItemRequestData,
  MetadataData,
  newCancelItemRequest,
  newEdge,
  newGatewayRequest,
  newGatewayRequestStatus,
  newGatewayResponse,
  newItem,
  newItemAttributes,
  newItemRequest,
  newItemRequestError,
  newMetadata,
  newReference,
  newResponse,
  newUUID,
  ResponseData,
  toDate,
  toDuration,
  toMs,
} from '../Util'
import {
  Item,
  ItemAttributes,
  RequestMethod,
  ItemRequestError,
  ResponderState,
} from '../__generated__/'
import * as data from './sampledata.helper'

describe('Util namespace', () => {
  describe('#newUUID', () => {
    it('throws no errors', () => {
      const u1 = newUUID()
      const u2 = newUUID()

      expect(u1).not.toEqual(u2)
    })
  })

  describe('#getUniqueattributevalue()', function () {
    it('should handle an item with a string UAV', function () {
      data.items.forEach((item: Item) => {
        const uav = getUniqueattributevalue(item)

        expect(uav).not.toEqual('')
      })
    })

    it('should actually return the unadulterated string', function () {
      const uav = getUniqueattributevalue(data.item.dylan)

      expect(uav).toEqual('dylan')
    })

    it('should actually return the unadulterated integer (as a string)', function () {
      const uav = getUniqueattributevalue(data.item.process)

      expect(uav).toEqual('12323')
    })
  })

  describe('#getHash()', function () {
    it('should work for items', async () => {
      const hash = await getHash(data.item.dylan)
      expect(hash).not.toEqual('')
    })

    it('should work for references', async () => {
      const ref = getReference(data.item.dylan)
      const hash = await getHash(ref)
      expect(hash).not.toEqual('')
    })
  })

  describe('#toDuration()', function () {
    it('should handle nice round numbers', () => {
      const d = toDuration(1000)

      expect(d.getSeconds()).toEqual(1)
      expect(d.getNanos()).toEqual(0)
    })

    it('should handle less round numbers', () => {
      const d = toDuration(5432)

      expect(d.getSeconds()).toEqual(5)
      expect(d.getNanos()).toEqual(432000000)
    })
  })

  describe('#getAttributeValue()', function () {
    const equalData = {
      string: 'foobar',
      integer: 999,
      boolean: true,
    }

    const equalAttrs = new ItemAttributes()
    equalAttrs.setAttrstruct(Struct.fromJavaScript(equalData))

    for (const [k, v] of Object.entries(equalData)) {
      it(`should handle ${k}`, function () {
        const actual = getAttributeValue(equalAttrs, k)
        expect(actual).toEqual(v)
      })
    }

    const deepEqualData = {
      'array of integers': [1, 2, 3],
      'array of strings': ['one', 'two', 'three'],
      'mixed array': ['one', 'two', 3],
    }

    const deepEqualAttrs = new ItemAttributes()
    deepEqualAttrs.setAttrstruct(Struct.fromJavaScript(deepEqualData))

    for (const [k, v] of Object.entries(deepEqualData)) {
      it(`should handle ${k}`, function () {
        expect(getAttributeValue(deepEqualAttrs, k)).toEqual(v)
      })
    }
  })

  describe('#getAttributeValue()', function () {
    const equalData = {
      string: 'foobar',
      integer: 999,
      boolean: true,
    }

    const equalAttrs = new ItemAttributes()
    equalAttrs.setAttrstruct(Struct.fromJavaScript(equalData))

    for (const [k, v] of Object.entries(equalData)) {
      it(`should handle ${k}`, function () {
        const actual = getAttributeValue(equalAttrs, k)
        expect(actual).toEqual(v)
      })
    }

    const deepEqualData = {
      'array of integers': [1, 2, 3],
      'array of strings': ['one', 'two', 'three'],
      'mixed array': ['one', 'two', 3],
    }

    const deepEqualAttrs = new ItemAttributes()
    deepEqualAttrs.setAttrstruct(Struct.fromJavaScript(deepEqualData))

    for (const [k, v] of Object.entries(deepEqualData)) {
      it(`should handle ${k}`, function () {
        expect(getAttributeValue(deepEqualAttrs, k)).toEqual(v)
      })
    }
  })

  describe('#newItemRequestError()', () => {
    const e = newItemRequestError({
      scope: 'cont',
      errorString: 'err',
      errorType: ItemRequestError.ErrorType.NOTFOUND,
    })

    expect(e.getScope()).toEqual('cont')
    expect(e.getErrorstring()).toEqual('err')
    expect(e.getErrortype()).toEqual(ItemRequestError.ErrorType.NOTFOUND)
  })

  describe('#newReference()', function () {
    const data = {
      type: 'person',
      uniqueAttributeValue: 'Sebastian',
      scope: 'global',
    }

    const ref = newReference(data)

    it('should have the correct Type', () => {
      expect(ref.getType()).toEqual(data.type)
    })

    it('should have the correct Uniqueattributevalue', () => {
      expect(ref.getUniqueattributevalue()).toEqual(data.uniqueAttributeValue)
    })

    it('should have the correct Scope', () => {
      expect(ref.getScope()).toEqual(data.scope)
    })
  })

  describe('#newItemRequest()', function () {
    const data: ItemRequestData = {
      type: 'person',
      method: 'GET',
      query: 'Sebastian',
      linkDepth: 10,
      scope: 'global',
      itemSubject: 'subject1',
      responseSubject: 'subject3',
      errorSubject: 'subject2',
      UUID: Uint8Array.from(uuidparse(uuidv4())),
      timeoutMs: 10000,
    }

    const ir = newItemRequest(data)

    it('should have the correct Type', () => {
      expect(ir.getType()).toEqual(data.type)
    })

    it('should have the correct Method', () => {
      expect(ir.getMethod()).toEqual(RequestMethod.GET)
    })

    it('should have the correct Query', () => {
      expect(ir.getQuery()).toEqual(data.query)
    })

    it('should have the correct Linkdepth', () => {
      expect(ir.getLinkdepth()).toEqual(data.linkDepth)
    })

    it('should have the correct Scope', () => {
      expect(ir.getScope()).toEqual(data.scope)
    })

    it('should have the correct Itemsubject', () => {
      expect(ir.getItemsubject()).toEqual(data.itemSubject)
    })

    it('should have the correct Responsesubject', () => {
      expect(ir.getResponsesubject()).toEqual(data.responseSubject)
    })

    describe('with a string UUID', () => {
      data.UUID = uuidv4()

      const ir = newItemRequest(data)

      it('should have parsed the UUID', () => {
        expect(ir.getUuid().length).toBeGreaterThan(0)
      })
    })
  })

  describe('#newMetadata()', function () {
    const uuid = Uint8Array.from(uuidparse(uuidv4()))
    const data: MetadataData = {
      sourceName: 'packages',
      sourceRequest: {
        scope: 'sourceScope',
        itemSubject: 'items',
        linkDepth: 0,
        method: 'LIST',
        query: '*',
        responseSubject: 'response',
        errorSubject: 'error',
        type: 'package',
        UUID: uuid,
        timeoutMs: 10000,
      },
      timestamp: new Date(),
      sourceDuration: 1638,
      sourceDurationPerItem: 23,
    }

    const m = newMetadata(data)

    it('should have the correct Backendname', () => {
      expect(m.getSourcename()).toEqual(data.sourceName)
    })

    it('should have the correct Requestmethod', () => {
      const sr = m.getSourcerequest()

      expect(sr).not.toBeUndefined

      if (typeof sr != 'undefined') {
        expect(sr.getScope()).toEqual('sourceScope')
        expect(sr.getItemsubject()).toEqual('items')
        expect(sr.getLinkdepth()).toEqual(0)
        expect(sr.getMethod()).toEqual(RequestMethod.LIST)
        expect(sr.getQuery()).toEqual('*')
        expect(sr.getResponsesubject()).toEqual('response')
        expect(sr.getType()).toEqual('package')
        expect(sr.getUuid()).toEqual(uuid)

        const timeout = sr.getTimeout()

        if (typeof timeout != 'undefined') {
          expect(toMs(timeout)).toEqual(10000)
        }
      }
    })

    it('should have the correct Timestamp', () => {
      const ts = m.getTimestamp()

      if (typeof ts != 'undefined') {
        expect(toDate(ts)).toEqual(data.timestamp)
      }
    })

    it('should have the correct sourceduration', () => {
      const duration = m.getSourceduration()

      if (typeof duration != 'undefined') {
        const date = toDate(duration)

        expect(date.getSeconds() * 1000 + date.getMilliseconds()).toEqual(
          data.sourceDuration
        )
      }
    })

    it('should have the correct sourcedurationperitem', () => {
      const duration = m.getSourcedurationperitem()

      if (typeof duration != 'undefined') {
        const date = toDate(duration)

        expect(date.getSeconds() * 1000 + date.getMilliseconds()).toEqual(
          data.sourceDurationPerItem
        )
      }
    })
  })

  describe('#newItem()', function () {
    const data: ItemData = {
      type: 'person',
      uniqueAttribute: 'name',
      scope: 'global',
      attributes: newItemAttributes({
        name: 'Dylan',
      }),
      metadata: undefined,
      linkedItemRequests: [],
      linkedItems: [],
    }

    const i = newItem(data)

    it('should have the correct Type', () => {
      expect(i.getType()).toEqual(data.type)
    })

    it('should have the correct Uniqueattribute', () => {
      expect(i.getUniqueattribute()).toEqual(data.uniqueAttribute)
    })

    it('should have the correct Attributes', () => {
      expect(
        i.getAttributes()?.getAttrstruct()?.toJavaScript()['name']
      ).toEqual('Dylan')
    })

    it('should have the correct Metadata', () => {
      expect(i.getMetadata()).toEqual(data.metadata)
    })

    it('should have the correct Scope', () => {
      expect(i.getScope()).toEqual(data.scope)
    })

    it('should have the correct LinkeditemrequestsList', () => {
      expect(i.getLinkeditemrequestsList()).toEqual(data.linkedItemRequests)
    })

    it('should have the correct LinkeditemsList', () => {
      expect(i.getLinkeditemsList()).toEqual(data.linkedItems)
    })
  })

  describe('#newResponse()', function () {
    const data: ResponseData = {
      responder: 'test.scope',
      state: ResponderState.ERROR,
      nextUpdateInMs: 0,
    }

    const r = newResponse(data)

    it('should have the correct Responder', () => {
      expect(r.getResponder()).toEqual('test.scope')
    })

    it('should have the correct State', () => {
      expect(r.getState()).toEqual(ResponderState.ERROR)
    })
  })

  describe('#newCancelItemRequest()', function () {
    describe('with a string UUID', function () {
      const data: CancelItemRequestData = {
        UUID: 'bcee962c-ca60-479b-8a96-ab970d878392',
      }

      const c = newCancelItemRequest(data)

      it('should have the correct UUID', () => {
        const expected = Uint8Array.from([
          188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131,
          146,
        ])
        expect(c.getUuid()).toEqual(expected)
      })
    })

    describe('with a binary UUID', function () {
      const data: CancelItemRequestData = {
        UUID: Uint8Array.from([
          188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131,
          146,
        ]),
      }

      const c = newCancelItemRequest(data)

      it('should have the correct UUID', () => {
        const expected = Uint8Array.from([
          188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131,
          146,
        ])
        expect(c.getUuid()).toEqual(expected)
      })
    })
  })

  describe('#newGatewayRequest()', () => {
    describe('with data types', () => {
      describe('with an ItemRequestCancel', function () {
        const g = newGatewayRequest(
          {
            cancelRequest: {
              UUID: 'bcee962c-ca60-479b-8a96-ab970d878392'
            },
          },
          100
        )
  
        it('should be the correct type', () => {
          expect(g.hasCancelrequest()).toEqual(true)
          expect(g.hasExcludeitem()).toEqual(false)
          expect(g.hasIncludeitem()).toEqual(false)
        })
  
        it('should be the correct details', () => {
          const cancel = g.getCancelrequest()
          const expected = Uint8Array.from([
            188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131,
            146,
          ])
  
          expect(cancel).not.toBeUndefined
          expect(cancel?.getUuid_asU8()).toEqual(expected)
          expect(g.getMinstatusinterval()).toEqual(toDuration(100))
        })
      })
  
      describe('with an ItemRequest', function () {
        const data: ItemRequestData = {
          type: 'person',
          method: 'GET',
          query: 'Sebastian',
          linkDepth: 10,
          scope: 'global',
          itemSubject: 'subject1',
          errorSubject: 'subject2',
          responseSubject: 'subject3',
          UUID: Uint8Array.from(uuidparse(uuidv4())),
          timeoutMs: 10000,
        }
  
        const g = newGatewayRequest({
          newRequest: data,
        }, 100)
  
        it('should be the correct type', () => {
          expect(g.hasCancelrequest()).toEqual(false)
          expect(g.hasNewrequest()).toEqual(true)
        })
  
        it('should be the correct details', () => {
          const req = g.getNewrequest()
  
          expect(req).not.toBeUndefined
  
          if (typeof req != 'undefined') {
            expect(req.getType()).toEqual(data.type)
            expect(req.getMethod()).toEqual(RequestMethod.GET)
            expect(req.getQuery()).toEqual(data.query)
            expect(req.getLinkdepth()).toEqual(data.linkDepth)
            expect(req.getScope()).toEqual(data.scope)
            expect(req.getItemsubject()).toEqual(data.itemSubject)
            expect(req.getResponsesubject()).toEqual(data.responseSubject)
          }
        })
      })
  
      describe("with undoRequest", () => {
        const g = newGatewayRequest({
          undoRequest: {
            UUID: 'bcee962c-ca60-479b-8a96-ab970d878392',
          },
        }, 100)
  
        it('should be the correct type', () => {
          expect(g.hasUndorequest()).toBe(true)
        })
      })
  
      describe("with excludeItem", () => {
        const g = newGatewayRequest({
          excludeItem: {
            scope: 'foo',
            type: 'person',
            uniqueAttributeValue: 'dylan',
          },
        }, 100)
  
        it('should be the correct type', () => {
          expect(g.hasExcludeitem()).toBe(true)
        })
      })
  
      describe("with includeItem", () => {
        const g = newGatewayRequest({
          includeItem: {
            scope: 'foo',
            type: 'person',
            uniqueAttributeValue: 'dylan',
          },
        }, 100)
  
        it('should be the correct type', () => {
          expect(g.hasIncludeitem()).toBe(true)
        })
      })
  
      describe("with expandItem", () => {
        const g = newGatewayRequest({
          expandItem: {
            item: {
              scope: 'foo',
              type: 'person',
              uniqueAttributeValue: 'dylan',  
            },
            linkDepth: 1,
          },
        }, 100)
  
        it('should be the correct type', () => {
          expect(g.hasExpanditem()).toBe(true)
        })
      })
  
      describe("with unexpandItem", () => {
        const g = newGatewayRequest({
          unexpandItem: {
            scope: 'foo',
            type: 'person',
            uniqueAttributeValue: 'dylan',
          },
        }, 100)
  
        it('should be the correct type', () => {
          expect(g.hasUnexpanditem()).toBe(true)
        })
      })
    })

    describe('with working objects', () => {
      describe('newRequest', () => {
        const g = newGatewayRequest({
          newRequest: data.request.LIST,
        }, 100)

        expect(g.hasNewrequest()).toBe(true)
      })
      describe('cancelRequest', () => {
        const g = newGatewayRequest({
          cancelRequest: data.cancelRequest,
        }, 100)

        expect(g.hasCancelrequest()).toBe(true)
      })
      describe('undoRequest', () => {
        const g = newGatewayRequest({
          undoRequest: data.undoItemRequest,
        }, 100)

        expect(g.hasUndorequest()).toBe(true)
      })
      describe('excludeItem', () => {
        const g = newGatewayRequest({
          excludeItem: data.reference,
        }, 100)

        expect(g.hasExcludeitem()).toBe(true)
      })
      describe('includeItem', () => {
        const g = newGatewayRequest({
          includeItem: data.reference,
        }, 100)

        expect(g.hasIncludeitem()).toBe(true)
      })
      describe('expandItem', () => {
        const g = newGatewayRequest({
          expandItem: data.expandItemRequest,
        }, 100)

        expect(g.hasExpanditem()).toBe(true)
      })
      describe('unexpandItem', () => {
        const g = newGatewayRequest({
          unexpandItem: data.reference,
        }, 100)

        expect(g.hasUnexpanditem()).toBe(true)
      })
    })
  })

  describe('#newEdge()', function () {
    const e = newEdge({
      from: {
        scope: 'global',
        type: 'person',
        uniqueAttributeValue: 'dylan',
      },
      to: {
        scope: 'global',
        type: 'person',
        uniqueAttributeValue: 'katelyn',
      },
    })

    it('should contain references', () => {
      expect(e.hasFrom()).toEqual(true)
      expect(e.hasTo()).toEqual(true)

      expect(e.getFrom()?.getScope()).toEqual('global')
      expect(e.getTo()?.getScope()).toEqual('global')
      expect(e.getFrom()?.getType()).toEqual('person')
      expect(e.getTo()?.getType()).toEqual('person')
      expect(e.getFrom()?.getUniqueattributevalue()).toEqual('dylan')
      expect(e.getTo()?.getUniqueattributevalue()).toEqual('katelyn')
    })
  })

  describe('#newGatewayRequestStatus()', function () {
    const states = new Map<string, ResponderState>()
    states.set('responder.cancel', ResponderState.CANCELLED)
    states.set('responder.complete', ResponderState.COMPLETE)
    states.set('responder.error', ResponderState.ERROR)
    states.set('responder.working', ResponderState.WORKING)

    const s = newGatewayRequestStatus({
      summary: {
        cancelled: 1,
        complete: 1,
        error: 1,
        responders: 4,
        stalled: 1,
        working: 0,
      },
      postProcessingComplete: false,
      responderStates: states,
    })

    describe('summary', () => {
      it('should have the correct value for Cancelled', () => {
        expect(s.getSummary()?.getCancelled()).toEqual(1)
      })
      it('should have the correct value for Complete', () => {
        expect(s.getSummary()?.getComplete()).toEqual(1)
      })
      it('should have the correct value for Error', () => {
        expect(s.getSummary()?.getError()).toEqual(1)
      })
      it('should have the correct value for Responders', () => {
        expect(s.getSummary()?.getResponders()).toEqual(4)
      })
      it('should have the correct value for Stalled', () => {
        expect(s.getSummary()?.getStalled()).toEqual(1)
      })
      it('should have the correct value for Working', () => {
        expect(s.getSummary()?.getWorking()).toEqual(0)
      })
    })

    it('should have postProcessingComplete', () => {
      expect(s.getPostprocessingcomplete()).toEqual(false)
    })

    it('should have responders map with enough entries', () => {
      const finalResponders = s.getResponderstatesMap()

      expect(finalResponders.getLength()).toEqual(4)

      for (const [responder, state] of states) {
        expect(finalResponders.get(responder)).toEqual(state)
      }
    })
  })

  describe('#gatewayRequestStatusDone()', function () {
    const states = new Map<string, ResponderState>()
    states.set('responder.cancel', ResponderState.CANCELLED)
    states.set('responder.complete', ResponderState.COMPLETE)
    states.set('responder.error', ResponderState.ERROR)
    states.set('responder.working', ResponderState.WORKING)

    const s = newGatewayRequestStatus({
      summary: {
        cancelled: 1,
        complete: 1,
        error: 1,
        responders: 4,
        stalled: 1,
        working: 0,
      },
      postProcessingComplete: false,
      responderStates: states,
    })

    it('handles when people are still responding', () => {
      expect(gatewayRequestStatusDone(s)).toEqual(false)
    })

    it('handles when all responders are complete but post-processing isnt', () => {
      s.getSummary()?.setWorking(0)
      s.getSummary()?.setComplete(2)
      expect(gatewayRequestStatusDone(s)).toEqual(false)
    })

    it('handles when all responders are complete and so is prost-processing', () => {
      s.setPostprocessingcomplete(true)
      expect(gatewayRequestStatusDone(s)).toEqual(true)
    })

    it('handles when post processing is complete and workers arent', () => {
      s.getSummary()?.setWorking(1)
      expect(gatewayRequestStatusDone(s)).toEqual(false)
    })
  })

  describe('#newGatewayResponse()', () => {
    describe('with ItemData', () => {
      const data: ItemData = {
        type: 'person',
        uniqueAttribute: 'name',
        scope: 'global',
        attributes: newItemAttributes({
          name: 'Dylan',
        }),
        metadata: undefined,
        linkedItemRequests: [],
        linkedItems: [],
      }

      it('should return the correct type', () => {
        const resp = newGatewayResponse({
          newItem: data,
        })
        expect(resp.hasNewitem()).toEqual(true)
      })
    })
    describe('with EdgeData', () => {
      const data = {
        from: {
          scope: 'global',
          type: 'person',
          uniqueAttributeValue: 'dylan',
        },
        to: {
          scope: 'global',
          type: 'person',
          uniqueAttributeValue: 'katelyn',
        },
      }

      it('should return the correct type', () => {
        const resp = newGatewayResponse({
          newEdge: data,
        })
        expect(resp.hasNewedge()).toEqual(true)
      })
    })
    describe('with ItemRequestErrorData', () => {
      const data = {
        scope: 'cont',
        errorString: 'err',
        errorType: ItemRequestError.ErrorType.NOTFOUND,
      }

      it('should return the correct type', () => {
        const resp = newGatewayResponse({
          newItemRequestError: data,
        })
        expect(resp.hasNewitemrequesterror()).toEqual(true)
      })
    })
    describe('with GatewayRequestStatusData', () => {
      const states = new Map<string, ResponderState>()
      states.set('responder.cancel', ResponderState.CANCELLED)
      states.set('responder.complete', ResponderState.COMPLETE)
      states.set('responder.error', ResponderState.ERROR)
      states.set('responder.working', ResponderState.WORKING)

      const data = {
        summary: {
          cancelled: 1,
          complete: 1,
          error: 1,
          responders: 4,
          stalled: 1,
          working: 0,
        },
        postProcessingComplete: false,
        responderStates: states,
      }

      it('should return the correct type', () => {
        const resp = newGatewayResponse({
          status: data,
        })
        expect(resp.hasStatus()).toEqual(true)
      })
    })
    describe('with string', () => {
      const data = 'foo'

      it('should return the correct type', () => {
        const resp = newGatewayResponse({
          error: data,
        })
        expect(resp.hasError()).toEqual(true)
      })
    })
  })
})
