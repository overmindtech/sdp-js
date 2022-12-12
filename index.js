"use strict";
// This file contains the extra methods I want to add to the generated protobuf
// code
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autocomplete = exports.AutocompleteField = exports.GatewaySession = exports.RequestProgress = exports.Responder = exports.Util = exports.GatewayResponse = exports.GatewayRequestStatus = exports.GatewayRequest = exports.Response = exports.ReverseLinksResponse = exports.ReverseLinksRequest = exports.CancelItemRequest = exports.RequestMethod = exports.Metadata = exports.Reference = exports.Items = exports.Item = exports.ItemAttributes = exports.ItemRequest = void 0;
// Export things from other files
var items_pb_1 = require("./items_pb");
Object.defineProperty(exports, "ItemRequest", { enumerable: true, get: function () { return items_pb_1.ItemRequest; } });
Object.defineProperty(exports, "ItemAttributes", { enumerable: true, get: function () { return items_pb_1.ItemAttributes; } });
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return items_pb_1.Item; } });
Object.defineProperty(exports, "Items", { enumerable: true, get: function () { return items_pb_1.Items; } });
Object.defineProperty(exports, "Reference", { enumerable: true, get: function () { return items_pb_1.Reference; } });
Object.defineProperty(exports, "Metadata", { enumerable: true, get: function () { return items_pb_1.Metadata; } });
Object.defineProperty(exports, "RequestMethod", { enumerable: true, get: function () { return items_pb_1.RequestMethod; } });
Object.defineProperty(exports, "CancelItemRequest", { enumerable: true, get: function () { return items_pb_1.CancelItemRequest; } });
Object.defineProperty(exports, "ReverseLinksRequest", { enumerable: true, get: function () { return items_pb_1.ReverseLinksRequest; } });
Object.defineProperty(exports, "ReverseLinksResponse", { enumerable: true, get: function () { return items_pb_1.ReverseLinksResponse; } });
var responses_pb_1 = require("./responses_pb");
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return responses_pb_1.Response; } });
var gateway_pb_1 = require("./gateway_pb");
Object.defineProperty(exports, "GatewayRequest", { enumerable: true, get: function () { return gateway_pb_1.GatewayRequest; } });
Object.defineProperty(exports, "GatewayRequestStatus", { enumerable: true, get: function () { return gateway_pb_1.GatewayRequestStatus; } });
Object.defineProperty(exports, "GatewayResponse", { enumerable: true, get: function () { return gateway_pb_1.GatewayResponse; } });
// Import things we need for the Util namespace
const items_pb_2 = require("./items_pb");
const responses_pb_2 = require("./responses_pb");
const sha1_1 = __importDefault(require("sha1"));
const to_data_view_1 = __importDefault(require("to-data-view"));
const duration_pb_1 = require("google-protobuf/google/protobuf/duration_pb");
const struct_pb_1 = require("google-protobuf/google/protobuf/struct_pb");
const timestamp_pb_1 = require("google-protobuf/google/protobuf/timestamp_pb");
const uuid_1 = require("uuid");
const gateway_pb_2 = require("./gateway_pb");
var Util;
(function (Util) {
    /**
     * Generates a new random UUID
     * @returns A new UUIDv4 as a Uint8Array
     */
    function newUUID() {
        return Uint8Array.from((0, uuid_1.parse)((0, uuid_1.v4)()));
    }
    Util.newUUID = newUUID;
    /**
     * Generates a new random UUID
     * @returns A new UUID as a string
     */
    function newUUIDString() {
        return (0, uuid_1.v4)();
    }
    Util.newUUIDString = newUUIDString;
    /**
     * Gets the globally unique name of an object
     * @param object The object to get the globally unique name from
     * @returns The globally unique name
     */
    function getGloballyuniquename(object) {
        const elements = [
            object.getContext(),
            object.getType(),
            getUniqueattributevalue(object),
        ];
        return elements.join(".");
    }
    Util.getGloballyuniquename = getGloballyuniquename;
    /**
     * **(Experimental)** Gets the unique hash for the object. Used for database uniqueness.
     * @param object The object to calculate the hash for
     * @returns The hash as a string
     */
    function getHash(object) {
        const bytes = (0, sha1_1.default)(getGloballyuniquename(object), {
            asBytes: true,
        });
        const base32String = base32EncodeCustom(bytes);
        return base32String.substring(0, 11);
    }
    Util.getHash = getHash;
    /**
     * Gets the unique attribute value of an object
     * @param object The object to get the unique attribute value for
     * @returns The unique attribute value as a string
     */
    function getUniqueattributevalue(object) {
        if ("getUniqueattributevalue" in object) {
            return object.getUniqueattributevalue();
        }
        else {
            const uniqueAttribute = object.getUniqueattribute();
            const attributes = object.getAttributes();
            if (typeof attributes != "undefined") {
                const value = Util.getAttributeValue(attributes, uniqueAttribute);
                return String(value);
            }
            else {
                return '';
            }
        }
    }
    Util.getUniqueattributevalue = getUniqueattributevalue;
    /**
     * Gets the value of a particular attribute. *Note:* that this only supports
     * attributes at the top level currently
     * @param attributes The attributes to query
     * @param name The name of the attribute you are looking for
     * @returns The value of the attribute
     */
    function getAttributeValue(attributes, name) {
        var _a;
        var object = (_a = attributes.getAttrstruct()) === null || _a === void 0 ? void 0 : _a.toJavaScript();
        if (typeof object === "undefined") {
            return undefined;
        }
        else {
            return object[name];
        }
    }
    Util.getAttributeValue = getAttributeValue;
    /**
     * Returns a reference to the supplied item
     * @param item The item that you want a reference to
     * @returns A reference to the supplied item
     */
    function getReference(item) {
        const ref = new items_pb_2.Reference();
        ref.setContext(item.getContext());
        ref.setType(item.getType());
        ref.setUniqueattributevalue(getUniqueattributevalue(item));
        return ref;
    }
    Util.getReference = getReference;
    /**
     * Convert a durationpb to javascript Date object
     * @param duration The duration object to convert
     * @returns A javascript `Date` object
     */
    function toDate(duration) {
        return new Date(toMs(duration));
    }
    Util.toDate = toDate;
    /**
     * Converts a number of milliseconds to a duration
     * @param ms The number of milliseconds
     */
    function toDuration(ms) {
        var d = new duration_pb_1.Duration();
        d.setSeconds(Math.floor(ms / 1000));
        d.setNanos((ms % 1000) * 1000000);
        return d;
    }
    Util.toDuration = toDuration;
    function toMs(duration) {
        return (duration.getSeconds() * 1000) + (duration.getNanos() / 1000000);
    }
    Util.toMs = toMs;
    /**
     * Create a new `Item` object from a single object
     * @param details The details of the item you want to create
     * @returns A new Item object
     */
    function newItem(details) {
        const item = new items_pb_2.Item();
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
    Util.newItem = newItem;
    /**
     * Creates a new ItemAttributes object from any javascript object that has
     * string keys
     * @param value Any object with string keys
     * @returns A new ItemAttributes object
     */
    function newItemAttributes(value) {
        const attributes = new items_pb_2.ItemAttributes();
        attributes.setAttrstruct(struct_pb_1.Struct.fromJavaScript(value));
        return attributes;
    }
    Util.newItemAttributes = newItemAttributes;
    /**
     * Creates a new `Metadata` object from a object
     * @param data The metadata you want the new object to have
     * @returns A new Metadata object
     */
    function newMetadata(data) {
        const m = new items_pb_2.Metadata();
        m.setSourcename(data.sourceName);
        m.setSourcerequest(Util.newItemRequest(data.sourceRequest));
        const timestamp = new timestamp_pb_1.Timestamp();
        timestamp.fromDate(data.timestamp);
        m.setTimestamp(timestamp);
        const sourceDuration = new duration_pb_1.Duration();
        sourceDuration.setSeconds(Math.floor(data.sourceDuration / 1000));
        sourceDuration.setNanos((data.sourceDuration % 1000) * 1e6);
        m.setSourceduration(sourceDuration);
        const sourceDurationPerItem = new duration_pb_1.Duration();
        sourceDurationPerItem.setSeconds(Math.floor(data.sourceDurationPerItem / 1000));
        sourceDurationPerItem.setNanos((data.sourceDurationPerItem % 1000) * 1e6);
        m.setSourcedurationperitem(sourceDurationPerItem);
        return m;
    }
    Util.newMetadata = newMetadata;
    /**
     * Creates a new ItemRequestError from a single object
     * @param details The details of the error to create
     * @returns The new error object
     */
    function newItemRequestError(details) {
        var err = new responses_pb_2.ItemRequestError();
        err.setContext(details.context);
        err.setErrorstring(details.errorString);
        err.setErrortype(details.errorType);
        return err;
    }
    Util.newItemRequestError = newItemRequestError;
    /**
     * Creates a new ItemRequest object from a single object
     * @param details The details that you want the new ItemRequest to have
     * @returns A new ItemRequest object
     */
    function newItemRequest(details) {
        const r = new items_pb_2.ItemRequest();
        r.setType(details.type);
        r.setMethod(convertRequestMethod(details.method));
        r.setQuery(details.query);
        r.setLinkdepth(details.linkDepth);
        r.setContext(details.context);
        r.setItemsubject(details.itemSubject || '');
        r.setResponsesubject(details.responseSubject || '');
        r.setErrorsubject(details.errorSubject || '');
        if (typeof details.UUID == 'string') {
            r.setUuid(Uint8Array.from((0, uuid_1.parse)(details.UUID)));
        }
        else {
            r.setUuid(details.UUID);
        }
        if (typeof details.timeoutMs != 'undefined') {
            r.setTimeout(Util.toDuration(details.timeoutMs));
        }
        return r;
    }
    Util.newItemRequest = newItemRequest;
    /**
     * Create a new Reference from a single object
     * @param details The details that you want the new reference to contain
     * @returns The new Reference object
     */
    function newReference(details) {
        const r = new items_pb_2.Reference();
        r.setType(details.type);
        r.setUniqueattributevalue(details.uniqueAttributeValue);
        r.setContext(details.context);
        return r;
    }
    Util.newReference = newReference;
    /**
     * Creates a new Response object from a single object
     * @param details The details you want the new Response object to have
     * @returns The new Response object
     */
    function newResponse(details) {
        const r = new responses_pb_2.Response();
        r.setResponder(details.responder);
        r.setState(details.state);
        if (typeof details.nextUpdateInMs != 'undefined') {
            r.setNextupdatein(Util.toDuration(details.nextUpdateInMs));
        }
        return r;
    }
    Util.newResponse = newResponse;
    /**
     * Creates a new CancelItemRequest object from given params. Note that the
     * UUID can be provided as a string e.g.
     * "bcee962c-ca60-479b-8a96-ab970d878392" or directly uas a Uint8Array
     * @param details The details you want the new CancelItemRequest object to
     * have
     * @returns The new CancelItemRequest object
     */
    function newCancelItemRequest(details) {
        const c = new items_pb_2.CancelItemRequest();
        if (typeof details.UUID == "string") {
            var buffer = (0, uuid_1.parse)(details.UUID);
            c.setUuid(Uint8Array.from(buffer));
        }
        else {
            c.setUuid(details.UUID);
        }
        return c;
    }
    Util.newCancelItemRequest = newCancelItemRequest;
    /**
     * Creates a new Edge object
     * @param data Data to be used in the object
     * @returns A new Edge object
     */
    function newEdge(data) {
        var e = new items_pb_2.Edge();
        e.setFrom(Util.newReference(data.from));
        e.setTo(Util.newReference(data.to));
        return e;
    }
    Util.newEdge = newEdge;
    function newGatewayRequestStatus(data) {
        var grs = new gateway_pb_2.GatewayRequestStatus();
        var responders = grs.getResponderstatesMap();
        var summary = new gateway_pb_2.GatewayRequestStatus.Summary();
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
    Util.newGatewayRequestStatus = newGatewayRequestStatus;
    /**
     * Creates a new GatewayRequest object. This is an abstraction that wraps
     * either an ItemRequest or a CancelItemRequest, along with a timeout
     * @param request The ItemRequest or CancelItemRequest to send
     * @param minStatusIntervalMs The minimum duration between status responses
     * @returns A new GatewayRequest
     */
    function newGatewayRequest(request, minStatusIntervalMs) {
        var gr = new gateway_pb_2.GatewayRequest();
        if ('method' in request) {
            var ir = Util.newItemRequest(request);
            gr.setRequest(ir);
        }
        else {
            var cancel = Util.newCancelItemRequest(request);
            gr.setCancel(cancel);
        }
        if (minStatusIntervalMs > 0) {
            gr.setMinstatusinterval(Util.toDuration(minStatusIntervalMs));
        }
        return gr;
    }
    Util.newGatewayRequest = newGatewayRequest;
    /**
     * Checks if a gateway request is done, this means that there are no more
     * responders working and all post-processing is complete
     * @param g The GatewayRequestStatus to check
     * @returns True of the request is done, false otherwise
     */
    function gatewayRequestStatusDone(g) {
        var summary = g.getSummary();
        if (typeof summary != 'undefined') {
            return g.getPostprocessingcomplete() && (summary.getWorking() == 0);
        }
        return false;
    }
    Util.gatewayRequestStatusDone = gatewayRequestStatusDone;
    function isItemData(x) {
        const hasType = "type" in x;
        const hasUniqueAttribute = "uniqueAttribute" in x;
        const hasContext = "context" in x;
        const hasAttributes = "attributes" in x;
        const hasMetadata = "metadata" in x;
        const hasLinkedItemRequests = "linkedItemRequests" in x;
        const hasLinkedItems = "linkedItems" in x;
        return hasType && hasUniqueAttribute && hasContext && hasAttributes && hasMetadata && hasLinkedItemRequests && hasLinkedItems;
    }
    function isEdgeData(x) {
        const hasFrom = ("from" in x);
        const hasTo = ("to" in x);
        return hasFrom && hasTo;
    }
    function isItemRequestErrorData(x) {
        const hasContext = ("context" in x);
        const hasErrorString = ("errorString" in x);
        const hasErrorType = ("errorType" in x);
        return hasContext && hasErrorString && hasErrorType;
    }
    function isGatewayRequestStatusData(x) {
        const hasResponderStates = ("responderStates" in x);
        ``;
        const hasSummary = ("summary" in x);
        ``;
        const hasPostProcessingComplete = ("postProcessingComplete" in x);
        ``;
        return hasResponderStates && hasSummary && hasPostProcessingComplete;
    }
    function newGatewayResponse(data) {
        var gr = new gateway_pb_2.GatewayResponse();
        if (typeof data == 'string') {
            gr.setError(data);
            return gr;
        }
        else if (typeof data == 'object') {
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
    Util.newGatewayResponse = newGatewayResponse;
})(Util = exports.Util || (exports.Util = {}));
/**
 * Represents something that is responding to our query
 */
class Responder {
    /**
     *
     * @param responder The responder that this responder will respond for
     */
    constructor(name) {
        this.name = "";
        this.lastStateTime = new Date();
        this._lastState = responses_pb_2.ResponderState.WORKING;
        this.name = name;
        this.state = responses_pb_2.ResponderState.WORKING;
    }
    // Sets the state and updates the LastState to the current time
    set state(state) {
        // Set last state time to now
        this.lastStateTime = new Date();
        this._lastState = state;
    }
    // Get the last state of this responder
    get state() {
        return this._lastState;
    }
}
exports.Responder = Responder;
class RequestProgress {
    /**
     *
     * @param request The request for which to track progress
     * @param stallCheckIntervalMs How often to check to see if responders have
     * stalled, in milliseconds
     */
    constructor(request, stallCheckIntervalMs = 500) {
        this.responders = new Map();
        // Tracks the number of things currently being processed so that we can be
        // sure that all processing is complete before returning
        this.inFlight = 0;
        this.request = request;
        // Start watching for stalls
        this.watcher = setInterval(() => {
            // Check to see if the request is complete, if it is we need to stop
            // checking
            if (this.allDone()) {
                clearInterval(this.watcher);
            }
            // Get the current time
            var now = new Date();
            // Loop over all results and check for stalls
            this.responders.forEach((responder) => {
                if (typeof responder.nextStateTime != 'undefined') {
                    if (responder.nextStateTime < now) {
                        // This means that the responder has stalled
                        responder.state = responses_pb_2.ResponderState.STALLED;
                    }
                }
            });
        }, stallCheckIntervalMs);
    }
    // Return the count of items with a given state
    countOfState(state) {
        var x = 0;
        this.responders.forEach((v) => {
            if (v.state == state) {
                x++;
            }
        });
        return x;
    }
    /**
     * Cancels loops that are watching for stalls
     */
    cancel() {
        clearInterval(this.watcher);
    }
    /**
     *
     * @returns The number of responder still working
     */
    numWorking() {
        return this.countOfState(responses_pb_2.ResponderState.WORKING);
    }
    /**
     *
     * @returns The number of stalled responders
     */
    numStalled() {
        return this.countOfState(responses_pb_2.ResponderState.STALLED);
    }
    /**
     *
     * @returns The number of complete responders
     */
    numComplete() {
        return this.countOfState(responses_pb_2.ResponderState.COMPLETE);
    }
    /**
     *
     * @returns The number of failed responders
     */
    numFailed() {
        return this.countOfState(responses_pb_2.ResponderState.ERROR);
    }
    /**
     *
     * @returns The number of cancelled responders
     */
    numCancelled() {
        return this.countOfState(responses_pb_2.ResponderState.CANCELLED);
    }
    /**
     *
     * @returns The total number of responders for the query
     */
    numResponders() {
        return this.responders.size;
    }
    /**
     *
     * @returns True if all responders are done or stalled
     */
    allDone() {
        if (this.numResponders() > 0 && this.inFlight == 0) {
            return (this.numWorking() == 0);
        }
        return false;
    }
    /**
     * Returns a number between 1 and 100 representing the percentage complete
     * of all responders.
     * @returns The percentage of complete responders
     */
    percentComplete() {
        return (this.numComplete() / this.numResponders()) * 100;
    }
    /**
     * Waits for all to be completed, then returns
     * @param timeoutMs How long to wait before timing out
     * @returns "timeout" or "done"
     */
    waitForCompletion(timeoutMs = 3000) {
        return __awaiter(this, void 0, void 0, function* () {
            // How often to check for done-ness
            const doneCheckIntervalMs = 100;
            var doneChecker;
            // Create the timeout promise
            const timeout = new Promise(resolve => setTimeout(resolve, timeoutMs, "timeout"));
            // Create the done promise
            return new Promise((resolve) => {
                doneChecker = setInterval(() => {
                    if (this.allDone()) {
                        clearInterval(doneChecker);
                        resolve("done");
                    }
                }, doneCheckIntervalMs, resolve);
                timeout.then(() => {
                    clearInterval(doneChecker);
                    resolve("timeout");
                });
            });
        });
    }
    /**
     * Processes a response and updates tracking of responders.
     * @param response The response to process
     */
    processResponse(response) {
        this.inFlight++;
        // Pull details out of the response
        const responderName = response.getResponder();
        var nextUpdateTime = undefined;
        // Get the responder or create a new one
        var responder = this.responders.get(responderName) || new Responder(responderName);
        // If there is a next update time the calculate it
        var nextUpdateIn = response.getNextupdatein();
        if (typeof nextUpdateIn != 'undefined') {
            var nextUpdateMilliseconds = 0;
            // Convert nanoseconds to milliseconds
            nextUpdateMilliseconds = nextUpdateIn.getNanos() / 1000000;
            // Convert seconds to milliseconds and add
            nextUpdateMilliseconds = nextUpdateMilliseconds + (nextUpdateIn.getSeconds() * 1000);
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
        this.inFlight--;
    }
}
exports.RequestProgress = RequestProgress;
//
// Private helper functions
//
function convertRequestMethod(method) {
    switch (method) {
        case 'GET': {
            return items_pb_2.RequestMethod.GET;
        }
        case 'FIND': {
            return items_pb_2.RequestMethod.FIND;
        }
        case 'SEARCH': {
            return items_pb_2.RequestMethod.SEARCH;
        }
    }
}
// This is a copied and modified version of
// https://github.com/LinusU/base32-encode made to support my custom encoding
function base32EncodeCustom(data) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF';
    const padding = false;
    // For reasons that I cannot possibly fathom, it's possible (likely) that we
    // can be passed a Uint8Array that is not an instance of Uint8Array. Sounds
    // dumb right? Yes, yes it does. Someone smarter than me can probably
    // explain how this can be justified but it makes no sense to me, Reference:
    // https://medium.com/@simonwarta/limitations-of-the-instanceof-operator-f4bcdbe7a400
    const actualData = new Uint8Array(data);
    const view = (0, to_data_view_1.default)(actualData);
    let bits = 0;
    let value = 0;
    let output = '';
    for (let i = 0; i < view.byteLength; i++) {
        value = (value << 8) | view.getUint8(i);
        bits += 8;
        while (bits >= 5) {
            output += alphabet[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += alphabet[(value << (5 - bits)) & 31];
    }
    if (padding) {
        while ((output.length % 8) !== 0) {
            output += '=';
        }
    }
    return output;
}
class GatewaySession extends EventTarget {
    constructor(url) {
        super();
        this.socket = new WebSocket(url);
        this.socket.binaryType = "arraybuffer";
        this.ready = new Promise((resolve, reject) => {
            let rejecter = (event) => {
                reject(event);
            };
            this.socket.addEventListener('error', rejecter, { once: true });
            this.socket.addEventListener('open', () => {
                this.removeEventListener('error', rejecter);
                resolve();
            }, { once: true });
        });
        this.socket.addEventListener('error', (event) => {
            this.dispatchEvent(new CustomEvent(GatewaySession.SocketErrorEvent, {
                detail: event,
            }));
        });
        this.socket.addEventListener('close', (closeEvent) => {
            this.dispatchEvent(new CustomEvent(GatewaySession.CloseEvent, {
                detail: closeEvent,
            }));
        });
        this.socket.addEventListener("message", (ev) => {
            this._processMessage(ev.data);
        });
    }
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer) {
        const binary = new Uint8Array(buffer);
        const response = gateway_pb_2.GatewayResponse.deserializeBinary(binary);
        if (response.hasError()) {
            this.dispatchEvent(new CustomEvent(GatewaySession.ErrorEvent, {
                detail: response.getError()
            }));
        }
        else if (response.hasNewitem()) {
            const item = response.getNewitem();
            if (typeof item != 'undefined') {
                this.dispatchEvent(new CustomEvent(GatewaySession.NewItemEvent, {
                    detail: item,
                }));
            }
        }
        else if (response.hasNewedge()) {
            const edge = response.getNewedge();
            if (typeof edge != 'undefined') {
                this.dispatchEvent(new CustomEvent(GatewaySession.NewEdgeEvent, {
                    detail: edge,
                }));
            }
        }
        else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror();
            if (typeof e != 'undefined') {
                this.dispatchEvent(new CustomEvent(GatewaySession.NewItemRequestErrorEvent, {
                    detail: e,
                }));
            }
        }
        else if (response.hasStatus()) {
            const status = response.getStatus();
            if (typeof status != 'undefined') {
                this.status = status.toObject();
                this.dispatchEvent(new CustomEvent(GatewaySession.StatusEvent, {
                    detail: status,
                }));
            }
        }
    }
    addEventListener(type, callback, options) {
        super.addEventListener(type, callback, options);
    }
    removeEventListener(type, callback, options) {
        super.removeEventListener(type, callback, options);
    }
    /**
    * Sends a request to the gateway
    * @param request The request to send
    */
    sendRequest(request) {
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
    state() {
        return this.socket.readyState;
    }
}
exports.GatewaySession = GatewaySession;
(function (GatewaySession) {
    // Here I'm storing the event types so that they have some central documentation. This means that I can document the event types without having to rewrite it for each `on`, `off` etc.
    /**
     * An error event is sent when the gateway itself encounters an error when
     * running the request. An error here means that the request wasn't started
     */
    GatewaySession.ErrorEvent = 'error';
    /**
     * Ths event is sent when a new item is discovered as a result of the
     * queries that have been started during the session
     */
    GatewaySession.NewItemEvent = 'new-item';
    /**
     * This event is sent when a new edge between two items is discovered. Note
     * that edges will only be sent after both items have been sent, so an edge
     * should never refer to a non-existent item
     */
    GatewaySession.NewEdgeEvent = 'new-edge';
    /**
     * This event means that an error was encountered by one of the responders
     * when responding to the request. This could indicate a failure, or might
     * be expected. It s up to the user to determine how these errors should be
     * surfaced and handled
     */
    GatewaySession.NewItemRequestErrorEvent = 'item-request-error';
    /**
     * Status events are sent at an interval determined in the `GatewayRequest`,
     * subsequent gateway requests will update the interval. If the status has
     * not changed since the last interval elapsed, nothing will be sent
     */
    GatewaySession.StatusEvent = 'status';
    /**
     * Socket errors are errors surfaced from the underlying websocket
     * connection itself and usually mean there has been some network-level
     * issue
     */
    GatewaySession.SocketErrorEvent = 'socket-error';
    /**
     * Closed events are sent when a connection is closed
     */
    GatewaySession.CloseEvent = 'close';
})(GatewaySession = exports.GatewaySession || (exports.GatewaySession = {}));
var AutocompleteField;
(function (AutocompleteField) {
    AutocompleteField[AutocompleteField["TYPE"] = 0] = "TYPE";
    AutocompleteField[AutocompleteField["CONTEXT"] = 1] = "CONTEXT";
})(AutocompleteField = exports.AutocompleteField || (exports.AutocompleteField = {}));
/**
 * I'm not really sure what the API should look like for autocomplete, as in how
 * the data should come in and out. I'm going to take a stab but once we know
 * how it'll be consumed by the front end we should change it to be more
 * appropriate
 */
class Autocomplete {
    /**
     *
     * @param session The gateway session that requests should be sent on
     */
    constructor(session, field) {
        this.results = [];
        this._prompt = "";
        this.currentRequestUUID = "";
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
        this.session.addEventListener('new-item', (item) => this.processItem(item.detail));
    }
    /**
     * The suggested type values for the provided typePrompt
     */
    get suggestions() {
        return this.results.map((result) => result.value);
    }
    /**
     * The prompt to search for
     */
    get prompt() {
        return this._prompt;
    }
    /**
     * The prompt to search for
     */
    set prompt(prompt) {
        this._prompt = prompt;
        if (this.currentRequestUUID !== '') {
            // Cancel any running requests
            this.session.sendRequest(Util.newGatewayRequest({
                UUID: this.currentRequestUUID,
            }, 1000));
        }
        // Delete current autocomplete options
        this.results = [];
        const uuid = Util.newUUIDString();
        let type;
        switch (this.field) {
            case AutocompleteField.CONTEXT:
                type = 'overmind-context';
                break;
            case AutocompleteField.TYPE:
                type = 'overmind-type';
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
            timeoutMs: 2000,
        }, 500);
        // Set the UUID so we know which responses to use and which to ignore
        this.currentRequestUUID = uuid;
        // Start the request
        this.session.sendRequest(request);
    }
    /**
     * Processes incoming items and extracts autocomplete responses
     *
     * @param item The item to process
     */
    processItem(item) {
        var _a, _b;
        let itemUUID = (_b = (_a = item.getMetadata()) === null || _a === void 0 ? void 0 : _a.getSourcerequest()) === null || _b === void 0 ? void 0 : _b.getUuid_asU8();
        if (typeof itemUUID != 'undefined') {
            let itemUUIDString = (0, uuid_1.stringify)(itemUUID);
            if (itemUUIDString == this.currentRequestUUID) {
                let score = 0;
                let attributes = item.getAttributes();
                if (attributes !== undefined) {
                    score = Util.getAttributeValue(attributes, "score");
                }
                // Add the result
                this.results.push({
                    value: Util.getUniqueattributevalue(item),
                    score: score,
                });
                // Re-sort
                this.results.sort((a, b) => a.score - b.score);
            }
        }
    }
}
exports.Autocomplete = Autocomplete;
//# sourceMappingURL=index.js.map