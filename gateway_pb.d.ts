// package: 
// file: gateway.proto

import * as jspb from "google-protobuf";
import * as items_pb from "./items_pb";
import * as responses_pb from "./responses_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class GatewayRequest extends jspb.Message {
  hasRequest(): boolean;
  clearRequest(): void;
  getRequest(): items_pb.ItemRequest | undefined;
  setRequest(value?: items_pb.ItemRequest): void;

  hasCancel(): boolean;
  clearCancel(): void;
  getCancel(): items_pb.CancelItemRequest | undefined;
  setCancel(value?: items_pb.CancelItemRequest): void;

  hasMinstatusinterval(): boolean;
  clearMinstatusinterval(): void;
  getMinstatusinterval(): google_protobuf_duration_pb.Duration | undefined;
  setMinstatusinterval(value?: google_protobuf_duration_pb.Duration): void;

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
    request?: items_pb.ItemRequest.AsObject,
    cancel?: items_pb.CancelItemRequest.AsObject,
    minstatusinterval?: google_protobuf_duration_pb.Duration.AsObject,
  }

  export enum RequestTypeCase {
    REQUEST_TYPE_NOT_SET = 0,
    REQUEST = 1,
    CANCEL = 3,
  }
}

export class GatewayResponse extends jspb.Message {
  hasNewitem(): boolean;
  clearNewitem(): void;
  getNewitem(): items_pb.Item | undefined;
  setNewitem(value?: items_pb.Item): void;

  hasNewedge(): boolean;
  clearNewedge(): void;
  getNewedge(): items_pb.Edge | undefined;
  setNewedge(value?: items_pb.Edge): void;

  hasNewitemrequesterror(): boolean;
  clearNewitemrequesterror(): void;
  getNewitemrequesterror(): responses_pb.ItemRequestError | undefined;
  setNewitemrequesterror(value?: responses_pb.ItemRequestError): void;

  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): GatewayRequestStatus | undefined;
  setStatus(value?: GatewayRequestStatus): void;

  hasError(): boolean;
  clearError(): void;
  getError(): string;
  setError(value: string): void;

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
  getResponderstatesMap(): jspb.Map<string, responses_pb.ResponderState[keyof responses_pb.ResponderState]>;
  clearResponderstatesMap(): void;
  hasSummary(): boolean;
  clearSummary(): void;
  getSummary(): GatewayRequestStatus.Summary | undefined;
  setSummary(value?: GatewayRequestStatus.Summary): void;

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
    responderstatesMap: Array<[string, responses_pb.ResponderState[keyof responses_pb.ResponderState]]>,
    summary?: GatewayRequestStatus.Summary.AsObject,
  }

  export class Summary extends jspb.Message {
    getWorking(): number;
    setWorking(value: number): void;

    getStalled(): number;
    setStalled(value: number): void;

    getComplete(): number;
    setComplete(value: number): void;

    getError(): number;
    setError(value: number): void;

    getCancelled(): number;
    setCancelled(value: number): void;

    getResponders(): number;
    setResponders(value: number): void;

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

