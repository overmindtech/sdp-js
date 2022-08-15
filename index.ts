// This file contains the extra methods I want to add to the generated protobuf
// code

// Export things from other files
export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod, CancelItemRequest, ReverseLinksRequest, ReverseLinksResponse } from './items_pb';
export { Response } from './responses_pb';
export { GatewayRequest, GatewayRequestStatus, GatewayResponse } from './gateway_pb'

// Import things we need for the Util namespace
import { Reference, Item, ItemAttributes, Metadata, ItemRequest, RequestMethod, RequestMethodMap, CancelItemRequest } from './items_pb';
import { Response, ItemRequestError, ResponderStateMap, ResponderState } from './responses_pb';
import sha1 from 'sha1';
import toDataView from 'to-data-view';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue, Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { parse as uuidParse, v4 as uuidv4 } from 'uuid';
import { GatewayRequest, GatewayRequestStatus } from './gateway_pb';

export namespace Util {
    /**
     * Generates a new random UUID
     * @returns A new UUIDv4 as a Uint8Array
     */
    export function newUUID(): Uint8Array {
        return Uint8Array.from(uuidParse(uuidv4()))
    }

    /**
     * Gets the globally unique name of an object
     * @param object The object to get the globally unique name from
     * @returns The globally unique name
     */
    export function getGloballyuniquename(object: Reference | Item): string {
        const elements: string[] = [
            object.getContext(),
            object.getType(),
            getUniqueattributevalue(object),
        ];
    
        return elements.join(".");
    }

    /**
     * **(Experimental)** Gets the unique hash for the object. Used for database uniqueness.
     * @param object The object to calculate the hash for
     * @returns The hash as a string
     */
    export function getHash(object: Reference | Item): string {
        const bytes = sha1(getGloballyuniquename(object), {
            asBytes: true,
        })
    
        const base32String = base32EncodeCustom(bytes);
    
        return base32String.substring(0,11)
    }

    /**
     * Gets the unique attribute value of an object
     * @param object The object to get the unique attribute value for
     * @returns The unique attribute value as a string
     */
    export function getUniqueattributevalue(object: Item | Reference): string {
        if ("getUniqueattributevalue" in object) {
            return object.getUniqueattributevalue();
        } else {
            const uniqueAttribute = object.getUniqueattribute();
            const attributes = object.getAttributes();

            if (typeof attributes != "undefined") {
                const value = Util.getAttributeValue(attributes, uniqueAttribute);
                return String(value);
            } else {
                return ''
            }
        }
    }

    /**
     * Gets the value of a particular attribute. *Note:* that this only supports
     * attributes at the top level currently
     * @param attributes The attributes to query
     * @param name The name of the attribute you are looking for
     * @returns The value of the attribute
     */
    export function getAttributeValue(attributes: ItemAttributes, name: string): any {
        var object = attributes.getAttrstruct()?.toJavaScript()

        if (typeof object === "undefined") {
            return undefined;
        } else {
            return object[name];
        }
    }

    /**
     * Returns a reference to the supplied item
     * @param item The item that you want a reference to
     * @returns A reference to the supplied item
     */
    export function getReference(item: Item): Reference {
        const ref = new Reference();

        ref.setContext(item.getContext());
        ref.setType(item.getType());
        ref.setUniqueattributevalue(getUniqueattributevalue(item));
    
        return ref;    
    }

    /**
     * Convert a durationpb to javascript Date object
     * @param duration The duration object to convert
     * @returns A javascript `Date` object
     */
    export function toDate(duration: Duration): Date {
        return new Date(toMs(duration));
    }

    /**
     * Converts a number of milliseconds to a duration
     * @param ms The number of milliseconds
     */
    export function toDuration(ms: number): Duration {
        var d = new Duration();
        d.setSeconds(Math.floor(ms / 1000));
        d.setNanos((ms % 1000) * 1000000);
        return d;
    }

    export function toMs(duration: Duration): number {
        return (duration.getSeconds() * 1000) + (duration.getNanos() / 1_000_000)
    }

    export type ItemData = {
        type: string,
        uniqueAttribute: string,
        context: string,
        attributes: ItemAttributes,
        metadata: Metadata | undefined,
        linkedItemRequests: ItemRequest[],
        linkedItems: Reference[],
    }

    /**
     * Create a new `Item` object from a single object
     * @param details The details of the item you want to create
     * @returns A new Item object
     */
    export function newItem(details: ItemData): Item {
        const item = new Item();

        item.setType(details.type);
        item.setUniqueattribute(details.uniqueAttribute);
        item.setContext(details.context);
        item.setAttributes(details.attributes);

        if (typeof details.metadata != "undefined") {
            item.setMetadata(details.metadata);
        }

        item.setLinkeditemrequestsList(details.linkedItemRequests);
        item.setLinkeditemsList(details.linkedItems);

        return item;
    }

