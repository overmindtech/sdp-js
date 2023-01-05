import {
  ItemRequestData,
  newCancelItemRequest,
  newEdge,
  newExpandItemRequest,
  newGatewayRequest,
  newGatewayRequestStatus,
  newItem,
  newItemAttributes,
  newItemRequest,
  newItemRequestError,
  newReference,
  newResponse,
  newUndoItemRequest,
} from '../Util'
import { ItemRequestError, ResponderState } from '../__generated__'

export const errorData = {
  NOTFOUND: {
    scope: 'test.scope',
    errorType: ItemRequestError.ErrorType.NOTFOUND,
    errorString: 'Could not be found',
  },
  NOSCOPE: {
    scope: 'test.scope',
    errorType: ItemRequestError.ErrorType.NOSCOPE,
    errorString: 'Scope does not exist',
  },
  OTHER: {
    scope: 'test.scope',
    errorType: ItemRequestError.ErrorType.OTHER,
    errorString: 'Unknown error',
  },
}

export const error = {
  NOTFOUND: newItemRequestError(errorData.NOTFOUND),
  NOSCOPE: newItemRequestError(errorData.NOSCOPE),
  OTHER: newItemRequestError(errorData.OTHER),
}

export const responseData = {
  WORKING: {
    responder: 'test.scope',
    state: ResponderState.WORKING,
    nextUpdateInMs: 100,
  },
  COMPLETE: {
    responder: 'test.scope',
    state: ResponderState.COMPLETE,
    nextUpdateInMs: 100,
  },
  CANCELLED: {
    responder: 'test.scope',
    state: ResponderState.CANCELLED,
  },
  ERROR: {
    responder: 'test.scope',
    state: ResponderState.ERROR,
  },
}

export const response = {
  WORKING: newResponse(responseData.WORKING),
  COMPLETE: newResponse(responseData.COMPLETE),
  CANCELLED: newResponse(responseData.CANCELLED),
  ERROR: newResponse(responseData.ERROR),
}

const ListData: ItemRequestData = {
  type: 'package',
  method: 'LIST',
  linkDepth: 90,
  scope: 'test.scope',
  itemSubject: 'itemSubject',
  responseSubject: 'responseSubject',
  errorSubject: 'errorSubject',
  UUID: new Uint8Array(),
  query: '',
}

export const requestData = {
  LIST: ListData,
}

export const request = {
  LIST: newItemRequest(requestData.LIST),
}

export const itemData = {
  process: {
    type: 'process',
    scope: 'myPod',
    uniqueAttribute: 'pid',
    attributes: newItemAttributes({
      pid: 12323,
      state: 'running',
      cpuPercent: 99.99,
    }),
    linkedItemRequests: [],
    linkedItems: [],
    metadata: undefined,
  },
  dylan: {
    scope: 'global',
    uniqueAttribute: 'name',
    type: 'person',
    attributes: newItemAttributes({
      name: 'dylan',
      age: 27,
    }),
    linkedItemRequests: [],
    linkedItems: [
      newReference({
        scope: 'global',
        type: 'person',
        uniqueAttributeValue: 'katie',
      }),
    ],
    metadata: undefined,
  },
  katie: {
    scope: 'global',
    uniqueAttribute: 'name',
    type: 'person',
    attributes: newItemAttributes({
      name: 'katie',
      age: 28,
    }),
    linkedItemRequests: [],
    linkedItems: [],
    metadata: undefined,
  },
}

export const item = {
  process: newItem(itemData.process),
  dylan: newItem(itemData.dylan),
  katie: newItem(itemData.katie),
}

export const items = [item.process, item.dylan, item.katie]

export const cancelRequest = newCancelItemRequest({
  UUID: 'a520d67f-0b2a-4852-87d2-d02bbc74ad89',
})

export const undoItemRequest = newUndoItemRequest({
  UUID: 'a520d67f-0b2a-4852-87d2-d02bbc74ad89',
})

export const reference = newReference({
  scope: 'global',
  type: 'ip',
  uniqueAttributeValue: '1.1.1.1',
})

export const expandItemRequest = newExpandItemRequest({
  item: reference,
  linkDepth: 1,
})

export const gatewayRequest = {
  itemRequest: newGatewayRequest(
    {
      newRequest: {
        scope: 'test',
        linkDepth: 10,
        method: 'GET',
        query: 'Dylan',
        itemSubject: 'return.item.foo',
        responseSubject: 'return.response.foo',
        errorSubject: 'return error.foo',
        type: 'person',
        UUID: 'a520d67f-0b2a-4852-87d2-d02bbc74ad89',
      },
    },
    0
  ),
  cancel: newGatewayRequest(
    {
      cancelRequest: {
        UUID: 'a520d67f-0b2a-4852-87d2-d02bbc74ad89',
      },
    },
    0
  ),
}

export const gatewayStatusData = {
  working: {
    responderStates: new Map([
      ['responder.cancel', ResponderState.CANCELLED],
      ['responder.complete', ResponderState.COMPLETE],
      ['responder.error', ResponderState.ERROR],
      ['responder.working', ResponderState.WORKING],
    ]),
    summary: {
      cancelled: 1,
      complete: 1,
      error: 1,
      responders: 4,
      stalled: 0,
      working: 1,
    },
    postProcessingComplete: false,
  },
  done: {
    responderStates: new Map([
      ['responder.cancel', ResponderState.CANCELLED],
      ['responder.complete', ResponderState.COMPLETE],
      ['responder.error', ResponderState.ERROR],
      ['responder.working', ResponderState.COMPLETE],
    ]),
    summary: {
      cancelled: 1,
      complete: 2,
      error: 1,
      responders: 4,
      stalled: 0,
      working: 0,
    },
    postProcessingComplete: true,
  },
}

export const gatewayStatus = {
  working: newGatewayRequestStatus(gatewayStatusData.working),
  done: newGatewayRequestStatus(gatewayStatusData.done),
}

export const edgeData = {
  basic: {
    from: {
      scope: 'test',
      type: 'user',
      uniqueAttributeValue: 'Dyan',
    },
    to: {
      scope: 'test',
      type: 'dog',
      uniqueAttributeValue: 'Manny',
    },
  },
}

export const edge = {
  basic: newEdge(edgeData.basic),
}
