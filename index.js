"use strict";
// This file contains the extra methods I want to add to the generated protobuf
// code
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Response = exports.ItemRequestError = exports.RequestMethod = exports.Metadata = exports.Reference = exports.Items = exports.Item = exports.ItemAttributes = exports.ItemRequest = void 0;
var items_pb_1 = require("./items_pb");
Object.defineProperty(exports, "ItemRequest", { enumerable: true, get: function () { return items_pb_1.ItemRequest; } });
Object.defineProperty(exports, "ItemAttributes", { enumerable: true, get: function () { return items_pb_1.ItemAttributes; } });
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return items_pb_1.Item; } });
Object.defineProperty(exports, "Items", { enumerable: true, get: function () { return items_pb_1.Items; } });
Object.defineProperty(exports, "Reference", { enumerable: true, get: function () { return items_pb_1.Reference; } });
Object.defineProperty(exports, "Metadata", { enumerable: true, get: function () { return items_pb_1.Metadata; } });
Object.defineProperty(exports, "RequestMethod", { enumerable: true, get: function () { return items_pb_1.RequestMethod; } });
var errors_pb_1 = require("./errors_pb");
Object.defineProperty(exports, "ItemRequestError", { enumerable: true, get: function () { return errors_pb_1.ItemRequestError; } });
var responses_pb_1 = require("./responses_pb");
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return responses_pb_1.Response; } });
var sha1_1 = __importDefault(require("sha1"));
var to_data_view_1 = __importDefault(require("to-data-view"));
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
        var ref = new items_pb_1.Reference();
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
})(Util = exports.Util || (exports.Util = {}));
//
// Private helper functions
//
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