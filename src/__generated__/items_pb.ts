// @generated by protoc-gen-es v1.2.0 with parameter "target=ts,import_extension=.ts"
// @generated from file items.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Duration, Message, proto3, Struct, Timestamp } from "@bufbuild/protobuf";

/**
 * Represents the health of something, the meaning of each state may depend on
 * the context in which it is used but should be reasonably obvious
 *
 * @generated from enum Health
 */
export enum Health {
  /**
   * The health could not be determined
   *
   * @generated from enum value: HEALTH_UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * Functioning normally
   *
   * @generated from enum value: HEALTH_OK = 1;
   */
  OK = 1,

  /**
   * Functioning, but degraded
   *
   * @generated from enum value: HEALTH_WARNING = 2;
   */
  WARNING = 2,

  /**
   * Not functioning
   *
   * @generated from enum value: HEALTH_ERROR = 3;
   */
  ERROR = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(Health)
proto3.util.setEnumType(Health, "Health", [
  { no: 0, name: "HEALTH_UNKNOWN" },
  { no: 1, name: "HEALTH_OK" },
  { no: 2, name: "HEALTH_WARNING" },
  { no: 3, name: "HEALTH_ERROR" },
]);

/**
 * QueryMethod represents the available query methods. The details of these
 * methods are:
 *
 * GET: This takes a single unique query and should only return a single item.
 *      If an item matching the parameter passed doesn't exist the server should
 *      fail
 *
 * LIST: This takes no query (or ignores it) and should return all items that it
 *       can find
 *
 * SEARCH: This takes a non-unique query which is designed to be used as a
 *         search term. It should return some number of items (or zero) which
 *         match the query
 *
 * @generated from enum QueryMethod
 */
export enum QueryMethod {
  /**
   * @generated from enum value: GET = 0;
   */
  GET = 0,

  /**
   * @generated from enum value: LIST = 1;
   */
  LIST = 1,

  /**
   * @generated from enum value: SEARCH = 2;
   */
  SEARCH = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(QueryMethod)
proto3.util.setEnumType(QueryMethod, "QueryMethod", [
  { no: 0, name: "GET" },
  { no: 1, name: "LIST" },
  { no: 2, name: "SEARCH" },
]);

/**
 * This is the same as Item within the package with a couple of exceptions, no
 * real reason why this whole thing couldn't be modelled in protobuf though if
 * required. Just need to decide what if anything should remain private
 *
 * @generated from message Item
 */
export class Item extends Message<Item> {
  /**
   * @generated from field: string type = 1;
   */
  type = "";

  /**
   * @generated from field: string uniqueAttribute = 2;
   */
  uniqueAttribute = "";

  /**
   * @generated from field: ItemAttributes attributes = 3;
   */
  attributes?: ItemAttributes;

  /**
   * @generated from field: Metadata metadata = 4;
   */
  metadata?: Metadata;

  /**
   * The scope within which the item is unique. Item uniqueness is determined
   * by the combination of type and uniqueAttribute value. However it is
   * possible for the same item to exist in many scopes. There is not formal
   * definition for what a scope should be other than the fact that it should
   * be somewhat descriptive and should ensure item uniqueness
   *
   * @generated from field: string scope = 5;
   */
  scope = "";

  /**
   * Not all items will have relatedItems we are are using a two byte
   * integer to save one byte integers for more common things
   *
   * @generated from field: repeated Query linkedItemQueries = 16;
   */
  linkedItemQueries: Query[] = [];

  /**
   * Linked items
   *
   * @generated from field: repeated Reference linkedItems = 17;
   */
  linkedItems: Reference[] = [];

  /**
   * (optional) Represents the health of the item. Only items that have a
   * clearly relevant health attribute should return a value for health
   *
   * @generated from field: optional Health health = 18;
   */
  health?: Health;

