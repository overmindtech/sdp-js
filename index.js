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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProgress = exports.Responder = exports.ResponderStatus = exports.Util = exports.Response = exports.RequestMethod = exports.Metadata = exports.Reference = exports.Items = exports.Item = exports.ItemAttributes = exports.ItemRequest = void 0;
// Export things from other files
var items_pb_1 = require("./items_pb");
Object.defineProperty(exports, "ItemRequest", { enumerable: true, get: function () { return items_pb_1.ItemRequest; } });
Object.defineProperty(exports, "ItemAttributes", { enumerable: true, get: function () { return items_pb_1.ItemAttributes; } });
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return items_pb_1.Item; } });
Object.defineProperty(exports, "Items", { enumerable: true, get: function () { return items_pb_1.Items; } });
Object.defineProperty(exports, "Reference", { enumerable: true, get: function () { return items_pb_1.Reference; } });
Object.defineProperty(exports, "Metadata", { enumerable: true, get: function () { return items_pb_1.Metadata; } });
Object.defineProperty(exports, "RequestMethod", { enumerable: true, get: function () { return items_pb_1.RequestMethod; } });
var responses_pb_1 = require("./responses_pb");
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return responses_pb_1.Response; } });
// Import things we need for the Util namespace
var items_pb_2 = require("./items_pb");
var responses_pb_2 = require("./responses_pb");
var sha1_1 = __importDefault(require("sha1"));
var to_data_view_1 = __importDefault(require("to-data-view"));
var duration_pb_1 = require("google-protobuf/google/protobuf/duration_pb");
var struct_pb_1 = require("google-protobuf/google/protobuf/struct_pb");
var timestamp_pb_1 = require("google-protobuf/google/protobuf/timestamp_pb");
var uuid_1 = require("uuid");
var Util;
(function (Util) {
    /**
     * Gets the globally unique name of an object
     * @param object The object to get the globally unique name from
     * @returns The globally unique name
     */
    function getGloballyuniquename(object) {
        var elements = [
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
        var bytes = (0, sha1_1.default)(getGloballyuniquename(object), {
            asBytes: true,
        });
        var base32String = base32EncodeCustom(bytes);
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
            var uniqueAttribute = object.getUniqueattribute();
            var attributes = object.getAttributes();
            if (typeof attributes != "undefined") {
                var value = Util.getAttributeValue(attributes, uniqueAttribute);
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
        var ref = new items_pb_2.Reference();
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
        return new Date((duration.getSeconds() * 1000) + (duration.getNanos() / 1000000));
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
    /**
     * Create a new `Item` object from a single object
     * @param details The details of the item you want to create
     * @returns A new Item object
     */
    function newItem(details) {
        var item = new items_pb_2.Item();
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
        var attributes = new items_pb_2.ItemAttributes();
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
        var m = new items_pb_2.Metadata();
        m.setSourcename(data.sourceName);
        m.setSourcerequest(Util.newItemRequest(data.sourceRequest));
        var timestamp = new timestamp_pb_1.Timestamp();
        timestamp.fromDate(data.timestamp);
        m.setTimestamp(timestamp);
        var sourceDuration = new duration_pb_1.Duration();
        sourceDuration.setSeconds(Math.floor(data.sourceDuration / 1000));
        sourceDuration.setNanos((data.sourceDuration % 1000) * 1e6);
        m.setSourceduration(sourceDuration);
        var sourceDurationPerItem = new duration_pb_1.Duration();
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
        var r = new items_pb_2.ItemRequest();
        r.setType(details.type);
        r.setMethod(convertRequestMethod(details.method));
        r.setQuery(details.query);
        r.setLinkdepth(details.linkDepth);
        r.setContext(details.context);
        r.setItemsubject(details.itemSubject);
        r.setResponsesubject(details.responseSubject);
        return r;
    }
    Util.newItemRequest = newItemRequest;
    /**
     * Create a new Reference from a single object
     * @param details The details that you want the new reference to contain
     * @returns The new Reference object
     */
    function newReference(details) {
        var r = new items_pb_2.Reference();
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
        var r = new responses_pb_2.Response();
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
        var c = new items_pb_2.CancelItemRequest();
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
})(Util = exports.Util || (exports.Util = {}));
// The status of a given responder
var ResponderStatus;
(function (ResponderStatus) {
    ResponderStatus[ResponderStatus["Working"] = 0] = "Working";
    ResponderStatus[ResponderStatus["Stalled"] = 1] = "Stalled";
    ResponderStatus[ResponderStatus["Complete"] = 2] = "Complete";
    ResponderStatus[ResponderStatus["Failed"] = 3] = "Failed";
    ResponderStatus[ResponderStatus["Cancelled"] = 4] = "Cancelled";
})(ResponderStatus = exports.ResponderStatus || (exports.ResponderStatus = {}));
/**
 * Represents something that is responding to our query
 */
var Responder = /** @class */ (function () {
    /**
     *
     * @param responder The responder that this responder will respond for
     */
    function Responder(name) {
        this.name = "";
        this.lastStatusTime = new Date();
        this._lastStatus = ResponderStatus.Complete;
        this.name = name;
        this.status = ResponderStatus.Working;
    }
    Object.defineProperty(Responder.prototype, "status", {
        // Get the last status of this responder
        get: function () {
            return this._lastStatus;
        },
        // Sets the status and updates the LastStatus to the current time
        set: function (status) {
            // Set last status time to now
            this.lastStatusTime = new Date();
            this._lastStatus = status;
        },
        enumerable: false,
        configurable: true
    });
    return Responder;
}());
exports.Responder = Responder;
var RequestProgress = /** @class */ (function () {
    /**
     *
     * @param request The request for which to track progress
     * @param stallCheckIntervalMs How often to check to see if responders have
     * stalled, in milliseconds
     */
    function RequestProgress(request, stallCheckIntervalMs) {
        var _this = this;
        if (stallCheckIntervalMs === void 0) { stallCheckIntervalMs = 500; }
        this.responders = new Map();
        // Tracks the number of things currently being processed so that we can be
        // sure that all processing is complete before returning
        this.inFlight = 0;
        this.request = request;
        // Start watching for stalls
        this.watcher = setInterval(function () {
            // Check to see if the request is complete, if it is we need to stop
            // checking
            if (_this.allDone()) {
                clearInterval(_this.watcher);
            }
            // Get the current time
            var now = new Date();
            // Loop over all results and check for stalls
            _this.responders.forEach(function (responder) {
                if (typeof responder.nextStatusTime != 'undefined') {
                    if (responder.nextStatusTime < now) {
                        // This means that the responder has stalled
                        responder.status = ResponderStatus.Stalled;
                    }
                }
            });
        }, stallCheckIntervalMs);
    }
    // Return the count of items with a given status
    RequestProgress.prototype.countOfStatus = function (status) {
        var x = 0;
        this.responders.forEach(function (v) {
            if (v.status == status) {
                x++;
            }
        });
        return x;
    };
    /**
     * Cancels loops that are watching for stalls
     */
    RequestProgress.prototype.cancel = function () {
        clearInterval(this.watcher);
    };
    /**
     *
     * @returns The number of responder still working
     */
    RequestProgress.prototype.numWorking = function () {
        return this.countOfStatus(ResponderStatus.Working);
    };
    /**
     *
     * @returns The number of stalled responders
     */
    RequestProgress.prototype.numStalled = function () {
        return this.countOfStatus(ResponderStatus.Stalled);
    };
    /**
     *
     * @returns The number of complete responders
     */
    RequestProgress.prototype.numComplete = function () {
        return this.countOfStatus(ResponderStatus.Complete);
    };
    /**
     *
     * @returns The number of failed responders
     */
    RequestProgress.prototype.numFailed = function () {
        return this.countOfStatus(ResponderStatus.Failed);
    };
    /**
     *
     * @returns The number of cancelled responders
     */
    RequestProgress.prototype.numCancelled = function () {
        return this.countOfStatus(ResponderStatus.Cancelled);
    };
    /**
     *
     * @returns The total number of responders for the query
     */
    RequestProgress.prototype.numResponders = function () {
        return this.responders.size;
    };
    /**
     *
     * @returns True if all responders are done or stalled
     */
    RequestProgress.prototype.allDone = function () {
        if (this.numResponders() > 0 && this.inFlight == 0) {
            return (this.numWorking() == 0);
        }
        return false;
    };
    /**
     * Returns a number between 1 and 100 representing the percentage complete
     * of all responders.
     * @returns The percentage of complete responders
     */
    RequestProgress.prototype.percentComplete = function () {
        return (this.numComplete() / this.numResponders()) * 100;
    };
    /**
     * Waits for all to be completed, then returns
     * @param timeoutMs How long to wait before timing out
     * @returns "timeout" or "done"
     */
    RequestProgress.prototype.waitForCompletion = function (timeoutMs) {
        if (timeoutMs === void 0) { timeoutMs = 3000; }
        return __awaiter(this, void 0, void 0, function () {
            var doneCheckIntervalMs, doneChecker, timeout;
            var _this = this;
            return __generator(this, function (_a) {
                doneCheckIntervalMs = 100;
                timeout = new Promise(function (resolve) { return setTimeout(resolve, timeoutMs, "timeout"); });
                // Create the done promise
                return [2 /*return*/, new Promise(function (resolve) {
                        doneChecker = setInterval(function () {
                            if (_this.allDone()) {
                                clearInterval(doneChecker);
                                resolve("done");
                            }
                        }, doneCheckIntervalMs, resolve);
                        timeout.then(function () {
                            clearInterval(doneChecker);
                            resolve("timeout");
                        });
                    })];
            });
        });
    };
    /**
     * Processes a response and updates tracking of responders.
     * @param response The response to process
     */
    RequestProgress.prototype.processResponse = function (response) {
        this.inFlight++;
        // Pull details out of the response
        var responderName = response.getResponder();
        var status;
        var nextUpdateTime = undefined;
        // Get the responder or create a new one
        var responder = this.responders.get(responderName) || new Responder(responderName);
        // Map states
        switch (response.getState()) {
            case responses_pb_2.Response.ResponseState.COMPLETE: {
                status = ResponderStatus.Complete;
                break;
            }
            case responses_pb_2.Response.ResponseState.WORKING: {
                status = ResponderStatus.Working;
                break;
            }
            case responses_pb_2.Response.ResponseState.ERROR: {
                status = ResponderStatus.Failed;
                responder.error = response.getError();
                break;
            }
            case responses_pb_2.Response.ResponseState.CANCELLED: {
                status = ResponderStatus.Cancelled;
                break;
            }
        }
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
        responder.status = status;
        responder.nextStatusTime = nextUpdateTime;
        // Save the value
        this.responders.set(responderName, responder);
        this.inFlight--;
    };
    return RequestProgress;
}());
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
    var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF';
    var padding = false;
    var view = (0, to_data_view_1.default)(data);
    var bits = 0;
    var value = 0;
    var output = '';
    for (var i = 0; i < view.byteLength; i++) {
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
//# sourceMappingURL=index.js.map