// package: 
// file: gateway.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as items_pb from "./items_pb";
import * as responses_pb from "./responses_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

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

export class SnapshotDescriptor extends jspb.Message { 
    getUuid(): Uint8Array | string;
    getUuid_asU8(): Uint8Array;
    getUuid_asB64(): string;
    setUuid(value: Uint8Array | string): SnapshotDescriptor;

    hasCreated(): boolean;
    clearCreated(): void;
    getCreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreated(value?: google_protobuf_timestamp_pb.Timestamp): SnapshotDescriptor;
    getName(): string;
    setName(value: string): SnapshotDescriptor;
    getDescription(): string;
    setDescription(value: string): SnapshotDescriptor;
    getSize(): number;
    setSize(value: number): SnapshotDescriptor;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotDescriptor.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotDescriptor): SnapshotDescriptor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotDescriptor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotDescriptor;
    static deserializeBinaryFromReader(message: SnapshotDescriptor, reader: jspb.BinaryReader): SnapshotDescriptor;
}

export namespace SnapshotDescriptor {
    export type AsObject = {
        uuid: Uint8Array | string,
        created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        name: string,
        description: string,
        size: number,
    }
}

export class ListSnapshots extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListSnapshots.AsObject;
    static toObject(includeInstance: boolean, msg: ListSnapshots): ListSnapshots.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListSnapshots, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListSnapshots;
    static deserializeBinaryFromReader(message: ListSnapshots, reader: jspb.BinaryReader): ListSnapshots;
}

export namespace ListSnapshots {
    export type AsObject = {
    }
}

export class SnapshotList extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SnapshotList;
    getErrormessage(): string;
    setErrormessage(value: string): SnapshotList;
    clearSnapshotsList(): void;
    getSnapshotsList(): Array<SnapshotDescriptor>;
    setSnapshotsList(value: Array<SnapshotDescriptor>): SnapshotList;
    addSnapshots(value?: SnapshotDescriptor, index?: number): SnapshotDescriptor;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotList.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotList): SnapshotList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotList;
    static deserializeBinaryFromReader(message: SnapshotList, reader: jspb.BinaryReader): SnapshotList;
}

export namespace SnapshotList {
    export type AsObject = {
        success: boolean,
        errormessage: string,
        snapshotsList: Array<SnapshotDescriptor.AsObject>,
    }
}

export class StoreSnapshot extends jspb.Message { 
    getName(): string;
    setName(value: string): StoreSnapshot;
    getDescription(): string;
    setDescription(value: string): StoreSnapshot;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StoreSnapshot.AsObject;
    static toObject(includeInstance: boolean, msg: StoreSnapshot): StoreSnapshot.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StoreSnapshot, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StoreSnapshot;
    static deserializeBinaryFromReader(message: StoreSnapshot, reader: jspb.BinaryReader): StoreSnapshot;
}

export namespace StoreSnapshot {
    export type AsObject = {
        name: string,
        description: string,
    }
}

export class SnapshotStored extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SnapshotStored;
    getErrormessage(): string;
    setErrormessage(value: string): SnapshotStored;

    hasSnapshot(): boolean;
    clearSnapshot(): void;
    getSnapshot(): SnapshotDescriptor | undefined;
    setSnapshot(value?: SnapshotDescriptor): SnapshotStored;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotStored.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotStored): SnapshotStored.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotStored, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotStored;
    static deserializeBinaryFromReader(message: SnapshotStored, reader: jspb.BinaryReader): SnapshotStored;
}

export namespace SnapshotStored {
    export type AsObject = {
        success: boolean,
        errormessage: string,
        snapshot?: SnapshotDescriptor.AsObject,
    }
}

export class LoadSnapshot extends jspb.Message { 
    getUuid(): Uint8Array | string;
    getUuid_asU8(): Uint8Array;
    getUuid_asB64(): string;
    setUuid(value: Uint8Array | string): LoadSnapshot;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoadSnapshot.AsObject;
    static toObject(includeInstance: boolean, msg: LoadSnapshot): LoadSnapshot.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoadSnapshot, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoadSnapshot;
    static deserializeBinaryFromReader(message: LoadSnapshot, reader: jspb.BinaryReader): LoadSnapshot;
}

export namespace LoadSnapshot {
    export type AsObject = {
        uuid: Uint8Array | string,
    }
}

export class SnapshotLoadResult extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SnapshotLoadResult;
    getErrormessage(): string;
    setErrormessage(value: string): SnapshotLoadResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotLoadResult.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotLoadResult): SnapshotLoadResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotLoadResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotLoadResult;
    static deserializeBinaryFromReader(message: SnapshotLoadResult, reader: jspb.BinaryReader): SnapshotLoadResult;
}

export namespace SnapshotLoadResult {
    export type AsObject = {
        success: boolean,
        errormessage: string,
    }
}

export class DeleteSnapshot extends jspb.Message { 
    getUuid(): Uint8Array | string;
    getUuid_asU8(): Uint8Array;
    getUuid_asB64(): string;
    setUuid(value: Uint8Array | string): DeleteSnapshot;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteSnapshot.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteSnapshot): DeleteSnapshot.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteSnapshot, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteSnapshot;
    static deserializeBinaryFromReader(message: DeleteSnapshot, reader: jspb.BinaryReader): DeleteSnapshot;
}

