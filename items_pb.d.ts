// package: 
// file: items.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class ItemRequest extends jspb.Message { 
    getType(): string;
    setType(value: string): ItemRequest;
    getMethod(): RequestMethod;
    setMethod(value: RequestMethod): ItemRequest;
    getQuery(): string;
    setQuery(value: string): ItemRequest;
    getLinkdepth(): number;
    setLinkdepth(value: number): ItemRequest;
    getContext(): string;
    setContext(value: string): ItemRequest;
    getIgnorecache(): boolean;
    setIgnorecache(value: boolean): ItemRequest;
    getUuid(): Uint8Array | string;
    getUuid_asU8(): Uint8Array;
    getUuid_asB64(): string;
    setUuid(value: Uint8Array | string): ItemRequest;

    hasTimeout(): boolean;
    clearTimeout(): void;
    getTimeout(): google_protobuf_duration_pb.Duration | undefined;
    setTimeout(value?: google_protobuf_duration_pb.Duration): ItemRequest;
    getItemsubject(): string;
    setItemsubject(value: string): ItemRequest;
    getResponsesubject(): string;
    setResponsesubject(value: string): ItemRequest;
    getErrorsubject(): string;
    setErrorsubject(value: string): ItemRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ItemRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ItemRequest): ItemRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ItemRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ItemRequest;
    static deserializeBinaryFromReader(message: ItemRequest, reader: jspb.BinaryReader): ItemRequest;
}

export namespace ItemRequest {
    export type AsObject = {
        type: string,
        method: RequestMethod,
        query: string,
        linkdepth: number,
        context: string,
        ignorecache: boolean,
        uuid: Uint8Array | string,
        timeout?: google_protobuf_duration_pb.Duration.AsObject,
        itemsubject: string,
        responsesubject: string,
        errorsubject: string,
    }
}

export class CancelItemRequest extends jspb.Message { 
    getUuid(): Uint8Array | string;
    getUuid_asU8(): Uint8Array;
    getUuid_asB64(): string;
    setUuid(value: Uint8Array | string): CancelItemRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CancelItemRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CancelItemRequest): CancelItemRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CancelItemRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CancelItemRequest;
    static deserializeBinaryFromReader(message: CancelItemRequest, reader: jspb.BinaryReader): CancelItemRequest;
}

export namespace CancelItemRequest {
    export type AsObject = {
        uuid: Uint8Array | string,
    }
}

export class ItemAttributes extends jspb.Message { 

    hasAttrstruct(): boolean;
    clearAttrstruct(): void;
    getAttrstruct(): google_protobuf_struct_pb.Struct | undefined;
    setAttrstruct(value?: google_protobuf_struct_pb.Struct): ItemAttributes;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ItemAttributes.AsObject;
    static toObject(includeInstance: boolean, msg: ItemAttributes): ItemAttributes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ItemAttributes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ItemAttributes;
    static deserializeBinaryFromReader(message: ItemAttributes, reader: jspb.BinaryReader): ItemAttributes;
}

export namespace ItemAttributes {
    export type AsObject = {
        attrstruct?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class Item extends jspb.Message { 
    getType(): string;
    setType(value: string): Item;
    getUniqueattribute(): string;
    setUniqueattribute(value: string): Item;

    hasAttributes(): boolean;
    clearAttributes(): void;
    getAttributes(): ItemAttributes | undefined;
    setAttributes(value?: ItemAttributes): Item;

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): Metadata | undefined;
    setMetadata(value?: Metadata): Item;
    getContext(): string;
    setContext(value: string): Item;
    clearLinkeditemrequestsList(): void;
    getLinkeditemrequestsList(): Array<ItemRequest>;
    setLinkeditemrequestsList(value: Array<ItemRequest>): Item;
    addLinkeditemrequests(value?: ItemRequest, index?: number): ItemRequest;
    clearLinkeditemsList(): void;
    getLinkeditemsList(): Array<Reference>;
    setLinkeditemsList(value: Array<Reference>): Item;
    addLinkeditems(value?: Reference, index?: number): Reference;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Item.AsObject;
    static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Item;
    static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
}

export namespace Item {
    export type AsObject = {
        type: string,
        uniqueattribute: string,
        attributes?: ItemAttributes.AsObject,
        metadata?: Metadata.AsObject,
        context: string,
        linkeditemrequestsList: Array<ItemRequest.AsObject>,
        linkeditemsList: Array<Reference.AsObject>,
    }
}

export class Items extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Item>;
    setItemsList(value: Array<Item>): Items;
    addItems(value?: Item, index?: number): Item;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Items.AsObject;
    static toObject(includeInstance: boolean, msg: Items): Items.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Items, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Items;
    static deserializeBinaryFromReader(message: Items, reader: jspb.BinaryReader): Items;
}

