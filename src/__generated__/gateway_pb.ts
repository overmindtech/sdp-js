// @generated by protoc-gen-es v1.4.1 with parameter "target=ts,import_extension=.ts"
// @generated from file gateway.proto (package gateway, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Duration, Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { CancelQuery, Edge, Expand, Item, Query, QueryError, QueryStatus, Reference, UndoExpand, UndoQuery } from "./items_pb.ts";
import { ResponderState } from "./responses_pb.ts";

/**
 * A union of all request made to the gateway.
 *
 * @generated from message gateway.GatewayRequest
 */
export class GatewayRequest extends Message<GatewayRequest> {
  /**
   * @generated from oneof gateway.GatewayRequest.request_type
   */
  requestType: {
    /**
     * Adds a new query for items to the session, starting it immediately
     *
     * @generated from field: Query query = 1;
     */
    value: Query;
    case: "query";
  } | {
    /**
     * Cancel a running query
     *
     * @generated from field: CancelQuery cancelQuery = 3;
     */
    value: CancelQuery;
    case: "cancelQuery";
  } | {
    /**
     * Undo the specified query, if it was the last query received by the gateway. This removes it and all of its effects from the session
     *
     * @generated from field: UndoQuery undoQuery = 4;
     */
    value: UndoQuery;
    case: "undoQuery";
  } | {
    /**
     * Expand all linked items for the given item
     *
     * @generated from field: Expand expand = 7;
     */
    value: Expand;
    case: "expand";
  } | {
    /**
     * Undo the specified item expansion
     *
     * TODO: CancelExpand?
     *
     * @generated from field: UndoExpand undoExpand = 8;
     */
    value: UndoExpand;
    case: "undoExpand";
  } | {
    /**
     * store the current session state as snapshot
     *
     * @generated from field: gateway.StoreSnapshot storeSnapshot = 10;
     */
    value: StoreSnapshot;
    case: "storeSnapshot";
  } | {
    /**
     * load a snapshot into the current state
     *
     * TODO: implement?
     * // cancel the loading of a snapshot
     * CancelLoadSnapshot cancelLoadSnapshot = ??;
     * // undo the loading of a snapshot
     * UndoLoadSnapshot undoLoadSnapshot = ??;
     *
     * @generated from field: gateway.LoadSnapshot loadSnapshot = 11;
     */
    value: LoadSnapshot;
    case: "loadSnapshot";
  } | {
    /**
     * store the current set of queries as bookmarks
     *
     * @generated from field: gateway.StoreBookmark storeBookmark = 14;
     */
    value: StoreBookmark;
    case: "storeBookmark";
  } | {
    /**
     * load and execute a bookmark into the current state
     *
     * @generated from field: gateway.LoadBookmark loadBookmark = 15;
     */
    value: LoadBookmark;
    case: "loadBookmark";
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

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.GatewayRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "query", kind: "message", T: Query, oneof: "request_type" },
    { no: 3, name: "cancelQuery", kind: "message", T: CancelQuery, oneof: "request_type" },
    { no: 4, name: "undoQuery", kind: "message", T: UndoQuery, oneof: "request_type" },
    { no: 7, name: "expand", kind: "message", T: Expand, oneof: "request_type" },
    { no: 8, name: "undoExpand", kind: "message", T: UndoExpand, oneof: "request_type" },
    { no: 10, name: "storeSnapshot", kind: "message", T: StoreSnapshot, oneof: "request_type" },
    { no: 11, name: "loadSnapshot", kind: "message", T: LoadSnapshot, oneof: "request_type" },
    { no: 14, name: "storeBookmark", kind: "message", T: StoreBookmark, oneof: "request_type" },
    { no: 15, name: "loadBookmark", kind: "message", T: LoadBookmark, oneof: "request_type" },
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
 * @generated from message gateway.GatewayResponse
 */
export class GatewayResponse extends Message<GatewayResponse> {
  /**
   * @generated from oneof gateway.GatewayResponse.response_type
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
     * @generated from field: gateway.GatewayRequestStatus status = 4;
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
     * A new error that was encountered as part of a query
     *
     * @generated from field: QueryError queryError = 6;
     */
    value: QueryError;
    case: "queryError";
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
     * @generated from field: gateway.SnapshotStoreResult snapshotStoreResult = 11;
     */
    value: SnapshotStoreResult;
    case: "snapshotStoreResult";
  } | {
    /**
     * @generated from field: gateway.SnapshotLoadResult snapshotLoadResult = 12;
     */
    value: SnapshotLoadResult;
    case: "snapshotLoadResult";
  } | {
    /**
     * @generated from field: gateway.BookmarkStoreResult bookmarkStoreResult = 15;
     */
    value: BookmarkStoreResult;
    case: "bookmarkStoreResult";
  } | {
    /**
     * @generated from field: gateway.BookmarkLoadResult bookmarkLoadResult = 16;
     */
    value: BookmarkLoadResult;
    case: "bookmarkLoadResult";
  } | {
    /**
     * Status of requested queries
     *
     * @generated from field: QueryStatus queryStatus = 17;
     */
    value: QueryStatus;
    case: "queryStatus";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<GatewayResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.GatewayResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "newItem", kind: "message", T: Item, oneof: "response_type" },
    { no: 3, name: "newEdge", kind: "message", T: Edge, oneof: "response_type" },
    { no: 4, name: "status", kind: "message", T: GatewayRequestStatus, oneof: "response_type" },
    { no: 5, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "response_type" },
    { no: 6, name: "queryError", kind: "message", T: QueryError, oneof: "response_type" },
    { no: 7, name: "deleteItem", kind: "message", T: Reference, oneof: "response_type" },
    { no: 8, name: "deleteEdge", kind: "message", T: Edge, oneof: "response_type" },
    { no: 9, name: "updateItem", kind: "message", T: Item, oneof: "response_type" },
    { no: 11, name: "snapshotStoreResult", kind: "message", T: SnapshotStoreResult, oneof: "response_type" },
    { no: 12, name: "snapshotLoadResult", kind: "message", T: SnapshotLoadResult, oneof: "response_type" },
    { no: 15, name: "bookmarkStoreResult", kind: "message", T: BookmarkStoreResult, oneof: "response_type" },
    { no: 16, name: "bookmarkLoadResult", kind: "message", T: BookmarkLoadResult, oneof: "response_type" },
    { no: 17, name: "queryStatus", kind: "message", T: QueryStatus, oneof: "response_type" },
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
 * Contains the status of the gateway request.
 *
 * @generated from message gateway.GatewayRequestStatus
 */
export class GatewayRequestStatus extends Message<GatewayRequestStatus> {
  /**
   * @generated from field: map<string, ResponderState> responderStates = 1;
   */
  responderStates: { [key: string]: ResponderState } = {};

