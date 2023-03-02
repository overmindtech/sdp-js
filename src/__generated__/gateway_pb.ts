// @generated by protoc-gen-es v1.0.0 with parameter "target=ts,import_extension=.ts"
// @generated from file gateway.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Duration, Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { CancelItemRequest, Edge, Item, ItemRequest, Reference } from "./items_pb.ts";
import { ItemRequestError, ResponderState } from "./responses_pb.ts";

/**
 * This message is sent to the gateway to instruct it to "undo" a request. This
 * means that the request will be removed from the session, along with all items
 * that were a result of that request. If these items have already been sent to
 * the client, the gateway will send `deleteItem` messages instructing the
 * client to delete them
 *
 * @generated from message UndoItemRequest
 */
export class UndoItemRequest extends Message<UndoItemRequest> {
  /**
   * UUID of the request to undo
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<UndoItemRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "UndoItemRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UndoItemRequest {
    return new UndoItemRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UndoItemRequest {
    return new UndoItemRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UndoItemRequest {
    return new UndoItemRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UndoItemRequest | PlainMessage<UndoItemRequest> | undefined, b: UndoItemRequest | PlainMessage<UndoItemRequest> | undefined): boolean {
    return proto3.util.equals(UndoItemRequest, a, b);
  }
}

/**
 * This requests that the gateway "expands" an item. This involves executing all
 * linked item requests within the session and sending the results to the
 * client. It is recommended that this be used rather than simply sending each
 * linked item request. Using this request type allows the Gateway to save the
 * session more intelligently so that it can be bookmarked and used later.
 * "Expanding" an item will mean an item always acts the same, even if its
 * linked item requests have changed
 *
 * @generated from message ExpandItemRequest
 */
export class ExpandItemRequest extends Message<ExpandItemRequest> {
  /**
   * The item that should be expanded
   *
   * @generated from field: Reference item = 1;
   */
  item?: Reference;

  /**
   * How many levels of expansion should be run
   *
   * @generated from field: uint32 linkDepth = 2;
   */
  linkDepth = 0;