    /**
     * Creates a new ItemAttributes object from any javascript object that has
     * string keys
     * @param value Any object with string keys
     * @returns A new ItemAttributes object
     */
    export function newItemAttributes(value: {[key: string]: JavaScriptValue}): ItemAttributes {
        const attributes = new ItemAttributes();
        attributes.setAttrstruct(Struct.fromJavaScript(value));

        return attributes;
    }

    export type MetadataData = {
        sourceName: string,
        sourceRequest: ItemRequestData,
        timestamp: Date;
        sourceDuration: number; // milliseconds
        sourceDurationPerItem: number; // milliseconds
    }

    /**
     * Creates a new `Metadata` object from a object
     * @param data The metadata you want the new object to have
     * @returns A new Metadata object
     */
    export function newMetadata(data: MetadataData): Metadata {
        const m = new Metadata();

        m.setSourcename(data.sourceName);
        m.setSourcerequest(Util.newItemRequest(data.sourceRequest));

        const timestamp = new Timestamp();
        timestamp.fromDate(data.timestamp);
        m.setTimestamp(timestamp);

        const sourceDuration = new Duration();
        sourceDuration.setSeconds(Math.floor(data.sourceDuration / 1000));
        sourceDuration.setNanos((data.sourceDuration % 1000) * 1e6);
        m.setSourceduration(sourceDuration);
        
        const sourceDurationPerItem = new Duration();
        sourceDurationPerItem.setSeconds(Math.floor(data.sourceDurationPerItem / 1000));
        sourceDurationPerItem.setNanos((data.sourceDurationPerItem % 1000) * 1e6);
        m.setSourcedurationperitem(sourceDurationPerItem);

        return m;
    }

    export type ItemRequestErrorData = {
        context: string,
        errorString: string,
        errorType: ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap],
    }

    /**
     * Creates a new ItemRequestError from a single object
     * @param details The details of the error to create
     * @returns The new error object
     */
    export function newItemRequestError(details: ItemRequestErrorData): ItemRequestError {
        var err = new ItemRequestError();

        err.setContext(details.context);
        err.setErrorstring(details.errorString);
        err.setErrortype(details.errorType);

        return err;

    }

    export type ItemRequestData = {
        type: string,
        method: "GET" | "FIND" | "SEARCH",
        query: string,
        linkDepth: number,
        context: string,
        itemSubject: string,
        responseSubject: string,
        UUID: Uint8Array,
        timeoutMs?: number,
    }

    /**
     * Creates a new ItemRequest object from a single object
     * @param details The details that you want the new ItemRequest to have
     * @returns A new ItemRequest object
     */
    export function newItemRequest(details: ItemRequestData): ItemRequest {
        const r = new ItemRequest();

        r.setType(details.type);
        r.setMethod(convertRequestMethod(details.method));
        r.setQuery(details.query);
        r.setLinkdepth(details.linkDepth);
        r.setContext(details.context);
        r.setItemsubject(details.itemSubject);
        r.setResponsesubject(details.responseSubject);
        r.setUuid(details.UUID);
        
        if (typeof details.timeoutMs != 'undefined') {
            r.setTimeout(Util.toDuration(details.timeoutMs))
        }

        return r;
    }

    export type ReferenceData = {
        type: string,
        uniqueAttributeValue: string,
        context: string,
    }

    /**
     * Create a new Reference from a single object
     * @param details The details that you want the new reference to contain
     * @returns The new Reference object
     */
    export function newReference(details: ReferenceData): Reference {
        const r = new Reference();

        r.setType(details.type);
        r.setUniqueattributevalue(details.uniqueAttributeValue);
        r.setContext(details.context);

        return r;
    }

    export type ResponseData = {
        responder: string,
        state: ResponderStateMap[keyof ResponderStateMap]
        nextUpdateInMs?: number,
    }

    /**
     * Creates a new Response object from a single object
     * @param details The details you want the new Response object to have
     * @returns The new Response object
     */
    export function newResponse(details: ResponseData): Response {
        const r = new Response();

        r.setResponder(details.responder);
        r.setState(details.state);

        if (typeof details.nextUpdateInMs != 'undefined') {
            r.setNextupdatein(Util.toDuration(details.nextUpdateInMs));
        }

        return r;
    }

    export type CancelItemRequestData = {
        UUID: string | Uint8Array,
    }

    /**
     * Creates a new CancelItemRequest object from given params. Note that the
     * UUID can be provided as a string e.g.
     * "bcee962c-ca60-479b-8a96-ab970d878392" or directly uas a Uint8Array
     * @param details The details you want the new CancelItemRequest object to
     * have
     * @returns The new CancelItemRequest object
     */
    export function newCancelItemRequest(details: CancelItemRequestData): CancelItemRequest {
        const c = new CancelItemRequest();

        if (typeof details.UUID == "string") {
            var buffer = uuidParse(details.UUID);
            c.setUuid(Uint8Array.from(buffer))
        } else {
            c.setUuid(details.UUID)
        }

        return c;
    }

    /**
     * Creates a new GatewayRequest object. This is an abstraction that wraps
     * either an ItemRequest or a CancelItemRequest, along with a timeout
     * @param request The ItemRequest or CancelItemRequest to send
     * @param minStatusIntervalMs The minimum duration between status responses
     * @returns A new GatewayRequest
     */
    export function newGatewayRequest(request: ItemRequestData | CancelItemRequestData, minStatusIntervalMs: number): GatewayRequest {
        var gr = new GatewayRequest();
        
        if ('method' in request) {
            var ir = Util.newItemRequest(request);
            gr.setRequest(ir);
        } else {
            var cancel = Util.newCancelItemRequest(request);
            gr.setCancel(cancel);
        }

        if (minStatusIntervalMs > 0) {
            gr.setMinstatusinterval(Util.toDuration(minStatusIntervalMs));
        }

        return gr;
    }

    /**
     * Checks if a gateway request is done, this means that there are no more
     * responders working and all post-processing is complete
     * @param g The GatewayRequestStatus to check
     * @returns True of the request is done, false otherwise
     */
    export function gatewayRequestStatusDone(g: GatewayRequestStatus): boolean {
        var summary = g.getSummary()

        if (typeof summary != 'undefined') {
            return g.getPostprocessingcomplete() && (summary.getWorking() == 0)
        }

        return false
    }
}

