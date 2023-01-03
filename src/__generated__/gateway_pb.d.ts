// package: 
// file: gateway.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as items_pb from "./items_pb";
import * as responses_pb from "./responses_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class UndoItemRequest extends jspb.Message { 
    getUuid(): Uint8Array | string;
    getUuid_asU8(): Uint8Array;
    getUuid_asB64(): string;
    setUuid(value: Uint8Array | string): UndoItemRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UndoItemRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UndoItemRequest): UndoItemRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UndoItemRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UndoItemRequest;
    static deserializeBinaryFromReader(message: UndoItemRequest, reader: jspb.BinaryReader): UndoItemRequest;
}

export namespace UndoItemRequest {
    export type AsObject = {
        uuid: Uint8Array | string,
    }
}

export class ExpandItemRequest extends jspb.Message { 

    hasItem(): boolean;
    clearItem(): void;
    getItem(): items_pb.Reference | undefined;
    setItem(value?: items_pb.Reference): ExpandItemRequest;
    getLinkdepth(): number;
    setLinkdepth(value: number): ExpandItemRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExpandItemRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ExpandItemRequest): ExpandItemRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExpandItemRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExpandItemRequest;
    static deserializeBinaryFromReader(message: ExpandItemRequest, reader: jspb.BinaryReader): ExpandItemRequest;
}

export namespace ExpandItemRequest {
    export type AsObject = {
        item?: items_pb.Reference.AsObject,
        linkdepth: number,
    }
}

export class GatewayRequest extends jspb.Message { 

    hasNewrequest(): boolean;
    clearNewrequest(): void;
    getNewrequest(): items_pb.ItemRequest | undefined;
    setNewrequest(value?: items_pb.ItemRequest): GatewayRequest;

    hasCancelrequest(): boolean;
    clearCancelrequest(): void;
    getCancelrequest(): items_pb.CancelItemRequest | undefined;
    setCancelrequest(value?: items_pb.CancelItemRequest): GatewayRequest;

    hasUndorequest(): boolean;
    clearUndorequest(): void;
    getUndorequest(): UndoItemRequest | undefined;
    setUndorequest(value?: UndoItemRequest): GatewayRequest;

    hasExcludeitem(): boolean;
    clearExcludeitem(): void;
    getExcludeitem(): items_pb.Reference | undefined;
    setExcludeitem(value?: items_pb.Reference): GatewayRequest;

    hasIncludeitem(): boolean;
    clearIncludeitem(): void;
    getIncludeitem(): items_pb.Reference | undefined;
    setIncludeitem(value?: items_pb.Reference): GatewayRequest;

    hasExpanditem(): boolean;
    clearExpanditem(): void;
    getExpanditem(): ExpandItemRequest | undefined;
    setExpanditem(value?: ExpandItemRequest): GatewayRequest;

    hasUnexpanditem(): boolean;
    clearUnexpanditem(): void;
    getUnexpanditem(): items_pb.Reference | undefined;
    setUnexpanditem(value?: items_pb.Reference): GatewayRequest;

    hasMinstatusinterval(): boolean;
    clearMinstatusinterval(): void;
    getMinstatusinterval(): google_protobuf_duration_pb.Duration | undefined;
    setMinstatusinterval(value?: google_protobuf_duration_pb.Duration): GatewayRequest;

    getRequestTypeCase(): GatewayRequest.RequestTypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GatewayRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GatewayRequest): GatewayRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GatewayRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GatewayRequest;
    static deserializeBinaryFromReader(message: GatewayRequest, reader: jspb.BinaryReader): GatewayRequest;
}

export namespace GatewayRequest {
    export type AsObject = {
        newrequest?: items_pb.ItemRequest.AsObject,
        cancelrequest?: items_pb.CancelItemRequest.AsObject,
        undorequest?: UndoItemRequest.AsObject,
        excludeitem?: items_pb.Reference.AsObject,
        includeitem?: items_pb.Reference.AsObject,
        expanditem?: ExpandItemRequest.AsObject,
        unexpanditem?: items_pb.Reference.AsObject,
        minstatusinterval?: google_protobuf_duration_pb.Duration.AsObject,
    }