  constructor(data?: PartialMessage<ExpandItemRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ExpandItemRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "item", kind: "message", T: Reference },
    { no: 2, name: "linkDepth", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExpandItemRequest {
    return new ExpandItemRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExpandItemRequest {
    return new ExpandItemRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExpandItemRequest {
    return new ExpandItemRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ExpandItemRequest | PlainMessage<ExpandItemRequest> | undefined, b: ExpandItemRequest | PlainMessage<ExpandItemRequest> | undefined): boolean {
    return proto3.util.equals(ExpandItemRequest, a, b);
  }
}

/**
 * Descriptor for a snapshot
 *
 * @generated from message SnapshotDescriptor
 */
export class SnapshotDescriptor extends Message<SnapshotDescriptor> {
  /**
   * unique id to identify this snapshot
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * timestamp when this snapshot was created
   *
   * @generated from field: google.protobuf.Timestamp created = 2;
   */
  created?: Timestamp;

  /**
   * user supplied name of this snapshot
   *
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * user supplied description of this snapshot
   *
   * @generated from field: string description = 4;
   */
  description = "";

  /**
   * number of items in this snapshot
   *
   * @generated from field: uint32 size = 5;
   */
  size = 0;

  constructor(data?: PartialMessage<SnapshotDescriptor>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "SnapshotDescriptor";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "created", kind: "message", T: Timestamp },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotDescriptor {
    return new SnapshotDescriptor().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotDescriptor {
    return new SnapshotDescriptor().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotDescriptor {
    return new SnapshotDescriptor().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotDescriptor | PlainMessage<SnapshotDescriptor> | undefined, b: SnapshotDescriptor | PlainMessage<SnapshotDescriptor> | undefined): boolean {
    return proto3.util.equals(SnapshotDescriptor, a, b);
  }
}

/**
 * Retrieve the list of stored query snapshots for the currently active account.
 * Returns a SnapshotList
 *
 * TODO: pagination
 *
 * @generated from message ListSnapshots
 */
export class ListSnapshots extends Message<ListSnapshots> {
  constructor(data?: PartialMessage<ListSnapshots>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ListSnapshots";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListSnapshots {
    return new ListSnapshots().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListSnapshots {
    return new ListSnapshots().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListSnapshots {
    return new ListSnapshots().fromJsonString(jsonString, options);
  }

  static equals(a: ListSnapshots | PlainMessage<ListSnapshots> | undefined, b: ListSnapshots | PlainMessage<ListSnapshots> | undefined): boolean {
    return proto3.util.equals(ListSnapshots, a, b);
  }
}

/**
 * response format for ListSnapshots
 *
 * @generated from message SnapshotList
 */
export class SnapshotList extends Message<SnapshotList> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * @generated from field: repeated SnapshotDescriptor snapshots = 3;
   */
  snapshots: SnapshotDescriptor[] = [];

  constructor(data?: PartialMessage<SnapshotList>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "SnapshotList";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "snapshots", kind: "message", T: SnapshotDescriptor, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotList {
    return new SnapshotList().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotList {
    return new SnapshotList().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotList {
    return new SnapshotList().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotList | PlainMessage<SnapshotList> | undefined, b: SnapshotList | PlainMessage<SnapshotList> | undefined): boolean {
    return proto3.util.equals(SnapshotList, a, b);
  }
}

/**
 * Ask the gateway to store the current state as snapshot with the specified details.
 * Returns a SnapshotStored message when the snapshot is stored
 *
 * @generated from message StoreSnapshot
 */
export class StoreSnapshot extends Message<StoreSnapshot> {
  /**
   * user supplied name of this snapshot
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * user supplied description of this snapshot
   *
   * @generated from field: string description = 2;
   */
  description = "";

  constructor(data?: PartialMessage<StoreSnapshot>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "StoreSnapshot";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StoreSnapshot {
    return new StoreSnapshot().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StoreSnapshot {
    return new StoreSnapshot().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StoreSnapshot {
    return new StoreSnapshot().fromJsonString(jsonString, options);
  }

  static equals(a: StoreSnapshot | PlainMessage<StoreSnapshot> | undefined, b: StoreSnapshot | PlainMessage<StoreSnapshot> | undefined): boolean {
    return proto3.util.equals(StoreSnapshot, a, b);
  }
}

/**
 * After a snapshot is successfully stored, this reply with the new snapshot's details is sent.
 *
 * @generated from message SnapshotStored
 */
export class SnapshotStored extends Message<SnapshotStored> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * @generated from field: SnapshotDescriptor snapshot = 3;
   */
  snapshot?: SnapshotDescriptor;

  constructor(data?: PartialMessage<SnapshotStored>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "SnapshotStored";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "snapshot", kind: "message", T: SnapshotDescriptor },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotStored {
    return new SnapshotStored().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotStored {
    return new SnapshotStored().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotStored {
    return new SnapshotStored().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotStored | PlainMessage<SnapshotStored> | undefined, b: SnapshotStored | PlainMessage<SnapshotStored> | undefined): boolean {
    return proto3.util.equals(SnapshotStored, a, b);
  }
}

/**
 * Ask the gateway to load the specified snapshot into the current state.
 * Results are streamed to the client in the same way query results are.
 *
 * @generated from message LoadSnapshot
 */
export class LoadSnapshot extends Message<LoadSnapshot> {
  /**
   * unique id of the snapshot to load
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<LoadSnapshot>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "LoadSnapshot";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LoadSnapshot {
    return new LoadSnapshot().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LoadSnapshot {
    return new LoadSnapshot().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LoadSnapshot {
    return new LoadSnapshot().fromJsonString(jsonString, options);
  }

  static equals(a: LoadSnapshot | PlainMessage<LoadSnapshot> | undefined, b: LoadSnapshot | PlainMessage<LoadSnapshot> | undefined): boolean {
    return proto3.util.equals(LoadSnapshot, a, b);
  }
}

/**
 * @generated from message SnapshotLoadResult
 */
export class SnapshotLoadResult extends Message<SnapshotLoadResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  constructor(data?: PartialMessage<SnapshotLoadResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "SnapshotLoadResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotLoadResult {
    return new SnapshotLoadResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotLoadResult {
    return new SnapshotLoadResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotLoadResult {
    return new SnapshotLoadResult().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotLoadResult | PlainMessage<SnapshotLoadResult> | undefined, b: SnapshotLoadResult | PlainMessage<SnapshotLoadResult> | undefined): boolean {
    return proto3.util.equals(SnapshotLoadResult, a, b);
  }
}

/**
 * Delete the snapshot with the specified ID.
 *
 * @generated from message DeleteSnapshot
 */
export class DeleteSnapshot extends Message<DeleteSnapshot> {
  /**
   * unique id of the snapshot to delete
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<DeleteSnapshot>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "DeleteSnapshot";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteSnapshot {
    return new DeleteSnapshot().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteSnapshot {
    return new DeleteSnapshot().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteSnapshot {
    return new DeleteSnapshot().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteSnapshot | PlainMessage<DeleteSnapshot> | undefined, b: DeleteSnapshot | PlainMessage<DeleteSnapshot> | undefined): boolean {
    return proto3.util.equals(DeleteSnapshot, a, b);
  }
}

/**
 * @generated from message SnapshotDeleteResult
 */
export class SnapshotDeleteResult extends Message<SnapshotDeleteResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  constructor(data?: PartialMessage<SnapshotDeleteResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "SnapshotDeleteResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotDeleteResult {
    return new SnapshotDeleteResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotDeleteResult {
    return new SnapshotDeleteResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotDeleteResult {
    return new SnapshotDeleteResult().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotDeleteResult | PlainMessage<SnapshotDeleteResult> | undefined, b: SnapshotDeleteResult | PlainMessage<SnapshotDeleteResult> | undefined): boolean {
    return proto3.util.equals(SnapshotDeleteResult, a, b);
  }
}

/**
 * A union of all request made to the gateway.
 *
 * @generated from message GatewayRequest
 */
export class GatewayRequest extends Message<GatewayRequest> {
  /**
   * @generated from oneof GatewayRequest.request_type
   */
  requestType: {
    /**
     * Adds a new request to the session, starting it immediately
     *
     * @generated from field: ItemRequest newRequest = 1;
     */
    value: ItemRequest;
    case: "newRequest";
  } | {
    /**
     * Cancel a running request
     *
     * @generated from field: CancelItemRequest cancelRequest = 3;
     */
    value: CancelItemRequest;
    case: "cancelRequest";
  } | {
    /**
     * Undo the specified request, if it was the last request received by the gateway. This removes it and all of its results from the session
     *
     * @generated from field: UndoItemRequest undoRequest = 4;
     */
    value: UndoItemRequest;
    case: "undoRequest";
  } | {
    /**
     * Exclude an item from the results
     *
     * @generated from field: Reference excludeItem = 5;
     */
    value: Reference;
    case: "excludeItem";
  } | {
    /**
     * Remove an item from the list of exclusions
     *
     * @generated from field: Reference includeItem = 6;
     */
    value: Reference;
    case: "includeItem";
  } | {
    /**
     * Expand linked items for a given item
     *
     * @generated from field: ExpandItemRequest expandItem = 7;
     */
    value: ExpandItemRequest;
    case: "expandItem";
  } | {
    /**
     * Revert the expansions for a given item
     *
     * @generated from field: Reference unexpandItem = 8;
     */
    value: Reference;
    case: "unexpandItem";
  } | {
    /**
     * return the requested list of snapshots
     *
     * @generated from field: ListSnapshots listSnapshots = 9;
     */
    value: ListSnapshots;
    case: "listSnapshots";
  } | {
    /**
     * store the current state as snapshot
     *
     * @generated from field: StoreSnapshot storeSnapshot = 10;
     */
    value: StoreSnapshot;
    case: "storeSnapshot";
  } | {
    /**
     * load a snapshot into the current state
     *
     * @generated from field: LoadSnapshot loadSnapshot = 11;
     */
    value: LoadSnapshot;
    case: "loadSnapshot";
  } | {
    /**
     * delete a snapshot from the underlying storage
     *
     * @generated from field: DeleteSnapshot deleteSnapshot = 12;
     */
    value: DeleteSnapshot;
    case: "deleteSnapshot";
  } | { case: undefined; value?: undefined } = { case: undefined };

  /**
   * Minimum time between status updates. Setting this value too low can result in too many status messages
   *
   * @generated from field: optional google.protobuf.Duration minStatusInterval = 2;
   */
  minStatusInterval?: Duration;

  constructor(data?: PartialMessage<GatewayRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "GatewayRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "newRequest", kind: "message", T: ItemRequest, oneof: "request_type" },
    { no: 3, name: "cancelRequest", kind: "message", T: CancelItemRequest, oneof: "request_type" },
    { no: 4, name: "undoRequest", kind: "message", T: UndoItemRequest, oneof: "request_type" },
    { no: 5, name: "excludeItem", kind: "message", T: Reference, oneof: "request_type" },
    { no: 6, name: "includeItem", kind: "message", T: Reference, oneof: "request_type" },
    { no: 7, name: "expandItem", kind: "message", T: ExpandItemRequest, oneof: "request_type" },
    { no: 8, name: "unexpandItem", kind: "message", T: Reference, oneof: "request_type" },
    { no: 9, name: "listSnapshots", kind: "message", T: ListSnapshots, oneof: "request_type" },
    { no: 10, name: "storeSnapshot", kind: "message", T: StoreSnapshot, oneof: "request_type" },
    { no: 11, name: "loadSnapshot", kind: "message", T: LoadSnapshot, oneof: "request_type" },
    { no: 12, name: "deleteSnapshot", kind: "message", T: DeleteSnapshot, oneof: "request_type" },
    { no: 2, name: "minStatusInterval", kind: "message", T: Duration, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GatewayRequest {
    return new GatewayRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GatewayRequest {
    return new GatewayRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GatewayRequest {
    return new GatewayRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GatewayRequest | PlainMessage<GatewayRequest> | undefined, b: GatewayRequest | PlainMessage<GatewayRequest> | undefined): boolean {
    return proto3.util.equals(GatewayRequest, a, b);
  }
}

/**
 * The gateway will always respond with this type of message,
 * however the purpose of it is purely as a wrapper to the many different types
 * of messages that the gateway can send
 *
 * @generated from message GatewayResponse
 */
export class GatewayResponse extends Message<GatewayResponse> {
  /**
   * @generated from oneof GatewayResponse.response_type
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
  } | {
    /**
     * Status of the overall request
     *
     * @generated from field: GatewayRequestStatus status = 4;
     */
    value: GatewayRequestStatus;
    case: "status";
  } | {
    /**
     * An error that means the request couldn't be executed
     *
     * @generated from field: string error = 5;
     */
    value: string;
    case: "error";
  } | {
    /**
     * A new error that was encountered as part of the request
     *
     * @generated from field: ItemRequestError newItemRequestError = 6;
     */
    value: ItemRequestError;
    case: "newItemRequestError";
  } | {
    /**
     * An item that should be deleted from local state
     *
     * @generated from field: Reference deleteItem = 7;
     */
    value: Reference;
    case: "deleteItem";
  } | {
    /**
     * An edge that should be deleted form local state
     *
     * @generated from field: Edge deleteEdge = 8;
     */
    value: Edge;
    case: "deleteEdge";
  } | {
    /**
     * An item that has already been sent, but contains new data, it should be updated to reflect this version
     *
     * @generated from field: Item updateItem = 9;
     */
    value: Item;
    case: "updateItem";
  } | {
    /**
     * @generated from field: SnapshotList snapshotList = 10;
     */
    value: SnapshotList;
    case: "snapshotList";
  } | {
    /**
     * @generated from field: SnapshotStored snapshotStored = 11;
     */
    value: SnapshotStored;
    case: "snapshotStored";
  } | {
    /**
     * @generated from field: SnapshotLoadResult snapshotLoadResult = 12;
     */
    value: SnapshotLoadResult;
    case: "snapshotLoadResult";
  } | {
    /**
     * @generated from field: SnapshotDeleteResult snapshotDeleteResult = 13;
     */
    value: SnapshotDeleteResult;
    case: "snapshotDeleteResult";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<GatewayResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "GatewayResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "newItem", kind: "message", T: Item, oneof: "response_type" },
    { no: 3, name: "newEdge", kind: "message", T: Edge, oneof: "response_type" },
    { no: 4, name: "status", kind: "message", T: GatewayRequestStatus, oneof: "response_type" },
    { no: 5, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "response_type" },
    { no: 6, name: "newItemRequestError", kind: "message", T: ItemRequestError, oneof: "response_type" },
    { no: 7, name: "deleteItem", kind: "message", T: Reference, oneof: "response_type" },
    { no: 8, name: "deleteEdge", kind: "message", T: Edge, oneof: "response_type" },
    { no: 9, name: "updateItem", kind: "message", T: Item, oneof: "response_type" },
    { no: 10, name: "snapshotList", kind: "message", T: SnapshotList, oneof: "response_type" },
    { no: 11, name: "snapshotStored", kind: "message", T: SnapshotStored, oneof: "response_type" },
    { no: 12, name: "snapshotLoadResult", kind: "message", T: SnapshotLoadResult, oneof: "response_type" },
    { no: 13, name: "snapshotDeleteResult", kind: "message", T: SnapshotDeleteResult, oneof: "response_type" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GatewayResponse {
    return new GatewayResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GatewayResponse {
    return new GatewayResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GatewayResponse {
    return new GatewayResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GatewayResponse | PlainMessage<GatewayResponse> | undefined, b: GatewayResponse | PlainMessage<GatewayResponse> | undefined): boolean {
    return proto3.util.equals(GatewayResponse, a, b);
  }
}

/**
 * Contains the status of the gateway request
 *
 * @generated from message GatewayRequestStatus
 */
export class GatewayRequestStatus extends Message<GatewayRequestStatus> {
  /**
   * @generated from field: map<string, ResponderState> responderStates = 1;
   */
  responderStates: { [key: string]: ResponderState } = {};

  /**
   * @generated from field: GatewayRequestStatus.Summary summary = 3;
   */
  summary?: GatewayRequestStatus_Summary;

  /**
   * Whether all items have finished being processed by the gateway. It is
   * possible for all responders to be complete, but the gateway is still
   * working. A request should only be considered complete when all working ==
   * 0 and postProcessingComplete == true
   *
   * @generated from field: bool postProcessingComplete = 4;
   */
  postProcessingComplete = false;

  constructor(data?: PartialMessage<GatewayRequestStatus>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "GatewayRequestStatus";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "responderStates", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "enum", T: proto3.getEnumType(ResponderState)} },
    { no: 3, name: "summary", kind: "message", T: GatewayRequestStatus_Summary },
    { no: 4, name: "postProcessingComplete", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GatewayRequestStatus {
    return new GatewayRequestStatus().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GatewayRequestStatus {
    return new GatewayRequestStatus().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GatewayRequestStatus {
    return new GatewayRequestStatus().fromJsonString(jsonString, options);
  }

  static equals(a: GatewayRequestStatus | PlainMessage<GatewayRequestStatus> | undefined, b: GatewayRequestStatus | PlainMessage<GatewayRequestStatus> | undefined): boolean {
    return proto3.util.equals(GatewayRequestStatus, a, b);
  }
}

/**
 * @generated from message GatewayRequestStatus.Summary
 */
export class GatewayRequestStatus_Summary extends Message<GatewayRequestStatus_Summary> {
  /**
   * @generated from field: int32 working = 1;
   */
  working = 0;

  /**
   * @generated from field: int32 stalled = 2;
   */
  stalled = 0;

  /**
   * @generated from field: int32 complete = 3;
   */
  complete = 0;

  /**
   * @generated from field: int32 error = 4;
   */
  error = 0;

  /**
   * @generated from field: int32 cancelled = 5;
   */
  cancelled = 0;

  /**
   * @generated from field: int32 responders = 6;
   */
  responders = 0;

  constructor(data?: PartialMessage<GatewayRequestStatus_Summary>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "GatewayRequestStatus.Summary";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "working", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "stalled", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "complete", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "error", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "cancelled", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "responders", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GatewayRequestStatus_Summary {
    return new GatewayRequestStatus_Summary().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GatewayRequestStatus_Summary {
    return new GatewayRequestStatus_Summary().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GatewayRequestStatus_Summary {
    return new GatewayRequestStatus_Summary().fromJsonString(jsonString, options);
  }

  static equals(a: GatewayRequestStatus_Summary | PlainMessage<GatewayRequestStatus_Summary> | undefined, b: GatewayRequestStatus_Summary | PlainMessage<GatewayRequestStatus_Summary> | undefined): boolean {
    return proto3.util.equals(GatewayRequestStatus_Summary, a, b);
  }
}
