export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod } from './items_pb';
export { ItemRequestError } from './errors_pb';
export { Response } from './responses_pb';
import { Reference, Item, ItemAttributes, Metadata, ItemRequest } from './items_pb';
import { ItemRequestError } from './errors_pb';
import { Response } from './responses_pb';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue } from 'google-protobuf/google/protobuf/struct_pb';
export declare namespace Util {
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
        backendName: string;
        requestMethod: "GET" | "FIND" | "SEARCH";
        timestamp: Date;
        backendDuration: number;
        backendDurationPerItem: number;
        backendPackage: string;
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
        linkedItemSubject: string;
        responseSubject: string;
        errorSubject: string;
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
        context: string;
        state: Response.ResponseStateMap[keyof Response.ResponseStateMap];
        nextUpdateInMs?: number;
    };
    /**
     * Creates a new Response object from a single object
     * @param details The details you want the new Response object to have
     * @returns The new Response object
     */
    function newResponse(details: ResponseData): Response;
}
export declare enum ResponderStatus {
    Working = 0,
    Stalled = 1,
    Complete = 2,
    Failed = 3
}
/**
 * Represents something that is responding to our query
 */
export declare class Responder {
    context: string;
    lastStatusTime: Date;
    nextStatusTime: Date | undefined;
    error: string;
    private _lastStatus;
    /**
     *
     * @param context The context that this responder will respond for
     */
    constructor(context: string);
    set status(status: ResponderStatus);
    get status(): ResponderStatus;
}
export declare class RequestProgress {
    responders: Map<string, Responder>;
    request: ItemRequest;
    private watcher;
    private inFlight;
    /**
     *
     * @param request The request for which ti track progress
     * @param stallCheckIntervalMs How often to check to see if responders have
     * stalled, in milliseconds
     */
    constructor(request: ItemRequest, stallCheckIntervalMs?: number);
    private countOfStatus;
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
     * Processes a response and updates tracking of responders. Note that the
     * SDP protocol is not currently capable of sending an error as a response.
     * The response is "DONE" then the error is sent on a different subject.
     * This means that we need to process errors also using `#processError()`
     * @param response The response to process
     */
    processResponse(response: Response): void;
    /**
     * Process errors and update the overall progress
     * @param error The error to process
     */
    processError(error: ItemRequestError): void;
}
//# sourceMappingURL=index.d.ts.map