export namespace Items {
    export type AsObject = {
        itemsList: Array<Item.AsObject>,
    }
}

export class Reference extends jspb.Message { 
    getType(): string;
    setType(value: string): Reference;
    getUniqueattributevalue(): string;
    setUniqueattributevalue(value: string): Reference;
    getContext(): string;
    setContext(value: string): Reference;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Reference.AsObject;
    static toObject(includeInstance: boolean, msg: Reference): Reference.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Reference, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Reference;
    static deserializeBinaryFromReader(message: Reference, reader: jspb.BinaryReader): Reference;
}

export namespace Reference {
    export type AsObject = {
        type: string,
        uniqueattributevalue: string,
        context: string,
    }
}

export class Edge extends jspb.Message { 

    hasFrom(): boolean;
    clearFrom(): void;
    getFrom(): Reference | undefined;
    setFrom(value?: Reference): Edge;

    hasTo(): boolean;
    clearTo(): void;
    getTo(): Reference | undefined;
    setTo(value?: Reference): Edge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Edge.AsObject;
    static toObject(includeInstance: boolean, msg: Edge): Edge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Edge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Edge;
    static deserializeBinaryFromReader(message: Edge, reader: jspb.BinaryReader): Edge;
}

export namespace Edge {
    export type AsObject = {
        from?: Reference.AsObject,
        to?: Reference.AsObject,
    }
}

export class Metadata extends jspb.Message { 
    getSourcename(): string;
    setSourcename(value: string): Metadata;

    hasSourcerequest(): boolean;
    clearSourcerequest(): void;
    getSourcerequest(): ItemRequest | undefined;
    setSourcerequest(value?: ItemRequest): Metadata;

    hasTimestamp(): boolean;
    clearTimestamp(): void;
    getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): Metadata;

    hasSourceduration(): boolean;
    clearSourceduration(): void;
    getSourceduration(): google_protobuf_duration_pb.Duration | undefined;
    setSourceduration(value?: google_protobuf_duration_pb.Duration): Metadata;

    hasSourcedurationperitem(): boolean;
    clearSourcedurationperitem(): void;
    getSourcedurationperitem(): google_protobuf_duration_pb.Duration | undefined;
    setSourcedurationperitem(value?: google_protobuf_duration_pb.Duration): Metadata;
    getHidden(): boolean;
    setHidden(value: boolean): Metadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metadata.AsObject;
    static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metadata;
    static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
}

export namespace Metadata {
    export type AsObject = {
        sourcename: string,
        sourcerequest?: ItemRequest.AsObject,
        timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        sourceduration?: google_protobuf_duration_pb.Duration.AsObject,
        sourcedurationperitem?: google_protobuf_duration_pb.Duration.AsObject,
        hidden: boolean,
    }
}

export class ReverseLinksRequest extends jspb.Message { 

    hasItem(): boolean;
    clearItem(): void;
    getItem(): Reference | undefined;
    setItem(value?: Reference): ReverseLinksRequest;

    hasTimeout(): boolean;
    clearTimeout(): void;
    getTimeout(): google_protobuf_duration_pb.Duration | undefined;
    setTimeout(value?: google_protobuf_duration_pb.Duration): ReverseLinksRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReverseLinksRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReverseLinksRequest): ReverseLinksRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReverseLinksRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReverseLinksRequest;
    static deserializeBinaryFromReader(message: ReverseLinksRequest, reader: jspb.BinaryReader): ReverseLinksRequest;
}

export namespace ReverseLinksRequest {
    export type AsObject = {
        item?: Reference.AsObject,
        timeout?: google_protobuf_duration_pb.Duration.AsObject,
    }
}

export class ReverseLinksResponse extends jspb.Message { 
    clearLinkeditemrequestsList(): void;
    getLinkeditemrequestsList(): Array<ItemRequest>;
    setLinkeditemrequestsList(value: Array<ItemRequest>): ReverseLinksResponse;
    addLinkeditemrequests(value?: ItemRequest, index?: number): ItemRequest;
    getError(): string;
    setError(value: string): ReverseLinksResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReverseLinksResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ReverseLinksResponse): ReverseLinksResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReverseLinksResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReverseLinksResponse;
    static deserializeBinaryFromReader(message: ReverseLinksResponse, reader: jspb.BinaryReader): ReverseLinksResponse;
}

export namespace ReverseLinksResponse {
    export type AsObject = {
        linkeditemrequestsList: Array<ItemRequest.AsObject>,
        error: string,
    }
}

export enum RequestMethod {
    GET = 0,
    FIND = 1,
    SEARCH = 2,
}
