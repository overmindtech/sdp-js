import { create } from '@bufbuild/protobuf'
import { parse } from 'uuid'
import {
  GatewayRequestSchema,
  GatewayRequestStatus_SummarySchema,
  GatewayRequestStatusSchema,
} from '../__generated__/gateway_pb'
import {
  CancelQuerySchema,
  EdgeSchema,
  ExpandSchema,
  ItemSchema,
  LinkedItemSchema,
  QueryErrorSchema,
  QuerySchema,
  ReferenceSchema,
  UndoQuerySchema,
} from '../__generated__/items_pb'
import { ResponseSchema } from '../__generated__/responses_pb'
import { QueryError_ErrorType, QueryMethod, ResponderState } from '../protobuf'
import { newDuration, newItemAttributes } from '../util'

export const error = {
  NOTFOUND: create(QueryErrorSchema, {
    errorString: 'Could not be found',
    errorType: QueryError_ErrorType.NOTFOUND,
    scope: 'test.scope',
  }),
  NOSCOPE: create(QueryErrorSchema, {
    errorString: 'Scope does not exist',
    errorType: QueryError_ErrorType.NOSCOPE,
    scope: 'test.scope',
  }),
  OTHER: create(QueryErrorSchema, {
    errorString: 'Unknown error',
    errorType: QueryError_ErrorType.OTHER,
    scope: 'test.scope',
  }),
}

export const response = {
  WORKING: create(ResponseSchema, {
    responder: 'test.scope',
    state: ResponderState.WORKING,
    nextUpdateIn: newDuration(100),
  }),
  COMPLETE: create(ResponseSchema, {
    responder: 'test.scope',
    state: ResponderState.COMPLETE,
    nextUpdateIn: newDuration(100),
  }),
  CANCELLED: create(ResponseSchema, {
    responder: 'test.scope',
    state: ResponderState.CANCELLED,
  }),
  ERROR: create(ResponseSchema, {
    responder: 'test.scope',
    state: ResponderState.ERROR,
  }),
}

export const request = {
  LIST: create(QuerySchema, {
    type: 'package',
    method: QueryMethod.LIST,
    recursionBehaviour: { linkDepth: 90 },
    scope: 'test.scope',
    UUID: new Uint8Array(),
    query: '',
  }),
}

export const item = {
  process: create(ItemSchema, {
    type: 'process',
    scope: 'myPod',
    uniqueAttribute: 'pid',
    attributes: newItemAttributes({
      pid: 12_323,
      state: 'running',
      cpuPercent: 99.99,
    }),
  }),
  dylan: create(ItemSchema, {
    scope: 'global',
    uniqueAttribute: 'name',
    type: 'person',
    attributes: newItemAttributes({
      name: 'dylan',
      age: 27,
    }),
    linkedItems: [
      create(LinkedItemSchema, {
        item: create(ReferenceSchema, {
          scope: 'global',
          type: 'person',
          uniqueAttributeValue: 'katie',
        }),
      }),
    ],
  }),
  katie: create(ItemSchema, {
    scope: 'global',
    uniqueAttribute: 'name',
    type: 'person',
    attributes: newItemAttributes({
      name: 'katie',
      age: 28,
    }),
  }),
}

export const items = [item.process, item.dylan, item.katie]

export const cancelQuery = create(CancelQuerySchema, {
  UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
})

export const undoQuery = create(UndoQuerySchema, {
  UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
})

export const reference = create(ReferenceSchema, {
  scope: 'global',
  type: 'ip',
  uniqueAttributeValue: '1.1.1.1',
})

export const expand = create(ExpandSchema, {
  item: reference,
  linkDepth: 1,
})

export const gatewayRequest = {
  itemRequest: create(GatewayRequestSchema, {
    requestType: {
      case: 'query',
      value: create(QuerySchema, {
        scope: 'test',
        recursionBehaviour: { linkDepth: 10 },
        method: QueryMethod.GET,
        query: 'Dylan',
        type: 'person',
        UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
      }),
    },
  }),
  cancel: create(GatewayRequestSchema, {
    requestType: {
      case: 'cancelQuery',
      value: create(CancelQuerySchema, {
        UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
      }),
    },
  }),
}

export const gatewayStatus = {
  working: create(GatewayRequestStatusSchema, {
    responderStates: {
      'responder.cancel': ResponderState.CANCELLED,
      'responder.complete': ResponderState.COMPLETE,
      'responder.error': ResponderState.ERROR,
      'responder.working': ResponderState.WORKING,
    },
    summary: create(GatewayRequestStatus_SummarySchema, {
      cancelled: 1,
      complete: 1,
      error: 1,
      responders: 4,
      stalled: 0,
      working: 1,
    }),
    postProcessingComplete: false,
  }),
  done: create(GatewayRequestStatusSchema, {
    responderStates: {
      'responder.cancel': ResponderState.CANCELLED,
      'responder.complete': ResponderState.COMPLETE,
      'responder.error': ResponderState.ERROR,
      'responder.working': ResponderState.COMPLETE,
    },
    summary: create(GatewayRequestStatus_SummarySchema, {
      cancelled: 1,
      complete: 2,
      error: 1,
      responders: 4,
      stalled: 0,
      working: 0,
    }),
    postProcessingComplete: true,
  }),
}

export const edge = {
  basic: create(EdgeSchema, {
    from: create(ReferenceSchema, {
      scope: 'test',
      type: 'user',
      uniqueAttributeValue: 'Dylan',
    }),
    to: create(ReferenceSchema, {
      scope: 'test',
      type: 'dog',
      uniqueAttributeValue: 'Manny',
    }),
  }),
}