/**
 * Represents something that is responding to our query
 */
export class Responder {
    name: string = "";
	lastStateTime: Date = new Date();
    nextStateTime: Date | undefined;
	error?: ItemRequestError;
	private _lastState: ResponderStateMap[keyof ResponderStateMap] = ResponderState.WORKING;

    /**
     *
     * @param responder The responder that this responder will respond for
     */
    constructor(name: string) {
        this.name = name;
        this.state = ResponderState.WORKING;
    }

    // Sets the state and updates the LastState to the current time
    set state(state: ResponderStateMap[keyof ResponderStateMap]) {
        // Set last state time to now
        this.lastStateTime = new Date();

        this._lastState = state;
    }

    // Get the last state of this responder
    get state(): ResponderStateMap[keyof ResponderStateMap] {
        return this._lastState;
    }
}

export class RequestProgress {
    responders: Map<string, Responder> = new Map<string, Responder>();
    request: ItemRequest;

    // This is the result of a setInterval which watches for timeouts and sets
    // nodes as stalled
    private watcher: NodeJS.Timeout;

    // Tracks the number of things currently being processed so that we can be
    // sure that all processing is complete before returning
    private inFlight: number = 0;

    /**
     *
     * @param request The request for which to track progress
     * @param stallCheckIntervalMs How often to check to see if responders have
     * stalled, in milliseconds
     */
    constructor(request: ItemRequest, stallCheckIntervalMs: number = 500) {
        this.request = request;

        // Start watching for stalls
        this.watcher = setInterval(() => {
            // Check to see if the request is complete, if it is we need to stop
            // checking
            if (this.allDone()) {
                clearInterval(this.watcher)
            }

            // Get the current time
            var now = new Date();

            // Loop over all results and check for stalls
            this.responders.forEach((responder) => {
                if (typeof responder.nextStateTime != 'undefined') {
                    if (responder.nextStateTime < now) {
                        // This means that the responder has stalled
                        responder.state = ResponderState.STALLED
                    }
                }
            })
        }, stallCheckIntervalMs)
    }

    // Return the count of items with a given state
    private countOfState(state: ResponderStateMap[keyof ResponderStateMap]): number {
        var x = 0;

        this.responders.forEach((v) => {
            if (v.state == state) {
                x++
            }
        })

        return x;
    }

    /**
     * Cancels loops that are watching for stalls
     */
    cancel(): void {
        clearInterval(this.watcher);
    }

    /**
     * 
     * @returns The number of responder still working
     */
    numWorking(): number {
        return this.countOfState(ResponderState.WORKING);
    }

    /**
     * 
     * @returns The number of stalled responders
     */
    numStalled(): number {
        return this.countOfState(ResponderState.STALLED);
    }

