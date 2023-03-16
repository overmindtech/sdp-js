// @generated by protoc-gen-es v1.0.0 with parameter "target=ts,import_extension=.ts"
// @generated from file bookmarks.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * Descriptor for a bookmark
 *
 * @generated from message BookmarkDescriptor
 */
export class BookmarkDescriptor extends Message<BookmarkDescriptor> {
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

  /**
   * user supplied name of this bookmark
   *
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * user supplied description of this bookmark
   *
   * @generated from field: string description = 4;
   */
  description = "";

  /**
   * number of items in this bookmark
   *
   * @generated from field: uint32 size = 5;
   */
  size = 0;

  constructor(data?: PartialMessage<BookmarkDescriptor>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "BookmarkDescriptor";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "created", kind: "message", T: Timestamp },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkDescriptor {
    return new BookmarkDescriptor().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkDescriptor {
    return new BookmarkDescriptor().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkDescriptor {
    return new BookmarkDescriptor().fromJsonString(jsonString, options);
  }

  static equals(a: BookmarkDescriptor | PlainMessage<BookmarkDescriptor> | undefined, b: BookmarkDescriptor | PlainMessage<BookmarkDescriptor> | undefined): boolean {
    return proto3.util.equals(BookmarkDescriptor, a, b);
  }
}

/**
 * Retrieve the list of stored query bookmarks for the currently active account.
 * Returns a BookmarkList
 *
 * TODO: pagination
 *
 * @generated from message ListBookmarks
 */
export class ListBookmarks extends Message<ListBookmarks> {
  constructor(data?: PartialMessage<ListBookmarks>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ListBookmarks";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListBookmarks {
    return new ListBookmarks().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListBookmarks {
    return new ListBookmarks().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListBookmarks {
    return new ListBookmarks().fromJsonString(jsonString, options);
  }

  static equals(a: ListBookmarks | PlainMessage<ListBookmarks> | undefined, b: ListBookmarks | PlainMessage<ListBookmarks> | undefined): boolean {
    return proto3.util.equals(ListBookmarks, a, b);
  }
}

/**
 * response format for ListBookmarks
 *
 * @generated from message BookmarkListResult
 */
export class BookmarkListResult extends Message<BookmarkListResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * @generated from field: repeated BookmarkDescriptor bookmarks = 3;
   */
  bookmarks: BookmarkDescriptor[] = [];

  constructor(data?: PartialMessage<BookmarkListResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "BookmarkListResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "bookmarks", kind: "message", T: BookmarkDescriptor, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkListResult {
    return new BookmarkListResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkListResult {
    return new BookmarkListResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkListResult {
    return new BookmarkListResult().fromJsonString(jsonString, options);
  }

  static equals(a: BookmarkListResult | PlainMessage<BookmarkListResult> | undefined, b: BookmarkListResult | PlainMessage<BookmarkListResult> | undefined): boolean {
    return proto3.util.equals(BookmarkListResult, a, b);
  }
}

/**
 * Ask the gateway to store the current state as bookmark with the specified details.
 * Returns a BookmarkStored message when the bookmark is stored
 *
 * @generated from message StoreBookmark
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

  constructor(data?: PartialMessage<StoreBookmark>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "StoreBookmark";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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
 * @generated from message BookmarkStoreResult
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
   * @generated from field: BookmarkDescriptor bookmark = 3;
   */
  bookmark?: BookmarkDescriptor;

  constructor(data?: PartialMessage<BookmarkStoreResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "BookmarkStoreResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "bookmark", kind: "message", T: BookmarkDescriptor },
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
 * @generated from message LoadBookmark
 */
export class LoadBookmark extends Message<LoadBookmark> {
  /**
   * unique id of the bookmark to load
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<LoadBookmark>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "LoadBookmark";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
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
 * @generated from message BookmarkLoadResult
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

  constructor(data?: PartialMessage<BookmarkLoadResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "BookmarkLoadResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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
 * Delete the bookmark with the specified ID.
 *
 * @generated from message DeleteBookmark
 */
export class DeleteBookmark extends Message<DeleteBookmark> {
  /**
   * unique id of the bookmark to delete
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<DeleteBookmark>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "DeleteBookmark";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteBookmark {
    return new DeleteBookmark().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteBookmark {
    return new DeleteBookmark().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteBookmark {
    return new DeleteBookmark().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteBookmark | PlainMessage<DeleteBookmark> | undefined, b: DeleteBookmark | PlainMessage<DeleteBookmark> | undefined): boolean {
    return proto3.util.equals(DeleteBookmark, a, b);
  }
}

/**
 * @generated from message BookmarkDeleteResult
 */
export class BookmarkDeleteResult extends Message<BookmarkDeleteResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  constructor(data?: PartialMessage<BookmarkDeleteResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "BookmarkDeleteResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkDeleteResult {
    return new BookmarkDeleteResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkDeleteResult {
    return new BookmarkDeleteResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkDeleteResult {
    return new BookmarkDeleteResult().fromJsonString(jsonString, options);
  }

  static equals(a: BookmarkDeleteResult | PlainMessage<BookmarkDeleteResult> | undefined, b: BookmarkDeleteResult | PlainMessage<BookmarkDeleteResult> | undefined): boolean {
    return proto3.util.equals(BookmarkDeleteResult, a, b);
  }
}
