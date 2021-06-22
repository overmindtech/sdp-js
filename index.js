"use strict";
// This file contains the extra methods I want to add to the generated protobuf
// code
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Response = exports.ItemRequestError = exports.ResponderStatus = exports.Responder = exports.RequestProgress = exports.RequestMethod = exports.Metadata = exports.Reference = exports.Items = exports.Item = exports.ItemAttributes = exports.ItemRequest = void 0;
// Export things from other files
var items_pb_1 = require("./items_pb");
Object.defineProperty(exports, "ItemRequest", { enumerable: true, get: function () { return items_pb_1.ItemRequest; } });
Object.defineProperty(exports, "ItemAttributes", { enumerable: true, get: function () { return items_pb_1.ItemAttributes; } });
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return items_pb_1.Item; } });
Object.defineProperty(exports, "Items", { enumerable: true, get: function () { return items_pb_1.Items; } });
Object.defineProperty(exports, "Reference", { enumerable: true, get: function () { return items_pb_1.Reference; } });
Object.defineProperty(exports, "Metadata", { enumerable: true, get: function () { return items_pb_1.Metadata; } });
Object.defineProperty(exports, "RequestMethod", { enumerable: true, get: function () { return items_pb_1.RequestMethod; } });
var progress_1 = require("./progress");
Object.defineProperty(exports, "RequestProgress", { enumerable: true, get: function () { return progress_1.RequestProgress; } });
Object.defineProperty(exports, "Responder", { enumerable: true, get: function () { return progress_1.Responder; } });
Object.defineProperty(exports, "ResponderStatus", { enumerable: true, get: function () { return progress_1.ResponderStatus; } });
var errors_pb_1 = require("./errors_pb");
Object.defineProperty(exports, "ItemRequestError", { enumerable: true, get: function () { return errors_pb_1.ItemRequestError; } });
var responses_pb_1 = require("./responses_pb");
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return responses_pb_1.Response; } });
// Import things we need for the Util namespace
var items_pb_2 = require("./items_pb");
var sha1_1 = __importDefault(require("sha1"));
var to_data_view_1 = __importDefault(require("to-data-view"));
var duration_pb_1 = require("google-protobuf/google/protobuf/duration_pb");
var struct_pb_1 = require("google-protobuf/google/protobuf/struct_pb");
var timestamp_pb_1 = require("google-protobuf/google/protobuf/timestamp_pb");
var Util;
(function (Util) {
    function getGloballyuniquename(object) {
        var elements = [
            object.getContext(),
            object.getType(),
            getUniqueattributevalue(object),
        ];
        return elements.join(".");
    }
    Util.getGloballyuniquename = getGloballyuniquename;
    function getHash(object) {
        var bytes = sha1_1.default(getGloballyuniquename(object), {
            asBytes: true,
        });
        var base32String = base32EncodeCustom(bytes);
        return base32String.substring(0, 11);
    }
    Util.getHash = getHash;
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
    function getReference(item) {
        var ref = new items_pb_2.Reference();
        ref.setContext(item.getContext());
        ref.setType(item.getType());
        ref.setUniqueattributevalue(getUniqueattributevalue(item));
        return ref;
    }
    Util.getReference = getReference;
    // Convert a durationpb to javascript Date object
    function toDate(duration) {
        return new Date((duration.getSeconds() * 1000) + (duration.getNanos() / 1000000));
    }
    Util.toDate = toDate;
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
    // NewItemAttributes creates a new ItemAttributes object from any javascript
    // object that has string keys
    function newItemAttributes(value) {
        var attributes = new items_pb_2.ItemAttributes();
        attributes.setAttrstruct(struct_pb_1.Struct.fromJavaScript(value));
        return attributes;
    }
    Util.newItemAttributes = newItemAttributes;
    function newMetadata(data) {
        var m = new items_pb_2.Metadata();
        m.setBackendname(data.backendName);
        m.setRequestmethod(convertRequestMethod(data.requestMethod));
        var timestamp = new timestamp_pb_1.Timestamp();
        timestamp.fromDate(data.timestamp);
        m.setTimestamp(timestamp);
        var backendDuration = new duration_pb_1.Duration();
        backendDuration.setSeconds(Math.floor(data.backendDuration / 1000));
        backendDuration.setNanos((data.backendDuration % 1000) * 1e6);
        m.setBackendduration(backendDuration);
        var backendDurationPerItem = new duration_pb_1.Duration();
        backendDurationPerItem.setSeconds(Math.floor(data.backendDurationPerItem / 1000));
        backendDurationPerItem.setNanos((data.backendDurationPerItem % 1000) * 1e6);
        m.setBackenddurationperitem(backendDurationPerItem);
        m.setBackendpackage(data.backendPackage);
        return m;
    }
    Util.newMetadata = newMetadata;
    function newItemRequest(details) {
        var r = new items_pb_2.ItemRequest();
        r.setType(details.type);
        r.setMethod(convertRequestMethod(details.method));
        r.setQuery(details.query);
        r.setLinkdepth(details.linkDepth);
        r.setContext(details.context);
        r.setItemsubject(details.itemSubject);
        r.setLinkeditemsubject(details.linkedItemSubject);
        r.setResponsesubject(details.responseSubject);
        r.setErrorsubject(details.errorSubject);
        return r;
    }
    Util.newItemRequest = newItemRequest;
    function newReference(details) {
        var r = new items_pb_2.Reference();
        r.setType(details.type);
        r.setUniqueattributevalue(details.uniqueAttributeValue);
        r.setContext(details.context);
        return r;
    }
    Util.newReference = newReference;
})(Util = exports.Util || (exports.Util = {}));
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
    var view = to_data_view_1.default(data);
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