    export enum RequestTypeCase {
        REQUEST_TYPE_NOT_SET = 0,
        NEWREQUEST = 1,
        CANCELREQUEST = 3,
        UNDOREQUEST = 4,
        EXCLUDEITEM = 5,
        INCLUDEITEM = 6,
        EXPANDITEM = 7,
        UNEXPANDITEM = 8,
    }

}

export class GatewayResponse extends jspb.Message { 

    hasNewitem(): boolean;
    clearNewitem(): void;
    getNewitem(): items_pb.Item | undefined;
    setNewitem(value?: items_pb.Item): GatewayResponse;

    hasNewedge(): boolean;
    clearNewedge(): void;
    getNewedge(): items_pb.Edge | undefined;
    setNewedge(value?: items_pb.Edge): GatewayResponse;

    hasNewitemrequesterror(): boolean;
    clearNewitemrequesterror(): void;
    getNewitemrequesterror(): responses_pb.ItemRequestError | undefined;
    setNewitemrequesterror(value?: responses_pb.ItemRequestError): GatewayResponse;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): GatewayRequestStatus | undefined;
    setStatus(value?: GatewayRequestStatus): GatewayResponse;

    hasError(): boolean;
    clearError(): void;
    getError(): string;
    setError(value: string): GatewayResponse;

    getResponseTypeCase(): GatewayResponse.ResponseTypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GatewayResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GatewayResponse): GatewayResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GatewayResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GatewayResponse;
    static deserializeBinaryFromReader(message: GatewayResponse, reader: jspb.BinaryReader): GatewayResponse;
}

export namespace GatewayResponse {
    export type AsObject = {
        newitem?: items_pb.Item.AsObject,
        newedge?: items_pb.Edge.AsObject,
        newitemrequesterror?: responses_pb.ItemRequestError.AsObject,
        status?: GatewayRequestStatus.AsObject,
        error: string,
    }

    export enum ResponseTypeCase {
        RESPONSE_TYPE_NOT_SET = 0,
        NEWITEM = 2,
        NEWEDGE = 3,
        NEWITEMREQUESTERROR = 6,
        STATUS = 4,
        ERROR = 5,
    }

}

export class GatewayRequestStatus extends jspb.Message { 

    getResponderstatesMap(): jspb.Map<string, responses_pb.ResponderState>;
    clearResponderstatesMap(): void;

    hasSummary(): boolean;
    clearSummary(): void;
    getSummary(): GatewayRequestStatus.Summary | undefined;
    setSummary(value?: GatewayRequestStatus.Summary): GatewayRequestStatus;
    getPostprocessingcomplete(): boolean;
    setPostprocessingcomplete(value: boolean): GatewayRequestStatus;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GatewayRequestStatus.AsObject;
    static toObject(includeInstance: boolean, msg: GatewayRequestStatus): GatewayRequestStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GatewayRequestStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GatewayRequestStatus;
    static deserializeBinaryFromReader(message: GatewayRequestStatus, reader: jspb.BinaryReader): GatewayRequestStatus;
}

export namespace GatewayRequestStatus {
    export type AsObject = {

        responderstatesMap: Array<[string, responses_pb.ResponderState]>,
        summary?: GatewayRequestStatus.Summary.AsObject,
        postprocessingcomplete: boolean,
    }


    export class Summary extends jspb.Message { 
        getWorking(): number;
        setWorking(value: number): Summary;
        getStalled(): number;
        setStalled(value: number): Summary;
        getComplete(): number;
        setComplete(value: number): Summary;
        getError(): number;
        setError(value: number): Summary;
        getCancelled(): number;
        setCancelled(value: number): Summary;
        getResponders(): number;
        setResponders(value: number): Summary;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Summary.AsObject;
        static toObject(includeInstance: boolean, msg: Summary): Summary.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Summary, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Summary;
        static deserializeBinaryFromReader(message: Summary, reader: jspb.BinaryReader): Summary;
    }

    export namespace Summary {
        export type AsObject = {
            working: number,
            stalled: number,
            complete: number,
            error: number,
            cancelled: number,
            responders: number,
        }
    }

}
