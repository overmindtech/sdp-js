export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod, CancelItemRequest, ReverseLinksRequest, ReverseLinksResponse } from './items_pb';
export { Response } from './responses_pb';
export { GatewayRequest, GatewayRequestStatus, GatewayResponse } from './gateway_pb';
import { Reference, Item, ItemAttributes, Metadata, ItemRequest, CancelItemRequest, Edge } from './items_pb';
import { Response, ItemRequestError, ResponderStateMap } from './responses_pb';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue } from 'google-protobuf/google/protobuf/struct_pb';
import { GatewayRequest, GatewayRequestStatus } from './gateway_pb';
export declare namespace Util {
    /**
     * Generates a new random UUID
     * @returns A new UUIDv4 as a Uint8Array
     */
    function newUUID(): Uint8Array;
    /**
     * Gets the globally unique name of an object
     * @param object The object to get the globally unique name from
     * @returns The globally unique name
     */
    function getGloballyuniquename(object: Reference | Item): string;
    /**
     * **(Experimental)** Gets the unique hash for the object. Used for database uniqueness.
     * @param object The object to calculate the hash for
     * @returns The hash as a string
     */
    function getHash(object: Reference | Item): string;
    /**
     * Gets the unique attribute value of an object
     * @param object The object to get the unique attribute value for
     * @returns The unique attribute value as a string
     */
    function getUniqueattributevalue(object: Item | Reference): string;
    /**
     * Gets the value of a particular attribute. *Note:* that this only supports
     * attributes at the top level currently
     * @param attributes The attributes to query
     * @param name The name of the attribute you are looking for
     * @returns The value of the attribute
     */
    function getAttributeValue(attributes: ItemAttributes, name: string): any;
    /**
     * Returns a reference to the supplied item
     * @param item The item that you want a reference to
     * @returns A reference to the supplied item
     */
    function getReference(item: Item): Reference;
    /**
     * Convert a durationpb to javascript Date object
     * @param duration The duration object to convert
     * @returns A javascript `Date` object
     */
    function toDate(duration: Duration): Date;
    /**
     * Converts a number of milliseconds to a duration
     * @param ms The number of milliseconds
     */
    function toDuration(ms: number): Duration;
    function toMs(duration: Duration): number;
    type ItemData = {
        type: string;
        uniqueAttribute: string;
        context: string;
        attributes: ItemAttributes;
        metadata: Metadata | undefined;
        linkedItemRequests: ItemRequest[];
        linkedItems: Reference[];
    };
    /**
     * Create a new `Item` object from a single object
     * @param details The details of the item you want to create
     * @returns A new Item object
     */
    function newItem(details: ItemData): Item;
    /**
     * Creates a new ItemAttributes object from any javascript object that has
     * string keys
     * @param value Any object with string keys
     * @returns A new ItemAttributes object
     */
    function newItemAttributes(value: {
        [key: string]: JavaScriptValue;
    }): ItemAttributes;
    type MetadataData = {
        sourceName: string;
        sourceRequest: ItemRequestData;
        timestamp: Date;
        sourceDuration: number;
        sourceDurationPerItem: number;
    };
    /**
     * Creates a new `Metadata` object from a object
     * @param data The metadata you want the new object to have
     * @returns A new Metadata object
     */
    function newMetadata(data: MetadataData): Metadata;
    type ItemRequestErrorData = {
        context: string;
        errorString: string;
        errorType: ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap];
    };
    /**
     * Creates a new ItemRequestError from a single object
     * @param details The details of the error to create
     * @returns The new error object
     */
    function newItemRequestError(details: ItemRequestErrorData): ItemRequestError;
    type ItemRequestData = {
        type: string;
        method: "GET" | "FIND" | "SEARCH";
        query: string;
        linkDepth: number;
        context: string;
        itemSubject: string;
        responseSubject: string;
        UUID: Uint8Array;
        timeoutMs?: number;
    };
    /**
     * Creates a new ItemRequest object from a single object
     * @param details The details that you want the new ItemRequest to have
     * @returns A new ItemRequest object
     */
    function newItemRequest(details: ItemRequestData): ItemRequest;
    type ReferenceData = {
        type: string;
        uniqueAttributeValue: string;
        context: string;
    };
    /**
     * Create a new Reference from a single object
     * @param details The details that you want the new reference to contain
     * @returns The new Reference object
     */
    function newReference(details: ReferenceData): Reference;
    type ResponseData = {
        responder: string;
        state: ResponderStateMap[keyof ResponderStateMap];
        nextUpdateInMs?: number;
    };
    /**
     * Creates a new Response object from a single object
     * @param details The details you want the new Response object to have
     * @returns The new Response object
     */
    function newResponse(details: ResponseData): Response;
    type CancelItemRequestData = {
        UUID: string | Uint8Array;
    };
    /**
     * Creates a new CancelItemRequest object from given params. Note that the
     * UUID can be provided as a string e.g.
     * "bcee962c-ca60-479b-8a96-ab970d878392" or directly uas a Uint8Array
     * @param details The details you want the new CancelItemRequest object to
     * have
     * @returns The new CancelItemRequest object
     */
    function newCancelItemRequest(details: CancelItemRequestData): CancelItemRequest;
    type EdgeData = {
        from: ReferenceData;
        to: ReferenceData;
    };
    /**
     * Creates a new Edge object
     * @param data Data to be used in the object
     * @returns A new Edge object
     */
    function newEdge(data: EdgeData): Edge;
    type GatewayRequestStatusData = {
        responderStates: Map<string, ResponderStateMap[keyof ResponderStateMap]>;
        summary: {
            working: number;
            stalled: number;
            complete: number;
            error: number;
            cancelled: number;
            responders: number;
        };
        postProcessingComplete: boolean;
    };
    function newGatewayRequestStatus(data: GatewayRequestStatusData): GatewayRequestStatus;
    /**
     * Creates a new GatewayRequest object. This is an abstraction that wraps
     * either an ItemRequest or a CancelItemRequest, along with a timeout
     * @param request The ItemRequest or CancelItemRequest to send
     * @param minStatusIntervalMs The minimum duration between status responses
     * @returns A new GatewayRequest
     */
    function newGatewayRequest(request: ItemRequestData | CancelItemRequestData, minStatusIntervalMs: number): GatewayRequest;
    /**
     * Checks if a gateway request is done, this means that there are no more
     * responders working and all post-processing is complete
     * @param g The GatewayRequestStatus to check
     * @returns True of the request is done, false otherwise
     */
    function gatewayRequestStatusDone(g: GatewayRequestStatus): boolean;
}
/**
 * Represents something that is responding to our query
 */
