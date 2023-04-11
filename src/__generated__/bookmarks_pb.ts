// @generated by protoc-gen-es v1.2.0 with parameter "target=ts,import_extension=.ts"
// @generated from file bookmarks.proto (package bookmarks, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { Query, Reference } from "./items_pb.ts";

/**
 * a complete Bookmark with user-supplied and machine-supplied values
 *
 * @generated from message bookmarks.Bookmark
 */
export class Bookmark extends Message<Bookmark> {
  /**
   * @generated from field: bookmarks.BookmarkMetadata metadata = 1;
   */
  metadata?: BookmarkMetadata;

  /**
   * @generated from field: bookmarks.BookmarkProperties properties = 2;
   */
  properties?: BookmarkProperties;

  constructor(data?: PartialMessage<Bookmark>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.Bookmark";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: BookmarkMetadata },
    { no: 2, name: "properties", kind: "message", T: BookmarkProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Bookmark {
    return new Bookmark().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Bookmark {
    return new Bookmark().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Bookmark {
    return new Bookmark().fromJsonString(jsonString, options);
  }

  static equals(a: Bookmark | PlainMessage<Bookmark> | undefined, b: Bookmark | PlainMessage<Bookmark> | undefined): boolean {
    return proto3.util.equals(Bookmark, a, b);
  }
}

/**
 * The user-editable parts of a Bookmark
 *
 * @generated from message bookmarks.BookmarkProperties
 */
export class BookmarkProperties extends Message<BookmarkProperties> {
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
   * queries that make up the bookmark
   *
   * @generated from field: repeated Query queries = 3;
   */
  queries: Query[] = [];

  /**
   * Items that should be excluded from the bookmark's results
   *
   * @generated from field: repeated Reference excludedItems = 4;
   */
  excludedItems: Reference[] = [];

  constructor(data?: PartialMessage<BookmarkProperties>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.BookmarkProperties";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "queries", kind: "message", T: Query, repeated: true },
    { no: 4, name: "excludedItems", kind: "message", T: Reference, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkProperties {
    return new BookmarkProperties().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkProperties {
    return new BookmarkProperties().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkProperties {
    return new BookmarkProperties().fromJsonString(jsonString, options);
  }

  static equals(a: BookmarkProperties | PlainMessage<BookmarkProperties> | undefined, b: BookmarkProperties | PlainMessage<BookmarkProperties> | undefined): boolean {
    return proto3.util.equals(BookmarkProperties, a, b);
  }
}

/**
 * Descriptor for a bookmark
 *
 * @generated from message bookmarks.BookmarkMetadata
 */
export class BookmarkMetadata extends Message<BookmarkMetadata> {
  /**
   * unique id to identify this bookmark
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * timestamp when this bookmark was created
   *
   * @generated from field: google.protobuf.Timestamp created = 2;
   */
  created?: Timestamp;

  constructor(data?: PartialMessage<BookmarkMetadata>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.BookmarkMetadata";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "created", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkMetadata {
    return new BookmarkMetadata().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkMetadata {
    return new BookmarkMetadata().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkMetadata {
    return new BookmarkMetadata().fromJsonString(jsonString, options);
  }

  static equals(a: BookmarkMetadata | PlainMessage<BookmarkMetadata> | undefined, b: BookmarkMetadata | PlainMessage<BookmarkMetadata> | undefined): boolean {
    return proto3.util.equals(BookmarkMetadata, a, b);
  }
}

/**
 * list all bookmarks
 *
 * TODO: pagination
 *
 * @generated from message bookmarks.ListBookmarksRequest
 */
export class ListBookmarksRequest extends Message<ListBookmarksRequest> {
  constructor(data?: PartialMessage<ListBookmarksRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.ListBookmarksRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListBookmarksRequest {
    return new ListBookmarksRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListBookmarksRequest {
    return new ListBookmarksRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListBookmarksRequest {
    return new ListBookmarksRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListBookmarksRequest | PlainMessage<ListBookmarksRequest> | undefined, b: ListBookmarksRequest | PlainMessage<ListBookmarksRequest> | undefined): boolean {
    return proto3.util.equals(ListBookmarksRequest, a, b);
  }
}

/**
 * @generated from message bookmarks.ListBookmarkResponse
 */
export class ListBookmarkResponse extends Message<ListBookmarkResponse> {
  /**
   * @generated from field: repeated bookmarks.Bookmark bookmarks = 3;
   */
  bookmarks: Bookmark[] = [];

  constructor(data?: PartialMessage<ListBookmarkResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.ListBookmarkResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 3, name: "bookmarks", kind: "message", T: Bookmark, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListBookmarkResponse {
    return new ListBookmarkResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListBookmarkResponse {
    return new ListBookmarkResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListBookmarkResponse {
    return new ListBookmarkResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListBookmarkResponse | PlainMessage<ListBookmarkResponse> | undefined, b: ListBookmarkResponse | PlainMessage<ListBookmarkResponse> | undefined): boolean {
    return proto3.util.equals(ListBookmarkResponse, a, b);
  }
}

/**
 * creates a new bookmark
 *
 * @generated from message bookmarks.CreateBookmarkRequest
 */
export class CreateBookmarkRequest extends Message<CreateBookmarkRequest> {
  /**
   * @generated from field: bookmarks.BookmarkProperties properties = 1;
   */
  properties?: BookmarkProperties;

  constructor(data?: PartialMessage<CreateBookmarkRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.CreateBookmarkRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "properties", kind: "message", T: BookmarkProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateBookmarkRequest {
    return new CreateBookmarkRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateBookmarkRequest {
    return new CreateBookmarkRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateBookmarkRequest {
    return new CreateBookmarkRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateBookmarkRequest | PlainMessage<CreateBookmarkRequest> | undefined, b: CreateBookmarkRequest | PlainMessage<CreateBookmarkRequest> | undefined): boolean {
    return proto3.util.equals(CreateBookmarkRequest, a, b);
  }
}

/**
 * @generated from message bookmarks.CreateBookmarkResponse
 */
export class CreateBookmarkResponse extends Message<CreateBookmarkResponse> {
  /**
   * @generated from field: bookmarks.Bookmark bookmark = 1;
   */
  bookmark?: Bookmark;

  constructor(data?: PartialMessage<CreateBookmarkResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.CreateBookmarkResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "bookmark", kind: "message", T: Bookmark },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateBookmarkResponse {
    return new CreateBookmarkResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateBookmarkResponse {
    return new CreateBookmarkResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateBookmarkResponse {
    return new CreateBookmarkResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateBookmarkResponse | PlainMessage<CreateBookmarkResponse> | undefined, b: CreateBookmarkResponse | PlainMessage<CreateBookmarkResponse> | undefined): boolean {
    return proto3.util.equals(CreateBookmarkResponse, a, b);
  }
}

/**
 * gets a specific bookmark
 *
 * @generated from message bookmarks.GetBookmarkRequest
 */
export class GetBookmarkRequest extends Message<GetBookmarkRequest> {
  /**
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<GetBookmarkRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.GetBookmarkRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBookmarkRequest {
    return new GetBookmarkRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBookmarkRequest {
    return new GetBookmarkRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBookmarkRequest {
    return new GetBookmarkRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetBookmarkRequest | PlainMessage<GetBookmarkRequest> | undefined, b: GetBookmarkRequest | PlainMessage<GetBookmarkRequest> | undefined): boolean {
    return proto3.util.equals(GetBookmarkRequest, a, b);
  }
}

/**
 * @generated from message bookmarks.GetBookmarkResponse
 */
export class GetBookmarkResponse extends Message<GetBookmarkResponse> {
  /**
   * @generated from field: bookmarks.Bookmark bookmark = 1;
   */
  bookmark?: Bookmark;

  constructor(data?: PartialMessage<GetBookmarkResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.GetBookmarkResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "bookmark", kind: "message", T: Bookmark },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBookmarkResponse {
    return new GetBookmarkResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBookmarkResponse {
    return new GetBookmarkResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBookmarkResponse {
    return new GetBookmarkResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetBookmarkResponse | PlainMessage<GetBookmarkResponse> | undefined, b: GetBookmarkResponse | PlainMessage<GetBookmarkResponse> | undefined): boolean {
    return proto3.util.equals(GetBookmarkResponse, a, b);
  }
}

/**
 * updates an existing bookmark
 *
 * @generated from message bookmarks.UpdateBookmarkRequest
 */
export class UpdateBookmarkRequest extends Message<UpdateBookmarkRequest> {
  /**
   * unique id to identify this bookmark
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * new attributes for this bookmark
   *
   * @generated from field: bookmarks.BookmarkProperties properties = 2;
   */
  properties?: BookmarkProperties;

  constructor(data?: PartialMessage<UpdateBookmarkRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.UpdateBookmarkRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "properties", kind: "message", T: BookmarkProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateBookmarkRequest {
    return new UpdateBookmarkRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateBookmarkRequest {
    return new UpdateBookmarkRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateBookmarkRequest {
    return new UpdateBookmarkRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateBookmarkRequest | PlainMessage<UpdateBookmarkRequest> | undefined, b: UpdateBookmarkRequest | PlainMessage<UpdateBookmarkRequest> | undefined): boolean {
    return proto3.util.equals(UpdateBookmarkRequest, a, b);
  }
}

/**
 * @generated from message bookmarks.UpdateBookmarkResponse
 */
export class UpdateBookmarkResponse extends Message<UpdateBookmarkResponse> {
  /**
   * @generated from field: bookmarks.Bookmark bookmark = 3;
   */
  bookmark?: Bookmark;

  constructor(data?: PartialMessage<UpdateBookmarkResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.UpdateBookmarkResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 3, name: "bookmark", kind: "message", T: Bookmark },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateBookmarkResponse {
    return new UpdateBookmarkResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateBookmarkResponse {
    return new UpdateBookmarkResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateBookmarkResponse {
    return new UpdateBookmarkResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateBookmarkResponse | PlainMessage<UpdateBookmarkResponse> | undefined, b: UpdateBookmarkResponse | PlainMessage<UpdateBookmarkResponse> | undefined): boolean {
    return proto3.util.equals(UpdateBookmarkResponse, a, b);
  }
}

/**
 * Delete the bookmark with the specified ID.
 *
 * @generated from message bookmarks.DeleteBookmarkRequest
 */
export class DeleteBookmarkRequest extends Message<DeleteBookmarkRequest> {
  /**
   * unique id of the bookmark to delete
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<DeleteBookmarkRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.DeleteBookmarkRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteBookmarkRequest {
    return new DeleteBookmarkRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteBookmarkRequest {
    return new DeleteBookmarkRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteBookmarkRequest {
    return new DeleteBookmarkRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteBookmarkRequest | PlainMessage<DeleteBookmarkRequest> | undefined, b: DeleteBookmarkRequest | PlainMessage<DeleteBookmarkRequest> | undefined): boolean {
    return proto3.util.equals(DeleteBookmarkRequest, a, b);
  }
}

/**
 * @generated from message bookmarks.DeleteBookmarkResponse
 */
export class DeleteBookmarkResponse extends Message<DeleteBookmarkResponse> {
  constructor(data?: PartialMessage<DeleteBookmarkResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "bookmarks.DeleteBookmarkResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteBookmarkResponse {
    return new DeleteBookmarkResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteBookmarkResponse {
    return new DeleteBookmarkResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteBookmarkResponse {
    return new DeleteBookmarkResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteBookmarkResponse | PlainMessage<DeleteBookmarkResponse> | undefined, b: DeleteBookmarkResponse | PlainMessage<DeleteBookmarkResponse> | undefined): boolean {
    return proto3.util.equals(DeleteBookmarkResponse, a, b);
  }
}

