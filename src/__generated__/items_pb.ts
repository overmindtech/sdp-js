// @generated by protoc-gen-es v1.0.0 with parameter "target=ts,import_extension=.ts"
// @generated from file items.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Duration, Message, proto3, Struct, Timestamp } from "@bufbuild/protobuf";

/**
 * RequestMethod represents the available request methods. The details of these
 * methods are:
 *
 * GET: This takes a single unique query and should only return a single item.
 *      If an item matching th parameter passed doesn't exist the server should
 *      fail
 *
 * LIST: This takes no query (or ignores it) and should return all items that it
 *       can find
 *
 * SEARCH: This takes a non-unique query which is designed to be used as a
 *         search term. It should return some number of items (or zero) which
 *         match the query
 *
 * @generated from enum RequestMethod
 */
export enum RequestMethod {
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
// Retrieve enum metadata with: proto3.getEnumType(RequestMethod)
proto3.util.setEnumType(RequestMethod, "RequestMethod", [
  { no: 0, name: "GET" },
  { no: 1, name: "LIST" },
  { no: 2, name: "SEARCH" },
]);

/**
 * ItemRequest represents a request for an item.
 *
 * @generated from message ItemRequest
 */
export class ItemRequest extends Message<ItemRequest> {
  /**
   * The type of item to search for. "*" means all types
   *
   * @generated from field: string type = 1;
   */
  type = "";

  /**
   * Which method to use when looking for it
   *
   * @generated from field: RequestMethod method = 2;
   */
  method = RequestMethod.GET;

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
   * Whether to ignore the cache and execute the request regardless.
   *
   * By default sources will implement some level of caching, this is
   * particularly important for linked items as a single request with a large
   * link depth may result in the same item being requested many times as links
   * are resolved and more and more items link to each other. However if
   * required this caching can be turned off using this parameter
   *
   * @generated from field: bool ignoreCache = 6;
   */
  ignoreCache = false;

  /**
   * A UUID to uniquely identify the request. This should be stored by the
   * requester as it will be needed later if the requester wants to cancel a
   * request. It should be stored as 128 bytes, as opposed to the textual
   * representation
   *
   * @generated from field: bytes UUID = 7;
   */
  UUID = new Uint8Array(0);

  /**
   * The timeout for this request. This will affect both the initial request,
   * and also any linked item requests that are executed as part of it. This
   * means that if a request has a timeout of 10s, and takes 2s to complete, the
   * linked item requests should have a remaining timeout of 8s meaning that the
   * entire request including all linking needs to be done in 10s, not 10s for
   * *each* request
   *
   * @generated from field: google.protobuf.Duration timeout = 8;
   */
  timeout?: Duration;

  /**
   * Subject that items resulting from the request should be sent to
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

  constructor(data?: PartialMessage<ItemRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ItemRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "method", kind: "enum", T: proto3.getEnumType(RequestMethod) },
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

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ItemRequest {
    return new ItemRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ItemRequest {
    return new ItemRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ItemRequest {
    return new ItemRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ItemRequest | PlainMessage<ItemRequest> | undefined, b: ItemRequest | PlainMessage<ItemRequest> | undefined): boolean {
    return proto3.util.equals(ItemRequest, a, b);
  }
}

/**
 * The message signals that the item request with the corresponding UUID should
 * be cancelled. Work should stop immediately, and a final response should be
 * sent with a state of CANCELLED to acknowledge that the request has ended due
 * to a cancellation
 *
 * @generated from message CancelItemRequest
 */
export class CancelItemRequest extends Message<CancelItemRequest> {
  /**
   * UUID of the item request that this response is in relation to (in binary
   * format)
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<CancelItemRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "CancelItemRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CancelItemRequest {
    return new CancelItemRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CancelItemRequest {
    return new CancelItemRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CancelItemRequest {
    return new CancelItemRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CancelItemRequest | PlainMessage<CancelItemRequest> | undefined, b: CancelItemRequest | PlainMessage<CancelItemRequest> | undefined): boolean {
    return proto3.util.equals(CancelItemRequest, a, b);
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

  static readonly runtime = proto3;
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
   * @generated from field: repeated ItemRequest linkedItemRequests = 16;
   */
  linkedItemRequests: ItemRequest[] = [];

  /**
   * Linked items
   *
   * @generated from field: repeated Reference linkedItems = 17;
   */
  linkedItems: Reference[] = [];

  constructor(data?: PartialMessage<Item>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "Item";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uniqueAttribute", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "attributes", kind: "message", T: ItemAttributes },
    { no: 4, name: "metadata", kind: "message", T: Metadata },
    { no: 5, name: "scope", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 16, name: "linkedItemRequests", kind: "message", T: ItemRequest, repeated: true },
    { no: 17, name: "linkedItems", kind: "message", T: Reference, repeated: true },
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

  static readonly runtime = proto3;
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

  static readonly runtime = proto3;
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

  static readonly runtime = proto3;
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
   * The request that caused this item to be found
   *
   * @generated from field: ItemRequest sourceRequest = 3;
   */
  sourceRequest?: ItemRequest;

  /**
   * The time that the item was found
   *
   * @generated from field: google.protobuf.Timestamp timestamp = 4;
   */
  timestamp?: Timestamp;

  /**
   * How long the source took to execute in total when processing the
   * ItemRequest
   *
   * @generated from field: google.protobuf.Duration sourceDuration = 5;
   */
  sourceDuration?: Duration;

  /**
   * How long the source took to execute per item when processing the
   * ItemRequest
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

  constructor(data?: PartialMessage<Metadata>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "Metadata";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "sourceName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "sourceRequest", kind: "message", T: ItemRequest },
    { no: 4, name: "timestamp", kind: "message", T: Timestamp },
    { no: 5, name: "sourceDuration", kind: "message", T: Duration },
    { no: 6, name: "sourceDurationPerItem", kind: "message", T: Duration },
    { no: 7, name: "hidden", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
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
 * ReverseLinksRequest Is used to find linked item requests for item with
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

  static readonly runtime = proto3;
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
 * ReverseLinks Represents linked item requests that can be run and will result
 * in objects with *inbound* links to a given item
 *
 * @generated from message ReverseLinksResponse
 */
export class ReverseLinksResponse extends Message<ReverseLinksResponse> {
  /**
   * The item requests that should be executed in order to find items that link
   * to the requested item
   *
   * @generated from field: repeated ItemRequest linkedItemRequests = 1;
   */
  linkedItemRequests: ItemRequest[] = [];

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

  static readonly runtime = proto3;
  static readonly typeName = "ReverseLinksResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "linkedItemRequests", kind: "message", T: ItemRequest, repeated: true },
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