export declare class Responder {
    name: string;
    lastStateTime: Date;
    nextStateTime: Date | undefined;
    error?: ItemRequestError;
    private _lastState;
    /**
     *
     * @param responder The responder that this responder will respond for
     */
    constructor(name: string);
    set state(state: ResponderStateMap[keyof ResponderStateMap]);
    get state(): ResponderStateMap[keyof ResponderStateMap];
}
export declare class RequestProgress {
    responders: Map<string, Responder>;
    request: ItemRequest;
    private watcher;
    private inFlight;
    /**
     *
     * @param request The request for which to track progress
     * @param stallCheckIntervalMs How often to check to see if responders have
     * stalled, in milliseconds
     */
    constructor(request: ItemRequest, stallCheckIntervalMs?: number);
    private countOfState;
    /**
     * Cancels loops that are watching for stalls
     */
    cancel(): void;
    /**
     *
     * @returns The number of responder still working
     */
    numWorking(): number;
    /**
     *
     * @returns The number of stalled responders
     */
    numStalled(): number;
    /**
     *
     * @returns The number of complete responders
     */
    numComplete(): number;
    /**
     *
     * @returns The number of failed responders
     */
    numFailed(): number;
    /**
     *
     * @returns The number of cancelled responders
     */
    numCancelled(): number;
    /**
     *
     * @returns The total number of responders for the query
     */
    numResponders(): number;
    /**
     *
     * @returns True if all responders are done or stalled
     */
    allDone(): boolean;
    /**
     * Returns a number between 1 and 100 representing the percentage complete
     * of all responders.
     * @returns The percentage of complete responders
     */
    percentComplete(): number;
    /**
     * Waits for all to be completed, then returns
     * @param timeoutMs How long to wait before timing out
     * @returns "timeout" or "done"
     */
    waitForCompletion(timeoutMs?: number): Promise<string>;
    /**
     * Processes a response and updates tracking of responders.
     * @param response The response to process
     */
    processResponse(response: Response): void;
}
//# sourceMappingURL=index.d.ts.map