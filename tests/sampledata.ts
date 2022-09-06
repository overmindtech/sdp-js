import { Util, RequestMethod } from '../index'
import { ResponderState } from "../responses_pb";
import { ItemRequestError } from "../responses_pb";

export const errorData = {
    NOTFOUND: {
        context: "test.context",
        errorType: ItemRequestError.ErrorType.NOTFOUND,
        errorString: "Could not be found",
    },
    NOCONTEXT: {
        context: "test.context",
        errorType: ItemRequestError.ErrorType.NOCONTEXT,
        errorString: "Context does not exist",
    },
    OTHER: {
        context: "test.context",
        errorType: ItemRequestError.ErrorType.OTHER,
        errorString: "Unknown error",
    },
}

export const error = {
    NOTFOUND: Util.newItemRequestError(errorData.NOTFOUND),
    NOCONTEXT: Util.newItemRequestError(errorData.NOCONTEXT),
    OTHER: Util.newItemRequestError(errorData.OTHER),
}

export const responseData = {
    WORKING: {
        responder: "test.context",
        state: ResponderState.WORKING,
        nextUpdateInMs: 100
    },
    COMPLETE: {
        responder: "test.context",
        state: ResponderState.COMPLETE,
        nextUpdateInMs: 100,
    },
    CANCELLED: {
        responder: "test.context",
        state: ResponderState.CANCELLED,
    },
    ERROR: {
        responder: "test.context",
        state: ResponderState.ERROR,
    },  
}

export const response = {
    WORKING: Util.newResponse(responseData.WORKING),
    COMPLETE: Util.newResponse(responseData.COMPLETE),
    CANCELLED: Util.newResponse(responseData.CANCELLED),
    ERROR: Util.newResponse(responseData.ERROR),
}

const FindData: Util.ItemRequestData = {
    type: "package",
    method: "FIND",
    linkDepth: 90,
    context: "test.context",
    itemSubject: "itemSubject",
    responseSubject: "responseSubject",
    errorSubject: "errorSubject",
    UUID: new Uint8Array(),
    query: '',
}

export const requestData = {
    FIND: FindData,
}

export const request = {
    FIND: Util.newItemRequest(requestData.FIND)
}

export const itemData = {
    process: {
        type: "process",
        context: "myPod",
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
        context: "global",
        uniqueAttribute: "name",
        type: "person",
        attributes: Util.newItemAttributes({
            "name": "dylan",
            "age": 27,    
        }),
        linkedItemRequests: [],
        linkedItems: [
            Util.newReference({
                context: "global",
                type: "person",
                uniqueAttributeValue: "katie",
            }),
        ],
        metadata: undefined,
    },
    katie: {
        context: "global",
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
        context: 'test',
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
            context: 'test',
            type: 'user',
            uniqueAttributeValue: 'Dyan',
        },
        to: {
            context: 'test',
            type: 'dog',
            uniqueAttributeValue: 'Manny',
        }
    },
}

export const edge = {
    basic: Util.newEdge(edgeData.basic),
}