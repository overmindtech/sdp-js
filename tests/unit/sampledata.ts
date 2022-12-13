import { Util, RequestMethod } from '../../index'
import { ResponderState } from "../../responses_pb";
import { ItemRequestError } from "../../responses_pb";

export const errorData = {
    NOTFOUND: {
        scope: "test.scope",
        errorType: ItemRequestError.ErrorType.NOTFOUND,
        errorString: "Could not be found",
    },
    NOSCOPE: {
        scope: "test.scope",
        errorType: ItemRequestError.ErrorType.NOSCOPE,
        errorString: "Scope does not exist",
    },
    OTHER: {
        scope: "test.scope",
        errorType: ItemRequestError.ErrorType.OTHER,
        errorString: "Unknown error",
    },
}

export const error = {
    NOTFOUND: Util.newItemRequestError(errorData.NOTFOUND),
    NOSCOPE: Util.newItemRequestError(errorData.NOSCOPE),
    OTHER: Util.newItemRequestError(errorData.OTHER),
}

export const responseData = {
    WORKING: {
        responder: "test.scope",
        state: ResponderState.WORKING,
        nextUpdateInMs: 100
    },
    COMPLETE: {
        responder: "test.scope",
        state: ResponderState.COMPLETE,
        nextUpdateInMs: 100,
    },
    CANCELLED: {
        responder: "test.scope",
        state: ResponderState.CANCELLED,
    },
    ERROR: {
        responder: "test.scope",
        state: ResponderState.ERROR,
    },  
}

export const response = {
    WORKING: Util.newResponse(responseData.WORKING),
    COMPLETE: Util.newResponse(responseData.COMPLETE),
    CANCELLED: Util.newResponse(responseData.CANCELLED),
    ERROR: Util.newResponse(responseData.ERROR),
}

const ListData: Util.ItemRequestData = {
    type: "package",
    method: "LIST",
    linkDepth: 90,
    scope: "test.scope",
    itemSubject: "itemSubject",
    responseSubject: "responseSubject",
    errorSubject: "errorSubject",
    UUID: new Uint8Array(),
    query: '',
}

export const requestData = {
    LIST: ListData,
}

export const request = {
    LIST: Util.newItemRequest(requestData.LIST)
}

export const itemData = {
    process: {
        type: "process",
        scope: "myPod",
        uniqueAttribute: "pid",
        attributes: Util.newItemAttributes({
            "pid": 12323,
            "state": "running",
            "cpuPercent": 99.99,
        }),
        linkedItemRequests: [],
        linkedItems: [],
        metadata: undefined,
    },
    dylan: {
        scope: "global",
        uniqueAttribute: "name",
        type: "person",
        attributes: Util.newItemAttributes({
            "name": "dylan",
            "age": 27,    
        }),
        linkedItemRequests: [],
        linkedItems: [
            Util.newReference({
                scope: "global",
                type: "person",
                uniqueAttributeValue: "katie",
            }),
        ],
        metadata: undefined,
    },
    katie: {
        scope: "global",
        uniqueAttribute: "name",
        type: "person",
        attributes: Util.newItemAttributes({
            "name": "katie",
            "age": 28,
            }),
        linkedItemRequests: [],
        linkedItems: [],
        metadata: undefined,
    }
}

export const item = {
    process: Util.newItem(itemData.process),
    dylan: Util.newItem(itemData.dylan),
    katie: Util.newItem(itemData.katie),
}

export const items = [item.process, item.dylan, item.katie];

export const gatewayRequestData = {
    itemRequest: {
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
    cancel: {
        UUID: 'a520d67f-0b2a-4852-87d2-d02bbc74ad89',
    }
}

export const gatewayRequest = {
    itemRequest: Util.newGatewayRequest(gatewayRequestData.itemRequest, 0),
    cancel: Util.newGatewayRequest(gatewayRequestData.cancel, 0),
}

export const gatewayStatusData = {
    working: {
        responderStates: new Map([
            ["responder.cancel", ResponderState.CANCELLED],
            ["responder.complete", ResponderState.COMPLETE],
            ["responder.error", ResponderState.ERROR],
            ["responder.working", ResponderState.WORKING],
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
            ["responder.cancel", ResponderState.CANCELLED],
            ["responder.complete", ResponderState.COMPLETE],
            ["responder.error", ResponderState.ERROR],
            ["responder.working", ResponderState.COMPLETE],
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
    }
}

export const gatewayStatus = {
    working: Util.newGatewayRequestStatus(gatewayStatusData.working),
    done: Util.newGatewayRequestStatus(gatewayStatusData.done),
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
        }
    },
}

export const edge = {
    basic: Util.newEdge(edgeData.basic),
}