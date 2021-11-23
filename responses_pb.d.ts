// package: 
// file: responses.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class Response extends jspb.Message {
  getResponder(): string;
  setResponder(value: string): void;

  getState(): Response.ResponseStateMap[keyof Response.ResponseStateMap];
  setState(value: Response.ResponseStateMap[keyof Response.ResponseStateMap]): void;

  hasNextupdatein(): boolean;
  clearNextupdatein(): void;
  getNextupdatein(): google_protobuf_duration_pb.Duration | undefined;
  setNextupdatein(value?: google_protobuf_duration_pb.Duration): void;

  getItemrequestuuid(): Uint8Array | string;
  getItemrequestuuid_asU8(): Uint8Array;
  getItemrequestuuid_asB64(): string;
  setItemrequestuuid(value: Uint8Array | string): void;

  hasError(): boolean;
  clearError(): void;
  getError(): ItemRequestError | undefined;
  setError(value?: ItemRequestError): void;

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
    state: Response.ResponseStateMap[keyof Response.ResponseStateMap],
    nextupdatein?: google_protobuf_duration_pb.Duration.AsObject,
    itemrequestuuid: Uint8Array | string,
    error?: ItemRequestError.AsObject,
  }

  export interface ResponseStateMap {
    WORKING: 0;
    COMPLETE: 1;
    ERROR: 2;
    CANCELLED: 3;
  }

  export const ResponseState: ResponseStateMap;
}

export class ItemRequestError extends jspb.Message {
  getItemrequestuuid(): Uint8Array | string;
  getItemrequestuuid_asU8(): Uint8Array;
  getItemrequestuuid_asB64(): string;
  setItemrequestuuid(value: Uint8Array | string): void;

  getErrortype(): ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap];
  setErrortype(value: ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap]): void;

  getErrorstring(): string;
  setErrorstring(value: string): void;

  getContext(): string;
  setContext(value: string): void;

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
    errortype: ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap],
    errorstring: string,
    context: string,
  }

  export interface ErrorTypeMap {
    OTHER: 0;
    NOTFOUND: 1;
    NOCONTEXT: 2;
    TIMEOUT: 3;
  }

  export const ErrorType: ErrorTypeMap;
}