  /**
   * @generated from field: gateway.GatewayRequestStatus.Summary summary = 3;
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

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.GatewayRequestStatus";
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
 * @generated from message gateway.GatewayRequestStatus.Summary
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

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.GatewayRequestStatus.Summary";
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

/**
 * Ask the gateway to store the current state as bookmark with the specified details.
 * Returns a BookmarkStored message when the bookmark is stored
 *
 * @generated from message gateway.StoreBookmark
 */
export class StoreBookmark extends Message<StoreBookmark> {
  /**
   * user supplied name of this bookmark
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * user supplied description of this bookmark
   *
   * @generated from field: string description = 2;
   */
  description = "";

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 3;
   */
  msgID = new Uint8Array(0);

  /**
   * whether this bookmark should be stored as a system bookmark. System
   * bookmarks are hidden and can only be returned via the UUID, they don't
   * show up in lists
   *
   * @generated from field: bool isSystem = 4;
   */
  isSystem = false;

  constructor(data?: PartialMessage<StoreBookmark>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.StoreBookmark";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "isSystem", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StoreBookmark {
    return new StoreBookmark().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StoreBookmark {
    return new StoreBookmark().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StoreBookmark {
    return new StoreBookmark().fromJsonString(jsonString, options);
  }

  static equals(a: StoreBookmark | PlainMessage<StoreBookmark> | undefined, b: StoreBookmark | PlainMessage<StoreBookmark> | undefined): boolean {
    return proto3.util.equals(StoreBookmark, a, b);
  }
}

/**
 * After a bookmark is successfully stored, this reply with the new bookmark's details is sent.
 *
 * @generated from message gateway.BookmarkStoreResult
 */
export class BookmarkStoreResult extends Message<BookmarkStoreResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID = new Uint8Array(0);

  /**
   * UUID of the newly created bookmark
   *
   * @generated from field: bytes bookmarkID = 5;
   */
  bookmarkID = new Uint8Array(0);

  constructor(data?: PartialMessage<BookmarkStoreResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.BookmarkStoreResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "bookmarkID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkStoreResult {
    return new BookmarkStoreResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkStoreResult {
    return new BookmarkStoreResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkStoreResult {
    return new BookmarkStoreResult().fromJsonString(jsonString, options);
  }

  static equals(a: BookmarkStoreResult | PlainMessage<BookmarkStoreResult> | undefined, b: BookmarkStoreResult | PlainMessage<BookmarkStoreResult> | undefined): boolean {
    return proto3.util.equals(BookmarkStoreResult, a, b);
  }
}

/**
 * Ask the gateway to load the specified bookmark into the current state.
 * Results are streamed to the client in the same way query results are.
 *
 * @generated from message gateway.LoadBookmark
 */
export class LoadBookmark extends Message<LoadBookmark> {
  /**
   * unique id of the bookmark to load
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 2;
   */
  msgID = new Uint8Array(0);

  /**
   * set to true to force fetching fresh data
   *
   * @generated from field: bool ignoreCache = 3;
   */
  ignoreCache = false;

  /**
   * The time at which the gateway should stop processing the queries spawned by this request
   *
   * @generated from field: google.protobuf.Timestamp deadline = 4;
   */
  deadline?: Timestamp;

  constructor(data?: PartialMessage<LoadBookmark>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.LoadBookmark";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "ignoreCache", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "deadline", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LoadBookmark {
    return new LoadBookmark().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LoadBookmark {
    return new LoadBookmark().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LoadBookmark {
    return new LoadBookmark().fromJsonString(jsonString, options);
  }

  static equals(a: LoadBookmark | PlainMessage<LoadBookmark> | undefined, b: LoadBookmark | PlainMessage<LoadBookmark> | undefined): boolean {
    return proto3.util.equals(LoadBookmark, a, b);
  }
}

/**
 * @generated from message gateway.BookmarkLoadResult
 */
export class BookmarkLoadResult extends Message<BookmarkLoadResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * UUIDs of all queries that have been started as a result of loading this bookmark
   *
   * @generated from field: repeated bytes startedQueryUUIDs = 3;
   */
  startedQueryUUIDs: Uint8Array[] = [];

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID = new Uint8Array(0);

  constructor(data?: PartialMessage<BookmarkLoadResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.BookmarkLoadResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "startedQueryUUIDs", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
    { no: 4, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkLoadResult {
    return new BookmarkLoadResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkLoadResult {
    return new BookmarkLoadResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkLoadResult {
    return new BookmarkLoadResult().fromJsonString(jsonString, options);
  }

  static equals(a: BookmarkLoadResult | PlainMessage<BookmarkLoadResult> | undefined, b: BookmarkLoadResult | PlainMessage<BookmarkLoadResult> | undefined): boolean {
    return proto3.util.equals(BookmarkLoadResult, a, b);
  }
}

/**
 * Ask the gateway to store the current state as snapshot with the specified details.
 * Returns a SnapshotStored message when the snapshot is stored
 *
 * @generated from message gateway.StoreSnapshot
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

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 3;
   */
  msgID = new Uint8Array(0);

  constructor(data?: PartialMessage<StoreSnapshot>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.StoreSnapshot";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
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
 * @generated from message gateway.SnapshotStoreResult
 */
export class SnapshotStoreResult extends Message<SnapshotStoreResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID = new Uint8Array(0);

  /**
   * The UUID of the newly stored snapshot
   *
   * @generated from field: bytes snapshotID = 5;
   */
  snapshotID = new Uint8Array(0);

  constructor(data?: PartialMessage<SnapshotStoreResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.SnapshotStoreResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "snapshotID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotStoreResult {
    return new SnapshotStoreResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotStoreResult {
    return new SnapshotStoreResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotStoreResult {
    return new SnapshotStoreResult().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotStoreResult | PlainMessage<SnapshotStoreResult> | undefined, b: SnapshotStoreResult | PlainMessage<SnapshotStoreResult> | undefined): boolean {
    return proto3.util.equals(SnapshotStoreResult, a, b);
  }
}

/**
 * Ask the gateway to load the specified snapshot into the current state.
 * Results are streamed to the client in the same way query results are.
 *
 * @generated from message gateway.LoadSnapshot
 */
export class LoadSnapshot extends Message<LoadSnapshot> {
  /**
   * unique id of the snapshot to load
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 2;
   */
  msgID = new Uint8Array(0);

  constructor(data?: PartialMessage<LoadSnapshot>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.LoadSnapshot";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
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
 * @generated from message gateway.SnapshotLoadResult
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

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID = new Uint8Array(0);

  constructor(data?: PartialMessage<SnapshotLoadResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "gateway.SnapshotLoadResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "msgID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
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

