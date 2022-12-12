// This file contains the extra methods I want to add to the generated protobuf
// code

// Export things from other files
export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethod, CancelItemRequest, ReverseLinksRequest, ReverseLinksResponse } from './items_pb';
export { Response } from './responses_pb';
export { GatewayRequest, GatewayRequestStatus, GatewayResponse } from './gateway_pb'

// Import things we need for the Util namespace
import { Reference, Item, ItemAttributes, Metadata, ItemRequest, RequestMethod, CancelItemRequest, Edge } from './items_pb';
import { Response, ItemRequestError, ResponderState } from './responses_pb';
import sha1 from 'sha1';
import toDataView from 'to-data-view';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue, Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { parse as uuidParse, v4 as uuidv4 } from 'uuid';
import { GatewayRequest, GatewayRequestStatus, GatewayResponse } from './gateway_pb';

export namespace Util {
    /**
     * Generates a new random UUID
     * @returns A new UUIDv4 as a Uint8Array
     */
    export function newUUID(): Uint8Array {
        return Uint8Array.from(uuidParse(uuidv4()));
    }

    /**
     * Generates a new random UUID
     * @returns A new UUID as a string
     */
    export function newUUIDString(): string {
        return uuidv4();
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
        errorType: ItemRequestError.ErrorType,
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
        UUID: string | Uint8Array,
        itemSubject?: string,
        responseSubject?: string,
        errorSubject?: string,
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
        r.setItemsubject(details.itemSubject || '');
        r.setResponsesubject(details.responseSubject || '');
        r.setErrorsubject(details.errorSubject || '');

        if (typeof details.UUID == 'string') {
            r.setUuid(Uint8Array.from(uuidParse(details.UUID)));
        } else {
            r.setUuid(details.UUID);
        }
        
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
        state: ResponderState
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

    export type EdgeData = {
        from: ReferenceData,
        to: ReferenceData,
    }

    /**
     * Creates a new Edge object
     * @param data Data to be used in the object
     * @returns A new Edge object
     */
    export function newEdge(data: EdgeData): Edge {
        var e = new Edge();

        e.setFrom(Util.newReference(data.from));
        e.setTo(Util.newReference(data.to));

        return e;
    }

    export type GatewayRequestStatusData = {
        responderStates: Map<string, ResponderState>, 
        summary: {
            working: number,
            stalled: number,
            complete: number,
            error: number,
            cancelled: number,
            responders: number,      
        }
        postProcessingComplete: boolean,
    }

    export function newGatewayRequestStatus(data: GatewayRequestStatusData): GatewayRequestStatus {
        var grs = new GatewayRequestStatus();
        var responders = grs.getResponderstatesMap();
        var summary = new GatewayRequestStatus.Summary();

        for (let [responder, state] of data.responderStates) {
            responders.set(responder, state);
        }

        summary.setWorking(data.summary.working);
        summary.setStalled(data.summary.stalled);
        summary.setComplete(data.summary.complete);
        summary.setError(data.summary.error);
        summary.setCancelled(data.summary.cancelled);
        summary.setResponders(data.summary.responders);
        grs.setSummary(summary);

        grs.setPostprocessingcomplete(data.postProcessingComplete);

        return grs;
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

    export type GatewayResponseData = ItemData | EdgeData | ItemRequestErrorData | GatewayRequestStatusData | string

    function isItemData(x: any): x is ItemData {
        const hasType  = "type" in x
        const hasUniqueAttribute  = "uniqueAttribute" in x
        const hasContext  = "context" in x
        const hasAttributes  = "attributes" in x
        const hasMetadata  = "metadata" in x
        const hasLinkedItemRequests  = "linkedItemRequests" in x
        const hasLinkedItems  = "linkedItems" in x

        return hasType && hasUniqueAttribute && hasContext && hasAttributes && hasMetadata && hasLinkedItemRequests && hasLinkedItems
    }

    function isEdgeData(x: any): x is EdgeData {
        const hasFrom = ("from" in x);
        const hasTo = ("to" in x);

        return hasFrom && hasTo
    }

    function isItemRequestErrorData(x: any): x is ItemRequestErrorData {
        const hasContext = ("context" in x);
        const hasErrorString = ("errorString" in x);
        const hasErrorType = ("errorType" in x);

        return hasContext && hasErrorString && hasErrorType
    }

    function isGatewayRequestStatusData(x: any): x is GatewayRequestStatusData {
        const hasResponderStates = ("responderStates" in x);``
        const hasSummary = ("summary" in x);``
        const hasPostProcessingComplete = ("postProcessingComplete" in x);``

        return hasResponderStates && hasSummary && hasPostProcessingComplete
    }

    export function newGatewayResponse(data: GatewayResponseData): GatewayResponse {
        var gr = new GatewayResponse();

        if (typeof data == 'string') {
            gr.setError(data);
            return gr;
        } else if (typeof data == 'object') {
            if (isItemData(data)) {
                gr.setNewitem(Util.newItem(data));
                return gr;
            }
    
            if (isEdgeData(data)) {
                gr.setNewedge(Util.newEdge(data));
                return gr;
            }
            
            if (isItemRequestErrorData(data)) {
                gr.setNewitemrequesterror(Util.newItemRequestError(data));
                return gr;
            }
            
            if (isGatewayRequestStatusData(data)) {
                gr.setStatus(Util.newGatewayRequestStatus(data));
                return gr;
            }    
        }
        
        return gr;
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
	private _lastState: ResponderState = ResponderState.WORKING;

    /**
     *
     * @param responder The responder that this responder will respond for
     */
    constructor(name: string) {
        this.name = name;
        this.state = ResponderState.WORKING;
    }

    // Sets the state and updates the LastState to the current time
    set state(state: ResponderState) {
        // Set last state time to now
        this.lastStateTime = new Date();

        this._lastState = state;
    }

    // Get the last state of this responder
    get state(): ResponderState {
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
    private countOfState(state: ResponderState): number {
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
function convertRequestMethod(method: "GET" | "FIND" | "SEARCH"): RequestMethod {
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

interface CustomEventListener<T> {
    (evt: CustomEvent<T>): void;
}
interface CustomEventListenerObject<T> {
    handleEvent(object: CustomEvent<T>): void;
}
type CustomEventListenerOrEventListenerObject<T> = CustomEventListener<T> | CustomEventListenerObject<T>;

export class GatewaySession extends EventTarget {
    private socket: WebSocket
    ready: Promise<void>
    status?: GatewayRequestStatus.AsObject
    
    constructor(url: string) {
        super();

        this.socket = new WebSocket(url);
        this.socket.binaryType = "arraybuffer";
        
        this.ready = new Promise((resolve, reject) => {
            let rejecter = (event: Event) => {
                reject(event)
            }

            this.socket.addEventListener('error', rejecter, { once: true })
            this.socket.addEventListener('open', () => {
                this.removeEventListener('error', rejecter)
                resolve();
            }, { once: true })            
        });

        this.socket.addEventListener('error', (event) => {
            this.dispatchEvent(new CustomEvent<Event>(GatewaySession.SocketErrorEvent, {
                detail: event,
            }))
        });

        this.socket.addEventListener('close', (closeEvent) => {
            this.dispatchEvent(new CustomEvent<CloseEvent>(GatewaySession.CloseEvent, {
                detail: closeEvent,
            }))
        });

        this.socket.addEventListener("message", (ev: MessageEvent<ArrayBuffer>) => {
            this._processMessage(ev.data);
        });
    }
    
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer: ArrayBuffer): any {
        const binary = new Uint8Array(buffer);
        const response = GatewayResponse.deserializeBinary(binary);
        
        if (response.hasError()) {
            this.dispatchEvent(new CustomEvent<string>(GatewaySession.ErrorEvent, {
                detail: response.getError()
            }))
        } else if (response.hasNewitem()) {
            const item = response.getNewitem()
            
            if (typeof item != 'undefined') {
                this.dispatchEvent(new CustomEvent<Item>(GatewaySession.NewItemEvent, {
                    detail: item,
                }))
            }
        } else if (response.hasNewedge()) {
            const edge = response.getNewedge()
            
            if (typeof edge != 'undefined') {
                this.dispatchEvent(new CustomEvent<Edge>(GatewaySession.NewEdgeEvent, {
                    detail: edge,
                }))
            }
        } else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror()
            
            if (typeof e != 'undefined') {
                this.dispatchEvent(new CustomEvent<ItemRequestError>(GatewaySession.NewItemRequestErrorEvent, {
                    detail: e,
                }))
            }
        } else if (response.hasStatus()) {
            const status = response.getStatus();
            
            if (typeof status != 'undefined') {
                this.status = status.toObject();

                this.dispatchEvent(new CustomEvent<GatewayRequestStatus>(GatewaySession.StatusEvent, {
                    detail: status,
                }))

            }
        }
    }

    addEventListener(type: typeof GatewaySession.ErrorEvent, callback: CustomEventListenerOrEventListenerObject<string> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.NewItemEvent, callback: CustomEventListenerOrEventListenerObject<Item> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.NewEdgeEvent, callback: CustomEventListenerOrEventListenerObject<Edge> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.NewItemRequestErrorEvent, callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.StatusEvent, callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.SocketErrorEvent, callback: CustomEventListenerOrEventListenerObject<Event> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.CloseEvent, callback: CustomEventListenerOrEventListenerObject<CloseEvent> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void {
        super.addEventListener(type, callback, options);
    }

    removeEventListener(type: typeof GatewaySession.ErrorEvent, callback: CustomEventListenerOrEventListenerObject<string> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.NewItemEvent, callback: CustomEventListenerOrEventListenerObject<Item> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.NewEdgeEvent, callback: CustomEventListenerOrEventListenerObject<Edge> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.NewItemRequestErrorEvent, callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.StatusEvent, callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.SocketErrorEvent, callback: CustomEventListenerOrEventListenerObject<Event> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.CloseEvent, callback: CustomEventListenerOrEventListenerObject<CloseEvent> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void {
        super.removeEventListener(type, callback, options);
    }
    
    /**
    * Sends a request to the gateway
    * @param request The request to send
    */
    sendRequest(request: GatewayRequest) {
        var binary = request.serializeBinary();
        this.socket.send(binary);
    }
    
    /**
    * Closes the session
    */
    close() {
        this.socket.close();
    }
    
    /**
    * 
    * @returns The current state of the websocket connection
    */
    state(): typeof WebSocket.CONNECTING | typeof WebSocket.OPEN | typeof WebSocket.CLOSING | typeof WebSocket.CLOSED {
        return this.socket.readyState;
    }
}

export namespace GatewaySession {
    // Here I'm storing the event types so that they have some central documentation. This means that I can document the event types without having to rewrite it for each `on`, `off` etc.

    /**
     * An error event is sent when the gateway itself encounters an error when
     * running the request. An error here means that the request wasn't started
     */
    export const ErrorEvent = 'error'

    /**
     * Ths event is sent when a new item is discovered as a result of the
     * queries that have been started during the session
     */
    export const NewItemEvent = 'new-item'

    /**
     * This event is sent when a new edge between two items is discovered. Note
     * that edges will only be sent after both items have been sent, so an edge
     * should never refer to a non-existent item
     */
    export const NewEdgeEvent = 'new-edge'

    /**
     * This event means that an error was encountered by one of the responders
     * when responding to the request. This could indicate a failure, or might
     * be expected. It s up to the user to determine how these errors should be
     * surfaced and handled
     */
    export const NewItemRequestErrorEvent = 'item-request-error'

    /**
     * Status events are sent at an interval determined in the `GatewayRequest`,
     * subsequent gateway requests will update the interval. If the status has
     * not changed since the last interval elapsed, nothing will be sent
     */
    export const StatusEvent = 'status'

    /**
     * Socket errors are errors surfaced from the underlying websocket
     * connection itself and usually mean there has been some network-level
     * issue
     */
    export const SocketErrorEvent = 'socket-error'

    /**
     * Closed events are sent when a connection is closed
     */
    export const CloseEvent = 'close'
}

/**
 * Result that combines the actual result with the score
 */
type AutocompleteResult = {
    value: string
    score: number,
}

export enum AutocompleteField {
    TYPE = 0,
    CONTEXT = 1,
}

/**
 * I'm not really sure what the API should look like for autocomplete, as in how
 * the data should come in and out. I'm going to take a stab but once we know
 * how it'll be consumed by the front end we should change it to be more
 * appropriate
 */
export class Autocomplete {
    field: AutocompleteField;
    results: AutocompleteResult[] = [];

    private _prompt: string = "";
    private session: GatewaySession;
    private currentRequestUUID: string = "";

    /**
     * 
     * @param session The gateway session that requests should be sent on
     */
    constructor(session: GatewaySession, field: AutocompleteField) {
        if (session.state() != WebSocket.OPEN) {
            // We are failing here because I can't find a good spot in this API
            // to put an async method. If we review this later we might want to
            // remove this requirement and just have the object be smart enough
            // to wait until the session is ready before sending anything
            throw new Error("session must be OPEN for autocomplete");
        }

        this.session = session;
        this.field = field;

        // Listen for results
        this.session.addEventListener('new-item', (item) => this.processItem(item.detail))
    }

    /**
     * The suggested type values for the provided typePrompt
     */
    get suggestions(): string[] {
        return this.results.map((result) => result.value)
    }

    /**
     * The prompt to search for
     */
    get prompt(): string {
        return this._prompt;
    }

    /**
     * The prompt to search for
     */
    set prompt(prompt: string) {
        this._prompt = prompt;

        if (this.currentRequestUUID !== '') {
            // Cancel any running requests
            this.session.sendRequest(Util.newGatewayRequest({
                UUID: this.currentRequestUUID,
            }, 1000))
        }
        

        // Delete current autocomplete options
        this.results = [];

        const uuid = Util.newUUIDString()

        let type: string

        switch (this.field) {
            case AutocompleteField.CONTEXT:
                type = 'overmind-context'
                break;
            case AutocompleteField.TYPE:
                type = 'overmind-type'
                break;
        }

        // Create a new request
        let request = Util.newGatewayRequest({
            context: "global",
            linkDepth: 0,
            type: type,
            method: 'SEARCH',
            query: prompt,
            UUID: uuid,
            timeoutMs: 2_000,
        }, 500)
        
        // Set the UUID so we know which responses to use and which to ignore
        this.currentRequestUUID = uuid

        // Start the request
        this.session.sendRequest(request);
    }


    /**
     * Processes incoming items and extracts autocomplete responses
     * 
     * @param item The item to process
     */
    private processItem(item: Item):void {
        if (item.getMetadata()?.getSourcerequest()?.getUuid_asB64() == this.currentRequestUUID) {
            let score: number = 0;
            let attributes = item.getAttributes();

            if (attributes !== undefined) {
                score = Util.getAttributeValue(attributes, "score")
            }

            // Add the result
            this.results.push({
                value: Util.getUniqueattributevalue(item),
                score: score,
            })

            // Re-sort
            this.results.sort((a, b) => a.score - b.score)
        }
    }
}
