import { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod } from './dist/items_pb';
import { ItemRequestError } from './dist/errors_pb';
import { Response } from './dist/responses_pb';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue } from 'google-protobuf/google/protobuf/struct_pb';
export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod, ItemRequestError, Response, };
export declare namespace Util {
    function getGloballyuniquename(object: Reference | Item): string;
    function getHash(object: Reference | Item): string;
    function getUniqueattributevalue(object: Item | Reference): string;
    function getAttributeValue(attributes: ItemAttributes, name: string): any;
    function getReference(item: Item): Reference;
    function toDate(duration: Duration): Date;
    type ItemData = {
        type: string;
        uniqueAttribute: string;
        context: string;
        attributes: ItemAttributes;
        metadata: Metadata | undefined;
        linkedItemRequests: ItemRequest[];
        linkedItems: Reference[];
    };
    function newItem(details: ItemData): Item;
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
    function newMetadata(data: MetadataData): Metadata;
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
    function newItemRequest(details: ItemRequestData): ItemRequest;
    type ReferenceData = {
        type: string;
        uniqueAttributeValue: string;
        context: string;
    };
    function newReference(details: ReferenceData): Reference;
}
//# sourceMappingURL=index.d.ts.map