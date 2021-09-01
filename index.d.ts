export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod } from './items_pb';
export { ItemRequestError } from './errors_pb';
export { Response } from './responses_pb';
import { Reference, Item, ItemAttributes, Metadata, ItemRequest } from './items_pb';
import { ItemRequestError } from './errors_pb';
import { Response } from './responses_pb';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { JavaScriptValue } from 'google-protobuf/google/protobuf/struct_pb';
export declare namespace Util {
    function getGloballyuniquename(object: Reference | Item): string;
    function getHash(object: Reference | Item): string;
    function getUniqueattributevalue(object: Item | Reference): string;
    function getAttributeValue(attributes: ItemAttributes, name: string): any;
    function getReference(item: Item): Reference;
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
    type ResponseData = {
        context: string;
        state: Response.ResponseStateMap[keyof Response.ResponseStateMap];
        nextUpdateInMs?: number;
    };
    function newResponse(details: ResponseData): Response;
}
export declare enum ResponderStatus {
    Working = 0,
    Stalled = 1,
    Complete = 2,
    Failed = 3
}
export declare class Responder {
    context: string;
    lastStatusTime: Date;
    nextStatusTime: Date | undefined;
    error: string;
    private _lastStatus;
    constructor(context: string);
    set status(status: ResponderStatus);
    get status(): ResponderStatus;
}
export declare class RequestProgress {
    responders: Map<string, Responder>;
    request: ItemRequest;
    private watcher;
    private inFlight;
    constructor(request: ItemRequest, stallCheckIntervalMs?: number);
    private countOfStatus;
    cancel(): void;
    numWorking(): number;
    numStalled(): number;
    numComplete(): number;
    numFailed(): number;
    numResponders(): number;
    allDone(): boolean;
    percentComplete(): number;
    waitForCompletion(timeoutMs?: number): Promise<string>;
    processResponse(response: Response): void;
    processError(error: ItemRequestError): void;
}
//# sourceMappingURL=index.d.ts.map