  constructor(data?: PartialMessage<Item>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Item";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uniqueAttribute", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "attributes", kind: "message", T: ItemAttributes },
    { no: 4, name: "metadata", kind: "message", T: Metadata },
    { no: 5, name: "scope", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 16, name: "linkedItemQueries", kind: "message", T: Query, repeated: true },
    { no: 17, name: "linkedItems", kind: "message", T: Reference, repeated: true },
    { no: 18, name: "health", kind: "enum", T: proto3.getEnumType(Health), opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Item {
    return new Item().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Item {
    return new Item().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Item {
    return new Item().fromJsonString(jsonString, options);
  }

  static equals(a: Item | PlainMessage<Item> | undefined, b: Item | PlainMessage<Item> | undefined): boolean {
    return proto3.util.equals(Item, a, b);
  }
}

/**
 * ItemAttributes represents the known attributes for an item. These are likely
 * to be common to a given type, but even this is not guaranteed. All items must
 * have at least one attribute however as it needs something to uniquely
 * identify it
 *
 * @generated from message ItemAttributes
 */
export class ItemAttributes extends Message<ItemAttributes> {
  /**
   * @generated from field: google.protobuf.Struct attrStruct = 1;
   */
  attrStruct?: Struct;

  constructor(data?: PartialMessage<ItemAttributes>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "ItemAttributes";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "attrStruct", kind: "message", T: Struct },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ItemAttributes {
    return new ItemAttributes().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ItemAttributes {
    return new ItemAttributes().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ItemAttributes {
    return new ItemAttributes().fromJsonString(jsonString, options);
  }

  static equals(a: ItemAttributes | PlainMessage<ItemAttributes> | undefined, b: ItemAttributes | PlainMessage<ItemAttributes> | undefined): boolean {
    return proto3.util.equals(ItemAttributes, a, b);
  }
}

/**
 * Metadata about the item. Where it came from, how long it took, etc.
 *
 * @generated from message Metadata
 */
export class Metadata extends Message<Metadata> {
  /**
   * This is the name of the source that was used to find the item.
   *
   * @generated from field: string sourceName = 2;
   */
  sourceName = "";

  /**
   * The query that caused this item to be found. This is for gateway-internal use and will not be exposed to the frontend.
   *
   * @generated from field: Query sourceQuery = 3;
   */
  sourceQuery?: Query;

  /**
   * The time that the item was found
   *
   * @generated from field: google.protobuf.Timestamp timestamp = 4;
   */
  timestamp?: Timestamp;

  /**
   * How long the source took to execute in total when processing the
   * Query
   *
   * @generated from field: google.protobuf.Duration sourceDuration = 5;
   */
  sourceDuration?: Duration;

  /**
   * How long the source took to execute per item when processing the
   * Query
   *
   * @generated from field: google.protobuf.Duration sourceDurationPerItem = 6;
   */
  sourceDurationPerItem?: Duration;

  /**
   * Whether the item should be hidden/ignored by user-facing things such as
   * GUIs and databases.
   *
   * Some types of items are only relevant in calculating higher-layer
   * abstractions and are therefore always hidden. A good example of this would
   * be the output of a command. This could be used by a remote source to gather
   * information, but we don't actually want to show the user all the commands
   * that were run, just the final item returned by the source
   *
   * @generated from field: bool hidden = 7;
   */
  hidden = false;

  /**
   * The UUID of the QUERY that caused this item to be found
   *
   * @generated from field: bytes sourceQueryUUID = 8 [deprecated = true];
   * @deprecated
   */
  sourceQueryUUID = new Uint8Array(0);

  constructor(data?: PartialMessage<Metadata>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Metadata";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "sourceName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "sourceQuery", kind: "message", T: Query },
    { no: 4, name: "timestamp", kind: "message", T: Timestamp },
    { no: 5, name: "sourceDuration", kind: "message", T: Duration },
    { no: 6, name: "sourceDurationPerItem", kind: "message", T: Duration },
    { no: 7, name: "hidden", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 8, name: "sourceQueryUUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Metadata {
    return new Metadata().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Metadata {
    return new Metadata().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Metadata {
    return new Metadata().fromJsonString(jsonString, options);
  }

  static equals(a: Metadata | PlainMessage<Metadata> | undefined, b: Metadata | PlainMessage<Metadata> | undefined): boolean {
    return proto3.util.equals(Metadata, a, b);
  }
}

/**
 * This is a list of items, like a List() would return
 *
 * @generated from message Items
 */
export class Items extends Message<Items> {
  /**
   * @generated from field: repeated Item items = 1;
   */
  items: Item[] = [];

  constructor(data?: PartialMessage<Items>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Items";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "items", kind: "message", T: Item, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Items {
    return new Items().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Items {
    return new Items().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Items {
    return new Items().fromJsonString(jsonString, options);
  }

  static equals(a: Items | PlainMessage<Items> | undefined, b: Items | PlainMessage<Items> | undefined): boolean {
    return proto3.util.equals(Items, a, b);
  }
}

/**
 * Query represents a query for an item or a list of items.
 *
 * @generated from message Query
 */
export class Query extends Message<Query> {
  /**
   * The type of item to search for. "*" means all types
   *
   * @generated from field: string type = 1;
   */
  type = "";

  /**
   * Which method to use when looking for it
   *
   * @generated from field: QueryMethod method = 2;
   */
  method = QueryMethod.GET;

  /**
   * What query should be passed to that method
   *
   * @generated from field: string query = 3;
   */
  query = "";

  /**
   * How deeply to link items. A value of 0 will mean that items are not linked.
   * To resolve linked items "infinitely" simply set this to a high number, with
   * the highest being 4,294,967,295. While this isn't truly *infinite*, chances
   * are that it is effectively the same, think six degrees of separation etc.
   *
   * @generated from field: uint32 linkDepth = 4;
   */
  linkDepth = 0;

  /**
   * The scope for which we are requesting. To query all scopes use the the
   * wildcard '*'
   *
   * @generated from field: string scope = 5;
   */
  scope = "";

  /**
   * Whether to ignore the cache and execute the query regardless.
   *
   * By default sources will implement some level of caching, this is
   * particularly important for linked items as a single query with a large link
   * depth may result in the same item being queried many times as links are
   * resolved and more and more items link to each other. However if required
   * this caching can be turned off using this parameter
   *
   * @generated from field: bool ignoreCache = 6;
   */
  ignoreCache = false;

  /**
   * A UUID to uniquely identify the query. This should be stored by the
   * requester as it will be needed later if the requester wants to cancel a
   * query. It should be stored as 128 bytes, as opposed to the textual
   * representation
   *
   * @generated from field: bytes UUID = 7;
   */
  UUID = new Uint8Array(0);

  /**
   * The timeout for this query. This will affect both the initial query, and
   * also any linked item queries that are executed as part of it. This means
   * that if a query has a timeout of 10s, and takes 2s to complete, the linked
   * item queries should have a remaining timeout of 8s meaning that the entire
   * query including all linking needs to be done in 10s, not 10s for *each*
   * query
   *
   * @generated from field: google.protobuf.Duration timeout = 8;
   */
  timeout?: Duration;

  /**
   * Subject that items resulting from the query should be sent to
   *
   * @generated from field: string itemSubject = 16;
   */
  itemSubject = "";

  /**
   * Subject that both interim and final responses should be sent to
   *
   * @generated from field: string responseSubject = 17;
   */
  responseSubject = "";

  /**
   * Subject that errors will be sent to
   *
   * @generated from field: string errorSubject = 18;
   */
  errorSubject = "";

  constructor(data?: PartialMessage<Query>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Query";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "method", kind: "enum", T: proto3.getEnumType(QueryMethod) },
    { no: 3, name: "query", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "linkDepth", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "scope", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "ignoreCache", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 7, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 8, name: "timeout", kind: "message", T: Duration },
    { no: 16, name: "itemSubject", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 17, name: "responseSubject", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 18, name: "errorSubject", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Query {
    return new Query().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Query {
    return new Query().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Query {
    return new Query().fromJsonString(jsonString, options);
  }

  static equals(a: Query | PlainMessage<Query> | undefined, b: Query | PlainMessage<Query> | undefined): boolean {
    return proto3.util.equals(Query, a, b);
  }
}

/**
 * QueryError is sent back when an item query fails
 *
 * @generated from message QueryError
 */
export class QueryError extends Message<QueryError> {
  /**
   * UUID if the item query that this response is in relation to (in binary
   * format)
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * @generated from field: QueryError.ErrorType errorType = 2;
   */
  errorType = QueryError_ErrorType.OTHER;

  /**
   * The string contents of the error
   *
   * @generated from field: string errorString = 3;
   */
  errorString = "";

  /**
   * The scope from which the error was raised
   *
   * @generated from field: string scope = 4;
   */
  scope = "";

  /**
   * The name of the source which raised the error (if relevant)
   *
   * @generated from field: string sourceName = 5;
   */
  sourceName = "";

  /**
   * The type of item that we were looking for at the time of the error
   *
   * @generated from field: string itemType = 6;
   */
  itemType = "";

  /**
   * The name of the responder that this error was raised from
   *
   * @generated from field: string responderName = 7;
   */
  responderName = "";

  constructor(data?: PartialMessage<QueryError>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "QueryError";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "errorType", kind: "enum", T: proto3.getEnumType(QueryError_ErrorType) },
    { no: 3, name: "errorString", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "scope", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "sourceName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "itemType", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "responderName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): QueryError {
    return new QueryError().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): QueryError {
    return new QueryError().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): QueryError {
    return new QueryError().fromJsonString(jsonString, options);
  }

  static equals(a: QueryError | PlainMessage<QueryError> | undefined, b: QueryError | PlainMessage<QueryError> | undefined): boolean {
    return proto3.util.equals(QueryError, a, b);
  }
}

/**
 * The error type. Any types in here will be gracefully handled unless the
 * type os "OTHER"
 *
 * @generated from enum QueryError.ErrorType
 */
export enum QueryError_ErrorType {
  /**
   * This should be used of all other failure modes, such as timeouts,
   * unexpected failures when querying state, permissions errors etc. Errors
   * that return this type should not be cached as the error may be transient.
   *
   * @generated from enum value: OTHER = 0;
   */
  OTHER = 0,

  /**
   * NOTFOUND means that the item was not found. This is only returned as the
   * result of a GET query since all other queries would return an empty
   * list instead
   *
   * @generated from enum value: NOTFOUND = 1;
   */
  NOTFOUND = 1,

  /**
   * NOSCOPE means that the item was not found because we don't have
   * access to the requested scope. This should not be interpreted as "The
   * item doesn't exist" (as with a NOTFOUND error) but rather as "We can't
   * tell you whether or not the item exists"
   *
   * @generated from enum value: NOSCOPE = 2;
   */
  NOSCOPE = 2,

  /**
   * TIMEOUT means that the source times out when trying to query the item.
   * The timeout is provided in the original query
   *
   * @generated from enum value: TIMEOUT = 3;
   */
  TIMEOUT = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(QueryError_ErrorType)
proto3.util.setEnumType(QueryError_ErrorType, "QueryError.ErrorType", [
  { no: 0, name: "OTHER" },
  { no: 1, name: "NOTFOUND" },
  { no: 2, name: "NOSCOPE" },
  { no: 3, name: "TIMEOUT" },
]);

/**
 * The message signals that the Query with the corresponding UUID should
 * be cancelled. Work should stop immediately, and a final response should be
 * sent with a state of CANCELLED to acknowledge that the query has ended due
 * to a cancellation
 *
 * @generated from message CancelQuery
 */
export class CancelQuery extends Message<CancelQuery> {
  /**
   * UUID of the Query to cancel
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<CancelQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "CancelQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CancelQuery {
    return new CancelQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CancelQuery {
    return new CancelQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CancelQuery {
    return new CancelQuery().fromJsonString(jsonString, options);
  }

  static equals(a: CancelQuery | PlainMessage<CancelQuery> | undefined, b: CancelQuery | PlainMessage<CancelQuery> | undefined): boolean {
    return proto3.util.equals(CancelQuery, a, b);
  }
}

/**
 * This message is sent to the gateway to instruct it to "undo" a query. This
 * means that the query will be removed from the session, along with all items
 * and edges that were a result of that query. If these items have already
 * been sent to the client, the gateway will send `deleteItem` messages instructing
 * the client to delete them
 *
 * @generated from message UndoQuery
 */
export class UndoQuery extends Message<UndoQuery> {
  /**
   * UUID of the Query to cancel
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<UndoQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "UndoQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UndoQuery {
    return new UndoQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UndoQuery {
    return new UndoQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UndoQuery {
    return new UndoQuery().fromJsonString(jsonString, options);
  }

  static equals(a: UndoQuery | PlainMessage<UndoQuery> | undefined, b: UndoQuery | PlainMessage<UndoQuery> | undefined): boolean {
    return proto3.util.equals(UndoQuery, a, b);
  }
}

/**
 * This requests that the gateway "expands" an item. This involves executing all
 * linked item queries within the session and sending the results to the
 * client. It is recommended that this be used rather than simply sending each
 * linked item request. Using this request type allows the Gateway to save the
 * session more intelligently so that it can be bookmarked and used later.
 * "Expanding" an item will mean an item always acts the same, even if its
 * linked item queries have changed
 *
 * @generated from message Expand
 */
export class Expand extends Message<Expand> {
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

  /**
   * A UUID to uniquely identify the request. This should be stored by the
   * requester as it will be needed later if the requester wants to cancel a
   * request. It should be stored as 128 bytes, as opposed to the textual
   * representation
   *
   * @generated from field: bytes UUID = 3;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<Expand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Expand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "item", kind: "message", T: Reference },
    { no: 2, name: "linkDepth", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Expand {
    return new Expand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Expand {
    return new Expand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Expand {
    return new Expand().fromJsonString(jsonString, options);
  }

  static equals(a: Expand | PlainMessage<Expand> | undefined, b: Expand | PlainMessage<Expand> | undefined): boolean {
    return proto3.util.equals(Expand, a, b);
  }
}

/**
 * This message is sent to the gateway to instruct it to "undo" an Expand. This
 * means that the expansion will be removed from the session, along with all items
 * and edges that were a result of that request. If these items have already
 * been sent to the client, the gateway will send `deleteItem` messages instructing
 * the client to delete them
 *
 * @generated from message UndoExpand
 */
export class UndoExpand extends Message<UndoExpand> {
  /**
   * UUID of the Expand to cancel
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<UndoExpand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "UndoExpand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UndoExpand {
    return new UndoExpand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UndoExpand {
    return new UndoExpand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UndoExpand {
    return new UndoExpand().fromJsonString(jsonString, options);
  }

  static equals(a: UndoExpand | PlainMessage<UndoExpand> | undefined, b: UndoExpand | PlainMessage<UndoExpand> | undefined): boolean {
    return proto3.util.equals(UndoExpand, a, b);
  }
}

/**
 * Reference to an item
 *
 * The uniqueness of an item is determined by the combination of:
 *
 *   * Type
 *   * UniqueAttributeValue
 *   * Scope
 *
 *
 * @generated from message Reference
 */
export class Reference extends Message<Reference> {
  /**
   * @generated from field: string type = 1;
   */
  type = "";

  /**
   * @generated from field: string uniqueAttributeValue = 2;
   */
  uniqueAttributeValue = "";

  /**
   * @generated from field: string scope = 3;
   */
  scope = "";

  constructor(data?: PartialMessage<Reference>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Reference";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uniqueAttributeValue", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "scope", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Reference {
    return new Reference().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Reference {
    return new Reference().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Reference {
    return new Reference().fromJsonString(jsonString, options);
  }

  static equals(a: Reference | PlainMessage<Reference> | undefined, b: Reference | PlainMessage<Reference> | undefined): boolean {
    return proto3.util.equals(Reference, a, b);
  }
}

/**
 * Edge Represents a link between two items, it is not used in regular SDP
 * queries as it's up to the client to infer the edges from the LinkedItems
 * field, however request managed by the gateway will explicitly send edges to
 * reduce the processing burden on the client side
 *
 * @generated from message Edge
 */
export class Edge extends Message<Edge> {
  /**
   * @generated from field: Reference from = 1;
   */
  from?: Reference;

  /**
   * @generated from field: Reference to = 2;
   */
  to?: Reference;

  constructor(data?: PartialMessage<Edge>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Edge";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "from", kind: "message", T: Reference },
    { no: 2, name: "to", kind: "message", T: Reference },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Edge {
    return new Edge().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Edge {
    return new Edge().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Edge {
    return new Edge().fromJsonString(jsonString, options);
  }

  static equals(a: Edge | PlainMessage<Edge> | undefined, b: Edge | PlainMessage<Edge> | undefined): boolean {
    return proto3.util.equals(Edge, a, b);
  }
}

/**
 * ReverseLinksRequest Is used to find linked item queries for item with
 * *inbound* rather than outbound links. This allows linking in reverse e.g.
 *
 *   ip -> load balancer
 *
 * where usually only:
 *
 *   load balancer -> ip
 *
 * would be possible
 *
 * @generated from message ReverseLinksRequest
 */
export class ReverseLinksRequest extends Message<ReverseLinksRequest> {
  /**
   * The item that you would like to find reverse links for
   *
   * @generated from field: Reference item = 1;
   */
  item?: Reference;

  /**
   * The timeout for this request
   *
   * @generated from field: google.protobuf.Duration timeout = 2;
   */
  timeout?: Duration;

  constructor(data?: PartialMessage<ReverseLinksRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "ReverseLinksRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "item", kind: "message", T: Reference },
    { no: 2, name: "timeout", kind: "message", T: Duration },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReverseLinksRequest {
    return new ReverseLinksRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReverseLinksRequest {
    return new ReverseLinksRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReverseLinksRequest {
    return new ReverseLinksRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ReverseLinksRequest | PlainMessage<ReverseLinksRequest> | undefined, b: ReverseLinksRequest | PlainMessage<ReverseLinksRequest> | undefined): boolean {
    return proto3.util.equals(ReverseLinksRequest, a, b);
  }
}

/**
 * ReverseLinks Represents linked item queries that can be run and will result
 * in objects with *inbound* links to a given item
 *
 * @generated from message ReverseLinksResponse
 */
export class ReverseLinksResponse extends Message<ReverseLinksResponse> {
  /**
   * The item queries that should be executed in order to find items that link
   * to the requested item
   *
   * @generated from field: repeated Query linkedItemQueries = 1;
   */
  linkedItemQueries: Query[] = [];

  /**
   * An error, if present. If not this will be an empty string
   *
   * @generated from field: string error = 2;
   */
  error = "";

  constructor(data?: PartialMessage<ReverseLinksResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "ReverseLinksResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "linkedItemQueries", kind: "message", T: Query, repeated: true },
    { no: 2, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReverseLinksResponse {
    return new ReverseLinksResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReverseLinksResponse {
    return new ReverseLinksResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReverseLinksResponse {
    return new ReverseLinksResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ReverseLinksResponse | PlainMessage<ReverseLinksResponse> | undefined, b: ReverseLinksResponse | PlainMessage<ReverseLinksResponse> | undefined): boolean {
    return proto3.util.equals(ReverseLinksResponse, a, b);
  }
}

