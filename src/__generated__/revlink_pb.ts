// @generated by protoc-gen-es v1.6.0 with parameter "target=ts,import_extension=.ts"
// @generated from file revlink.proto (package revlink, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Edge, Item, LinkedItemQuery, Reference } from "./items_pb.ts";

/**
 * @generated from message revlink.GetReverseLinksRequest
 */
export class GetReverseLinksRequest extends Message<GetReverseLinksRequest> {
  /**
   * The account that the item belongs to
   *
   * @generated from field: string account = 1;
   */
  account = "";

  /**
   * The item that you would like to find reverse links for
   *
   * @generated from field: Reference item = 2;
   */
  item?: Reference;

  /**
   * set to true to only return links that propagate configuration change impact
   *
   * @generated from field: bool followOnlyBlastPropagation = 3;
   */
  followOnlyBlastPropagation = false;

  constructor(data?: PartialMessage<GetReverseLinksRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "revlink.GetReverseLinksRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "item", kind: "message", T: Reference },
    { no: 3, name: "followOnlyBlastPropagation", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetReverseLinksRequest {
    return new GetReverseLinksRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetReverseLinksRequest {
    return new GetReverseLinksRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetReverseLinksRequest {
    return new GetReverseLinksRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetReverseLinksRequest | PlainMessage<GetReverseLinksRequest> | undefined, b: GetReverseLinksRequest | PlainMessage<GetReverseLinksRequest> | undefined): boolean {
    return proto3.util.equals(GetReverseLinksRequest, a, b);
  }
}

/**
 * @generated from message revlink.GetReverseLinksResponse
 */
export class GetReverseLinksResponse extends Message<GetReverseLinksResponse> {
  /**
   * The item queries that should be executed in order to find items that link
   * to the requested item
   *
   * @generated from field: repeated LinkedItemQuery linkedItemQueries = 1;
   */
  linkedItemQueries: LinkedItemQuery[] = [];

  constructor(data?: PartialMessage<GetReverseLinksResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "revlink.GetReverseLinksResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "linkedItemQueries", kind: "message", T: LinkedItemQuery, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetReverseLinksResponse {
    return new GetReverseLinksResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetReverseLinksResponse {
    return new GetReverseLinksResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetReverseLinksResponse {
    return new GetReverseLinksResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetReverseLinksResponse | PlainMessage<GetReverseLinksResponse> | undefined, b: GetReverseLinksResponse | PlainMessage<GetReverseLinksResponse> | undefined): boolean {
    return proto3.util.equals(GetReverseLinksResponse, a, b);
  }
}

/**
 * @generated from message revlink.IngestGatewayResponseRequest
 */
export class IngestGatewayResponseRequest extends Message<IngestGatewayResponseRequest> {
  /**
   * The account that the response belongs to
   *
   * @generated from field: string account = 1;
   */
  account = "";

  /**
   * The response type to ingest
   *
   * @generated from oneof revlink.IngestGatewayResponseRequest.response_type
   */
  responseType: {
    /**
     * A new item that has been discovered
     *
     * @generated from field: Item newItem = 2;
     */
    value: Item;
    case: "newItem";
  } | {
    /**
     * A new edge between two items
     *
     * @generated from field: Edge newEdge = 3;
     */
    value: Edge;
    case: "newEdge";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<IngestGatewayResponseRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "revlink.IngestGatewayResponseRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "newItem", kind: "message", T: Item, oneof: "response_type" },
    { no: 3, name: "newEdge", kind: "message", T: Edge, oneof: "response_type" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IngestGatewayResponseRequest {
    return new IngestGatewayResponseRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IngestGatewayResponseRequest {
    return new IngestGatewayResponseRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IngestGatewayResponseRequest {
    return new IngestGatewayResponseRequest().fromJsonString(jsonString, options);
  }

  static equals(a: IngestGatewayResponseRequest | PlainMessage<IngestGatewayResponseRequest> | undefined, b: IngestGatewayResponseRequest | PlainMessage<IngestGatewayResponseRequest> | undefined): boolean {
    return proto3.util.equals(IngestGatewayResponseRequest, a, b);
  }
}

/**
 * @generated from message revlink.IngestGatewayResponsesResponse
 */
export class IngestGatewayResponsesResponse extends Message<IngestGatewayResponsesResponse> {
  /**
   * @generated from field: int32 numItemsReceived = 1;
   */
  numItemsReceived = 0;

  /**
   * @generated from field: int32 numEdgesReceived = 2;
   */
  numEdgesReceived = 0;

  constructor(data?: PartialMessage<IngestGatewayResponsesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "revlink.IngestGatewayResponsesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "numItemsReceived", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "numEdgesReceived", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IngestGatewayResponsesResponse {
    return new IngestGatewayResponsesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IngestGatewayResponsesResponse {
    return new IngestGatewayResponsesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IngestGatewayResponsesResponse {
    return new IngestGatewayResponsesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: IngestGatewayResponsesResponse | PlainMessage<IngestGatewayResponsesResponse> | undefined, b: IngestGatewayResponsesResponse | PlainMessage<IngestGatewayResponsesResponse> | undefined): boolean {
    return proto3.util.equals(IngestGatewayResponsesResponse, a, b);
  }
}

