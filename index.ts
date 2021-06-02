// This file contains the extra methods I want to add to the generated protobuf
// code

import { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod } from './items_pb';
import { ItemRequestError } from './errors_pb';
import { Response } from './responses_pb';
import sha1 from 'sha1';
import toDataView from 'to-data-view';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue, Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

// Re-Export all the stuff we just imported
export {
    ItemRequest,
    ItemAttributes,
    Item,
    Items,
    Reference,
    Metadata,
    RequestMethodMap,
    RequestMethod,
    ItemRequestError,
    Response,
}

export namespace Util {
    export function getGloballyuniquename(object: Reference | Item): string {
        const elements: string[] = [
            object.getContext(),
            object.getType(),
            getUniqueattributevalue(object),
        ];
    
        return elements.join(".");
    }

    export function getHash(object: Reference | Item): string {
        const bytes = sha1(getGloballyuniquename(object), {
            asBytes: true,
        })
    
        const base32String = base32EncodeCustom(bytes);
    
        return base32String.substring(0,11)
    }

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

    export function getAttributeValue(attributes: ItemAttributes, name: string): any {
        var object = attributes.getAttrstruct()?.toJavaScript()

        if (typeof object === "undefined") {
            return undefined;
        } else {
            return object[name];
        }
    }

    export function getReference(item: Item): Reference {
        const ref = new Reference();

        ref.setContext(item.getContext());
        ref.setType(item.getType());
        ref.setUniqueattributevalue(getUniqueattributevalue(item));
    
        return ref;    
    }

    // Convert a durationpb to javascript Date object
    export function toDate(duration: Duration): Date {
        return new Date((duration.getSeconds() * 1000) + (duration.getNanos() / 1000000));
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

    // NewItemAttributes creates a new ItemAttributes object from any javascript
    // object that has string keys
    export function newItemAttributes(value: {[key: string]: JavaScriptValue}): ItemAttributes {
        const attributes = new ItemAttributes();
        attributes.setAttrstruct(Struct.fromJavaScript(value));

        return attributes;
    }

    export type MetadataData = {
        backendName: string,
        requestMethod: "GET" | "FIND" | "SEARCH",
        timestamp: Date;
        backendDuration: number; // milliseconds
        backendDurationPerItem: number; // milliseconds
        backendPackage: string,
    }

    export function newMetadata(data: MetadataData): Metadata {
        const m = new Metadata();

        m.setBackendname(data.backendName);
        m.setRequestmethod(convertRequestMethod(data.requestMethod));

        const timestamp = new Timestamp();
        timestamp.fromDate(data.timestamp);
        m.setTimestamp(timestamp);

        const backendDuration = new Duration();
        backendDuration.setSeconds(Math.floor(data.backendDuration / 1000));
        backendDuration.setNanos((data.backendDuration % 1000) * 1e6);
        m.setBackendduration(backendDuration);
        
        const backendDurationPerItem = new Duration();
        backendDurationPerItem.setSeconds(Math.floor(data.backendDurationPerItem / 1000));
        backendDurationPerItem.setNanos((data.backendDurationPerItem % 1000) * 1e6);
        m.setBackenddurationperitem(backendDurationPerItem);

        m.setBackendpackage(data.backendPackage);

        return m;
    }

    export type ItemRequestData = {
        type: string,
        method: "GET" | "FIND" | "SEARCH",
        query: string,
        linkDepth: number,
        context: string,
        itemSubject: string,
        linkedItemSubject: string,
        responseSubject: string,
        errorSubject: string,
    }

    export function newItemRequest(details: ItemRequestData): ItemRequest {
        const r = new ItemRequest();

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

    export type ReferenceData = {
        type: string,
        uniqueAttributeValue: string,
        context: string,
    }

    export function newReference(details: ReferenceData): Reference {
        const r = new Reference();

        r.setType(details.type);
        r.setUniqueattributevalue(details.uniqueAttributeValue);
        r.setContext(details.context);

        return r;
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