    /**
     * 
     * @returns The number of complete responders
     */
    numComplete(): number {
        return this.countOfState(ResponderState.COMPLETE);
    }

    /**
     * 
     * @returns The number of failed responders
     */
    numFailed(): number {
        return this.countOfState(ResponderState.ERROR);
    }

    /**
     * 
     * @returns The number of cancelled responders
     */
    numCancelled(): number {
        return this.countOfState(ResponderState.CANCELLED);
    }

    /**
     * 
     * @returns The total number of responders for the query
     */
    numResponders(): number {
        return this.responders.size;
    }

    /**
     * 
     * @returns True if all responders are done or stalled
     */
    allDone(): boolean {
        if (this.numResponders() > 0 && this.inFlight == 0) {
            return (this.numWorking() == 0)
        }

        return false
    }

    /**
     * Returns a number between 1 and 100 representing the percentage complete
     * of all responders.
     * @returns The percentage of complete responders
     */
    percentComplete(): number {
        return (this.numComplete() / this.numResponders()) * 100
    }

    /**
     * Waits for all to be completed, then returns
     * @param timeoutMs How long to wait before timing out
     * @returns "timeout" or "done"
     */
    async waitForCompletion(timeoutMs: number = 3000): Promise<string> {
        // How often to check for done-ness
        const doneCheckIntervalMs = 100;
        var doneChecker: number

        // Create the timeout promise
        const timeout = new Promise<string>(resolve => setTimeout(resolve, timeoutMs, "timeout"));

        // Create the done promise
        return new Promise<string>((resolve) => {
            doneChecker = setInterval(() => {
                if (this.allDone()) {
                    clearInterval(doneChecker);
                    resolve("done");
                }
            }, doneCheckIntervalMs, resolve)

            timeout.then(() => {
                clearInterval(doneChecker);
                resolve("timeout")
            })
        })
    }

    /**
     * Processes a response and updates tracking of responders.
     * @param response The response to process
     */
    processResponse(response: Response): void {
        this.inFlight++

        // Pull details out of the response
        const responderName = response.getResponder();
        var nextUpdateTime: Date | undefined = undefined;

        // Get the responder or create a new one
        var responder = this.responders.get(responderName) || new Responder(responderName);

        // If there is a next update time the calculate it
        var nextUpdateIn = response.getNextupdatein();
        if (typeof nextUpdateIn != 'undefined') {
            var nextUpdateMilliseconds: number = 0;

            // Convert nanoseconds to milliseconds
            nextUpdateMilliseconds = nextUpdateIn.getNanos() / 1000000

            // Convert seconds to milliseconds and add
            nextUpdateMilliseconds = nextUpdateMilliseconds + (nextUpdateIn.getSeconds() * 1000)

            // Create a new date object representing the date that the update is
            // expected by
            var now = new Date();
            nextUpdateTime = new Date(now.getTime() + nextUpdateMilliseconds);
        }

        // Set properties from the response
        responder.state = response.getState();
        responder.nextStateTime = nextUpdateTime;

        // Save the value
        this.responders.set(responderName, responder);

        this.inFlight--
    }
}

//
// Private helper functions
//
function convertRequestMethod(method: "GET" | "FIND" | "SEARCH"): RequestMethodMap[keyof RequestMethodMap] {
    switch(method) { 
        case 'GET': { 
           return RequestMethod.GET;
        } 
        case 'FIND': { 
            return RequestMethod.FIND;
        } 
        case 'SEARCH': { 
            return RequestMethod.SEARCH;
        } 
    }
}

// This is a copied and modified version of
// https://github.com/LinusU/base32-encode made to support my custom encoding
function base32EncodeCustom (data: Uint8Array): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'
    const padding = false;

    // For reasons that I cannot possibly fathom, it's possible (likely) that we
    // can be passed a Uint8Array that is not an instance of Uint8Array. Sounds
    // dumb right? Yes, yes it does. Someone smarter than me can probably
    // explain how this can be justified but it makes no sense to me, Reference:
    // https://medium.com/@simonwarta/limitations-of-the-instanceof-operator-f4bcdbe7a400
    const actualData = new Uint8Array(data);
    const view = toDataView(actualData)
  
    let bits = 0
    let value = 0
    let output = ''
  
    for (let i = 0; i < view.byteLength; i++) {
      value = (value << 8) | view.getUint8(i)
      bits += 8
  
      while (bits >= 5) {
        output += alphabet[(value >>> (bits - 5)) & 31]
        bits -= 5
      }
    }
  
    if (bits > 0) {
      output += alphabet[(value << (5 - bits)) & 31]
    }
  
    if (padding) {
      while ((output.length % 8) !== 0) {
        output += '='
      }
    }
  
    return output
}
