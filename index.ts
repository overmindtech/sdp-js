// This file contains the extra methods I want to add to the generated protobuf
// code

// Export things from other files
export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod } from './items_pb';
export { Response } from './responses_pb';

// Import things we need for the Util namespace
import { Reference, Item, ItemAttributes, Metadata, ItemRequest, RequestMethod, RequestMethodMap } from './items_pb';
import { Response, ItemRequestError } from './responses_pb';
import sha1 from 'sha1';
import toDataView from 'to-data-view';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue, Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

export namespace Util {
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
        return new Date((duration.getSeconds() * 1000) + (duration.getNanos() / 1000000));
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
        state: Response.ResponseStateMap[keyof Response.ResponseStateMap],
        nextUpdateInMs?: number,
        error?: ItemRequestError,
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

        if (typeof details.error != 'undefined') {
            r.setError(details.error);
        }

        return r;
    }
}

// The status of a given responder
export enum ResponderStatus {
    Working,
    Stalled,
    Complete,
    Failed,
}

/**
 * Represents something that is responding to our query
 */
export class Responder {
    name: string = "";
	lastStatusTime: Date = new Date();
    nextStatusTime: Date | undefined;
	error?: ItemRequestError;
	private _lastStatus: ResponderStatus = ResponderStatus.Complete;

    /**
     *
     * @param responder The responder that this responder will respond for
     */
    constructor(name: string) {
        this.name = name;
        this.status = ResponderStatus.Working;
    }

    // Sets the status and updates the LastStatus to the current time
    set status(status: ResponderStatus) {
        // Set last status time to now
        this.lastStatusTime = new Date();

        this._lastStatus = status;
    }

    // Get the last status of this responder
    get status(): ResponderStatus {
        return this._lastStatus;
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
                if (typeof responder.nextStatusTime != 'undefined') {
                    if (responder.nextStatusTime < now) {
                        // This means that the responder has stalled
                        responder.status = ResponderStatus.Stalled
                    }
                }
            })
        }, stallCheckIntervalMs)
    }

    // Return the count of items with a given status
    private countOfStatus(status: ResponderStatus): number {
        var x = 0;

        this.responders.forEach((v) => {
            if (v.status == status) {
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
        return this.countOfStatus(ResponderStatus.Working);
    }

    /**
     * 
     * @returns The number of stalled responders
     */
    numStalled(): number {
        return this.countOfStatus(ResponderStatus.Stalled);
    }

    /**
     * 
     * @returns The number of complete responders
     */
    numComplete(): number {
        return this.countOfStatus(ResponderStatus.Complete);
    }

    /**
     * 
     * @returns The number of failed responders
     */
    numFailed(): number {
        return this.countOfStatus(ResponderStatus.Failed);
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
     * Processes a response and updates tracking of responders. Note that the
     * SDP protocol is not currently capable of sending an error as a response.
     * The response is "DONE" then the error is sent on a different subject.
     * This means that we need to process errors also using `#processError()`
     * @param response The response to process
     */
    processResponse(response: Response): void {
        this.inFlight++

        // Pull details out of the response
        const responderName = response.getResponder();
        var status: ResponderStatus;
        var nextUpdateTime: Date | undefined = undefined;

        // Get the responder or create a new one
        var responder = this.responders.get(responderName) || new Responder(responderName);

        // Map states
        switch(response.getState()) {
            case Response.ResponseState.COMPLETE: {
                status = ResponderStatus.Complete;
                break;
            }
            case Response.ResponseState.WORKING: {
                status = ResponderStatus.Working;
                break;
            }
            case Response.ResponseState.ERROR: {
                status = ResponderStatus.Failed;
                responder.error = response.getError()
                break;
            }
        }

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
        responder.status = status;
        responder.nextStatusTime = nextUpdateTime;

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
function base32EncodeCustom (data: Uint8Array | ArrayBuffer | Int8Array | Uint8ClampedArray) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'
    const padding = false;
    const view = toDataView(data)
  
    let bits = 0
    let value = 0
    let output = ''
  
    for (var i = 0; i < view.byteLength; i++) {
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
