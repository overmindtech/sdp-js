import { newDuration, newItemAttributes } from '../Util'
import { CancelItemRequest, Edge, GatewayRequest, Item, ItemRequest, ItemRequestError, Reference, RequestMethod, ResponderState } from '../__generated__'
import { parse } from 'uuid'
import { ItemRequestError_ErrorType, Response } from '../__generated__/responses_pb'
import { ExpandItemRequest, GatewayRequestStatus, GatewayRequestStatus_Summary, UndoItemRequest } from '../__generated__/gateway_pb'

export const error = {
  NOTFOUND: new ItemRequestError({
    errorString: 'Could not be found',
    errorType: ItemRequestError_ErrorType.NOTFOUND,
    scope: 'test.scope',
  }),
  NOSCOPE: new ItemRequestError({
    errorString: 'Scope does not exist',
    errorType: ItemRequestError_ErrorType.NOSCOPE,
    scope: 'test.scope',
  }),
  OTHER: new ItemRequestError({
    errorString: 'Unknown error',
    errorType: ItemRequestError_ErrorType.OTHER,
    scope: 'test.scope',
  }),
}

export const response = {
  WORKING: new Response({
    responder: 'test.scope',
    state: ResponderState.WORKING,
    nextUpdateIn: newDuration(100),
  }),
  COMPLETE: new Response({
    responder: 'test.scope',
    state: ResponderState.COMPLETE,
    nextUpdateIn: newDuration(100),
  }),
  CANCELLED: new Response({
    responder: 'test.scope',
    state: ResponderState.CANCELLED,
  }),
  ERROR: new Response({
    responder: 'test.scope',
    state: ResponderState.ERROR,
  }),
}

export const request = {
  LIST: new ItemRequest({
    type: 'package',
    method: RequestMethod.LIST,
    linkDepth: 90,
    scope: 'test.scope',
    itemSubject: 'itemSubject',
    responseSubject: 'responseSubject',
    errorSubject: 'errorSubject',
    UUID: new Uint8Array(),
    query: '',
  })
}

export const item = {
  process: new Item({
    type: 'process',
    scope: 'myPod',
    uniqueAttribute: 'pid',
    attributes: newItemAttributes({
      pid: 12323,
      state: 'running',
      cpuPercent: 99.99,
    }),
  }),
  dylan: new Item({
    scope: 'global',
    uniqueAttribute: 'name',
    type: 'person',
    attributes: newItemAttributes({
      name: 'dylan',
      age: 27,
    }),
    linkedItems: [
      new Reference({
        scope: 'global',
        type: 'person',
        uniqueAttributeValue: 'katie',
      }),
    ],
  }),
  katie: new Item({
    scope: 'global',
    uniqueAttribute: 'name',
    type: 'person',
    attributes: newItemAttributes({
      name: 'katie',
      age: 28,
    }),
  })
}

export const items = [item.process, item.dylan, item.katie]

export const cancelRequest = new CancelItemRequest({
  UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
})

export const undoItemRequest = new UndoItemRequest({
  UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
})

export const reference = new Reference({
  scope: 'global',
  type: 'ip',
  uniqueAttributeValue: '1.1.1.1',
})

export const expandItemRequest = new ExpandItemRequest({
  item: reference,
  linkDepth: 1,
})

export const gatewayRequest = {
  itemRequest: new GatewayRequest({
    requestType: {
      case: 'newRequest',
      value: new ItemRequest({
        scope: 'test',
        linkDepth: 10,
        method: RequestMethod.GET,
        query: 'Dylan',
        itemSubject: 'return.item.foo',
        responseSubject: 'return.response.foo',
        errorSubject: 'return error.foo',
        type: 'person',
        UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
      })
    }
  }),
  cancel: new GatewayRequest({
    requestType: {
      case: 'cancelRequest',
      value: new CancelItemRequest({
        UUID: parse('a520d67f-0b2a-4852-87d2-d02bbc74ad89'),
      }),
    },
  }),
}

export const gatewayStatus = {
  working: new GatewayRequestStatus({
    responderStates: {
      'responder.cancel': ResponderState.CANCELLED,
      'responder.complete': ResponderState.COMPLETE,
      'responder.error': ResponderState.ERROR,
      'responder.working': ResponderState.WORKING,
    },
    summary: new GatewayRequestStatus_Summary({
      cancelled: 1,
      complete: 1,
      error: 1,
      responders: 4,
      stalled: 0,
      working: 1,
    }),
    postProcessingComplete: false,
  }),
  done: new GatewayRequestStatus({
    responderStates: {
      'responder.cancel': ResponderState.CANCELLED,
      'responder.complete': ResponderState.COMPLETE,
      'responder.error': ResponderState.ERROR,
      'responder.working': ResponderState.COMPLETE,
    },
    summary: new GatewayRequestStatus_Summary({
      cancelled: 1,
      complete: 2,
      error: 1,
      responders: 4,
      stalled: 0,
      working: 0,
    }),
    postProcessingComplete: true,
  })
}

export const edge = {
  basic: new Edge({
    from: new Reference({
      scope: 'test',
      type: 'user',
      uniqueAttributeValue: 'Dylan',
    }),
    to: new Reference({
      scope: 'test',
      type: 'dog',
      uniqueAttributeValue: 'Manny',
    }),
  })
}