export namespace DeleteSnapshot {
    export type AsObject = {
        uuid: Uint8Array | string,
    }
}

export class SnapshotDeleteResult extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SnapshotDeleteResult;
    getErrormessage(): string;
    setErrormessage(value: string): SnapshotDeleteResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotDeleteResult.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotDeleteResult): SnapshotDeleteResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotDeleteResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotDeleteResult;
    static deserializeBinaryFromReader(message: SnapshotDeleteResult, reader: jspb.BinaryReader): SnapshotDeleteResult;
}

export namespace SnapshotDeleteResult {
    export type AsObject = {
        success: boolean,
        errormessage: string,
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

    hasListsnapshots(): boolean;
    clearListsnapshots(): void;
    getListsnapshots(): ListSnapshots | undefined;
    setListsnapshots(value?: ListSnapshots): GatewayRequest;

    hasStoresnapshot(): boolean;
    clearStoresnapshot(): void;
    getStoresnapshot(): StoreSnapshot | undefined;
    setStoresnapshot(value?: StoreSnapshot): GatewayRequest;

    hasLoadsnapshot(): boolean;
    clearLoadsnapshot(): void;
    getLoadsnapshot(): LoadSnapshot | undefined;
    setLoadsnapshot(value?: LoadSnapshot): GatewayRequest;

    hasDeletesnapshot(): boolean;
    clearDeletesnapshot(): void;
    getDeletesnapshot(): DeleteSnapshot | undefined;
    setDeletesnapshot(value?: DeleteSnapshot): GatewayRequest;

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
        listsnapshots?: ListSnapshots.AsObject,
        storesnapshot?: StoreSnapshot.AsObject,
        loadsnapshot?: LoadSnapshot.AsObject,
        deletesnapshot?: DeleteSnapshot.AsObject,
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
        LISTSNAPSHOTS = 9,
        STORESNAPSHOT = 10,
        LOADSNAPSHOT = 11,
        DELETESNAPSHOT = 12,
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

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): GatewayRequestStatus | undefined;
    setStatus(value?: GatewayRequestStatus): GatewayResponse;

    hasError(): boolean;
    clearError(): void;
    getError(): string;
    setError(value: string): GatewayResponse;

    hasNewitemrequesterror(): boolean;
    clearNewitemrequesterror(): void;
    getNewitemrequesterror(): responses_pb.ItemRequestError | undefined;
    setNewitemrequesterror(value?: responses_pb.ItemRequestError): GatewayResponse;

    hasDeleteitem(): boolean;
    clearDeleteitem(): void;
    getDeleteitem(): items_pb.Reference | undefined;
    setDeleteitem(value?: items_pb.Reference): GatewayResponse;

    hasDeleteedge(): boolean;
    clearDeleteedge(): void;
    getDeleteedge(): items_pb.Edge | undefined;
    setDeleteedge(value?: items_pb.Edge): GatewayResponse;

    hasUpdateitem(): boolean;
    clearUpdateitem(): void;
    getUpdateitem(): items_pb.Item | undefined;
    setUpdateitem(value?: items_pb.Item): GatewayResponse;

    hasSnapshotlist(): boolean;
    clearSnapshotlist(): void;
    getSnapshotlist(): SnapshotList | undefined;
    setSnapshotlist(value?: SnapshotList): GatewayResponse;

    hasSnapshotstored(): boolean;
    clearSnapshotstored(): void;
    getSnapshotstored(): SnapshotStored | undefined;
    setSnapshotstored(value?: SnapshotStored): GatewayResponse;

    hasSnapshotloadresult(): boolean;
    clearSnapshotloadresult(): void;
    getSnapshotloadresult(): SnapshotLoadResult | undefined;
    setSnapshotloadresult(value?: SnapshotLoadResult): GatewayResponse;

    hasSnapshotdeleteresult(): boolean;
    clearSnapshotdeleteresult(): void;
    getSnapshotdeleteresult(): SnapshotDeleteResult | undefined;
    setSnapshotdeleteresult(value?: SnapshotDeleteResult): GatewayResponse;

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
        status?: GatewayRequestStatus.AsObject,
        error: string,
        newitemrequesterror?: responses_pb.ItemRequestError.AsObject,
        deleteitem?: items_pb.Reference.AsObject,
        deleteedge?: items_pb.Edge.AsObject,
        updateitem?: items_pb.Item.AsObject,
        snapshotlist?: SnapshotList.AsObject,
        snapshotstored?: SnapshotStored.AsObject,
        snapshotloadresult?: SnapshotLoadResult.AsObject,
        snapshotdeleteresult?: SnapshotDeleteResult.AsObject,
    }

    export enum ResponseTypeCase {
        RESPONSE_TYPE_NOT_SET = 0,
        NEWITEM = 2,
        NEWEDGE = 3,
        STATUS = 4,
        ERROR = 5,
        NEWITEMREQUESTERROR = 6,
        DELETEITEM = 7,
        DELETEEDGE = 8,
        UPDATEITEM = 9,
        SNAPSHOTLIST = 10,
        SNAPSHOTSTORED = 11,
        SNAPSHOTLOADRESULT = 12,
        SNAPSHOTDELETERESULT = 13,
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
