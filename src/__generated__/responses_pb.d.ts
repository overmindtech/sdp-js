// package: 
// file: responses.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class Response extends jspb.Message { 
    getResponder(): string;
    setResponder(value: string): Response;
    getState(): ResponderState;
    setState(value: ResponderState): Response;

    hasNextupdatein(): boolean;
    clearNextupdatein(): void;
    getNextupdatein(): google_protobuf_duration_pb.Duration | undefined;
    setNextupdatein(value?: google_protobuf_duration_pb.Duration): Response;
    getItemrequestuuid(): Uint8Array | string;
    getItemrequestuuid_asU8(): Uint8Array;
    getItemrequestuuid_asB64(): string;
    setItemrequestuuid(value: Uint8Array | string): Response;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        responder: string,
        state: ResponderState,
        nextupdatein?: google_protobuf_duration_pb.Duration.AsObject,
        itemrequestuuid: Uint8Array | string,
    }
}

export class ItemRequestError extends jspb.Message { 
    getItemrequestuuid(): Uint8Array | string;
    getItemrequestuuid_asU8(): Uint8Array;
    getItemrequestuuid_asB64(): string;
    setItemrequestuuid(value: Uint8Array | string): ItemRequestError;
    getErrortype(): ItemRequestError.ErrorType;
    setErrortype(value: ItemRequestError.ErrorType): ItemRequestError;
    getErrorstring(): string;
    setErrorstring(value: string): ItemRequestError;
    getScope(): string;
    setScope(value: string): ItemRequestError;
    getSourcename(): string;
    setSourcename(value: string): ItemRequestError;
    getItemtype(): string;
    setItemtype(value: string): ItemRequestError;
    getRespondername(): string;
    setRespondername(value: string): ItemRequestError;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ItemRequestError.AsObject;
    static toObject(includeInstance: boolean, msg: ItemRequestError): ItemRequestError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ItemRequestError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ItemRequestError;
    static deserializeBinaryFromReader(message: ItemRequestError, reader: jspb.BinaryReader): ItemRequestError;
}

export namespace ItemRequestError {
    export type AsObject = {
        itemrequestuuid: Uint8Array | string,
        errortype: ItemRequestError.ErrorType,
        errorstring: string,
        scope: string,
        sourcename: string,
        itemtype: string,
        respondername: string,
    }

    export enum ErrorType {
    OTHER = 0,
    NOTFOUND = 1,
    NOSCOPE = 2,
    TIMEOUT = 3,
    }

}

export enum ResponderState {
    WORKING = 0,
    COMPLETE = 1,
    ERROR = 2,
    CANCELLED = 3,
    STALLED = 4,
}
